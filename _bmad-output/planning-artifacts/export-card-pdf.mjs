/**
 * Export business card as a print-ready 2-page PDF (front + back).
 *
 * Builds the PDF from the corrected high-res PNGs (business-card-front.png /
 * business-card-back.png), so it always matches the rendered card exactly.
 *
 * Usage: node export-card-pdf.mjs
 * Output: ../../docs/business_card_new.pdf  (2 pages, each 85 × 55 mm)
 *
 * Requires: npx playwright install chromium (if not already installed)
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const toDataUri = (file) =>
  `data:image/png;base64,${readFileSync(resolve(__dirname, file)).toString('base64')}`;
const front = toDataUri('business-card-front.png');
const back = toDataUri('business-card-back.png');
const out = resolve(__dirname, '../../docs/business_card_new.pdf');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: 85mm 55mm; margin: 0; }
  html, body { margin: 0; padding: 0; }
  .pg { width: 85mm; height: 55mm; display: block; overflow: hidden; page-break-after: always; }
  .pg:last-child { page-break-after: auto; }
  img { display: block; width: 85mm; height: 55mm; object-fit: cover; }
</style></head><body>
  <div class="pg"><img src="${front}"></div>
  <div class="pg"><img src="${back}"></div>
</body></html>`;

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: out,
    preferCSSPageSize: true,
    printBackground: true,
    pageRanges: '1-2',
  });
  await browser.close();
  console.log('✓ PDF written:', out);
  console.log('  2 pages, 85 × 55 mm each (front + back)');
}

main().catch((err) => {
  console.error('PDF export failed:', err);
  process.exit(1);
});
