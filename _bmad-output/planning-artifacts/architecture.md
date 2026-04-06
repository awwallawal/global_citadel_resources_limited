---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-27'
inputDocuments:
  - C:\Users\DELL\Desktop\UK_Web_Design\docs\project-brief.md
  - C:\Users\DELL\Desktop\UK_Web_Design\docs\project-context.md
  - C:\Users\DELL\Desktop\UK_Web_Design\_bmad-output\planning-artifacts\prd.md
  - C:\Users\DELL\Desktop\UK_Web_Design\_bmad-output\planning-artifacts\ux-design-specification.md
  - C:\Users\DELL\Desktop\UK_Web_Design\_bmad-output\planning-artifacts\information-architecture.md
workflowType: 'architecture'
project_name: 'UK_Web_Design'
user_name: 'Awwal'
date: '2026-03-27'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
53 functional requirements spanning 8 capability domains. The heaviest concentrations are in Navigation & Content Discovery (10 FRs), Publishing & Thought Leadership (7 FRs), and Content Administration & Growth (6 FRs). Architecturally, the platform is a content presentation and publishing system with multi-audience navigation, division-aware routing, and structured inquiry flows. There are no transactional, payment, authentication (for public users), or real-time requirements — the complexity lives in the information architecture and content model, not in application logic.

**Non-Functional Requirements:**
27 NFRs establish hard architectural constraints. Performance (fast mobile loads on constrained networks, Lighthouse targets), Accessibility (WCAG 2.1 AA), SEO (semantic structure, metadata, crawlability), Scalability (content volume growth without rewrites), and Reliability (rollback-safe deployment) are the primary architectural drivers. Security requirements are lightweight — HTTPS, form protection, admin-only content management — appropriate for a public-facing corporate site without user accounts.

**Scale & Complexity:**

- Primary domain: Content-rich web platform (MPA)
- Complexity level: High (information architecture breadth, not technical novelty)
- Estimated architectural components: ~25 page templates/layouts, ~30 reusable UI components, ~7 division data entities, ~31 routes, publishing/content model, inquiry routing system

### Technical Constraints & Dependencies

- MPA-first architecture — no SPA routing; server-rendered or statically generated pages required
- Custom-coded front end — no low-code or template CMS constraints on the presentation layer
- Mobile-first responsive design — Nigerian mobile audience is primary
- Tailwind CSS + shadcn/ui design system — already specified in UX spec (proven stack from prior OSLSR project)
- Poppins + Inter + JetBrains Mono font stack — Google Fonts dependency
- Content management pathway required — publishing without developer support, but not necessarily a traditional CMS
- Division-specific inquiry routing — forms must be pre-contextualized and division-aware
- No hard third-party integrations confirmed yet — but architecture must support future analytics, CRM, media, and structured content backends

### Cross-Cutting Concerns Identified

- **Division Data Model** — Divisions (7), clusters (3), and their relationships affect navigation, routing, content taxonomy, inquiry forms, insights filtering, and SEO. This is the central domain abstraction.
- **Content/Publishing Pipeline** — Company-wide and division-specific streams with categorization, tagging, and structured templates. Affects insights pages, division pages, homepage, and SEO.
- **SEO Metadata System** — Per-page title, description, canonical URLs, structured data (Organization, WebSite, CollectionPage, Article). Must be consistent across all 31+ routes.
- **Responsive Layout System** — Mobile-first breakpoints (sm/md/lg/xl) with section rhythm, container constraints, and Bento grid responsiveness. Affects every page.
- **Accessibility Compliance** — Focus management, ARIA attributes, keyboard navigation, contrast, motion restraint. Systemic concern across all components.
- **Performance Optimization** — Lazy loading, image optimization, font loading strategy, minimal JS. Affects build pipeline and component architecture.

## Starter Template Evaluation

### Primary Technology Domain

Content-rich MPA web platform with React interactive islands, based on project requirements for SSG, SEO-first architecture, minimal client-side JavaScript, and mobile-first performance under constrained network conditions.

### Technical Preferences Established

- **Language:** TypeScript
- **UI Framework:** React (for interactive components within island architecture)
- **Styling:** Tailwind CSS + shadcn/ui (proven stack from OSLSR project)
- **Content Strategy:** Git-based Content Collections (phase 1) → Sanity CMS (post-launch)
- **Hosting:** Vercel (phase 1, free URL for showcase) → Digital Ocean (production)
- **CI/CD:** GitHub Actions → Vercel
- **Form Handling:** Resend + Astro API routes (serverless on Vercel)

### Starter Options Considered

**Option 1: Astro 6 (Minimal Starter + Integrations)** — RECOMMENDED

Astro 6 is a content-first MPA framework that ships zero JavaScript by default and supports React components as hydrated islands. It is the current best-in-class framework for content-heavy, SEO-critical websites with selective interactivity.

- Ships zero JS to the client by default; only interactive React islands hydrate
- Built-in Content Layer API with type-safe schemas (Zod) for structured content
- Official shadcn/ui support documented
- Hybrid rendering: static pages + serverless API routes on Vercel
- Direct migration path to Sanity via `@sanity/astro` and GROQ queries
- Acquired by Cloudflare (Jan 2026) — strong long-term viability

**Option 2: Vite + React SPA**

Rejected. A React SPA would require shipping the full React runtime to every page, provides no native SSG/SSR without additional tooling, and directly contradicts the PRD's MPA-first, SEO-critical requirements. Performance on constrained Nigerian mobile networks would suffer significantly.

