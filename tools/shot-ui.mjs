// In-game settings modal check.
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
  window.__vc.game.timeScale = 4;
});
await page.waitForTimeout(5000);
const r = await page.evaluate(() => {
  window.__vc.menu.openSettings();
  const m = document.getElementById('settings-modal');
  return { open: m.classList.contains('open'), gameRootVisible: getComputedStyle(document.getElementById('game-root')).display };
});
console.log(JSON.stringify(r));
await page.waitForTimeout(700);
await page.screenshot({ path: 'screenshots/settings2.jpg', type: 'jpeg', quality: 88, timeout: 25000 });
console.log('done');
await browser.close();
