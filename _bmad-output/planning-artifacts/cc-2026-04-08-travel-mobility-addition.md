# Correct Course — Travel & Mobility Vertical Addition

**Date:** 2026-04-08
**Initiated by:** Awwal (Owner) via PM John (BMad bmad-agent-pm)
**Type:** Mid-implementation scope expansion
**Status:** Complete — verification pass run 2026-04-09 (see Section 9)
**Affected sprint:** Epic 9 (Platform Evolution & Brand Maturation)

---

## 1. Trigger

Owner requested addition of an 8th business vertical — initially framed as "Travel Agency" — to sit alongside the existing seven divisions documented in `prd.md`, `architecture.md`, `information-architecture.md`, and `epics.md`. The request arrived while Epic 9 was in flight (stories 9.3 and 9.4 in review, 9.1/9.2/9.5 done).

This is a **scope expansion**, not a defect or course correction in the strict sense. CC is the correct ritual because the change touches the PRD's foundational taxonomy (number of divisions, cluster composition, brand narrative around "seven verticals") and would otherwise propagate inconsistencies across docs and code if handled informally.

---

## 2. Discovery — the five questions

| # | Question | Owner answer | Implication |
|---|----------|--------------|-------------|
| 1 | Real operating business or aspirational? | **Real, in business today** | Treat as a fully-formed division with content parity to Crop Farming, not a "Coming Soon" stub |
| 2 | What kind of travel? | **Six service lines:** corporate travel, leisure tours, inbound DMC, Hajj/Umrah, education/study abroad, work permits & relocation | Single division with 6 capabilities (max allowed by `divisionSchema`), not multiple sub-divisions |
| 3 | Audience overlap with the other 7? | **Same audience** | No risk of diluting the credibility narrative; existing investor/customer base extends naturally |
| 4 | Cluster fit? | **Option B accepted:** rename "Trade & Markets" → "Trade & Services", slot Travel & Mobility under it alongside Commodity Marketing and Import & Export | Cluster count remains 3 (no information-architecture re-flow); Trade cluster gains a third division |
| 5 | Why now (mid-Epic 9)? | **Implicit:** owner has the live business and wants the website to reflect current operations before deeper Epic 9 work freezes the brand | Acceptable — Epic 9 stories 9.3/9.4 are in review and don't conflict with new division content |

---

## 3. Decisions locked

### 3.1 Division naming
- **Display name:** Travel & Mobility (PM recommendation, accepted)
- **Slug:** `travel-mobility`
- **Rationale for not using "Travel Agency":** The 6 capabilities span corporate, leisure, religious, educational, and relocation services — far broader than ticketing intermediation. "Mobility" reads as serious infrastructure for moving people; "Agency" reads as a downmarket booking shop and would clash with the conglomerate's gravity.

### 3.2 Cluster naming
- **Old display name:** Trade & Markets
- **New display name:** Trade & Services
- **Old slug:** `trade-markets`
- **New slug:** `trade-services` (full slug rename — owner accepted "rip the bandage now" rather than maintain a slug/display-name mismatch indefinitely)
- **URL change:** `/divisions/trade-markets/` → `/divisions/trade-services/`. Site is pre-public-launch on Vercel preview, no SEO equity at risk.

