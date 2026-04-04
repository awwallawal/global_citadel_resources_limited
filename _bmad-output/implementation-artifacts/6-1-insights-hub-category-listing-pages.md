# Story 6.1: Insights Hub & Category Listing Pages

Status: done

## Story

As a **visitor**,
I want to browse news, updates, and thought leadership content organized by category,
So that I can stay informed about GRCL and its industries.

## Acceptance Criteria

1. `/insights/` — PageHero with "Insights" eyebrow, "News, Updates & Thought Leadership" heading; featured article as 2-column FeaturedArticleCard; FilterTabs (All, News & Updates, Thought Leadership, By Division dropdown); 9-card article grid; "Load More" button
2. Empty state: "No articles yet in this category. Check back soon." with link to all insights
3. Sub-pages `/insights/latest/`, `/insights/news/`, `/insights/thought-leadership/` render same template filtered by stream
4. `/insights/divisions/` renders taxonomy-hub with 7 division cards linking to `/insights/divisions/[slug]/`
5. `/insights/divisions/[slug]/` renders articles filtered to specific division via `getStaticPaths`
6. Breadcrumbs render correctly for all insights pages
7. SEO: CollectionPage structured data on all listing pages

## Tasks / Subtasks

- [x] Task 1: Create insights listing template component (AC: #1, #2)
  - [x] 1.1 Create `src/components/insights/InsightsListing.astro` — reusable listing template
  - [x] 1.2 Props: articles array, title, description, eyebrow, showFeatured (boolean), showFilterTabs (boolean)
  - [x] 1.3 Featured article section: FeaturedArticleCard (2-column: image left, meta right)
  - [x] 1.4 Article grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` with InsightCard
  - [x] 1.5 Empty state: styled message with link to `/insights/`
  - [x] 1.6 "Load More" button (client-side JS to show next 9, or initially render all and paginate via CSS/JS)

- [x] Task 2: Create FeaturedArticleCard.astro (AC: #1)
  - [x] 2.1 Create `src/components/insights/FeaturedArticleCard.astro`
  - [x] 2.2 2-column layout: image placeholder left, meta right (`grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`)
  - [x] 2.3 Category badge (gold-dark uppercase), headline (H3 text-2xl font-bold), date, excerpt (3-4 lines), "Read Article →" link
  - [x] 2.4 Card: `rounded-2xl border border-neutral-200 overflow-hidden`
  - [x] 2.5 Hover: border-color shifts to gold-600
  - [x] 2.6 Mobile: stack vertically

- [x] Task 3: Create FilterTabs component (AC: #1)
  - [x] 3.1 Create `src/components/insights/FilterTabs.astro` (static — tabs are links, not client-side filters)
  - [x] 3.2 Tabs as nav links: All (→ /insights/), News & Updates (→ /insights/news/), Thought Leadership (→ /insights/thought-leadership/), By Division (dropdown → /insights/divisions/)
  - [x] 3.3 Active tab: `text-primary-600 border-b-2 border-primary-600 font-semibold`
  - [x] 3.4 Inactive: `text-neutral-500 hover:text-neutral-900`
  - [x] 3.5 Mobile: horizontal scrollable with overflow-x-auto
  - [x] 3.6 Props: `currentPath` to determine active tab
  - [x] 3.7 "By Division" as dropdown link or simple link to `/insights/divisions/`

- [x] Task 4: Create Insights Hub page `/insights/index.astro` (AC: #1, #6, #7)
  - [x] 4.1 PageLayout with SEO: "Insights — News, Updates & Thought Leadership | Global Resources Citadel"
  - [x] 4.2 BreadcrumbNav: Home > Insights
  - [x] 4.3 Build page hero inline with SectionWrapper `variant="primary"` (primary-50 bg) — same pattern as hub pages (3.1, 4.1, 5.1). Eyebrow "Insights", heading "News, Updates & Thought Leadership", sub-heading. Centered text, `max-w-3xl`.
  - [x] 4.4 Fetch all articles, find featured (most recent with `featured: true` or just most recent)
  - [x] 4.5 Render InsightsListing with all articles, showFeatured=true, showFilterTabs=true
  - [x] 4.6 CollectionPage JSON-LD

- [x] Task 5: Create category sub-pages (AC: #3, #6)
  - [x] 5.1 `/insights/latest.astro` — all articles sorted by date, no featured hero
  - [x] 5.2 `/insights/news.astro` — filtered to streams: company-news, announcements, operational-updates
  - [x] 5.3 `/insights/thought-leadership.astro` — filtered to streams: thought-leadership, industry-commentary
  - [x] 5.4 Each uses InsightsListing template with filtered articles
  - [x] 5.5 Each has correct breadcrumbs (Home > Insights > [Category])
  - [x] 5.6 Each has FilterTabs with currentPath highlighting active tab

- [x] Task 6: Create division insights pages (AC: #4, #5)
  - [x] 6.1 `/insights/divisions/index.astro` — taxonomy hub with 7 division cards
  - [x] 6.2 Cards: icon + division name + article count + "View Insights →" link
  - [x] 6.3 Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - [x] 6.4 `/insights/divisions/[division].astro` with `getStaticPaths` for 7 division slugs
  - [x] 6.5 Each division insights page: filtered articles where `divisionSlug === slug`
  - [x] 6.6 Breadcrumbs: Home > Insights > By Division > [Division Name]
  - [x] 6.7 Fallback: "No articles yet for [Division]. Check back soon." + link to all insights

- [x] Task 7: Implement "Load More" pagination (AC: #1)
  - [x] 7.1 Initial render: show first 9 articles
  - [x] 7.2 "Load More" button reveals next 9 (client-side show/hide, OR Astro static generates all and CSS hides overflow)
  - [x] 7.3 For MVP: render all articles, use CSS `max-height` + `overflow-hidden` with JS toggle. Or simply show all if <20 articles.
  - [x] 7.4 Button text: "Load More" → hidden when all shown

## Dev Notes

### Insight Stream → Page Routing Map

| Stream Values | Page Route | Tab Label |
|---------------|-----------|-----------|
| ALL | `/insights/` | All |
| All (chronological) | `/insights/latest/` | — |
| company-news, announcements, operational-updates | `/insights/news/` | News & Updates |
| thought-leadership, industry-commentary | `/insights/thought-leadership/` | Thought Leadership |
| (by division) | `/insights/divisions/[slug]/` | By Division |

### FilterTabs — Static Navigation Links

FilterTabs are **not** client-side filters. Each tab is a link to a separate Astro page:

```astro
---
interface Props {
  currentPath: string;
}
const { currentPath } = Astro.props;

const tabs = [
  { label: 'All', href: '/insights/' },
  { label: 'News & Updates', href: '/insights/news/' },
  { label: 'Thought Leadership', href: '/insights/thought-leadership/' },
  { label: 'By Division', href: '/insights/divisions/' },
];
---

<nav aria-label="Insight categories" class="border-b border-neutral-200">
  <div class="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6 lg:px-8">
    {tabs.map(tab => (
      <a
        href={tab.href}
        class={cn(
          'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          currentPath === tab.href || (tab.href !== '/insights/' && currentPath.startsWith(tab.href))
            ? 'border-primary-600 text-primary-600 font-semibold'
            : 'border-transparent text-neutral-500 hover:text-neutral-900'
        )}
      >
        {tab.label}
      </a>
    ))}
  </div>
</nav>
```

This is the same pattern as AnchorNav from Story 5.1 but without scroll-spy — just route-based active state.

### FeaturedArticleCard Pattern

```astro
---
interface Props {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  href: string;
}
---

<a href={href} class="group grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-neutral-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-safe:transition-colors motion-safe:hover:border-gold-600 md:grid-cols-2 lg:gap-8">
  <!-- Left: image placeholder -->
  <div class="aspect-video bg-neutral-100 flex items-center justify-center md:aspect-auto md:min-h-64">
    <svg class="h-16 w-16 text-neutral-300" ...><!-- Image icon --></svg>
  </div>
  <!-- Right: meta -->
  <div class="flex flex-col justify-center p-6 md:p-8">
    <span class="text-xs font-semibold uppercase tracking-wide text-gold-600">{category}</span>
    <h3 class="mt-3 font-heading text-2xl font-bold leading-tight text-neutral-900 group-hover:text-primary-600">{title}</h3>
    <time class="mt-2 text-xs text-neutral-500">{formatDate(publishedAt)}</time>
    <p class="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">{excerpt}</p>
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
      Read Article <span class="motion-safe:transition-transform group-hover:translate-x-1">→</span>
    </span>
  </div>
</a>
```

### Article Filtering Pattern

```astro
---
import { getCollection } from 'astro:content';

const allArticles = (await getCollection('articles'))
  .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime());

