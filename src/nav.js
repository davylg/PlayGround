// Navigation grid, A* pathfinding, and 2D collision helpers.
export class NavGrid {
  constructor(map, colliders, cell = 1.25) {
    this.map = map;
    this.cell = cell;
    this.min = -49;
    this.max = 49;
    this.n = Math.floor((this.max - this.min) / cell);
    this.blocked = new Uint8Array(this.n * this.n);
    this.colliders = colliders;
    this.build();
  }

  build() {
    const { n, cell, min } = this;
    for (let iz = 0; iz < n; iz++) {
      for (let ix = 0; ix < n; ix++) {
        const x = min + (ix + 0.5) * cell;
        const z = min + (iz + 0.5) * cell;
        let blocked = 0;
        for (const c of this.colliders) {
          if (x > c.x - c.w / 2 - 0.48 && x < c.x + c.w / 2 + 0.48 &&
              z > c.z - c.d / 2 - 0.48 && z < c.z + c.d / 2 + 0.48) {
            blocked = 1; break;
          }
        }
        this.blocked[iz * n + ix] = blocked;
      }
    }
  }

  idx(ix, iz) { return iz * this.n + ix; }

  toCell(x, z) {
    const ix = Math.floor((x - this.min) / this.cell);
    const iz = Math.floor((z - this.min) / this.cell);
    return [Math.max(0, Math.min(this.n - 1, ix)), Math.max(0, Math.min(this.n - 1, iz))];
  }

  toWorld(ix, iz) {
    return { x: this.min + (ix + 0.5) * this.cell, z: this.min + (iz + 0.5) * this.cell };
  }

  walkable(ix, iz) {
    return ix >= 0 && iz >= 0 && ix < this.n && iz < this.n && !this.blocked[iz * this.n + ix];
  }

  nearestWalkable(x, z) {
    let [ix, iz] = this.toCell(x, z);
    if (this.walkable(ix, iz)) return { x, z };
    for (let r = 1; r <= 12; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;
          if (this.walkable(ix + dx, iz + dz)) return this.toWorld(ix + dx, iz + dz);
        }
      }
    }
    return { x, z };
  }

  findPath(from, to) {
    const start = this.nearestWalkable(from.x, from.z);
    const end = this.nearestWalkable(to.x, to.z);
    let [sx, sz] = this.toCell(start.x, start.z);
    let [ex, ez] = this.toCell(end.x, end.z);
    if (sx === ex && sz === ez) return [{ x: end.x, z: end.z }];
    const n = this.n;
    const size = n * n;
    const gScore = new Float32Array(size).fill(Infinity);
    const came = new Int32Array(size).fill(-1);
    const closed = new Uint8Array(size);
    const startIdx = this.idx(sx, sz);
    const endIdx = this.idx(ex, ez);
    gScore[startIdx] = 0;
    const heap = new MinHeap();
    heap.push(startIdx, this.heuristic(sx, sz, ex, ez));
    const dirs = [[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];
    let found = false;
    let guard = 0;
    while (heap.length && guard++ < 12000) {
      const cur = heap.pop();
      if (cur === endIdx) { found = true; break; }
      if (closed[cur]) continue;
      closed[cur] = 1;
      const cx = cur % n;
      const cz = (cur / n) | 0;
      for (const [dx, dz, cost] of dirs) {
        const nx = cx + dx, nz = cz + dz;
        if (!this.walkable(nx, nz)) continue;
        if (dx && dz && (!this.walkable(cx + dx, cz) || !this.walkable(cx, cz + dz))) continue;
        const ni = this.idx(nx, nz);
        if (closed[ni]) continue;
        const ng = gScore[cur] + cost;
        if (ng < gScore[ni]) {
          gScore[ni] = ng;
          came[ni] = cur;
          heap.push(ni, ng + this.heuristic(nx, nz, ex, ez));
        }
      }
    }
    if (!found) return [{ x: end.x, z: end.z }];
    const path = [];
    let cur = endIdx;
    while (cur !== -1 && path.length < 1200) {
      const ix = cur % n, iz = (cur / n) | 0;
      path.push(this.toWorld(ix, iz));
      cur = came[cur];
    }
    path.reverse();
    // Remove redundant collinear points.
    if (path.length > 3) {
      const out = [path[0]];
      for (let i = 1; i < path.length - 1; i++) {
        const a = out[out.length - 1], b = path[i], c = path[i + 1];
        const cross = (b.x - a.x) * (c.z - b.z) - (b.z - a.z) * (c.x - b.x);
        if (Math.abs(cross) > 0.02) out.push(b);
      }
      out.push(path[path.length - 1]);
      return out;
    }
    return path;
  }

  heuristic(x, z, ex, ez) {
    const dx = Math.abs(x - ex), dz = Math.abs(z - ez);
    return (dx + dz) + (1.414 - 2) * Math.min(dx, dz);
  }
}

class MinHeap {
  constructor() { this.a = []; }
  get length() { return this.a.length; }
  push(value, priority) {
    const node = { value, priority };
    this.a.push(node);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.a[p].priority <= node.priority) break;
      this.a[i] = this.a[p]; i = p;
    }
    this.a[i] = node;
  }
  pop() {
    const root = this.a[0];
    const last = this.a.pop();
    if (this.a.length && last) {
      let i = 0;
      while (true) {
        let l = i * 2 + 1, r = l + 1, m = i;
        if (l < this.a.length && this.a[l].priority < this.a[m].priority) m = l;
        if (r < this.a.length && this.a[r].priority < this.a[m].priority) m = r;
        if (m === i) break;
        this.a[i] = this.a[m]; i = m;
      }
      this.a[i] = last;
    }
    return root.value;
  }
}

export function resolveCollision(pos, radius, colliders) {
  for (const c of colliders) {
    const minX = c.x - c.w / 2 - radius;
    const maxX = c.x + c.w / 2 + radius;
    const minZ = c.z - c.d / 2 - radius;
    const maxZ = c.z + c.d / 2 + radius;
    if (pos.x > minX && pos.x < maxX && pos.z > minZ && pos.z < maxZ) {
      const dl = pos.x - minX, dr = maxX - pos.x;
      const dt = pos.z - minZ, db = maxZ - pos.z;
      const m = Math.min(dl, dr, dt, db);
      if (m === dl) pos.x = minX;
      else if (m === dr) pos.x = maxX;
      else if (m === dt) pos.z = minZ;
      else pos.z = maxZ;
    }
  }
  pos.x = Math.max(-48.5, Math.min(48.5, pos.x));
  pos.z = Math.max(-48.5, Math.min(48.5, pos.z));
}

export function pointInBox(x, z, c, pad = 0) {
  return x > c.x - c.w / 2 - pad && x < c.x + c.w / 2 + pad &&
         z > c.z - c.d / 2 - pad && z < c.z + c.d / 2 + pad;
}
