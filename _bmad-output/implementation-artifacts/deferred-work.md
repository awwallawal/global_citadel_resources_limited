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
