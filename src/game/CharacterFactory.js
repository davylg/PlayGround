import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const UNIT = 1;

function mat(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.68,
    metalness: options.metalness ?? 0.14,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    flatShading: options.flatShading ?? false,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1
  });
}

function addMesh(parent, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function roundedBox(parent, material, size, position, radius = 0.04) {
  const geo = new RoundedBoxGeometry(size[0], size[1], size[2], 3, radius);
  return addMesh(parent, geo, material, position);
}

export function createWeaponModel(weaponId = 'rifle', scale = 1) {
  const group = new THREE.Group();
  const dark = mat('#15181c', { roughness: 0.38, metalness: 0.72 });
  const mid = mat('#353b43', { roughness: 0.34, metalness: 0.64 });
  const accent = mat('#ff6547', { roughness: 0.35, metalness: 0.3, emissive: '#ff4325', emissiveIntensity: 0.35 });
  const glow = new THREE.MeshBasicMaterial({ color: '#ffb24a' });
  const isPistol = weaponId === 'pistol';
  const isShotgun = weaponId === 'shotgun';
  const isSniper = weaponId === 'sniper';
  const length = isPistol ? 0.28 : isShotgun ? 0.66 : isSniper ? 0.82 : 0.58;
  const scaleV = scale;

  if (isPistol) {
    roundedBox(group, dark, [0.075, 0.095, 0.3], [0, 0, 0], 0.022);
    roundedBox(group, mid, [0.065, 0.18, 0.09], [0, -0.11, 0.075], 0.018);
    roundedBox(group, accent, [0.076, 0.02, 0.08], [0, 0.045, -0.03], 0.01);
    addMesh(group, new THREE.CylinderGeometry(0.026, 0.026, 0.12, 8), mid, [0, 0.012, -0.2], [Math.PI / 2, 0, 0]);
    addMesh(group, new THREE.BoxGeometry(0.012, 0.05, 0.05), glow, [0, 0.05, 0.07]);
  } else {
    roundedBox(group, mid, [0.085, 0.12, length], [0, 0, 0], 0.022);
    roundedBox(group, dark, [0.072, 0.085, length * 0.7], [0, -0.035, 0.03], 0.02);
    addMesh(group, new THREE.CylinderGeometry(0.022, 0.022, length * 0.42, 8), dark, [0, 0.02, -length * 0.66], [Math.PI / 2, 0, 0]);
    roundedBox(group, dark, [0.065, 0.11, 0.15], [0, -0.095, 0.11], 0.018);
    roundedBox(group, accent, [0.088, 0.018, length * 0.28], [0, 0.064, -0.015], 0.009);
    roundedBox(group, dark, [0.04, 0.05, 0.2], [0, 0.085, 0.06], 0.012);
    addMesh(group, new THREE.BoxGeometry(0.02, 0.035, 0.12), glow, [0.044, 0.03, -0.04]);
    if (isSniper) {
      addMesh(group, new THREE.CylinderGeometry(0.035, 0.035, 0.32, 10), dark, [0, 0.13, -0.06], [Math.PI / 2, 0, 0]);
      addMesh(group, new THREE.CylinderGeometry(0.047, 0.047, 0.05, 10), glow, [0, 0.13, -0.23], [Math.PI / 2, 0, 0]);
    }
    if (isShotgun) {
      addMesh(group, new THREE.CylinderGeometry(0.023, 0.023, length * 0.55, 8), dark, [0, -0.045, -length * 0.55], [Math.PI / 2, 0, 0]);
    }
  }
  group.scale.setScalar(scaleV);
  group.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return group;
}

export class CharacterModel {
  constructor(data, options = {}) {
    this.data = data;
    this.options = options;
    this.group = new THREE.Group();
    this.group.name = data.id;
    this.root = new THREE.Group();
    this.group.add(this.root);
    this.clock = 0;
    this.walkCycle = 0;
    this.state = 'idle';
    this.skinId = options.skin || 'default';
    this.materials = [];
    this.menuPose = options.menuPose ?? false;
    this.build();
    this.group.scale.setScalar(options.scale || 1);
  }

  material(color, opts) {
    const m = mat(color, opts);
    this.materials.push(m);
    return m;
  }

  applySkin() {
    const skin = this.data.skins.find((s) => s.id === this.skinId) || this.data.skins[0];
    if (this.accentMaterial) this.accentMaterial.color.set(skin.color);
    if (this.plateMaterial) this.plateMaterial.color.set(skin.secondary);
  }

  build() {
    const c = this.data.palette;
    const build = this.data.model.build;
    const buildScale = build === 'strong' ? 1.11 : build === 'slim' ? 0.94 : 1;
    const heightScale = this.data.model.height / 1.74;

    this.skin = this.material(c.skin, { roughness: 0.72 });
    this.suit = this.material(c.suit, { roughness: 0.7, metalness: 0.14 });
    this.plate = this.material(c.primary, { roughness: 0.55, metalness: 0.35 });
    this.plateDark = this.material(new THREE.Color(c.primary).multiplyScalar(0.62), { roughness: 0.64, metalness: 0.25 });
    this.detail = this.material(c.secondary, { roughness: 0.43, metalness: 0.34 });
    this.metal = this.material(c.metal, { roughness: 0.3, metalness: 0.72 });
    this.hair = this.material(c.hair, { roughness: 0.82 });
    this.accentMaterial = this.material(c.secondary, { roughness: 0.35, metalness: 0.3, emissive: c.secondary, emissiveIntensity: 0.24 });
    this.plateMaterial = this.material(c.primary, { roughness: 0.55, metalness: 0.35 });
    this.dark = this.material('#101114', { roughness: 0.8 });
    this.eyeWhite = this.material('#ece5dc', { roughness: 0.5 });
    this.eye = this.material('#151116', { roughness: 0.35 });

    const hips = new THREE.Group();
    hips.position.y = 0.86 * heightScale;
    hips.scale.set(buildScale, 1, buildScale);
    this.root.add(hips);
    this.hips = hips;

    // Hips + belt.
    addMesh(hips, new THREE.CapsuleGeometry(0.175, 0.11, 5, 10), this.suit, [0, 0.02, 0], [0, 0, Math.PI / 2], [1.22, 1, 0.72]);
    roundedBox(hips, this.plateDark, [0.39, 0.075, 0.24], [0, 0.06, 0], 0.03);
    roundedBox(hips, this.accentMaterial, [0.09, 0.045, 0.018], [0, 0.06, 0.13], 0.008);
    addMesh(hips, new THREE.BoxGeometry(0.1, 0.12, 0.035), this.plateDark, [-0.22, -0.015, 0.03], [0, 0.1, 0.18]);
    // Thigh holster.
    roundedBox(hips, this.plateDark, [0.1, 0.19, 0.075], [0.23, -0.12, 0.02], 0.02);
    addMesh(hips, new THREE.CylinderGeometry(0.025, 0.025, 0.18, 6), this.metal, [0.245, -0.13, -0.01]);

    // Torso.
    const torso = new THREE.Group();
    torso.position.y = 1.11 * heightScale;
    torso.scale.set(buildScale, 1, buildScale);
    this.root.add(torso);
    this.torso = torso;
    addMesh(torso, new THREE.CapsuleGeometry(0.195, 0.29, 6, 12), this.suit, [0, 0.17, 0], [0, 0, 0], [1.12, 1, 0.73]);
    addMesh(torso, new THREE.CapsuleGeometry(0.21, 0.15, 5, 12), this.suit, [0, 0.32, 0.01], [0, 0, 0], [1.12, 1, 0.8]);
    roundedBox(torso, this.plate, [0.39, 0.27, 0.17], [0, 0.25, 0.095], 0.055);
    roundedBox(torso, this.plateDark, [0.31, 0.16, 0.08], [0, 0.11, 0.155], 0.035);
    roundedBox(torso, this.plateDark, [0.11, 0.32, 0.06], [-0.19, 0.24, 0.07], 0.02);
    roundedBox(torso, this.plateDark, [0.11, 0.32, 0.06], [0.19, 0.24, 0.07], 0.02);
    roundedBox(torso, this.accentMaterial, [0.045, 0.12, 0.02], [0.09, 0.285, 0.19], 0.006);
    roundedBox(torso, this.accentMaterial, [0.045, 0.05, 0.02], [-0.09, 0.29, 0.19], 0.006);
    roundedBox(torso, this.metal, [0.12, 0.035, 0.02], [0, 0.1, 0.19], 0.005);
    // Collar.
    addMesh(torso, new THREE.TorusGeometry(0.11, 0.034, 5, 12), this.plateDark, [0, 0.48, 0], [Math.PI / 2, 0, 0]);
    // Neck.
    addMesh(torso, new THREE.CylinderGeometry(0.065, 0.075, 0.11, 9), this.skin, [0, 0.51, 0]);
    // Shoulder shells.
    addMesh(torso, new THREE.SphereGeometry(0.13, 9, 7), this.plate, [-0.29, 0.4, 0], [0, 0, 0.22], [1.1, 0.78, 0.95]);
    addMesh(torso, new THREE.SphereGeometry(0.13, 9, 7), this.plate, [0.29, 0.4, 0], [0, 0, -0.22], [1.1, 0.78, 0.95]);

    // Head.
    const headPivot = new THREE.Group();
    headPivot.position.y = 1.72 * heightScale;
    headPivot.scale.set(buildScale, 1, buildScale);
    this.root.add(headPivot);
    this.head = headPivot;
    addMesh(headPivot, new THREE.SphereGeometry(0.12, 18, 14), this.skin, [0, 0, 0], [0, 0, 0], [0.92, 1.12, 0.94]);
    addMesh(headPivot, new THREE.SphereGeometry(0.089, 14, 10), this.skin, [0, -0.065, 0.03], [0, 0, 0], [0.88, 0.88, 0.9]);
    // Eyes, eyebrows, lips.
    addMesh(headPivot, new THREE.SphereGeometry(0.018, 8, 6), this.eyeWhite, [-0.044, 0.018, 0.104], [0, 0, 0], [1, 0.72, 0.4]);
    addMesh(headPivot, new THREE.SphereGeometry(0.018, 8, 6), this.eyeWhite, [0.044, 0.018, 0.104], [0, 0, 0], [1, 0.72, 0.4]);
    addMesh(headPivot, new THREE.SphereGeometry(0.009, 7, 5), this.eye, [-0.044, 0.018, 0.119]);
    addMesh(headPivot, new THREE.SphereGeometry(0.009, 7, 5), this.eye, [0.044, 0.018, 0.119]);
    addMesh(headPivot, new THREE.BoxGeometry(0.046, 0.007, 0.006), this.dark, [-0.044, 0.055, 0.112], [0, 0, 0.08]);
    addMesh(headPivot, new THREE.BoxGeometry(0.046, 0.007, 0.006), this.dark, [0.044, 0.055, 0.112], [0, 0, -0.08]);
    addMesh(headPivot, new THREE.BoxGeometry(0.05, 0.014, 0.018), new THREE.MeshBasicMaterial({ color: '#9e5158' }), [0, -0.075, 0.111]);
    addMesh(headPivot, new THREE.ConeGeometry(0.014, 0.035, 5), this.skin, [0, -0.018, 0.125], [Math.PI / 2, 0, 0]);

    this.buildHair(headPivot, c);
    this.buildAccessory(headPivot, c);
    this.buildArms(torso, c, buildScale);
    this.buildLegs(hips, c, heightScale);
    this.buildBackGear(torso, c);
    this.buildEarrings(headPivot);

    this.applySkin();
    this.applyChestGlow(torso, c);
  }

  buildHair(head, c) {
    const style = this.data.model.hairStyle;
    const hairMat = this.hair;
    const cap = addMesh(head, new THREE.SphereGeometry(0.127, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.42), hairMat, [0, 0.028, -0.02], [0.05, 0, 0], [1.02, 1.04, 1.03]);
    cap.scale.z = 1.03;

    if (style === 'asym-bob') {
      addMesh(head, new THREE.SphereGeometry(0.13, 14, 10), hairMat, [-0.06, -0.005, -0.03], [0, 0, 0], [0.9, 1.15, 1]);
      roundedBox(head, hairMat, [0.1, 0.2, 0.08], [0.115, -0.07, -0.02], 0.04);
      addMesh(head, new THREE.ConeGeometry(0.055, 0.13, 6), hairMat, [0.13, -0.13, -0.02], [0, 0, -0.2]);
    } else if (style === 'shaved') {
      cap.scale.set(0.94, 0.74, 0.94);
      cap.position.y = 0.03;
      roundedBox(head, this.detail, [0.035, 0.15, 0.025], [0.09, 0.02, 0.045], 0.01).rotation.z = -0.35;
    } else if (style === 'twin-buns') {
      addMesh(head, new THREE.SphereGeometry(0.07, 10, 8), hairMat, [-0.105, 0.12, -0.03]);
      addMesh(head, new THREE.SphereGeometry(0.07, 10, 8), hairMat, [0.105, 0.12, -0.03]);
      addMesh(head, new THREE.TorusGeometry(0.05, 0.014, 5, 10), this.accentMaterial, [-0.105, 0.12, -0.03], [0, 0.4, 0]);
      addMesh(head, new THREE.TorusGeometry(0.05, 0.014, 5, 10), this.accentMaterial, [0.105, 0.12, -0.03], [0, -0.4, 0]);
    } else if (style === 'afro') {
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        addMesh(head, new THREE.SphereGeometry(0.085, 8, 6), hairMat, [Math.cos(a) * 0.085, 0.055 + Math.sin(a * 2) * 0.025, Math.sin(a) * 0.06 - 0.035], [0, 0, 0], [1, 1, 1]);
      }
      addMesh(head, new THREE.SphereGeometry(0.125, 10, 8), hairMat, [0, 0.06, -0.04], [0, 0, 0], [1.1, 0.96, 1.1]);
    } else if (style === 'long-braid') {
      addMesh(head, new THREE.SphereGeometry(0.145, 12, 9), hairMat, [0, -0.03, -0.07], [0.1, 0, 0], [0.92, 1.35, 0.72]);
      let y = -0.16;
      for (let i = 0; i < 7; i++) {
        const seg = addMesh(head, new THREE.SphereGeometry(0.052 - i * 0.003, 8, 6), hairMat, [0.055 + i * 0.01, y, -0.08], [0, 0, 0.2], [1, 0.9, 0.85]);
        y -= 0.085;
        if (i === 6) seg.scale.multiplyScalar(0.65);
      }
      addMesh(head, new THREE.TorusGeometry(0.025, 0.01, 5, 8), this.accentMaterial, [0.12, -0.12, -0.08]);
    } else if (style === 'pixie-white') {
      cap.scale.set(1.02, 0.9, 1.02);
      addMesh(head, new THREE.ConeGeometry(0.055, 0.14, 5), hairMat, [0.11, 0.02, -0.02], [0.1, 0, -0.6]);
      addMesh(head, new THREE.ConeGeometry(0.035, 0.1, 5), hairMat, [-0.12, 0.015, -0.03], [0.1, 0, 0.65]);
      addMesh(head, new THREE.ConeGeometry(0.04, 0.11, 5), hairMat, [0.02, 0.1, -0.05], [0.2, 0, -0.1]);
    } else if (style === 'long-wavy') {
      addMesh(head, new THREE.SphereGeometry(0.15, 12, 10), hairMat, [0, -0.08, -0.07], [0, 0, 0], [1, 1.55, 0.7]);
      addMesh(head, new THREE.CapsuleGeometry(0.07, 0.32, 4, 8), hairMat, [-0.11, -0.18, -0.03], [0, 0, 0.1], [0.7, 1, 0.75]);
      addMesh(head, new THREE.CapsuleGeometry(0.07, 0.3, 4, 8), hairMat, [0.11, -0.17, -0.03], [0, 0, -0.1], [0.7, 1, 0.75]);
    } else if (style === 'elegant-waves') {
      addMesh(head, new THREE.SphereGeometry(0.15, 12, 9), hairMat, [0, 0.02, -0.05], [0.1, 0, 0], [1, 1.12, 0.8]);
      addMesh(head, new THREE.CapsuleGeometry(0.065, 0.28, 4, 8), hairMat, [-0.12, -0.18, -0.03], [0, 0, 0.15], [0.8, 1, 0.7]);
      addMesh(head, new THREE.SphereGeometry(0.075, 8, 6), hairMat, [-0.15, -0.34, -0.01], [0, 0, 0], [0.8, 1.2, 0.65]);
    } else if (style === 'shag') {
      addMesh(head, new THREE.SphereGeometry(0.15, 10, 8), hairMat, [0, 0.02, -0.04], [0, 0, 0], [1.05, 1.0, 0.9]);
      for (let i = 0; i < 5; i++) {
        addMesh(head, new THREE.ConeGeometry(0.045, 0.15, 5), hairMat, [-0.13 + i * 0.065, -0.045, -0.075], [0.12, 0, -0.15 + i * 0.07]);
      }
    } else if (style === 'curly-long') {
      addMesh(head, new THREE.SphereGeometry(0.16, 10, 8), hairMat, [0, -0.02, -0.04], [0, 0, 0], [1.1, 1.16, 0.88]);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        addMesh(head, new THREE.SphereGeometry(0.065, 8, 6), hairMat, [Math.cos(a) * 0.12, -0.08 + Math.sin(a) * 0.06, -0.08 + Math.sin(a) * 0.02], [0, 0, 0], [1, 1.5, 0.9]);
      }
      addMesh(head, new THREE.CapsuleGeometry(0.07, 0.24, 4, 7), hairMat, [0, -0.34, -0.07], [0, 0, 0], [1.2, 1, 0.8]);
    } else if (style === 'twin-tails') {
      addMesh(head, new THREE.SphereGeometry(0.14, 12, 9), hairMat, [0, 0.04, -0.04], [0, 0, 0], [1, 1, 0.9]);
      addMesh(head, new THREE.CapsuleGeometry(0.045, 0.36, 4, 7), hairMat, [-0.145, -0.19, -0.015], [0, 0, 0.25], [0.9, 1, 0.9]);
      addMesh(head, new THREE.CapsuleGeometry(0.045, 0.36, 4, 7), hairMat, [0.145, -0.19, -0.015], [0, 0, -0.25], [0.9, 1, 0.9]);
      addMesh(head, new THREE.TorusGeometry(0.04, 0.013, 5, 8), this.accentMaterial, [-0.12, -0.035, -0.02], [0, 0.4, 0]);
      addMesh(head, new THREE.TorusGeometry(0.04, 0.013, 5, 8), this.accentMaterial, [0.12, -0.035, -0.02], [0, -0.4, 0]);
    } else if (style === 'updo-streak') {
      addMesh(head, new THREE.SphereGeometry(0.13, 12, 9), hairMat, [0, 0.04, -0.03], [0, 0, 0], [1, 1.02, 0.9]);
      addMesh(head, new THREE.SphereGeometry(0.085, 10, 8), hairMat, [0, 0.15, -0.07]);
      addMesh(head, new THREE.TorusGeometry(0.055, 0.016, 5, 10), this.accentMaterial, [0, 0.13, -0.06], [0.4, 0, 0]);
      addMesh(head, new THREE.CapsuleGeometry(0.018, 0.15, 3, 5), this.detail, [-0.12, -0.05, 0.02], [0.2, 0, 0.15]);
    }
  }

  buildAccessory(head, c) {
    const accessory = this.data.model.accessory;
    if (accessory === 'earpiece') {
      addMesh(head, new THREE.TorusGeometry(0.088, 0.009, 4, 12), this.accentMaterial, [0, 0.0, 0.025], [0, Math.PI / 2, 0]);
      addMesh(head, new THREE.CylinderGeometry(0.012, 0.012, 0.06, 6), this.metal, [-0.115, 0.0, 0.015], [0, 0, Math.PI / 2]);
      addMesh(head, new THREE.SphereGeometry(0.018, 6, 5), this.accentMaterial, [-0.145, 0, 0.015]);
    } else if (accessory === 'headset') {
      addMesh(head, new THREE.TorusGeometry(0.125, 0.011, 4, 16, Math.PI), this.dark, [0, 0.03, 0], [0, Math.PI / 2, 0]);
      addMesh(head, new THREE.CylinderGeometry(0.038, 0.038, 0.025, 10), this.detail, [-0.115, 0.02, 0], [0, 0, Math.PI / 2]);
      addMesh(head, new THREE.CylinderGeometry(0.032, 0.032, 0.02, 10), this.detail, [0.115, 0.02, 0], [0, 0, Math.PI / 2]);
      addMesh(head, new THREE.ConeGeometry(0.012, 0.05, 5), this.accentMaterial, [-0.14, 0.02, 0.025], [Math.PI / 2, 0, 0]);
    } else if (accessory === 'goggles') {
      addMesh(head, new THREE.TorusGeometry(0.045, 0.012, 5, 10), this.dark, [-0.045, 0.025, 0.11], [0, 0, 0], [1.1, 0.8, 0.5]);
      addMesh(head, new THREE.TorusGeometry(0.045, 0.012, 5, 10), this.dark, [0.045, 0.025, 0.11], [0, 0, 0], [1.1, 0.8, 0.5]);
      addMesh(head, new THREE.BoxGeometry(0.02, 0.018, 0.02), this.metal, [0, 0.025, 0.112]);
      addMesh(head, new THREE.CylinderGeometry(0.005, 0.005, 0.15, 5), this.detail, [0.06, 0.03, 0.06], [0, 0, Math.PI / 2], [1, 1, 0.6]);
    } else if (accessory === 'tattoo') {
      addMesh(head, new THREE.TorusGeometry(0.096, 0.006, 4, 16, Math.PI * 0.7), this.detail, [0, 0.0, 0.035], [0, 0, 0.4]);
      addMesh(head, new THREE.BoxGeometry(0.035, 0.09, 0.01), this.detail, [0.112, 0.01, 0.03], [0, 0.5, -0.2]);
    } else if (accessory === 'choker') {
      addMesh(head, new THREE.TorusGeometry(0.078, 0.011, 4, 12), this.accentMaterial, [0, -0.12, 0], [Math.PI / 2, 0, 0]);
      addMesh(head, new THREE.SphereGeometry(0.018, 6, 5), this.metal, [0, -0.145, 0.07]);
    } else if (accessory === 'circuit-visor') {
      addMesh(head, new THREE.BoxGeometry(0.18, 0.045, 0.03), this.dark, [0, 0.03, 0.105], [0, 0, 0]);
      addMesh(head, new THREE.BoxGeometry(0.16, 0.014, 0.008), this.accentMaterial, [0, 0.03, 0.123], [0, 0, 0]);
      addMesh(head, new THREE.BoxGeometry(0.012, 0.09, 0.012), this.accentMaterial, [0.115, 0.02, 0.06], [0, 0, 0.25]);
    } else if (accessory === 'facepaint') {
      for (let i = 0; i < 3; i++) {
        addMesh(head, new THREE.BoxGeometry(0.085, 0.012, 0.008), this.detail, [-0.02, 0.055 - i * 0.026, 0.105], [0, 0, -0.15]);
      }
      addMesh(head, new THREE.BoxGeometry(0.035, 0.012, 0.008), this.accentMaterial, [0.06, -0.02, 0.12], [0, 0, 0.3]);
    } else if (accessory === 'halo-pin') {
      addMesh(head, new THREE.TorusGeometry(0.065, 0.008, 4, 16), this.metal, [0.08, 0.11, -0.02], [0.2, 0.4, 0]);
      addMesh(head, new THREE.SphereGeometry(0.013, 5, 4), this.accentMaterial, [0.08, 0.15, -0.02]);
    } else if (accessory === 'scarf') {
      addMesh(head, new THREE.TorusGeometry(0.09, 0.027, 5, 12), this.detail, [0, -0.11, 0], [Math.PI / 2, 0, 0]);
      addMesh(head, new THREE.CapsuleGeometry(0.035, 0.16, 3, 6), this.detail, [0.09, -0.2, 0.06], [0.2, 0, -0.25]);
    } else if (accessory === 'ar-visor') {
      addMesh(head, new THREE.BoxGeometry(0.19, 0.06, 0.04), this.dark, [0, 0.02, 0.105]);
      addMesh(head, new THREE.BoxGeometry(0.17, 0.022, 0.012), this.accentMaterial, [0, 0.02, 0.128]);
      addMesh(head, new THREE.BoxGeometry(0.012, 0.04, 0.06), this.metal, [0.105, 0.06, 0.085]);
    } else if (accessory === 'orquidea') {
      addMesh(head, new THREE.TorusGeometry(0.055, 0.009, 4, 12, Math.PI * 1.6), this.detail, [-0.1, -0.04, 0.02], [0.2, 0.4, -0.6]);
      addMesh(head, new THREE.SphereGeometry(0.033, 7, 5), this.accentMaterial, [-0.14, -0.08, 0.02], [0, 0, 0], [1, 0.55, 0.5]);
      addMesh(head, new THREE.SphereGeometry(0.022, 6, 5), this.detail, [-0.16, -0.1, 0.025]);
    }
  }

  buildEarrings(head) {
    if (this.data.id === 'santa' || this.data.id === 'laco') {
      addMesh(head, new THREE.TorusGeometry(0.022, 0.005, 4, 8), this.metal, [-0.105, -0.05, 0.02], [0, 0, 0.2]);
      addMesh(head, new THREE.TorusGeometry(0.022, 0.005, 4, 8), this.metal, [0.105, -0.05, 0.02], [0, 0, -0.2]);
    }
  }

  buildArms(torso, c, buildScale) {
    const makeArm = (side) => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.31, 0.38, 0);
      arm.rotation.z = side * -0.13;
      torso.add(arm);
      addMesh(arm, new THREE.CapsuleGeometry(0.075, 0.18, 4, 8), this.suit, [0, -0.12, 0], [0, 0, 0], [1, 1, 0.9]);
      addMesh(arm, new THREE.CapsuleGeometry(0.062, 0.18, 4, 8), this.suit, [0, -0.34, 0.015], [0, 0, 0], [1, 1, 0.85]);
      // Elbow pad & glove.
      addMesh(arm, new THREE.SphereGeometry(0.068, 8, 6), this.plateDark, [0, -0.245, -0.005], [0, 0, 0], [1, 0.8, 0.9]);
      addMesh(arm, new THREE.CapsuleGeometry(0.055, 0.07, 4, 8), this.plateDark, [0, -0.47, 0.025], [0, 0, 0], [1.05, 1, 0.8]);
      addMesh(arm, new THREE.SphereGeometry(0.053, 8, 6), this.skin, [0, -0.53, 0.035], [0, 0, 0], [1, 1, 0.8]);
      roundedBox(arm, this.plate, [0.09, 0.07, 0.09], [0, -0.56, 0.045], 0.02);
      addMesh(arm, new THREE.BoxGeometry(0.025, 0.02, 0.012), this.accentMaterial, [side * 0.01, -0.405, 0.078]);
      if (side === 1) {
        addMesh(arm, new THREE.BoxGeometry(0.11, 0.16, 0.04), this.plateDark, [0, -0.17, 0.05]);
        addMesh(arm, new THREE.BoxGeometry(0.08, 0.1, 0.02), this.detail, [0, -0.17, 0.074]);
        addMesh(arm, new THREE.CylinderGeometry(0.02, 0.02, 0.15, 5), this.metal, [0.055, -0.1, 0.03], [0, 0, 0.2]);
      }
      return arm;
    };
    this.leftArm = makeArm(-1);
    this.rightArm = makeArm(1);
  }

  buildLegs(hips, c, heightScale) {
    const makeLeg = (side) => {
      const leg = new THREE.Group();
      leg.position.set(side * 0.11, -0.03, 0);
      hips.add(leg);
      addMesh(leg, new THREE.CapsuleGeometry(0.092, 0.25, 5, 9), this.suit, [0, -0.18, 0], [0, 0, 0], [1, 1, 0.94]);
      addMesh(leg, new THREE.SphereGeometry(0.082, 8, 7), this.plateDark, [0, -0.37, 0.02], [0, 0, 0], [1.05, 0.75, 0.8]);
      addMesh(leg, new THREE.CapsuleGeometry(0.073, 0.26, 5, 9), this.suit, [0, -0.52, 0.005], [0, 0, 0], [1, 1, 0.9]);
      // Boot.
      roundedBox(leg, this.plateDark, [0.14, 0.2, 0.24], [0, -0.7, 0.02], 0.035);
      roundedBox(leg, this.plate, [0.15, 0.12, 0.14], [0, -0.65, 0.05], 0.028);
      roundedBox(leg, this.dark, [0.142, 0.055, 0.27], [0, -0.79, 0.055], 0.022);
      addMesh(leg, new THREE.BoxGeometry(0.04, 0.02, 0.1), this.accentMaterial, [0, -0.69, 0.14]);
      addMesh(leg, new THREE.CylinderGeometry(0.082, 0.082, 0.05, 9), this.plate, [0, -0.43, 0.005]);
      // Thigh strap.
      addMesh(leg, new THREE.TorusGeometry(0.096, 0.012, 4, 10), this.dark, [0, -0.19, 0], [Math.PI / 2, 0, 0]);
      return leg;
    };
    this.leftLeg = makeLeg(-1);
    this.rightLeg = makeLeg(1);
  }

  buildBackGear(torso, c) {
    const gear = this.data.model.backGear;
    if (gear === 'none') return;
    const g = new THREE.Group();
    g.position.set(0, 0.26, -0.16);
    torso.add(g);
    if (gear === 'med-pack' || gear === 'garden-pack') {
      roundedBox(g, this.plateDark, [0.3, 0.28, 0.13], [0, 0, 0], 0.045);
      roundedBox(g, this.plate, [0.32, 0.08, 0.15], [0, 0.12, 0], 0.025);
      addMesh(g, new THREE.BoxGeometry(0.12, 0.05, 0.02), this.accentMaterial, [0, -0.02, -0.08]);
      addMesh(g, new THREE.BoxGeometry(0.05, 0.12, 0.02), this.accentMaterial, [0, -0.02, -0.08]);
      if (gear === 'garden-pack') {
        addMesh(g, new THREE.CylinderGeometry(0.035, 0.035, 0.25, 7), this.detail, [-0.2, 0.02, 0]);
        addMesh(g, new THREE.TorusGeometry(0.045, 0.01, 4, 8), this.accentMaterial, [-0.2, 0.16, 0], [0.4, 0, 0]);
      }
    } else if (gear === 'small-pack') {
      roundedBox(g, this.plateDark, [0.26, 0.2, 0.11], [0, 0, 0], 0.035);
      addMesh(g, new THREE.BoxGeometry(0.08, 0.18, 0.02), this.accentMaterial, [0.02, 0, -0.066]);
    } else if (gear === 'breacher') {
      roundedBox(g, this.plateDark, [0.34, 0.34, 0.16], [0, 0, 0], 0.04);
      addMesh(g, new THREE.CylinderGeometry(0.06, 0.06, 0.34, 8), this.metal, [-0.13, 0, -0.075], [0, 0, 0.15]);
      addMesh(g, new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8), this.detail, [0.13, 0, -0.075], [0, 0, -0.12]);
    } else if (gear === 'drone') {
      roundedBox(g, this.plateDark, [0.32, 0.2, 0.12], [0, 0, 0], 0.035);
      addMesh(g, new THREE.CylinderGeometry(0.045, 0.045, 0.08, 8), this.detail, [0, 0.03, -0.1], [Math.PI / 2, 0, 0]);
      addMesh(g, new THREE.TorusGeometry(0.09, 0.009, 4, 12), this.metal, [0, 0.06, -0.14], [Math.PI / 2, 0, 0]);
      addMesh(g, new THREE.SphereGeometry(0.018, 6, 5), this.accentMaterial, [0, 0.03, -0.15]);
    } else if (gear === 'canisters') {
      for (let i = 0; i < 2; i++) {
        addMesh(g, new THREE.CylinderGeometry(0.065, 0.065, 0.32, 8), this.plateDark, [-0.09 + i * 0.18, 0, 0]);
        addMesh(g, new THREE.TorusGeometry(0.066, 0.01, 4, 10), this.accentMaterial, [-0.09 + i * 0.18, 0.1, 0], [Math.PI / 2, 0, 0]);
        addMesh(g, new THREE.CylinderGeometry(0.015, 0.015, 0.08, 5), this.metal, [-0.09 + i * 0.18, 0.2, 0]);
      }
    } else if (gear === 'coil-pack') {
      roundedBox(g, this.plateDark, [0.3, 0.3, 0.12], [0, 0, 0], 0.035);
      addMesh(g, new THREE.TorusGeometry(0.09, 0.014, 5, 14), this.accentMaterial, [0, 0.05, -0.09], [0.2, 0, 0]);
      addMesh(g, new THREE.TorusGeometry(0.06, 0.012, 5, 12), this.accentMaterial, [0, -0.06, -0.09], [0.2, 0, 0]);
      addMesh(g, new THREE.CylinderGeometry(0.015, 0.015, 0.22, 5), this.metal, [0.14, 0.08, -0.03], [0, 0, -0.3]);
    } else if (gear === 'shield-pack') {
      addMesh(g, new THREE.CylinderGeometry(0.15, 0.15, 0.05, 6), this.plateDark, [0, 0, -0.02], [Math.PI / 2, 0, 0]);
      addMesh(g, new THREE.TorusGeometry(0.16, 0.015, 4, 12), this.detail, [0, 0, -0.055], [0, 0, 0]);
      addMesh(g, new THREE.BoxGeometry(0.04, 0.26, 0.08), this.metal, [0.02, 0, 0]);
    } else if (gear === 'antenna') {
      roundedBox(g, this.plateDark, [0.24, 0.32, 0.12], [0, 0, 0], 0.03);
      addMesh(g, new THREE.CylinderGeometry(0.008, 0.008, 0.52, 5), this.metal, [0.08, 0.22, -0.03], [0, 0, -0.08]);
      addMesh(g, new THREE.SphereGeometry(0.02, 6, 5), this.accentMaterial, [0.11, 0.48, -0.03]);
      addMesh(g, new THREE.BoxGeometry(0.12, 0.08, 0.02), this.accentMaterial, [-0.03, 0.02, -0.07]);
    } else if (gear === 'server-pack') {
      roundedBox(g, this.plateDark, [0.36, 0.26, 0.14], [0, 0, 0], 0.03);
      for (let i = 0; i < 3; i++) {
        addMesh(g, new THREE.BoxGeometry(0.2, 0.018, 0.02), this.accentMaterial, [0, 0.06 - i * 0.055, -0.08]);
      }
      addMesh(g, new THREE.CylinderGeometry(0.01, 0.01, 0.3, 5), this.metal, [-0.17, 0.02, 0], [0, 0, 0.2]);
      addMesh(g, new THREE.CylinderGeometry(0.01, 0.01, 0.3, 5), this.metal, [0.17, 0.02, 0], [0, 0, -0.2]);
    }
  }

  applyChestGlow(torso, c) {
    if (!this.data.model.chestGlow) return;
    const light = new THREE.PointLight(c.secondary, 0.38, 2.4, 2);
    light.position.set(0, 0.3, 0.28);
    torso.add(light);
    const bar = addMesh(torso, new THREE.BoxGeometry(0.21, 0.014, 0.01), new THREE.MeshBasicMaterial({ color: c.secondary }), [0, 0.35, 0.198]);
    bar.material.transparent = true;
    bar.material.opacity = 0.9;
  }

  setState(state) {
    if (this.state !== state) this.state = state;
  }

  update(dt, speed = 0, aiming = false) {
    this.clock += dt;
    const t = this.clock;
    const moving = speed > 0.1;
    const run = speed > 4.5;
    this.walkCycle += dt * (run ? 12 : moving ? 8 : 1.8);

    if (this.menuPose) {
      const breath = Math.sin(t * 1.55) * 0.012;
      this.torso.position.y = 1.11 * (this.data.model.height / 1.74) + breath;
      this.head.rotation.y = Math.sin(t * 0.42) * 0.11;
      this.head.rotation.x = Math.sin(t * 0.6) * 0.025;
      this.leftArm.rotation.z = -0.13 - Math.sin(t * 0.8) * 0.025;
      this.rightArm.rotation.z = 0.13 + Math.sin(t * 0.8 + 0.8) * 0.02;
      this.leftArm.rotation.x = Math.sin(t * 0.7) * 0.03;
      this.rightArm.rotation.x = -Math.sin(t * 0.7) * 0.03;
      if (this.data.model.hairStyle === 'long-braid') this.head.rotation.z = Math.sin(t * 0.5) * 0.015;
      this.leftLeg.rotation.z = -0.02;
      this.rightLeg.rotation.z = 0.02;
      return;
    }

    const swing = moving ? Math.sin(this.walkCycle) * (run ? 0.58 : 0.36) : 0;
    const counter = moving ? Math.cos(this.walkCycle) * (run ? 0.1 : 0.06) : 0;
    this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, swing, 0.55);
    this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, -swing, 0.55);
    this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -swing * 0.62, 0.4);
    this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, swing * 0.45, 0.4);
    this.leftArm.rotation.z = -0.13;
    this.rightArm.rotation.z = 0.13;
    this.torso.position.y = 1.11 * (this.data.model.height / 1.74) + (moving ? Math.abs(Math.sin(this.walkCycle * 2)) * 0.018 : Math.sin(t * 1.7) * 0.006);
    this.torso.rotation.y = counter * 0.35;
    this.head.rotation.y = -counter * 0.18;
    this.root.rotation.z = moving ? Math.sin(this.walkCycle) * 0.018 : 0;
    if (aiming) {
      this.leftArm.rotation.x = -1.05;
      this.rightArm.rotation.x = -1.0;
      this.leftArm.rotation.z = 0.25;
      this.rightArm.rotation.z = -0.25;
    }
  }

  dispose() {
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
    });
    this.materials.forEach((m) => m.dispose());
  }
}

