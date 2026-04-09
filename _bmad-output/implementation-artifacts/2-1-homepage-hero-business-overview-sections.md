# Story 2.1: Homepage Hero & Business Overview Sections

Status: done

## Story

As a **visitor**,
I want the homepage to immediately communicate GRCL's corporate identity with visual authority,
So that I understand this is a serious, multi-division business within 3 seconds of landing.

## Acceptance Criteria

1. Narrative bold hero section fills 85-100vh on desktop (75vh mobile) with gradient background (primary-900 to primary-700), decorative blur gradient elements, and centered white typography
2. Hero displays corporate positioning headline (Poppins 700, max 15 words), sub-headline (max 25 words), and two CTA buttons: primary "Explore Our Divisions" (→ /divisions/) and secondary "Partner With Us" (→ /investors-partners/)
3. Header overlays the hero in transparent mode (transparent state from Story 1.5)
4. Below the hero, a "What We Do" business overview section renders on light background (neutral-50) with gold eyebrow label, heading, 2-3 sentence body text, and 3 cluster cards (icon + cluster name + descriptor, each linking to cluster page)
5. Both sections responsive: hero CTAs stack on mobile, cluster cards collapse to single column
6. Page uses PageLayout with explicit SEO metadata (title, description, Organization + WebSite structured data, canonical URL)

## Tasks / Subtasks

- [x] Task 0: Add homepage design tokens to Tailwind config (CLAUDE.md: no arbitrary Tailwind values)
  - [x] 0.1 Add to `@theme` block in `src/styles/globals.css`:
    ```css
    --container-hero: 800px;        /* hero headline max-width */
    --container-hero-subtitle: 560px; /* hero subtitle max-width */
    --container-overview: 960px;    /* overview section max-width */
    --min-h-hero-mobile: 75vh;      /* hero height on mobile */
    ```
  - [x] 0.2 These generate Tailwind utilities: `max-w-hero`, `max-w-hero-subtitle`, `max-w-overview`, `min-h-hero-mobile`

