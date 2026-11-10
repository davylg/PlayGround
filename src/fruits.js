import * as THREE from 'three';

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------ */
/* canvas helpers                                                      */
/* ------------------------------------------------------------------ */
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function toTexture(canvas, { repeatX = 1, repeatY = 1, srgb = true } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = 4;
  return tex;
}

function rand(a, b) { return a + Math.random() * (b - a); }

function sprinkle(ctx, w, h, count, color, minR = 0.6, maxR = 2.4, alpha = 0.2) {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    ctx.globalAlpha = alpha * rand(0.4, 1);
    ctx.beginPath();
    ctx.arc(rand(0, w), rand(0, h), rand(minR, maxR), 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function vignetteRect(ctx, w, h, inner, outer) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, inner);
  g.addColorStop(0.5, 'rgba(0,0,0,0)');
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

/* ------------------------------------------------------------------ */
/* rind textures                                                       */
/* ------------------------------------------------------------------ */
function drawApple(ctx, w, h, base, light, dark) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, light);
  g.addColorStop(0.45, 'rgba(255,255,255,0)');
  g.addColorStop(1, dark);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 130; i++) {
    const x = rand(0, w);
    const wdt = rand(0.6, 3.5);
    ctx.globalAlpha = rand(0.02, 0.09);
    ctx.fillStyle = Math.random() > 0.5 ? '#ff8a7a' : '#5c0a18';
    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= h; y += 12) {
      ctx.lineTo(x + Math.sin(y * 0.05 + i) * rand(0.5, 3), y);
    }
    ctx.lineTo(x + wdt, h);
    ctx.lineTo(x + wdt, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  sprinkle(ctx, w, h, 220, '#ffd9a8', 0.4, 1.2, 0.28);
  sprinkle(ctx, w, h, 180, '#6b1220', 0.4, 1.1, 0.2);
}

function drawOrange(ctx, w, h, base) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,225,150,0.35)');
  g.addColorStop(0.5, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(150,50,0,0.35)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 900; i++) {
    const x = rand(0, w);
    const y = rand(0, h);
    const r = rand(0.6, 1.9);
    ctx.globalAlpha = rand(0.08, 0.24);
    ctx.fillStyle = '#9c4b06';
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.globalAlpha = rand(0.15, 0.4);
    ctx.fillStyle = '#ffca6c';
    ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.35, r * 0.55, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
  sprinkle(ctx, w, h, 140, '#7a3700', 0.5, 1.5, 0.18);
}

