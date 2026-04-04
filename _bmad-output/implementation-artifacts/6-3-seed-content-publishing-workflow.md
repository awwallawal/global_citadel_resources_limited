# Story 6.3: Seed Content & Publishing Workflow

Status: done

## Story

As a **content owner**,
I want seed articles and a clear git-based publishing workflow,
So that the platform launches with content and I understand how to add more.

## Acceptance Criteria

1. At least 3 seed articles exist in `src/content/articles/` as MDX files with complete frontmatter (title, publishedAt, stream, excerpt, optional divisionSlug, featured flag, optional author)
2. Seed articles span at least 2 different streams (e.g., company-news, thought-leadership) and at least 1 is tagged to a division
3. Article MDX files demonstrate supported content elements (headings, paragraphs, blockquotes, lists)
4. Build fails if any article is missing required frontmatter fields (Zod validation)
5. A brief PUBLISHING.md guide in project root documents how to create and publish new articles via git
6. Homepage latest insights, division page related insights, and insights listing pages all correctly query and display the seed articles

## Tasks / Subtasks

- [x] Task 1: Create seed article 1 — company-news stream (AC: #1, #2, #3)
  - [x] 1.1 Create `src/content/articles/grcl-expands-processing-capacity.mdx`
  - [x] 1.2 Stream: `company-news`, no division tag (company-wide)
  - [x] 1.3 Featured: `true` (appears in homepage featured section)
  - [x] 1.4 Title: "GRCL Expands Processing Capacity in Kano State"
  - [x] 1.5 Realistic excerpt (~2-3 sentences)
  - [x] 1.6 MDX body: 3-4 paragraphs with H2 headings and a blockquote

- [x] Task 2: Create seed article 2 — thought-leadership stream (AC: #1, #2, #3)
  - [x] 2.1 Create `src/content/articles/integrated-value-chains-future-agriculture.mdx`
  - [x] 2.2 Stream: `thought-leadership`, no division tag (company-wide)
  - [x] 2.3 Featured: `false`
  - [x] 2.4 Title: "Why Integrated Value Chains Are the Future of Nigerian Agriculture"
  - [x] 2.5 Realistic excerpt
  - [x] 2.6 MDX body: 4-5 paragraphs with H2, H3, a bulleted list, a blockquote, and a placeholder image (`![Aerial view of integrated farming operations](./images/placeholder-farming.jpg)`) to demonstrate image syntax for content owners. The image file doesn't need to exist for MVP — it shows the pattern.

- [x] Task 3: Create seed article 3 — division-insight stream (AC: #1, #2)
  - [x] 3.1 Create `src/content/articles/commodity-markets-west-africa-trends.mdx`
  - [x] 3.2 Stream: `division-insight`, divisionSlug: `commodity-marketing`
  - [x] 3.3 Featured: `false`
  - [x] 3.4 Title: "Commodity Markets in West Africa: Trends and Outlook"
  - [x] 3.5 Realistic excerpt
  - [x] 3.6 MDX body: 3-4 paragraphs with H2, an ordered list, and a table

- [x] Task 4: Verify Zod validation (AC: #4)
  - [x] 4.1 Run `npm run build` — all 3 articles pass schema validation
  - [x] 4.2 Temporarily remove a required field (e.g., `title`) — verify build fails
  - [x] 4.3 Restore the field — verify build succeeds again

- [x] Task 5: Create PUBLISHING.md guide (AC: #5)
  - [x] 5.1 Create `PUBLISHING.md` in project root
  - [x] 5.2 Document: file naming convention (`[slug].mdx`)
  - [x] 5.3 Document: required AND optional frontmatter fields with examples. Must include ALL schema fields: `heroImage` (optional, path to hero image), `thumbnailImage` (optional, path to card thumbnail), `heroImageCaption` (optional), `seoTitle` (optional, overrides title for SEO), `seoDescription` (optional, max 160 chars). These are in the article schema but missing from the current template — content owners need to know they exist.
  - [x] 5.4 Document: supported MDX content elements (headings, paragraphs, images, blockquotes, lists, tables)
  - [x] 5.5 Document: git workflow (create file → fill frontmatter → write content → commit → push → auto-deploy)
  - [x] 5.6 Document: where articles appear (homepage, insights hub, division pages, etc.)
  - [x] 5.7 Document: stream values and their meaning
  - [x] 5.8 Document: how to tag an article to a division

- [x] Task 6: Verify articles surface correctly across the platform (AC: #6)
  - [x] 6.1 Homepage latest insights section shows seed articles
  - [x] 6.2 Insights hub (`/insights/`) displays all 6 articles (3 existing + 3 new)
  - [x] 6.3 News page (`/insights/news/`) shows article 1 (+ existing company-news article)
  - [x] 6.4 Thought leadership page (`/insights/thought-leadership/`) shows article 2 (+ existing thought-leadership article)
  - [x] 6.5 Division insights (`/insights/divisions/commodity-marketing/`) shows article 3
  - [x] 6.6 Commodity Marketing division detail page related insights shows article 3
  - [x] 6.7 Article detail pages render MDX body correctly

## Dev Notes

### Seed Article Frontmatter Templates

**Article 1: Company News**
```yaml
---
title: "GRCL Expands Processing Capacity in Kano State"
excerpt: "New agro-processing facility set to double output capacity, creating over 200 jobs in the region and strengthening GRCL's position as a leading agricultural processor in Northern Nigeria."
stream: company-news
publishedAt: "2026-03-15"
featured: true
author: "GRCL Communications"
tags:
  - agro-processing
  - expansion
  - northern-nigeria
---
```

**Article 2: Thought Leadership**
```yaml
---
title: "Why Integrated Value Chains Are the Future of Nigerian Agriculture"
excerpt: "As Nigeria looks to reduce its dependence on oil revenues, the agricultural sector presents a compelling opportunity. But realising that opportunity requires more than isolated farming operations."
stream: thought-leadership
publishedAt: "2026-03-10"
featured: false
author: "Editorial Team"
tags:
  - agriculture
  - value-chains
  - economic-development
---
```

**Article 3: Division Insight**
```yaml
---
title: "Commodity Markets in West Africa: Trends and Outlook"
excerpt: "Key market dynamics shaping cross-border trade in 2026 and what they mean for Nigerian exporters navigating evolving regulatory and logistics landscapes."
stream: division-insight
divisionSlug: commodity-marketing
publishedAt: "2026-03-05"
featured: false
author: "Trade & Markets Division"
tags:
  - commodity-trading
  - west-africa
  - market-analysis
---
```

### MDX Body Content Guidelines

Each seed article should include **realistic Nigerian business content** (not lorem ipsum). Content demonstrates the supported MDX elements:

**Article 1 body demonstrates:** H2 headings, paragraphs, blockquote
**Article 2 body demonstrates:** H2, H3 headings, paragraphs, bulleted list, blockquote, placeholder image (epics require "images" demo)
**Article 3 body demonstrates:** H2 headings, paragraphs, ordered list, data table

Example body structure for Article 2:
```mdx
## The Opportunity

Nigeria's agricultural sector accounts for approximately 25% of GDP...

## What Integration Means in Practice

An integrated value chain connects every stage from production to market:

- **Production:** Modern farming techniques and seed technology
- **Processing:** Converting raw output into market-ready products
- **Distribution:** Connecting producers to domestic and international buyers
- **Quality Assurance:** Maintaining standards across the chain

> "The future of African agriculture lies not in isolated improvements, but in
> connecting the entire value chain under unified management and quality standards."

## Why It Matters for Nigeria

### Economic Diversification

The country's dependence on oil revenues has created vulnerability...

### Employment Generation

Integrated operations create employment at every stage...

## Looking Ahead

Global Resources Citadel's approach — operating crop farming, animal husbandry,
agro-processing, and commodity marketing as interconnected divisions — demonstrates
what integration looks like in practice...
```

### Article Stream → Page Surface Verification

| Article | Stream | divisionSlug | Surfaces On |
|---------|--------|-------------|-------------|
| Article 1 (GRCL Expands) | company-news | — | Homepage (featured), Insights Hub, /insights/news/ |
| Article 2 (Value Chains) | thought-leadership | — | Homepage, Insights Hub, /insights/thought-leadership/ |
| Article 3 (Commodity Markets) | division-insight | commodity-marketing | Homepage, Insights Hub, /insights/divisions/commodity-marketing/, Commodity Marketing division page |

### PUBLISHING.md Template

```markdown
# Publishing Guide — Global Resources Citadel

## How to Publish a New Article

### 1. Create the File

Create a new `.mdx` file in `src/content/articles/`:

```
src/content/articles/your-article-slug.mdx
```

File name becomes the URL slug: `/insights/your-article-slug/`

### 2. Add Frontmatter

Every article requires this frontmatter block at the top:

```yaml
---
title: "Your Article Title"           # Required, max 120 characters
excerpt: "Brief summary for cards"     # Required, 2-3 sentences
stream: company-news                   # Required — see stream values below
publishedAt: "2026-04-01"             # Required, ISO date format (YYYY-MM-DD)
featured: false                        # Optional, default false
author: "Author Name"                  # Optional
divisionSlug: crop-farming             # Optional — tag to a specific division
tags:                                  # Optional
  - tag-one
  - tag-two
heroImage: "./images/article-hero.jpg" # Optional — 16:9 hero image
thumbnailImage: "./images/thumb.jpg"   # Optional — card thumbnail
heroImageCaption: "Photo description"  # Optional — caption below hero image
seoTitle: "Custom SEO Title"           # Optional — overrides title in <title> tag
seoDescription: "Custom meta desc"     # Optional — max 160 chars, overrides excerpt
---
```

### 3. Write Content

Below the frontmatter, write your article using these elements:

- **Headings:** Use ## for H2 and ### for H3 (H1 is the title)
- **Paragraphs:** Plain text separated by blank lines
- **Bold/Italic:** **bold** and *italic*
- **Lists:** Bulleted (-) or numbered (1.)
- **Blockquotes:** > Quote text
- **Tables:** Standard markdown tables
- **Images:** ![Alt text](./image.jpg)

### 4. Publish

```bash
git add src/content/articles/your-article-slug.mdx
git commit -m "Publish: Your Article Title"
git push origin main
```

The site rebuilds automatically. Your article appears within minutes.

### Stream Values

| Stream | Meaning | Appears On |
|--------|---------|------------|
| `company-news` | Company announcements | News & Updates page |
| `announcements` | Formal announcements | News & Updates page |
| `operational-updates` | Operations news | News & Updates page |
| `thought-leadership` | Expert analysis | Thought Leadership page |
| `industry-commentary` | Industry perspectives | Thought Leadership page |
| `division-insight` | Division-specific | Division insights page (requires `divisionSlug`) |

### Division Tags

To tag an article to a division, add `divisionSlug` in frontmatter:

```yaml
divisionSlug: crop-farming
```

Valid values: `crop-farming`, `animal-husbandry`, `agro-processing`,
`commodity-marketing`, `import-export`, `real-estate`, `oil-gas`

### Where Articles Appear

- **Homepage:** Latest 3 articles in the insights section
- **Insights Hub:** All articles, filterable by category
- **Category Pages:** Filtered by stream (News, Thought Leadership)
- **Division Pages:** Articles tagged to that division
- **Division Insights:** `/insights/divisions/[slug]/`
```

### Build Validation

The Zod schema in `src/content/config.ts` (Story 1.3) enforces:
- `title`: required string, max 120 chars
- `excerpt`: required string
- `stream`: required, must be one of the enum values
- `publishedAt`: required ISO date string
- `divisionSlug`: optional, must be valid division slug if provided

Missing or invalid frontmatter fails the build with clear error messages.

### Previous Story Intelligence

**Story 1.3** creates the article content collection with Zod schema and 1-2 placeholder articles. This story replaces placeholders with proper seed content (3 articles).

**Story 6.1** creates insights listing pages that query these articles.

**Story 6.2** creates article detail pages that render MDX content.

**Story 2.4** creates the homepage insights section that displays latest articles.

**Story 3.3** creates division detail pages with related insights sections.

### What This Story Does NOT Include

- No real editorial photography
- No CMS or admin panel (git-based workflow only for Phase 1)
- No editorial review/approval process
- No scheduled publishing
- No RSS feed
- No newsletter integration

### What This Story Completes

This is the **final story in Epic 6**. After this story:
- `/insights/` — hub with featured article, filter tabs, article grid (6.1)
- `/insights/latest/`, `/insights/news/`, `/insights/thought-leadership/` — category pages (6.1)
- `/insights/divisions/`, `/insights/divisions/[slug]/` — division insights (6.1)
- `/insights/[slug]/` — article detail with MDX rendering, sidebar, related articles (6.2)
- 3 seed articles with realistic content spanning multiple streams (6.3)
- PUBLISHING.md guide for content owners (6.3)

The complete publishing and thought leadership system is live.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/content/articles/grcl-expands-processing-capacity.mdx`
- **Creates:** `src/content/articles/integrated-value-chains-future-agriculture.mdx`
- **Creates:** `src/content/articles/commodity-markets-west-africa-trends.mdx`
- **Creates:** `PUBLISHING.md` (project root)
- **May remove:** placeholder articles from Story 1.3 if they exist

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 6, Story 6.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Publishing taxonomy, stream values, content relationships]
- [Source: _bmad-output/planning-artifacts/architecture.md — Git-based content workflow, MDX rendering, Zod validation]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Article schema, stream enum, seed data guidelines]
- [Source: _bmad-output/implementation-artifacts/6-1-insights-hub-category-listing-pages.md — Stream→page routing map]
- [Source: _bmad-output/implementation-artifacts/6-2-article-detail-page.md — Article detail rendering, MDX prose styling]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Initial build failed: seoDescription on articles 2 and 3 exceeded 160 char Zod limit — shortened both
- Zod validation test: removed `title` from article 1 → build failed with clear "title: Required" error → restored → build passed
- Final build: all 6 article detail pages + all listing/hub/homepage pages render successfully
- Verified article surfacing via grep on rendered HTML output

### Completion Notes List

- Created 3 new seed articles with realistic Nigerian business content spanning company-news, thought-leadership, and division-insight streams
- Article 1 (company-news): 3 paragraphs, H2 headings, blockquote — featured: true
- Article 2 (thought-leadership): 5+ paragraphs, H2/H3 headings, bulleted list, blockquote — demonstrates most MDX elements
- Article 3 (division-insight, commodity-marketing): H2 headings, ordered list, data table — tagged to Commodity Marketing division
- All articles have realistic excerpts, author attribution, tags, SEO metadata
- Verified Zod validation catches missing required fields (build fails with clear error)
- Created PUBLISHING.md with complete guide: file naming, all frontmatter fields (including heroImage, thumbnailImage, heroImageCaption, seoTitle, seoDescription), MDX elements, git workflow, stream values, division tagging, where articles appear
- Verified articles surface on: homepage (latest 3), insights hub (all 6), news page (company-news articles), thought leadership page (thought-leadership articles), commodity-marketing division page (division-tagged article)
- This completes Epic 6 — the full publishing and thought leadership system is live

### Change Log

- 2026-04-04: Story 6.3 implemented — 3 seed articles, Zod validation verified, PUBLISHING.md guide created

### File List

- `src/content/articles/grcl-expands-processing-capacity.mdx` (created)
- `src/content/articles/integrated-value-chains-future-agriculture.mdx` (created)
- `src/content/articles/commodity-markets-west-africa-trends.mdx` (created)
- `PUBLISHING.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

### Review Findings

- [x] [Review][Decision] Two articles with `featured: true` — resolved: leave as-is, most recent wins by date sort (documented behavior)
- [x] [Review][Patch] Article 2 missing placeholder image demo — fixed: added image syntax with public/ absolute path
- [x] [Review][Patch] PUBLISHING.md branch name — fixed: changed to `git push` (branch-agnostic)
- [x] [Review][Patch] PUBLISHING.md image path guidance — fixed: unified to public/ absolute paths for all article images
- [x] [Review][Defer] No Zod enforcement that division-insight requires divisionSlug — schema gap from Story 1.3
