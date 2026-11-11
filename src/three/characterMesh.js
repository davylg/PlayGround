import * as THREE from 'three';

const lowSegments = { capsule: 5, sphere: 8, cylinder: 8 };

function mat(color, opts = {}) {
  const baseColor = new THREE.Color(color).multiplyScalar(1.35);
  return new THREE.MeshBasicMaterial({
    color: baseColor,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
  });
}

function capsule(radius, length, color, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, lowSegments.capsule, lowSegments.sphere), mat(color, opts));
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

function sphere(radius, color, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, lowSegments.sphere, lowSegments.sphere / 2), mat(color, opts));
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

function box(w, h, d, color, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts));
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

function cyl(rt, rb, h, color, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, lowSegments.cylinder), mat(color, opts));
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

function plane(w, h, color, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(color, opts));
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  return mesh;
}

export class CharacterMesh extends THREE.Group {
  constructor(character, skinIndex = 0) {
    super();
    this.character = character;
    this.skinIndex = skinIndex % character.skins.length;
    this.colors = character.skins[this.skinIndex].colors;
    this.group = this;
    this.name = `character-${character.id}`;
    this.userData.isCharacter = true;
    this.userData.characterId = character.id;
    this.buildBody();
    this.buildGear();
    this.buildHair();
    this.buildFace();
    this.buildWeaponProp();
    this.parts = this.group.userData.parts;
    this.action = { type: 'idle', time: 0 };
    this.gait = 0;
    this.lastFootstep = 0;
  }

  buildBody() {
    const skin = this.colors.skin;
    const cloth = this.colors.cloth;
    const root = new THREE.Group();
    root.position.y = 0;
    this.bodyRoot = root;
    this.group.add(root);

    // Lower body / hips.
    const hips = capsule(0.245, 0.18, skin);
    hips.position.y = 0.82;
    hips.scale.set(1.02, 1, 1);
    root.add(hips);

    // Trousers with modest tactical fit.
    const trousers = capsule(0.235, 0.2, cloth);
    trousers.position.y = 0.84;
    trousers.scale.set(1.08, 0.92, 1);
    root.add(trousers);

    // Torso and chest silhouette; tactical top covers shoulders and chest.
    const torso = capsule(0.28, 0.38, cloth);
    torso.position.y = 1.2;
    torso.scale.set(1.05, 1.02, 0.92);
    root.add(torso);

    const upperTorso = capsule(0.255, 0.32, cloth);
    upperTorso.position.y = 1.42;
    upperTorso.scale.set(1.03, 1, 0.94);
    root.add(upperTorso);

    const chestPlate = box(0.46, 0.34, 0.2, this.colors.gear);
    chestPlate.position.set(0, 1.35, 0.025);
    root.add(chestPlate);

    const collar = box(0.42, 0.09, 0.16, this.colors.accent, { emissive: this.colors.accent, emissiveIntensity: 0.18 });
    collar.position.set(0, 1.54, 0.02);
    root.add(collar);

    const neck = cyl(0.075, 0.075, 0.1, skin);
    neck.position.y = 1.58;
    root.add(neck);

    const head = sphere(0.155, skin);
    head.position.y = 1.74;
    root.add(head);

    const shoulders = new THREE.Group();
    [-0.25, 0.25].forEach(x => {
      const shoulder = sphere(0.08, cloth);
      shoulder.position.set(x, 1.5, 0);
      shoulders.add(shoulder);
    });
    root.add(shoulders);

    // Arms.
    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();
    root.add(this.leftArm, this.rightArm);
    [this.leftArm, this.rightArm].forEach((arm, index) => {
      const upper = capsule(0.06, 0.16, cloth);
      upper.position.y = -0.16;
      const lower = capsule(0.055, 0.16, index === 0 ? cloth : this.colors.gear);
      lower.position.y = -0.4;
      const glove = sphere(0.065, this.colors.gear);
      glove.position.y = -0.58;
      arm.add(upper, lower, glove);
      arm.position.set(index === 0 ? -0.25 : 0.25, 1.48, 0);
      arm.rotation.z = index === 0 ? 0.25 : -0.25;
    });

    // Legs.
    this.leftLeg = new THREE.Group();
    this.rightLeg = new THREE.Group();
    root.add(this.leftLeg, this.rightLeg);
    [this.leftLeg, this.rightLeg].forEach((leg, index) => {
      const thigh = capsule(0.08, 0.2, index === 0 ? cloth : cloth);
      thigh.position.y = -0.22;
      const shin = capsule(0.07, 0.18, this.colors.gear);
      shin.position.y = -0.55;
      const boot = box(0.1, 0.07, 0.19, '#25282d');
      boot.position.set(0, -0.72, 0.03);
      leg.add(thigh, shin, boot);
      leg.position.set(index === 0 ? -0.115 : 0.115, 0.8, 0);
    });

    root.userData.parts = {
      torso,
      upperTorso,
      head,
      chestPlate,
      collar,
      leftArm: this.leftArm,
      rightArm: this.rightArm,
      leftLeg: this.leftLeg,
      rightLeg: this.rightLeg,
      shoulders,
    };
  }

