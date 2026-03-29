# Story 2.1: Homepage Hero & Business Overview Sections

Status: ready-for-dev

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

- [ ] Task 0: Add homepage design tokens to Tailwind config (CLAUDE.md: no arbitrary Tailwind values)
  - [ ] 0.1 Add to `@theme` block in `src/styles/globals.css`:
    ```css
    --container-hero: 800px;        /* hero headline max-width */
    --container-hero-subtitle: 560px; /* hero subtitle max-width */
    --container-overview: 960px;    /* overview section max-width */
    --min-h-hero-mobile: 75vh;      /* hero height on mobile */
    ```
  - [ ] 0.2 These generate Tailwind utilities: `max-w-hero`, `max-w-hero-subtitle`, `max-w-overview`, `min-h-hero-mobile`

- [ ] Task 1: Create homepage hero section (AC: #1, #2)
  - [ ] 1.1 Create hero as first section in `src/pages/index.astro` (replace placeholder)
  - [ ] 1.2 Gradient background: `bg-gradient-to-br from-primary-900 to-primary-700` (135deg)
  - [ ] 1.3 Decorative blur overlays via CSS pseudo-elements (gold top-right, green bottom-left)
  - [ ] 1.4 Hero height: `min-h-hero-mobile lg:min-h-screen` (75vh mobile, 100vh desktop)
  - [ ] 1.5 Centered headline: `font-heading font-bold text-white`, clamp(36px, 6vw, 64px), `max-w-hero`
  - [ ] 1.6 Sub-headline: `text-white/80`, clamp(16px, 2vw, 20px), `max-w-hero-subtitle`, leading-relaxed
  - [ ] 1.7 Primary CTA: gold button "Explore Our Divisions" → `/divisions/`, with `focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900`
  - [ ] 1.8 Secondary CTA: outline/ghost button "Partner With Us" → `/investors-partners/`, with same focus-visible treatment
  - [ ] 1.9 CTAs: flex row on desktop, stack on mobile (`flex-col sm:flex-row gap-4`)
  - [ ] 1.10 All content `relative z-10` above pseudo-element overlays
  - [ ] 1.11 Wrap hover transforms in `motion-safe:`. No parallax in this story — gradient background has no image to shift. Parallax is excluded; can be added as post-MVP polish if a hero image is introduced later.

- [ ] Task 2: Create business overview / "What We Do" section (AC: #4)
  - [ ] 2.1 SectionWrapper with `variant="light"` (neutral-50 background). Note: design reference CSS comment says `#F3F4F6` but uses `var(--neutral-100)` — our SectionWrapper `light` variant uses neutral-50 (#F9FAFB) per the UX spec, which is authoritative.
  - [ ] 2.2 SectionHeading with gold eyebrow "Our Business", heading text, subtitle
  - [ ] 2.3 Inner container: `max-w-overview` (960px token from Task 0)
  - [ ] 2.4 3 cluster cards in responsive grid: `grid-cols-1 md:grid-cols-3 gap-8`
  - [ ] 2.5 Each card: icon (Lucide, per epics AC + IA requirement) + gold left border (2px solid gold-600) + pl-5 + cluster name (H3) + description. Icons hardcoded per cluster (only 3, no schema change needed): Agriculture & Processing → `Wheat`, Trade & Markets → `TrendingUp`, Built Environment & Energy → `Building2`
  - [ ] 2.6 Cards link to cluster pages: `/divisions/[cluster-slug]/`, with `focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
  - [ ] 2.7 Fetch cluster data from content collections in page frontmatter

- [ ] Task 3: Configure homepage SEO and structured data (AC: #6)
  - [ ] 3.1 PageLayout with title: "Global Resources Citadel — Building Nigeria's Future Across Seven Sectors"
  - [ ] 3.2 Meta description (~155 chars)
  - [ ] 3.3 Canonical URL: site root
  - [ ] 3.4 Organization JSON-LD structured data
  - [ ] 3.5 WebSite JSON-LD structured data
  - [ ] 3.6 **Prerequisite:** BaseLayout's `jsonLd` prop must accept `Record | Record[]` and render multiple `<script>` tags (see Story 1.8 dev notes for the implementation pattern). This is the first story that passes an array — implement the BaseLayout change here if not already done.

- [ ] Task 4: Responsive verification (AC: #5)
  - [ ] 4.1 Hero: CTAs stack vertically below sm breakpoint
  - [ ] 4.2 Hero: headline scales via clamp() — 36px mobile, 64px desktop
  - [ ] 4.3 Overview: cluster cards single column on mobile, 3 columns on md+
  - [ ] 4.4 Verify at 375px, 768px, 1024px, 1280px viewports

- [ ] Task 5: FAQ Section (AC: FAQ)
  - [ ] 5.1 Render `FAQSection.astro` component with `category="homepage"` filter
  - [ ] 5.2 Place after the business overview / credibility sections, before the contact CTA
  - [ ] 5.3 Pass `sectionTitle="Frequently Asked Questions"`

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
    "url": "https://globalresourcescitadel.com",
    "logo": "https://globalresourcescitadel.com/favicon.svg",
    "description": "Diversified Nigerian conglomerate across agriculture, trade, real estate, and energy."
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Resources Citadel",
    "url": "https://globalresourcescitadel.com"
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

### Debug Log References

### Completion Notes List

### File List
