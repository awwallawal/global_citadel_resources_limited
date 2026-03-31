# Deferred Work

## Deferred from: code review of 1-1-project-initialization-toolchain-setup (2026-03-28)

- Missing SEO metadata on index.astro — PageLayout + SEO is Story 1.4+ scope
- robots.txt missing Sitemap directive — Sitemap doesn't exist yet
- index.astro doesn't use PageLayout — PageLayout is Story 1.4
- ~~Architecture doc references old src/content/config.ts path~~ — RESOLVED: fixed all references to src/content.config.ts (2026-03-29)
- Color tokens are neutral/achromatic, no brand colors — Explicitly deferred to Story 1.2 per dev notes
- ~~FAQ Section~~ — RESOLVED: FAQ content collection + FAQSection component + FAQAccordion island created. Integrated into Stories 2.1 (homepage) and 5.1 (about page). Planning docs updated. (2026-03-29)

## Deferred from: code review of 1-2-design-token-system-typography (2026-03-28)

- Border radius tokens use px instead of rem — won't scale proportionally with user-enlarged browser base font-size; accessibility concern for the stated Nigerian mobile audience. Revisit during Epic 8 accessibility audit.
- ~~Brand-identity.md vs UX spec colour numbering conflict~~ — RESOLVED: added clarifying note to brand-identity.md that UX spec is authoritative for token numbering (2026-03-29)

## Resolved from: code review of 1-3-content-collections-seed-data (2026-03-29)

All 3 deferred items were resolved during review:
- Bi-directional cluster↔division cross-validation — added `validateContentIntegrity()` in `src/lib/content-validation.ts`
- Slug vs filename mismatch — enforced via same validation function
- `pageSchema.lastUpdated` date format — added regex + refine to schema

## Resolved from: code review of 1-4-base-layouts-core-ui-components (2026-03-29)

All 4 deferred items were resolved during review:
- validateContentIntegrity() scaling — added singleton guard (`validated` flag), runs once per build
- PageHero breadcrumb slot overlap — added JSDoc documenting breadcrumb slot convention
- Cluster accentColor schema — constrained to `z.enum(['amber', 'copper', 'slate'])`
- Font fallback stacks — already resolved, `system-ui, sans-serif` fallbacks present in globals.css

## Deferred from: code review of 1-5-header-navigation-division-dropdown (2026-03-29)

- ~~Empty cluster column renders if a cluster has zero matching divisions~~ — RESOLVED: added .filter() guard to skip empty clusters in both DesktopNav and MobileNav (2026-03-29)
- DesktopNav hydrated via client:load on mobile viewports where it's hidden — wasted hydration; could use client:media but is an architectural trade-off accepted by the spec
- prefers-reduced-motion CSS !important in globals.css conflicts with motion-safe: Tailwind strategy — pre-existing, not introduced by Story 1.5
- ~~Long taglines (up to 150 chars) may cause excessively tall dropdown columns~~ — RESOLVED: taglines removed from dropdown during Story 1.5 review (compact names-only design) (2026-03-29)

## Deferred from: code review of 1-6-mobile-navigation (2026-03-29)

- isActive sub-route matching false positives — pre-existing pattern from Story 1.5, affects both desktop and mobile nav
- ~~Empty cluster groups render silently in mobile accordion~~ — RESOLVED: added .filter() guard in MobileNav (2026-03-29)
- prefers-reduced-motion only enforced via global CSS !important — pre-existing, no per-component motion-safe wrapping on Sheet/Accordion
- Division active state trailing-slash exact match depends on Astro trailingSlash config — Astro default handles it

## Deferred from: code review of 1-7-footer-navigation (2026-03-30)

- `tracking-widest` (0.1em) vs spec's 0.08em — no standard Tailwind token matches exactly, visual difference negligible (~0.24px at 12px font). Accept tracking-widest or add custom token during Epic 8 polish.
- No `aria-current="page"` on footer links — not in story AC, enhancement for future story or Epic 8 accessibility audit.

## Deferred from: code review of 1-8-breadcrumb-navigation (2026-03-30)

- Screen reader breadcrumb discontinuity on mobile truncation — ellipsis is aria-hidden, screen readers see gap with no cue. Standard truncation pattern; consider sr-only "skipped levels" text during Epic 8 a11y audit.
- focus-visible:outline-none used without fallback — codebase-wide pattern across all components, not introduced by Story 1.8. Review during Epic 8 accessibility audit.

## Deferred from: code review of 2-1-homepage-hero (2026-03-30)

- Hero `<section>` missing `aria-label` — unnamed landmark for assistive tech. Add during Epic 8 a11y audit.
- DesktopNav focus-visible ring offset color doesn't adapt for transparent mode (white gap on dark background). Cosmetic polish for Epic 8.

## Deferred from: code review of 2-2-divisions-bento-grid (2026-03-31)

- Emoji icons in bento grid render inconsistently across platforms — swap to inline SVG icons when design assets available
- Card accessible name too verbose (full tagline concatenated into link name) — add aria-label during Epic 8 a11y audit
- "Explore Division" link text differs from some spec sources saying "Learn More" — UX spec says "Explore", accept current text
