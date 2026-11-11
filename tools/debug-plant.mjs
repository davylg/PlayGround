// Trace attacker site proximity and plant attempts.
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
let minD = 999;
for (let i = 0; i < 14; i++) {
  await page.waitForTimeout(4500);
  const info = await page.evaluate(() => {
    const { game } = window.__vc;
    const bc = game.bombController;
    const atk = game.bots.filter((b) => b.team === 'attackers' && b.isAlive).map((b) => {
      const s = game.world.sites[b.site];
      const d = +b.position.distanceTo(s.center).toFixed(1);
      return `${b.name} site${b.site} d=${d} inSite=${!!bc.getSiteAt(b.position)} tgt=${b.target ? b.target.name : '-'} path=${b.path.length} idx=${b.pathIndex}`;
    });
    return {
      t: +game.elapsed.toFixed(0),
      bomb: bc.state,
      planter: bc.botPlanter?.name || null,
      prog: +bc.plantProgress.toFixed(1),
      minD: Math.min(...game.bots.filter((b) => b.team === 'attackers').map((b) => Math.min(b.position.distanceTo(game.world.sites.A.center), b.position.distanceTo(game.world.sites.B.center)))).toFixed(1),
      atk
    };
  });
  console.log(JSON.stringify(info, null, 0));
}
await browser.close();
