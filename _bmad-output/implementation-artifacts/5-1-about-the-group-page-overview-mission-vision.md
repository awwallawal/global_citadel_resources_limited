# Story 5.1: About the Group Page — Overview, Mission & Vision

Status: ready-for-dev

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
8. Content sourced from pages/about.mdx content collection entry

## Tasks / Subtasks

- [ ] Task 1: Create `src/pages/about.astro` (AC: #1, #6, #7)
  - [ ] 1.1 PageLayout with SEO: title "About Global Resources Citadel — Our Story, Mission, Leadership & Group Structure"
  - [ ] 1.2 Description (~155 chars)
  - [ ] 1.3 Canonical: `/about/`
  - [ ] 1.4 Organization + AboutPage JSON-LD
  - [ ] 1.5 BreadcrumbNav: Home > About the Group
  - [ ] 1.6 Breadcrumb JSON-LD
  - [ ] 1.7 Fetch content from pages/about.mdx collection entry

- [ ] Task 2: Build PageHero (AC: #1)
  - [ ] 2.1 Gold eyebrow: "About the Group"
  - [ ] 2.2 H1: "Who We Are"
  - [ ] 2.3 Sub-heading: positioning statement (max 30 words)
  - [ ] 2.4 Subtle background (primary-50 or light gradient — differentiate from homepage hero)

- [ ] Task 3: Create AnchorNav.astro component (AC: #2, #5)
  - [ ] 3.1 Create `src/components/shared/AnchorNav.astro` (static shell)
  - [ ] 3.2 Create `src/components/shared/AnchorNavClient.tsx` (React island for scroll-spy, `client:idle`)
  - [ ] 3.3 Props: items array of `{ label: string; href: string }` (e.g., `{ label: "Overview", href: "#overview" }`)
  - [ ] 3.4 Sticky below header: `sticky top-16 z-40` (below header's z-50)
  - [ ] 3.5 Background: `bg-white/95 backdrop-blur-sm border-b border-neutral-200`
  - [ ] 3.6 Horizontal scrollable on mobile: `overflow-x-auto` with `scrollbar-hide`
  - [ ] 3.7 Active state: `text-primary-600 border-b-2 border-primary-600` on current section
  - [ ] 3.8 IntersectionObserver scroll-spy: observe all `#section-id` elements, highlight matching nav item
  - [ ] 3.9 Smooth scroll on click: `scroll-behavior: smooth` or `element.scrollIntoView({ behavior: 'smooth' })`
  - [ ] 3.10 Mobile fade indicators at scroll edges (CSS gradient overlays)

- [ ] Task 4: Build Overview section (#overview) (AC: #3)
  - [ ] 4.1 SectionWrapper variant="default", `id="overview"`
  - [ ] 4.2 2-column grid: `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
  - [ ] 4.3 Left: image placeholder (styled div with corporate icon, or Astro `<Image>` if asset exists)
  - [ ] 4.4 Right: SectionHeading "Our Story" + 3-4 paragraphs from MDX content
  - [ ] 4.5 Key fact callouts: styled inline badges/pills (Founded [Year], HQ: [City], 7 Divisions)
  - [ ] 4.6 Prose: `text-lg leading-relaxed text-neutral-600`

- [ ] Task 5: Build Mission & Vision section (#mission-vision) (AC: #4)
  - [ ] 5.1 SectionWrapper variant="light", `id="mission-vision"`
  - [ ] 5.2 SectionHeading: "Mission & Vision"
  - [ ] 5.3 2 side-by-side StatementCards: `grid-cols-1 md:grid-cols-2 gap-6`
  - [ ] 5.4 Mission card: decorative icon + "Our Mission" heading + statement paragraph
  - [ ] 5.5 Vision card: decorative icon + "Our Vision" heading + statement paragraph
  - [ ] 5.6 Card styling: `border border-neutral-200 rounded-xl p-8`, icon circle with primary-100 bg
  - [ ] 5.7 Optional value cards row below: `grid-cols-2 md:grid-cols-4 gap-6`
  - [ ] 5.8 Value card: icon + title + description (small, compact)

- [ ] Task 6: Prepare section anchors for Story 5.2 (AC: #2)
  - [ ] 6.1 Add empty placeholder sections with correct IDs: `#leadership`, `#group-structure`, `#credentials`, `#values`
  - [ ] 6.2 These will be populated in Story 5.2 but AnchorNav links must not break

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

interface AnchorNavClientProps {
  items: Array<{ label: string; href: string }>;
}

export default function AnchorNavClient({ items }: AnchorNavClientProps) {
  const [activeId, setActiveId] = useState(items[0]?.href.slice(1) || '');

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
            className={cn(
              'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
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

### Debug Log References

### Completion Notes List

### File List
