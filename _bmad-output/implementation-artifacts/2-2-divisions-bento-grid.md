# Story 2.2: Divisions Bento Grid

Status: ready-for-dev

## Story

As a **visitor**,
I want to see the full business structure at a glance with clear visual hierarchy,
So that I can immediately identify which divisions are most established and find the one relevant to me.

## Acceptance Criteria

1. All 7 divisions display in an asymmetric CSS Grid layout where card size encodes strategic hierarchy
2. Large cards (Crop Farming, Commodity Marketing) span 2 grid rows with icon, division name, brief description (2 lines), key stat badge, and "Learn More" arrow link
3. Standard cards (Animal Husbandry, Agro-Processing, Import & Export) occupy 1 row with icon, division name, brief description, and "Learn More" link
4. Compact cards (Real Estate, Oil & Gas) occupy 1 row with icon, division name, and arrow link
5. Each card uses one of 4 Editorial Premium visual variants per epics/UX spec: filled (primary-900 bg, white text), gradient (primary-50 to white), dark (neutral-900 bg, white text), outline (white bg + neutral-300 border). Note: design reference swaps filled/gradient names — epics and UX spec (line 1101) are authoritative.
6. Hover state: shadow-md elevation, border colour shift, and arrow gap animation (desktop)
7. Each card links to `/divisions/[slug]/`, with focus-visible rings on all card link wrappers
8. Tablet: 2-column simplified grid; Mobile: single column stack ordered by hierarchy (core first)
9. Grid uses `role="list"` with each card as `role="listitem"`, logical DOM reading order
10. Section has gold eyebrow "Our Divisions" and heading "Seven Verticals. One Vision." (per epics line 486 and IA line 298). Note: Story 2.1 used "Seven Divisions. One Vision." for the adjacent overview section — confusingly similar. The overview heading should be revisited to use the IA's original "A Multi-Division Business Built for Scale" to differentiate the two sections.

## Tasks / Subtasks

