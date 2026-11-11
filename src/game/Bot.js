import * as THREE from 'three';
import { CharacterModel, createWeaponModel } from './CharacterFactory.js';
import { WeaponController } from './WeaponController.js';
import { AbilityController } from './AbilityController.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();

function makeNameplate(name, team) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: true, depthWrite: false, sizeAttenuation: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2.1, 0.525, 1);
  const update = (health, maxHealth, color) => {
    ctx.clearRect(0, 0, 512, 128);
    ctx.textAlign = 'center';
    ctx.font = '600 34px "Space Grotesk", sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    ctx.fillText(name, 256, 46);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(3,8,12,0.75)';
    ctx.roundRect?.(72, 66, 368, 16, 8);
    ctx.fillRect(72, 66, 368, 16);
    const pct = Math.max(0, health / maxHealth);
    ctx.fillStyle = team === 'attackers' ? '#ff6347' : '#4adfff';
    ctx.fillRect(74, 68, 364 * pct, 12);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(72, 66, 368, 16);
    texture.needsUpdate = true;
  };
  return { sprite, texture, update, material: mat };
}

export class Bot {
  constructor(data, team, game, index = 0, primaryWeapon = 'rifle') {
    this.data = data;
    this.character = data;
    this.team = team;
    this.game = game;
    this.isPlayer = false;
    this.name = data.shortName;
    this.index = index;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.yaw = team === 'attackers' ? 0 : Math.PI;
    this.health = 100;
    this.maxHealth = 100;
    this.armor = 0;
    this.maxArmor = 100;
    this.isAlive = true;
    this.kills = 0;
    this.deaths = 0;
    this.eyeHeight = 1.62;
    this.radius = 0.36;
    this.speedMultiplier = 1;
    this.fireRateMultiplier = 1;
    this.damageMultiplier = 0.72;
    this.reloadMultiplier = 1;
    this.damageReduction = 0;
    this.bonusArmor = 0;
    this.revealUntil = 0;
    this.stunUntil = 0;
    this.slowUntil = 0;
    this.slowFactor = 1;
    this.speedBoostUntil = 0;
    this.reductionUntil = 0;
    this.reaction = 0.28;
    this.accuracy = 2.2;
    this.path = [];
    this.pathIndex = 0;
    this.destination = null;
    this.repathTimer = 0;
    this.thinkTimer = Math.random() * 0.25;
    this.target = null;
    this.lastSeen = -10;
    this.lastAttacker = null;
    this.combatTimer = 0;
    this.stuckTimer = 0;
    this.lastPos = new THREE.Vector3();
    this.burstTimer = 0;
    this.burstShots = 0;
    this.abilityTimer = 5 + Math.random() * 8;
    this.specialTimer = 18 + Math.random() * 14;
    this.deathTime = 0;
    this.deathRotation = 0;
    this.planting = 0;
    this.defusing = 0;
    this.progressTimer = 0;
    this.lastProgressPos = new THREE.Vector3();
    this.deathTime = 0;
    this.deathRotation = 0;
    this.site = index % 2 === 0 ? 'A' : 'B';
    this.holdOffset = new THREE.Vector3((Math.random() - 0.5) * 5, 0, (Math.random() - 0.5) * 4);
    this.nameplate = makeNameplate(this.name, team);
    this.nameplate.sprite.position.y = 2.15;
    this.nameplate.sprite.userData.bot = this;
    this.game.scene.add(this.nameplate.sprite);
    this.model = new CharacterModel(data, { menuPose: false });
    this.model.group.rotation.y = this.yaw;
    this.game.scene.add(this.model.group);
    this.weapon = new WeaponController(this, primaryWeapon, game);
    this.abilities = new AbilityController(this, data, game);
    this.buildGun();
    this.nameplate.update(100, 100, team === 'attackers' ? '#ff8c76' : '#8ee8ff');
  }

  buildGun() {
    this.gun = createWeaponModel(this.weapon.weapon.id, 0.62);
    this.gun.rotation.y = Math.PI;
    this.gun.position.set(0.3, 1.16, 0.18);
    this.model.group.add(this.gun);
    this.gun.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  }

