import * as THREE from 'three';
import { characters, getCharacter, roleInfo, characterInitials } from '../data/characters.js';
import { SettingsManager } from './settingsManager.js';
import { AudioManager } from './audioManager.js';
import { TeamManager } from './teamManager.js';
import { MapBuilder } from '../world/mapBuilder.js';
import { RoundManager, RoundState } from './roundManager.js';
import { BombController, BombState } from '../objectives/bombController.js';
import { HUDController } from '../ui/hudController.js';
import { MenuController } from '../ui/menuController.js';
import { PlayerController } from '../player/playerController.js';
import { BotController } from '../bots/botController.js';
import { AbilityController } from '../abilities/abilityController.js';
import { MobileInputController } from '../input/mobileInputController.js';
import { MobileInteractionController } from '../input/mobileInteractionController.js';
import { createCharacterMesh } from '../three/characterMesh.js';

export class GameManager {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.settings = new SettingsManager();
    this.audio = new AudioManager(this.settings);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: this.settings.get('quality') !== 'low', powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.settings.get('quality') === 'high' ? 2 : 1.4));
    this.renderer.shadowMap.enabled = this.settings.get('shadows');
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.settings.get('fov'), window.innerWidth / window.innerHeight, 0.1, 220);
    this.clock = new THREE.Clock();
    this.teamManager = new TeamManager();
    this.hud = new HUDController();
    this.menu = new MenuController({
      settings: this.settings,
      audio: this.audio,
      onCharacterChanged: (character, skinIndex) => this.setCharacterPreview(character, skinIndex),
      onSkinChanged: (character, skinIndex) => this.setCharacterPreview(character, skinIndex),
      onStartMatch: config => this.startMatch(config),
    });
    this.mobileInput = new MobileInputController({ settings: this.settings, audio: this.audio });
    this.interaction = new MobileInteractionController({ hud: this.hud, mobileInput: this.mobileInput });
    this.mode = 'menu';
    this.previewMesh = null;
    this.previewGroup = null;
    this.map = null;
    this.entities = [];
    this.player = null;
    this.round = null;
    this.bomb = null;
    this.tracers = [];
    this.impacts = [];
    this.input = { moveX: 0, moveZ: 0, lookX: 0, lookY: 0, jump: false, sprint: false, shoot: false, reload: false, ability: false, special: false, interact: false };
    this.keys = new Set();
    this.mouseDown = false;
    this.previewTargetYaw = 0;
    this.previewYaw = 0;
    this.previewDistance = 4.6;
    this.previewPitch = 0.15;
    this.stats = { kills: 0, damage: 0, rounds: 0 };
    this.pointerLocked = false;
    this.paused = false;
    this.init();
  }

  init() {
    this.setupResize();
    this.setupInput();
    this.setupMenuShowroom();
    this.setupOverlays();
    this.animate();
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('done');
      this.menu.showScreen('main');
    }, 450);
    window.addEventListener('pointerdown', () => this.audio.resume(), { once: true });
    window.addEventListener('keydown', () => this.audio.resume(), { once: true });
  }

  setupResize() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  setupInput() {
    window.addEventListener('keydown', event => {
      this.keys.add(event.code);
      if (event.code === 'Escape' && this.mode === 'match') this.togglePause(true);
      if (['Space', 'KeyQ', 'KeyF', 'KeyE', 'KeyR', 'Digit1', 'Digit2'].includes(event.code)) event.preventDefault();
    });
    window.addEventListener('keyup', event => this.keys.delete(event.code));
    this.canvas.addEventListener('mousedown', event => {
      if (this.mode !== 'match') return;
      this.mouseDown = true;
      if (!this.pointerLocked && !this.paused && event.button === 0) this.requestPointerLock();
    });
    window.addEventListener('mouseup', () => { this.mouseDown = false; });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
      if (!this.pointerLocked && this.mode === 'match' && !this.paused) this.togglePause(true);
    });
    document.addEventListener('mousemove', event => {
      if (!this.pointerLocked || this.mode !== 'match' || this.paused) return;
      const sensitivity = this.settings.get('sensitivity');
      const invert = this.settings.get('invertY') ? -1 : 1;
      this.player.yaw -= event.movementX * 0.0022 * sensitivity;
      this.player.pitch -= event.movementY * 0.0022 * sensitivity * invert;
      this.player.pitch = THREE.MathUtils.clamp(this.player.pitch, -Math.PI / 2.05, Math.PI / 2.05);
    });
    this.canvas.addEventListener('pointerdown', event => {
      if (this.mode !== 'menu') return;
      this.previewDrag = { x: event.clientX, y: event.clientY, active: true };
      this.canvas.setPointerCapture(event.pointerId);
    });
    this.canvas.addEventListener('pointermove', event => {
      if (this.mode !== 'menu' || !this.previewDrag?.active) return;
      const dx = event.clientX - this.previewDrag.x;
      const dy = event.clientY - this.previewDrag.y;
      this.previewDrag.x = event.clientX;
      this.previewDrag.y = event.clientY;
      this.previewTargetYaw += dx * 0.008;
      this.previewPitch = THREE.MathUtils.clamp(this.previewPitch + dy * 0.004, -0.35, 0.55);
    });
    this.canvas.addEventListener('pointerup', () => { this.previewDrag = null; });
    this.canvas.addEventListener('wheel', event => {
      if (this.mode !== 'menu') return;
      this.previewDistance = THREE.MathUtils.clamp(this.previewDistance + event.deltaY * 0.002, 1.6, 6);
      event.preventDefault();
    }, { passive: false });
  }

  requestPointerLock() {
    if (this.canvas.requestPointerLock) this.canvas.requestPointerLock();
  }

  setupMenuShowroom() {
    this.scene.clear();
    const showroom = new THREE.Group();
    showroom.name = 'showroom';
    const floor = new THREE.Mesh(new THREE.CircleGeometry(4, 42), new THREE.MeshLambertMaterial({ color: 0x111820 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    showroom.add(floor);
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.5, 0.16, 42), new THREE.MeshLambertMaterial({ color: 0x1e2630 }));
    platform.position.y = 0.08;
    showroom.add(platform);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.025, 8, 42), new THREE.MeshBasicMaterial({ color: 0xff5b2e }));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.16;
    showroom.add(rim);
    const keyLight = new THREE.DirectionalLight(0xffe4c6, 2.2);
    keyLight.position.set(2.5, 4.5, 3);
    keyLight.castShadow = true;
    showroom.add(keyLight);
    const rimLight = new THREE.PointLight(0x42d9ee, 1.2, 10, 2);
    rimLight.position.set(-2.6, 1.5, -1.8);
    showroom.add(rimLight);
    const backLight = new THREE.PointLight(0xff5b2e, 0.8, 10, 2);
    backLight.position.set(2.6, 1.4, -2.2);
    showroom.add(backLight);
    const ambient = new THREE.AmbientLight(0x8c96a2, 1.1);
    showroom.add(ambient);
    const fog = new THREE.Fog(0x080b12, 5, 16);
    this.scene.fog = fog;
    this.scene.background = new THREE.Color(0x070a10);
    this.scene.add(showroom);
    this.showroom = showroom;
    this.setCharacterPreview(getCharacter(this.settings.get('selectedCharacter')), this.settings.get('selectedSkin'));
  }

  setCharacterPreview(character, skinIndex = 0) {
    if (!this.showroom) return;
    if (this.previewMesh) {
      this.showroom.remove(this.previewMesh.group);
      this.previewMesh.group.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    this.previewMesh = createCharacterMesh(character, skinIndex);
    this.previewMesh.group.position.set(0, 0.16, 0);
    this.previewMesh.group.scale.setScalar(0.95);
    this.showroom.add(this.previewMesh.group);
    this.selectedCharacter = character;
    this.selectedSkinIndex = skinIndex;
  }

  setupOverlays() {
    document.getElementById('resume-btn').addEventListener('click', () => this.togglePause(false));
    document.getElementById('abandon-btn').addEventListener('click', () => this.returnToMenu());
    document.getElementById('return-menu-btn').addEventListener('click', () => this.returnToMenu());
    document.getElementById('rematch-btn').addEventListener('click', () => {
      this.hideMatchEnd();
      this.startMatch(this.lastMatchConfig);
    });
  }

  togglePause(paused) {
    this.paused = paused;
    document.getElementById('pause-overlay').classList.toggle('hidden', !paused);
    if (paused) document.exitPointerLock?.();
  }

  startMatch({ side = 'attackers', difficulty = 'veteran', roundTarget = 4 }) {
    this.lastMatchConfig = { side, difficulty, roundTarget };
    this.mode = 'match';
    this.paused = false;
    this.stats = { kills: 0, damage: 0, rounds: 0 };
    document.getElementById('menu-layer').classList.add('hidden-menu');
    this.hud.show();
    this.hud.hideMatchEnd();
    this.scene.clear();
    this.scene.fog = new THREE.Fog(0x131a24, 60, 150);
    this.scene.background = new THREE.Color(0x0d1118);
    this.map = new MapBuilder(this.scene, this.settings.get('quality'));
    this.scene.add(new THREE.AmbientLight(0xffffff, 2.4));
    this.attackSite = Math.random() < 0.5 ? 'A' : 'B';
    this.defendSite = this.attackSite === 'A' ? 'B' : 'A';
    this.buildTeams(side, difficulty);
    this.abilityController = new AbilityController(this.scene, this.audio, this.settings);
    this.player.abilityController = this.abilityController;
    this.bomb = new BombController({ scene: this.scene, map: this.map, audio: this.audio });
    this.round = new RoundManager({
      teamManager: this.teamManager,
      bomb: this.bomb,
      audio: this.audio,
      settings: this.settings,
    });
    this.round.onRoundStart = (roundNumber, state) => this.handleRoundStart(roundNumber, state);
    this.round.onRoundEnd = (winnerTeam, reason, roundNumber) => this.handleRoundEnd(winnerTeam, reason, roundNumber);
    this.round.onMatchEnd = winnerTeam => this.handleMatchEnd(winnerTeam);
    this.hud.elements.playerName.textContent = this.player.character.name;
    this.hud.elements.playerRole.textContent = roleInfo(this.player.character.role).label;
    this.round.startMatch();
    this.audio.ambience();
  }

  buildTeams(playerSide, difficulty) {
    this.teamManager.clear();
    this.entities = [];
    const usedCharacters = [...characters].sort(() => Math.random() - 0.5);
    const playerCharacter = getCharacter(this.settings.get('selectedCharacter'));
    this.player = new PlayerController({
      camera: this.camera,
      scene: this.scene,
      settings: this.settings,
      audio: this.audio,
      map: this.map,
      character: playerCharacter,
      team: playerSide,
    });
    this.player.enemiesList = [];
    this.player.alliesList = [];
    this.entities.push(this.player);
    const enemySide = playerSide === 'attackers' ? 'defenders' : 'attackers';
    const sameSideBots = [];
    const enemyBots = [];
    for (let i = 0; i < 4; i += 1) {
      const bot = this.createBot(usedCharacters[(i + 1) % usedCharacters.length], playerSide, difficulty, `ally-${i}`);
      sameSideBots.push(bot);
    }
    for (let i = 0; i < 5; i += 1) {
      const bot = this.createBot(usedCharacters[(i + 5) % usedCharacters.length], enemySide, difficulty, `enemy-${i}`);
      enemyBots.push(bot);
    }
    const attackers = playerSide === 'attackers' ? [this.player, ...sameSideBots] : enemyBots;
    const defenders = playerSide === 'defenders' ? [this.player, ...sameSideBots] : enemyBots;
    attackers.forEach((entity, index) => {
      const spawn = this.map.spawnPoints.attackers[index % this.map.spawnPoints.attackers.length];
      entity.setSpawn(spawn, Math.PI);
      this.teamManager.register(entity, 'attackers');
    });
    defenders.forEach((entity, index) => {
      const spawn = this.map.spawnPoints.defenders[index % this.map.spawnPoints.defenders.length];
      entity.setSpawn(spawn, 0);
      this.teamManager.register(entity, 'defenders');
    });
    this.entities = [...attackers, ...defenders];
    this.entities.forEach(entity => {
      entity.enemiesList = entity.team === 'attackers' ? [...defenders] : [...attackers];
      entity.alliesList = entity.team === 'attackers' ? [...attackers] : [...defenders];
    });
    const carrier = attackers.find(entity => entity.isPlayer) || attackers[0];
    carrier.bombRole = 'carrier';
    attackers.forEach(entity => { if (entity !== carrier) entity.bombRole = 'support'; });
    defenders.forEach(entity => { entity.bombRole = 'defender'; });
    this.player.weapon.switchTo('primary');
  }

  createBot(character, team, difficulty, id) {
    return new BotController({ scene: this.scene, map: this.map, audio: this.audio, character, team, difficulty, id, settings: this.settings });
  }

  handleRoundStart(roundNumber, state) {
    this.stats.rounds = roundNumber;
    this.assignSites();
    this.hud.hideRoundBanner();
    if (state === 'preparingRound') {
      this.hud.showRoundBanner(`ROUND ${roundNumber}`, 'PREPARE-SE', 'Restaurando equipamento e habilidades');
    } else {
      this.hud.showRoundBanner(`ROUND ${roundNumber}`, 'ROUND ATIVO', this.attackSite ? `OBJETIVO: SITE ${this.attackSite}` : 'ELIMINE OS ADVERSÁRIOS');
      this.audio.roundStart();
    }
    this.hud.toast(this.player.team === 'attackers' ? 'Você é ATTACKER. Plante a bomba.' : 'Você é DEFENDER. Proteja os sites.');
  }

  assignSites() {
    this.attackSite = Math.random() < 0.5 ? 'A' : 'B';
    this.defendSite = this.attackSite === 'A' ? 'B' : 'A';
    // Spread bots toward objectives.
    this.teamManager.get('attackers').forEach((entity, index) => {
      if (entity.bombRole === 'carrier') entity.patrolIndex = 0;
      else entity.patrolIndex = index;
    });
    this.teamManager.get('defenders').forEach((entity, index) => {
      // Split defenders across both sites so fights happen somewhere.
      entity.defendSite = index % 2 === 0 ? 'A' : 'B';
      entity.patrolIndex = index;
    });
  }

  handleRoundEnd(winnerTeam, reason, roundNumber) {
    this.stats.rounds = roundNumber;
    this.hud.showRoundBanner(
      `ROUND ${roundNumber}`,
      winnerTeam === 'attackers' ? 'ATTACKERS VENCERAM' : 'DEFENDERS VENCERAM',
      reason,
    );
    this.audio.victory();
    if (winnerTeam !== this.player.team) this.audio.defeat();
    this.hud.addKillEntry(winnerTeam === 'attackers' ? 'ATTACKERS' : 'DEFENDERS', reason);
    // Reset for next round after delay is handled by RoundManager.
  }

  handleMatchEnd(winnerTeam) {
    const scores = { attackers: this.teamManager.attackersScore, defenders: this.teamManager.defendersScore };
    this.hud.showMatchEnd(winnerTeam, this.player.team, scores, {
      kills: this.stats.kills,
      damage: this.stats.damage,
      rounds: this.round.roundNumber,
    });
    if (winnerTeam === this.player.team) this.audio.victory();
    else this.audio.defeat();
    document.exitPointerLock?.();
  }

  hideMatchEnd() {
    this.hud.hideMatchEnd();
  }

  returnToMenu() {
    this.mode = 'menu';
    this.paused = false;
    document.exitPointerLock?.();
    document.getElementById('menu-layer').classList.remove('hidden-menu');
    this.hud.hide();
    this.hud.hideMatchEnd();
    this.hud.hidePrompt();
    this.hud.hideRoundBanner();
    document.getElementById('pause-overlay').classList.add('hidden');
    this.setupMenuShowroom();
    this.menu.showScreen('main');
    this.audio.ambience();
  }

  collectInput() {
    const mobileRead = this.mobileInput.read();
    this.mobileInput.update();
    let input = { ...this.input };
    input.moveX = mobileRead.moveX;
    input.moveZ = mobileRead.moveZ;
    input.lookX = mobileRead.lookX;
    input.lookY = mobileRead.lookY;
    input.jump = mobileRead.jump || this.keys.has('Space');
    input.sprint = mobileRead.sprint || this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    input.shoot = mobileRead.shoot || this.mouseDown || this.keys.has('MouseLeft');
    input.reload = mobileRead.reload || this.keys.has('KeyR');
    input.ability = mobileRead.ability || this.keys.has('KeyQ');
    input.special = mobileRead.special || this.keys.has('KeyF');
    input.interact = mobileRead.interact || this.keys.has('KeyE');
    return input;
  }

  handleActionEdges(input) {
    // Reload and abilities are edge-triggered.
    if (input.reload && !this.lastInput?.reload) {
      this.player.weapon.reload();
    }
    if (input.ability && !this.lastInput?.ability) {
      if (this.player.abilityController.tryActive(this.player)) {
        this.hud.abilityFeed(`${this.player.character.active.name} ATIVADA`);
      } else this.audio.ui('error');
    }
    if (input.special && !this.lastInput?.special) {
      if (this.player.abilityController.trySpecial(this.player)) {
        this.hud.abilityFeed(`${this.player.character.special.name} ATIVADA`);
      } else this.audio.ui('error');
    }
    if ((this.keys.has('Digit1')) && !this.lastDigit1) {
      if (this.player.weapon.switchTo('primary')) this.hud.toast('ARMA PRIMÁRIA');
    }
    if ((this.keys.has('Digit2')) && !this.lastDigit2) {
      if (this.player.weapon.switchTo('secondary')) this.hud.toast('PISTOLA');
    }
    this.lastInput = { ...input };
    this.lastDigit1 = this.keys.has('Digit1');
    this.lastDigit2 = this.keys.has('Digit2');
  }

  handleShooting(dt, input) {
    if (!this.player.health.isAlive) return;
    const weapon = this.player.weapon;
    const fireRateMultiplier = this.player.abilityController?.temporaryStats.fireRateMultiplier || 1;
    weapon.fireCooldown = Math.max(0, weapon.fireCooldown - dt * fireRateMultiplier);
    const targets = [...this.map.raycastTargets(), ...this.entities.filter(entity => entity !== this.player && entity.isAlive()).map(entity => entity.mesh)];
    const callbacks = {
      onHit: result => {
        const entity = result.userData.entityId ? this.entities.find(e => e.id === result.userData.entityId) : null;
        if (entity && entity !== this.player && entity.team !== this.player.team) {
          const damage = entity.takeDamage(result.damage, this.player);
          this.stats.damage += damage;
          this.audio.hit();
          this.hud.hitmarker(entity.health.currentHealth <= 0);
          if (entity.health.currentHealth <= 0) {
            this.stats.kills += 1;
            this.hud.killBanner(entity.character.name);
            this.audio.kill();
            this.hud.addKillEntry(this.player.character.name, entity.character.name, weapon.weapon.name);
          }
          this.spawnImpact(result.point, 0xff5b2e);
        } else {
          this.audio.impact();
          this.spawnImpact(result.point, 0xdfe3e8);
        }
      },
      onMiss: () => {
        this.spawnTracer(this.camera.getWorldPosition(new THREE.Vector3()), this.camera.getWorldPosition(new THREE.Vector3()).add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(12)), false);
      },
    };
    if (input.shoot) {
      const fired = weapon.tryFire(input.shoot, targets, callbacks);
      if (fired) {
        this.audio.shot(weapon.weapon.sound, 0);
        this.spawnTracer(this.camera.getWorldPosition(new THREE.Vector3()), this.camera.getWorldPosition(new THREE.Vector3()).add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(24)), false);
        this.spawnMuzzleFlash();
      }
    }
  }

  spawnTracer(origin, target, hit = false) {
    const geometry = new THREE.BufferGeometry().setFromPoints([origin, target]);
    const material = new THREE.LineBasicMaterial({ color: hit ? 0xff5b2e : 0xe4f0ff, transparent: true, opacity: 0.55 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
    this.tracers.push({ mesh: line, timer: 0.08 });
  }

  spawnImpact(point, color = 0xdfe3e8) {
    if (!this.settings.get('particles')) return;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 4), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.impacts.push({ mesh, timer: 0.2 });
  }

  spawnMuzzleFlash() {
    if (!this.settings.get('particles')) return;
    const flash = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffd9a6, transparent: true, opacity: 0.7 }));
    const position = this.camera.getWorldPosition(new THREE.Vector3()).add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(0.4));
    flash.position.copy(position);
    this.scene.add(flash);
    this.impacts.push({ mesh: flash, timer: 0.08 });
  }

  updateEffects(dt) {
    for (let i = this.tracers.length - 1; i >= 0; i -= 1) {
      const tracer = this.tracers[i];
      tracer.timer -= dt;
      tracer.mesh.material.opacity = Math.max(0, tracer.timer / 0.08 * 0.55);
      if (tracer.timer <= 0) {
        this.scene.remove(tracer.mesh);
        tracer.mesh.geometry.dispose();
        tracer.mesh.material.dispose();
        this.tracers.splice(i, 1);
      }
    }
    for (let i = this.impacts.length - 1; i >= 0; i -= 1) {
      const impact = this.impacts[i];
      impact.timer -= dt;
      impact.mesh.material.opacity = Math.max(0, impact.timer / 0.2 * 0.7);
      impact.mesh.scale.setScalar(1 + (0.2 - impact.timer) * 3);
      if (impact.timer <= 0) {
        this.scene.remove(impact.mesh);
        impact.mesh.geometry.dispose();
        impact.mesh.material.dispose();
        this.impacts.splice(i, 1);
      }
    }
  }

  updateEntities(dt, input) {
    this.player.update(dt, input);
    this.entities.forEach(entity => {
      if (entity === this.player) return;
      entity.update(dt, this);
    });
    this.abilityController?.update(dt, this.entities, this.map);
  }

  handleBomb(dt, input) {
    if (!this.bomb) return;
    const player = this.player;
    if (player.isAlive()) {
      if (player.team === 'attackers') {
        if (bombCanPlant(this.bomb, player)) {
          if (this.bomb.state === BombState.NOT_PLANTED && input.interact) this.bomb.startPlant(player, false);
          if (this.bomb.state === BombState.PLANTING && this.bomb.plantingEntity === player) this.bomb.updatePlant(dt, input.interact);
        }
      } else if (player.team === 'defenders') {
        if (bombCanDefuse(this.bomb, player)) {
          if (this.bomb.state === BombState.PLANTED && input.interact) this.bomb.startDefuse(player, false);
          if (this.bomb.state === BombState.DEFUSING && this.bomb.defusingEntity === player) this.bomb.updateDefuse(dt, input.interact);
        }
      }
    }
    // Bot plants/defuses are driven inside their own controller, so update generic timers here.
    if (this.bomb.state === BombState.PLANTING && this.bomb.isBotAction) this.bomb.updatePlant(dt, true);
    if (this.bomb.state === BombState.DEFUSING && this.bomb.isBotAction) this.bomb.updateDefuse(dt, true);
    const exploded = this.bomb.update(dt);
    if (exploded) this.round.onBombExploded();
    if (this.bomb.state === BombState.DEFUSED) {
      this.round.onBombDefused();
    }
    if (this.bomb.state === BombState.PLANTED && this.round.state === RoundState.ACTIVE) {
      this.round.setState(RoundState.BOMB_PLANTED);
    }
  }

  updateRound(dt) {
    this.round?.update(dt);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const dt = Math.min(0.05, this.clock.getDelta());
    if (this.mode === 'menu') {
      this.updateMenu(dt);
      this.renderer.render(this.scene, this.camera);
      return;
    }
    if (this.paused) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    const input = this.collectInput();
    this.handleActionEdges(input);
    this.updateEntities(dt, input);
    this.handleShooting(dt, input);
    this.handleBomb(dt, input);
    this.updateEffects(dt);
    this.updateRound(dt);
    this.interaction.update({ player: this.player, bomb: this.bomb, round: this.round });
    this.hud.update(this, dt);
    this.map?.update(dt);
    this.renderer.render(this.scene, this.camera);
  }

  updateMenu(dt) {
    if (this.previewMesh) {
      this.previewYaw = THREE.MathUtils.lerp(this.previewYaw, this.previewTargetYaw, 1 - Math.pow(0.001, dt));
      this.previewMesh.group.rotation.y = this.previewYaw;
      this.previewMesh.animate(dt, 0, true, true);
    }
    const targetPosition = new THREE.Vector3(
      Math.sin(this.previewYaw) * this.previewDistance,
      1.35 + this.previewPitch * 2,
      Math.cos(this.previewYaw) * this.previewDistance,
    );
    this.camera.position.lerp(targetPosition, 1 - Math.pow(0.001, dt));
    this.camera.lookAt(0, 1.05, 0);
    this.camera.fov = 45;
    this.camera.updateProjectionMatrix();
  }
}

function bombCanPlant(bomb, player) {
  return bomb.state === BombState.NOT_PLANTED && bomb.canPlant(player);
}

function bombCanDefuse(bomb, player) {
  return bomb.state === BombState.PLANTED && bomb.canDefuse(player);
}
