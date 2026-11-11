// Screenshot helper with configurable timeout, viewport, and actions.
// Usage: node tools/shot.mjs <out.jpg> [w] [h] [actionsJSON]
// actionsJSON: [{click:"selector|text"}, {wait:ms}, {key:"w"}, {press:"KeyW"}, {type:"text"}]
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const [, , out, w = '1280', h = '720', actionsJson = '[]', url = 'http://localhost:3002'] = process.argv;
const width = parseInt(w, 10), height = parseInt(h, 10);
const actions = JSON.parse(actionsJson);

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width, height } });
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') console.log(`[console.${m.type()}] ${m.text()}`);
});
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
await page.goto(url, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(3000);

for (const action of actions) {
  if (action.js) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel) || [...document.querySelectorAll('button')].find((b) => b.textContent.includes(sel));
      el?.click();
    }, action.js);
  } else if (action.click) {
    try {
      await page.locator(`text=${action.click}`).first().click({ timeout: 4000, force: true });
    } catch (err) {
      await page.getByRole('button', { name: action.click }).first().click({ timeout: 4000, force: true });
    }
  } else if (action.wait) {
    await page.waitForTimeout(action.wait);
  } else if (action.press) {
    await page.keyboard.press(action.press);
  } else if (action.down) {
    await page.keyboard.down(action.down);
  } else if (action.up) {
    await page.keyboard.up(action.up);
  } else if (action.move) {
    await page.mouse.move(action.move[0], action.move[1]);
  } else if (action.wheel) {
    await page.mouse.wheel(0, action.wheel);
  }
}

await page.screenshot({ path: out, type: 'jpeg', quality: 88, fullPage: !!actions.fullPage, timeout: 25000 });
console.log('saved', out);
await browser.close();
