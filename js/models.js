import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, markShadows, glowSprite, rand, TAU,
} from './core.js';

/* ==========================================================================
   CHARACTERS
   Everything is built from primitives — chunky, readable, animated.
   ========================================================================== */

function uniqueStandard(color, roughness = 0.8, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

export function createMorty({ evil = false, scale = 1 } = {}) {
  const root = new THREE.Group();
  const visual = new THREE.Group();
  visual.position.y = 0.05;
  root.add(visual);

  const skin = uniqueStandard(evil ? 0xe7b18b : 0xf1c39b, 0.82, 0);
  const skinShade = uniqueStandard(evil ? 0xd79b78 : 0xe3b28b, 0.86, 0);
  const shirt = uniqueStandard(evil ? 0xe0cb3d : 0xf5d33f, 0.88, 0);
  const pants = uniqueStandard(evil ? 0x304a72 : 0x3d5e9c, 0.9, 0);
  const shoe = uniqueStandard(0x161a18, 0.72, 0.05);
  const hair = uniqueStandard(evil ? 0x3a2217 : 0x744327, 0.94, 0);
  const white = uniqueStandard(0xf6f5e9, 0.55, 0);
  const black = uniqueStandard(0x111311, 0.55, 0.1);
  const metal = uniqueStandard(0xa9b9b4, 0.32, 0.7);
  const green = new THREE.MeshStandardMaterial({
    color: 0x143d22, emissive: 0x6bff58, emissiveIntensity: 2.4, roughness: 0.25, metalness: 0.2,
  });

  // Torso and hips
  const torso = addCyl(visual, 0.27, 0.33, 0.72, 8, shirt, 0, 1.16, 0);
  torso.scale.z = 0.82;
  addBox(visual, 0.43, 0.18, 0.28, pants, 0, 0.78, 0);
  addCyl(visual, 0.105, 0.105, 0.12, 8, skinShade, 0, 1.54, 0);

  // Collar
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 14, Math.PI), white);
  collar.position.set(0, 1.5, 0.02);
  collar.rotation.x = Math.PI / 2;
  visual.add(collar);

  // Head
  const head = new THREE.Group();
  head.position.set(0, 1.78, 0.02);
  visual.add(head);
  const skull = addSphere(head, 0.335, skin, 0, 0, 0, 1, 1.08, 0.94);
  // Ears
  addSphere(head, 0.075, skinShade, -0.33, -0.01, 0, 0.55, 1, 0.8);
  addSphere(head, 0.075, skinShade, 0.33, -0.01, 0, 0.55, 1, 0.8);

  // Big Morty eyes
  const eyeL = addSphere(head, 0.118, white, -0.125, 0.045, 0.245, 1, 1.18, 0.62);
  const eyeR = addSphere(head, 0.118, white, 0.125, 0.045, 0.245, 1, 1.18, 0.62);
  const pupilL = addSphere(head, 0.047, black, -0.122, 0.04, 0.326, 1, 1.08, 0.55);
  const pupilR = addSphere(head, 0.047, black, 0.128, 0.04, 0.326, 1, 1.08, 0.55);
  pupilL.userData.noShadow = pupilR.userData.noShadow = true;
  // eyebrows
  addBox(head, 0.15, 0.024, 0.03, hair, -0.125, 0.18, 0.29).rotation.z = -0.12;
  addBox(head, 0.15, 0.024, 0.03, hair, 0.125, 0.18, 0.29).rotation.z = 0.12;
  // nose
  addSphere(head, 0.045, skinShade, 0, -0.04, 0.335, 0.75, 1.1, 1.3);
  // mouth
  addBox(head, 0.16, 0.022, 0.022, skinShade, 0, -0.155, 0.302).rotation.z = 0.03;

  // Hair cap and messy tufts
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.345, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.54),
    hair
  );
  cap.position.set(0, 0.055, -0.012);
  cap.rotation.x = -0.06;
  cap.castShadow = true;
  head.add(cap);
  const tuftPositions = [
    [-0.19, 0.28, 0.15, 0.11], [0.18, 0.3, 0.12, 0.1], [0, 0.35, 0.08, 0.12],
    [-0.3, 0.18, -0.03, 0.1], [0.29, 0.2, -0.04, 0.1], [-0.1, 0.28, -0.2, 0.11],
    [0.12, 0.26, -0.22, 0.1],
  ];
  tuftPositions.forEach(([x, y, z, r], i) => {
    const t = addSphere(head, r, hair, x, y, z, 1.25, 0.65, 1);
    t.rotation.set(rand(-0.4, 0.4), rand(0, 3), rand(-0.4, 0.4));
  });
  addBox(head, 0.06, 0.2, 0.06, hair, -0.29, 0.02, -0.09).rotation.z = -0.25;
  addBox(head, 0.06, 0.18, 0.06, hair, 0.29, 0.03, -0.08).rotation.z = 0.25;

  // Evil Morty details
  if (evil) {
    const patch = addBox(head, 0.19, 0.13, 0.025, black, -0.12, 0.045, 0.34);
    patch.rotation.z = -0.1;
    addBox(head, 0.58, 0.03, 0.04, black, 0, 0.12, 0.28).rotation.z = -0.12;
    addSphere(head, 0.025, new THREE.MeshStandardMaterial({
      color: 0x400000, emissive: 0xff2738, emissiveIntensity: 4, roughness: 0.2,
    }), 0.128, 0.045, 0.35, 1, 1, 0.5);
    // collar popped
    addBox(visual, 0.12, 0.26, 0.06, black, -0.19, 1.47, 0.13).rotation.z = -0.25;
    addBox(visual, 0.12, 0.26, 0.06, black, 0.19, 1.47, 0.13).rotation.z = 0.25;
  }

  // Legs
  function makeLeg(x) {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.76, 0);
    visual.add(pivot);
    addCyl(pivot, 0.105, 0.09, 0.4, 8, pants, 0, -0.2, 0);
    addCyl(pivot, 0.09, 0.075, 0.35, 8, pants, 0, -0.56, 0);
    addCyl(pivot, 0.092, 0.092, 0.07, 8, white, 0, -0.745, 0);
    addBox(pivot, 0.23, 0.13, 0.36, shoe, 0, -0.82, 0.07);
    return pivot;
  }
  const legL = makeLeg(-0.175);
  const legR = makeLeg(0.175);

  // Arms
  function makeArm(x, side) {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.42, 0);
    visual.add(pivot);
    addCyl(pivot, 0.1, 0.095, 0.17, 8, shirt, 0, -0.07, 0);
    addCyl(pivot, 0.077, 0.07, 0.36, 8, skin, 0, -0.31, 0);
    addSphere(pivot, 0.092, skin, 0, -0.52, 0, 1, 1.1, 0.9);
    pivot.rotation.z = side * 0.08;
    return pivot;
  }
  const armL = makeArm(-0.36, -1);
  const armR = makeArm(0.36, 1);
  armR.rotation.x = -1.18;
  armR.rotation.z = -0.14;

  // Portal gun
  const gun = new THREE.Group();
  gun.position.set(0.37, 1.16, 0.44);
  visual.add(gun);
  addBox(gun, 0.17, 0.16, 0.42, metal, 0, 0, 0.08);
  const barrel = addCyl(gun, 0.052, 0.065, 0.34, 10, metal, 0, 0, 0.42);
  barrel.rotation.x = Math.PI / 2;
  const core = addSphere(gun, 0.085, green, 0, 0.01, 0.13, 1, 1, 1);
  const handle = addBox(gun, 0.105, 0.22, 0.11, metal, 0, -0.14, -0.02);
  handle.rotation.x = -0.28;
  addBox(gun, 0.18, 0.035, 0.08, black, 0, 0.085, 0.02);
  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0, 0.61);
  gun.add(muzzle);
  const gunGlow = glowSprite(0x7dff5a, 0.55, 0.8);
  gunGlow.position.copy(core.position);
  gun.add(gunGlow);
  const muzzleGlow = glowSprite(0xbaff9d, 0.7, 0.9);
  muzzleGlow.position.copy(muzzle.position);
  muzzleGlow.visible = false;
  gun.add(muzzleGlow);

  // Ground ring
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.59, 42),
    new THREE.MeshBasicMaterial({
      color: 0x7dff5a, transparent: true, opacity: 0.42,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.025;
  root.add(ring);

  root.scale.setScalar(scale);
  root.userData = {
    visual, legL, legR, armL, armR, head, gun, core, muzzle, muzzleGlow, ring, mats: [],
    walk: 0, recoil: 0, flash: 0,
  };
  markShadows(visual);
  gunGlow.userData.noShadow = muzzleGlow.userData.noShadow = ring.userData.noShadow = true;
  return root;
}

export function createRick() {
  const root = new THREE.Group();
  const visual = new THREE.Group();
  root.add(visual);
  const skin = uniqueStandard(0xf0c4a0, 0.8, 0);
  const coat = uniqueStandard(0xe8eee7, 0.72, 0.02);
  const coatShade = uniqueStandard(0xc8d2ca, 0.78, 0.02);
  const pants = uniqueStandard(0x5b4130, 0.9, 0);
  const hair = uniqueStandard(0x7da9c6, 0.86, 0);
  const blue = uniqueStandard(0x3b7f9f, 0.8, 0.05);
  const black = uniqueStandard(0x141714, 0.55, 0.08);
  const white = uniqueStandard(0xf7f6e9, 0.5, 0);
  const green = new THREE.MeshStandardMaterial({
    color: 0x143d22, emissive: 0x7dff5a, emissiveIntensity: 2.5, roughness: 0.2,
  });

  // legs
  addCyl(visual, 0.115, 0.1, 0.72, 8, pants, -0.18, 0.42, 0);
  addCyl(visual, 0.115, 0.1, 0.72, 8, pants, 0.18, 0.42, 0);
  addBox(visual, 0.24, 0.12, 0.38, black, -0.18, 0.05, 0.08);
  addBox(visual, 0.24, 0.12, 0.38, black, 0.18, 0.05, 0.08);

  // lab coat body
  addCyl(visual, 0.34, 0.43, 1.12, 8, coat, 0, 1.16, 0);
  addBox(visual, 0.12, 0.95, 0.03, coatShade, -0.12, 1.1, 0.36);
  addBox(visual, 0.12, 0.95, 0.03, coatShade, 0.12, 1.1, 0.36);
  addBox(visual, 0.28, 0.17, 0.32, blue, 0, 1.34, 0.03);
  addBox(visual, 0.06, 0.58, 0.02, black, 0, 1.18, 0.385);
  // pockets + tools
  addBox(visual, 0.18, 0.16, 0.03, coatShade, -0.23, 0.95, 0.36);
  addBox(visual, 0.18, 0.16, 0.03, coatShade, 0.23, 0.95, 0.36);
  addCyl(visual, 0.02, 0.02, 0.24, 5, black, 0.23, 1.1, 0.39).rotation.z = 0.2;

  // head
  const head = new THREE.Group();
  head.position.set(0, 1.9, 0.03);
  visual.add(head);
  addSphere(head, 0.34, skin, 0, 0, 0, 0.92, 1.15, 0.9);
  addSphere(head, 0.085, skin, -0.33, 0, 0, 0.6, 1, 0.8);
  addSphere(head, 0.085, skin, 0.33, 0, 0, 0.6, 1, 0.8);
  // eyes
  addSphere(head, 0.105, white, -0.12, 0.05, 0.255, 1, 1, 0.6);
  addSphere(head, 0.105, white, 0.12, 0.05, 0.255, 1, 1, 0.6);
  addSphere(head, 0.042, black, -0.115, 0.05, 0.33, 1, 1, 0.55);
  addSphere(head, 0.042, black, 0.125, 0.05, 0.33, 1, 1, 0.55);
  // unibrow
  addBox(head, 0.38, 0.045, 0.04, hair, 0, 0.18, 0.3).rotation.z = -0.03;
  // nose
  addSphere(head, 0.05, skin, 0, -0.06, 0.335, 0.7, 1.1, 1.3);
  addBox(head, 0.15, 0.025, 0.025, skin, 0, -0.18, 0.305).rotation.z = 0.15;
  // hair spikes
  const spikeGeo = new THREE.ConeGeometry(0.12, 0.42, 6);
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Mesh(spikeGeo, hair);
    const a = (i / 8) * Math.PI * 2;
    s.position.set(Math.cos(a) * 0.17, 0.3 + Math.sin(a * 2) * 0.05, Math.sin(a) * 0.12 - 0.03);
    s.rotation.set(Math.sin(a) * 0.55, a, -Math.cos(a) * 0.7);
    s.castShadow = true;
    head.add(s);
  }
  // drool
  const drool = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.014, 0.2, 5),
    new THREE.MeshStandardMaterial({ color: 0xb9e8d2, roughness: 0.25, metalness: 0.1 })
  );
  drool.position.set(0.1, -0.23, 0.29);
  head.add(drool);

  // arms
  addCyl(visual, 0.09, 0.08, 0.62, 8, coat, -0.42, 1.32, 0).rotation.z = -0.13;
  addCyl(visual, 0.09, 0.08, 0.62, 8, coat, 0.42, 1.32, 0).rotation.z = 0.13;
  addSphere(visual, 0.08, skin, -0.49, 1.0, 0.04);
  addSphere(visual, 0.08, skin, 0.49, 1.0, 0.04);
  // flask
  const flask = new THREE.Group();
  flask.position.set(0.53, 1.02, 0.14);
  visual.add(flask);
  addSphere(flask, 0.1, green, 0, 0, 0, 0.8, 1.2, 0.8);
  addCyl(flask, 0.04, 0.04, 0.13, 6, white, 0, 0.14, 0);

  root.userData = { visual, head, flask };
  markShadows(visual);
  return root;
}

