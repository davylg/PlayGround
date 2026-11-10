import * as THREE from 'three';

const TAU = Math.PI * 2;

function radialTexture() {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.7)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.16)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function bannerTexture() {
  const w = 128; const h = 320;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2b0d18';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, 'rgba(0,0,0,0.6)');
  g.addColorStop(0.5, 'rgba(255,80,90,0.09)');
  g.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // fine cloth weave
  for (let i = 0; i < 900; i++) {
    ctx.globalAlpha = 0.05 + Math.random() * 0.05;
    ctx.fillStyle = Math.random() > 0.5 ? '#ff9eb0' : '#000';
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, Math.random() * 5 + 1);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = 'rgba(255,196,110,0.38)';
  ctx.lineWidth = 2;
  ctx.strokeRect(9, 9, w - 18, h - 18);

  // faint sun disc behind a katana mark
  ctx.strokeStyle = 'rgba(255,214,150,0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w / 2, 118, 33, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,214,150,0.06)';
  ctx.beginPath();
  ctx.arc(w / 2, 118, 32, 0, Math.PI * 2);
  ctx.fill();

  // blade
  ctx.save();
  ctx.translate(w / 2, 118);
  ctx.rotate(-Math.PI / 4);
  ctx.beginPath();
  ctx.moveTo(-7, 44);
  ctx.quadraticCurveTo(5, 40, 12, 12);
  ctx.lineTo(16, -40);
  ctx.quadraticCurveTo(0, -46, -3, -38);
  ctx.closePath();
  const bg = ctx.createLinearGradient(-8, 0, 16, 0);
  bg.addColorStop(0, 'rgba(220,235,255,0.5)');
  bg.addColorStop(0.5, 'rgba(255,248,226,0.92)');
  bg.addColorStop(1, 'rgba(255,206,120,0.7)');
  ctx.fillStyle = bg;
  ctx.fill();
  // guard + grip
  ctx.fillStyle = 'rgba(255,200,110,0.9)';
  ctx.fillRect(-15, 33, 37, 5);
  ctx.fillRect(-5, 38, 8, 24);
  ctx.restore();

  // small brush slash beneath
  ctx.strokeStyle = 'rgba(255,230,198,0.34)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 22, 204);
  ctx.quadraticCurveTo(w / 2, 214, w / 2 + 24, 208);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function bambooTexture() {
  const w = 64; const h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, '#264f36');
  g.addColorStop(0.35, '#4d7a50');
  g.addColorStop(0.62, '#345f3e');
  g.addColorStop(1, '#172f21');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 420; i++) {
    ctx.globalAlpha = 0.08 + Math.random() * 0.1;
    ctx.fillStyle = Math.random() > 0.5 ? '#9dc78b' : '#102018';
    ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 2 + 0.5, Math.random() * 9 + 2);
  }
  ctx.globalAlpha = 1;
  // bamboo nodes
  for (let y = 20; y < h; y += 52) {
    ctx.fillStyle = 'rgba(12,30,18,0.75)';
    ctx.fillRect(0, y, w, 4);
    ctx.fillStyle = 'rgba(170,206,148,0.28)';
    ctx.fillRect(0, y + 4, w, 2);
    ctx.fillStyle = 'rgba(8,22,12,0.4)';
    ctx.fillRect(0, y - 1, w, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  return tex;
}

function mistTexture() {
  const w = 512; const h = 128;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const gx = ctx.createLinearGradient(0, 0, w, 0);
  gx.addColorStop(0, 'rgba(0,0,0,0)');
  gx.addColorStop(0.2, 'rgba(0,0,0,1)');
  gx.addColorStop(0.8, 'rgba(0,0,0,1)');
  gx.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = gx;
  ctx.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function petalGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.13);
  s.bezierCurveTo(0.11, 0.1, 0.12, -0.02, 0, -0.14);
  s.bezierCurveTo(-0.12, -0.02, -0.11, 0.1, 0, 0.13);
  return new THREE.ShapeGeometry(s, 6);
}

