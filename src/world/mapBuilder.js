import * as THREE from 'three';

export class MapBuilder {
  constructor(scene, quality = 'medium') {
    this.scene = scene;
    this.quality = quality;
    this.colliders = [];
    this.meshes = [];
    this.siteZones = [
      { id: 'A', center: new THREE.Vector2(-18, 0), radius: 6 },
      { id: 'B', center: new THREE.Vector2(18, 0), radius: 6 },
    ];
    this.spawnPoints = {
      attackers: [
        new THREE.Vector3(-10, 0, 18),
        new THREE.Vector3(-5, 0, 18.5),
        new THREE.Vector3(0, 0, 18),
        new THREE.Vector3(5, 0, 18.5),
        new THREE.Vector3(10, 0, 18),
      ],
      defenders: [
        new THREE.Vector3(-10, 0, -18),
        new THREE.Vector3(-5, 0, -18.5),
        new THREE.Vector3(0, 0, -18),
        new THREE.Vector3(5, 0, -18.5),
        new THREE.Vector3(10, 0, -18),
      ],
    };
    this.patrolPoints = {
      defenders: [
        new THREE.Vector3(-18, 0, -2),
        new THREE.Vector3(-13, 0, 4),
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(13, 0, 4),
        new THREE.Vector3(18, 0, -2),
        new THREE.Vector3(-4, 0, -8),
        new THREE.Vector3(4, 0, -8),
      ],
      attackers: [
        new THREE.Vector3(-18, 0, 2),
        new THREE.Vector3(0, 0, 4),
        new THREE.Vector3(18, 0, 2),
        new THREE.Vector3(-12, 0, 9),
        new THREE.Vector3(12, 0, 9),
      ],
    };
    this.effects = [];
    this.group = new THREE.Group();
    scene.add(this.group);
    this.build();
    this.buildGrid();
  }

  build() {
    this.createGround();
    this.createPerimeter();
    this.createArchitecture();
    this.createSites();
    this.createLights();
    this.createProps();
  }

