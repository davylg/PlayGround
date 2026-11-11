import * as THREE from 'three';

export class AbilityController {
  constructor(scene, audio, settings) {
    this.scene = scene;
    this.audio = audio;
    this.settings = settings;
    this.character = null;
    this.cooldowns = { active: 0, special: 0 };
    this.activeEffects = [];
    this.temporaryStats = {
      speedMultiplier: 1,
      fireRateMultiplier: 1,
      shield: 0,
      shieldTimer: 0,
      marked: 0,
      scanActive: 0,
    };
  }

  loadCharacter(character) {
    this.character = character;
    this.cooldowns.active = 0;
    this.cooldowns.special = 0;
    this.temporaryStats = {
      speedMultiplier: 1,
      fireRateMultiplier: 1,
      shield: 0,
      shieldTimer: 0,
      marked: 0,
      scanActive: 0,
    };
  }

  resetRound() {
    if (this.character) this.loadCharacter(this.character);
    this.clearEffects();
  }

  clearEffects() {
    this.activeEffects.forEach(effect => {
      if (effect.mesh) {
        this.scene.remove(effect.mesh);
        if (effect.mesh.geometry) effect.mesh.geometry.dispose();
        if (effect.mesh.material) effect.mesh.material.dispose();
      }
    });
    this.activeEffects = [];
  }

  tryActive(entity) {
    if (!this.character || this.cooldowns.active > 0 || !entity.isAlive()) return false;
    const ability = this.character.active;
    this.cooldowns.active = ability.cooldown;
    this.execute(ability, entity, false);
    return true;
  }

  trySpecial(entity) {
    if (!this.character || this.cooldowns.special > 0 || !entity.isAlive()) return false;
    const ability = this.character.special;
    this.cooldowns.special = ability.cooldown;
    this.execute(ability, entity, true);
    return true;
  }

  execute(ability, entity, isSpecial) {
    const type = ability.type;
    const position = entity.mesh?.position.clone() || new THREE.Vector3();
    const forward = new THREE.Vector3();
    if (entity.mesh) {
      forward.set(Math.sin(entity.mesh.rotation.y), 0, Math.cos(entity.mesh.rotation.y));
    } else {
      forward.set(0, 0, 1);
    }
    this.audio.ability(isSpecial ? 'special' : 'normal');
    entity.mesh?.setAction?.('ability', 0);

    switch (type) {
      case 'dash':
        entity.addVelocity(forward.clone().multiplyScalar(11));
        break;
      case 'speedburst':
        this.temporaryStats.speedMultiplier = 1.55;
        this.speedTimer = ability.duration;
        entity.addVelocity(forward.clone().multiplyScalar(3.5));
        break;
      case 'rapidfire':
        this.temporaryStats.fireRateMultiplier = 0.45;
        this.fireRateTimer = ability.duration;
        this.temporaryStats.speedMultiplier = 1.22;
        break;
      case 'heal':
        entity.health.heal(entity.health.maxHealth * 0.42);
        this.spawnPulse(position, entity.team === 'attackers' ? 0xff5b2e : 0x42d9ee, 2.6);
        break;
      case 'shieldaura':
        entity.health.addShield(45, ability.duration);
        if (entity.team) this.auraAllies(entity, ability.duration, 'shield', 45);
        this.spawnRing(position, entity.team === 'attackers' ? 0xff8d3a : 0x42d9ee, 3.2);
        break;
      case 'armoraura':
        this.auraAllies(entity, ability.duration, 'shield', 38);
        this.spawnRing(position, 0x42d9ee, 4);
        break;
      case 'healzone':
        this.addZone(position, ability, entity.team, 'heal', 3.4, 0x74e69a);
        break;
      case 'wall':
        this.addWall(position, forward, entity.team === 'attackers' ? 0xff5b2e : 0x42d9ee, ability.duration);
        break;
      case 'barricadefield':
        this.addWall(position, forward, entity.team === 'attackers' ? 0xff5b2e : 0x42d9ee, ability.duration, 2.4);
        break;
      case 'smokefield':
        this.addZone(position, ability, entity.team, 'smoke', 4.2, 0xb8c4cf);
        break;
      case 'scanpulse':
      case 'widevision':
      case 'marknearest': {
        const enemies = entity.enemies?.() || [];
        let marked = 0;
        enemies.forEach(enemy => {
          if (!enemy.isAlive()) return;
          const distance = enemy.mesh.position.distanceTo(position);
          if (type === 'widevision' || distance < 15) {
            enemy.markedUntil = performance.now() + (type === 'widevision' ? ability.duration * 1000 : 5200);
            marked += 1;
          }
        });
        this.spawnPulse(position, 0xf8c95c, 6.5);
        break;
      }
      case 'slowfield':
        this.addZone(position, ability, entity.team, 'slow', 4.4, 0x8a7cff);
        break;
      case 'gravitywell':
        this.addZone(position, ability, entity.team, 'gravity', 4.6, 0xb07cff);
        break;
      case 'incendiary':
        this.addZone(position, ability, entity.team, 'burn', 4.2, 0xff5b2e);
        break;
      case 'blackout':
        this.addZone(position, ability, entity.team, 'blackout', 5.8, 0x111820);
        break;
      case 'shockstrike': {
        const enemies = entity.enemies?.() || [];
        enemies.forEach(enemy => {
          if (!enemy.isAlive()) return;
          const distance = enemy.mesh.position.distanceTo(position);
          if (distance < 8) enemy.takeDamage(38, entity);
        });
        this.spawnPulse(position, 0x7de7ff, 6.5);
        break;
      }
      case 'concussionmine': {
        const mine = this.addZone(position.clone().add(forward.multiplyScalar(2.2)), { ...ability, duration: 0.5 }, entity.team, 'shock', 3.4, 0xff8c46);
        break;
      }
      case 'decoy': {
        const decoy = new THREE.Mesh(
          new THREE.ConeGeometry(0.55, 1.9, 10),
          new THREE.MeshBasicMaterial({ color: 0x8ef2c7, transparent: true, opacity: 0.4 }),
        );
        decoy.position.copy(position).add(forward.clone().multiplyScalar(2));
        decoy.position.y = 1;
        this.scene.add(decoy);
        this.activeEffects.push({ type: 'decoy', mesh: decoy, duration: ability.duration, timer: ability.duration, team: entity.team, entityId: entity.id });
        break;
      }
      default:
        break;
    }
  }

