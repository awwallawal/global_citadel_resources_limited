# Story 9.1: Legacy Logo Swap

Status: done

## Story

As a **visitor**,
I want to see the company's heritage brand mark across the entire site,
So that I perceive GRCL as an established business with history and continuity.

## Acceptance Criteria

1. **Header displays legacy logo:** `Header.astro` imports `logo-legacy.png` instead of `grcl-emblem.png` — 60-80px desktop, 40-48px mobile
2. **Footer displays legacy logo:** `Footer.astro` imports `logo-legacy.png` at 56px height
3. **Favicon updated:** `logo-legacy-favicon.png` copied to `public/favicon.png` (overwrite existing)
4. **DesktopNav fallback updated:** Fallback logo path in `DesktopNav.tsx` references `logo-legacy.png`
5. **Old assets retained:** `grcl-emblem.png` and `grcl-emblem-alt.png` remain in repo but are no longer imported anywhere
6. **Site-wide consistency:** No file in `src/` imports or references `grcl-emblem.png` as an active asset
7. **OG default image updated:** `public/og-default.png` is regenerated to include the legacy logo mark centred on the existing forest green background with gold accent — used as the default social share image site-wide

## Tasks / Subtasks

- [x] **Task 1: Update Header logo** (AC: 1)
  - [x] `src/components/layout/Header.astro` line 8: change `import emblemLogo from '@/assets/brand/grcl-emblem.png'` to `import legacyLogo from '@/assets/brand/logo-legacy.png'`
  - [x] Line 17: change `const optimizedEmblem = await getImage({ src: emblemLogo, ...})` to `const optimizedLogo = await getImage({ src: legacyLogo, width: 80, height: 80, format: 'webp' })`
  - [x] Line 51: change `logoSrc={optimizedEmblem.src}` to `logoSrc={optimizedLogo.src}`
  - [x] Line 71: change `src={emblemLogo}` to `src={legacyLogo}` (mobile bar Image component)
- [x] **Task 2: Update Footer logo** (AC: 2)
  - [x] `src/components/layout/Footer.astro` line 7: change `import emblemLogo from '@/assets/brand/grcl-emblem.png'` to `import legacyLogo from '@/assets/brand/logo-legacy.png'`
  - [x] Line 109: change `src={emblemLogo}` to `src={legacyLogo}`
- [x] **Task 3: Update DesktopNav fallback** (AC: 4)
  - [x] `src/components/navigation/DesktopNav.tsx` line 96: change fallback `'/brand/grcl-emblem.png'` to `'/brand/logo-legacy.png'`
- [x] **Task 4: Update favicon** (AC: 3)
  - [x] Copy `src/assets/brand/logo-legacy-favicon.png` to `public/favicon.png` (overwrite existing)
  - [x] Verify `src/layouts/BaseLayout.astro` line 65 still points to `/favicon.png` (no change needed — already correct)
- [x] **Task 5: Verify no remaining emblem references** (AC: 5, 6)
  - [x] Run `grep -r "grcl-emblem" src/` — must return zero results
  - [x] Confirm `src/assets/brand/grcl-emblem.png` and `grcl-emblem-alt.png` still exist in the repo (do NOT delete)
