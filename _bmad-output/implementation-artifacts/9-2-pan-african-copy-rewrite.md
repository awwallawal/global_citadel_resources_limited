# Story 9.2: Pan-African Copy Rewrite

Status: done

## Story

As a **visitor**,
I want the platform's language to reflect a pan-African group headquartered in Nigeria,
So that I perceive GRCL as a company with continental ambition and scale.

## Acceptance Criteria

1. Homepage hero reads "Building Africa's Future From Nigeria's Strongest Foundations"
2. All 7 division YAML files have updated taglines, overviews, capabilities, and SEO metadata per spec Section 3.5
3. All 3 cluster YAML files have updated taglines, overviews, and SEO metadata per spec Section 3.6
4. About page (`about.astro` + `about.mdx`) reflects pan-African positioning with Nigerian grounding per spec Section 3.3
5. Investors & Partners page reflects pan-African investment opportunity framing per spec Section 3.7
6. Footer brand statement updated to "pan-African conglomerate headquartered in Lagos" per spec Section 3.9
7. SEO module (`seo.ts`) Organization JSON-LD description updated per spec Section 3.10
8. FAQ content: 6 corrections (including Abuja→Lagos HQ fix) + 2 new entries per spec Section 3.11
9. Credibility stat "6 Nigerian States" → "Operations Across West Africa"
10. Divisions hub body text and SEO updated per spec Section 3.4
11. Contact strategic page subtitle updated per spec Section 3.8
12. No legal pages changed — jurisdiction remains Nigerian
13. All pan-African language uses trajectory framing ("extending across," "growing presence") — no unsubstantiated operational claims
14. Homepage SEO title/description updated per spec Section 3.2

## Tasks / Subtasks

- [x] **Task 1: Update homepage copy** (AC: 1, 9, 14)
  - [x] `src/pages/index.astro` — Hero heading (line ~66): `"Building Nigeria's Future Across Seven Sectors"` → `"Building Africa's Future From Nigeria's Strongest Foundations"`
  - [x] Hero subtitle (line ~69): append `" across Africa's fastest-growing markets."` to existing subtitle
  - [x] Business Overview heading (line ~96): `"A Multi-Division Business Built for Scale"` → `"A Pan-African Business Built for Scale"`
  - [x] Business Overview subtitle (line ~94): replace `"to markets."` → `"to markets across the continent."` and `"for future growth."` → `"for Africa's next phase of growth."`
  - [x] Credibility stat (line ~145): `{ value: 6, label: 'Nigerian States' }` → `{ value: 6, suffix: '+', label: 'African Markets' }` — keeps numeric counter animation, reframes "6 Nigerian States" as "6+ African Markets" (trajectory framing; exact country count is secondary to the continental signal)
  - [x] Credibility stat (line ~146): `'Business Partners'` → `'Partners Across Africa'` (value `40` and suffix `+` stay unchanged)
  - [x] SEO title (line ~41): → `"Global Resources Citadel — Pan-African Conglomerate | Agriculture, Trade, Energy"`
  - [x] SEO description (line ~42): → `"A pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy. Seven business divisions serving Africa's fastest-growing markets."` — **NOTE:** spec says "Eight" but SRADA is not a division under Option A; corrected to "Seven" for consistency with stats and I&P page

