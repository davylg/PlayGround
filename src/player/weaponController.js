import * as THREE from 'three';
import { weapons, getWeapon } from '../data/weapons.js';

export class WeaponController {
  constructor(camera, audio, settings, team = 'attackers') {
    this.camera = camera;
    this.audio = audio;
    this.settings = settings;
    this.team = team;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 120;
    this.slots = {
      primary: this.instantiate(choosePrimary(team)),
      secondary: this.instantiate('pistol'),
    };
    this.currentSlot = 'primary';
    this.fireCooldown = 0;
    this.reloading = false;
    this.reloadTimer = 0;
    this.recoilOffset = 0;
    this.recoilVelocity = 0;
    this.pellets = [];
    this.lastShotTime = 0;
  }

  instantiate(id) {
    const source = getWeapon(id);
    return {
      ...source,
      currentAmmo: source.magazineSize,
      reserveAmmo: source.reserveAmmo,
    };
  }

  get weapon() {
    return this.slots[this.currentSlot];
  }

  switchTo(slot) {
    if (!this.slots[slot] || this.reloading || this.currentSlot === slot) return false;
    this.currentSlot = slot;
    this.fireCooldown = Math.max(this.fireCooldown, 0.24);
    return true;
  }

  canFire() {
    return !this.reloading && this.fireCooldown <= 0 && this.weapon.currentAmmo > 0;
  }

  tryFire(triggerHeld, targets, callbacks = {}) {
    const weapon = this.weapon;
    if (!weapon.automatic && !triggerHeld) return false;
    if (this.fireCooldown > 0 || this.reloading || weapon.currentAmmo <= 0) {
      if (weapon.currentAmmo <= 0 && this.weapon.reserveAmmo > 0) this.reload();
      return false;
    }
    const now = performance.now();
    if (now - this.lastShotTime < weapon.fireRate * 1000) return false;
    this.lastShotTime = now;
    this.fireCooldown = weapon.fireRate;
    weapon.currentAmmo -= 1;
    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    const shots = weapon.pellets || 1;
    for (let i = 0; i < shots; i += 1) {
      const shotDir = direction.clone();
      const spread = weapon.spread * (this.settings?.get('botDifficulty') === 'elite' ? 0.9 : 1);
      shotDir.x += (Math.random() - 0.5) * spread;
      shotDir.y += (Math.random() - 0.5) * spread;
      shotDir.z += (Math.random() - 0.5) * spread;
      shotDir.normalize();
      this.raycaster.set(origin, shotDir);
      this.raycaster.far = weapon.range;
      const intersects = this.raycaster.intersectObjects(targets, true).filter(intersect => {
        const userData = intersect.object.userData;
        if (userData.blockBullet) return true;
        return userData.isCharacter || userData.isEntity || userData.isBomb || userData.isProp;
      });
      const hit = intersects.find(intersect => intersect.object.userData.blockBullet || intersect.object.userData.isCharacter || intersect.object.userData.isEntity);
      if (hit) {
        const distance = hit.distance;
        const damage = weapon.damage * (1 - Math.min(0.55, distance / weapon.range * 0.5));
        const isHead = hit.object.userData.isHead || hit.object.name === 'head';
        callbacks.onHit?.({
          point: hit.point,
          distance,
          damage: isHead ? damage * weapon.headshotMultiplier : damage,
          isHead,
          object: hit.object,
          userData: hit.object.userData,
        });
      } else {
        callbacks.onMiss?.({ origin, direction: shotDir, distance: weapon.range });
      }
    }
    this.recoilVelocity += weapon.recoil;
    return true;
  }

  reload() {
    const weapon = this.weapon;
    if (this.reloading || weapon.currentAmmo >= weapon.magazineSize || weapon.reserveAmmo <= 0) return false;
    this.reloading = true;
    this.reloadTimer = weapon.reloadTime;
    this.audio.reload();
    return true;
  }

  update(dt) {
    this.fireCooldown = Math.max(0, this.fireCooldown - dt);
    if (this.reloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        const weapon = this.weapon;
        const needed = weapon.magazineSize - weapon.currentAmmo;
        const moved = Math.min(needed, weapon.reserveAmmo);
        weapon.currentAmmo += moved;
        weapon.reserveAmmo -= Math.max(0, moved);
        this.reloading = false;
        this.reloadTimer = 0;
      }
    }
    this.recoilOffset += this.recoilVelocity * dt;
    this.recoilVelocity -= this.recoilOffset * 18 * dt;
    this.recoilOffset = THREE.MathUtils.clamp(this.recoilOffset, -0.12, 0.2);
    this.recoilVelocity *= 0.88;
  }

  resetRound() {
    this.slots.primary = this.instantiate(choosePrimary(this.team));
    this.slots.secondary = this.instantiate('pistol');
    this.currentSlot = 'primary';
    this.reloading = false;
    this.fireCooldown = 0;
    this.reloadTimer = 0;
    this.recoilOffset = 0;
    this.recoilVelocity = 0;
  }
}

function choosePrimary(team) {
  if (team === 'attackers') return 'rifle';
  return 'rifle';
}

export const WEAPON_LIBRARY = weapons;