  resetForRound(spawn) {
    this.position.copy(spawn);
    this.velocity.set(0, 0, 0);
    this.health = 100;
    this.armor = this.bonusArmor || 0;
    this.isAlive = true;
    this.yaw = this.team === 'attackers' ? 0 : Math.PI;
    this.weapon.reset();
    this.abilities.resetRound();
    this.target = null;
    this.lastAttacker = null;
    this.path = [];
    this.pathIndex = 0;
    this.destination = null;
    this.repathTimer = 0;
    this.planting = 0;
    this.defusing = 0;
    this.progressTimer = 0;
    this.lastProgressPos.copy(spawn);
    this.deathTime = 0;
    this.deathRotation = 0;
    this.stunUntil = 0;
    this.slowUntil = 0;
    this.revealUntil = 0;
    this.model.group.visible = true;
    this.model.group.rotation.set(0, this.yaw, 0);
    this.gun.visible = true;
    this.nameplate.sprite.visible = true;
    this.nameplate.material.depthTest = true;
    this.nameplate.update(this.health, this.maxHealth, this.team === 'attackers' ? '#ff8c76' : '#8ee8ff');
    if (this.team === 'attackers') {
      this.site = Math.random() > 0.5 ? 'A' : 'B';
    }
    this.holdOffset.set((Math.random() - 0.5) * 5, 0, (Math.random() - 0.5) * 4);
    this.model.group.position.copy(this.position);
  }

  getEyePosition() {
    return this.position.clone().setY(this.position.y + this.eyeHeight);
  }

  getChestPosition() {
    return this.position.clone().setY(this.position.y + 1.08);
  }

  getHeadPosition() {
    return this.position.clone().setY(this.position.y + 1.64);
  }

