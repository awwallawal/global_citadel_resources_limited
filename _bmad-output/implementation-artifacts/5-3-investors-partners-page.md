# Story 5.3: Investors & Partners Page

Status: ready-for-dev

## Story

As an **investor or partner visitor**,
I want a curated credibility page that makes the strategic case for engagement,
So that I can evaluate whether GRCL is worth a partnership or investment conversation.

## Acceptance Criteria

1. Section 1 (Page Hero): premium background, "Investors & Partners" eyebrow, heading "Partner With a Group Built for Scale", 1-2 sentence investment case framing
2. Section 2 (Why Partner): 2-column layout — 2-3 strategic case paragraphs left, corporate photography placeholder right
3. Section 3 (Group Capabilities): 3 ClusterCards with brief strength statements and links to cluster pages, intro text about multi-sector value
4. Section 4 (Portfolio Strength): dark CredibilityBar with 4 investor-relevant stats (revenue scale, operating years, division count, market reach) using StatCounter animations
5. Section 5 (Governance & Credibility): 2-column — leadership preview (top 2-3 leaders, photo + name + title, link to About) left, key credential logos with link to About credentials right
6. Section 6 (Latest Updates): 3 InsightCards with "View All Insights" link (graceful fallback if no articles — never "Coming Soon")
7. Section 7 (Strategic Inquiry CTA): gold accent CTABanner with "Start a Conversation" heading and dual buttons linking to `/contact/strategic/`
8. Breadcrumbs: Home > Investors & Partners
9. SEO: WebPage + Organization structured data
10. Content sourced from pages/investors-partners.mdx content collection entry

## Tasks / Subtasks

