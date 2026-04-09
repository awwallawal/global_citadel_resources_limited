# Story 1.1: Project Initialization & Toolchain Setup

Status: done

## Story

As a **developer**,
I want the Astro 6 project initialized with all required integrations and project structure,
So that I have a working development environment to build all platform features.

## Acceptance Criteria

1. Project initialized with Astro 6 + TypeScript strict mode, React integration, Tailwind CSS v4 (via `@tailwindcss/vite`), Vercel adapter, shadcn/ui, and Resend installed
2. Directory structure matches architecture specification: `src/pages/`, `src/content/`, `src/components/` (with domain subfolders: ui/, layout/, navigation/, divisions/, insights/, contact/, search/, shared/), `src/layouts/`, `src/lib/`, `src/assets/`, `tests/` (unit/, component/, e2e/)
3. Path aliases configured in `tsconfig.json`: `@/components/*`, `@/layouts/*`, `@/lib/*`, `@/content/*`, `@/assets/*`, `@/styles/*`
4. Environment variables documented in `.env.example` with: `RESEND_API_KEY`, `CONTACT_EMAIL_DEFAULT`, `SITE_URL`, `PUBLIC_SITE_NAME`
5. Brand logo SVGs copied from `_bmad-output/planning-artifacts/brand-assets/` into `src/assets/brand/` (logo-primary.svg, logo-reversed.svg, logo-monogram.svg, logo-monogram-reversed.svg)
6. Favicon configured using logo-monogram.svg as `public/favicon.svg` with `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
7. `npm run dev` starts the dev server without errors and returns valid HTML

## Tasks / Subtasks

- [x] Task 1: Initialize Astro 6 project (AC: #1)
  - [x] 1.1 Run `npm create astro@latest -- --template minimal --typescript strict`
  - [x] 1.2 Add React integration: `npx astro add react`
  - [x] 1.3 Install Tailwind CSS v4 via Vite plugin: `npm install tailwindcss @tailwindcss/vite`
  - [x] 1.4 Configure `@tailwindcss/vite` in `astro.config.mjs` under `vite.plugins`
  - [x] 1.5 Add Vercel adapter: `npx astro add vercel`
  - [x] 1.6 Initialize shadcn/ui: `npx shadcn@latest init`
  - [x] 1.7 Install Resend: `npm install resend`
  - [x] 1.8 Install fonts: `npm install @fontsource/poppins @fontsource-variable/inter @fontsource-variable/jetbrains-mono`

- [x] Task 2: Create directory structure (AC: #2)
  - [x] 2.1 Create `src/components/` subfolders: ui/, layout/, navigation/, divisions/, insights/, contact/, search/, shared/
  - [x] 2.2 Create `src/layouts/` directory
  - [x] 2.3 Create `src/lib/` directory with placeholder `utils.ts` (cn() helper)
  - [x] 2.4 Create `src/content/` with subdirectories: divisions/, clusters/, articles/, team/, credentials/, pages/
  - [x] 2.5 Create `src/assets/` with subdirectories: brand/, divisions/, team/, hero/
  - [x] 2.6 Create `src/styles/` with `globals.css`
  - [x] 2.7 Create `tests/` with subdirectories: unit/, component/, e2e/
  - [x] 2.8 Create `.github/workflows/` directory (ci.yml not implemented until Story 8.4)
  - [x] 2.9 Add `.gitkeep` in empty directories to preserve structure in git

- [x] Task 3: Configure TypeScript and path aliases (AC: #3)
  - [x] 3.1 Set `strict: true` in tsconfig.json
  - [x] 3.2 Configure all 6 path aliases in tsconfig.json `paths` field

- [x] Task 4: Bootstrap Tailwind v4 globals.css with font imports (AC: #1)
  - [x] 4.1 Create `src/styles/globals.css` with `@import "tailwindcss"` and empty `@theme {}` block
  - [x] 4.2 Import @fontsource packages in globals.css (Poppins static weights + Inter variable + JetBrains Mono variable)
  - [x] 4.3 Define font-family tokens only (--font-heading, --font-body, --font-mono) so the stack renders correctly
  - [x] 4.4 NOTE: Full colour scales, semantic colours, spacing, border-radius, and shadow tokens are Story 1.2 scope — do NOT implement here

- [x] Task 5: Configure environment and brand assets (AC: #4, #5, #6)
  - [x] 5.1 Create `.env.example` with all 4 documented variables
  - [x] 5.2 Create `public/robots.txt` (User-agent: *, Allow: /, Disallow: /api/)
  - [x] 5.3 Ensure `.gitignore` includes `.env`, `.env.local`
  - [x] 5.4 Copy 4 brand SVGs from `_bmad-output/planning-artifacts/brand-assets/` to `src/assets/brand/`
  - [x] 5.5 Copy `logo-monogram.svg` to `public/favicon.svg`

- [x] Task 6: Configure Astro entry files (AC: #1, #7)
  - [x] 6.1 Configure `astro.config.mjs` with React, Tailwind v4 Vite plugin, Vercel adapter, site URL
  - [x] 6.2 Set `output: 'static'` (default — use per-route `prerender = false` for SSR pages later)
  - [x] 6.3 Create minimal `src/pages/index.astro` that confirms the stack works
  - [x] 6.4 Verify `npm run dev` starts without errors

- [x] Task 7: Initialize utility files (AC: #1)
  - [x] 7.1 Create `src/lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
  - [x] 7.2 Create `src/lib/seo.ts` placeholder
  - [x] 7.3 Create `src/lib/divisions.ts` placeholder
  - [x] 7.4 Create `src/lib/email.ts` placeholder
  - [x] 7.5 Create `src/content.config.ts` placeholder (empty collections export)