  buildGear() {
    const accent = this.colors.accent;
    const gear = this.colors.gear;
    const root = this.bodyRoot;

    const belt = box(0.44, 0.07, 0.18, gear);
    belt.position.y = 0.95;
    root.add(belt);

    const pouch = box(0.12, 0.09, 0.05, accent, { emissive: accent, emissiveIntensity: 0.2 });
    pouch.position.set(0.14, 0.95, 0.09);
    root.add(pouch);

    const vestBack = box(0.36, 0.28, 0.08, gear);
    vestBack.position.set(0, 1.33, -0.1);
    root.add(vestBack);

    const reactor = cyl(0.05, 0.05, 0.08, accent, { emissive: accent, emissiveIntensity: 0.3 });
    reactor.position.set(0, 1.23, -0.13);
    root.add(reactor);

    // Role-specific head gear.
    const role = this.character.role;
    if (role === 'defense' || role === 'assault') {
      const helmet = sphere(0.16, gear);
      helmet.position.set(0, 1.79, -0.015);
      helmet.scale.set(1.05, 0.88, 1.05);
      root.add(helmet);
      const visor = box(0.18, 0.045, 0.06, accent, { emissive: accent, emissiveIntensity: 0.42 });
      visor.position.set(0, 1.76, 0.13);
      root.add(visor);
    } else if (role === 'recon') {
      const goggles = box(0.23, 0.07, 0.06, '#20242a');
      goggles.position.set(0, 1.75, 0.12);
      root.add(goggles);
      const lens = box(0.06, 0.035, 0.01, accent, { emissive: accent, emissiveIntensity: 0.45 });
      lens.position.set(0.05, 1.75, 0.155);
      root.add(lens);
      const headset = torusMesh(0.14, 0.018, gear);
      headset.rotation.x = Math.PI / 2;
      headset.position.y = 1.74;
      root.add(headset);
    } else if (role === 'support') {
      const headband = box(0.26, 0.05, 0.07, gear);
      headband.position.y = 1.82;
      root.add(headband);
      const medicCross = box(0.035, 0.015, 0.02, accent, { emissive: accent, emissiveIntensity: 0.4 });
      medicCross.position.set(0, 1.38, 0.14);
      root.add(medicCross);
    } else {
      const band = box(0.23, 0.04, 0.07, gear);
      band.position.y = 1.81;
      root.add(band);
      const unit = cyl(0.025, 0.025, 0.09, accent, { emissive: accent, emissiveIntensity: 0.35 });
      unit.position.set(0.1, 1.28, -0.12);
      root.add(unit);
    }

    // Boots and knee protectors.
    [this.leftLeg, this.rightLeg].forEach(leg => {
      const knee = box(0.13, 0.11, 0.11, gear);
      knee.position.set(0, -0.34, 0.02);
      leg.add(knee);
    });

    function torusMesh(radius, tube, color) {
      const geometry = new THREE.TorusGeometry(radius, tube, lowSegments.capsule, lowSegments.sphere);
      const mesh = new THREE.Mesh(geometry, mat(color));
      mesh.castShadow = true;
      return mesh;
    }
  }

