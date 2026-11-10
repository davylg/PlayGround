import * as THREE from 'three';
import {
  scene, camera, renderer, composer, bloomPass, state, audio, $, clamp, lerp, rand, randInt,
  pick, TAU, isTouch, formatScore, angleLerp, emitParticle, burst, updateParticles, updateDust,
  glowSprite, glowTexture, addShake, standard, markShadows,
} from './core.js';
import {
  createMorty, createEvilMorty, createGromflomite, createCronenberg, createFloater,
} from './models.js';
import { buildWorld, updateWorld, obstacles } from './world.js';

/* ==========================================================================
   PORTAL PANIC — gameplay
   ========================================================================== */

const ui = {
  hpFill: $('hp-fill'),
  hpLag: $('hp-lag'),
  hpValue: $('hp-value'),
  dashStatus: $('dash-status'),
  waveTitle: $('wave-title'),
  enemiesLeft: $('enemies-left'),
  score: $('score-value'),
  seeds: $('seed-value'),
  combo: $('combo-chip'),
  comboValue: $('combo-value'),
  energy: $('energy-fill'),
  energyLabel: $('energy-label'),
  crosshair: $('crosshair'),
  hitmarker: $('hitmarker'),
  vignette: $('damage-vignette'),
  bossbar: $('bossbar'),
  bossFill: $('boss-fill'),
  banner: $('wave-banner'),
  bannerKicker: $('banner-kicker'),
  bannerTitle: $('banner-title'),
  bannerSub: $('banner-sub'),
  toast: $('toast'),
  minimap: $('minimap'),
  hint: $('control-hint'),
  loading: $('loading'),
  title: $('screen-title'),
  pause: $('screen-pause'),
  end: $('screen-end'),
  endKicker: $('end-kicker'),
  endTitle: $('end-title'),
  endCopy: $('end-copy'),
  endScore: $('end-score'),
  endWave: $('end-wave'),
  endSeeds: $('end-seeds'),
  best: $('best-score'),
  btnStart: $('btn-start'),
  btnResume: $('btn-resume'),
  btnRetry: $('btn-retry'),
  btnPause: $('btn-pause'),
  btnSound: $('btn-sound'),
  btnSoundTitle: $('btn-sound-title'),
  btnRestartPause: $('btn-restart-pause'),
  btnFireMobile: $('btn-fire-mobile'),
  btnDashMobile: $('btn-dash-mobile'),
  joyZone: $('joy-zone'),
  joyKnob: $('joy-knob'),
  mobile: $('mobile-controls'),
};

ui.best.textContent = formatScore(state.best);
const mm = ui.minimap.getContext('2d');

/* --------------------------------------------------------------------------
   WORLD + PLAYER
   -------------------------------------------------------------------------- */
let world = null;
const player = {
  group: createMorty(),
  hp: 100,
  maxHp: 100,
  energy: 12,
  maxEnergy: 12,
  regen: 4.1,
  speed: 5.9,
  radius: 0.42,
  fireCd: 0,
  dashCd: 0,
  dashTime: 0,
  invuln: 0,
  walk: 0,
  recoil: 0,
  facing: Math.PI,
  dead: false,
  moving: 0,
};
player.group.position.set(0, 0.02, 4.2);
player.group.rotation.y = Math.PI;
player.group.scale.setScalar(1.08);
const playerLight = new THREE.PointLight(0x9dff85, 4.2, 4.8, 2);
playerLight.position.set(0, 1.5, 0.2);
player.group.add(playerLight);
const heroMarker = new THREE.Group();
heroMarker.position.set(0, 2.55, 0);
const heroGem = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.11, 0),
  new THREE.MeshBasicMaterial({ color: 0xbaff9d, transparent: true, opacity: 0.9, toneMapped: false })
);
heroGem.rotation.z = Math.PI / 4;
heroMarker.add(heroGem);
const heroGlow = glowSprite(0x7dff5a, 0.9, 0.55);
heroMarker.add(heroGlow);
player.group.add(heroMarker);
heroMarker.visible = false;
scene.add(player.group);

const muzzleLight = new THREE.PointLight(0x83ff62, 0, 5.5, 2);
scene.add(muzzleLight);
let muzzleLightTime = 0;

// Aim reticle on the floor
const reticle = new THREE.Group();
const retMat = new THREE.MeshBasicMaterial({
  color: 0x8dff70, transparent: true, opacity: 0.7,
  blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
});
const retRing = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.4, 32), retMat);
retRing.rotation.x = -Math.PI / 2;
reticle.add(retRing);
for (let i = 0; i < 4; i++) {
  const tick = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.17), retMat);
  tick.rotation.x = -Math.PI / 2;
  tick.rotation.z = (i / 4) * TAU;
  const a = (i / 4) * TAU;
  tick.position.set(Math.cos(a) * 0.51, 0, Math.sin(a) * 0.51);
  reticle.add(tick);
}
const retDot = new THREE.Mesh(new THREE.CircleGeometry(0.035, 12), retMat);
retDot.rotation.x = -Math.PI / 2;
reticle.add(retDot);
reticle.position.y = 0.03;
reticle.visible = false;
scene.add(reticle);

/* --------------------------------------------------------------------------
   ENTITY POOLS
   -------------------------------------------------------------------------- */
const enemies = [];
const shots = [];
const enemyShots = [];
const portals = [];
const pickups = [];
const damageNumbers = [];
const playerProjectileGeo = new THREE.SphereGeometry(0.09, 8, 6);
const playerProjectileMat = new THREE.MeshBasicMaterial({ color: 0xd7ffb0, toneMapped: false });
const playerProjectileGlow = new THREE.SpriteMaterial({
  map: glowTexture,
  color: 0x7dff5a,
  transparent: true,
  opacity: 0.95,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  toneMapped: false,
});
const enemyProjectileGeo = new THREE.SphereGeometry(0.11, 8, 6);
const enemyProjectileMat = new THREE.MeshBasicMaterial({ color: 0xffb1a0, toneMapped: false });
const enemyProjectileGlow = playerProjectileGlow.clone();
enemyProjectileGlow.color.set(0xff334f);

/* --------------------------------------------------------------------------
   INPUT
   -------------------------------------------------------------------------- */
const keys = Object.create(null);
const pointer = { x: 0, y: 0, nx: 0, ny: 0, active: false, aim: new THREE.Vector3(0, 0, -2) };
let firing = false;
let touchFiring = false;
let touchMove = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const ndc = new THREE.Vector2();
const aimHit = new THREE.Vector3();

function updatePointerAim(clientX, clientY) {
  pointer.x = clientX;
  pointer.y = clientY;
  pointer.nx = (clientX / window.innerWidth) * 2 - 1;
  pointer.ny = -(clientY / window.innerHeight) * 2 + 1;
  ndc.set(pointer.nx, pointer.ny);
  raycaster.setFromCamera(ndc, camera);
  if (raycaster.ray.intersectPlane(groundPlane, aimHit)) {
    pointer.aim.copy(aimHit);
    pointer.active = true;
  }
  ui.crosshair.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
}

const canvas = renderer.domElement;
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'mouse') updatePointerAim(e.clientX, e.clientY);
});
canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button === 0) {
    firing = true;
    document.body.classList.add('firing');
    audio.init();
    updatePointerAim(e.clientX, e.clientY);
  }
});
window.addEventListener('pointerup', (e) => {
  if (e.pointerType === 'mouse' && e.button === 0) {
    firing = false;
    document.body.classList.remove('firing');
  }
});
window.addEventListener('pointercancel', () => {
  firing = false;
  touchFiring = false;
  document.body.classList.remove('firing');
  ui.btnFireMobile?.classList.remove('pressed');
});
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  keys[k] = true;
  if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault();
  if (k === 'escape' || k === 'p') {
    e.preventDefault();
    togglePause();
  }
  if (k === 'm') toggleSound();
  if (k === ' ' || k === 'shift') doDash();
  if (k === 'enter' && (state.mode === 'title' || state.mode === 'dead' || state.mode === 'won')) {
    if (state.mode === 'title') startGame();
    else restartGame();
  }
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});
window.addEventListener('blur', () => {
  firing = false;
  touchFiring = false;
  Object.keys(keys).forEach((k) => (keys[k] = false));
  if (state.mode === 'playing') togglePause();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.mode === 'playing') togglePause();
});