  createGround() {
    const geometry = new THREE.PlaneGeometry(70, 44);
    const material = new THREE.MeshStandardMaterial({ color: 0x1c232c });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.userData.blockBullet = true;
    this.group.add(ground);
    this.meshes.push(ground);

    const gridHelper = new THREE.GridHelper(70, 70, 0x2a3442, 0x1c232c);
    gridHelper.position.y = 0.02;
    gridHelper.material.opacity = 0.18;
    gridHelper.material.transparent = true;
    this.group.add(gridHelper);

    const accentFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 44),
      new THREE.MeshBasicMaterial({ color: 0x0a0d13, transparent: true, opacity: 0.28 }),
    );
    accentFloor.rotation.x = -Math.PI / 2;
    accentFloor.position.y = 0.01;
    this.group.add(accentFloor);
  }

  createPerimeter() {
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x4a525e });
    const dims = [
      { x: 0, z: 22, width: 70, depth: 1, height: 5 },
      { x: 0, z: -22, width: 70, depth: 1, height: 5 },
      { x: 35, z: 0, width: 1, depth: 45, height: 5 },
      { x: -35, z: 0, width: 1, depth: 45, height: 5 },
    ];
    dims.forEach(dim => this.addBox(dim, wallMat));
  }

  createArchitecture() {
    const concrete = new THREE.MeshStandardMaterial({ color: 0x525c68 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x323b46 });
    const accent = new THREE.MeshStandardMaterial({ color: 0x1f2d38, emissive: 0x1c3646, emissiveIntensity: 0.35 });

    const structures = [
      { x: -10, z: -11, width: 14, depth: 2.2, height: 4, material: concrete },
      { x: 10, z: 11, width: 14, depth: 2.2, height: 4, material: concrete },
      { x: -10, z: 11, width: 8, depth: 2.2, height: 4, material: concrete },
      { x: 10, z: -11, width: 8, depth: 2.2, height: 4, material: concrete },
      { x: 0, z: 0, width: 2.4, depth: 16, height: 5, material: darkMetal },
      { x: -18, z: 7, width: 8, depth: 1.6, height: 3.2, material: concrete },
      { x: 18, z: -7, width: 8, depth: 1.6, height: 3.2, material: concrete },
      { x: -20, z: -10, width: 2, depth: 12, height: 3.6, material: concrete },
      { x: 20, z: 10, width: 2, depth: 12, height: 3.6, material: concrete },
      { x: -4, z: 4, width: 3.4, depth: 3.4, height: 2.2, material: darkMetal },
      { x: 4, z: -4, width: 3.4, depth: 3.4, height: 2.2, material: darkMetal },
      { x: -13, z: 2, width: 4, depth: 3, height: 2.4, material: accent },
      { x: 13, z: -2, width: 4, depth: 3, height: 2.4, material: accent },
      { x: -28, z: -14, width: 7, depth: 5, height: 2.6, material: concrete },
      { x: 28, z: 14, width: 7, depth: 5, height: 2.6, material: concrete },
    ];
    structures.forEach(struct => this.addBox(struct, struct.material || concrete));

    // Strategic pillars.
    [[-25, 0], [25, 0], [-12, -18], [12, 18]].forEach(([x, z]) => {
      this.addBox({ x, z, width: 1.5, depth: 1.5, height: 4.5 }, darkMetal);
    });
  }

  createSites() {
    this.siteZones.forEach(site => {
      const color = site.id === 'A' ? 0xff5b2e : 0x42d9ee;
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(site.radius - 0.55, site.radius, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.42, side: THREE.DoubleSide }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(site.center.x, 0.05, site.center.y);
      this.group.add(ring);
      const inner = new THREE.Mesh(
        new THREE.CircleGeometry(site.radius - 1.1, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, side: THREE.DoubleSide }),
      );
      inner.rotation.x = -Math.PI / 2;
      inner.position.set(site.center.x, 0.035, site.center.y);
      this.group.add(inner);
      const label = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeSiteLabel(site.id, site.id === 'A' ? '#ff5b2e' : '#42d9ee'),
        transparent: true,
        opacity: 0.9,
      }));
      label.position.set(site.center.x, 3.4, site.center.y);
      label.scale.set(3.2, 1.6, 1);
      this.group.add(label);
      const light = new THREE.PointLight(color, 0.65, 18, 2);
      light.position.set(site.center.x, 3.2, site.center.y);
      this.group.add(light);
    });
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x77808c, this.quality === 'low' ? 0.65 : 0.45);
    this.group.add(ambient);
    const hemisphere = new THREE.HemisphereLight(0x5d6a7a, 0x11151b, 0.5);
    this.group.add(hemisphere);
    const directional = new THREE.DirectionalLight(0xffe8d2, this.quality === 'low' ? 1.0 : 1.7);
    directional.position.set(18, 28, -14);
    if (this.quality === 'low') directional.castShadow = false;
    else {
      directional.castShadow = true;
      directional.shadow.mapSize.set(this.quality === 'high' ? 2048 : 1024, this.quality === 'high' ? 2048 : 1024);
      directional.shadow.camera.near = 1;
      directional.shadow.camera.far = 90;
      directional.shadow.camera.left = -48;
      directional.shadow.camera.right = 48;
      directional.shadow.camera.top = 40;
      directional.shadow.camera.bottom = -40;
      directional.shadow.bias = -0.0006;
    }
    this.group.add(directional);
    this.directional = directional;

    const warmLight = new THREE.PointLight(0xff6f47, 0.55, 26, 2);
    warmLight.position.set(-14, 4, 10);
    this.group.add(warmLight);
    const coolLight = new THREE.PointLight(0x3fe6f0, 0.5, 26, 2);
    coolLight.position.set(14, 4, -10);
    this.group.add(coolLight);
  }

  createProps() {
    const palette = [0x4a5561, 0x3a434e, 0x57616e, 0x2e3742];
    const props = [
      { x: -23, z: 5, w: 1.5, d: 1.5, h: 1.5 },
      { x: -17, z: -4, w: 1.5, d: 1.5, h: 1.2 },
      { x: -8, z: 7, w: 1.3, d: 1.3, h: 1.3 },
      { x: -2, z: -7, w: 1.5, d: 1.5, h: 1.4 },
      { x: 3, z: 7, w: 1.5, d: 1.5, h: 1.3 },
      { x: 9, z: -7, w: 1.5, d: 1.5, h: 1.5 },
      { x: 17, z: 4, w: 1.5, d: 1.5, h: 1.2 },
      { x: 23, z: -5, w: 1.5, d: 1.5, h: 1.5 },
      { x: -27, z: -6, w: 2, d: 2, h: 2.2 },
      { x: 27, z: 6, w: 2, d: 2, h: 2.2 },
      { x: -6, z: -17, w: 3.5, d: 2, h: 2.5 },
      { x: 6, z: 17, w: 3.5, d: 2, h: 2.5 },
    ];
    props.forEach((prop, index) => {
      const material = new THREE.MeshStandardMaterial({ color: palette[index % palette.length] });
      this.addBox({ x: prop.x, z: prop.z, width: prop.w, depth: prop.d, height: prop.h }, material);
    });

    const barrelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 1.1, 10);
    const barrelPositions = [
      [-15, 0.55, 3], [15, 0.55, -3], [-26, 0.55, 2], [26, 0.55, -2], [-11, 0.55, -15], [11, 0.55, 15],
    ];
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x404b58 });
    const barrelAccent = new THREE.MeshStandardMaterial({ color: 0x1b2a36, emissive: 0x213a4a, emissiveIntensity: 0.35 });
    barrelPositions.forEach((pos, i) => {
      const barrel = new THREE.Mesh(barrelGeometry, i % 2 ? barrelAccent : barrelMat);
      barrel.position.set(pos[0], pos[1], pos[2]);
      barrel.castShadow = true;
      barrel.receiveShadow = true;
      this.group.add(barrel);
      this.meshes.push(barrel);
      this.colliders.push(makeCollider(pos[0], pos[2], 0.95, 0.95, 1.1));
    });

    // Tactical signage.
    const signs = [
      { text: 'SITE A', color: '#ff5b2e', pos: [-18, 2.8, 0] },
      { text: 'SITE B', color: '#42d9ee', pos: [18, 2.8, 0] },
      { text: 'VC', color: '#f4f0e8', pos: [0, 2.6, 18.6] },
    ];
    signs.forEach(sign => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeTextTexture(sign.text, sign.color), transparent: true }));
      sprite.position.set(sign.pos[0], sign.pos[1], sign.pos[2]);
      sprite.scale.set(3, 1.1, 1);
      this.group.add(sprite);
    });
  }

  addBox(dim, material) {
    const geometry = new THREE.BoxGeometry(dim.width, dim.height, dim.depth);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(dim.x, dim.height / 2, dim.z);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    mesh.userData.blockBullet = true;
    this.group.add(mesh);
    this.meshes.push(mesh);
    this.colliders.push({
      minX: dim.x - dim.width / 2,
      maxX: dim.x + dim.width / 2,
      minZ: dim.z - dim.depth / 2,
      maxZ: dim.z + dim.depth / 2,
      minY: 0,
      maxY: dim.height,
      height: dim.height,
    });
  }

  buildGrid() {
    this.gridSize = 1.0;
    this.gridMinX = -35;
    this.gridMinZ = -22;
    this.cols = Math.round(70 / this.gridSize);
    this.rows = Math.round(44 / this.gridSize);
    this.grid = new Array(this.cols * this.rows).fill(0);
    this.colliders.forEach(collider => {
      if (collider.height <= 0.8) return;
      const minCol = Math.max(0, Math.floor((collider.minX - this.gridMinX) / this.gridSize));
      const maxCol = Math.min(this.cols - 1, Math.floor((collider.maxX - this.gridMinX) / this.gridSize));
      const minRow = Math.max(0, Math.floor((collider.minZ - this.gridMinZ) / this.gridSize));
      const maxRow = Math.min(this.rows - 1, Math.floor((collider.maxZ - this.gridMinZ) / this.gridSize));
      for (let col = minCol; col <= maxCol; col += 1) {
        for (let row = minRow; row <= maxRow; row += 1) this.grid[row * this.cols + col] = 1;
      }
    });
  }

  nearestFreeCell(cell) {
    if (!cell) return null;
    if (!this.grid[cell.row * this.cols + cell.col]) return cell;
    for (let radius = 1; radius <= 8; radius += 1) {
      let best = null;
      let bestDist = Infinity;
      for (let dr = -radius; dr <= radius; dr += 1) {
        for (let dc = -radius; dc <= radius; dc += 1) {
          if (Math.max(Math.abs(dr), Math.abs(dc)) !== radius) continue;
          const row = cell.row + dr;
          const col = cell.col + dc;
          if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) continue;
          if (this.grid[row * this.cols + col]) continue;
          const dist = dr * dr + dc * dc;
          if (dist < bestDist) { bestDist = dist; best = { col, row }; }
        }
      }
      if (best) return best;
    }
    return null;
  }

  findPath(start, end) {
    const startCell = this.nearestFreeCell(this.worldToCell(start));
    const endCell = this.nearestFreeCell(this.worldToCell(end));
    if (!startCell || !endCell) return [];
    const queue = [startCell];
    const cameFrom = new Map();
    const key = cell => cell.row * this.cols + cell.col;
    cameFrom.set(key(startCell), null);
    let result = null;
    let iterations = 0;
    while (queue.length && iterations < 9000) {
      iterations += 1;
      // Greedy best-first: pick the queued cell closest to the goal.
      let bestIndex = 0;
      let bestScore = Infinity;
      for (let i = 0; i < queue.length; i += 1) {
        const score = Math.abs(queue[i].col - endCell.col) + Math.abs(queue[i].row - endCell.row);
        if (score < bestScore) { bestScore = score; bestIndex = i; }
      }
      const current = queue.splice(bestIndex, 1)[0];
      if (current.row === endCell.row && current.col === endCell.col) { result = current; break; }
      const neighbors = [
        { row: current.row + 1, col: current.col },
        { row: current.row - 1, col: current.col },
        { row: current.row, col: current.col + 1 },
        { row: current.row, col: current.col - 1 },
        { row: current.row + 1, col: current.col + 1 },
        { row: current.row + 1, col: current.col - 1 },
        { row: current.row - 1, col: current.col + 1 },
        { row: current.row - 1, col: current.col - 1 },
      ];
      neighbors.forEach(neighbor => {
        if (neighbor.row < 0 || neighbor.row >= this.rows || neighbor.col < 0 || neighbor.col >= this.cols) return;
        if (this.grid[neighbor.row * this.cols + neighbor.col]) return;
        if (cameFrom.has(key(neighbor))) return;
        cameFrom.set(key(neighbor), current);
        queue.push(neighbor);
      });
    }
    if (!result) return [];
    const path = [];
    let current = result;
    while (current) {
      path.unshift(this.cellToWorld(current));
      current = cameFrom.get(key(current));
    }
    return path.slice(1);
  }

  worldToCell(vector) {
    const col = Math.floor((vector.x - this.gridMinX) / this.gridSize);
    const row = Math.floor((vector.z - this.gridMinZ) / this.gridSize);
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return null;
    return { col, row };
  }

  cellToWorld(cell) {
    return new THREE.Vector3(
      this.gridMinX + (cell.col + 0.5) * this.gridSize,
      0,
      this.gridMinZ + (cell.row + 0.5) * this.gridSize,
    );
  }

  randomPointInSite(siteId) {
    const zone = this.siteZones.find(s => s.id === siteId);
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * zone.radius * 0.7;
    return new THREE.Vector3(zone.center.x + Math.cos(angle) * radius, 0, zone.center.y + Math.sin(angle) * radius);
  }

  siteAt(position) {
    return this.siteZones.find(zone => Math.hypot(position.x - zone.center.x, position.z - zone.center.y) <= zone.radius);
  }

  resolveCollision(position, radius = 0.45) {
    let collided = false;
    for (const collider of this.colliders) {
      if (position.y > collider.maxY || position.y + 1.6 < collider.minY) continue;
      const closestX = THREE.MathUtils.clamp(position.x, collider.minX, collider.maxX);
      const closestZ = THREE.MathUtils.clamp(position.z, collider.minZ, collider.maxZ);
      const dx = position.x - closestX;
      const dz = position.z - closestZ;
      const distSq = dx * dx + dz * dz;
      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) || 0.0001;
        const push = (radius - dist) / dist;
        position.x += dx * push;
        position.z += dz * push;
        collided = true;
      }
    }
    // Keep inside arena.
    position.x = THREE.MathUtils.clamp(position.x, -34.2, 34.2);
    position.z = THREE.MathUtils.clamp(position.z, -21.2, 21.2);
    return collided;
  }

  raycastTargets() {
    return this.meshes;
  }

  update(dt) {
    this.siteZones.forEach(zone => {
      const pulse = Math.sin(performance.now() * 0.002 + zone.center.x) * 0.08 + 1;
      zone.meshes?.forEach(mesh => mesh.material.opacity = zone.id === 'A' ? 0.28 + pulse * 0.07 : 0.24 + pulse * 0.07);
    });
  }

  dispose() {
    this.group.traverse(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    });
    this.scene.remove(this.group);
  }
}

function makeCollider(x, z, width, depth, height) {
  return {
    minX: x - width / 2,
    maxX: x + width / 2,
    minZ: z - depth / 2,
    maxZ: z + depth / 2,
    minY: 0,
    maxY: height,
    height,
  };
}

function makeTextTexture(text, color = '#f4f0e8') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(5,8,12,0.72)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
  ctx.fillStyle = color;
  ctx.font = '700 44px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function makeSiteLabel(id, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, 236, 108);
  ctx.fillStyle = color;
  ctx.font = '900 76px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`SITE ${id}`, canvas.width / 2, canvas.height / 2 + 22);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
