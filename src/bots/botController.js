import * as THREE from 'three';
import { PlayerHealth } from '../player/health.js';
import { createCharacterMesh } from '../three/characterMesh.js';
import { getWeapon } from '../data/weapons.js';

const DIFFICULTY = {
  recruit: { accuracy: 0.32, reaction: 0.8, viewDistance: 22, fireRateMultiplier: 1.8, aggression: 0.7, damageScale: 0.75 },
  veteran: { accuracy: 0.45, reaction: 0.55, viewDistance: 26, fireRateMultiplier: 1.6, aggression: 0.85, damageScale: 0.85 },
  elite: { accuracy: 0.68, reaction: 0.3, viewDistance: 34, fireRateMultiplier: 1.15, aggression: 1.1, damageScale: 1.0 },
};

function lerpAngle(current, target, amount) {
  const difference = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + difference * amount;
}

export class BotController {
  constructor({ scene, map, audio, character, team, difficulty = 'veteran', id, settings }) {
    this.scene = scene;
    this.map = map;
    this.audio = audio;
    this.character = character;
    this.team = team;
    this.id = id;
    this.isPlayer = false;
    this.settings = settings;
    this.difficulty = DIFFICULTY[difficulty] || DIFFICULTY.veteran;
    this.health = new PlayerHealth(character.health);
    this.mesh = createCharacterMesh(character, Math.floor(Math.random() * character.skins.length));
    this.mesh.userData.entityId = id;
    this.mesh.userData.isEntity = true;
    this.mesh.userData.isBot = true;
    this.mesh.userData.isCharacter = true;
    scene.add(this.mesh);
    this.velocity = new THREE.Vector3();
    this.speed = character.movement.walk;
    this.walkSpeed = character.movement.walk;
    this.runSpeed = character.movement.run;
    this.grounded = true;
    this.yaw = 0;
    this.weapon = { ...getWeapon(team === 'attackers' ? 'rifle' : 'rifle'), currentAmmo: getWeapon('rifle').magazineSize, reserveAmmo: 90 };
    this.fireCooldown = 0;
    this.reloading = false;
    this.reloadTimer = 0;
    this.target = null;
    this.path = [];
    this.pathTimer = 0;
    this.objective = null;
    this.bombRole = 'none';
    this.patrolIndex = Math.floor(Math.random() * 4);
    this.repathTimer = 0;
    this.momentum = 0;
    this.accuracyNoise = 0;
    this.slowUntil = 0;
    this.visionDisabledUntil = 0;
    this.gravityUntil = 0;
    this.markedUntil = 0;
    this.spawn = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.lastPosition = new THREE.Vector3();
    this.stuckTimer = 0;
    this.footstepTimer = 0;
    this.plantTimer = 0;
    this.defuseTimer = 0;
  }

  setSpawn(position, yaw = 0) {
    this.mesh.position.copy(position);
    this.mesh.position.y = 0;
    this.spawn.copy(position);
    this.yaw = yaw;
    this.mesh.rotation.y = yaw;
    this.velocity.set(0, 0, 0);
    this.path = [];
    this.target = null;
  }

  isAlive() {
    return this.health.isAlive;
  }

  enemies() {
    return this.enemiesList || [];
  }

  allies() {
    return this.alliesList || [];
  }

  addVelocity(vector) {
    this.velocity.add(vector);
  }

  takeDamage(amount, source = null) {
    if (!this.health.isAlive) return 0;
    let applied = amount;
    if (this.character.passive.flags?.damageReduction) applied *= 1 - this.character.passive.flags.damageReduction;
    if (this.character.passive.flags?.firstHitReduce && !this.firstHitUsed) {
      applied *= 0.62;
      this.firstHitUsed = true;
    }
    const result = this.health.takeDamage(applied, source);
    if (result > 0 && !this.target && source && source.mesh) this.setTarget(source);
    return result;
  }

  setTarget(entity) {
    this.target = entity;
    this.targetMemory = performance.now();
  }

  resetRound() {
    this.health.reset(this.character.health);
    this.firstHitUsed = false;
    this.mesh.visible = true;
    this.mesh.setAction('idle', 0);
    this.mesh.position.copy(this.spawn);
    this.mesh.rotation.y = this.yaw;
    this.weapon.currentAmmo = this.weapon.magazineSize;
    this.weapon.reserveAmmo = 90;
    this.reloading = false;
    this.reloadTimer = 0;
    this.fireCooldown = 0;
    this.target = null;
    this.path = [];
    this.plantTimer = 0;
    this.defuseTimer = 0;
    this.bombRole = 'none';
    this.slowUntil = 0;
    this.visionDisabledUntil = 0;
    this.accuracyNoise = 0;
    this.markedUntil = 0;
  }

