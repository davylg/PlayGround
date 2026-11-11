// Record bot positions frame-by-frame from inside the game loop.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
page.on('console', (m) => { if (m.type() === 'log') console.log(m.text().slice(0, 2000)); });
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  const g = window.__vc.game;
  g.timeScale = 8;
  const b0 = g.bots[0];
  window.__frames = [];
  const origUpdate = g.update.bind(g);
  let frames = [];
  g.update = (dt) => {
    const before = b0.position.clone();
    const velBefore = b0.velocity.clone();
    const dest = b0.destination ? b0.destination.clone() : null;
    const pathIdx = b0.pathIndex;
    origUpdate(dt);
    const after = b0.position.clone();
    frames.push({
      e: +g.elapsed.toFixed(2),
      before: [+before.x.toFixed(1), +before.z.toFixed(1)],
      after: [+after.x.toFixed(1), +after.z.toFixed(1)],
      vel: [+velBefore.x.toFixed(1), +velBefore.z.toFixed(1)],
      dest: dest ? [+dest.x.toFixed(0), +dest.z.toFixed(0)] : null,
      idx: pathIdx, pathLen: b0.path.length,
      target: b0.target ? b0.target.name : null
    });
    if (frames.length > 90) frames.shift();
  };
  window.__framesRef = frames;
});
await page.waitForTimeout(16000);
const frames = await page.evaluate(() => window.__framesRef);
console.log(JSON.stringify(frames.slice(0, 60), null, 0));
await browser.close();
