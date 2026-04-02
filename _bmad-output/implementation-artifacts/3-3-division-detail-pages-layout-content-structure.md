# Story 3.3: Division Detail Pages — Layout & Content Structure

Status: done

## Story

As a **prospective customer**,
I want detailed division pages that demonstrate specific competence and operational credibility,
So that I can evaluate whether this business unit can serve my needs before reaching out.

## Acceptance Criteria

1. Section 1 (Division Overview): hero with dark gradient background (primary-900→700), cluster name as gold eyebrow, division name as H1, positioning sub-heading (max 30 words), and 2-3 narrative paragraphs. Note: epics specify "full-width sector-specific hero image" — for MVP gradient is used; real division photography is post-MVP when client provides assets.
2. Section 2 (Capabilities): heading "What We Offer" with 3-column grid of CapabilityCards (icon + name + 2-3 line description), 3-6 cards per division, light grey background
3. Section 3 (Proof/Credentials): dark background band with 3-4 division-specific stats (animated StatCounter), optional certification logos, optional testimonial quote
4. Section 4 (Related Insights): up to 3 InsightCards tagged to this division, "View All [Division] Insights" link to `/insights/divisions/[slug]/` (fallback: latest company-wide articles)
5. Section 5 (Inquiry CTA): accent background CTABanner with "Interested in [Division Name]?" heading and CTA linking to `/contact/divisions/[slug]/`
6. Breadcrumbs: Home > Divisions > [Cluster Name] > [Division Name]
7. Division cluster accent tints on icon backgrounds: amber (Agriculture & Processing), copper (Trade & Markets), slate (Built Environment & Energy)
8. SEO: "[Division Name] — Global Resources Citadel Limited | [Cluster Name]" with Organization (department) + WebPage structured data
9. All 7 division pages render correctly via `getStaticPaths` with content from collections

## Tasks / Subtasks

