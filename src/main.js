import { AGENTS, AGENT_BY_ID, MAPS, MAP_BY_ID, WEAPONS } from './data.js';
import { Game } from './game.js';
import { sound } from './audio.js';

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const delay = ms => new Promise(r => setTimeout(r, ms));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const SKIN = ['#6b4030', '#8d5a3c', '#c58a63', '#e1b38c', '#4b2e25', '#9e6a4a', '#d6a177', '#5b382c', '#b47a58', '#e8c2a0', '#7b4c37', '#a86f4e'];
const ROLE_COLORS = { Duelist: '#ff5a36', Controller: '#9b7bff', Initiator: '#ffc85c', Sentinel: '#48ead8' };

let portraitUid = 0;
let selectedAgent = 'nova';
let selectedMap = 'docks';
let selectedDifficulty = 'pro';
let roleFilter = 'all';
let selectedBuyCat = 'all';
let game = null;
let currentState = null;
let chatOpen = false;
let scoreboardOpen = false;
let voiceEnabled = true;
let recognition = null;
let voiceLive = false;
let toastTimers = [];
let lastChatRendered = 0;
let lastKillRendered = '';
let buyOpen = false;
let currentMode = 'solo';

const screen = id => {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
};
const show = (el, on = true) => el?.classList.toggle('show', on);
const hide = el => el?.classList.remove('show');

function portraitSVG(agent, opts = {}) {
  const idx = AGENTS.findIndex(a => a.id === agent.id);
  const uid = 'p' + (++portraitUid);
  const skin = SKIN[idx % SKIN.length];
  const hair = agent.hair;
  const c = agent.color, a = agent.accent;
  const hairStyle = idx % 4;
  const visorStyle = idx % 3;
  const crop = opts.crop || '0 0 360 460';
  return `<svg viewBox="${crop}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="${agent.name} operative portrait">
    <defs>
      <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a1118"/><stop offset=".55" stop-color="${c}" stop-opacity=".16"/><stop offset="1" stop-color="#05080b"/>
      </linearGradient>
      <radialGradient id="glow${uid}" cx=".52" cy=".36" r=".55">
        <stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset=".55" stop-color="${c}" stop-opacity=".1"/><stop offset="1" stop-color="${c}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="suit${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset=".5" stop-color="${c}" stop-opacity=".52"/><stop offset="1" stop-color="#101820"/>
      </linearGradient>
      <linearGradient id="armor${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}" stop-opacity=".75"/><stop offset=".55" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="#0d151b"/>
      </linearGradient>
      <linearGradient id="visor${uid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${a}" stop-opacity=".25"/><stop offset=".35" stop-color="${a}"/><stop offset=".65" stop-color="${a}" stop-opacity=".8"/><stop offset="1" stop-color="${a}" stop-opacity=".2"/>
      </linearGradient>
      <filter id="blur${uid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
      <pattern id="grid${uid}" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="${a}" stroke-opacity=".1" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="360" height="460" fill="url(#bg${uid})"/>
    <circle cx="190" cy="170" r="180" fill="url(#glow${uid})"/>
    <rect width="360" height="460" fill="url(#grid${uid})" opacity=".55"/>
    <path d="M0 320 L360 250 L360 460 L0 460 Z" fill="${c}" opacity=".05"/>
    <path d="M18 440 L342 440" stroke="${a}" stroke-opacity=".2" stroke-width="1"/>
    <path d="M18 440 L58 400 M342 440 L302 400" stroke="${a}" stroke-opacity=".35" stroke-width="1"/>
    <g opacity=".75">
      <path d="M35 460 Q42 372 96 332 L124 306 L236 306 L264 332 Q318 372 325 460 Z" fill="#0b1319" stroke="${c}" stroke-opacity=".35" stroke-width="1.5"/>
      <path d="M58 460 Q70 390 114 352 L138 334 L222 334 L246 352 Q290 390 302 460 Z" fill="url(#suit${uid})" opacity=".62"/>
      <path d="M124 334 L145 460 L215 460 L236 334 Z" fill="url(#armor${uid})" opacity=".7"/>
      <path d="M118 354 L242 354" stroke="${a}" stroke-opacity=".7" stroke-width="2"/>
      <path d="M132 366 L144 430 L164 430 L158 366 Z" fill="#0a1015" opacity=".7"/>
      <path d="M228 366 L216 430 L196 430 L202 366 Z" fill="#0a1015" opacity=".7"/>
      <rect x="155" y="316" width="50" height="22" fill="#0b1116" stroke="${a}" stroke-opacity=".35"/>
      <path d="M136 336 L146 306 M224 336 L214 306" stroke="${c}" stroke-opacity=".6" stroke-width="3"/>
    </g>
    <g>
      <ellipse cx="180" cy="195" rx="58" ry="72" fill="${skin}"/>
      <path d="M124 184 Q126 114 180 108 Q234 114 236 184 L228 198 Q210 164 180 162 Q150 164 132 198 Z" fill="${hair}" opacity=".9"/>
      ${hairStyle === 0 ? `<path d="M130 180 Q104 230 118 300 L146 286 Q134 236 146 198 Z" fill="${hair}"/><path d="M228 180 Q250 230 242 296 L214 286 Q228 234 214 196 Z" fill="${hair}" opacity=".85"/>` : ''}
      ${hairStyle === 1 ? `<path d="M124 178 Q132 250 160 278 L148 296 Q108 252 116 174 Z" fill="${hair}"/><path d="M236 178 Q226 250 198 278 L210 296 Q252 252 244 174 Z" fill="${hair}" opacity=".85"/>` : ''}
      ${hairStyle === 2 ? `<path d="M118 188 Q96 258 116 324 L148 312 Q128 250 144 196 Z" fill="${hair}"/><path d="M238 186 Q252 244 240 290 L218 286 Q236 238 218 190 Z" fill="${hair}" opacity=".8"/>` : ''}
      ${hairStyle === 3 ? `<path d="M128 170 Q122 230 142 276 L160 264 Q144 224 150 180 Z" fill="${hair}"/><path d="M232 170 Q238 220 224 262 L206 254 Q222 214 212 178 Z" fill="${hair}" opacity=".8"/>` : ''}
      <path d="M122 170 Q124 108 180 104 Q236 108 238 170 L232 182 Q214 146 180 146 Q146 146 128 182 Z" fill="#0c1319"/>
      <path d="M122 170 Q124 108 180 104 Q236 108 238 170" fill="none" stroke="${a}" stroke-opacity=".38" stroke-width="2"/>
      <path d="M126 188 L234 188 L228 208 L132 208 Z" fill="#080d11"/>
      <path d="M132 191 L228 191 L224 204 L136 204 Z" fill="url(#visor${uid})" opacity=".95"/>
      <path d="M140 194 L186 194" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/>
      ${visorStyle === 1 ? `<path d="M150 190 L180 180 L210 190" fill="none" stroke="${a}" stroke-width="2"/>` : ''}
      ${visorStyle === 2 ? `<rect x="148" y="186" width="64" height="5" fill="${a}" opacity=".8"/><rect x="156" y="196" width="48" height="2" fill="#fff" opacity=".4"/>` : ''}
      <path d="M136 220 Q180 250 224 220 L218 268 Q180 290 142 268 Z" fill="#101820"/>
      <path d="M146 226 Q180 246 214 226" fill="none" stroke="${c}" stroke-opacity=".5" stroke-width="2"/>
      <path d="M154 240 L164 240 M196 240 L206 240" stroke="${a}" stroke-opacity=".6" stroke-width="2"/>
      <path d="M118 196 L126 196 L126 218 L118 210 Z" fill="#0a1015" stroke="${a}" stroke-opacity=".4"/>
      <path d="M242 196 L234 196 L234 218 L242 210 Z" fill="#0a1015" stroke="${a}" stroke-opacity=".4"/>
      <circle cx="246" cy="207" r="3" fill="${a}"><animate attributeName="opacity" values="1;.25;1" dur="2.3s" repeatCount="indefinite"/></circle>
    </g>
    <g opacity=".85">
      <path d="M84 354 Q64 382 66 420 L88 420 Q90 384 104 364 Z" fill="#0a1116" stroke="${a}" stroke-opacity=".2"/>
      <path d="M276 354 Q296 382 294 420 L272 420 Q270 384 256 364 Z" fill="#0a1116" stroke="${a}" stroke-opacity=".2"/>
      <path d="M180 332 L180 460" stroke="${a}" stroke-opacity=".16" stroke-width="1"/>
    </g>
    <g opacity=".55" font-family="Barlow Condensed, sans-serif" fill="${a}">
      <text x="18" y="28" font-size="11" letter-spacing="3">${String(idx + 1).padStart(2, '0')} // ${agent.role.toUpperCase()}</text>
      <text x="342" y="28" font-size="9" letter-spacing="2" text-anchor="end">VEM COMER</text>
      <text x="18" y="444" font-size="8" letter-spacing="2">${agent.country} · ACTIVE</text>
    </g>
    <path d="M10 10 L10 44 M10 10 L44 10 M350 10 L350 44 M350 10 L316 10 M10 450 L10 416 M10 450 L44 450 M350 450 L350 416 M350 450 L316 450" stroke="${a}" stroke-opacity=".45" stroke-width="1"/>
  </svg>`;
}

