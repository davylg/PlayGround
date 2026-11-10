import * as THREE from 'three';
import {
  scene, standard, emissive, addBox, addCyl, addSphere, markShadows, glowSprite,
  makeConcreteTexture, makeMetalTexture, makeHazardTexture, makeTextTexture,
  rand, TAU,
} from './core.js';
import { createRick } from './models.js';

export const obstacles = [];
const portalUniforms = { uTime: { value: 0 } };

function addCollider(x, z, r) {
  obstacles.push({ x, z, r });
}

function makeCable(points, radius = 0.045, color = 0x111715) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geo = new THREE.TubeGeometry(curve, 28, radius, 5, false);
  const mesh = new THREE.Mesh(geo, standard(color, 0.62, 0.22));
  mesh.castShadow = true;
  scene.add(mesh);
  return mesh;
}

function addPoster(x, y, z, w, h, texture, frameColor = 0x111a15, rotY = 0) {
  const nx = Math.sin(rotY);
  const nz = Math.cos(rotY);
  const frame = addBox(scene, w + 0.16, h + 0.16, 0.08, standard(frameColor, 0.5, 0.4), x, y, z, false, true);
  frame.rotation.y = rotY;
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
  );
  art.position.set(x + nx * 0.05, y, z + nz * 0.05);
  art.rotation.y = rotY;
  scene.add(art);
  return art;
}

