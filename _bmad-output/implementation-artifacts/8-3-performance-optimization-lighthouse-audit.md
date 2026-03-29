# Story 8.3: Performance Optimization & Lighthouse Audit

Status: ready-for-dev

## Story

As a **visitor on a mobile device with constrained bandwidth**,
I want the platform to load fast and feel responsive,
So that I perceive GRCL as a business that respects my time and context.

## Acceptance Criteria

1. All key pages achieve Lighthouse 90+ across Performance, Accessibility, SEO, Best Practices on mobile
2. First Contentful Paint under 1.5s on simulated 4G
3. Largest Contentful Paint under 2.5s on simulated 4G
4. Cumulative Layout Shift under 0.1
5. Initial page weight under 500KB for key pages
6. All images optimized via Astro Image/Picture with WebP/AVIF conversion
7. Below-fold sections are lazy-loaded
8. Only interactive islands ship JavaScript (zero JS for static pages without islands)
9. Fonts load with `font-display: swap` and critical weights preloaded

## Tasks / Subtasks

- [ ] Task 1: Run baseline Lighthouse audit on key pages (AC: #1)
  - [ ] 1.1 Install Lighthouse CI: `npm install -D @lhci/cli`
  - [ ] 1.2 Add `"lighthouse": "lhci autorun"` script to package.json
  - [ ] 1.3 Build production site: `npm run build`
  - [ ] 1.4 Run Lighthouse on: homepage, division detail (crop-farming), insights hub, contact general, about, search
  - [ ] 1.5 Record baseline scores for Performance, Accessibility, SEO, Best Practices
  - [ ] 1.6 Identify pages scoring below 90 in any category

- [ ] Task 2: Optimize images (AC: #5, #6)
  - [ ] 2.1 Audit all `<img>` tags — replace with Astro `<Image>` or `<Picture>` components
  - [ ] 2.2 Configure build-time WebP/AVIF conversion via Astro's image service
  - [ ] 2.3 Add `width`/`height` attributes to all images to prevent CLS
  - [ ] 2.4 Add `loading="lazy"` to below-fold images
  - [ ] 2.5 Verify favicon.svg is optimized (small SVG, no bloat)
  - [ ] 2.6 Verify OG images are appropriately sized (1200x630 recommended)

- [ ] Task 3: Optimize font loading (AC: #9)
  - [ ] 3.1 Verify `font-display: swap` on all @fontsource imports (enabled by default)
  - [ ] 3.2 Preload critical font files: Poppins 600 (headings) and Inter Variable (body)
  - [ ] 3.3 Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for critical weights
  - [ ] 3.4 Confirm JetBrains Mono is NOT preloaded — code font is rare and below-fold, preloading wastes bandwidth on constrained networks
  - [ ] 3.5 Verify no Flash of Invisible Text (FOIT) — text renders with fallback immediately

- [ ] Task 4: Verify zero-JS on static pages (AC: #8)
  - [ ] 4.1 Build and inspect output for pages WITHOUT islands (privacy-policy, terms, sitemap, divisions hub)
  - [ ] 4.2 Verify no `<script>` tags in HTML output for these pages
  - [ ] 4.3 Verify pages WITH islands only ship the island JS (homepage → StatCounter, contact → InquiryForm, etc.)
  - [ ] 4.4 Audit section fade-in animation implementation: confirm animations use CSS-only (e.g., scroll-driven animations) OR if IntersectionObserver vanilla JS exists, account for it as an acceptable inline exception and document the JS size
  - [ ] 4.5 Check bundle sizes for each island component

- [ ] Task 5: Optimize page weight (AC: #5)
  - [ ] 5.1 Measure total transfer size for each key page
  - [ ] 5.2 Target: <500KB initial load (HTML + CSS + fonts + above-fold assets)
  - [ ] 5.3 Verify Tailwind CSS purging removes unused styles (Tailwind v4 handles this automatically via Vite)
  - [ ] 5.4 Check for unnecessary dependencies inflating bundle
  - [ ] 5.5 Verify no duplicate CSS from shadcn/ui imports

- [ ] Task 6: Optimize Largest Contentful Paint (AC: #3)
  - [ ] 6.1 Identify LCP element on each key page (usually hero heading or hero image)
  - [ ] 6.2 Ensure LCP element is in initial HTML (not client-rendered)
  - [ ] 6.3 Preload LCP image if applicable: `<link rel="preload" as="image">`
  - [ ] 6.4 Add `fetchpriority="high"` to the LCP `<img>` element on each key page (tells browser to prioritize this fetch)
  - [ ] 6.5 Ensure hero section renders without waiting for JS hydration

- [ ] Task 7: Optimize Cumulative Layout Shift (AC: #4)
  - [ ] 7.1 Verify all images have explicit `width`/`height` or `aspect-ratio`
  - [ ] 7.2 Verify fonts don't cause layout shift (font-display: swap + similar metrics)
  - [ ] 7.3 Verify header height is fixed (64px) — no shift on scroll state change
  - [ ] 7.4 Verify no content injection after hydration causes shift

- [ ] Task 8: Lazy-load below-fold content (AC: #7)
  - [ ] 8.1 Verify `client:visible` islands (StatCounter, InquiryForm) only hydrate on scroll
  - [ ] 8.2 Verify `client:idle` islands (SearchOverlay, AnchorNavClient) hydrate after page idle
  - [ ] 8.3 Add `loading="lazy"` to any below-fold images not already lazy
  - [ ] 8.4 Verify no above-fold content uses lazy loading (hero must be eager)

- [ ] Task 9: Run final Lighthouse audit and verify targets (AC: #1, #2, #3, #4)
  - [ ] 9.1 Run Lighthouse on all 6 key pages with mobile simulation
  - [ ] 9.2 Verify all scores 90+ (Performance, Accessibility, SEO, Best Practices)
  - [ ] 9.3 Verify FCP < 1.5s on simulated 4G
  - [ ] 9.4 Verify LCP < 2.5s on simulated 4G
  - [ ] 9.5 Verify CLS < 0.1
  - [ ] 9.6 Document final scores in Dev Agent Record
  - [ ] 9.7 Fix any remaining issues until all targets met

## Dev Notes

### Key Pages for Lighthouse Audit

| Page | URL | Why Key |
|------|-----|---------|
| Homepage | `/` | Primary landing, hero + Bento grid + stats (most complex) |
| Division Detail | `/divisions/crop-farming/` | 5-section template, StatCounter island |
| Insights Hub | `/insights/` | Article grid, featured card, filter tabs |
| Contact (General) | `/contact/general/` | InquiryForm React island (heaviest form JS) |
| About | `/about/` | Long-form, AnchorNav island, OrgChart |
| Search | `/search/` | SearchPage island with client:load (heaviest hydration directive, worst-case JS) |

### Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| Lighthouse Performance | 90+ | Mobile-first for Nigerian audience |
| FCP | < 1.5s | Content visible quickly on 4G |
| LCP | < 2.5s | Hero/main content loads fast |
| TBT | < 200ms | Heavily weighted in Lighthouse Performance score — silent blocker if ignored |
| CLS | < 0.1 | No visual jumps |
| Total page weight | < 500KB | Constrained bandwidth respect |
| JS on static pages | 0 bytes | Astro MPA — no JS unless island (small inline IntersectionObserver for fade-in animations is acceptable exception) |

### Font Preloading Pattern

```html
<!-- In BaseLayout.astro <head> -->
<link
  rel="preload"
  href="/_astro/poppins-latin-600-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/_astro/inter-variable-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Note:** Exact font file paths depend on @fontsource output in the Astro build. Check `dist/_astro/` after build to find the correct hashed filenames. Alternatively, use Astro's font optimization if available.

### Island Hydration Budget

| Component | Directive | Page | Expected JS Size |
|-----------|-----------|------|-----------------|
| DesktopNav | client:load | All pages | ~15-25KB |
| MobileNav | client:load | All pages | ~20-30KB |
| StatCounter | client:visible | Homepage, Division Detail, Investors | ~3-5KB |
| InquiryForm | client:visible | Contact pages (3 variants) | ~15-25KB |
| SearchOverlay | client:idle | All pages (header) | ~10-15KB |
| AnchorNavClient | client:idle | About page only | ~3-5KB |
| SearchPage | client:load | Search page only | ~10-15KB |

Pages without any islands (privacy-policy, terms, sitemap, locations, 404) should ship **zero JavaScript**.

**Animation JS caveat:** The architecture describes section fade-in animations as "CSS @keyframes + IntersectionObserver via lightweight vanilla JS." If a small inline IntersectionObserver script exists on static pages, it is an acceptable exception to the zero-JS rule — but it must be audited and its size documented. Prefer CSS-only scroll-driven animations if browser support allows. If inline JS is used, it should be < 1KB minified.

### Zero-JS Verification

After `npm run build`, check output:

```bash
# Find pages with no script tags (expected: legal, sitemap, locations, 404)
grep -rL '<script' dist/ --include='*.html' | head -20

# Find pages WITH script tags and check size
for f in dist/**/*.html; do
  scripts=$(grep -c '<script' "$f" 2>/dev/null || echo 0)
  if [ "$scripts" -gt 0 ]; then
    echo "$f: $scripts script(s)"
  fi
done
```

### Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/divisions/crop-farming/',
        'http://localhost:4321/insights/',
        'http://localhost:4321/contact/general/',
        'http://localhost:4321/about/',
        'http://localhost:4321/search/',
      ],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local',
      numberOfRuns: 3,
      settings: {
        // AC requires mobile simulation — this is the primary target audience
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2 },
        throttling: {
          // Simulated 4G — matches Nigerian mobile audience context
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
  },
};
```

### CLS Prevention Checklist

- [ ] All images: `width` + `height` attributes or CSS `aspect-ratio`
- [ ] Fonts: `font-display: swap` prevents FOIT (but may cause FOUT — acceptable)
- [ ] Header: fixed `h-16` (64px) — no height change on scroll state transition
- [ ] No dynamically injected content above fold after hydration
- [ ] StatCounter: reserve space with min-height before hydration
- [ ] SearchOverlay: overlay doesn't shift page content (it's a modal)

### Astro Image Optimization

Astro 6 includes built-in image optimization. Use `<Image>` for optimized output:

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@/assets/hero/homepage-hero.jpg';
---

<Image
  src={heroImg}
  alt="Description"
  width={1200}
  height={630}
  format="webp"
  quality={80}
  loading="eager"
  fetchpriority="high"
/>
<!-- loading="eager" + fetchpriority="high" for above-fold LCP images -->
<!-- loading="lazy" for below-fold images (no fetchpriority needed) -->
```

For MVP with placeholder images, this is less relevant — but the pattern should be in place for when real images are added.

### Performance is Respect

Per the UX spec: "Fast loading is not a technical metric. It is a signal of respect for the user's time and network conditions. A site that loads slowly on mobile tells the user their context does not matter."

The primary audience includes Nigerian users on mobile devices with variable bandwidth. Every KB matters.

### Previous Story Intelligence

**Story 1.1** configures Tailwind v4 via `@tailwindcss/vite` — CSS purging is automatic.

**Story 1.2** sets up @fontsource with `font-display: swap` enabled by default.

**Story 1.4** creates BaseLayout with `<head>` — font preload links go here.

**Story 2.3** creates StatCounter with `client:visible` — already lazy-loaded.

**Story 4.2** creates InquiryForm with `client:visible` — already lazy-loaded.

**Story 7.1** creates SearchOverlay with `client:idle` — already deferred.

**Story 8.2** creates Playwright tests — Lighthouse CI can share the same webServer config.

### What This Story Does NOT Include

- No CDN configuration (Vercel handles this automatically)
- No service worker / offline support
- No image compression pipeline beyond Astro's built-in
- No critical CSS inlining (Astro handles CSS extraction)
- No HTTP/2 push (Vercel handles this)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `lighthouserc.js` — Lighthouse CI configuration
- **Modifies:** `src/layouts/BaseLayout.astro` — adds font preload links
- **Modifies:** Various pages — image optimization, lazy loading, CLS fixes
- **Modifies:** `package.json` — adds `@lhci/cli` dev dependency + lighthouse script

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 8, Story 8.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — Performance requirements, island hydration map, image optimization]
- [Source: docs/project-context.md — Performance targets: Lighthouse 90+, FCP <1.5s, LCP <2.5s, CLS <0.1, <500KB]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — "Performance is Respect", Nigerian mobile audience context]
- [Source: _bmad-output/implementation-artifacts/8-2-e2e-testing-accessibility-audit.md — Playwright webServer config (shared)]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
