import * as THREE from "three";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
const Y_AXIS = new THREE.Vector3(0, 1, 0);

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.16, "rgba(255,248,220,0.95)");
  gradient.addColorStop(0.4, "rgba(255,208,122,0.36)");
  gradient.addColorStop(0.75, "rgba(255,151,77,0.06)");
  gradient.addColorStop(1, "rgba(255,151,77,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const blobs = [
    [50, 74, 42, 30],
    [90, 61, 55, 39],
    [132, 70, 60, 35],
    [177, 65, 48, 28],
    [213, 78, 34, 22],
    [145, 85, 86, 28],
  ];
  for (const [x, y, rx, ry] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    g.addColorStop(0, "rgba(255,255,255,0.72)");
    g.addColorStop(0.52, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, ry / rx);
    ctx.translate(-x, -y);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeWingGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0.04, -0.12);
  shape.quadraticCurveTo(-0.02, 0.3, -0.38, 0.56);
  shape.quadraticCurveTo(-0.64, 0.73, -1.04, 0.56);
  shape.quadraticCurveTo(-0.8, 0.3, -0.92, 0.02);
  shape.quadraticCurveTo(-0.58, -0.08, -0.2, -0.2);
  shape.quadraticCurveTo(-0.05, -0.18, 0.04, -0.12);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.018,
    bevelThickness: 0.014,
    curveSegments: 6,
  });
  return geometry;
}

function makeTailGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0.1, 0.26);
  shape.quadraticCurveTo(-0.35, 0.44, -0.92, 0.2);
  shape.lineTo(-0.45, 0.04);
  shape.lineTo(-0.95, -0.2);
  shape.quadraticCurveTo(-0.3, -0.3, 0.1, -0.2);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.07,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.02,
    bevelThickness: 0.012,
    curveSegments: 5,
  });
}

export class SkyhookGame {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.callbacks = callbacks;
    this.mode = "title";
    this.time = 0;
    this.runTime = 0;
    this.deadTime = 0;
    this.titleTime = 0;
    this.score = 0;
    this.hooksUsed = 0;
    this.hookStreak = 0;
    this.energy = 100;
    this.maxEnergy = 100;
    this.baseSpeed = 5.65;
    this.nextGateX = 10.4;
    this.lastGapY = 1.2;
    this.gateIndex = 0;
    this.gates = [];
    this.attachedGate = null;
    this.ropeLength = 0;
    this.holding = false;
    this.hookCooldown = 0;
    this.energyWarned = false;
    this.shake = 0;
    this.flash = 0;
    this.playerVX = this.baseSpeed;
    this.playerVY = 0;
    this.trailPoints = [];
    this.titleDrift = 0;
    this.cameraShakeX = 0;
    this.cameraShakeY = 0;
    this.cameraFocusY = 2.2;
    this.portrait = false;
    this.lookAhead = 3.2;
    this.baseFov = 50;
    this.cameraDistance = 14.8;

