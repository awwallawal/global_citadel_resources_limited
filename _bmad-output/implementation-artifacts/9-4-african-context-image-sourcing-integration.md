# Story 9.4: African-Context Image Sourcing & Integration

Status: ready-for-dev

## Story

As a **visitor**,
I want to see authentic African-context photography throughout the site,
So that the visual experience matches the company's identity and positioning.

## Acceptance Criteria

### Phase A — Agent-Sourced Curation

1. `src/assets/images/_candidates/` contains 2-3 candidate images per required slot
2. `src/assets/images/_candidates/MANIFEST.md` maps every candidate to its target page/section with source metadata (URL, photographer, license, search terms, recommended pick)
3. All sourced images come from verified royalty-free platforms (Unsplash, Pexels, Iwaria, Nappy, Pixabay)
4. No generic Western stock photography — all imagery shows African people, landscapes, agriculture, or infrastructure
5. After human approval, approved images are moved to final locations per spec Section 4.4 naming convention
6. `src/assets/images/ATTRIBUTIONS.md` tracks all approved images with format: `filename | source | photographer | license | URL`

### Phase B — Dev Integration

7. Each major page has appropriate African-context photography per spec Section 4.3
8. All images use Astro `<Image>` component with WebP conversion via Astro's built-in image optimization
9. Hero images are under 150KB compressed, section images under 80KB
10. Hero images use eager loading (above fold), all others use `loading="lazy"`
11. Homepage total page weight remains under 500KB after image additions
12. No generic Western stock photography — all imagery shows African context

## Tasks / Subtasks

### Phase A: Image Sourcing & Curation

- [ ] **Task 1: Create image directory structure** (AC: 1)
  - [ ] Create `src/assets/images/_candidates/homepage/`
  - [ ] Create `src/assets/images/_candidates/about/`
  - [ ] Create `src/assets/images/_candidates/divisions/`
  - [ ] Create `src/assets/images/_candidates/community-impact/`
  - [ ] Create `src/assets/images/_candidates/investors/`
  - [ ] Create `src/assets/images/_candidates/contact/`

- [ ] **Task 2: Source homepage images** (AC: 1, 3, 4)
  - [ ] Hero image: Aerial view of African farmland at golden hour OR sweeping African landscape with agricultural activity — search "African agriculture aerial", "Nigeria farming landscape", "African farmland golden hour" — 1920x1080 max
  - [ ] Business Overview accent: Abstract/environmental showing interconnected operations — search "African supply chain", "agriculture processing Africa" — 800x600
  - [ ] Community Impact card: Rural agricultural community scene — search "African farmer training", "rural community Africa", "smallholder farmers" — 800x500
  - [ ] Name candidates: `{slot}-candidate-{n}.jpg` (e.g., `homepage-hero-candidate-1.jpg`)
  - [ ] Save 2-3 candidates per slot to `src/assets/images/_candidates/homepage/`

- [ ] **Task 3: Source division card images (Bento Grid + Hub)** (AC: 1, 3, 4)
  - [ ] Crop Farming: "African agriculture", "Nigeria farming", "crop field Africa" — 600x400
  - [ ] Animal Husbandry: "African livestock", "cattle Nigeria", "poultry farm Africa" — 600x400
  - [ ] Agro-Processing: "food processing Africa", "grain mill", "agro processing" — 600x400
  - [ ] Commodity Marketing: "African commodity market", "grain trading", "agricultural trade" — 600x400
  - [ ] Import & Export: "African port", "Lagos port", "shipping containers Africa" — 600x400
  - [ ] Real Estate: "African real estate", "Lagos buildings", "modern African city" — 600x400
  - [ ] Oil & Gas: "African energy", "fuel station Nigeria", "LPG Africa" — 600x400
  - [ ] Name candidates: `{division-slug}-card-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates per division to `src/assets/images/_candidates/divisions/`

- [ ] **Task 3b: Source division detail page hero images** (AC: 1, 3, 4)
  - [ ] Each of the 7 division detail pages (`/divisions/{slug}/`) needs a full-width hero image at 1920x800 — same subject matter as bento cards but higher resolution, landscape orientation
  - [ ] Crop Farming: "African farmland panoramic", "Nigeria agriculture wide" — 1920x800
  - [ ] Animal Husbandry: "African cattle ranch wide", "livestock farm panoramic" — 1920x800
  - [ ] Agro-Processing: "food processing plant wide", "agro industrial Africa" — 1920x800
  - [ ] Commodity Marketing: "commodity market panoramic", "grain warehouse Africa" — 1920x800
  - [ ] Import & Export: "African port panoramic", "container terminal Africa" — 1920x800
  - [ ] Real Estate: "African city skyline", "Lagos urban development panoramic" — 1920x800
  - [ ] Oil & Gas: "African energy infrastructure", "fuel depot panoramic" — 1920x800
  - [ ] Name candidates: `{division-slug}-hero-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates per division to `src/assets/images/_candidates/divisions/`