  update(dt, game) {
    if (!this.health.isAlive) {
      this.mesh.animate(dt, 0, false, false);
      return;
    }
    this.fireCooldown -= dt;
    this.pathTimer -= dt;
    this.repathTimer -= dt;

    // Take over the bomb if the carrier is gone.
    if (this.team === 'attackers' && this.bombRole !== 'carrier' && game.bomb.state === 'notPlanted') {
      const carrier = (this.alliesList || []).find(entity => entity.bombRole === 'carrier' && entity.isAlive());
      if (!carrier) this.bombRole = 'carrier';
    }

    // Target selection.
    this.selectTarget(game);
    if (this.target && !this.target.isAlive()) this.target = null;
    if (this.target && performance.now() - (this.targetMemory || 0) > 4000 && !this.hasLineOfSight(this.target)) this.target = null;

    // Objectives.
    let desiredPosition = null;
    if (this.team === 'attackers') desiredPosition = this.attackObjective(game);
    else desiredPosition = this.defendObjective(game);

    // Movement.
    if (desiredPosition) this.moveTowards(dt, desiredPosition);
    else this.moveStrafe(dt);

    // Handle actions.
    if (this.team === 'attackers' && this.bombRole === 'carrier' && game.round.state === 'roundActive') {
      const bombState = game.bomb.state;
      if (bombState === 'notPlanted') {
        const site = this.map.siteAt(this.mesh.position);
        if (site && !this.target && !this.hasEnemyNear(game, 10)) {
          this.plantTimer += dt;
          this.mesh.setAction('plantBomb', 0);
          if (this.plantTimer > 1.6) {
            this.plantTimer = 0;
            game.bomb.startPlant(this, true);
          }
        } else if (this.plantTimer > 0) {
          this.plantTimer = 0;
        }
      }
    }

    if (this.team === 'defenders' && game.bomb.state === 'planted' && game.round.state === 'bombPlanted') {
      const distance = this.mesh.position.distanceTo(game.bomb.position);
      if (distance < 2.4) {
        this.defuseTimer += dt;
        this.mesh.setAction('defuseBomb', 0);
        if (this.defuseTimer > 2.8) {
          this.defuseTimer = 0;
          game.bomb.startDefuse(this, true);
        }
      } else if (this.defuseTimer > 0) this.defuseTimer = 0;
    }

    // Combat.
    if (this.target) this.engageTarget(dt, game);
    else this.fireCooldown = Math.max(this.fireCooldown, 0.06);

    // Movement animation.
    const moveSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.mesh.rotation.y = this.yaw;
    this.mesh.position.addScaledVector(this.velocity, dt);
    this.velocity.y -= 21 * dt;
    if (this.mesh.position.y <= 0) {
      this.mesh.position.y = 0;
      this.velocity.y = 0;
      this.grounded = true;
    }
    this.map.resolveCollision(this.mesh.position, 0.5);
    this.mesh.animate(dt, moveSpeed, true, true);
    if (moveSpeed > 1.2) {
      this.footstepTimer -= dt;
      if (this.footstepTimer <= 0) {
        const player = game.player;
        const distance = player.mesh.position.distanceTo(this.mesh.position);
        if (distance < 22 && !(this.character.passive.flags?.footstepNoiseReduction)) this.audio.footstep(distance);
        this.footstepTimer = 0.42;
      }
    }
  }

  selectTarget(game) {
    const eye = this.eyePosition();
    let best = null;
    let bestScore = Infinity;
    const enemies = this.enemiesList || [];
    enemies.forEach(enemy => {
      if (!enemy.isAlive()) return;
      const enemyEye = enemy.eyePosition?.() || enemy.mesh.position.clone().setY(enemy.mesh.position.y + 1.5);
      const distance = eye.distanceTo(enemyEye);
      const detectionRange = this.difficulty.viewDistance * (enemy.character.passive.flags?.detectionNoise ? 0.72 : 1);
      if (distance > detectionRange) return;
      const directionToEnemy = enemyEye.clone().sub(eye).normalize();
      const viewDirection = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
      const angle = viewDirection.dot(directionToEnemy);
      if (angle < 0.35) return;
      if (!this.hasLineOfSight(enemy)) return;
      const score = distance / (enemy.isPlayer ? 0.9 : 1);
      if (score < bestScore) { bestScore = score; best = enemy; }
    });
    if (best && (!this.target || best !== this.target)) {
      if (!this.target || performance.now() - (this.targetMemory || 0) > this.difficulty.reaction * 1000) {
        this.setTarget(best);
      }
    }
  }

