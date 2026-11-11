// Watch bot healths during combat to verify damage lands.
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
for (let i = 0; i < 10; i++) {
  await page.waitForTimeout(4000);
  const info = await page.evaluate(() => {
    const { game } = window.__vc;
    const pairs = [];
    for (const b of game.bots) {
      if (!b.target || !b.target.isAlive) continue;
      const d = +b.position.distanceTo(b.target.position).toFixed(1);
      pairs.push(`${b.name}->${b.target.name} d=${d} hp=${b.health}/${b.target.health} am=${b.weapon.ammo?.current} rel=${!!b.weapon.reloading} trig=${b.weapon.triggerHeld}`);
    }
    return { t: +game.elapsed.toFixed(0), pairs };
  });
  console.log(JSON.stringify(info, null, 0));
}
await browser.close();