// Mobile joystick
let joyId = null;
let joyCenter = { x: 0, y: 0 };
function startJoy(e) {
  if (joyId !== null) return;
  joyId = e.pointerId;
  const r = ui.joyZone.getBoundingClientRect();
  joyCenter.x = r.left + r.width / 2;
  joyCenter.y = r.top + r.height / 2;
  ui.joyZone.setPointerCapture?.(e.pointerId);
  moveJoy(e);
  e.preventDefault();
}
function moveJoy(e) {
  if (e.pointerId !== joyId) return;
  const dx = e.clientX - joyCenter.x;
  const dy = e.clientY - joyCenter.y;
  const max = 42;
  const len = Math.hypot(dx, dy);
  const k = len > max ? max / len : 1;
  const x = dx * k;
  const y = dy * k;
  touchMove.set(x / max, y / max);
  ui.joyKnob.style.transform = `translate(${x}px, ${y}px)`;
  e.preventDefault();
}
function endJoy(e) {
  if (e.pointerId !== joyId) return;
  joyId = null;
  touchMove.set(0, 0);
  ui.joyKnob.style.transform = 'translate(0, 0)';
  e.preventDefault();
}
if (ui.joyZone) {
  ui.joyZone.addEventListener('pointerdown', startJoy);
  ui.joyZone.addEventListener('pointermove', moveJoy);
  ui.joyZone.addEventListener('pointerup', endJoy);
  ui.joyZone.addEventListener('pointercancel', endJoy);
}
if (ui.btnFireMobile) {
  const press = (e) => {
    touchFiring = true;
    ui.btnFireMobile.classList.add('pressed');
    audio.init();
    e.preventDefault();
  };
  const release = (e) => {
    touchFiring = false;
    ui.btnFireMobile.classList.remove('pressed');
    e.preventDefault();
  };
  ui.btnFireMobile.addEventListener('pointerdown', press);
  ui.btnFireMobile.addEventListener('pointerup', release);
  ui.btnFireMobile.addEventListener('pointercancel', release);
  ui.btnFireMobile.addEventListener('pointerleave', release);
}
if (ui.btnDashMobile) ui.btnDashMobile.addEventListener('pointerdown', (e) => { doDash(); e.preventDefault(); });

ui.btnPause.addEventListener('click', () => togglePause());
ui.btnSound.addEventListener('click', () => toggleSound());
ui.btnSoundTitle.addEventListener('click', () => toggleSound());
ui.btnStart.addEventListener('click', () => startGame());
ui.btnResume.addEventListener('click', () => togglePause());
ui.btnRetry.addEventListener('click', () => restartGame());
ui.btnRestartPause.addEventListener('click', () => restartGame());

function toggleSound() {
  audio.init();
  audio.setMuted(!audio.muted);
  state.muted = audio.muted;
}

function isFiring() {
  return (firing || touchFiring) && state.mode === 'playing';
}

/* --------------------------------------------------------------------------
   COLLISION + CAMERA
   -------------------------------------------------------------------------- */
function collideWorld(pos, radius) {
  pos.x = clamp(pos.x, -15.8, 15.8);
  pos.z = clamp(pos.z, -12.55, 12.2);
  for (const o of obstacles) {
    const dx = pos.x - o.x;
    const dz = pos.z - o.z;
    const min = radius + o.r;
    const d2 = dx * dx + dz * dz;
    if (d2 < min * min && d2 > 0.0001) {
      const d = Math.sqrt(d2);
      pos.x = o.x + (dx / d) * min;
      pos.z = o.z + (dz / d) * min;
    }
  }
  pos.x = clamp(pos.x, -15.8, 15.8);
  pos.z = clamp(pos.z, -12.55, 12.2);
}

const cam = {
  titleT: 0,
  target: new THREE.Vector3(0, 1.2, 0),
  desired: new THREE.Vector3(0, 11.2, 14),
  initialized: false,
};
function updateCamera(dt) {
  if (!world) return;
  if (state.mode === 'title' || state.mode === 'loading') {
    cam.titleT += dt;
    const t = cam.titleT;
    cam.desired.set(Math.sin(t * 0.12) * 5.2, 8.7 + Math.sin(t * 0.25) * 0.3, 14.2 + Math.cos(t * 0.09) * 0.6);
    cam.target.set(0, 2.3, -3.2);
    camera.position.lerp(cam.desired, 1 - Math.exp(-2.2 * dt));
    camera.lookAt(cam.target);
    return;
  }
  if (state.mode === 'dying') {
    const p = player.group.position;
    cam.desired.set(p.x + 2.8, 5.5, p.z + 6.4);
    cam.target.lerp(new THREE.Vector3(p.x, 0.7, p.z), 1 - Math.exp(-3.4 * dt));
    camera.position.lerp(cam.desired, 1 - Math.exp(-2.4 * dt));
    camera.lookAt(cam.target);
    return;
  }
  if (state.mode === 'victory') {
    const p = player.group.position;
    cam.titleT += dt;
    cam.desired.set(p.x + Math.sin(cam.titleT * 0.5) * 5.8, 6.2, p.z + 7.2);
    cam.target.lerp(new THREE.Vector3(p.x, 1.6, p.z), 1 - Math.exp(-3 * dt));
    camera.position.lerp(cam.desired, 1 - Math.exp(-2.2 * dt));
    camera.lookAt(cam.target);
    return;
  }
  if (state.mode === 'paused' || state.mode === 'dead' || state.mode === 'won') {
    camera.lookAt(cam.target);
    return;
  }
  const p = player.group.position;
  cam.desired.set(p.x * 0.82, 10.9, p.z + 9.4);
  const look = new THREE.Vector3(p.x, 1.25, p.z - 1.1);
  cam.target.lerp(look, 1 - Math.exp(-7 * dt));
  camera.position.lerp(cam.desired, 1 - Math.exp(-5.2 * dt));
  camera.lookAt(cam.target);
  if (state.shake > 0.001) {
    const s = state.shake;
    camera.position.x += rand(-1, 1) * s * 0.18;
    camera.position.y += rand(-1, 1) * s * 0.12;
    camera.position.z += rand(-1, 1) * s * 0.14;
    state.shake *= Math.exp(-7.5 * dt);
  }
}

/* --------------------------------------------------------------------------
   PLAYER
   -------------------------------------------------------------------------- */
const dashDir = new THREE.Vector3(0, 0, -1);
const moveVec = new THREE.Vector2();
const tmpV = new THREE.Vector3();
const tmpV2 = new THREE.Vector3();
let hpLagValue = 100;
let vignetteTimer = 0;
let toastTimer = 0;
let reticlePulse = 0;

function getMoveInput() {
  let x = 0;
  let z = 0;
  if (keys['a'] || keys['arrowleft']) x -= 1;
  if (keys['d'] || keys['arrowright']) x += 1;
  if (keys['w'] || keys['arrowup']) z -= 1;
  if (keys['s'] || keys['arrowdown']) z += 1;
  if (isTouch) {
    if (touchMove.lengthSq() > 0.015) {
      x = touchMove.x;
      z = touchMove.y;
    }
  }
  moveVec.set(x, z);
  if (moveVec.lengthSq() > 1) moveVec.normalize();
  return moveVec;
}

function nearestEnemy(maxDist = 30) {
  let best = null;
  let bestD = maxDist * maxDist;
  for (const e of enemies) {
    if (e.dead) continue;
    const dx = e.group.position.x - player.group.position.x;
    const dz = e.group.position.z - player.group.position.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  }
  return best;
}

function getAimPoint() {
  if (isTouch) {
    const target = nearestEnemy(26);
    if (target) return target.group.position;
  }
  if (pointer.active) return pointer.aim;
  return tmpV.set(player.group.position.x, 0, player.group.position.z - 8);
}

function doDash() {
  if (state.mode !== 'playing' || player.dead || player.dashCd > 0) return;
  const input = getMoveInput();
  if (input.lengthSq() > 0.05) {
    dashDir.set(input.x, 0, input.y).normalize();
  } else {
    dashDir.set(Math.sin(player.facing), 0, Math.cos(player.facing)).normalize();
  }
  player.dashTime = 0.2;
  player.dashCd = 3.3;
  player.invuln = Math.max(player.invuln, 0.36);
  audio.dash();
  addShake(0.16);
  const p = player.group.position;
  for (let i = 0; i < 18; i++) {
    const pos = new THREE.Vector3(p.x + rand(-0.4, 0.4), rand(0.2, 1.3), p.z + rand(-0.4, 0.4));
    emitParticle(pos, new THREE.Color(0x7dff5a), {
      life: rand(0.2, 0.5), size: rand(4, 10), gravity: 0.4, drag: 4, spread: 1.4,
    });
  }
}

