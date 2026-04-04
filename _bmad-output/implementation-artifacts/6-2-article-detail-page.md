# Story 6.2: Article Detail Page

Status: done

## Story

As a **visitor**,
I want to read full articles with professional formatting, sharing, and related content,
So that I can engage deeply with GRCL's thought leadership and stay within the platform.

## Acceptance Criteria

1. Section 1 (Article Header): category badge, title as H1 (max 120 chars), published date (formatDate), reading time (calculated), optional author — centered, ~960px width
2. Section 2 (Hero Image): full-content-width image (16:9), optional caption, lazy-loaded with blurred placeholder
3. Section 3 (Article Body): MDX content at ~720px max-width, styled typography (18px base, 1.7 line height), supporting H2-H4, paragraphs, images, blockquotes, lists, tables, code blocks
4. Desktop: sticky sidebar with share links (LinkedIn, Twitter/X, Copy Link), division tag, content tags. Mobile: sidebar content above article body
5. Section 4 (Related Articles): 3 InsightCards sharing same division tag or stream (fallback: latest 3), "Back to All Insights" link
6. Section 5 (CTA): division-specific CTABanner if article tagged to a division, otherwise generic contact CTA
7. Breadcrumbs: Home > Insights > [Category] > [Article Title]
8. SEO: Article/NewsArticle structured data with author, datePublished, image, Open Graph tags

## Tasks / Subtasks