function drawMapPreview(canvas, map, large = false) {
  if (!canvas) return;
  const W = large ? 760 : 620, H = large ? 650 : 400;
  canvas.width = W; canvas.height = H;
  const g = canvas.getContext('2d');
  const t = map.theme;
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#071016'); bg.addColorStop(1, '#0b151c');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const pad = large ? 56 : 34;
  const s = (W - pad * 2) / 100;
  const cx = W / 2, cy = H / 2;
  const px = x => cx + x * s;
  const py = z => cy + z * s;
  g.save();
  g.strokeStyle = 'rgba(150,200,210,.055)'; g.lineWidth = 1;
  for (let i = -50; i <= 50; i += 10) {
    g.beginPath(); g.moveTo(px(i), py(-50)); g.lineTo(px(i), py(50)); g.stroke();
    g.beginPath(); g.moveTo(px(-50), py(i)); g.lineTo(px(50), py(i)); g.stroke();
  }
  // Sites first.
  for (const site of map.sites) {
    g.fillStyle = site.color + '22';
    g.strokeStyle = site.color + 'aa';
    g.lineWidth = 1.2;
    g.fillRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
    g.strokeRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
    g.fillStyle = site.color;
    g.font = `700 ${large ? 36 : 25}px "Barlow Condensed", sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(site.id, px(site.x), py(site.z));
    g.font = `600 ${large ? 9 : 7}px "Inter", sans-serif`;
    g.fillStyle = site.color + 'bb';
    g.fillText('BOMB SITE', px(site.x), py(site.z) + (large ? 27 : 18));
  }
  // Walls.
  for (const w of map.walls) {
    const x = px(w.x - w.w / 2), y = py(w.z - w.d / 2), ww = w.w * s, hh = w.d * s;
    g.fillStyle = w.m === 'crate' ? t.crate : w.m === 'metal' ? t.metal : t.wall;
    g.globalAlpha = w.m === 'low' ? 0.55 : 0.82;
    g.fillRect(x, y, ww, hh);
    g.globalAlpha = 1;
    g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 0.6; g.strokeRect(x, y, ww, hh);
  }
  // Spawns.
  for (const [key, sp] of Object.entries(map.spawns)) {
    const color = key === 'attack' ? t.accent2 : t.accent;
    g.fillStyle = color;
    g.beginPath();
    const dir = key === 'attack' ? -1 : 1;
    g.moveTo(px(sp.x), py(sp.z) + dir * (large ? 15 : 10));
    g.lineTo(px(sp.x) - (large ? 9 : 6), py(sp.z) - dir * (large ? 6 : 4));
    g.lineTo(px(sp.x) + (large ? 9 : 6), py(sp.z) - dir * (large ? 6 : 4));
    g.closePath(); g.fill();
    g.font = `600 ${large ? 8 : 6}px "Barlow Condensed", sans-serif`;
    g.textAlign = 'center';
    g.fillStyle = color + 'aa';
    g.fillText(key === 'attack' ? 'ATK SPAWN' : 'DEF SPAWN', px(sp.x), py(sp.z) + dir * (large ? 28 : 20));
  }
  // Path hint lines.
  g.setLineDash([4, 8]); g.strokeStyle = 'rgba(255,255,255,.14)'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(px(0), py(43)); g.lineTo(px(0), py(10)); g.lineTo(px(map.sites[0].x), py(map.sites[0].z)); g.stroke();
  g.beginPath(); g.moveTo(px(0), py(43)); g.lineTo(px(10), py(12)); g.lineTo(px(map.sites[1].x), py(map.sites[1].z)); g.stroke();
  g.setLineDash([]);
  // Scan line.
  const scanY = (Date.now() / 40) % H;
  const scan = g.createLinearGradient(0, scanY - 30, 0, scanY + 30);
  scan.addColorStop(0, 'rgba(72,234,216,0)'); scan.addColorStop(.5, 'rgba(72,234,216,.09)'); scan.addColorStop(1, 'rgba(72,234,216,0)');
  g.fillStyle = scan; g.fillRect(0, scanY - 30, W, 60);
  g.restore();
  g.strokeStyle = 'rgba(180,210,225,.15)'; g.lineWidth = 1; g.strokeRect(.5, .5, W - 1, H - 1);
  g.fillStyle = 'rgba(180,210,225,.35)';
  g.font = `600 ${large ? 9 : 7}px "Barlow Condensed", sans-serif`;
  g.textAlign = 'left';
  g.fillText(`${map.name} // TACTICAL OVERVIEW`, 18, 22);
  g.textAlign = 'right';
  g.fillText('100 × 100 M', W - 18, 22);
}

// ---------------------------------------------------------------- menu canvas
function startMenuCanvas() {
  const canvas = $('#menu-grid');
  if (!canvas) return;
  const g = canvas.getContext('2d');
  let w, h, raf;
  const resize = () => {
    w = canvas.width = Math.floor(canvas.clientWidth * Math.min(devicePixelRatio, 1.5));
    h = canvas.height = Math.floor(canvas.clientHeight * Math.min(devicePixelRatio, 1.5));
  };
  resize();
  window.addEventListener('resize', resize);
  const map = MAPS[0];
  const draw = () => {
    const t = performance.now() / 1000;
    g.clearRect(0, 0, w, h);
    const bg = g.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#061016'); bg.addColorStop(.55, '#07131a'); bg.addColorStop(1, '#0a0b10');
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    const cx = w * .67, cy = h * .49, s = Math.min(w, h) / 108;
    const px = x => cx + x * s, py = z => cy + z * s;
    g.save();
    g.translate(0, Math.sin(t * .2) * 2);
    g.strokeStyle = 'rgba(72,234,216,.08)'; g.lineWidth = 1;
    for (let i = -50; i <= 50; i += 5) {
      g.beginPath(); g.moveTo(px(i), py(-50)); g.lineTo(px(i), py(50)); g.stroke();
      g.beginPath(); g.moveTo(px(-50), py(i)); g.lineTo(px(50), py(i)); g.stroke();
    }
    for (const wl of map.walls) {
      g.fillStyle = wl.m === 'crate' ? 'rgba(255,90,54,.12)' : 'rgba(90,150,160,.08)';
      g.strokeStyle = 'rgba(130,200,210,.1)';
      g.fillRect(px(wl.x - wl.w / 2), py(wl.z - wl.d / 2), wl.w * s, wl.d * s);
      g.strokeRect(px(wl.x - wl.w / 2), py(wl.z - wl.d / 2), wl.w * s, wl.d * s);
    }
    for (const site of map.sites) {
      const c = site.id === 'A' ? '255,90,54' : '72,234,216';
      g.fillStyle = `rgba(${c},.09)`; g.strokeStyle = `rgba(${c},.5)`;
      g.fillRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
      g.strokeRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
      g.fillStyle = `rgba(${c},.85)`; g.font = `700 ${30 * s / 10}px "Barlow Condensed",sans-serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(site.id, px(site.x), py(site.z));
      g.beginPath(); g.arc(px(site.x), py(site.z), 20 + Math.sin(t * 2 + site.x) * 2, 0, Math.PI * 2); g.stroke();
    }
    const scanY = ((t * 28) % 120) - 10;
    const grd = g.createLinearGradient(0, py(scanY - 6), 0, py(scanY + 6));
    grd.addColorStop(0, 'rgba(72,234,216,0)'); grd.addColorStop(.5, 'rgba(72,234,216,.12)'); grd.addColorStop(1, 'rgba(72,234,216,0)');
    g.fillStyle = grd; g.fillRect(px(-50), py(scanY - 6), px(50) - px(-50), py(scanY + 6) - py(scanY - 6));
    g.restore();
    raf = requestAnimationFrame(draw);
  };
  draw();
  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
}

// ---------------------------------------------------------------- agent select
function agentCardHTML(agent) {
  return `<button class="agent-card${agent.id === selectedAgent ? ' selected' : ''}" data-agent="${agent.id}">
    <div class="card-art">${portraitSVG(agent, { crop: '20 55 320 405' })}</div>
    <div class="card-grad"></div>
    <div class="card-lock">LOCKED</div>
    <div class="card-meta">
      <div class="card-name">${agent.name}</div>
      <div class="card-role"><i style="background:${ROLE_COLORS[agent.role]}"></i>${agent.role.toUpperCase()}</div>
    </div>
  </button>`;
}

function renderAgentGrid() {
  const grid = $('#agent-grid');
  const list = roleFilter === 'all' ? AGENTS : AGENTS.filter(a => a.role === roleFilter);
  grid.innerHTML = list.map(agentCardHTML).join('');
  grid.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedAgent = card.dataset.agent;
      sound.ui();
      renderAgentGrid();
      renderAgentDetail();
    });
  });
}

function renderAgentDetail() {
  const a = AGENT_BY_ID[selectedAgent];
  const weapon = WEAPONS[a.weapon];
  $('#agent-detail').innerHTML = `
    <div class="detail-portrait">${portraitSVG(a)}<div class="portrait-scan"></div></div>
    <div class="detail-role"><span>${a.role.toUpperCase()}</span><span>${a.country} // ${String(AGENTS.indexOf(a) + 1).padStart(2, '0')}</span></div>
    <div class="detail-name">${a.name}</div>
    <div class="detail-real">${a.realName.toUpperCase()}</div>
    <div class="detail-bio">${a.bio}</div>
    <div class="detail-quote">${a.quote}</div>
    <div class="detail-power">
      <div class="pk">Q</div>
      <div><b>${a.power.name.toUpperCase()}</b><span>${a.power.desc}</span></div>
    </div>
    <div class="detail-weapon"><span>SIGNATURE WEAPON</span><b>${weapon.name}</b></div>
  `;
}

function initAgentSelect() {
  $$('.roster-filter .filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.roster-filter .filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      roleFilter = btn.dataset.role;
      sound.ui();
      renderAgentGrid();
    });
  });
  renderAgentGrid();
  renderAgentDetail();
  $('#btn-agent-back').addEventListener('click', () => { sound.ui(); screen('screen-menu'); });
  $('#btn-lock-agent').addEventListener('click', () => {
    sound.init(); sound.buy();
    buildMapScreen();
    screen('screen-maps');
  });
}

// ---------------------------------------------------------------- map select
function buildMapScreen() {
  const grid = $('#map-grid');
  grid.innerHTML = MAPS.map(m => `
    <button class="map-card${m.id === selectedMap ? ' selected' : ''}" data-map="${m.id}">
      <canvas></canvas>
      <div class="map-overlay"></div>
      <div class="map-meta"><div><div class="map-name">${m.name}</div><div class="map-loc">${m.location}</div></div><span class="map-tag">2 SITES</span></div>
    </button>`).join('');
  grid.querySelectorAll('.map-card').forEach(card => {
    const map = MAP_BY_ID[card.dataset.map];
    drawMapPreview(card.querySelector('canvas'), map, false);
    card.addEventListener('click', () => {
      selectedMap = card.dataset.map;
      sound.ui();
      grid.querySelectorAll('.map-card').forEach(c => c.classList.toggle('selected', c.dataset.map === selectedMap));
      renderMapDetail();
    });
  });
  renderMapDetail();
}

function renderMapDetail() {
  const m = MAP_BY_ID[selectedMap];
  $('#map-detail').innerHTML = `
    <div class="map-preview"><canvas id="map-detail-canvas"></canvas><div class="preview-grid"></div></div>
    <div class="kicker">${m.location}</div>
    <h2>${m.name}</h2>
    <p class="map-sub">${m.subtitle}</p>
    <div class="map-sites"><span>SITE A</span><span>SITE B</span></div>
    <div class="map-facts">
      <div><span>SCALE</span><b>LARGE</b></div>
      <div><span>BOMB SITES</span><b>02</b></div>
      <div><span>BUY WINDOW</span><b>15 SEC</b></div>
      <div><span>SPIKE FUSE</span><b>45 SEC</b></div>
    </div>`;
  drawMapPreview($('#map-detail-canvas'), m, true);
}

function initMapSelect() {
  $('#btn-map-back').addEventListener('click', () => { sound.ui(); screen('screen-agents'); });
  $('#btn-deploy').addEventListener('click', () => { sound.init(); sound.buy(); startMatch(); });
}

// ---------------------------------------------------------------- settings
function initSettings() {
  const modal = $('#settings-modal');
  $('#btn-settings').addEventListener('click', () => { sound.ui(); modal.classList.add('show'); });
  $('#btn-settings-close').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
  $('#setting-sens').addEventListener('input', e => {
    const v = Number(e.target.value);
    $('#sens-val').textContent = v.toFixed(2);
    if (game) game.sensitivity = v;
  });
  $('#setting-vol').addEventListener('input', e => {
    const v = Number(e.target.value);
    $('#vol-val').textContent = Math.round(v * 100) + '%';
    sound.setVolume?.(v);
  });
  $$('#difficulty-seg button').forEach(btn => btn.addEventListener('click', () => {
    $$('#difficulty-seg button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDifficulty = btn.dataset.diff;
    sound.ui();
  }));
  $$('#voice-seg button').forEach(btn => btn.addEventListener('click', () => {
    $$('#voice-seg button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    voiceEnabled = btn.dataset.voice === 'on';
    sound.ui();
  }));
  $('#btn-sound').addEventListener('click', () => {
    sound.init();
    sound.muted = !sound.muted;
    sound.setMuted(sound.muted);
    $('#btn-sound').textContent = sound.muted ? '◌' : '◉';
  });
}

// ---------------------------------------------------------------- match start
function buildLineups() {
  const others = AGENTS.filter(a => a.id !== selectedAgent).sort(() => Math.random() - 0.5);
  const alpha = [AGENT_BY_ID[selectedAgent], ...others.slice(0, 4)];
  const bravo = others.slice(4, 9);
  $('#loading-alpha').innerHTML = alpha.map(a => `<div class="loading-op alpha"><div class="lo-art">${portraitSVG(a, { crop: '45 90 270 340' })}</div><b>${a.name}</b></div>`).join('');
  $('#loading-bravo').innerHTML = bravo.map(a => `<div class="loading-op bravo"><div class="lo-art">${portraitSVG(a, { crop: '45 90 270 340' })}</div><b>${a.name}</b></div>`).join('');
}

async function startMatch(opts = {}) {
  sound.init();
  currentMode = opts.mode || 'solo';
  buildLineups();
  $('#loading-map').textContent = MAP_BY_ID[selectedMap].name;
  screen('screen-loading');
  await delay(1250);
  screen('screen-game');
  $('#screen-game').classList.add('live');
  if (!game) {
    game = new Game($('#scene'), { onEvent, onHud: updateHUD });
    window.__game = game;
  }
  await game.start({ agentId: selectedAgent, mapId: selectedMap, difficulty: selectedDifficulty, mode: currentMode });
  game.sensitivity = Number($('#setting-sens').value) || 1;
  currentState = null;
  lastChatRendered = 0;
  lastKillRendered = '';
  $('#killfeed').innerHTML = '';
  $('#chat-feed').innerHTML = '';
  $('#chat-messages').innerHTML = '';
  hide($('#death-overlay'));
  hide($('#halftime-overlay'));
  hide($('#match-end'));
  hide($('#scoreboard-modal'));
  $('#score-alpha').textContent = '0';
  $('#score-bravo').textContent = '0';
  $('#click-to-play').classList.toggle('hidden', game.isTouch);
  if (!game.isTouch) setTimeout(() => showClickToPlay(true), 300);
  setTimeout(() => openBuy(), 500);
  setTimeout(() => toast('WASD MOVE · LMB FIRE · RMB ADS · Q ABILITY · B BUY', 'info', 4200), 1300);
}

function showClickToPlay(on) {
  if (!game || game.isTouch) return;
  $('#click-to-play').classList.toggle('hidden', !on);
}

function onEvent(type, data) {
  switch (type) {
    case 'matchStart':
      break;
    case 'welcome':
      toast('ROUND 1 // BUY PHASE · COORDINATE IN TEAM CHAT', 'info', 3400);
      break;
    case 'buyStart':
      hide($('#death-overlay'));
      hide($('#halftime-overlay'));
      showRoundBanner(`ROUND ${data.round}`, 'BUY PHASE', `${data.time} SECONDS // SITE ${data.targetSite}`);
      setTimeout(() => { if (game?.phase === 'buy') openBuy(); }, 350);
      break;
    case 'liveStart':
      closeBuy();
      showRoundBanner('', 'ENGAGE', 'BUY WINDOW CLOSED');
      toast('BARRIERS DOWN // EXECUTE', 'good');
      break;
    case 'roundEnd':
      closeBuy();
      hide($('#death-overlay'));
      showRoundBanner(`ROUND ${data.round}`, data.playerWon ? 'ROUND WON' : 'ROUND LOST', `${data.reason.toUpperCase()} · ${data.score.alpha} — ${data.score.bravo}`);
      break;
    case 'halftime':
      closeBuy();
      hide($('#death-overlay'));
      $('#ht-copy').textContent = data.playerSide === 'attack' ? 'ALPHA NOW ATTACKS · BRAVO NOW DEFENDS' : 'ALPHA NOW DEFENDS · BRAVO NOW ATTACKS';
      show($('#halftime-overlay'));
      toast('HALFTIME // SIDES SWAPPED · WEAPONS + CREDITS RESET', 'info', 4200);
      break;
    case 'matchEnd': {
      closeBuy();
      hide($('#halftime-overlay'));
      hide($('#death-overlay'));
      const won = data.winner === 'alpha';
      $('#me-kicker').textContent = won ? 'MATCH COMPLETE // VICTORY' : 'MATCH COMPLETE // DEFEAT';
      $('#me-title').innerHTML = won ? 'VICTORY' : 'DEFEAT';
      $('#me-score').textContent = `${data.score.alpha} — ${data.score.bravo}`;
      $('#me-copy').textContent = won ? 'ALPHA TAKES THE MATCH' : 'BRAVO TAKES THE MATCH';
      show($('#match-end'));
      break;
    }
    case 'death':
      closeBuy();
      $('#death-by').textContent = `BY ${data.by}${data.head ? ' // HEADSHOT' : ''}`;
      show($('#death-overlay'));
      showClickToPlay(false);
      break;
    case 'flash': {
      const el = $('#flash-overlay');
      el.style.transition = 'none'; el.style.opacity = '1';
      requestAnimationFrame(() => { el.style.transition = 'opacity 2.2s ease-out'; el.style.opacity = '0'; });
      break;
    }
    case 'damaged': {
      const el = $('#damage-overlay');
      el.style.transition = 'none'; el.style.opacity = '.8';
      requestAnimationFrame(() => { el.style.transition = 'opacity .35s'; el.style.opacity = '0'; });
      break;
    }
    case 'emp': {
      const el = $('#emp-overlay');
      el.style.transition = 'none'; el.style.opacity = '.8';
      requestAnimationFrame(() => { el.style.transition = 'opacity 1.4s'; el.style.opacity = '0'; });
      toast('SIGNAL SCRAMBLED // EMP', 'bad');
      break;
    }
    case 'invis': {
      const el = $('#invis-overlay');
      el.style.transition = 'none'; el.style.opacity = '.65';
      requestAnimationFrame(() => { el.style.transition = 'opacity 3.2s'; el.style.opacity = '0'; });
      toast('GHOST WALK // LIGHT BENT', 'info');
      break;
    }
    case 'plant':
      toast(`SPIKE PLANTED // SITE ${data.site} // 45.0s`, 'bad', 3200);
      break;
    case 'defuse':
      toast('SPIKE DEFUSED', 'good', 2800);
      break;
    case 'explosion':
      toast('SPIKE DETONATED', 'bad', 3000);
      break;
    case 'heal':
      toast('LIFE BLOOM // +38 HP', 'good');
      break;
    case 'overclock':
      toast('OVERCLOCK // FIRE RATE BOOSTED', 'info');
      break;
    case 'purchase':
      toast(data.weapon ? `${data.weapon.name} ACQUIRED` : `ARMOR +${data.armor}`, 'good', 1400);
      break;
    case 'ability':
      if (data.team === 'alpha') toast(`${data.agent} // ${data.name.toUpperCase()}`, 'info', 1800);
      break;
    case 'kill':
      if (data.killer === 'YOU') toast(`ELIMINATED ${data.victim}${data.head ? ' // HEADSHOT' : ''}`, 'good', 1600);
      break;
    case 'hitmarker': {
      const hm = $('#hitmarker');
      hm.classList.remove('show', 'head');
      void hm.offsetWidth;
      hm.classList.add('show');
      if (data.head) hm.classList.add('head');
      break;
    }
    case 'error':
      toast(data, 'bad', 1600);
      break;
    case 'chat':
      appendChatMessage(data, false);
      break;
    case 'pointerlock':
      showClickToPlay(!data && !game?.isTouch);
      break;
    case 'bombBeep':
      if (data.time < 10) $('#bomb-status')?.classList.add('urgent');
      break;
  }
}

function showRoundBanner(kicker, title, sub) {
  const el = $('#round-banner');
  $('#rb-kicker').textContent = kicker || '';
  $('#rb-title').textContent = title;
  $('#rb-sub').textContent = sub || '';
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function toast(text, kind = 'info', ms = 2200) {
  const stack = $('#toast-stack');
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.textContent = text;
  stack.appendChild(el);
  while (stack.children.length > 4) stack.firstElementChild.remove();
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; setTimeout(() => el.remove(), 260); }, ms);
}

// ---------------------------------------------------------------- HUD
function fmtTime(sec) {
  sec = Math.max(0, sec);
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateHUD(state) {
  if (!state) return;
  currentState = state;
  const p = state.player;
  const alphaAtk = state.sideAlpha === 'attack';
  $('#score-alpha').textContent = state.score.alpha;
  $('#score-bravo').textContent = state.score.bravo;
  $('#side-alpha').textContent = alphaAtk ? 'ATK' : 'DEF';
  $('#side-bravo').textContent = alphaAtk ? 'DEF' : 'ATK';
  $('#round-label').textContent = `ROUND ${state.round}`;

  let label = 'ROUND LIVE', time = state.roundTime;
  if (state.phase === 'buy') { label = 'BUY PHASE'; time = state.phaseTime; }
  else if (state.phase === 'roundEnd') { label = 'ROUND OVER'; time = state.phaseTime; }
  else if (state.phase === 'halftime') { label = 'HALFTIME'; time = state.phaseTime; }
  else if (state.bomb.state === 'planted') { label = 'SPIKE ARMED'; time = state.bomb.time; }
  else if (state.phase === 'matchEnd') { label = 'MATCH OVER'; time = 0; }
  $('#clock-label').textContent = label;
  $('#clock-time').textContent = fmtTime(time);
  $('#clock-time').style.color = state.bomb.state === 'planted' ? 'var(--red)' : '';

  const attackers = state.agents.filter(a => a.team === (alphaAtk ? 'alpha' : 'bravo') && a.alive).length;
  const defenders = state.agents.filter(a => a.team === (alphaAtk ? 'bravo' : 'alpha') && a.alive).length;
  $('#obj-site').textContent = state.targetSite || '—';
  $('#obj-site').style.background = state.targetSite === 'B' ? 'var(--cyan)' : 'var(--orange)';
  if (state.bomb.state === 'planted') {
    $('#obj-copy').textContent = p.alive && state.playerSide === 'defense' ? 'DEFUSE THE SPIKE' : 'SPIKE ARMED // HOLD SITE';
    $('#obj-alive').textContent = `${attackers} v ${defenders}`;
  } else if (state.playerSide === 'attack') {
    $('#obj-copy').textContent = p.bomb ? `PLANT AT SITE ${state.targetSite}` : `TAKE SITE ${state.targetSite}`;
    $('#obj-alive').textContent = `${attackers} v ${defenders}`;
  } else {
    $('#obj-copy').textContent = `DEFEND SITE ${state.targetSite}`;
    $('#obj-alive').textContent = `${defenders} v ${attackers}`;
  }

  $('#minimap-map').textContent = state.mapName;
  $('#minimap-site').textContent = `SITE ${state.targetSite || '—'}`;
  $('#minimap-bomb').textContent = state.bomb.state === 'planted' ? `${state.bomb.time.toFixed(1)}s` : state.bomb.state === 'carried' ? (p.bomb ? 'YOURS' : 'CARRIED') : state.bomb.state.toUpperCase();

  $('#health-value').textContent = p.health;
  $('#health-fill').style.width = `${clamp(p.health, 0, 100)}%`;
  $('#armor-value').textContent = p.armor;
  $('#armor-fill').style.width = `${clamp(p.armor, 0, 50) * 2}%`;
  $('#money-value').textContent = p.money;
  $('#agent-mini').textContent = AGENT_BY_ID[selectedAgent].name;
  $('#ammo-mag').textContent = p.weapon.ammo;
  $('#ammo-reserve').textContent = p.weapon.reserve;
  $('#weapon-name').textContent = p.weapon.name;
  $('#weapon-type').textContent = p.weapon.type.toUpperCase();
  $('#slot-1').textContent = p.primary ? `1 · ${WEAPONS[p.primary].name}` : '1 · —';
  $('#slot-2').textContent = `2 · ${WEAPONS[p.sidearm].name}`;
  $('#ability-name').textContent = p.ability.name.toUpperCase();
  const deg = p.ability.ready ? 360 : (1 - p.ability.cd / p.ability.max) * 360;
  $('#ability-ring').style.background = `conic-gradient(var(--orange) ${deg}deg, rgba(255,255,255,.1) ${deg}deg)`;
  $('#ability-status').textContent = p.ability.ready ? 'READY' : `${p.ability.cd.toFixed(1)}s`;
  $('#ability-key').textContent = 'Q';
  $('#crosshair').style.opacity = p.alive ? '1' : '0';

  const prompt = state.prompt;
  if (prompt && p.alive) {
    show($('#interact-prompt'));
    $('#prompt-text').textContent = prompt.text;
    $('#prompt-sub').textContent = state.bomb.site ? `SITE ${state.bomb.site}` : 'HOLD INTERACT';
    $('#prompt-fill').style.width = `${clamp(prompt.progress || 0, 0, 1) * 100}%`;
    $('#prompt-key').textContent = prompt.key || 'E';
  } else hide($('#interact-prompt'));

  if (state.bomb.state === 'planted') {
    show($('#bomb-status'));
    $('#bomb-timer').textContent = state.bomb.time.toFixed(1);
    $('#bomb-site').textContent = `SITE ${state.bomb.site}`;
    $('#bomb-status').classList.toggle('urgent', state.bomb.time < 10);
  } else hide($('#bomb-status'));

  if (buyOpen) {
    $('#buy-money').textContent = p.money;
    $('#buy-timer').textContent = Math.ceil(state.phaseTime);
    if (state.phase !== 'buy') closeBuy();
  }
  $('#btn-buy').style.opacity = state.phase === 'buy' ? '1' : '.35';

  const kf = state.killfeed.map(k => `<div class="kf-row"><span class="kf-k">${esc(k.killer)}</span><span class="kf-w">${k.head ? '⌖' : '›'}</span><span class="kf-v">${esc(k.victim)}</span><span class="kf-w">${esc(k.weapon)}</span></div>`).join('');
  if (kf !== lastKillRendered) { $('#killfeed').innerHTML = kf; lastKillRendered = kf; }

  if (state.chat.length !== lastChatRendered) {
    lastChatRendered = state.chat.length;
    $('#chat-feed').innerHTML = state.chat.slice(-5).map(m => `<div class="chat-msg ${m.author === 'YOU' ? 'you' : ''}"><b>${esc(m.author)}</b>${esc(m.text)}</div>`).join('');
  }

  drawMinimap(state);
  if (scoreboardOpen) renderScoreboard(state);
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function drawMinimap(state) {
  const canvas = $('#minimap');
  if (!canvas) return;
  const g = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = 'rgba(4,9,12,.92)'; g.fillRect(0, 0, W, H);
  const pad = 8, s = (W - pad * 2) / 100;
  const px = x => W / 2 + x * s, py = z => H / 2 + z * s;
  const map = MAP_BY_ID[selectedMap];
  g.strokeStyle = 'rgba(120,180,190,.07)'; g.lineWidth = 1;
  for (let i = -50; i <= 50; i += 10) {
    g.beginPath(); g.moveTo(px(i), py(-50)); g.lineTo(px(i), py(50)); g.stroke();
    g.beginPath(); g.moveTo(px(-50), py(i)); g.lineTo(px(50), py(i)); g.stroke();
  }
  for (const w of map.walls) {
    g.fillStyle = w.m === 'crate' ? 'rgba(255,150,80,.16)' : 'rgba(160,200,205,.16)';
    g.fillRect(px(w.x - w.w / 2), py(w.z - w.d / 2), w.w * s, w.d * s);
  }
  for (const site of map.sites) {
    const col = site.id === 'A' ? '255,90,54' : '72,234,216';
    g.fillStyle = `rgba(${col},.10)`; g.strokeStyle = `rgba(${col},.55)`;
    g.fillRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
    g.strokeRect(px(site.x - site.w / 2), py(site.z - site.d / 2), site.w * s, site.d * s);
    g.fillStyle = `rgba(${col},.9)`; g.font = '700 10px "Barlow Condensed",sans-serif'; g.textAlign = 'center';
    g.fillText(site.id, px(site.x), py(site.z) + 3);
  }
  // FOV cone.
  const p = state.agents.find(a => a.isPlayer);
  if (p && p.alive) {
    const yaw = p.yaw;
    const f = { x: -Math.sin(yaw), y: -Math.cos(yaw) };
    g.save(); g.translate(px(p.x), py(p.z));
    g.rotate(Math.atan2(f.y, f.x));
    const grad = g.createRadialGradient(0, 0, 2, 0, 0, 34);
    grad.addColorStop(0, 'rgba(72,234,216,.2)'); grad.addColorStop(1, 'rgba(72,234,216,0)');
    g.fillStyle = grad; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 34, -.52, .52); g.closePath(); g.fill();
    g.restore();
  }
  for (const a of state.agents) {
    if (!a.visible) continue;
    if (a.isPlayer) continue;
    const col = a.team === 'alpha' ? '#48ead8' : '#ff4d67';
    g.fillStyle = col;
    g.beginPath(); g.arc(px(a.x), py(a.z), a.team === 'alpha' ? 2.8 : 2.2, 0, Math.PI * 2); g.fill();
    if (a.bomb) { g.strokeStyle = '#ffc85c'; g.lineWidth = 1.5; g.beginPath(); g.arc(px(a.x), py(a.z), 5, 0, Math.PI * 2); g.stroke(); }
  }
  if (state.bomb.state === 'planted' && state.bomb.position) {
    g.fillStyle = '#ff4d67';
    g.beginPath(); g.arc(px(state.bomb.position.x), py(state.bomb.position.z), 4, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(255,77,103,.7)'; g.beginPath(); g.arc(px(state.bomb.position.x), py(state.bomb.position.z), 7 + Math.sin(performance.now() / 180) * 2, 0, Math.PI * 2); g.stroke();
  }
  if (p && p.alive) {
    g.save(); g.translate(px(p.x), py(p.z));
    g.rotate(Math.atan2(-Math.cos(p.yaw), -Math.sin(p.yaw)));
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(7, 0); g.lineTo(-5, -4); g.lineTo(-2, 0); g.lineTo(-5, 4); g.closePath(); g.fill();
    g.restore();
  }
  g.strokeStyle = 'rgba(180,210,225,.16)'; g.strokeRect(.5, .5, W - 1, H - 1);
}

// ---------------------------------------------------------------- buy menu
function openBuy() {
  if (!game || game.phase !== 'buy' || buyOpen) return;
  buyOpen = true;
  $('#buy-overlay').classList.add('show');
  game.setUiBlocked(true);
  renderShop();
  document.exitPointerLock?.();
  showClickToPlay(false);
}

function closeBuy() {
  if (!buyOpen) return;
  buyOpen = false;
  $('#buy-overlay').classList.remove('show');
  if (game) game.setUiBlocked(chatOpen);
  if (!game?.isTouch) showClickToPlay(true);
}

function renderShop() {
  if (!game) return;
  const shop = game.getShop();
  const list = selectedBuyCat === 'all' ? shop : shop.filter(w => w.type === selectedBuyCat);
  const money = game.player.money;
  $('#shop-grid').innerHTML = list.map(w => {
    const bars = Math.round(clamp((w.damage * (w.pellets || 1)) / 12, 1, 5));
    const rateBars = Math.round(clamp(w.rate / 3, 1, 5));
    return `<button class="shop-card${w.owned ? ' owned' : ''}${money < w.price ? ' locked' : ''}" data-buy="${w.id}">
      ${w.signature ? '<span class="sc-sig">SIGNATURE</span>' : ''}
      <div class="sc-type">${w.type.toUpperCase()}</div>
      <div class="sc-name">${w.name}</div>
      <div class="sc-price">₡ ${w.price}</div>
      <div class="sc-stats">${Array.from({ length: 5 }, (_, i) => `<i class="${i < bars ? 'on' : ''}"></i>`).join('')}</div>
      <div class="sc-desc">${w.desc}</div>
    </button>`;
  }).join('');
  $$('#shop-grid .shop-card').forEach(card => card.addEventListener('click', () => {
    if (game.buyWeapon(card.dataset.buy)) { renderShop(); updateHUD(game.getState()); }
  }));
  $('#buy-money').textContent = money;
  $('#buy-timer').textContent = Math.ceil(game.phaseTime);
  $$('#buy-filters .filter').forEach(b => b.classList.toggle('active', b.dataset.cat === selectedBuyCat));
}

function initBuy() {
  $$('#buy-filters .filter').forEach(btn => btn.addEventListener('click', () => {
    selectedBuyCat = btn.dataset.cat;
    sound.ui();
    renderShop();
  }));
  $('#btn-buy').addEventListener('click', () => { if (buyOpen) closeBuy(); else openBuy(); });
  $('#btn-buy-close').addEventListener('click', closeBuy);
  $('#btn-buy-ready').addEventListener('click', closeBuy);
  $('#buy-light').addEventListener('click', () => { if (game.buyArmor('light')) { renderShop(); updateHUD(game.getState()); } });
  $('#buy-heavy').addEventListener('click', () => { if (game.buyArmor('heavy')) { renderShop(); updateHUD(game.getState()); } });
}

// ---------------------------------------------------------------- chat
function openChat() {
  if (!game || chatOpen) return;
  chatOpen = true;
  game.setChatOpen(true);
  show($('#chat-panel'));
  showClickToPlay(false);
  document.exitPointerLock?.();
  setTimeout(() => $('#chat-input').focus(), 30);
  $('#chat-messages').innerHTML = (game.chat || []).slice(-20).map(m => `<div class="chat-msg ${m.author === 'YOU' ? 'you' : ''}"><b>${esc(m.author)}</b>${esc(m.text)}</div>`).join('');
  $('#chat-messages').scrollTop = 9999;
}

function closeChat() {
  if (!chatOpen) return;
  chatOpen = false;
  hide($('#chat-panel'));
  $('#chat-input').value = '';
  if (game) game.setChatOpen(false);
  if (!game?.isTouch) showClickToPlay(true);
}

function sendChat() {
  const input = $('#chat-input');
  const text = input.value.trim();
  if (!text || !game) return;
  game.sendChat(text, 'YOU');
  input.value = '';
  closeChat();
}

function appendChatMessage(msg, panelOnly = false) {
  if (!msg) return;
  if (!panelOnly && !chatOpen) {
    // HUD feed is refreshed from state; still flash a tiny toast for bot callouts.
    if (msg.author !== 'YOU') toast(`${msg.author}: ${msg.text}`, 'info', 2200);
  }
  if (chatOpen) {
    const box = $('#chat-messages');
    const el = document.createElement('div');
    el.className = 'chat-msg ' + (msg.author === 'YOU' ? 'you' : '');
    el.innerHTML = `<b>${esc(msg.author)}</b>${esc(msg.text)}`;
    box.appendChild(el);
    box.scrollTop = 9999;
  }
}

function initChat() {
  $('#btn-chat').addEventListener('click', openChat);
  $('#btn-voice').addEventListener('click', toggleVoice);
  $('#chat-send').addEventListener('click', sendChat);
  $('#chat-voice').addEventListener('click', toggleVoice);
  $('#chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); sendChat(); }
    if (e.key === 'Escape') { e.preventDefault(); closeChat(); }
  });
}

function toggleVoice() {
  if (!voiceEnabled) { toast('VOICE INPUT DISABLED IN SETTINGS', 'bad'); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('VOICE INPUT NOT SUPPORTED IN THIS BROWSER', 'bad', 2600); return; }
  if (voiceLive) { recognition?.stop(); return; }
  try {
    recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      voiceLive = true;
      $('#btn-voice').classList.add('live');
      toast('VOICE LINK OPEN // SPEAK NOW', 'info', 2200);
    };
    recognition.onresult = ev => {
      const text = ev.results[0][0].transcript;
      if (text && game) game.sendChat(text, 'YOU');
    };
    recognition.onerror = () => { toast('VOICE INPUT UNAVAILABLE', 'bad'); };
    recognition.onend = () => {
      voiceLive = false;
      $('#btn-voice').classList.remove('live');
    };
    recognition.start();
  } catch {
    toast('VOICE INPUT UNAVAILABLE', 'bad');
  }
}

// ---------------------------------------------------------------- scoreboard
function renderScoreboard(state) {
  const alpha = state.agents.filter(a => a.team === 'alpha');
  const bravo = state.agents.filter(a => a.team === 'bravo');
  const row = (a, team) => `<div class="sb-row ${a.alive ? '' : 'dead'}" style="border-color:${team === 'alpha' ? 'var(--cyan)' : 'var(--red)'}">
    <span class="sb-agent" style="color:${team === 'alpha' ? 'var(--cyan)' : 'var(--red)'};background:${team === 'alpha' ? 'rgba(72,234,216,.1)' : 'rgba(255,77,103,.1)'}">${AGENT_BY_ID[a.agentId].name.slice(0, 1)}</span>
    <span class="sb-name">${a.name}${a.isPlayer ? ' · YOU' : ''}${a.bomb ? ' ◈' : ''}</span>
    <span class="sb-kd">${a.isPlayer ? (state.player.kills + '/' + state.player.deaths) : ''}</span>
    <span class="sb-money">₡${a.isPlayer ? state.player.money : ''}</span>
  </div>`;
  $('#sb-alpha').innerHTML = `<h3>ALPHA // ${state.sideAlpha === 'attack' ? 'ATTACK' : 'DEFENSE'}</h3>${alpha.map(a => row(a, 'alpha')).join('')}`;
  $('#sb-bravo').innerHTML = `<h3>BRAVO // ${state.sideAlpha === 'attack' ? 'DEFENSE' : 'ATTACK'}</h3>${bravo.map(a => row(a, 'bravo')).join('')}`;
}

function toggleScoreboard(force) {
  scoreboardOpen = typeof force === 'boolean' ? force : !scoreboardOpen;
  $('#scoreboard-modal').classList.toggle('show', scoreboardOpen);
  if (scoreboardOpen && currentState) renderScoreboard(currentState);
  if (scoreboardOpen) document.exitPointerLock?.();
}

function initScoreboard() {
  $('#btn-scoreboard').addEventListener('click', () => toggleScoreboard());
  $('#btn-sb-close').addEventListener('click', () => toggleScoreboard(false));
}

// ---------------------------------------------------------------- global input
function initGlobalKeys() {
  window.addEventListener('keydown', e => {
    if (e.repeat) return;
    const inGame = $('#screen-game').classList.contains('active');
    if (e.key === 'Tab' && inGame) { e.preventDefault(); toggleScoreboard(); }
    if (e.key === 'Escape') {
      if (chatOpen) closeChat();
      if (buyOpen) closeBuy();
      if (scoreboardOpen) toggleScoreboard(false);
      $$('.modal.show').forEach(m => m.classList.remove('show'));
    }
    if (!inGame || !game) return;
    const k = e.key.toLowerCase();
    if (k === 'b' && !chatOpen) { e.preventDefault(); if (buyOpen) closeBuy(); else openBuy(); }
    if (k === 't' && !chatOpen) { e.preventDefault(); openChat(); }
    if (k === 'v' && !chatOpen) { e.preventDefault(); toggleVoice(); }
  });
}

// ---------------------------------------------------------------- squad link
function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return 'VC-' + s;
}

