# Story 1.7: Footer Navigation

Status: done

## Story

As a **visitor**,
I want a comprehensive footer that reinforces the brand and provides secondary navigation,
So that I can find any section and perceive the platform as complete and professional.

## Acceptance Criteria

1. Brand story row displays GRC logo (logo-reversed.svg, white/gold for dark footer) and company tagline paragraph above the link grid
2. Multi-column link grid with 7 columns: The Group (4 links), Divisions (4 links), More Divisions (4 links), Insights (3 links), Get In Touch (4 links), Investors & Partners (3 links), Connect (3 social placeholder links). Per epics AC, IA wireframe (lines 94-104), and UX-DR12.
3. Column headings styled as gold uppercase eyebrows (Poppins 600, 12px, gold-600, uppercase, tracking 0.08em)
4. Bottom bar displays copyright ("© 2026 Global Resources Citadel Limited. All rights reserved.") and legal links (Privacy Policy, Terms of Use, Sitemap)
5. Desktop (lg+): full multi-column grid layout
6. Mobile: columns collapse into accordion pattern
7. All footer links correctly pathed to their destination routes

## Tasks / Subtasks

- [x] Task 1: Create Footer.astro component (AC: #1, #2, #3)
  - [x] 1.1 Create `src/components/layout/Footer.astro`
  - [x] 1.2 Brand story row: inline logo-reversed.svg + tagline paragraph
  - [x] 1.3 5-column link grid with gold headings
  - [x] 1.4 All links with correct href destinations

- [x] Task 2: Implement link columns (AC: #2)
  - [x] 2.1 Column 1 — THE GROUP: About the Group, Leadership, Group Structure, Credentials
  - [x] 2.2 Column 2 — DIVISIONS: Crop Farming, Animal Husbandry, Agro-Processing, Commodity Marketing
  - [x] 2.3 Column 3 — MORE DIVISIONS: Import & Export, Real Estate, Oil & Gas, View All Divisions
  - [x] 2.4 Column 4 — INSIGHTS: Latest, News & Updates, Thought Leadership
  - [x] 2.5 Column 5 — GET IN TOUCH: General Enquiries, Contact by Division, Partner / Investor, Locations
  - [x] 2.6 Column 6 — INVESTORS & PARTNERS: Why Partner With Us, Portfolio Strength, Strategic Inquiry
  - [x] 2.7 Column 7 — CONNECT: LinkedIn (placeholder #), Twitter / X (placeholder #), Email (mailto:info@global-resources.org)

- [x] Task 3: Implement copyright bar (AC: #4)
  - [x] 3.1 Top border separator
  - [x] 3.2 Copyright text with dynamic year
  - [x] 3.3 Legal links: Privacy Policy, Terms of Use, Sitemap

- [x] Task 4: Responsive layout (AC: #5, #6)
  - [x] 4.1 Desktop: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7` with `gap-8` (32px). The `auto-fit` pattern from the design reference CSS also works but explicit breakpoint columns give more control over the 7-column layout.
  - [x] 4.2 Mobile: accordion pattern using `<details>`/`<summary>` elements (no JS required)
  - [x] 4.3 Verify at mobile (375px), tablet (768px), desktop (1024px+)

- [x] Task 5: Integrate into PageLayout (AC: #7)
  - [x] 5.1 Import Footer.astro into PageLayout's footer slot
  - [x] 5.2 Verify footer appears on all pages

## Dev Notes

### Footer is an Astro Component (Static)

Footer.astro is a static component with NO client-side interactivity needed on desktop. The mobile accordion can use native HTML `<details>`/`<summary>` for zero-JS collapse — no React island required.

This keeps footer JS at zero bytes, which matters for Nigerian mobile audience performance.

### Component Structure (3 Rows)

```
<footer> (bg-neutral-900, py-18 px-6)
  <div> (max-w-7xl mx-auto)
    ├── Row 1: Brand Story (.footer-brand)
    │   ├── Logo (logo-reversed.svg, inline SVG)
    │   └── Tagline paragraph
    │
    ├── Row 2: Link Grid (.footer-grid)
    │   ├── Column: THE GROUP
    │   ├── Column: DIVISIONS
    │   ├── Column: MORE DIVISIONS
    │   ├── Column: INSIGHTS
    │   ├── Column: GET IN TOUCH
    │   ├── Column: INVESTORS & PARTNERS
    │   └── Column: CONNECT
    │
    └── Row 3: Copyright Bar (.footer-bottom)
        ├── © 2026 Global Resources Citadel Limited
        └── Privacy Policy | Terms of Use | Sitemap
```

### Complete Link Map

**THE GROUP**
| Link | Route |
|------|-------|
| About the Group | `/about/` |
| Leadership | `/about/#leadership` |
| Group Structure | `/about/#structure` |
| Credentials | `/about/#credentials` |

**DIVISIONS**
| Link | Route |
|------|-------|
| Crop Farming | `/divisions/crop-farming/` |
| Animal Husbandry | `/divisions/animal-husbandry/` |
| Agro-Processing | `/divisions/agro-processing/` |
| Commodity Marketing | `/divisions/commodity-marketing/` |

**MORE DIVISIONS**
| Link | Route |
|------|-------|
| Import & Export | `/divisions/import-export/` |
| Real Estate | `/divisions/real-estate/` |
| Oil & Gas | `/divisions/oil-gas/` |
| View All Divisions | `/divisions/` |

**INSIGHTS**
| Link | Route |
|------|-------|
| Latest | `/insights/latest/` |
| News & Updates | `/insights/news/` |
| Thought Leadership | `/insights/thought-leadership/` |

**GET IN TOUCH**
| Link | Route |
|------|-------|
| General Enquiries | `/contact/general/` |
| Contact by Division | `/contact/divisions/` |
| Partner / Investor | `/contact/strategic/` |
| Locations | `/contact/locations/` |

**INVESTORS & PARTNERS**
| Link | Route |
|------|-------|
| Why Partner With Us | `/investors-partners/` |
| Portfolio Strength | `/investors-partners/#portfolio` |
| Strategic Inquiry | `/contact/strategic/` |

**CONNECT**
| Link | Route |
|------|-------|
| LinkedIn | `#` (placeholder — real URL from client) |
| Twitter / X | `#` (placeholder — real URL from client) |
| Email | `mailto:info@global-resources.org` |

**COPYRIGHT BAR**
| Link | Route |
|------|-------|
| Privacy Policy | `/privacy-policy/` |
| Terms of Use | `/terms/` |
| Sitemap | `/sitemap/` |

### CSS from Design Reference

```css
.site-footer {
  padding: 72px 24px 32px;
  background: var(--neutral-900);          /* #1F2937 */
}
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* Brand story row */
.footer-brand {
  margin-bottom: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.footer-brand .logo {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  margin-bottom: 12px;
}
.footer-brand .logo span { color: var(--gold); }  /* #B48A3E */
.footer-brand p {
  font-size: 15px;
  color: var(--neutral-500);               /* #9CA3AF */
  line-height: 1.7;
  max-width: 560px;
}

/* Link grid — 7 columns (auto-fit wraps naturally at smaller viewports) */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}
.footer-col h4 {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);                      /* #B48A3E */
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}
.footer-col a {
  display: block;
  font-size: 14px;
  color: var(--neutral-500);               /* #9CA3AF */
  margin-bottom: 8px;
  transition: color 0.2s;
  text-decoration: none;
}
.footer-col a:hover { color: #fff; }

/* Copyright bar */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--neutral-700);               /* #4B5563 */
}
```

### Tailwind Implementation

Translate the CSS above into Tailwind classes:

```astro
<footer class="bg-neutral-900 px-6 pb-8 pt-18">
  <div class="mx-auto max-w-7xl">

    <!-- Brand story -->
    <div class="mb-12 border-b border-white/[0.08] pb-10">
      <!-- Inline logo-reversed.svg -->
      <p class="max-w-xl text-[15px] leading-relaxed text-neutral-500">
        Global Resources Citadel Limited is a diversified Nigerian conglomerate
        building integrated value chains across agriculture, trade, real estate,
        and energy...
      </p>
    </div>

    <!-- Link grid — wrapped in nav for accessibility -->
    <nav aria-label="Footer navigation" class="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
      <!-- Each column -->
      <div>
        <h4 class="mb-3.5 font-heading text-xs font-semibold uppercase tracking-wide text-gold-600">
          The Group
        </h4>
        <a href="/about/" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          About the Group
        </a>
        <!-- ... more links -->
      </div>
      <!-- ... Divisions, More Divisions, Insights, Get In Touch columns ... -->
      <div>
        <h4 class="mb-3.5 font-heading text-xs font-semibold uppercase tracking-wide text-gold-600">
          Investors & Partners
        </h4>
        <a href="/investors-partners/" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          Why Partner With Us
        </a>
        <a href="/investors-partners/#portfolio" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          Portfolio Strength
        </a>
        <a href="/contact/strategic/" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          Strategic Inquiry
        </a>
      </div>
      <div>
        <h4 class="mb-3.5 font-heading text-xs font-semibold uppercase tracking-wide text-gold-600">
          Connect
        </h4>
        <a href="#" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          LinkedIn
        </a>
        <a href="#" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          Twitter / X
        </a>
        <a href="mailto:info@global-resources.org" class="mb-2 block text-sm text-neutral-500 transition-colors hover:text-white focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
          Email
        </a>
      </div>
    </nav>

    <!-- Copyright -->
    <div class="border-t border-white/[0.06] pt-6 text-center text-[13px] text-neutral-700">
      © {new Date().getFullYear()} Global Resources Citadel Limited. All rights reserved.
      <span class="mx-2">|</span>
      <a href="/privacy-policy/" class="hover:text-neutral-500 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">Privacy Policy</a>
      <span class="mx-2">|</span>
      <a href="/terms/" class="hover:text-neutral-500 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">Terms of Use</a>
      <span class="mx-2">|</span>
      <a href="/sitemap/" class="hover:text-neutral-500 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">Sitemap</a>
    </div>
  </div>
</footer>
```

### Mobile Accordion Pattern (Zero JS)

Use native HTML `<details>`/`<summary>` for mobile collapse. No React island needed.

```astro
<!-- Visible on mobile only -->
<div class="lg:hidden">
  <details>
    <summary class="flex cursor-pointer items-center justify-between py-3 font-heading text-xs font-semibold uppercase tracking-wide text-gold-600">
      The Group
      <svg class="h-4 w-4 transition-transform details-open:rotate-180" .../>
    </summary>
    <div class="pb-4">
      <a href="/about/" class="block py-2 text-sm text-neutral-500 hover:text-white">About the Group</a>
      <!-- ... -->
    </div>
  </details>
  <!-- ... more details/summary for each column -->
</div>

<!-- Visible on desktop only -->
<div class="hidden lg:grid lg:grid-cols-7 lg:gap-8">
  <!-- Full 7-column layout as described above -->
</div>
```

**Note:** The `details-open:` modifier may need Tailwind v4 `@variant` or a custom selector. Alternatively use `[open]` CSS attribute selector:
```css
details[open] summary svg { transform: rotate(180deg); }
```

### Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Base (mobile) | Stacked accordion (`<details>`/`<summary>`) |
| sm (640px+) | 3-column grid |
| md (768px+) | 4-column grid |
| lg (1024px+) | Full 7-column grid |

### Brand Story Content

```
Global Resources Citadel Limited is a diversified Nigerian conglomerate building
integrated value chains across agriculture, trade, real estate, and energy.
Seven business divisions working together to strengthen Nigeria's economic foundations.
```

Use inline `logo-reversed.svg` (white/gold variant) above the tagline. Logo should be ~24px height in footer context (smaller than header's ~40px).

### Logo in Footer

The acceptance criteria specifies "GRC monogram + stacked wordmark logo (brand-assets/logo-reversed.svg)". Use the same inline SVG approach from Story 1.5, but with the reversed variant since the footer background is dark (neutral-900).

### Soft Forward Links

Many footer links point to pages built in later epics:
- `/about/#leadership`, `#structure`, `#credentials` → Epic 5
- `/insights/latest/`, `/insights/news/`, `/insights/thought-leadership/` → Epic 6
- `/contact/general/`, `/contact/divisions/`, `/contact/strategic/`, `/contact/locations/` → Epic 4
- `/investors-partners/`, `/investors-partners/#portfolio` → Epic 5
- `/privacy-policy/`, `/terms/`, `/sitemap/` → Epic 7
- Social links (`#` placeholders) → real URLs from client post-launch

These links will return 404 until their target pages are built. This is expected behavior per the implementation plan. They resolve as each epic is completed.

### Previous Story Intelligence

**Story 1.4** — PageLayout.astro has a `<slot name="footer" />` ready for this component.

**Story 1.5** — Header.astro established the pattern of inline SVG logos and passing content collection data. Footer uses logo-reversed.svg (same approach).

**Story 1.2** — Design tokens available: `neutral-900` (footer bg), `neutral-500` (link text), `neutral-700` (copyright), `gold-600` (headings), `white` (hover).

### What This Story Does NOT Include

- No newsletter signup form
- No back-to-top button
- No footer mobile accordion with React (using `<details>` for zero JS)
- Social media links (LinkedIn, Twitter/X, Email) are included as placeholders with `#` hrefs — real social URLs to be provided by client post-launch

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/layout/Footer.astro`
- **Modifies:** `src/layouts/PageLayout.astro` — integrates Footer into footer slot

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.7 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Footer wireframe, link structure, behavior spec]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Footer CSS and HTML markup, lines 602-671, 895-957]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Footer patterns, responsive behavior]
- [Source: _bmad-output/implementation-artifacts/1-5-header-navigation-division-dropdown.md — Inline SVG logo pattern]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` completes successfully with 2 pages, zero errors
- TypeScript check: `tsc --noEmit` passes clean
- Footer renders in HTML output confirmed via grep on dist/index.html

### Completion Notes List

- Created Footer.astro as a pure Astro component with zero client-side JavaScript
- 3-row structure: brand story (logo-reversed.svg + tagline), 7-column link grid, copyright bar
- All 7 link columns implemented with exact routes per story link map
- Column headings use gold-600 uppercase eyebrow style with Poppins font
- Desktop layout: hidden below lg, 7-column CSS grid with gap-8
- Mobile layout: native `<details>`/`<summary>` accordion with chevron rotation via `group-open:rotate-180`
- Copyright bar with dynamic year via `new Date().getFullYear()`
- Legal links (Privacy Policy, Terms of Use, Sitemap) in copyright bar
- All links have focus-visible rings with ring-offset-neutral-900 for dark background
- External links (Connect column) have `rel="noopener noreferrer"` where applicable
- Footer integrated directly into PageLayout.astro (replaced named footer slot)
- No arbitrary Tailwind values used — all values reference design tokens
- Color mapping adjusted from design reference to match actual token system: neutral-400 for link text, neutral-600 for copyright text (correct hex values for dark bg readability)

### File List

- `src/components/layout/Footer.astro` — Created (new)
- `src/layouts/PageLayout.astro` — Modified (added Footer import, replaced slot with direct component)

### Review Findings

- [x] [Review][Patch] Heading level skip — changed `<h4>` to `<h2>` in desktop footer grid [Footer.astro:132] ✓ Fixed
- [x] [Review][Accepted] Tablet breakpoint gap — binary accordion/grid split accepted as better UX for sub-desktop screens
- [x] [Review][Patch] Duplicate `aria-label` — differentiated mobile nav label to "Footer navigation — mobile" [Footer.astro:151] ✓ Fixed
- [x] [Review][Patch] External links missing `target="_blank"` — added target + rel for all external links [Footer.astro] ✓ Fixed
- [x] [Review][Patch] Safari `<summary>` marker — added `summary::-webkit-details-marker` rule to globals.css ✓ Fixed
- [x] [Review][Patch] Copyright bar contrast + legal link touch targets — upgraded to text-neutral-400, added min-h-11 + inline-flex on legal links [Footer.astro] ✓ Fixed
- [x] [Review][Patch] Link grid touch targets — increased from py-2 to py-3 for 44px minimum [Footer.astro:91] ✓ Fixed
- [x] [Review][Defer] `tracking-widest` (0.1em) vs spec's 0.08em — no standard Tailwind token matches exactly, visual difference negligible (~0.24px at 12px font) — deferred, minor design fidelity
- [x] [Review][Defer] No `aria-current="page"` on footer links — not in story AC, enhancement for future story — deferred, pre-existing

### Change Log

- 2026-03-30: Implemented Story 1.7 Footer Navigation — all 5 tasks complete, build verified
- 2026-03-30: Code review completed — 2 decisions, 5 patches, 2 deferred, 5 dismissed
