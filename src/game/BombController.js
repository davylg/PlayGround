import * as THREE from 'three';

export const BOMB_STATE = {
  NOT_PLANTED: 'NotPlanted',
  PLANTING: 'Planting',
  PLANTED: 'Planted',
  DEFUSING: 'Defusing',
  DEFUSED: 'Defused',
  EXPLODED: 'Exploded'
};

const PLANT_TIME = 4.0;
const DEFUSE_TIME = 5.2;
const BOMB_TIME = 40;

export class BombController {
  constructor(game) {
    this.game = game;
    this.state = BOMB_STATE.NOT_PLANTED;
    this.position = null;
    this.bombMesh = null;
    this.light = null;
    this.timer = 0;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.plantSite = null;
    this.playerPlanting = false;
    this.playerDefusing = false;
    this.botPlanter = null;
    this.botDefuser = null;
    this.lastBeep = 0;
    this.defuserHold = 0;
    this.reset();
  }

  reset() {
    if (this.bombMesh) {
      this.game.scene.remove(this.bombMesh);
      this.disposeGroup(this.bombMesh);
      this.bombMesh = null;
    }
    this.state = BOMB_STATE.NOT_PLANTED;
    this.position = null;
    this.timer = 0;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.botPlantProgress = 0;
    this.botDefuseProgress = 0;
    this.plantSite = null;
    this.playerPlanting = false;
    this.playerDefusing = false;
    this.botPlanter = null;
    this.botDefuser = null;
    this.lastBeep = 0;
    this.defuseTimer = 0;
    this.plantTimer = 0;
    this.game.hud?.setBombStatus(null);
    this.game.hud?.setPrompt(null);
  }

