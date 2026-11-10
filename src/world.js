import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { AGENT_BY_ID, WEAPONS } from './data.js';

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a, b) => a + Math.random() * (b - a);
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const TAU = Math.PI * 2;

const SKIN = ['#6b4030', '#8d5a3c', '#c58a63', '#e1b38c', '#4b2e25', '#9e6a4a', '#d6a177', '#5b382c', '#b47a58', '#e8c2a0', '#7b4c37', '#a86f4e'];

const _box = new THREE.Box3();
const _sphere = new THREE.Sphere();
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _q = new THREE.Quaternion();

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function groundTexture(theme, seed = 1) {
  const c = makeCanvas(512, 512);
  const g = c.getContext('2d');
  g.fillStyle = theme.ground;
  g.fillRect(0, 0, 512, 512);
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 1900; i++) {
    g.fillStyle = rnd() > 0.5 ? theme.ground2 : 'rgba(0,0,0,0.16)';
    const a = 1 + rnd() * 5;
    g.globalAlpha = 0.10 + rnd() * 0.18;
    g.fillRect(rnd() * 512, rnd() * 512, a, a);
  }
  g.globalAlpha = 1;
  g.strokeStyle = 'rgba(255,255,255,0.04)';
  g.lineWidth = 1;
  for (let i = 0; i <= 512; i += 64) {
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 512); g.stroke();
    g.beginPath(); g.moveTo(0, i); g.lineTo(512, i); g.stroke();
  }
  for (let i = 0; i < 26; i++) {
    g.strokeStyle = 'rgba(0,0,0,0.12)';
    g.lineWidth = 0.6 + rnd() * 1.4;
    g.beginPath();
    let x = rnd() * 512, y = rnd() * 512;
    g.moveTo(x, y);
    for (let j = 0; j < 4; j++) { x += (rnd() - 0.5) * 45; y += (rnd() - 0.5) * 45; g.lineTo(x, y); }
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(11, 11);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function labelTexture(text, color = '#ffffff', sub = '') {
  const c = makeCanvas(512, 256);
  const g = c.getContext('2d');
  g.clearRect(0, 0, 512, 256);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = color;
  g.shadowBlur = 22;
  g.fillStyle = color;
  g.font = '800 132px "Barlow Condensed", sans-serif';
  g.fillText(text, 256, sub ? 112 : 132);
  if (sub) {
    g.shadowBlur = 8;
    g.font = '600 34px "Inter", sans-serif';
    g.fillStyle = 'rgba(255,255,255,0.72)';
    g.fillText(sub, 256, 202);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function signTexture(text, color) {
  const c = makeCanvas(512, 128);
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(3,8,12,0.82)';
  g.fillRect(0, 0, 512, 128);
  g.strokeStyle = color; g.lineWidth = 4; g.strokeRect(6, 6, 500, 116);
  g.fillStyle = color;
  g.shadowColor = color; g.shadowBlur = 20;
  g.font = '700 62px "Barlow Condensed", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 256, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeSky(scene, theme) {
  const geo = new THREE.SphereGeometry(180, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(theme.skyTop) },
      bottom: { value: new THREE.Color(theme.skyBottom) },
      offset: { value: 12 },
      exponent: { value: 0.72 }
    },
    vertexShader: `varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform vec3 top; uniform vec3 bottom; uniform float offset; uniform float exponent; varying vec3 vWorld;
      void main(){ float h = normalize(vWorld + vec3(0.0, offset, 0.0)).y; gl_FragColor = vec4(mix(bottom, top, pow(max(h,0.0), exponent)), 1.0); }`
  });
  const sky = new THREE.Mesh(geo, mat);
  scene.add(sky);
  return sky;
}