function shoot() {
  if (player.energy < 1 || player.fireCd > 0 || player.dead) return;
  player.energy -= 1;
  player.fireCd = 0.17;
  player.recoil = 1;
  audio.shoot();
  addShake(0.035);
  const ud = player.group.userData;
  ud.muzzle.getWorldPosition(tmpV);
  const aim = getAimPoint();
  const target = tmpV2.set(aim.x, 1.05, aim.z);
  const origin = tmpV.clone();
  const aimTarget = target.clone();
  const dir = target.sub(tmpV).normalize();
  if (dir.lengthSq() < 0.1) dir.set(Math.sin(player.facing), 0, Math.cos(player.facing));
  const group = new THREE.Group();
  const core = new THREE.Mesh(playerProjectileGeo, playerProjectileMat);
  group.add(core);
  const glow = new THREE.Sprite(playerProjectileGlow);
  glow.scale.set(0.65, 0.65, 1);
  group.add(glow);
  group.position.copy(tmpV);
  scene.add(group);
  shots.push({
    group, vel: dir.clone().multiplyScalar(28), life: 1.6, damage: 19,
    trail: 0, radius: 0.18, debug: { origin, aim: aimTarget },
  });
  // muzzle flash
  ud.muzzleGlow.visible = true;
  ud.muzzleGlow.scale.setScalar(rand(0.55, 0.85));
  muzzleLight.position.copy(tmpV);
  muzzleLight.intensity = 20;
  muzzleLightTime = 0.055;
  for (let i = 0; i < 5; i++) {
    emitParticle(tmpV, new THREE.Color(0x9dff72), {
      life: rand(0.1, 0.25), size: rand(3, 7), gravity: 0.3, drag: 5, spread: 0.6,
      vel: dir.clone().multiplyScalar(rand(1, 5)).add(new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1))),
    });
  }
}

function updatePlayer(dt) {
  const p = player.group.position;
  if (pointer.active && !isTouch) updatePointerAim(pointer.x, pointer.y);
  const aim = getAimPoint();
  const targetAngle = Math.atan2(aim.x - p.x, aim.z - p.z);
  player.facing = angleLerp(player.facing, targetAngle, 1 - Math.exp(-14 * dt));
  player.group.rotation.y = player.facing;

  const input = getMoveInput();
  player.moving = input.length();
  let vx = 0;
  let vz = 0;
  if (player.dashTime > 0) {
    player.dashTime -= dt;
    vx = dashDir.x * 15.5;
    vz = dashDir.z * 15.5;
    if (Math.random() < 0.9) {
      emitParticle(new THREE.Vector3(p.x + rand(-0.25, 0.25), rand(0.15, 1.2), p.z + rand(-0.25, 0.25)), new THREE.Color(0x6dff51), {
        life: rand(0.18, 0.4), size: rand(3, 7), gravity: 0.2, drag: 5,
      });
    }
  } else {
    vx = input.x * player.speed;
    vz = input.y * player.speed;
  }
  p.x += vx * dt;
  p.z += vz * dt;
  collideWorld(p, player.radius);

  // Walk / idle animation
  const ud = player.group.userData;
  const speedNorm = clamp(Math.hypot(vx, vz) / player.speed, 0, 1.6);
  player.walk += dt * (4.5 + speedNorm * 5.5) * (speedNorm > 0.08 ? 1 : 0.38);
  const swing = Math.sin(player.walk) * (speedNorm > 0.08 ? 0.62 : 0.06);
  ud.legL.rotation.x = swing;
  ud.legR.rotation.x = -swing;
  ud.armL.rotation.x = -swing * 0.75;
  ud.armR.rotation.x = -1.18 + Math.sin(player.walk * 0.5) * 0.035 - player.recoil * 0.18;
  ud.visual.position.y = 0.05 + Math.abs(Math.sin(player.walk)) * 0.035 * speedNorm + Math.sin(state.time * 2.1) * 0.008;
  ud.head.rotation.z = Math.sin(player.walk * 0.5) * 0.035;
  ud.ring.material.opacity = 0.32 + Math.sin(state.time * 4) * 0.07;
  ud.ring.rotation.z += dt * 1.1;
  heroMarker.position.y = 2.55 + Math.sin(state.time * 3.2) * 0.07;
  heroGem.rotation.y += dt * 2.6;
  player.recoil = Math.max(0, player.recoil - dt * 7);
  if (muzzleLightTime > 0) {
    muzzleLightTime -= dt;
    if (muzzleLightTime <= 0) {
      muzzleLight.intensity = 0;
      ud.muzzleGlow.visible = false;
    }
  }

  player.fireCd = Math.max(0, player.fireCd - dt);
  player.dashCd = Math.max(0, player.dashCd - dt);
  player.invuln = Math.max(0, player.invuln - dt);
  player.energy = Math.min(player.maxEnergy, player.energy + player.regen * dt);
  if (isFiring()) shoot();

  // aim reticle
  reticle.position.set(aim.x, 0.03, aim.z);
  reticle.visible = true;
  reticlePulse += dt;
  const rs = 1 + Math.sin(reticlePulse * 5) * 0.06;
  reticle.scale.setScalar(rs);
  retMat.opacity = 0.52 + Math.sin(reticlePulse * 5) * 0.12;
}

function damagePlayer(amount, source) {
  if (state.mode !== 'playing' || player.dead || player.invuln > 0) return;
  player.hp = Math.max(0, player.hp - amount);
  player.invuln = 0.68;
  vignetteTimer = 0.38;
  addShake(0.5);
  audio.hurt();
  const p = player.group.position;
  burst(new THREE.Vector3(p.x, 1.1, p.z), 0xff4d5d, 16, { life: rand(0.2, 0.6), size: rand(4, 10), spread: 1.6, gravity: 2 });
  // Impact shockwave creates breathing room so the player is never buried.
  for (const e of enemies) {
    if (e.dead) continue;
    const dx = e.group.position.x - p.x;
    const dz = e.group.position.z - p.z;
    const d = Math.max(0.001, Math.hypot(dx, dz));
    if (d < 4.2) {
      e.knock.x += (dx / d) * 7.5;
      e.knock.z += (dz / d) * 7.5;
      e.attackCd = Math.max(e.attackCd, 0.45);
    }
  }
  if (player.hp <= 0) die();
}

function die() {
  if (state.mode !== 'playing') return;
  state.mode = 'dying';
  state.endTimer = 1.55;
  player.dead = true;
  firing = false;
  touchFiring = false;
  document.body.classList.remove('firing');
  audio.kill();
  addShake(0.9);
  const p = player.group.position;
  burst(new THREE.Vector3(p.x, 1, p.z), 0xff5965, 45, { life: rand(0.4, 1.2), size: rand(5, 14), spread: 2.4, gravity: 4 });
}

function winGame() {
  if (state.mode !== 'playing') return;
  state.mode = 'victory';
  state.won = true;
  state.endTimer = 2.15;
  firing = false;
  touchFiring = false;
  document.body.classList.remove('firing');
  const p = player.group.position;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      if (!player.dead) burst(new THREE.Vector3(p.x + rand(-1.5, 1.5), rand(0.5, 3), p.z + rand(-1.5, 1.5)), i === 1 ? 0xf5d33f : 0x7dff5a, 30, {
        life: rand(0.6, 1.4), size: rand(4, 12), spread: 2, gravity: 1.8,
      });
    }, i * 280);
  }
  audio.boss();
}

/* --------------------------------------------------------------------------
   PROJECTILES
   -------------------------------------------------------------------------- */
function segmentDistSq(a, b, p) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const abz = b.z - a.z;
  const apx = p.x - a.x;
  const apy = p.y - a.y;
  const apz = p.z - a.z;
  const denom = abx * abx + aby * aby + abz * abz;
  let t = denom > 0 ? (apx * abx + apy * aby + apz * abz) / denom : 0;
  t = clamp(t, 0, 1);
  const dx = apx - abx * t;
  const dy = apy - aby * t;
  const dz = apz - abz * t;
  return dx * dx + dy * dy + dz * dz;
}

function removeShot(i) {
  const s = shots[i];
  scene.remove(s.group);
  shots.splice(i, 1);
}

function updateShots(dt) {
  for (let i = shots.length - 1; i >= 0; i--) {
    const s = shots[i];
    const prev = s.group.position.clone();
    s.group.position.addScaledVector(s.vel, dt);
    s.life -= dt;
    s.trail -= dt;
    if (s.trail <= 0) {
      s.trail = 0.025;
      emitParticle(s.group.position, new THREE.Color(0x7dff5a), {
        life: rand(0.12, 0.3), size: rand(2.5, 6), gravity: 0, drag: 2, spread: 0.3,
        vel: s.vel.clone().multiplyScalar(-0.03),
      });
    }
    let hit = false;
    for (const e of enemies) {
      if (e.dead) continue;
      const target = tmpV.set(e.group.position.x, e.group.position.y + e.hitY, e.group.position.z);
      if (segmentDistSq(prev, s.group.position, target) < (e.radius + s.radius) * (e.radius + s.radius)) {
        hitEnemy(e, s.damage, target);
        hit = true;
        break;
      }
    }
    if (hit) {
      burst(s.group.position, 0x9dff72, 8, { life: rand(0.12, 0.35), size: rand(3, 8), spread: 1.2, gravity: 1 });
      removeShot(i);
      continue;
    }
    const p = s.group.position;
    if (s.life <= 0 || Math.abs(p.x) > 16.2 || Math.abs(p.z) > 13.3 || p.y < 0.05) {
      burst(p, 0x7dff5a, 4, { life: 0.2, size: 3, spread: 0.6 });
      removeShot(i);
    }
  }
}