function drawWatermelon(ctx, w, h) {
  ctx.fillStyle = '#1e6f3c';
  ctx.fillRect(0, 0, w, h);
  // dark field with wavy light stripes
  for (let i = 0; i < 7; i++) {
    const cx = (i + 0.5) * (w / 7) + rand(-8, 8);
    const width = rand(34, 56);
    ctx.beginPath();
    for (let y = 0; y <= h; y += 8) {
      const x = cx + Math.sin(y * 0.055 + i * 1.7) * 16;
      if (y === 0) ctx.moveTo(x - width / 2, y);
      else ctx.lineTo(x - width / 2, y);
    }
    for (let y = h; y >= 0; y -= 8) {
      const x = cx + Math.sin(y * 0.055 + i * 1.7) * 16;
      ctx.lineTo(x + width / 2, y);
    }
    ctx.closePath();
    const g = ctx.createLinearGradient(cx - width / 2, 0, cx + width / 2, 0);
    g.addColorStop(0, '#2c8a4b');
    g.addColorStop(0.5, '#64b85e');
    g.addColorStop(1, '#2a7d43');
    ctx.fillStyle = g;
    ctx.fill();
  }
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 320; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#8ed47f' : '#0e4a27';
    ctx.globalAlpha = rand(0.05, 0.2);
    ctx.beginPath();
    ctx.ellipse(rand(0, w), rand(0, h), rand(1, 3), rand(0.5, 1.5), rand(0, TAU), 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  vignetteRect(ctx, w, h, 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.2)');
}

function drawKiwi(ctx, w, h) {
  ctx.fillStyle = '#7d5936';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 2600; i++) {
    const x = rand(0, w);
    const y = rand(0, h);
    ctx.globalAlpha = rand(0.12, 0.4);
    ctx.strokeStyle = Math.random() > 0.45 ? '#c39a68' : '#4e3420';
    ctx.lineWidth = rand(0.5, 1.2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + rand(-2, 2), y - rand(1, 4));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,230,180,0.12)');
  g.addColorStop(0.55, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(20,8,0,0.3)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawDragon(ctx, w, h) {
  ctx.fillStyle = '#e53c78';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,170,210,0.35)');
  g.addColorStop(0.55, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(100,0,40,0.35)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let row = -1; row < 11; row++) {
    const y = row * 28;
    const offset = (row % 2) * 26;
    for (let col = -1; col < 11; col++) {
      const x = col * 52 + offset;
      ctx.beginPath();
      ctx.moveTo(x - 19, y + 16);
      ctx.quadraticCurveTo(x, y - 20, x + 19, y + 16);
      ctx.quadraticCurveTo(x, y + 4, x - 19, y + 16);
      ctx.fillStyle = Math.random() > 0.35 ? '#75c64a' : '#4c9a35';
      ctx.globalAlpha = rand(0.75, 1);
      ctx.fill();
      ctx.strokeStyle = 'rgba(30,80,10,0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  sprinkle(ctx, w, h, 300, '#ffd1e4', 0.4, 1.3, 0.3);
}

function drawLemon(ctx, w, h) {
  ctx.fillStyle = '#f2cf2e';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,250,190,0.4)');
  g.addColorStop(0.5, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(160,110,0,0.35)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 650; i++) {
    const x = rand(0, w); const y = rand(0, h);
    ctx.globalAlpha = rand(0.06, 0.2);
    ctx.fillStyle = Math.random() > 0.5 ? '#fff6a8' : '#b39400';
    ctx.beginPath(); ctx.arc(x, y, rand(0.6, 1.8), 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawGolden(ctx, w, h) {
  ctx.fillStyle = '#c98f2f';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#ffe6a0');
  g.addColorStop(0.42, 'rgba(255,255,255,0)');
  g.addColorStop(1, '#8a5414');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 40; i++) {
    ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255,244,200,0.4)' : 'rgba(140,80,10,0.35)';
    ctx.lineWidth = rand(0.8, 2.5);
    ctx.beginPath();
    const y = rand(0, h);
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(w * 0.3, y + rand(-20, 20), w * 0.7, y + rand(-20, 20), w, y + rand(-8, 8));
    ctx.stroke();
  }
  sprinkle(ctx, w, h, 260, '#fff8dd', 0.5, 1.6, 0.5);
  sprinkle(ctx, w, h, 90, '#7a4610', 0.4, 1.1, 0.25);
}

const RIND_PAINTERS = {
  apple: (c, w, h) => drawApple(c, w, h, '#c2273c', 'rgba(255,120,120,0.35)', 'rgba(60,0,10,0.45)'),
  greenapple: (c, w, h) => drawApple(c, w, h, '#8cb83c', 'rgba(230,255,150,0.4)', 'rgba(30,60,0,0.4)'),
  orange: (c, w, h) => drawOrange(c, w, h, '#ec8514'),
  watermelon: drawWatermelon,
  kiwi: drawKiwi,
  dragon: drawDragon,
  lemon: drawLemon,
  golden: drawGolden,
};

/* ------------------------------------------------------------------ */
/* flesh textures                                                      */
/* ------------------------------------------------------------------ */
function fleshCanvas(def) {
  const s = 256;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  const cx = s / 2; const cy = s / 2;
  const R = s * 0.5;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R - 1, 0, TAU);
  ctx.clip();

  const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, R);
  g.addColorStop(0, def.fleshLight || def.flesh);
  g.addColorStop(0.65, def.flesh);
  g.addColorStop(1, def.fleshDeep || def.flesh);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);

  const kind = def.id;

  if (kind === 'watermelon') {
    // radial streaks
    for (let i = 0; i < 60; i++) {
      ctx.globalAlpha = rand(0.03, 0.1);
      ctx.strokeStyle = Math.random() > 0.5 ? '#ff8c9f' : '#b70030';
      ctx.lineWidth = rand(1, 4);
      ctx.beginPath();
      const a = rand(0, TAU);
      ctx.moveTo(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20);
      ctx.lineTo(cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92);
      ctx.stroke();
    }
    // seeds
    for (let i = 0; i < 13; i++) {
      const a = (i / 13) * TAU + rand(-0.14, 0.14);
      const r = R * rand(0.48, 0.7);
      drawSeed(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, rand(5, 7.5), a + Math.PI / 2);
    }
    // rind rings
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#f6f0cf';
    ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(cx, cy, R - 8, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#2d7a41';
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(cx, cy, R - 2, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#1a4a28';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, R - 0.5, 0, TAU); ctx.stroke();
  } else if (kind === 'orange' || kind === 'lemon') {
    const segments = kind === 'orange' ? 10 : 8;
    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * TAU;
      const a1 = ((i + 1) / segments) * TAU;
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = def.fleshDeep;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0 + 0.02, a1 - 0.02);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = kind === 'orange' ? 'rgba(255,255,235,0.9)' : 'rgba(255,255,240,0.92)';
    ctx.lineWidth = 6;
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * TAU;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 12, cy + Math.sin(a) * 12);
      ctx.lineTo(cx + Math.cos(a) * (R - 6), cy + Math.sin(a) * (R - 6));
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,235,0.9)';
    ctx.beginPath(); ctx.arc(cx, cy, 9, 0, TAU); ctx.fill();
    // pith rim
    ctx.strokeStyle = '#fff6d6';
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(cx, cy, R - 4, 0, TAU); ctx.stroke();
    ctx.strokeStyle = kind === 'orange' ? '#e4760c' : '#d8b415';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, R - 1, 0, TAU); ctx.stroke();
    sprinkle(ctx, s, s, 90, '#ffdda0', 0.6, 1.6, 0.25);
  } else if (kind === 'kiwi') {
    for (let i = 0; i < 70; i++) {
      const a = rand(0, TAU);
      ctx.globalAlpha = rand(0.05, 0.16);
      ctx.strokeStyle = Math.random() > 0.5 ? '#dff2a0' : '#4f7a20';
      ctx.lineWidth = rand(1, 3.2);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16);
      ctx.lineTo(cx + Math.cos(a) * R * 0.95, cy + Math.sin(a) * R * 0.95);
      ctx.stroke();
    }
    // seed halo
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * TAU + rand(-0.05, 0.05);
      const r = rand(52, 74);
      drawSeed(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, rand(2.6, 3.8), a + Math.PI / 2);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#f4f9d8';
    ctx.beginPath(); ctx.arc(cx, cy, 21, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(190,220,120,0.6)';
    ctx.beginPath(); ctx.arc(cx, cy, 28, 0, TAU); ctx.fill();
    ctx.fillStyle = '#f4f9d8';
    ctx.beginPath(); ctx.arc(cx, cy, 19, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#7a4e2a';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, TAU); ctx.stroke();
  } else if (kind === 'dragon') {
    for (let i = 0; i < 90; i++) {
      drawSeed(ctx, rand(s * 0.2, s * 0.8), rand(s * 0.2, s * 0.8), rand(1.4, 2.6), rand(0, TAU));
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#ffd6e6';
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(cx, cy, R - 8, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#e02460';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(cx, cy, R - 1, 0, TAU); ctx.stroke();
  } else {
    // apple / greenapple / golden / generic core
    for (let i = 0; i < 34; i++) {
      ctx.globalAlpha = rand(0.03, 0.08);
      ctx.strokeStyle = kind === 'golden' ? '#b07a16' : '#c9a06a';
      ctx.lineWidth = rand(0.8, 2.2);
      ctx.beginPath();
      const a = rand(0, TAU);
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // core outline
    ctx.strokeStyle = kind === 'golden' ? 'rgba(170,110,20,0.5)' : 'rgba(170,120,70,0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 10; i++) {
      const a = (i / 10) * TAU - Math.PI / 2;
      const r = i % 2 === 0 ? 34 : 22;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    drawSeed(ctx, cx - 9, cy + 8, 5.2, 0.4);
    drawSeed(ctx, cx + 9, cy + 8, 5.2, -0.4);
    ctx.strokeStyle = kind === 'golden' ? '#f7d47a' : kind === 'greenapple' ? '#b6cf62' : '#e2645a';
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, TAU); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,250,235,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, R - 8, 0, TAU); ctx.stroke();
    if (kind === 'golden') {
      sprinkle(ctx, s, s, 80, '#fff6c8', 0.7, 2, 0.5);
    }
  }

  // fine speckle overlay
  sprinkle(ctx, s, s, 120, def.fleshDeep || '#000', 0.3, 1, 0.08);
  ctx.restore();

  // soft outer shading
  const rim = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
  rim.addColorStop(0, 'rgba(0,0,0,0)');
  rim.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = rim;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();

  return c;
}

function drawSeed(ctx, x, y, size, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = 'rgba(28,16,8,0.92)';
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.52, size, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.beginPath();
  ctx.ellipse(-size * 0.14, -size * 0.25, size * 0.16, size * 0.38, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* fruit definitions                                                   */
/* ------------------------------------------------------------------ */
export const FRUIT_DEFS = {
  apple: {
    id: 'apple', label: 'APPLE', radius: 0.82, points: 10, weight: 18,
    shape: [1, 0.94, 1], leaf: true, leafColor: 0x4f9c3a,
    flesh: '#f6e6c4', fleshLight: '#fff8e4', fleshDeep: '#d9b98a', rim: 0xe0435a,
  },
  greenapple: {
    id: 'greenapple', label: 'GREEN APPLE', radius: 0.78, points: 12, weight: 12,
    shape: [1, 0.95, 1], leaf: true, leafColor: 0x4f9c3a,
    flesh: '#eef7cf', fleshLight: '#fbffe7', fleshDeep: '#c7db92', rim: 0x8fbf44,
  },
  orange: {
    id: 'orange', label: 'ORANGE', radius: 0.8, points: 10, weight: 18,
    shape: [1, 0.97, 1], leaf: true, leafColor: 0x3f8a3a,
    flesh: '#ffac45', fleshLight: '#ffd98a', fleshDeep: '#e97b13', rim: 0xf08a18,
  },
  lemon: {
    id: 'lemon', label: 'LEMON', radius: 0.72, points: 14, weight: 12,
    shape: [0.94, 1.08, 0.94], leaf: true, leafColor: 0x4f9c3a,
    flesh: '#ffe58c', fleshLight: '#fff9c9', fleshDeep: '#e0bd45', rim: 0xe8c522,
  },
  watermelon: {
    id: 'watermelon', label: 'WATERMELON', radius: 1.08, points: 6, weight: 13,
    shape: [1.04, 0.94, 1.02], leaf: false,
    flesh: '#ff3d5c', fleshLight: '#ff738a', fleshDeep: '#c81438', rim: 0x2f8a4c,
  },
  kiwi: {
    id: 'kiwi', label: 'KIWI', radius: 0.72, points: 14, weight: 11,
    shape: [1, 1.12, 1], leaf: false,
    flesh: '#a8cf4b', fleshLight: '#e2f59c', fleshDeep: '#6d9a26', rim: 0x7d5936,
  },
  dragon: {
    id: 'dragon', label: 'DRAGON FRUIT', radius: 0.9, points: 18, weight: 7,
    shape: [0.96, 1.1, 0.96], leaf: false,
    flesh: '#f8eff5', fleshLight: '#ffffff', fleshDeep: '#e6cfe0', rim: 0xe53c78,
  },
  golden: {
    id: 'golden', label: 'GOLDEN FRUIT', radius: 0.76, points: 60, weight: 0,
    shape: [1, 1, 1], leaf: true, leafColor: 0xd8b64a,
    flesh: '#ffe6a0', fleshLight: '#fff8d8', fleshDeep: '#d9a83c', rim: 0xffc95e,
    special: true,
  },
};

/* ------------------------------------------------------------------ */
/* splat + glow helpers                                                */
/* ------------------------------------------------------------------ */
export function makeSplatTexture() {
  const s = 128;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, s, s);
  ctx.translate(s / 2, s / 2);
  const blob = (x, y, r, a) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(0.65, `rgba(255,255,255,${a * 0.7})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  };
  blob(0, 0, 34, 0.95);
  for (let i = 0; i < 18; i++) {
    const a = rand(0, TAU);
    const d = rand(18, 58);
    blob(Math.cos(a) * d, Math.sin(a) * d, rand(2, 8), rand(0.45, 0.9));
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

export function makeGlowTexture() {
  const s = 128;
  const c = makeCanvas(s, s);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,240,200,0.8)');
  g.addColorStop(0.5, 'rgba(255,180,90,0.24)');
  g.addColorStop(1, 'rgba(255,150,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* leaf geometry */
function makeLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.12, 0.05, 0.24, 0.16, 0.28, 0.34);
  shape.bezierCurveTo(0.22, 0.3, 0.12, 0.24, 0, 0.12);
  shape.bezierCurveTo(-0.12, 0.24, -0.22, 0.3, -0.28, 0.34);
  shape.bezierCurveTo(-0.24, 0.16, -0.12, 0.05, 0, 0);
  const geo = new THREE.ShapeGeometry(shape, 8);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/* ------------------------------------------------------------------ */
/* factory                                                             */
/* ------------------------------------------------------------------ */
export class FruitFactory {
  constructor() {
    this.rindTextures = {};
    this.fleshTextures = {};
    this.materials = {};
    this.bumpTexture = null;
    this.geometries = new Map();
    this.halfGeometries = new Map();
    this.halfMaterials = {};
    this.splatTexture = makeSplatTexture();
    this.glowTexture = makeGlowTexture();
    this.leafGeometry = makeLeafGeometry();
    this.stemGeometry = new THREE.CylinderGeometry(0.026, 0.04, 0.2, 6, 1);
    this.leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a9638, roughness: 0.65, metalness: 0,
      side: THREE.DoubleSide, emissive: 0x0d2b08, emissiveIntensity: 0.5,
    });
    this.stemMaterial = new THREE.MeshStandardMaterial({ color: 0x51301a, roughness: 0.9 });
    this.bombBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x131018, roughness: 0.32, metalness: 0.72,
      emissive: 0x2a0508, emissiveIntensity: 0.6,
    });
    this.bombBandMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3344, roughness: 0.35, metalness: 0.2,
      emissive: 0xff2030, emissiveIntensity: 2.2,
    });
    this.bombFuseMaterial = new THREE.MeshStandardMaterial({ color: 0x5c452e, roughness: 0.95 });
    this.bombSparkMaterial = new THREE.SpriteMaterial({
      map: this.glowTexture, color: 0xffc36a, blending: THREE.AdditiveBlending,
      transparent: true, depthWrite: false, opacity: 0.95,
    });
    this.goldGlowMaterial = new THREE.SpriteMaterial({
      map: this.glowTexture, color: 0xffc860, blending: THREE.AdditiveBlending,
      transparent: true, depthWrite: false, opacity: 0.55,
    });

    this._buildBump();

    // Pre-generate everything so first spawn never hitches.
    for (const id of Object.keys(FRUIT_DEFS)) {
      this._prepare(id);
    }
  }

  _buildBump() {
    const w = 256; const h = 128;
    const c = makeCanvas(w, h);
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 18000; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},255,0.05)`;
      ctx.fillRect(rand(0, w), rand(0, h), rand(0.5, 2), rand(0.5, 2));
    }
    const tex = toTexture(c, { srgb: false });
    this.bumpTexture = tex;
  }

  _prepare(id) {
    if (this.rindTextures[id]) return;
    const def = FRUIT_DEFS[id];
    const c = makeCanvas(512, 256);
    RIND_PAINTERS[id](c.getContext('2d'), 512, 256);
    this.rindTextures[id] = toTexture(c);

    const fc = fleshCanvas(def);
    this.fleshTextures[id] = toTexture(fc);

    const isGolden = id === 'golden';
    const material = new THREE.MeshStandardMaterial({
      map: this.rindTextures[id],
      bumpMap: this.bumpTexture,
      bumpScale: 0.012,
      roughness: isGolden ? 0.26 : 0.46,
      metalness: isGolden ? 0.5 : 0.02,
      emissive: isGolden ? 0xffb347 : 0x000000,
      emissiveIntensity: isGolden ? 0.32 : 0,
      envMapIntensity: 0.45,
    });
    this.materials[id] = material;

    const fleshMaterial = new THREE.MeshStandardMaterial({
      map: this.fleshTextures[id],
      roughness: 0.52,
      metalness: 0,
      emissive: isGolden ? 0x6b3f00 : 0x000000,
      emissiveIntensity: isGolden ? 0.25 : 0,
      side: THREE.DoubleSide,
    });
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: def.rim, roughness: 0.55, metalness: 0.01,
      side: THREE.DoubleSide, emissive: isGolden ? 0x8a5a10 : 0x000000,
      emissiveIntensity: isGolden ? 0.4 : 0,
    });
    this.halfMaterials[id] = { flesh: fleshMaterial, rim: rimMaterial };
  }

  _sphereGeo(radius) {
    const key = radius.toFixed(3);
    let geo = this.geometries.get(key);
    if (!geo) {
      geo = new THREE.SphereGeometry(radius, 28, 20);
      this.geometries.set(key, geo);
    }
    return geo;
  }

  _halfGeos(radius) {
    const key = radius.toFixed(3);
    let pack = this.halfGeometries.get(key);
    if (!pack) {
      pack = {
        dome: new THREE.SphereGeometry(radius, 30, 18, Math.PI, Math.PI),
        cap: new THREE.CircleGeometry(radius * 0.975, 40),
        rim: new THREE.TorusGeometry(radius * 0.975, radius * 0.028, 8, 44),
      };
      this.halfGeometries.set(key, pack);
    }
    return pack;
  }

  createFruit(typeId, scale = 1) {
    const def = FRUIT_DEFS[typeId];
    this._prepare(typeId);
    const group = new THREE.Group();
    const radius = def.radius * scale * rand(0.94, 1.06);

    const mesh = new THREE.Mesh(this._sphereGeo(radius), this.materials[typeId]);
    mesh.scale.set(def.shape[0], def.shape[1], def.shape[2]);
    group.add(mesh);

    if (def.leaf) {
      const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
      stem.position.set(radius * 0.1, radius * def.shape[1] * 0.97, 0);
      stem.rotation.z = -0.28;
      stem.scale.setScalar(radius * 1.3);
      group.add(stem);

      const leaf = new THREE.Mesh(this.leafGeometry, this.leafMaterial);
      leaf.position.set(radius * 0.24, radius * def.shape[1] * 1.0, 0);
      leaf.rotation.set(rand(-0.3, 0.3), rand(-0.5, 0.5), rand(-0.5, -0.1));
      leaf.scale.setScalar(radius * 0.95);
      group.add(leaf);
    } else if (def.id === 'dragon') {
      const stem = new THREE.Mesh(this.stemGeometry, this.stemMaterial);
      stem.position.set(0, radius * 1.02, 0);
      stem.scale.setScalar(radius * 1.1);
      group.add(stem);
    }

    if (def.special) {
      const glow = new THREE.Sprite(this.goldGlowMaterial.clone());
      glow.scale.setScalar(radius * 5.6);
      glow.material.opacity = 0.5;
      group.add(glow);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 1.5, radius * 0.018, 6, 60),
        new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }),
      );
      ring.rotation.x = rand(0.3, 0.9);
      ring.rotation.y = rand(0.3, 0.9);
      group.add(ring);
      group.userData.ring = ring;
      group.userData.glow = glow;
    }

    group.userData.radius = radius;
    group.userData.def = def;
    group.userData.spin = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize();
    group.userData.spinSpeed = rand(0.5, 1.4);
    return { group, radius, def };
  }

  createBomb(scale = 1) {
    const group = new THREE.Group();
    const radius = 0.82 * scale;

    const body = new THREE.Mesh(new THREE.SphereGeometry(radius, 26, 20), this.bombBodyMaterial);
    group.add(body);

    const band = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.99, radius * 0.07, 8, 44),
      this.bombBandMaterial,
    );
    band.rotation.x = Math.PI / 2;
    group.add(band);

    const band2 = band.clone();
    band2.rotation.set(0.5, 0.3, Math.PI / 2);
    band2.scale.setScalar(0.92);
    group.add(band2);

    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.28, 6), this.bombFuseMaterial);
    fuse.position.set(radius * 0.26, radius + 0.12, 0);
    fuse.rotation.z = -0.5;
    group.add(fuse);

    const spark = new THREE.Sprite(this.bombSparkMaterial.clone());
    spark.position.set(radius * 0.42, radius + 0.22, 0);
    spark.scale.setScalar(0.7);
    group.add(spark);
    group.userData.spark = spark;

    const glow = new THREE.Sprite(this.goldGlowMaterial.clone());
    glow.material.color.setHex(0xff3322);
    glow.position.copy(spark.position);
    glow.scale.setScalar(1.9);
    glow.material.opacity = 0.5;
    group.add(glow);
    group.userData.glow = glow;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.25, 0.012, 5, 48),
      new THREE.MeshBasicMaterial({ color: 0xff4d5e, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);
    group.userData.ring = ring;

    group.userData.radius = radius;
    group.userData.spin = new THREE.Vector3(rand(-0.6, 0.6), rand(-0.6, 0.6), 0);
    group.userData.spinSpeed = 0.8;
    group.userData.isBomb = true;
    return { group, radius, def: null };
  }

  createHalves(typeId, radius, cutAngle) {
    this._prepare(typeId);
    const pack = this._halfGeos(Number(radius.toFixed(3)));
    const mats = this.halfMaterials[typeId];
    const halves = [];
    for (let i = 0; i < 2; i++) {
      const g = new THREE.Group();
      const dome = new THREE.Mesh(pack.dome, this.materials[typeId]);
      dome.scale.copy(new THREE.Vector3(...FRUIT_DEFS[typeId].shape));
      g.add(dome);

      const cap = new THREE.Mesh(pack.cap, mats.flesh);
      cap.position.z = 0.004;
      g.add(cap);

      const rim = new THREE.Mesh(pack.rim, mats.rim);
      rim.position.z = 0.002;
      g.add(rim);

      // Tilt the cut face toward the camera to show the juicy cross-section.
      const side = i === 0 ? 1 : -1;
      g.rotation.x = rand(-0.16, 0.16);
      g.rotation.y = side * rand(0.16, 0.34);
      g.rotation.z = rand(-0.12, 0.12);
      g.scale.setScalar(rand(0.97, 1.03));

      const normal = new THREE.Vector3(-Math.sin(cutAngle), Math.cos(cutAngle), 0);
      const dir = i === 0 ? 1 : -1;
      halves.push({
        group: g,
        velocity: new THREE.Vector3(normal.x * dir * rand(1.6, 3.4), normal.y * dir * rand(1.6, 3.4) + 1.8, 0),
        spin: new THREE.Vector3(rand(-3, 3), rand(-3, 3), rand(-4, 4)),
        age: 0,
        side,
      });
    }
    return halves;
  }
}
