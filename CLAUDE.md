# CLAUDE.md — UK_Web_Design

## Project

Multi-division corporate web platform for **Global Resources Citadel Limited (GRCL)** — a Nigerian conglomerate across 7 business verticals. This is a credibility engine, not a brochure site.

## Tech Stack

Astro 6 (MPA, zero JS by default) + TypeScript strict + React islands + Tailwind CSS + shadcn/ui + Resend + Vercel. Content via file-based Astro Content Collections with Zod schemas. Self-hosted Poppins/Inter fonts via @fontsource.

## Critical Rules

- **Astro by default.** Only use React (.tsx) when the component needs client-side interactivity (useState, useRef, event handlers). Static layout = Astro (.astro).
- **No arbitrary Tailwind values.** All values must reference design tokens defined in the Tailwind config.
- **No @apply in CSS files.** Use cn() utility for conditional classes.
- **Mobile-first.** Every layout decision starts at mobile and scales up. Nigerian mobile audience on variable bandwidth is the primary target.
- **Single H1 per page.** Heading hierarchy must not skip levels.
- **Every page uses PageLayout.** Every section uses SectionWrapper. SEO metadata is always explicit.
- **Island hydration:** MobileNav/DesktopNav = client:load, SearchOverlay = client:idle, InquiryForm/StatCounter = client:visible, Bento hover + section animations = CSS only.
- **Accessibility on every component:** focus-visible rings, 44x44px touch targets, aria attributes, keyboard operability, prefers-reduced-motion wrapping.
- **No "Coming Soon" text anywhere.** If content doesn't exist yet, show a graceful fallback or omit the section.

## Naming Conventions

- Pages/content files: `kebab-case` (about.astro, crop-farming.yaml)
- Components/layouts: `PascalCase` (SectionWrapper.astro, InquiryForm.tsx)
- Functions: `camelCase` (getDivisionBySlug, formatDate)
- Constants: `SCREAMING_SNAKE` (DIVISION_SLUGS)
- Types: `PascalCase`, no I prefix (Division, ContactFormData)
- Zod schemas: `camelCase` + Schema suffix (divisionSchema)
- Content fields: `camelCase` (contactEmail, seoTitle, clusterSlug)

## Path Aliases

```
@/components/* → src/components/*
@/layouts/*    → src/layouts/*
@/lib/*        → src/lib/*
@/content/*    → src/content/*
@/assets/*     → src/assets/*
@/styles/*     → src/styles/*
```

## Brand

- Primary: Deep forest green (#14532D through #F0FDF4)
- Accent: Warm gold (#B48A3E) — premium moments only, never as background
- Logo: GRC monogram + stacked wordmark. SVGs in src/assets/brand/
- Header logo: logo-primary.svg on solid bg, logo-reversed.svg on transparent/dark bg
- Footer logo: logo-reversed.svg
- Favicon: logo-monogram.svg

## Key References

Before implementing any visual component, read these files:

- **Design reference:** `_bmad-output/planning-artifacts/design-reference-final.html` — rendered homepage with production CSS. The "Citadel." nav text is a pre-logo placeholder; use actual logo SVGs.
- **Logo kit:** `_bmad-output/planning-artifacts/logo-kit.html` — all logo variants at multiple sizes.
- **Brand identity:** `_bmad-output/planning-artifacts/brand-identity.md` — naming rules, colour system, typography, usage guidelines.
- **Architecture:** `_bmad-output/planning-artifacts/architecture.md` — all technical decisions, project structure, content model, implementation patterns.
- **UX spec:** `_bmad-output/planning-artifacts/ux-design-specification.md` — experience goals, component specs, design system foundation.
- **Information architecture:** `_bmad-output/planning-artifacts/information-architecture.md` — complete route map, page specs, navigation wireframes, content specifications.
- **Epics:** `_bmad-output/planning-artifacts/epics.md` — all stories with acceptance criteria, FR/NFR traceability, visual reference map.
- **Project context:** `docs/project-context.md` — quick orientation with all finalized decisions.

## Import Order

```typescript
// 1. Framework imports
import { getCollection } from 'astro:content';
// 2. Third-party
import { z } from 'zod';
// 3. Internal via path aliases
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import { getDivisionBySlug } from '@/lib/divisions';
import type { Division } from '@/content/config';
// 4. Relative only for co-located files
import './styles.css';
```

## Sprint Tracking

Sprint status: `_bmad-output/implementation-artifacts/sprint-status.yaml`
Story files: `_bmad-output/implementation-artifacts/`
