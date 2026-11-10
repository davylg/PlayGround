import * as THREE from 'three';
import { makeGlowTexture, makeSplatTexture } from './fruits.js';

const TAU = Math.PI * 2;
const tmpColor = new THREE.Color();

/* ------------------------------------------------------------------ */
/* soft round particles                                               */
/* ------------------------------------------------------------------ */
class ParticlePool {
  constructor(scene, { max = 400, blending = THREE.NormalBlending, glow = false } = {}) {
    this.max = max;
    this.items = [];
    this.cursor = 0;
    this.glow = glow;

    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(max * 3);
    this.colors = new Float32Array(max * 3);
    this.sizes = new Float32Array(max);
    this.alphas = new Float32Array(max);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 900 } },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        uniform float uScale;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aSize * uScale / max(1.0, -mv.z), 1.0, 80.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.08, d);
          vec3 col = vColor;
          // juicy highlight
          float hi = smoothstep(0.34, 0.05, length(c - vec2(-0.14, 0.15)));
          col += hi * 0.35;
          gl_FragColor = vec4(col, a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 20;
    scene.add(this.points);
  }

  setScale(scale) { this.material.uniforms.uScale.value = scale; }

  spawn({ position, velocity, color, size, life, gravity = 4, drag = 0.15, alpha = 1 }) {
    const item = {
      px: position.x, py: position.y, pz: position.z,
      vx: velocity.x, vy: velocity.y, vz: velocity.z,
      color: new THREE.Color(color),
      size, life, maxLife: life, gravity, drag, alpha: alpha,
    };
    if (this.items.length < this.max) {
      this.items.push(item);
    } else {
      this.items[this.cursor % this.max] = item;
      this.cursor++;
    }
  }

  update(dt) {
    const items = this.items;
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.life -= dt;
      if (it.life <= 0) {
        items.splice(i, 1);
        continue;
      }
      it.vy -= it.gravity * dt;
      const dragFactor = Math.exp(-it.drag * dt * 8);
      it.vx *= dragFactor;
      it.vy *= dragFactor;
      it.vz *= dragFactor;
      it.px += it.vx * dt;
      it.py += it.vy * dt;
      it.pz += it.vz * dt;
    }

    const n = Math.min(items.length, this.max);
    for (let i = 0; i < this.max; i++) {
      const it = items[i];
      if (!it) {
        this.alphas[i] = 0;
        this.sizes[i] = 0;
        this.positions[i * 3] = 0;
        this.positions[i * 3 + 1] = -999;
        this.positions[i * 3 + 2] = 0;
        continue;
      }
      const t = it.life / it.maxLife;
      this.positions[i * 3] = it.px;
      this.positions[i * 3 + 1] = it.py;
      this.positions[i * 3 + 2] = it.pz;
      this.colors[i * 3] = it.color.r;
      this.colors[i * 3 + 1] = it.color.g;
      this.colors[i * 3 + 2] = it.color.b;
      this.sizes[i] = it.size * (0.55 + t * 0.65);
      this.alphas[i] = it.alpha * Math.min(1, t * 2.4);
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;
    this.geometry.setDrawRange(0, this.max);
  }
}