    this.initRenderer();
    this.initScene();
    this.initSharedAssets();
    this.initPlayer();
    this.initParticles();
    this.initEnvironment();
    this.initRope();
    this.resize();
    this.resetRun(true);
    this.mode = "title";
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.6 : 1.9));
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xdb8d68, 28, 104);
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 180);

    const hemi = new THREE.HemisphereLight(0xffe2b4, 0x092f39, 2.35);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffd3a0, 3.15);
    key.position.set(6, 11, 14);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x62e7d6, 1.45);
    rim.position.set(-9, 1, 9);
    this.scene.add(rim);

    const bounce = new THREE.DirectionalLight(0xff7f5c, 0.7);
    bounce.position.set(2, -9, 5);
    this.scene.add(bounce);

    this.scene.add(new THREE.AmbientLight(0x1d4752, 0.7));
  }

  initSharedAssets() {
    this.glowTexture = makeGlowTexture();
    this.cloudTexture = makeCloudTexture();
    this.wingGeometry = makeWingGeometry();
    this.tailGeometry = makeTailGeometry();

    this.stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x10484f,
      roughness: 0.74,
      metalness: 0.22,
      flatShading: true,
    });
    this.stoneDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x082f39,
      roughness: 0.82,
      metalness: 0.16,
      flatShading: true,
    });
    this.trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffc465,
      emissive: 0xff7d2f,
      emissiveIntensity: 1.65,
      roughness: 0.35,
      metalness: 0.7,
    });
    this.tealMaterial = new THREE.MeshStandardMaterial({
      color: 0x6dffe2,
      emissive: 0x1bc9b8,
      emissiveIntensity: 1.4,
      roughness: 0.3,
      metalness: 0.35,
    });
    this.anchorOrbMaterial = new THREE.MeshBasicMaterial({ color: 0xffecb1 });
    this.anchorCoreMaterial = new THREE.MeshBasicMaterial({ color: 0xffc75f });

    this.pillarGeometry = new THREE.CylinderGeometry(1.0, 1.16, 1, 9, 1);
    this.capGeometry = new THREE.CylinderGeometry(1.18, 1.12, 0.16, 16, 1);
    this.rimGeometry = new THREE.TorusGeometry(1.13, 0.052, 6, 28);
    this.bandGeometry = new THREE.TorusGeometry(1.035, 0.018, 4, 24);
    this.anchorRingGeometry = new THREE.TorusGeometry(0.78, 0.075, 8, 26);
    this.anchorInnerGeometry = new THREE.TorusGeometry(0.57, 0.02, 4, 22);
    this.orbGeometry = new THREE.SphereGeometry(0.15, 12, 10);
    this.shardGeometry = new THREE.OctahedronGeometry(0.1, 0);
    this.runeGeometry = new THREE.OctahedronGeometry(0.16, 0);

    this.glows = [];
  }

  makeGlowSprite(color, opacity, scale = 1) {
    const material = new THREE.SpriteMaterial({
      map: this.glowTexture,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale, scale, 1);
    sprite.userData.baseOpacity = opacity;
    sprite.userData.baseScale = scale;
    return sprite;
  }

  initPlayer() {
    this.player = new THREE.Group();
    this.bird = new THREE.Group();
    this.player.add(this.bird);
    this.scene.add(this.player);

    const ivory = new THREE.MeshStandardMaterial({
      color: 0xfff0cf,
      roughness: 0.6,
      metalness: 0.03,
      flatShading: true,
    });
    const creamDark = new THREE.MeshStandardMaterial({
      color: 0xe6cda6,
      roughness: 0.7,
      metalness: 0.02,
      flatShading: true,
    });
    const coral = new THREE.MeshStandardMaterial({
      color: 0xff6b45,
      emissive: 0x8f1f10,
      emissiveIntensity: 0.22,
      roughness: 0.62,
      metalness: 0.04,
      flatShading: true,
    });
    const coralDeep = new THREE.MeshStandardMaterial({
      color: 0xd84a31,
      emissive: 0x5f1109,
      emissiveIntensity: 0.3,
      roughness: 0.7,
      metalness: 0.03,
      flatShading: true,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: 0xffc65d,
      emissive: 0xff8d31,
      emissiveIntensity: 0.6,
      roughness: 0.36,
      metalness: 0.62,
      flatShading: true,
    });
    const eyeDark = new THREE.MeshBasicMaterial({ color: 0x0a1d23 });
    const eyeWhite = new THREE.MeshBasicMaterial({ color: 0xfffcef });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x79ffe3 });

    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.8, 5, 10), ivory);
    body.rotation.z = -Math.PI / 2;
    body.position.x = 0.08;
    body.scale.set(1.02, 0.94, 0.92);
    this.bird.add(body);

    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), creamDark);
    belly.scale.set(1.38, 0.7, 0.82);
    belly.position.set(0.2, -0.12, 0.04);
    this.bird.add(belly);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), ivory);
    head.position.set(0.78, 0.13, 0);
    head.scale.set(1.04, 0.98, 0.96);
    this.bird.add(head);

    const beakTop = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.42, 4), gold);
    beakTop.rotation.z = -Math.PI / 2;
    beakTop.position.set(1.18, 0.1, 0);
    beakTop.scale.set(1, 1, 0.76);
    this.bird.add(beakTop);

    const beakBottom = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 4), coralDeep);
    beakBottom.rotation.z = -Math.PI / 2;
    beakBottom.position.set(1.1, 0.01, 0);
    beakBottom.scale.set(1, 1, 0.64);
    this.bird.add(beakBottom);

    for (const side of [1, -1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.115, 10, 8), eyeWhite);
      eye.position.set(0.9, 0.27, 0.31 * side);
      this.bird.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.059, 8, 8), eyeDark);
      pupil.position.set(0.962, 0.278, 0.39 * side);
      this.bird.add(pupil);
      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.016, 5, 5), eyeWhite);
      glint.position.set(0.99, 0.305, 0.432 * side);
      this.bird.add(glint);
      const goggle = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.024, 5, 18), gold);
      goggle.position.set(0.9, 0.27, 0.335 * side);
      this.bird.add(goggle);
    }

    this.wingNear = new THREE.Group();
    this.wingNear.position.set(0.08, 0.11, 0.36);
    const wingN = new THREE.Mesh(this.wingGeometry, coral);
    wingN.scale.set(1.05, 1.05, 1);
    this.wingNear.add(wingN);
    this.bird.add(this.wingNear);

    this.wingFar = new THREE.Group();
    this.wingFar.position.set(0.08, 0.11, -0.37);
    const wingF = new THREE.Mesh(this.wingGeometry, coralDeep);
    wingF.scale.set(1.03, 1.03, 1);
    this.wingFar.add(wingF);
    this.bird.add(this.wingFar);

    const wingTip = new THREE.Mesh(new THREE.OctahedronGeometry(0.085, 0), gold);
    wingTip.position.set(-0.93, 0.47, 0.4);
    this.bird.add(wingTip);

    const tail = new THREE.Mesh(this.tailGeometry, coral);
    tail.position.set(-0.62, 0.02, -0.035);
    this.bird.add(tail);

    const tailEdge = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.035, 0.11), gold);
    tailEdge.position.set(-0.9, 0.08, 0);
    tailEdge.rotation.z = -0.12;
    this.bird.add(tailEdge);

    const crestMaterial = gold;
    for (let i = 0; i < 3; i++) {
      const crest = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.3 + i * 0.06, 4), i === 1 ? coral : crestMaterial);
      crest.position.set(0.62 - i * 0.12, 0.48 + i * 0.03, 0.02);
      crest.rotation.z = 0.5 + i * 0.16;
      this.bird.add(crest);
    }

    const chest = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), glowMat);
    chest.position.set(0.46, -0.08, 0.4);
    this.bird.add(chest);

    const chestGlow = this.makeGlowSprite(0x70ffe1, 0.7, 1.1);
    chestGlow.position.set(0.46, -0.08, 0.5);
    this.bird.add(chestGlow);
    this.chestGlow = chestGlow;

    const launcher = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.72, 8), gold);
    launcher.rotation.z = Math.PI / 2;
    launcher.position.set(0.42, -0.34, 0.26);
    this.bird.add(launcher);

    for (const side of [1, -1]) {
      const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.18, 3, 6), creamDark);
      leg.position.set(0.05, -0.42, 0.18 * side);
      leg.rotation.z = 0.22;
      this.bird.add(leg);
    }

    this.playerGlow = this.makeGlowSprite(0xffcf87, 0.3, 2.9);
    this.playerGlow.position.set(0, -0.08, -0.5);
    this.player.add(this.playerGlow);

    this.playerLight = new THREE.PointLight(0xffbc72, 2.4, 6, 2);
    this.playerLight.position.set(0.2, 0.1, 0.8);
    this.player.add(this.playerLight);

    this.buildScarf();

    this.trailMaterials = [];
    this.trailGroups = [];
    for (let layer = 0; layer < 3; layer++) {
      const count = 26;
      const positions = new Float32Array(count * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: layer === 0 ? 0xffe4ad : 0xff9b55,
        transparent: true,
        opacity: layer === 0 ? 0.5 : 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      line.frustumCulled = false;
      this.scene.add(line);
      this.trailMaterials.push(material);
      this.trailGroups.push({ line, positions, count, offset: layer * 0.04 });
    }
    this.resetTrail();
  }

  buildScarf() {
    const segments = 10;
    const positions = new Float32Array(segments * 2 * 3);
    const indices = [];
    for (let i = 0; i < segments - 1; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff7a4c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    this.scarf = new THREE.Mesh(geometry, material);
    this.scarf.frustumCulled = false;
    this.bird.add(this.scarf);
    this.scarfPositions = positions;
    this.scarfSegments = segments;
  }

  initParticles() {
    this.maxParticles = 260;
    this.particleData = [];
    const positions = new Float32Array(this.maxParticles * 3);
    const colors = new Float32Array(this.maxParticles * 3);
    for (let i = 0; i < this.maxParticles; i++) {
      positions[i * 3 + 1] = -999;
      this.particleData.push({ life: 0 });
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    this.particlePositions = positions;
    this.particleColors = colors;
    this.particleGeometry = geometry;
    const material = new THREE.PointsMaterial({
      map: this.glowTexture,
      size: 0.24,
      transparent: true,
      opacity: 0.95,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.particleSystem = new THREE.Points(geometry, material);
    this.particleSystem.frustumCulled = false;
    this.scene.add(this.particleSystem);
    this.particleIndex = 0;
  }

  initEnvironment() {
    const rng = mulberry32(44791);
    this.envRng = rng;
    this.clouds = [];
    this.islands = [];
    this.foreground = [];
    this.wind = [];

    this.cloudMaterialBase = this.cloudTexture;

    for (let i = 0; i < 26; i++) {
      const material = new THREE.SpriteMaterial({
        map: this.cloudTexture,
        color: i % 3 === 0 ? 0xffd7b0 : 0xffe8c9,
        transparent: true,
        opacity: 0.22 + rng() * 0.22,
        depthWrite: false,
        fog: true,
      });
      const sprite = new THREE.Sprite(material);
      const scale = 15 + rng() * 18;
      sprite.scale.set(scale, scale * (0.35 + rng() * 0.18), 1);
      sprite.position.set(-30 + i * 16 + rng() * 8, -7 + rng() * 16, -24 - rng() * 48);
      sprite.userData.baseOpacity = material.opacity;
      sprite.userData.phase = rng() * Math.PI * 2;
      this.scene.add(sprite);
      this.clouds.push(sprite);
    }

    const grassMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d6e68,
      roughness: 0.82,
      metalness: 0.05,
      flatShading: true,
    });
    const grassWarmMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b7665,
      roughness: 0.86,
      metalness: 0.04,
      flatShading: true,
    });
    const islandRockMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b3540,
      roughness: 0.9,
      metalness: 0.08,
      flatShading: true,
    });
    const islandRockWarmMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d3542,
      roughness: 0.92,
      metalness: 0.05,
      flatShading: true,
    });
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x05242b,
      roughness: 0.85,
      flatShading: true,
    });

    for (let i = 0; i < 18; i++) {
      const group = new THREE.Group();
      const radius = 1.8 + rng() * 4.2;
      const depth = 2 + rng() * 5;
      const rockMat = rng() > 0.65 ? islandRockWarmMaterial : islandRockMaterial;
      const rock = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.08, depth, 6, 1), rockMat);
      rock.position.y = -depth / 2;
      rock.rotation.y = rng() * Math.PI;
      group.add(rock);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.03, radius, 0.35, 6, 1), rng() > 0.5 ? grassMaterial : grassWarmMaterial);
      cap.position.y = 0;
      group.add(cap);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.92, 0.035, 4, 6), this.trimMaterial);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.19;
      rim.material = this.trimMaterial;
      group.add(rim);

      const treeCount = 1 + Math.floor(rng() * 3);
      for (let j = 0; j < treeCount; j++) {
        const tree = new THREE.Mesh(new THREE.ConeGeometry(0.24 + rng() * 0.18, 1.2 + rng() * 1.7, 5), treeMaterial);
        tree.position.set((rng() - 0.5) * radius * 1.4, 0.72, (rng() - 0.5) * radius * 0.55);
        tree.rotation.z = (rng() - 0.5) * 0.18;
        group.add(tree);
      }

      group.position.set(-40 + i * 45 + rng() * 22, -5 + rng() * 11, -26 - rng() * 36);
      group.rotation.y = rng() * Math.PI;
      group.userData = {
        phase: rng() * Math.PI * 2,
        baseY: group.position.y,
        drift: 0.1 + rng() * 0.2,
        span: 18 * 45,
      };
      this.scene.add(group);
      this.islands.push(group);
    }

    for (let i = 0; i < 5; i++) {
      const group = new THREE.Group();
      const radius = 1.6 + rng() * 2.8;
      const rock = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.55, 0.08, 6 + rng() * 7, 5, 1),
        new THREE.MeshStandardMaterial({ color: 0x03131b, roughness: 0.95, flatShading: true })
      );
      rock.rotation.z = (rng() - 0.5) * 0.2;
      group.add(rock);
      group.position.set(-10 + i * 35, -7 - rng() * 2.5, 7 + rng() * 3);
      group.userData = { phase: rng() * Math.PI * 2, baseY: group.position.y, span: 5 * 35 };
      this.scene.add(group);
      this.foreground.push(group);
    }

    const count = 34;
    const positions = new Float32Array(count * 2 * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: 0xffefcf,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(geometry, material);
    lines.frustumCulled = false;
    this.scene.add(lines);
    this.windLines = lines;
    this.windPositions = positions;
    for (let i = 0; i < count; i++) {
      this.wind.push({
        x: -20 + rng() * 50,
        y: -6 + rng() * 16,
        z: -5 + rng() * 13,
        len: 1.2 + rng() * 3.8,
        speed: 8 + rng() * 13,
        alpha: 0.1 + rng() * 0.45,
        phase: rng() * 100,
      });
    }

    const moteCount = 96;
    const motePositions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = -22 + rng() * 44;
      motePositions[i * 3 + 1] = -7 + rng() * 19;
      motePositions[i * 3 + 2] = -12 + rng() * 20;
    }
    const moteGeometry = new THREE.BufferGeometry();
    moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
    const moteMaterial = new THREE.PointsMaterial({
      map: this.glowTexture,
      color: 0xffd288,
      size: 0.075,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.motes = new THREE.Points(moteGeometry, moteMaterial);
    this.motes.frustumCulled = false;
    this.motePositions = motePositions;
    this.moteData = [];
    for (let i = 0; i < moteCount; i++) {
      this.moteData.push({ x: motePositions[i * 3], y: motePositions[i * 3 + 1], z: motePositions[i * 3 + 2], phase: rng() * 10 });
    }
    this.scene.add(this.motes);

    const starCount = 70;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = -100 + rng() * 800;
      starPositions[i * 3 + 1] = 9 + rng() * 34;
      starPositions[i * 3 + 2] = -85;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      map: this.glowTexture,
      color: 0xffedc5,
      size: 0.16,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);
  }

  initRope() {
    const ropeMaterial = new THREE.MeshBasicMaterial({ color: 0xffd07b, transparent: true, opacity: 0.94 });
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8a42,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const geometry = new THREE.CylinderGeometry(0.022, 0.022, 1, 5, 1);
    const glowGeometry = new THREE.CylinderGeometry(0.11, 0.11, 1, 6, 1);
    this.ropeCore = new THREE.Mesh(geometry, ropeMaterial);
    this.ropeGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.ropeCore.visible = false;
    this.ropeGlow.visible = false;
    this.scene.add(this.ropeCore, this.ropeGlow);

    this.hookHead = new THREE.Group();
    const clawMat = new THREE.MeshStandardMaterial({
      color: 0xffd379,
      emissive: 0xff9238,
      emissiveIntensity: 1,
      metalness: 0.7,
      roughness: 0.3,
    });
    const clawRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 5, 12), clawMat);
    this.hookHead.add(clawRing);
    for (let i = 0; i < 3; i++) {
      const prong = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.34, 4), clawMat);
      const angle = (i / 3) * Math.PI * 2;
      prong.position.set(Math.cos(angle) * 0.15, -0.1, Math.sin(angle) * 0.15);
      prong.rotation.z = Math.PI + Math.cos(angle) * 0.4;
      prong.rotation.x = Math.sin(angle) * 0.4;
      this.hookHead.add(prong);
    }
    const hookGlow = this.makeGlowSprite(0xffba5d, 0.75, 1.6);
    this.hookHead.add(hookGlow);
    this.hookHead.visible = false;
    this.scene.add(this.hookHead);
  }

  resize() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const aspect = width / height;
    this.portrait = aspect < 0.86;
    this.camera.aspect = aspect;
    const verticalSpan = clamp(22 / aspect, 11.4, 16.1);
    this.baseFov = this.portrait ? 56 : 50;
    this.camera.fov = this.baseFov;
    this.cameraDistance = verticalSpan / (2 * Math.tan((this.baseFov * Math.PI) / 360));
    this.lookAhead = this.portrait ? 2.2 : 3.5;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 768 ? 1.6 : 1.9));
    this.renderer.setSize(width, height, false);
    this.applyCamera(1, true);
  }

  resetRun(initial = false) {
    for (const gate of this.gates) {
      this.scene.remove(gate.group);
    }
    this.gates = [];
    this.gateIndex = 0;
    this.nextGateX = 10.2;
    this.lastGapY = 1.2;
    this.score = 0;
    this.hooksUsed = 0;
    this.hookStreak = 0;
    this.energy = 100;
    this.energyWarned = false;
    this.baseSpeed = 5.65;
    this.playerVX = this.baseSpeed;
    this.playerVY = 0;
    this.attachedGate = null;
    this.holding = false;
    this.hookCooldown = 0;
    this.runTime = 0;
    this.deadTime = 0;
    this.shake = 0;
    this.flash = 0;
    this.player.position.set(0.4, 2.15, 0);
    this.player.rotation.set(0, 0, 0);
    this.bird.rotation.set(0, 0, 0);
    this.bird.scale.setScalar(1);
    this.ropeCore.visible = false;
    this.ropeGlow.visible = false;
    this.hookHead.visible = false;
    this.cameraFocusY = 2.6;
    this.playerGlow.material.opacity = 0.3;
    this.clearParticles();
    this.resetTrail();
    this.spawnInitialGates();
    this.applyCamera(1, true);
    if (!initial) this.mode = "playing";
    this.titleDrift = 0;
    this.callbacks.onEnergy?.(this.energy, this.maxEnergy);
    this.callbacks.onScore?.(this.score);
    this.callbacks.onHook?.(this.hooksUsed);
  }

  spawnInitialGates() {
    while (this.nextGateX < 48) this.spawnGate();
  }

  spawnGate() {
    const index = this.gateIndex++;
    const rng = this.envRng;
    let gapH;
    let gapY;
    let x = this.nextGateX;

    if (index === 0) {
      gapH = 6.7;
      gapY = 1.3;
    } else {
      const difficulty = clamp(index / 34, 0, 1);
      gapH = lerp(6.45, 4.9, difficulty);
      const drift = (rng() * 2 - 1) * lerp(1.7, 3.1, difficulty);
      gapY = clamp(this.lastGapY + drift, -1.3, 4.75);
      const ceiling = 8.0 - gapH / 2;
      const floor = -4.8 + gapH / 2;
      gapY = clamp(gapY, floor, ceiling);
    }

    const gapBottom = gapY - gapH / 2;
    const gapTop = gapY + gapH / 2;
    const group = new THREE.Group();
    group.position.x = x;

    const seed = 100 + index * 3.77;
    const gateRng = mulberry32(Math.floor(seed * 1000));

    const bottomTop = gapBottom - 0.08;
    const bottomBottom = -15;
    const bottomHeight = bottomTop - bottomBottom;
    const bottomPillar = new THREE.Mesh(this.pillarGeometry, this.stoneMaterial);
    bottomPillar.scale.set(2.18, bottomHeight, 2.18);
    bottomPillar.position.y = (bottomTop + bottomBottom) / 2;
    bottomPillar.rotation.y = gateRng() * Math.PI;
    group.add(bottomPillar);

    const topBottom = gapTop + 0.08;
    const topTop = 20;
    const topHeight = topTop - topBottom;
    const topPillar = new THREE.Mesh(this.pillarGeometry, this.stoneMaterial);
    topPillar.scale.set(2.18, topHeight, 2.18);
    topPillar.position.y = (topTop + topBottom) / 2;
    topPillar.rotation.z = Math.PI;
    topPillar.rotation.y = gateRng() * Math.PI;
    group.add(topPillar);

    const bottomCap = new THREE.Mesh(this.capGeometry, this.stoneDarkMaterial);
    bottomCap.scale.set(2.22, 2.2, 2.22);
    bottomCap.position.y = gapBottom - 0.22;
    group.add(bottomCap);

    const topCap = new THREE.Mesh(this.capGeometry, this.stoneDarkMaterial);
    topCap.scale.set(2.22, 2.2, 2.22);
    topCap.position.y = gapTop + 0.22;
    group.add(topCap);

    for (const [edgeY, direction] of [
      [gapBottom - 0.05, 1],
      [gapTop + 0.05, -1],
    ]) {
      const rim = new THREE.Mesh(this.rimGeometry, this.trimMaterial);
      rim.scale.set(2.2, 2.2, 2.2);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = edgeY;
      group.add(rim);

      const rimGlow = this.makeGlowSprite(0xffa553, 0.42, 4.4);
      rimGlow.scale.set(4.8, 1.7, 1);
      rimGlow.position.set(0, edgeY + direction * 0.1, 0.6);
      group.add(rimGlow);
      this.glows.push(rimGlow);

      for (let b = 0; b < 3; b++) {
        const band = new THREE.Mesh(this.bandGeometry, this.tealMaterial);
        band.scale.set(2.15, 2.15, 2.15);
        band.rotation.x = Math.PI / 2;
        band.position.y = edgeY + direction * (1.4 + b * 1.55);
        group.add(band);
      }
    }

    for (const edgeY of [gapBottom, gapTop]) {
      for (const xSide of [-1.72, 1.72]) {
        const rune = new THREE.Mesh(this.runeGeometry, this.tealMaterial);
        rune.position.set(xSide, edgeY + (edgeY < gapY ? 1.7 : -1.7), 2.24);
        rune.scale.set(0.8, 2.1, 0.8);
        group.add(rune);
      }
    }

    const anchor = new THREE.Group();
    anchor.position.set(0, gapY, 0.38);
    const anchorRing = new THREE.Mesh(this.anchorRingGeometry, this.trimMaterial);
    anchor.add(anchorRing);
    const anchorInner = new THREE.Mesh(this.anchorInnerGeometry, this.anchorOrbMaterial);
    anchor.add(anchorInner);
    const orb = new THREE.Mesh(this.orbGeometry, this.anchorCoreMaterial);
    anchor.add(orb);
    const orbHalo = this.makeGlowSprite(0xffc466, 0.95, 3.2);
    anchor.add(orbHalo);

    const orbit = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const shard = new THREE.Mesh(this.shardGeometry, i % 2 ? this.anchorOrbMaterial : this.trimMaterial);
      const angle = (i / 4) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 1.12, Math.sin(angle) * 1.12, 0);
      shard.scale.setScalar(0.65 + (i % 2) * 0.35);
      orbit.add(shard);
    }
    anchor.add(orbit);
    group.add(anchor);

    const shardGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const shard = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.13 + gateRng() * 0.22, 0),
        i % 2 ? this.stoneDarkMaterial : this.stoneMaterial
      );
      shard.position.set((gateRng() - 0.5) * 5.4, gapY + (gateRng() - 0.5) * (gapH + 1.5), (gateRng() - 0.5) * 3.6);
      shard.userData = {
        baseY: shard.position.y,
        phase: gateRng() * Math.PI * 2,
        speed: 0.4 + gateRng() * 0.8,
        spin: (gateRng() - 0.5) * 1.4,
      };
      shardGroup.add(shard);
    }
    group.add(shardGroup);

    const gate = {
      x,
      gapY,
      gapH,
      gapBottom,
      gapTop,
      group,
      anchor,
      orbit,
      orb,
      orbHalo,
      shards: shardGroup,
      anchorWorld: new THREE.Vector3(x, gapY, 0.38),
      scored: false,
      passedWithHook: false,
      phase: gateRng() * Math.PI * 2,
      index,
    };
    this.scene.add(group);
    this.gates.push(gate);

    const difficulty = clamp(index / 35, 0, 1);
    this.lastGapY = gapY;
    this.nextGateX += lerp(9.85, 8.6, difficulty);
  }

  clearGates() {
    for (const gate of this.gates) this.scene.remove(gate.group);
    this.gates = [];
  }

  startRun() {
    this.callbacks.onStart?.();
    this.resetRun(false);
    this.mode = "playing";
    this.titleDrift = 0;
  }

  goToTitle() {
    this.attachedGate = null;
    this.holding = false;
    this.ropeCore.visible = false;
    this.ropeGlow.visible = false;
    this.hookHead.visible = false;
    this.resetRun(true);
    this.titleDrift = 0;
  }

  pause() {
    if (this.mode === "playing") this.mode = "paused";
  }

  resume() {
    if (this.mode === "paused") this.mode = "playing";
  }

  setHolding(value) {
    if (this.mode !== "playing") {
      this.holding = false;
      return;
    }
    this.holding = value;
    if (!value && this.attachedGate) {
      this.releaseGrapple("release");
    }
  }

  flap() {
    if (this.mode !== "playing") return;
    this.playerVY = Math.min(this.playerVY + 6.8, 9.4);
    this.flapKick = 1;
    this.flapPhase = (this.flapPhase || 0) + 2.1;
    this.spawnFlapBurst();
    this.callbacks.onFlap?.();
  }

  findHookTarget() {
    if (this.mode !== "playing" || this.energy < 7) return null;
    const px = this.player.position.x;
    const py = this.player.position.y;
    let best = null;
    let bestScore = Infinity;
    for (const gate of this.gates) {
      if (gate.scored) continue;
      const dx = gate.anchorWorld.x - px;
      const dy = gate.anchorWorld.y - py;
      if (dx < -1.2 || dx > 10.4) continue;
      const dist = Math.hypot(dx, dy);
      if (dist > 10.2) continue;
      const score = dist + Math.max(0, -dx) * 3;
      if (score < bestScore) {
        bestScore = score;
        best = { gate, dist, dx, dy };
      }
    }
    return best;
  }

  attachGrapple(target) {
    this.attachedGate = target.gate;
    const dist = Math.max(1.2, target.dist);
    this.ropeLength = dist * 0.98;
    this.hookCooldown = 0.2;
    this.hooksUsed += 1;
    this.energyWarned = false;
    this.ropeCore.visible = true;
    this.ropeGlow.visible = true;
    this.hookHead.visible = true;
    this.hookHead.position.copy(target.gate.anchorWorld);
    this.callbacks.onGrapple?.(target.gate);
    this.callbacks.onHook?.(this.hooksUsed);
    this.spawnHookBurst(target.gate.anchorWorld, 0xffc465, 10);
    this.shake = Math.max(this.shake, 0.22);
  }

  releaseGrapple(reason = "release") {
    if (!this.attachedGate) return;
    const gate = this.attachedGate;
    this.attachedGate = null;
    this.ropeCore.visible = false;
    this.ropeGlow.visible = false;
    this.hookHead.visible = false;
    if (reason === "release" || reason === "near" || reason === "energy") {
      this.playerVY = Math.max(this.playerVY, reason === "near" ? 3.2 : 1.8);
      this.playerVX = Math.max(this.playerVX, this.baseSpeed * (reason === "near" ? 1.45 : 1.18));
      this.flash = Math.max(this.flash, reason === "near" ? 0.55 : 0.25);
      this.callbacks.onRelease?.(gate, reason);
      this.spawnHookBurst(gate.anchorWorld, reason === "near" ? 0xffecb4 : 0xffc465, reason === "near" ? 18 : 8);
    }
    this.hookCooldown = 0.12;
  }

  die(reason = "gate") {
    if (this.mode !== "playing") return;
    this.mode = "dead";
    this.deadTime = 0;
    this.holding = false;
    if (this.attachedGate) {
      this.attachedGate = null;
      this.ropeCore.visible = false;
      this.ropeGlow.visible = false;
      this.hookHead.visible = false;
    }
    this.shake = 1.15;
    this.flash = 1;
    this.playerVY = Math.min(this.playerVY + 2.8, 5);
    this.playerVX *= 0.5;
    this.spawnCrashBurst();
    this.callbacks.onDeath?.(this.score, this.hooksUsed);
  }

  update(dt) {
    dt = Math.min(dt, 0.034);
    if (this.mode === "paused") {
      this.updateVisuals(0);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    this.time += dt;
    this.updateEnvironment(dt);

    if (this.mode === "playing") this.updatePlaying(dt);
    else if (this.mode === "title") this.updateTitle(dt);
    else if (this.mode === "dead") this.updateDead(dt);

    this.updateGates(dt);
    this.updatePlayerVisuals(dt);
    this.updateParticles(dt);
    this.updateRope();
    this.updateTrail(dt);
    this.updateCamera(dt);
    this.updateVisuals(dt);
    this.renderer.render(this.scene, this.camera);
  }

  updatePlaying(dt) {
    this.runTime += dt;
    this.hookCooldown = Math.max(0, this.hookCooldown - dt);
    const targetSpeed = this.baseSpeed;

    if (this.holding && !this.attachedGate && this.hookCooldown <= 0 && this.energy > 7) {
      const target = this.findHookTarget();
      if (target) this.attachGrapple(target);
    }

    if (this.attachedGate) {
      const gate = this.attachedGate;
      const anchor = gate.anchorWorld;
      const px = this.player.position.x;
      const py = this.player.position.y;
      const dx = anchor.x - px;
      const dy = anchor.y - py;
      const dist = Math.hypot(dx, dy) || 0.001;
      const nx = dx / dist;
      const ny = dy / dist;

      const pull = 31 + clamp(1.4 - dist / 8, 0, 0.7) * 20;
      this.playerVX += nx * pull * dt;
      this.playerVY += ny * pull * 0.82 * dt;
      this.playerVY -= 7.2 * dt;
      this.playerVX += 3.1 * dt;
      this.ropeLength = Math.max(1.55, this.ropeLength - 3.0 * dt);

      this.energy -= 39 * dt;
      if (this.energy <= 0) {
        this.energy = 0;
        this.releaseGrapple("energy");
        this.callbacks.onLowEnergy?.();
      } else if (this.energy < 22 && !this.energyWarned) {
        this.energyWarned = true;
        this.callbacks.onLowEnergy?.();
      }

      this.playerVX = clamp(this.playerVX, 1.5, 15);
      this.playerVY = clamp(this.playerVY, -12, 13);

      if (dist < 1.55 || px > anchor.x + 2.6) {
        this.releaseGrapple("near");
      }
    } else {
      this.energy = Math.min(this.maxEnergy, this.energy + 23 * dt);
      this.energyWarned = this.energy < 22;
      this.playerVX = lerp(this.playerVX, targetSpeed, 1 - Math.exp(-1.6 * dt));
      this.playerVY -= 18.6 * dt;
    }

    if (!this.attachedGate) this.playerVY -= 18.6 * dt * 0;
    this.playerVY = Math.max(this.playerVY, -15.5);
    this.player.position.x += this.playerVX * dt;
    this.player.position.y += this.playerVY * dt;
    this.player.position.z = 0;

    if (this.attachedGate) {
      const anchor = this.attachedGate.anchorWorld;
      const dx = anchor.x - this.player.position.x;
      const dy = anchor.y - this.player.position.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      if (dist > this.ropeLength) {
        const nx = dx / dist;
        const ny = dy / dist;
        this.player.position.x = anchor.x - nx * this.ropeLength;
        this.player.position.y = anchor.y - ny * this.ropeLength;
        const radial = this.playerVX * nx + this.playerVY * ny;
        if (radial < 0) {
          this.playerVX -= nx * radial;
          this.playerVY -= ny * radial;
        }
      }
    }

    if (this.player.position.y > 10.35) {
      this.player.position.y = 10.35;
      this.playerVY = Math.min(this.playerVY, -1.2);
    }

    this.checkGateScores();
    this.checkCollisions();

    if (this.player.position.y < -7.4) this.die("fall");
    this.baseSpeed = Math.min(8.05, 5.65 + this.score * 0.028);

    while (this.nextGateX < this.player.position.x + 46) this.spawnGate();
    for (let i = this.gates.length - 1; i >= 0; i--) {
      const gate = this.gates[i];
      if (gate.x < this.player.position.x - 24) {
        this.scene.remove(gate.group);
        this.gates.splice(i, 1);
      }
    }
    this.callbacks.onEnergy?.(this.energy, this.maxEnergy);
  }

  checkGateScores() {
    for (const gate of this.gates) {
      if (gate.scored) continue;
      if (this.player.position.x > gate.x) {
        gate.scored = true;
        const hooked = this.attachedGate === gate;
        gate.passedWithHook = hooked;
        if (hooked) {
          this.score += 2;
          this.hookStreak += 1;
        } else {
          this.score += 1;
          this.hookStreak = 0;
        }
        this.callbacks.onScore?.(this.score, hooked, this.hookStreak, gate);
        this.spawnGateBurst(gate, hooked);
      }
    }
  }

  checkCollisions() {
    const px = this.player.position.x;
    const py = this.player.position.y;
    const radius = 0.44;
    for (const gate of this.gates) {
      if (Math.abs(px - gate.x) > 2.5 + radius) continue;
      if (py - radius < gate.gapBottom || py + radius > gate.gapTop) {
        this.die("gate");
        return;
      }
    }
  }

  updateTitle(dt) {
    this.titleTime += dt;
    this.titleDrift += dt;
    const t = this.titleTime;
    this.player.position.x = 0.4 + Math.sin(t * 0.45) * 0.22;
    this.player.position.y = 2.15 + Math.sin(t * 1.25) * 0.22;
    this.player.position.z = 0;
    this.bird.rotation.z = Math.sin(t * 0.9) * 0.045;
    this.bird.rotation.y = 0.1 + Math.sin(t * 0.35) * 0.12;
    this.flapPhase = (this.flapPhase || 0) + dt * 2.5;
    this.flapKick = Math.max(0, (this.flapKick || 0) - dt * 2);
    this.energy = 100;
    this.callbacks.onEnergy?.(this.energy, this.maxEnergy);
  }

  updateDead(dt) {
    this.deadTime += dt;
    this.playerVY -= 17.5 * dt;
    this.player.position.x += this.playerVX * dt;
    this.player.position.y += this.playerVY * dt;
    this.playerVX *= 1 - dt * 0.7;
    if (this.player.position.y < -12) {
      this.player.position.y = -12;
      this.playerVY = 0;
    }
    this.bird.rotation.z += dt * 3.2;
    this.bird.rotation.x += dt * 2.1;
    this.energy = Math.min(this.maxEnergy, this.energy + 10 * dt);
  }

  updateVisuals(dt) {
    this.flash = Math.max(0, this.flash - dt * 2.8);
    this.shake = Math.max(0, this.shake - dt * 2.3);
    this.callbacks.onFx?.({ flash: this.flash, shake: this.shake });
    const pulse = 0.72 + Math.sin(this.time * 3.4) * 0.14;
    if (this.playerGlow) this.playerGlow.material.opacity = 0.25 + pulse * 0.08;
    if (this.chestGlow) this.chestGlow.material.opacity = 0.45 + pulse * 0.35;
  }

  updateEnvironment(dt) {
    const px = this.player.position.x;
    const t = this.time;

    for (const cloud of this.clouds) {
      cloud.position.x += dt * 0.16;
      if (cloud.position.x < px - 80) {
        cloud.position.x = px + 90 + Math.random() * 35;
        cloud.position.y = -7 + Math.random() * 16;
        cloud.position.z = -24 - Math.random() * 48;
      }
      cloud.material.opacity = cloud.userData.baseOpacity * (0.8 + Math.sin(t * 0.12 + cloud.userData.phase) * 0.2);
    }

    for (const island of this.islands) {
      island.position.y = island.userData.baseY + Math.sin(t * 0.22 + island.userData.phase) * island.userData.drift;
      if (island.position.x < px - 85) {
        island.position.x = px + 85 + Math.random() * 180;
        island.position.y = -5 + Math.random() * 11;
        island.userData.baseY = island.position.y;
      }
    }

    for (const rock of this.foreground) {
      rock.position.y = rock.userData.baseY + Math.sin(t * 0.4 + rock.userData.phase) * 0.18;
      if (rock.position.x < px - 25) {
        rock.position.x = px + 25 + Math.random() * 70;
        rock.position.y = -7 - Math.random() * 3;
        rock.userData.baseY = rock.position.y;
      }
    }

    const positions = this.windPositions;
    for (let i = 0; i < this.wind.length; i++) {
      const w = this.wind[i];
      w.x -= w.speed * dt * (this.mode === "playing" ? 1 : 0.3);
      if (w.x < px - 23) {
        w.x = px + 20 + Math.random() * 18;
        w.y = -6 + Math.random() * 16;
        w.z = -5 + Math.random() * 13;
        w.len = 1.2 + Math.random() * 3.8;
      }
      const glide = Math.sin(t * 0.7 + w.phase) * 0.18;
      positions[i * 6] = w.x;
      positions[i * 6 + 1] = w.y + glide;
      positions[i * 6 + 2] = w.z;
      positions[i * 6 + 3] = w.x - w.len;
      positions[i * 6 + 4] = w.y + glide + 0.02;
      positions[i * 6 + 5] = w.z;
    }
    this.windLines.geometry.attributes.position.needsUpdate = true;
    this.windLines.material.opacity = this.mode === "playing" ? 0.18 : 0.1;

    for (const mote of this.moteData) {
      mote.x -= dt * 0.55;
      if (mote.x < px - 24) {
        mote.x = px + 22 + Math.random() * 8;
        mote.y = -7 + Math.random() * 19;
        mote.z = -12 + Math.random() * 20;
      }
      const idx = this.moteData.indexOf(mote) * 3;
      this.motePositions[idx] = mote.x;
      this.motePositions[idx + 1] = mote.y + Math.sin(t * 0.6 + mote.phase) * 0.35;
      this.motePositions[idx + 2] = mote.z;
    }
    this.motes.geometry.attributes.position.needsUpdate = true;
    this.stars.position.x = px * 0.78;
  }

  updateGates(dt) {
    const t = this.time;
    for (const gate of this.gates) {
      gate.anchor.rotation.z = Math.sin(t * 0.5 + gate.phase) * 0.1;
      gate.orbit.rotation.z = t * 0.6 + gate.phase;
      gate.orb.scale.setScalar(0.88 + Math.sin(t * 3.2 + gate.phase) * 0.16);
      gate.orbHalo.material.opacity = 0.62 + Math.sin(t * 2.5 + gate.phase) * 0.22;
      gate.orbHalo.scale.setScalar(3 + Math.sin(t * 2.5 + gate.phase) * 0.35);
      for (const shard of gate.shards.children) {
        shard.position.y = shard.userData.baseY + Math.sin(t * shard.userData.speed + shard.userData.phase) * 0.25;
        shard.rotation.x += dt * shard.userData.spin;
        shard.rotation.y += dt * shard.userData.spin * 0.7;
      }
    }
  }

  updatePlayerVisuals(dt) {
    const targetPitch = clamp(this.playerVY * 0.034, -0.48, 0.36);
    if (this.mode !== "dead") {
      this.bird.rotation.z = damp(this.bird.rotation.z, targetPitch, 6, dt);
      this.bird.rotation.x = damp(this.bird.rotation.x, clamp(-this.playerVX * 0.008, -0.1, 0.05), 3, dt);
    }

    const nearAttached = this.attachedGate ? 1 : 0;
    this.flapKick = Math.max(0, (this.flapKick || 0) - dt * 3.2);
    this.flapPhase = (this.flapPhase || 0) + dt * (this.mode === "playing" ? 3.4 : 2.2);
    const cycle = Math.sin(this.flapPhase) * 0.16 + this.flapKick * 0.72;
    this.wingNear.rotation.z = 0.12 + cycle + nearAttached * 0.2;
    this.wingFar.rotation.z = -0.02 - cycle * 0.82 - nearAttached * 0.14;
    this.wingNear.rotation.y = Math.sin(this.flapPhase * 0.5) * 0.04;
    this.wingFar.rotation.y = Math.PI + Math.sin(this.flapPhase * 0.5 + 1) * 0.04;

    this.playerLight.intensity = this.mode === "playing" ? 2.5 + Math.sin(this.time * 4) * 0.25 : 2.2;

    this.updateScarf(dt);
    if (this.playerGlow) {
      const s = 2.65 + Math.sin(this.time * 2.6) * 0.2;
      this.playerGlow.scale.set(s, s, 1);
    }
  }

  updateScarf(dt) {
    const positions = this.scarfPositions;
    const segments = this.scarfSegments;
    const t = this.time;
    for (let i = 0; i < segments; i++) {
      const f = i / (segments - 1);
      const x = 0.42 - f * 2.1;
      const y = 0.27 - f * 0.25 + Math.sin(t * 7 - i * 0.55) * 0.07 * f;
      const z = Math.sin(t * 5.2 - i * 0.42) * 0.06 * f;
      const width = 0.09 * (1 - f * 0.55);
      const idx = i * 6;
      positions[idx] = x;
      positions[idx + 1] = y + width;
      positions[idx + 2] = z;
      positions[idx + 3] = x - 0.015;
      positions[idx + 4] = y - width;
      positions[idx + 5] = z + 0.01;
    }
    this.scarf.geometry.attributes.position.needsUpdate = true;
  }

  resetTrail() {
    this.trailPoints = [];
    for (let i = 0; i < 26; i++) {
      this.trailPoints.push(new THREE.Vector3(this.player.position.x - 0.8, this.player.position.y, 0));
    }
    for (const trail of this.trailGroups || []) {
      for (let i = 0; i < 26; i++) {
        const p = this.trailPoints[i];
        trail.positions[i * 3] = p.x;
        trail.positions[i * 3 + 1] = p.y;
        trail.positions[i * 3 + 2] = p.z;
      }
      trail.line.geometry.attributes.position.needsUpdate = true;
    }
  }

  updateTrail() {
    if (!this.trailGroups?.length) return;
    const head = new THREE.Vector3(
      this.player.position.x - 0.78,
      this.player.position.y + Math.sin(this.time * 4) * 0.03,
      -0.02
    );
    this.trailPoints.pop();
    this.trailPoints.unshift(head);
    for (let layer = 0; layer < this.trailGroups.length; layer++) {
      const trail = this.trailGroups[layer];
      for (let i = 0; i < trail.count; i++) {
        const p = this.trailPoints[i];
        const fade = 1 - i / trail.count;
        trail.positions[i * 3] = p.x + Math.sin(this.time * 2 + i * 0.45) * 0.02 * fade;
        trail.positions[i * 3 + 1] = p.y + layer * 0.045 * fade;
        trail.positions[i * 3 + 2] = p.z + layer * 0.06;
      }
      trail.line.geometry.attributes.position.needsUpdate = true;
      trail.line.material.opacity = this.mode === "title" ? 0.18 : 0.38;
    }
  }

  updateRope() {
    if (!this.attachedGate) return;
    const start = this.player.position;
    const end = this.attachedGate.anchorWorld;
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const delta = new THREE.Vector3().subVectors(end, start);
    const length = delta.length();
    const quat = new THREE.Quaternion().setFromUnitVectors(Y_AXIS, delta.clone().normalize());
    for (const rope of [this.ropeCore, this.ropeGlow]) {
      rope.position.copy(mid);
      rope.quaternion.copy(quat);
      rope.scale.set(1, length, 1);
    }
    this.hookHead.position.copy(end);
    this.hookHead.rotation.z += 0.1;
    this.ropeGlow.material.opacity = 0.12 + Math.sin(this.time * 18) * 0.04;
  }

  updateParticles(dt) {
    const positions = this.particlePositions;
    const colors = this.particleColors;
    let any = false;
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particleData[i];
      if (p.life <= 0) {
        positions[i * 3 + 1] = -999;
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0;
        continue;
      }
      any = true;
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      p.vx *= 1 - p.drag * dt;
      p.vy += p.gravity * dt;
      p.vz *= 1 - p.drag * dt;
      const lifeRatio = Math.max(0, p.life / p.maxLife);
      const glow = Math.pow(lifeRatio, 0.55);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      colors[i * 3] = p.r * glow;
      colors[i * 3 + 1] = p.g * glow;
      colors[i * 3 + 2] = p.b * glow;
    }
    this.particleGeometry.attributes.position.needsUpdate = true;
    this.particleGeometry.attributes.color.needsUpdate = true;
    this.particleSystem.visible = any;
  }

  spawnParticle(x, y, z, vx, vy, vz, life, color, gravity = 0, drag = 1) {
    const p = this.particleData[this.particleIndex];
    const c = new THREE.Color(color);
    p.x = x;
    p.y = y;
    p.z = z;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.life = life;
    p.maxLife = life;
    p.r = c.r;
    p.g = c.g;
    p.b = c.b;
    p.gravity = gravity;
    p.drag = drag;
    this.particleIndex = (this.particleIndex + 1) % this.maxParticles;
  }

  spawnFlapBurst() {
    const p = this.player.position;
    for (let i = 0; i < 5; i++) {
      this.spawnParticle(
        p.x - 0.2 + Math.random() * 0.4,
        p.y - 0.3 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.3,
        -1.5 - Math.random() * 1.8,
        -0.4 - Math.random() * 1,
        (Math.random() - 0.5) * 0.5,
        0.35 + Math.random() * 0.2,
        i < 2 ? 0xffc46c : 0xff8a55,
        -2,
        1.6
      );
    }
  }

  spawnHookBurst(position, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * 5.2;
      this.spawnParticle(
        position.x + (Math.random() - 0.5) * 0.4,
        position.y + (Math.random() - 0.5) * 0.4,
        position.z + (Math.random() - 0.5) * 0.4,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        (Math.random() - 0.5) * speed * 0.4,
        0.45 + Math.random() * 0.55,
        color,
        -1.4,
        0.8
      );
    }
  }

  spawnCrashBurst() {
    const p = this.player.position;
    for (let i = 0; i < 48; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 8;
      const palette = [0xff6b45, 0xffd37a, 0xfff1d6, 0x6fffe0];
      this.spawnParticle(
        p.x,
        p.y,
        p.z,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed + 2,
        (Math.random() - 0.5) * speed * 0.35,
        0.6 + Math.random() * 1.1,
        palette[Math.floor(Math.random() * palette.length)],
        -6,
        0.8
      );
    }
  }

  spawnGateBurst(gate, perfect) {
    if (perfect) {
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        this.spawnParticle(
          gate.x,
          gate.gapY,
          0.5,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * 2,
          0.5 + Math.random() * 0.7,
          Math.random() > 0.45 ? 0xffe1a0 : 0x7dffe3,
          -0.8,
          0.6
        );
      }
    } else {
      for (let i = 0; i < 8; i++) {
        this.spawnParticle(
          gate.x,
          gate.gapY + (Math.random() - 0.5) * gate.gapH * 0.7,
          0.2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          0.3 + Math.random() * 0.3,
          0xffbd72,
          -0.5,
          1
        );
      }
    }
  }

  clearParticles() {
    for (const p of this.particleData) p.life = 0;
    this.particleSystem.visible = false;
  }

  applyCamera(dt, snap = false) {
    const aspect = this.camera.aspect;
    let verticalSpan = clamp(22 / aspect, 11.4, 16.1);
    const targetFov = this.baseFov + (this.attachedGate ? 3.4 : 0) + this.flash * 2.5;
    if (snap) this.camera.fov = targetFov;
    else this.camera.fov = damp(this.camera.fov, targetFov, 4, dt);
    this.cameraDistance = verticalSpan / (2 * Math.tan((this.camera.fov * Math.PI) / 360));

    const player = this.player.position;
    const title = this.mode === "title";
    let desiredFocus;
    let desiredCamY;
    let lookX;
    let camX;

    if (title) {
      desiredFocus = 1.9;
      desiredCamY = 2.3;
      camX = -0.4 + Math.sin(this.titleTime * 0.14) * 0.25;
      lookX = -1.2 + Math.sin(this.titleTime * 0.12) * 0.3;
    } else {
      desiredFocus = clamp(player.y * 0.3 + 0.7, -1.6, 4.6);
      desiredCamY = desiredFocus + 1.35;
      camX = player.x + (this.portrait ? 0.65 : 0.95);
      const ahead = this.lookAhead;
      lookX = player.x + ahead;
    }

    if (snap) this.cameraFocusY = desiredFocus;
    else this.cameraFocusY = damp(this.cameraFocusY, desiredFocus, 3.2, dt);

    const shakeStrength = this.shake * this.shake;
    this.cameraShakeX = (Math.random() - 0.5) * shakeStrength * 1.3;
    this.cameraShakeY = (Math.random() - 0.5) * shakeStrength * 1.1;

    const camY = (snap ? desiredCamY : damp(this.camera.position.y, desiredCamY, 5, dt)) + this.cameraShakeY;
    const x = (snap ? camX : damp(this.camera.position.x, camX, 8, dt)) + this.cameraShakeX;
    this.camera.position.set(x, camY, this.cameraDistance);
    this.camera.lookAt(lookX + this.cameraShakeX * 0.2, this.cameraFocusY + 0.2, 0);
    this.camera.updateProjectionMatrix();
  }

  updateCamera(dt) {
    this.applyCamera(dt, false);
  }

  projectWorldPosition(position) {
    const vector = position.clone().project(this.camera);
    return {
      x: (vector.x * 0.5 + 0.5) * this.canvas.clientWidth,
      y: (-vector.y * 0.5 + 0.5) * this.canvas.clientHeight,
      visible: vector.z < 1 && vector.x > -1.2 && vector.x < 1.2 && vector.y > -1.2 && vector.y < 1.2,
    };
  }

  getHookHint() {
    if (this.mode !== "playing" || this.attachedGate || this.energy < 12) return null;
    const target = this.findHookTarget();
    if (!target) return null;
    const screen = this.projectWorldPosition(target.gate.anchorWorld);
    if (!screen.visible) return null;
    return { ...screen, gate: target.gate };
  }

  getDisplayState() {
    return {
      mode: this.mode,
      score: this.score,
      hooks: this.hooksUsed,
      energy: this.energy,
      maxEnergy: this.maxEnergy,
      attached: Boolean(this.attachedGate),
      speed: this.playerVX,
      time: this.runTime,
    };
  }
}