  buildHair() {
    const hairColor = this.colors.hair;
    const root = this.bodyRoot;
    const hair = new THREE.Group();
    const role = this.character.role;
    if (role === 'assault' || role === 'recon') {
      const ponytail = capsule(0.05, 0.18, hairColor);
      ponytail.position.set(0, 1.66, -0.14);
      ponytail.rotation.x = -0.35;
      hair.add(ponytail);
      const top = sphere(0.135, hairColor);
      top.position.set(0, 1.82, -0.03);
      top.scale.set(1.08, 0.72, 1.02);
      hair.add(top);
    } else if (role === 'support') {
      const bun = sphere(0.09, hairColor);
      bun.position.set(0, 1.77, -0.11);
      hair.add(bun);
      const cap = sphere(0.13, hairColor);
      cap.position.set(0, 1.83, -0.02);
      cap.scale.set(1.05, 0.58, 1.0);
      hair.add(cap);
    } else if (role === 'defense') {
      const braids = [];
      for (let i = 0; i < 4; i += 1) {
        const braid = capsule(0.025, 0.16, hairColor);
        braid.position.set((i - 1.5) * 0.055, 1.68, -0.14);
        braid.rotation.x = -0.18;
        braids.push(braid);
      }
      hair.add(...braids);
    } else {
      const longHair = capsule(0.07, 0.28, hairColor);
      longHair.position.set(0, 1.62, -0.13);
      hair.add(longHair);
    }
    root.add(hair);
    root.userData.parts.hair = hair;
  }

  buildFace() {
    const root = this.bodyRoot;
    const eyes = new THREE.Group();
    [-0.06, 0.06].forEach(x => {
      const eye = sphere(0.021, '#121620');
      eye.position.set(x, 1.75, 0.14);
      eye.scale.set(1, 0.8, 0.5);
      eyes.add(eye);
    });
    const visor = box(0.09, 0.012, 0.008, this.colors.accent, { emissive: this.colors.accent, emissiveIntensity: 0.3 });
    visor.position.set(0, 1.79, 0.145);
    root.add(eyes, visor);
  }

  buildWeaponProp() {
    const prop = new THREE.Group();
    const color = '#2a2f36';
    const accent = this.colors.accent;
    const barrel = cyl(0.02, 0.02, 0.36, color);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 0.18;
    prop.add(barrel);
    const body = box(0.18, 0.06, 0.05, color);
    body.position.x = 0.04;
    prop.add(body);
    const handle = box(0.05, 0.09, 0.04, color);
    handle.position.set(-0.03, -0.05, 0);
    prop.add(handle);
    const glow = box(0.02, 0.02, 0.02, accent, { emissive: accent, emissiveIntensity: 0.5 });
    glow.position.set(0.13, 0.03, 0);
    prop.add(glow);
    prop.position.set(0.19, 1.4, 0.12);
    prop.rotation.set(0, -0.15, 0);
    this.bodyRoot.add(prop);
    this.weaponProp = prop;
    this.bodyRoot.userData.parts.weaponProp = prop;
  }

  setSkin(index) {
    this.skinIndex = index % this.character.skins.length;
    // Simple visual re-accent: could be expanded later to full material swap.
    this.bodyRoot.userData.parts.collar.material.color.set(this.colors.accent);
  }

  setAction(type, time = 0) {
    this.action.type = type;
    this.action.time = time;
  }