## Dev Notes

### CRITICAL: Tailwind v4 Migration — No JS Config File

**The architecture doc references `tailwind.config.mjs` — this is a Tailwind v3 pattern. Tailwind v4 replaces JS config with CSS-native configuration.**

In Tailwind v4:
- Design tokens are defined in CSS using `@theme {}` blocks inside `src/styles/globals.css`
- No `tailwind.config.mjs` file needed (or possible for primary config)
- Content detection is automatic via Vite — no `content: [...]` array
- The `@import "tailwindcss"` directive replaces `@tailwind base/components/utilities`
- The `@tailwindcss/vite` plugin replaces the `@astrojs/tailwind` integration

### CRITICAL: @astrojs/tailwind is INCOMPATIBLE

`@astrojs/tailwind` (v6.0.2) has peer deps `astro: ^3 || ^4 || ^5` and `tailwindcss: ^3`. It does NOT support Astro 6 or Tailwind v4. **Do NOT run `npx astro add tailwind`.**

Instead:
```bash
npm install tailwindcss @tailwindcss/vite
```

In `astro.config.mjs`:
```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### CRITICAL: Astro 6 Hybrid Rendering

`output: 'hybrid'` was removed in Astro 5. Use:
- `output: 'static'` (default) — all pages are statically generated
- For SSR routes (like `/api/contact`), add `export const prerender = false` in the route file
- The Vercel adapter handles serverless functions for SSR routes automatically

### CRITICAL: Node.js Version Requirement

Astro 6 requires **Node.js >= 22.12.0**. Verify before starting: `node -v`. If below 22.12, upgrade first.

### KNOWN DISCREPANCY: Architecture Doc Logo Filenames

The architecture doc directory tree (`architecture.md:546-548`) shows `logo.svg` and `logo-mark.svg`. These are outdated placeholder names. The actual brand-assets deliverables are: `logo-primary.svg`, `logo-reversed.svg`, `logo-monogram.svg`, `logo-monogram-reversed.svg`. **Use the brand-assets filenames — they are authoritative.**

### Astro Config Template

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://global-resources.org', // placeholder
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Tailwind v4 globals.css Template (Story 1.1 Scope)

```css
@import "tailwindcss";

/* Font imports */
@import "@fontsource/poppins/400.css";
@import "@fontsource/poppins/500.css";
@import "@fontsource/poppins/600.css";
@import "@fontsource/poppins/700.css";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  /* Typography — font families only (Story 1.1 scope) */
  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, monospace;

  /* Colour scales, semantic colours, spacing, border-radius, shadows → Story 1.2 */
}
```

### tsconfig.json Path Aliases

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"],
      "@/layouts/*": ["src/layouts/*"],
      "@/lib/*": ["src/lib/*"],
      "@/content/*": ["src/content/*"],
      "@/assets/*": ["src/assets/*"],
      "@/styles/*": ["src/styles/*"]
    }
  }
}
```

### .env.example Template