- [x] Task 1: Create homepage hero section (AC: #1, #2)
  - [x] 1.1 Create hero as first section in `src/pages/index.astro` (replace placeholder)
  - [x] 1.2 Gradient background: `bg-gradient-to-br from-primary-900 to-primary-700` (135deg)
  - [x] 1.3 Decorative blur overlays via CSS pseudo-elements (gold top-right, green bottom-left)
  - [x] 1.4 Hero height: `min-h-hero-mobile lg:min-h-screen` (75vh mobile, 100vh desktop)
  - [x] 1.5 Centered headline: `font-heading font-bold text-white`, responsive text scaling via sm/lg breakpoints, `max-w-hero`
  - [x] 1.6 Sub-headline: `text-white/80`, responsive sizing, `max-w-hero-subtitle`, leading-relaxed
  - [x] 1.7 Primary CTA: gold button "Explore Our Divisions" → `/divisions/`, with focus-visible rings
  - [x] 1.8 Secondary CTA: outline/ghost button "Partner With Us" → `/investors-partners/`, with focus-visible rings
  - [x] 1.9 CTAs: flex row on desktop, stack on mobile (`flex-col sm:flex-row gap-4`)
  - [x] 1.10 All content `relative z-10` above pseudo-element overlays
  - [x] 1.11 Hover transforms wrapped in `motion-safe:`, reduced-motion hides decorative blurs

- [x] Task 2: Create business overview / "What We Do" section (AC: #4)
  - [x] 2.1 SectionWrapper with `variant="light"` (neutral-50 background)
  - [x] 2.2 SectionHeading with gold eyebrow "Our Business", heading text, subtitle
  - [x] 2.3 Inner container: `max-w-overview` (960px token from Task 0)
  - [x] 2.4 3 cluster cards in responsive grid: `grid-cols-1 md:grid-cols-3 gap-8`
  - [x] 2.5 Each card: inline SVG icon + gold left border (2px solid gold-600) + pl-5 + cluster name (H3) + description. Icons: Wheat, TrendingUp, Building2 from lucide (inline SVG paths, no client JS)
  - [x] 2.6 Cards link to cluster pages: `/divisions/[cluster-slug]/`, with focus-visible rings
  - [x] 2.7 Fetch cluster data from content collections in page frontmatter

- [x] Task 3: Configure homepage SEO and structured data (AC: #6)
  - [x] 3.1 PageLayout with title: "Global Resources Citadel — Building Nigeria's Future Across Seven Sectors"
  - [x] 3.2 Meta description (~155 chars)
  - [x] 3.3 Canonical URL: site root
  - [x] 3.4 Organization JSON-LD structured data
  - [x] 3.5 WebSite JSON-LD structured data
  - [x] 3.6 BaseLayout array jsonLd support already implemented in Story 1.8 — confirmed 2 JSON-LD scripts rendered

- [x] Task 4: Responsive verification (AC: #5)
  - [x] 4.1 Hero: CTAs stack vertically below sm breakpoint (flex-col sm:flex-row)
  - [x] 4.2 Hero: headline scales via sm:text-5xl lg:text-6xl breakpoints
  - [x] 4.3 Overview: cluster cards single column on mobile, 3 columns on md+
  - [x] 4.4 Build verified, responsive classes confirmed in markup

- [x] Task 5: FAQ Section (AC: FAQ)
  - [x] 5.1 Render `FAQSection.astro` component with `category="homepage"` filter
  - [x] 5.2 Placed after business overview, before contact CTA
  - [x] 5.3 Passed `sectionTitle="Frequently Asked Questions"`

## Dev Notes

### Hero Section — CSS from Design Reference

The canonical visual target is `_bmad-output/planning-artifacts/design-reference-final.html`. Key CSS:

```css
.hero {
  padding: 140px 24px 120px;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%);
  position: relative;
  overflow: hidden;
}

/* Decorative gold blur — top right */
.hero::before {
  content: '';
  position: absolute;
  top: -50%; right: -20%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(180,138,62,0.15) 0%, transparent 70%);
  border-radius: 50%;
}

/* Decorative green blur — bottom left */
.hero::after {
  content: '';
  position: absolute;
  bottom: -30%; left: -10%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.hero h1 {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  color: #fff;
  max-width: 800px;
  margin: 0 auto 20px;
  position: relative; z-index: 1;
}

.hero p {
  font-size: clamp(16px, 2vw, 20px);
  color: rgba(255,255,255,0.8);
  max-width: 560px;
  margin: 0 auto 36px;
  line-height: 1.7;
  position: relative; z-index: 1;
}

.hero-btn {
  padding: 14px 36px;
  background: var(--gold);          /* #B48A3E */
  color: var(--primary-900);        /* #14532D — dark text on gold */
  border-radius: 8px;
  font-weight: 700; font-size: 15px;
  transition: all 0.2s;
  position: relative; z-index: 1;
}
.hero-btn:hover {
  background: var(--gold-light);    /* #D4A84B */
  transform: translateY(-1px);
}
```

### Tailwind Implementation for Hero

The hero uses custom CSS pseudo-elements for decorative blurs since Tailwind can't easily express radial-gradient pseudo-elements. Use a `<style>` block in the Astro component or a dedicated CSS class in globals.css:

```astro
<section class="relative min-h-hero-mobile overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700 px-6 py-36 text-center lg:min-h-screen lg:py-40">
  <!-- Content above overlays -->
  <div class="relative z-10 mx-auto max-w-4xl">
    <h1 class="mx-auto max-w-hero font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
      Building Nigeria's Future Across Seven Sectors
    </h1>
    <p class="mx-auto mt-5 max-w-hero-subtitle text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
      From agriculture to energy, Global Resources Citadel is creating integrated
      value chains that drive economic growth and opportunity.
    </p>
    <div class="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a href="/divisions/" class="inline-block rounded-lg bg-gold-600 px-9 py-4 text-sm font-bold text-primary-900 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 motion-safe:transition-all motion-safe:hover:-translate-y-px motion-safe:hover:bg-gold-400">
        Explore Our Divisions
      </a>
      <a href="/investors-partners/" class="inline-block rounded-lg border border-white/30 px-9 py-4 text-sm font-bold text-white focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 motion-safe:transition-all motion-safe:hover:bg-white/10">
        Partner With Us
      </a>
    </div>
  </div>
</section>

<style>
  section::before {
    content: '';
    position: absolute;
    top: -50%; right: -20%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(180,138,62,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  section::after {
    content: '';
    position: absolute;
    bottom: -30%; left: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (prefers-reduced-motion: reduce) {
    section::before, section::after { display: none; }
  }
</style>
```

### Business Overview — CSS from Design Reference

```css
.overview {
  padding: 96px 24px;
  background: var(--neutral-100);     /* Design ref uses var(--neutral-100) which maps to #F3F4F6 in some Tailwind versions. Our SectionWrapper `light` variant uses neutral-50 (#F9FAFB) per UX spec — that is authoritative. */
}
.overview .container { max-width: 960px; }

.eyebrow {
  font-family: 'Poppins', sans-serif;
  font-size: 12px; font-weight: 600;
  color: var(--gold);                  /* #B48A3E */
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}

.overview h2 {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  color: var(--neutral-900);
  margin-bottom: 16px; line-height: 1.15;
}

.overview p {
  font-size: 17px; color: var(--neutral-600);
  max-width: 600px; margin-bottom: 48px; line-height: 1.8;
}

.overview-cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.overview-col {
  border-left: 2px solid var(--gold);  /* #B48A3E */
  padding-left: 20px;
}
.overview-col h3 { font-size: 16px; font-weight: 700; color: var(--neutral-900); margin-bottom: 8px; }
.overview-col p { font-size: 14px; color: var(--neutral-600); line-height: 1.7; }
```

### Tailwind Implementation for Business Overview

```astro
---
import { Wheat, TrendingUp, Building2 } from 'lucide-react';

// Hardcoded icon map — only 3 clusters, no schema change needed
const clusterIcons: Record<string, typeof Wheat> = {
  'agriculture-processing': Wheat,
  'trade-markets': TrendingUp,
  'built-environment-energy': Building2,
};
---

<SectionWrapper variant="light">
  <div class="mx-auto max-w-overview">
    <SectionHeading eyebrow="Our Business" subtitle="Global Resources Citadel operates across interconnected sectors, each strengthening the others.">
      Seven Divisions. One Vision.
    </SectionHeading>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      {clusters.map(cluster => {
        const Icon = clusterIcons[cluster.data.slug];
        return (
          <a href={`/divisions/${cluster.data.slug}/`} class="group border-l-2 border-gold-600 pl-5 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-safe:transition-colors motion-safe:hover:border-gold-400">
            <Icon className="mb-2 h-6 w-6 text-gold-600" aria-hidden="true" />
            <h3 class="font-heading text-base font-bold text-neutral-900 group-hover:text-primary-600">
              {cluster.data.name}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-600">
              {cluster.data.tagline}
            </p>
          </a>
        );
      })}
    </div>
  </div>
</SectionWrapper>
```

**Note on Lucide icons in Astro:** The above uses `lucide-react` for the icon component pattern. If this section remains a static Astro component (no `client:*` directive), you may need to use inline SVGs instead of React icon components. Alternative: import SVG icon paths from `lucide-static` or render inline SVGs directly. The dev should choose whichever approach avoids adding client JS to this static section.

### Homepage Content

**Hero headline:** "Building Nigeria's Future Across Seven Sectors"
**Hero subtitle:** "From agriculture to energy, Global Resources Citadel is creating integrated value chains that drive economic growth and opportunity."
**Primary CTA:** "Explore Our Divisions" → `/divisions/`
**Secondary CTA:** "Partner With Us" → `/investors-partners/`

**Overview eyebrow:** "Our Business"
**Overview heading:** "Seven Divisions. One Vision."
**Overview body:** "Global Resources Citadel operates across interconnected sectors, each strengthening the others. Our agricultural foundation feeds our processing capacity. Our trade networks connect our products to markets. Our infrastructure investments build the platforms for future growth."

**Cluster cards:** Data from content collections (Story 1.3). Each cluster has `name`, `slug`, `tagline`.

### Cluster Card Link Destinations

| Cluster | Route |
|---------|-------|
| Agriculture & Processing | `/divisions/agriculture-processing/` |
| Trade & Markets | `/divisions/trade-markets/` |
| Built Environment & Energy | `/divisions/built-environment-energy/` |

These link to cluster pages built in Epic 3. Soft forward dependency — links will 404 until then.

### SEO Metadata

```typescript
const seo = {
  title: 'Global Resources Citadel — Building Nigeria\'s Future Across Seven Sectors',
  description: 'Global Resources Citadel Limited is a diversified Nigerian conglomerate operating across agriculture, trade, real estate, and energy. Seven divisions driving economic growth.',
  canonical: import.meta.env.SITE_URL,
  ogType: 'website',
};
```

**Structured Data (JSON-LD):**
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Global Resources Citadel Limited",
    "url": "https://global-resources.org",
    "logo": "https://global-resources.org/favicon.svg",
    "description": "Diversified Nigerian conglomerate across agriculture, trade, real estate, and energy."
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Resources Citadel",
    "url": "https://global-resources.org"
  }
]
```

### Header Transparent State Integration

The hero requires the header to render in its transparent state (from Story 1.5). The header component detects scroll position — when `scrollY < 50`, it uses transparent background with `logo-reversed.svg`. The hero's dark gradient provides the contrast for white header text.

No changes needed to Header.astro — it already handles this via scroll detection in DesktopNav.tsx.

### Homepage Does NOT Have Breadcrumbs

Per Story 1.8 and the information architecture: homepage has no breadcrumb. The breadcrumb slot in PageLayout is simply not populated.

### What This Story Does NOT Include

- No Divisions Bento Grid (Story 2.2)
- No Credibility Signals / Stats section (Story 2.3)
- No Latest Insights section (Story 2.4)
- No Contact CTA section (Story 2.4)
- No search functionality
- No real images — gradient background only for hero

### Previous Story Intelligence

**Story 1.4** — SectionWrapper (5 variants), SectionHeading (eyebrow + subtitle), Button (all variants including gold), CTABanner, PageLayout with SEO. These are the building blocks for this story.

**Story 1.3** — Content collections for clusters with `name`, `slug`, `tagline` fields. Use `getCollection('clusters')` to fetch cluster data for the overview cards.

**Story 1.5** — Header with transparent/solid scroll behavior. Header already handles hero overlay mode automatically.

**Story 1.2** — Design tokens: primary-900/700 (hero gradient), gold-600 (eyebrow, CTA, card borders), neutral-50 (overview bg), all typography tokens.

### Project Structure Notes

Files this story creates or modifies:
- **Modifies:** `src/pages/index.astro` — replaces placeholder with hero + business overview sections
- **May add:** Scoped `<style>` block for hero pseudo-element blur overlays (cannot be expressed in pure Tailwind)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Hero CSS lines 172-236, Overview CSS lines 238-293, HTML markup lines 695-733]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Hero specification, Business Overview, Experience Mechanics]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P01 Homepage sections, hero content spec, overview content spec]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — SectionWrapper, SectionHeading, Button variants, PageLayout]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` — 2 pages, zero errors
- TypeScript check: `tsc --noEmit` — clean
- JSON-LD count: 2 `application/ld+json` scripts in dist/index.html (Organization + WebSite)

### Completion Notes List

- Replaced placeholder homepage with full hero + business overview + FAQ + CTA sections
- Hero: gradient bg (primary-900 → primary-700), decorative radial-gradient pseudo-elements (gold top-right, green bottom-left), hidden on prefers-reduced-motion
- Hero: responsive headline (text-4xl → sm:text-5xl → lg:text-6xl), max-w-hero (800px token)
- Hero: two CTAs — gold "Explore Our Divisions" and outline "Partner With Us", stack on mobile, row on desktop
- Hero: all hover transforms wrapped in `motion-safe:`, min-h-11 touch targets on CTAs
- Header passes `headerVariant="transparent"` for hero overlay mode
- Business overview: SectionWrapper variant="light", SectionHeading with gold eyebrow, max-w-overview (960px) inner container
- Cluster cards: inline SVG icons from lucide (Wheat, TrendingUp, Building2) — zero client JS shipped
- Cluster data fetched from content collections, sorted by sortOrder
- Cards link to cluster pages with gold left border, group hover on H3, focus-visible rings
- SEO: title includes brand + positioning, ~155 char description, canonical /, dual JSON-LD schemas
- FAQ section: FAQSection component with category="homepage" filter, placed before CTA
- Design tokens added: --container-hero (800px), --container-hero-subtitle (560px), --container-overview (960px), --min-h-hero-mobile (75vh)

### File List

- `src/pages/index.astro` — Modified (replaced placeholder with hero, overview, FAQ, CTA)
- `src/styles/globals.css` — Modified (added 4 homepage design tokens)

### Review Findings

- [x] [Review][Patch][CRITICAL] Mobile header transparent mode — conditional SVG fills for reversed logo, search icon text-white, passed headerVariant to MobileNav for hamburger color ✓ Fixed
- [x] [Review][Patch] Hero pseudo-elements — added pointer-events: none to ::before and ::after ✓ Fixed
- [x] [Review][Patch] clusterIcons slug fallback — added ?? '' null coalesce guard ✓ Fixed
- [x] [Review][Patch] Adjacent light sections — passed variant="default" to FAQSection for visual break ✓ Fixed
- [x] [Review][Defer] Hero section `<section>` missing `aria-label` — unnamed landmark for assistive tech. Enhancement for Epic 8 a11y audit.
- [x] [Review][Defer] DesktopNav focus-visible ring offset doesn't adapt for transparent mode — white gap on dark background. Cosmetic, defer to Epic 8.

### Change Log

- 2026-03-30: Implemented Story 2.1 Homepage Hero & Business Overview — all 6 tasks complete, build verified
- 2026-03-30: Code review completed — 0 decisions, 4 patches (1 critical), 2 deferred, 14 dismissed
