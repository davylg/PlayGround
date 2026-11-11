import * as THREE from 'three';
import { ROUND_STATE } from './RoundManager.js';

const $ = (id) => document.getElementById(id);

function fmtTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export class HUDController {
  constructor(game) {
    this.game = game;
    this.el = {};
    this.minimapBg = null;
    this.minimapTimer = 0;
    this.notifyTimers = [];
    this.cache();
    this.setupMinimap();
    this.bind();
  }

  cache() {
    [
      'score-atk', 'score-def', 'alive-atk', 'alive-def', 'round-label', 'round-timer', 'match-score',
      'killfeed', 'bomb-status', 'bomb-label', 'bomb-time', 'bomb-site', 'bomb-defuse-fill',
      'crosshair', 'hitmarker', 'hitmarker-head', 'objective-prompt', 'prompt-key', 'prompt-text', 'prompt-sub',
      'prompt-fill', 'health-fill', 'health-value', 'armor-fill', 'armor-value', 'agent-badge',
      'hud-agent-name', 'hud-agent-role', 'ability-active', 'ability-special', 'active-icon', 'active-name',
      'active-cd', 'active-mask', 'special-icon', 'special-name', 'special-cd', 'special-mask',
      'weapon-class-hud', 'weapon-name-hud', 'ammo-current', 'ammo-reserve', 'reload-track', 'reload-fill',
      'slot-primary', 'slot-secondary', 'round-banner', 'banner-kicker', 'banner-title', 'banner-sub', 'banner-line',
      'countdown', 'round-alert', 'alert-kicker', 'alert-text', 'alert-sub', 'notify-stack', 'damage-overlay',
      'damage-indicator', 'kill-popup', 'death-screen', 'death-killer', 'spectate-name', 'round-result',
      'result-kicker', 'result-title', 'result-reason', 'result-score-atk', 'result-score-def', 'result-next-time',
      'match-result', 'match-kicker', 'match-title', 'match-sub', 'match-atk', 'match-def', 'scoreboard',
      'pause-menu', 'pointer-hint', 'minimap', 'minimap-wrap', 'mob-active-icon', 'mob-active-cd',
      'mob-special-icon', 'mob-special-cd'
    ].forEach((id) => { this.el[id] = $(id); });
    this.el.ammoRow = document.querySelector('.ammo-row');
    this.el.healthBar = document.querySelector('.vital-bar.health');
    this.el.armorBar = document.querySelector('.vital-bar.armor');
  }

  bind() {
    this.el['slot-primary']?.addEventListener('click', () => this.game.player?.weapon.switchSlot('primary'));
    this.el['slot-secondary']?.addEventListener('click', () => this.game.player?.weapon.switchSlot('secondary'));
    $('rematch-button')?.addEventListener('click', () => this.game.onRematch?.());
    $('menu-button')?.addEventListener('click', () => this.game.onExitToMenu?.());
    $('resume-button')?.addEventListener('click', () => this.game.togglePause(false));
    $('abandon-button')?.addEventListener('click', () => this.game.onExitToMenu?.());
    $('pause-settings')?.addEventListener('click', () => this.game.openSettings?.());
  }

  setPlayer(player) {
    this.player = player;
    this.el['agent-badge'].textContent = player.data.shortName.slice(0, 1);
    this.el['hud-agent-name'].textContent = player.data.shortName;
    this.el['hud-agent-role'].textContent = player.data.role.toUpperCase();
    this.el['active-icon'].textContent = player.data.active.icon;
    this.el['special-icon'].textContent = player.data.special.icon;
    this.el['active-name'].textContent = player.data.active.name.toUpperCase();
    this.el['special-name'].textContent = player.data.special.name.toUpperCase();
    this.el['mob-active-icon'].textContent = player.data.active.icon;
    this.el['mob-special-icon'].textContent = player.data.special.icon;
    this.el['active-cd'].textContent = 'PRONTA';
    this.el['special-cd'].textContent = 'PRONTA';
    const roleColors = {
      assault: '#ff6b4a', defense: '#48d7ff', support: '#55f0b0', recon: '#ffd75e', control: '#c88bff'
    };
    this.roleColor = roleColors[player.data.role] || '#ff6b4a';
    this.el['agent-badge'].style.borderColor = this.roleColor;
    this.el['agent-badge'].style.color = this.roleColor;
  }

  setupMinimap() {
    const canvas = this.el.minimap;
    if (!canvas) return;
    this.mm = canvas.getContext('2d');
    this.mmSize = { w: canvas.width, h: canvas.height };
  }

  buildMinimapBackground() {
    const world = this.game.world;
    if (!world) return;
    const canvas = document.createElement('canvas');
    canvas.width = 380;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    const pad = 18;
    const w = 380 - pad * 2;
    const h = 380 - pad * 2;
    const scale = Math.min(w / (world.bounds.maxX - world.bounds.minX), h / (world.bounds.maxZ - world.bounds.minZ));
    const ox = pad + (w - (world.bounds.maxX - world.bounds.minX) * scale) / 2;
    const oy = pad + (h - (world.bounds.maxZ - world.bounds.minZ) * scale) / 2;
    this.mmTransform = { scale, ox, oy };
    ctx.fillStyle = 'rgba(5,10,15,0.42)';
    ctx.fillRect(0, 0, 380, 380);
    // Grid.
    ctx.strokeStyle = 'rgba(120,150,170,0.08)';
    ctx.lineWidth = 1;
    for (let x = -30; x <= 30; x += 10) {
      const px = ox + (x - world.bounds.minX) * scale;
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + (world.bounds.maxZ - world.bounds.minZ) * scale); ctx.stroke();
    }
    for (let z = -30; z <= 30; z += 10) {
      const pz = oy + (z - world.bounds.minZ) * scale;
      ctx.beginPath(); ctx.moveTo(ox, pz); ctx.lineTo(ox + (world.bounds.maxX - world.bounds.minX) * scale, pz); ctx.stroke();
    }
    // Blockers.
    for (const b of world.blockers) {
      if (b.kind === 'barrier') continue;
      const x = ox + (b.minX - world.bounds.minX) * scale;
      const z = oy + (b.minZ - world.bounds.minZ) * scale;
      const bw = Math.max(1.2, (b.maxX - b.minX) * scale);
      const bh = Math.max(1.2, (b.maxZ - b.minZ) * scale);
      ctx.fillStyle = b.kind === 'cover' ? 'rgba(150,173,186,0.24)' : 'rgba(115,138,153,0.33)';
      ctx.fillRect(x, z, bw, bh);
      ctx.strokeStyle = 'rgba(182,205,220,0.16)';
      ctx.strokeRect(x + 0.5, z + 0.5, bw - 1, bh - 1);
    }
    // Sites.
    for (const site of Object.values(world.sites)) {
      const sx = ox + (site.center.x - world.bounds.minX) * scale;
      const sz = oy + (site.center.z - world.bounds.minZ) * scale;
      const sr = site.radius * scale;
      ctx.beginPath();
      ctx.arc(sx, sz, sr, 0, Math.PI * 2);
      ctx.fillStyle = site.id === 'A' ? 'rgba(255,99,63,0.13)' : 'rgba(74,223,255,0.12)';
      ctx.fill();
      ctx.strokeStyle = site.id === 'A' ? 'rgba(255,99,63,0.65)' : 'rgba(74,223,255,0.65)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.font = '700 19px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = site.id === 'A' ? 'rgba(255,99,63,0.9)' : 'rgba(74,223,255,0.9)';
      ctx.fillText(site.id, sx, sz);
    }
    ctx.strokeStyle = 'rgba(180,205,220,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(ox, oy, (world.bounds.maxX - world.bounds.minX) * scale, (world.bounds.maxZ - world.bounds.minZ) * scale);
    this.minimapBg = canvas;
  }

  worldToMap(x, z) {
    const { scale, ox, oy } = this.mmTransform;
    return [ox + (x - this.game.world.bounds.minX) * scale, oy + (z - this.game.world.bounds.minZ) * scale];
  }

  updateMinimap() {
    if (!this.minimapBg) this.buildMinimapBackground();
    if (!this.minimapBg) return;
    const ctx = this.mm;
    ctx.clearRect(0, 0, 380, 380);
    ctx.drawImage(this.minimapBg, 0, 0);
    const player = this.game.player;
    if (!player) return;
    const [px, pz] = this.worldToMap(player.position.x, player.position.z);
    const s = this.mmTransform.scale;
    const eye = player.getEyePosition();
    for (const combatant of this.game.getCombatants()) {
      if (!combatant.isAlive || combatant === player) continue;
      const ally = combatant.team === player.team;
      const revealed = combatant.revealUntil > this.game.elapsed;
      let visible = ally;
      if (!ally) {
        const dist = combatant.position.distanceTo(player.position);
        visible = revealed || (dist < 42 && this.game.world.hasLineOfSight(eye, combatant.getChestPosition()));
      }
      if (!visible) continue;
      const [x, z] = this.worldToMap(combatant.position.x, combatant.position.z);
      ctx.beginPath();
      ctx.arc(x, z, ally ? 3.2 : 3.6, 0, Math.PI * 2);
      ctx.fillStyle = ally ? '#4adfff' : '#ff5d4a';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.shadowBlur = 0;
      if (!ally && revealed) {
        ctx.strokeStyle = '#ffd75e';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(x, z, 6.5, 0, Math.PI * 2); ctx.stroke();
      }
    }
    // Player arrow.
    ctx.save();
    ctx.translate(px, pz);
    ctx.rotate(-player.yaw + Math.PI);
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 2);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fillStyle = '#f4efe7';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
    // Bomb.
    const bomb = this.game.bombController;
    if ((bomb.state === 'Planted' || bomb.state === 'Defusing') && bomb.position) {
      const [bx, bz] = this.worldToMap(bomb.position.x, bomb.position.z);
      const pulse = 3.5 + Math.sin(this.game.elapsed * 8) * 1.5;
      ctx.beginPath(); ctx.arc(bx, bz, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3b2f'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,59,47,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(bx, bz, pulse + 4, 0, Math.PI * 2); ctx.stroke();
    }
    // Clamp markers to bounds? Not necessary.
  }

  setHealth(player) {
    const hp = Math.max(0, Math.round(player.health));
    const armor = Math.max(0, Math.round(player.armor || 0));
    this.el['health-value'].textContent = hp;
    this.el['health-fill'].style.width = `${hp}%`;
    this.el['health-fill'].style.background = hp < 30 ? '#ff4f5e' : hp < 60 ? '#ffb24a' : '#55f0b0';
    this.el['armor-value'].textContent = armor;
    this.el['armor-fill'].style.width = `${armor}%`;
  }

  setWeapon(wc) {
    if (!wc) return;
    const weapon = wc.weapon;
    this.el['weapon-class-hud'].textContent = weapon.class;
    this.el['weapon-name-hud'].textContent = weapon.name;
    this.el['ammo-current'].textContent = wc.ammoState.current;
    this.el['ammo-reserve'].textContent = String(wc.ammoState.reserve).padStart(3, '0');
    this.el.ammoRow.classList.toggle('low', wc.ammoState.current <= Math.ceil(weapon.magazine * 0.2));
    this.el['slot-primary'].classList.toggle('active', wc.slot === 'primary');
    this.el['slot-secondary'].classList.toggle('active', wc.slot === 'secondary');
  }

  setReloading(active) {
    this.el['reload-track'].classList.toggle('active', active);
    if (!active) this.el['reload-fill'].style.width = '0%';
  }

  update(dt) {
    const player = this.game.player;
    if (!player) return;
    const wc = player.weapon;
    this.el['ammo-current'].textContent = wc.ammoState.current;
    this.el['ammo-reserve'].textContent = String(wc.ammoState.reserve).padStart(3, '0');
    this.el.ammoRow.classList.toggle('low', wc.ammoState.current <= Math.ceil(wc.weapon.magazine * 0.2));
    if (wc.reloading) {
      const total = wc.weapon.reload * (player.reloadMultiplier || 1);
      this.el['reload-fill'].style.width = `${Math.min(100, (1 - wc.reloadTimer / total) * 100)}%`;
    }
    this.updateAbilities();
    this.updateRound(this.game.roundManager);
    this.updateBombStatus();
    this.minimapTimer -= dt;
    if (this.minimapTimer <= 0) {
      this.minimapTimer = 0.1;
      this.updateMinimap();
    }
    if (this.game.roundManager.state === ROUND_STATE.ENDING) {
      this.el['result-next-time'].textContent = Math.max(1, Math.ceil(this.game.roundManager.phaseTimer));
    }
    if (this.game.player.isAlive && this.game.roundManager.isRoundActive) {
      this.el['death-screen'].classList.remove('visible');
    }
  }

  updateAbilities() {
    const player = this.game.player;
    const ab = player.abilities;
    const activePct = ab.activeCooldown / ab.maxActive;
    const specialPct = ab.specialCooldown / ab.maxSpecial;
    this.el['active-mask'].style.transform = `scaleY(${activePct})`;
    this.el['special-mask'].style.transform = `scaleY(${specialPct})`;
    this.el['active-cd'].textContent = ab.activeCooldown > 0 ? `${ab.activeCooldown.toFixed(1)}s` : 'PRONTA';
    this.el['special-cd'].textContent = ab.specialCooldown > 0 ? `${ab.specialCooldown.toFixed(1)}s` : 'PRONTA';
    this.el['active-cd'].style.color = ab.activeCooldown > 0 ? '#7f8d98' : '#55f0b0';
    this.el['special-cd'].style.color = ab.specialCooldown > 0 ? '#7f8d98' : '#55f0b0';
    this.el['mob-active-cd'].textContent = ab.activeCooldown > 0 ? Math.ceil(ab.activeCooldown) : '';
    this.el['mob-special-cd'].textContent = ab.specialCooldown > 0 ? Math.ceil(ab.specialCooldown) : '';
    this.el['mob-active-icon'].style.opacity = ab.activeCooldown > 0 ? 0.4 : 1;
    this.el['mob-special-icon'].style.opacity = ab.specialCooldown > 0 ? 0.4 : 1;
  }

  updateRound(round) {
    if (!round) return;
    const tm = this.game.teamManager;
    this.el['score-atk'].textContent = tm.attackersScore;
    this.el['score-def'].textContent = tm.defendersScore;
    this.el['alive-atk'].textContent = tm.attackersAlive;
    this.el['alive-def'].textContent = tm.defendersAlive;
    this.el['round-label'].textContent = `ROUND ${round.roundNumber} · ${tm.attackersScore}—${tm.defendersScore}`;
    let timer = round.roundTime;
    let label = 'ROUND';
    if (round.state === ROUND_STATE.BOMB_PLANTED) {
      timer = this.game.bombController.timer;
      label = 'BOMBA';
    }
    this.el['round-timer'].textContent = fmtTime(timer);
    this.el['round-timer'].classList.toggle('low', timer < 15 || round.state === ROUND_STATE.BOMB_PLANTED);
    this.el['match-score'].textContent = `${label} · PRIMEIRO A ${round.winTarget}`;
    this.el['hud-agent-name'].textContent = this.game.player?.data.shortName || '';
    this.el['hud-agent-role'].textContent = (this.game.player?.data.role || '').toUpperCase();
  }

  updateBombStatus() {
    const bomb = this.game.bombController;
    if (!bomb) return;
    if (bomb.state === 'Planted' && bomb.timer > 0) {
      this.el['bomb-label'].textContent = 'BOMBA PLANTADA';
      this.el['bomb-time'].textContent = bomb.timer.toFixed(1);
      this.el['bomb-site'].textContent = `SITE ${bomb.plantSite?.id || ''}`;
      this.el['bomb-defuse-fill'].style.width = `${Math.min(100, (bomb.defuseProgress / 5.2) * 100)}%`;
      this.el['bomb-status'].classList.add('visible');
      this.el['bomb-status'].classList.toggle('defusing', bomb.defuseProgress > 0);
    } else if (bomb.state === 'Defusing') {
      this.el['bomb-status'].classList.add('visible', 'defusing');
    } else if (bomb.state === 'Defused' || bomb.state === 'Exploded') {
      this.el['bomb-label'].textContent = bomb.state === 'Defused' ? 'BOMBA DESARMADA' : 'BOMBA DETONADA';
      this.el['bomb-time'].textContent = '—';
      this.el['bomb-site'].textContent = '';
      this.el['bomb-status'].classList.add('visible');
      this.el['bomb-status'].classList.remove('defusing');
    } else {
      this.el['bomb-status'].classList.remove('visible', 'defusing');
    }
  }

  setBombStatus(data) {
    if (!data) {
      this.el['bomb-status'].classList.remove('visible', 'defusing');
      return;
    }
    this.el['bomb-status'].classList.add('visible');
    this.el['bomb-label'].textContent = data.state === 'Defusing' ? 'DESARMANDO BOMBA' : data.state === 'Defused' ? 'BOMBA DESARMADA' : 'BOMBA PLANTADA';
    this.el['bomb-time'].textContent = data.time !== undefined ? data.time.toFixed(1) : (data.timer || 0).toFixed(1);
    this.el['bomb-site'].textContent = data.site ? `SITE ${data.site}` : '';
    this.el['bomb-status'].classList.toggle('defusing', data.state === 'Defusing');
  }

  setPrompt(data) {
    const el = this.el['objective-prompt'];
    if (!data) {
      el.classList.remove('visible', 'has-progress');
      return;
    }
    el.classList.add('visible');
    el.classList.toggle('has-progress', data.progress !== null && data.progress !== undefined);
    this.el['prompt-key'].textContent = data.key || 'E';
    this.el['prompt-text'].textContent = data.text || '';
    this.el['prompt-sub'].textContent = data.sub || '';
    if (data.progress !== null && data.progress !== undefined) {
      this.el['prompt-fill'].style.width = `${Math.min(100, data.progress * 100)}%`;
      this.el['prompt-fill'].style.background = data.color || '#ff633f';
    }
  }

  notify(text, color = '#ff633f', duration = 2.4) {
    if (!text) return;
    const node = document.createElement('div');
    node.className = 'notify';
    node.textContent = text;
    node.style.borderLeftColor = color;
    node.style.color = color;
    this.el['notify-stack'].appendChild(node);
    while (this.el['notify-stack'].children.length > 4) this.el['notify-stack'].firstChild.remove();
    setTimeout(() => node.remove(), duration * 1000);
  }

  showAlert(title, sub, color = '#ff633f') {
    this.el['alert-kicker'].textContent = 'ALERTA TÁTICO';
    this.el['alert-text'].textContent = title;
    this.el['alert-sub'].textContent = sub || '';
    this.el['round-alert'].style.borderColor = color;
    this.el['round-alert'].style.borderTopColor = color;
    this.el['round-alert'].style.borderBottomColor = color;
    this.el['round-alert'].classList.add('visible');
    clearTimeout(this.alertTimer);
    this.alertTimer = setTimeout(() => this.el['round-alert'].classList.remove('visible'), 2800);
  }

  showRoundBanner({ kicker, title, sub, color = '#ffffff' }) {
    if (!title) {
      this.hideRoundBanner();
      return;
    }
    this.el['banner-kicker'].textContent = kicker || '';
    this.el['banner-title'].textContent = title;
    this.el['banner-sub'].textContent = sub || '';
    this.el['banner-line'].style.background = color;
    this.el['round-banner'].classList.add('visible');
  }

  hideRoundBanner() {
    this.el['round-banner'].classList.remove('visible');
  }

  setCountdown(value) {
    if (value === null || value === undefined) {
      this.el.countdown.classList.remove('visible');
      return;
    }
    this.el.countdown.textContent = value > 0 ? value : 'VAI';
    this.el.countdown.classList.add('visible');
  }

  showRoundResult({ winner, label, reason, scores, color, isPlayerWin, round }) {
    this.el['result-kicker'].textContent = `ROUND ${round} · ${isPlayerWin ? 'VITÓRIA DO SEU TIME' : 'DERROTA DO SEU TIME'}`;
    this.el['result-title'].textContent = `${label} VENCE`;
    this.el['result-title'].style.color = color;
    this.el['result-reason'].textContent = reason;
    this.el['result-score-atk'].textContent = scores[0];
    this.el['result-score-def'].textContent = scores[1];
    this.el['result-next-time'].textContent = '5';
    this.el['round-result'].classList.add('visible');
    this.el['death-screen'].classList.remove('visible');
    this.el['objective-prompt'].classList.remove('visible');
    this.el['round-banner'].classList.remove('visible');
    this.el['pointer-hint'].classList.remove('visible');
  }

  hideRoundResult() {
    this.el['round-result'].classList.remove('visible');
  }

  showMatchResult(data) {
    this.el['round-result'].classList.remove('visible');
    this.el['match-kicker'].textContent = 'PARTIDA FINALIZADA · DOCA ZERO';
    this.el['match-title'].textContent = data.isPlayerWin ? 'VITÓRIA' : 'DERROTA';
    this.el['match-title'].style.color = data.isPlayerWin ? '#55f0b0' : '#ff633f';
    this.el['match-sub'].textContent = data.isPlayerWin ? 'SUA EQUIPE DOMINOU A ARENA' : 'A DEFESA DO INIMIGO RESISTIU';
    this.el['match-atk'].textContent = data.scores[0];
    this.el['match-def'].textContent = data.scores[1];
    const rows = data.scoreboard.map((p) => `
      <div class="scoreboard-row ${p.team === 'defenders' ? 'defender' : ''}">
        <div class="sb-name"><i></i><strong>${p.name}</strong><span>${p.character.role.toUpperCase()}</span>${p.isPlayer ? '<em class="you">VOCÊ</em>' : ''}</div>
        <div>${p.kills}</div>
        <div>${p.deaths}</div>
      </div>`).join('');
    this.el.scoreboard.innerHTML = `<div class="scoreboard-row head"><div>AGENTE</div><div>ABATES</div><div>MORTES</div></div>${rows}`;
    this.el['match-result'].classList.add('visible');
    this.el['death-screen'].classList.remove('visible');
    this.el['pointer-hint'].classList.remove('visible');
    this.el['objective-prompt'].classList.remove('visible');
  }

  hideMatchResult() {
    this.el['match-result'].classList.remove('visible');
  }

  showDeath(attacker, victim) {
    this.el['death-killer'].textContent = attacker ? `ELIMINADA POR ${attacker.name}` : 'VOCÊ FOI ELIMINADA';
    this.el['spectate-name'].textContent = 'AGUARDANDO PRÓXIMO ROUND';
    this.el['death-screen'].classList.add('visible');
    this.el['crosshair'].style.opacity = '0';
    this.el['pointer-hint'].classList.remove('visible');
  }

  hideDeath() {
    this.el['death-screen'].classList.remove('visible');
    this.el['crosshair'].style.opacity = '1';
  }

  setSpectator(name) {
    this.el['spectate-name'].textContent = `ESPECTANDO ${name}`;
  }

  hitmarker(headshot = false) {
    const marker = this.el.hitmarker;
    marker.classList.remove('show');
    void marker.offsetWidth;
    marker.classList.add('show');
    if (headshot) {
      const h = this.el['hitmarker-head'];
      h.classList.remove('show');
      void h.offsetWidth;
      h.classList.add('show');
    }
  }

  kickCrosshair() {
    this.el.crosshair.classList.add('kick');
    clearTimeout(this.crosshairTimer);
    this.crosshairTimer = setTimeout(() => this.el.crosshair.classList.remove('kick'), 90);
  }

  damageDirection(position) {
    if (!position || !this.game.player) return;
    const player = this.game.player;
    const dx = position.x - player.position.x;
    const dz = position.z - player.position.z;
    const angle = Math.atan2(dx, dz) + player.yaw;
    const deg = (angle * 180) / Math.PI;
    const el = this.el['damage-indicator'];
    el.style.setProperty('--dmg-angle', `${deg}deg`);
    el.style.setProperty('--dmg-opacity', '1');
    this.el['damage-overlay'].classList.add('hit');
    clearTimeout(this.damageTimer);
    this.damageTimer = setTimeout(() => {
      el.style.setProperty('--dmg-opacity', '0');
      this.el['damage-overlay'].classList.remove('hit');
    }, 280);
  }

  addKillfeed(killer, victim, color = '#ff633f', headshot = false) {
    const entry = document.createElement('div');
    entry.className = `kill-entry ${color === '#4adfff' ? 'defender' : ''}`;
    entry.innerHTML = `<span class="killer">${killer}</span><span class="weapon">⌁</span><span class="victim">${victim}</span>${headshot ? '<span class="hs">HS</span>' : ''}`;
    entry.style.borderRightColor = color;
    this.el.killfeed.appendChild(entry);
    while (this.el.killfeed.children.length > 5) this.el.killfeed.firstChild.remove();
    setTimeout(() => entry.remove(), 6000);
  }

  showKill(victimName, headshot = false) {
    const popup = this.el['kill-popup'];
    popup.innerHTML = `<strong>${headshot ? 'HEADSHOT' : 'ELIMINADA'}</strong><span>${victimName}</span>`;
    popup.classList.remove('show');
    void popup.offsetWidth;
    popup.classList.add('show');
  }

  abilityUsed(controller, special) {
    const card = special ? this.el['ability-special'] : this.el['ability-active'];
    card.animate?.([
      { boxShadow: `inset 0 0 0 1px ${special ? '#ffb24a' : '#ff633f'}`, transform: 'scale(1.03)' },
      { boxShadow: 'inset 0 0 0 0 transparent', transform: 'scale(1)' }
    ], { duration: 320, easing: 'ease-out' });
  }

  flashHeal() {
    this.el['health-fill'].animate?.([
      { filter: 'brightness(2.2)' },
      { filter: 'brightness(1)' }
    ], { duration: 300 });
  }

  flashExplosion() {
    const overlay = this.el['damage-overlay'];
    overlay.style.background = 'rgba(255,170,80,0.75)';
    overlay.classList.add('hit');
    setTimeout(() => {
      overlay.style.background = '';
      overlay.classList.remove('hit');
    }, 350);
  }

  togglePause(visible) {
    this.el['pause-menu'].classList.toggle('visible', visible);
    if (visible) {
      this.el['pointer-hint'].classList.remove('visible');
      if (document.pointerLockElement) document.exitPointerLock?.();
    }
  }

  showPointerHint(visible) {
    this.el['pointer-hint'].classList.toggle('visible', visible);
  }

  resetForRound() {
    this.el['round-result'].classList.remove('visible');
    this.el['death-screen'].classList.remove('visible');
    this.el['crosshair'].style.opacity = '1';
    this.el['prompt-bar']?.classList.remove('visible');
    this.el['objective-prompt'].classList.remove('visible');
    this.el['bomb-status'].classList.remove('visible');
    this.el['pointer-hint'].classList.remove('visible');
  }
}
