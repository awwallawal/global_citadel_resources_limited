# Story 5.1: About the Group Page — Overview, Mission & Vision

Status: done

## Story

As a **visitor**,
I want to understand who GRCL is, what they stand for, and why they exist,
So that I can assess the company's legitimacy and values before engaging further.

## Acceptance Criteria

1. PageHero with "About the Group" gold eyebrow, "Who We Are" heading, and positioning sub-heading
2. AnchorNav component renders below header (sticky on scroll) with items: Overview, Mission & Vision, Leadership, Group Structure, Credentials, Values — with scroll-spy highlighting current section via IntersectionObserver
3. Overview section (#overview): 2-column layout — corporate photography placeholder left, narrative text right (3-4 paragraphs) with key fact callouts (Founded [Year], Headquarters, [X] Divisions)
4. Mission & Vision section (#mission-vision): 2 side-by-side statement cards (Mission and Vision) with decorative icons, plus optional row of 3-4 value cards (icon + title + description)
5. AnchorNav horizontally scrollable on mobile with fade indicators
6. Breadcrumbs: Home > About the Group
7. SEO metadata: Organization + AboutPage structured data
8. Content sourced from pages/about.mdx content collection entry. **Prerequisite:** Story 1.3's `pageSchema` must be extended with optional About-specific fields (`mission`, `vision`, `values` array) — Zod strips unknown keys by default, so these frontmatter fields will be silently dropped without schema changes.

## Tasks / Subtasks

- [x] Task 1: Create `src/pages/about.astro` (AC: #1, #6, #7)
  - [x] 1.1 PageLayout with SEO: title "About Global Resources Citadel — Our Story, Mission, Leadership & Group Structure"
  - [x] 1.2 Description (~155 chars)
  - [x] 1.3 Canonical: `/about/`
  - [x] 1.4 Organization + AboutPage JSON-LD
  - [x] 1.5 BreadcrumbNav: Home > About the Group
  - [x] 1.6 Breadcrumb JSON-LD
  - [x] 1.7 Fetch content from pages/about.mdx collection entry

- [x] Task 2: Build page hero inline (AC: #1)
  - [x] 2.1 Build inline with SectionWrapper `variant="primary"` (primary-50 bg)
  - [x] 2.2 Gold eyebrow: "About the Group"
  - [x] 2.3 H1: "Who We Are"
  - [x] 2.4 Sub-heading: positioning statement (max 30 words)
  - [x] 2.5 Centered text layout, constrained max-width (`max-w-3xl`)

- [x] Task 3: Create AnchorNav.astro component (AC: #2, #5)
  - [x] 3.1 Create `src/components/shared/AnchorNav.astro` (static shell)
  - [x] 3.2 Create `src/components/shared/AnchorNavClient.tsx` (React island for scroll-spy, `client:idle`)
  - [x] 3.3 Props: items array of `{ label: string; href: string }`
  - [x] 3.4 Sticky below header: `sticky top-16 z-40` (below header's z-50)
  - [x] 3.5 Background: `bg-white/95 backdrop-blur-sm border-b border-neutral-200`
  - [x] 3.6 Horizontal scrollable on mobile: `overflow-x-auto` with scrollbar-hide
  - [x] 3.7 Active state: `text-primary-600 border-b-2 border-primary-600` on current section
  - [x] 3.8 IntersectionObserver scroll-spy: observe all `#section-id` elements, highlight matching nav item
  - [x] 3.9 Smooth scroll on click with `prefers-reduced-motion` check
  - [x] 3.10 Focus-visible on all nav links
  - [x] 3.11 Mobile fade indicators at scroll edges (CSS gradient overlays)

- [x] Task 4: Build Overview section (#overview) (AC: #3)
  - [x] 4.1 SectionWrapper variant="default", `id="overview"`
  - [x] 4.2 2-column grid: `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
  - [x] 4.3 Left: image placeholder (styled div with corporate building icon)
  - [x] 4.4 Right: SectionHeading "Our Story" + 4 paragraphs from MDX content
  - [x] 4.5 Key fact callouts: styled inline pills (Founded 2011, HQ: Lagos, 7 Divisions)
  - [x] 4.6 Prose: `text-lg leading-relaxed text-neutral-600`

- [x] Task 5: Build Mission & Vision section (#mission-vision) (AC: #4)
  - [x] 5.1 SectionWrapper variant="light", `id="mission-vision"`
  - [x] 5.2 SectionHeading: "Mission & Vision"
  - [x] 5.3 2 side-by-side StatementCards: `grid-cols-1 md:grid-cols-2 gap-6`
  - [x] 5.4 Mission card: decorative icon + "Our Mission" heading + statement paragraph
  - [x] 5.5 Vision card: decorative icon + "Our Vision" heading + statement paragraph
  - [x] 5.6 Card styling: `border border-neutral-200 rounded-xl p-8`, icon circle with primary-100 bg
  - [x] 5.7 4 value cards row below: `grid-cols-2 md:grid-cols-4 gap-6`
  - [x] 5.8 Value card: emoji icon + title + description (compact)

- [x] Task 6: Prepare section anchors for Story 5.2 (AC: #2)
  - [x] 6.1 Add empty placeholder sections with correct IDs: `#leadership`, `#group-structure`, `#credentials`, `#values`
  - [x] 6.2 AnchorNav links don't break — all 6 section IDs present

- [x] Task 7: FAQ Section (AC: FAQ)
  - [x] 7.1 Render `FAQSection.astro` component with `category="about"` filter
  - [x] 7.2 Placed after mission/vision section, before placeholder sections
  - [x] 7.3 Pass `sectionTitle="Common Questions"`

## Dev Notes

### Page Structure

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > About the Group
  ├── PageHero
  │   ├── Gold eyebrow: "About the Group"
  │   ├── H1: "Who We Are"
  │   └── Sub-heading
  ├── AnchorNav (sticky)
  │   └── Overview | Mission & Vision | Leadership | Group Structure | Credentials | Values
  ├── #overview — Company Overview (white bg)
  │   ├── 2-column: image left, text right
  │   ├── 3-4 narrative paragraphs
  │   └── Key fact callouts
  ├── #mission-vision — Mission & Vision (neutral-50 bg)
  │   ├── 2 StatementCards (Mission + Vision)
  │   └── Optional 3-4 value cards
  ├─��� #leadership — (placeholder for Story 5.2)
  ├── #group-structure — (placeholder for Story 5.2)
  ├── #credentials — (placeholder for Story 5.2)
  ├── #values — (placeholder for Story 5.2)
  └── CTABanner (Story 5.2 adds this)
```

### AnchorNav Component Architecture

AnchorNav needs scroll-spy (IntersectionObserver) which requires client-side JS. Use a hybrid approach:

**AnchorNav.astro** — static shell rendering the nav HTML (visible immediately, no JS needed for basic links)

**AnchorNavClient.tsx** — React island (`client:idle`) adding scroll-spy highlighting. Uses `client:idle` because scroll-spy is an enhancement, not critical for first interaction.

```astro
<!-- In about.astro -->
<AnchorNav
  items={[
    { label: 'Overview', href: '#overview' },
    { label: 'Mission & Vision', href: '#mission-vision' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Group Structure', href: '#group-structure' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Values', href: '#values' },
  ]}
/>
```

### AnchorNavClient Scroll-Spy Pattern

```tsx
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnchorNavClientProps {
  items: Array<{ label: string; href: string }>;
}

export default function AnchorNavClient({ items }: AnchorNavClientProps) {
  const [activeId, setActiveId] = useState(items[0]?.href.slice(1) || '');

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    items.forEach(item => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {items.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={cn(
              'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              activeId === item.href.slice(1)
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

### Mobile Fade Indicators

Horizontal scroll with fade edges on mobile:

```css
.anchor-nav-wrapper {
  position: relative;
}
.anchor-nav-wrapper::before,
.anchor-nav-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 24px;
  z-index: 1;
  pointer-events: none;
}
.anchor-nav-wrapper::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}
.anchor-nav-wrapper::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}
```

### Key Fact Callouts

Styled inline within the overview text column:

```astro
<div class="mt-6 flex flex-wrap gap-4">
  <div class="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
    Founded 2011
  </div>
  <div class="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
    Headquarters: Lagos, Nigeria
  </div>
  <div class="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
    7 Business Divisions
  </div>
</div>
```

Values are placeholders — exact founding year and HQ city from client.

### Content from MDX Collection

Story 1.3 creates `src/content/pages/about.mdx` as a placeholder. This story populates it with realistic content for the Overview, Mission, and Vision sections. The MDX body can include frontmatter fields for structured data (mission statement, vision statement, values array) plus prose body for the overview paragraphs.

**IMPORTANT: Schema extension required.** Story 1.3's `pageSchema` only has `title`, `seoTitle`, `seoDescription`, `lastUpdated`. The About-specific frontmatter fields (`mission`, `vision`, `values`) must be added as optional fields to the schema, otherwise Zod will strip them at build time:

```typescript
// Extend pageSchema in src/content/config.ts
const pageSchema = z.object({
  title: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string().max(160),
  lastUpdated: z.string().optional(),
  // About page extensions (optional — only used by about.mdx)
  mission: z.string().optional(),
  vision: z.string().optional(),
  values: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })).optional(),
});
```

```yaml
---
title: About the Group
seoTitle: "About Global Resources Citadel — Our Story, Mission, Leadership & Group Structure"
seoDescription: "Learn about Global Resources Citadel Limited..."
mission: "To build integrated value chains across Nigeria's key economic sectors..."
vision: "To become West Africa's most trusted diversified industrial group..."
values:
  - icon: shield
    title: Integrity
    description: "Operating with transparency..."
  - icon: users
    title: Partnership
    description: "Building lasting relationships..."
lastUpdated: "2026-03-28"
---

Global Resources Citadel Limited was founded with a clear mandate...
```

### Placeholder Sections for Story 5.2

Story 5.2 builds Leadership, Group Structure, Credentials, and Values sections. This story creates empty anchored `<section>` elements so AnchorNav links don't break:

```astro
<section id="leadership" class="py-16 lg:py-24">
  <!-- Populated in Story 5.2 -->
</section>
<section id="group-structure" class="py-16 lg:py-24">
  <!-- Populated in Story 5.2 -->
</section>
<section id="credentials" class="py-16 lg:py-24">
  <!-- Populated in Story 5.2 -->
</section>
<section id="values" class="py-16 lg:py-24">
  <!-- Populated in Story 5.2 -->
</section>
```

### Previous Story Intelligence

**Story 1.4** — PageHero, SectionWrapper, SectionHeading, CTABanner, Button available.

**Story 1.8** — BreadcrumbNav and JSON-LD helpers available.

**Story 1.3** — pages/about.mdx placeholder exists in content collections. Team and credentials collections also exist (used in Story 5.2).

**Story 1.2** — Design tokens: primary-50 (hero bg), primary-600 (active anchor), neutral-200 (anchor border), all typography.

### What This Story Does NOT Include

- No Leadership section (Story 5.2)
- No OrgChart / Group Structure (Story 5.2)
- No Credentials grid (Story 5.2)
- No CTA Band at bottom (Story 5.2)
- No real corporate photography — placeholders
- No LeaderCard, LeaderBioPanel, CredentialCard, OrgChart components

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/about.astro`
- **Creates:** `src/components/shared/AnchorNav.astro` — static shell
- **Creates:** `src/components/shared/AnchorNavClient.tsx` — React island scroll-spy (`client:idle`)
- **Modifies:** `src/content/pages/about.mdx` — populates with overview, mission, vision content

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 5, Story 5.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P02 About page wireframe, sections 3.1-3.3, anchor nav spec]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — AnchorNav component, About page patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md — Island hydration (AnchorNav client:idle)]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — PageHero, SectionWrapper]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Extended `pageSchema` in `content.config.ts` with optional `mission`, `vision`, `values` fields — required because Zod strips unknown frontmatter keys
- Fixed Astro 6 Content Layer API: `page.render()` → `render(page)` — `render` is a standalone function imported from `astro:content`, not a method on collection entries

### Completion Notes List

- Extended `pageSchema` with optional `mission` (string), `vision` (string), and `values` (array of icon/title/description objects) fields for About page frontmatter
- Updated `about.mdx` with full corporate overview prose (4 paragraphs), mission statement, vision statement, and 4 values (Integrity, Excellence, Partnership, Sustainability)
- Created `about.astro` page with hero (primary variant, gold eyebrow, H1), Overview section (2-col with image placeholder + MDX prose + fact pills), Mission & Vision section (2 statement cards + 4 value cards), FAQ section (6 about-category FAQs), and 4 placeholder section anchors for Story 5.2
- Created `AnchorNav.astro` static shell + `AnchorNavClient.tsx` React island (client:idle) with IntersectionObserver scroll-spy, smooth scroll with reduced-motion respect, sticky positioning below header (z-40), mobile horizontal scroll with CSS fade indicators
- Organization + AboutPage + BreadcrumbList JSON-LD structured data
- Build: 26 pages generated successfully (1 new)

### File List

- `src/pages/about.astro` (created)
- `src/components/shared/AnchorNav.astro` (created)
- `src/components/shared/AnchorNavClient.tsx` (created)
- `src/content/pages/about.mdx` (modified — full content)
- `src/content.config.ts` (modified — extended pageSchema with mission/vision/values)

### Review Findings

- [x] [Review][Patch] Placeholder sections (aria-hidden, zero-height) break AnchorNav scroll-spy and navigation — removed from anchorItems, removed aria-hidden [about.astro:51-58,185-188] — FIXED
- [x] [Review][Patch] `mission`/`vision` rendered without null guards — schema has `.optional()` but cards render unconditionally [about.astro:149,159] — FIXED
- [x] [Review][Patch] AnchorNav touch targets below 44px — `py-3` (~38px) increased to `py-4` [AnchorNavClient.tsx:77] — FIXED
- [x] [Review][Patch] Arbitrary Tailwind values: `[&>p]:leading-relaxed`, scrollbar-hiding selectors — CLAUDE.md violation [about.astro:117, AnchorNavClient.tsx:71] — FIXED
- [x] [Review][Patch] SEO title regex doesn't match actual seoTitle — produces double "Global Resources Citadel" in rendered title [about.astro:35] — FIXED
- [x] [Review][Defer] Scroll-spy may pick wrong section when multiple visible — rootMargin mitigates, rare edge case
- [x] [Review][Defer] `items` array in useEffect dependency — Astro hydrates once, latent only
- [x] [Review][Defer] `scrollIntoView` on nav child may cause vertical page jump — sticky positioning mitigates
- [x] [Review][Defer] `prefersReducedMotion` read once at mount — system setting rarely changes mid-session
- [x] [Review][Defer] Fade gradient pseudo-elements use hardcoded `white` — minor design consistency
- [x] [Review][Defer] `backdrop-blur-sm` performance on low-end mobile — accepted pattern across site
- [x] [Review][Defer] `client:idle` hydration may delay scroll-spy on slow connections — spec specifies client:idle

### Change Log

- 2026-04-03: Implemented Story 5.1 — About page with overview, mission/vision, values, AnchorNav scroll-spy, FAQ section, placeholder anchors for Story 5.2
- 2026-04-03: Code review completed — 5 patch findings (all fixed), 7 deferred, 8+ dismissed. Story status → done.
