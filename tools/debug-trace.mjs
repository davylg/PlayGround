// Trace who calls resetRound / bot teleports.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
page.on('console', (m) => console.log(`[${m.type()}] ${m.text().slice(0, 500)}`));
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  const g = window.__vc.game;
  g.timeScale = 20;
  let n = 0;
  const orig = g.resetRound.bind(g);
  g.resetRound = (...a) => {
    n++;
    if (n < 8) console.log(`resetRound call #${n} at elapsed=${g.elapsed.toFixed(1)} stack: ${(new Error().stack || '').split('\n').slice(1, 4).join(' <= ')}`);
    return orig(...a);
  };
  let m = 0;
  const bots = [];
  // Track bot position teleports by wrapping World.moveCircle revert behavior indirectly:
  const b0 = g.bots[0];
  let prev = b0.position.clone();
  window.__track = setInterval(() => {
    const d = b0.position.distanceTo(prev);
    if (d > 6) console.log(`TELEPORT ${d.toFixed(1)}m at elapsed=${g.elapsed.toFixed(1)} from ${prev.x.toFixed(1)},${prev.z.toFixed(1)} to ${b0.position.x.toFixed(1)},${b0.position.z.toFixed(1)}`);
    prev.copy(b0.position);
  }, 200);
});
await page.waitForTimeout(12000);
await browser.close();
