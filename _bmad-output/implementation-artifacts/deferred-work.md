# Deferred Work

## Deferred from: code review of 1-1-project-initialization-toolchain-setup (2026-03-28)

- Missing SEO metadata on index.astro — PageLayout + SEO is Story 1.4+ scope
- robots.txt missing Sitemap directive — Sitemap doesn't exist yet
- index.astro doesn't use PageLayout — PageLayout is Story 1.4
- Architecture doc references old src/content/config.ts path — Astro 6 correctly uses src/content.config.ts, doc is stale
- Color tokens are neutral/achromatic, no brand colors — Explicitly deferred to Story 1.2 per dev notes
- FAQ Section

## Deferred from: code review of 1-2-design-token-system-typography (2026-03-28)

- Border radius tokens use px instead of rem — won't scale proportionally with user-enlarged browser base font-size; accessibility concern for the stated Nigerian mobile audience. Revisit during Epic 8 accessibility audit.
- Brand-identity.md vs UX spec colour numbering conflict — brand-identity.md assigns #15803D to Primary 700 and #16A34A to Primary 600, while UX spec (authoritative) reverses them. Documentation discrepancy, not a code bug.

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

- Empty cluster column renders if a cluster has zero matching divisions — content validation concern, not caused by this change
- DesktopNav hydrated via client:load on mobile viewports where it's hidden — wasted hydration; could use client:media but is an architectural trade-off accepted by the spec
- prefers-reduced-motion CSS !important in globals.css conflicts with motion-safe: Tailwind strategy — pre-existing, not introduced by Story 1.5
- Long taglines (up to 150 chars) may cause excessively tall dropdown columns — no line-clamp applied; content governance concern
