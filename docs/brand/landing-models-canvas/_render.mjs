import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pages = [
  'modelo-01-territorio-legivel',
  'modelo-02-sala-de-decisao',
  'modelo-03-dossie-cadastral',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const name of pages) {
  const url = 'file://' + join(__dirname, name + '.html');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  // size viewport to the .page element so full-page capture is exact
  const box = await page.locator('.page').boundingBox();
  await page.setViewportSize({ width: 1440, height: Math.ceil(box.height) });
  await page.waitForTimeout(120);
  await page.locator('.page').screenshot({ path: join(__dirname, name + '.png') });
  console.log('rendered', name, '→', Math.ceil(box.height) + 'px');
}

await browser.close();
