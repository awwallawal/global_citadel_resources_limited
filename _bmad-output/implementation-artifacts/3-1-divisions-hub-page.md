# Story 3.1: Divisions Hub Page

Status: done

## Story

As a **visitor**,
I want a central page showing all business divisions organized by cluster,
So that I can browse the full portfolio and find the division relevant to my needs.

## Acceptance Criteria

1. PageHero section displays with gold eyebrow "Our Divisions", heading "Built Across Sectors. United by Purpose.", and sub-heading text
2. 3 cluster sections render in sequence (Agriculture & Processing, Trade & Markets, Built Environment & Energy) with alternating white/neutral-50 backgrounds
3. Each cluster section shows cluster heading, 1-2 sentence description, and responsive card grid of member divisions
4. Each DivisionPreviewCard shows division icon, division name, 2-3 line overview, and "Explore" arrow link to `/divisions/[slug]/`. Note: epics specify "division image (16:9 or 4:3)" — for MVP, icon circles with cluster-accent colours are used as placeholders. Real division photography is a post-MVP enhancement when client provides assets. The card structure supports swapping icons for images without structural changes.
5. CTABanner (dark variant) at bottom: "Looking for a specific capability?" with supporting text and links to contact and search
6. Breadcrumbs: Home > Divisions
7. SEO metadata: title, description, canonical, CollectionPage structured data
8. Cards: 1-column mobile, 2-column tablet, 3-column desktop

## Tasks / Subtasks