/* --------------------------------------------------------------------------
   ENEMIES
   -------------------------------------------------------------------------- */
export function createGromflomite() {
  const root = new THREE.Group();
  const bodyMat = uniqueStandard(0x75449b, 0.58, 0.16);
  const darkMat = uniqueStandard(0x34234b, 0.7, 0.18);
  const shellMat = uniqueStandard(0x9b62c1, 0.48, 0.25);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffc32e, emissive: 0xff8a00, emissiveIntensity: 1.8, roughness: 0.25 });
  const pupilMat = uniqueStandard(0x1a1006, 0.5, 0);
  const metalMat = uniqueStandard(0x697c78, 0.35, 0.75);
  const legs = [];
  const mats = [bodyMat, darkMat, shellMat, metalMat];

  const body = addSphere(root, 0.5, bodyMat, 0, 0.84, 0, 1.15, 0.83, 1.28);
  body.rotation.x = 0.08;
  // shell segments
  for (let i = 0; i < 3; i++) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.45 - i * 0.035, 0.055, 6, 18, Math.PI * 1.3), shellMat);
    band.position.set(0, 0.88 + i * 0.13, -0.02);
    band.rotation.set(Math.PI / 2, 0.2, -0.2);
    band.castShadow = true;
    root.add(band);
  }
  // head
  addSphere(root, 0.34, bodyMat, 0, 1.23, 0.32, 1, 0.9, 1);
  addSphere(root, 0.22, darkMat, 0, 1.18, 0.57, 1, 0.7, 0.6);
  // four eyes
  const eyes = [
    [-0.13, 1.37, 0.59, 0.065], [0.13, 1.37, 0.59, 0.065],
    [-0.07, 1.28, 0.66, 0.05], [0.07, 1.28, 0.66, 0.05],
  ];
  eyes.forEach(([x, y, z, r]) => {
    addSphere(root, r, eyeMat, x, y, z, 1, 1, 0.7);
    addSphere(root, r * 0.43, pupilMat, x, y, z + r * 0.55, 1, 1, 0.5);
  });
  // mandibles
  addCyl(root, 0.018, 0.045, 0.2, 5, darkMat, -0.11, 1.03, 0.62).rotation.x = -0.9;
  addCyl(root, 0.018, 0.045, 0.2, 5, darkMat, 0.11, 1.03, 0.62).rotation.x = -0.9;
  // antennae
  addCyl(root, 0.012, 0.02, 0.5, 5, darkMat, -0.15, 1.54, 0.36).rotation.z = -0.3;
  addCyl(root, 0.012, 0.02, 0.5, 5, darkMat, 0.15, 1.54, 0.36).rotation.z = 0.3;
  addSphere(root, 0.035, eyeMat, -0.23, 1.76, 0.36);
  addSphere(root, 0.035, eyeMat, 0.23, 1.76, 0.36);

  // six legs
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.35, 0.74, (i - 1) * 0.32);
      root.add(pivot);
      const upper = addCyl(pivot, 0.05, 0.045, 0.5, 5, darkMat, 0, -0.23, 0);
      const lower = new THREE.Group();
      lower.position.set(0, -0.47, 0);
      pivot.add(lower);
      addCyl(lower, 0.038, 0.025, 0.42, 5, darkMat, 0, -0.2, 0);
      addSphere(lower, 0.055, bodyMat, 0, -0.42, 0.02);
      pivot.rotation.z = side * 0.95;
      lower.rotation.z = -side * 0.55;
      legs.push({ pivot, lower, side, i });
    }
  }
  // arms + blaster
  addCyl(root, 0.055, 0.05, 0.38, 6, bodyMat, -0.46, 1.05, 0.16).rotation.z = -0.7;
  addCyl(root, 0.055, 0.05, 0.38, 6, bodyMat, 0.46, 1.05, 0.16).rotation.z = 0.7;
  addBox(root, 0.1, 0.1, 0.42, metalMat, -0.62, 0.92, 0.3).rotation.y = 0.2;
  addCyl(root, 0.045, 0.045, 0.2, 6, metalMat, -0.62, 0.92, 0.56).rotation.x = Math.PI / 2;

  root.userData = { legs, mats, type: 'grunt' };
  markShadows(root);
  return root;
}