function makeStars(scene, color, count = 420) {
  const geo = new THREE.BufferGeometry();
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 120 + Math.random() * 40;
    const a = Math.random() * TAU;
    const y = 20 + Math.random() * 90;
    arr[i * 3] = Math.cos(a) * r;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = Math.sin(a) * r;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const mat = new THREE.PointsMaterial({ color, size: 0.8, transparent: true, opacity: 0.55, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  return points;
}

function makeParticles(scene, color, count = 280, range = 60) {
  const geo = new THREE.BufferGeometry();
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = rand(-range, range);
    arr[i * 3 + 1] = rand(0.3, 9);
    arr[i * 3 + 2] = rand(-range, range);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const mat = new THREE.PointsMaterial({ color, size: 0.07, transparent: true, opacity: 0.4, depthWrite: false });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  return pts;
}

function addEdges(mesh, color, opacity = 0.28) {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
  );
  edges.position.copy(mesh.position);
  edges.rotation.copy(mesh.rotation);
  edges.scale.copy(mesh.scale);
  return edges;
}

// Merge all direct mesh children that share a material into one draw call.
// Used for static set dressing and agent bodies, which never move part-by-part.
function mergeByMaterial(group, { shadows = true } = {}) {
  const buckets = new Map();
  const remove = [];
  for (const child of group.children) {
    if (!child.isMesh || Array.isArray(child.material)) continue;
    if (child.userData.noMerge) continue;
    const key = child.material.uuid;
    let bucket = buckets.get(key);
    if (!bucket) { bucket = { material: child.material, geos: [] }; buckets.set(key, bucket); }
    child.updateMatrix();
    const geo = child.geometry.clone();
    geo.applyMatrix4(child.matrix);
    bucket.geos.push(geo);
    remove.push(child);
  }
  for (const child of remove) group.remove(child);
  for (const { material, geos } of buckets.values()) {
    if (geos.length < 2) {
      const mesh = new THREE.Mesh(geos[0], material);
      mesh.castShadow = shadows; mesh.receiveShadow = shadows;
      group.add(mesh);
      continue;
    }
    const merged = mergeGeometries(geos, false);
    for (const g of geos) g.dispose();
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = shadows; mesh.receiveShadow = shadows;
    group.add(mesh);
  }
}

export function createWorld(map) {
  const scene = new THREE.Scene();
  const theme = map.theme;
  scene.background = new THREE.Color(theme.skyTop);
  scene.fog = new THREE.FogExp2(theme.fog, theme.fogDensity);
  makeSky(scene, theme);
  makeStars(scene, theme.accent, 380);

  const hemi = new THREE.HemisphereLight(theme.ambient, theme.fog, 1.35);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(theme.sun, 2.25);
  sun.position.set(-34, 52, 24);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  sun.shadow.camera.left = -62; sun.shadow.camera.right = 62;
  sun.shadow.camera.top = 62; sun.shadow.camera.bottom = -62;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 150;
  sun.shadow.bias = -0.0008;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(theme.accent, 0.9);
  rim.position.set(42, 22, -38);
  scene.add(rim);

  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTexture(theme, map.id.length + 3), roughness: 0.9, metalness: 0.12, color: 0xffffff
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(112, 112), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const colliders = [];
  const wallMeshes = [];
  const dynamicColliders = [];
  const group = new THREE.Group();
  scene.add(group);

  const wallMat = new THREE.MeshStandardMaterial({ color: theme.wall, roughness: 0.82, metalness: 0.16 });
  const wallAltMat = new THREE.MeshStandardMaterial({ color: theme.wallAlt, roughness: 0.9, metalness: 0.1 });
  const crateMat = new THREE.MeshStandardMaterial({ color: theme.crate, roughness: 0.78, metalness: 0.14 });
  const metalMat = new THREE.MeshStandardMaterial({ color: theme.metal, roughness: 0.48, metalness: 0.52 });
  const lowMat = new THREE.MeshStandardMaterial({ color: theme.low, roughness: 0.86, metalness: 0.12 });
  const accentMat = new THREE.MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.9 });

  const wallBuckets = new Map();
  const edgeGeos = [];
  const trimGeos = [];
  const mergedWalls = [];
  for (const w of map.walls) {
    const h = w.h || 4;
    const mat = w.m === 'crate' ? crateMat : w.m === 'metal' ? metalMat : w.m === 'low' ? lowMat : w.m === 'wallAlt' ? wallAltMat : wallMat;
    const box = new THREE.BoxGeometry(w.w, h, w.d);
    box.translate(w.x, h / 2, w.z);
    let bucket = wallBuckets.get(mat.uuid);
    if (!bucket) { bucket = { material: mat, geos: [] }; wallBuckets.set(mat.uuid, bucket); }
    bucket.geos.push(box);
    const edges = new THREE.EdgesGeometry(box);
    edgeGeos.push(edges);
    if (w.m !== 'low') {
      const trim = new THREE.BoxGeometry(w.w + 0.03, 0.045, w.d + 0.03);
      trim.translate(w.x, 0.035, w.z);
      trimGeos.push(trim);
    }
    colliders.push({ x: w.x, z: w.z, w: w.w, d: w.d, h });
  }
  for (const { material, geos } of wallBuckets.values()) {
    const merged = mergeGeometries(geos, false);
    for (const g of geos) g.dispose();
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh);
    mergedWalls.push(mesh);
  }
  if (edgeGeos.length) {
    const mergedEdges = mergeGeometries(edgeGeos, false);
    for (const g of edgeGeos) g.dispose();
    if (mergedEdges) group.add(new THREE.LineSegments(mergedEdges, new THREE.LineBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.13, depthWrite: false })));
  }
  if (trimGeos.length) {
    const mergedTrim = mergeGeometries(trimGeos, false);
    for (const g of trimGeos) g.dispose();
    if (mergedTrim) group.add(new THREE.Mesh(mergedTrim, accentMat));
  }

  // Distant industrial silhouette.
  const farMat = new THREE.MeshStandardMaterial({ color: theme.wallAlt, roughness: 1, metalness: 0 });
  const farGeos = [];
  for (let i = 0; i < 42; i++) {
    const a = (i / 42) * TAU;
    const r = rand(64, 92);
    const w = rand(4, 12), d = rand(4, 12), h = rand(5, 25);
    const geo = new THREE.BoxGeometry(w, h, d);
    geo.rotateY(rand(0, TAU));
    geo.translate(Math.cos(a) * r, h / 2, Math.sin(a) * r);
    farGeos.push(geo);
  }
  const farMerged = mergeGeometries(farGeos, false);
  for (const g of farGeos) g.dispose();
  if (farMerged) group.add(new THREE.Mesh(farMerged, farMat));

  // Bomb sites.
  const sites = [];
  for (const s of map.sites) {
    const color = new THREE.Color(s.color);
    const planeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.13, depthWrite: false });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.d), planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(s.x, 0.025, s.z);
    group.add(plane);
    const borderGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(s.x - s.w / 2, 0.06, s.z - s.d / 2),
      new THREE.Vector3(s.x + s.w / 2, 0.06, s.z - s.d / 2),
      new THREE.Vector3(s.x + s.w / 2, 0.06, s.z + s.d / 2),
      new THREE.Vector3(s.x - s.w / 2, 0.06, s.z + s.d / 2),
      new THREE.Vector3(s.x - s.w / 2, 0.06, s.z - s.d / 2)
    ]);
    group.add(new THREE.Line(borderGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })));
    for (const [sx, sz] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.5, 0.14), new THREE.MeshBasicMaterial({ color }));
      post.position.set(s.x + sx * s.w / 2, 0.75, s.z + sz * s.d / 2);
      group.add(post);
    }
    const letter = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 3.5),
      new THREE.MeshBasicMaterial({ map: labelTexture(s.id, s.color, `SITE ${s.id}`), transparent: true, opacity: 0.7, depthWrite: false })
    );
    letter.rotation.x = -Math.PI / 2;
    letter.rotation.z = 0;
    letter.position.set(s.x, 0.05, s.z);
    group.add(letter);
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.8, 4.0, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(s.x, 0.055, s.z);
    group.add(ring);
    const light = new THREE.PointLight(color, 3.2, 18, 2);
    light.position.set(s.x, 2.2, s.z);
    group.add(light);
    sites.push({ ...s, mesh: plane, letter, ring, light, colorHex: s.color });
  }

  // Props.
  for (const p of map.props || []) {
    if (p.type === 'barrel') {
      const mat = new THREE.MeshStandardMaterial({ color: theme.crate, roughness: 0.55, metalness: 0.45 });
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 1.7, 12), mat);
      barrel.position.set(p.x, 0.85, p.z);
      barrel.castShadow = true; group.add(barrel);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.12, 12), new THREE.MeshBasicMaterial({ color: theme.accent2 }));
      band.position.set(p.x, 1.18, p.z); group.add(band);
      colliders.push({ x: p.x, z: p.z, w: 1.2, d: 1.2, h: 1.7 });
    } else if (p.type === 'palm') {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 5.8, 7), new THREE.MeshStandardMaterial({ color: '#57442e', roughness: 1 }));
      trunk.position.set(p.x, 2.9, p.z); trunk.rotation.z = rand(-0.08, 0.08); group.add(trunk);
      for (let i = 0; i < 7; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.34, 3.2, 4), new THREE.MeshStandardMaterial({ color: theme.plant, roughness: 0.9 }));
        leaf.position.set(p.x, 5.5, p.z);
        leaf.rotation.z = Math.PI / 2.3;
        leaf.rotation.y = i / 7 * TAU;
        leaf.translateY(1.25);
        group.add(leaf);
      }
    } else if (p.type === 'lamp') {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 4.8, 8), new THREE.MeshStandardMaterial({ color: theme.metal, metalness: 0.8, roughness: 0.35 }));
      pole.position.set(p.x, 2.4, p.z); group.add(pole);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), new THREE.MeshBasicMaterial({ color: theme.accent2 }));
      orb.position.set(p.x, 4.9, p.z); group.add(orb);
    } else if (p.type === 'sign') {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(9, 2.3, 0.22), new THREE.MeshStandardMaterial({ color: '#101820', metalness: 0.6, roughness: 0.4 }));
      frame.position.set(p.x, 4.6, p.z); frame.rotation.y = p.x < 0 ? Math.PI / 2 : -Math.PI / 2; group.add(frame);
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(8.7, 2.0), new THREE.MeshBasicMaterial({ map: signTexture(p.text, p.color), transparent: true }));
      plane.position.copy(frame.position);
      plane.position.x += p.x < 0 ? 0.13 : -0.13;
      plane.rotation.y = frame.rotation.y + (p.x < 0 ? Math.PI / 2 : -Math.PI / 2);
      group.add(plane);
    } else if (p.type === 'crystal') {
      const m = new THREE.MeshStandardMaterial({ color: theme.accent, emissive: theme.accent, emissiveIntensity: 1.5, roughness: 0.25, metalness: 0.4, transparent: true, opacity: 0.8 });
      for (let i = 0; i < 3; i++) {
        const c = new THREE.Mesh(new THREE.ConeGeometry(rand(0.4, 0.8), rand(2, 4.5), 5), m);
        c.position.set(p.x + rand(-1, 1), 1.4, p.z + rand(-1, 1));
        c.rotation.z = rand(-0.3, 0.3);
        group.add(c);
      }
    }
  }

  // Spawn beacons.
  for (const [key, sp] of Object.entries(map.spawns)) {
    const color = key === 'attack' ? new THREE.Color(theme.accent2) : new THREE.Color(theme.accent);
    const ring = new THREE.Mesh(new THREE.RingGeometry(5.2, 5.32, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(sp.x, 0.05, sp.z); group.add(ring);
    const gate = new THREE.Mesh(new THREE.BoxGeometry(12, 0.12, 0.2), new THREE.MeshBasicMaterial({ color }));
    gate.position.set(sp.x, 3.4, sp.z); group.add(gate);
  }

  const particles = makeParticles(scene, theme.accent2, 320, 54);
  const dust = makeParticles(scene, theme.accent, 180, 40);
  dust.material.size = 0.045;

  return {
    scene, group, colliders, wallMeshes, dynamicColliders, sites, particles, dust,
    sun, hemi, rim, wallMat, wallAltMat, crateMat, metalMat, lowMat, accentMat, theme,
    update(dt, t) {
      particles.rotation.y += dt * 0.006;
      dust.position.y = Math.sin(t * 0.15) * 0.25;
      for (const s of sites) {
        s.ring.scale.setScalar(1 + Math.sin(t * 2.1 + s.x) * 0.035);
        s.light.intensity = 2.9 + Math.sin(t * 2.1 + s.x) * 0.55;
      }
    }
  };
}

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

export function createComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.38, 0.55, 0.78);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  return { composer, bloom };
}