- [x] **Task 2: Update About page** (AC: 4)
  - [x] `src/pages/about.astro` hero subtitle (line ~89): `"A diversified Nigerian conglomerate building integrated value chains across agriculture, trade, real estate, and energy."` → `"A pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy — from Nigeria's strongest foundations to Africa's fastest-growing markets."`
  - [x] `src/content/pages/about.mdx` seoTitle (line 3): → `"About Global Resources Citadel — Pan-African Conglomerate | Story, Mission, Leadership"`
  - [x] seoDescription (line 4): → `"Learn about Global Resources Citadel Limited, a pan-African conglomerate headquartered in Lagos with integrated operations across agriculture, trade, real estate, and energy."`
  - [x] mission (line 6): `"across Nigeria's key economic sectors"` → `"across Africa's key economic sectors — rooted in Nigeria's agricultural heartland and extending across the continent —"`
  - [x] vision (line 7): `"West Africa's most trusted"` → `"Africa's most trusted"` and append `" across the continent."` after `"we serve."`
  - [x] Sustainability value (line ~18-20): `"protect Nigeria's natural resources while driving long-term economic growth."` → `"protect Africa's natural resources while driving long-term economic growth across the continent."`
  - [x] Body ¶1 (line ~23): `"contribute meaningfully to Nigeria's economic development. From our origins in commercial agriculture, the Group has grown into a diversified conglomerate spanning seven business divisions organised into three strategic clusters."` → `"contribute meaningfully to economic development across Africa. Rooted in Nigeria — one of the continent's most dynamic economies — the Group has grown from its agricultural origins into a diversified conglomerate with operations and partnerships spanning West Africa and beyond."`
  - [x] Body ¶2 (line ~25): `"international commerce, real estate development, and energy. Each division is designed to be operationally self-sustaining while contributing to the Group's integrated supply chain."` → `"cross-border commerce, real estate development, and energy infrastructure. Each division serves markets that extend well beyond Nigeria's borders, connecting African producers to continental and global demand."`
  - [x] Body ¶3 (line ~27): `"that characterise emerging markets."` → `"that characterise emerging African markets."`
  - [x] Body ¶4 (line ~29): `"across Nigeria's most productive regions"` → `"across West Africa's most productive regions"` AND `"in one of Africa's most dynamic economies."` → `"across a continent defined by rapid growth and immense opportunity."`
  - [x] Group Structure body (line ~211): append `" — across multiple African markets."` to end of existing text

- [x] **Task 3: Update Divisions hub page** (AC: 10)
  - [x] `src/pages/divisions/index.astro` body text (line ~87): `"for Nigeria's future."` → `"for Africa's future."`
  - [x] SEO description (line ~43): → `"Explore Global Resources Citadel's seven business divisions — agriculture, agro-processing, commodity trading, real estate, import/export, and oil & gas — serving markets across Africa."`

- [x] **Task 4: Update Crop Farming division** (AC: 2)
  - [x] `src/content/divisions/crop-farming.yaml` tagline (line 5): `"Feeding Nigeria's future through sustainable, large-scale crop production"` → `"Feeding Africa's future through sustainable, large-scale crop production rooted in Nigeria's agricultural heartland"`
  - [x] Overview ¶1 (line 7): `"that serve both domestic food security and export markets."` → `"that serve domestic food security, regional supply chains, and export markets across the continent."`
  - [x] Overview ¶3 (line 11): `"across West Africa."` → `"across Africa — from Nigeria's fertile middle belt to markets spanning the ECOWAS corridor and beyond."`
  - [x] Capability Large-Scale Cultivation (line 15): `"across Nigeria's most productive agricultural belts."` → `"across West Africa's most productive agricultural belts."`
  - [x] seoDescription (line 35): `"across Nigeria."` → `"across West Africa."`

- [x] **Task 5: Update Animal Husbandry division** (AC: 2)
  - [x] `src/content/divisions/animal-husbandry.yaml` tagline (line 5): `"Building Nigeria's protein infrastructure"` → `"Building Africa's protein infrastructure"`
  - [x] Overview ¶1 (line 7): `"designed to address Nigeria's growing demand for quality animal protein."` → `"designed to address Africa's growing demand for quality animal protein, starting with Nigeria's domestic market and extending across the West African region."`
  - [x] Overview ¶3 (line 11): replace entire paragraph `"With Nigeria importing billions of naira worth of animal protein annually, the Animal Husbandry division is positioned to capture domestic market share while building the technical capacity for eventual export readiness across the West African region."` → `"With African nations importing billions of dollars worth of animal protein annually, the Animal Husbandry division is positioned to capture market share across the region while building the technical capacity and infrastructure for continental-scale production and distribution."`
  - [x] seoDescription (line 35): `"serving Nigeria's protein needs."` → `"serving Africa's growing protein needs."`

- [x] **Task 6: Update Agro-Processing division** (AC: 2)
  - [x] `src/content/divisions/agro-processing.yaml` tagline (line 5): `"across Nigeria"` → `"for African and global markets"`
  - [x] Overview ¶3 (line 11): `"reducing the nation's dependence on imported processed foods."` → `"reducing the continent's dependence on imported processed foods and building Africa's capacity for value-added agricultural production."`
  - [x] seoDescription (line 32): `"across Nigeria."` → `"serving African markets."`

