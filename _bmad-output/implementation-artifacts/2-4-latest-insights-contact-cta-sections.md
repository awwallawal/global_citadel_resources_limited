# Story 2.4: Latest Insights & Contact CTA Sections

Status: ready-for-dev

## Story

As a **visitor**,
I want to see that GRCL is actively communicating and have a clear next step,
So that I know the business is alive and I can take action when ready.

## Acceptance Criteria

1. 3 InsightCard components display the latest published articles with category badge, headline, date, brief excerpt (max 2 lines), and "Read More" arrow link
2. "View All Insights" link below cards navigates to `/insights/`
3. If no articles exist yet, section displays gracefully with a "Stay tuned" message (never "Coming Soon")
4. Below insights, a CTABanner section renders on dark background with heading, supporting text, and dual CTAs: "Contact Us" (→ /contact/) and "Partner With Us" (→ /contact/strategic/)
5. Insights cards use responsive grid: 1-column mobile, 2-column tablet, 3-column desktop
6. Insight cards hover: shadow elevation and title colour shifts to primary-600

## Tasks / Subtasks

- [ ] Task 1: Create InsightCard.astro component (AC: #1, #6)
  - [ ] 1.1 Create `src/components/insights/InsightCard.astro`
  - [ ] 1.2 Props: title, excerpt, category (stream label), publishedAt, href, variant (standard/featured)
  - [ ] 1.3 Standard variant: neutral-50 bg, neutral-300 border, rounded-2xl, p-7
  - [ ] 1.4 Category badge: gold-dark text, uppercase, text-[11px], tracking-wide, font-semibold
  - [ ] 1.5 Title: H3, font-bold, text-base, leading-tight
  - [ ] 1.6 Excerpt: text-sm, text-neutral-600, 2 lines max (line-clamp-2)
  - [ ] 1.7 Date: text-xs, text-neutral-500, formatted via `formatDate()`
  - [ ] 1.8 Hover: border-color shifts to gold-600, title shifts to primary-600
  - [ ] 1.9 Entire card is a link wrapper

- [ ] Task 2: Create Featured InsightCard variant (AC: #1)
  - [ ] 2.1 Featured variant: larger padding (p-10), spans 2 rows on desktop
  - [ ] 2.2 Title: text-2xl font-bold
  - [ ] 2.3 Category badge: text-xs (slightly larger than standard)
  - [ ] 2.4 Excerpt: text-[15px], 4 lines max

- [ ] Task 3: Build insights section on homepage (AC: #1, #2, #3, #5)
  - [ ] 3.1 SectionWrapper variant="default" (white background)
  - [ ] 3.2 SectionHeading with eyebrow "Insights", heading "Latest Thinking"
  - [ ] 3.3 Fetch latest 3 articles from content collections, sorted by publishedAt descending
  - [ ] 3.4 Asymmetric grid: `grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6`
  - [ ] 3.5 First article as featured (spans 2 rows on md+), remaining as standard
  - [ ] 3.6 ViewAllLink below grid: "View All Insights" → `/insights/`
  - [ ] 3.7 Graceful fallback if no articles: "Stay tuned for insights from across our divisions" message

- [ ] Task 4: Build contact CTA section (AC: #4)
  - [ ] 4.1 Use CTABanner component from Story 1.4 with dark variant
  - [ ] 4.2 Gold divider bar above heading
  - [ ] 4.3 Heading: "Ready to Work With Us?"
  - [ ] 4.4 Body: "Whether you're an investor, partner, or potential collaborator, we'd welcome the opportunity to explore how we can create mutual value."
  - [ ] 4.5 Primary CTA: "Contact Us" → `/contact/` (gold button)
  - [ ] 4.6 Secondary CTA: "Partner With Us" → `/contact/strategic/` (outline-white button)

- [ ] Task 5: Integrate both sections into homepage (AC: #1, #4)
  - [ ] 5.1 Add insights section to `src/pages/index.astro` after credibility signals
  - [ ] 5.2 Add CTA section as final section on homepage
  - [ ] 5.3 Verify complete homepage section flow: Hero → Overview → Bento → Credibility → Insights → CTA

## Dev Notes

### Insights Section — CSS from Design Reference

```css
.insights { padding: 96px 24px; background: var(--white); }
.insights .container { max-width: 1280px; }

.insights-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) {
  .insights-grid { grid-template-columns: 1.4fr 1fr; }
  .insight-featured { grid-row: 1 / 3; }
}

/* Featured card */
.insight-featured {
  background: var(--neutral-100); border: 1px solid var(--neutral-300);
  border-radius: 16px; padding: 40px;
  display: flex; flex-direction: column; justify-content: flex-end;
  transition: border-color 0.3s;
}
.insight-featured:hover { border-color: var(--gold); }
.insight-featured .tag { font-size: 12px; font-weight: 600; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 20px; }
.insight-featured h3 { font-size: 24px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; }
.insight-featured p { font-size: 15px; color: var(--neutral-600); line-height: 1.7; }

/* Standard card */
.insight-sm {
  background: var(--neutral-100); border: 1px solid var(--neutral-300);
  border-radius: 16px; padding: 28px;
  transition: border-color 0.3s;
}
.insight-sm:hover { border-color: var(--gold); }
.insight-sm .tag { font-size: 11px; font-weight: 600; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
.insight-sm h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }
.insight-sm p { font-size: 14px; color: var(--neutral-600); line-height: 1.6; }
```

### CTA Section — CSS from Design Reference

```css
.cta { padding: 96px 24px; background: var(--neutral-900); text-align: center; }
.cta-gold { width: 60px; height: 3px; background: var(--gold); margin: 0 auto 28px; }
.cta h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 700; color: #fff; margin-bottom: 12px; }
.cta p { font-size: 17px; color: var(--neutral-500); max-width: 520px; margin: 0 auto 36px; line-height: 1.7; }
.cta-btn { padding: 14px 36px; background: var(--gold); color: var(--primary-900); border-radius: 8px; font-weight: 700; font-size: 15px; }
.cta-btn:hover { background: var(--gold-light); }
```

### Insight Stream Label Mapping

The `stream` field from article content collections maps to display labels:

| Stream Value | Display Label |
|-------------|--------------|
| company-news | News & Updates |
| announcements | News & Updates |
| operational-updates | News & Updates |
| thought-leadership | Thought Leadership |
| industry-commentary | Industry Analysis |
| division-insight | [Division Name] |

### Article Data from Content Collections

Articles fetched via `getCollection('articles')` (Story 1.3). Each entry has:
- `data.title`, `data.excerpt`, `data.stream`, `data.publishedAt`, `data.divisionSlug`, `data.featured`
- `id` (slug derived from filename)

```astro
---
import { getCollection } from 'astro:content';

const articles = await getCollection('articles');
const latestArticles = articles
  .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
  .slice(0, 3);
---
```

### Graceful Empty State

If `latestArticles.length === 0`, render a placeholder instead of the grid:

```astro
{latestArticles.length === 0 ? (
  <p class="text-center text-lg text-neutral-500">
    Stay tuned for insights from across our divisions.
  </p>
) : (
  <div class="insights-grid">
    {/* cards */}
  </div>
)}
```

**CRITICAL:** Never display "Coming Soon" — per CLAUDE.md rules.

### CTABanner Reuse

Story 1.4 created `CTABanner.astro`. Reuse it with props:

```astro
<CTABanner
  heading="Ready to Work With Us?"
  body="Whether you're an investor, partner, or potential collaborator, we'd welcome the opportunity to explore how we can create mutual value."
  primaryCta={{ label: "Contact Us", href: "/contact/" }}
  secondaryCta={{ label: "Partner With Us", href: "/contact/strategic/" }}
  variant="dark"
/>
```

If CTABanner doesn't support dual CTAs yet, extend it or render the CTA section inline.

### Complete Homepage Section Flow

After this story, the homepage has all 6 sections:

1. **Hero** (Story 2.1) — gradient, headline, 2 CTAs
2. **Business Overview** (Story 2.1) — eyebrow, 3 cluster cards
3. **Divisions Bento Grid** (Story 2.2) — 7 division cards, asymmetric layout
4. **Credibility Signals** (Story 2.3) — dark band, 4 animated stats
5. **Latest Insights** (this story) — 3 article cards, asymmetric layout
6. **Contact CTA** (this story) — dark band, dual CTAs

This completes the homepage narrative scroll.

### Previous Story Intelligence

**Story 2.3** adds the credibility signals section. This story adds the final two sections below it.

**Story 1.4** provides CTABanner component and ViewAllLink component.

**Story 1.3** provides article content collections with seed data (1-2 placeholder articles).

**Story 1.2** provides `formatDate()` utility for displaying article dates.

### What This Story Does NOT Include

- No insights hub page or category pages (Epic 6)
- No article detail pages (Epic 6)
- No real article images — text-only cards for MVP
- No pagination or "Load More"
- No contact form (Epic 4)

### Soft Forward Links

- "View All Insights" → `/insights/` (built in Epic 6)
- "Contact Us" → `/contact/` (built in Epic 4)
- "Partner With Us" → `/contact/strategic/` (built in Epic 4)
- Individual article links → `/insights/[slug]/` (built in Epic 6)

All will 404 until target epics are complete. Expected behavior.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/insights/InsightCard.astro`
- **Modifies:** `src/pages/index.astro` — adds insights section + CTA section (completes homepage)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.4 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Insights CSS lines 477-559, CTA CSS lines 560-599, HTML lines 839-893]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — InsightCard standard/featured, CTA Banner]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P01 Sections 5-6 (Insights, CTA)]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — CTABanner, ViewAllLink]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Article collection schema, seed data]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
