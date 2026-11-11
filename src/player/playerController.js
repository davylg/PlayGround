import * as THREE from 'three';
import { PlayerHealth } from './health.js';
import { WeaponController } from './weaponController.js';
import { createCharacterMesh } from '../three/characterMesh.js';

export class PlayerController {
  constructor({ camera, scene, settings, audio, map, character, team, id = 'player' }) {
    this.camera = camera;
    this.scene = scene;
    this.settings = settings;
    this.audio = audio;
    this.map = map;
    this.character = character;
    this.team = team;
    this.id = id;
    this.isPlayer = true;
    this.health = new PlayerHealth(character.health);
    this.mesh = createCharacterMesh(character, settings.get('selectedSkin'));
    this.mesh.visible = false;
    this.mesh.userData.entityId = this.id;
    this.mesh.userData.isEntity = true;
    this.mesh.userData.isPlayer = true;
    this.scene.add(this.mesh);
    this.velocity = new THREE.Vector3();
    this.horizontalVelocity = new THREE.Vector3();
    this.grounded = true;
    this.gravity = 21;
    this.jumpForce = character.movement.jump;
    this.walkSpeed = character.movement.walk;
    this.runSpeed = character.movement.run;
    this.momentumUntil = 0;
    this.accuracyNoise = 0;
    this.slowUntil = 0;
    this.visionDisabledUntil = 0;
    this.gravityUntil = 0;
    this.markedUntil = 0;
    this.deathTime = 0;
    this.yaw = team === 'attackers' ? Math.PI : 0;
    this.pitch = 0;
    this.movementInput = new THREE.Vector2();
    this.abilityController = null;
    this.weapon = new WeaponController(camera, audio, settings, team);
    this.buildViewModel();
    this.setSpawn(team === 'attackers' ? new THREE.Vector3(0, 0, 18) : new THREE.Vector3(0, 0, -18));
    this.health.onDeath = () => this.handleDeath();
  }

  buildViewModel() {
    this.viewModel = new THREE.Group();
    this.camera.add(this.viewModel);
    this.buildGun('rifle');
    this.viewModel.position.set(0.24, -0.24, -0.45);
    this.viewModel.rotation.set(0.04, -0.1, 0.02);
  }