- [ ] Task 1: Create DivisionCard.astro component (AC: #2, #3, #4, #5, #6, #7)
  - [ ] 1.1 Create `src/components/divisions/DivisionCard.astro`
  - [ ] 1.2 Props: division data (name, slug, tagline, tier), size (large/standard/compact), variant (filled/gradient/dark/outline)
  - [ ] 1.3 Implement 4 visual variants with cn() utility (see corrected variant CSS in Dev Notes)
  - [ ] 1.4 All cards: `rounded-2xl` (16px border-radius per design reference)
  - [ ] 1.5 Icon circle: 48px default, 56px for large cards, cluster-accent background
  - [ ] 1.6 "Learn More" arrow link with `group-hover:gap-2.5` animation
  - [ ] 1.7 Large cards: `min-h-72` (288px — closest standard Tailwind to design ref 300px, avoids arbitrary value), stat badge (gold), full description. Note: epics specify "background image" on large cards — for MVP, icon circles are used. Real division photography is a post-MVP enhancement when client provides assets.
  - [ ] 1.8 Standard cards: icon, name, short description, arrow link. Note: epics specify "image" — same MVP icon approach applies.
  - [ ] 1.9 Compact cards: icon, name, arrow link (minimal)
  - [ ] 1.10 Entire card is a link wrapper (`<a>`) to `/divisions/[slug]/`
  - [ ] 1.11 Hover: `motion-safe:hover:shadow-md` + border colour shift
  - [ ] 1.12 Focus-visible: light variants (filled/gradient/outline) → `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`; dark variant → `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900`

- [ ] Task 2: Create DivisionBentoGrid.astro component (AC: #1, #8, #9)
  - [ ] 2.1 Create `src/components/divisions/DivisionBentoGrid.astro`
  - [ ] 2.2 CSS Grid: 4 columns on md+, explicit grid-column/grid-row spans per division
  - [ ] 2.3 Grid assignments (per epics — Crop Farming + Commodity Marketing are the two LARGE core cards): Crop Farming (col 1/3, row 1/3 — large), Animal Husbandry (col 3/4, row 1/2 — standard), Agro-Processing (col 4/5, row 1/2 — standard), Import & Export (col 3/5, row 2/3 — standard wide), Commodity Marketing (col 1/3, row 3/5 — large), Real Estate (col 3/4, row 3/4 — compact), Oil & Gas (col 4/5, row 3/4 — compact)
  - [ ] 2.4 Mobile: single column, ordered by tier (core → supporting → aspirational)
  - [ ] 2.5 Tablet: 2-column simplified grid
  - [ ] 2.6 `role="list"` on grid, `role="listitem"` on each card
  - [ ] 2.7 Gap: 16px mobile, 24px desktop

- [ ] Task 3: Assign visual variants to each division (AC: #5)
  - [ ] 3.1 Crop Farming: filled variant (primary-900 bg, white text) — LARGE core card
  - [ ] 3.2 Commodity Marketing: gradient variant (primary-50 to white) — LARGE core card
  - [ ] 3.3 Animal Husbandry: outline variant (white bg, neutral-300 border) — standard
  - [ ] 3.4 Agro-Processing: outline variant — standard
  - [ ] 3.5 Import & Export: outline variant — standard
  - [ ] 3.6 Real Estate: dark variant (neutral-900 bg, white text) — compact
  - [ ] 3.7 Oil & Gas: outline variant — compact

- [ ] Task 4: Integrate into homepage (AC: #10)
  - [ ] 4.1 Add Bento grid section to `src/pages/index.astro` after business overview
  - [ ] 4.2 SectionWrapper variant="default" (white background)
  - [ ] 4.3 SectionHeading with eyebrow "Our Divisions", heading "Seven Verticals. One Vision."
  - [ ] 4.4 Fetch divisions from content collections, pass to BentoGrid
  - [ ] 4.5 Sort divisions by tier for correct DOM order

## Dev Notes

### Bento Grid CSS — From Design Reference

```css
/* CORRECTED layout: Crop Farming + Commodity Marketing are the two LARGE cards (per epics AC) */
.bento-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .bento-crop    { grid-column: 1 / 3; grid-row: 1 / 3; }  /* Large — core (filled) */
  .bento-animal  { grid-column: 3 / 4; grid-row: 1 / 2; }  /* Standard (outline) */
  .bento-agro    { grid-column: 4 / 5; grid-row: 1 / 2; }  /* Standard (outline) */
  .bento-import  { grid-column: 3 / 5; grid-row: 2 / 3; }  /* Standard wide (outline) */
  .bento-comm    { grid-column: 1 / 3; grid-row: 3 / 5; }  /* Large — core (gradient) */
  .bento-restate { grid-column: 3 / 4; grid-row: 3 / 4; }  /* Compact — dark */
  .bento-oil     { grid-column: 4 / 5; grid-row: 3 / 4; }  /* Compact (outline) */
}
```

> **Design reference divergence:** The design-reference-final.html uses Agro-Processing as the second large card. The epics AC and IA wireframe both specify Commodity Marketing. This corrected layout follows the epics. The design reference HTML layout is NOT authoritative for division-to-size assignments.

### Card Variant CSS — Corrected to match Epics/UX Spec naming

The design reference swaps the `filled` and `gradient` names. Below uses the epics/UX spec definitions (authoritative):

```css
.card { border-radius: 16px; padding: 32px; transition: all 0.3s ease; display: flex; flex-direction: column; position: relative; overflow: hidden; }

/* Filled: primary-900 bg — per epics/UX spec (design ref calls this "accent") */
.card-filled { background: var(--primary-900); color: #fff; border: 1px solid transparent; }
.card-filled h3 { color: #fff; }
.card-filled p { color: rgba(255,255,255,0.8); }
.card-filled:hover { background: var(--primary-800); }
.card-filled .div-icon { background: rgba(255,255,255,0.15); color: #fff; }

/* Gradient: primary-50 to white — per epics/UX spec (design ref calls this "filled") */
.card-gradient { background: linear-gradient(135deg, var(--primary-50), #fff); border: 1px solid var(--primary-200); }
.card-gradient:hover { border-color: var(--primary-300); }
.card-gradient .div-icon { background: var(--primary-700); color: #fff; }

/* Outline: white bg, neutral border — unchanged */
.card-outline { background: var(--white); border: 1px solid var(--neutral-300); }
.card-outline:hover { border-color: var(--gold); }
.card-outline .div-icon { background: var(--neutral-100); color: var(--gold); border: 1px solid var(--neutral-300); }

/* Dark: neutral-900 bg — unchanged */
.card-dark { background: var(--neutral-900); color: #fff; border: 1px solid transparent; }
.card-dark h3 { color: #fff; }
.card-dark p { color: rgba(255,255,255,0.7); }
.card-dark:hover { background: var(--primary-900); }
.card-dark .div-icon { background: rgba(255,255,255,0.1); color: var(--gold); }

/* Arrow link */
.card .card-link { font-size: 13px; font-weight: 600; color: var(--gold); margin-top: 16px; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.2s; }
.card .card-link:hover { gap: 10px; }
.card .card-link::after { content: '→'; }
.card-dark .card-link, .card-filled .card-link { color: var(--gold-light); }
```

### Division-to-Variant Assignment

| Division | Slug | Tier | Size | Variant | Grid Position (md+) |
|----------|------|------|------|---------|---------------------|
| Crop Farming | crop-farming | core | large | filled (primary-900) | col 1-3, row 1-3 |
| Commodity Marketing | commodity-marketing | core | large | gradient (primary-50→white) | col 1-3, row 3-5 |
| Animal Husbandry | animal-husbandry | supporting | standard | outline | col 3-4, row 1-2 |
| Agro-Processing | agro-processing | supporting | standard | outline | col 4-5, row 1-2 |
| Import & Export | import-export | supporting | standard | outline | col 3-5, row 2-3 |
| Real Estate | real-estate | aspirational | compact | dark (neutral-900) | col 3-4, row 3-4 |
| Oil & Gas | oil-gas | aspirational | compact | outline | col 4-5, row 3-4 |

> **Design reference divergence resolved:** The design-reference-final.html shows Agro-Processing as the second large card and uses swapped variant names (its "filled" = our "gradient", its "accent" = our "filled"). This table follows the epics AC (Crop Farming + Commodity Marketing = large) and epics/UX spec variant definitions (filled = primary-900, gradient = primary-50→white). The design reference HTML is NOT authoritative for division-to-size assignments or variant naming.

### Division Data from Content Collections

Divisions are fetched via `getCollection('divisions')` (Story 1.3). Each entry has:
- `data.name`, `data.slug`, `data.clusterSlug`, `data.tier`, `data.tagline`, `data.capabilities`, `data.stats`

The BentoGrid component receives the full divisions array and renders cards based on tier/slug.

### Icon Strategy

Division icons use emoji placeholders in the design reference (🌾, ⚙, 🐄, 📊, 🌍, 🏗, ⛽). For production, replace with SVG icons from `src/assets/icons/` or a Lucide icon set. The icon field in division YAML (`data.capabilities[0].icon`) provides an identifier.

For MVP, use simple text/emoji placeholders in the icon circle. Real icons can be swapped in without structural changes.

### Previous Story Intelligence

**Story 2.1** creates the homepage with hero + business overview. This story adds the Bento grid as the third section below the overview.

**Story 1.3** provides division content collections with all required fields.

**Story 1.4** provides SectionWrapper and SectionHeading components used to frame the Bento grid section.

### What This Story Does NOT Include

- No division detail pages (Epic 3)
- No real division images on cards — epics specify "background image" on large cards and "image" on standard cards, but for MVP icon circles are used as placeholders. Real division photography is a post-MVP enhancement when client provides assets. The card structure supports swapping icons for images without structural changes.
- No StatCounter integration (Story 2.3)
- No Credibility section (Story 2.3)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/divisions/DivisionCard.astro`
- **Creates:** `src/components/divisions/DivisionBentoGrid.astro`
- **Modifies:** `src/pages/index.astro` — adds Bento grid section after business overview

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Bento grid CSS lines 328-435, HTML lines 735-809]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — DivisionCard, DivisionBentoGrid, hierarchy encoding]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P01 Section 3 Divisions Bento Grid]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