export function createCharacterModel(data, options = {}) {
  return new CharacterModel(data, options);
}

export class CharacterViewer {
  constructor(renderer, container) {
    this.renderer = renderer;
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    this.camera.position.set(0, 1.5, 5.6);
    this.camera.lookAt(0, 1.05, 0);
    this.holder = new THREE.Group();
    this.scene.add(this.holder);
    this.current = null;
    this.rotation = 0;
    this.targetRotation = 0;
    this.targetZoom = 4.9;
    this.zoom = 4.9;
    this.targetOffset = -0.72;
    this.offset = -0.72;
    this.compositionMode = 'home';
    this.drag = null;
    this.buildStage();
    this.resize();
  }

  buildStage() {
    const hemi = new THREE.HemisphereLight('#9edbff', '#19121f', 2.6);
    this.scene.add(hemi);
    const key = new THREE.SpotLight('#ffd3b2', 110, 16, 0.62, 0.6, 1.4);
    key.position.set(3.5, 5.2, 4);
    key.target.position.set(0, 1.1, 0);
    this.scene.add(key, key.target);
    const rim = new THREE.SpotLight('#ff5f47', 80, 14, 0.7, 0.75, 1.5);
    rim.position.set(-4, 3.2, -3.5);
    rim.target.position.set(0, 1.1, 0);
    this.scene.add(rim, rim.target);
    const fill = new THREE.PointLight('#6fe8ff', 30, 10, 2);
    fill.position.set(3, 1.2, -2.5);
    this.scene.add(fill);
    const frontFill = new THREE.PointLight('#ffe6d0', 36, 12, 2);
    frontFill.position.set(-1.6, 1.9, 3.8);
    this.scene.add(frontFill);
    const frontFill2 = new THREE.PointLight('#ffffff', 22, 12, 2);
    frontFill2.position.set(1.8, 1.4, 3.4);
    this.scene.add(frontFill2);

    const platformMat = new THREE.MeshStandardMaterial({ color: '#10141b', roughness: 0.34, metalness: 0.75 });
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.16, 64), platformMat);
    platform.position.y = 0.02;
    platform.receiveShadow = true;
    this.scene.add(platform);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#ff6347' });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.006, 6, 64), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.11;
    this.scene.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.004, 6, 64), new THREE.MeshBasicMaterial({ color: '#5ce7ff', transparent: true, opacity: 0.4 }));
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.065;
    this.scene.add(ring2);
    const grid = new THREE.GridHelper(8, 24, '#273544', '#161d27');
    grid.position.y = -0.06;
    this.scene.add(grid);
    const backRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.008, 5, 100), new THREE.MeshBasicMaterial({ color: '#ff6b4a', transparent: true, opacity: 0.22 }));
    backRing.position.set(0, 2, -1.4);
    this.scene.add(backRing);
    this.stageRing = backRing;
    this.ring = ring;

    const particlesGeo = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.random() * 4;
      positions.push(Math.cos(a) * r, Math.random() * 5, Math.sin(a) * r - 1);
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ color: '#ff8f6b', size: 0.018, transparent: true, opacity: 0.65 }));
    this.scene.add(this.particles);

    this.clock = 0;
  }

  setCharacter(data, skinId = 'default') {
    if (this.current) {
      this.holder.remove(this.current.group);
      this.current.dispose();
    }
    this.current = new CharacterModel(data, { menuPose: true, skin: skinId });
    this.current.group.position.y = 0.12;
    this.holder.add(this.current.group);
    this.rotation = 0;
    this.targetRotation = 0;
    this.zoom = 4.9;
    this.targetZoom = 4.9;
    this.ring.material.color.set(data.palette.secondary);
    this.stageRing.material.color.set(data.palette.secondary);
    this.setComposition(this.compositionMode || 'home');
  }

  setComposition(mode = 'home') {
    this.compositionMode = mode;
    this.targetOffset = mode === 'home' ? -0.72 : mode === 'customize' ? -0.48 : 0;
  }

  setSkin(skinId) {
    if (!this.current) return;
    this.current.skinId = skinId;
    this.current.applySkin();
  }

  resize(width = this.container.clientWidth, height = this.container.clientHeight) {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  startDrag(x) {
    this.drag = { x, startRotation: this.targetRotation };
  }

  dragTo(x) {
    if (!this.drag) return;
    this.targetRotation = this.drag.startRotation + (x - this.drag.x) * 0.012;
  }

  stopDrag() {
    this.drag = null;
  }

  zoomBy(delta) {
    this.targetZoom = THREE.MathUtils.clamp(this.targetZoom + delta, 3.2, 8);
  }

  update(dt) {
    this.clock += dt;
    this.rotation = THREE.MathUtils.lerp(this.rotation, this.targetRotation, 0.1);
    this.zoom = THREE.MathUtils.lerp(this.zoom, this.targetZoom, 0.09);
    this.offset = THREE.MathUtils.lerp(this.offset, this.targetOffset, 0.08);
    if (this.current) {
      this.current.group.rotation.y = this.rotation;
      this.current.update(dt, 0);
    }
    this.camera.position.set(this.offset * 0.35 + Math.sin(this.clock * 0.1) * 0.08, 1.42, this.zoom);
    this.camera.lookAt(this.offset, 1.0, 0);
    this.holder.rotation.y = 0;
    this.stageRing.rotation.z += dt * 0.02;
    this.particles.rotation.y += dt * 0.008;
    this.ring.material.emissive;
  }

  render() {
    this.renderer.setViewport(0, 0, this.renderer.domElement.width, this.renderer.domElement.height);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }
}
