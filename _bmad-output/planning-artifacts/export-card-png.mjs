/**
 * Export business card front and back as print-quality PNGs.
 *
 * Usage: node export-card-png.mjs
 *
 * Output:
 *   business-card-front.png  (1004 × 650 px — 85×55mm at 300 DPI)
 *   business-card-back.png   (1004 × 650 px)
 *
 * Requires: npx playwright install chromium (if not already installed)
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'business-card.html');
const outputDir = __dirname;

// 85mm × 55mm at 300 DPI
const CARD_WIDTH_PX = Math.round(85 * 300 / 25.4);   // 1004
const CARD_HEIGHT_PX = Math.round(55 * 300 / 25.4);   // 650
const SCALE = CARD_WIDTH_PX / (85 * 3.7795275591);     // CSS px to 300dpi ratio ≈ 3.125

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    deviceScaleFactor: SCALE,
    viewport: { width: 1200, height: 800 },
  });

  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

  // Wait for fonts and images
  await page.waitForTimeout(1500);

  // Screenshot front card
  const front = page.locator('#card-front-source');
  await front.screenshot({
    path: resolve(outputDir, 'business-card-front.png'),
    type: 'png',
  });
  console.log('✓ business-card-front.png exported');

  // Screenshot back card
  const back = page.locator('#card-back-source');
  await back.screenshot({
    path: resolve(outputDir, 'business-card-back.png'),
    type: 'png',
  });
  console.log('✓ business-card-back.png exported');

  await browser.close();

  console.log(`\nDone. Files saved to:\n  ${outputDir}`);
  console.log(`Resolution: ${CARD_WIDTH_PX} × ${CARD_HEIGHT_PX} px (300 DPI at 85×55mm)`);
}

main().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
