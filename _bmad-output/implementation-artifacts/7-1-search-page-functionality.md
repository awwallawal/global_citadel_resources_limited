# Story 7.1: Search Page & Functionality

Status: done

## Story

As a **visitor**,
I want to search the entire platform for pages, divisions, insights, and contacts,
So that I can find what I need quickly when navigation alone is not enough.

## Acceptance Criteria

1. Full-width SearchInput on `/search/` with placeholder "Search for pages, divisions, insights, contacts..." and submit button
2. Submitting a query updates URL to `/search?q=[query]` and displays results
3. SearchFilterTabs: All, Pages, Divisions, Insights, Contacts — filtering by type parameter (`/search?q=[query]&type=[type]`)
4. Results count displayed below filter bar
5. Each SearchResultCard shows type badge, linked title, URL path, excerpt with highlighted terms, parent/meta info
6. "Load More Results" loads 10 additional results per click
7. NoResultsState: "No results found for '[query]'." with recovery links to Divisions, Insights, Contact
8. Search page has `noindex, follow` robots meta
9. Breadcrumbs: Home > Search
10. SearchOverlay (React island, `client:idle`) in header provides quick search navigating to search page

## Tasks / Subtasks

- [x] Task 1: Build search index at build time (AC: #2, #5)
  - [x] 1.1 Create `src/lib/search.ts` — build-time index generator
  - [x] 1.2 Index divisions: id, slug, title (name), type "division", section, summary (tagline)
  - [x] 1.3 Index clusters: id, slug, title (name), type "page", section "divisions", summary (tagline)
  - [x] 1.4 Index articles: id, slug, title, type "insight", section, summary (excerpt), stream, publishedAt, divisionSlug
  - [x] 1.5 Index static pages: about, investors-partners, contact hub, contact sub-pages
  - [x] 1.6 Index contact routes: general, strategic, 7 division contacts as type "contact"
  - [x] 1.7 Generate JSON search index exported for client-side use

- [x] Task 2: Create `src/pages/search.astro` (AC: #1, #8, #9)
  - [x] 2.1 PageLayout with SEO: title "Search — Global Resources Citadel"
  - [x] 2.2 Robots: `<meta name="robots" content="noindex, follow" />`
  - [x] 2.3 BreadcrumbNav: Home > Search
  - [x] 2.4 Heading: "Search Global Resources Citadel"
  - [x] 2.5 Render SearchPage React island with `client:load`

- [x] Task 3: Create SearchPage.tsx React island (AC: #1, #2, #3, #4, #5, #6, #7)
  - [x] 3.1 Create `src/components/search/SearchPage.tsx` with `client:load`
  - [x] 3.2 Read `q` and `type` from URL search params on mount
  - [x] 3.3 SearchInput: text input + submit button, updates URL on submit
  - [x] 3.4 Client-side search: filter index by query (case-insensitive match on title + summary)
  - [x] 3.5 SearchFilterTabs: All, Pages, Divisions, Insights, Contacts — updates `type` URL param. Each tab button: `focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
  - [x] 3.6 Results count: "[X] results found for '[query]'"
  - [x] 3.7 SearchResultCard for each result: type badge, linked title, URL path, excerpt, meta
  - [x] 3.8 Term highlighting: bold matched terms in title + excerpt
  - [x] 3.9 Pagination: show first 10, "Load More Results" reveals next 10. Button: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
  - [x] 3.10 NoResultsState with recovery links
  - [x] 3.11 Empty state (no query): show prompt text, no results

- [x] Task 4: Create SearchOverlay.tsx (AC: #10)
  - [x] 4.1 Create `src/components/search/SearchOverlay.tsx` with `client:idle`
  - [x] 4.2 Triggered by search icon in header (from Story 1.5)
  - [x] 4.3 Modal overlay with search input
  - [x] 4.4 Quick results preview (top 5 matches) as user types
  - [x] 4.5 "View all results" link navigates to `/search?q=[query]`
  - [x] 4.6 Escape closes overlay, focus trapped within
  - [x] 4.7 `aria-label="Search"`, `role="dialog"`, `aria-modal="true"`

- [x] Task 5: Integrate SearchOverlay into Header (AC: #10)
  - [x] 5.1 Wire desktop search icon click in Header.astro to open SearchOverlay
  - [x] 5.2 SearchOverlay rendered with `client:idle` (not needed immediately)
  - [x] 5.3 **Desktop (md+):** search icon triggers SearchOverlay modal. **Mobile (below md):** search icon remains a plain `<a href="/search/">` link (Story 1.6 pattern) — better UX than modal overlay on small screens.
  - [x] 5.4 Header.astro (or PageLayout) must call `buildSearchIndex()` and pass the index to SearchOverlay as a prop. For ~50 items this is a few KB inlined per page — acceptable for MVP. Post-MVP: consider writing the index to a static JSON file at build time and fetching on demand to avoid per-page inline cost.

## Dev Notes

### Search Architecture — Client-Side Static Search

No server-side search API. Build a static JSON index at build time, load it client-side, and filter with JavaScript. This is appropriate because:
- Total page count is ~31 routes + articles — small corpus
- Zero server cost (no search API, no database)
- Works offline / on slow connections
- Fast response time (no network round-trip for results)

### Build-Time Search Index

Generate in `src/lib/search.ts`, consumed by the search page:

```typescript
import { getCollection } from 'astro:content';

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  type: 'page' | 'division' | 'insight' | 'contact';
  section: string;
  summary: string;
  url: string;
  division?: string;
  stream?: string;
  publishedAt?: string;
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const divisions = await getCollection('divisions');
  const clusters = await getCollection('clusters');
  const articles = await getCollection('articles');

  const index: SearchItem[] = [];

  // Divisions
  divisions.forEach(d => index.push({
    id: d.id, slug: d.data.slug, title: d.data.name,
    type: 'division', section: 'Divisions',
    summary: d.data.tagline, url: `/divisions/${d.data.slug}/`,
  }));

  // Clusters
  clusters.forEach(c => index.push({
    id: c.id, slug: c.data.slug, title: c.data.name,
    type: 'page', section: 'Divisions',
    summary: c.data.tagline, url: `/divisions/${c.data.slug}/`,
  }));

  // Articles
  articles.forEach(a => index.push({
    id: a.id, slug: a.id, title: a.data.title,
    type: 'insight', section: 'Insights',
    summary: a.data.excerpt, url: `/insights/${a.id}/`,
    division: a.data.divisionSlug, stream: a.data.stream,
    publishedAt: a.data.publishedAt,
  }));

  // Static pages
  const staticPages: SearchItem[] = [
    { id: 'about', slug: 'about', title: 'About the Group', type: 'page', section: 'The Group', summary: 'Our story, mission, leadership, and credentials.', url: '/about/' },
    { id: 'investors', slug: 'investors-partners', title: 'Investors & Partners', type: 'page', section: 'The Group', summary: 'Partnership and investment opportunities.', url: '/investors-partners/' },
    { id: 'contact', slug: 'contact', title: 'Contact', type: 'contact', section: 'Contact', summary: 'Get in touch with Global Resources Citadel.', url: '/contact/' },
    { id: 'contact-general', slug: 'contact-general', title: 'General Enquiries', type: 'contact', section: 'Contact', summary: 'Send a general enquiry.', url: '/contact/general/' },
    { id: 'contact-strategic', slug: 'contact-strategic', title: 'Partner & Investor Contact', type: 'contact', section: 'Contact', summary: 'Strategic partnerships and investment discussions.', url: '/contact/strategic/' },
  ];
  index.push(...staticPages);

  // Division contact pages
  divisions.forEach(d => index.push({
    id: `contact-${d.data.slug}`, slug: d.data.slug, title: `${d.data.name} Enquiry`,
    type: 'contact', section: 'Contact',
    summary: `Contact our ${d.data.name} team.`, url: `/contact/divisions/${d.data.slug}/`,
    division: d.data.slug,
  }));

  return index;
}
```

### Passing Index to Client

In `search.astro`, build the index at page generation time and pass as a JSON prop:

```astro
---
import { buildSearchIndex } from '@/lib/search';
const searchIndex = await buildSearchIndex();
---

<SearchPage client:load index={searchIndex} />
```

This embeds the search index as a JSON prop in the page HTML. For ~50 items, this is a few KB — well within acceptable page weight.

### Client-Side Search Logic

Simple case-insensitive substring match on title + summary:

```typescript
function search(index: SearchItem[], query: string, type?: string): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index
    .filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
      const matchesType = !type || type === 'all' || item.type === type;
      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      // Title matches rank higher
      const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
      return bTitle - aTitle;
    });
}
```

For MVP this is sufficient. Post-MVP: add fuzzy matching (e.g., Fuse.js) or server-side search.

### SearchOverlay — Quick Search Experience

SearchOverlay is a modal that provides instant results as the user types. It uses the same search index but shows only top 5 results. Navigating to "View all results" goes to `/search?q=[query]`.

Per architecture: SearchOverlay uses `client:idle` — not needed immediately, hydrates when browser is idle.

```astro
<!-- In Header.astro -->
<SearchOverlay client:idle index={searchIndex} />
```

### SearchResultCard Pattern

```tsx
function SearchResultCard({ item, query }: { item: SearchItem; query: string }) {
  const typeBadgeColors: Record<string, string> = {
    page: 'bg-primary-50 text-primary-700',
    division: 'bg-amber-50 text-amber-700',
    insight: 'bg-info-100 text-info-600',
    contact: 'bg-gold-100 text-gold-600',
  };

  return (
    <a href={item.url} className="block rounded-xl border border-neutral-200 p-5 motion-safe:transition-colors motion-safe:hover:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadgeColors[item.type]}`}>
        {item.type}
      </span>
      <h3 className="mt-2 font-heading text-lg font-semibold text-neutral-900">
        {highlightTerms(item.title, query)}
      </h3>
      <p className="mt-0.5 text-xs text-neutral-400">{item.url}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-2">
        {highlightTerms(item.summary, query)}
      </p>
      {item.section && (
        <p className="mt-2 text-xs text-neutral-500">{item.section}</p>
      )}
    </a>
  );
}
```

### Term Highlighting

```tsx
function highlightTerms(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-gold-100 text-neutral-900 rounded px-0.5">{part}</mark> : part
  );
}
```

### NoResultsState Pattern

```tsx
<div className="py-16 text-center">
  <p className="text-lg text-neutral-600">No results found for "<strong>{query}</strong>".</p>
  <p className="mt-4 text-sm text-neutral-500">Try a different search, or explore:</p>
  <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
    <a href="/divisions/" className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Browse Our Divisions</a>
    <a href="/insights/" className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Read Latest Insights</a>
    <a href="/contact/" className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Contact Us</a>
  </div>
