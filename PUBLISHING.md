# Publishing Guide — Global Resources Citadel

## How to Publish a New Article

### 1. Create the File

Create a new `.mdx` file in `src/content/articles/`:

```
src/content/articles/your-article-slug.mdx
```

The file name becomes the URL slug: `/insights/your-article-slug/`

Use kebab-case for file names (lowercase, hyphens between words).

### 2. Add Frontmatter

Every article starts with a YAML frontmatter block between `---` markers:

```yaml
---
title: "Your Article Title"             # Required, max 120 characters
excerpt: "Brief summary for cards"       # Required, max 300 characters, 2-3 sentences
stream: company-news                     # Required — see stream values below
publishedAt: "2026-04-01"               # Required, YYYY-MM-DD format
featured: false                          # Optional, default false — shows in featured slot
author: "Author Name"                    # Optional
divisionSlug: crop-farming               # Optional — tags article to a specific division
tags:                                    # Optional — content tags for sidebar display
  - tag-one
  - tag-two
heroImage: "/images/articles/article-hero.jpg"  # Optional — 16:9 hero image (path from public/)
thumbnailImage: "/images/articles/thumb.jpg"   # Optional — card thumbnail (path from public/)
heroImageCaption: "Photo description"    # Optional — caption displayed below hero image
seoTitle: "Custom SEO Title"             # Optional — overrides title in browser tab
seoDescription: "Custom meta description" # Optional — max 160 chars, overrides excerpt for SEO
---
```

### 3. Write Content

Below the frontmatter, write your article using standard Markdown/MDX:

**Headings** — Use `##` for main sections (H2) and `###` for subsections (H3). The article title is automatically H1.

```markdown
## Main Section Heading

Paragraph text goes here.

### Subsection Heading

More content here.
```

**Paragraphs** — Plain text separated by blank lines.

**Bold and Italic** — `**bold text**` and `*italic text*`

**Bulleted Lists:**

```markdown
- First item
- Second item
- Third item
```

**Numbered Lists:**

```markdown
1. First step
2. Second step
3. Third step
```

**Blockquotes:**

```markdown
> "Quoted text goes here. Great for highlighting key statements."
```

**Tables:**

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

**Images:**

```markdown
![Description of the image](/images/articles/your-image.jpg)
```

Place all article images in the `public/images/articles/` directory and reference them with absolute paths starting with `/`. This applies to both body images in MDX content and frontmatter fields (`heroImage`, `thumbnailImage`).

### 4. Publish

```bash
git add src/content/articles/your-article-slug.mdx
git commit -m "Publish: Your Article Title"
git push
```

The site rebuilds automatically on Vercel. Your article appears within minutes at `/insights/your-article-slug/`.

## Stream Values

The `stream` field determines which category page your article appears on:

| Stream | Category Page | Use For |
|--------|--------------|---------|
| `company-news` | News & Updates | Company announcements, milestones |
| `announcements` | News & Updates | Formal public announcements |
| `operational-updates` | News & Updates | Operations and project updates |
| `thought-leadership` | Thought Leadership | Expert analysis, opinion pieces |
| `industry-commentary` | Thought Leadership | Industry perspectives, market analysis |
| `division-insight` | Division Insights | Division-specific content (requires `divisionSlug`) |

## Tagging Articles to a Division

To associate an article with a specific business division, add `divisionSlug` in frontmatter:

```yaml
divisionSlug: crop-farming
```

**Valid division slugs:** `crop-farming`, `animal-husbandry`, `agro-processing`, `commodity-marketing`, `import-export`, `real-estate`, `oil-gas`

Division-tagged articles appear on:
- The division's insights page (`/insights/divisions/[slug]/`)
- The division's detail page in the "Related Insights" section
- The article detail page shows a division tag in the sidebar and a division-specific CTA

## Where Articles Appear

| Location | What Shows |
|----------|-----------|
| **Homepage** | Latest 3 articles in the insights section |
| **Insights Hub** (`/insights/`) | All articles with featured article hero, filter tabs |
| **News & Updates** (`/insights/news/`) | Articles with news-related streams |
| **Thought Leadership** (`/insights/thought-leadership/`) | Articles with thought-leadership streams |
| **Division Insights** (`/insights/divisions/[slug]/`) | Articles tagged to that division |
| **Article Detail** (`/insights/[slug]/`) | Full article with sidebar, related articles, CTA |

## Featured Articles

Set `featured: true` to display an article in the featured hero slot on the Insights hub page. Only the most recent featured article is shown in the hero position.

## Schema Validation

The build will fail if any article is missing required fields or has invalid values. Error messages clearly indicate which field failed validation and why. This ensures all published content meets quality standards.