const GUN_DARK = new THREE.MeshStandardMaterial({ color: '#171d24', roughness: 0.42, metalness: 0.72 });
const GUN_MID = new THREE.MeshStandardMaterial({ color: '#2d3740', roughness: 0.48, metalness: 0.55 });
const GUN_GRIP = new THREE.MeshStandardMaterial({ color: '#0e1217', roughness: 0.9, metalness: 0.12 });
const HAND_MAT = new THREE.MeshStandardMaterial({ color: '#a86f4e', roughness: 0.75, metalness: 0.05 });

export function createGunMesh(weaponId, scale = 1) {
  const w = WEAPONS[weaponId] || WEAPONS.standard;
  const g = new THREE.Group();
  const accent = new THREE.MeshBasicMaterial({ color: w.color || '#cfd6e4' });
  const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
    g.add(m); return m;
  };
  const t = w.type;
  let len = 0.48;
  if (t === 'Sidearm') {
    add(new THREE.BoxGeometry(0.075, 0.09, 0.26), GUN_DARK, 0, 0, 0);
    add(new THREE.BoxGeometry(0.05, 0.16, 0.08), GUN_GRIP, 0, -0.11, 0.07, -0.15);
    add(new THREE.CylinderGeometry(0.018, 0.018, 0.09, 6), GUN_MID, 0, 0.015, -0.17, Math.PI / 2);
    add(new THREE.BoxGeometry(0.012, 0.012, 0.2), accent, 0, 0.048, -0.02);
    len = 0.28;
  } else if (t === 'SMG') {
    add(new THREE.BoxGeometry(0.1, 0.12, 0.38), GUN_DARK, 0, 0, -0.02);
    add(new THREE.CylinderGeometry(0.022, 0.022, 0.22, 7), GUN_MID, 0, 0.01, -0.31, Math.PI / 2);
    add(new THREE.BoxGeometry(0.06, 0.2, 0.08), GUN_GRIP, 0, -0.13, 0.06, -0.18);
    add(new THREE.BoxGeometry(0.065, 0.19, 0.09), GUN_MID, 0, -0.13, -0.08, 0.05);
    add(new THREE.BoxGeometry(0.08, 0.05, 0.25), GUN_MID, 0, 0.07, 0.06);
    add(new THREE.BoxGeometry(0.014, 0.014, 0.24), accent, 0.052, 0.025, -0.08);
    len = 0.44;
  } else if (t === 'Shotgun') {
    add(new THREE.BoxGeometry(0.12, 0.13, 0.5), GUN_DARK, 0, 0, -0.03);
    add(new THREE.CylinderGeometry(0.032, 0.032, 0.5, 8), GUN_MID, 0, 0.035, -0.37, Math.PI / 2);
    add(new THREE.CylinderGeometry(0.026, 0.026, 0.36, 8), GUN_GRIP, 0, -0.025, -0.36, Math.PI / 2);
    add(new THREE.BoxGeometry(0.07, 0.18, 0.08), GUN_GRIP, 0, -0.13, 0.1, -0.2);
    add(new THREE.BoxGeometry(0.1, 0.05, 0.26), accent, 0, 0.06, 0.06);
    add(new THREE.BoxGeometry(0.09, 0.06, 0.2), GUN_MID, 0, -0.08, -0.18);
    len = 0.62;
  } else if (t === 'Marksman' || t === 'Sniper') {
    const long = t === 'Sniper' ? 0.95 : 0.72;
    add(new THREE.BoxGeometry(0.1, 0.11, long), GUN_DARK, 0, 0, -0.05);
    add(new THREE.CylinderGeometry(0.025, 0.03, long * 0.8, 8), GUN_MID, 0, 0.02, -long * 0.7, Math.PI / 2);
    add(new THREE.BoxGeometry(0.07, 0.2, 0.09), GUN_GRIP, 0, -0.14, 0.12, -0.18);
    add(new THREE.BoxGeometry(0.09, 0.07, 0.3), GUN_MID, 0, 0.09, 0.02);
    add(new THREE.CylinderGeometry(0.055, 0.055, 0.24, 10), GUN_GRIP, 0, 0.15, -0.06, Math.PI / 2);
    add(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 10), accent, 0, 0.15, -0.185, Math.PI / 2);
    add(new THREE.BoxGeometry(0.015, 0.015, long * 0.55), accent, 0.054, 0.0, -0.1);
    len = long + 0.1;
  } else if (t === 'LMG') {
    add(new THREE.BoxGeometry(0.16, 0.16, 0.6), GUN_DARK, 0, 0, -0.04);
    add(new THREE.CylinderGeometry(0.035, 0.04, 0.45, 8), GUN_MID, 0, 0.02, -0.48, Math.PI / 2);
    add(new THREE.BoxGeometry(0.12, 0.28, 0.16), GUN_MID, 0, -0.16, -0.02);
    add(new THREE.BoxGeometry(0.07, 0.2, 0.08), GUN_GRIP, 0, -0.15, 0.14, -0.18);
    add(new THREE.BoxGeometry(0.06, 0.06, 0.5), GUN_MID, 0, 0.11, 0.03);
    add(new THREE.BoxGeometry(0.018, 0.018, 0.42), accent, 0.085, 0.0, -0.2);
    len = 0.78;
  } else {
    add(new THREE.BoxGeometry(0.1, 0.12, 0.58), GUN_DARK, 0, 0, -0.03);
    add(new THREE.CylinderGeometry(0.023, 0.025, 0.35, 8), GUN_MID, 0, 0.02, -0.45, Math.PI / 2);
    add(new THREE.BoxGeometry(0.07, 0.22, 0.09), GUN_MID, 0, -0.15, -0.04, 0.03);
    add(new THREE.BoxGeometry(0.07, 0.19, 0.08), GUN_GRIP, 0, -0.14, 0.12, -0.18);
    add(new THREE.BoxGeometry(0.08, 0.05, 0.32), GUN_MID, 0, 0.085, 0.02);
    add(new THREE.BoxGeometry(0.016, 0.016, 0.36), accent, 0.055, 0.01, -0.08);
    len = 0.62;
  }
  g.userData.muzzle = new THREE.Vector3(0, 0.015, -len / 2 - 0.02);
  g.userData.length = len;
  g.scale.setScalar(scale);
  mergeByMaterial(g);
  return g;
}