</div>
```

### Previous Story Intelligence

**Story 1.5** creates the header with a search icon placeholder. This story wires it to SearchOverlay.

**Story 1.6** creates the mobile header with a search icon linking to `/search/`. That link now resolves.

**Story 1.3** provides content collections (divisions, clusters, articles) used to build the search index.

**Story 1.4** provides PageLayout, SectionWrapper, Button.

**Story 1.8** provides BreadcrumbNav.

### What This Story Does NOT Include

- No server-side search API
- No fuzzy matching (post-MVP — add Fuse.js)
- No search analytics
- No autosuggest/autocomplete beyond SearchOverlay quick results
- No voice search
- No search result ranking by popularity

### Project Structure Notes

Files this story creates:
- **Creates:** `src/pages/search.astro`
- **Creates:** `src/components/search/SearchPage.tsx` — React island (`client:load`)
- **Creates:** `src/components/search/SearchOverlay.tsx` — React island (`client:idle`)
- **Creates:** `src/lib/search.ts` — build-time search index generator
- **Modifies:** `src/components/layout/Header.astro` — wires search icon to SearchOverlay

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 7, Story 7.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P28 Search page wireframe, search index model, filter tabs, result cards, no-results state]
- [Source: _bmad-output/planning-artifacts/architecture.md — SearchOverlay client:idle, search component]
- [Source: _bmad-output/implementation-artifacts/1-5-header-navigation-division-dropdown.md — Search icon placeholder in header]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build passes: /search/index.html rendered, SearchOverlay embedded in all pages via Header
- robots meta verified: `<meta name="robots" content="noindex, follow">` present on search page
- TypeScript: no errors
- Added `robots` optional field to SeoMetadata interface and BaseLayout props for clean meta rendering

### Completion Notes List

- Created `src/lib/search.ts` with `buildSearchIndex()` — indexes 7 divisions, 3 clusters, 6 articles, 6 static pages, 8 contact pages (~30 items)
- Created `src/pages/search.astro` with PageLayout, hero, breadcrumbs, noindex robots meta, SearchPage React island
- Created `src/components/search/SearchPage.tsx` (client:load) — full-width search input, URL param sync (q, type), filter tabs (All/Pages/Divisions/Insights/Contacts), result cards with type badges, term highlighting via regex, Load More (10 per batch), no-results state with recovery links, empty state
- Created `src/components/search/SearchOverlay.tsx` (client:idle) — modal overlay triggered by custom event, top 5 quick results, "View all results" link, Escape closes, focus trap, backdrop click close, aria-modal dialog
- Modified DesktopNav.tsx: changed search icon from `<a>` to `<button>` dispatching `open-search-overlay` custom event
- Modified Header.astro: imports SearchOverlay + buildSearchIndex, passes index as prop with client:idle
- Mobile search icon remains `<a href="/search/">` link — better UX than modal on small screens
- Added `robots` optional field to SeoMetadata interface (seo.ts) and BaseLayout props for reusable noindex support

### Change Log

- 2026-04-04: Story 7.1 implemented — Search page with client-side index, SearchOverlay in header, filter tabs, result cards, term highlighting

### File List

- `src/lib/search.ts` (created)
- `src/pages/search.astro` (created)
- `src/components/search/SearchPage.tsx` (created)
- `src/components/search/SearchOverlay.tsx` (created)
- `src/components/navigation/DesktopNav.tsx` (modified — search icon → button with custom event)
- `src/components/layout/Header.astro` (modified — added SearchOverlay with client:idle)
- `src/lib/seo.ts` (modified — added robots field to SeoMetadata)
- `src/layouts/BaseLayout.astro` (modified — added robots prop and meta rendering)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

### Review Findings

- [x] [Review][Patch] highlightTerms regex bug — fixed: replaced regex.test() with string comparison
- [x] [Review][Patch] Heading hierarchy h1→h3 — fixed: added sr-only h2 "Search Results"
- [x] [Review][Patch] SearchOverlay scroll lock — fixed: added body overflow:hidden when open
- [x] [Review][Patch] SearchOverlay focus restoration — fixed: capture/restore previousFocusRef on open/close
- [x] [Review][Patch] Search index missing pages — fixed: added homepage, /divisions/, /insights/ hub + category pages
- [x] [Review][Patch] focus-visible:outline-none — fixed: added to filter tabs and Load More button
- [x] [Review][Patch] gold-700 → gold-600 — fixed: in both SearchPage and SearchOverlay
- [x] [Review][Patch] Touch targets — fixed: p-3 on submit buttons, min-h-11 min-w-11 on ESC button
- [x] [Review][Patch] Flash of empty state — fixed: initialize useState from URL params directly
- [x] [Review][Defer] Search index embedded in every page — MVP acceptable per spec Task 5.4
- [x] [Review][Defer] No debounce on search input — trivial with ~30 items
- [x] [Review][Defer] div role="list" instead of semantic ul/li — Epic 8 a11y
