import * as THREE from 'three';
import { WeaponController } from './WeaponController.js';
import { AbilityController } from './AbilityController.js';
import { createWeaponModel } from './CharacterFactory.js';

const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();

export class Player {
  constructor(data, team, game, primaryWeapon = 'rifle') {
    this.data = data;
    this.character = data;
    this.team = team;
    this.game = game;
    this.isPlayer = true;
    this.name = data.shortName;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.armor = 0;
    this.maxArmor = 100;
    this.isAlive = true;
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.damageDealt = 0;
    this.eyeHeight = 1.62;
    this.radius = 0.34;
    this.grounded = true;
    this.moveSpeed = 5.2;
    this.runSpeed = 8.4;
    this.jumpForce = 6.7;
    this.gravity = 22;
    this.moving = false;
    this.sprinting = false;
    this.speedMultiplier = 1;
    this.fireRateMultiplier = 1;
    this.damageMultiplier = 1;
    this.reloadMultiplier = 1;
    this.damageReduction = 0;
    this.bonusArmor = 0;
    this.revealUntil = 0;
    this.stunUntil = 0;
    this.slowUntil = 0;
    this.slowFactor = 1;
    this.speedBoostUntil = 0;
    this.reductionUntil = 0;
    this.bob = 0;
    this.shake = 0;
    this.recoil = 0;
    this.lastStep = 0;
    this.lastDamageAt = -10;
    this.deathTime = 0;
    this.camera = new THREE.PerspectiveCamera(Number(game.settings.get('fov')) || 72, 1, 0.03, 300);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(0, 1.6, 0);
    game.scene.add(this.camera);
    this.viewGroup = new THREE.Group();
    this.camera.add(this.viewGroup);
    this.weapon = new WeaponController(this, primaryWeapon, game);
    this.abilities = new AbilityController(this, data, game);
    this.buildViewLight();
    this.bindInput();
    this.buildViewModel();
    this.game.scene.add(this.camera);
  }

  buildViewLight() {
    const light = new THREE.PointLight('#ffd7b0', 0.8, 2.3, 2);
    light.position.set(0.3, -0.1, -0.2);
    this.camera.add(light);
  }

  bindInput() {
    const input = this.game.input;
    input.callbacks.triggerDown = () => {
      if (!this.isAlive || !this.game.canShoot()) return;
      this.weapon.triggerDown();
    };
    input.callbacks.triggerUp = () => this.weapon.triggerUp();
    input.callbacks.reload = () => {
      if (this.isAlive && this.game.canShoot()) this.weapon.startReload();
    };
    input.callbacks.jump = () => this.tryJump();
    input.callbacks.active = () => this.useActive();
    input.callbacks.special = () => this.useSpecial();
    input.callbacks.weapon1 = () => this.weapon.switchSlot('primary');
    input.callbacks.weapon2 = () => this.weapon.switchSlot('secondary');
    input.callbacks.interact = () => this.game.bombController?.onInteractTap(this);
  }

  resetForRound(spawn) {
    this.position.copy(spawn);
    this.velocity.set(0, 0, 0);
    this.health = 100;
    this.armor = this.bonusArmor || 0;
    this.isAlive = true;
    this.grounded = true;
    this.stunUntil = 0;
    this.slowUntil = 0;
    this.revealUntil = 0;
    this.weapon.reset();
    this.abilities.resetRound();
    this.yaw = this.team === 'attackers' ? 0 : Math.PI;
    this.pitch = 0;
    this.camera.rotation.set(0, this.yaw, 0);
    this.viewGroup.visible = true;
    this.camera.fov = Number(this.game.settings.get('fov')) || 72;
    this.camera.updateProjectionMatrix();
    this.onWeaponChanged();
    this.game.hud.setHealth(this);
    this.game.hud.setWeapon(this.weapon);
  }