- [ ] **Task 4: Source About page images** (AC: 1, 3, 4)
  - [ ] Hero/Story: Professional African business environment, office/boardroom — search "African business meeting", "Lagos office", "African professionals" — 1920x800
  - [ ] Community Impact anchor: Rural community empowerment scene — search "African rural development", "community empowerment Africa" — 800x500
  - [ ] Name candidates: `about-{slot}-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates per slot to `src/assets/images/_candidates/about/`

- [ ] **Task 5: Source Community Impact page images** (AC: 1, 3, 4)
  - [ ] Hero: Farmers in field, agricultural training, community gathering — search "African farmer training", "rural agricultural community", "African village farming" — 1920x800
  - [ ] Impact Areas: Training sessions, farm inputs, community infrastructure — search "agricultural training Africa", "farm inputs Africa", "rural infrastructure Africa" — 800x500
  - [ ] How to Get Involved: Partnership/collaboration/volunteers — search "African community partnership", "volunteer Africa agriculture" — 800x500
  - [ ] Name candidates: `community-{slot}-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates per slot to `src/assets/images/_candidates/community-impact/`

- [ ] **Task 6: Source Investors & Partners images** (AC: 1, 3, 4)
  - [ ] Hero: Handshake, boardroom, or skyline — African business context — search "African business handshake", "Lagos skyline", "African boardroom" — 1920x800
  - [ ] Social Impact: Reuse from community-impact candidates or source new — 800x500
  - [ ] Name candidates: `investors-{slot}-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates to `src/assets/images/_candidates/investors/`

- [ ] **Task 7: Source Contact page images** (AC: 1, 3, 4)
  - [ ] Contact Hub: Office exterior or professional environment — search "African office building", "Lagos business district" — 800x500
  - [ ] Locations: Lagos office area, African city map, or business district — search "Lagos business area", "African city aerial", "West African map" — 800x500
  - [ ] Name candidates: `contact-hub-candidate-{n}.jpg`, `contact-locations-candidate-{n}.jpg`
  - [ ] Save 2-3 candidates to `src/assets/images/_candidates/contact/`

- [ ] **Task 8: Generate curation manifest** (AC: 2)
  - [ ] Create `src/assets/images/_candidates/MANIFEST.md` with format per slot:
    ```
    ## [Page] — [Section/Slot]
    | Candidate | Source | Photographer | License | Search Terms | Recommended |
    |-----------|--------|-------------|---------|-------------|-------------|
    | filename  | URL    | name        | type    | terms used  | Yes/No      |
    ```
  - [ ] Include recommended pick per slot with brief rationale
  - [ ] Include total candidate count and coverage summary

- [ ] **HALT — Human Approval Gate** (~5-10 min)
  - [ ] Present MANIFEST.md summary to Awwal for review
  - [ ] Awwal reviews `src/assets/images/_candidates/` folders and confirms or swaps picks
  - [ ] After approval: move approved images to final locations per Task 9
  - [ ] Delete rejected candidates and `_candidates/` directory

- [ ] **Task 9: Finalize approved images** (AC: 5, 6)
  - [ ] Create final directory structure per spec Section 4.4:
    ```
    src/assets/images/
    ├── hero/          (homepage-hero.jpg, about-hero.jpg, community-impact-hero.jpg, investors-hero.jpg)
    ├── divisions/     (crop-farming-hero.jpg, animal-husbandry-hero.jpg, etc.)
    ├── sections/      (bento-crop-farming.jpg, bento-animal-husbandry.jpg, etc.)
    └── community/     (srada-training.jpg, srada-community.jpg, srada-farming.jpg)
    ```
  - [ ] Move approved images from `_candidates/` to final locations with proper names
  - [ ] Create `src/assets/images/ATTRIBUTIONS.md` with format: `filename | source | photographer | license | URL`
  - [ ] Remove `_candidates/` directory and any remaining rejected files

### Phase B: Dev Integration

- [ ] **Task 10: Integrate division detail page hero images** (AC: 7, 8, 9, 10)
  - [ ] `src/pages/divisions/[slug].astro` — Add hero background image support to the hero SectionWrapper (line ~224). Use same pattern as homepage hero: absolute-positioned `<Image>` with dark overlay.
  - [ ] Import division hero images from `@/assets/images/divisions/{slug}-hero.jpg` using a dynamic import map or per-slug conditional
  - [ ] Hero images: `loading="eager"` (above fold)
  - [ ] Ensure fallback renders gracefully if image is missing (gradient-only, matching current state)

- [ ] **Task 11: Integrate homepage images** (AC: 7, 8, 9, 10)
  - [ ] `src/pages/index.astro` — Hero: Add background image behind existing CSS gradient using absolute-positioned `<Image>` with dark overlay (`bg-primary-900/80` on top). Import hero image from `@/assets/images/hero/homepage-hero.jpg`. Keep existing gradient as fallback.
  - [ ] Business Overview section: Add accent image if sourced (optional — section works without it)
  - [ ] Community Impact section (added in Story 9.3): Add SRADA feature image if section exists
  - [ ] Ensure hero image uses eager loading (`loading="eager"`), all others `loading="lazy"`

- [ ] **Task 12: Integrate Bento Grid division card images** (AC: 7, 8, 9, 10)
  - [ ] Modify `src/components/divisions/DivisionBentoGrid.astro` or `DivisionCard.astro` to accept an optional image prop
  - [ ] Add background images to division cards — low opacity overlay so text remains readable
  - [ ] Import section images from `@/assets/images/sections/bento-{division-slug}.jpg`
  - [ ] All card images: `loading="lazy"`, target < 80KB each
  - [ ] Ensure text contrast meets WCAG AA on image backgrounds (use dark overlay)

- [ ] **Task 13: Integrate About page images** (AC: 7, 8, 10)
  - [ ] `src/pages/about.astro` — Fill the existing image placeholder div (line ~101-104) with actual `<Image>` component
  - [ ] Import hero image from `@/assets/images/hero/about-hero.jpg`
  - [ ] Community Impact anchor section: add image if section exists (from Story 9.3)
  - [ ] All images below fold: `loading="lazy"`

- [ ] **Task 14: Integrate Community Impact page images** (AC: 7, 8, 10)
  - [ ] `src/pages/community-impact.astro` (created in Story 9.3) — Add hero image, impact area imagery
  - [ ] Import from `@/assets/images/community/srada-*.jpg`
  - [ ] Hero: eager loading; all others: lazy
  - [ ] If community-impact page doesn't exist yet, skip this task and note in completion log

- [ ] **Task 15: Integrate Investors & Partners images** (AC: 7, 8, 10)
  - [ ] `src/pages/investors-partners.astro` — Add hero background image following same pattern as homepage hero (gradient overlay + background image)
  - [ ] Import from `@/assets/images/hero/investors-hero.jpg`
  - [ ] Social Impact section: add image if section exists (from Story 9.3)

- [ ] **Task 16: Performance verification** (AC: 9, 11)
  - [ ] Run `npm run build` — verify all images are processed by Astro (check build output for image optimization lines)
  - [ ] Check build output: hero images should be < 150KB after WebP conversion, section images < 80KB
  - [ ] Run Lighthouse on homepage — verify total page weight < 500KB
  - [ ] If any image exceeds budget, reduce source dimensions or quality before re-building
  - [ ] Verify all below-fold images have `loading="lazy"` attribute in rendered HTML

## Dev Notes

### Current Image State — Starting from Zero

The site currently has **no photography**. All pages use CSS gradients, SVG icons, and text only. The only `<Image>` component usage is for logos in Header.astro and Footer.astro.

Existing empty directories (with `.gitkeep`):
- `src/assets/divisions/` — ready for division images
- `src/assets/hero/` — ready for hero images
- `src/assets/team/` — ready for team photos

**Important:** The spec defines a DIFFERENT directory structure (`src/assets/images/hero/`, `src/assets/images/divisions/`, etc.). Use the spec's structure under `src/assets/images/` — the existing `.gitkeep` directories are from an earlier plan and should be left alone.

### Sourcing Rules — Non-Negotiable

1. **African Context, Always** — No American farms, European factories, Middle Eastern oil rigs
2. **Authenticity Over Polish** — Natural lighting, real environments, working people. No glossy corporate stock.
3. **Pan-African, Not Poverty** — Show economic dynamism: modern facilities, professional workers, thriving markets. NO "poverty porn" imagery.
4. **Performance First** — Nigerian mobile users on variable bandwidth. Strict budgets: hero < 150KB, section < 80KB after Astro optimization.

### Platform Priority Order

1. **Iwaria** (iwaria.com) — African-focused stock library, best fit
2. **Unsplash** (unsplash.com) — Large library, filter by African context
3. **Pexels** (pexels.com) — Good African content growing
4. **Nappy** (nappy.co) — Beautiful diverse/African photography
5. **Pixabay** (pixabay.com) — Large free library

All platforms use royalty-free licenses. Track attributions regardless.

### Image Integration Pattern — Astro Best Practice

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/hero/homepage-hero.jpg';
---

<!-- Hero with background image + overlay -->
<div class="relative overflow-hidden">
  <Image
    src={heroImage}
    alt=""
    class="absolute inset-0 h-full w-full object-cover"
    widths={[640, 960, 1280, 1920]}
    sizes="100vw"
    loading="eager"
  />
  <div class="absolute inset-0 bg-primary-900/75"></div>
  <div class="relative z-10">
    <!-- Existing hero content -->
  </div>
</div>

<!-- Lazy-loaded section image -->
<Image
  src={sectionImage}
  alt="Description of image content"
  width={800}
  height={500}
  class="rounded-2xl"
  loading="lazy"
/>
```