/* ------------------------------------------------------------------ */
/* ribbon trail                                                        */
/* ------------------------------------------------------------------ */
class Trail {
  constructor(scene, glowTexture) {
    this.points = [];
    this.maxAge = 0.6;
    this.maxDistance = 8;
    this.time = 0;
    this.color = new THREE.Color(0x8beaff);
    this.width = 1;
    this.maxPoints = 64;

    const makeRibbon = (opacity, widthFactor, bright) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(this.maxPoints * 2 * 3);
      const alphas = new Float32Array(this.maxPoints * 2);
      const uvs = new Float32Array(this.maxPoints * 2 * 2);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      const idx = [];
      for (let i = 0; i < this.maxPoints - 1; i++) {
        idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
      }
      geo.setIndex(idx);
      geo.setDrawRange(0, 0);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0xffffff) },
          uOpacity: { value: opacity },
          uBright: { value: bright },
        },
        vertexShader: `
          attribute float aAlpha;
          varying float vAlpha;
          varying vec2 vUv;
          void main() {
            vAlpha = aAlpha;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uBright;
          varying float vAlpha;
          varying vec2 vUv;
          void main() {
            float edge = smoothstep(0.0, 0.42, vUv.x) * smoothstep(1.0, 0.58, vUv.x);
            float a = vAlpha * edge * uOpacity;
            if (a < 0.002) discard;
            gl_FragColor = vec4(uColor * uBright, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 50;
      scene.add(mesh);
      return { mesh, geo, positions, alphas, uvs, mat, widthFactor };
    };

    this.outer = makeRibbon(0.85, 1.35, 1.65);
    this.core = makeRibbon(1.0, 0.5, 3.0);

    this.glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture, color: 0x8beaff, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    }));
    this.glow.scale.setScalar(1.2);
    this.glow.renderOrder = 51;
    scene.add(this.glow);
    this.lastPointAt = -10;
  }

  setColor(color) {
    const c = new THREE.Color(color);
    this.color.copy(c);
    this.outer.mat.uniforms.uColor.value.copy(c);
    this.core.mat.uniforms.uColor.value.copy(c).lerp(new THREE.Color(0xffffff), 0.65);
    this.glow.material.color.copy(c);
  }

  push(point, time) {
    const pts = this.points;
    const last = pts[pts.length - 1];
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < 0.008) {
      last.t = time;
      this.lastPointAt = time;
      return;
    }
    pts.push({ x: point.x, y: point.y, z: point.z ?? 1.4, t: time });
    if (pts.length > this.maxPoints) pts.shift();
    this.lastPointAt = time;
  }

  clear() { this.points.length = 0; }

  update(time) {
    this.time = time;
    const pts = this.points;
    while (pts.length && time - pts[0].t > this.maxAge) pts.shift();

    // Frame-rate independent trim: a real swipe should leave a long arc even
    // when the device (or a screenshot run) is only managing a few fps.
    let arc = 0;
    let cut = -1;
    for (let i = pts.length - 1; i > 0; i--) {
      arc += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      if (arc > this.maxDistance) { cut = i - 1; break; }
    }
    if (cut > 0) pts.splice(0, cut);

    if (pts.length < 2) {
      this.outer.geo.setDrawRange(0, 0);
      this.core.geo.setDrawRange(0, 0);
      this.glow.material.opacity = 0;
      return;
    }

    const n = pts.length;
    const head = pts[n - 1];
    for (const ribbon of [this.outer, this.core]) {
      const { positions, alphas, uvs, geo } = ribbon;
      const widthBase = 0.26 * ribbon.widthFactor;
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(n - 1, i + 1)];
        let dx = next.x - prev.x;
        let dy = next.y - prev.y;
        let len = Math.hypot(dx, dy);
        if (len < 0.0001) { dx = 1; dy = 0; len = 1; }
        const nx = -dy / len;
        const ny = dx / len;
        // head is opaque, tail fades out; fade by position along the stroke so
        // the ribbon looks the same at 5fps and 60fps.
        const u = i / (n - 1);
        const taper = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.08)), 0.55);
        const ageFade = Math.pow(u, 0.85);
        const width = widthBase * taper * (0.55 + 0.45 * u) * this.width;
        const a = ageFade;

        const i0 = i * 2;
        positions[i0 * 3] = p.x + nx * width;
        positions[i0 * 3 + 1] = p.y + ny * width;
        positions[i0 * 3 + 2] = p.z;
        positions[i0 * 3 + 3] = p.x - nx * width;
        positions[i0 * 3 + 4] = p.y - ny * width;
        positions[i0 * 3 + 5] = p.z;
        alphas[i0] = a;
        alphas[i0 + 1] = a;
        uvs[i0 * 2] = 0; uvs[i0 * 2 + 1] = 0;
        uvs[i0 * 2 + 2] = 1; uvs[i0 * 2 + 3] = 0;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aAlpha.needsUpdate = true;
      geo.attributes.uv.needsUpdate = true;
      geo.setDrawRange(0, (n - 1) * 6);
    }

    this.glow.position.set(head.x, head.y, head.z + 0.05);
    const sinceHead = time - head.t;
    this.glow.material.opacity = Math.max(0, 1 - sinceHead / 0.18) * 0.85;
    this.glow.scale.setScalar((0.9 + Math.sin(time * 18) * 0.08) * this.width);
  }
}

/* ------------------------------------------------------------------ */
/* Effects                                                             */
/* ------------------------------------------------------------------ */
export class Effects {
  constructor(scene, camera, factory) {
    this.scene = scene;
    this.camera = camera;
    this.factory = factory;
    this.time = 0;
    this.shake = 0;
    this.flashCb = null;
    this.hurtCb = null;
    this.cameraBase = camera.position.clone();

    this.trail = new Trail(scene, factory.glowTexture);
    this.juice = new ParticlePool(scene, { max: 520, blending: THREE.NormalBlending });
    this.sparks = new ParticlePool(scene, { max: 420, blending: THREE.AdditiveBlending });

    this.splatTexture = factory.splatTexture;
    this.glowTexture = makeGlowTexture();
    this._initSplats();
    this._initSlashes();
    this._initShocks();
    this._initArcs();
    this._initPopups();
  }

  setViewport(heightPx, fovRad) {
    const scale = heightPx / (2 * Math.tan(fovRad / 2));
    this.juice.setScale(scale);
    this.sparks.setScale(scale);
  }

  setPixelRatio() { /* responsive point sizes handled by uScale */ }

  addShake(amount) { this.shake = Math.min(1.6, this.shake + amount); }

  /* ---------- splat decals ---------- */
  _initSplats() {
    this.splats = [];
    const geo = new THREE.PlaneGeometry(1, 1);
    for (let i = 0; i < 26; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: this.splatTexture, transparent: true, depthWrite: false,
        depthTest: true, opacity: 0, color: 0xffffff, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.position.z = -2;
      this.scene.add(mesh);
      this.splats.push({ mesh, age: 0, life: 1, active: false });
    }
  }

  addSplat(position, color, scale = 2.4) {
    let slot = this.splats.find((s) => !s.active) || this.splats[0];
    slot.active = true;
    slot.age = 0;
    slot.life = 5.2 + Math.random() * 3.2;
    slot.mesh.visible = true;
    slot.mesh.material.color.set(color);
    slot.mesh.material.opacity = 0;
    slot.mesh.position.set(
      position.x + (Math.random() - 0.5) * 1.4,
      position.y + (Math.random() - 0.5) * 1.4,
      -1.6 - Math.random() * 3.6,
    );
    slot.mesh.rotation.z = Math.random() * TAU;
    const s = scale * (0.8 + Math.random() * 0.7);
    slot.mesh.scale.set(s * 1.25, s, 1);
  }

  _updateSplats(dt) {
    for (const s of this.splats) {
      if (!s.active) continue;
      s.age += dt;
      const t = s.age / s.life;
      if (t >= 1) {
        s.active = false;
        s.mesh.visible = false;
        continue;
      }
      s.mesh.material.opacity = Math.min(1, t * 8) * (1 - t) * 0.62;
      s.mesh.scale.multiplyScalar(1 + dt * 0.035);
    }
  }

  /* ---------- slash streaks ---------- */
  _initSlashes() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.6)');
    g.addColorStop(0.5, 'rgba(255,255,255,1)');
    g.addColorStop(0.82, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 22, 256, 20);
    const v = ctx.createLinearGradient(0, 0, 0, 64);
    v.addColorStop(0, 'rgba(255,255,255,0)');
    v.addColorStop(0.5, 'rgba(255,255,255,1)');
    v.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, 256, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    this.slashTexture = tex;

    this.slashes = [];
    const geo = new THREE.PlaneGeometry(1, 1);
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, depthTest: false,
        blending: THREE.AdditiveBlending, color: 0xffffff, opacity: 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.renderOrder = 48;
      this.scene.add(mesh);
      this.slashes.push({ mesh, age: 0, life: 0.24, active: false });
    }
  }

  addSlash(position, angle, color, size = 1) {
    const slot = this.slashes.find((s) => !s.active) || this.slashes[0];
    slot.active = true;
    slot.age = 0;
    slot.life = 0.22;
    slot.mesh.visible = true;
    slot.mesh.material.color.set(color);
    slot.mesh.material.opacity = 0.95;
    slot.mesh.position.set(position.x, position.y, position.z + 0.6);
    slot.mesh.rotation.z = angle;
    slot.mesh.scale.set(4.4 * size, 0.55 * size, 1);
  }

  _updateSlashes(dt) {
    for (const s of this.slashes) {
      if (!s.active) continue;
      s.age += dt;
      const t = s.age / s.life;
      if (t >= 1) { s.active = false; s.mesh.visible = false; continue; }
      s.mesh.material.opacity = (1 - t) * 0.95;
      s.mesh.scale.y = 0.55 + t * 0.5;
    }
  }

  /* ---------- shockwaves ---------- */
  _initShocks() {
    this.shocks = [];
    const geo = new THREE.RingGeometry(0.86, 1, 64);
    for (let i = 0; i < 8; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.renderOrder = 45;
      this.scene.add(mesh);
      this.shocks.push({ mesh, age: 0, life: 0.5, active: false, scale: 3, alpha: 0.65 });
    }
  }

  addShock(position, color, scale = 4, life = 0.5, alpha = 0.65) {
    const slot = this.shocks.find((s) => !s.active) || this.shocks[0];
    slot.active = true;
    slot.age = 0;
    slot.life = life;
    slot.scale = scale;
    slot.alpha = alpha;
    slot.mesh.visible = true;
    slot.mesh.material.color.set(color);
    slot.mesh.position.set(position.x, position.y, (position.z ?? 0) + 0.3);
    slot.mesh.rotation.z = Math.random() * TAU;
    slot.mesh.scale.setScalar(0.4);
  }

  _updateShocks(dt) {
    for (const s of this.shocks) {
      if (!s.active) continue;
      s.age += dt;
      const t = s.age / s.life;
      if (t >= 1) { s.active = false; s.mesh.visible = false; continue; }
      const ease = 1 - Math.pow(1 - t, 2.4);
      s.mesh.scale.setScalar(0.4 + ease * s.scale);
      s.mesh.material.opacity = (1 - t) * s.alpha;
    }
  }

  /* ---------- chain lightning ---------- */
  _initArcs() {
    this.arcs = [];
    for (let i = 0; i < 10; i++) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(14 * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color: 0x8beaff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
      });
      const line = new THREE.Line(geo, mat);
      line.visible = false;
      line.renderOrder = 49;
      line.frustumCulled = false;
      this.scene.add(line);
      this.arcs.push({ line, geo, mat, age: 0, life: 0.32, active: false });
    }
  }

  addArc(from, to, color) {
    const slot = this.arcs.find((a) => !a.active) || this.arcs[0];
    slot.active = true;
    slot.age = 0;
    slot.life = 0.3;
    slot.line.visible = true;
    slot.mat.color.set(color);
    slot.mat.opacity = 0.95;
    const arr = slot.geo.attributes.position.array;
    const steps = 14;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.max(0.001, Math.hypot(dx, dy));
    const nx = -dy / len;
    const ny = dx / len;
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const jitter = Math.sin(t * Math.PI) * (Math.random() - 0.5) * Math.min(1.6, len * 0.18);
      const bow = Math.sin(t * Math.PI) * Math.min(1.3, len * 0.12);
      arr[i * 3] = from.x + dx * t + nx * (jitter + bow);
      arr[i * 3 + 1] = from.y + dy * t + ny * (jitter + bow);
      arr[i * 3 + 2] = 1.5;
    }
    slot.geo.attributes.position.needsUpdate = true;
    slot.geo.setDrawRange(0, steps);
    for (let i = 0; i < 6; i++) {
      const t = Math.random();
      this.sparks.spawn({
        position: new THREE.Vector3(from.x + dx * t, from.y + dy * t, 1.5),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, 0),
        color: new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.5),
        size: 0.1 + Math.random() * 0.1, life: 0.22 + Math.random() * 0.25,
        gravity: 0, drag: 0.2,
      });
    }
  }

  _updateArcs(dt) {
    for (const a of this.arcs) {
      if (!a.active) continue;
      a.age += dt;
      const t = a.age / a.life;
      if (t >= 1) { a.active = false; a.line.visible = false; continue; }
      a.mat.opacity = (1 - t) * 0.9;
    }
  }

  /* ---------- text popups ---------- */
  _initPopups() {
    this.popups = [];
  }

  _makePopupTexture(text, color, sub) {
    const w = 512; const h = 256;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 104px "Trebuchet MS", "Segoe UI", sans-serif';
    if (sub) ctx.font = '800 88px "Trebuchet MS", "Segoe UI", sans-serif';
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(24,10,4,0.4)';
    ctx.strokeText(text, w / 2, sub ? 92 : h / 2);
    ctx.restore();
    const grad = ctx.createLinearGradient(0, 30, 0, 190);
    grad.addColorStop(0, '#fffdf4');
    grad.addColorStop(0.45, color);
    grad.addColorStop(1, color);
    ctx.fillStyle = grad;
    ctx.fillText(text, w / 2, sub ? 92 : h / 2);
    if (sub) {
      ctx.font = '700 32px "Segoe UI", sans-serif';
      ctx.fillStyle = 'rgba(255,244,226,0.78)';
      ctx.fillText(sub, w / 2, 178);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }

  addPopup(position, text, { color = '#ffd583', sub = '', scale = 1.5, life = 1.1, rise = 2.6 } = {}) {
    let slot = this.popups.find((p) => !p.active);
    if (!slot) {
      if (this.popups.length >= 18) {
        slot = this.popups.shift();
        this.scene.remove(slot.sprite);
        slot.sprite.material.map.dispose();
        slot.sprite.material.dispose();
      } else {
        const mat = new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false });
        const sprite = new THREE.Sprite(mat);
        sprite.renderOrder = 52;
        slot = { sprite, active: false, age: 0, life: 1, baseScale: 1, rise: 2.5, startY: 0 };
        this.scene.add(sprite);
        this.popups.push(slot);
      }
    }
    slot.active = true;
    slot.age = 0;
    slot.life = life;
    slot.rise = rise;
    slot.startY = position.y;
    slot.sprite.visible = true;
    slot.sprite.position.set(position.x, position.y, 2.2);
    slot.sprite.material.map?.dispose();
    slot.sprite.material.map = this._makePopupTexture(text, color, sub);
    slot.sprite.material.needsUpdate = true;
    slot.sprite.material.opacity = 0;
    slot.baseScale = scale;
    slot.sprite.scale.set(2.6 * scale, 1.3 * scale, 1);
  }

  _updatePopups(dt) {
    for (const p of this.popups) {
      if (!p.active) continue;
      p.age += dt;
      const t = p.age / p.life;
      if (t >= 1) { p.active = false; p.sprite.visible = false; continue; }
      p.sprite.material.opacity = t < 0.12 ? t / 0.12 : (1 - Math.pow((t - 0.12) / 0.88, 1.6));
      p.sprite.position.y = p.startY + p.rise * (1 - Math.pow(1 - t, 2));
      const s = p.baseScale * (t < 0.16 ? 0.6 + (t / 0.16) * 0.5 : 1.1 - Math.min(0.1, (t - 0.16) * 0.15));
      p.sprite.scale.set(2.6 * s, 1.3 * s, 1);
    }
  }

  /* ---------- game bursts ---------- */
  burstFruit(position, def, radius, tierColor) {
    const flesh = new THREE.Color(def.flesh);
    const rim = new THREE.Color(def.rim);
    const count = 26;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TAU;
      const speed = 1.4 + Math.random() * 5.4;
      tmpColor.copy(Math.random() > 0.35 ? flesh : rim);
      tmpColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.12);
      this.juice.spawn({
        position: new THREE.Vector3(position.x, position.y, position.z + 0.2),
        velocity: new THREE.Vector3(Math.cos(a) * speed, Math.sin(a) * speed + 1.6, (Math.random() - 0.5) * 1.5),
        color: tmpColor.clone(),
        size: 0.13 + Math.random() * 0.2,
        life: 0.55 + Math.random() * 0.65,
        gravity: 7.5,
        drag: 0.1,
        alpha: 0.95,
      });
    }
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * TAU;
      this.sparks.spawn({
        position: new THREE.Vector3(position.x, position.y, position.z + 0.3),
        velocity: new THREE.Vector3(Math.cos(a) * (2 + Math.random() * 4), Math.sin(a) * (2 + Math.random() * 4) + 1, 0),
        color: new THREE.Color(tierColor).lerp(new THREE.Color(0xffffff), 0.3),
        size: 0.07 + Math.random() * 0.1,
        life: 0.3 + Math.random() * 0.3,
        gravity: 3,
        drag: 0.15,
      });
    }
    this.addSplat(position, def.rim, 2 + radius);
    if (Math.random() > 0.45) {
      this.addSplat(
        new THREE.Vector3(position.x + (Math.random() - 0.5) * 3, position.y + (Math.random() - 0.5) * 3, 0),
        def.rim, 1.3 + Math.random() * 1.4,
      );
    }
    this.addShock(position, tierColor, 1.25 + radius * 0.35, 0.26, 0.3);
    if (def.special) {
      for (let i = 0; i < 34; i++) {
        const a = Math.random() * TAU;
        const speed = 3 + Math.random() * 7;
        this.sparks.spawn({
          position: new THREE.Vector3(position.x, position.y, position.z + 0.4),
          velocity: new THREE.Vector3(Math.cos(a) * speed, Math.sin(a) * speed, (Math.random() - 0.5) * 2),
          color: new THREE.Color(0xffd983).lerp(new THREE.Color(0xffffff), Math.random()),
          size: 0.08 + Math.random() * 0.16,
          life: 0.5 + Math.random() * 0.7,
          gravity: 1.4,
          drag: 0.1,
        });
      }
      this.addShock(position, 0xffd583, 7.5, 0.7, 0.5);
    }
  }

  burstBomb(position) {
    for (let i = 0; i < 46; i++) {
      const a = Math.random() * TAU;
      const speed = 2 + Math.random() * 9;
      const hot = Math.random() > 0.55;
      this.sparks.spawn({
        position: new THREE.Vector3(position.x, position.y, position.z + 0.4),
        velocity: new THREE.Vector3(Math.cos(a) * speed, Math.sin(a) * speed + 2, (Math.random() - 0.5) * 3),
        color: hot ? new THREE.Color(0xffcf6c) : new THREE.Color(0xff4a2a),
        size: 0.12 + Math.random() * 0.26,
        life: 0.45 + Math.random() * 0.75,
        gravity: 5,
        drag: 0.05,
      });
    }
    for (let i = 0; i < 28; i++) {
      const a = Math.random() * TAU;
      this.juice.spawn({
        position: new THREE.Vector3(position.x, position.y, position.z + 0.3),
        velocity: new THREE.Vector3(Math.cos(a) * (1 + Math.random() * 4), Math.sin(a) * (1 + Math.random() * 4), 0),
        color: new THREE.Color(i % 3 === 0 ? 0x2a2228 : 0x120d16),
        size: 0.3 + Math.random() * 0.5,
        life: 0.8 + Math.random() * 0.8,
        gravity: -0.5,
        drag: 0.3,
        alpha: 0.55,
      });
    }
    this.addShock(position, 0xff8a4a, 14, 0.7, 0.6);
    this.addShock(position, 0xff3b30, 8, 0.45, 0.5);
    this.addShake(0.9);
    this.flash?.('bomb');
    this.hurtFlash?.();
  }

  flash(kind) {
    if (this.flashCb) this.flashCb(kind);
  }

  hurtFlash() {
    if (this.hurtCb) this.hurtCb();
  }

  update(dt, time) {
    this.time = time;
    this.trail.update(time);
    this.juice.update(dt);
    this.sparks.update(dt);
    this._updateSplats(dt);
    this._updateSlashes(dt);
    this._updateShocks(dt);
    this._updateArcs(dt);
    this._updatePopups(dt);
    this.shake *= Math.exp(-dt * 6.5);
    if (this.shake < 0.002) this.shake = 0;
  }
}