```bash
# Email service API key (server-only, for form handling)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Default recipient for contact form submissions (server-only)
CONTACT_EMAIL_DEFAULT=info@global-resources.org

# Site URL for canonical URLs, sitemaps, and social meta tags (build-time)
SITE_URL=https://global-resources.org

# Public site name for meta tags and branding (public, exposed to client)
PUBLIC_SITE_NAME=Global Resources Citadel
```

### cn() Utility (src/lib/utils.ts)

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### shadcn/ui Init Notes

When running `npx shadcn@latest init`:
- It detects Astro projects and configures accordingly
- Components are copied to `src/components/ui/` (React .tsx files)
- Creates `components.json` at project root with component paths
- Installs `class-variance-authority`, `clsx`, `tailwind-merge`
- The `cn()` utility will be generated — place it at `src/lib/utils.ts`

### Font Import Strategy

Poppins does NOT have a variable font variant. Use static weight imports:
- `@fontsource/poppins/400.css` (regular — fallback body)
- `@fontsource/poppins/500.css` (medium)
- `@fontsource/poppins/600.css` (semibold — primary heading weight)
- `@fontsource/poppins/700.css` (bold — emphasis)

Inter and JetBrains Mono have variable font packages (single import covers all weights):
- `@fontsource-variable/inter` (body text, all weights via single file)
- `@fontsource-variable/jetbrains-mono` (code/data display)

### Brand Asset Locations

Source: `_bmad-output/planning-artifacts/brand-assets/`
- `logo-primary.svg` — dark green/gold on light backgrounds (header scrolled state)
- `logo-reversed.svg` — white/gold on dark backgrounds (header transparent state, footer)
- `logo-monogram.svg` — standalone GRC mark (favicon source)
- `logo-monogram-reversed.svg` — reversed standalone mark

Destination: `src/assets/brand/` (all 4 files)
Favicon: Copy `logo-monogram.svg` to `public/favicon.svg`

### Verified Package Versions (2026-03-28)

| Package | Version | Notes |
|---------|---------|-------|
| astro | 6.1.1 | Requires Node >= 22.12.0 |
| @astrojs/react | 5.0.2 | React 19 compatible |
| @astrojs/vercel | 10.0.3 | Single import, no /serverless subpath |
| tailwindcss | 4.2.2 | v4 — CSS-native config via @theme |
| @tailwindcss/vite | 4.2.2 | Replaces @astrojs/tailwind |
| react | 19.2.4 | Latest stable |
| resend | 6.9.4 | Stable API |
| shadcn CLI | 4.1.1 | `npx shadcn@latest init` |
| @fontsource/poppins | 5.2.7 | Static weights only |
| @fontsource-variable/inter | 5.2.8 | Variable font |
| @fontsource-variable/jetbrains-mono | 5.2.8 | Variable font |
| vitest | 4.1.2 | For unit/component tests |
| @playwright/test | 1.58.2 | For E2E tests |
| typescript | 6.0.2 | Strict mode |
| zod | 4.3.6 | Check compatibility with Astro's bundled version |

### What This Story Does NOT Include

- No layout components (Story 1.4)
- No design tokens beyond font-family definitions — colour scales, semantic colours, spacing, border-radius, shadows, and responsive type scale are all Story 1.2 scope
- No content collection Zod schemas (Story 1.3)
- No page templates or real pages beyond a minimal index.astro
- No navigation components (Stories 1.5-1.8)
- No test files — just the directory structure (Story 8.1)
- No CI/CD pipeline (Story 8.4)

### Project Structure Notes

The directory structure MUST match the architecture specification exactly. Key points:
- `src/components/` has 8 domain subfolders, not a flat structure
- `src/content/` has 6 collection subdirectories
- `src/assets/` has brand/, images/, icons/ subdirectories
- `tests/` is at project root (not src/), with unit/, component/, e2e/ subdirectories
- `public/` contains favicon.svg, robots.txt (allow all, disallow /api/)
- `.github/workflows/` directory created but ci.yml not implemented until Story 8.4

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Project Structure, Tech Stack, Content Collections, Path Aliases, Naming Conventions]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.1 acceptance criteria and BDD scenarios]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Design System Foundation, Colour Tokens, Typography, Spacing]
- [Source: _bmad-output/planning-artifacts/brand-identity.md — Logo variants, colour system]
- [Source: docs/project-context.md — Tech stack summary, brand identity, architecture decisions]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Astro `npm create` CLI hangs in non-interactive shells — resolved by manual project scaffolding (package.json + astro.config.mjs + tsconfig.json)
- shadcn `npx shadcn@latest init -y -d` hung during dependency install phase — components.json was created successfully; deps were pre-installed manually; aliases corrected from `@/components/components` to `@/components`
- Astro 6 requires content config at `src/content.config.ts` (not `src/content/config.ts`) — LegacyContentConfigError resolved by moving file
- shadcn init modified globals.css with Geist font references and `@theme inline` overrides — cleaned up to use Poppins/Inter per brand spec
- `curl` fails in Windows bash shell to connect to localhost dev server — used `powershell Invoke-WebRequest` for HTML validation