- [x] **Task 7: Update Commodity Marketing division** (AC: 2)
  - [x] `src/content/divisions/commodity-marketing.yaml` tagline (line 5): `"Connecting Nigerian commodities to domestic and international markets"` → `"Connecting African commodities to continental and global markets"`
  - [x] Overview ¶2 (line 9): `"that help Nigerian producers access premium markets."` → `"that help African producers access premium markets. With the African Continental Free Trade Area (AfCFTA) opening new corridors for intra-African commerce, the division is positioned to capitalise on the continent's expanding trade infrastructure."`

- [x] **Task 8: Update Import & Export division** (AC: 2)
  - [x] `src/content/divisions/import-export.yaml` tagline (line 5): `"strengthens Nigeria's global commerce position"` → `"strengthens Africa's position in global commerce"`
  - [x] Overview ¶1 (line 7): `"across Nigeria's borders"` → `"across borders"` and after that sentence add `", leveraging Nigeria's position as West Africa's largest trading economy"`
  - [x] Overview ¶2 (line 9): `"through Nigeria's major ports."` → `"across multiple African trade corridors to ensure smooth cargo movement through the continent's major ports."`
  - [x] seoDescription (line 31): append `" across Africa."` to end

- [x] **Task 9: Update Real Estate division** (AC: 2)
  - [x] `src/content/divisions/real-estate.yaml` tagline (line 5): `"across Nigeria's growth corridors"` → `"across Africa's fastest-growing urban corridors"`
  - [x] Overview ¶1 (line 7): `"in Nigeria's fastest-growing urban centres"` → `"in some of Africa's fastest-growing urban centres, starting with Nigeria's major cities"` AND `"the country's acute housing deficit"` → `"Africa's acute housing deficit — estimated at over 50 million units continent-wide —"`
  - [x] Overview ¶2 (line 9): `"Nigeria's expanding middle class"` → `"Africa's rapidly expanding middle class"`
  - [x] Overview ¶3 (line 11): `"Nigeria's urbanisation trajectory."` → `"Africa's urbanisation trajectory — the fastest on the planet."`
  - [x] Capability Residential Estates (line 18): `"in Nigeria's major urban corridors."` → `"across Africa's major urban corridors."`
  - [x] seoDescription (line 32): `"across Nigeria's growth corridors."` → `"across Africa's fastest-growing urban corridors."`

- [x] **Task 10: Update Oil & Gas division** (AC: 2)
  - [x] `src/content/divisions/oil-gas.yaml` tagline (line 5): `"for Nigeria's evolving energy landscape"` → `"for Africa's evolving energy landscape"`
  - [x] Overview ¶3 (line 11): `"as the Nigerian market evolves."` → `"as African energy markets evolve and the continent's transition to cleaner energy accelerates."`
  - [x] Capability LPG Operations (line 18): `"targeting Nigeria's growing clean cooking fuel market."` → `"targeting Africa's growing clean cooking fuel market, where over 900 million people still lack access to clean cooking solutions."`
  - [x] Capability Strategic Partnerships (line ~21): `"established Nigerian energy companies"` → `"established African energy companies"`
  - [x] seoDescription (line 32): `"across Nigeria."` → `"across Africa."`

- [x] **Task 11: Update Agriculture & Processing cluster** (AC: 3)
  - [x] `src/content/clusters/agriculture-processing.yaml` tagline (line 3): `"powering Nigeria's food value chain."` → `"powering Africa's food value chain."`
  - [x] Overview ¶2 (line 7): `"Nigeria's agricultural sector employs over 35% of the workforce and contributes significantly to GDP, yet productivity gaps and post-harvest losses remain persistent challenges."` → `"Africa's agricultural sector employs over 60% of the continent's workforce and holds the key to feeding a population projected to reach 2.5 billion by 2050 — yet productivity gaps and post-harvest losses remain persistent challenges. In Nigeria alone, the sector employs over 35% of the workforce while leaving enormous value on the table."`
  - [x] seoDescription (line 15): `"across Nigeria."` → `"serving African markets."`