export function createAgentModel(agent, team, index = 0, name = '') {
  const group = new THREE.Group();
  const teamColor = team === 'alpha' ? '#4ff0cf' : '#ff4d67';
  const suit = new THREE.MeshStandardMaterial({ color: agent.color, roughness: 0.62, metalness: 0.32 });
  const suitDark = new THREE.MeshStandardMaterial({ color: new THREE.Color(agent.color).multiplyScalar(0.42), roughness: 0.75, metalness: 0.2 });
  const armor = new THREE.MeshStandardMaterial({ color: new THREE.Color(agent.accent).multiplyScalar(0.7), roughness: 0.48, metalness: 0.5 });
  const dark = new THREE.MeshStandardMaterial({ color: '#161c22', roughness: 0.82, metalness: 0.2 });
  const skin = new THREE.MeshStandardMaterial({ color: SKIN[index % SKIN.length], roughness: 0.82, metalness: 0.02 });
  const hair = new THREE.MeshStandardMaterial({ color: agent.hair, roughness: 0.9, metalness: 0.02 });
  const visor = new THREE.MeshStandardMaterial({ color: agent.accent, emissive: agent.accent, emissiveIntensity: 1.25, roughness: 0.22, metalness: 0.65 });
  const teamGlow = new THREE.MeshBasicMaterial({ color: teamColor, transparent: true, opacity: 0.8 });

  const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, parent = group) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  };

  // Legs and boots.
  add(new THREE.BoxGeometry(0.16, 0.78, 0.18), dark, -0.13, 0.44, 0);
  add(new THREE.BoxGeometry(0.16, 0.78, 0.18), dark, 0.13, 0.44, 0);
  add(new THREE.BoxGeometry(0.19, 0.22, 0.25), suitDark, -0.13, 0.14, -0.03);
  add(new THREE.BoxGeometry(0.19, 0.22, 0.25), suitDark, 0.13, 0.14, -0.03);
  add(new THREE.BoxGeometry(0.16, 0.18, 0.13), armor, -0.13, 0.62, 0.1);
  add(new THREE.BoxGeometry(0.16, 0.18, 0.13), armor, 0.13, 0.62, 0.1);

  // Hips and torso. Tactical vest, not sexualized.
  add(new THREE.BoxGeometry(0.4, 0.18, 0.27), dark, 0, 0.9, 0);
  add(new THREE.BoxGeometry(0.45, 0.5, 0.28), suit, 0, 1.19, 0);
  add(new THREE.BoxGeometry(0.38, 0.34, 0.32), armor, 0, 1.22, 0);
  add(new THREE.BoxGeometry(0.31, 0.1, 0.335), teamGlow, 0, 1.37, 0);
  add(new THREE.BoxGeometry(0.12, 0.15, 0.05), teamGlow, 0, 1.13, -0.17);
  add(new THREE.BoxGeometry(0.33, 0.12, 0.06), dark, 0, 0.96, -0.16);
  add(new THREE.BoxGeometry(0.3, 0.42, 0.18), dark, 0, 1.22, 0.22);
  add(new THREE.BoxGeometry(0.22, 0.22, 0.12), suitDark, 0, 1.2, 0.33);

  // Shoulders, arms.
  const shoulderL = add(new THREE.SphereGeometry(0.15, 10, 8), armor, -0.29, 1.4, 0);
  const shoulderR = add(new THREE.SphereGeometry(0.15, 10, 8), armor, 0.29, 1.4, 0);
  shoulderL.scale.set(1, 0.8, 1); shoulderR.scale.set(1, 0.8, 1);
  add(new THREE.BoxGeometry(0.13, 0.38, 0.14), suit, -0.32, 1.16, 0, 0, 0, -0.1);
  add(new THREE.BoxGeometry(0.13, 0.38, 0.14), suit, 0.32, 1.16, 0, 0, 0, 0.1);
  add(new THREE.BoxGeometry(0.11, 0.3, 0.12), dark, -0.34, 0.9, -0.02);
  add(new THREE.BoxGeometry(0.11, 0.3, 0.12), dark, 0.34, 0.9, -0.02);
  add(new THREE.BoxGeometry(0.12, 0.1, 0.16), skin, -0.34, 0.72, -0.04);
  add(new THREE.BoxGeometry(0.12, 0.1, 0.16), skin, 0.34, 0.72, -0.04);

  // Neck, head, face, helmet/hair.
  add(new THREE.CylinderGeometry(0.065, 0.075, 0.1, 8), skin, 0, 1.52, 0);
  add(new THREE.SphereGeometry(0.155, 14, 12), skin, 0, 1.68, 0);
  add(new THREE.BoxGeometry(0.25, 0.18, 0.2), skin, 0, 1.65, -0.01);
  add(new THREE.BoxGeometry(0.26, 0.075, 0.215), visor, 0, 1.7, -0.08);
  add(new THREE.BoxGeometry(0.23, 0.1, 0.03), dark, 0, 1.6, -0.18);
  add(new THREE.BoxGeometry(0.27, 0.2, 0.28), dark, 0, 1.78, 0.03);
  add(new THREE.BoxGeometry(0.29, 0.08, 0.3), armor, 0, 1.88, 0.02);
  const hairType = index % 4;
  if (hairType === 0) {
    add(new THREE.CylinderGeometry(0.055, 0.045, 0.55, 7), hair, 0, 1.68, 0.17, 0.4);
    add(new THREE.SphereGeometry(0.12, 10, 8), hair, 0, 1.76, 0.12);
  } else if (hairType === 1) {
    add(new THREE.BoxGeometry(0.31, 0.28, 0.12), hair, 0, 1.66, 0.13);
    add(new THREE.BoxGeometry(0.25, 0.14, 0.16), hair, 0, 1.55, 0.14);
  } else if (hairType === 2) {
    add(new THREE.CylinderGeometry(0.07, 0.04, 0.72, 6), hair, 0.15, 1.63, 0.17, 0.35, 0, -0.25);
    add(new THREE.SphereGeometry(0.13, 10, 8), hair, 0, 1.77, 0.09);
  } else {
    add(new THREE.BoxGeometry(0.3, 0.1, 0.22), hair, 0, 1.8, 0.08);
    add(new THREE.BoxGeometry(0.08, 0.4, 0.1), hair, 0, 1.62, 0.15);
  }
  add(new THREE.BoxGeometry(0.1, 0.14, 0.06), teamGlow, -0.19, 1.8, -0.02);
  add(new THREE.BoxGeometry(0.1, 0.14, 0.06), teamGlow, 0.19, 1.8, -0.02);

  // Collapse the static body into one mesh per material.
  mergeByMaterial(group);

  // Weapon held in a ready pose.
  const gun = createGunMesh(agent.weapon, 0.72);
  gun.position.set(0.27, 1.18, -0.35);
  gun.rotation.set(-0.05, 0, 0);
  group.add(gun);
  add(new THREE.BoxGeometry(0.1, 0.1, 0.14), skin, 0.25, 1.1, -0.32);
  add(new THREE.BoxGeometry(0.09, 0.1, 0.16), skin, 0.34, 1.22, -0.39);

  // Team ring at feet.
  const ringMat = teamGlow.clone();
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.48, 0.54, 28), ringMat);
  ring.userData.noMerge = true;
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.025;
  group.add(ring);

  // Hitboxes (invisible but raycastable).
  const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false });
  const headHit = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), hitMat);
  headHit.position.set(0, 1.68, 0);
  headHit.userData.part = 'head';
  group.add(headHit);
  const bodyHit = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.15, 0.44), hitMat);
  bodyHit.position.set(0, 1.1, 0);
  bodyHit.userData.part = 'body';
  group.add(bodyHit);
  const legHit = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.78, 0.34), hitMat);
  legHit.position.set(0, 0.45, 0);
  legHit.userData.part = 'legs';
  group.add(legHit);

  // Name tag for teammates.
  let tag = null;
  if (name) {
    const c = makeCanvas(256, 64);
    const g = c.getContext('2d');
    g.clearRect(0, 0, 256, 64);
    g.font = '700 30px "Barlow Condensed", sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = team === 'alpha' ? '#9effef' : '#ffb0ba';
    g.fillText(name, 128, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.8 }));
    spr.position.set(0, 2.22, 0);
    spr.scale.set(1.35, 0.34, 1);
    group.add(spr);
    tag = spr;
  }

  group.userData = { agent, team, headHit, bodyHit, legHit, gun, ring, tag, teamColor };
  return group;
}