// For /insights/news/
const newsStreams = ['company-news', 'announcements', 'operational-updates'];
const newsArticles = allArticles.filter(a => newsStreams.includes(a.data.stream));

// For /insights/thought-leadership/
const thoughtStreams = ['thought-leadership', 'industry-commentary'];
const thoughtArticles = allArticles.filter(a => thoughtStreams.includes(a.data.stream));

// Featured: most recent with featured flag, or just most recent
const featured = allArticles.find(a => a.data.featured) || allArticles[0];
const remaining = allArticles.filter(a => a.id !== featured?.id);
---
```

### "Load More" — MVP Approach

For MVP with few articles (<20), simplest approach is render all and don't paginate. If >9 articles, use a lightweight client-side toggle:

```astro
<div id="article-grid" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {articles.map((article, i) => (
    <div class={i >= 9 ? 'hidden' : ''} data-article-item>
      <InsightCard {...article.data} href={`/insights/${article.id}/`} />
    </div>
  ))}
</div>

{articles.length > 9 && (
  <button
    id="load-more"
    class="mx-auto mt-8 block rounded-lg border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    onclick="document.querySelectorAll('[data-article-item].hidden').forEach((el, i) => { if (i < 9) el.classList.remove('hidden') }); if (!document.querySelector('[data-article-item].hidden')) this.remove();"
  >
    Load More
  </button>
)}
```

Inline script keeps it zero-bundle — no React island needed for pagination.

### Division Insights Hub (`/insights/divisions/`)

Simple grid of 7 division cards with article counts:

```astro
---
const divisions = await getCollection('divisions');
const articles = await getCollection('articles');