- [x] **Task 12: Update Trade & Markets cluster** (AC: 3)
  - [x] `src/content/clusters/trade-markets.yaml` overview ¶2 (line 7): `"Nigeria sits at the crossroads of West African trade, with access to a domestic market of over 200 million consumers and proximity to regional markets through ECOWAS trade frameworks. GRCL's Trade & Markets cluster is positioned to capitalise on this opportunity, providing the market access, logistics infrastructure, and trade finance capabilities that connect Nigerian producers to buyers across the continent and beyond."` → `"Nigeria sits at the crossroads of African trade, with access to a domestic market of over 200 million consumers, proximity to regional markets through ECOWAS, and new continental corridors opening under the African Continental Free Trade Area (AfCFTA). GRCL's Trade & Markets cluster is positioned to capitalise on these converging opportunities, providing the market access, logistics infrastructure, and trade finance capabilities that connect African producers to buyers across the continent and beyond."`
  - [x] Overview ¶3 (line 9): `"in Nigeria's complex commercial landscape."` → `"across Africa's complex and rapidly evolving commercial landscape."`

- [x] **Task 13: Update Built Environment & Energy cluster** (AC: 3)
  - [x] `src/content/clusters/built-environment-energy.yaml` tagline (line 3): `"for Nigeria's next growth phase."` → `"for Africa's next growth phase."`
  - [x] Overview ¶1 (line 5): `"two of Nigeria's highest-growth sectors."` → `"two of Africa's highest-growth sectors."`
  - [x] Overview ¶2 (line 7): `"Nigeria's housing deficit exceeds 17 million units, while energy demand continues to outpace supply infrastructure."` → `"Africa's housing deficit exceeds 50 million units — with Nigeria alone accounting for 17 million — while energy demand across the continent continues to outpace supply infrastructure."`
  - [x] Overview ¶3 (line 9): `"Nigeria's economic landscape for decades to come."` → `"Africa's economic landscape for decades to come."`
  - [x] seoDescription (line 14): `"across Nigeria's growth corridors."` → `"across Africa's fastest-growing corridors."`

- [x] **Task 14: Update Investors & Partners page** (AC: 5)
  - [x] `src/pages/investors-partners.astro` hero subtitle (line ~88): `"A diversified Nigerian conglomerate offering structured entry points for investment, partnership, and strategic collaboration across seven business divisions."` → `"A diversified pan-African conglomerate headquartered in Lagos, offering structured entry points for investment, partnership, and strategic collaboration across seven business divisions and three strategic clusters."`
  - [x] Stats (line ~157): `{ value: 6, suffix: '+', label: 'Markets Served' }` → `{ value: 6, suffix: '+', label: 'African Markets' }` — mirrors homepage stat label for consistency; numeric value and suffix stay unchanged
  - [x] `src/content/pages/investors-partners.mdx` seoTitle (line 3): → `"Investors & Partners — Pan-African Investment Opportunities | Global Resources Citadel"`
  - [x] seoDescription (line 4): → `"Explore partnership and investment opportunities with Global Resources Citadel Limited, a diversified pan-African conglomerate headquartered in Lagos."`
  - [x] whyPartner ¶1 (line ~7): `"in the Nigerian market:"` → `"in the African market:"` and expand with `"headquartered in Nigeria — the continent's largest economy — with operations and partnerships extending across West Africa."`
  - [x] whyPartner ¶2 (line ~9): `"Nigeria's agricultural and industrial sectors are undergoing rapid modernisation, driven by population growth, urbanisation, and government policy reforms."` → `"Africa's agricultural and industrial sectors are undergoing rapid modernisation, driven by population growth, urbanisation, continental trade integration through AfCFTA, and government policy reforms across the region."` AND `"with established operations, proven management, and clear growth trajectories across our portfolio."` → `"with established operations in Nigeria, proven management, and clear growth trajectories across our portfolio."`
  - [x] whyPartner ¶3 (line ~11): `"West African growth markets"` → `"African growth markets"` and `"looking to extend your value chain,"` → `"looking to extend your value chain into the continent,"`
  - [x] Body text (line ~14): `"seeking exposure to Nigeria's agricultural, trade, and infrastructure sectors."` → `"seeking exposure to Africa's agricultural, trade, and infrastructure sectors, with Nigeria as the primary operational base and gateway to continental markets."`