- [x] Task 1: Create ArticleLayout.astro (AC: #1-#6)
  - [x] 1.1 Create `src/layouts/ArticleLayout.astro`
  - [x] 1.2 Extends PageLayout with article-specific structure
  - [x] 1.3 Props: article data, related articles, seo
  - [x] 1.4 Renders 5-section article template

- [x] Task 2: Create `src/pages/insights/[slug].astro` with `getStaticPaths` (AC: #7, #8)
  - [x] 2.1 `getStaticPaths()` generates paths for all articles
  - [x] 2.2 Fetch article data + related articles per path
  - [x] 2.3 Calculate reading time (~200 words/minute from MDX body)
  - [x] 2.4 Determine category label from stream value
  - [x] 2.5 SEO: "[Article Title] | Global Resources Citadel Insights"
  - [x] 2.6 BreadcrumbNav: Home > Insights > [Category] > [Article Title]
  - [x] 2.7 Article + BreadcrumbList JSON-LD
  - [x] 2.8 Open Graph: title, description, image for social sharing

- [x] Task 3: Build Article Header section (AC: #1)
  - [x] 3.1 Centered layout, `max-w-overview` (960px token from Story 2.1 — NOT `max-w-4xl` which is only 896px)
  - [x] 3.2 Category badge: gold-dark uppercase text-xs tracking-wide
  - [x] 3.3 H1: `font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`
  - [x] 3.4 Meta row: published date via `formatDate()` + reading time + optional author
  - [x] 3.5 Meta: `text-sm text-neutral-500`, separated by middot (`·`)

- [x] Task 4: Build Hero Image section (AC: #2)
  - [x] 4.1 Full content-width image placeholder (not full-bleed)
  - [x] 4.2 Aspect ratio: 16:9 via `aspect-video`
  - [x] 4.3 Lazy loading: Astro `<Image>` with `loading="lazy"` (or placeholder div for MVP)
  - [x] 4.4 Optional caption below: `text-xs text-neutral-500 mt-2 text-center`
  - [x] 4.5 If no hero image: section omitted entirely

- [x] Task 5: Build Article Body with sidebar layout (AC: #3, #4)
  - [x] 5.1 Desktop: 2-column layout with sidebar — `grid-cols-1` on mobile, scoped `<style>` for `lg:grid-template-columns: 1fr 240px` (avoids arbitrary Tailwind value per CLAUDE.md). Gap: `gap-8 lg:gap-12`.
  - [x] 5.2 Article body: `max-w-article` (add `--container-article: 720px` design token in globals.css `@theme` block, same pattern as Story 2.1's `--container-overview`). Apply `prose` styling via scoped `<style>` block.
  - [x] 5.3 Prose typography: `text-lg leading-[1.7] text-neutral-700`, H2-H4 in Poppins, body in Inter
  - [x] 5.4 Supported elements: headings, paragraphs, images, blockquotes (left border gold-600), lists, tables, code blocks (font-mono)
  - [x] 5.5 Sidebar (desktop): sticky `top-24`, share links + division tag + content tags
  - [x] 5.6 Mobile: sidebar content renders above article body (below header)

- [x] Task 6: Create ShareLinks component (AC: #4)
  - [x] 6.1 Create `src/components/insights/ShareLinks.astro` (or .tsx if clipboard API needed)
  - [x] 6.2 LinkedIn share: `https://www.linkedin.com/sharing/share-offsite/?url={url}`
  - [x] 6.3 Twitter/X share: `https://twitter.com/intent/tweet?url={url}&text={title}`
  - [x] 6.4 Copy Link: button with clipboard API (requires React island or inline `<script>`)
  - [x] 6.5 Icons: Lucide or inline SVGs (LinkedIn, Twitter, Link icons)
  - [x] 6.6 Vertical stack layout, icon-only with tooltips
  - [x] 6.7 Focus-visible rings on all share buttons

- [x] Task 7: Build Related Articles section (AC: #5)
  - [x] 7.1 SectionWrapper variant="light" (neutral-50)
  - [x] 7.2 SectionHeading: "Related Insights"
  - [x] 7.3 3 InsightCards in `grid-cols-1 md:grid-cols-3 gap-6`
  - [x] 7.4 Selection: articles sharing same `divisionSlug` or `stream`, excluding current article
  - [x] 7.5 Fallback: latest 3 articles if no related matches
  - [x] 7.6 ViewAllLink: "Back to All Insights →" → `/insights/`

- [x] Task 8: Build contextual CTA section (AC: #6)
  - [x] 8.1 If article has `divisionSlug`: CTABanner gold variant — "Interested in [Division Name]?" → `/contact/divisions/[slug]/`
  - [x] 8.2 If no division tag: CTABanner dark variant — "Get In Touch" → `/contact/`

## Dev Notes

### Article Page Structure

```
ArticleLayout (extends PageLayout)
  ├── BreadcrumbNav: Home > Insights > [Category] > [Article Title]
  │
  ├── Section 1: Article Header (white bg, centered)
  │   ├── Category badge
  │   ├── H1: Article title
  │   └── Meta: date · reading time · author
  │
  ├── Section 2: Hero Image (white bg)
  │   └── 16:9 image with optional caption (omitted if no image)
  │
  ├── Section 3: Article Body + Sidebar
  │   ├── Desktop: 2-column (body left, sticky sidebar right)
  │   │   ├── Body: MDX content at 720px max-width
  │   │   └── Sidebar: share links, division tag, content tags
  │   └── Mobile: sidebar above body (stacked)
  │
  ├── Section 4: Related Articles (neutral-50 bg)
  │   ├── "Related Insights" heading
  │   └── 3 InsightCards + "Back to All Insights" link
  │
  └── Section 5: Contextual CTA
      └── Division-specific (gold) or generic (dark) CTABanner
```

### getStaticPaths Pattern

```astro
---
import { getCollection, getEntry } from 'astro:content';
import ArticleLayout from '@/layouts/ArticleLayout.astro';

export async function getStaticPaths() {
  const articles = await getCollection('articles');

  return Promise.all(articles.map(async (article) => {
    // Reuse `articles` from outer scope — do NOT call getCollection again

    // Related: same division or same stream, excluding self
    let related = articles
      .filter(a => a.id !== article.id)
      .filter(a =>
        (article.data.divisionSlug && a.data.divisionSlug === article.data.divisionSlug) ||
        a.data.stream === article.data.stream
      )
      .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
      .slice(0, 3);

    // Fallback: latest 3 if no related
    if (related.length === 0) {
      related = articles
        .filter(a => a.id !== article.id)
        .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
        .slice(0, 3);
    }

    // Division data for contextual CTA
    const division = article.data.divisionSlug
      ? await getEntry('divisions', article.data.divisionSlug)
      : null;

    return {
      params: { slug: article.id },
      props: { article, related, division },
    };
  }));
}

const { article, related, division } = Astro.props;
const { Content } = await article.render();
---
```

### Reading Time Calculation

```typescript
function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
```

The MDX body text is available after `article.render()` — or estimate from `article.body` if available. Display as "X min read".

### Stream → Category Label Map

```typescript
const streamLabels: Record<string, string> = {
  'company-news': 'News & Updates',
  'announcements': 'News & Updates',
  'operational-updates': 'News & Updates',
  'thought-leadership': 'Thought Leadership',
  'industry-commentary': 'Industry Analysis',
  'division-insight': article.data.divisionSlug
    ? divisionName  // e.g., "Crop Farming"
    : 'Division Insight',
};
```

### Article Body — MDX Prose Styling

Astro renders MDX content via `<Content />`. Apply prose styling:

```astro
<div class="prose-article mx-auto max-w-article">
  <Content />
</div>

<style>
  .prose-article {
    font-size: 1.125rem;    /* 18px */
    line-height: 1.7;
    color: var(--color-neutral-700);
  }
  .prose-article h2 {
    font-family: var(--font-heading);
    font-size: 1.5rem;      /* 24px */
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-neutral-900);
  }
  .prose-article h3 {
    font-family: var(--font-heading);
    font-size: 1.25rem;     /* 20px */
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: var(--color-neutral-900);
  }
  .prose-article p { margin-bottom: 1.25rem; }
  .prose-article blockquote {
    border-left: 3px solid var(--color-gold-600);
    padding-left: 1.25rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--color-neutral-600);
  }
  .prose-article ul, .prose-article ol { margin-bottom: 1.25rem; padding-left: 1.5rem; }
  .prose-article li { margin-bottom: 0.5rem; }
  .prose-article img { border-radius: 0.75rem; margin: 1.5rem 0; }
  .prose-article code {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    background: var(--color-neutral-100);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
  }
  .prose-article pre {
    background: var(--color-neutral-900);
    color: var(--color-neutral-100);
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .prose-article table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  .prose-article th, .prose-article td { border: 1px solid var(--color-neutral-200); padding: 0.75rem; text-align: left; font-size: 0.875rem; }
  .prose-article th { background: var(--color-neutral-50); font-weight: 600; }
</style>
```

### Sidebar — Desktop Sticky, Mobile Above

```astro
<!-- Desktop sidebar -->
<aside class="hidden lg:block">
  <div class="sticky top-24 space-y-6">
    <ShareLinks url={canonicalUrl} title={article.data.title} />
    {article.data.divisionSlug && (
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wide text-neutral-500">Division</h4>
        <a href={`/divisions/${article.data.divisionSlug}/`} class="mt-1 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          {divisionName}
        </a>
      </div>
    )}
    {article.data.tags && (
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wide text-neutral-500">Tags</h4>
        <div class="mt-1 flex flex-wrap gap-2">
          {article.data.tags.map(tag => (
            <span class="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">{tag}</span>
          ))}
        </div>
      </div>
    )}
  </div>
</aside>

<!-- Mobile sidebar (above body) -->
<div class="lg:hidden mb-8 flex flex-wrap items-center gap-4">
  <ShareLinks url={canonicalUrl} title={article.data.title} layout="horizontal" />
  {/* Division tag + content tags inline */}
</div>
```

### ShareLinks Component

LinkedIn and Twitter use simple URL-based sharing (no API needed). Copy Link requires clipboard API:

```astro
---
interface Props {
  url: string;
  title: string;
  layout?: 'vertical' | 'horizontal';
}
const { url, title, layout = 'vertical' } = Astro.props;
const encodedUrl = encodeURIComponent(url);
const encodedTitle = encodeURIComponent(title);
---

<div class={layout === 'vertical' ? 'flex flex-col gap-3' : 'flex gap-3'}>
  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
     target="_blank" rel="noopener noreferrer"
     class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary-300 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
     aria-label="Share on LinkedIn">
    <!-- LinkedIn SVG icon -->
  </a>
  <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
     target="_blank" rel="noopener noreferrer"
     class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary-300 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
     aria-label="Share on X">
    <!-- Twitter/X SVG icon -->
  </a>
  <button
    class="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary-300 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    aria-label="Copy link"
    onclick={`navigator.clipboard.writeText('${url}').then(() => { this.querySelector('svg').classList.add('text-success-600'); setTimeout(() => this.querySelector('svg').classList.remove('text-success-600'), 2000); })`}>
    <!-- Link/Copy SVG icon -->
  </button>
</div>
```

Copy Link uses inline `onclick` with clipboard API — no React island needed. Brief visual feedback (green icon for 2 seconds).

### Article JSON-LD Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2026-03-27",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": {
    "@type": "Organization",
    "name": "Global Resources Citadel Limited"
  },
  "image": "https://globalresourcescitadel.com/og-default.jpg",
  "url": "https://globalresourcescitadel.com/insights/article-slug/",
  "description": "Article excerpt"
}
```

### Breadcrumb Category Mapping

```typescript
const categoryBreadcrumbMap: Record<string, { label: string; href: string }> = {
  'company-news': { label: 'News & Updates', href: '/insights/news/' },
  'announcements': { label: 'News & Updates', href: '/insights/news/' },
  'operational-updates': { label: 'News & Updates', href: '/insights/news/' },
  'thought-leadership': { label: 'Thought Leadership', href: '/insights/thought-leadership/' },
  'industry-commentary': { label: 'Thought Leadership', href: '/insights/thought-leadership/' },
  'division-insight': { label: 'By Division', href: '/insights/divisions/' },
};
```

Breadcrumb: Home > Insights > [Category from map] > [Article Title]

### Previous Story Intelligence

**Story 6.1** creates all insights listing pages and InsightCard component. This story creates the article detail destination.

**Story 2.4** creates InsightCard.astro. Reuse for Related Articles section.

**Story 1.2** provides `formatDate()` utility.

**Story 1.4** provides SectionWrapper, SectionHeading, CTABanner, ViewAllLink.

**Story 1.8** provides BreadcrumbNav.

**Story 1.3** provides article content collections with all frontmatter fields.

### What This Story Does NOT Include

- No real article images — placeholder divs
- No real article content — relies on seed articles from Story 6.3
- No comments or reactions
- No newsletter signup
- No reading progress indicator
- No print stylesheet

### Project Structure Notes

Files this story creates:
- **Creates:** `src/layouts/ArticleLayout.astro`
- **Creates:** `src/pages/insights/[slug].astro` — dynamic article pages
- **Creates:** `src/components/insights/ShareLinks.astro`
- **May create:** `src/components/insights/ArticleHeader.astro`, `src/components/insights/ArticleBody.astro` (or inline in layout)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 6, Story 6.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P20 Article Detail wireframe, sections, sidebar, related articles, SEO]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — ArticleContent, InsightCard, article typography]
- [Source: _bmad-output/planning-artifacts/architecture.md — ArticleLayout.astro, MDX rendering, formatDate]
- [Source: _bmad-output/implementation-artifacts/6-1-insights-hub-category-listing-pages.md — InsightCard, stream routing]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Article schema, stream enum]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Initial build failed: `article.render is not a function` — Astro 6 Content Layer uses `render()` as standalone import from `astro:content`, not a method on entries. Fixed import.
- Rebuild: all 3 article pages + all prior pages prerender successfully
- TypeScript check: no errors
- Added `--container-article: 720px` design token in globals.css @theme block

### Completion Notes List

- Created ArticleLayout.astro with all 5 sections: header (category badge, H1, meta row), hero image (conditional, lazy-loaded, optional caption), body+sidebar (2-column grid via scoped CSS), related articles (3 InsightCards), contextual CTA (division-specific gold or generic dark)
- Created [slug].astro with getStaticPaths generating paths for all MDX articles; calculates reading time from article.body word count; determines category label from stream+division; builds breadcrumbs with stream→category mapping; Article+BreadcrumbList JSON-LD; OG metadata
- Created ShareLinks.astro — LinkedIn/X share via URL intent, Copy Link via clipboard API with inline script and visual feedback; vertical (desktop) and horizontal (mobile) layouts; accessible with aria-labels and focus-visible rings
- Prose typography via scoped <style> with :global() selectors — 18px base, 1.7 line-height, Poppins headings, gold-bordered blockquotes, styled tables/code/lists
- Desktop sidebar: sticky top-24, share links + division tag pill + content tag pills; mobile: inline above body
- Related articles: same divisionSlug or stream (excluding self), fallback to latest 3
- Resolves Story 6.1 deferred items: article detail links and JSON-LD URLs now resolve to real pages

### Change Log

- 2026-04-04: Story 6.2 implemented — Article detail pages with layout, MDX rendering, sidebar, sharing, related articles, contextual CTA

### File List

- `src/layouts/ArticleLayout.astro` (created)
- `src/pages/insights/[slug].astro` (created)
- `src/components/insights/ShareLinks.astro` (created)
- `src/styles/globals.css` (modified — added --container-article token)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

### Review Findings

- [x] [Review][Decision] Hero image loading — resolved: switched to eager + fetchpriority="high" for LCP
- [x] [Review][Patch] Missing `og:type=article` — fixed: added type: 'article' to generateMetadata call
- [x] [Review][Patch] ShareLinks missing visible tooltips — fixed: added title attributes to all links/button
- [x] [Review][Patch] Sidebar headings use h2 — fixed: changed to `<p>` elements (non-heading)
- [x] [Review][Patch] Hero image alt duplicates H1 — fixed: set alt="" role="presentation" (decorative)
- [x] [Review][Patch] Copy Link no accessible feedback — fixed: added aria-live status with success/error messages
- [x] [Review][Patch] Prose ul/ol missing list markers — fixed: added list-style-type disc/decimal
- [x] [Review][Defer] Hero image uses raw `<img>` — no Astro Image optimization, MVP acceptable
- [x] [Review][Defer] Reading time from raw MDX body includes syntax — minor inaccuracy, MVP acceptable
- [x] [Review][Defer] Related articles fallback can show unrelated content across verticals — product decision
