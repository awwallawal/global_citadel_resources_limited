# Story 2.4: Latest Insights & Contact CTA Sections

Status: ready-for-dev

## Story

As a **visitor**,
I want to see that GRCL is actively communicating and have a clear next step,
So that I know the business is alive and I can take action when ready.

## Acceptance Criteria

1. 3 InsightCard components display the latest published articles with category badge, headline, date, brief excerpt (max 2 lines), "Read More" arrow link, and focus-visible rings on each card link. Note: epics and IA also specify "thumbnail image" — for MVP, text-only cards are used; images are a post-MVP enhancement when editorial assets are available.
2. "View All Insights" link below cards navigates to `/insights/`
3. If no articles exist yet, section displays gracefully with a "Stay tuned" message (never "Coming Soon")
4. Below insights, a CTABanner section renders on a **warm accent background** (gold gradient per epics line 518 and IA line 500) with heading, supporting text, and dual CTAs: "Contact Us" (→ /contact/) and "Partner With Us" (→ /contact/strategic/). This requires adding a gold/accent variant to CTABanner (Story 1.4 scoped to dark-only but noted future variants would be added when needed).
5. Insights cards use asymmetric grid: 1-column mobile, asymmetric 2-column desktop with featured card spanning 2 rows. Note: epics say "3-column" but UX spec (line 1037) explicitly specifies "asymmetric layout with a featured article spanning 2 rows" and the design reference confirms this Editorial Premium treatment. The UX spec's detailed specification is followed as more precise guidance.
6. Insight cards hover: shadow-md elevation and title colour shifts to primary-600

## Tasks / Subtasks

- [ ] Task 1: Create InsightCard.astro component (AC: #1, #6)
  - [ ] 1.1 Create `src/components/insights/InsightCard.astro`
  - [ ] 1.2 Props: title, excerpt, category (stream label), publishedAt, href, variant (standard/featured)
  - [ ] 1.3 Standard variant: neutral-50 bg, neutral-300 border, rounded-2xl, p-7
  - [ ] 1.4 Category badge: gold-dark text, uppercase, `text-xs` (12px — avoids arbitrary `text-[11px]`), tracking-wide, font-semibold
  - [ ] 1.5 Title: H3, font-bold, text-base, leading-tight
  - [ ] 1.6 Excerpt: text-sm, text-neutral-600, 2 lines max (line-clamp-2)
  - [ ] 1.7 Date: text-xs, text-neutral-500, formatted via `formatDate()`
  - [ ] 1.8 "Read More →" text link at card bottom: `text-xs font-semibold text-gold-600`, with arrow + `group-hover:gap-2.5` animation (visible affordance that card is interactive, per epics AC)
  - [ ] 1.9 Hover: `motion-safe:hover:shadow-md` + border-color shifts to gold-600 + title shifts to primary-600
  - [ ] 1.10 Entire card is a link wrapper (`<a>`) with `focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`

- [ ] Task 2: Create Featured InsightCard variant (AC: #1)
  - [ ] 2.1 Featured variant: larger padding (p-10), spans 2 rows on desktop
  - [ ] 2.2 Title: text-2xl font-bold
  - [ ] 2.3 Category badge: text-xs (slightly larger than standard)
  - [ ] 2.4 Excerpt: `text-sm` (14px — avoids arbitrary `text-[15px]`), line-clamp-4

- [ ] Task 3: Build insights section on homepage (AC: #1, #2, #3, #5)
  - [ ] 3.1 SectionWrapper variant="default" (white background)
  - [ ] 3.2 SectionHeading with eyebrow "Insights", heading "Latest Thinking"
  - [ ] 3.3 Fetch latest 3 articles from content collections, sorted by publishedAt descending
  - [ ] 3.4 Asymmetric grid: `grid-cols-1 gap-6` on mobile. On md+ use a scoped `<style>` for the asymmetric template: `grid-template-columns: 1.4fr 1fr` (cannot be expressed as a standard Tailwind utility — use scoped CSS to avoid arbitrary value per CLAUDE.md)
  - [ ] 3.5 First article as featured (spans 2 rows on md+), remaining as standard
  - [ ] 3.6 ViewAllLink below grid: "View All Insights" → `/insights/`
  - [ ] 3.7 Graceful fallback if no articles: "Stay tuned for insights from across our divisions" message

- [ ] Task 4: Build contact CTA section (AC: #4)
  - [ ] 4.1 Add a gold/accent variant to CTABanner.astro (Story 1.4 scoped to dark-only but noted "additional variants can be added in future stories"). Gold variant: `bg-gradient-to-r from-gold-600 to-gold-500` background, dark text (`text-primary-900`). This creates visual contrast with the dark credibility section above.
  - [ ] 4.2 Use CTABanner with gold/accent variant
  - [ ] 4.3 Heading: "Ready to Work With Us?" (`text-primary-900`)
  - [ ] 4.4 Body: "Whether you're an investor, partner, or potential collaborator, we'd welcome the opportunity to explore how we can create mutual value." (`text-primary-900/80`)
  - [ ] 4.5 Primary CTA: "Contact Us" → `/contact/` (`bg-primary-900 text-white hover:bg-primary-800`, with `focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gold-600`)
  - [ ] 4.6 Secondary CTA: "Partner With Us" → `/contact/strategic/` (`border-primary-900 text-primary-900 hover:bg-primary-900/10`, with matching focus-visible)

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

### CTABanner Gold/Accent Variant

Story 1.4 created `CTABanner.astro` with dark variant only. This story adds a **gold/accent variant** per the epics AC ("warm accent background") and IA ("gold gradient or subtle green-to-gold").

Gold variant styling:
- Background: `bg-gradient-to-r from-gold-600 to-gold-500`
- Heading: `text-primary-900`
- Body: `text-primary-900/80`
- Primary CTA: `bg-primary-900 text-white hover:bg-primary-800`
- Secondary CTA: `border border-primary-900 text-primary-900 hover:bg-primary-900/10`

```astro
<CTABanner
  heading="Ready to Work With Us?"
  body="Whether you're an investor, partner, or potential collaborator, we'd welcome the opportunity to explore how we can create mutual value."
  primaryCta={{ label: "Contact Us", href: "/contact/" }}
  secondaryCta={{ label: "Partner With Us", href: "/contact/strategic/" }}
  variant="gold"
/>
```

If CTABanner doesn't support dual CTAs yet, extend it. The gold variant + dual CTA support are both needed in this story.

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
- No thumbnail images on InsightCards — epics and IA specify "thumbnail image" but for MVP text-only cards are used, matching the design reference. Thumbnail images are a post-MVP enhancement when editorial photo assets are available. The card structure supports adding images without structural changes.
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
- **Modifies:** `src/components/shared/CTABanner.astro` — adds gold/accent variant with dual CTA support
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