- [x] **Task 15: Update Footer brand statement** (AC: 6)
  - [x] `src/components/layout/Footer.astro` brand paragraph (line ~117-121): `"Global Resources Citadel Limited is a diversified Nigerian conglomerate building integrated value chains across agriculture, trade, real estate, and energy. Seven business divisions working together to strengthen Nigeria's economic foundations."` → `"Global Resources Citadel Limited is a pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy. Seven business divisions working together to strengthen economic foundations across the continent."`

- [x] **Task 16: Update SEO module** (AC: 7)
  - [x] `src/lib/seo.ts` Organization JSON-LD description (line ~44): `'A Nigerian conglomerate operating across agriculture, trade, real estate, and energy verticals.'` → `'A pan-African conglomerate headquartered in Lagos, Nigeria, operating across agriculture, trade, real estate, and energy verticals with operations spanning West Africa.'`

- [x] **Task 17: Update FAQ content** (AC: 8)
  - [x] `src/content/faqs/faqs.yaml` homepage-what-does-grcl-do answer (line ~3): `"GRCL is a diversified Nigerian conglomerate"` → `"GRCL is a diversified pan-African conglomerate headquartered in Lagos"`
  - [x] homepage-where-operates answer (line ~9): **CRITICAL FIX** `"headquartered in Abuja"` → `"headquartered in Lagos"` AND append `" with a growing presence across West Africa's key economic corridors"`
  - [x] about-founded answer (line ~33): `"contribute meaningfully to Nigeria's economic development"` → `"contribute meaningfully to economic development across Africa, starting from Nigeria"`
  - [x] about-differentiator question (line ~44): `"other Nigerian conglomerates"` → `"other African conglomerates"`
  - [x] about-sustainability answer (line ~57): Append `" Through SRADA, our dedicated community impact initiative, we extend these practices to support rural agricultural development across the region."`
  - [x] about-local-development answer (line ~63): `"We create employment across Nigeria's economic zones"` → `"We create employment across Africa's economic zones, with a primary footprint in Nigeria's most productive regions"`
  - [x] **NEW** entry: Add `homepage-pan-african` FAQ entry (category: homepage, sortOrder: 6)
  - [x] **NEW** entry: Add `about-srada` FAQ entry (category: about, sortOrder: 7)

- [x] **Task 18: Update Contact strategic page** (AC: 11)
  - [x] `src/pages/contact/strategic.astro` subtitle (line ~42): append `" — across any of our African markets."` to end of existing subtitle

- [x] **Task 19: Build verification** (AC: 1-14)
  - [x] Run `npm run build` — must complete with zero errors
  - [x] Verify no "Nigeria" references remain in contexts that should now be pan-African (grep for obvious misses)
  - [x] Confirm legal pages (`privacy-policy.astro`, `terms.astro`) are UNCHANGED

## Dev Notes

### Guiding Principles — Do Not Deviate

All copy changes follow the three-layer positioning model from spec Section 3.1:
1. **Root Layer:** GRCL is headquartered in Lagos, founded in Nigeria. This is NEVER erased.
2. **Expansion Layer:** Operations extending across West Africa and the continent.
3. **Vision Layer:** Aspirational positioning for Africa's economic transformation.

**Critical rule:** Use trajectory framing ("extending across," "growing presence," "positioned for") — NEVER make unsubstantiated operational claims like "operating in 20 countries."

### Exact Text Sources

Every proposed text comes verbatim from `_bmad-output/planning-artifacts/platform-evolution-spec-v1.md` Sections 3.2–3.11. The dev agent MUST use the exact proposed strings from the spec — do NOT paraphrase or improvise copy.

### Deliberate Spec Deviations

These changes intentionally differ from the evolution spec to fix internal inconsistencies:

1. **Homepage SEO description:** spec says "Eight business divisions" — corrected to "Seven." SRADA is Option A (standalone community impact), not an 8th division. The spec's own credibility stats keep "7 Divisions Active" unchanged, confirming this was a spec-level typo.
2. **Credibility stat "6 Nigerian States":** spec proposes the purely descriptive label "Operations Across West Africa" but the `CredibilityBar` component requires `value: number` for its counter animation. Changed to `{ value: 6, suffix: '+', label: 'African Markets' }` to preserve the animated counter while reframing geographically. Same pattern applied to the Investors & Partners "Markets Served" stat.

