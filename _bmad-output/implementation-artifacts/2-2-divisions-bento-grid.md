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
5. Each card uses one of 4 Editorial Premium visual variants: filled (primary-50 bg), gradient (primary-800→700), dark (neutral-900 bg), outline (white bg + neutral-300 border)
6. Hover state: shadow-md elevation, border colour shift, and arrow gap animation (desktop)
7. Each card links to `/divisions/[slug]/`
8. Tablet: 2-column simplified grid; Mobile: single column stack ordered by hierarchy (core first)
9. Grid uses `role="list"` with each card as `role="listitem"`, logical DOM reading order
10. Section has gold eyebrow "Our Divisions" and heading

## Tasks / Subtasks

- [ ] Task 1: Create DivisionCard.astro component (AC: #2, #3, #4, #5, #6)
  - [ ] 1.1 Create `src/components/divisions/DivisionCard.astro`
  - [ ] 1.2 Props: division data (name, slug, tagline, tier), size (large/standard/compact), variant (filled/outline/dark/accent)
  - [ ] 1.3 Implement 4 visual variants with cn() utility
  - [ ] 1.4 Icon circle: 48px default, 56px for large cards, cluster-accent background
  - [ ] 1.5 "Learn More" arrow link with `group-hover:gap-2.5` animation
  - [ ] 1.6 Large cards: `min-h-[300px]`, stat badge (gold), full description
  - [ ] 1.7 Standard cards: icon, name, short description, arrow link
  - [ ] 1.8 Compact cards: icon, name, arrow link (minimal)
  - [ ] 1.9 Entire card is a link wrapper to `/divisions/[slug]/`
  - [ ] 1.10 Hover: `motion-safe:hover:shadow-md` + border colour shift

- [ ] Task 2: Create DivisionBentoGrid.astro component (AC: #1, #8, #9)
  - [ ] 2.1 Create `src/components/divisions/DivisionBentoGrid.astro`
  - [ ] 2.2 CSS Grid: 4 columns on md+, explicit grid-column/grid-row spans per division
  - [ ] 2.3 Grid assignments: Crop Farming (1/3, 1/3), Agro-Processing (3/5, 1/3), Animal Husbandry (1/2, 3/4), Commodity Marketing (2/3, 3/4), Import & Export (3/5, 3/4), Real Estate (1/3, 4/5), Oil & Gas (3/5, 4/5)
  - [ ] 2.4 Mobile: single column, ordered by tier (core → supporting → aspirational)
  - [ ] 2.5 Tablet: 2-column simplified grid
  - [ ] 2.6 `role="list"` on grid, `role="listitem"` on each card
  - [ ] 2.7 Gap: 16px mobile, 24px desktop

- [ ] Task 3: Assign visual variants to each division (AC: #5)
  - [ ] 3.1 Crop Farming: filled variant (primary-50 bg, primary-200 border)
  - [ ] 3.2 Agro-Processing: accent/gradient variant (primary-800→700, white text)
  - [ ] 3.3 Animal Husbandry: outline variant (white bg, neutral-300 border)
  - [ ] 3.4 Commodity Marketing: outline variant
  - [ ] 3.5 Import & Export: filled variant
  - [ ] 3.6 Real Estate: dark variant (neutral-900 bg, white text)
  - [ ] 3.7 Oil & Gas: outline variant

- [ ] Task 4: Integrate into homepage (AC: #10)
  - [ ] 4.1 Add Bento grid section to `src/pages/index.astro` after business overview
  - [ ] 4.2 SectionWrapper variant="default" (white background)
  - [ ] 4.3 SectionHeading with eyebrow "Our Divisions", heading text
  - [ ] 4.4 Fetch divisions from content collections, pass to BentoGrid
  - [ ] 4.5 Sort divisions by tier for correct DOM order

## Dev Notes

### Bento Grid CSS — From Design Reference

```css
.bento-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto;
  }
  .bento-crop    { grid-column: 1 / 3; grid-row: 1 / 3; }  /* Large — core */
  .bento-agro    { grid-column: 3 / 5; grid-row: 1 / 3; }  /* Large — accent */
  .bento-animal  { grid-column: 1 / 2; grid-row: 3 / 4; }  /* Standard */
  .bento-comm    { grid-column: 2 / 3; grid-row: 3 / 4; }  /* Standard */
  .bento-import  { grid-column: 3 / 5; grid-row: 3 / 4; }  /* Standard (wide) */
  .bento-restate { grid-column: 1 / 3; grid-row: 4 / 5; }  /* Compact — dark */
  .bento-oil     { grid-column: 3 / 5; grid-row: 4 / 5; }  /* Compact */
}
```

### Card Variant CSS — From Design Reference

```css
.card { border-radius: 16px; padding: 32px; transition: all 0.3s ease; display: flex; flex-direction: column; position: relative; overflow: hidden; }

/* Filled: primary-50 bg */
.card-filled { background: var(--primary-50); border: 1px solid var(--primary-200); }
.card-filled:hover { background: var(--primary-100); border-color: var(--primary-300); }
.card-filled .div-icon { background: var(--primary-700); color: #fff; }

/* Outline: white bg, neutral border */
.card-outline { background: var(--white); border: 1px solid var(--neutral-300); }
.card-outline:hover { border-color: var(--gold); }
.card-outline .div-icon { background: var(--neutral-100); color: var(--gold); border: 1px solid var(--neutral-300); }

/* Dark: neutral-900 bg */
.card-dark { background: var(--neutral-900); color: #fff; border: 1px solid transparent; }
.card-dark h3 { color: #fff; }
.card-dark p { color: rgba(255,255,255,0.7); }
.card-dark:hover { background: var(--primary-900); }
.card-dark .div-icon { background: rgba(255,255,255,0.1); color: var(--gold); }

/* Accent/Gradient: primary-800→700 */
.card-accent { background: linear-gradient(135deg, var(--primary-800), var(--primary-700)); color: #fff; border: 1px solid transparent; }
.card-accent h3 { color: #fff; }
.card-accent p { color: rgba(255,255,255,0.8); }
.card-accent:hover { opacity: 0.92; }
.card-accent .div-icon { background: rgba(255,255,255,0.15); color: #fff; }

/* Arrow link */
.card .card-link { font-size: 13px; font-weight: 600; color: var(--gold); margin-top: 16px; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.2s; }
.card .card-link:hover { gap: 10px; }
.card .card-link::after { content: '→'; }
.card-dark .card-link, .card-accent .card-link { color: var(--gold-light); }
```

### Division-to-Variant Assignment

| Division | Slug | Tier | Size | Variant | Grid Position |
|----------|------|------|------|---------|---------------|
| Crop Farming | crop-farming | core | large | filled | col 1-3, row 1-3 |
| Agro-Processing | agro-processing | supporting | large | accent | col 3-5, row 1-3 |
| Animal Husbandry | animal-husbandry | supporting | standard | outline | col 1-2, row 3-4 |
| Commodity Marketing | commodity-marketing | core | standard | outline | col 2-3, row 3-4 |
| Import & Export | import-export | supporting | standard | filled | col 3-5, row 3-4 |
| Real Estate | real-estate | aspirational | compact | dark | col 1-3, row 4-5 |
| Oil & Gas | oil-gas | aspirational | compact | outline | col 3-5, row 4-5 |

**Note:** The design reference shows Crop Farming and Agro-Processing as the two large cards (not Crop Farming and Commodity Marketing as stated in some specs). The HTML markup from design-reference-final.html is authoritative for visual layout. However, the epics AC explicitly says "Large cards (Crop Farming, Commodity Marketing)". Defer to the **epics AC** as authoritative for business logic — Crop Farming and Commodity Marketing are the core-tier divisions that get large cards. Adjust grid assignments accordingly if needed.

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
- No real hero images on cards — use icon circles only for MVP
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