export function makeViewModel(weaponId) {
  const group = new THREE.Group();
  const gun = createGunMesh(weaponId, 1.0);
  gun.position.set(0, 0, 0);
  gun.rotation.set(0, 0.06, 0);
  group.add(gun);
  const armMat = new THREE.MeshStandardMaterial({ color: '#a86f4e', roughness: 0.8, metalness: 0.02 });
  const sleeveMat = new THREE.MeshStandardMaterial({ color: '#222c35', roughness: 0.7, metalness: 0.25 });
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.32), armMat);
  arm.position.set(0.03, -0.1, 0.18); arm.rotation.x = -0.2; group.add(arm);
  const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 0.22), sleeveMat);
  sleeve.position.set(0.05, -0.14, 0.34); sleeve.rotation.x = -0.14; group.add(sleeve);
  const hand = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.085, 0.12), armMat);
  hand.position.set(-0.015, -0.085, -0.05); group.add(hand);
  const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.085, 0.12), armMat);
  hand2.position.set(0.035, -0.095, 0.03); group.add(hand2);
  const flash = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    new THREE.MeshBasicMaterial({ color: '#ffd58a', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  const muzzle = gun.userData.muzzle;
  flash.position.copy(muzzle);
  flash.position.z -= 0.03;
  group.add(flash);
  group.scale.setScalar(0.72);
  group.userData = { gun, flash, muzzle, basePos: new THREE.Vector3(0.26, -0.25, -0.82) };
  return group;
}