### What NOT to Do

- Do NOT change legal pages (privacy-policy.astro, terms.astro) — jurisdiction stays Nigerian
- Do NOT add new sections, pages, or nav items — those belong to Story 9.3 (Community Impact)
- Do NOT add the "NEW: Community Impact Section" on homepage — Story 9.3
- Do NOT add the "NEW: Community Impact Anchor Section" on About page — Story 9.3
- Do NOT add the "NEW: Social Impact Section" on Investors & Partners — Story 9.3
- Do NOT add "Community Impact" to footer nav or desktop/mobile nav — Story 9.3
- Do NOT add the SRADA contact card to Contact hub — Story 9.3
- Do NOT change 404, search, or sitemap pages — no changes needed
- Do NOT touch image files or add photography — Story 9.4
- Do NOT change any component structure, layout, or styling — this is purely a copy/text story
- Do NOT modify the Divisions section heading "Seven Verticals. One Vision." — it stays as-is (SRADA is not a division)

### File Change Summary (~50 text edits across 20 files)

| File | Change Count |
|------|-------------|
| `src/pages/index.astro` | 8 (hero, overview, stats, SEO) |
| `src/pages/about.astro` | 1 (hero subtitle) |
| `src/content/pages/about.mdx` | 10 (SEO, mission, vision, sustainability, 4 body ¶s, group structure) |
| `src/pages/divisions/index.astro` | 2 (body, SEO) |
| `src/content/divisions/*.yaml` (7 files) | 23 total |
| `src/content/clusters/*.yaml` (3 files) | 9 total |
| `src/pages/investors-partners.astro` | 2 (subtitle, stat) |
| `src/content/pages/investors-partners.mdx` | 6 (SEO, whyPartner ×3, body) |
| `src/components/layout/Footer.astro` | 1 (brand statement) |
| `src/lib/seo.ts` | 1 (JSON-LD) |
| `src/content/faqs/faqs.yaml` | 8 (6 corrections + 2 new) |
| `src/pages/contact/strategic.astro` | 1 |

### New FAQ Entries — Exact Content

```yaml
- id: homepage-pan-african
  question: Is GRCL a Nigerian company or a pan-African company?
  answer: GRCL is proudly Nigerian — headquartered in Lagos with deep roots across the country's most productive regions. At the same time, our operations, partnerships, and market reach extend across West Africa and the broader continent. We see Nigeria as our launchpad and Africa as our arena.
  category: homepage
  sortOrder: 6

- id: about-srada
  question: What is SRADA and how does it relate to GRCL?
  answer: The Support Rural Agricultural Development Association (SRADA) is GRCL's dedicated social impact initiative, focused on strengthening rural farming communities through training, agricultural input access, and infrastructure support. SRADA channels the Group's agricultural expertise into sustainable community development.
  category: about
  sortOrder: 7
```

### Previous Story Intelligence

Story 9.1 (Legacy Logo Swap) was a pure asset swap — 3 files changed (Header.astro, Footer.astro, DesktopNav.tsx). It established that:
- Header.astro now imports `legacyLogo` from `@/assets/brand/logo-legacy.png` (line 8)
- Footer.astro now imports `legacyLogo` from `@/assets/brand/logo-legacy.png` (line 7)
- No structural changes were made to any layout or component

The dev agent will be editing Footer.astro (brand statement text) — the logo import on line 7 is now `legacyLogo`. Do not accidentally revert this.

### Testing Considerations

- No existing tests reference any of the text strings being changed — zero test breakage risk
- Run `npm run build` to verify no broken imports or YAML syntax errors
- Spot-check a few pages in the dev server to verify copy renders correctly
- YAML multiline strings: ensure pipe (`|`) or folded (`>`) syntax is preserved when editing overview paragraphs — do not break YAML structure
- Content collection Zod schemas validate field presence but not text content — build will catch missing required fields

### Project Structure Notes