const divisionInsights = divisions.map(div => ({
  ...div.data,
  articleCount: articles.filter(a => a.data.divisionSlug === div.data.slug).length,
}));
---
```

### Pages Created in This Story

| Route | File | Template |
|-------|------|----------|
| `/insights/` | `src/pages/insights/index.astro` | Hub with featured + tabs + grid |
| `/insights/latest/` | `src/pages/insights/latest.astro` | Listing (all, chronological) |
| `/insights/news/` | `src/pages/insights/news.astro` | Listing (news streams) |
| `/insights/thought-leadership/` | `src/pages/insights/thought-leadership.astro` | Listing (thought streams) |
| `/insights/divisions/` | `src/pages/insights/divisions/index.astro` | Taxonomy hub (7 division cards) |
| `/insights/divisions/[slug]/` | `src/pages/insights/divisions/[division].astro` | Division-filtered listing (7 pages) |

Total: 6 page files generating 12+ routes.

### Previous Story Intelligence

**Story 2.4** creates InsightCard.astro (standard + featured variants). Reuse standard variant in grids. FeaturedArticleCard is a new, larger format for the hub featured section.

**Story 1.3** provides article content collections with stream, divisionSlug, publishedAt, featured fields. Seed data has 1-2 articles.

**Story 1.2** provides `formatDate()` utility.

**Story 1.4** provides SectionWrapper, SectionHeading, PageHero, CTABanner, ViewAllLink, Button.

**Story 1.8** provides BreadcrumbNav.

### What This Story Does NOT Include

- No article detail pages (Story 6.2)
- No seed content creation (Story 6.3)
- No real article images — placeholders
- No server-side pagination (client-side "Load More" only)
- No search/filter beyond stream-based tabs

### Project Structure Notes

Files this story creates:
- **Creates:** `src/pages/insights/index.astro`
- **Creates:** `src/pages/insights/latest.astro`
- **Creates:** `src/pages/insights/news.astro`
- **Creates:** `src/pages/insights/thought-leadership.astro`
- **Creates:** `src/pages/insights/divisions/index.astro`
- **Creates:** `src/pages/insights/divisions/[division].astro`
- **Creates:** `src/components/insights/InsightsListing.astro`
- **Creates:** `src/components/insights/FeaturedArticleCard.astro`
- **Creates:** `src/components/insights/FilterTabs.astro`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 6, Story 6.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P14-P19 Insights pages wireframes, filter tabs, article grid, stream routing, taxonomy hub]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — InsightCard, publishing patterns]
- [Source: _bmad-output/implementation-artifacts/2-4-latest-insights-contact-cta-sections.md — InsightCard component]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Article collection schema, stream enum]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build validated: all 12 routes prerendered successfully (3 components, 6 page files)
- TypeScript check: no errors
- No ESLint config in project (Epic 8 concern)

### Completion Notes List

- Created InsightsListing.astro as reusable template with hero, FilterTabs, FeaturedArticleCard, article grid, empty state, and Load More — all pages compose through this single component
- Created FeaturedArticleCard.astro with 2-column layout (image placeholder + meta), hover border transition, accessible focus ring, datetime attribute
- Created FilterTabs.astro as static navigation links with route-based active state and aria-current, horizontal scrollable on mobile
- Insights hub (/insights/) renders all articles with featured article hero, filter tabs, CollectionPage JSON-LD with ItemList
- Category sub-pages (/insights/news/, /insights/thought-leadership/, /insights/latest/) filter by stream arrays
- Division taxonomy hub (/insights/divisions/) shows 7 division cards with article counts and emoji icons
- Dynamic division pages (/insights/divisions/[division]/) use getStaticPaths for 7 slugs with division-filtered articles
- Load More: inline script shows/hides articles in batches of 9 — zero-bundle, no React island
- All pages use PageLayout, SectionWrapper, BreadcrumbNav with correct hierarchy
- Reused existing InsightCard, STREAM_LABELS, DIVISION_ICONS, formatDate, cn utilities

### Change Log

- 2026-04-04: Story 6.1 implemented — Insights hub, category sub-pages, division insights pages, Load More pagination

### File List

- `src/components/insights/InsightsListing.astro` (created)
- `src/components/insights/FeaturedArticleCard.astro` (created)
- `src/components/insights/FilterTabs.astro` (created)
- `src/pages/insights/index.astro` (created)
- `src/pages/insights/latest.astro` (created)
- `src/pages/insights/news.astro` (created)
- `src/pages/insights/thought-leadership.astro` (created)
- `src/pages/insights/divisions/index.astro` (created)
- `src/pages/insights/divisions/[division].astro` (created)

### Review Findings

- [x] [Review][Decision] `/insights/latest/` page orphaned from FilterTabs — resolved: added "Latest" tab to FilterTabs
- [x] [Review][Patch] Missing CollectionPage JSON-LD on 5 listing pages — fixed: added CollectionPage structured data to all listing pages
- [x] [Review][Patch] Heading hierarchy skips h1 to h3 — fixed: added sr-only h2 section headings in InsightsListing and divisions/index
- [x] [Review][Patch] Division empty state lacks division name — fixed: added categoryName prop, personalized message
- [x] [Review][Patch] Division card competing transition utilities — fixed: replaced with transition-all duration-300
- [x] [Review][Patch] Duplicate import statement — fixed: merged into single import
- [x] [Review][Patch] Load More has no accessibility feedback — fixed: added aria-live region and aria-label on button
- [x] [Review][Patch] DIVISION_ICONS fallback missing — fixed: added fallback emoji
- [x] [Review][Patch] SVG placeholder missing aria-hidden — fixed: added aria-hidden="true"
- [x] [Review][Defer] Article detail links are 404s — deferred, Story 6.2
- [x] [Review][Defer] JSON-LD url values point to 404 article pages — deferred, Story 6.2
- [x] [Review][Defer] InsightCard missing date display — deferred, pre-existing (Story 2.4)
- [x] [Review][Defer] InsightCard missing "Read Article" CTA text — deferred, pre-existing (Story 2.4)
- [x] [Review][Defer] InsightCard border-neutral-300 vs spec neutral-200 — deferred, pre-existing (Story 2.4)
- [x] [Review][Defer] InsightCard missing overflow-hidden — deferred, pre-existing (Story 2.4)
- [x] [Review][Defer] InsightCard line-clamp-2 vs spec 3-4 lines + transition conflict — deferred, pre-existing (Story 2.4)
