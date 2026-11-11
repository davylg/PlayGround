import * as THREE from 'three';

const down = new THREE.Vector3(0, -1, 0);

export class AbilityController {
  constructor(owner, data, game) {
    this.owner = owner;
    this.data = data;
    this.game = game;
    this.activeCooldown = 0;
    this.specialCooldown = 0;
    this.lastDamageAt = -10;
    this.buffs = [];
    this.baseStats = { fireRate: 1, speed: 1, damage: 1, reload: 1 };
    this.maxActive = data.active.cooldown;
    this.maxSpecial = data.special.cooldown;
    this.zoneTicker = 0;
    this.initPassive();
  }

  initPassive() {
    const id = this.data.id;
    if (id === 'muralha') this.owner.bonusArmor = 25;
    if (id === 'volt') {
      this.baseStats.reload = 0.85;
      this.baseStats.speed = 1.05;
      this.owner.reloadMultiplier = 0.85;
      this.owner.speedMultiplier = 1.05;
    }
    if (id === 'tigre') {
      this.baseStats.speed = 1.12;
      this.owner.speedMultiplier = 1.12;
    }
    if (id === 'orquidea') {
      this.owner.damageReduction = 0.12;
    }
  }

  resetRound() {
    this.activeCooldown = 0;
    this.specialCooldown = 0;
    this.buffs = [];
    this.lastDamageAt = -10;
    this.owner.fireRateMultiplier = 1;
    this.owner.damageMultiplier = 1;
    this.owner.speedMultiplier = this.baseStats.speed;
    this.owner.reloadMultiplier = this.baseStats.reload;
    this.owner.damageReduction = this.data.id === 'orquidea' ? 0.12 : 0;
    if (this.data.id === 'muralha') this.owner.bonusArmor = 25;
  }

  get activeReady() {
    return this.activeCooldown <= 0;
  }

  get specialReady() {
    return this.specialCooldown <= 0;
  }

  update(dt) {
    this.activeCooldown = Math.max(0, this.activeCooldown - dt);
    this.specialCooldown = Math.max(0, this.specialCooldown - dt);
    for (let i = this.buffs.length - 1; i >= 0; i--) {
      const buff = this.buffs[i];
      buff.time -= dt;
      if (buff.time <= 0) {
        this.owner[buff.stat] = buff.base;
        this.buffs.splice(i, 1);
      }
    }
    const id = this.data.id;
    if (!this.owner.isAlive) return;
    const elapsed = this.game.elapsed;
    if (id === 'sutra' && elapsed - this.lastDamageAt > 5) {
      this.owner.heal(2.5 * dt, true);
    }
    if (id === 'areia' && elapsed - this.lastDamageAt > 6) {
      this.owner.addArmor(8 * dt, 100);
    }
    if (id === 'santa') {
      const allies = this.game.getCombatants().filter((c) => c.team === this.owner.team && c.isAlive && c !== this.owner && c.position.distanceTo(this.owner.position) < 6);
      for (const ally of allies) ally.heal(1.2 * dt, true);
    }
    if (id === 'laco') {
      const inside = this.game.world.smokes.some((s) => s.center.distanceTo(this.owner.position) < s.radius);
      this.owner.inSmoke = inside;
    }
    if (id === 'vespa') {
      const threat = this.game.lastEnemyShot;
      if (threat && threat.team !== this.owner.team && threat.time > elapsed - 0.25) {
        if (threat.shooter.position.distanceTo(this.owner.position) < 18) {
          threat.shooter.revealUntil = Math.max(threat.shooter.revealUntil || 0, elapsed + 2);
        }
      }
    }
    if (this.zoneTicker > 0) this.zoneTicker -= dt;
  }

  onDamaged(amount, attacker) {
    this.lastDamageAt = this.game.elapsed;
    if (this.data.id === 'corvo' && attacker) {
      attacker.revealUntil = Math.max(attacker.revealUntil || 0, this.game.elapsed + 2.5);
    }
  }