export function buildWorld() {
  /* ---------------------------------------------------------------- lights */
  const hemi = new THREE.HemisphereLight(0x9ac6ae, 0x101511, 1.35);
  scene.add(hemi);

  const frontFill = new THREE.DirectionalLight(0xb8dfc7, 1.15);
  frontFill.position.set(-2, 9, 14);
  scene.add(frontFill);

  const magentaRim = new THREE.PointLight(0xa55dff, 10, 18, 2);
  magentaRim.position.set(14, 4, -8);
  scene.add(magentaRim);

  const key = new THREE.DirectionalLight(0xdfffee, 2.55);
  key.position.set(8, 15, 10);
  key.castShadow = true;
  key.shadow.mapSize.set(isTouch() ? 1024 : 2048, isTouch() ? 1024 : 2048);
  key.shadow.camera.left = -19;
  key.shadow.camera.right = 19;
  key.shadow.camera.top = 19;
  key.shadow.camera.bottom = -19;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 45;
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.025;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6ca7c9, 0.8);
  rim.position.set(-11, 8, -12);
  scene.add(rim);

  const warmFill = new THREE.PointLight(0xffc678, 18, 16, 2);
  warmFill.position.set(-10, 3.2, -8.5);
  scene.add(warmFill);

  /* ---------------------------------------------------------------- floor */
  const floorMat = new THREE.MeshStandardMaterial({
    map: makeConcreteTexture(),
    color: 0xb7c5bc,
    roughness: 0.9,
    metalness: 0.08,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 27), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(33, 33, 0x6c8b79, 0x3c5648);
  grid.position.y = 0.012;
  grid.material.transparent = true;
  grid.material.opacity = 0.17;
  grid.material.depthWrite = false;
  scene.add(grid);

  // central painted portal pad
  const padRing = new THREE.Mesh(
    new THREE.RingGeometry(4.4, 4.6, 64),
    new THREE.MeshStandardMaterial({
      color: 0x39473e, emissive: 0x2a6a3b, emissiveIntensity: 0.55,
      roughness: 0.85, metalness: 0.1, side: THREE.DoubleSide,
    })
  );
  padRing.rotation.x = -Math.PI / 2;
  padRing.position.set(0, 0.018, 0.4);
  scene.add(padRing);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    const tick = addBox(scene, 0.55, 0.01, 0.16, standard(0x596b5f, 0.8, 0.1), Math.cos(a) * 4.5, 0.02, 0.4 + Math.sin(a) * 4.5, false, true);
    tick.rotation.y = -a;
  }

  // hazard strips by the entrance
  const hazardMat = new THREE.MeshStandardMaterial({ map: makeHazardTexture(), roughness: 0.8, metalness: 0.1 });
  const hz1 = addBox(scene, 31, 0.035, 0.55, hazardMat, 0, 0.022, 11.9, false, true);
  hz1.rotation.y = 0;

  /* ---------------------------------------------------------------- walls */
  const wallMat = standard(0x2f3d37, 0.92, 0.05);
  const wallDark = standard(0x1c2823, 0.9, 0.08);
  const metalTex = makeMetalTexture();
  const panelMat = new THREE.MeshStandardMaterial({ map: metalTex, color: 0x8b9e94, roughness: 0.62, metalness: 0.45 });

  addBox(scene, 34, 5.6, 0.65, wallMat, 0, 2.8, -13.6, false, true);
  addBox(scene, 0.65, 5.6, 27, wallMat, -16.75, 2.8, 0, false, true);
  addBox(scene, 0.65, 5.6, 27, wallMat, 16.75, 2.8, 0, false, true);
  // lower metal wainscoting
  addBox(scene, 33.3, 1.65, 0.1, panelMat, 0, 0.9, -13.22, false, true);
  addBox(scene, 0.1, 1.65, 26.3, panelMat, -16.38, 0.9, 0, false, true);
  addBox(scene, 0.1, 1.65, 26.3, panelMat, 16.38, 0.9, 0, false, true);
  // wainscot cap
  addBox(scene, 33.4, 0.11, 0.22, standard(0x6e8278, 0.55, 0.4), 0, 1.76, -13.2, false, true);
  addBox(scene, 0.22, 0.11, 26.3, standard(0x6e8278, 0.55, 0.4), -16.36, 1.76, 0, false, true);
  addBox(scene, 0.22, 0.11, 26.3, standard(0x6e8278, 0.55, 0.4), 16.36, 1.76, 0, false, true);
  // ribs
  for (let x = -15; x <= 15; x += 3) {
    addBox(scene, 0.14, 1.7, 0.16, wallDark, x, 0.9, -13.13, false, true);
  }
  for (let z = -12; z <= 12; z += 3) {
    addBox(scene, 0.16, 1.7, 0.14, wallDark, -16.28, 0.9, z, false, true);
    addBox(scene, 0.16, 1.7, 0.14, wallDark, 16.28, 0.9, z, false, true);
  }

  // open garage front: columns and warning light
  addBox(scene, 0.8, 5.6, 0.8, wallDark, -16.2, 2.8, 13.1, false, true);
  addBox(scene, 0.8, 5.6, 0.8, wallDark, 16.2, 2.8, 13.1, false, true);
  addBox(scene, 28, 0.12, 0.5, standard(0x3d4e45, 0.6, 0.45), 0, 4.7, 13.05, false, true);
  // ceiling beams (kept off the centre line so the follow camera stays clear)
  for (const z of [-9.4, -3.4, 2.6, 8.6]) {
    addBox(scene, 12.6, 0.28, 0.3, wallDark, -9.1, 4.94, z, false, true);
    addBox(scene, 12.6, 0.28, 0.3, wallDark, 9.1, 4.94, z, false, true);
  }

  // pipes along the back and side
  const pipeMat = standard(0x52645a, 0.5, 0.6);
  for (let i = 0; i < 3; i++) {
    const pipe = addCyl(scene, 0.1 - i * 0.018, 0.1 - i * 0.018, 31.5, 8, pipeMat, 0, 4.35 - i * 0.19, -13.16);
    pipe.rotation.z = Math.PI / 2;
    for (let x = -14; x <= 14; x += 7) {
      addBox(scene, 0.18, 0.34, 0.22, wallDark, x, 4.35 - i * 0.19, -13.1, false, true);
    }
  }
  const pipeSide = addCyl(scene, 0.12, 0.12, 25, 8, pipeMat, -16.15, 4.28, 0);
  pipeSide.rotation.x = Math.PI / 2;
  const pipeSide2 = addCyl(scene, 0.08, 0.08, 25, 8, standard(0x8e6d46, 0.5, 0.55), 16.15, 4.45, 0);
  pipeSide2.rotation.x = Math.PI / 2;

  /* ---------------------------------------------------------------- lamps */
  const lampPositions = [[-8.5, -5.5], [8.5, -5.5], [-8.5, 5.2], [8.5, 5.2]];
  const lampMats = [];
  lampPositions.forEach(([x, z], i) => {
    addCyl(scene, 0.018, 0.018, 0.55, 5, standard(0x131a16, 0.7, 0.3), x, 4.7, z);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.42, 12, 1, true), standard(0x3e5147, 0.55, 0.45, { side: THREE.DoubleSide }));
    shade.position.set(x, 4.36, z);
    shade.rotation.x = Math.PI;
    shade.castShadow = true;
    scene.add(shade);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff4d5, emissive: 0xffe6ad, emissiveIntensity: 5, roughness: 0.2, toneMapped: false,
    });
    lampMats.push(bulbMat);
    const bulb = addSphere(scene, 0.13, bulbMat, x, 4.26, z, 1, 0.7, 1);
    bulb.userData.noShadow = true;
    if (i < 2) {
      const l = new THREE.PointLight(0xffe0a8, 23, 14, 2);
      l.position.set(x, 3.95, z);
      scene.add(l);
    }
    // visible light shaft
    const shaft = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 4.0, 20, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xffe6b5, transparent: true, opacity: 0.025, depthWrite: false,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      })
    );
    shaft.position.set(x, 2.45, z);
    shaft.rotation.x = Math.PI;
    shaft.userData.noShadow = true;
    scene.add(shaft);
  });

  // fluorescent strips near the portal
  for (const x of [-5.5, 5.5]) {
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xbdffe2, emissive: 0x7dffb0, emissiveIntensity: 3.5, toneMapped: false, roughness: 0.2,
    });
    addBox(scene, 3.1, 0.06, 0.22, stripMat, x, 4.72, -10.7, false, false).userData.noShadow = true;
  }

  /* ---------------------------------------------------------------- portal machine */
  const machine = new THREE.Group();
  machine.position.set(0, 0, -11.9);
  scene.add(machine);
  const machineMetal = standard(0x33423e, 0.45, 0.72);
  const machineDark = standard(0x1b2421, 0.6, 0.55);
  const machineGreen = emissive(0x53ff6a, 1.8);
  addBox(machine, 7.2, 0.55, 2.6, machineDark, 0, 0.28, 0);
  addBox(machine, 6.4, 0.18, 2.1, machineMetal, 0, 0.61, 0);
  addBox(machine, 0.55, 4.7, 1.0, machineMetal, -3.0, 2.65, -0.2);
  addBox(machine, 0.55, 4.7, 1.0, machineMetal, 3.0, 2.65, -0.2);
  addBox(machine, 6.55, 0.55, 1.0, machineMetal, 0, 4.9, -0.2);
  addBox(machine, 5.9, 0.22, 0.8, machineDark, 0, 4.55, -0.2);
  // control console
  addBox(machine, 2.3, 0.9, 0.65, machineDark, 0, 1.05, 1.3).rotation.x = -0.18;
  addBox(machine, 1.8, 0.55, 0.08, machineGreen, 0, 1.25, 1.63).rotation.x = -0.18;
  for (let i = 0; i < 5; i++) {
    addSphere(machine, 0.055, i % 2 ? machineGreen : emissive(0xff4c5c, 2), -0.7 + i * 0.35, 1.46, 1.64);
  }
  // ring
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x46594f, emissive: 0x3aff5b, emissiveIntensity: 0.85, roughness: 0.35, metalness: 0.72,
  });
  const portalRing = new THREE.Mesh(new THREE.TorusGeometry(2.28, 0.19, 14, 64), ringMat);
  portalRing.position.set(0, 2.82, 0.18);
  portalRing.castShadow = true;
  machine.add(portalRing);
  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.055, 8, 64), machineMetal);
  outerRing.position.copy(portalRing.position);
  outerRing.position.z -= 0.05;
  machine.add(outerRing);
  // segments
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU;
    const seg = addBox(machine, 0.22, 0.42, 0.34, i % 2 ? machineGreen : machineMetal, Math.cos(a) * 2.28, 2.82 + Math.sin(a) * 2.28, 0.18, false, true);
    seg.rotation.z = a - Math.PI / 2;
  }

  const portalMat = new THREE.ShaderMaterial({
    uniforms: portalUniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv - 0.5;
        float r = length(p) * 2.0;
        float a = atan(p.y, p.x);
        float swirl = sin(a * 5.0 + r * 12.0 - uTime * 3.4) * 0.5 + 0.5;
        float swirl2 = sin(a * -3.0 + r * 18.0 + uTime * 2.0) * 0.5 + 0.5;
        float core = smoothstep(1.0, 0.02, r);
        float rim = smoothstep(1.02, 0.74, r);
        vec3 deep = vec3(0.01, 0.1, 0.03);
        vec3 hot = vec3(0.08, 0.55, 0.12);
        vec3 pale = vec3(0.45, 1.1, 0.38);
        vec3 col = mix(deep, hot, swirl * 0.8 + swirl2 * 0.25);
        col = mix(col, pale, pow(core, 5.0) * 0.7);
        float alpha = rim * (0.72 + 0.24 * sin(uTime * 2.0 + r * 8.0));
        gl_FragColor = vec4(col * (0.85 + 0.35 * swirl), alpha);
      }
    `,
  });
  const portalDisc = new THREE.Mesh(new THREE.CircleGeometry(2.18, 72), portalMat);
  portalDisc.position.set(0, 2.82, 0.19);
  machine.add(portalDisc);
  const portalGlow = glowSprite(0x73ff59, 6.0, 0.32);
  portalGlow.position.set(0, 2.82, 0.15);
  machine.add(portalGlow);
  const portalLight = new THREE.PointLight(0x66ff4f, 26, 16, 2);
  portalLight.position.set(0, 2.8, 0.8);
  scene.add(portalLight);
  addCollider(0, -11.2, 3.2);

  // cables
  makeCable([[-3, 1.5, -11.6], [-5.4, 0.5, -10.6], [-8.8, 0.08, -10.2], [-12.2, 0.06, -11.6]], 0.055);
  makeCable([[3, 1.0, -11.6], [6.5, 0.4, -10.2], [9.5, 0.07, -11.3], [13, 0.06, -10.4]], 0.045, 0x1b2620);
  makeCable([[-2.8, 4.3, -11.6], [-6.8, 4.7, -11.8], [-12, 4.1, -13]], 0.035, 0x101512);

  // floor light pool
  const pool = glowSprite(0x52ff65, 8.5, 0.2);
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(0, 0.09, -9.6);
  pool.scale.set(8.5, 8.5, 1);
  scene.add(pool);

  /* ---------------------------------------------------------------- mid-floor lab clutter */
  const cart = new THREE.Group();
  cart.position.set(-7.2, 0, 2.4);
  cart.rotation.y = -0.35;
  scene.add(cart);
  const cartRed = standard(0x8b3a32, 0.58, 0.42);
  const cartDark = standard(0x252e29, 0.5, 0.55);
  addBox(cart, 1.35, 0.82, 0.78, cartRed, 0, 0.62, 0);
  addBox(cart, 1.42, 0.08, 0.86, cartDark, 0, 1.07, 0);
  addBox(cart, 1.22, 0.2, 0.04, cartDark, 0, 0.83, 0.41);
  addBox(cart, 1.22, 0.2, 0.04, cartDark, 0, 0.52, 0.41);
  addBox(cart, 0.08, 0.1, 0.05, standard(0xcfc7a7, 0.4, 0.5), 0, 0.83, 0.44);
  addBox(cart, 0.08, 0.1, 0.05, standard(0xcfc7a7, 0.4, 0.5), 0, 0.52, 0.44);
  for (const x of [-0.48, 0.48]) {
    for (const z of [-0.3, 0.3]) {
      const wheel = addCyl(cart, 0.1, 0.1, 0.08, 10, cartDark, x, 0.12, z);
      wheel.rotation.z = Math.PI / 2;
    }
  }
  // a few tools on top
  addBox(cart, 0.4, 0.08, 0.18, standard(0x8f9c95, 0.35, 0.65), -0.25, 1.16, 0.02);
  addCyl(cart, 0.025, 0.025, 0.5, 6, standard(0xd5a53d, 0.45, 0.6), 0.32, 1.22, 0.04).rotation.z = 1.2;
  addCollider(-7.2, 2.4, 1.0);

  const midCrates = new THREE.Group();
  midCrates.position.set(8.1, 0, 4.3);
  midCrates.rotation.y = 0.35;
  scene.add(midCrates);
  addBox(midCrates, 1.25, 1.25, 1.25, standard(0x596b4c, 0.85, 0.08), 0, 0.625, 0);
  addBox(midCrates, 1.1, 0.09, 1.1, standard(0x3b4b37, 0.85, 0.1), 0, 1.27, 0);
  addBox(midCrates, 0.85, 0.85, 0.85, standard(0x3b4b37, 0.85, 0.1), 0.35, 0.425, 0.72);
  addBox(midCrates, 1.3, 0.08, 1.3, standard(0x596b4c, 0.85, 0.08), 0, 0.18, 0);
  addCollider(8.1, 4.3, 1.2);

  // floor cable coils and a puddle of something glowing
  const coilMat = standard(0x121815, 0.7, 0.2);
  for (let i = 0; i < 3; i++) {
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.55 + i * 0.16, 0.035, 6, 28), coilMat);
    coil.rotation.x = -Math.PI / 2;
    coil.position.set(-3.2, 0.04 + i * 0.018, 6.5);
    scene.add(coil);
  }
  const goo = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 24),
    new THREE.MeshStandardMaterial({
      color: 0x1c5c39, emissive: 0x2bff77, emissiveIntensity: 0.35,
      transparent: true, opacity: 0.45, roughness: 0.2, metalness: 0.1,
    })
  );
  goo.rotation.x = -Math.PI / 2;
  goo.scale.set(1, 0.62, 1);
  goo.position.set(5.4, 0.025, -2.6);
  scene.add(goo);

  /* ---------------------------------------------------------------- workbench */
  const bench = new THREE.Group();
  bench.position.set(-11.8, 0, -10.15);
  scene.add(bench);
  const wood = standard(0x4d3a2a, 0.8, 0.05);
  const steel = standard(0x5a6b63, 0.42, 0.62);
  addBox(bench, 4.3, 0.16, 1.3, wood, 0, 1.0, 0);
  addBox(bench, 4.4, 0.07, 1.4, steel, 0, 1.1, 0);
  for (const x of [-1.85, 1.85]) {
    for (const z of [-0.45, 0.45]) addBox(bench, 0.12, 1.0, 0.12, steel, x, 0.5, z);
  }
  addBox(bench, 4.1, 0.08, 1.1, steel, 0, 0.36, 0);
  // clutter
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x8de8c4, transparent: true, opacity: 0.58, roughness: 0.15, metalness: 0.15,
  });
  const liquidGreen = new THREE.MeshStandardMaterial({
    color: 0x44ff82, emissive: 0x2dff70, emissiveIntensity: 1.4, roughness: 0.3,
  });
  for (let i = 0; i < 4; i++) {
    const bx = -1.4 + i * 0.5;
    addCyl(bench, 0.12, 0.14, 0.32, 10, glassMat, bx, 1.28, -0.18);
    addCyl(bench, 0.1, 0.1, 0.16, 10, liquidGreen, bx, 1.24, -0.18);
  }
  // microscope
  addCyl(bench, 0.12, 0.16, 0.08, 10, steel, 1.2, 1.16, 0.15);
  addCyl(bench, 0.035, 0.035, 0.38, 8, steel, 1.2, 1.35, 0.15).rotation.z = 0.3;
  addCyl(bench, 0.05, 0.05, 0.28, 8, steel, 1.32, 1.52, 0.15).rotation.z = -0.65;
  // toolbox
  addBox(bench, 0.7, 0.3, 0.4, standard(0xb13f38, 0.55, 0.4), 0.1, 1.24, 0.3);
  addBox(bench, 0.12, 0.08, 0.06, standard(0x222a25, 0.5, 0.4), 0.1, 1.43, 0.3);
  // papers
  addBox(bench, 0.6, 0.01, 0.45, standard(0xd9d3b5, 0.9, 0), -1.5, 1.12, 0.25).rotation.y = 0.2;
  addCollider(-11.8, -10.15, 2.35);

  /* ---------------------------------------------------------------- shelf */
  const shelf = new THREE.Group();
  shelf.position.set(11.8, 0, -10.3);
  scene.add(shelf);
  const shelfMat = standard(0x39453f, 0.55, 0.45);
  addBox(shelf, 4.6, 4.0, 0.3, shelfMat, 0, 2.1, -0.35);
  addBox(shelf, 0.14, 4.0, 1.0, shelfMat, -2.25, 2.1, 0);
  addBox(shelf, 0.14, 4.0, 1.0, shelfMat, 2.25, 2.1, 0);
  for (let i = 0; i < 4; i++) addBox(shelf, 4.4, 0.09, 1.0, shelfMat, 0, 0.6 + i * 1.05, 0);
  // jars and boxes
  const jarColors = [0x8cff6a, 0xff6d5d, 0x6cd7ff, 0xf5d33f, 0xb46cff];
  for (let i = 0; i < 11; i++) {
    const row = i % 3;
    const col = Math.floor(i / 3);
    const x = -1.8 + col * 0.95 + rand(-0.08, 0.08);
    const y = 0.78 + row * 1.05;
    const h = rand(0.22, 0.42);
    addCyl(shelf, 0.11, 0.12, h, 9, glassMat, x, y + h / 2, 0.08);
    addCyl(shelf, 0.095, 0.1, h * 0.55, 9, new THREE.MeshStandardMaterial({
      color: jarColors[i % jarColors.length],
      emissive: jarColors[i % jarColors.length], emissiveIntensity: 0.45, roughness: 0.45,
    }), x, y + h * 0.3, 0.08);
  }
  // meeseeks box
  const meeseeks = new THREE.Group();
  meeseeks.position.set(1.1, 3.72, 0.02);
  shelf.add(meeseeks);
  addBox(meeseeks, 0.55, 0.34, 0.42, standard(0x3f8ed6, 0.55, 0.2), 0, 0, 0);
  addBox(meeseeks, 0.42, 0.02, 0.3, standard(0xaee8ff, 0.3, 0.2), 0, 0.18, 0);
  addSphere(meeseeks, 0.06, emissive(0x8cecff, 2.2), 0, 0.21, 0);
  addCollider(11.8, -10.3, 2.35);

  /* ---------------------------------------------------------------- crates, barrels */
  const crateMat = standard(0x596b4c, 0.85, 0.08);
  const crateDark = standard(0x3b4b37, 0.85, 0.1);
  const cratePositions = [[-12.8, 7.0, 1.7, 0.2], [-12.4, 7.2, 1.4, 1.0], [-11.5, 8.5, 1.2, -0.4]];
  cratePositions.forEach(([x, z, s, r], i) => {
    const c = new THREE.Group();
    c.position.set(x, 0, z);
    c.rotation.y = r;
    scene.add(c);
    addBox(c, s, s, s, i % 2 ? crateMat : crateDark, 0, s / 2, 0);
    addBox(c, s + 0.04, 0.09, s + 0.04, crateMat, 0, s * 0.22, 0);
    addBox(c, s + 0.04, 0.09, s + 0.04, crateMat, 0, s * 0.78, 0);
    addBox(c, 0.1, s, 0.1, crateDark, -s * 0.35, s / 2, s * 0.48);
    addBox(c, 0.1, s, 0.1, crateDark, s * 0.35, s / 2, s * 0.48);
  });
  addCollider(-12.3, 7.4, 2.0);

  const barrelMat = standard(0xa55632, 0.55, 0.4);
  const barrelBand = standard(0x2d3430, 0.45, 0.6);
  [[12.9, 7.1], [12.0, 8.4], [13.5, 9.1]].forEach(([x, z]) => {
    const b = addCyl(scene, 0.45, 0.45, 1.3, 14, barrelMat, x, 0.65, z);
    addCyl(scene, 0.47, 0.47, 0.1, 14, barrelBand, x, 0.28, z);
    addCyl(scene, 0.47, 0.47, 0.1, 14, barrelBand, x, 1.02, z);
    addCyl(scene, 0.46, 0.46, 0.04, 14, barrelBand, x, 1.31, z);
  });
  addCollider(12.8, 8.0, 1.8);

  // fire extinguisher
  const ext = new THREE.Group();
  ext.position.set(15.3, 0, 5.8);
  scene.add(ext);
  addCyl(ext, 0.16, 0.18, 0.65, 12, standard(0xb6322e, 0.45, 0.45), 0, 0.42, 0);
  addCyl(ext, 0.06, 0.06, 0.2, 8, standard(0x262b28, 0.4, 0.6), 0, 0.82, 0);
  addBox(ext, 0.06, 0.18, 0.06, standard(0x262b28, 0.4, 0.6), 0, 0.9, 0.08);

  /* ---------------------------------------------------------------- posters / neon */
  const posterA = makeTextTexture('WUBBA\nLUBBA', {
    width: 640, height: 820, size: 126, color: '#f5d33f', sub: 'DUB DUB!', subColor: '#7dff5a', bg: '#15231c',
  });
  addPoster(-9.6, 3.15, -13.2, 2.55, 3.25, posterA);
  const posterB = makeTextTexture('GET\nSCHWIFTY', {
    width: 640, height: 820, size: 116, color: '#8cff74', sub: 'NO PORTAL NEEDED', subColor: '#c8f7b3', bg: '#101b17',
  });
  addPoster(9.6, 3.15, -13.2, 2.55, 3.25, posterB);
  const posterC = makeTextTexture('DO NOT\nPRESS', {
    width: 640, height: 760, size: 128, color: '#ff5c6c', sub: 'SERIOUSLY, MORTY', subColor: '#ffd2c9', bg: '#1c1314',
  });
  addPoster(-16.32, 3.1, 2.5, 2.1, 2.7, posterC, 0x111a15, Math.PI / 2);

  // little warning sign near portal
  const warn = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 0.6),
    new THREE.MeshBasicMaterial({
      map: makeTextTexture('NÃO TOQUE', {
        width: 700, height: 220, size: 100, border: true, color: '#ffdd55', sub: 'RISCO DE MULTIVERSO', subColor: '#ff8a70',
      }),
      transparent: true, toneMapped: false,
    })
  );
  warn.position.set(4.3, 1.55, -13.16);
  scene.add(warn);

  // neon sign
  const neonTex = makeTextTexture('PORTAL LAB', {
    width: 1200, height: 300, size: 150, border: false, color: '#a6ff8c', sub: '', bg: 'rgba(0,0,0,0)',
  });
  const neonMat = new THREE.MeshBasicMaterial({
    map: neonTex, transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, toneMapped: false, color: 0xaaffaa,
  });
  const neon = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 1.85), neonMat);
  neon.position.set(0, 4.45, -13.16);
  scene.add(neon);
  const neonGlow = glowSprite(0x7dff5a, 9, 0.15);
  neonGlow.position.set(0, 4.45, -13.2);
  scene.add(neonGlow);

  // hanging cables across the ceiling
  makeCable([[-15.5, 4.7, 3.2], [-6, 4.15, 4.4], [2, 4.55, 2.8], [10, 4.1, 4.0], [15.5, 4.7, 2.2]], 0.025, 0x0e1411);
  makeCable([[-14.8, 4.65, -4.2], [-5, 4.3, -2.7], [4, 4.65, -4.6], [13, 4.25, -2.5]], 0.022, 0x0e1411);

  /* ---------------------------------------------------------------- Rick */
  const rick = createRick();
  rick.position.set(5.4, 0.02, -8.9);
  rick.rotation.y = -0.4;
  scene.add(rick);
  addCollider(5.4, -8.9, 0.55);

  // speech billboard above Rick
  const speechTex = makeTextTexture('VAI, MORTY!', {
    width: 512, height: 160, size: 88, border: false, color: '#d8ffc9', bg: 'rgba(6,16,12,.82)',
  });
  const speech = new THREE.Sprite(new THREE.SpriteMaterial({
    map: speechTex, transparent: true, depthWrite: false, toneMapped: false,
  }));
  speech.scale.set(2.7, 0.84, 1);
  speech.position.set(5.4, 3.1, -8.6);
  scene.add(speech);

  return {
    portalDisc, portalRing, portalGlow, portalLight, neonMat, neonGlow, lampMats, rick, speech,
    ringMat, pool, padRing,
  };
}

export function updateWorld(world, dt, t) {
  portalUniforms.uTime.value = t;
  world.portalRing.rotation.z += dt * 0.18;
  world.portalGlow.material.opacity = 0.5 + Math.sin(t * 1.8) * 0.1;
  world.portalLight.intensity = 38 + Math.sin(t * 2.4) * 7 + Math.sin(t * 7.1) * 2;
  world.neonMat.opacity = 0.82 + Math.sin(t * 2.1) * 0.12;
  world.lampMats.forEach((m, i) => {
    m.emissiveIntensity = 4.4 + Math.sin(t * 6 + i * 2) * 0.25;
  });
  if (world.rick) {
    world.rick.position.y = 0.02 + Math.sin(t * 1.2) * 0.012;
    world.rick.userData.head.rotation.y = Math.sin(t * 0.35) * 0.18;
    world.rick.userData.flask.rotation.y += dt * 0.4;
  }
  if (world.speech) {
    world.speech.position.y = 3.1 + Math.sin(t * 1.4) * 0.04;
  }
}

function isTouch() {
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 760;
}
