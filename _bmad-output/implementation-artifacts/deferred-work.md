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

## Deferred from: code review of 2-4-latest-insights-contact-cta (2026-03-31)

- Featured InsightCard justify-end has no visible effect without min-height/background image — post-MVP enhancement when editorial assets available
- streamLabels raw slug fallback displays kebab-case to users — add title-case transform when more streams are added
- No visited state differentiation on InsightCards — content hub UX enhancement for Epic 8
- Date parsing timezone consistency — Zod schema enforces format, low risk for current data

## Deferred from: code review of 4-1-contact-hub-inquiry-routing (2026-04-02)

- Gold eyebrow `text-gold-600` on `bg-primary-50` may be borderline WCAG AA for `text-xs` (12px) — systemic pattern shared across hub pages, review during Epic 8 accessibility audit
- ContactInfoCard grid jumps from 1-col to 3-col at `md` (768px) — no `sm` intermediate; minor responsive gap on tablets
- Long email address in ContactInfoCard has no `overflow-wrap: anywhere` — not triggered with current 33-char address but no defensive guard for longer values
- Hours line in Head Office card uses `text-xs` while address lines inherit `text-sm` — intentional visual hierarchy for supplementary info

## Deferred from: code review of 3-3-division-detail-pages (2026-04-02)

- `parentCluster!` non-null assertion in getStaticPaths — safe due to Zod enum + `validateContentIntegrity()` build-time guard, but a `.find()` with graceful error would be more robust
- Breadcrumbs computed in both `[slug].astro` (for JSON-LD) and `DivisionLayout.astro` (for rendered nav) — currently identical but can diverge silently. Consider passing breadcrumbs as a prop.
- StatCounter visual flash — renders final value before hydration, then resets to 0 and animates up. Initialize `useState(0)` instead of `useState(null)` to fix. Pre-existing.
- StatCounter layout shift with large numbers (e.g., 500,000) — `toLocaleString()` formatting causes width jumps as digits cross comma boundaries during animation. Pre-existing.
- Import path inconsistency `@/content/config` vs `@/content.config` in `src/lib/divisions.ts` — pre-existing, could break if old re-export is removed
- Stats grid orphan on mobile — all 7 divisions have 3 stats, 3rd item sits alone in 2nd row of 2-col grid. Design consideration, not a bug.
- CapabilityCard icon fallback renders `●` for unmapped Lucide icon names — 24 of 1000+ Lucide icons mapped. Swap to SVG icons when design assets available.

## Deferred from: code review of 3-2-division-cluster-pages (2026-04-02)

- Hardcoded SITE_URL fallback `'https://globalresourcescitadel.com'` in both page files — pre-existing pattern across codebase, not introduced by Story 3.2
- Slug collision risk between cluster slugs and division slugs in shared `[slug].astro` route — both enum sets are non-overlapping by design; add build-time assertion when Story 3.3 merges division paths into the same file
- Gold eyebrow `text-gold-600` contrast on dark gradient hero may be borderline WCAG AA (~3.7:1–4.2:1) — systemic pattern used across multiple pages, review during Epic 8 accessibility audit
- `article.id` used as URL slug may include subdirectory paths if articles are ever reorganized into subdirectories — pre-existing pattern, currently safe with flat file structure
- SeoMetadata type looseness (`Record<string, unknown>`) allows silent pass-through of extra keys to BaseLayout — pre-existing architectural pattern
- JSON-LD itemListElement unstable sort for divisions sharing the same sortOrder value — pre-existing, minor structured data inconsistency

## Deferred from: code review of 3-1-divisions-hub-page (2026-04-01)

- Division detail links 404 until Story 3.3 — expected forward dependency
- Emoji icons inconsistent across platforms/devices — swap to SVG icons when design assets available
- Verbose card accessible name (full tagline in link) — add aria-label during Epic 8 a11y audit
- 2-card clusters leave orphan column in 3-col desktop grid — design consideration, not a bug

## Deferred from: code review of 4-2-contact-by-division-directory-division-inquiry-forms (2026-04-03)

- `cluster!.data` non-null assertion in getStaticPaths — pre-existing pattern across codebase (also flagged in 3-3 review), safe due to Zod enum + build-time validation
- No CSRF protection on inquiry form — Story 4.4 will implement server-side submission with CSRF handling
- No `.max()` / `maxLength` on text inputs — Story 4.4 server-side payload limits will address this
- `accentColor` optional in cluster schema with silent amber fallback — pre-existing schema design, all 3 clusters currently define accentColor

## Deferred from: code review of 4-3-general-strategic-inquiry-forms (2026-04-03)

- Phone field accepts any string with no format validation — Story 4.4 server-side validation will address; consider regex or `.refine()` for client-side phone format
- `/investors-partners/` link in strategic sidebar will 404 — expected forward dependency on Epic 5 (Story 5.3)
- ~~Form state not reset after submission~~ — RESOLVED: Story 4.4 added handleReset() with success/error states

## Deferred from: code review of 4-4-form-submission-validation-email-processing (2026-04-03)

- Rate limiter Map grows unbounded — serverless cold starts mitigate; acceptable for MVP volume. Consider Redis/KV store for production scaling.
- Rate limiter ineffective across serverless cold starts — acknowledged in story dev notes; Vercel KV or Upstash Redis for production.
- `investor-institutional` inquiry type accepted by server but unreachable from client — future variant scaffolding, no harm.
- `getResendClient()` creates new Resend instance per email call — negligible overhead in serverless context.
- Missing `Allow` header on 405 response — RFC 7231 §6.5.5 nice-to-have.

## Deferred from: code review of 4-5-locations-page (2026-04-03)

- `-mt-6` negative margin coupling to SectionHeading internals — pre-existing pattern across pages (now removed from locations.astro but exists elsewhere)
- LocationCard `<h3>` elements without intermediate `<h2>` grouping for Head Office vs Operational Sites — minor with only 3 cards
- Border-left color-only distinction for head-office vs operational-site — Epic 8 a11y enhancement, add icon or text badge
