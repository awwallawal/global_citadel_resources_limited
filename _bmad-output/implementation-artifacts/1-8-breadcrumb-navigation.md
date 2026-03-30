# Story 1.8: Breadcrumb Navigation

Status: done

## Story

As a **visitor**,
I want breadcrumb trails showing my position in the site hierarchy,
So that I can understand where I am and navigate back up the structure.

## Acceptance Criteria

1. BreadcrumbNav component displays below the header and above the page hero on all pages except the homepage
2. Uses `<nav aria-label="Breadcrumb">` with `<ol>` ordered list structure
3. All crumbs except the current page (final crumb) are clickable links
4. Final crumb is visually distinct (muted colour, non-linked) with `aria-current="page"`
5. Breadcrumbs follow defined patterns (e.g., Home > Divisions > [Cluster] > [Division])
6. On mobile, deep paths (4+ levels) truncate middle items with ellipsis
7. BreadcrumbList structured data (schema.org) included in page `<head>` for SEO

## Tasks / Subtasks

- [x] Task 1: Create BreadcrumbNav.astro component (AC: #1, #2, #3, #4)
  - [x] 1.1 Create `src/components/layout/BreadcrumbNav.astro`
  - [x] 1.2 Accept `items` prop: array of `{ label: string; href?: string }`
  - [x] 1.3 Render `<nav aria-label="Breadcrumb">` with `<ol>` structure
  - [x] 1.4 Chevron separator between items
  - [x] 1.5 Final item: `aria-current="page"`, muted text (non-linked)
  - [x] 1.6 All other items: clickable `<a>` links

- [x] Task 2: Implement mobile truncation (AC: #6)
  - [x] 2.1 When items > 3 on mobile, show: first item + ellipsis + last 2 items
  - [x] 2.2 Ellipsis is non-interactive, visually distinct
  - [x] 2.3 Full path always visible on desktop (sm+)

- [x] Task 3: Create BreadcrumbList JSON-LD helper (AC: #7)
  - [x] 3.1 Add `generateBreadcrumbJsonLd()` to `src/lib/seo.ts`
  - [x] 3.2 Accepts same items array, outputs schema.org BreadcrumbList
  - [x] 3.3 Include in page `<head>` via BaseLayout (updated to support jsonLd arrays)

- [x] Task 4: Integrate into PageLayout (AC: #1)
  - [x] 4.1 PageLayout breadcrumb slot already positioned correctly between header and main
  - [x] 4.2 Individual pages pass BreadcrumbNav via named slot: `<BreadcrumbNav items={breadcrumbs} slot="breadcrumb" />`
  - [x] 4.3 Conditionally hide on homepage (homepage omits slot — verified no breadcrumb in build output)

- [x] Task 5: Verify breadcrumb patterns (AC: #5)
  - [x] 5.1 Build verified: component compiles, no errors
  - [x] 5.2 Aria attributes verified in source: nav[aria-label], ol, aria-current="page", aria-hidden on decorative elements
  - [x] 5.3 JSON-LD helper verified: generateBreadcrumbJsonLd() produces valid schema.org BreadcrumbList, BaseLayout supports array

## Dev Notes

### BreadcrumbNav is a Static Astro Component

No client-side interactivity — pure Astro `.astro` file. Mobile truncation handled via CSS (`hidden`/`block` responsive classes), not JavaScript.

### Component Props Interface

```astro
---
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;  // undefined = current page (final crumb)
}

interface Props {
  items: BreadcrumbItem[];
  class?: string;
}

const { items, class: className } = Astro.props;
---
```

### Implementation Template

```astro
<nav aria-label="Breadcrumb" class={cn('py-3', className)}>
  <ol class="flex flex-wrap items-center gap-1.5 text-sm">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      const isFirst = index === 0;
      const isMiddle = !isFirst && !isLast;
      const showOnMobile = isFirst || index >= items.length - 2;

      return (
        <li class={cn(
          'flex items-center gap-1.5',
          !showOnMobile && items.length > 3 && 'hidden sm:flex'
        )}>
          {index > 0 && (
            <svg class="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {isLast ? (
            <span class="text-neutral-500" aria-current="page">
              {item.label}
            </span>
          ) : (
            <a href={item.href} class="text-neutral-600 hover:text-primary-600 transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              {item.label}
            </a>
          )}
        </li>
      );
    })}

    {/* Mobile ellipsis for truncated middle items */}
    {items.length > 3 && (
      <li class="flex items-center gap-1.5 sm:hidden" aria-hidden="true" style="order: 1">
        <svg class="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-neutral-400">...</span>
      </li>
    )}
  </ol>
</nav>
```

**IMPORTANT: Astro SVG casing.** This is an `.astro` file, not `.tsx`. SVG attributes must use HTML casing: `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"` — NOT JSX casing (`strokeWidth`, `strokeLinecap`, etc.). JSX casing will cause rendering issues in Astro templates.

**Note:** The mobile truncation approach above uses CSS `hidden sm:flex` on middle items and shows an ellipsis element only on mobile. The exact implementation may need adjustment based on CSS `order` support and how Astro renders the list. An alternative: render two separate lists (mobile-truncated and desktop-full) with responsive visibility classes.

### Complete Breadcrumb Path Reference

| Page | Route | Breadcrumb Trail |
|------|-------|-----------------|
| Homepage | `/` | (none — no breadcrumb) |
| About the Group | `/about/` | Home > About the Group |
| Divisions Hub | `/divisions/` | Home > Divisions |
| Cluster Page | `/divisions/[cluster]/` | Home > Divisions > [Cluster Name] |
| Division Detail | `/divisions/[division]/` | Home > Divisions > [Cluster Name] > [Division Name] |
| Insights Hub | `/insights/` | Home > Insights |
| Latest Insights | `/insights/latest/` | Home > Insights > Latest |
| News & Updates | `/insights/news/` | Home > Insights > News & Updates |
| Thought Leadership | `/insights/thought-leadership/` | Home > Insights > Thought Leadership |
| Insights by Division Hub | `/insights/divisions/` | Home > Insights > By Division |
| Division Insights | `/insights/divisions/[slug]/` | Home > Insights > By Division > [Division Name] |
| Article Detail | `/insights/[slug]/` | Home > Insights > [Category] > [Article Title] |
| Investors & Partners | `/investors-partners/` | Home > Investors & Partners |
| Contact Hub | `/contact/` | Home > Contact |
| General Enquiries | `/contact/general/` | Home > Contact > General Enquiries |
| Strategic Contact | `/contact/strategic/` | Home > Contact > Partner & Investor |
| Contact by Division | `/contact/divisions/` | Home > Contact > Contact by Division |
| Division Contact | `/contact/divisions/[slug]/` | Home > Contact > Contact by Division > [Division Name] |
| Locations | `/contact/locations/` | Home > Contact > Locations |
| Search | `/search/` | Home > Search |
| Privacy Policy | `/privacy-policy/` | Home > Privacy Policy |
| Terms of Use | `/terms/` | Home > Terms of Use |
| Sitemap | `/sitemap/` | Home > Sitemap |

### Breadcrumb Data Construction Pattern

Each page constructs its own breadcrumb items array in the Astro frontmatter. Example for a division detail page:

```astro
---
// src/pages/divisions/[division].astro
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.astro';
import { getEntry } from 'astro:content';

const { division: slug } = Astro.params;
const division = await getEntry('divisions', slug);
const cluster = await getEntry('clusters', division.data.clusterSlug);

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Divisions', href: '/divisions/' },
  { label: cluster.data.name, href: `/divisions/${cluster.data.slug}/` },
  { label: division.data.name },  // no href = current page
];
---

<PageLayout seo={seo}>
  <BreadcrumbNav items={breadcrumbs} slot="breadcrumb" />
  <!-- page content -->
</PageLayout>
```

### BreadcrumbList JSON-LD Schema

Add to `src/lib/seo.ts`:

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}
```

This is included in the page `<head>` via BaseLayout's `jsonLd` prop:

```astro
---
const jsonLd = generateBreadcrumbJsonLd(breadcrumbs, import.meta.env.SITE_URL);
---
<PageLayout seo={{ ...seo, jsonLd }}>
```

**JSON-LD array support:** BaseLayout's `jsonLd` prop currently accepts a single `Record<string, unknown>`. If a page needs multiple schemas (e.g., Organization + BreadcrumbList), this breaks. Update the `jsonLd` prop type to `Record<string, unknown> | Record<string, unknown>[]` and render accordingly:

```astro
{jsonLd && (
  Array.isArray(jsonLd)
    ? jsonLd.map(schema => <script type="application/ld+json" set:html={JSON.stringify(schema)} />)
    : <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
)}
```

Not blocking for this story (homepage has Organization but no breadcrumbs, inner pages have breadcrumbs but not Organization), but this change should be made in BaseLayout during implementation to future-proof.

### Visual Styling

- **Link crumbs:** `text-neutral-600 hover:text-primary-600` (7.0:1 contrast on white)
- **Final crumb:** `text-neutral-500` (muted, non-linked)
- **Chevron separator:** `text-neutral-400`, small SVG chevron (h-3.5 w-3.5)
- **Typography:** `text-sm` (14px), Inter font (inherited)
- **Spacing:** `py-3` vertical padding, `gap-1.5` between items
- **Container:** sits within PageLayout's max-w-7xl container, below header

### Mobile Truncation Rules

When breadcrumb has 4+ items on mobile (below sm/640px):
- Show: **first item** (Home) + **ellipsis** (...) + **last 2 items**
- Example: `Home > ... > Agriculture & Processing > Crop Farming`
- Desktop (sm+): always show full path

### PageLayout Integration

Story 1.4 created PageLayout with a `<slot name="breadcrumb" />`. This story uses that slot:

```astro
<!-- In individual page files -->
<PageLayout seo={seo}>
  <BreadcrumbNav items={breadcrumbs} slot="breadcrumb" />
  <SectionWrapper>
    <!-- content -->
  </SectionWrapper>
</PageLayout>
```

The homepage simply omits the breadcrumb slot, so nothing renders.

### Accessibility Checklist

- [ ] `<nav aria-label="Breadcrumb">` wrapping element
- [ ] `<ol>` ordered list for semantic hierarchy
- [ ] `aria-current="page"` on final crumb
- [ ] All link crumbs are `<a>` elements with `href`
- [ ] Focus-visible rings on all links
- [ ] Chevron separators are decorative (not announced by screen readers — use `aria-hidden="true"`)
- [ ] Ellipsis element has `aria-hidden="true"`
- [ ] Keyboard navigable (Tab through links)

### Previous Story Intelligence

**Story 1.4** — PageLayout has `<slot name="breadcrumb" />` ready. BaseLayout accepts `jsonLd` prop for structured data injection. `src/lib/seo.ts` exists with `generateMetadata()`.

**Story 1.5** — Header.astro is rendered in PageLayout. Breadcrumb sits between Header and `<main>`.

**Story 1.3** — Content collections provide division/cluster data needed to construct breadcrumb trails for dynamic pages (division name, cluster name, slugs).

### What This Story Does NOT Include

- No page-specific breadcrumb data construction (each page builds its own `items` array when implemented in later epics)
- No automatic breadcrumb generation from URL — breadcrumbs are explicitly constructed per page for accuracy
- No breadcrumb on homepage (by design)

### What This Story Completes

This is the **final story in Epic 1**. After this story, the platform has:
- Initialized project with all tooling (1.1)
- Complete design token system (1.2)
- Content collections with seed data (1.3)
- Base layouts and core UI components (1.4)
- Desktop header navigation with division dropdown (1.5)
- Mobile navigation with Sheet drawer (1.6)
- Footer with brand story and link grid (1.7)
- Breadcrumb navigation (1.8)

The platform shell is complete. A visitor can see the GRCL brand, navigate the structure on any device, and perceive a professional foundation. Epic 2 begins homepage content.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/layout/BreadcrumbNav.astro`
- **Modifies:** `src/lib/seo.ts` — adds `generateBreadcrumbJsonLd()`
- **Modifies:** `src/layouts/PageLayout.astro` — breadcrumb slot may need positioning adjustment (between header and main)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.8 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — BreadcrumbNav.astro specification, component classification]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Breadcrumb placement, accessibility, responsive truncation]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Complete breadcrumb trail patterns for all 20+ routes]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — PageLayout breadcrumb slot, seo.ts]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` — 2 pages, zero errors
- TypeScript check: `tsc --noEmit` — clean, no output
- Homepage breadcrumb check: grep for `aria-label="Breadcrumb"` in dist/index.html returned 0 matches (correct — no breadcrumb on homepage)

### Completion Notes List

- Created `BreadcrumbNav.astro` as a pure Astro component with zero client-side JavaScript
- Props interface: `items: BreadcrumbItem[]` where each item has `label` and optional `href` (no href = current page)
- Semantic structure: `<nav aria-label="Breadcrumb">` wrapping `<ol>` with `<li>` items
- Chevron SVG separators between items, marked `aria-hidden="true"`
- Final crumb: `aria-current="page"`, `text-neutral-500` (muted, non-linked)
- Link crumbs: `text-neutral-600 hover:text-primary-600` with focus-visible rings
- Mobile truncation (items > 3): two separate `<ol>` lists with responsive visibility (`hidden sm:flex` / `sm:hidden`). Mobile shows first item + ellipsis + last 2 items. More reliable than CSS order approach.
- Container: `mx-auto max-w-7xl px-6 py-3` built into component (matches SectionWrapper container width)
- Added `generateBreadcrumbJsonLd()` to `src/lib/seo.ts` — produces schema.org BreadcrumbList with absolute URLs
- Exported `BreadcrumbItem` type from seo.ts for reuse
- Updated `SeoMetadata.jsonLd` type to `Record<string, unknown> | Record<string, unknown>[]`
- Updated BaseLayout.astro to render jsonLd as single script or array of scripts
- PageLayout breadcrumb slot already correctly positioned — no changes needed
- Homepage has no breadcrumb by design (omits the slot)

### File List

- `src/components/layout/BreadcrumbNav.astro` — Created (new)
- `src/lib/seo.ts` — Modified (added BreadcrumbItem type, generateBreadcrumbJsonLd(), updated SeoMetadata.jsonLd type to support arrays)
- `src/layouts/BaseLayout.astro` — Modified (jsonLd prop type updated, template handles array rendering)

### Review Findings

- [x] [Review][Patch] Missing 44x44px touch targets — added min-h-11 + inline-flex on all links and current-page spans ✓ Fixed
- [x] [Review][Patch] Horizontal padding mismatch — changed px-6 to px-4 sm:px-6 lg:px-8 to match layout components ✓ Fixed
- [x] [Review][Patch] Duplicate BreadcrumbItem interface — removed local definition, importing from @/lib/seo ✓ Fixed
- [x] [Review][Patch] Empty/single-item breadcrumb guard — added items.length >= 2 guard, renders nothing otherwise ✓ Fixed
- [x] [Review][Patch] Repeated link class strings — extracted to linkClasses constant ✓ Fixed
- [x] [Review][Defer] Screen reader breadcrumb discontinuity on mobile truncation — standard pattern, enhancement for Epic 8 a11y audit — deferred, pre-existing pattern
- [x] [Review][Defer] focus-visible:outline-none codebase-wide pattern — not introduced by this diff — deferred, pre-existing

### Change Log

- 2026-03-30: Implemented Story 1.8 Breadcrumb Navigation — all 5 tasks complete, build verified
- 2026-03-30: Code review completed — 0 decisions, 5 patches, 2 deferred, 7 dismissed