  buildViewModel() {
    while (this.viewGroup.children.length) this.viewGroup.remove(this.viewGroup.children[0]);
    const weapon = createWeaponModel(this.weapon.weapon.id, 0.78);
    weapon.position.set(0.28, -0.25, -0.48);
    weapon.rotation.set(-0.04, -0.08, -0.03);
    const hands = new THREE.Group();
    const glove = new THREE.MeshStandardMaterial({ color: '#15191f', roughness: 0.78, metalness: 0.1 });
    const sleeve = new THREE.MeshStandardMaterial({ color: this.data.palette.primary, roughness: 0.7, metalness: 0.12 });
    const accent = new THREE.MeshStandardMaterial({ color: this.data.palette.secondary, emissive: this.data.palette.secondary, emissiveIntensity: 0.3, roughness: 0.3 });
    const handR = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.12, 4, 8), glove);
    handR.position.set(0.31, -0.28, -0.38);
    handR.rotation.set(0.3, 0, -0.25);
    hands.add(handR);
    const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.34, 4, 8), sleeve);
    armR.position.set(0.37, -0.42, -0.22);
    armR.rotation.set(1.18, 0.2, -0.3);
    hands.add(armR);
    const handL = new THREE.Mesh(new THREE.CapsuleGeometry(0.048, 0.12, 4, 8), glove);
    handL.position.set(0.08, -0.3, -0.59);
    handL.rotation.set(0.2, 0, 0.6);
    hands.add(handL);
    const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.32, 4, 8), sleeve);
    armL.position.set(0.0, -0.46, -0.46);
    armL.rotation.set(1.2, -0.1, 0.5);
    hands.add(armL);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.015, 0.06), accent);
    band.position.set(0.31, -0.235, -0.39);
    band.rotation.z = -0.25;
    hands.add(band);
    hands.traverse((m) => {
      if (m.isMesh) {
        m.material.depthTest = false;
        m.renderOrder = 92;
        m.castShadow = false;
      }
    });
    weapon.traverse((m) => {
      if (m.isMesh) {
        m.material = m.material.clone();
        m.material.depthTest = false;
        m.renderOrder = 93;
        m.castShadow = false;
      }
    });
    this.viewGroup.add(weapon, hands);
    this.viewWeapon = weapon;
    this.viewHands = hands;
  }

  onWeaponChanged() {
    if (!this.weapon?.weapon?.id) return;
    this.buildViewModel();
    this.game.hud?.setWeapon(this.weapon);
  }

  getEyePosition() {
    return this.position.clone().setY(this.position.y + this.eyeHeight);
  }

  getChestPosition() {
    return this.position.clone().setY(this.position.y + 1.08);
  }

  getHeadPosition() {
    return this.position.clone().setY(this.position.y + 1.62);
  }

  getAimDirection() {
    const dir = new THREE.Vector3(0, 0, -1);
    dir.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    return dir.normalize();
  }

  tryJump() {
    if (!this.isAlive || !this.game.canShoot()) return;
    if (this.grounded) {
      this.velocity.y = this.jumpForce;
      this.grounded = false;
      this.game.audio.sfx('jump');
    }
  }

  useActive() {
    if (this.game.canUseAbilities()) this.abilities.useActive();
  }

  useSpecial() {
    if (this.game.canUseAbilities()) this.abilities.useSpecial();
  }

  update(dt) {
    this.abilities.update(dt);
    this.weapon.update(dt);
    if (!this.isAlive) {
      this.deathTime += dt;
      return;
    }
    if (!this.game.controlsEnabled) {
      this.updateCamera(dt);
      return;
    }
    const look = this.game.input.consumeLook();
    this.yaw -= look.x;
    this.pitch -= look.y * (this.game.settings.get('invertY') ? -1 : 1);
    this.pitch = THREE.MathUtils.clamp(this.pitch, -1.25, 1.2);

    const move = this.game.input.getMoveVector();
    const wantSprint = this.game.input.sprint || this.game.input.joystick.active && Math.hypot(this.game.input.joystick.x, this.game.input.joystick.y) > 0.78;
    const stunned = this.game.elapsed < this.stunUntil;
    const slowed = this.game.elapsed < this.slowUntil;
    const speedMul = (this.speedMultiplier || 1) * (this.inSmoke && this.data.id === 'laco' ? 1.15 : 1) * (slowed ? this.slowFactor : 1) * (stunned ? 0.15 : 1);
    this.sprinting = wantSprint && move.z < -0.15;
    const speed = (this.sprinting ? this.runSpeed : this.moveSpeed) * speedMul;
    _forward.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    _right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const targetX = (_forward.x * -move.z + _right.x * move.x) * speed;
    const targetZ = (_forward.z * -move.z + _right.z * move.x) * speed;
    const accel = this.grounded ? 18 : 5;
    this.velocity.x = THREE.MathUtils.damp(this.velocity.x, targetX, accel, dt);
    this.velocity.z = THREE.MathUtils.damp(this.velocity.z, targetZ, accel, dt);
    this.velocity.y -= this.gravity * dt;
    this.game.world.moveCircle(this.position, this.velocity.x * dt, this.velocity.z * dt, this.radius);
    this.position.y += this.velocity.y * dt;
    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }
    this.moving = Math.hypot(this.velocity.x, this.velocity.z) > 0.7;
    if (this.moving) {
      this.bob += dt * (this.sprinting ? 13 : 9);
      if (this.game.elapsed - this.lastStep > (this.sprinting ? 0.29 : 0.4)) {
        this.lastStep = this.game.elapsed;
        if (this.grounded) this.game.audio.sfx('step');
      }
    } else {
      this.bob = THREE.MathUtils.damp(this.bob, 0, 8, dt);
    }
    if (this.game.input.firing && this.weapon.weapon.automatic) this.weapon.tryFire();
    this.updateCamera(dt);
    this.animateViewModel(dt);
    if (this.game.elapsed > this.speedBoostUntil && this.speedMultiplier > (this.abilities.baseStats.speed || 1)) {
      this.speedMultiplier = this.abilities.baseStats.speed;
    }
    if (this.game.elapsed > this.reductionUntil && this.damageReduction && this.data.id !== 'orquidea') this.damageReduction = 0;
  }

  updateCamera(dt) {
    const bobY = Math.sin(this.bob) * (this.sprinting ? 0.035 : 0.018);
    const bobX = Math.cos(this.bob * 0.5) * 0.012;
    this.shake = Math.max(0, this.shake - dt * 2.5);
    const shakeX = (Math.random() - 0.5) * this.shake * 0.02;
    const shakeY = (Math.random() - 0.5) * this.shake * 0.02;
    this.camera.position.set(this.position.x + bobX, this.position.y + this.eyeHeight + bobY, this.position.z);
    this.camera.rotation.set(this.pitch + this.recoil + shakeY, this.yaw + shakeX, 0);
    const aiming = this.game.input.aiming;
    const targetFov = (Number(this.game.settings.get('fov')) || 72) / (aiming && this.weapon.weapon.zoom ? 1.5 : 1);
    this.camera.fov = THREE.MathUtils.damp(this.camera.fov, targetFov, 12, dt);
    this.camera.updateProjectionMatrix();
    this.recoil = THREE.MathUtils.damp(this.recoil, 0, 9, dt);
  }

  animateViewModel(dt) {
    if (!this.viewWeapon) return;
    const bobAmt = this.moving ? (this.sprinting ? 0.025 : 0.014) : 0.005;
    const swayX = Math.sin(this.bob * 0.5) * bobAmt;
    const swayY = Math.abs(Math.cos(this.bob)) * bobAmt;
    const reloadDip = this.weapon.reloading ? -0.16 : 0;
    const aim = this.game.input.aiming ? 0.08 : 0;
    this.viewGroup.position.x = THREE.MathUtils.damp(this.viewGroup.position.x, swayX + aim, 10, dt);
    this.viewGroup.position.y = THREE.MathUtils.damp(this.viewGroup.position.y, -swayY + reloadDip, 10, dt);
    this.viewGroup.rotation.z = THREE.MathUtils.damp(this.viewGroup.rotation.z, -swayX * 0.7, 8, dt);
    this.viewGroup.rotation.x = THREE.MathUtils.damp(this.viewGroup.rotation.x, this.weapon.reloading ? 0.3 : 0, 8, dt);
    if (this.weapon.reloading) {
      this.viewGroup.position.y += Math.sin(this.weapon.reloadTimer * 12) * 0.003;
    }
  }

  onShotFired(weapon) {
    this.recoil = Math.min(0.14, this.recoil + weapon.recoil * 0.035);
    this.shake = Math.min(1.8, this.shake + weapon.recoil * 0.45);
    const dir = this.getAimDirection();
    const muzzlePos = this.camera.localToWorld(new THREE.Vector3(0.28, -0.18, -0.85));
    this.game.effects.muzzle(muzzlePos, dir, weapon.color);
    this.lastShotFiredAt = this.game.elapsed;
    this.game.lastEnemyShot = { shooter: this, team: this.team, time: this.game.elapsed };
    this.game.hud?.kickCrosshair(weapon.recoil);
    if (weapon.id === 'shotgun' || weapon.id === 'sniper') this.shake = Math.min(2.5, this.shake + 0.7);
  }

  onDryFire() {}

  onReloadStart() {
    this.game.hud?.setReloading(true, this.weapon.reloadTimer, this.weapon.reloadTimer);
  }

  onReloadEnd() {
    this.game.hud?.setReloading(false);
  }

  onDash() {
    this.shake = Math.max(this.shake, 0.8);
  }

  onAbilityUsed(ability, special) {
    this.game.hud?.abilityUsed(this.abilities, special);
  }

  heal(amount, silent = false) {
    if (!this.isAlive) return;
    const before = this.health;
    this.health = Math.min(this.maxHealth, this.health + amount);
    if (!silent && this.health > before) this.game.hud?.flashHeal();
    this.game.hud?.setHealth(this);
  }

  addArmor(amount, cap = 100) {
    if (!this.isAlive) return;
    this.armor = Math.min(cap, this.armor + amount);
    this.game.hud?.setHealth(this);
  }

  takeDamage(amount, attacker, info = {}) {
    if (!this.isAlive) return { damage: 0, killed: false };
    const reduction = 1 - (this.damageReduction || 0);
    let dmg = amount * reduction;
    if (this.armor > 0) {
      const absorbed = Math.min(this.armor, dmg * 0.66);
      this.armor -= absorbed;
      dmg -= absorbed;
    }
    dmg = Math.max(1, Math.round(dmg));
    this.health -= dmg;
    this.lastDamageAt = this.game.elapsed;
    this.abilities.onDamaged(dmg, attacker);
    this.shake = Math.min(2.2, this.shake + dmg / 42);
    this.game.hud?.damageDirection?.(attacker ? attacker.position : null);
    if (this.health <= 0) {
      this.health = 0;
      this.die(attacker, info);
      return { damage: dmg, killed: true };
    }
    this.game.hud.setHealth(this);
    this.game.audio.sfx('hurt');
    return { damage: dmg, killed: false };
  }

  die(attacker, info = {}) {
    this.isAlive = false;
    this.deaths += 1;
    this.deathTime = 0;
    this.velocity.set(0, 0, 0);
    this.viewGroup.visible = false;
    this.game.hud.showDeath(attacker, this);
    this.game.onCombatantDeath(this, attacker, info);
    this.game.audio.sfx('hurt');
  }

  get movementSpeed() {
    return this.sprinting ? this.runSpeed : this.moveSpeed;
  }
}