  buildGun(type = 'rifle') {
    this.clearChildren(this.viewModel);
    const material = new THREE.MeshLambertMaterial({ color: 0x22272e });
    const accentMaterial = new THREE.MeshLambertMaterial({ color: 0x1c2a35, emissive: 0x2a4a5c, emissiveIntensity: 0.35 });
    const group = new THREE.Group();
    const barrelLength = type === 'pistol' ? 0.14 : type === 'sniper' ? 0.5 : 0.28;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, barrelLength, 7), material);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -barrelLength / 2 - 0.05;
    group.add(barrel);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, type === 'pistol' ? 0.12 : 0.24), material);
    body.position.z = -0.02;
    group.add(body);
    const magazine = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.045), material);
    magazine.position.set(0, -0.065, type === 'pistol' ? 0.02 : -0.02);
    group.add(magazine);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.08, 0.05), material);
    handle.position.set(0, -0.05, 0.07);
    handle.rotation.x = -0.15;
    group.add(handle);
    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.014, 0.014), accentMaterial);
    glow.position.set(0, 0.04, -0.08);
    group.add(glow);
    const stockLength = type === 'pistol' ? 0 : 0.1;
    if (stockLength > 0) {
      const stock = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, stockLength), material);
      stock.position.set(0, -0.02, 0.12);
      group.add(stock);
    }
    this.viewModel.add(group);
    this.gunGroup = group;
  }

  clearChildren(object) {
    while (object.children.length) {
      const child = object.children.pop();
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  }

  setSpawn(position) {
    this.mesh.position.copy(position);
    this.mesh.position.y = 0;
    this.velocity.set(0, 0, 0);
    this.horizontalVelocity.set(0, 0, 0);
    this.grounded = true;
    this.yaw = this.team === 'attackers' ? Math.PI : 0;
    this.pitch = 0;
    this.mesh.rotation.set(0, this.yaw, 0);
    this.updateCamera(0);
  }

  addVelocity(vector) {
    this.velocity.add(vector);
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

  takeDamage(amount, source = null) {
    if (!this.health.isAlive) return 0;
    if (this.spawnProtectUntil && this.spawnProtectUntil > performance.now()) return 0;
    let applied = amount;
    const passive = this.character.passive?.flags || {};
    if (passive.damageReduction) applied *= 1 - passive.damageReduction;
    if (passive.firstHitReduce && !this.firstHitUsed) {
      applied *= 0.62;
      this.firstHitUsed = true;
    }
    const result = this.health.takeDamage(applied, source);
    if (this.character.passive.flags?.momentumOnDamage && result > 0) {
      this.momentumUntil = performance.now() + (this.character.passive.flags.momentumDuration * 1000);
    }
    return result;
  }

  handleDeath() {
    this.mesh.visible = true;
    this.mesh.setAction('death', 0);
    this.deathTime = performance.now();
    this.health.isAlive = false;
  }

  resetRound() {
    this.health.reset(this.character.health);
    this.firstHitUsed = false;
    this.mesh.visible = false;
    this.mesh.setAction('idle', 0);
    this.mesh.rotation.set(0, this.team === 'attackers' ? Math.PI : 0, 0);
    this.mesh.position.set(0, 0, this.team === 'attackers' ? 18 : -18);
    this.abilityController?.resetRound();
    this.weapon?.resetRound();
    this.deathTime = 0;
    this.spawnProtectUntil = performance.now() + 2500;
    this.momentumUntil = 0;
    this.slowUntil = 0;
    this.visionDisabledUntil = 0;
    this.accuracyNoise = 0;
    this.markedUntil = 0;
  }

  update(dt, input) {
    const move = new THREE.Vector3(input.moveX || 0, 0, input.moveZ || 0);
    if (move.lengthSq() > 1) move.normalize();
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    const desired = new THREE.Vector3();
    desired.addScaledVector(forward, -move.z);
    desired.addScaledVector(right, move.x);
    const moveLength = Math.min(1, desired.length());
    if (moveLength > 0) desired.normalize();
    let speed = input.sprint ? this.runSpeed : this.walkSpeed;
    if (this.momentumUntil > performance.now()) speed *= 1.12;
    if (this.slowUntil > performance.now()) speed *= 0.55;
    if (this.abilityController?.temporaryStats.speedMultiplier) speed *= this.abilityController.temporaryStats.speedMultiplier;
    if (this.gravityUntil > performance.now()) speed *= 0.4;
    if (this.health.isAlive) {
      this.horizontalVelocity.lerp(desired.multiplyScalar(speed * moveLength), 1 - Math.pow(0.0015, dt));
    } else {
      this.horizontalVelocity.multiplyScalar(0.9);
    }

    // Gravity and jump.
    if (this.health.isAlive && this.grounded && input.jump) {
      this.velocity.y = this.jumpForce;
      this.grounded = false;
      this.audio.jump();
    }
    this.velocity.y -= this.gravity * dt;
    this.mesh.position.addScaledVector(this.horizontalVelocity, dt);
    this.mesh.position.addScaledVector(this.velocity, dt);

    if (this.mesh.position.y <= 0) {
      this.mesh.position.y = 0;
      this.velocity.y = 0;
      this.grounded = true;
    }
    this.map.resolveCollision(this.mesh.position, 0.5);

    const moveSpeed = Math.hypot(this.horizontalVelocity.x, this.horizontalVelocity.z);
    this.mesh.rotation.y = this.yaw;
    this.mesh.animate(dt, moveSpeed, this.grounded, this.health.isAlive);
    if (moveSpeed > 1.4 && this.grounded) {
      this.footstepTimer = (this.footstepTimer || 0) - dt;
      if (this.footstepTimer <= 0) {
        this.audio.footstep(moveSpeed);
        this.footstepTimer = moveSpeed > this.runSpeed * 0.85 ? 0.34 : 0.52;
      }
    }

    if (this.character.passive.flags?.passiveRegen && this.health.isAlive) {
      const sinceDamage = performance.now() - this.health.lastDamageTime;
      if (sinceDamage > (this.character.passive.flags.regenDelay * 1000)) {
        this.health.heal(this.character.passive.flags.regenPerSecond * dt);
      }
    }

    this.weapon?.update(dt * (this.abilityController?.temporaryStats.fireRateMultiplier || 1));
    this.updateCamera(dt);
    this.updateViewModel(dt, input, moveSpeed);
  }

  updateCamera(dt) {
    const eyeHeight = 1.62 + Math.sin(performance.now() * 0.006) * 0.012 * (this.horizontalVelocity.length() > 0.6 ? 1 : 0);
    this.camera.position.set(this.mesh.position.x, this.mesh.position.y + eyeHeight, this.mesh.position.z);
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
    const fov = this.settings.get('fov');
    if (this.camera.fov !== fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }

  updateViewModel(dt, input, moveSpeed) {
    if (!this.viewModel) return;
    const swayX = Math.sin(performance.now() * 0.003) * 0.004;
    const swayY = Math.cos(performance.now() * 0.004) * 0.005;
    const bob = moveSpeed > 0.4 ? Math.sin(performance.now() * 0.02) * 0.008 : 0;
    const recoil = this.weapon?.recoilOffset || 0;
    this.viewModel.position.set(0.24 + swayX, -0.24 + swayY + bob, -0.45 + recoil * 0.35);
    this.viewModel.rotation.set(0.04 + recoil * 0.3, -0.1 + swayX * 2, 0.02);
    if (this.weapon?.reloading) this.viewModel.rotation.z = Math.sin(performance.now() * 0.012) * 0.18;
    else this.viewModel.rotation.z = THREE.MathUtils.lerp(this.viewModel.rotation.z, 0, dt * 7);
    if (this.weapon && this.weapon.currentSlot !== this.lastSlot) {
      this.lastSlot = this.weapon.currentSlot;
      this.buildGun(this.weapon.currentSlot);
    }
  }

  eyePosition() {
    return new THREE.Vector3(this.mesh.position.x, this.mesh.position.y + 1.55, this.mesh.position.z);
  }

  dispose() {
    this.clearChildren(this.viewModel);
    this.camera.remove(this.viewModel);
    this.scene.remove(this.mesh);
  }
}
