# Story 1.4: Base Layouts & Core UI Components

Status: done

## Story

As a **visitor**,
I want every page to have a consistent, accessible structure with professional presentation,
So that I can use the platform comfortably on any device with any assistive technology.

## Acceptance Criteria

1. BaseLayout includes `lang="en"`, proper head meta, font preloads, global CSS import, and a skip-to-main-content link as the first focusable element
2. Every page has a single `<main>` landmark wrapping content, with `<nav>` landmarks having aria-labels
3. PageLayout wraps all pages with SEO metadata (title, description, canonical, Open Graph, Twitter Card), a breadcrumb slot, and section slots
4. SectionWrapper supports 5 background variants (default/white, light/neutral-50, dark/neutral-900, primary/primary-50, hero/gradient) with consistent `py-16 lg:py-24` padding and container constraints (`max-w-7xl`, `mx-auto`, `px-4 sm:px-6 lg:px-8`)
5. SectionHeading renders H2 with Poppins semibold (`text-3xl lg:text-4xl`), optional gold eyebrow (uppercase, text-xs, tracking-widest), optional subtitle (Inter, text-lg, neutral-600), and centered/left alignment
6. Button components exist for all 5 hierarchy levels: primary (primary-600 bg), secondary (outline), tertiary (link+arrow), gold accent, disabled — all with `focus-visible:ring-2 ring-primary-500 ring-offset-2`
7. CTABanner renders full-width accent background (dark/gold/green variants), centered heading + body + 1-2 CTA buttons
8. All interactive elements have 44x44px minimum touch targets
9. All transitions/animations wrapped in `prefers-reduced-motion` checks
10. Brand logo SVGs prepared for inline use: Google Fonts @import removed from SVG source, using self-hosted Poppins or text elements converted to paths

## Tasks / Subtasks

