import * as THREE from 'three';
import { WEAPONS, getWeapon } from '../data/weapons.js';

const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();

export class WeaponController {
  constructor(owner, primaryId = 'rifle', game) {
    this.owner = owner;
    this.game = game;
    this.weapons = {
      primary: getWeapon(primaryId),
      secondary: getWeapon('pistol')
    };
    this.ammo = {
      primary: { current: this.weapons.primary.magazine, reserve: this.weapons.primary.reserve },
      secondary: { current: this.weapons.secondary.magazine, reserve: this.weapons.secondary.reserve }
    };
    this.slot = 'primary';
    this.fireTimer = 0;
    this.reloadTimer = 0;
    this.reloading = false;
    this.triggerHeld = false;
    this.shotsFired = 0;
    this.lastShotAt = -10;
  }

  get weapon() {
    return this.weapons[this.slot];
  }

  get ammoState() {
    return this.ammo[this.slot];
  }

  setPrimary(id) {
    this.weapons.primary = getWeapon(id);
    this.ammo.primary = { current: this.weapons.primary.magazine, reserve: this.weapons.primary.reserve };
    this.slot = 'primary';
  }

  reset() {
    this.slot = 'primary';
    for (const key of ['primary', 'secondary']) {
      this.ammo[key] = { current: this.weapons[key].magazine, reserve: this.weapons[key].reserve };
    }
    this.fireTimer = 0;
    this.reloadTimer = 0;
    this.reloading = false;
    this.triggerHeld = false;
  }

  switchSlot(slot) {
    if (slot === this.slot || !this.weapons[slot] || this.reloading) return;
    this.slot = slot;
    this.fireTimer = Math.max(this.fireTimer, 0.18);
    this.owner.onWeaponChanged?.();
    this.game?.audio?.sfx('empty');
  }

  update(dt) {
    this.fireTimer = Math.max(0, this.fireTimer - dt);
    if (this.reloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) this.finishReload();
    }
  }

  startReload() {
    if (this.reloading || !this.owner.isAlive) return false;
    const ammo = this.ammoState;
    if (ammo.current >= this.weapon.magazine || ammo.reserve <= 0) return false;
    this.reloading = true;
    this.reloadTimer = this.weapon.reload * (this.owner.reloadMultiplier || 1);
    this.owner.onReloadStart?.(this.weapon);
    this.game?.audio?.sfx('reload');
    return true;
  }

  finishReload() {
    const ammo = this.ammoState;
    const needed = this.weapon.magazine - ammo.current;
    const amount = Math.min(needed, ammo.reserve);
    ammo.current += amount;
    ammo.reserve -= amount;
    this.reloading = false;
    this.owner.onReloadEnd?.(this.weapon);
  }

  triggerDown() {
    this.triggerHeld = true;
    this.tryFire();
  }

  triggerUp() {
    this.triggerHeld = false;
  }

  tryFire(originOverride, directionOverride) {
    if (!this.owner.isAlive) return null;
    if (this.reloading) return null;
    if (this.fireTimer > 0) return null;
    const weapon = this.weapon;
    const ammo = this.ammoState;
    if (ammo.current <= 0) {
      if (this.triggerHeld) {
        this.game?.audio?.sfx('empty');
        this.owner.onDryFire?.();
      }
      this.startReload();
      return null;
    }
    const rate = weapon.fireRate / (this.owner.fireRateMultiplier || 1);
    this.fireTimer = rate;
    ammo.current -= 1;
    this.shotsFired += 1;
    this.lastShotAt = this.game?.elapsed || 0;
    const origin = originOverride || this.owner.getEyePosition();
    const baseDirection = directionOverride || this.owner.getAimDirection();
    const spread = weapon.spread * (this.owner.moving ? 1.55 : 1) * (this.owner.isCrouching ? 0.7 : 1);
    const hits = [];
    for (let p = 0; p < weapon.pellets; p++) {
      const dir = baseDirection.clone();
      const randA = Math.random() * Math.PI * 2;
      const randR = Math.sqrt(Math.random()) * spread;
      const right = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
      const up = new THREE.Vector3().crossVectors(right, dir).normalize();
      dir.addScaledVector(right, Math.cos(randA) * randR).addScaledVector(up, Math.sin(randA) * randR).normalize();
      const result = this.resolveRay(origin, dir, weapon);
      hits.push(result);
      this.game?.effects?.tracer(origin, result.point, weapon.color, this.owner.isPlayer);
      if (result.hit) {
        this.game.effects.impact(result.point, result.headshot ? '#ffce6b' : weapon.color);
        this.game.applyDamage(result.target, result.damage, this.owner, { headshot: result.headshot, weapon });
      } else if (result.blocked) {
        this.game.effects.impact(result.point, '#b8c6d4');
      }
    }
    this.owner.onShotFired?.(weapon, hits);
    this.game?.audio?.sfx(weapon.id, this.owner.isPlayer ? 0 : 0.4);
    if (ammo.current <= 0) {
      this.startReload();
    }
    return { weapon, hits };
  }

  resolveRay(origin, direction, weapon) {
    const range = weapon.range;
    const wallDist = this.game.world.raycastStatic(origin, direction, range);
    let closest = { distance: wallDist, target: null, point: origin.clone().addScaledVector(direction, Math.min(wallDist, range)), hit: false, blocked: wallDist < range, headshot: false, damage: 0 };
    const targets = this.game.getCombatants();
    for (const target of targets) {
      if (!target.isAlive || target === this.owner || target.team === this.owner.team) continue;
      const center = target.getChestPosition ? target.getChestPosition() : tmp.copy(target.position).setY(target.position.y + 1.05);
      const head = target.getHeadPosition ? target.getHeadPosition() : tmp2.copy(target.position).setY(target.position.y + 1.62);
      const bodyHit = this.raySphere(origin, direction, center, 0.42);
      const headHit = this.raySphere(origin, direction, head, target.isPlayer ? 0.17 : 0.2);
      let t = null;
      let headshot = false;
      if (headHit !== null && headHit < closest.distance) {
        t = headHit;
        headshot = true;
      }
      if (bodyHit !== null && bodyHit < closest.distance && (t === null || bodyHit < t)) {
        t = bodyHit;
        headshot = false;
      }
      if (t !== null) {
        let damage = weapon.damage * (this.owner.damageMultiplier || 1);
        if (headshot) damage *= weapon.id === 'sniper' ? 2.4 : 1.8;
        if (t > weapon.range * 0.55) damage *= Math.max(0.55, 1 - (t / weapon.range) * 0.5);
        closest = {
          distance: t,
          target,
          point: origin.clone().addScaledVector(direction, t),
          hit: true,
          blocked: false,
          headshot,
          damage: Math.round(damage)
        };
      }
    }
    return closest;
  }

  raySphere(origin, direction, center, radius) {
    const oc = tmp.subVectors(origin, center);
    const b = oc.dot(direction);
    const c = oc.lengthSq() - radius * radius;
    const h = b * b - c;
    if (h < 0) return null;
    const sqrt = Math.sqrt(h);
    const t0 = -b - sqrt;
    const t1 = -b + sqrt;
    if (t0 > 0) return t0;
    if (t1 > 0) return t1;
    return null;
  }
}