- All changes are to existing files — no new files created (except 2 new FAQ entries appended to existing YAML)
- No new dependencies, no new React islands, no schema changes
- Content files (YAML/MDX) are processed by Astro Content Collections — YAML syntax errors will break the build

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Sections 3.1-3.11] — All copy change tables with Current → Proposed
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Appendix A] — Copy change count summary
- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.2] — Acceptance criteria and BDD format
- [Source: CLAUDE.md] — Critical rules, naming conventions
- [Source: _bmad-output/implementation-artifacts/9-1-legacy-logo-swap.md] — Previous story context (logo swap already applied)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
- Build failed on first attempt: about.mdx seoDescription exceeded 160-char Zod schema limit. Trimmed "Limited" and "integrated" to fit within constraint.

### Completion Notes List
- All 19 tasks completed: ~50 text edits across 20 files implementing pan-African copy rewrite
- Three-layer positioning model maintained: Nigerian roots → West African operations → continental vision
- Trajectory framing used throughout — no unsubstantiated operational claims
- 2 new FAQ entries added (homepage-pan-african, about-srada)
- Critical fix applied: Abuja → Lagos HQ in homepage-where-operates FAQ
- Credibility stat reframed: "6 Nigerian States" → "6+ African Markets" preserving counter animation
- Legal pages (privacy-policy, terms) confirmed unchanged
- Build passes with zero errors, all 174 tests pass with zero regressions

### Change Log
- 2026-04-07: Implemented pan-African copy rewrite across all 19 tasks (AC 1-14)

### Review Findings

- [x] [Review][Patch] ~~Homepage meta description 202 chars~~ — FIXED: trimmed to 146 chars [index.astro:43]
- [x] [Review][Patch] ~~Divisions index meta description 185 chars~~ — FIXED: trimmed to 157 chars, now lists all 7 divisions [divisions/index.astro:44]
- [x] [Review][Patch] ~~Homepage title doubles brand name~~ — FIXED: removed company name from inline title (generateMetadata appends it), rendered 80 chars [index.astro:41]
- [x] [Review][Patch] ~~Missed "Nigerian conglomerate" in search.ts~~ — FIXED: updated to "pan-African conglomerate" [search.ts:73]
- [x] [Review][Patch] ~~"The country's" dangling reference~~ — FIXED: changed to "Africa's" [built-environment-energy.yaml:5]
- [x] [Review][Patch] ~~Double "growing presence" in FAQ~~ — FIXED: rephrased to "strong presence...expanding footprint" [faqs.yaml:homepage-where-operates]
- [x] [Review][Resolved] ~~Missing paragraph terminator in built-environment-energy.yaml ¶2~~ — verified false positive: sentence ends with period
- [x] [Review][Resolved] ~~About.mdx SEO title 82 chars~~ — FIXED: trimmed to 57 chars
- [x] [Review][Resolved] ~~Only 6 of 7 divisions in index SEO description~~ — FIXED: all 7 now listed

### File List
- src/pages/index.astro (modified — hero, overview, stats, SEO)
- src/pages/about.astro (modified — hero subtitle, group structure body)
- src/content/pages/about.mdx (modified — SEO, mission, vision, sustainability, body paragraphs)
- src/pages/divisions/index.astro (modified — body text, SEO description)
- src/content/divisions/crop-farming.yaml (modified — tagline, overview, capability, SEO)
- src/content/divisions/animal-husbandry.yaml (modified — tagline, overview, SEO)
- src/content/divisions/agro-processing.yaml (modified — tagline, overview, SEO)
- src/content/divisions/commodity-marketing.yaml (modified — tagline, overview)
- src/content/divisions/import-export.yaml (modified — tagline, overview, SEO)
- src/content/divisions/real-estate.yaml (modified — tagline, overview, capability, SEO)
- src/content/divisions/oil-gas.yaml (modified — tagline, overview, capabilities, SEO)
- src/content/clusters/agriculture-processing.yaml (modified — tagline, overview, SEO)
- src/content/clusters/trade-markets.yaml (modified — overview)
- src/content/clusters/built-environment-energy.yaml (modified — tagline, overview, SEO)
- src/pages/investors-partners.astro (modified — hero subtitle, stat label)
- src/content/pages/investors-partners.mdx (modified — SEO, whyPartner, body)
- src/components/layout/Footer.astro (modified — brand statement)
- src/lib/seo.ts (modified — Organization JSON-LD description)
- src/content/faqs/faqs.yaml (modified — 6 corrections + 2 new entries)
- src/pages/contact/strategic.astro (modified — subtitle)