  hasLineOfSight(target) {
    const origin = this.eyePosition();
    const targetEye = target.eyePosition?.() || target.mesh.position.clone().setY(target.mesh.position.y + 1.5);
    const direction = targetEye.clone().sub(origin).normalize();
    const distance = origin.distanceTo(targetEye);
    this.raycaster.set(origin, direction);
    this.raycaster.far = distance - 0.4;
    const blockers = this.map.raycastTargets();
    const intersections = this.raycaster.intersectObjects(blockers, false);
    return intersections.length === 0;
  }

  hasEnemyNear(game, radius) {
    const enemies = this.enemiesList || [];
    return enemies.some(enemy => enemy.isAlive() && enemy.mesh.position.distanceTo(this.mesh.position) < radius);
  }

  attackObjective(game) {
    const bomb = game.bomb;
    if (bomb.state === 'planted') {
      if (this.mesh.position.distanceTo(bomb.position) > 6) return bomb.position;
      return null;
    }
    const targetSite = game.attackSite || 'A';
    const siteCenter = this.map.siteZones.find(site => site.id === targetSite).center;
    if (!this.bombRole || this.bombRole === 'none') {
      const aliveAttackers = (this.alliesList || []).filter(entity => entity.isAlive());
      const carrier = aliveAttackers.find(entity => entity.bombRole === 'carrier');
      if (carrier) {
        if (carrier !== this && carrier.mesh.position.distanceTo(this.mesh.position) > 4.5) return carrier.mesh.position;
      }
    }
    if (this.bombRole === 'carrier') {
      const inSite = this.map.siteAt(this.mesh.position);
      if (!inSite || inSite.id !== targetSite) {
        const sitePos = new THREE.Vector3(siteCenter.x, 0, siteCenter.y);
        return sitePos;
      }
      if (this.hasEnemyNear(game, 12)) return null;
      return null;
    }
    // Support the carrier.
    const sitePos = new THREE.Vector3(siteCenter.x, 0, siteCenter.y);
    if (this.mesh.position.distanceTo(sitePos) > 5.5) return sitePos;
    return null;
  }

  defendObjective(game) {
    const bomb = game.bomb;
    if (bomb.state === 'planted' || bomb.state === 'defusing') {
      const distance = this.mesh.position.distanceTo(bomb.position);
      if (distance > 2.4) return bomb.position;
      return null;
    }
    const assignedSite = this.defendSite || game.defendSite || 'A';
    const siteCenter = this.map.siteZones.find(site => site.id === assignedSite).center;
    const sitePos = new THREE.Vector3(siteCenter.x, 0, siteCenter.y);
    const atSite = Math.hypot(this.mesh.position.x - siteCenter.x, this.mesh.position.z - siteCenter.y) < 6;
    if (!atSite) return sitePos;
    // Patrol around the assigned site.
    const patrolPoints = [
      new THREE.Vector3(siteCenter.x - 6, 0, siteCenter.y + 4),
      new THREE.Vector3(siteCenter.x + 6, 0, siteCenter.y - 4),
      new THREE.Vector3(siteCenter.x, 0, siteCenter.y + 6),
      new THREE.Vector3(siteCenter.x - 4, 0, siteCenter.y - 6),
    ];
    if (!this.patrolTarget || this.mesh.position.distanceTo(this.patrolTarget) < 1.6) {
      this.patrolIndex = ((this.patrolIndex || 0) + 1) % patrolPoints.length;
      this.patrolTarget = patrolPoints[this.patrolIndex];
    }
    return this.patrolTarget;
  }