**Option 3: Next.js (Static Export)**

Rejected per user preference and architectural fit. Next.js `output: 'export'` provides SSG but still ships full React runtime per page, is opinionated about app-level routing, and is heavier than needed for a content-presentation platform. Astro's island model delivers better performance for this use case.

### Selected Starter: Astro 6 (Minimal + Integrations)

**Rationale for Selection:**
Astro is purpose-built for exactly this project profile — a content-heavy, multi-page, SEO-critical platform where most content is static HTML and interactivity is concentrated in specific components (navigation, forms, search, animations). The island architecture means the Nigerian mobile audience receives minimal JavaScript, directly serving the performance NFRs. The Content Layer API provides the git-based content system now, with a clean migration path to Sanity later. Official shadcn/ui support means the UX spec's component strategy transfers directly. Vercel deployment with hybrid rendering gives free hosting with serverless API routes for form handling.

**Initialization Command:**

```bash
# Create project
npm create astro@latest uk-web-design -- --template minimal --typescript strict

# Add integrations
cd uk-web-design
npx astro add react
npx astro add tailwind
npx astro add vercel

# Add shadcn/ui
npx shadcn@latest init

# Add form handling
npm install resend
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript (strict mode), Node.js runtime, Astro 6 with Vite 7 build tooling

**Styling Solution:**
Tailwind CSS (integrated via `@astrojs/tailwind`), shadcn/ui component primitives (Radix UI), CSS variables for theme tokens

**Build Tooling:**
Vite 7 (bundling, HMR, tree-shaking), Astro's static build pipeline with hybrid rendering support, automatic CSS purging via Tailwind

**Testing Framework:**
Not included by starter — to be decided in architectural decisions step (likely Vitest + Playwright)

**Code Organization:**
Astro file-based routing (`src/pages/`), Content Collections (`src/content/`), React components (`src/components/`), layouts (`src/layouts/`), integration config in `astro.config.mjs`

**Development Experience:**
Vite-powered HMR, TypeScript with path aliases, Astro dev toolbar, content schema validation at build time

**Form Architecture:**
Resend email API via Astro server endpoints (`src/pages/api/`), deployed as Vercel Serverless Functions in hybrid mode. Division-aware routing logic handles 7 division-specific + general + strategic inquiry forms with branded confirmation emails.

**Deployment Architecture:**
Phase 1: GitHub repo → Vercel (auto-deploy on push, free URL). Phase 2: GitHub Actions → Digital Ocean (static build deployed to DO App Platform or Nginx). The static build output is portable across any hosting provider.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1. Content Model Architecture — structured collections with Zod schemas
2. Island Hydration Strategy — performance-critical for target audience
3. Form & Inquiry Architecture — core conversion pathway
4. Project Structure — defines implementation story boundaries

**Important Decisions (Shape Architecture):**
5. Image Optimization Strategy — major performance lever
6. SEO & Metadata Architecture — core business requirement
7. Environment & Configuration Strategy — deployment pipeline
8. Testing Strategy — quality assurance approach

**Deferred Decisions (Post-MVP):**
- Visual regression testing — defer to post-launch
- Advanced search implementation details — defer to implementation stories
- Sanity CMS migration specifics — defer to phase 2
- Analytics event tracking schema — defer until analytics requirements clarified
- Digital Ocean deployment config — defer to phase 2
- npm → pnpm migration — no phantom dependencies (verified Story 8.1), Vercel auto-detects pnpm from lockfile, recommended for Phase 2 when backend work increases dependency complexity

### Data Architecture

**Decision:** File-based Content Collections using Astro's Content Layer API with Zod schemas. No database.

| Collection | Format | Purpose |
|---|---|---|
| `divisions` | YAML | 7 division entries — metadata, descriptions, capabilities, stats, cluster membership, contactEmail, SEO fields |
| `clusters` | YAML | 3 cluster entries grouping divisions with descriptions |
| `articles` | MDX | Insights/news/thought leadership with division tagging, category, author |
| `team` | YAML | Leadership team members for About page |
| `credentials` | YAML | Certifications, licenses, partner logos |
| `pages` | MDX | Static page prose (About, Investors & Partners) |

**Rationale:** Structured data in collection schemas with optional MDX body fields for extended prose. This maps cleanly to Sanity document types for phase 2 migration — each collection becomes a Sanity document type, each Zod field becomes a Sanity field.

**Validation:** Zod schemas enforce required fields, types, and relationships at build time. Invalid content fails the build, preventing broken pages from deploying.

### Authentication & Security

**Decision:** No public user authentication. Git-based access control for content management.

- Content authoring happens via git — contributors push to GitHub, Vercel deploys
- No admin panel or CMS login for phase 1
- Form security: honeypot field + simple in-memory rate limiting + server-side Zod validation
- HTTPS enforced via Vercel (automatic)
- API route (`/api/contact`) validates all input server-side before processing
- No CAPTCHA for MVP — honeypot + rate limiting sufficient for corporate inquiry volume

**Sanity migration impact:** Phase 2 introduces Sanity Studio with its own authentication. No changes to public-facing security model.

### API & Communication Patterns

**Decision:** Single Astro server endpoint for all form handling. No REST API.

- `src/pages/api/contact.ts` — single POST endpoint handling all inquiry variants
- Request body includes `variant` (general | strategic | division slug) and form fields
- Server-side Zod validation matching client-side schema
- Resend client sends two emails per submission: internal routing notification + user confirmation
- Division contact emails sourced from content collection data
- Error responses return structured JSON with field-level validation errors
- Simple in-memory throttle for rate limiting

### Frontend Architecture

**Decision:** Astro pages (static HTML) + React islands (interactive components only)

**Island Hydration Map:**

| Component | Directive | Rationale |
|---|---|---|
| MobileNav (Sheet/Accordion) | `client:load` | Primary mobile navigation, must be immediately interactive |
| DesktopNav Dropdowns | `client:load` | Above-fold, needed on first interaction |
| SearchOverlay | `client:idle` | Not needed immediately, hydrates when browser is idle |
| InquiryForm | `client:visible` | Below-fold, hydrates when scrolled into view |
| StatCounter | `client:visible` | Scroll-triggered count-up animation |
| Accordion (Footer mobile) | `client:visible` | Below-fold interactive |
| Bento Grid hover effects | CSS only | Pure CSS transforms and overlays — no JS |
| Section fade-in animations | CSS only | CSS `@keyframes` + `IntersectionObserver` via lightweight vanilla JS or Astro script |

**Component organization:** Astro components for static layout (SectionWrapper, SectionHeading, BreadcrumbNav, page layouts). React `.tsx` components only where hydration is required (navigation, forms, search).

**State management:** React `useState`/`useRef` within individual islands. No global state library — islands are independent. Form state managed internally by InquiryForm component.

**Image optimization:** Astro built-in `<Image />` and `<Picture />` components. Build-time WebP/AVIF conversion. Self-hosted fonts via `@fontsource` packages (Poppins, Inter) with `font-display: swap` and preloaded critical weights.

### Infrastructure & Deployment

**Decision:** Vercel (phase 1) with GitHub CI/CD. Digital Ocean (phase 2).

**Environment tiers:**

| Tier | Hosting | Trigger |
|---|---|---|
| Development | Local `astro dev` | Manual |
| Preview | Vercel preview URL | Auto on PR |
| Production | Vercel (phase 1) | Auto on push to `main` |

**Environment variables:** `RESEND_API_KEY`, `CONTACT_EMAIL_DEFAULT` (server-only), `SITE_URL` (build-time), `PUBLIC_SITE_NAME` (public). Division contact emails in content collections, not env vars.

**Monitoring:** Vercel Analytics (free) for Web Vitals and page views. Build failure notifications via GitHub + Vercel integration.

**Digital Ocean migration path:** Static `dist/` output deployed to DO App Platform or Nginx. `/api/contact` endpoint moves to DO Functions or lightweight Node server. Same Resend integration, env vars via DO dashboard.

### Testing Strategy

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Zod schemas, utility functions, email routing, form validation |
| Component | Vitest + Testing Library | React islands — InquiryForm, MobileNav, Search |
| E2E | Playwright | Navigation flows, form submission, responsive breakpoints |
| Accessibility | Playwright + axe-core | WCAG 2.1 AA checks on every page template |
| CI | GitHub Actions | Lint, type-check, unit tests, build on every PR. E2E + a11y on preview deploys. Lighthouse CI on key pages. |

### Project Structure

File organization maps 1:1 to the IA's 31-route structure and the UX spec's 3-layer component hierarchy:

- `src/pages/` — Astro file-based routing matching all 31 IA routes
- `src/content/` — 6 typed collections (divisions, clusters, articles, team, credentials, pages)
- `src/components/` — organized by domain: `ui/` (shadcn primitives), `layout/`, `divisions/`, `insights/`, `contact/`, `navigation/`, `search/`, `shared/`
- `src/layouts/` — BaseLayout, PageLayout, DivisionLayout, ArticleLayout
- `src/lib/` — utilities (cn, seo, email, division helpers)
- `src/assets/` — organized by type: brand, divisions, team, hero
- `tests/` — unit, component, e2e
- `.github/workflows/` — CI pipeline

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (Astro + integrations + shadcn/ui + config)
2. Content schemas and seed data (divisions, clusters — the foundation everything reads from)
3. Base layouts + global styles + font loading (BaseLayout, PageLayout, design tokens)
4. Navigation components (Header, Footer, MobileNav — used on every page)
5. Homepage (narrative flow, Bento grid, credibility bar — the showcase page)
6. Division pages (template + dynamic routing + content)
7. Insights/publishing pages (article template + listing pages)
8. Contact/inquiry system (forms + API endpoint + Resend integration)
9. Remaining pages (About, Investors, Search, Legal)
10. Testing, accessibility audit, performance optimization
11. CI/CD pipeline and production deployment

**Cross-Component Dependencies:**
- Content schemas must exist before any page can render division/article data
- BaseLayout must exist before any page (SEO, fonts, global styles)
- Navigation components must exist before any page looks complete
- Division collection drives: division pages, cluster pages, Bento grid, nav dropdown, inquiry form routing, insight filtering, SEO metadata

## Implementation Patterns & Consistency Rules

### Critical Conflict Points

12 areas where AI agents could make incompatible decisions if not specified. These rules are mandatory for every implementation story.

### Naming Patterns

**File Naming:**

| Type | Convention | Example |
|---|---|---|
| Astro pages | `kebab-case.astro` | `about.astro`, `thought-leadership.astro` |
| Astro layouts | `PascalCase.astro` | `BaseLayout.astro`, `DivisionLayout.astro` |
| Astro components (static) | `PascalCase.astro` | `SectionWrapper.astro`, `BreadcrumbNav.astro` |
| React components (islands) | `PascalCase.tsx` | `MobileNav.tsx`, `InquiryForm.tsx` |
| Content collection files | `kebab-case.yaml` / `kebab-case.mdx` | `crop-farming.yaml`, `company-news-launch.mdx` |
| Utility modules | `kebab-case.ts` | `seo.ts`, `divisions.ts`, `email.ts` |
| Test files | `*.test.ts` / `*.test.tsx` | `contact.test.ts`, `InquiryForm.test.tsx` |
| Config files | Framework conventions | `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json` |

**Component/Function Naming:**

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `DivisionCard`, `InquiryForm` |
| Astro components | PascalCase | `SectionWrapper`, `SectionHeading` |
| Functions | camelCase | `getDivisionBySlug`, `formatArticleDate` |
| Constants | SCREAMING_SNAKE | `DIVISION_SLUGS`, `MAX_ARTICLES_PER_PAGE` |
| Types/Interfaces | PascalCase, no `I` prefix | `Division`, `ArticleFrontmatter`, `ContactFormData` |
| Zod schemas | camelCase + `Schema` suffix | `divisionSchema`, `contactFormSchema` |
| CSS variables | kebab-case | `--primary-600`, `--gold-accent` |

**Content Collection Fields:**

| Convention | Example |
|---|---|
| camelCase for all fields | `contactEmail`, `seoTitle`, `clusterSlug` |
| Slug fields always `slug` | `slug: "crop-farming"` |
| Boolean fields use `is`/`has` prefix | `isCore`, `hasInsights` |
| Date fields use ISO 8601 strings | `publishedAt: "2026-03-27"` |
| Reference fields use target + `Slug` | `clusterSlug`, `divisionSlug` |

### Structure Patterns

**Component Decision Rule — Astro vs React:**

| Use Astro (`.astro`) when... | Use React (`.tsx`) when... |
|---|---|
| Content is static HTML with no client-side interaction | Component needs `client:*` hydration |
| Component only receives props and renders | Component uses `useState`, `useRef`, `useEffect` |
| Component wraps layout/structure | Component handles user events (click, input, toggle) |
| Examples: SectionWrapper, SectionHeading, BreadcrumbNav, Footer links, CredibilityBar | Examples: MobileNav, DesktopNav dropdown, InquiryForm, SearchOverlay, StatCounter |

**If uncertain:** Default to Astro. Only use React if interactivity is required. This minimizes shipped JavaScript.

**Import Conventions:**

```typescript
// 1. Framework imports first
import { getCollection } from 'astro:content';