Astro automatically generates WebP/AVIF variants and responsive srcsets. Do NOT manually compress or convert images — let Astro's build pipeline handle optimization.

### Bento Grid Image Integration

The current `DivisionCard.astro` / `DivisionBentoGrid.astro` has no image prop. To add images:

1. Add an optional `imageSrc` prop to the card component
2. When present, render as a background image with dark overlay for text readability
3. When absent, fall back to current CSS gradient/colour behaviour (backward compatible)
4. Card images should be 600x400, optimized to < 80KB each

### Deliberate Spec Deviations

1. **`<Image>` only, no `<Picture>`.** The epic AC says "Astro `<Image>` / `<Picture>` with WebP/AVIF conversion." This site uses `<Image>` exclusively — Astro's `<Image>` component already generates WebP/AVIF variants and responsive srcsets automatically. `<Picture>` adds unnecessary complexity with no benefit here.
2. **Divisions hub hero not sourced.** Spec Section 4.4 naming convention lists `divisions-hero.jpg` but Section 4.3 doesn't specify one for the hub page. The hub uses a text-only hero and doesn't need photography — omitting intentionally.

### What NOT to Do

- Do NOT use `<Picture>` component — the site uses `<Image>` exclusively, which handles format conversion automatically
- Do NOT manually compress images — Astro's image pipeline does this at build time
- Do NOT add images to `public/` — they must go in `src/assets/images/` so Astro can optimize them
- Do NOT use arbitrary Tailwind values for image dimensions — use standard responsive classes
- Do NOT add images to the existing `src/assets/hero/`, `src/assets/divisions/`, `src/assets/team/` directories — use `src/assets/images/` per the spec
- Do NOT fabricate photographer names or license details — use actual metadata from the source platform
- Do NOT skip the human approval gate between Phase A and Phase B

