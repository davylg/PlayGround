// Verify player-side combat + bomb plant via direct API calls.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  window.__vc.game.timeScale = 10;
});
await page.waitForTimeout(6000);

// 1) Player shooting test: put the player face to face with an enemy bot.
const shot = await page.evaluate(() => {
  const g = window.__vc.game;
  g.roundManager.state = 'RoundActive';
  g.roundManager.roundActive = true;
  g.controlsEnabled = true;
  const enemy = g.bots.find((b) => b.team !== g.player.team && b.isAlive);
  const p = g.player;
  p.position.copy(enemy.position).add(new (p.position.constructor)(2.5, 0, 0));
  p.health = 100;
  const hpBefore = enemy.health;
  const dir = enemy.getEyePosition().sub(p.getEyePosition()).normalize();
  const res = p.weapon.tryFire(null, dir);
  return {
    fired: !!res,
    hits: (res?.hits || []).map((h) => ({ hit: h.hit, dmg: h.damage, hs: h.headshot })),
    hpBefore, hpAfter: enemy.health,
    ammo: p.weapon.ammo?.current ?? p.weapon.magazines?.[0]?.current
  };
});
console.log('PLAYER SHOT:', JSON.stringify(shot));

// 2) Player plant test: teleport player (if attacker) onto a site and hold interact.
const plant = await page.evaluate(async () => {
  const g = window.__vc.game;
  const input = window.__vc.input;
  const p = g.player;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  if (p.team !== 'attackers') return { skipped: true, team: p.team };
  // Move to nearest site center.
  const site = g.world.sites.A;
  p.position.set(site.center.x, 0, site.center.z);
  g.roundManager.state = 'RoundActive';
  g.controlsEnabled = true;
  input.interactHeld = true;
  input.enabled = true;
  const bc = g.bombController;
  const states = [];
  for (let i = 0; i < 12; i++) {
    await wait(600);
    states.push(bc.state + ':' + (bc.plantProgress / 4).toFixed(2));
    if (bc.state === 'Planted') break;
  }
  input.interactHeld = false;
  return { planted: bc.state === 'Planted', progress: states, site: site.id };
});
console.log('PLAYER PLANT:', JSON.stringify(plant));

// 3) Ability test: use active ability and check cooldown consumed.
const ability = await page.evaluate(() => {
  const g = window.__vc.game;
  const p = g.player;
  const cdBefore = p.abilities.activeCooldown;
  p.abilities.useActive();
  return { used: p.abilities.activeCooldown > cdBefore, cooldown: p.abilities.activeCooldown };
});
console.log('ABILITY:', JSON.stringify(ability));
await browser.close();
