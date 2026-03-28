# Story 3.2: Division Cluster Pages

Status: ready-for-dev

## Story

As a **visitor**,
I want cluster pages that frame the strategic context for related divisions,
So that I understand how divisions within a sector group connect and complement each other.

## Acceptance Criteria

1. Cluster hero section with dark gradient background (primary-900→700), gold eyebrow "Division Group", cluster name heading, and positioning sub-heading. Note: epics specify "sector-relevant background image, dark overlay" — for MVP gradient is used; real photography is post-MVP.
2. Cluster overview section shows 2-3 paragraphs explaining the cluster's strategic role and value chain connections
3. Member divisions section shows each division as a DivisionFeatureCard (large format: icon circle with cluster-accent colour, title, overview text, 3 key capability bullets, "Explore Division" link). Note: epics specify "large image" — for MVP icon circles are used; images are post-MVP.
4. Related insights section shows up to 3 InsightCards tagged to divisions in this cluster (fallback: latest company-wide articles)
5. CTABanner offers cluster-specific inquiry: "Interested in [cluster area]?" heading
6. Breadcrumbs: Home > Divisions > [Cluster Name]
7. All 3 cluster pages render correctly via `getStaticPaths`: agriculture-processing (3 divisions), trade-markets (2 divisions), built-environment-energy (2 divisions)
8. SEO metadata follows pattern: "[Cluster Name] — Global Resources Citadel | Division Group"

## Tasks / Subtasks

