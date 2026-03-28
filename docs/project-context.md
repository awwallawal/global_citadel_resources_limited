# Project Context

## Status

**State:** Implementation-ready
**Date:** 2026-03-28
**Purpose:** Shared implementation context for all agents building this platform

## Project Summary

This project delivers a multi-division corporate web platform for **Global Resources Citadel Limited (GRCL)**, a Nigerian conglomerate operating across seven business verticals:

| Division | Cluster | Strategic Tier |
|---|---|---|
| Crop Farming | Agriculture & Processing | Core |
| Animal Husbandry | Agriculture & Processing | Core |
| Agro-Processing | Agriculture & Processing | Core |
| Commodity Marketing | Trade & Markets | Supporting |
| Import & Export | Trade & Markets | Supporting |
| Real Estate | Built Environment & Energy | Aspirational |
| Oil & Gas | Built Environment & Energy | Aspirational |

The platform is a **credibility engine** — not a brochure site. Its primary job is to make the business legible to external audiences (investors, customers, general public) and convert that legibility into trust, inquiry, and engagement.

## Tech Stack (Locked)

| Layer | Technology | Notes |
|---|---|---|
| Framework | Astro 6 (Minimal Starter) | MPA-first, zero JS by default, island architecture |
| Language | TypeScript (strict mode) | Path aliases configured (@/components/*, @/layouts/*, etc.) |
| UI Islands | React | Only for interactive components (nav, forms, search, animations) |
| Styling | Tailwind CSS + shadcn/ui | Design tokens only, no arbitrary values, cn() utility |
| Fonts | Poppins (headings) + Inter (body) + JetBrains Mono (code) | Self-hosted via @fontsource, font-display: swap |
| Content | File-based Content Collections (Astro Content Layer API + Zod) | 6 collections: divisions, clusters, articles, team, credentials, pages |
| Forms | Resend + Astro server endpoint | Single POST at /api/contact with variant-based routing |
| Hosting | Vercel (Phase 1) → Digital Ocean (Phase 2) | Auto-deploy: preview on PR, production on push to main |
| Testing | Vitest (unit/component) + Playwright (E2E + a11y via axe-core) | Lighthouse CI on key pages |
| CI/CD | GitHub Actions → Vercel | Lint + type-check + unit tests + build on every PR |

## Brand Identity

- **Full legal name:** Global Resources Citadel Limited
- **Brand name:** Global Resources Citadel
- **Abbreviation:** GRCL (nav bars, compact UI, repeated mentions)
- **Monogram:** GRC (favicon, social profiles, small-scale marks)
- **Logo:** GRC monogram (dark green circle, gold ring) + stacked wordmark (GLOBAL RESOURCES / CITADEL / LIMITED)
- **Logo assets:** `_bmad-output/planning-artifacts/brand-assets/` — 4 SVGs (primary, reversed, monogram, monogram-reversed)
- **Primary colour:** Deep forest green (#14532D → #F0FDF4, 10-step scale)
- **Secondary accent:** Warm gold (#B48A3E) — premium moments only, never as background
- **Typography:** Poppins 600 headings, Inter 400/500 body

## Architecture Decisions

### Island Hydration Strategy

| Component | Directive | Rationale |
|---|---|---|
| MobileNav (Sheet/Accordion) | `client:load` | Must be immediately interactive |
| DesktopNav Dropdowns | `client:load` | Above-fold, needed on first interaction |
| SearchOverlay | `client:idle` | Not needed immediately |
| InquiryForm | `client:visible` | Below-fold, hydrates on scroll |
| StatCounter | `client:visible` | Scroll-triggered count-up |
| Bento Grid hover effects | CSS only | No JS needed |
| Section animations | CSS only | CSS @keyframes + IntersectionObserver |

### Content Collections

| Collection | Format | Purpose |
|---|---|---|
| divisions | YAML | 7 division entries with metadata, capabilities, stats, cluster membership |
| clusters | YAML | 3 cluster groupings |
| articles | MDX | News, updates, thought leadership with division tagging |
| team | YAML | Leadership team for About page |
| credentials | YAML | Certifications, licenses, partner logos |
| pages | MDX | Static page prose (About, Investors & Partners) |

### Component Architecture

- **Astro components** (.astro) for static layout: SectionWrapper, SectionHeading, BreadcrumbNav, page layouts
- **React components** (.tsx) only where hydration is required: MobileNav, DesktopNav, InquiryForm, SearchOverlay, StatCounter
- **Default to Astro.** Only use React if interactivity is required.

### Page Pattern (Every Page)

```
imports → data fetching → props → SEO metadata → PageLayout wrapper → SectionWrapper sections
```

Every page uses PageLayout. Every section uses SectionWrapper. SEO metadata is always explicit.

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Astro pages | kebab-case | `about.astro`, `thought-leadership.astro` |
| Components/Layouts | PascalCase | `SectionWrapper.astro`, `InquiryForm.tsx` |
| Content files | kebab-case | `crop-farming.yaml`, `company-news-launch.mdx` |
| Functions | camelCase | `getDivisionBySlug`, `formatDate` |
| Constants | SCREAMING_SNAKE | `DIVISION_SLUGS`, `MAX_ARTICLES_PER_PAGE` |
| Types | PascalCase, no I prefix | `Division`, `ContactFormData` |
| Zod schemas | camelCase + Schema | `divisionSchema`, `contactFormSchema` |

## Design Reference

The canonical visual target for implementation is:

- **`_bmad-output/planning-artifacts/design-reference-final.html`** — Rendered homepage mockup with production CSS (tokens, Bento grid, card variants, header, footer). NOTE: The "Citadel." text in the header/footer is a pre-logo placeholder — use the actual logo SVGs from brand-assets/.
- **`_bmad-output/planning-artifacts/logo-kit.html`** — All logo lockup variants rendered at multiple sizes including nav-scale (~40px height).

The header has two logo states:
- Transparent over hero (dark bg): use `logo-reversed.svg`
- Solid/scrolled (light bg): use `logo-primary.svg`

## Key Design Patterns

- **SectionWrapper:** 5 background variants (white, light/neutral-50, dark/neutral-900, primary/primary-50, hero/gradient). Consistent `py-16 lg:py-24` padding, `max-w-7xl` container.
- **SectionHeading:** H2 Poppins semibold, optional gold eyebrow (uppercase, text-xs, tracking-widest), optional subtitle.
- **Bento Grid:** Asymmetric CSS Grid encoding division hierarchy. Large cards = core divisions, standard = supporting, compact = aspirational.
- **Division Cluster Accents:** Subtle secondary tints on division pages only — amber (Agriculture), copper (Trade), slate (Built Environment). Never override primary green.
- **Button Hierarchy:** Primary (primary-600 bg), secondary (outline), tertiary (link+arrow), gold accent (max one per page), disabled.

## Performance Requirements

- Mobile-first: Nigerian audience on variable bandwidth is the primary design target
- Lighthouse 90+ on mobile across Performance, Accessibility, SEO, Best Practices
- FCP < 1.5s, LCP < 2.5s, CLS < 0.1 on simulated 4G
- Initial page weight < 500KB for key pages
- Zero JS for static pages without islands
- All images via Astro Image/Picture with WebP/AVIF conversion

## Accessibility Requirements

- WCAG 2.1 AA compliance
- focus-visible:ring-2 ring-primary-500 ring-offset-2 on all interactive elements
- 44x44px minimum touch targets
- Skip-to-main-content link as first focusable element
- Single H1 per page, heading hierarchy enforced
- All transitions/animations wrapped in prefers-reduced-motion
- Semantic markup, landmark roles, aria-labels on all nav elements

## Implementation Scope

### MVP (Phase 1) — 8 Epics, 27 Stories, 31 Routes

The MVP delivers the complete credibility platform:
1. Brand identity, navigation, design system foundation
2. Homepage with narrative scroll, Bento grid, credibility signals
3. Division hub, cluster pages, 7 division detail pages
4. Contact hub with general, division-specific (7), and strategic inquiry forms
5. About page (anchor nav, leadership, org chart, credentials) + Investors & Partners page
6. Publishing system (insights hub, article pages, git-based workflow, seed content)
7. Search, legal pages, sitemap, 404, internal cross-linking
8. Testing, accessibility audit, performance optimization, CI/CD, production deployment

### Post-MVP (Phase 2)

- Deeper division content, case studies, media galleries
- Sanity CMS migration (replaces git-based content)
- Digital Ocean hosting migration
- Enhanced analytics and inquiry tracking
- Advanced editorial workflows

## Planning Artifacts

All planning is complete and validated via Implementation Readiness Assessment (2026-03-28):

| Document | Location | Size |
|---|---|---|
| PRD | `_bmad-output/planning-artifacts/prd.md` | 37 KB |
| Architecture | `_bmad-output/planning-artifacts/architecture.md` | 48 KB |
| UX Design Specification | `_bmad-output/planning-artifacts/ux-design-specification.md` | 88 KB |
| Information Architecture | `_bmad-output/planning-artifacts/information-architecture.md` | 173 KB |
| Brand Identity | `_bmad-output/planning-artifacts/brand-identity.md` | 10 KB |
| Epics & Stories | `_bmad-output/planning-artifacts/epics.md` | 75 KB |
| Design Reference (HTML) | `_bmad-output/planning-artifacts/design-reference-final.html` | Rendered homepage |
| Logo Kit (HTML) | `_bmad-output/planning-artifacts/logo-kit.html` | All logo variants |
| Logo SVGs | `_bmad-output/planning-artifacts/brand-assets/` | 4 SVG files |
| Readiness Report | `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-28.md` | Assessment |
| Sprint Status | `_bmad-output/implementation-artifacts/sprint-status.yaml` | Tracking |

## BMAD Position

This document is a support artifact providing quick orientation. For detailed specifications, always refer to the source documents listed above. When any information here conflicts with a source document, the source document is authoritative.
