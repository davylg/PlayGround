import * as THREE from 'three';

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
    this.group = new THREE.Group();
    this.group.name = 'effects';
    scene.add(this.group);
  }

  tracer(from, to, color = '#ffb24a', fromPlayer = false) {
    const geo = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: fromPlayer ? 0.8 : 0.35, depthWrite: false });
    const line = new THREE.Line(geo, mat);
    this.group.add(line);
    this.items.push({ object: line, life: 0.07, maxLife: 0.07, kind: 'tracer', fade: true });
  }

  impact(position, color = '#ffd08a') {
    const group = new THREE.Group();
    group.position.copy(position);
    const count = 5;
    for (let i = 0; i < count; i++) {
      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 4, 3),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
      );
      spark.userData.vel = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        Math.random() * 4,
        (Math.random() - 0.5) * 5
      );
      group.add(spark);
    }
    const flash = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
    group.add(flash);
    this.group.add(group);
    this.items.push({ object: group, life: 0.32, maxLife: 0.32, kind: 'impact' });
  }

  muzzle(position, direction, color = '#ffbc5a') {
    const flash = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.22, 5),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, wireframe: true })
    );
    flash.position.copy(position);
    flash.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    this.group.add(flash);
    this.items.push({ object: flash, life: 0.06, maxLife: 0.06, kind: 'muzzle', fade: true });
  }

  ring(position, color = '#ff6b4a', radius = 5, duration = 0.7, vertical = false) {
    const geo = new THREE.RingGeometry(0.92, 1, 48);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(position);
    mesh.position.y += 0.05;
    if (!vertical) mesh.rotation.x = -Math.PI / 2;
    mesh.scale.setScalar(0.2);
    this.group.add(mesh);
    this.items.push({ object: mesh, life: duration, maxLife: duration, kind: 'ring', radius, fade: true });
  }

  smokeBurst(position, color = '#b58cff') {
    for (let i = 0; i < 10; i++) this.impact(position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, Math.random(), (Math.random() - 0.5) * 2)), color);
    this.ring(position, color, 3, 0.6);
  }

  lightning(from, to, color = '#70f3ff') {
    const points = [];
    const segments = 7;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const p = from.clone().lerp(to, t);
      if (i > 0 && i < segments) p.add(new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6));
      points.push(p);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }));
    this.group.add(line);
    this.items.push({ object: line, life: 0.24, maxLife: 0.24, kind: 'lightning', fade: true });
  }

  damageNumber(position, amount, headshot = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    ctx.font = `700 ${headshot ? 54 : 42}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = headshot ? '#ffcf62' : '#ffffff';
    ctx.shadowColor = headshot ? '#ffad2e' : '#ff6b4a';
    ctx.shadowBlur = 18;
    ctx.fillText(`${amount}`, 80, 55);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.position.copy(position);
    sprite.scale.set(0.8, 0.4, 1);
    this.group.add(sprite);
    this.items.push({ object: sprite, life: 0.7, maxLife: 0.7, kind: 'damage', fade: true, rise: true, texture });
  }

  explosion(position, radius = 9) {
    const light = new THREE.PointLight('#ff8a3d', 60, radius * 2.4, 2);
    light.position.copy(position);
    this.group.add(light);
    this.items.push({ object: light, life: 1.1, maxLife: 1.1, kind: 'light', startPower: 60 });
    this.ring(position, '#ff8c45', radius, 1.1);
    this.ring(position, '#ffd98b', radius * 0.6, 0.8);
    for (let i = 0; i < 22; i++) {
      const p = position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 3, Math.random() * 2, (Math.random() - 0.5) * 3));
      this.impact(p, i % 2 ? '#ff9b47' : '#ffd366');
    }
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffb35c', transparent: true, opacity: 0.5, depthWrite: false }));
    sphere.position.copy(position);
    sphere.position.y += 1;
    this.group.add(sphere);
    this.items.push({ object: sphere, life: 0.5, maxLife: 0.5, kind: 'blast', radius, fade: true });
  }

  update(dt) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.life -= dt;
      const t = Math.max(0, item.life / item.maxLife);
      if (item.kind === 'impact') {
        item.object.children.forEach((child) => {
          if (child.userData.vel) {
            child.position.addScaledVector(child.userData.vel, dt);
            child.userData.vel.y -= 8 * dt;
            child.material.opacity = t;
          } else if (child.material) {
            child.material.opacity = t;
          }
        });
      } else if (item.kind === 'ring') {
        item.object.scale.setScalar(0.2 + (1 - t) * item.radius * 0.55);
        item.object.material.opacity = t * 0.8;
      } else if (item.kind === 'blast') {
        item.object.scale.setScalar(1 + (1 - t) * item.radius);
        item.object.material.opacity = t * 0.45;
      } else if (item.kind === 'light') {
        item.object.intensity = t * item.startPower;
      } else if (item.kind === 'damage') {
        item.object.position.y += dt * 0.75;
        item.object.material.opacity = t;
      } else if (item.fade && item.object.material) {
        item.object.material.opacity = t * (item.kind === 'tracer' ? 0.8 : 0.9);
      }
      if (item.life <= 0) {
        this.group.remove(item.object);
        if (item.object.geometry) item.object.geometry.dispose();
        if (item.object.material) item.object.material.dispose();
        if (item.texture) item.texture.dispose();
        this.items.splice(i, 1);
      }
    }
  }

  clear() {
    for (const item of this.items) {
      this.group.remove(item.object);
      item.object.traverse?.((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      if (item.object.geometry) item.object.geometry.dispose();
      if (item.object.material) item.object.material.dispose();
      if (item.texture) item.texture.dispose();
    }
    this.items = [];
  }
}