  moveTowards(dt, target) {
    const distance = this.mesh.position.distanceTo(target);
    if (distance < 1.4) { this.velocity.multiplyScalar(0.4); return; }
    if (this.pathTimer <= 0 || this.path.length === 0) {
      this.path = this.map.findPath(this.mesh.position, target);
      this.pathTimer = 0.65;
    }
    const nextPoint = this.path.length ? this.path[0] : target;
    const toTarget = nextPoint.clone().sub(this.mesh.position);
    toTarget.y = 0;
    const localDistance = toTarget.length();
    if (localDistance < 0.6 && this.path.length) this.path.shift();
    const desired = toTarget.normalize().multiplyScalar(this.runSpeed * (this.target ? 0.68 : 1));
    if (this.slowUntil > performance.now()) desired.multiplyScalar(0.5);
    if (this.gravityUntil > performance.now()) desired.multiplyScalar(0.4);
    this.velocity.lerp(desired, 1 - Math.pow(0.0009, dt));
    const targetYaw = Math.atan2(desired.x, desired.z);
    this.yaw = lerpAngle(this.yaw, targetYaw, Math.min(1, dt * 6));
    this.detectStuck(dt, target);
  }

  moveStrafe(dt) {
    const strafe = Math.sin(performance.now() * 0.001 + this.mesh.position.x) * 0.4;
    const desired = new THREE.Vector3(strafe, 0, Math.cos(performance.now() * 0.0012 + this.mesh.position.z) * 0.2);
    this.velocity.lerp(desired.multiplyScalar(this.walkSpeed * 0.3), 1 - Math.pow(0.001, dt));
    if (this.target) {
      const targetPos = this.target.mesh.position;
      const toTarget = targetPos.clone().sub(this.mesh.position);
      this.yaw = lerpAngle(this.yaw, Math.atan2(toTarget.x, toTarget.z), Math.min(1, dt * 5));
    }
  }

  detectStuck(dt, target) {
    const moved = this.mesh.position.distanceTo(this.lastPosition);
    if (moved < 0.015 && this.velocity.lengthSq() > 0.2) {
      this.stuckTimer += dt;
      if (this.stuckTimer > 0.5) {
        this.stuckTimer = 0;
        this.path = [];
        this.pathTimer = 0;
        const random = new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2);
        this.velocity.add(random.multiplyScalar(3.2));
        this.map.resolveCollision(this.mesh.position, 0.5);
      }
    } else this.stuckTimer = 0;
    this.lastPosition.copy(this.mesh.position);
  }

  engageTarget(dt, game) {
    const target = this.target;
    if (!target || !target.isAlive()) return;
    const origin = this.eyePosition();
    const targetPos = target.eyePosition?.() || target.mesh.position.clone().setY(target.mesh.position.y + 1.4);
    const toTarget = targetPos.clone().sub(origin);
    const distance = toTarget.length();
    if (distance > this.weapon.range) return;
    if (!this.hasLineOfSight(target)) return;
    const desiredYaw = Math.atan2(toTarget.x, toTarget.z);
    this.yaw = lerpAngle(this.yaw, desiredYaw, Math.min(1, dt * 7));
    if (this.reloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        this.weapon.currentAmmo = this.weapon.magazineSize;
        this.reloading = false;
      }
      return;
    }
    if (this.weapon.currentAmmo <= 0) {
      this.weapon.currentAmmo = 0;
      this.reloading = true;
      this.reloadTimer = this.weapon.reloadTime;
      this.audio.reload();
      return;
    }
    if (this.fireCooldown > 0) return;
    // Aim delay before the first shot on a newly acquired target.
    if (performance.now() - (this.targetMemory || 0) < this.difficulty.reaction * 1000) return;
    this.fireCooldown = this.weapon.fireRate * this.difficulty.fireRateMultiplier;
    this.weapon.currentAmmo -= 1;
    this.mesh.setAction('shoot', 0);
    const accuracy = this.difficulty.accuracy * (this.character.passive.flags?.stationaryAccuracy && this.velocity.lengthSq() < 0.2 ? 1.25 : 1) * (1 - this.accuracyNoise * 0.7);
    const hitChance = THREE.MathUtils.clamp(accuracy * (1 - Math.min(0.7, distance / this.weapon.range * 0.75)), 0.08, 0.94);
    const hit = Math.random() < hitChance;
    game.spawnTracer(origin, targetPos, hit);
    this.audio.shot(this.weapon.sound, origin.distanceTo(game.player.mesh.position));
    if (hit) {
      const damage = this.weapon.damage * this.difficulty.damageScale * (1 - Math.min(0.5, distance / this.weapon.range * 0.45));
      const isHead = Math.random() < 0.08;
      const finalDamage = isHead ? damage * this.weapon.headshotMultiplier : damage;
      target.takeDamage(finalDamage, this);
    }
  }

  eyePosition() {
    return new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 1.55, this.mesh.position.z);
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.traverse(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }
}