export function createCronenberg() {
  const root = new THREE.Group();
  const flesh = uniqueStandard(0xc76d6d, 0.7, 0.02);
  const flesh2 = uniqueStandard(0xa94d58, 0.76, 0.02);
  const dark = uniqueStandard(0x5f2632, 0.8, 0);
  const eyeMat = uniqueStandard(0xf4ead5, 0.35, 0);
  const pupilMat = uniqueStandard(0x1a0b0c, 0.5, 0);
  const teethMat = uniqueStandard(0xd9c9a5, 0.65, 0);
  const tentacles = [];
  const mats = [flesh, flesh2, dark];

  const body = addSphere(root, 0.72, flesh, 0, 1.02, 0, 1.08, 0.96, 0.92);
  body.rotation.z = 0.08;
  // lumps
  for (let i = 0; i < 7; i++) {
    const a = rand(0, TAU);
    const r = rand(0.18, 0.3);
    addSphere(
      root, r, i % 2 ? flesh2 : flesh,
      Math.cos(a) * 0.55, 1.0 + rand(-0.4, 0.45), Math.sin(a) * 0.45,
      1.1, 0.9, 1
    );
  }
  // eyes
  const eyePos = [
    [-0.22, 1.2, 0.58], [0.02, 1.28, 0.63], [0.24, 1.18, 0.58],
    [-0.1, 1.0, 0.68], [0.17, 0.98, 0.66], [-0.28, 0.87, 0.54],
  ];
  eyePos.forEach(([x, y, z], i) => {
    const r = rand(0.055, 0.09);
    addSphere(root, r, eyeMat, x, y, z, 1, 1, 0.65);
    addSphere(root, r * 0.4, pupilMat, x, y, z + r * 0.6, 1, 1, 0.45);
  });
  // mouth
  addSphere(root, 0.25, dark, 0, 0.73, 0.6, 1.4, 0.55, 0.5);
  for (let i = 0; i < 5; i++) {
    addBox(root, 0.055, 0.12, 0.04, teethMat, -0.2 + i * 0.1, 0.82, 0.77).rotation.z = rand(-0.2, 0.2);
  }
  // tentacles
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * 0.48, 0.9, Math.sin(a) * 0.42);
    root.add(pivot);
    addCyl(pivot, 0.09, 0.035, 0.65, 6, i % 2 ? flesh2 : flesh, 0, -0.31, 0);
    const tip = new THREE.Group();
    tip.position.set(0, -0.62, 0);
    pivot.add(tip);
    addCyl(tip, 0.035, 0.012, 0.42, 5, flesh2, 0, -0.2, 0);
    pivot.rotation.z = Math.cos(a) * 0.85;
    pivot.rotation.x = Math.sin(a) * 0.85;
    tentacles.push({ pivot, tip, phase: rand(0, TAU) });
  }
  // legs (stubby)
  addCyl(root, 0.13, 0.1, 0.45, 7, flesh2, -0.28, 0.28, 0);
  addCyl(root, 0.13, 0.1, 0.45, 7, flesh2, 0.28, 0.28, 0);

  root.userData = { tentacles, mats, type: 'brute' };
  markShadows(root);
  return root;
}