### Completion Notes List

- All 7 acceptance criteria satisfied
- Astro 6.1.1 + React 19 + Tailwind CSS v4.2.2 + Vercel adapter + shadcn/ui + Resend installed
- Full directory structure with 8 component subfolders, 6 content collection dirs, 4 asset dirs, 3 test dirs
- 6 path aliases configured in tsconfig.json (extends astro/tsconfigs/strict)
- Brand SVGs copied to src/assets/brand/, favicon at public/favicon.svg
- .env.example with 4 documented variables, .gitignore, robots.txt
- cn() utility, seo/divisions/email placeholders, content.config.ts placeholder
- `npm run dev` starts clean on port 4321, `npm run build` produces static output successfully
- shadcn CSS variables (neutral oklch) present as placeholder — will be replaced with GRCL brand colours in Story 1.2
- No tests authored: test framework (vitest/playwright) is Story 8.1 scope

### Review Findings

- [x] [Review][Decision] shadcn init CSS pollution in globals.css — RESOLVED: stripped to spec template, shadcn scaffolding removed
- [x] [Review][Decision] Brand SVGs + favicon use Google Fonts @import — RESOLVED: converted all text to paths via opentype.js
- [x] [Review][Patch] @apply in globals.css violates CLAUDE.md — FIXED: globals.css stripped to spec template
- [x] [Review][Patch] @fontsource-variable/geist unused dependency — FIXED: removed from package.json
- [x] [Review][Patch] Missing Poppins 300 weight import — FIXED: added to globals.css
- [x] [Review][Patch] src/components/ui/ missing .gitkeep — FIXED: .gitkeep added
- [x] [Review][Patch] components.json hooks alias @/lib/hooks — FIXED: directory created with .gitkeep
- [x] [Review][Patch] shadcn listed as runtime dependency — FIXED: moved to devDependencies
- [x] [Review][Defer] Missing SEO metadata on index.astro — deferred, Story 1.4+ scope
- [x] [Review][Defer] robots.txt missing Sitemap directive — deferred, sitemap doesn't exist yet
- [x] [Review][Defer] index.astro doesn't use PageLayout — deferred, PageLayout is Story 1.4
- [x] [Review][Defer] Architecture doc references old src/content/config.ts path — deferred, doc inconsistency not code bug
- [x] [Review][Defer] Color tokens are neutral/achromatic — deferred, explicitly Story 1.2 per dev notes

### Change Log

- 2026-03-28: Story 1.1 implementation complete — project initialized with full toolchain and directory structure
- 2026-03-28: Code review completed — 8 findings patched, 5 deferred, 12 dismissed. globals.css stripped to spec template, brand SVGs converted to paths, Geist font removed, Poppins 300 added, shadcn moved to devDeps, missing dirs created

### File List

New files:
- package.json
- package-lock.json
- tsconfig.json
- astro.config.mjs
- components.json
- .gitignore
- .env.example
- src/pages/index.astro
- src/styles/globals.css
- src/content.config.ts
- src/lib/utils.ts
- src/lib/seo.ts
- src/lib/divisions.ts
- src/lib/email.ts
- src/assets/brand/logo-primary.svg
- src/assets/brand/logo-reversed.svg
- src/assets/brand/logo-monogram.svg
- src/assets/brand/logo-monogram-reversed.svg
- public/favicon.svg
- public/robots.txt
- .github/workflows/.gitkeep
- src/components/{ui,layout,navigation,divisions,insights,contact,search,shared}/.gitkeep
- src/content/{divisions,clusters,articles,team,credentials,pages}/.gitkeep
- src/assets/{divisions,team,hero}/.gitkeep
- src/layouts/.gitkeep
- tests/{unit,component,e2e}/.gitkeep