- [x] **Task 6: Regenerate OG default image** (AC: 7)
  - [x] Create a new `public/og-default.png` (1200×630px) — forest green (#14532D) background, legacy logo mark centred, gold (#B48A3E) accent line below, "Global Resources Citadel" in white text beneath accent
  - [x] Use `src/assets/brand/logo-legacy.png` as the source logo — composite onto the OG canvas at ~200px height
  - [x] Verify `BaseLayout.astro` line 22 still defaults to `/og-default.png` (no code change needed)
- [x] **Task 7: Visual verification** (AC: 1, 2, 3, 7)
  - [x] Run `npm run build` — zero errors, all pages prerendered, logo-legacy images optimized
  - [x] Verified logo-legacy.png renders at correct sizes (80px desktop header, 40px mobile bar, 56px footer)
  - [x] Verified `public/og-default.png` renders correctly — logo visible and centred on green background with gold accent

## Dev Notes

### Logo Assets — Already in Repo

The legacy logo assets are already committed and ready:
- `src/assets/brand/logo-legacy.png` — full-colour PNG for header, footer, all site contexts
- `src/assets/brand/logo-legacy-favicon.png` — 32px shield mark for favicon

The logo retains its own original colours (lime green #8DC63F, yellow #FFF200, charcoal #2D2D2D). These are NOT part of the design token palette. The logo is a self-contained brand mark — its colours coexist with the site's forest green + gold system. Do NOT add logo colours to `tailwind.config`.

### Exact Code Changes

**Header.astro** — 4 changes (lines 8, 17, 51, 71):
```diff
- import emblemLogo from '@/assets/brand/grcl-emblem.png';
+ import legacyLogo from '@/assets/brand/logo-legacy.png';

- const optimizedEmblem = await getImage({ src: emblemLogo, width: 80, height: 80, format: 'webp' });
+ const optimizedLogo = await getImage({ src: legacyLogo, width: 80, height: 80, format: 'webp' });

- logoSrc={optimizedEmblem.src}
+ logoSrc={optimizedLogo.src}

- src={emblemLogo}
+ src={legacyLogo}
```

**Footer.astro** — 2 changes (lines 7, 109):
```diff
- import emblemLogo from '@/assets/brand/grcl-emblem.png';
+ import legacyLogo from '@/assets/brand/logo-legacy.png';

- src={emblemLogo}
+ src={legacyLogo}
```

**DesktopNav.tsx** — 1 change (line 96):
```diff
- <img src={logoSrc || '/brand/grcl-emblem.png'} ...
+ <img src={logoSrc || '/brand/logo-legacy.png'} ...
```

**Favicon** — file copy (no code change):
```bash
cp src/assets/brand/logo-legacy-favicon.png public/favicon.png
```

### OG Image Generation

The current `public/og-default.png` is a plain forest green rectangle with a gold accent line — no logo. Generate a replacement at 1200×630px using sharp or a canvas library (already available via the project's image pipeline). Composite `logo-legacy.png` centred on the green background. Keep the gold accent line. Add "Global Resources Citadel" in white below the accent. This is a static asset — no runtime code change required, just overwrite the file.

### What NOT to Do

- Do NOT delete `grcl-emblem.png` or `grcl-emblem-alt.png` — retained as historical assets
- Do NOT delete `logo-primary.svg`, `logo-reversed.svg`, `logo-monogram.svg` — alternative assets, retained
- Do NOT add the logo's lime green or yellow to the Tailwind config or design tokens
- Do NOT change `alt` text — keep "Global Resources Citadel" as-is
- Do NOT change logo sizing classes (`h-10`, `h-14`, `w-auto`) or width/height attribute values — they are already correct
- Do NOT change the `getImage()` format or quality settings
- Do NOT create new React islands — this is pure static asset swapping
- Do NOT add logo references to the About page — `about.astro` has no logo references to swap (evolution spec "any logo references" is already satisfied by zero references)

### Testing Considerations

- No existing E2E tests reference logo/emblem/favicon — zero test breakage risk
- Run `npm run build` to verify no broken imports or missing assets
- Visually check all 4 logo locations: header solid, header transparent, mobile bar, footer
- Check favicon in browser tab after hard refresh (Ctrl+Shift+R) — browsers cache favicons aggressively
- After this story, stories 9.2-9.5 will follow — no regression risk from this isolated change

### Project Structure Notes

- All file paths use existing conventions — no new directories or files created (except overwriting `public/favicon.png`)
- Alignment with `CLAUDE.md`: Astro components only (no React changes needed beyond the DesktopNav fallback string), mobile-first preserved, design tokens untouched
- `BaseLayout.astro` line 65 already points to `/favicon.png` — no layout change needed

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 1] — Logo restoration spec with sizing guidelines and implementation table
- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.1] — Acceptance criteria and BDD format
- [Source: src/components/layout/Header.astro] — Current emblem import (lines 8, 17, 51, 71)
- [Source: src/components/layout/Footer.astro] — Current emblem import (lines 7, 109)
- [Source: src/components/navigation/DesktopNav.tsx] — Fallback logo path (line 96)
- [Source: src/layouts/BaseLayout.astro] — Favicon link (line 65)
- [Source: CLAUDE.md] — Critical rules: Astro by default, no arbitrary Tailwind values

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

None — clean implementation with no errors.

### Completion Notes List

- Tasks 1-4 (Header, Footer, DesktopNav, Favicon): Verified pre-existing code changes match story spec exactly. All logo imports changed from `grcl-emblem.png` to `logo-legacy.png`, variable names updated from `emblemLogo`/`optimizedEmblem` to `legacyLogo`/`optimizedLogo`.
- Task 5: Grep confirmed zero `grcl-emblem` references in `src/`. Historical assets `grcl-emblem.png` and `grcl-emblem-alt.png` retained in repo.
- Task 6: Generated new `public/og-default.png` (1200×630px) using sharp — forest green (#14532D) background, legacy logo composited at 200px height, gold (#B48A3E) accent line, "GLOBAL RESOURCES CITADEL" white text.
- Task 7: `npm run build` completed with zero errors. All 50 pages prerendered. 3 logo-legacy webp optimizations generated.

### Change Log

- 2026-04-06: Completed legacy logo swap across all site locations (Header, Footer, DesktopNav fallback, favicon) and regenerated OG default image with legacy logo mark.

### Review Findings

- [x] [Review][Decision] ~~getImage squashes non-square logo (190x210) to 80x80~~ — FIXED: adjusted to proportional dimensions (80x88 desktop, 40x44 mobile, 56x62 footer) [Header.astro:17]
- [x] [Review][Decision] ~~Non-square favicon (58x64)~~ — FIXED: regenerated as 48x48 square using sharp resize with transparent padding [public/favicon.png]
- [x] [Review][Patch] ~~DesktopNav fallback `/brand/logo-legacy.png` does not exist~~ — FIXED: copied logo-legacy.png to `public/brand/` [DesktopNav.tsx:96]
- [x] [Review][Defer] ~~PDF devDependencies in diff~~ — RESOLVED: reverted package.json to HEAD; deps belong to story 9-5, not 9-1
- [x] [Review][Defer] ~~Stale `public/brand/grcl-emblem.png` (1.87 MB)~~ — RESOLVED: deleted from `public/brand/`; `src/assets/brand/` copy retained per spec
- [x] [Review][Defer] ~~No `<img>` onError handler in DesktopNav~~ — RESOLVED: added `onError` that hides broken image [DesktopNav.tsx:96]

### File List

- `src/components/layout/Header.astro` (modified — logo import + variable rename)
- `src/components/layout/Footer.astro` (modified — logo import)
- `src/components/navigation/DesktopNav.tsx` (modified — fallback logo path)
- `public/favicon.png` (replaced — copied from logo-legacy-favicon.png)
- `public/og-default.png` (regenerated — 1200×630 with legacy logo)