- [ ] Task 1: Create `src/pages/investors-partners.astro` (AC: #8, #9, #10)
  - [ ] 1.1 PageLayout with SEO: title "Investors & Partners — Strategic Opportunities | Global Resources Citadel"
  - [ ] 1.2 Description: "Explore partnership and investment opportunities with Global Resources Citadel Limited, a diversified Nigerian conglomerate operating across agriculture, trade, real estate, and energy."
  - [ ] 1.3 Canonical: `/investors-partners/`
  - [ ] 1.4 WebPage + Organization JSON-LD
  - [ ] 1.5 BreadcrumbNav: Home > Investors & Partners
  - [ ] 1.6 Breadcrumb JSON-LD
  - [ ] 1.7 Fetch clusters, divisions, leaders (featured), credentials, articles

- [ ] Task 2: Build Page Hero (AC: #1)
  - [ ] 2.1 SectionWrapper variant="hero" or primary gradient background
  - [ ] 2.2 Gold eyebrow: "Investors & Partners"
  - [ ] 2.3 H1: "Partner With a Group Built for Scale"
  - [ ] 2.4 Sub-heading: 1-2 sentences framing the investment case
  - [ ] 2.5 White text on dark/gradient background

- [ ] Task 3: Build Why Partner section (AC: #2)
  - [ ] 3.1 SectionWrapper variant="default" (white)
  - [ ] 3.2 SectionHeading: "Why Partner With Us"
  - [ ] 3.3 2-column grid: `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
  - [ ] 3.4 Left: 2-3 paragraphs — market position, growth trajectory, diversification strength
  - [ ] 3.5 Right: image placeholder (styled div with corporate icon)
  - [ ] 3.6 Prose: `text-lg leading-relaxed text-neutral-600`

- [ ] Task 4: Build Group Capabilities section (AC: #3)
  - [ ] 4.1 SectionWrapper variant="light" (neutral-50)
  - [ ] 4.2 SectionHeading: "Multi-Sector Reach" with subtitle about portfolio breadth
  - [ ] 4.3 Reuse cluster card pattern from Story 2.1 business overview: gold left-border cards with cluster name + strength statement + link
  - [ ] 4.4 3 cards: `grid-cols-1 md:grid-cols-3 gap-8`
  - [ ] 4.5 Cards link to `/divisions/[cluster-slug]/`

- [ ] Task 5: Build Portfolio Strength section (AC: #4)
  - [ ] 5.1 Reuse CredibilityBar from Story 2.3 with different stats
  - [ ] 5.2 SectionWrapper variant="dark" (neutral-900)
  - [ ] 5.3 SectionHeading: "By the Numbers" (white, centered)
  - [ ] 5.4 4 investor-relevant stats with StatCounter (`client:visible`)
  - [ ] 5.5 Stats: Revenue Scale (placeholder), Operating Years (15+), Divisions Active (7), Markets Served (6+)

- [ ] Task 6: Build Governance & Credibility section (AC: #5)
  - [ ] 6.1 SectionWrapper variant="default" (white)
  - [ ] 6.2 SectionHeading: "Governance & Credibility"
  - [ ] 6.3 2-column grid: `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
  - [ ] 6.4 Left: Leadership preview — top 2-3 featured leaders (compact LeaderCard: photo + name + title)
  - [ ] 6.5 Left footer: "View Full Team →" → `/about/#leadership`
  - [ ] 6.6 Right: Credential logos preview — top 3-4 credentials (compact CredentialCard)
  - [ ] 6.7 Right footer: "View All Credentials →" → `/about/#credentials`
  - [ ] 6.8 Filter leaders by `featured: true`, credentials by `scope: 'company-wide'`

- [ ] Task 7: Build Latest Updates section (AC: #6)
  - [ ] 7.1 SectionWrapper variant="light" (neutral-50)
  - [ ] 7.2 SectionHeading: eyebrow "Insights", heading "Latest News"
  - [ ] 7.3 Fetch latest 3 articles, sorted by publishedAt descending
  - [ ] 7.4 Reuse InsightCard from Story 2.4 in 3-column grid
  - [ ] 7.5 ViewAllLink: "View All Insights →" → `/insights/`
  - [ ] 7.6 Graceful fallback: "Stay informed about our latest developments." + link to `/contact/` (never "Coming Soon")

- [ ] Task 8: Build Strategic Inquiry CTA (AC: #7)
  - [ ] 8.1 CTABanner gold variant (from Story 2.4)
  - [ ] 8.2 Heading: "Start a Conversation"
  - [ ] 8.3 Body: "Whether you're exploring investment, partnership, or strategic collaboration, our team is ready to engage."
  - [ ] 8.4 Dual CTAs: "Partner Inquiry" → `/contact/strategic/`, "Investor Inquiry" → `/contact/strategic/?type=investor`

## Dev Notes

### Page Structure — 7 Sections

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Investors & Partners
  ├── Section 1: Page Hero (gradient/hero bg)
  │   ├── Gold eyebrow: "Investors & Partners"
  │   ├── H1: "Partner With a Group Built for Scale"
  │   └── Sub-heading: investment case framing
  ├── Section 2: Why Partner (white bg)
  │   ├── 2-column: text left, image placeholder right
  │   └── 2-3 strategic case paragraphs
  ├── Section 3: Group Capabilities (neutral-50 bg)
  │   ├── "Multi-Sector Reach" heading
  │   └── 3 cluster cards with strength statements
  ├── Section 4: Portfolio Strength (neutral-900 bg)
  │   ├── "By the Numbers" heading
  │   └── 4 StatCounters (investor-relevant metrics)
  ├── Section 5: Governance & Credibility (white bg)
  │   ├── 2-column: leadership preview left, credentials right
  │   └── Links to About page sections
  ├── Section 6: Latest Updates (neutral-50 bg)
  │   ├── "Latest News" heading
  │   └── 3 InsightCards or graceful fallback
  └── Section 7: Strategic Inquiry CTA (gold bg)
      ├── "Start a Conversation" heading
      └── Dual CTAs → /contact/strategic/
```

### Investor-Relevant Stats

| Metric | Value | Suffix | Label |
|--------|-------|--------|-------|
| Revenue | — | — | Annual Revenue (placeholder — client to provide) |
| Years | 15 | + | Years Operating |
| Divisions | 7 | — | Divisions Active |
| Markets | 6 | + | Markets Served |

Note: Revenue figure is a placeholder — will be confirmed by client. If not available at launch, replace with another proof metric (e.g., "Total Employees", "Hectares Under Management").

### Leadership Preview — Compact Cards

Reuse LeaderCard from Story 5.2 but in a compact variant (no bio expand, just photo + name + title):

```astro
{featuredLeaders.map(leader => (
  <div class="flex items-center gap-4">
    <div class="h-14 w-14 flex-shrink-0 rounded-full bg-neutral-100 flex items-center justify-center">
      <svg class="h-7 w-7 text-neutral-400" ...><!-- User icon --></svg>
    </div>
    <div>
      <p class="font-heading text-sm font-semibold text-neutral-900">{leader.data.name}</p>
      <p class="text-xs text-neutral-600">{leader.data.title}</p>
    </div>
  </div>
))}
<a href="/about/#leadership" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
  View Full Team <span>→</span>
</a>
```

### Credentials Preview — Compact Cards

```astro
{companyCredentials.slice(0, 4).map(cred => (
  <div class="flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3">
    <div class="h-10 w-10 flex-shrink-0 rounded bg-neutral-100 flex items-center justify-center">
      <svg class="h-5 w-5 text-neutral-400" ...><!-- Shield icon --></svg>
    </div>
    <div>
      <p class="text-sm font-semibold text-neutral-900">{cred.data.name}</p>
      <p class="text-xs text-neutral-500">{cred.data.issuer}</p>
    </div>
  </div>
))}
<a href="/about/#credentials" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
  View All Credentials <span>→</span>
</a>
```

### Data Fetching Pattern

```astro
---
import { getCollection } from 'astro:content';

const clusters = await getCollection('clusters');
const divisions = await getCollection('divisions');
const leaders = (await getCollection('team'))
  .filter(l => l.data.featured)
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
  .slice(0, 3);
const credentials = (await getCollection('credentials'))
  .filter(c => c.data.scope === 'company-wide')
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
  .slice(0, 4);
const articles = (await getCollection('articles'))
  .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
  .slice(0, 3);
---
```

### MDX Content Source

Story 1.3 creates `src/content/pages/investors-partners.mdx`. This story populates it:

```yaml
---
title: Investors & Partners
seoTitle: "Investors & Partners — Strategic Opportunities | Global Resources Citadel"
seoDescription: "Explore partnership and investment opportunities..."
whyPartner: |
  Global Resources Citadel represents a rare opportunity in the Nigerian market...
  [2-3 paragraphs of strategic case content]
lastUpdated: "2026-03-28"
---
```

### Component Reuse Map

| Component | Source Story | Usage |
|-----------|-------------|-------|
| SectionWrapper | 1.4 | All 7 sections with variant alternation |
| SectionHeading | 1.4 | Section headings with eyebrow |
| BreadcrumbNav | 1.8 | 2-level breadcrumb |
| StatCounter | 2.3 | Section 4 — investor stats |
| CredibilityBar pattern | 2.3 | Section 4 — dark stats band |
| InsightCard | 2.4 | Section 6 — latest articles |
| CTABanner gold variant | 2.4 | Section 7 — strategic CTA |
| ViewAllLink | 1.4 | Section 6 — "View All Insights" |
| LeaderCard (compact) | 5.2 | Section 5 — leadership preview |
| CredentialCard (compact) | 5.2 | Section 5 — credentials preview |
| Cluster card pattern | 2.1 | Section 3 — gold-border cluster cards |

### Section Background Alternation

| Section | Background | Variant |
|---------|-----------|---------|
| 1. Hero | gradient primary-900→700 | hero |
| 2. Why Partner | white | default |
| 3. Capabilities | neutral-50 | light |
| 4. Portfolio Strength | neutral-900 | dark |
| 5. Governance | white | default |
| 6. Latest Updates | neutral-50 | light |
| 7. CTA | gold gradient | gold |

### This Page is Specifically for Strategic Audiences

Per the IA: "This is NOT a generic corporate page. It is specifically designed to convince investors and partners that this business is structured, serious, and worth engaging." The tone is confident, evidence-based, not salesy.

Key routing rule: Investors & Partners page ALWAYS links to `/contact/strategic/` — never to `/contact/general/`.

### Previous Story Intelligence

**Story 5.2** creates LeaderCard and CredentialCard components. This story uses compact variants for the preview sections.

**Story 5.1** establishes the About page at `/about/` with anchor sections (#leadership, #credentials). This story links to those anchors.

**Story 2.3** creates StatCounter and CredibilityBar. Reuse for Portfolio Strength section with different stats.

**Story 2.4** creates InsightCard and CTABanner gold variant. Reuse for Latest Updates and Strategic CTA.

**Story 2.1** establishes cluster card pattern (gold left-border). Reuse for Group Capabilities section.

**Story 4.3** creates `/contact/strategic/` form page. The CTA links in this story resolve to that page.

### What This Story Does NOT Include

- No real corporate photography — placeholders
- No real revenue figures — placeholder stats
- No interactive portfolio visualizations
- No downloadable investor materials (PDFs, decks)
- No case studies or testimonials (post-MVP)

### What This Story Completes

This is the **final story in Epic 5**. After this story:
- `/about/` — complete corporate trust page with 8 sections (5.1 + 5.2)
- `/investors-partners/` — curated credibility page with 7 sections (5.3)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/investors-partners.astro`
- **Modifies:** `src/content/pages/investors-partners.mdx` — populates with strategic content

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 5, Story 5.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P21 Investors & Partners wireframe, sections 9.1-9.4]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Investor page patterns, credibility signals, strategic CTA]
- [Source: _bmad-output/implementation-artifacts/5-2-about-the-group-page-leadership-structure-credentials.md — LeaderCard, CredentialCard]
- [Source: _bmad-output/implementation-artifacts/2-3-credibility-signals-stats-section.md — StatCounter, CredibilityBar]
- [Source: _bmad-output/implementation-artifacts/2-4-latest-insights-contact-cta-sections.md — InsightCard, CTABanner gold]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