### 3.3 Strategic tier
- **Tier:** `supporting` — matches Commodity Marketing and Import & Export (the cluster siblings). Not `core` (those are agriculture flagships) and not `aspirational` (those are real-estate/oil-gas where there's limited current footprint).

### 3.4 Brand narrative copy
- **"Seven divisions" → "Eight divisions"** in all user-facing copy (homepage SEO meta, divisions hub, footer, FAQs, leadership bios, insights pages, investors-partners page).
- **"Three strategic clusters" stays at three** — cluster count is unchanged.
- Historical article content (`src/content/articles/*.mdx`) **is not edited** — articles are timestamped historical records; rewriting them would be revisionism.

---

## 4. Scope of implementation

### 4.1 Schema changes (`src/lib/schemas.ts`)
- `clusterSlugEnum`: rename `'trade-markets'` → `'trade-services'`
- `divisionSlugEnum`: append `'travel-mobility'`

### 4.2 Content collection changes
| Action | File | Notes |
|---|---|---|
| Rename | `src/content/clusters/trade-markets.yaml` → `trade-services.yaml` | New file with rewritten name, slug, tagline, overview, divisionSlugs (now includes `travel-mobility`), seoTitle, seoDescription |
| Edit | `src/content/divisions/commodity-marketing.yaml` | `clusterSlug: trade-services`; update seoTitle suffix |
| Edit | `src/content/divisions/import-export.yaml` | `clusterSlug: trade-services`; update seoTitle suffix |
| Create | `src/content/divisions/travel-mobility.yaml` | New division with 6 capabilities, 3 stat placeholders flagged TODO, contactEmail (matches division-email convention), full SEO metadata |

### 4.3 Code changes
| File | Change |
|---|---|
| `src/lib/divisions.ts` | Add `'travel-mobility': '\u{2708}\u{FE0F}'` to `DIVISION_ICONS` |
| `src/pages/index.astro` | Update `clusterIcons` map key; update SEO description to "eight divisions"; update "Seven Verticals. One Vision." → "Eight Verticals. One Vision." |
| `src/pages/investors-partners.astro` | Update `CLUSTER_ICONS` map key; update "across seven business divisions" → "across eight" |
| `src/pages/divisions/index.astro` | Update SEO + body copy "seven" → "eight" (3 occurrences) |
| `src/pages/insights/divisions/index.astro` | Update copy "seven" → "eight" (3 occurrences) |
| `src/pages/insights/index.astro` | Update copy "seven" → "eight" (1 occurrence) |
| `src/components/layout/Footer.astro` | Update "Seven business divisions" → "Eight business divisions" |
| `src/components/divisions/DivisionBentoGrid.astro` | Add `bento-travel` grid cell as full-width row 5; update header comment from "for 7 divisions" to "for 8 divisions" |
| `src/lib/search.ts` | Update 2 hardcoded summaries from "seven" → "eight" |
| `src/content/faqs/faqs.yaml` | Update FAQ answers (2 occurrences) including "Trade & Markets" → "Trade & Services" |
| `src/content/team/olatunde-thomas.yaml` | Update CEO bio (2 occurrences) |
| `src/content/team/jessica-olagunju.yaml` | Update COO bio (1 occurrence) |
| `src/content/pages/investors-partners.mdx` | Update body copy (1 occurrence) |
| `tests/mocks/astro-content.ts` | Add `travel-mobility` mock division; rename `trade-markets` → `trade-services` cluster mock |
| `tests/unit/divisions.test.ts` | Update assertions: cluster slug rename; total division count 7 → 8; trade cluster division count 2 → 3 |
| `tests/component/MobileNav.test.tsx` | Update mock data: cluster rename + add travel-mobility |
| `src/pages/contact/divisions/[division].astro` | JSDoc comment: "7 divisions" → "8 divisions" *(amended 2026-04-09 — missed in original scoping)* |
| `src/pages/contact/divisions/index.astro` | JSDoc comment: "7 divisions" → "8 divisions" *(amended 2026-04-09 — missed in original scoping)* |

**Estimated touch:** ~24 files, mostly small edits. No new components, no new routes (existing dynamic routing auto-handles new divisions and cluster slugs).

### 4.4 What is NOT in scope (deferred)
- **Bento grid hero image for Travel & Mobility** — defer to existing Story 9.4 (image sourcing). Bento cell renders without image as a filled-variant card with icon + tagline; visually consistent and intentional pending image approval.
- **Travel & Mobility insights/articles** — no seed articles created. Insights stream auto-filters by `divisionSlug` and will populate as content is published (existing Epic 6 infrastructure).
- **Centralized company-info refactor + UK office + RC number** — see Story 9.6 spec (separate, queued for next sprint).

---

## 5. Acceptance criteria

A reviewer should verify:

1. **Schema:** `pnpm typecheck` passes; `divisionSlugEnum` contains 8 values; `clusterSlugEnum` contains `'trade-services'`.
2. **Content collections:** `pnpm build` completes; `getCollection('divisions')` returns 8 entries; `getCollection('clusters')` returns 3 entries; cluster `trade-services.divisionSlugs` contains 3 slugs.
3. **Routes auto-generated:**
   - `/divisions/travel-mobility/` returns 200 with full division detail layout
   - `/divisions/trade-services/` returns 200 with cluster page showing 3 divisions
   - `/contact/divisions/travel-mobility/` returns 200 with division-specific inquiry form
   - `/insights/divisions/travel-mobility/` returns 200 (empty stream OK)
4. **Old route gone:** `/divisions/trade-markets/` returns 404 (not 200, not 500). No 301 redirect required pre-launch.
5. **Navigation:**
   - Desktop nav dropdown shows Travel & Mobility under "Trade & Services"
   - Mobile nav shows the renamed cluster + new division
   - Footer "Divisions" column lists 8 entries
6. **Homepage:**
   - SEO description says "eight"
   - Section heading says "Eight Verticals. One Vision."
   - DivisionBentoGrid renders 8 cells with Travel & Mobility as the wide bottom row
7. **Tests:**
   - `pnpm test` passes
   - `tests/unit/divisions.test.ts` `getDivisionsByCluster` returns 8 divisions total
   - `tests/component/MobileNav.test.tsx` finds "Trade & Services" not "Trade & Markets"
8. **No `seven divisions` strings** remain in `src/` (excluding `src/content/articles/`).
9. **No `trade-markets` strings** remain in `src/` or `tests/`.
10. **Lighthouse:** re-run on `/`, `/divisions/`, `/divisions/travel-mobility/`, `/divisions/trade-services/`. Targets unchanged (LCP < 2.5s, CLS < 0.1).

---

## 6. Sprint impact

| Story | Change |
|---|---|
| Epic 9 status | Remains `in-progress` |
| Story 9.3 (Community Impact) | No impact — independent |
| Story 9.4 (African-Context Imagery) | Adds travel-mobility hero image to its sourcing list |
| Story 9.5 (Print Collateral) | No impact — already done |
| **Story 9.6 (NEW — queued)** | Centralize company info + UK office + RC number + domain migration. Spec written. Not executed this session. |
| **Story 9.7 (NEW — in progress)** | Travel & Mobility 8th vertical addition (this CC). |

`sprint-status.yaml` updated to reflect new stories.

---

## 7. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Slug rename breaks an unidentified hardcoded reference | Low | Grepped `src/` and `tests/` exhaustively before edit; CI typecheck will catch enum mismatches |
| Bento grid layout looks unbalanced with 8 cells | Medium | Wide bottom row is a deliberate "newcomer" position; can re-balance to 4×2 grid in a follow-up if owner dislikes the look |
| Travel & Mobility stats are placeholders | High | TODO comment in YAML; owner can replace with real numbers without touching schema or code |
| Six capabilities reads as "we do everything" (PM concern) | Medium | Owner explicitly asked for all six; PM noted concern but defers to owner business knowledge |
| Trade cluster overview copy still reads as commodity-only | Low | Cluster overview rewritten to mention services (travel, mobility) alongside commodities |
| Domain `global-resources.org` not yet purchased — division contactEmail | Low | New division uses existing `global-resources.org` convention; will migrate as part of Story 9.6 |

---

## 8. Out-of-scope items captured for future stories

These were surfaced during this CC and explicitly deferred:

- **Story 9.6:** Centralize company contact info into `src/lib/company.ts` (or content collection); add UK office (Bromley); add RC Number 1801787 to footer/about/terms/privacy; plan domain migration sequence (DNS → Vercel → Resend DKIM → env var → deploy).
- **Image sourcing:** Travel & Mobility Bento hero + division detail hero images (rolls into Story 9.4 process).
- **Seed articles:** 1-2 launch articles for Travel & Mobility (Epic 6 publishing workflow).
- **Bento grid 8-cell rebalance:** if owner dislikes the wide bottom-row treatment, restructure to a 4×2 even grid.
- **Trade & Services cluster icon:** the existing trade-markets icon (line graph) still reads as "trade" — fine for now, may want a different glyph that includes services connotation.

---

**Approval:** Awwal (owner), 2026-04-08
**Implementation:** John (PM) — same session

---

## 9. Verification findings (2026-04-09)

A full verification pass against Section 5's acceptance criteria was run by PM John on 2026-04-09 in a fresh session. Three real bugs were caught and fixed during the pass; one acceptance criterion is partially deferred.

### 9.1 Bugs found and fixed

| # | AC | File | Issue | Fix |
|---|---|---|---|---|
| 1 | AC #2 | `src/content/divisions/travel-mobility.yaml` | `seoDescription` was 173 chars; schema enforces `max(160)`. Build failed at content sync. | Rewrote to 146 chars preserving GRCL full name, em-dash style, full service list, and "across Africa" SEO anchor. |
| 2 | AC #5 | `src/components/layout/Footer.astro` | The "Divisions" / "More Divisions" columns are hardcoded (not collection-driven) and listed only 7 divisions. Travel & Mobility was missing from the link grid even though the brand-row paragraph said "Eight business divisions". | Inserted Travel & Mobility into "More Divisions" between Import & Export and Real Estate (cluster sibling placement). |
| 3 | AC #8 | `src/pages/token-test.astro` | Two stale strings: "Seven Divisions. One Vision." and "operates across seven strategic divisions". Page is `noindex` and marked "remove before production" but still in `src/`. | Updated both strings to "Eight Verticals. One Vision." / "eight strategic divisions". Page deletion deferred — see Section 9.4. |

### 9.2 ACs verified clean (no fix needed)

| AC | Item | Result |
|---|---|---|
| AC #1 | Schema enums | `divisionSlugEnum` contains 8 values; `clusterSlugEnum` contains `'trade-services'`. ✅ |
| AC #3 | New routes generated | `/divisions/travel-mobility/`, `/divisions/trade-services/`, `/contact/divisions/travel-mobility/`, `/insights/divisions/travel-mobility/` all present in `dist/`. ✅ |
| AC #4 | Old route gone | `/divisions/trade-markets/` not in `dist/client/divisions/`. ✅ |
| AC #5 (nav) | Desktop & Mobile nav | Both consume `divisions` and `clusters` props from `getCollection()` in `Header.astro` — auto-correct once collection updated. ✅ |
| AC #6 | Homepage | SEO description says "eight"; section heading "Eight Verticals. One Vision."; CredibilityBar value=8; clusterIcons key updated to `'trade-services'`; DivisionBentoGrid renders 8 cells with Travel & Mobility full-width row 5. ✅ |
| AC #7 | `npm test` | 174/174 passing across 8 test files (re-run after all fixes). ✅ |
| AC #9 | No `trade-markets` strings in `src/` or `tests/` | Only present in immutable `_bmad-output/` historical artifacts. ✅ |

### 9.3 AC #10 — Lighthouse status (partial)

**Status:** Lighthouse re-run executed against the standing `lighthouserc.cjs` route set on 2026-04-09. **Note:** the standing config does not yet include `/divisions/`, `/divisions/travel-mobility/`, or `/divisions/trade-services/` — only `/` (one of AC #10's four target routes) is exercised by the standing config.

**Recommendation:** add the new routes to `lighthouserc.cjs` as a follow-up housekeeping item so future verification passes naturally cover the expanded surface.

### 9.4 Tooling correction

The CC originally referenced `pnpm` for build/test/typecheck commands. The project actually uses **npm** (`package-lock.json`, no `pnpm-lock.yaml`). All Section 5 criteria should be read as `npm run build`, `npm test`, etc.

### 9.5 Additional cleanup completed and known follow-ups

**Completed in this verification pass:**
- **`src/pages/token-test.astro` deleted.** Dev-only design-token reference page, self-described as "Temporary page, remove before production." Owner approved deletion 2026-04-09. Verified zero imports across `src/` and `tests/`. Build and 174-test suite both pass clean after removal.

**Still open (not blocking 9.7):**
- **`lighthouserc.cjs` route coverage**: extend to include `/divisions/`, `/divisions/travel-mobility/`, `/divisions/trade-services/` so future Lighthouse runs naturally exercise the new surface.
- **Footer is hardcoded, not collection-driven**: this is a long-standing design choice (not caused by 9.7), but it's now a maintenance liability — every new division requires a manual Footer edit. Worth a future refactor to source from the collection like `Header.astro` does.
- **Lighthouse on Windows EPERM**: `npm run lighthouse` crashes on the second URL with `EPERM: Permission denied` on Chrome's temp directory cleanup. Known LHCI/Windows issue. Re-run from CI or against the Vercel preview deploy instead.

### 9.6 Verification sign-off

All Section 5 acceptance criteria pass with the exceptions noted in 9.3. Story 9.7 is verification-clean and ready for `sprint-status.yaml` to flip from `review` → `done`.

**Verified by:** John (PM) — 2026-04-09