function spawnEnemyShot(from, target, damage = 9, speed = 10.5, spread = 0) {
  const dir = target.clone().sub(from).normalize();
  if (spread) {
    dir.x += rand(-spread, spread);
    dir.z += rand(-spread, spread);
    dir.normalize();
  }
  const group = new THREE.Group();
  const core = new THREE.Mesh(enemyProjectileGeo, enemyProjectileMat);
  group.add(core);
  const glow = new THREE.Sprite(enemyProjectileGlow);
  glow.scale.set(0.85, 0.85, 1);
  group.add(glow);
  group.position.copy(from);
  scene.add(group);
  enemyShots.push({ group, vel: dir.multiplyScalar(speed), life: 3.5, damage, trail: 0 });
}

function updateEnemyShots(dt) {
  for (let i = enemyShots.length - 1; i >= 0; i--) {
    const s = enemyShots[i];
    s.group.position.addScaledVector(s.vel, dt);
    s.life -= dt;
    s.trail -= dt;
    if (s.trail <= 0) {
      s.trail = 0.04;
      emitParticle(s.group.position, new THREE.Color(0xff3a51), {
        life: rand(0.15, 0.35), size: rand(2, 5), gravity: 0, drag: 2, spread: 0.4,
      });
    }
    const p = player.group.position;
    const dist = s.group.position.distanceTo(tmpV.set(p.x, 1.0, p.z));
    if (dist < 0.62) {
      damagePlayer(s.damage, s.group.position);
      burst(s.group.position, 0xff4b5f, 12, { life: 0.35, size: 6, spread: 1.3 });
      scene.remove(s.group);
      enemyShots.splice(i, 1);
      continue;
    }
    if (s.life <= 0 || Math.abs(s.group.position.x) > 16.5 || Math.abs(s.group.position.z) > 13.5) {
      scene.remove(s.group);
      enemyShots.splice(i, 1);
    }
  }
}

/* --------------------------------------------------------------------------
   ENEMIES
   -------------------------------------------------------------------------- */
const ENEMY_STATS = {
  grunt: { hp: 38, speed: 2.3, radius: 0.58, damage: 7, range: 2.7, score: 100, hitY: 1.0, cd: 1.25 },
  brute: { hp: 100, speed: 1.45, radius: 0.88, damage: 14, range: 3.1, score: 250, hitY: 1.0, cd: 1.55 },
  floater: { hp: 31, speed: 2.75, radius: 0.55, damage: 8, range: 8.6, score: 150, hitY: 1.35, cd: 2.2 },
  boss: { hp: 760, speed: 1.85, radius: 0.78, damage: 14, range: 19, score: 2500, hitY: 1.3, cd: 1.35 },
};

function spawnEnemy(type, pos, opts = {}) {
  let group;
  if (type === 'boss') group = createEvilMorty();
  else if (type === 'brute') group = createCronenberg();
  else if (type === 'floater') group = createFloater();
  else group = createGromflomite();
  const stats = ENEMY_STATS[type];
  const waveScale = 1 + Math.max(0, state.wave - 1) * 0.075;
  group.position.set(pos.x, type === 'floater' ? 0.18 : 0.02, pos.z);
  group.rotation.y = rand(-Math.PI, Math.PI);
  scene.add(group);
  const baseScale = group.scale.x || 1;
  group.scale.setScalar(0.02);
  const ringColor = type === 'boss' ? 0xff3b51 : type === 'brute' ? 0xff8d68 : type === 'floater' ? 0xb06bff : 0xff5a8d;
  const groundRing = new THREE.Mesh(
    new THREE.RingGeometry(stats.radius * 0.88, stats.radius * 1.02, 32),
    new THREE.MeshBasicMaterial({
      color: ringColor, transparent: true, opacity: 0.34,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    })
  );
  groundRing.rotation.x = -Math.PI / 2;
  groundRing.position.y = 0.02;
  groundRing.userData.noShadow = true;
  group.add(groundRing);
  const mats = [];
  group.traverse((o) => {
    if (o.isMesh && o.material) {
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => {
        if (m && m.emissive && !mats.includes(m)) mats.push(m);
      });
    }
  });
  const e = {
    group, type, hp: stats.hp * waveScale, maxHp: stats.hp * waveScale,
    speed: stats.speed, radius: stats.radius, damage: stats.damage,
    range: stats.range, score: stats.score, hitY: stats.hitY,
    attackCd: rand(0.2, 0.8), shootCd: rand(0.7, 1.8), teleportCd: 5,
    dead: false, deathTime: 0, flash: 0, spawnTime: 0.45, baseScale,
    knock: new THREE.Vector3(), walk: rand(0, 10), mats,
    baseEmissive: mats.map((m) => ({ color: m.emissive.clone(), intensity: m.emissiveIntensity })),
    bossSummoned: false, hpBarShown: false, groundRing,
  };
  if (type === 'boss') {
    e.teleportCd = 6.5;
    e.shootCd = 1.2;
    state.bossSpawned = true;
    ui.bossbar.classList.add('show');
    showBanner('ALVO PRIORITÁRIO', 'MORTY MALIGNO', 'O portal trouxe a pior versão possível.', 3000);
    audio.boss();
    addShake(0.55);
  }
  primeEnemyAnimation(e);
  enemies.push(e);
  burst(new THREE.Vector3(pos.x, type === 'floater' ? 1.3 : 0.8, pos.z), type === 'boss' ? 0xff3b51 : 0x9a64ff, type === 'boss' ? 55 : 20, {
    life: rand(0.3, 0.9), size: rand(4, 12), spread: 1.8, gravity: 1.6,
  });
  return e;
}

function setEnemyFlash(e, on) {
  e.mats.forEach((m, i) => {
    if (on) {
      m.emissive.setRGB(1.2, 0.65, 0.55);
      m.emissiveIntensity = 3.2;
    } else {
      const base = e.baseEmissive[i];
      m.emissive.copy(base.color);
      m.emissiveIntensity = base.intensity;
    }
  });
}

function hitEnemy(e, dmg, point) {
  if (e.dead) return;
  const hitPos = point.clone();
  e.hp -= dmg;
  e.flash = 0.1;
  e.knock.add(new THREE.Vector3(hitPos.x - player.group.position.x, 0, hitPos.z - player.group.position.z).normalize().multiplyScalar(1.8));
  showHitmarker(false);
  floatText(Math.round(dmg), hitPos, '');
  audio.hit();
  burst(hitPos, 0xb9ff88, 7, { life: rand(0.12, 0.35), size: rand(2.5, 6), spread: 1, gravity: 1.5 });
  if (e.hp <= 0) killEnemy(e);
}

function killEnemy(e) {
  if (e.dead) return;
  e.dead = true;
  e.deathTime = 0.36;
  state.kills++;
  state.comboTimer = 3.1;
  const gained = Math.round(e.score * state.combo);
  state.score += gained;
  state.combo = Math.min(5, state.combo + 1);
  showHitmarker(true);
  audio.kill();
  addShake(e.type === 'boss' ? 0.75 : 0.12);
  const p = e.group.position;
  const col = e.type === 'boss' ? 0xff3b51 : e.type === 'brute' ? 0xff9a74 : 0xa56bff;
  burst(new THREE.Vector3(p.x, e.hitY, p.z), col, e.type === 'boss' ? 80 : 28, {
    life: rand(0.35, 1.1), size: rand(4, 13), spread: 2.2, gravity: 3,
  });
  floatText(`+${gained}`, new THREE.Vector3(p.x, e.hitY + 0.7, p.z), 'score');
  if (e.type === 'boss') {
    for (let i = 0; i < 8; i++) {
      spawnPickup(i % 3 === 0 ? 'health' : 'seed', new THREE.Vector3(p.x + rand(-2, 2), 0, p.z + rand(-2, 2)));
    }
    setTimeout(() => {
      if (state.mode === 'playing') {
        burst(new THREE.Vector3(p.x, 1.4, p.z), 0xffb347, 70, { life: rand(0.5, 1.5), size: rand(5, 15), spread: 3, gravity: 2 });
        addShake(0.8);
      }
    }, 180);
  } else if (Math.random() < 0.42) {
    spawnPickup(Math.random() < 0.12 ? 'health' : 'seed', new THREE.Vector3(p.x + rand(-0.4, 0.4), 0, p.z + rand(-0.4, 0.4)));
  }
  if (e.type === 'boss') ui.bossbar.classList.remove('show');
}