  disposeGroup(group) {
    group.traverse?.((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  getSiteAt(position) {
    if (!position) return null;
    for (const site of Object.values(this.game.world.sites)) {
      if (position.distanceTo(site.center) < site.radius - 0.35) return site;
    }
    return null;
  }

  plant(planter, site) {
    this.state = BOMB_STATE.PLANTED;
    this.plantSite = site;
    this.position = planter.position.clone();
    this.position.y = 0;
    this.timer = BOMB_TIME;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.playerPlanting = false;
    this.playerDefusing = false;
    this.buildBombMesh();
    this.game.audio.sfx('plant');
    this.game.hud.setBombStatus({ state: 'Planted', timer: this.timer, site: site.id });
    this.game.hud.notify(`BOMBA PLANTADA NO SITE ${site.id}`, '#ff633f', 4);
    this.game.roundManager?.onBombPlanted?.(site);
    this.game.addKillfeed?.('BOMBA', `plantada no site ${site.id}`, '#ff633f');
  }

  defuse(defuser) {
    this.state = BOMB_STATE.DEFUSED;
    this.defuseProgress = DEFUSE_TIME;
    this.playerDefusing = false;
    this.game.hud.setBombStatus({ state: 'Defused', timer: 0, site: this.plantSite?.id });
    this.game.hud.notify('BOMBA DESARMADA', '#4adfff', 4);
    this.game.audio.sfx('defuse');
    this.game.roundManager?.onBombDefused?.(defuser);
    this.game.addKillfeed?.('DESARME', 'bomba neutralizada', '#4adfff');
    this.fadeBomb();
  }

  explode() {
    if (this.state === BOMB_STATE.EXPLODED || this.state === BOMB_STATE.DEFUSED) return;
    this.state = BOMB_STATE.EXPLODED;
    this.game.effects.explosion(this.position || new THREE.Vector3(), 10);
    this.game.audio.sfx('explosion');
    this.game.hud.flashExplosion?.();
    this.game.roundManager?.onBombExploded?.();
    this.fadeBomb();
  }

  fadeBomb() {
    if (!this.bombMesh) return;
    this.bombMesh.children.forEach((child) => {
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = 0.35;
      }
    });
    if (this.light) this.light.intensity = 0;
  }

  buildBombMesh() {
    if (this.bombMesh) this.game.scene.remove(this.bombMesh);
    const group = new THREE.Group();
    group.position.copy(this.position);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#20252b', roughness: 0.45, metalness: 0.72 });
    const dark = new THREE.MeshStandardMaterial({ color: '#0b0e11', roughness: 0.8 });
    const red = new THREE.MeshBasicMaterial({ color: '#ff3b2f' });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.32), bodyMat);
    body.position.y = 0.18;
    body.castShadow = true;
    group.add(body);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.012), red);
    screen.position.set(0, 0.23, 0.167);
    group.add(screen);
    for (let i = 0; i < 3; i++) {
      const wire = new THREE.Mesh(new THREE.TorusGeometry(0.13 + i * 0.015, 0.008, 4, 14, Math.PI), new THREE.MeshBasicMaterial({ color: i === 1 ? '#ffd15c' : '#ff3b2f' }));
      wire.position.set(0, 0.28, 0);
      wire.rotation.x = Math.PI / 2;
      wire.rotation.z = i * 0.8;
      group.add(wire);
    }
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28, 5), dark);
    antenna.position.set(0.16, 0.42, -0.06);
    group.add(antenna);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 5), red);
    tip.position.set(0.16, 0.57, -0.06);
    group.add(tip);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.6, 32), new THREE.MeshBasicMaterial({ color: '#ff3b2f', transparent: true, opacity: 0.35, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.012;
    group.add(ring);
    const light = new THREE.PointLight('#ff3b2f', 5, 8, 2);
    light.position.set(0, 0.55, 0);
    group.add(light);
    this.light = light;
    this.screen = screen;
    this.bombRing = ring;
    this.game.scene.add(group);
    this.bombMesh = group;
  }

  update(dt) {
    if (this.state === BOMB_STATE.PLANTED) {
      this.timer -= dt;
      this.game.hud.setBombStatus({ state: 'Planted', timer: this.timer, site: this.plantSite?.id });
      const beepInterval = THREE.MathUtils.clamp(this.timer / 40, 0.12, 1) * 0.85;
      if (this.game.elapsed - this.lastBeep > beepInterval) {
        this.lastBeep = this.game.elapsed;
        this.game.audio.sfx('beep');
        if (this.screen) this.screen.material.color.set('#ffffff');
        setTimeout(() => {
          if (this.screen) this.screen.material.color.set('#ff3b2f');
        }, 80);
      }
      if (this.bombRing) this.bombRing.material.opacity = 0.22 + Math.abs(Math.sin(this.game.elapsed * 3)) * 0.3;
      if (this.light) this.light.intensity = 3 + Math.abs(Math.sin(this.game.elapsed * 4)) * 8;
      if (this.timer <= 0) this.explode();
      this.updatePlayerDefuse(dt);
      return;
    }
    if (this.state === BOMB_STATE.DEFUSED || this.state === BOMB_STATE.EXPLODED) return;
    this.updatePlayerPlant(dt);
  }

  updatePlayerPlant(dt) {
    const player = this.game.player;
    if (!player?.isAlive || player.team !== 'attackers' || !this.game.roundManager.canPlant()) {
      this.playerPlanting = false;
      if (this.plantProgress > 0) this.plantProgress = Math.max(0, this.plantProgress - dt * 1.5);
      return;
    }
    const site = this.getSiteAt(player.position);
    const hasInput = this.game.input.interactHeld && this.game.input.enabled;
    const canPlant = !!site && hasInput;
    if (canPlant) {
      if (!this.playerPlanting) {
        this.playerPlanting = true;
        this.plantSite = site;
        this.plantStart = player.position.clone();
        this.game.hud.notify(`PLANTANDO NO SITE ${site.id}`, '#ff633f');
      }
      if (player.position.distanceTo(this.plantStart) > 1.2) {
        this.plantProgress = 0;
        this.plantStart = player.position.clone();
      }
      this.plantProgress += dt;
      this.game.hud.setPrompt({
        text: `PLANTANDO BOMBA · SITE ${site.id}`,
        sub: 'MANTENHA A POSIÇÃO',
        progress: this.plantProgress / PLANT_TIME,
        color: '#ff633f',
        key: 'E'
      });
      if (Math.random() < dt * 3) this.game.audio.sfx('beep');
      if (this.plantProgress >= PLANT_TIME) {
        this.plant(player, site);
      }
    } else {
      if (this.playerPlanting) {
        this.game.hud.setPrompt(null);
        this.playerPlanting = false;
      }
      if (this.plantProgress > 0) this.plantProgress = Math.max(0, this.plantProgress - dt * 1.8);
      if (site && this.plantProgress <= 0) {
        this.game.hud.setPrompt({
          text: `SEGURE E PARA PLANTAR · SITE ${site.id}`,
          sub: 'A BOMBA ESTÁ PRONTA',
          progress: null,
          color: '#ff633f',
          key: 'E'
        });
      }
    }
  }

  updatePlayerDefuse(dt) {
    const player = this.game.player;
    if (!player?.isAlive || player.team !== 'defenders' || !this.position || !this.game.roundManager.canDefuse()) {
      this.playerDefusing = false;
      this.defuseProgress = Math.max(0, this.defuseProgress - dt * 1.8);
      return;
    }
    const near = player.position.distanceTo(this.position) < 2.3;
    const hasInput = this.game.input.interactHeld && this.game.input.enabled;
    if (near && hasInput) {
      if (!this.playerDefusing) {
        this.playerDefusing = true;
        this.game.hud.notify('DESARMANDO BOMBA', '#4adfff');
      }
      this.defuseProgress += dt;
      this.game.hud.setPrompt({
        text: 'DESARMANDO BOMBA',
        sub: 'MANTENHA A POSIÇÃO',
        progress: this.defuseProgress / DEFUSE_TIME,
        color: '#4adfff',
        key: 'E'
      });
      this.game.audio.sfx('defuse');
      if (this.defuseProgress >= DEFUSE_TIME) this.defuse(player);
    } else {
      if (this.playerDefusing) {
        this.playerDefusing = false;
        this.game.hud.setPrompt(null);
      }
      if (this.defuseProgress > 0) this.defuseProgress = Math.max(0, this.defuseProgress - dt * 1.8);
      if (near && this.defuseProgress <= 0) {
        this.game.hud.setPrompt({
          text: 'SEGURE E PARA DESARMAR',
          sub: `SITE ${this.plantSite?.id || ''} · ${Math.ceil(this.timer)}s`,
          progress: null,
          color: '#4adfff',
          key: 'E'
        });
      }
    }
  }

  botInteract(bot, dt) {
    if (!bot.isAlive) {
      if (this.botPlanter === bot) { this.botPlanter = null; this.botPlantProgress = 0; }
      if (this.botDefuser === bot) { this.botDefuser = null; this.botDefuseProgress = 0; }
      return;
    }
    if (this.state === BOMB_STATE.NOT_PLANTED && bot.team === 'attackers' && this.game.roundManager.canPlant()) {
      const site = this.getSiteAt(bot.position);
      if (site) {
        const inCombat = bot.target && bot.target.isAlive && bot.game.elapsed - bot.lastSeen < 1;
        if (!inCombat && (!this.botPlanter || !this.botPlanter.isAlive)) {
          this.botPlanter = bot;
          this.plantSite = site;
        }
        if (this.botPlanter === bot) {
          if (inCombat || bot.position.distanceTo(site.center) > site.radius) {
            this.botPlanter = null;
            this.botPlantProgress = 0;
            return;
          }
          this.botPlantProgress += dt;
          this.plantProgress = this.botPlantProgress;
          if (this.botPlantProgress > 0.6 && this.game.elapsed - (this.lastBotNotify || 0) > 2) {
            this.lastBotNotify = this.game.elapsed;
            this.game.hud.notify(`${bot.name} ESTÁ PLANTANDO · SITE ${site.id}`, '#ff633f');
          }
          if (this.botPlantProgress >= PLANT_TIME) {
            this.plant(bot, site);
          }
        }
      } else if (this.botPlanter === bot) {
        this.botPlanter = null;
        this.botPlantProgress = 0;
      }
    }
    if (this.state === BOMB_STATE.PLANTED && bot.team === 'defenders' && this.game.roundManager.canDefuse()) {
      const near = this.position && bot.position.distanceTo(this.position) < 2.2;
      if (near) {
        if (!this.botDefuser || !this.botDefuser.isAlive) this.botDefuser = bot;
        if (this.botDefuser === bot) {
          this.botDefuseProgress += dt;
          this.game.audio.sfx('defuse');
          this.game.hud.setBombStatus({ state: 'Defusing', timer: this.timer, site: this.plantSite?.id, defuse: this.botDefuseProgress / DEFUSE_TIME, defuser: bot.name });
          if (this.botDefuseProgress >= DEFUSE_TIME) this.defuse(bot);
        }
      } else if (this.botDefuser === bot) {
        this.botDefuser = null;
        this.botDefuseProgress = Math.max(0, this.botDefuseProgress - dt * 1.8);
      }
    }
  }

  onRoundReset() {
    this.reset();
  }
}
