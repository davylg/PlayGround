import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const WALL_MAT = {
  dark: new THREE.MeshStandardMaterial({ color: '#1a2027', roughness: 0.82, metalness: 0.28 }),
  panel: new THREE.MeshStandardMaterial({ color: '#252e37', roughness: 0.68, metalness: 0.48 }),
  rust: new THREE.MeshStandardMaterial({ color: '#4b3024', roughness: 0.83, metalness: 0.3 }),
  steel: new THREE.MeshStandardMaterial({ color: '#38434b', roughness: 0.5, metalness: 0.65 }),
  black: new THREE.MeshStandardMaterial({ color: '#0c1015', roughness: 0.65, metalness: 0.45 }),
  concrete: new THREE.MeshStandardMaterial({ color: '#33363a', roughness: 0.92, metalness: 0.03 })
};

function makeCanvasTexture(width, height, draw, repeatX = 1, repeatY = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addEdges(mesh, color = '#4d5b65', opacity = 0.55) {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry, 24),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
  edges.position.copy(mesh.position);
  edges.rotation.copy(mesh.rotation);
  edges.scale.copy(mesh.scale);
  mesh.parent.add(edges);
  return edges;
}

export class World {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.quality = options.quality || 'high';
    this.blockers = [];
    this.collisionMeshes = [];
    this.temporary = [];
    this.smokes = [];
    this.bounds = { minX: -30, maxX: 30, minZ: -36, maxZ: 36 };
    this.sites = {
      A: { id: 'A', center: new THREE.Vector3(-18.5, 0, -16), radius: 5.4 },
      B: { id: 'B', center: new THREE.Vector3(18.5, 0, -16), radius: 5.4 }
    };
    this.spawns = {
      attackers: { center: new THREE.Vector3(0, 0, 30), spread: 5 },
      defenders: { center: new THREE.Vector3(0, 0, -29), spread: 5 }
    };
    this.staticGroup = new THREE.Group();
    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.staticGroup, this.dynamicGroup);
    this.clock = 0;
    this.build();
  }

  build() {
    this.buildSky();
    this.buildLights();
    this.buildGround();
    this.buildBoundaries();
    this.buildStructures();
    this.buildSites();
    this.buildDetails();
    this.buildNavGrid();
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(130, 32, 20);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        top: { value: new THREE.Color('#070b12') },
        horizon: { value: new THREE.Color('#1a2634') },
        glow: { value: new THREE.Color('#9c3a2c') }
      },
      vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vPos; uniform vec3 top; uniform vec3 horizon; uniform vec3 glow;
        void main(){
          float h = normalize(vPos).y;
          float t = smoothstep(-0.1, 0.65, h);
          vec3 col = mix(horizon, top, t);
          float band = exp(-pow((h - 0.01) * 8.5, 2.0));
          col += glow * band * 0.2;
          gl_FragColor = vec4(col, 1.0);
        }`
    });
    this.scene.add(new THREE.Mesh(geo, mat));
    this.scene.fog = new THREE.FogExp2('#0b1119', 0.0105);

    // A low, huge moon behind the defender spawn.
    const moon = new THREE.Mesh(
      new THREE.CircleGeometry(5.5, 48),
      new THREE.MeshBasicMaterial({ color: '#ffcf9f', transparent: true, opacity: 0.12 })
    );
    moon.position.set(22, 26, -95);
    this.scene.add(moon);
    const moonCore = new THREE.Mesh(new THREE.CircleGeometry(3.5, 32), new THREE.MeshBasicMaterial({ color: '#ffe2c1', transparent: true, opacity: 0.3 }));
    moonCore.position.copy(moon.position).add(new THREE.Vector3(0, 0, 0.1));
    this.scene.add(moonCore);
  }

  buildLights() {
    const hemi = new THREE.HemisphereLight('#9ec9e8', '#1a1015', 2.2);
    this.scene.add(hemi);
    const moon = new THREE.DirectionalLight('#b8d4ee', 3.6);
    moon.position.set(-16, 30, -24);
    moon.castShadow = this.quality !== 'low';
    moon.shadow.mapSize.set(this.quality === 'high' ? 2048 : 1024, this.quality === 'high' ? 2048 : 1024);
    moon.shadow.camera.left = -38;
    moon.shadow.camera.right = 38;
    moon.shadow.camera.top = 44;
    moon.shadow.camera.bottom = -44;
    moon.shadow.camera.far = 100;
    moon.shadow.bias = -0.0008;
    this.scene.add(moon);
    this.moon = moon;

    const siteALight = new THREE.PointLight('#ff5f3d', 95, 25, 2);
    siteALight.position.set(-18.5, 5, -13);
    this.scene.add(siteALight);
    const siteBLight = new THREE.PointLight('#4adfff', 95, 25, 2);
    siteBLight.position.set(18.5, 5, -13);
    this.scene.add(siteBLight);

    const midLight = new THREE.PointLight('#ff9b58', 45, 18, 2);
    midLight.position.set(0, 4.2, 14);
    this.scene.add(midLight);

    const aShaft = new THREE.SpotLight('#ff5f3d', 30, 32, 0.36, 0.7, 1.6);
    aShaft.position.set(-26, 16, -7);
    aShaft.target.position.set(-18, 0, -16);
    this.scene.add(aShaft, aShaft.target);
    const bShaft = new THREE.SpotLight('#4adfff', 30, 32, 0.36, 0.7, 1.6);
    bShaft.position.set(26, 16, -7);
    bShaft.target.position.set(18, 0, -16);
    this.scene.add(bShaft, bShaft.target);
  }

  buildGround() {
    const floorTexture = makeCanvasTexture(1024, 1024, (ctx, w, h) => {
      ctx.fillStyle = '#1b2128';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(130,150,165,0.12)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 16; i++) {
        const p = (i / 16) * w;
        ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(w, p); ctx.stroke();
      }
      for (let i = 0; i < 3500; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(x, y, Math.random() * 2.5, Math.random() * 2.5);
      }
      ctx.strokeStyle = 'rgba(255,137,80,0.25)';
      ctx.lineWidth = 5;
      ctx.strokeRect(8, 8, w - 16, h - 16);
      ctx.setLineDash([28, 16]);
      ctx.strokeStyle = 'rgba(255,137,80,0.2)';
      ctx.lineWidth = 3;
      ctx.strokeRect(24, 24, w - 48, h - 48);
    }, 12, 12);
    const floorGeo = new THREE.PlaneGeometry(62, 74);
    const floorMat = new THREE.MeshStandardMaterial({ map: floorTexture, color: '#ffffff', roughness: 0.88, metalness: 0.18 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const outer = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: '#090d12', roughness: 1 }));
    outer.rotation.x = -Math.PI / 2;
    outer.position.y = -0.06;
    this.scene.add(outer);

    // Navigation flow markings.
    const laneMat = new THREE.MeshBasicMaterial({ color: '#ff7048', transparent: true, opacity: 0.22 });
    const laneB = new THREE.MeshBasicMaterial({ color: '#54dcff', transparent: true, opacity: 0.2 });
    [
      [0, 0.012, 19, 0.1, 7, laneMat],
      [0, 0.012, -8, 0.1, 4, laneB],
      [-14, 0.012, 17, 9, 0.07, laneMat],
      [14, 0.012, 17, 9, 0.07, laneMat],
      [-13, 0.012, -21, 0.07, 8, laneB],
      [13, 0.012, -21, 0.07, 8, laneB]
    ].forEach(([x, y, z, w, d, mat]) => {
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(x, y, z);
      this.scene.add(strip);
    });
  }

  addBlock(x, z, width, depth, height, material = WALL_MAT.panel, options = {}) {
    const geo = new RoundedBoxGeometry(width, height, depth, 2, Math.min(0.08, width * 0.02));
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.staticGroup.add(mesh);
    if (options.edges !== false) addEdges(mesh, options.edgeColor || '#52606b', 0.35);
    this.blockers.push({
      minX: x - width / 2,
      maxX: x + width / 2,
      minZ: z - depth / 2,
      maxZ: z + depth / 2,
      minY: 0,
      maxY: height,
      mesh,
      kind: options.kind || 'wall'
    });
    this.collisionMeshes.push(mesh);
    return mesh;
  }

  addContainer(x, z, width, depth, height, color = 0, rotation = 0) {
    const colors = [WALL_MAT.rust, WALL_MAT.steel, WALL_MAT.panel];
    const mat = typeof color === 'number' ? colors[color % colors.length] : color;
    const geo = new THREE.BoxGeometry(width, height, depth);
    const container = new THREE.Mesh(geo, mat);
    container.position.set(x, height / 2, z);
    container.castShadow = true;
    container.receiveShadow = true;
    this.staticGroup.add(container);
    addEdges(container, '#6d5a4d', 0.32);
    // Corrugated ribs.
    const ribMat = new THREE.MeshStandardMaterial({ color: '#141a1f', roughness: 0.8, metalness: 0.4 });
    const count = Math.floor(width * 2.5);
    for (let i = 0; i < count; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.045, height * 0.88, 0.035), ribMat);
      rib.position.set(-width / 2 + 0.3 + i * (width - 0.6) / count, height / 2, depth / 2 + 0.02);
      this.staticGroup.add(rib);
    }
    this.blockers.push({
      minX: x - width / 2, maxX: x + width / 2, minZ: z - depth / 2, maxZ: z + depth / 2,
      minY: 0, maxY: height, mesh: container, kind: 'container'
    });
    this.collisionMeshes.push(container);
    return container;
  }

  addLowCover(x, z, width, depth, height = 1.15) {
    const geo = new RoundedBoxGeometry(width, height, depth, 2, 0.04);
    const mesh = new THREE.Mesh(geo, WALL_MAT.dark);
    mesh.position.set(x, height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.staticGroup.add(mesh);
    addEdges(mesh, '#6b7a86', 0.45);
    const top = new THREE.Mesh(new THREE.BoxGeometry(width + 0.03, 0.05, depth + 0.03), WALL_MAT.steel);
    top.position.set(x, height + 0.025, z);
    this.staticGroup.add(top);
    // hazard markings
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(width * 0.55, 0.008, 0.04), new THREE.MeshBasicMaterial({ color: '#ffbb4a', transparent: true, opacity: 0.48 }));
    stripe.position.set(x, height + 0.055, z + depth / 2);
    this.staticGroup.add(stripe);
    this.blockers.push({
      minX: x - width / 2, maxX: x + width / 2, minZ: z - depth / 2, maxZ: z + depth / 2,
      minY: 0, maxY: height, mesh, kind: 'cover'
    });
    this.collisionMeshes.push(mesh);
    return mesh;
  }

  buildBoundaries() {
    this.addBlock(0, -36.5, 62, 1, 6, WALL_MAT.dark);
    this.addBlock(0, 36.5, 62, 1, 6, WALL_MAT.dark);
    this.addBlock(-30.5, 0, 1, 74, 6, WALL_MAT.dark);
    this.addBlock(30.5, 0, 1, 74, 6, WALL_MAT.dark);
    // Corner buttresses.
    for (const x of [-29, 29]) {
      for (const z of [-35, 35]) this.addBlock(x, z, 2.2, 2.2, 7.5, WALL_MAT.panel);
    }
  }

  buildStructures() {
    // Central reactor hall.
    this.addBlock(0, -1.5, 14, 170 * 0.105, 5.6, WALL_MAT.panel, { edgeColor: '#7a6d5b' });
    this.addBlock(0, -1.5, 13.2, 1.4, 5.8, WALL_MAT.steel);
    // Roof cap detail.
    const cap = new THREE.Mesh(new RoundedBoxGeometry(14.4, 0.4, 14.4, 2, 0.08), WALL_MAT.dark);
    cap.position.set(0, 5.8, -1.5);
    cap.castShadow = true;
    this.staticGroup.add(cap);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 6, 6), WALL_MAT.steel);
    antenna.position.set(-4, 9, -4);
    this.staticGroup.add(antenna);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: '#ff503d' }));
    beacon.position.set(-4, 12, -4);
    this.staticGroup.add(beacon);
    this.beacon = beacon;

    // Side warehouse masses.
    this.addBlock(-23, 7, 10, 17, 4.6, WALL_MAT.dark);
    this.addBlock(23, 7, 10, 17, 4.6, WALL_MAT.dark);
    // Cut large luminous panels into the side masses visually.
    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.3, 6.2), new THREE.MeshBasicMaterial({ color: side < 0 ? '#ff5e3a' : '#42dbff', transparent: true, opacity: 0.42 }));
      panel.position.set(side * 17.96, 2.8, 6);
      this.staticGroup.add(panel);
    }

    // Attack approach cover.
    this.addContainer(-13, 22, 4.2, 2.5, 2.65, 0);
    this.addContainer(13, 22, 4.2, 2.5, 2.65, 1);
    this.addLowCover(-6, 18, 3.2, 1.1);
    this.addLowCover(6, 18, 3.2, 1.1);
    this.addLowCover(-19, 12, 1.2, 3.8);
    this.addLowCover(19, 12, 1.2, 3.8);

    // Connectors between lanes.
    this.addBlock(-15.5, -2, 2.2, 6.5, 2.1, WALL_MAT.steel);
    this.addBlock(15.5, -2, 2.2, 6.5, 2.1, WALL_MAT.steel);

    // Site back walls.
    this.addBlock(-18.5, -26.5, 20, 1.2, 5.4, WALL_MAT.dark);
    this.addBlock(18.5, -26.5, 20, 1.2, 5.4, WALL_MAT.dark);
    this.addBlock(-28.6, -20, 1.2, 12, 5.4, WALL_MAT.dark);
    this.addBlock(28.6, -20, 1.2, 12, 5.4, WALL_MAT.dark);

    // Site cover pieces.
    this.addLowCover(-22, -12.5, 3.5, 1.2);
    this.addLowCover(-15, -20, 1.2, 3.2);
    this.addLowCover(22, -12.5, 3.5, 1.2);
    this.addLowCover(15, -20, 1.2, 3.2);
    this.addContainer(-12.5, -18, 2.4, 5.2, 2.7, 1);
    this.addContainer(12.5, -18, 2.4, 5.2, 2.7, 2);

    // Mid-site column.
    this.addBlock(0, -17, 3.4, 3.4, 4.4, WALL_MAT.panel);
    this.addLowCover(-3.5, -12.5, 4.1, 1.2);
    this.addLowCover(3.5, -12.5, 4.1, 1.2);

    // Defender rotation shelf and spawn cover.
    this.addLowCover(-10, -27.5, 4.5, 1.1);
    this.addLowCover(10, -27.5, 4.5, 1.1);
    this.addContainer(-7, -32, 3, 2.5, 2.2, 2);
    this.addContainer(7, -32, 3, 2.5, 2.2, 0);

    // Attack spawn cover.
    this.addLowCover(-8, 32.5, 4, 1.2);
    this.addLowCover(8, 32.5, 4, 1.2);
  }

  makeLabelTexture(text, color = '#ffffff', sub = '') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 256);
    ctx.font = '700 150px "Bebas Neue", Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 24;
    ctx.fillStyle = color;
    ctx.fillText(text, 256, 104);
    if (sub) {
      ctx.shadowBlur = 0;
      ctx.font = '500 30px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.66)';
      ctx.fillText(sub, 256, 205);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  buildSites() {
    const siteData = [
      { site: this.sites.A, color: '#ff633f', light: '#ff4f2f' },
      { site: this.sites.B, color: '#4bdcff', light: '#23cfff' }
    ];
    for (const { site, color } of siteData) {
      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(site.radius, 64),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08, depthWrite: false })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(site.center.x, 0.018, site.center.z);
      this.scene.add(floor);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(site.radius - 0.12, site.radius, 64),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.82, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(site.center.x, 0.025, site.center.z);
      this.scene.add(ring);
      const inner = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 1.02, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      );
      inner.rotation.x = -Math.PI / 2;
      inner.position.set(site.center.x, 0.026, site.center.z);
      this.scene.add(inner);
      // Cross lines.
      for (let i = 0; i < 4; i++) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(site.radius * 1.5, 0.035), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 }));
        line.rotation.x = -Math.PI / 2;
        line.rotation.z = (i / 4) * Math.PI;
        line.position.set(site.center.x, 0.021, site.center.z);
        this.scene.add(line);
      }
      // Hologram sign.
      const tex = this.makeLabelTexture(site.id, color, 'BOMB SITE');
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      sprite.scale.set(3.4, 1.7, 1);
      sprite.position.set(site.center.x, 4.1, site.center.z - 4.5);
      this.scene.add(sprite);
      const glow = new THREE.PointLight(color, 8, 8, 2);
      glow.position.set(site.center.x, 2.2, site.center.z);
      this.scene.add(glow);
      // Physical ring posts.
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.75, 6), WALL_MAT.steel);
        post.position.set(site.center.x + Math.cos(a) * (site.radius - 0.3), 0.37, site.center.z + Math.sin(a) * (site.radius - 0.3));
        this.staticGroup.add(post);
        const tip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 5), new THREE.MeshBasicMaterial({ color }));
        tip.position.copy(post.position).add(new THREE.Vector3(0, 0.42, 0));
        this.staticGroup.add(tip);
      }
    }
  }

  buildDetails() {
    // Pipes along the outer walls.
    const pipeMat = new THREE.MeshStandardMaterial({ color: '#4b565e', roughness: 0.5, metalness: 0.6 });
    for (const side of [-1, 1]) {
      for (let i = 0; i < 2; i++) {
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 38, 8), pipeMat);
        pipe.rotation.x = Math.PI / 2;
        pipe.position.set(side * 29.65, 1.5 + i * 0.55, 4);
        this.staticGroup.add(pipe);
      }
    }

    // Hanging lamps.
    for (const [x, z, color] of [[-17, 7, '#ff9b58'], [17, 7, '#5cdcff'], [-18, -6, '#ff5d3b'], [18, -6, '#44d6ff'], [0, 23, '#ffc26b']]) {
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 2.3, 4), WALL_MAT.black);
      cable.position.set(x, 5.2, z);
      this.staticGroup.add(cable);
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 0.18, 10), WALL_MAT.dark);
      lamp.position.set(x, 4.05, z);
      this.staticGroup.add(lamp);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color }));
      bulb.position.set(x, 3.94, z);
      this.staticGroup.add(bulb);
      const light = new THREE.PointLight(color, 12, 12, 2);
      light.position.set(x, 3.8, z);
      this.scene.add(light);
    }

    // Rain/ash particles.
    const count = this.quality === 'low' ? 250 : 700;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 62;
      positions[i * 3 + 1] = Math.random() * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 72;
      velocities[i] = 2 + Math.random() * 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: '#b5c7d5', size: 0.022, transparent: true, opacity: 0.4, depthWrite: false });
    this.rain = new THREE.Points(geo, mat);
    this.rainVel = velocities;
    this.scene.add(this.rain);

    // Distant skyline.
    for (let i = 0; i < 24; i++) {
      const h = 5 + Math.random() * 20;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(4 + Math.random() * 8, h, 4 + Math.random() * 8),
        new THREE.MeshBasicMaterial({ color: Math.random() > 0.6 ? '#0e1620' : '#0a1018' })
      );
      const angle = (i / 24) * Math.PI * 2;
      const radius = 58 + Math.random() * 25;
      mesh.position.set(Math.cos(angle) * radius, h / 2 - 2, Math.sin(angle) * radius);
      mesh.rotation.y = angle;
      this.staticGroup.add(mesh);
      if (i % 3 === 0) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.6), new THREE.MeshBasicMaterial({ color: '#ffcc85', transparent: true, opacity: 0.55 }));
        win.position.set(mesh.position.x + Math.cos(angle) * 3, 2 + Math.random() * (h - 3), mesh.position.z + Math.sin(angle) * 3);
        win.lookAt(0, win.position.y, 0);
        this.staticGroup.add(win);
      }
    }

    // Ground props.
    for (let i = 0; i < 18; i++) {
      const x = (Math.random() - 0.5) * 54;
      const z = (Math.random() - 0.5) * 62;
      if (Math.abs(x) < 9 && z > -11 && z < 10) continue;
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.85, 9), i % 2 ? WALL_MAT.rust : WALL_MAT.steel);
      barrel.position.set(x, 0.43, z);
      barrel.rotation.y = Math.random() * Math.PI;
      barrel.castShadow = true;
      this.staticGroup.add(barrel);
    }
  }

  buildNavGrid() {
    this.nav = { minX: -29, maxX: 29, minZ: -35, maxZ: 35, cell: 1.8 };
    const cols = Math.floor((this.nav.maxX - this.nav.minX) / this.nav.cell) + 1;
    const rows = Math.floor((this.nav.maxZ - this.nav.minZ) / this.nav.cell) + 1;
    this.nav.cols = cols;
    this.nav.rows = rows;
    this.nav.blocked = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = this.nav.minX + c * this.nav.cell;
        const z = this.nav.minZ + r * this.nav.cell;
        let blocked = this.pointBlocked(x, z, 0.48);
        // Keep spawn points and site centers open.
        for (const p of [this.spawns.attackers.center, this.spawns.defenders.center, this.sites.A.center, this.sites.B.center]) {
          if (Math.hypot(x - p.x, z - p.z) < 2.5) blocked = false;
        }
        this.nav.blocked[r * cols + c] = blocked ? 1 : 0;
      }
    }
  }

  pointBlocked(x, z, radius = 0.38) {
    for (const b of this.blockers) {
      if (b.maxY < 0.45) continue;
      if (x + radius > b.minX && x - radius < b.maxX && z + radius > b.minZ && z - radius < b.maxZ) return true;
    }
    return false;
  }

  circleBlocked(x, z, radius) {
    if (x - radius < this.bounds.minX || x + radius > this.bounds.maxX || z - radius < this.bounds.minZ || z + radius > this.bounds.maxZ) return true;
    return this.pointBlocked(x, z, radius);
  }

  moveCircle(position, dx, dz, radius = 0.34) {
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.18));
    const sx = dx / steps;
    const sz = dz / steps;
    for (let i = 0; i < steps; i++) {
      if (!this.circleBlocked(position.x + sx, position.z, radius)) position.x += sx;
      if (!this.circleBlocked(position.x, position.z + sz, radius)) position.z += sz;
    }
  }

  nearestFreeCell(x, z) {
    const { cols, rows, minX, minZ, cell } = this.nav;
    let c = Math.round((x - minX) / cell);
    let r = Math.round((z - minZ) / cell);
    c = THREE.MathUtils.clamp(c, 0, cols - 1);
    r = THREE.MathUtils.clamp(r, 0, rows - 1);
    if (!this.nav.blocked[r * cols + c]) return { c, r };
    for (let d = 1; d < 5; d++) {
      for (let dr = -d; dr <= d; dr++) {
        for (let dc = -d; dc <= d; dc++) {
          const cc = c + dc;
          const rr = r + dr;
          if (cc < 0 || rr < 0 || cc >= cols || rr >= rows) continue;
          if (!this.nav.blocked[rr * cols + cc]) return { c: cc, r: rr };
        }
      }
    }
    return { c, r };
  }

  findPath(start, end) {
    const { cols, rows, minX, minZ, cell, blocked } = this.nav;
    const s = this.nearestFreeCell(start.x, start.z);
    const e = this.nearestFreeCell(end.x, end.z);
    const startIdx = s.r * cols + s.c;
    const endIdx = e.r * cols + e.c;
    if (startIdx === endIdx) return [new THREE.Vector3(end.x, 0, end.z)];
    const size = cols * rows;
    const open = [startIdx];
    const came = new Int32Array(size).fill(-1);
    const g = new Float32Array(size).fill(Infinity);
    const f = new Float32Array(size).fill(Infinity);
    const inOpen = new Uint8Array(size);
    g[startIdx] = 0;
    f[startIdx] = this.heuristic(s.c, s.r, e.c, e.r);
    inOpen[startIdx] = 1;
    let iterations = 0;
    while (open.length && iterations++ < 6000) {
      let best = 0;
      for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[best]]) best = i;
      const current = open.splice(best, 1)[0];
      inOpen[current] = 0;
      if (current === endIdx) {
        const path = [];
        let cur = current;
        while (cur !== -1) {
          const c = cur % cols;
          const r = Math.floor(cur / cols);
          path.push(new THREE.Vector3(minX + c * cell, 0, minZ + r * cell));
          cur = came[cur];
        }
        path.reverse();
        path.push(new THREE.Vector3(end.x, 0, end.z));
        return path;
      }
      const cc = current % cols;
      const rr = Math.floor(current / cols);
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const nc = cc + dc;
          const nr = rr + dr;
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
          const ni = nr * cols + nc;
          if (blocked[ni]) continue;
          if (dc && dr) {
            if (blocked[rr * cols + nc] || blocked[nr * cols + cc]) continue;
          }
          const cost = g[current] + (dc && dr ? 1.414 : 1);
          if (cost < g[ni]) {
            came[ni] = current;
            g[ni] = cost;
            f[ni] = cost + this.heuristic(nc, nr, e.c, e.r);
            if (!inOpen[ni]) {
              open.push(ni);
              inOpen[ni] = 1;
            }
          }
        }
      }
    }
    return [new THREE.Vector3(end.x, 0, end.z)];
  }

  heuristic(c, r, ec, er) {
    const dx = Math.abs(c - ec);
    const dz = Math.abs(r - er);
    return dx + dz + (Math.SQRT2 - 2) * Math.min(dx, dz);
  }

  raycastStatic(origin, direction, maxDist = 200) {
    let hit = maxDist;
    for (const b of this.blockers) {
      if (b.maxY < 0.2) continue;
      const t = this.rayBox(origin, direction, b, maxDist);
      if (t !== null && t < hit) hit = t;
    }
    for (const t of this.temporary) {
      if (t.dead) continue;
      const tHit = this.rayBox(origin, direction, t.box, maxDist);
      if (tHit !== null && tHit < hit) hit = tHit;
    }
    return hit;
  }

  rayBox(origin, dir, b, maxDist) {
    let tmin = 0;
    let tmax = maxDist;
    const axes = [
      [origin.x, dir.x, b.minX, b.maxX],
      [origin.y, dir.y, b.minY, b.maxY],
      [origin.z, dir.z, b.minZ, b.maxZ]
    ];
    for (const [o, d, min, max] of axes) {
      if (Math.abs(d) < 1e-8) {
        if (o < min || o > max) return null;
      } else {
        let t1 = (min - o) / d;
        let t2 = (max - o) / d;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) return null;
      }
    }
    return tmin > 0.02 ? tmin : null;
  }

  hasLineOfSight(a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const dist = dir.length();
    if (dist < 0.001) return true;
    dir.divideScalar(dist);
    if (this.raycastStatic(a, dir, dist) < dist - 0.15) return false;
    for (const smoke of this.smokes) {
      if (this.segmentSphere(a, b, smoke.center, smoke.radius)) return false;
    }
    return true;
  }

  segmentSphere(a, b, center, radius) {
    const ab = new THREE.Vector3().subVectors(b, a);
    const t = THREE.MathUtils.clamp(new THREE.Vector3().subVectors(center, a).dot(ab) / ab.lengthSq(), 0, 1);
    const p = a.clone().addScaledVector(ab, t);
    return p.distanceTo(center) < radius;
  }

  addBarrier(position, width = 3.4, height = 2.3, duration = 8, color = '#48d7ff') {
    const geo = new RoundedBoxGeometry(width, height, 0.25, 2, 0.07);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.36,
      transparent: true,
      opacity: 0.6,
      roughness: 0.3,
      metalness: 0.3
    });
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position.x, height / 2, position.z);
    mesh.castShadow = true;
    this.dynamicGroup.add(mesh);
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.9, height * 0.9),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.28 })
    );
    grid.position.z = 0.14;
    mesh.add(grid);
    const box = {
      minX: position.x - width / 2, maxX: position.x + width / 2,
      minZ: position.z - 0.15, maxZ: position.z + 0.15,
      minY: 0, maxY: height, mesh, kind: 'barrier'
    };
    const data = { mesh, box, life: duration, maxLife: duration, type: 'barrier' };
    this.temporary.push(data);
    this.blockers.push(box);
    return data;
  }

  addSmoke(position, radius = 5, duration = 8, color = '#ac8cff') {
    const group = new THREE.Group();
    group.position.copy(position);
    const count = this.quality === 'low' ? 5 : 9;
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 9),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, depthWrite: false })
      );
      mesh.scale.setScalar(radius * (0.34 + Math.random() * 0.2));
      mesh.position.set((Math.random() - 0.5) * radius * 0.8, 0.8 + Math.random() * 1.4, (Math.random() - 0.5) * radius * 0.8);
      group.add(mesh);
    }
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.8, 16, 12),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, depthWrite: false })
    );
    core.position.y = 1.2;
    core.scale.y = 0.8;
    group.add(core);
    this.dynamicGroup.add(group);
    const data = { group, center: position.clone().setY(1.1), radius: radius * 0.88, life: duration, maxLife: duration, type: 'smoke' };
    this.smokes.push(data);
    return data;
  }

  addZone(position, radius, duration, color = '#ff633f', type = 'damage') {
    const group = new THREE.Group();
    group.position.copy(position);
    group.position.y = 0.03;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius * 0.9, radius, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    group.add(ring);
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.88, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false })
    );
    disc.rotation.x = -Math.PI / 2;
    group.add(disc);
    const light = new THREE.PointLight(color, 7, radius * 2, 2);
    light.position.y = 0.5;
    group.add(light);
    this.dynamicGroup.add(group);
    const data = { group, center: position.clone(), radius, life: duration, maxLife: duration, type, ring };
    this.dynamicGroup.userData.zones = this.dynamicGroup.userData.zones || [];
    this.dynamicGroup.userData.zones.push(data);
    return data;
  }

  addHealStation(position, radius, duration, color = '#67ffb0') {
    const group = new THREE.Group();
    group.position.copy(position);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.36, 1.1, 10), WALL_MAT.panel);
    base.position.y = 0.55;
    group.add(base);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), new THREE.MeshBasicMaterial({ color }));
    orb.position.y = 1.25;
    group.add(orb);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.02, 5, 24), new THREE.MeshBasicMaterial({ color }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;
    group.add(ring);
    const light = new THREE.PointLight(color, 8, radius * 1.6, 2);
    light.position.y = 1.2;
    group.add(light);
    this.dynamicGroup.add(group);
    const data = { group, center: position.clone(), radius, life: duration, maxLife: duration, type: 'heal', orb, ring };
    this.dynamicGroup.userData.zones = this.dynamicGroup.userData.zones || [];
    this.dynamicGroup.userData.zones.push(data);
    return data;
  }

  update(dt) {
    this.clock += dt;
    // Rain.
    if (this.rain) {
      const pos = this.rain.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) - this.rainVel[i] * dt;
        if (y < 0) y = 11 + Math.random() * 3;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
    if (this.beacon) {
      const t = this.clock % 2;
      this.beacon.material.color.set(t < 0.25 ? '#ff6b4a' : '#4a1510');
    }
    // Decay temporary barriers.
    for (let i = this.temporary.length - 1; i >= 0; i--) {
      const t = this.temporary[i];
      if (t.dead) continue;
      t.life -= dt;
      t.mesh.material.opacity = Math.max(0, 0.6 * (t.life / t.maxLife));
      if (t.life <= 0) {
        t.dead = true;
        this.dynamicGroup.remove(t.mesh);
        const idx = this.blockers.indexOf(t.box);
        if (idx >= 0) this.blockers.splice(idx, 1);
        this.temporary.splice(i, 1);
      }
    }
    // Smoke decay.
    for (let i = this.smokes.length - 1; i >= 0; i--) {
      const s = this.smokes[i];
      s.life -= dt;
      s.group.children.forEach((child) => {
        if (child.material) child.material.opacity = (child.material.opacity || 0) * 0.999;
      });
      s.group.rotation.y += dt * 0.04;
      if (s.life <= 0) {
        this.dynamicGroup.remove(s.group);
        this.smokes.splice(i, 1);
      }
    }
    // Zones.
    const zones = this.dynamicGroup.userData.zones || [];
    for (let i = zones.length - 1; i >= 0; i--) {
      const z = zones[i];
      z.life -= dt;
      z.group.rotation.y += dt * 0.35;
      if (z.orb) z.orb.position.y = 1.25 + Math.sin(this.clock * 3) * 0.08;
      if (z.ring) z.ring.rotation.z += dt * 0.4;
      if (z.life <= 0) {
        this.dynamicGroup.remove(z.group);
        zones.splice(i, 1);
      }
    }
  }

  getSpawn(team, index = 0) {
    const spawn = team === 'attackers' ? this.spawns.attackers : this.spawns.defenders;
    const offsets = [
      [-2.4, 0], [2.4, 0], [-5.2, 1.2], [5.2, 1.2], [-1, 1.5], [1, 1.5]
    ];
    const o = offsets[index % offsets.length];
    return new THREE.Vector3(spawn.center.x + o[0], 0, spawn.center.z + (team === 'attackers' ? o[1] : -o[1]));
  }
}