  onKill() {
    if (this.data.id === 'brasa') {
      this.applyBuff('reloadMultiplier', 0.65, 6, 'reload');
    }
    if (this.data.id === 'laco') {
      this.activeCooldown = Math.max(0, this.activeCooldown - 3);
    }
  }

  applyBuff(stat, value, duration, label) {
    const base = stat === 'reloadMultiplier' ? (this.baseStats.reload || 1) : (this.baseStats[label] || 1);
    const existing = this.buffs.find((b) => b.stat === stat);
    if (existing) {
      existing.time = Math.max(existing.time, duration);
      this.owner[stat] = value;
    } else {
      this.buffs.push({ stat, base: this.owner[stat] ?? base, time: duration });
      this.owner[stat] = value;
    }
  }

  computeTarget(range = 18) {
    if (!this.owner.isPlayer) {
      const dir = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
      return this.owner.position.clone().addScaledVector(dir, Math.min(range, 8));
    }
    const origin = this.owner.getEyePosition();
    const dir = this.owner.getAimDirection();
    const groundDir = new THREE.Vector3(dir.x, 0, dir.z);
    if (groundDir.lengthSq() < 0.01) groundDir.set(0, 0, -1);
    groundDir.normalize();
    const start = new THREE.Vector3(origin.x, 0.4, origin.z);
    const wall = this.game.world.raycastStatic(start, groundDir, range);
    const dist = Math.min(wall - 0.35, range);
    return this.owner.position.clone().addScaledVector(groundDir, Math.max(1, dist));
  }

  useActive(pointOverride) {
    if (!this.owner.isAlive || this.activeCooldown > 0) return false;
    if (!this.game.canUseAbilities()) return false;
    const ability = this.data.active;
    this.activeCooldown = ability.cooldown;
    this.runEffect(ability, pointOverride, false);
    this.game.audio.sfx('ability');
    this.game.hud.abilityUsed?.(this, false);
    return true;
  }

  useSpecial(pointOverride) {
    if (!this.owner.isAlive || this.specialCooldown > 0) return false;
    if (!this.game.canUseAbilities()) return false;
    const ability = this.data.special;
    this.specialCooldown = ability.cooldown;
    this.runEffect(ability, pointOverride, true);
    this.game.audio.sfx('special');
    this.game.hud.abilityUsed?.(this, true);
    return true;
  }