  getAimDirection() {
    return _v.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)).clone().normalize();
  }

  think() {
    const enemies = this.game.getCombatants().filter((c) => c.team !== this.team && c.isAlive);
    // Attackers pushing toward the bomb site fight only up close so rounds keep
    // flowing; once on the site they use full sight range.
    const bc = this.game.bombController;
    let sight = 18;
    if (this.team === 'attackers' && bc && bc.state === 'NotPlanted') {
      const site = this.game.world.sites[this.site];
      sight = this.position.distanceTo(site.center) > 12 ? 12 : 18;
    }
    let best = null;
    let bestScore = Infinity;
    const eye = this.getEyePosition();
    const forward = _v2.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    for (const enemy of enemies) {
      const targetPos = enemy.getChestPosition();
      const to = targetPos.clone().sub(eye);
      const dist = to.length();
      if (dist > sight) continue;
      to.normalize();
      const dot = forward.dot(to);
      if (dot < -0.15) continue;
      if (!this.game.world.hasLineOfSight(eye, targetPos)) continue;
      let score = dist * (dot < 0.3 ? 1.6 : 1);
      if (enemy === this.target) score *= 0.55;
      if (enemy.revealUntil > this.game.elapsed) score *= 0.85;
      if (score < bestScore) {
        bestScore = score;
        best = enemy;
      }
    }
    if (best) {
      this.target = best;
      this.lastSeen = this.game.elapsed;
      this.combatTimer = 0.8;
      this.reaction = Math.max(0.05, 0.26 - (this.abilities.activeCooldown <= 0 ? 0.02 : 0));
    } else if (this.target && (!this.target.isAlive || this.game.elapsed - this.lastSeen > 3)) {
      this.target = null;
    }
    if (!this.target && this.lastAttacker?.isAlive && this.game.elapsed - this.lastSeen < 4) {
      // Investigate an unseen attacker.
      this.setDestination(this.lastAttacker.position.clone());
    }
  }

  update(dt) {
    this.abilities.update(dt);
    this.weapon.update(dt);
    if (!this.isAlive) {
      this.deathTime += dt;
      this.deathRotation = Math.min(1, this.deathRotation + dt * 1.7);
      this.model.group.rotation.z = this.deathRotation * Math.PI * 0.48;
      this.model.group.position.y = this.position.y + this.deathRotation * 0.1;
      this.nameplate.sprite.visible = false;
      return;
    }
    this.stunUntil = Math.max(this.stunUntil || 0, 0);
    const stunned = this.game.elapsed < this.stunUntil;
    const slowed = this.game.elapsed < this.slowUntil;
    this.thinkTimer -= dt;
    if (this.thinkTimer <= 0) {
      this.thinkTimer = 0.18 + Math.random() * 0.1;
      this.think();
    }
    this.abilityTimer -= dt;
    this.specialTimer -= dt;
    if (this.abilityTimer <= 0 && this.abilities.activeReady) {
      this.abilityTimer = 6 + Math.random() * 10;
      if (this.target || this.health < 75 || Math.random() < 0.4) {
        this.abilities.useActive();
      }
    }
    if (this.specialTimer <= 0 && this.abilities.specialReady) {
      this.specialTimer = 18 + Math.random() * 15;
      if (this.target && (this.health < 65 || Math.random() < 0.28)) {
        this.abilities.useSpecial();
      }
    }

    const target = this.target;
    const hasTarget = target && target.isAlive && this.game.world.hasLineOfSight(this.getEyePosition(), target.getChestPosition());
    if (stunned) {
      this.weapon.triggerUp();
      this.target = null;
    } else if (hasTarget) {
      this.combatTimer -= dt;
      this.fightTarget(dt);
    } else {
      this.combatTimer = Math.max(0, this.combatTimer - dt);
      this.followObjective(dt);
      if (this.weapon.triggerHeld && !this.weapon.reloading) this.weapon.triggerUp();
    }
    this.applyMovement(dt, stunned ? 0.12 : slowed ? this.slowFactor : 1);
    this.updateVisuals(dt);

    // Anti-stuck: if a bot has made no progress for a while (pinned against a
    // wall in combat or jammed on geometry) drop the target and force a repath.
    this.progressTimer += dt;
    if (this.progressTimer >= 2.4) {
      const moved = this.position.distanceTo(this.lastProgressPos);
      if (moved < 1.4) {
        this.target = null;
        this.destination = null;
        this.repathTimer = 0;
        this.path = [];
        this.holdOffset.set((Math.random() - 0.5) * 5, 0, (Math.random() - 0.5) * 4);
      }
      this.lastProgressPos.copy(this.position);
      this.progressTimer = 0;
    }

    // Interaction progress is managed by the bomb controller.
    if (this.game.bombController) {
      this.game.bombController.botInteract(this, dt);
    }
    if (this.game.elapsed > this.speedBoostUntil && this.speedMultiplier > 1.12) this.speedMultiplier = 1.12;
    if (this.game.elapsed > this.reductionUntil && this.damageReduction && this.data.id !== 'orquidea') this.damageReduction = 0;
  }

  fightTarget(dt) {
    const target = this.target;
    if (!target) return;
    const eye = this.getEyePosition();
    const aim = target.getChestPosition().clone();
    aim.y += Math.random() * 0.2 - 0.1;
    const dir = aim.sub(eye).normalize();
    const desiredYaw = Math.atan2(dir.x, dir.z);
    this.yaw = lerpAngle(this.yaw, desiredYaw, Math.min(1, dt * 8));
    const dist = this.position.distanceTo(target.position);
    const ideal = this.weapon.weapon.id === 'shotgun' ? 5 : this.weapon.weapon.id === 'sniper' ? 22 : 13;
    // Long-range standoffs stall the round: lose interest beyond 24m and push.
    if (dist > 24 && this.team !== 'defenders' && Math.random() < dt * 0.55) {
      this.target = null;
      this.destination = null;
      this.repathTimer = 0;
      return;
    }
    // Strafe around the target at a comfortable range.
    const toTarget = target.position.clone().sub(this.position);
    toTarget.y = 0;
    const d = toTarget.length();
    toTarget.normalize();
    const perp = new THREE.Vector3(-toTarget.z, 0, toTarget.x).multiplyScalar(Math.sin(this.game.elapsed * 0.9 + this.index) > 0 ? 1 : -1);
    let moveDir = new THREE.Vector3();
    if (d > ideal + 4) moveDir.add(toTarget);
    else if (d < ideal - 3) moveDir.sub(toTarget);
    moveDir.addScaledVector(perp, 0.62);
    moveDir.normalize();
    this.velocity.x = THREE.MathUtils.damp(this.velocity.x, moveDir.x * 3.8 * (this.speedMultiplier || 1), 7, dt);
    this.velocity.z = THREE.MathUtils.damp(this.velocity.z, moveDir.z * 3.8 * (this.speedMultiplier || 1), 7, dt);

    if (this.reaction > 0) {
      this.reaction -= dt;
    } else if (this.reaction <= 0) {
      const weapon = this.weapon.weapon;
      const aimDir = _v.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)).clone().normalize();
      aimDir.y = dir.y * 0.9;
      aimDir.normalize();
      if (this.burstTimer > 0) {
        this.burstTimer -= dt;
      } else {
        this.weapon.triggerDown();
        if (weapon.automatic) {
          if (Math.random() < dt * 7) {
            this.weapon.triggerHeld = true;
          }
        }
      }
      // Bot fire uses direct aim but still receives weapon spread and accuracy penalty.
      if (this.weapon.triggerHeld && this.weapon.fireTimer <= 0) {
        this.weapon.tryFire(eye, aimDir);
        this.weapon.triggerHeld = false;
        if (Math.random() < 0.22) this.burstTimer = 0.25 + Math.random() * 0.45;
      }
    }
  }

  followObjective(dt) {
    const bc = this.game.bombController;
    if (!bc) return;
    let goal = null;
    if (bc.state === 'Planted' || bc.state === 'Defusing' || bc.state === 'Planting') {
      const bombPos = bc.position || this.game.world.sites[this.site].center;
      if (this.team === 'defenders') {
        goal = bombPos.clone();
      } else {
        const angle = this.game.elapsed * 0.35 + this.index;
        goal = bombPos.clone().add(new THREE.Vector3(Math.cos(angle) * 3.2, 0, Math.sin(angle) * 3.2));
      }
    } else if (this.team === 'attackers') {
      const site = this.game.world.sites[this.site];
      goal = site.center.clone().add(this.holdOffset);
      if (this.position.distanceTo(goal) < 2.8) {
        // Slow down, cover angles, allow the interaction system to plant.
        goal = site.center.clone().add(new THREE.Vector3(Math.cos(this.index * 2.4) * 4, 0, Math.sin(this.index * 2.4) * 4));
        if (this.game.elapsed % 5 < dt) this.holdOffset.set((Math.random() - 0.5) * 5, 0, (Math.random() - 0.5) * 4);
      }
    } else {
      const site = this.game.world.sites[this.site];
      goal = site.center.clone().add(new THREE.Vector3(-4 + (this.index % 3) * 4, 0, 3 + (this.index % 2) * 3));
      if (this.position.distanceTo(goal) < 2.2) {
        goal = site.center.clone().add(new THREE.Vector3(Math.cos(this.game.elapsed * 0.2 + this.index) * 4.5, 0, Math.sin(this.game.elapsed * 0.2 + this.index) * 4.5));
      }
    }
    if (goal) this.setDestination(goal);
    this.followPath(dt);
  }

  setDestination(goal) {
    if (!goal) return;
    if (!this.destination || this.destination.distanceTo(goal) > 2.2) {
      this.destination = goal.clone();
      this.path = this.game.world.findPath(this.position, goal);
      this.pathIndex = Math.min(1, this.path.length - 1);
      this.repathTimer = 1.4;
    }
  }

  followPath(dt) {
    this.repathTimer -= dt;
    if (!this.path.length) {
      this.velocity.x = THREE.MathUtils.damp(this.velocity.x, 0, 8, dt);
      this.velocity.z = THREE.MathUtils.damp(this.velocity.z, 0, 8, dt);
      return;
    }
    if (this.pathIndex >= this.path.length) {
      this.velocity.x = THREE.MathUtils.damp(this.velocity.x, 0, 8, dt);
      this.velocity.z = THREE.MathUtils.damp(this.velocity.z, 0, 8, dt);
      return;
    }
    let waypoint = this.path[this.pathIndex];
    let to = waypoint.clone().sub(this.position);
    if (to.length() < 0.8) {
      this.pathIndex += 1;
      if (this.pathIndex >= this.path.length) return;
      waypoint = this.path[this.pathIndex];
      to = waypoint.clone().sub(this.position);
    }
    to.y = 0;
    const dist = to.length();
    if (dist < 0.1) return;
    to.normalize();
    const speed = (this.team === 'attackers' ? 5.4 : 5.0) * (this.speedMultiplier || 1) * (this.game.elapsed < this.speedBoostUntil ? 1.18 : 1);
    this.velocity.x = THREE.MathUtils.damp(this.velocity.x, to.x * speed, 6, dt);
    this.velocity.z = THREE.MathUtils.damp(this.velocity.z, to.z * speed, 6, dt);
    if (!this.target && !this.game.world.smokes.some((s) => s.center.distanceTo(this.position) < s.radius)) {
      const desiredYaw = Math.atan2(to.x, to.z);
      this.yaw = lerpAngle(this.yaw, desiredYaw, Math.min(1, dt * 5));
    }
    if (this.repathTimer <= 0) {
      this.repathTimer = 1.8;
      if (this.destination && this.destination.distanceTo(this.path[this.path.length - 1]) > 2.5) {
        this.path = this.game.world.findPath(this.position, this.destination);
        this.pathIndex = Math.min(1, this.path.length - 1);
      }
    }
  }

  applyMovement(dt, slow = 1) {
    this.game.world.moveCircle(this.position, this.velocity.x * dt * slow, this.velocity.z * dt * slow, this.radius);
    // Keep bots out of one another's personal space.
    for (const other of this.game.getCombatants()) {
      if (other === this || !other.isAlive) continue;
      const dx = this.position.x - other.position.x;
      const dz = this.position.z - other.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.01 && d < 0.85) {
        const push = (0.85 - d) * 0.5;
        this.position.x += (dx / d) * push;
        this.position.z += (dz / d) * push;
      }
    }
    this.position.y = 0;
    this.model.group.position.copy(this.position);
    this.model.group.rotation.y = this.yaw;
    this.nameplate.sprite.position.set(this.position.x, this.position.y + 2.18, this.position.z);
  }

  updateVisuals(dt) {
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    this.model.update(dt, speed, this.combatTimer > 0);
    this.model.group.position.copy(this.position);
    this.model.group.rotation.y = this.yaw;
    if (this.combatTimer > 0) {
      this.model.rightArm.rotation.x = -1.1;
      this.model.leftArm.rotation.x = -1.05;
      this.model.rightArm.rotation.z = -0.2;
      this.model.leftArm.rotation.z = 0.15;
    }
    this.gun.position.set(0.3, 1.2, 0.24);
    const revealed = this.revealUntil > this.game.elapsed;
    this.nameplate.material.depthTest = !revealed;
    this.nameplate.sprite.material.opacity = revealed ? 1 : 0.92;
    if (revealed) {
      const pulse = 0.8 + Math.sin(this.game.elapsed * 8 + this.index) * 0.2;
      this.nameplate.sprite.scale.set(2.1 * pulse, 0.525 * pulse, 1);
    } else {
      this.nameplate.sprite.scale.set(2.1, 0.525, 1);
    }
    if (!this.isAlive) this.nameplate.sprite.visible = false;
    if (Math.random() < dt * 2) this.nameplate.update(this.health, this.maxHealth, this.team === 'attackers' ? '#ff8c76' : '#8ee8ff');
  }

  onShotFired(weapon) {
    const muzzle = this.getChestPosition().addScaledVector(this.getAimDirection(), 0.6);
    this.game.effects.muzzle(muzzle, this.getAimDirection(), weapon.color);
    this.game.lastEnemyShot = { shooter: this, team: this.team, time: this.game.elapsed };
    if (this.position.distanceTo(this.game.player.position) < 34) this.game.audio.sfx(weapon.id, 0.5);
  }

  onReloadStart() {
    this.weapon.triggerHeld = false;
  }

  onReloadEnd() {}

  onDryFire() {}

  onAbilityUsed(ability, special) {
    if (this.position.distanceTo(this.game.player.position) < 20) this.game.audio.sfx('ability');
  }

  heal(amount) {
    if (!this.isAlive) return;
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.nameplate.update(this.health, this.maxHealth, this.team === 'attackers' ? '#ff8c76' : '#8ee8ff');
  }

  addArmor(amount, cap = 100) {
    if (!this.isAlive) return;
    this.armor = Math.min(cap, this.armor + amount);
  }

  takeDamage(amount, attacker, info = {}) {
    if (!this.isAlive) return { damage: 0, killed: false };
    let dmg = amount * (1 - (this.damageReduction || 0));
    if (this.armor > 0) {
      const absorbed = Math.min(this.armor, dmg * 0.66);
      this.armor -= absorbed;
      dmg -= absorbed;
    }
    dmg = Math.max(1, Math.round(dmg));
    this.health -= dmg;
    this.abilities.onDamaged(dmg, attacker);
    if (attacker) {
      this.lastAttacker = attacker;
      this.lastSeen = Math.max(this.lastSeen, this.game.elapsed - 2);
      if (!this.target || Math.random() < 0.6) {
        this.target = attacker;
        this.reaction = 0.12;
        this.yaw = Math.atan2(attacker.position.x - this.position.x, attacker.position.z - this.position.z);
      }
    }
    this.nameplate.update(this.health, this.maxHealth, this.team === 'attackers' ? '#ff8c76' : '#8ee8ff');
    if (this.health <= 0) {
      this.health = 0;
      this.die(attacker, info);
      return { damage: dmg, killed: true };
    }
    return { damage: dmg, killed: false };
  }

  die(attacker, info = {}) {
    this.isAlive = false;
    this.deaths += 1;
    this.deathTime = 0;
    this.deathRotation = 0;
    this.velocity.set(0, 0, 0);
    this.nameplate.sprite.visible = false;
    this.gun.visible = false;
    this.game.onCombatantDeath(this, attacker, info);
  }

  get movementSpeed() {
    return Math.hypot(this.velocity.x, this.velocity.z);
  }
}

function lerpAngle(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