- [x] Task 1: Create DivisionLayout.astro (AC: #1-#5)
  - [x] 1.1 Create `src/layouts/DivisionLayout.astro`
  - [x] 1.2 Extends PageLayout with division-specific structure
  - [x] 1.3 Props: division data, cluster data, articles, seo
  - [x] 1.4 Renders the 5-section template in order with alternating backgrounds
  - [x] 1.5 Passes cluster accent info for icon tinting

- [x] Task 2: Extend `src/pages/divisions/[slug].astro` with division paths (AC: #9, #8, #6)
  - [x] 2.1 **CRITICAL: Do NOT create a new `[division].astro` file.** Extend the existing `[slug].astro` created in Story 3.2. Astro does not allow two dynamic route files in the same directory. Add division paths to the existing `getStaticPaths` with `type: 'division'` in props.
  - [x] 2.2 Add `divisionPaths` array to `getStaticPaths` — generates 7 paths from divisions collection, each with `type: 'division'` prop
  - [x] 2.3 Fetch division data + parent cluster + related articles + division stats per path
  - [x] 2.4 Add conditional rendering in the page component: `{props.type === 'cluster' ? <ClusterPage .../> : <DivisionPage .../>}` where ClusterPage is the Story 3.2 content and DivisionPage renders DivisionLayout
  - [x] 2.5 SEO: title "[Division Name] — Global Resources Citadel Limited | [Cluster Name]"
  - [x] 2.6 BreadcrumbNav: Home > Divisions > [Cluster Name] > [Division Name] (constructed from division + cluster props)
  - [x] 2.7 JSON-LD array: Breadcrumb + Organization (department) + WebPage structured data

- [x] Task 3: Build Section 1 — Division Overview & Positioning (AC: #1)
  - [x] 3.1 Hero section with gradient background (primary-900→700, same as homepage/cluster — no real images for MVP)
  - [x] 3.2 Gold eyebrow: cluster name (e.g., "Agriculture & Processing")
  - [x] 3.3 H1: division name
  - [x] 3.4 Sub-heading: `division.data.tagline` (max 30 words)
  - [x] 3.5 Below hero: prose section with `division.data.overview` (2-3 paragraphs)
  - [x] 3.6 Prose styling: `max-w-3xl text-lg leading-relaxed text-neutral-600`

- [x] Task 4: Create CapabilityCard.astro and build Section 2 (AC: #2, #7)
  - [x] 4.1 Create `src/components/divisions/CapabilityCard.astro`
  - [x] 4.2 Props: icon (string identifier), name, description, accentColor (cluster accent)
  - [x] 4.3 Icon circle with cluster-accent bg: 48px, rounded-full
  - [x] 4.4 Name: H3, `font-heading font-semibold text-lg`
  - [x] 4.5 Description: `text-sm text-neutral-600 leading-relaxed` (2-3 lines)
  - [x] 4.6 Card: `rounded-xl p-6` no border (clean look on light bg)
  - [x] 4.7 Section: SectionWrapper variant="light", heading "What We Offer"
  - [x] 4.8 Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`
  - [x] 4.9 Render 3-6 cards from `division.data.capabilities`

- [x] Task 5: Build Section 3 — Proof/Credentials (AC: #3)
  - [x] 5.1 Reuse CredibilityBar pattern from Story 2.3
  - [x] 5.2 SectionWrapper variant="dark" (neutral-900)
  - [x] 5.3 Heading: "Our Track Record" (white, centered)
  - [x] 5.4 StatCounter × 3-4 with `client:visible`, data from `division.data.stats`
  - [x] 5.5 Optional certification logos row (from `division.data.certifications`)
  - [x] 5.6 Optional testimonial quote (from `division.data.testimonial`)
  - [x] 5.7 Stats grid: `grid-cols-2 md:grid-cols-4 gap-10`

- [x] Task 6: Build Section 4 — Related Insights (AC: #4)
  - [x] 6.1 SectionWrapper variant="default" (white)
  - [x] 6.2 SectionHeading: "Latest in [Division Name]"
  - [x] 6.3 Filter articles where `divisionSlug === division.data.slug`
  - [x] 6.4 Fallback: latest 3 company-wide articles if none tagged
  - [x] 6.5 InsightCard × 3 in `grid-cols-1 md:grid-cols-3 gap-6`
  - [x] 6.6 ViewAllLink: "View All [Division Name] Insights" → `/insights/divisions/[slug]/`
  - [x] 6.7 If no articles at all (including fallback), omit the insights section entirely or show "Stay tuned for insights" message. Never show an empty grid.

- [x] Task 7: Build Section 5 — Division-Specific Inquiry CTA (AC: #5)
  - [x] 7.1 CTABanner with gold variant (from Story 2.4 extension)
  - [x] 7.2 Heading: "Interested in [Division Name]?"
  - [x] 7.3 Body: "Get in touch with our [division name] team to discuss your needs."
  - [x] 7.4 CTA: "Contact Our Team" → `/contact/divisions/[slug]/`
  - [x] 7.5 NOT generic — heading, body, and link are all division-specific

- [x] Task 8: Verify all 7 division pages (AC: #9)
  - [x] 8.1 Verify `npm run build` generates all 7 pages
  - [x] 8.2 Spot-check 2-3 division pages for correct data rendering
  - [x] 8.3 Verify breadcrumb trail accuracy (correct cluster parent)
  - [x] 8.4 Verify cluster accent tints applied correctly per division

## Dev Notes

### 5-Section Division Detail Template

Every division page follows this identical structure:

```
DivisionLayout (extends PageLayout)
  ├── BreadcrumbNav: Home > Divisions > [Cluster] > [Division]
  │
  ├── Section 1: Overview & Positioning (hero gradient + prose)
  │   ├── Gold eyebrow: [Cluster Name]
  │   ├── H1: [Division Name]
  │   ├── Sub-heading: [tagline]
  │   └── Prose: [overview paragraphs]
  │
  ├── Section 2: Capabilities (neutral-50 bg)
  │   ├── Heading: "What We Offer"
  │   └── CapabilityCard × 3-6 in 3-col grid
  │
  ├── Section 3: Proof/Credentials (neutral-900 bg)
  │   ├── Heading: "Our Track Record"
  │   ├── StatCounter × 3-4 (gold numbers, animated)
  │   ├── Optional: certification logos row
  │   └── Optional: testimonial quote
  │
  ├── Section 4: Related Insights (white bg)
  │   ├── Heading: "Latest in [Division Name]"
  │   ├── InsightCard × 3
  │   └── ViewAllLink → /insights/divisions/[slug]/
  │
  └── Section 5: Inquiry CTA (gold bg)
      ├── Heading: "Interested in [Division Name]?"
      └── CTA → /contact/divisions/[slug]/
```

### DivisionLayout.astro Pattern

```astro
---
import PageLayout from '@/layouts/PageLayout.astro';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.astro';
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import SectionHeading from '@/components/layout/SectionHeading.astro';

interface Props {
  division: { name: string; slug: string; tagline: string; overview: string; capabilities: any[]; stats: any[]; certifications?: string[]; testimonial?: string; clusterSlug: string; contactEmail: string };
  cluster: { name: string; slug: string };
  articles: any[];
  seo: { title: string; description: string; canonical?: string; jsonLd?: any };
  accentColor: 'amber' | 'copper' | 'slate';
}

const { division, cluster, articles, seo, accentColor } = Astro.props;

// Breadcrumbs constructed from division + cluster props
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Divisions', href: '/divisions/' },
  { label: cluster.name, href: `/divisions/${cluster.slug}/` },
  { label: division.name },  // no href = current page
];
---

<PageLayout seo={seo}>
  <BreadcrumbNav items={breadcrumbs} slot="breadcrumb" />

  <!-- Section 1: Hero + Overview -->
  <!-- Section 2: Capabilities -->
  <!-- Section 3: Proof/Credentials -->
  <!-- Section 4: Related Insights -->
  <!-- Section 5: Inquiry CTA -->
</PageLayout>
```

### getStaticPaths Pattern

```astro
---
// This code is ADDED to the existing src/pages/divisions/[slug].astro
// alongside the cluster paths from Story 3.2.

import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const clusters = await getCollection('clusters');
  const divisions = await getCollection('divisions');
  const articles = await getCollection('articles');

  // --- Cluster paths (Story 3.2 — already exists) ---
  const clusterPaths = clusters.map(cluster => {
    // ... (Story 3.2 cluster path logic unchanged)
    return {
      params: { slug: cluster.data.slug },
      props: { type: 'cluster' as const, /* ... cluster props ... */ },
    };
  });

  // --- Division paths (Story 3.3 — added here) ---
  const accentMap: Record<string, 'amber' | 'copper' | 'slate'> = {
    'agriculture-processing': 'amber',
    'trade-markets': 'copper',
    'built-environment-energy': 'slate',
  };

  const divisionPaths = await Promise.all(divisions.map(async (division) => {
    const cluster = await getEntry('clusters', division.data.clusterSlug);

    const divisionArticles = articles
      .filter(a => a.data.divisionSlug === division.data.slug)
      .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
      .slice(0, 3);

    const displayArticles = divisionArticles.length > 0
      ? divisionArticles
      : articles
          .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
          .slice(0, 3);

    return {
      params: { slug: division.data.slug },
      props: {
        type: 'division' as const,
        division: division.data,
        cluster: cluster!.data,
        articles: displayArticles,
        accentColor: accentMap[division.data.clusterSlug] || 'amber',
      },
    };
  }));

  return [...clusterPaths, ...divisionPaths];
}

const props = Astro.props;
---

{/* Conditional rendering */}
{props.type === 'cluster' ? (
  /* Story 3.2 cluster page content */
) : (
  /* Story 3.3 DivisionLayout content */
)}
```

### All 7 Division Pages

| Route | Division | Cluster | Accent |
|-------|----------|---------|--------|
| `/divisions/crop-farming/` | Crop Farming | Agriculture & Processing | amber |
| `/divisions/animal-husbandry/` | Animal Husbandry | Agriculture & Processing | amber |
| `/divisions/agro-processing/` | Agro-Processing | Agriculture & Processing | amber |
| `/divisions/commodity-marketing/` | Commodity Marketing | Trade & Markets | copper |
| `/divisions/import-export/` | Import & Export | Trade & Markets | copper |
| `/divisions/real-estate/` | Real Estate | Built Environment & Energy | slate |
| `/divisions/oil-gas/` | Oil & Gas | Built Environment & Energy | slate |

### Cluster Accent Icon Styling

```typescript
const accentStyles = {
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  copper: { bg: 'bg-copper-100', text: 'text-copper-600' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600' },
};
```

Applied to CapabilityCard icon circles and StatCounter section highlights. **Never** to borders, backgrounds, or navigation elements.

### CapabilityCard.astro Pattern

```astro
---
interface Props {
  icon: string;
  name: string;
  description: string;
  accentBg?: string;
  accentText?: string;
}

const { icon, name, description, accentBg = 'bg-primary-100', accentText = 'text-primary-600' } = Astro.props;
---

<div class="rounded-xl p-6">
  <div class={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${accentBg}`}>
    <span class={`text-xl ${accentText}`} aria-hidden="true">{icon}</span>
  </div>
  <h3 class="font-heading text-lg font-semibold text-neutral-900">{name}</h3>
  <p class="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
</div>
```

For MVP, icons use emoji/text placeholders from the division seed data `capabilities[].icon` field. Replace with Lucide or custom SVGs post-MVP.

### Division-Specific SEO Pattern

```typescript
const seo = {
  title: `${division.name} — Global Resources Citadel Limited | ${cluster.name}`,
  description: `Explore Global Resources Citadel's ${division.name} division. Learn about our capabilities in ${division.capabilities.slice(0,3).map(c => c.name).join(', ')} and connect with our team.`,
  canonical: `${import.meta.env.SITE_URL}/divisions/${division.slug}/`,
  jsonLd: [
    generateBreadcrumbJsonLd(breadcrumbs, import.meta.env.SITE_URL),
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: `Global Resources Citadel — ${division.name}`,
      url: `${import.meta.env.SITE_URL}/divisions/${division.slug}/`,
      parentOrganization: {
        '@type': 'Organization',
        name: 'Global Resources Citadel Limited',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${division.name} — Global Resources Citadel Limited`,
      description: division.seoDescription,
      url: `${import.meta.env.SITE_URL}/divisions/${division.slug}/`,
    },
  ],
};
```

### Reusable Components from Previous Stories

| Component | Source Story | Usage in This Story |
|-----------|-------------|---------------------|
| PageLayout | 1.4 | Base layout wrapper |
| SectionWrapper | 1.4 | All 5 sections with variant alternation |
| SectionHeading | 1.4 | Section headings with eyebrow |
| BreadcrumbNav | 1.8 | 4-level breadcrumb |
| StatCounter | 2.3 | Section 3 — division-specific stats |
| InsightCard | 2.4 | Section 4 — related articles |
| CTABanner | 1.4 + 2.4 | Section 5 — gold variant with division-specific text |
| ViewAllLink | 1.4 | Section 4 — link to division insights |
| Button | 1.4 | CTA buttons |

### Section Background Alternation

| Section | Background | Variant |
|---------|-----------|---------|
| 1. Overview hero | gradient primary-900→700 | hero |
| 1. Overview prose | white | default |
| 2. Capabilities | neutral-50 | light |
| 3. Proof/Credentials | neutral-900 | dark |
| 4. Related Insights | white | default |
| 5. Inquiry CTA | gold gradient | gold (CTABanner) |

### Soft Forward Links

- `/contact/divisions/[slug]/` — built in Epic 4. Will 404 until then.
- `/insights/divisions/[slug]/` — built in Epic 6. Will 404 until then.
- Article detail links `/insights/[slug]/` — built in Epic 6.

### Previous Story Intelligence

**Story 3.2** creates `src/pages/divisions/[slug].astro` with cluster paths (`type: 'cluster'`). This story extends the SAME file by adding division paths (`type: 'division'`) and conditional rendering for DivisionLayout.

**Story 2.3** creates StatCounter.tsx and CredibilityBar.astro. Reuse the StatCounter island for division-specific stats. May reuse CredibilityBar directly or render StatCounters inline.

**Story 2.4** creates InsightCard.astro. Reuse standard variant in 3-column grid for related insights.

**Story 1.4** provides all layout components. DivisionLayout.astro is new but extends PageLayout.

**Story 1.3** provides division content collections with all required fields: `name`, `slug`, `clusterSlug`, `tier`, `tagline`, `overview`, `capabilities[]`, `stats[]`, `contactEmail`, `certifications[]`, `testimonial`, `seoTitle`, `seoDescription`.

### What This Story Does NOT Include

- No real division hero images — gradient background for MVP
- No real capability icons — emoji/text placeholders
- No real certification logos — text placeholders
- No contact forms or inquiry submission (Epic 4)
- No insights hub or article detail pages (Epic 6)
- No search functionality (Epic 7)

### What This Story Completes

This is the **final story in Epic 3**. After this story:
- `/divisions/` — hub page with all 7 divisions by cluster (3.1)
- `/divisions/[cluster-slug]/` — 3 cluster context pages (3.2) — via `[slug].astro` with `type: 'cluster'`
- `/divisions/[division-slug]/` — 7 division detail pages with 5-section template (3.3) — via same `[slug].astro` with `type: 'division'`

The complete division discovery and detail experience is live. Visitors can browse the portfolio, understand cluster context, and evaluate individual divisions before inquiring.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/layouts/DivisionLayout.astro`
- **Modifies:** `src/pages/divisions/[slug].astro` — extends Story 3.2's shared route file by adding 7 division paths (with `type: 'division'`) to `getStaticPaths` and conditional rendering for DivisionLayout. Does NOT create a separate `[division].astro` file.
- **Creates:** `src/components/divisions/CapabilityCard.astro`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P07-P13 Division Detail wireframe, sections 6.1-6.5, SEO patterns]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — 5-section pattern, CapabilityCard, cluster accents, DivisionLayout]
- [Source: _bmad-output/planning-artifacts/architecture.md — DivisionLayout.astro, getStaticPaths, island hydration map]
- [Source: _bmad-output/implementation-artifacts/2-3-credibility-signals-stats-section.md — StatCounter, CredibilityBar]
- [Source: _bmad-output/implementation-artifacts/2-4-latest-insights-contact-cta-sections.md — InsightCard, CTABanner gold variant]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Division schema with all fields]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
- Build verified: all 10 routes generated (3 cluster + 7 division) — 13 pages total including hub, home, token-test
- TypeScript check passed with no errors
- Heading hierarchy validated on crop-farming: H1 → H2 (What We Offer) → H3 × 4 capabilities → H2 (Our Track Record) → H2 (Latest) → H3 insight → H2 CTA — clean, no skipped levels
- JSON-LD verified: BreadcrumbList + Organization (department) + WebPage on all division pages
- Cluster accent colours verified: amber on crop-farming, copper on commodity-marketing, slate on real-estate (8 class references per page = 4 CapabilityCards × 2 accent classes)
- Breadcrumb trail verified: oil-gas page correctly shows "Built Environment & Energy" as parent cluster
- Gold CTA variant confirmed via `from-gold-600 to-gold-400` class presence
- StatCounter island present and hydrated via `client:visible`

### Completion Notes List
- Created `CapabilityCard.astro` — icon circle with cluster accent bg/text, Lucide icon names mapped to emoji placeholders for MVP, H3 name + description
- Created `DivisionLayout.astro` — 5-section layout extending PageLayout: hero+overview, capabilities grid, proof/credentials (StatCounter + optional certifications/testimonial), related insights, gold CTA
- Extended `[slug].astro` — added `DivisionProps` interface, 7 division paths to `getStaticPaths`, conditional rendering (`isCluster ? cluster page : DivisionLayout`), division-specific SEO with Organization+WebPage JSON-LD, 4-level breadcrumbs
- Division stats mapped from schema's `unit` field to StatCounter's `suffix` prop
- Article fallback logic: division-tagged articles first, company-wide fallback, section omitted if zero articles
- Insights heading adapts: "Latest in [Division]" for tagged articles, "Latest from Global Resources Citadel" for fallback
- Division CTA links to `/contact/divisions/[slug]/` (Epic 4 forward link)
- ViewAllLink points to `/insights/divisions/[slug]/` (Epic 6 forward link)

### File List
- `src/components/divisions/CapabilityCard.astro` — **Created** — capability card with icon circle, cluster accent, and description
- `src/layouts/DivisionLayout.astro` — **Created** — 5-section division detail page layout
- `src/pages/divisions/[slug].astro` — **Modified** — added 7 division paths, DivisionProps, conditional rendering
- `src/components/shared/StatCounter.tsx` — **Modified** — suffix/unit rendered at smaller font size to prevent line wrapping
- `src/pages/divisions/index.astro` — **Modified** — CTA variant changed from dark to gold

### Review Findings

- [x] [Review][Patch] SEO title double-suffix — FIXED: pass `${division.name} | ${cluster.name}` to generateMetadata, letting it append the site name suffix once
- [x] [Review][Patch] `streamLabels` duplicated — FIXED: extracted to `STREAM_LABELS` in `@/lib/divisions.ts`, both files now import from shared module
- [x] [Review][Patch] ViewAllLink href/label not updated during article fallback — FIXED: changes to `/insights/` and "View All Insights" when `isArticleFallback` is true
- [x] [Review][Patch] StatCounter lacks `aria-live` — FIXED: added `aria-live="polite"` on number container + sr-only span with final value for immediate screen reader access
- [x] [Review][Patch] `accentMap` hardcoded — FIXED: replaced with `parentCluster!.data.accentColor ?? 'amber'`, single source of truth from cluster YAML
- [x] [Review][Patch] Insights grid responsive breakpoints inconsistent — FIXED: aligned to `sm:grid-cols-2 lg:grid-cols-3` matching cluster page pattern
- [x] [Review][Defer] `parentCluster!` non-null assertion in getStaticPaths — safe due to Zod enum + `validateContentIntegrity()` build-time guard, but a defensive check would be better
- [x] [Review][Defer] Breadcrumbs computed in both `[slug].astro` (for JSON-LD) and `DivisionLayout.astro` (for rendered nav) — currently identical, but can diverge. Maintenance risk.
- [x] [Review][Defer] StatCounter visual flash — renders final value before hydration, then resets to 0 and animates up. Pre-existing behavior, not introduced by this story.
- [x] [Review][Defer] StatCounter layout shift with large numbers (`500,000`) — `toLocaleString()` formatting causes width jumps during animation. Pre-existing.
- [x] [Review][Defer] Import path inconsistency `@/content/config` (in lib/divisions.ts) vs `@/content.config` (in pages/layouts) — pre-existing
- [x] [Review][Defer] Stats grid 3-item orphan on mobile 2-col layout — all divisions have 3 stats, 3rd sits alone in 2nd row. Design consideration.
- [x] [Review][Defer] CapabilityCard icon fallback renders `●` for unmapped Lucide names — MVP limitation, swap to SVG icons when design assets available

### Change Log
- 2026-04-02: Story 3.3 implemented — 7 division detail pages with 5-section template (overview, capabilities, proof, insights, CTA), completing Epic 3
- 2026-04-02: UX fixes — StatCounter suffix rendering, stats grid columns, gold CTA consistency (details below)
- 2026-04-02: Code review — 6 patches applied (SEO title, streamLabels shared module, ViewAllLink fallback, StatCounter aria-live, accentMap removal, grid breakpoints), 7 deferred

### Post-Implementation UX Refinements (2026-04-02)

**StatCounter suffix rendering** (`src/components/shared/StatCounter.tsx`)
- **Problem:** Units like "tonnes", "tonnes/day" rendered at the same `text-5xl` size as the number, causing the stat to wrap to two lines and break visual alignment with unit-less stats.
- **Fix:** Number stays `text-5xl`; suffix/unit now renders at `text-xl` with `opacity-80` — visually subordinate, stays on one line. Prefix gets the same treatment. This also improves the homepage "+" suffixes on CredibilityBar.
- **Decision:** Intentional shared component change. Affects all StatCounter instances (homepage CredibilityBar + division detail pages). No regressions — homepage stats verified.

**Stats grid columns** (`src/layouts/DivisionLayout.astro`)
- **Problem:** Grid used `md:grid-cols-4` but all divisions have 3 stats, leaving an empty 4th column.
- **Fix:** Grid dynamically uses `md:grid-cols-3` for 3 stats, `md:grid-cols-4` for 4. Unit suffix also gets a leading space (`" tonnes"` not `"tonnes"`).

**Gold CTA consistency across divisions section** (`index.astro`, `[slug].astro`)
- **Problem:** Division detail pages used gold CTA variant, but the hub page and cluster pages used dark variant — visual inconsistency within the same section.
- **Fix:** Changed hub (`/divisions/`) and cluster pages (`/divisions/[cluster]/`) from `variant="dark"` to `variant="gold"`. All pages in the divisions section now share the gold CTA treatment.
- **Decision:** Intentional deviation from Story 3.1/3.2 original dark variant. Gold unifies the divisions section visually and reinforces the premium brand accent. The dark variant is still used elsewhere (e.g. homepage CTA) for contrast variety across the site.