  runEffect(ability, pointOverride, isSpecial) {
    const p = ability.params || {};
    const owner = this.owner;
    const game = this.game;
    const effects = game.effects;
    const color = this.data.palette.secondary;
    const target = pointOverride || this.computeTarget(p.range || 16);

    switch (ability.type) {
      case 'dash': {
        const dir = owner.getAimDirection();
        const horiz = new THREE.Vector3(dir.x, 0, dir.z).normalize();
        const distance = p.distance || 7;
        const steps = 12;
        for (let i = 0; i < steps; i++) game.world.moveCircle(owner.position, horiz.x * distance / steps, horiz.z * distance / steps, 0.34);
        effects.ring(owner.position, color, 2.4, 0.4);
        owner.onDash?.();
        break;
      }
      case 'leap': {
        const dir = owner.getAimDirection();
        const horiz = new THREE.Vector3(dir.x, 0, dir.z).normalize();
        if (owner.isPlayer) {
          owner.velocity.y = p.height || 6;
          owner.velocity.x += horiz.x * (p.distance || 6) * 0.9;
          owner.velocity.z += horiz.z * (p.distance || 6) * 0.9;
        } else {
          for (let i = 0; i < 10; i++) game.world.moveCircle(owner.position, horiz.x * (p.distance || 6) / 10, horiz.z * (p.distance || 6) / 10, 0.34);
        }
        effects.ring(owner.position, color, 3, 0.5);
        break;
      }
      case 'healArea':
      case 'blessing': {
        const radius = p.radius || 6;
        const allies = game.getCombatants().filter((c) => c.team === owner.team && c.isAlive && c.position.distanceTo(owner.position) < radius);
        for (const ally of allies) {
          ally.heal(p.heal || p.amount || 45);
          if (p.shield) ally.addArmor(p.shield, 100);
        }
        owner.heal(p.heal || p.amount || 45);
        if (p.shield) owner.addArmor(p.shield, 100);
        effects.ring(owner.position, color, radius, 0.8);
        effects.ring(owner.position, '#ffffff', radius * 0.6, 0.6);
        break;
      }
      case 'reveal': {
        const radius = p.radius || 30;
        const duration = p.duration || 4;
        const enemies = game.getCombatants().filter((c) => c.team !== owner.team && c.isAlive && (radius > 500 || c.position.distanceTo(owner.position) < radius));
        for (const enemy of enemies) {
          enemy.revealUntil = Math.max(enemy.revealUntil || 0, game.elapsed + duration);
          effects.ring(enemy.position, color, 2.4, 0.6);
        }
        effects.ring(owner.position, color, Math.min(radius, 30), 0.9);
        game.hud.notify(`${ability.name.toUpperCase()} · ${enemies.length} SINAL(S)`, color);
        break;
      }
      case 'shock':
      case 'chain':
      case 'blackout': {
        const radius = p.radius || 7;
        const enemies = game.getCombatants().filter((c) => c.team !== owner.team && c.isAlive && c.position.distanceTo(target) < radius);
        for (const enemy of enemies) {
          game.applyDamage(enemy, p.damage || 20, owner, { ability: ability.name });
          enemy.stunUntil = Math.max(enemy.stunUntil || 0, game.elapsed + (p.stun || 1.2));
          effects.lightning(target.clone().setY(1.3), enemy.getChestPosition(), color);
        }
        effects.ring(target, color, radius, 0.7);
        if (!enemies.length) game.hud.notify('SEM ALVO NA ÁREA', '#8b98a4');
        break;
      }
      case 'barrier': {
        const width = p.width || 3.4;
        const height = p.height || 2.2;
        game.world.addBarrier(target, width, height, p.duration || 8, p.color || color);
        effects.ring(target, color, width, 0.5);
        game.hud.notify(`${ability.name.toUpperCase()} · ATIVO`, color);
        break;
      }
      case 'smoke': {
        game.world.addSmoke(target, p.radius || 5, p.duration || 8, this.data.palette.secondary);
        effects.smokeBurst(target, this.data.palette.secondary);
        break;
      }
      case 'smokeSelf': {
        game.world.addSmoke(owner.position.clone(), p.radius || 9, p.duration || 10, this.data.palette.secondary);
        effects.smokeBurst(owner.position, this.data.palette.secondary);
        break;
      }
      case 'slowField': {
        game.world.addZone(target, p.radius || 5, p.duration || 7, color, 'slow');
        game.registerZone({ type: 'slow', owner, center: target, radius: p.radius || 5, duration: p.duration || 7, slow: p.slow || 0.5 });
        effects.ring(target, color, p.radius || 5, 0.6);
        break;
      }
      case 'damageZone': {
        game.world.addZone(target, p.radius || 4.8, p.duration || 8, color, 'damage');
        game.registerZone({ type: 'damage', owner, center: target, radius: p.radius || 4.8, duration: p.duration || 8, dps: p.dps || 12, tick: 0 });
        effects.ring(target, color, p.radius || 5, 0.7);
        break;
      }
      case 'healStation': {
        game.world.addHealStation(target, p.radius || 5, p.duration || 10, color);
        game.registerZone({ type: 'heal', owner, center: target, radius: p.radius || 5, duration: p.duration || 10, heal: p.heal || 6, tick: 0 });
        effects.ring(target, color, p.radius || 5, 0.7);
        break;
      }
      case 'teamShield': {
        const radius = p.radius || 16;
        const allies = game.getCombatants().filter((c) => c.team === owner.team && c.isAlive && c.position.distanceTo(owner.position) < radius);
        for (const ally of allies) {
          ally.addArmor(p.amount || 50, 100);
          if (p.duration && p.reduction) {
            ally.damageReduction = Math.max(ally.damageReduction || 0, p.reduction);
            ally.reductionUntil = game.elapsed + p.duration;
          }
          effects.ring(ally.position, color, 2.8, 0.8);
        }
        game.hud.notify(`${ability.name.toUpperCase()} · ${allies.length} ALIADOS`, color);
        break;
      }
      case 'teamHeal': {
        const radius = p.radius || 18;
        const allies = game.getCombatants().filter((c) => c.team === owner.team && c.isAlive && c.position.distanceTo(owner.position) < radius);
        for (const ally of allies) {
          ally.heal(p.amount || 60);
          if (p.armor) ally.addArmor(p.armor, 100);
          if (p.duration) {
            ally.speedMultiplier = Math.max(ally.speedMultiplier || 1, 1.18);
            ally.speedBoostUntil = game.elapsed + durationOf(p.duration, 4);
          }
          effects.ring(ally.position, color, 3, 0.7);
        }
        game.hud.notify(`${ability.name.toUpperCase()} · ${allies.length} ALIADOS`, color);
        break;
      }
      case 'frenzy': {
        owner.heal(p.heal || 30);
        this.applyBuff('fireRateMultiplier', p.fireRate || 1.35, p.duration || 8, 'fireRate');
        this.applyBuff('speedMultiplier', p.speed || 1.2, p.duration || 8, 'speed');
        effects.ring(owner.position, color, 3.5, 0.6);
        break;
      }
      case 'markSlow': {
        const enemies = game.getCombatants()
          .filter((c) => c.team !== owner.team && c.isAlive)
          .sort((a, b) => a.position.distanceTo(owner.position) - b.position.distanceTo(owner.position));
        const enemy = enemies[0];
        if (enemy) {
          enemy.revealUntil = Math.max(enemy.revealUntil || 0, game.elapsed + (p.duration || 5));
          enemy.slowUntil = Math.max(enemy.slowUntil || 0, game.elapsed + (p.duration || 5));
          enemy.slowFactor = p.slow || 0.55;
          effects.ring(enemy.position, color, 2.6, 0.7);
          effects.lightning(owner.getEyePosition(), enemy.getChestPosition(), color);
        }
        break;
      }
      case 'hunt': {
        const enemies = game.getCombatants()
          .filter((c) => c.team !== owner.team && c.isAlive)
          .sort((a, b) => a.position.distanceTo(owner.position) - b.position.distanceTo(owner.position))
          .slice(0, p.count || 3);
        for (const enemy of enemies) {
          enemy.revealUntil = Math.max(enemy.revealUntil || 0, game.elapsed + (p.duration || 6));
          effects.ring(enemy.position, color, 2.4, 0.55);
        }
        this.applyBuff('damageMultiplier', p.damage || 1.2, p.duration || 6, 'damage');
        game.hud.notify('CAÇADA ATIVA', color);
        break;
      }
      case 'mirage': {
        const allies = game.getCombatants().filter((c) => c.team === owner.team && c.isAlive && c.position.distanceTo(owner.position) < (p.radius || 16));
        for (const ally of allies) ally.addArmor(p.amount || 40, 100);
        const decoy = owner.position.clone().addScaledVector(owner.getAimDirection(), 4);
        effects.ring(decoy, color, 3.5, 1.2);
        effects.ring(owner.position, color, 3, 0.7);
        game.hud.notify('MIRAGEM', color);
        break;
      }
      default:
        effects.ring(owner.position, color, 3, 0.6);
    }
    owner.onAbilityUsed?.(ability, isSpecial);
  }
}

function durationOf(value, fallback) {
  return typeof value === 'number' ? value : fallback;
}