  animate(dt, speed = 0, grounded = true, alive = true) {
    if (!this.bodyRoot) return;
    this.gait += dt * (speed * 2.2 + 0.4);
    const p = this.bodyRoot.userData.parts;
    const time = this.action.time;
    this.action.time += dt;
    if (!alive) {
      this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 1.4, Math.min(1, dt * 4));
      this.bodyRoot.position.y = THREE.MathUtils.lerp(this.bodyRoot.position.y, -0.18, Math.min(1, dt * 4));
      p.leftArm.rotation.z = THREE.MathUtils.lerp(p.leftArm.rotation.z, 1.3, dt * 5);
      p.rightArm.rotation.z = THREE.MathUtils.lerp(p.rightArm.rotation.z, -1.3, dt * 5);
      return;
    }
    this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 0, dt * 6);
    this.bodyRoot.position.y = THREE.MathUtils.lerp(this.bodyRoot.position.y, 0, dt * 6);
    const walk = THREE.MathUtils.clamp(speed / 7.5, 0, 1);
    const swing = Math.sin(this.gait * 2.6) * 0.42 * walk;
    const lift = Math.sin(this.gait * 5.2) * 0.04 * walk;
    this.bodyRoot.position.y += lift;
    p.leftLeg.rotation.x = swing;
    p.rightLeg.rotation.x = -swing;
    p.leftArm.rotation.x = -swing * 0.5;
    p.rightArm.rotation.x = swing * 0.45;
    if (!grounded) {
      p.leftLeg.rotation.x = -0.25;
      p.rightLeg.rotation.x = 0.28;
      p.leftArm.rotation.x = -0.35;
      p.rightArm.rotation.x = -0.3;
    }
    if (this.action.type === 'shoot' && this.action.time < 0.16) {
      const progress = this.action.time / 0.16;
      p.rightArm.rotation.x = -0.35 + progress * 0.16;
      p.rightArm.rotation.z = -0.25 + progress * 0.12;
      this.weaponProp.position.z = 0.12 + progress * 0.012;
    } else {
      this.weaponProp.position.z = THREE.MathUtils.lerp(this.weaponProp.position.z, 0.12, dt * 5);
    }
    if (this.action.type === 'reload' && this.action.time < 1.6) {
      p.leftArm.rotation.x = -0.6;
      p.rightArm.rotation.x = -0.55;
      this.weaponProp.rotation.z = Math.sin(this.action.time * 4) * 0.14;
    } else {
      this.weaponProp.rotation.z = THREE.MathUtils.lerp(this.weaponProp.rotation.z, 0, dt * 5);
    }
    if (this.action.type === 'ability' && this.action.time < 0.55) {
      const wave = Math.sin(this.action.time * 14) * 0.22;
      this.bodyRoot.rotation.y = wave;
      p.leftArm.rotation.z = 0.25 + Math.abs(wave) * 0.6;
      p.rightArm.rotation.z = -0.25 - Math.abs(wave) * 0.6;
    } else {
      this.bodyRoot.rotation.y = THREE.MathUtils.lerp(this.bodyRoot.rotation.y, 0, dt * 5);
    }
    if (this.action.type === 'plantBomb' && this.action.time < 1.1) {
      p.rightArm.rotation.x = -0.7;
      p.leftArm.rotation.x = -0.55;
      this.bodyRoot.position.y = -0.05;
    }
    if (this.action.type === 'defuseBomb' && this.action.time < 1.1) {
      p.rightArm.rotation.x = -0.62;
      p.leftArm.rotation.x = -0.5;
      this.bodyRoot.position.y = -0.08;
    }
  }
}

function rootProp(object) {
  let current = object;
  while (current && !current.userData.isCharacter) current = current.parent;
  return current || object;
}

export function createCharacterMesh(character, skinIndex = 0) {
  return new CharacterMesh(character, skinIndex);
}