- [x] Task 1: Create BaseLayout.astro (AC: #1, #2)
  - [x] 1.1 HTML shell with `lang="en"`, charset, viewport meta
  - [x] 1.2 Import globals.css (fonts + Tailwind tokens from Story 1.2)
  - [x] 1.3 SEO head tags via props: title, description, canonical, OG, Twitter Card
  - [x] 1.4 Skip-to-main-content link as first focusable element (sr-only, visible on focus)
  - [x] 1.5 Font preload hints: `<link rel="preload" as="font" type="font/woff2" crossorigin>` for Poppins 600 and Inter 400 woff2 files (resolve paths from @fontsource output in node_modules). Critical for FCP on low-bandwidth Nigerian mobile connections.
  - [x] 1.6 Favicon link: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
  - [x] 1.7 `<slot />` for page content

- [x] Task 2: Create PageLayout.astro (AC: #3)
  - [x] 2.1 Wraps BaseLayout with SEO props pass-through
  - [x] 2.2 Header slot (empty until Story 1.5)
  - [x] 2.3 Breadcrumb slot (empty until Story 1.8)
  - [x] 2.4 `<main id="main">` landmark wrapping `<slot />`
  - [x] 2.5 Footer slot (empty until Story 1.7)

- [x] Task 3: Create SectionWrapper.astro (AC: #4)
  - [x] 3.1 Props: `variant`, `id`, `class`, `as` (HTML element tag)
  - [x] 3.2 Implement 5 background variants with cn() utility
  - [x] 3.3 Consistent padding: `py-16 lg:py-24`
  - [x] 3.4 Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  - [x] 3.5 `<slot />` for section content

- [x] Task 4: Create SectionHeading.astro (AC: #5)
  - [x] 4.1 Props: heading text, `eyebrow`, `subtitle`, `centered`
  - [x] 4.2 Optional gold eyebrow: `text-gold-600 uppercase text-xs tracking-widest font-semibold`
  - [x] 4.3 H2: `font-heading font-semibold text-3xl lg:text-4xl leading-tight`
  - [x] 4.4 Optional subtitle: `text-lg text-neutral-600`
  - [x] 4.5 Wrapper spacing: `mb-10 lg:mb-12`

- [x] Task 5: Customize Button component via shadcn/ui (AC: #6)
  - [x] 5.1 Add/configure button variants in `src/components/ui/button.tsx`
  - [x] 5.2 Primary: `bg-primary-600 text-white hover:bg-primary-700`
  - [x] 5.3 Secondary: `border border-neutral-300 text-neutral-700 hover:bg-neutral-50`
  - [x] 5.4 Tertiary: `text-primary-600 hover:text-primary-700` with arrow icon + group-hover gap
  - [x] 5.5 Gold accent: `bg-gold-600 text-primary-900 hover:bg-gold-400 hover:-translate-y-px` (dark text on gold per design reference; translateY lift on hover)
  - [x] 5.6 Disabled: `bg-neutral-300 text-neutral-500 cursor-not-allowed`
  - [x] 5.7 Focus ring on all: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
  - [x] 5.8 Touch target: minimum `px-8 py-4` padding (44x44px)
  - [x] 5.9 Size variants: default, sm, lg

- [x] Task 6: Create CTABanner.astro (AC: #7)
  - [x] 6.1 Props: heading, body, primaryCta (label + href), secondaryCta (optional). Dark variant only — this is the only variant in the design reference. Additional variants (gold, green) can be added in future stories when a page actually needs them.
  - [x] 6.2 Dark variant: `bg-neutral-900` with white text + gold accent divider
  - [x] 6.3 Centered layout with max-width constraint
  - [x] 6.4 1-2 CTA buttons (gold accent variant) with proper spacing

- [x] Task 7: Create SEO utilities in `src/lib/seo.ts` (AC: #3)
  - [x] 7.1 `generateMetadata()` — returns title, description, canonical, OG tags, Twitter Card
  - [x] 7.2 `generateJsonLd()` — Organization, WebSite schema markup
  - [x] 7.3 Export SEO types

- [x] Task 8: Prepare brand logo SVGs (AC: #10)
  - [x] 8.1 Inspect SVG files in `src/assets/brand/` for Google Fonts @import
  - [x] 8.2 Remove any external font imports from SVG source
  - [x] 8.3 Convert text elements to paths OR ensure self-hosted Poppins renders them
  - [x] 8.4 Verify all 4 logo variants render correctly

- [x] Task 9: Create PageHero.astro (inner pages, not homepage) — No direct AC in this story; consumed by Epic 3 division pages, Epic 5 About/Investors pages. Created here as a shared layout primitive alongside other layout components.
  - [x] 9.1 Props: title (H1), subtitle, breadcrumbSlot
  - [x] 9.2 Constrained height, dark gradient or image background
  - [x] 9.3 White text, centered or left-aligned

- [x] Task 10: Create ViewAllLink.astro — No direct AC in this story; consumed by Epic 2 homepage sections (divisions, insights). Created here as a shared UI primitive.
  - [x] 10.1 Props: href, label
  - [x] 10.2 Text link with arrow icon, group-hover gap animation

- [x] Task 11: Accessibility verification (AC: #8, #9)
  - [x] 11.1 Verify skip-link works (Tab from page load → visible → links to #main)
  - [x] 11.2 Verify focus-visible rings on all buttons
  - [x] 11.3 Verify prefers-reduced-motion wrapping on all transitions
  - [x] 11.4 Verify single H1 per test page, heading hierarchy correct

## Dev Notes

### Layout Component Hierarchy

```
BaseLayout.astro
  └─ HTML shell (<html lang="en">, <head>, <body>)
  └─ Skip-to-main-content link
  └─ <slot /> (receives PageLayout content)

PageLayout.astro
  └─ BaseLayout (with SEO props)
  └─ <slot name="header" /> (empty until Story 1.5)
  └─ <slot name="breadcrumb" /> (empty until Story 1.8)
  └─ <main id="main">
  │    └─ <slot /> (page content — SectionWrapper sections)
  └─ <slot name="footer" /> (empty until Story 1.7)

DivisionLayout.astro (NOT this story — Epic 3)
ArticleLayout.astro (NOT this story — Epic 6)
```

### BaseLayout.astro Template

```astro
---
import '@/styles/globals.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  jsonLd?: Record<string, unknown>;
}

const {
  title,
  description,
  canonical,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
} = Astro.props;

const siteUrl = import.meta.env.SITE_URL || 'https://globalresourcescitadel.com';
const siteName = import.meta.env.PUBLIC_SITE_NAME || 'Global Resources Citadel';
const canonicalUrl = canonical || new URL(Astro.url.pathname, siteUrl).href;
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={new URL(ogImage, siteUrl).href} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(ogImage, siteUrl).href} />

  <!-- Font Preloads (resolve actual paths from @fontsource woff2 output) -->
  <link rel="preload" href="/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- JSON-LD -->
  {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
</head>
<body class="font-body text-neutral-900 antialiased">
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
  >
    Skip to main content
  </a>
  <slot />
</body>
</html>
```

### PageLayout.astro Template

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';

interface Props {
  seo: {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    jsonLd?: Record<string, unknown>;
  };
}

const { seo } = Astro.props;
---

<BaseLayout {...seo}>
  <slot name="header" />
  <slot name="breadcrumb" />
  <main id="main">
    <slot />
  </main>
  <slot name="footer" />
</BaseLayout>
```

### SectionWrapper.astro Specification

**5 Background Variants:**

| Variant | Background | Text | Usage |
|---------|-----------|------|-------|
| `default` | white | neutral-900 | Standard content sections |
| `light` | neutral-50 (#F9FAFB) | neutral-900 | Alternating sections |
| `dark` | neutral-900 (#1F2937) | white | Emphasis, credibility, CTAs |
| `primary` | primary-50 (#F0FDF4) | neutral-900 | Brand-tinted sections |
| `hero` | gradient primary-900→primary-700 | white | Page heroes, hero sections |

**Implementation pattern:**
```astro
---
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'default' | 'light' | 'dark' | 'primary' | 'hero';
  id?: string;
  class?: string;
  as?: 'section' | 'div' | 'aside';
}

const {
  variant = 'default',
  id,
  class: className,
  as: Element = 'section',
} = Astro.props;

const variantClasses = {
  default: 'bg-white text-neutral-900',
  light: 'bg-neutral-50 text-neutral-900',
  dark: 'bg-neutral-900 text-white',
  primary: 'bg-primary-50 text-neutral-900',
  hero: 'bg-gradient-to-br from-primary-900 to-primary-700 text-white',
};
---

<Element
  id={id}
  class={cn('py-16 lg:py-24', variantClasses[variant], className)}
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <slot />
  </div>
</Element>
```

### SectionHeading.astro Specification

```astro
---
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  subtitle?: string;
  centered?: boolean;
  class?: string;
}

const { eyebrow, subtitle, centered = false, class: className } = Astro.props;
---

<div class={cn('mb-10 lg:mb-12', centered && 'text-center', className)}>
  {eyebrow && (
    <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-600">
      {eyebrow}
    </p>
  )}
  <h2 class="font-heading text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">
    <slot />
  </h2>
  {subtitle && (
    <p class="mt-4 text-lg text-neutral-600">
      {subtitle}
    </p>
  )}
</div>
```

### Button Variants (shadcn/ui customization)

The button.tsx from shadcn/ui uses `class-variance-authority`. Customize variants:

```typescript
const buttonVariants = cva(
  // Base classes — all buttons
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
        secondary: 'border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50',
        tertiary: 'text-primary-600 hover:text-primary-700 gap-2 group',
        gold: 'bg-gold-600 text-primary-900 hover:bg-gold-400 hover:-translate-y-px',
        ghost: 'hover:bg-neutral-100 text-neutral-700',
      },
      size: {
        default: 'px-8 py-4 text-base',       // 44px+ touch target
        sm: 'px-6 py-3 text-sm',
        lg: 'px-10 py-5 text-lg',
        icon: 'h-11 w-11',                     // 44px square
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
```

**Tertiary button arrow pattern:**
```tsx
<Button variant="tertiary">
  View All
  <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
</Button>
```

### CTABanner.astro Specification

**Dark variant (only variant for MVP — matches design reference):**
- Background: neutral-900
- Optional gold divider bar: 60px wide, 3px height, gold-600
- H2: white, Poppins semibold, `clamp(24px, 3vw, 40px)`
- Body: neutral-500, 17px, max-width 520px
- CTA button: gold accent variant
- Centered layout

**CSS from design reference:**
```css
.cta { padding: 96px 24px; background: var(--neutral-900); text-align: center; }
.cta-gold { width: 60px; height: 3px; background: var(--gold); margin: 0 auto 28px; }
.cta h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 700; color: #fff; }
.cta p { font-size: 17px; color: var(--neutral-500); max-width: 520px; margin: 0 auto 36px; }
```

### SEO Utility (`src/lib/seo.ts`)

```typescript
interface SeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

export function generateMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
}): SeoMetadata {
  const siteUrl = import.meta.env.SITE_URL;
  const siteName = import.meta.env.PUBLIC_SITE_NAME;
  return {
    title: `${page.title} — ${siteName}`,
    description: page.description,
    canonical: `${siteUrl}${page.path}`,
    ogImage: page.ogImage || '/og-default.jpg',
    ogType: page.type || 'website',
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Resources Citadel Limited',
    url: import.meta.env.SITE_URL,
    logo: `${import.meta.env.SITE_URL}/favicon.svg`,
  };
}
```

### Logo SVG Preparation

The brand logo SVGs in `src/assets/brand/` may contain `<style>` blocks with Google Fonts `@import` directives. These must be removed because:
- They create external network requests (performance hit)
- They duplicate the self-hosted fonts already loaded via @fontsource

**Actions required:**
1. Open each SVG file
2. Search for `@import url('https://fonts.googleapis.com/...`
3. Remove the entire `<style>` block containing the import
4. Either: (a) ensure the SVG `<text>` elements reference the self-hosted font family, OR (b) convert `<text>` elements to `<path>` elements for guaranteed rendering
5. Option (b) is recommended — it eliminates font dependency entirely

### Accessibility Checklist for This Story

- [ ] Skip-to-main link: first focusable element, sr-only default, visible on `:focus`
- [ ] `<html lang="en">`
- [ ] Single `<main>` per page with `id="main"`
- [ ] All buttons: `focus-visible:ring-2 ring-primary-500 ring-offset-2`
- [ ] All buttons: min 44x44px touch target (px-8 py-4 minimum)
- [ ] All transitions: wrapped in `@media (prefers-reduced-motion: no-preference)` or Tailwind `motion-safe:`
- [ ] Dark sections: ensure text contrast (white on neutral-900 = 15.1:1)
- [ ] Heading hierarchy: single H1, SectionHeading always renders H2

### Reduced Motion Pattern

```css
/* In globals.css or per-component */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or use Tailwind's `motion-safe:` prefix:
```html
<button class="motion-safe:transition-all motion-safe:duration-200">
```

### Previous Story Intelligence

**Story 1.1** creates project structure, installs all packages, configures Astro + Tailwind v4 + React + Vercel.

**Story 1.2** creates design tokens in globals.css `@theme {}`, implements `cn()` utility in `src/lib/utils.ts`, implements `formatDate()`. All colour, typography, spacing, shadow, and radius tokens are available.

**Story 1.3** creates content collections with Zod schemas, seed data for divisions/clusters, and division helper utilities in `src/lib/divisions.ts`.

**This story (1.4) builds on all three prior stories.** The design tokens from 1.2 are used extensively. The `cn()` utility is imported from 1.2. Content collections from 1.3 are NOT directly used in layouts but will be consumed by pages that use these layouts.

### What This Story Does NOT Include

- No Header component (Story 1.5)
- No DesktopNav or MobileNav (Stories 1.5, 1.6)
- No Footer component (Story 1.7)
- No BreadcrumbNav component (Story 1.8) — only the breadcrumb slot in PageLayout
- No DivisionLayout or ArticleLayout (Epics 3, 6)
- No DivisionCard, BentoGrid, InsightCard (Epic 2)
- No InquiryForm (Epic 4)
- No StatCounter (Epic 2)
- No page content — only layout shells and reusable UI components

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/layouts/BaseLayout.astro`
- **Creates:** `src/layouts/PageLayout.astro`
- **Creates:** `src/components/layout/SectionWrapper.astro`
- **Creates:** `src/components/layout/SectionHeading.astro`
- **Modifies:** `src/components/ui/button.tsx` — adds GRCL variants (primary, secondary, tertiary, gold)
- **Creates:** `src/components/shared/CTABanner.astro`
- **Creates:** `src/components/shared/PageHero.astro`
- **Creates:** `src/components/shared/ViewAllLink.astro`
- **Creates:** `src/lib/seo.ts` — SEO metadata utilities
- **Modifies:** `src/assets/brand/*.svg` — removes Google Fonts imports

### Design Reference

The canonical visual target is `_bmad-output/planning-artifacts/design-reference-final.html`. Cross-reference these CSS classes:
- `.overview` → SectionWrapper light variant
- `.eyebrow` + `h2` → SectionHeading with gold eyebrow
- `.hero-btn` / `.cta-btn` → Button gold variant
- `.cta` section → CTABanner dark variant

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Layout Components, Page Pattern, Component Architecture, Accessibility, SEO]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — SectionWrapper, SectionHeading, Button, CTABanner, Hero, Focus, Touch Targets]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Production CSS for components]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.4 acceptance criteria]
- [Source: _bmad-output/implementation-artifacts/1-2-design-token-system-typography.md — Design tokens, cn() utility]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- No blocking issues encountered during implementation.
- Pre-existing TS errors in content.config.ts (Story 1.3) — unrelated to this story.
- @radix-ui/react-slot not installed; Button component implemented without asChild pattern using standard button element.
- All 4 brand SVGs already had text converted to paths — no modifications needed (Task 8).

### Completion Notes List

- **BaseLayout.astro**: Full HTML shell with lang="en", SEO meta tags, font preloads (Vite-resolved via `?url` imports from @fontsource woff2 files), skip-to-main link, favicon, JSON-LD slot. Uses `Astro.site` for canonical URL resolution.
- **PageLayout.astro**: Wraps BaseLayout with SEO prop passthrough. Named slots for header/breadcrumb/footer (empty until Stories 1.5/1.7/1.8). Main landmark with id="main".
- **SectionWrapper.astro**: 5 variants (default/light/dark/primary/hero) via cn() utility. Polymorphic `as` prop for section/div/aside. Consistent py-16/lg:py-24 padding with max-w-7xl container.
- **SectionHeading.astro**: H2 with Poppins semibold, optional gold-600 eyebrow (uppercase, tracking-widest), optional subtitle, centered/left alignment. mb-10/lg:mb-12 spacing.
- **Button (button.tsx)**: CVA-based with 5 variants (primary/secondary/tertiary/gold/ghost) and 4 sizes (default/sm/lg/icon). All variants have focus-visible rings. motion-safe: prefix on all transitions. Default size provides 44px+ touch targets.
- **CTABanner.astro**: Dark variant with neutral-900 bg, gold divider bar, responsive heading, body text, 1-2 gold accent CTA links. No arbitrary Tailwind values.
- **SEO utilities (seo.ts)**: generateMetadata() for page SEO, generateOrganizationJsonLd() and generateWebSiteJsonLd() for structured data. Exports SeoMetadata type.
- **PageHero.astro**: Inner page hero with H1, optional subtitle, breadcrumb slot, gradient background.
- **ViewAllLink.astro**: Tertiary-style link with arrow icon and group-hover translate animation.
- **Logo SVGs**: All 4 variants verified clean — paths only, no Google Fonts imports.
- **index.astro**: Updated to use PageLayout + SectionWrapper + SectionHeading + CTABanner with real SEO metadata.
- **Accessibility**: Skip-to-main link verified, focus-visible rings on all interactives, prefers-reduced-motion global fallback + motion-safe: prefix, single H1, correct heading hierarchy.

### Change Log

- 2026-03-29: Story 1.4 implemented — all 11 tasks complete, all ACs satisfied.

### Review Findings

#### Decision Needed (all resolved)

- [x] [Review][Decision] **Missing `/og-default.jpg` — OG image will 404 on social shares** — Resolved: created branded placeholder `public/og-default.png` (1200x630, brand green + gold bar), updated defaults to .png.
- [x] [Review][Decision] **CTABanner body text contrast borderline WCAG AA** — Resolved: bumped to `text-neutral-400` (~5.5:1 contrast).
- [x] [Review][Decision] **CTABanner H2 `font-bold` vs system-wide `font-semibold`** — Resolved: kept `font-bold` per design reference intent.
- [x] [Review][Decision] **CTABanner gold divider height 2px vs spec 3px** — Resolved: added `--height-divider: 3px` design token in globals.css, CTABanner uses `h-[--height-divider]`.

#### Patches (all fixed)

- [x] [Review][Patch] **JSON-LD script injection risk via `set:html`** — Fixed: escapes `<` as `\u003c` in serialized JSON-LD output.
- [x] [Review][Patch] **Duplicate SEO metadata sources — seo.ts hardcodes URL/name** — Fixed: `SITE_URL` now uses `import.meta.env.SITE` with fallback.
- [x] [Review][Patch] **PageLayout seo prop type duplicates SeoMetadata interface** — Fixed: imports `SeoMetadata` from `@/lib/seo`. Added `twitterCard` to SeoMetadata interface.
- [x] [Review][Patch] **CTABanner duplicates buttonVariants gold styling** — Fixed: imports and uses `buttonVariants({ variant: 'gold', size: 'default' })` for primary CTA.
- [x] [Review][Patch] **Unused dependencies: tw-animate-css, @base-ui/react** — Fixed: removed from package.json.
- [x] [Review][Patch] **CTABanner secondary CTA missing `motion-safe:ease-out`** — Fixed: added to secondary CTA class string.
- [x] [Review][Patch] **CTABanner focus ring-offset white on dark background** — Fixed: added `focus-visible:ring-offset-neutral-900` to both CTAs.
- [x] [Review][Patch] **Empty `sameAs: []` in Organization JSON-LD** — Fixed: removed empty array.

#### Deferred (all resolved)

- [x] [Review][Resolved] **validateContentIntegrity() per-page scaling** — Fixed: added singleton guard, runs once per build regardless of call count.
- [x] [Review][Resolved] **PageHero breadcrumb slot convention** — Fixed: added JSDoc documenting which breadcrumb slot to use when PageHero is present.
- [x] [Review][Resolved] **Cluster accentColor schema unconstrained** — Fixed: constrained to `z.enum(['amber', 'copper', 'slate'])`, exported `ClusterAccentColor` type.
- [x] [Review][Resolved] **Font fallback stacks** — Already resolved: `system-ui, sans-serif` fallbacks exist on both font families in globals.css.

### File List

- src/layouts/BaseLayout.astro (created)
- src/layouts/PageLayout.astro (created)
- src/components/layout/SectionWrapper.astro (created)
- src/components/layout/SectionHeading.astro (created)
- src/components/ui/button.tsx (created)
- src/components/shared/CTABanner.astro (created)
- src/components/shared/PageHero.astro (created)
- src/components/shared/ViewAllLink.astro (created)
- src/lib/seo.ts (modified)
- src/pages/index.astro (modified)