### Phase A → Phase B HALT

After completing Tasks 1-8, the agent MUST HALT and present the manifest to Awwal for approval. Phase B (Tasks 10-15) cannot begin until approved images are in final locations (Task 9).

### Division Detail Page Images — In Scope (Heroes Only)

The spec mentions 3-4 images per division detail page (hero + 1-2 capability images + optional stats bg). **Hero images (1920x800) for all 7 division pages are in scope** via Task 3b (sourcing) and Task 10 (integration). Capability/stats images are deferred — the hero provides the primary visual upgrade and the remaining images can follow in a separate pass if needed.

### Previous Story Intelligence

- Story 9.1: Logo swap complete. Header/Footer now use `legacyLogo`.
- Story 9.2: Pan-African copy rewrite. All text updated.
- Story 9.3: Community Impact page and site integrations. New page at `/community-impact/`, new sections on homepage and about page, new nav items.

If stories 9.2/9.3 are not yet implemented when this story runs, Phase B tasks referencing those new sections should be skipped and noted.

### Testing Considerations

- Run `npm run build` after Phase B to verify Astro processes all new images
- Build output will list each image with before/after sizes — verify budgets are met
- Run Lighthouse on homepage — Performance score should remain 90+
- Check that no images appear broken on any page
- Verify lazy loading: below-fold images should not appear in network waterfall until scrolled

### Project Structure Notes

New directories:
- `src/assets/images/hero/`
- `src/assets/images/divisions/`
- `src/assets/images/sections/`
- `src/assets/images/community/`

New files:
- `src/assets/images/ATTRIBUTIONS.md`
- ~20-30 image files (exact count depends on sourcing)

Modified files (Phase B):
- `src/pages/index.astro` — hero background image
- `src/components/divisions/DivisionBentoGrid.astro` or `DivisionCard.astro` — image prop
- `src/pages/divisions/[slug].astro` — division detail hero images
- `src/pages/about.astro` — fill image placeholder
- `src/pages/community-impact.astro` — images (if exists)
- `src/pages/investors-partners.astro` — hero background image

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 4] — Full image strategy: sourcing principles, platform list, page-by-page requirements, naming convention, attribution format
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 4.3] — Image requirements by page with search terms and sizes
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 4.4] — Directory structure and naming convention
- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.4] — Two-phase AC with human approval gate
- [Source: CLAUDE.md] — Mobile-first, performance, accessibility requirements

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