  auraAllies(entity, duration, kind, amount) {
    const allies = entity.allies?.() || [];
    allies.forEach(ally => {
      if (!ally.isAlive() || ally === entity) return;
      const distance = ally.mesh.position.distanceTo(entity.mesh.position);
      if (distance < 6) {
        if (kind === 'shield') ally.health.addShield(amount, duration);
        if (kind === 'armor') ally.health.addShield(amount, duration);
      }
    });
  }

  addZone(position, ability, team, kind, radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 12, 8);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: kind === 'smoke' ? 0.44 : kind === 'blackout' ? 0.5 : 0.16,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.position.y = kind === 'smoke' || kind === 'blackout' ? 1.4 : 0.25;
    this.scene.add(mesh);
    const effect = {
      type: kind,
      mesh,
      team,
      radius,
      duration: ability.duration,
      timer: ability.duration,
      damagePerSecond: kind === 'burn' ? 16 : kind === 'shock' ? 32 : 0,
      owner: ability,
    };
    this.activeEffects.push(effect);
    return effect;
  }

  addWall(position, forward, color, duration, width = 4.2) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 2.4, 0.42),
      new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 0.52 }),
    );
    const rotationY = Math.atan2(forward.x, forward.z) + Math.PI / 2;
    mesh.position.copy(position).add(forward.clone().multiplyScalar(2.4));
    mesh.position.y = 1.2;
    mesh.rotation.y = rotationY;
    this.scene.add(mesh);
    const effect = { type: 'wall', mesh, duration, timer: duration, team: 'neutral', width };
    this.activeEffects.push(effect);
    return effect;
  }

  spawnPulse(position, color, radius) {
    const geometry = new THREE.RingGeometry(radius - 0.7, radius, 24);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(position);
    mesh.position.y = 0.06;
    this.scene.add(mesh);
    this.activeEffects.push({ type: 'pulse', mesh, duration: 0.55, timer: 0.55 });
  }

  spawnRing(position, color, radius) {
    const geometry = new THREE.TorusGeometry(radius, 0.08, 6, 24);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.copy(position);
    mesh.position.y = 1.1;
    this.scene.add(mesh);
    this.activeEffects.push({ type: 'ring', mesh, duration: 1.3, timer: 1.3 });
  }

  update(dt, entities = [], map = null) {
    // Temporary stats timers.
    if (this.speedTimer) {
      this.speedTimer -= dt;
      if (this.speedTimer <= 0) this.temporaryStats.speedMultiplier = 1;
    }
    if (this.fireRateTimer) {
      this.fireRateTimer -= dt;
      if (this.fireRateTimer <= 0) this.temporaryStats.fireRateMultiplier = 1;
    }
    this.cooldowns.active = Math.max(0, this.cooldowns.active - dt);
    this.cooldowns.special = Math.max(0, this.cooldowns.special - dt);

    for (let index = this.activeEffects.length - 1; index >= 0; index -= 1) {
      const effect = this.activeEffects[index];
      effect.timer -= dt;
      const lifeRatio = effect.duration > 0 ? Math.max(0, effect.timer / effect.duration) : 0;
      if (effect.mesh) {
        if (effect.type === 'pulse') {
          effect.mesh.material.opacity = lifeRatio * 0.55;
          effect.mesh.scale.setScalar(1 + (1 - lifeRatio) * 0.7);
        } else if (effect.type === 'ring') {
          effect.mesh.material.opacity = lifeRatio * 0.5;
          effect.mesh.rotation.z += dt * 3;
        } else if (effect.type === 'smoke' || effect.type === 'blackout') {
          effect.mesh.material.opacity = Math.min(0.55, lifeRatio * 0.65);
          effect.mesh.scale.setScalar(1 + (1 - lifeRatio) * 0.12);
        } else if (effect.type === 'decoy') {
          effect.mesh.material.opacity = lifeRatio * 0.4;
          effect.mesh.position.y = 1 + Math.sin(performance.now() * 0.004) * 0.05;
        } else if (effect.type === 'burn' || effect.type === 'shock' || effect.type === 'slow' || effect.type === 'gravity' || effect.type === 'heal') {
          effect.mesh.material.opacity = lifeRatio * 0.2;
          effect.mesh.rotation.y += dt * 1.5;
        } else if (effect.type === 'wall') {
          effect.mesh.material.opacity = lifeRatio * 0.5;
        }
      }
      if (effect.type === 'burn' && effect.damagePerSecond) {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team === effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) entity.takeDamage(effect.damagePerSecond * dt, { ability: true });
        });
      }
      if (effect.type === 'shock' && effect.damagePerSecond) {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team === effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) {
            entity.takeDamage(effect.damagePerSecond * dt, { ability: true });
            entity.slowUntil = performance.now() + 1500;
            entity.visionDisabledUntil = performance.now() + 1200;
          }
        });
      }
      if (effect.type === 'slow' || effect.type === 'gravity') {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team === effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) {
            entity.slowUntil = performance.now() + 350;
            if (effect.type === 'gravity') entity.gravityUntil = performance.now() + 350;
          }
        });
      }
      if (effect.type === 'blackout') {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team === effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) entity.visionDisabledUntil = performance.now() + 320;
        });
      }
      if (effect.type === 'smoke') {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team === effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) entity.accuracyNoise = 0.55;
        });
      }
      if (effect.type === 'heal') {
        entities.forEach(entity => {
          if (!entity.isAlive() || entity.team !== effect.team) return;
          const distance = entity.mesh.position.distanceTo(effect.mesh.position);
          if (distance <= effect.radius) entity.health.heal(14 * dt);
        });
      }
      if (effect.timer <= 0) {
        this.scene.remove(effect.mesh);
        if (effect.mesh.geometry) effect.mesh.geometry.dispose();
        if (effect.mesh.material) effect.mesh.material.dispose();
        this.activeEffects.splice(index, 1);
      }
    }
  }

  status() {
    return {
      activeReady: this.cooldowns.active <= 0,
      specialReady: this.cooldowns.special <= 0,
      activeCooldown: this.cooldowns.active,
      specialCooldown: this.cooldowns.special,
      active: this.character?.active,
      special: this.character?.special,
      speedMultiplier: this.temporaryStats.speedMultiplier,
      fireRateMultiplier: this.temporaryStats.fireRateMultiplier,
    };
  }
}
