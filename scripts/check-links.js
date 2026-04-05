/**
 * Internal Link Checker
 * Crawls all generated HTML in dist/client and verifies every internal <a href> resolves.
 * Run after `npm run build`: node scripts/check-links.js
 */
import { readdir, readFile, access } from 'fs/promises';
import { join, relative } from 'path';

const DIST_DIR = 'dist/client';
const IGNORE_PREFIXES = ['mailto:', 'tel:', 'http://', 'https://', '#', 'javascript:'];
const IGNORE_PATHS = ['/api/', '/_astro/'];
const ASSET_EXTENSIONS = ['.css', '.js', '.mjs', '.woff', '.woff2', '.ttf', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.xml', '.json', '.txt'];

async function findHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function isAsset(href) {
  const path = href.split('?')[0].split('#')[0];
  return ASSET_EXTENSIONS.some(ext => path.endsWith(ext));
}

function extractLinks(html) {
  const links = [];
  // Only match <a> tag hrefs, not <link>, <script>, etc.
  const regex = /<a\s[^>]*?href\s*=\s*"([^"]*?)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function normalizeRoute(href) {
  // Strip query string and hash
  let path = href.split('?')[0].split('#')[0];
  // Ensure trailing slash for directory routes
  if (path !== '/' && !path.endsWith('/') && !path.includes('.')) {
    path += '/';
  }
  return path;
}

async function main() {
  // Verify build output exists
  try {
    await access(DIST_DIR);
  } catch {
    console.error(`Error: "${DIST_DIR}" not found. Run "npm run build" first.`);
    process.exit(1);
  }

  // Build the set of known routes
  const htmlFiles = await findHtmlFiles(DIST_DIR);
  const knownRoutes = new Set();

  for (const file of htmlFiles) {
    let route = '/' + relative(DIST_DIR, file).replace(/\\/g, '/');
    // /index.html -> /
    // /about/index.html -> /about/
    route = route.replace(/\/index\.html$/, '/');
    // Non-index .html files (e.g., 404.html -> /404/)
    if (route.endsWith('.html')) {
      route = route.replace(/\.html$/, '/');
    }
    knownRoutes.add(route);
  }

  // Also add static assets (don't need to check these)
  knownRoutes.add('/');

  console.log(`Found ${knownRoutes.size} routes in ${DIST_DIR}\n`);

  // Check all internal links
  const broken = [];
  let totalLinks = 0;
  let checkedLinks = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf-8');
    const links = extractLinks(html);
    const sourcePage = '/' + relative(DIST_DIR, file).replace(/\\/g, '/').replace(/\/index\.html$/, '/');

    for (const href of links) {
      totalLinks++;

      // Skip external, special, empty, and asset links
      if (!href || href === '') continue;
      if (IGNORE_PREFIXES.some(p => href.startsWith(p))) continue;
      if (IGNORE_PATHS.some(p => href.startsWith(p))) continue;
      if (isAsset(href)) continue;

      checkedLinks++;
      const normalized = normalizeRoute(href);

      if (!knownRoutes.has(normalized)) {
        broken.push({ source: sourcePage, href, normalized });
      }
    }
  }

  console.log(`Checked ${checkedLinks} internal links (${totalLinks} total href attributes)\n`);

  if (broken.length === 0) {
    console.log('✅ All internal links resolve correctly!');
  } else {
    console.log(`❌ Found ${broken.length} broken internal links:\n`);

    // Group by target
    const byTarget = {};
    for (const { source, href, normalized } of broken) {
      const key = normalized;
      if (!byTarget[key]) byTarget[key] = [];
      byTarget[key].push({ source, href });
    }

    for (const [target, sources] of Object.entries(byTarget).sort()) {
      console.log(`  ${target}`);
      for (const { source, href } of sources) {
        console.log(`    ← ${source} (href="${href}")`);
      }
      console.log('');
    }
  }

  process.exit(broken.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(2);
});
