import * as THREE from 'three';

export const BombState = {
  NOT_PLANTED: 'notPlanted',
  PLANTING: 'planting',
  PLANTED: 'planted',
  DEFUSING: 'defusing',
  DEFUSED: 'defused',
  EXPLODED: 'exploded',
};

export class BombController {
  constructor({ scene, map, audio }) {
    this.scene = scene;
    this.map = map;
    this.audio = audio;
    this.state = BombState.NOT_PLANTED;
    this.position = new THREE.Vector3();
    this.site = null;
    this.timer = 35;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.entity = null;
    this.plantingEntity = null;
    this.defusingEntity = null;
    this.isBotAction = false;
    this.lastBeep = 0;
    this.visible = false;
    this.createMesh();
    this.hide();
  }

  createMesh() {
    this.group = new THREE.Group();
    const caseMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.3, 0.45),
      new THREE.MeshLambertMaterial({ color: 0x2b333c }),
    );
    caseMesh.position.y = 0.15;
    caseMesh.castShadow = true;
    const light = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff344b }),
    );
    light.position.set(0, 0.28, 0);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6), new THREE.MeshBasicMaterial({ color: 0xdfe3e8 }));
    antenna.position.set(0.25, 0.32, 0);
    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 1.1, 26),
      new THREE.MeshBasicMaterial({ color: 0xff344b, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
    );
    pulse.rotation.x = -Math.PI / 2;
    pulse.position.y = 0.04;
    this.group.add(caseMesh, light, antenna, pulse);
    this.lightMesh = light;
    this.pulseMesh = pulse;
    this.group.userData.isBomb = true;
    this.scene.add(this.group);
  }

  resetRound() {
    this.state = BombState.NOT_PLANTED;
    this.position.set(0, 0, 0);
    this.site = null;
    this.timer = 35;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.entity = null;
    this.plantingEntity = null;
    this.defusingEntity = null;
    this.isBotAction = false;
    this.hide();
  }

  hide() {
    this.group.visible = false;
    this.visible = false;
  }

  show(position) {
    this.group.position.copy(position);
    this.group.position.y = 0;
    this.group.visible = true;
    this.visible = true;
  }

  canPlant(entity, site) {
    if (!entity || !entity.isAlive() || entity.team !== 'attackers') return false;
    if (this.state !== BombState.NOT_PLANTED && this.state !== BombState.PLANTING) return false;
    const currentSite = this.map.siteAt(entity.mesh.position);
    if (!currentSite) return false;
    if (site && currentSite.id !== site) return false;
    return true;
  }

  startPlant(entity, bot = false) {
    if (!this.canPlant(entity)) return false;
    this.state = BombState.PLANTING;
    this.site = this.map.siteAt(entity.mesh.position).id;
    this.position.copy(entity.mesh.position);
    this.position.y = 0;
    this.plantProgress = 0;
    this.plantingEntity = entity;
    this.isBotAction = bot;
    this.audio.plant();
    return true;
  }

  updatePlant(dt, stillHolding = true) {
    if (this.state !== BombState.PLANTING) return false;
    if (!stillHolding || !this.plantingEntity?.isAlive() || this.map.siteAt(this.plantingEntity.mesh.position)?.id !== this.site) {
      this.state = BombState.NOT_PLANTED;
      this.plantProgress = 0;
      this.plantingEntity = null;
      this.site = null;
      return false;
    }
    const speed = this.plantingEntity.character?.passive.flags?.bombSpeed || 1;
    this.plantProgress += dt * (1 / speed);
    if (this.plantProgress >= 3.2) {
      this.completePlant();
      return true;
    }
    return false;
  }

  completePlant() {
    this.state = BombState.PLANTED;
    this.timer = 35;
    this.plantProgress = 0;
    this.show(this.position);
    this.audio.bombBeep(1);
  }

  canDefuse(entity) {
    if (!entity || !entity.isAlive() || entity.team !== 'defenders') return false;
    if (this.state !== BombState.PLANTED && this.state !== BombState.DEFUSING) return false;
    return entity.mesh.position.distanceTo(this.position) < 3.2;
  }

  startDefuse(entity, bot = false) {
    if (!this.canDefuse(entity)) return false;
    this.state = BombState.DEFUSING;
    this.defusingEntity = entity;
    this.defuseProgress = 0;
    this.isBotAction = bot;
    this.audio.defuse();
    return true;
  }

  updateDefuse(dt, stillHolding = true) {
    if (this.state !== BombState.DEFUSING) return false;
    if (!stillHolding || !this.defusingEntity?.isAlive() || this.defusingEntity.mesh.position.distanceTo(this.position) > 3.4) {
      this.state = BombState.PLANTED;
      this.defuseProgress = 0;
      this.defusingEntity = null;
      return false;
    }
    const speed = this.defusingEntity.character?.passive.flags?.bombSpeed || 1;
    this.defuseProgress += dt * (1 / speed);
    if (this.defuseProgress >= 5) {
      this.defused();
      return true;
    }
    return false;
  }

  defused() {
    this.state = BombState.DEFUSED;
    this.defuseProgress = 0;
    this.defusingEntity = null;
    this.audio.defuse();
  }

  explode() {
    this.state = BombState.EXPLODED;
    this.audio.explosion();
    this.hide();
  }

  update(dt) {
    if (this.state === BombState.PLANTED || this.state === BombState.DEFUSING) {
      this.timer -= dt;
      const beepInterval = this.timer < 8 ? 0.24 : this.timer < 16 ? 0.45 : 0.85;
      this.lastBeep -= dt;
      if (this.lastBeep <= 0) {
        this.audio.bombBeep(this.timer < 8 ? 1.6 : 1);
        this.lastBeep = beepInterval;
      }
      this.lightMesh.material.color.setHex(Math.floor(performance.now() / 180) % 2 ? 0xff344b : 0x88121e);
      const pulseScale = 1 + Math.sin(performance.now() * 0.008) * 0.1;
      this.pulseMesh.scale.setScalar(pulseScale);
      this.pulseMesh.material.opacity = 0.28 + Math.sin(performance.now() * 0.006) * 0.15;
      if (this.timer <= 0) {
        this.explode();
        return true;
      }
    } else {
      this.lightMesh.material.color.setHex(0xff344b);
      this.pulseMesh.scale.setScalar(1);
    }
    return false;
  }

  status() {
    return {
      state: this.state,
      timer: this.timer,
      site: this.site,
      plantProgress: this.plantProgress,
      defuseProgress: this.defuseProgress,
      position: this.position.clone(),
    };
  }
}
