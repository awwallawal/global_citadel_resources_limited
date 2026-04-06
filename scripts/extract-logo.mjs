import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

async function makeTransparent() {
  const imgPath = path.resolve('docs/extract_logo.png');
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  const dataUrl = `data:image/png;base64,${imgBase64}`;

  console.log('Launching browser for image processing...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(`<!DOCTYPE html><html><body><canvas id="c"></canvas></body></html>`);

  const results = await page.evaluate(async (src) => {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });

    const w = img.width;
    const h = img.height;
    const canvas = document.getElementById('c');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const px = imgData.data;

    // ---- FLOOD FILL FROM EDGES ----
    const visited = new Uint8Array(w * h);
    const isBackground = new Uint8Array(w * h);

    // Background detection: generous threshold
    // The shield body is VERY dark (avg ~45-60) while the surrounding bg is lighter gray (avg ~130-200+)
    // But at the shield edges there's anti-aliasing creating mid-tones
    // Strategy: flood through anything with avg > 75 (stops at shield body)
    function canFlood(pixelIdx) {
      const r = px[pixelIdx], g = px[pixelIdx+1], b = px[pixelIdx+2], a = px[pixelIdx+3];
      if (a < 10) return true;
      const avg = (r + g + b) / 3;
      // The shield body is dark charcoal ~45-65 avg
      // Background is lighter gray ~130-210+
      // Anti-aliased edge pixels are ~70-120
      // We flood through anything avg > 85 to catch edge AA pixels too
      if (avg > 85) return true;
      return false;
    }

    // Seed from all edge pixels
    const queue = [];
    for (let x = 0; x < w; x++) {
      queue.push(x);              // top
      queue.push((h-1) * w + x);  // bottom
    }
    for (let y = 0; y < h; y++) {
      queue.push(y * w);          // left
      queue.push(y * w + w - 1);  // right
    }

    // BFS
    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      if (pos < 0 || pos >= w * h || visited[pos]) continue;
      visited[pos] = 1;
      if (!canFlood(pos * 4)) continue;
      isBackground[pos] = 1;

      const x = pos % w, y = Math.floor(pos / w);
      if (x > 0) queue.push(pos - 1);
      if (x < w-1) queue.push(pos + 1);
      if (y > 0) queue.push(pos - w);
      if (y < h-1) queue.push(pos + w);
      // Diagonals for better edge coverage
      if (x > 0 && y > 0) queue.push(pos - w - 1);
      if (x < w-1 && y > 0) queue.push(pos - w + 1);
      if (x > 0 && y < h-1) queue.push(pos + w - 1);
      if (x < w-1 && y < h-1) queue.push(pos + w + 1);
    }

    // Apply transparency
    let bgCount = 0;
    for (let i = 0; i < w * h; i++) {
      if (isBackground[i]) {
        px[i*4+3] = 0;
        bgCount++;
      }
    }

    // Edge softening: pixels bordering transparency get alpha blended
    for (let y = 1; y < h-1; y++) {
      for (let x = 1; x < w-1; x++) {
        const i = y * w + x;
        if (isBackground[i]) continue;
        const idx = i * 4;
        if (px[idx+3] === 0) continue;

        // Count transparent neighbors (8-connected)
        let tCount = 0;
        const offsets = [-w-1,-w,-w+1,-1,1,w-1,w,w+1];
        for (const off of offsets) {
          if (px[(i+off)*4+3] === 0) tCount++;
        }
        if (tCount > 0 && tCount <= 6) {
          // Soften alpha proportionally
          px[idx+3] = Math.round(px[idx+3] * (1 - tCount * 0.1));
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // ---- AUTO TRIM ----
    const finalData = ctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (finalData[(y*w+x)*4+3] > 5) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    const pad = 4;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w-1, maxX + pad);
    maxY = Math.min(h-1, maxY + pad);
    const trimW = maxX - minX + 1;
    const trimH = maxY - minY + 1;

    const trimCanvas = document.createElement('canvas');
    trimCanvas.width = trimW;
    trimCanvas.height = trimH;
    trimCanvas.getContext('2d').drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

    // ---- SIZE VARIANTS (downscale only — no upscaling to avoid blur) ----
    const outputs = {};
    const nativeMax = Math.max(trimW, trimH);

    // Native resolution (full quality)
    outputs['native'] = {
      dataUrl: trimCanvas.toDataURL('image/png'),
      w: trimW, h: trimH, label: 'native'
    };

    // Only create sizes smaller than native
    const sizes = [128, 64, 48, 32];
    for (const size of sizes) {
      if (size >= nativeMax) continue;
      const ratio = size / nativeMax;
      const sw = Math.round(trimW * ratio);
      const sh = Math.round(trimH * ratio);
      const sc = document.createElement('canvas');
      sc.width = sw; sc.height = sh;
      const sctx = sc.getContext('2d');
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = 'high';
      sctx.drawImage(trimCanvas, 0, 0, trimW, trimH, 0, 0, sw, sh);
      outputs[size] = { dataUrl: sc.toDataURL('image/png'), w: sw, h: sh, label: `${size}px` };
    }

    return { bgCount, total: w*h, trimW, trimH, nativeMax, outputs };
  }, dataUrl);

  console.log(`Background removed: ${results.bgCount}/${results.total} pixels`);
  console.log(`Trimmed to: ${results.trimW}x${results.trimH} (native)`);

  // Save all outputs
  for (const [key, data] of Object.entries(results.outputs)) {
    const filename = key === 'native'
      ? 'logo-legacy-transparent.png'
      : `logo-legacy-${key}.png`;
    fs.writeFileSync(
      path.join('docs', filename),
      Buffer.from(data.dataUrl.split(',')[1], 'base64')
    );
    console.log(`  ${filename} — ${data.w}x${data.h}`);
  }

  await browser.close();

  console.log('\n=== RESULTS ===');
  console.log(`Source resolution: ${results.trimW}x${results.trimH}`);
  console.log(`Only downscaled sizes produced (no upscaling = no blur)`);
  console.log(`\nFor print-quality (business cards, letterhead), the source`);
  console.log(`is ~190px which is too small. Options:`);
  console.log(`  1. Ask client for higher-res logo file`);
  console.log(`  2. SVG trace for infinite scalability`);
  console.log(`  3. AI upscale (external tool)`);
}

makeTransparent().catch(console.error);