export function createWorld(scene, factory) {
  const root = new THREE.Group();
  scene.add(root);
  const backdrop = new THREE.Group();
  root.add(backdrop);

  const glowTex = factory.glowTexture;
  const softTex = radialTexture();
  const mistTex = mistTexture();

  /* ---------------- sky ---------------- */
  const skyMat = new THREE.ShaderMaterial({
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x060309) },
      uMid: { value: new THREE.Color(0x150a26) },
      uBottom: { value: new THREE.Color(0x401a34) },
      uGlow: { value: new THREE.Color(0xa4483d) },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBottom; uniform vec3 uGlow;
      void main(){
        vec3 col = mix(uBottom, uMid, smoothstep(0.0, 0.58, vUv.y));
        col = mix(col, uTop, smoothstep(0.42, 1.0, vUv.y));
        vec2 p = (vUv - vec2(0.33, 0.68)) * vec2(1.15, 1.0);
        float halo = exp(-length(p) * 5.2);
        col += uGlow * halo * 0.55;
        float horizon = exp(-abs(vUv.y - 0.22) * 12.0);
        col += vec3(0.16, 0.06, 0.08) * horizon;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(260, 150), skyMat);
  sky.position.set(0, 10, -72);
  sky.renderOrder = -20;
  backdrop.add(sky);

  /* ---------------- stars ---------------- */
  {
    const count = 190;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 1] = Math.random() * 42 - 6;
      pos[i * 3 + 2] = -62 + Math.random() * 18;
      c.setHSL(0.55 + Math.random() * 0.15, 0.35, 0.55 + Math.random() * 0.4);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.16, vertexColors: true, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true, map: glowTex,
    });
    const stars = new THREE.Points(geo, mat);
    backdrop.add(stars);
    root.userData.stars = stars;
  }

  /* ---------------- mountains ---------------- */
  const mountainShape = (peaks, baseY, topY) => {
    const shape = new THREE.Shape();
    shape.moveTo(-90, baseY);
    shape.lineTo(-90, topY * 0.2);
    let x = -90;
    for (const peak of peaks) {
      shape.lineTo(peak[0] - 7, topY * peak[2]);
      shape.lineTo(peak[0], topY * peak[1]);
      shape.lineTo(peak[0] + 9, topY * (peak[2] * 0.7 + 0.1));
      x = peak[0] + 9;
    }
    shape.lineTo(90, topY * 0.28);
    shape.lineTo(90, baseY);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  };

  const farMountains = new THREE.Mesh(
    mountainShape([[-58, 0.32, 0.12], [-36, 0.5, 0.2], [-12, 0.28, 0.16], [16, 0.55, 0.24], [44, 0.35, 0.14], [66, 0.45, 0.2]], -34, 18),
    new THREE.MeshBasicMaterial({ color: 0x170c26, transparent: true, opacity: 0.85, depthWrite: false }),
  );
  farMountains.position.set(0, -2.5, -48);
  farMountains.renderOrder = -15;
  backdrop.add(farMountains);

  const nearMountains = new THREE.Mesh(
    mountainShape([[-70, 0.5, 0.2], [-44, 0.3, 0.12], [-20, 0.6, 0.24], [8, 0.34, 0.16], [34, 0.52, 0.2], [58, 0.3, 0.12], [78, 0.48, 0.22]], -30, 16),
    new THREE.MeshBasicMaterial({ color: 0x0e0718, transparent: true, opacity: 0.95, depthWrite: false }),
  );
  nearMountains.position.set(0, -3.6, -40);
  nearMountains.renderOrder = -14;
  backdrop.add(nearMountains);

  /* ---------------- moon ---------------- */
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2.7, 40, 30),
    new THREE.MeshBasicMaterial({ color: 0xffe3ae, fog: false }),
  );
  moon.position.set(-9.9, 12.2, -50);
  backdrop.add(moon);

  const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: softTex, color: 0xffc47a, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true,
  }));
  moonGlow.position.copy(moon.position).add(new THREE.Vector3(0, 0, 0.5));
  moonGlow.scale.setScalar(17);
  moonGlow.material.opacity = 0.4;
  backdrop.add(moonGlow);

  const moonGlow2 = new THREE.Sprite(new THREE.SpriteMaterial({
    map: softTex, color: 0x8a5bff, transparent: true, opacity: 0.14,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  moonGlow2.position.copy(moonGlow.position);
  moonGlow2.scale.setScalar(38);
  moonGlow2.material.opacity = 0.1;
  backdrop.add(moonGlow2);

  /* ---------------- clouds / haze ---------------- */
  const clouds = [];
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.SpriteMaterial({
      map: softTex, color: i % 2 ? 0x9a5b8a : 0xff9a6a,
      transparent: true, opacity: 0.055 + Math.random() * 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set((Math.random() - 0.5) * 40, -2 + Math.random() * 10, -36 + Math.random() * 12);
    sprite.scale.set(26 + Math.random() * 24, 7 + Math.random() * 5, 1);
    backdrop.add(sprite);
    clouds.push({ sprite, baseX: sprite.position.x, speed: 0.05 + Math.random() * 0.08, phase: Math.random() * TAU });
  }

  /* ---------------- torii gate ---------------- */
  const gate = new THREE.Group();
  gate.position.set(0, -1.2, -18);
  backdrop.add(gate);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x35131f, roughness: 0.72, metalness: 0.12,
    emissive: 0x0b0208, emissiveIntensity: 0.6,
  });
  const woodDark = new THREE.MeshStandardMaterial({
    color: 0x1d0a12, roughness: 0.85, metalness: 0.05,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0x6b4a20, roughness: 0.4, metalness: 0.55,
    emissive: 0x2a1804, emissiveIntensity: 0.8,
  });

  const pillars = [];
  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.62, 17.5, 10), woodMat);
    pillar.position.set(side * 6.6, 0.6, 0);
    gate.add(pillar);
    pillars.push(pillar);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.05, 1.1, 8), woodDark);
    base.position.set(side * 6.6, -8.2, 0);
    gate.add(base);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.52, 0.5, 8), goldMat);
    cap.position.set(side * 6.6, 9.4, 0);
    gate.add(cap);
  }

  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(17.4, 0.85, 1.2), woodMat);
  topBeam.position.set(0, 9.0, 0);
  gate.add(topBeam);
  const topCap = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.28, 1.5), goldMat);
  topCap.position.set(0, 9.52, 0);
  gate.add(topCap);
  for (const side of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.42, 1.3), woodMat);
    tip.position.set(side * 9.5, 9.42, 0);
    tip.rotation.z = side * 0.16;
    gate.add(tip);
  }

  const secondBeam = new THREE.Mesh(new THREE.BoxGeometry(15.6, 0.56, 0.9), woodMat);
  secondBeam.position.set(0, 7.35, 0);
  gate.add(secondBeam);

  const plaque = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.7, 0.28), woodDark);
  plaque.position.set(0, 8.15, 0.2);
  gate.add(plaque);
  const plaqueTrim = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 0.32), goldMat);
  plaqueTrim.position.set(0, 8.95, 0.2);
  gate.add(plaqueTrim);
  const plaqueTrim2 = plaqueTrim.clone();
  plaqueTrim2.position.y = 7.35;
  gate.add(plaqueTrim2);

  // hanging banners
  const bannerTex = bannerTexture();
  for (const side of [-1, 1]) {
    const banner = new THREE.Mesh(
      new THREE.PlaneGeometry(1.45, 3.7),
      new THREE.MeshStandardMaterial({
        map: bannerTex, roughness: 0.92, side: THREE.DoubleSide,
        emissive: 0x1c060d, emissiveIntensity: 0.25,
      }),
    );
    banner.position.set(side * 5.15, 2.4, 0.35);
    banner.rotation.y = side * 0.08;
    gate.add(banner);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.75, 6), goldMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(side * 5.15, 4.3, 0.35);
    gate.add(rod);
  }

  /* ---------------- lanterns ---------------- */
  const lanterns = [];
  const lanternDefs = [
    { x: -4.6, y: 6.2, z: -11.5, s: 1.0 },
    { x: 2.4, y: 6.8, z: -13.0, s: 0.82 },
    { x: 7.2, y: 5.4, z: -10.0, s: 0.9 },
    { x: -8.4, y: 4.6, z: -8.5, s: 0.72 },
  ];

  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xff9a55, emissive: 0xff6a20, emissiveIntensity: 1.35,
    roughness: 0.55, metalness: 0.05,
  });
  const lanternPaperMat = new THREE.MeshStandardMaterial({
    color: 0xffd9b0, emissive: 0xffb36a, emissiveIntensity: 1.3,
    roughness: 0.8,
  });

  for (let i = 0; i < lanternDefs.length; i++) {
    const d = lanternDefs[i];
    const pivot = new THREE.Group();
    pivot.position.set(d.x, d.y, d.z);
    backdrop.add(pivot);

    const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.4, 4), woodDark);
    chain.position.y = -0.7;
    pivot.add(chain);

    const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), lanternMat);
    body.scale.set(1, 1.28, 1);
    body.position.y = -1.7;
    pivot.add(body);

    for (let r = -1; r <= 1; r++) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(0.49, 0.018, 4, 24), woodDark);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = -1.7 + r * 0.24;
      rib.scale.set(1, 1, 1.1);
      pivot.add(rib);
    }

    const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.12, 8), woodDark);
    capTop.position.y = -1.08;
    pivot.add(capTop);
    const capBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.12, 8), woodDark);
    capBottom.position.y = -2.3;
    pivot.add(capBottom);
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xd8a24e }));
    tassel.position.y = -2.6;
    pivot.add(tassel);

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softTex, color: 0xffa25e, transparent: true, opacity: 0.33,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    glow.position.y = -1.7;
    glow.scale.setScalar(3.6 * d.s);
    pivot.add(glow);

    pivot.scale.setScalar(d.s);
    pivot.userData.phase = Math.random() * TAU;
    pivot.userData.baseRot = 0;
    lanterns.push(pivot);

    if (i < 3) {
      const light = new THREE.PointLight(0xff9a58, 24 * d.s, 40, 2);
      light.position.set(d.x, d.y - 1.7 * d.s, d.z + 1.5);
      root.add(light);
    }
  }

  /* ---------------- bamboo ---------------- */
  const bambooTex = bambooTexture();
  const bambooMat = new THREE.MeshStandardMaterial({
    map: bambooTex, color: 0x7c9c7a, roughness: 0.72, metalness: 0.04,
    emissive: 0x041207, emissiveIntensity: 0.55,
  });
  const bambooLeafMat = new THREE.MeshStandardMaterial({
    color: 0x2c5a3d, roughness: 0.8, side: THREE.DoubleSide,
    emissive: 0x041007, emissiveIntensity: 0.4,
  });

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(0.32, 0.17, 0.95, 0.22, 1.45, 0.06);
  leafShape.bezierCurveTo(0.95, -0.1, 0.32, -0.08, 0, 0);
  const bambooLeafGeo = new THREE.ShapeGeometry(leafShape, 5);
  const bambooGroup = new THREE.Group();
  backdrop.add(bambooGroup);

  for (let cluster = 0; cluster < 2; cluster++) {
    const dir = cluster === 0 ? -1 : 1;
    for (let i = 0; i < 7; i++) {
      const x = dir * (5.8 + Math.random() * 4.5);
      const z = -13 + Math.random() * 7;
      const h = 9 + Math.random() * 8;
      const lean = (Math.random() - 0.5) * 0.12;
      const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, h, 6), bambooMat);
      stalk.position.set(x, -8 + h / 2, z);
      stalk.rotation.z = lean;
      bambooGroup.add(stalk);
      for (let n = 0; n < 5; n++) {
        const y = -8 + h * (0.35 + Math.random() * 0.6);
        const leaf = new THREE.Mesh(bambooLeafGeo, bambooLeafMat);
        leaf.position.set(x + dir * rand(0.1, 0.6), y, z + 0.3);
        leaf.rotation.set(rand(-0.4, 0.4), rand(-0.6, 0.6), rand(-0.6, 0.6) + (dir > 0 ? 0 : Math.PI));
        leaf.scale.set(rand(0.5, 1.15), rand(0.55, 1.0), 1);
        bambooGroup.add(leaf);
      }
    }
  }

  /* ---------------- floor mist ---------------- */
  const mists = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: mistTex, transparent: true, opacity: 0.14 - i * 0.03,
      depthWrite: false, blending: THREE.AdditiveBlending, color: i === 0 ? 0x9a7ac4 : 0xd08a7a,
    });
    const mist = new THREE.Mesh(new THREE.PlaneGeometry(34, 7), mat);
    mist.position.set(0, -7.4 + i * 0.6, -10 - i * 4);
    mist.renderOrder = 2;
    backdrop.add(mist);
    mists.push({ mesh: mist, baseX: 0, phase: Math.random() * TAU });
  }

  /* ---------------- petals ---------------- */
  const petalCount = 56;
  const petalMat = new THREE.MeshBasicMaterial({
    color: 0xff9fc0, transparent: true, opacity: 0.72, side: THREE.DoubleSide,
    depthWrite: false,
  });
  const petals = new THREE.InstancedMesh(petalGeometry(), petalMat, petalCount);
  petals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  petals.frustumCulled = false;
  backdrop.add(petals);

  const petalData = [];
  const dummy = new THREE.Object3D();
  const petalColors = [0xff9fc0, 0xffb7cf, 0xf7a7d7, 0xffc7dc, 0xd9a6ff];
  for (let i = 0; i < petalCount; i++) {
    petalData.push({
      x: rand(-11, 11),
      y: rand(-10, 11),
      z: rand(-10, -1.5),
      rotX: rand(0, TAU),
      rotY: rand(0, TAU),
      rotZ: rand(0, TAU),
      spin: rand(-1.2, 1.2),
      speed: rand(0.25, 0.7),
      phase: rand(0, TAU),
      scale: rand(0.5, 1.25),
    });
    petals.setColorAt(i, new THREE.Color(petalColors[i % petalColors.length]));
  }
  petals.instanceColor.needsUpdate = true;

  /* ---------------- embers / motes ---------------- */
  const emberCount = 110;
  const emberGeo = new THREE.BufferGeometry();
  const emberPos = new Float32Array(emberCount * 3);
  const emberData = [];
  for (let i = 0; i < emberCount; i++) {
    const x = rand(-10, 10);
    const y = rand(-9, 10);
    const z = rand(-12, 1);
    emberPos[i * 3] = x; emberPos[i * 3 + 1] = y; emberPos[i * 3 + 2] = z;
    emberData.push({ x, y, z, speed: rand(0.08, 0.35), phase: rand(0, TAU), amp: rand(0.2, 0.8) });
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const emberMat = new THREE.PointsMaterial({
    size: 0.14, map: glowTex, color: 0xffc078, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const embers = new THREE.Points(emberGeo, emberMat);
  embers.frustumCulled = false;
  backdrop.add(embers);

  /* ---------------- foreground bokeh ---------------- */
  const bokeh = [];
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.SpriteMaterial({
      map: softTex, color: i % 3 === 0 ? 0x8b7cff : 0xffb36a,
      transparent: true, opacity: 0.05 + Math.random() * 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(rand(-10, 10), rand(-7, 7), rand(3, 6));
    sprite.scale.setScalar(rand(2.5, 7));
    sprite.renderOrder = 40;
    root.add(sprite);
    bokeh.push({ sprite, phase: rand(0, TAU), baseY: sprite.position.y, baseX: sprite.position.x });
  }

  /* ---------------- lights ---------------- */
  const hemi = new THREE.HemisphereLight(0x8f9cff, 0x2b0a18, 0.55);
  root.add(hemi);

  const key = new THREE.DirectionalLight(0xffd6a8, 2.7);
  key.position.set(8, 11, 9);
  root.add(key);

  const rim = new THREE.DirectionalLight(0x6fd9ff, 1.9);
  rim.position.set(-9, 4, 6);
  root.add(rim);

  const fill = new THREE.DirectionalLight(0xff7ea8, 0.9);
  fill.position.set(2, -8, 5);
  root.add(fill);

  const accent = new THREE.DirectionalLight(0x9fe8ff, 0.8);
  accent.position.set(0, 0, 8);
  root.add(accent);

  /* ---------------- parallax + animation ---------------- */
  let targetX = 0; let targetY = 0;
  let currentX = 0; let currentY = 0;

  const setParallax = (x, y) => {
    targetX = x;
    targetY = y;
  };

  const update = (dt, time) => {
    currentX += (targetX - currentX) * Math.min(1, dt * 2.5);
    currentY += (targetY - currentY) * Math.min(1, dt * 2.5);
    backdrop.position.x = -currentX * 0.55;
    backdrop.position.y = currentY * 0.32;
    gate.rotation.y = currentX * 0.03;

    moonGlow.material.opacity = 0.37 + Math.sin(time * 0.6) * 0.025;
    moonGlow.scale.setScalar(17 + Math.sin(time * 0.5) * 0.5);
    moonGlow2.material.opacity = 0.09 + Math.sin(time * 0.4 + 1) * 0.015;

    for (const l of lanterns) {
      l.rotation.z = Math.sin(time * 0.55 + l.userData.phase) * 0.055;
      l.rotation.x = Math.cos(time * 0.4 + l.userData.phase) * 0.02;
    }

    for (const c of clouds) {
      c.sprite.position.x = c.baseX + Math.sin(time * c.speed + c.phase) * 8 + time * 0.035;
    }

    for (const m of mists) {
      m.mesh.position.x = Math.sin(time * 0.08 + m.phase) * 2.5;
    }

    // petals
    for (let i = 0; i < petalCount; i++) {
      const p = petalData[i];
      p.y -= p.speed * dt;
      p.x += Math.sin(time * 0.6 + p.phase) * 0.24 * dt;
      p.rotZ += p.spin * dt;
      p.rotY += p.spin * 0.6 * dt;
      if (p.y < -11) {
        p.y = 11 + Math.random() * 3;
        p.x = rand(-11, 11);
      }
      if (p.x < -13) p.x = 13;
      if (p.x > 13) p.x = -13;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX + Math.sin(time * 0.4 + p.phase) * 0.3, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;

    // embers
    const ep = emberGeo.attributes.position.array;
    for (let i = 0; i < emberCount; i++) {
      const e = emberData[i];
      e.y += e.speed * dt;
      if (e.y > 11) { e.y = -9; e.x = rand(-10, 10); }
      ep[i * 3] = e.x + Math.sin(time * 0.35 + e.phase) * e.amp * 0.3;
      ep[i * 3 + 1] = e.y;
      ep[i * 3 + 2] = e.z;
    }
    emberGeo.attributes.position.needsUpdate = true;
    emberMat.opacity = 0.55 + Math.sin(time * 1.4) * 0.12;

    for (const b of bokeh) {
      b.sprite.position.y = b.baseY + Math.sin(time * 0.3 + b.phase) * 0.6;
      b.sprite.position.x = b.baseX + Math.cos(time * 0.22 + b.phase) * 0.6;
    }

    if (root.userData.stars) {
      root.userData.stars.material.opacity = 0.78 + Math.sin(time * 1.7) * 0.08;
    }
  };

  const setAccent = (hex) => {
    accent.color.set(hex);
    accent.intensity = 0.7;
  };

  return { root, backdrop, update, setParallax, setAccent, moon, gate, lights: { hemi, key, rim, fill, accent } };
}

function rand(a, b) { return a + Math.random() * (b - a); }