export function createFloater() {
  const root = new THREE.Group();
  const dark = uniqueStandard(0x3b2552, 0.62, 0.14);
  const purple = uniqueStandard(0x70479b, 0.55, 0.2);
  const eyeWhite = uniqueStandard(0xf3ecd2, 0.35, 0);
  const pupil = new THREE.MeshStandardMaterial({ color: 0x340008, emissive: 0xff263e, emissiveIntensity: 2.2, roughness: 0.3 });
  const tentacles = [];
  const mats = [dark, purple, eyeWhite];
  const core = addSphere(root, 0.34, dark, 0, 1.34, 0, 1.08, 0.92, 1);
  addSphere(root, 0.17, purple, 0, 1.22, 0.22, 1.2, 0.75, 0.7);
  // eye
  addSphere(root, 0.225, eyeWhite, 0, 1.37, 0.27, 1, 1.05, 0.62);
  addSphere(root, 0.085, pupil, 0, 1.37, 0.43, 1, 1, 0.55);
  addSphere(root, 0.025, eyeWhite, 0.025, 1.41, 0.48, 1, 1, 0.5);
  // brow
  addBox(root, 0.34, 0.035, 0.05, dark, 0, 1.54, 0.35).rotation.z = -0.12;
  // tentacles
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    const pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * 0.26, 1.12, Math.sin(a) * 0.24);
    root.add(pivot);
    addCyl(pivot, 0.045, 0.015, 0.58, 5, purple, 0, -0.27, 0);
    pivot.rotation.z = Math.cos(a) * 0.42;
    pivot.rotation.x = Math.sin(a) * 0.42;
    tentacles.push({ pivot, phase: rand(0, TAU) });
  }
  const aura = glowSprite(0x9a64ff, 1.8, 0.42);
  aura.position.y = 1.34;
  root.add(aura);
  root.userData = { tentacles, mats, type: 'floater', aura, hover: 0 };
  markShadows(root);
  aura.userData.noShadow = true;
  return root;
}

export function createEvilMorty() {
  const root = createMorty({ evil: true, scale: 1.52 });
  const aura = new THREE.Mesh(
    new THREE.RingGeometry(0.72, 0.83, 48),
    new THREE.MeshBasicMaterial({
      color: 0xff3c51, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    })
  );
  aura.rotation.x = -Math.PI / 2;
  aura.position.y = 0.04;
  root.add(aura);
  const redGlow = glowSprite(0xff2738, 2.1, 0.35);
  redGlow.position.y = 1.8;
  root.add(redGlow);
  root.userData.aura = aura;
  root.userData.redGlow = redGlow;
  root.userData.type = 'boss';
  return root;
}