function updateEnemies(dt) {
  const pp = player.group.position;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const g = e.group;
    if (e.dead) {
      e.deathTime -= dt;
      const k = clamp(e.deathTime / 0.36, 0, 1);
      g.scale.setScalar(Math.max(0.02, e.baseScale * k));
      g.position.y -= dt * 0.8;
      if (e.deathTime <= 0) {
        scene.remove(g);
        enemies.splice(i, 1);
      }
      continue;
    }
    if (e.spawnTime > 0) {
      e.spawnTime -= dt;
      const k = clamp(1 - e.spawnTime / 0.45, 0, 1);
      const s = e.baseScale * (0.02 + (1.02 - 0.02) * (1 - Math.pow(1 - k, 3)));
      g.scale.setScalar(s);
    }
    if (e.flash > 0) {
      e.flash -= dt;
      if (e.flash <= 0) setEnemyFlash(e, false);
      else setEnemyFlash(e, true);
    }

    const dx = pp.x - g.position.x;
    const dz = pp.z - g.position.z;
    const dist = Math.max(0.001, Math.hypot(dx, dz));
    const nx = dx / dist;
    const nz = dz / dist;
    let moveX = 0;
    let moveZ = 0;
    let speed = e.speed;

    if (e.type === 'boss') {
      if (dist > 8) {
        moveX = nx;
        moveZ = nz;
      } else if (dist < 4.5) {
        moveX = -nx * 0.8;
        moveZ = -nz * 0.8;
      } else {
        moveX = -nz * 0.55;
        moveZ = nx * 0.55;
      }
      e.teleportCd -= dt;
      if (e.teleportCd <= 0 && e.spawnTime <= 0) {
        e.teleportCd = rand(6.5, 9);
        burst(new THREE.Vector3(g.position.x, 1.2, g.position.z), 0xff3b51, 35, { life: 0.5, size: 8, spread: 2 });
        const a = rand(0, TAU);
        g.position.set(clamp(pp.x + Math.cos(a) * 5.5, -13, 13), 0.02, clamp(pp.z + Math.sin(a) * 5.5, -10, 10));
        burst(new THREE.Vector3(g.position.x, 1.2, g.position.z), 0x7dff5a, 35, { life: 0.5, size: 8, spread: 2 });
        addShake(0.25);
      }
      e.shootCd -= dt;
      if (e.shootCd <= 0 && dist < 20) {
        e.shootCd = 1.35;
        const from = new THREE.Vector3(g.position.x, 1.45, g.position.z);
        const target = new THREE.Vector3(pp.x, 0.95, pp.z);
        spawnEnemyShot(from, target, 12, 11.5, 0.06);
        spawnEnemyShot(from, target, 12, 11.5, 0.2);
        spawnEnemyShot(from, target, 12, 11.5, 0.36);
        audio.enemyShoot();
        for (let j = 0; j < 9; j++) emitParticle(from, new THREE.Color(0xff3b51), { life: 0.25, size: 5, spread: 1.2 });
      }
      if (e.hp < e.maxHp * 0.5 && !e.bossSummoned) {
        e.bossSummoned = true;
        for (let j = 0; j < 2; j++) {
          const a = rand(0, TAU);
          spawnEnemy('grunt', { x: clamp(g.position.x + Math.cos(a) * 2.2, -13, 13), z: clamp(g.position.z + Math.sin(a) * 2.2, -10, 10) });
        }
        showToast('ELE ESTÁ CHAMANDO REFORÇOS!', '#ff8a86');
      }
    } else if (e.type === 'floater') {
      if (dist > 7) {
        moveX = nx;
        moveZ = nz;
      } else if (dist < 4) {
        moveX = -nx;
        moveZ = -nz;
      } else {
        moveX = -nz * 0.75;
        moveZ = nx * 0.75;
      }
      e.shootCd -= dt;
      if (e.shootCd <= 0 && dist < 11) {
        e.shootCd = rand(1.9, 2.6);
        spawnEnemyShot(new THREE.Vector3(g.position.x, 1.38, g.position.z), new THREE.Vector3(pp.x, 0.95, pp.z), e.damage, 9.5);
        audio.enemyShoot();
      }
    } else {
      if (dist > e.range * 0.8) {
        moveX = nx;
        moveZ = nz;
      }
    }

    // separation from other enemies
    for (const other of enemies) {
      if (other === e || other.dead) continue;
      const ox = g.position.x - other.group.position.x;
      const oz = g.position.z - other.group.position.z;
      const d2 = ox * ox + oz * oz;
      const min = (e.radius + other.radius) * 0.86;
      if (d2 < min * min && d2 > 0.001) {
        const d = Math.sqrt(d2);
        moveX += (ox / d) * 0.7;
        moveZ += (oz / d) * 0.7;
      }
    }

    e.knock.multiplyScalar(Math.exp(-4 * dt));
    g.position.x += (moveX * speed + e.knock.x) * dt;
    g.position.z += (moveZ * speed + e.knock.z) * dt;
    collideWorld(g.position, e.radius * 0.72);
    // Never let bodies overlap the player; keep the hero readable.
    {
      const px = g.position.x - pp.x;
      const pz = g.position.z - pp.z;
      const pd = Math.hypot(px, pz);
      const minPlayerDist = e.radius + player.radius + 0.9;
      if (pd < minPlayerDist && pd > 0.001) {
        g.position.x = pp.x + (px / pd) * minPlayerDist;
        g.position.z = pp.z + (pz / pd) * minPlayerDist;
      }
    }
    g.rotation.y = angleLerp(g.rotation.y, Math.atan2(dx, dz), 1 - Math.exp(-7 * dt));

    e.walk += dt * (4 + speed);
    animateEnemy(e, dt);

    e.attackCd -= dt;
    if (dist < e.range && e.attackCd <= 0 && e.type !== 'floater' && e.type !== 'boss') {
      e.attackCd = e.type === 'brute' ? 1.5 : 1.15;
      damagePlayer(e.damage, g.position);
      e.knock.set(nx * 5.2, 0, nz * 5.2);
      burst(new THREE.Vector3(pp.x, 0.9, pp.z), 0xff6c62, 12, { life: 0.3, size: 6, spread: 1.3 });
      if (e.type === 'brute') addShake(0.35);
    }
  }
}

function animateEnemy(e, dt) {
  const t = state.time;
  const ud = e.group.userData;
  if (e.groundRing) {
    e.groundRing.material.opacity = 0.24 + Math.sin(t * 5 + e.walk) * 0.1;
    e.groundRing.rotation.z += dt * 0.7;
  }
  if (e.type === 'grunt') {
    ud.legs.forEach((leg, i) => {
      leg.pivot.rotation.x = Math.sin(e.walk + i * 1.7) * 0.36;
      leg.lower.rotation.x = Math.sin(e.walk + i * 1.7 + 1.2) * 0.28;
    });
    e.group.position.y = 0.02 + Math.abs(Math.sin(e.walk * 0.7)) * 0.04;
  } else if (e.type === 'brute') {
    ud.tentacles.forEach((tent, i) => {
      tent.pivot.rotation.z = (tent.baseZ ?? 0) + Math.sin(t * 2.2 + tent.phase) * 0.18;
      tent.pivot.rotation.x = (tent.baseX ?? 0) + Math.cos(t * 1.7 + tent.phase) * 0.14;
    });
    e.group.position.y = 0.02 + Math.sin(t * 2 + e.walk) * 0.018;
  } else if (e.type === 'floater') {
    ud.tentacles.forEach((tent, i) => {
      tent.pivot.rotation.x = (tent.baseX ?? 0) + Math.sin(t * 3 + i) * 0.22;
      tent.pivot.rotation.z = (tent.baseZ ?? 0) + Math.cos(t * 2.4 + i) * 0.18;
    });
    e.group.position.y = 0.2 + Math.sin(t * 2.1 + e.walk) * 0.16;
    ud.aura.material.opacity = 0.35 + Math.sin(t * 3) * 0.1;
  } else if (e.type === 'boss') {
    ud.legL.rotation.x = Math.sin(e.walk) * 0.45;
    ud.legR.rotation.x = -Math.sin(e.walk) * 0.45;
    ud.armL.rotation.x = -Math.sin(e.walk) * 0.3;
    ud.armR.rotation.x = -1.18 + Math.sin(e.walk * 0.7) * 0.08;
    ud.aura.rotation.z += dt * 2.4;
    ud.aura.material.opacity = 0.45 + Math.sin(t * 3) * 0.15;
    ud.redGlow.material.opacity = 0.3 + Math.sin(t * 4) * 0.12;
    e.group.position.y = 0.02 + Math.sin(t * 2.2) * 0.02;
  }
}