function initSquad() {
  const modal = $('#squad-modal');
  $('#btn-squad').addEventListener('click', () => { sound.ui(); modal.classList.add('show'); });
  $('#btn-squad-close').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
  $$('.squad-tabs button').forEach(btn => btn.addEventListener('click', () => {
    $$('.squad-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const host = btn.dataset.squadTab === 'host';
    $('#squad-host').classList.toggle('hidden', !host);
    $('#squad-join').classList.toggle('hidden', host);
    sound.ui();
  }));
  let code = '';
  $('#btn-gen-code').addEventListener('click', () => {
    code = randomCode();
    $('#squad-code').textContent = code;
    const url = `${location.origin}${location.pathname}?room=${encodeURIComponent(code)}`;
    $('#squad-link').value = url;
    $('#squad-status').textContent = 'Room ready. Share the code or link. Real players will occupy Alpha slots; bots fill the rest.';
    sound.buy();
  });
  $('#btn-copy-link').addEventListener('click', async () => {
    const val = $('#squad-link').value;
    if (!val) return;
    try { await navigator.clipboard.writeText(val); toast('ROOM LINK COPIED', 'good'); } catch { toast('COPY FAILED', 'bad'); }
  });
  $('#btn-squad-host').addEventListener('click', () => {
    if (!code) { toast('GENERATE A ROOM CODE FIRST', 'bad'); return; }
    modal.classList.remove('show');
    startMatch({ mode: 'host' });
  });
  $('#btn-squad-join').addEventListener('click', () => {
    const join = $('#squad-join-code').value.trim().toUpperCase();
    if (!join) { toast('ENTER A ROOM CODE', 'bad'); return; }
    modal.classList.remove('show');
    startMatch({ mode: 'join', room: join });
  });
  const params = new URLSearchParams(location.search);
  if (params.get('room')) {
    modal.classList.add('show');
    $$('.squad-tabs button').forEach(b => b.classList.toggle('active', b.dataset.squadTab === 'join'));
    $('#squad-host').classList.add('hidden');
    $('#squad-join').classList.remove('hidden');
    $('#squad-join-code').value = params.get('room');
  }
}

// ---------------------------------------------------------------- game controls
function initGameControls() {
  $('#click-to-play').addEventListener('click', () => game?.requestLock());
  $('#scene').addEventListener('click', () => { if (!game?.isTouch && !buyOpen && !chatOpen) game?.requestLock(); });
  $('#btn-exit').addEventListener('click', () => {
    game?.stopLoop();
    screen('screen-menu');
    document.exitPointerLock?.();
  });
  $('#btn-rematch').addEventListener('click', () => {
    hide($('#match-end'));
    startMatch({ mode: currentMode });
  });
  $('#btn-to-menu').addEventListener('click', () => {
    hide($('#match-end'));
    screen('screen-menu');
    document.exitPointerLock?.();
  });
  $('#btn-sb-close').addEventListener('click', () => toggleScoreboard(false));

  // Mobile joystick.
  const zone = $('#joystick-zone');
  const knob = $('#joystick-knob');
  let stickId = null;
  const stickStart = e => {
    if (!game) return;
    stickId = e.pointerId;
    zone.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };
  const stickMove = e => {
    if (stickId !== e.pointerId || !game) return;
    const r = zone.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width * .36);
    let dy = (e.clientY - (r.top + r.height / 2)) / (r.height * .36);
    const len = Math.hypot(dx, dy);
    if (len > 1) { dx /= len; dy /= len; }
    knob.style.transform = `translate(${dx * 34}px,${dy * 34}px)`;
    game.setMove(dx, -dy);
  };
  const stickEnd = e => {
    if (stickId !== e.pointerId) return;
    stickId = null; knob.style.transform = ''; game?.setMove(0, 0);
  };
  zone?.addEventListener('pointerdown', stickStart);
  zone?.addEventListener('pointermove', stickMove);
  zone?.addEventListener('pointerup', stickEnd);
  zone?.addEventListener('pointercancel', stickEnd);

  // Touch look on canvas.
  let lookId = null, lastX = 0, lastY = 0;
  const canvas = $('#scene');
  canvas.addEventListener('pointerdown', e => {
    if (!game?.isTouch || e.pointerType === 'mouse') return;
    if (lookId !== null) return;
    lookId = e.pointerId; lastX = e.clientX; lastY = e.clientY;
  });
  canvas.addEventListener('pointermove', e => {
    if (lookId !== e.pointerId || !game) return;
    game.look(e.clientX - lastX, e.clientY - lastY);
    lastX = e.clientX; lastY = e.clientY;
  });
  canvas.addEventListener('pointerup', e => { if (lookId === e.pointerId) lookId = null; });
  canvas.addEventListener('pointercancel', e => { if (lookId === e.pointerId) lookId = null; });

  // Mobile buttons.
  const bindHold = (id, down, up) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('pointerdown', e => { e.preventDefault(); down(); });
    el.addEventListener('pointerup', e => { e.preventDefault(); up?.(); });
    el.addEventListener('pointercancel', () => up?.());
    el.addEventListener('pointerleave', () => up?.());
  };
  bindHold('#m-fire', () => game?.setFiring(true), () => game?.setFiring(false));
  bindHold('#m-ads', () => game?.setAds(true), () => game?.setAds(false));
  bindHold('#m-interact', () => game?.setInteract(true), () => game?.setInteract(false));
  $('#m-reload')?.addEventListener('click', () => game?.reload());
  $('#m-ability')?.addEventListener('click', () => game?.useAbility());
}

// ---------------------------------------------------------------- boot
function init() {
  startMenuCanvas();
  initAgentSelect();
  initMapSelect();
  initSettings();
  initBuy();
  initChat();
  initScoreboard();
  initGlobalKeys();
  initSquad();
  initGameControls();
  $('#btn-solo').addEventListener('click', () => { sound.init(); sound.ui(); buildMapScreen(); screen('screen-agents'); });
  $('#featured-art').innerHTML = portraitSVG(AGENT_BY_ID.nova, { crop: '10 35 340 420' });
  setTimeout(() => $('#boot').classList.add('done'), 700);
  if (game) game.sensitivity = Number($('#setting-sens').value) || 1;
}

init();