- [ ] Task 1: Create `src/pages/divisions/[slug].astro` with `getStaticPaths` (AC: #7, #8)
  - [ ] 1.1 **CRITICAL: File must be named `[slug].astro`, NOT `[cluster].astro`.** Astro does not allow two dynamic route files in the same directory. Story 3.3 will extend this same file to add division paths. Both cluster slugs and division slugs are non-overlapping and resolve at the same URL level (`/divisions/:slug`).
  - [ ] 1.2 `getStaticPaths()` generates 3 cluster paths, each with `type: 'cluster'` in props to distinguish from division pages (Story 3.3 adds `type: 'division'` paths later)
  - [ ] 1.3 Fetch cluster data + member divisions + related articles per path
  - [ ] 1.4 SEO metadata: title, description, canonical `/divisions/[cluster-slug]/`
  - [ ] 1.5 BreadcrumbNav: Home > Divisions > [Cluster Name]
  - [ ] 1.6 Breadcrumb + CollectionPage JSON-LD structured data

- [ ] Task 2: Build cluster hero section (AC: #1)
  - [ ] 2.1 PageHero component with dark overlay variant
  - [ ] 2.2 Gold eyebrow: "Division Group"
  - [ ] 2.3 H1: cluster name
  - [ ] 2.4 Sub-heading: cluster positioning statement (from `cluster.data.tagline`)
  - [ ] 2.5 Background: gradient primary-900→primary-700 (same as homepage hero, no real images for MVP)

- [ ] Task 3: Build cluster overview section (AC: #2)
  - [ ] 3.1 SectionWrapper variant="default" (white)
  - [ ] 3.2 Prose content: 2-3 paragraphs from `cluster.data.overview`
  - [ ] 3.3 Max-width `max-w-3xl` for comfortable reading
  - [ ] 3.4 Typography: `text-lg leading-relaxed text-neutral-600`

- [ ] Task 4: Create DivisionFeatureCard.astro (AC: #3)
  - [ ] 4.1 Create `src/components/divisions/DivisionFeatureCard.astro`
  - [ ] 4.2 Props: division data (name, slug, tagline, capabilities, clusterSlug)
  - [ ] 4.3 Layout: horizontal on desktop (image/icon left, content right), stacked on mobile
  - [ ] 4.4 Icon circle with cluster-accent colour (amber/copper/slate)
  - [ ] 4.5 Division name (H3, font-heading font-bold text-xl)
  - [ ] 4.6 Overview text (tagline, 3-4 lines)
  - [ ] 4.7 3 capability bullets from `division.data.capabilities.slice(0, 3)`
  - [ ] 4.8 "Explore Division →" link to `/divisions/[slug]/`
  - [ ] 4.9 Card border: `border border-neutral-200 rounded-xl p-6 lg:p-8`
  - [ ] 4.10 Hover: `motion-safe:hover:shadow-md motion-safe:hover:border-neutral-300`
  - [ ] 4.11 Focus-visible ring on card link wrapper

- [ ] Task 5: Build member divisions section (AC: #3)
  - [ ] 5.1 SectionWrapper variant="light" (neutral-50)
  - [ ] 5.2 SectionHeading: "Divisions in [Cluster Name]"
  - [ ] 5.3 Stack DivisionFeatureCards vertically with `space-y-6 lg:space-y-8`

- [ ] Task 6: Build related insights section (AC: #4)
  - [ ] 6.1 SectionWrapper variant="default" (white)
  - [ ] 6.2 SectionHeading: "Latest from [Cluster Name]"
  - [ ] 6.3 Fetch up to 3 articles where `divisionSlug` matches any division in this cluster
  - [ ] 6.4 Fallback: latest 3 company-wide articles if no cluster-tagged articles
  - [ ] 6.5 Reuse InsightCard from Story 2.4 in 3-column grid
  - [ ] 6.6 ViewAllLink (placeholder — insights by cluster not a defined route; link to `/insights/`)
  - [ ] 6.7 If no articles at all (including fallback), omit the insights section entirely or show "Stay tuned for insights from across our divisions" message. Never show an empty grid.

- [ ] Task 7: Build cluster-specific CTA (AC: #5)
  - [ ] 7.1 CTABanner with dark variant
  - [ ] 7.2 Heading: "Interested in [Cluster Name]?"
  - [ ] 7.3 Body: contextual text about the cluster
  - [ ] 7.4 CTA: "Get In Touch" → `/contact/`

## Dev Notes

### Page Structure from Information Architecture

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Divisions > [Cluster Name]
  ├── Section 1: Cluster Hero
  │   ├── Gold eyebrow: "Division Group"
  │   ├── H1: [Cluster Name]
  │   └── Sub-heading: positioning statement
  ├── Section 2: Cluster Overview (white bg)
  │   └── 2-3 paragraphs explaining strategic role and value chain
  ├── Section 3: Member Divisions (neutral-50 bg)
  │   ├── Heading: "Divisions in [Cluster Name]"
  │   └── DivisionFeatureCard × N (stacked vertically)
  ├── Section 4: Related Insights (white bg)
  │   ├── Heading: "Latest from [Cluster Name]"
  │   └── InsightCard × 3 (grid)
  └── Section 5: CTABanner (dark bg)
      └── "Interested in [Cluster Name]?" + CTA
```

### getStaticPaths Pattern

```astro
---
// src/pages/divisions/[slug].astro
// SHARED FILE: handles both cluster pages (Story 3.2) and division pages (Story 3.3)
// Story 3.2 generates cluster paths; Story 3.3 extends with division paths.
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const clusters = await getCollection('clusters');
  const divisions = await getCollection('divisions');
  const articles = await getCollection('articles');

  // --- Cluster paths (Story 3.2) ---
  const clusterPaths = clusters.map(cluster => {
    const clusterDivisions = divisions
      .filter(d => d.data.clusterSlug === cluster.data.slug)
      .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

    const clusterDivisionSlugs = clusterDivisions.map(d => d.data.slug);

    const relatedArticles = articles
      .filter(a => a.data.divisionSlug && clusterDivisionSlugs.includes(a.data.divisionSlug))
      .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
      .slice(0, 3);

    // Fallback to latest company-wide if no cluster-specific articles
    const fallbackArticles = relatedArticles.length > 0
      ? relatedArticles
      : articles
          .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
          .slice(0, 3);

    return {
      params: { slug: cluster.data.slug },
      props: {
        type: 'cluster' as const,
        cluster: cluster.data,
        divisions: clusterDivisions,
        articles: fallbackArticles,
      },
    };
  });

  // --- Division paths (Story 3.3 adds these) ---
  // const divisionPaths = divisions.map(division => { ... });

  return [...clusterPaths /* , ...divisionPaths */];
}

const props = Astro.props;

// Conditional rendering based on type
// Story 3.2: only 'cluster' type exists
// Story 3.3: adds 'division' type with DivisionPage component
---

{/* Render cluster page — Story 3.3 adds conditional for division pages */}
```

### Cluster Page Variations

| Route | Cluster | Divisions | Accent |
|-------|---------|-----------|--------|
| `/divisions/agriculture-processing/` | Agriculture & Processing | Crop Farming, Animal Husbandry, Agro-Processing | amber |
| `/divisions/trade-markets/` | Trade & Markets | Commodity Marketing, Import & Export | copper |
| `/divisions/built-environment-energy/` | Built Environment & Energy | Real Estate, Oil & Gas | slate |

### DivisionFeatureCard vs DivisionCard/DivisionPreviewCard

This is a **third card variant** — larger format for cluster pages. Unlike:
- **DivisionCard** (Story 2.2) — Bento grid cards with 4 visual variants, 3 sizes
- **DivisionPreviewCard** (Story 3.1) — uniform preview cards for hub listing

**DivisionFeatureCard** is a wide, detailed card showing:
- Division overview paragraph (not just tagline)
- 3 capability bullet points (extracted from `capabilities` array)
- Horizontal layout on desktop (icon/image left, content right)

This is the most content-rich division card and appears only on cluster pages.

### Cluster Accent Colours (Same as Story 3.1)

| Cluster | Icon BG | Icon Colour |
|---------|---------|-------------|
| Agriculture & Processing | amber-100 (#FEF3C7) | amber-600 (#D97706) |
| Trade & Markets | copper-100 (#FFF1E6) | copper-600 (#C2590A) |
| Built Environment & Energy | slate-100 (#F1F5F9) | slate-600 (#475569) |

Applied to DivisionFeatureCard icon circles only.

### Content Data Requirements

From content collections (Story 1.3):

**Cluster data:** `name`, `slug`, `tagline`, `overview` (2-3 paragraphs), `divisionSlugs`, `seoTitle`, `seoDescription`

**Division data (for feature cards):** `name`, `slug`, `tagline`, `capabilities` (array with name + description), `clusterSlug`

**Article data (for insights):** `title`, `excerpt`, `stream`, `publishedAt`, `divisionSlug`

### SEO Metadata Pattern

```typescript
const seo = {
  title: `${cluster.name} — Global Resources Citadel | Division Group`,
  description: cluster.seoDescription,
  canonical: `${import.meta.env.SITE_URL}/divisions/${cluster.slug}/`,
};
```

### Soft Forward Links

- Division detail pages `/divisions/[slug]/` — built in Story 3.3. Will 404 until then.
- Contact `/contact/` — built in Epic 4.
- Article links → `/insights/[slug]/` — built in Epic 6.

### Previous Story Intelligence

**Story 3.1** creates the Divisions Hub at `/divisions/index.astro` and ClusterSection component. The cluster pages extend this by providing full-page detail for each cluster.

**Story 2.4** creates InsightCard.astro (standard + featured variants). Reuse standard variant here in a 3-column grid.

**Story 1.4** provides PageHero, SectionWrapper, SectionHeading, CTABanner, ViewAllLink.

**Story 1.8** provides BreadcrumbNav with 3-level support (Home > Divisions > [Cluster Name]).

**Story 1.3** provides cluster and division content collections with all required fields.

### What This Story Does NOT Include

- No division detail pages (Story 3.3)
- No DivisionLayout.astro (Story 3.3)
- No real hero images — epics specify "sector-relevant background image, dark overlay" but for MVP gradient (primary-900→700) is used. Real hero photography is a post-MVP enhancement when client provides assets.
- No real division photography on feature cards — epics specify "large image" on DivisionFeatureCards but for MVP icon circles with cluster-accent colours are used. The card structure supports swapping icons for images without structural changes.
- No cluster-specific inquiry forms (Epic 4)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/divisions/[slug].astro` — shared dynamic route file for cluster pages (3 paths). Story 3.3 extends this same file to add division paths (7 paths). Named `[slug].astro` not `[cluster].astro` to avoid Astro route conflict.
- **Creates:** `src/components/divisions/DivisionFeatureCard.astro`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P04-P06 Cluster Pages wireframe, sections 5.1-5.3]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — ClusterSection, DivisionFeatureCard, cluster accent tints]
- [Source: _bmad-output/planning-artifacts/architecture.md — getStaticPaths pattern, DivisionLayout extension]
- [Source: _bmad-output/implementation-artifacts/3-1-divisions-hub-page.md — ClusterSection, accent colours]
- [Source: _bmad-output/implementation-artifacts/2-4-latest-insights-contact-cta-sections.md — InsightCard component]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