// store tentacle base rotations after creation
function primeEnemyAnimation(e) {
  const ud = e.group.userData;
  if (ud.tentacles) {
    ud.tentacles.forEach((t) => {
      t.baseZ = t.pivot.rotation.z;
      t.baseX = t.pivot.rotation.x;
    });
  }
}

/* --------------------------------------------------------------------------
   PORTALS
   -------------------------------------------------------------------------- */
function makePortalMaterial(big) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main(){
        vec2 p=vUv-0.5; float r=length(p)*2.0; float a=atan(p.y,p.x);
        float sw=sin(a*5.0+r*13.0-uTime*4.0)*0.5+0.5;
        float sw2=sin(a*-4.0+r*20.0+uTime*2.2)*0.5+0.5;
        float edge=smoothstep(1.0,0.72,r);
        vec3 col=mix(vec3(0.01,0.1,0.03),vec3(0.12,0.7,0.14),sw*0.85+sw2*0.25);
        col=mix(col,vec3(0.45,1.05,0.35),pow(smoothstep(1.0,0.0,r),7.0));
        gl_FragColor=vec4(col,edge*(0.65+0.22*sin(uTime*3.0+r*7.0)));
      }
    `,
  });
}

function findSpawnPoint(minDist = 6.5) {
  const p = player.group.position;
  for (let i = 0; i < 50; i++) {
    const x = rand(-13.2, 13.2);
    const z = rand(-10.2, 9.5);
    if (Math.hypot(x - p.x, z - p.z) < minDist) continue;
    let ok = true;
    for (const o of obstacles) {
      if (Math.hypot(x - o.x, z - o.z) < o.r + 1.2) { ok = false; break; }
    }
    if (ok) return { x, z };
  }
  return { x: rand(-8, 8), z: rand(-8, 8) };
}

function openPortal(pos, type, big = false) {
  const group = new THREE.Group();
  group.position.set(pos.x, 0.035, pos.z);
  const radius = big ? 2.0 : 1.02;
  const mat = makePortalMaterial(big);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x243f2a, emissive: big ? 0xff3148 : 0x58ff53, emissiveIntensity: 1.0,
    roughness: 0.3, metalness: 0.6,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, big ? 0.15 : 0.09, 10, 48), ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.93, 48), mat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.01;
  group.add(disc);
  const glow = glowSprite(big ? 0xff4158 : 0x7dff5a, radius * 2.7, 0.28);
  glow.position.y = 0.2;
  group.add(glow);
  const light = new THREE.PointLight(big ? 0xff334f : 0x64ff55, big ? 22 : 8, big ? 11 : 5, 2);
  light.position.y = 0.9;
  group.add(light);
  scene.add(group);
  const portal = {
    group, ring, disc, mat, glow, light, type, big, timer: big ? 1.45 : 1.05,
    age: 0, duration: big ? 2.7 : 1.9, spawned: false, radius,
  };
  portals.push(portal);
  return portal;
}

function updatePortals(dt) {
  for (let i = portals.length - 1; i >= 0; i--) {
    const p = portals[i];
    p.age += dt;
    p.timer -= dt;
    p.mat.uniforms.uTime.value = state.time;
    p.ring.rotation.z += dt * (p.big ? 2.8 : 4.2);
    const inK = clamp(p.age / 0.35, 0, 1);
    const outK = p.spawned ? clamp((p.duration - p.age) / 0.45, 0, 1) : 1;
    const scale = (0.15 + 0.85 * (1 - Math.pow(1 - inK, 3))) * outK;
    p.group.scale.setScalar(scale);
    p.glow.material.opacity = 0.32 + Math.sin(state.time * 6) * 0.12;
    if (!p.spawned && p.timer <= 0) {
      p.spawned = true;
      p.age = 0.25;
      spawnEnemy(p.type, { x: p.group.position.x, z: p.group.position.z });
      const burstPos = new THREE.Vector3(p.group.position.x, 0.7, p.group.position.z);
      burst(burstPos, p.big ? 0xff3b51 : 0x7dff5a, p.big ? 50 : 22, {
        life: rand(0.25, 0.8), size: rand(3, 10), spread: 1.7, gravity: 1.2,
      });
      if (!p.big) audio.enemyShoot();
    }
    if (p.spawned && p.age > p.duration) {
      scene.remove(p.group);
      p.group.traverse((o) => {
        if (o.geometry) o.geometry.dispose?.();
        if (o.material && o.material !== p.mat) o.material.dispose?.();
      });
      portals.splice(i, 1);
    }
  }
}

/* --------------------------------------------------------------------------
   PICKUPS
   -------------------------------------------------------------------------- */
function spawnPickup(type, pos) {
  const group = new THREE.Group();
  group.position.set(pos.x, 0.34, pos.z);
  let glow;
  if (type === 'seed') {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xe5c72f, emissive: 0xffd93d, emissiveIntensity: 1.2, roughness: 0.3, metalness: 0.15,
    });
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.23, 0), mat);
    mesh.scale.set(1, 1.5, 1);
    mesh.castShadow = true;
    group.add(mesh);
    glow = glowSprite(0xffd93d, 1.5, 0.55);
    group.add(glow);
  } else if (type === 'health') {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff5364, emissive: 0xff223e, emissiveIntensity: 1.1, roughness: 0.35,
    });
    addBox(group, 0.42, 0.14, 0.14, mat, 0, 0, 0, false, false);
    addBox(group, 0.14, 0.42, 0.14, mat, 0, 0, 0, false, false);
    addBox(group, 0.14, 0.14, 0.42, mat, 0, 0, 0, false, false);
    glow = glowSprite(0xff3b51, 1.8, 0.5);
    group.add(glow);
  } else {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x5ee6ff, emissive: 0x36d7ff, emissiveIntensity: 1.4, roughness: 0.2, metalness: 0.4,
    });
    addCyl(group, 0.12, 0.12, 0.45, 8, mat, 0, 0, 0, false, false);
    glow = glowSprite(0x55e9ff, 1.7, 0.5);
    group.add(glow);
  }
  group.userData.noShadow = true;
  scene.add(group);
  pickups.push({ group, type, age: 0, baseY: 0.34 });
}

function updatePickups(dt) {
  const p = player.group.position;
  for (let i = pickups.length - 1; i >= 0; i--) {
    const u = pickups[i];
    u.age += dt;
    u.group.position.y = u.baseY + Math.sin(state.time * 3 + i) * 0.1;
    u.group.rotation.y += dt * 2.4;
    if (Math.hypot(u.group.position.x - p.x, u.group.position.z - p.z) < 1.15) {
      if (u.type === 'seed') {
        state.seeds++;
        state.score += 50;
        showToast('MEGA SEMENTE +50', '#f5d33f');
        audio.pickup();
        burst(u.group.position, 0xffd93d, 18, { life: 0.5, size: 6, spread: 1.3 });
      } else if (u.type === 'health') {
        player.hp = Math.min(player.maxHp, player.hp + 28);
        showToast('VIDA +28', '#ff8a86');
        audio.heal();
        burst(u.group.position, 0xff6c72, 18, { life: 0.5, size: 6, spread: 1.3 });
      } else {
        player.energy = player.maxEnergy;
        showToast('ENERGIA RECARREGADA', '#5ee6ff');
        audio.pickup();
      }
      scene.remove(u.group);
      pickups.splice(i, 1);
    } else if (u.age > 32) {
      scene.remove(u.group);
      pickups.splice(i, 1);
    }
  }
}

/* --------------------------------------------------------------------------
   WAVES
   -------------------------------------------------------------------------- */
const WAVES = [
  { name: 'ONDA 1', sub: 'Gromflomites na garagem.', spawns: [['grunt', 6]], interval: 1.15, bonus: 500 },
  { name: 'ONDA 2', sub: 'Agora tem coisa pior.', spawns: [['grunt', 5], ['brute', 3]], interval: 1.0, bonus: 750 },
  { name: 'ONDA 3', sub: 'Olhos no teto. Não pisca.', spawns: [['floater', 6], ['grunt', 5]], interval: 0.95, bonus: 1000 },
  { name: 'ONDA 4', sub: 'O multiverso mandou tudo.', spawns: [['grunt', 7], ['brute', 3], ['floater', 4]], interval: 0.85, bonus: 1500 },
  { name: 'ONDA 5', sub: 'Ele veio do portal errado.', spawns: [['grunt', 4], ['boss', 1]], interval: 1.05, bonus: 3000 },
];

function buildWaveQueue(def) {
  const queue = [];
  def.spawns.forEach(([type, count]) => {
    for (let i = 0; i < count; i++) queue.push(type);
  });
  // boss always arrives last
  const boss = queue.filter((t) => t === 'boss');
  const rest = queue.filter((t) => t !== 'boss');
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [...rest, ...boss];
}

function startWave(index) {
  const def = WAVES[index];
  if (!def) return;
  state.wave = index + 1;
  state.waveActive = true;
  state.waveTotal = def.spawns.reduce((a, [, n]) => a + n, 0);
  state.pending = buildWaveQueue(def);
  state.spawnTimer = 1.15;
  state.bossSpawned = false;
  state.bossSummoned = false;
  state.intermission = 0;
  showBanner(`DIMENSÃO C-137`, def.name, def.sub, 2400);
  audio.wave();
  addShake(0.1);
  ui.bossbar.classList.remove('show');
}

function waveComplete() {
  if (!state.waveActive) return;
  state.waveActive = false;
  const def = WAVES[state.wave - 1];
  const bonus = def.bonus + state.wave * 250;
  state.score += bonus;
  state.comboTimer = 0;
  showBanner('SETOR LIMPO', `+${bonus} PONTOS`, state.wave >= WAVES.length ? 'A garagem está segura. Por enquanto.' : 'Recupere o fôlego. E as sementes.', 2600);
  audio.pickup();
  if (state.wave >= WAVES.length) {
    setTimeout(() => { if (state.mode === 'playing') winGame(); }, 650);
  } else {
    state.intermission = 6.5;
    const p = player.group.position;
    spawnPickup('health', new THREE.Vector3(clamp(p.x + 2.2, -12, 12), 0, clamp(p.z + 1.8, -10, 10)));
    spawnPickup('health', new THREE.Vector3(clamp(p.x - 2.5, -12, 12), 0, clamp(p.z - 1.4, -10, 10)));
    for (let i = 0; i < 3; i++) spawnPickup('seed', new THREE.Vector3(rand(-9, 9), 0, rand(-7, 7)));
  }
}

function updateWaves(dt) {
  if (state.comboTimer > 0) {
    state.comboTimer -= dt;
    if (state.comboTimer <= 0) state.combo = 1;
  }
  if (state.intermission > 0) {
    state.intermission -= dt;
    if (state.intermission <= 0) startWave(state.wave);
    return;
  }
  if (!state.waveActive) return;
  state.spawnTimer -= dt;
  const aliveCount = enemies.filter((e) => !e.dead).length;
  const maxAlive = state.wave >= 4 ? 7 : 5;
  if (state.pending.length && state.spawnTimer <= 0 && aliveCount < maxAlive) {
    const type = state.pending.shift();
    const def = WAVES[state.wave - 1];
    const big = type === 'boss';
    openPortal(findSpawnPoint(big ? 8 : 6.5), type, big);
    state.spawnTimer = def.interval * rand(0.78, 1.12);
    if (big) state.spawnTimer += 0.8;
  }
  const alive = enemies.some((e) => !e.dead);
  if (!state.pending.length && !portals.length && !alive) waveComplete();
}

function remainingEnemies() {
  return state.pending.length + portals.length + enemies.filter((e) => !e.dead).length;
}

/* --------------------------------------------------------------------------
   UI
   -------------------------------------------------------------------------- */
const dmgContainer = document.createElement('div');
dmgContainer.id = 'damage-numbers';
$('ui').appendChild(dmgContainer);

function floatText(text, worldPos, cls = '') {
  const v = worldPos.clone();
  v.y += 0.55;
  v.project(camera);
  if (v.z > 1 || v.z < -1) return;
  const el = document.createElement('div');
  el.className = `damage-number ${cls}`;
  el.textContent = text;
  el.style.left = `${(v.x * 0.5 + 0.5) * window.innerWidth + rand(-10, 10)}px`;
  el.style.top = `${(-v.y * 0.5 + 0.5) * window.innerHeight + rand(-6, 6)}px`;
  dmgContainer.appendChild(el);
  setTimeout(() => el.remove(), 820);
}

let hitmarkerTimer = null;
function showHitmarker(kill) {
  ui.hitmarker.classList.remove('show', 'kill');
  void ui.hitmarker.offsetWidth;
  ui.hitmarker.classList.add('show');
  if (kill) ui.hitmarker.classList.add('kill');
  clearTimeout(hitmarkerTimer);
  hitmarkerTimer = setTimeout(() => ui.hitmarker.classList.remove('show', 'kill'), 240);
}

let bannerTimer = null;
function showBanner(kicker, title, sub, duration = 2500) {
  ui.bannerKicker.textContent = kicker;
  ui.bannerTitle.textContent = title;
  ui.bannerSub.textContent = sub;
  ui.banner.classList.remove('show');
  void ui.banner.offsetWidth;
  ui.banner.classList.add('show');
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => ui.banner.classList.remove('show'), duration);
}

function showToast(text, color = '#f5d33f') {
  ui.toast.textContent = text;
  ui.toast.style.color = color;
  ui.toast.style.borderColor = `${color}44`;
  ui.toast.classList.add('show');
  toastTimer = 1.8;
}

function updateHUD(dt) {
  const hp = clamp(player.hp / player.maxHp, 0, 1);
  hpLagValue = lerp(hpLagValue, player.hp, 1 - Math.exp(-3 * dt));
  ui.hpFill.style.transform = `scaleX(${hp})`;
  ui.hpLag.style.transform = `scaleX(${clamp(hpLagValue / player.maxHp, 0, 1)})`;
  ui.hpValue.textContent = Math.ceil(player.hp);
  const en = clamp(player.energy / player.maxEnergy, 0, 1);
  ui.energy.style.transform = `scaleX(${en})`;
  ui.energyLabel.textContent = `ENERGIA ${Math.floor(player.energy)}/${player.maxEnergy}`;
  ui.dashStatus.textContent = player.dashCd <= 0 ? 'DASH PRONTO' : `DASH ${player.dashCd.toFixed(1)}s`;
  ui.dashStatus.classList.toggle('ready', player.dashCd <= 0);
  if (ui.btnDashMobile) ui.btnDashMobile.classList.toggle('cooldown', player.dashCd > 0);

  ui.score.textContent = formatScore(state.score);
  ui.seeds.textContent = String(state.seeds).padStart(2, '0');
  ui.comboValue.textContent = `x${state.combo}`;
  ui.combo.classList.toggle('active', state.combo > 1 && state.comboTimer > 0);

  if (state.intermission > 0) {
    ui.waveTitle.textContent = 'INTERVALO';
    ui.enemiesLeft.textContent = `PRÓXIMA EM ${Math.ceil(state.intermission)}s`;
  } else {
    ui.waveTitle.textContent = `ONDA ${String(Math.max(1, state.wave)).padStart(2, '0')}`;
    ui.enemiesLeft.textContent = `${remainingEnemies()} HOSTIS`;
  }

  const boss = enemies.find((e) => e.type === 'boss' && !e.dead);
  if (boss) {
    ui.bossbar.classList.add('show');
    ui.bossFill.style.transform = `scaleX(${clamp(boss.hp / boss.maxHp, 0, 1)})`;
  } else {
    ui.bossbar.classList.remove('show');
  }

  if (vignetteTimer > 0) {
    vignetteTimer -= dt;
    ui.vignette.style.opacity = String(clamp(vignetteTimer / 0.38, 0, 1) * 0.85);
  } else {
    ui.vignette.style.opacity = '0';
  }
  if (toastTimer > 0) {
    toastTimer -= dt;
    if (toastTimer <= 0) ui.toast.classList.remove('show');
  }
  if (state.mode === 'playing') {
    state.hintTimer -= dt;
    if (state.hintTimer < 0) ui.hint.classList.add('fade');
  }
  if (state.time - state.lastMinimap > 0.1) {
    state.lastMinimap = state.time;
    drawMinimap();
  }
}

function drawMinimap() {
  const w = ui.minimap.width;
  const h = ui.minimap.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = w / 2 - 5;
  mm.clearRect(0, 0, w, h);
  mm.save();
  mm.beginPath();
  mm.arc(cx, cy, r, 0, TAU);
  mm.clip();
  mm.fillStyle = 'rgba(5, 18, 12, .88)';
  mm.fillRect(0, 0, w, h);
  mm.strokeStyle = 'rgba(125, 255, 90, .12)';
  mm.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    mm.beginPath();
    mm.moveTo(cx + i * 30, 0);
    mm.lineTo(cx + i * 30, h);
    mm.stroke();
    mm.beginPath();
    mm.moveTo(0, cy + i * 30);
    mm.lineTo(w, cy + i * 30);
    mm.stroke();
  }
  mm.strokeStyle = 'rgba(125, 255, 90, .34)';
  mm.lineWidth = 2;
  mm.beginPath();
  mm.arc(cx, cy, r, 0, TAU);
  mm.stroke();
  const sx = (r * 0.9) / 16;
  const sz = (r * 0.9) / 13;
  const p = player.group.position;
  // portals
  for (const portal of portals) {
    mm.fillStyle = portal.big ? '#ff3b51' : '#7dff5a';
    mm.beginPath();
    mm.arc(cx + portal.group.position.x * sx, cy + portal.group.position.z * sz, portal.big ? 5 : 3.2, 0, TAU);
    mm.fill();
  }
  // enemies
  for (const e of enemies) {
    if (e.dead) continue;
    mm.fillStyle = e.type === 'boss' ? '#ff3b51' : e.type === 'brute' ? '#ff9b72' : e.type === 'floater' ? '#b486ff' : '#ff6870';
    mm.beginPath();
    mm.arc(cx + e.group.position.x * sx, cy + e.group.position.z * sz, e.type === 'boss' ? 5 : 2.6, 0, TAU);
    mm.fill();
  }
  // player
  mm.save();
  mm.translate(cx + p.x * sx, cy + p.z * sz);
  mm.rotate(-player.group.rotation.y + Math.PI);
  mm.fillStyle = '#f5d33f';
  mm.shadowColor = '#f5d33f';
  mm.shadowBlur = 8;
  mm.beginPath();
  mm.moveTo(0, -7);
  mm.lineTo(5, 5);
  mm.lineTo(0, 2.5);
  mm.lineTo(-5, 5);
  mm.closePath();
  mm.fill();
  mm.restore();
  mm.restore();
  // outer ring ticks
  mm.strokeStyle = 'rgba(125, 255, 90, .28)';
  mm.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU;
    mm.beginPath();
    mm.moveTo(cx + Math.cos(a) * (r - 2), cy + Math.sin(a) * (r - 2));
    mm.lineTo(cx + Math.cos(a) * (r + 1), cy + Math.sin(a) * (r + 1));
    mm.stroke();
  }
}

/* --------------------------------------------------------------------------
   GAME FLOW
   -------------------------------------------------------------------------- */
function hideScreen(el) {
  if (!el || !el.classList.contains('visible')) return;
  el.classList.add('leaving');
  setTimeout(() => {
    el.classList.remove('visible', 'leaving');
  }, 450);
}
function showScreen(el) {
  if (!el) return;
  el.classList.add('visible');
}

function clearEntities() {
  for (const e of enemies) scene.remove(e.group);
  for (const s of shots) scene.remove(s.group);
  for (const s of enemyShots) scene.remove(s.group);
  for (const p of portals) scene.remove(p.group);
  for (const p of pickups) scene.remove(p.group);
  enemies.length = 0;
  shots.length = 0;
  enemyShots.length = 0;
  portals.length = 0;
  pickups.length = 0;
  dmgContainer.innerHTML = '';
  ui.bossbar.classList.remove('show');
}

function resetGame() {
  clearEntities();
  player.hp = player.maxHp;
  player.energy = player.maxEnergy;
  player.fireCd = 0;
  player.dashCd = 0;
  player.dashTime = 0;
  player.invuln = 0;
  player.dead = false;
  player.facing = Math.PI;
  player.group.position.set(0, 0.02, 4.2);
  player.group.rotation.set(0, Math.PI, 0);
  player.group.visible = true;
  hpLagValue = player.maxHp;
  state.score = 0;
  state.wave = 0;
  state.waveTotal = 0;
  state.waveActive = false;
  state.intermission = 0;
  state.pending = [];
  state.spawnTimer = 0;
  state.kills = 0;
  state.seeds = 0;
  state.combo = 1;
  state.comboTimer = 0;
  state.shake = 0;
  state.endTimer = 0;
  state.won = false;
  state.bossSpawned = false;
  state.bossSummoned = false;
  state.hintTimer = 11;
  vignetteTimer = 0;
  toastTimer = 0;
  ui.vignette.style.opacity = '0';
  ui.toast.classList.remove('show');
  ui.hint.classList.remove('fade');
  ui.banner.classList.remove('show');
  ui.end.classList.remove('visible', 'win');
  ui.pause.classList.remove('visible');
  reticle.visible = true;
  audio.musicNext = 0;
}

function startGame() {
  audio.init();
  if (audio.muted) audio.setMuted(true);
  resetGame();
  state.mode = 'playing';
  state.started = true;
  heroMarker.visible = true;
  document.body.classList.add('playing');
  hideScreen(ui.title);
  hideScreen(ui.end);
  ui.pause.classList.remove('visible');
  camera.position.set(player.group.position.x, 10.9, player.group.position.z + 9.4);
  cam.target.set(player.group.position.x, 1.25, player.group.position.z - 1.1);
  startWave(0);
  updateHUD(0.016);
}

function restartGame() {
  hideScreen(ui.end);
  startGame();
}

function togglePause() {
  if (state.mode === 'playing') {
    state.mode = 'paused';
    firing = false;
    touchFiring = false;
    document.body.classList.remove('firing');
    showScreen(ui.pause);
    audio.ui();
  } else if (state.mode === 'paused') {
    state.mode = 'playing';
    hideScreen(ui.pause);
    audio.ui();
  }
}

function showEnd(win) {
  state.mode = win ? 'won' : 'dead';
  state.won = win;
  document.body.classList.remove('playing');
  document.body.classList.remove('firing');
  reticle.visible = false;
  heroMarker.visible = false;
  const endWave = win ? WAVES.length : Math.max(1, state.wave);
  ui.endKicker.textContent = win ? 'MULTIVERSO SALVO' : 'SINAL PERDIDO';
  ui.endTitle.textContent = win ? 'VITÓRIA!' : 'GAME OVER';
  ui.endCopy.textContent = win
    ? 'Wubba lubba dub dub! A garagem está limpa e o Morty Maligno foi mandado de volta pro seu universo.'
    : 'Aww geez... a garagem venceu essa. Respira, recalibra a arma e tenta de novo.';
  ui.endScore.textContent = formatScore(state.score);
  ui.endWave.textContent = `${endWave}/${WAVES.length}`;
  ui.endSeeds.textContent = String(state.seeds);
  ui.end.classList.toggle('win', win);
  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem('portal-panic-best', String(state.best));
    ui.best.textContent = formatScore(state.best);
  }
  showScreen(ui.end);
  audio.ui();
}

/* --------------------------------------------------------------------------
   BOOT + LOOP
   -------------------------------------------------------------------------- */
async function boot() {
  await document.fonts.ready;
  world = buildWorld();
  state.mode = 'title';
  ui.best.textContent = formatScore(state.best);
  ui.loading.classList.add('hidden');
  setTimeout(() => {
    if (state.mode === 'title') showScreen(ui.title);
  }, 280);
  setTimeout(() => ui.loading.remove(), 1000);
  // prime all stored animation bases
  // (enemies are primed when spawned)
  window.__portalPanic = {
    state, player, enemies, shots, camera, startGame, restartGame, togglePause,
    getFiring: () => firing,
    get world() { return world; },
  };
  let last = performance.now();
  function animate(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    state.time += dt;
    if (world) updateWorld(world, dt, state.time);
    updateDust(state.time);

    if (state.mode === 'playing') {
      updatePlayer(dt);
      updateShots(dt);
      updateEnemyShots(dt);
      updateEnemies(dt);
      updatePortals(dt);
      updatePickups(dt);
      updateWaves(dt);
    } else if (state.mode === 'dying') {
      state.endTimer -= dt;
      player.group.rotation.z = lerp(player.group.rotation.z, 1.35, 1 - Math.exp(-3.5 * dt));
      player.group.position.y = lerp(player.group.position.y, 0.25, 1 - Math.exp(-3 * dt));
      if (state.endTimer <= 0) showEnd(false);
    } else if (state.mode === 'victory') {
      state.endTimer -= dt;
      if (state.endTimer <= 0) showEnd(true);
    } else if (state.mode === 'title') {
      // idle player and portal atmosphere
      const ud = player.group.userData;
      ud.visual.position.y = 0.05 + Math.sin(state.time * 1.8) * 0.01;
      ud.legL.rotation.x = 0;
      ud.legR.rotation.x = 0;
      ud.armL.rotation.x = 0;
      ud.armR.rotation.x = -1.18;
      ud.head.rotation.y = Math.sin(state.time * 0.7) * 0.12;
      ud.ring.rotation.z += dt * 0.7;
    }

    updateParticles(dt);
    updateCamera(dt);
    updateHUD(dt);
    audio.updateMusic(state.mode === 'playing');
    composer.render();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

boot();


