# Story 1.2: Design Token System & Typography

Status: done

## Story

As a **visitor**,
I want the platform to present a consistent, professional visual identity,
So that I perceive GRCL as a credible, well-organized business.

## Acceptance Criteria

1. Full colour system defined in Tailwind v4 `@theme {}` block: primary green scale (primary-50 #F0FDF4 through primary-900 #14532D), warm gold accent (gold-600 #B48A3E, gold-400 #D4A84B, gold-100 #FDF6E3), neutral scale (neutral-50 through neutral-900), semantic colours (success, error, warning, info at 100 and 600 levels), division cluster accents (amber, copper, slate)
2. Poppins (headings, 600 weight) and Inter (body/UI, 400/500 weight) and JetBrains Mono (code) self-hosted via @fontsource with `font-display: swap` and critical weights imported
3. Responsive type scale defined with Tailwind utilities covering all 10 levels: H1 (36px/60px), H2 (30px/36px), H3 (20px/24px), H4 (18px/20px), Body (18px), Body Small (14px), Caption (12px), Button (16px/18px), Nav (14px), Overline (11px/12px) — with correct weights, line heights, and letter spacing
4. Spacing scale (4px base: space-1 through space-24), border radius scale (rounded-md 6px, rounded-lg 8px, rounded-xl 12px, rounded-full), shadow scale (shadow-sm, shadow-md, shadow-lg) configured
5. `cn()` utility for conditional Tailwind classes available in `src/lib/utils.ts`
6. `formatDate()` utility using `Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })` available in `src/lib/utils.ts`
7. No arbitrary Tailwind values used — all values reference design tokens
8. A visual test page at `/token-test` demonstrates all tokens rendering correctly (removed before production)

## Tasks / Subtasks

- [x] Task 1: Complete the Tailwind v4 `@theme {}` colour system in `src/styles/globals.css` (AC: #1)
  - [x] 1.1 Define primary green scale (7 stops per UX spec): 50, 100, 300, 500, 600, 700, 900 — NOT a full 10-step scale; only these stops are specified in the authoritative UX spec
  - [x] 1.2 Define gold accent scale: 100, 400, 600
  - [x] 1.3 Define full neutral scale: 50, 100, 200, 300, 500, 600, 700, 900
  - [x] 1.4 Define semantic colours: success-100/600, warning-100/600, error-100/600, info-100/600
  - [x] 1.5 Define division cluster accents: amber-100/600, copper-100/600, slate-100/600

- [x] Task 2: Configure font loading in `src/styles/globals.css` (AC: #2)
  - [x] 2.1 Import Poppins static weights: 400, 500, 600, 700 via `@fontsource/poppins`
  - [x] 2.2 Import Inter variable font via `@fontsource-variable/inter`
  - [x] 2.3 Import JetBrains Mono variable font via `@fontsource-variable/jetbrains-mono`
  - [x] 2.4 Define font family tokens in `@theme`: `--font-heading`, `--font-body`, `--font-mono`
  - [x] 2.5 Verify `font-display: swap` is applied (@fontsource handles this by default)

- [x] Task 3: Define typography scale tokens (AC: #3)
  - [x] 3.1 Define font-size tokens for all 10 type levels (mobile sizes as default)
  - [x] 3.2 Define line-height tokens matching the type scale
  - [x] 3.3 Define letter-spacing tokens for heading and UI levels
  - [x] 3.4 Create responsive typography utility classes or document the Tailwind class combinations for each level

- [x] Task 4: Define spacing, radius, and shadow tokens (AC: #4)
  - [x] 4.1 Verify Tailwind v4 default spacing scale covers project needs (p-4=16px, py-16=64px, py-24=96px, gap-6=24px, gap-8=32px). Only define custom `--spacing-*` tokens in `@theme` if defaults are insufficient.
  - [x] 4.2 Define border-radius tokens: rounded-md (6px), rounded-lg (8px), rounded-xl (12px)
  - [x] 4.3 Define shadow tokens: shadow-sm, shadow-md, shadow-lg with exact rgba values
  - [x] 4.4 Define transition token: 150-200ms ease-out for hover states

- [x] Task 5: Implement utility functions in `src/lib/utils.ts` (AC: #5, #6)
  - [x] 5.1 Implement `cn()` using clsx + tailwind-merge (may already exist from shadcn init)
  - [x] 5.2 Implement `formatDate()` using `Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })`
  - [x] 5.3 Export both functions

- [x] Task 6: Create token test page (AC: #8)
  - [x] 6.1 Create `src/pages/token-test.astro` showing colour swatches, type scale, spacing, shadows
  - [x] 6.2 Verify all tokens render correctly in browser
  - [x] 6.3 Verify responsive type scale at mobile and desktop breakpoints

- [x] Task 7: Verify no arbitrary values (AC: #7)
  - [x] 7.1 Search codebase for `[#` pattern (arbitrary Tailwind colours)
  - [x] 7.2 Confirm all values use token references

## Dev Notes

### CRITICAL: Tailwind v4 Token Architecture

Story 1.1 establishes the project with Tailwind v4 via `@tailwindcss/vite`. This story EXTENDS the `src/styles/globals.css` file that Story 1.1 creates. **All design tokens live in CSS `@theme {}` blocks, not in a JS config file.**

In Tailwind v4, the `@theme` block defines CSS custom properties that Tailwind automatically registers as utilities:
- `--color-primary-600: #15803D` → generates `text-primary-600`, `bg-primary-600`, `border-primary-600`, etc.
- `--font-heading: 'Poppins', system-ui, sans-serif` → generates `font-heading` utility
- `--shadow-md: 0 4px 6px rgba(0,0,0,0.07)` → generates `shadow-md` utility

### Complete Colour Token Reference

**Primary Green (UX spec authoritative):**

| Token | Hex | Contrast on White | Usage |
|-------|-----|-------------------|-------|
| primary-50 | #F0FDF4 | background only | Hero gradient tint, alternating section backgrounds |
| primary-100 | #DCFCE7 | background only | Card icon backgrounds, subtle highlights |
| primary-300 | #86EFAC | decorative only | Hover backgrounds, light badges |
| primary-500 | #16A34A | 4.8:1 AA | Secondary actions, progress indicators |
| primary-600 | #15803D | 7.2:1 AAA | Core accent — CTAs, links, interactive UI, focus rings |
| primary-700 | #166534 | 10.1:1 AAA | Hover states, active navigation items |
| primary-900 | #14532D | 12.6:1 AAA | Footer, dark backgrounds, heavy emphasis |

**Note:** The epics file mentions primary-900 as #052E16 but the UX spec (authoritative) defines it as #14532D. Use #14532D.

**Gold Accent:**

| Token | Hex | Usage |
|-------|-----|-------|
| gold-100 | #FDF6E3 | Subtle gold tint backgrounds |
| gold-400 | #D4A84B | Hover state for gold elements |
| gold-600 | #B48A3E | Certification badges, key statistics, awards, premium moments |

**Neutral Scale:**

| Token | Hex | Role |
|-------|-----|------|
| neutral-50 | #F9FAFB | Alternating section backgrounds, page backgrounds |
| neutral-100 | #F3F4F6 | Input backgrounds, hover states |
| neutral-200 | #E5E7EB | Subtle borders, skeleton loaders |
| neutral-300 | #D1D5DB | Borders, dividers, card outlines |
| neutral-500 | #6B7280 | Muted text, timestamps, metadata |
| neutral-600 | #4B5563 | Body text on light backgrounds (7.0:1) |
| neutral-700 | #374151 | Secondary headings, emphasis text |
| neutral-900 | #1F2937 | Primary text, dark backgrounds |

**Semantic:**

| Role | 600 | 100 |
|------|-----|-----|
| success | #15803D | #DCFCE7 |
| warning | #D97706 | #FEF3C7 |
| error | #DC2626 | #FEE2E2 |
| info | #0284C7 | #E0F2FE |

**Division Cluster Accents (decorative only, on division pages):**

| Cluster | bg (100) | icon (600) |
|---------|----------|------------|
| Agriculture & Processing | amber-100 #FEF3C7 | amber-600 #D97706 |
| Trade & Markets | copper-100 #FFF1E6 | copper-600 #C2590A |
| Built Environment & Energy | slate-100 #F1F5F9 | slate-600 #475569 |

### Complete Type Scale Reference

| Level | Mobile | Desktop | Weight | Line Height | Letter Spacing | Font |
|-------|--------|---------|--------|-------------|----------------|------|
| H1 | 2.25rem (36px) | 3.75rem (60px) | 600 | 1.1 | -0.02em | Poppins |
| H2 | 1.875rem (30px) | 2.25rem (36px) | 600 | 1.2 | -0.01em | Poppins |
| H3 | 1.25rem (20px) | 1.5rem (24px) | 600 | 1.3 | 0 | Poppins |
| H4 | 1.125rem (18px) | 1.25rem (20px) | 600 | 1.4 | 0 | Poppins |
| Body | 1.125rem (18px) | 1.125rem (18px) | 400 | 1.6 | 0 | Inter |
| Body Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | 0 | Inter |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 500 | 1.4 | 0.02em | Inter |
| Button | 1rem (16px) | 1.125rem (18px) | 600 | 1 | 0.01em | Inter |
| Nav | 0.875rem (14px) | 0.875rem (14px) | 500 | 1 | 0.01em | Inter |
| Overline | 0.6875rem (11px) | 0.75rem (12px) | 700 | 1 | 0.12em | Inter |

**Responsive type implementation:** Use mobile sizes as default, apply desktop sizes at `lg:` breakpoint. Example for H1: `text-4xl lg:text-6xl font-heading font-semibold leading-[1.1] tracking-tight`

### Spacing Tokens

| Token | Value | CSS Var |
|-------|-------|---------|
| space-1 | 4px (0.25rem) | --spacing-1: 0.25rem |
| space-2 | 8px (0.5rem) | --spacing-2: 0.5rem |
| space-3 | 12px (0.75rem) | --spacing-3: 0.75rem |
| space-4 | 16px (1rem) | --spacing-4: 1rem |
| space-6 | 24px (1.5rem) | --spacing-6: 1.5rem |
| space-8 | 32px (2rem) | --spacing-8: 2rem |
| space-10 | 40px (2.5rem) | --spacing-10: 2.5rem |
| space-12 | 48px (3rem) | --spacing-12: 3rem |
| space-16 | 64px (4rem) | --spacing-16: 4rem |
| space-24 | 96px (6rem) | --spacing-24: 6rem |

**Note on Tailwind v4 spacing:** Tailwind v4 uses a default spacing scale based on `rem`. You may not need to redefine the standard scale values (e.g., `p-4` = 1rem = 16px already works). Only define custom tokens if the default scale doesn't cover your needs. The key custom spacing patterns to verify:
- `py-16` = 4rem (64px) — section mobile padding
- `py-24` = 6rem (96px) — section desktop padding
- `gap-6` = 1.5rem (24px) — card grid gaps
- `gap-8` = 2rem (32px) — desktop card grid gaps

### Shadow Tokens

```css
@theme {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

### Border Radius Tokens

```css
@theme {
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}
```

### Accessibility Token Rules

- **Focus ring:** `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2` on ALL interactive elements
- **Touch targets:** min 44x44px — buttons use `px-8 py-4` padding
- **Contrast compliance:**
  - primary-600 on white = 7.2:1 (AAA) — safe for all text
  - neutral-600 on white = 7.0:1 (AAA) — standard body text
  - white on primary-900 = 12.6:1 (AAA) — dark section text
  - gold-600 is decorative only — never sole indicator of meaning
- **Motion:** All transitions wrapped in `prefers-reduced-motion` — hover transitions 150-200ms ease-out

### Utility Function Specifications

**cn() — Conditional class merging:**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**formatDate() — Date display:**
```typescript
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(d);
}
// Input: "2026-03-27" → Output: "27 March 2026"
```

### Font Loading Strategy

Poppins has NO variable font — must use per-weight static imports:
```css
@import "@fontsource/poppins/400.css";
@import "@fontsource/poppins/500.css";
@import "@fontsource/poppins/600.css";   /* Primary heading weight */
@import "@fontsource/poppins/700.css";
```

Inter and JetBrains Mono have variable fonts (single import, all weights):
```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";
```

Variable font family names include "Variable" suffix — use:
- `'Inter Variable', system-ui, sans-serif` (or just `'Inter'` if using static package)
- `'JetBrains Mono Variable', ui-monospace, monospace`

### Previous Story Intelligence (Story 1.1)

Story 1.1 creates the initial project with:
- `src/styles/globals.css` with `@import "tailwindcss"`, @fontsource imports, and a `@theme {}` block containing **font-family tokens only** (--font-heading, --font-body, --font-mono) — no colour, spacing, shadow, or radius tokens
- `src/lib/utils.ts` with `cn()` helper
- All @fontsource packages installed
- Tailwind v4 configured via `@tailwindcss/vite` in `astro.config.mjs`

**Story 1.2 must:**
- EXTEND (not recreate) the globals.css `@theme {}` block — add all colour scales, semantic colours, cluster accents, spacing, shadow, and radius tokens alongside the existing font-family definitions
- Verify `cn()` works correctly; add `formatDate()` to `utils.ts`
- Add the complete responsive type scale tokens
- Verify font rendering at all weights
- Create a test page to visually confirm all tokens

### What This Story Does NOT Include

- No component implementations (Story 1.4)
- No layout components like SectionWrapper or SectionHeading (Story 1.4)
- No content collections (Story 1.3)
- No navigation components (Stories 1.5-1.8)
- No real pages — only a temporary `/token-test` verification page

### Project Structure Notes

Files this story creates or modifies:
- **Modifies:** `src/styles/globals.css` — completes the @theme token system
- **Modifies:** `src/lib/utils.ts` — adds formatDate()
- **Creates:** `src/pages/token-test.astro` — temporary visual verification page

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Colour System, Typography System, Spacing & Layout Foundation, Accessibility]
- [Source: _bmad-output/planning-artifacts/architecture.md — Styling Patterns, Naming Conventions, Responsive Breakpoints]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/brand-identity.md — Colour specifications]
- [Source: _bmad-output/implementation-artifacts/1-1-project-initialization-toolchain-setup.md — Previous story, Tailwind v4 patterns]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` completes successfully, both pages generated
- TypeScript check: `tsc --noEmit` passes with zero errors
- Arbitrary value scan: `grep` for `[#` pattern across `src/` returns no matches
- All arbitrary `leading-[*]` values caught and replaced with token utilities (`leading-h1`, `leading-h2`, `leading-h3`)

### Completion Notes List

- **Task 1:** Extended existing `@theme {}` block with complete colour system: 7-stop primary green, 3-stop gold accent, 8-stop neutral, 4 semantic pairs (success/warning/error/info at 100/600), 3 division cluster accent pairs (amber/copper/slate at 100/600). All hex values match UX spec exactly including primary-900 = #14532D (not #052E16 from epics).
- **Task 2:** Font loading was already complete from Story 1.1 — Poppins 300/400/500/600/700, Inter Variable, JetBrains Mono Variable all imported. Font family tokens `--font-heading`, `--font-body`, `--font-mono` already defined. Verified @fontsource applies `font-display: swap` by default.
- **Task 3:** Added 10 mobile-first font-size tokens (`--text-h1` through `--text-overline`), 10 line-height tokens (`--leading-h1` through `--leading-overline`), and 6 letter-spacing tokens (`--tracking-h1`, `--tracking-h2`, `--tracking-button`, `--tracking-nav`, `--tracking-caption`, `--tracking-overline`). Responsive desktop sizes use `lg:` breakpoint with standard Tailwind scale (e.g., `lg:text-6xl` for H1 desktop).
- **Task 4:** Verified Tailwind v4 default spacing scale covers all project needs (p-4=16px, py-16=64px, py-24=96px, gap-6/8). No custom `--spacing-*` tokens needed. Added 3 border-radius tokens (`--radius-md` 6px, `--radius-lg` 8px, `--radius-xl` 12px), 3 shadow tokens (`--shadow-sm/md/lg`), and 2 transition tokens (`--transition-fast` 150ms, `--transition-base` 200ms).
- **Task 5:** `cn()` already existed from Story 1.1. Added `formatDate()` using `Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })` — produces "27 March 2026" format. Both functions exported.
- **Task 6:** Created comprehensive `/token-test` page covering all colour swatches (primary, gold, neutral, semantic, cluster), full 10-level type scale with sample text, font weight verification (Poppins 400-700, Inter Variable, JetBrains Mono), shadow comparison, border radius showcase, spacing scale visualization, button interaction demos with hover transitions and focus rings, contrast compliance examples, and formatDate() output verification.
- **Task 7:** Scanned entire `src/` for arbitrary `[#` colour patterns and arbitrary bracket values. Found and fixed `leading-[1.1]`/`leading-[1.2]`/`leading-[1.3]` in token-test page, replacing with token utilities `leading-h1`/`leading-h2`/`leading-h3`. Zero arbitrary values remain.

### File List

- `src/styles/globals.css` — Modified: extended @theme block with full colour, typography, radius, shadow, and transition tokens
- `src/lib/utils.ts` — Modified: added formatDate() function
- `src/pages/token-test.astro` — Created: visual verification page for all design tokens

### Review Findings

- [x] [Review][Decision] Amber/Slate tokens partially override Tailwind v4 built-in palettes — FIXED: renamed to `cluster-amber`/`cluster-copper`/`cluster-slate` namespace
- [x] [Review][Decision] Neutral scale gaps create mixed color-space — FIXED: added neutral-400, 800, 950 to own full palette in hex sRGB
- [x] [Review][Decision] Transition tokens have no Tailwind utility mapping — FIXED: removed custom tokens, using Tailwind built-in `transition-colors duration-200 ease-out`
- [x] [Review][Decision] Typography tokens lack line-height companions — FIXED: added `--text-h1--line-height` + `--letter-spacing` companions, removed standalone `--leading-*`/`--tracking-*` tokens
- [x] [Review][Patch] formatDate() lacks input validation for invalid dates — FIXED: added `isNaN(d.getTime())` guard
- [x] [Review][Patch] Missing `<meta name="robots" content="noindex">` on temporary test page — FIXED
- [x] [Review][Patch] No prefers-reduced-motion guard for transition tokens — FIXED: added `@media (prefers-reduced-motion: reduce)` rule
- [x] [Review][Patch] Missing space-10 (40px) in spacing visualization — FIXED: added 40px bar
- [x] [Review][Patch] Buttons missing focus-visible:outline-none — FIXED: added to all 3 buttons
- [x] [Review][Defer] Border radius uses px instead of rem — won't scale with user-enlarged browser font-size — deferred, pre-existing design decision
- [x] [Review][Defer] Brand-identity.md vs UX spec colour numbering conflict (primary-600/700 mapping) — deferred, documentation issue

## Change Log

- 2026-03-28: Implemented complete design token system (Story 1.2) — colour scales, typography tokens, spacing/radius/shadow tokens, formatDate() utility, visual test page