// 2. Third-party imports
import { z } from 'zod';

// 3. Internal imports via path aliases
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import { getDivisionBySlug } from '@/lib/divisions';
import type { Division } from '@/content/config';

// 4. Relative imports only for co-located files
import './styles.css';
```

**Path aliases** (configured in `tsconfig.json`):

| Alias | Resolves To |
|---|---|
| `@/components/*` | `src/components/*` |
| `@/layouts/*` | `src/layouts/*` |
| `@/lib/*` | `src/lib/*` |
| `@/content/*` | `src/content/*` |
| `@/assets/*` | `src/assets/*` |
| `@/styles/*` | `src/styles/*` |

### Format Patterns

**API Response Format (contact endpoint):**

```typescript
// Success
{ success: true, message: "Inquiry submitted successfully" }

// Validation error
{ success: false, errors: { email: "Valid email required", message: "Message is required" } }

// Server error
{ success: false, message: "Unable to process your request. Please try again." }
```

- Always return JSON
- Always include `success` boolean
- Validation errors use field-name keys in `errors` object
- Never expose internal error details to the client
- HTTP status codes: 200 (success), 400 (validation), 429 (rate limited), 500 (server error)

**Date Handling:**

- Content collections: ISO 8601 date strings (`"2026-03-27"`)
- Display in UI: formatted via `Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })` → "27 March 2026"
- Article ordering: sort by `publishedAt` descending
- One utility function `formatDate()` in `src/lib/utils.ts` — all date display goes through it

### Astro Page Patterns

**Every Astro page follows this structure:**

```astro
---
// 1. Imports
import PageLayout from '@/layouts/PageLayout.astro';
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import { getCollection } from 'astro:content';

// 2. Data fetching (getStaticPaths for dynamic routes)
const divisions = await getCollection('divisions');

// 3. Props destructuring (for dynamic routes)
const { slug } = Astro.params;

// 4. Page-specific SEO metadata
const seo = {
  title: "Page Title — Company Name",
  description: "Page description for search engines.",
  canonical: `${import.meta.env.SITE_URL}/page-path/`,
};
---

<!-- 5. Layout wrapper with SEO props -->
<PageLayout {seo}>
  <!-- 6. Page content using SectionWrapper for each section -->
  <SectionWrapper variant="default">
    <!-- Section content -->
  </SectionWrapper>
</PageLayout>
```

**No exceptions.** Every page uses `PageLayout`. Every section uses `SectionWrapper`. SEO metadata is always explicit.

### Styling Patterns

**Tailwind usage rules:**

- Use the design token values from the UX spec — never arbitrary values (no `text-[#15803D]`, use `text-primary-600`)
- Section padding: always `py-16 lg:py-24` via SectionWrapper
- Container: always `container mx-auto px-4 sm:px-6 lg:px-8` via SectionWrapper
- Content max-width: `max-w-3xl` for text, `max-w-4xl` for mixed, `max-w-7xl` for full
- Use `cn()` utility from `@/lib/utils` for conditional class merging
- Never use `@apply` in CSS files — keep all styling in JSX/Astro templates via Tailwind classes
- shadcn/ui components in `src/components/ui/` are modified via their own files, never overridden externally

**Responsive breakpoints — mobile-first only:**

```
Default (no prefix) → mobile
sm: → 640px+
md: → 768px+
lg: → 1024px+
xl: → 1280px+
```

Never use `max-width` media queries. Always build up from mobile.

### Accessibility Patterns

**Every interactive component must have:**
- Visible focus ring: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
- Minimum touch target: 44x44px
- `aria-label` or visible label text
- Keyboard operability (Enter/Space for buttons, Escape to close overlays)

**Every page must have:**
- Single `<h1>` matching the page topic
- Heading hierarchy (h1 → h2 → h3, no skipping levels)
- Skip-to-content link as first focusable element in BaseLayout
- `<main>` landmark wrapping page content
- `<nav>` landmark with `aria-label` for navigation regions
- All images: `alt` text for meaningful images, `alt=""` + `aria-hidden="true"` for decorative

**Motion:**
- All transitions/animations wrapped in `prefers-reduced-motion` check
- No auto-playing animations
- Hover transitions max 200ms, ease-out timing

### Process Patterns

**Error Handling:**

| Context | Pattern |
|---|---|
| Form validation | Inline error below field, linked via `aria-describedby`. Red border on field. Error message in `error-600` text. |
| Form submission failure | Banner above form with error message. Form data preserved. |
| Build-time content error | Zod schema validation fails the build. Fix content, not code. |
| Image loading failure | Astro `<Image />` handles fallbacks. No broken image icons. |
| 404 pages | Custom `src/pages/404.astro` with navigation back to homepage. |

**Loading States:**
- Skeleton shimmer (`neutral-200` with animation) for lazy-loaded sections
- No spinners
- Form submit button shows "Sending..." text + disabled state during submission
- Skeletons match approximate shape of content they replace

### Enforcement Guidelines

**All AI agents implementing stories MUST:**

1. Check this architecture document before writing any code
2. Use Astro components for static content, React only when interactivity is required
3. Follow the file naming and folder structure exactly — no alternative locations
4. Use path aliases (`@/`) for all imports except co-located files
5. Wrap every page in `PageLayout`, every section in `SectionWrapper`
6. Include explicit SEO metadata on every page
7. Use design token values from the Tailwind config — no arbitrary values
8. Add `focus-visible` rings to every interactive element
9. Test heading hierarchy (single h1, no skipped levels) on every page
10. Format all dates through the shared `formatDate()` utility

## Project Structure & Boundaries

### Complete Project Directory Structure

```
uk-web-design/
├── astro.config.mjs                          # Astro config: integrations, site URL, output mode
├── tailwind.config.mjs                       # Tailwind theme: colours, fonts, spacing tokens from UX spec
├── tsconfig.json                             # TypeScript strict + path aliases
├── package.json
├── .env.example                              # RESEND_API_KEY, CONTACT_EMAIL_DEFAULT, SITE_URL, PUBLIC_SITE_NAME
├── .gitignore
│
├── public/
│   ├── robots.txt                            # Allow all, disallow /api/
│   ├── favicon.svg                           # AG monogram
│   ├── og-default.jpg                        # Default Open Graph image
│   └── fonts/                                # @fontsource output (if not using npm import)
│
├── src/
│   ├── assets/
│   │   ├── brand/
│   │   │   ├── logo.svg                      # Full wordmark
│   │   │   ├── logo-mark.svg                 # AG monogram only
│   │   │   └── icons/                        # Division icons, UI icons (SVG)
│   │   ├── divisions/
│   │   │   ├── crop-farming-hero.jpg
│   │   │   ├── animal-husbandry-hero.jpg
│   │   │   ├── agro-processing-hero.jpg
│   │   │   ├── commodity-marketing-hero.jpg
│   │   │   ├── import-export-hero.jpg
│   │   │   ├── real-estate-hero.jpg
│   │   │   └── oil-gas-hero.jpg
│   │   ├── team/                             # Leadership portrait photos
│   │   └── hero/
│   │       └── homepage-hero.jpg             # Homepage cinematic hero
│   │
│   ├── components/
│   │   ├── ui/                               # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── layout/
│   │   │   ├── SectionWrapper.astro           # Section container: variant, padding, container
│   │   │   ├── SectionHeading.astro           # H2 + optional eyebrow + subtitle
│   │   │   ├── Header.astro                   # Wrapper: renders DesktopNav + MobileNav
│   │   │   ├── Footer.astro                   # Multi-column footer with brand story
│   │   │   └── BreadcrumbNav.astro            # Breadcrumb trail from route hierarchy
│   │   ├── navigation/
│   │   │   ├── DesktopNav.tsx                 # React island: dropdown menus (client:load)
│   │   │   └── MobileNav.tsx                  # React island: Sheet + Accordion (client:load)
│   │   ├── divisions/
│   │   │   ├── DivisionCard.astro             # Card with size + visual variants
│   │   │   ├── DivisionBentoGrid.astro        # CSS Grid layout for 7 divisions
│   │   │   ├── ClusterSection.astro           # Cluster heading + division card row
│   │   │   └── DivisionFeatureCard.astro      # Large card for cluster pages
│   │   ├── insights/
│   │   │   ├── InsightCard.astro              # Article preview: standard + featured variants
│   │   │   └── ArticleContent.astro           # MDX article rendering wrapper
│   │   ├── contact/
│   │   │   └── InquiryForm.tsx                # React island: division-aware form (client:visible)
│   │   ├── search/
│   │   │   └── SearchOverlay.tsx              # React island: search UI (client:idle)
│   │   └── shared/
│   │       ├── CredibilityBar.astro           # Stats + trust signals section
│   │       ├── StatCounter.tsx                # React island: count-up animation (client:visible)
│   │       ├── StepIndicator.astro            # Numbered process steps
│   │       ├── CTABanner.astro                # Full-width CTA section
│   │       ├── PageHero.astro                 # Inner page hero (not homepage)
│   │       ├── LeaderCard.astro               # Team member card
│   │       ├── CredentialCard.astro           # Certification/license card
│   │       ├── OrgChart.astro                 # Group structure diagram
│   │       ├── AnchorNav.astro                # Sticky anchor navigation (About page)
│   │       └── ViewAllLink.astro              # Text link with arrow
│   │
│   ├── content/
│   │   ├── config.ts                          # All collection schemas (Zod)
│   │   ├── divisions/
│   │   │   ├── crop-farming.yaml
│   │   │   ├── animal-husbandry.yaml
│   │   │   ├── agro-processing.yaml
│   │   │   ├── commodity-marketing.yaml
│   │   │   ├── import-export.yaml
│   │   │   ├── real-estate.yaml
│   │   │   └── oil-gas.yaml
│   │   ├── clusters/
│   │   │   ├── agriculture-processing.yaml
│   │   │   ├── trade-markets.yaml
│   │   │   └── built-environment-energy.yaml
│   │   ├── articles/
│   │   │   └── (MDX files with co-located images)
│   │   ├── team/
│   │   │   └── (YAML files per leader)
│   │   ├── credentials/
│   │   │   └── credentials.yaml               # Single file with array of credentials
│   │   └── pages/
│   │       ├── about.mdx                      # About page prose sections
│   │       └── investors-partners.mdx         # Investors & Partners prose
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro                   # HTML shell: <head> SEO, fonts, global CSS, skip link
│   │   ├── PageLayout.astro                   # BaseLayout + Header + <main> + Footer
│   │   ├── DivisionLayout.astro               # PageLayout + 5-section division template
│   │   └── ArticleLayout.astro                # PageLayout + article header, body, related insights
│   │
│   ├── lib/
│   │   ├── utils.ts                           # cn() helper, formatDate(), shared utilities
│   │   ├── seo.ts                             # generateMetadata(), generateJsonLd(), OG image helpers
│   │   ├── email.ts                           # Resend client, sendInquiryNotification(), sendConfirmation()
│   │   └── divisions.ts                       # getDivisionBySlug(), getClusterDivisions(), getDivisionsByCluster()
│   │
│   ├── pages/
│   │   ├── index.astro                        # P01: Homepage
│   │   ├── about.astro                        # P02: About the Group
│   │   ├── divisions/
│   │   │   ├── index.astro                    # P03: Divisions Hub
│   │   │   ├── [cluster].astro                # P04-P06: Cluster pages (getStaticPaths → 3 pages)
│   │   │   └── [division].astro               # P07-P13: Division detail (getStaticPaths → 7 pages)
│   │   ├── insights/
│   │   │   ├── index.astro                    # P14: Insights Hub
│   │   │   ├── latest.astro                   # P15: Latest Insights
│   │   │   ├── news.astro                     # P16: News & Updates
│   │   │   ├── thought-leadership.astro       # P17: Thought Leadership
│   │   │   ├── divisions/
│   │   │   │   └── [division].astro           # P19: Division insights (getStaticPaths → 7 pages)
│   │   │   └── [slug].astro                   # P20: Article detail (getStaticPaths → N articles)
│   │   ├── investors-partners.astro           # P21: Investors & Partners
│   │   ├── contact/
│   │   │   ├── index.astro                    # P22: Contact Hub
│   │   │   ├── general.astro                  # P23: General Enquiries
│   │   │   ├── strategic.astro                # P26: Partner & Investor Contact
│   │   │   ├── locations.astro                # P27: Locations
│   │   │   └── divisions/
│   │   │       └── [division].astro           # P25: Division inquiry (getStaticPaths → 7 pages)
│   │   ├── search.astro                       # P28: Search
│   │   ├── privacy-policy.astro               # P29: Privacy Policy
│   │   ├── terms.astro                        # P30: Terms of Use
│   │   ├── sitemap.astro                      # P31: HTML Sitemap
│   │   ├── 404.astro                          # Custom 404
│   │   └── api/
│   │       └── contact.ts                     # Serverless: form handler (prerender = false)
│   │
│   └── styles/
│       └── globals.css                        # Tailwind directives, CSS variables, @fontsource imports
│
├── tests/
│   ├── unit/
│   │   ├── schemas.test.ts                    # Content collection Zod schema validation
│   │   ├── utils.test.ts                      # formatDate, cn, helpers
│   │   ├── email.test.ts                      # Email routing logic, template generation
│   │   └── divisions.test.ts                  # Division/cluster lookup helpers
│   ├── component/
│   │   ├── InquiryForm.test.tsx               # Form validation, submission, variant behaviour
│   │   ├── MobileNav.test.tsx                 # Toggle, accordion, accessibility
│   │   └── SearchOverlay.test.tsx             # Search input, results display
│   └── e2e/
│       ├── navigation.spec.ts                 # Full nav flow: homepage → division → contact
│       ├── contact-form.spec.ts               # Form submission, validation, confirmation
│       ├── accessibility.spec.ts              # axe-core checks on all page templates
│       └── responsive.spec.ts                 # Mobile/tablet/desktop breakpoint verification
│
└── .github/
    └── workflows/
        └── ci.yml                             # Lint + type-check + unit tests + build + e2e on preview
```

### Architectural Boundaries

**Rendering Boundary:**
- Everything in `src/pages/` except `src/pages/api/` is statically generated at build time
- `src/pages/api/contact.ts` is the only server-rendered route (`export const prerender = false`)
- React islands hydrate on the client but do not fetch data — all data is passed as props from Astro pages

**Content Boundary:**
- All content lives in `src/content/` and is accessed via `getCollection()` / `getEntry()` from Astro's Content Layer API
- No component directly reads content files — content is always fetched in Astro page frontmatter and passed down as props
- Content schemas in `src/content.config.ts` are the single source of truth for content shape

**Component Boundary:**
- `src/components/ui/` — shadcn/ui primitives. Modified only within their own files. Never import from one ui component to another.
- `src/components/layout/` — structural components used by layouts and pages. These compose ui primitives.
- `src/components/{domain}/` — domain-specific components. These compose layout components and ui primitives.
- React islands (`.tsx`) never import Astro components. Astro components can render React islands with `client:*` directives.

**Data Flow:**

```
Content Collections (YAML/MDX)
        ↓ getCollection() / getEntry()
Astro Page Frontmatter (data fetching)
        ↓ props
Astro Layout (BaseLayout → PageLayout → DivisionLayout)
        ↓ props / slots
Astro Components (static rendering)
        ↓ props + client:* directive
React Islands (interactive hydration)

Form Submission (client-side):
InquiryForm.tsx → POST /api/contact → Zod validation → Resend API → Response
```

### Requirements to Structure Mapping

**FR1-7 (Corporate Presence):**
- `src/pages/index.astro` — homepage narrative
- `src/pages/about.astro` + `src/content/pages/about.mdx` — corporate overview
- `src/pages/divisions/` — all division presentation
- `src/content/divisions/` + `src/content/clusters/` — division data
- `src/content/credentials/` — certifications and proof points

**FR8-17 (Navigation & Discovery):**
- `src/components/navigation/` — DesktopNav, MobileNav
- `src/components/layout/Header.astro` — navigation wrapper
- `src/components/layout/BreadcrumbNav.astro` — wayfinding
- `src/pages/search.astro` + `src/components/search/SearchOverlay.tsx` — search
- `src/components/divisions/DivisionBentoGrid.astro` — division discovery

**FR18-21 (Investor/Partner):**
- `src/pages/investors-partners.astro` + `src/content/pages/investors-partners.mdx`
- `src/pages/contact/strategic.astro` — strategic inquiry form

**FR22-26 (Customer/Prospect):**
- `src/pages/divisions/[division].astro` — division detail pages
- `src/pages/contact/divisions/[division].astro` — division-specific inquiry

**FR27-30 (Public Trust):**
- `src/pages/index.astro` — homepage credibility
- `src/components/shared/CredibilityBar.astro` — trust signals
- `src/pages/insights/` — content freshness signals

**FR31-37 (Publishing):**
- `src/content/articles/` — MDX article content
- `src/pages/insights/` — all insight listing and detail pages
- `src/content.config.ts` — article schema with division tagging and categories

**FR38-42 (Inquiry & Contact):**
- `src/pages/contact/` — all contact pages
- `src/components/contact/InquiryForm.tsx` — single form component, variant-driven
- `src/pages/api/contact.ts` — serverless form handler
- `src/lib/email.ts` — Resend integration and email templates

**FR43-53 (Content Admin & Quality):**
- `src/content/` — all content collections (git-based authoring)
- `src/content.config.ts` — Zod schemas enforce structure
- `src/layouts/` — template system ensuring consistent rendering

### Cross-Cutting Concerns Mapping

| Concern | Files |
|---|---|
| Division data model | `src/content.config.ts`, `src/content/divisions/`, `src/content/clusters/`, `src/lib/divisions.ts` |
| SEO metadata | `src/lib/seo.ts`, `src/layouts/BaseLayout.astro` |
| Accessibility | All components (focus rings, ARIA), `tests/e2e/accessibility.spec.ts` |
| Performance | `astro.config.mjs` (image optimization), `src/layouts/BaseLayout.astro` (font loading), all components (hydration directives) |
| Design system tokens | `tailwind.config.mjs`, `src/styles/globals.css` |
| Responsive layout | `src/components/layout/SectionWrapper.astro`, all page layouts |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices verified compatible. Astro 6 + `@astrojs/react` + `@astrojs/tailwind` + `@astrojs/vercel` are all first-party Astro integrations tested together. shadcn/ui has official Astro installation documentation. Resend + Astro server endpoints on Vercel is a proven pattern with hybrid rendering. Content Layer API + Zod is native to Astro 6. TypeScript strict mode supported across all tooling. No contradictory decisions found.

**Pattern Consistency:**
Naming conventions are coherent across all areas (kebab-case for pages/content, PascalCase for components, camelCase for functions/fields). Import conventions use path aliases consistently. The Astro-vs-React decision rule is unambiguous.

**Structure Alignment:**
Project tree maps 1:1 to route map (31 IA routes → 31 page files). Component folders match the UX spec's 3-layer hierarchy. Content collections match the data model. Every FR category has a specific directory mapping.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

| Category | FRs | Covered By | Status |
|---|---|---|---|
| Corporate Presence (FR1-7) | 7 | Homepage, About, Divisions, Credentials collection | ✅ |
| Navigation & Discovery (FR8-17) | 10 | DesktopNav, MobileNav, BreadcrumbNav, SearchOverlay, BentoGrid | ✅ |
| Investor/Partner (FR18-21) | 4 | Investors & Partners page, strategic inquiry form | ✅ |
| Customer/Prospect (FR22-26) | 5 | Division detail pages, division inquiry forms | ✅ |
| Public Trust (FR27-30) | 4 | Homepage narrative, CredibilityBar, Insights | ✅ |
| Publishing (FR31-37) | 7 | Articles collection, Insights pages, division tagging | ✅ |
| Inquiry & Contact (FR38-42) | 5 | InquiryForm, /api/contact, Resend, division routing | ✅ |
| Content Admin (FR43-48) | 6 | Content Collections, Zod schemas, git workflow | ✅ |
| Quality (FR49-53) | 5 | Responsive layouts, SEO system, a11y patterns, reusable components | ✅ |

**53/53 functional requirements covered.**

**Non-Functional Requirements Coverage:**

| Category | NFRs | Covered By | Status |
|---|---|---|---|
| Performance (NFR1-5) | 5 | Astro zero-JS default, island hydration, image optimization, @fontsource, lazy loading | ✅ |
| Security (NFR6-10) | 5 | Git-based access control, HTTPS via Vercel, honeypot + rate limiting, Zod validation | ✅ |
| Scalability (NFR11-14) | 4 | Content Collections scale by adding files, component reuse, pattern-based templates | ✅ |
| Accessibility (NFR15-19) | 5 | WCAG 2.1 patterns defined, focus rings, semantic HTML, motion restraint, contrast compliance | ✅ |
| Reliability (NFR20-23) | 4 | Static site (no runtime failures), Vercel preview deploys, rollback via git | ✅ |
| Integration Readiness (NFR24-27) | 4 | Sanity migration path, Resend modular, structured content model, division taxonomy | ✅ |

**27/27 non-functional requirements covered.**

### Implementation Readiness Validation ✅

**Decision Completeness:** 8 core decisions documented with specific technology choices, versions verified via web search, rationale recorded, and cascading implications identified.

**Pattern Completeness:** 12 conflict points addressed with concrete rules and examples. The Astro page pattern template, import conventions, and enforcement guidelines give agents zero ambiguity on how to structure code.

**Structure Completeness:** Every file and directory is named. Every IA route has a corresponding page file. Every UX component has a corresponding component file. Every FR has a directory mapping.

### Gap Analysis Results

**Critical Gaps:** None.

**Important Gaps (addressable in implementation stories, not blocking):**

1. **Search implementation detail** — SearchOverlay.tsx is specified but the search data source (build-time index via Pagefind or Fuse.js) is not decided. Resolve in search implementation story.
2. **Content migration tooling** — Sanity migration path is architecturally clear but no migration script is specified. Appropriate for phase 2 planning.
3. **Email template design** — Resend integration specified but HTML email template content is not defined. Resolve in contact form implementation story.

**Deferred (Post-MVP):**
- Visual regression testing setup
- Analytics event schema
- Digital Ocean deployment configuration
- Advanced content filtering/pagination patterns
- Sanity Studio configuration

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed (53 FRs, 27 NFRs)
- [x] Scale and complexity assessed (High — IA breadth)
- [x] Technical constraints identified (MPA, mobile-first, WCAG 2.1)
- [x] Cross-cutting concerns mapped (6 concerns → specific files)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions (Astro 6, React, Tailwind, shadcn/ui)
- [x] Technology stack fully specified (8 decisions)
- [x] Integration patterns defined (content → pages → components → islands)
- [x] Performance considerations addressed (hydration map, image strategy, font loading)

**✅ Implementation Patterns**

- [x] Naming conventions established (files, components, functions, content fields)
- [x] Structure patterns defined (Astro vs React rule, import order, page template)
- [x] Styling patterns specified (Tailwind tokens, mobile-first, no @apply)
- [x] Process patterns documented (error handling, loading states, accessibility)

**✅ Project Structure**

- [x] Complete directory structure defined (every file named)
- [x] Component boundaries established (rendering, content, component, data flow)
- [x] Integration points mapped (data flow diagram)
- [x] Requirements to structure mapping complete (all 53 FRs mapped)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Zero ambiguity on technology choices — every tool, library, and pattern is specified
- 1:1 mapping between IA routes and page files — no interpretation needed
- Island hydration map eliminates performance guesswork
- Content model maps cleanly to future Sanity migration
- Enforcement guidelines give agents 10 concrete rules to follow

**Areas for Future Enhancement:**
- Search implementation detail (Pagefind vs Fuse.js) — resolve in search story
- Email template HTML design — resolve in contact form story
- Sanity migration tooling — resolve in phase 2 planning
- Advanced content pagination patterns — resolve when article volume warrants it

### Implementation Handoff

**AI Agent Guidelines:**
- Read this complete architecture document before writing any code
- Follow all 10 enforcement guidelines in Implementation Patterns
- Use the project structure exactly as defined — no alternative locations
- Respect architectural boundaries (rendering, content, component, data flow)
- When in doubt, default to Astro over React, static over dynamic, simple over clever

**First Implementation Priority:**

```bash
npm create astro@latest uk-web-design -- --template minimal --typescript strict
cd uk-web-design
npx astro add react tailwind vercel
npx shadcn@latest init
npm install resend
```

Then: content schemas → base layouts → design tokens → navigation → homepage.