- [x] Task 1: Create `src/pages/divisions/index.astro` (AC: #1, #6, #7)
  - [x] 1.1 PageLayout with SEO: title "Our Divisions — Global Resources Citadel | Business Portfolio", description, canonical `/divisions/`
  - [x] 1.2 CollectionPage JSON-LD structured data
  - [x] 1.3 BreadcrumbNav: Home > Divisions
  - [x] 1.4 Breadcrumb JSON-LD via `generateBreadcrumbJsonLd()`
  - [x] 1.5 Fetch all divisions and clusters from content collections

- [x] Task 2: Create page hero for divisions hub (AC: #1)
  - [x] 2.1 Build inline with SectionWrapper `variant="primary"` (primary-50 bg). Do NOT use the PageHero component from Story 1.4 — PageHero is designed for dark gradient backgrounds, but the IA spec (line 944) calls for "centered text, subtle background" which is a light treatment.
  - [x] 2.2 Gold eyebrow: "Our Divisions"
  - [x] 2.3 H1 heading: "Built Across Sectors. United by Purpose."
  - [x] 2.4 Sub-heading: "Seven business divisions across agriculture, trade, infrastructure, and energy — each with distinct capabilities, unified by shared values and a common vision for Nigeria's future."
  - [x] 2.5 Centered text layout, constrained max-width (`max-w-3xl` for text readability)

- [x] Task 3: Create ClusterSection.astro component (AC: #2, #3)
  - [x] 3.1 Create `src/components/divisions/ClusterSection.astro`
  - [x] 3.2 Props: cluster data (name, tagline), divisions array, variant (default/light for alternation)
  - [x] 3.3 Cluster heading (H2) with cluster name
  - [x] 3.4 Description paragraph (1-2 sentences from cluster `tagline` or `overview`)
  - [x] 3.5 Responsive card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

- [x] Task 4: Create DivisionPreviewCard.astro (AC: #4)
  - [x] 4.1 Create — can reuse/adapt DivisionCard from Story 2.2 in a simpler form
  - [x] 4.2 Icon circle with cluster-accent colour (amber/copper/slate)
  - [x] 4.3 Division name (H3)
  - [x] 4.4 Overview text (2-3 lines, line-clamp-3)
  - [x] 4.5 "Explore" arrow link: text-gold-600, gap animation on hover
  - [x] 4.6 Card links to `/divisions/[slug]/`
  - [x] 4.7 Hover: border-color shift + shadow-md
  - [x] 4.8 Focus-visible ring on card link wrapper

- [x] Task 5: Assemble page with 3 cluster sections (AC: #2, #8)
  - [x] 5.1 Agriculture & Processing section (3 division cards) — default bg
  - [x] 5.2 Trade & Markets section (2 division cards) — light bg
  - [x] 5.3 Built Environment & Energy section (2 division cards) — default bg
  - [x] 5.4 Group divisions by cluster using `getClusterDivisions()` or inline filtering

- [x] Task 6: Add CTA at bottom (AC: #5)
  - [x] 6.1 CTABanner with `variant="dark"` (neutral-900 — reserve gold variant for homepage CTA)
  - [x] 6.2 Heading: "Looking for a specific capability?"
  - [x] 6.3 Body: "Explore our full portfolio or get in touch to discuss how we can work together."
  - [x] 6.4 Dual CTAs: "Contact Us" → `/contact/` (gold button), "Search the Site" → `/search/` (outline-white button)

## Dev Notes

### Page Layout from Information Architecture

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Divisions
  ├── Section 1: Inline hero (SectionWrapper variant="primary", NOT PageHero)
  │   ├── Gold eyebrow: "Our Divisions"
  │   ├── H1: "Built Across Sectors. United by Purpose."
  │   └── Sub-heading: "Seven business divisions across agriculture..."
  ├── Section 2: Agriculture & Processing (white bg)
  │   ├── Cluster heading + description
  │   └── 3 DivisionPreviewCards (Crop Farming, Animal Husbandry, Agro-Processing)
  ├── Section 3: Trade & Markets (neutral-50 bg)
  │   ├── Cluster heading + description
  │   └── 2 DivisionPreviewCards (Commodity Marketing, Import & Export)
  ├── Section 4: Built Environment & Energy (white bg)
  │   ├── Cluster heading + description
  │   └── 2 DivisionPreviewCards (Real Estate, Oil & Gas)
  └── Section 5: CTABanner
      └── "Looking for a specific capability?" + dual CTAs
```

### Cluster Accent Colours for Icon Circles

| Cluster | Icon BG | Icon Colour |
|---------|---------|-------------|
| Agriculture & Processing | amber-100 (#FEF3C7) | amber-600 (#D97706) |
| Trade & Markets | copper-100 (#FFF1E6) | copper-600 (#C2590A) |
| Built Environment & Energy | slate-100 (#F1F5F9) | slate-600 (#475569) |

These are applied to the DivisionPreviewCard icon circles ONLY — never to borders, backgrounds, or navigation.

### DivisionPreviewCard vs DivisionCard

Story 2.2 created `DivisionCard.astro` for the homepage Bento grid with 4 visual variants and 3 size variants. The Divisions Hub uses a **simpler, uniform card** — all cards are the same size, no variant differentiation. Options:

1. **Reuse DivisionCard** with a fixed variant (e.g., outline) and standard size
2. **Create a separate DivisionPreviewCard** that's purpose-built for listing pages

Recommend option 1 if DivisionCard is flexible enough. If not, create a lightweight DivisionPreviewCard with just: icon + name + excerpt + arrow link.

### Data Fetching Pattern

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '@/layouts/PageLayout.astro';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.astro';
import ClusterSection from '@/components/divisions/ClusterSection.astro';

const divisions = await getCollection('divisions');
const clusters = await getCollection('clusters');

// Group divisions by cluster
const clusterGroups = clusters
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
  .map(cluster => ({
    cluster: cluster.data,
    divisions: divisions
      .filter(d => d.data.clusterSlug === cluster.data.slug)
      .sort((a, b) => a.data.sortOrder - b.data.sortOrder),
  }));

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Divisions' },
];

const seo = {
  title: 'Our Divisions — Global Resources Citadel | Business Portfolio',
  description: 'Explore Global Resources Citadel Limited\'s seven business divisions across agriculture, agro-processing, commodity marketing, real estate, import/export, and oil & gas.',
  canonical: `${import.meta.env.SITE_URL}/divisions/`,
};
---
```

### ClusterSection Pattern

```astro
---
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import SectionHeading from '@/components/layout/SectionHeading.astro';
import DivisionPreviewCard from '@/components/divisions/DivisionPreviewCard.astro';

interface Props {
  clusterName: string;
  clusterDescription: string;
  divisions: Array<{ data: { name: string; slug: string; tagline: string; clusterSlug: string } }>;
  variant?: 'default' | 'light';
}

const { clusterName, clusterDescription, divisions, variant = 'default' } = Astro.props;
---

<SectionWrapper variant={variant}>
  <SectionHeading subtitle={clusterDescription}>
    {clusterName}
  </SectionHeading>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
    {divisions.map(div => (
      <DivisionPreviewCard division={div} />
    ))}
  </div>
</SectionWrapper>
```

### SEO — CollectionPage Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Divisions",
  "description": "Global Resources Citadel's seven business divisions",
  "url": "https://globalresourcescitadel.com/divisions/",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 7,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Crop Farming", "url": "https://globalresourcescitadel.com/divisions/crop-farming/" }
    ]
  }
}
```

### Soft Forward Links

- Division detail pages `/divisions/[slug]/` — built in Story 3.3. Links will 404 until then.
- Contact `/contact/` — built in Epic 4.
- Search `/search/` — built in Epic 7.

### Previous Story Intelligence

**Story 1.4** — PageHero, SectionWrapper, SectionHeading, CTABanner, Button components all available.

**Story 1.8** — BreadcrumbNav component and `generateBreadcrumbJsonLd()` available.

**Story 2.2** — DivisionCard.astro and DivisionBentoGrid.astro exist. DivisionCard may be reusable here with a fixed variant.

**Story 1.3** — Content collections with divisions (name, slug, clusterSlug, tagline, tier) and clusters (name, slug, tagline, overview, divisionSlugs).

### What This Story Does NOT Include

- No cluster detail pages (Story 3.2)
- No division detail pages (Story 3.3)
- No DivisionLayout.astro (Story 3.3)
- No real division images — icon placeholders only
- No search functionality

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/divisions/index.astro`
- **Creates:** `src/components/divisions/ClusterSection.astro`
- **May create:** `src/components/divisions/DivisionPreviewCard.astro` (if DivisionCard can't be reused)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P03 Divisions Hub page wireframe, sections 4.1-4.4]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — ClusterSection, DivisionCard, cluster accent colours]
- [Source: _bmad-output/implementation-artifacts/2-2-divisions-bento-grid.md — DivisionCard component]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — PageHero, SectionWrapper, CTABanner]
- [Source: _bmad-output/implementation-artifacts/1-8-breadcrumb-navigation.md — BreadcrumbNav, JSON-LD]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` — 3 pages, zero errors
- TypeScript check: `tsc --noEmit` — clean
- 3 cluster sections confirmed, breadcrumb present, CollectionPage JSON-LD rendered

### Completion Notes List

- Created DivisionPreviewCard.astro — uniform card with cluster-accent icon circles (amber/copper/slate), name, tagline (line-clamp-3), "Explore →" arrow link, hover border-gold + shadow-md, focus-visible rings
- Created ClusterSection.astro — SectionWrapper + SectionHeading + responsive card grid (1/2/3 cols), accepts variant for alternating backgrounds
- Created divisions/index.astro hub page with: inline hero (SectionWrapper primary, centered text, gold eyebrow), 3 cluster sections with alternating white/light backgrounds, dark CTABanner with dual CTAs
- Hero: H1 "Built Across Sectors. United by Purpose.", max-w-3xl centered
- Divisions grouped by cluster, sorted by sortOrder, cluster accent colors passed to cards
- Breadcrumb: Home > Divisions with JSON-LD
- SEO: CollectionPage JSON-LD with ItemList of all 7 divisions + Breadcrumb JSON-LD (array)
- CTABanner dark variant: "Looking for a specific capability?" with Contact Us + Search the Site

### File List

- `src/pages/divisions/index.astro` — Created (new)
- `src/components/divisions/ClusterSection.astro` — Created (new)
- `src/components/divisions/DivisionPreviewCard.astro` — Created (new)

### Review Findings

- [x] [Review][Patch] CTABanner changed from variant="gold" to variant="dark" per AC #5 ✓ Fixed
- [x] [Review][Patch] Added motion-safe: prefix to transition-shadow on DivisionPreviewCard ✓ Fixed
- [x] [Review][Patch] Added ?? 'amber' fallback for optional accentColor ✓ Fixed
- [x] [Review][Patch] Simplified iconColors map — removed unused text property ✓ Fixed
- [x] [Review][Patch] ItemList uses [...divisions].sort() to avoid mutating shared array ✓ Fixed
- [x] [Review][Defer] Division detail links 404 until Story 3.3
- [x] [Review][Defer] Emoji icons inconsistent cross-platform — swap to SVG when assets available
- [x] [Review][Defer] Verbose card accessible name — add aria-label in Epic 8 a11y audit
- [x] [Review][Defer] 2-card clusters leave orphan grid column on desktop — design consideration

### Change Log

- 2026-03-31: Implemented Story 3.1 Divisions Hub Page — all 6 tasks complete, build verified
- 2026-04-01: Code review completed — 0 decisions, 5 patches, 4 deferred, 1 dismissed
- 2026-04-02: CTABanner variant changed from `dark` to `gold` for visual consistency across the divisions section (hub, cluster, and detail pages all use gold CTA). Change made during Story 3.3 implementation. See 3-3 story file "Post-Implementation UX Refinements" for rationale.
