# Story 9.5: Print Collateral — Business Cards & Letterhead

Status: done

## Story

As a **business stakeholder**,
I want professional print collateral that reflects the platform's brand system,
So that offline materials match the digital presence in quality and identity.

## Acceptance Criteria

1. `_bmad-output/planning-artifacts/business-card-concept-1.html` (Heritage Classic) exists and renders front + back of a 90x55mm card
2. `_bmad-output/planning-artifacts/business-card-concept-2.html` (Modern Executive) exists and renders front + back of a 90x55mm card
3. `_bmad-output/planning-artifacts/business-card-concept-3.html` (Pan-African Bold) exists and renders front + back of a 90x55mm card
4. Each card uses the legacy logo (embedded as base64), Poppins + Inter typography, and forest green (#14532D) + gold (#B48A3E) colour system
5. Each card has editable placeholder fields for name, title, division, and contact details
6. Each card includes `@media print` styles for Ctrl+P to PDF workflow
7. `_bmad-output/planning-artifacts/letterhead-grcl-v3.html` exists with legacy logo replacing the ornate emblem
8. Letterhead RC Number uses placeholder `RC-000000` (CAC format) with HTML comment marking it for replacement
9. All other letterhead elements (typography, contact row, gradient line, layout, footer) remain unchanged from v2

## Tasks / Subtasks

- [x] **Task 1: Prepare logo base64 data URI** (AC: 4)
  - [x] Convert `docs/logo-legacy-1024.png` (219KB, high-res for print) to base64 data URI string
  - [x] Store as a reusable variable/snippet for embedding in all 4 HTML files
  - [x] For the watermark (very low opacity, doesn't need full resolution), use `src/assets/brand/logo-legacy.png` (23KB) base64 instead to keep file sizes smaller

- [x] **Task 2: Create Business Card Concept 1 — Heritage Classic** (AC: 1, 4, 5, 6)
  - [x] Create `_bmad-output/planning-artifacts/business-card-concept-1.html`
  - [x] Self-contained HTML/CSS, Google Fonts CDN for Poppins + Inter
  - [x] Card size: 90mm x 55mm
  - [x] **Front:** White/cream background. Legacy logo centred ~20mm height. Horizontal gold accent line below logo. Name: Poppins 600, forest green, centred. Title: Inter 400, neutral-700, centred. Division: Inter 400, neutral-500, centred.
  - [x] **Back:** White background. Contact details left-aligned stack (phone, email, direct line (optional), address 2 lines, website) with small icons. Forest green bar at bottom (8mm) with company name in white "Global Resources Citadel Limited". Gold thin line above green bar.
  - [x] All text fields: `contenteditable="true"` with yellow highlight on focus (screen only)
  - [x] On-screen instructions panel (hidden in print) explaining how to edit and print
  - [x] `@media print` styles: hide instructions, remove shadows, exact card dimensions
  - [x] `@page` rule: size 90mm 55mm or appropriate for card printing

- [x] **Task 3: Create Business Card Concept 2 — Modern Executive** (AC: 2, 4, 5, 6)
  - [x] Create `_bmad-output/planning-artifacts/business-card-concept-2.html`
  - [x] Self-contained HTML/CSS with Google Fonts CDN
  - [x] **Front:** White background. Logo top-left ~15mm height. Name: Poppins 700, large (14pt), forest green, left-aligned below logo. Title: Inter 400, gold, left-aligned. Division: Inter 400, neutral-600, left-aligned. Thin gold vertical accent line on right edge.
  - [x] **Back:** Forest green (#14532D) full background. Contact details white/gold, left-aligned. Gold divider dots between info blocks. QR code placeholder bottom-right (use a CSS-styled placeholder box — actual QR generation is out of scope). Company legal name: Inter 300, gold-light, bottom-left.
  - [x] Same editable fields and print styles as Concept 1

- [x] **Task 4: Create Business Card Concept 3 — Pan-African Bold** (AC: 3, 4, 5, 6)
  - [x] Create `_bmad-output/planning-artifacts/business-card-concept-3.html`
  - [x] Self-contained HTML/CSS with Google Fonts CDN
  - [x] **Front:** Deep forest green (#14532D) full background. Legacy logo centred ~22mm height. **Logo contrast note:** the logo's charcoal shield (#2D2D2D) will be nearly invisible against forest green (#14532D) — this is acceptable since the inner emblem (yellow sun, green leaves, lime text) carries the visual weight. Add a subtle `drop-shadow(0 0 8mm rgba(255,255,255,0.08))` or faint light halo behind the logo if the result looks unfinished without the shield outline. Name: Poppins 600, white, centred. Title: Inter 400, gold, centred. Thin gold line separating logo from name.
  - [x] **Back:** White background. Subtle Africa continent outline as ghost watermark (10% opacity, centred, large) — use an SVG path of the African continent outline, not an image. Contact details centred. Name repeated small at top. Phone | Email | Website in single row with gold dividers. Address below in 2 lines. "Pan-African Excellence" tagline in small gold text at bottom. Company name: Inter 300, forest green, bottom centre.
  - [x] Same editable fields and print styles as Concept 1

- [x] **Task 5: Create Letterhead v3** (AC: 7, 8, 9)
  - [x] Copy `_bmad-output/planning-artifacts/letterhead-grcl-v2.html` → `_bmad-output/planning-artifacts/letterhead-grcl-v3.html`
  - [x] Replace emblem `<img src="../../docs/grcl_new.png">` (line 368) with legacy logo base64 data URI (both header and watermark instances)
  - [x] Watermark instance (line 381): use the smaller base64 (from logo-legacy.png) for lighter file size
  - [x] Update `<title>` tag to "GRCL Letterhead v3"
  - [x] Update instructions heading to "Letterhead Template v3"
  - [x] RC Number in footer (line 426): change `RC: ______ <em style="...">pending</em>` → `RC-000000 <!-- REPLACE with actual CAC registration number -->`
  - [x] Verify logo sizing: `.lh-emblem` class already uses `height: 35mm` — the shield format should work at this size; adjust if needed
  - [x] Do NOT change any other element: typography, contact row, gradient lines, body layout, footer structure, colours, spacing — all remain identical to v2

- [x] **Task 6: Verify all deliverables** (AC: 1-9)
  - [x] All 4 HTML files exist and render with base64 logos (no external image dependencies)
  - [x] Verified contenteditable fields present across all cards (10-11 per card)
  - [x] Verified @media print styles hide instructions and remove shadows
  - [x] Concept 3 Africa continent SVG watermark at 10% opacity
  - [x] Letterhead v3 identical to v2 except: logo swap (base64), title v3, RC-000000 placeholder

## Dev Notes

### This is a Non-Web Deliverable

These files live in `_bmad-output/planning-artifacts/` and are NOT part of the Astro build. They are standalone HTML files designed for browser-to-PDF printing. No Astro, no Tailwind, no build pipeline — pure HTML + inline CSS + Google Fonts CDN.

### No Dependencies on Other Stories

This story can run in parallel with stories 9.1-9.4. It only needs:
- The legacy logo file (`docs/logo-legacy-1024.png` for print, `src/assets/brand/logo-legacy.png` for web-res) — already in repo
- The existing letterhead v2 as a template — already in repo

### Logo Base64 Embedding

Both the business cards and letterhead must embed the logo as base64 data URIs for portability (no external file dependencies when the HTML is opened standalone or shared).

**For print-quality elements** (card logos, letterhead header logo):
- Source: `docs/logo-legacy-1024.png` (219KB, 1024px)
- Convert to base64: `data:image/png;base64,...`

**For low-opacity watermarks** (letterhead ghost, card backgrounds):
- Source: `src/assets/brand/logo-legacy.png` (23KB, smaller)
- Lower file size since it renders at 3-10% opacity anyway

### Brand Tokens — Use These Exact Values

```css
:root {
  --primary-900: #14532D;   /* Forest green — primary brand colour */
  --primary-800: #166534;
  --primary-700: #15803D;
  --gold-dark: #8A6A2E;
  --gold: #B48A3E;           /* Warm gold — accent */
  --gold-light: #D4AF6A;
  --neutral-900: #1F2937;
  --neutral-700: #4B5563;
  --neutral-600: #6B7280;
  --neutral-500: #9CA3AF;
  --white: #FFFFFF;
}
```

### Card Dimensions

Standard business card: **90mm x 55mm** (3.5" x 2"). All three concepts use this size. Use `mm` units in CSS for print accuracy.

### Editable Fields — All Concepts

Per spec shared elements, each card must include editable placeholders for: **Name, Title/Position, Division, Phone, Email, Direct Line (optional), Address, Website.** "Direct Line" is a secondary phone number — include it in the contact stack with a label like "Direct:" and `contenteditable="true"`. If not needed for a particular officer, the user deletes the line before printing.

### Editable Fields Pattern (from letterhead v2)

```css
[contenteditable="true"] { outline: none; }
[contenteditable="true"]:focus { background: #FFFDE7; border-radius: 2px; }
@media print { [contenteditable="true"]:focus { background: transparent; } }
```

### Print Styles Pattern (from letterhead v2)

```css
@media print {
  body { background: white; padding: 0; }
  .instructions { display: none; }
  .card { box-shadow: none; }
  /* Ensure backgrounds print */
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
```

### Africa Continent Outline (Concept 3)

For the Pan-African Bold card back watermark, use an inline SVG path of the African continent outline. Do NOT use an external image. Keep the SVG simple (one path element), style with `opacity: 0.1` and centred positioning. A simplified Africa outline SVG path can be sourced from any open SVG map resource.

### QR Code Placeholder (Concept 2)

The Modern Executive back has a QR code bottom-right. Since actual QR generation is out of scope, create a styled placeholder:
```html
<div class="qr-placeholder" style="width: 18mm; height: 18mm; border: 1px dashed var(--gold-light); display: flex; align-items: center; justify-content: center; font-size: 6pt; color: var(--neutral-500);">
  QR Code
</div>
```

### Instructions Panel Pattern (from letterhead v2)

Each HTML file should include an on-screen instructions panel above the card/letterhead that explains:
1. How to edit fields (click to type)
2. How to print to PDF (Ctrl+P → Save as PDF)
3. Print settings (paper size, margins, background graphics)

This panel uses `class="instructions"` and is hidden via `@media print { .instructions { display: none; } }`.

### Deliberate Spec Deviations

1. **PNG base64 instead of SVG.** Spec Section 6.1 says "Legacy shield/crest logo (recreated SVG)." SVG recreation was superseded — client approved the extracted PNG (Section 8.1, Question 4). All logo embeds use PNG base64 from `docs/logo-legacy-1024.png` (print quality) or `src/assets/brand/logo-legacy.png` (watermark quality).

### What NOT to Do

- Do NOT use Astro, Tailwind, or any build tools — these are standalone HTML files
- Do NOT reference external images — embed logo as base64 data URI
- Do NOT change the letterhead v2 structure — v3 only swaps the logo and fixes RC number
- Do NOT delete or modify letterhead-grcl-v2.html — v3 is a new file
- Do NOT add these files to the Astro build pipeline or `src/` directory
- Do NOT use the web-resolution logo (23KB) for the main printed logo — use the 1024px print version
- Do NOT fabricate an RC number — use `RC-000000` as an explicit placeholder

### Previous Story Intelligence

- Story 9.1: Legacy logo (`logo-legacy.png`) already in repo at `src/assets/brand/` and `docs/logo-legacy-1024.png`
- The letterhead v2 at `_bmad-output/planning-artifacts/letterhead-grcl-v2.html` references `../../docs/grcl_new.png` for the emblem — v3 replaces this with base64 of the legacy logo
- Existing letterhead pattern: A4 (210mm x 297mm), centred header, gradient accent stripe, ghost watermark, editable body, footer with website + RC + address

### Testing Considerations

- Open all 4 HTML files in a browser — verify visual rendering
- Test in Chrome print preview (Ctrl+P → Save as PDF) — verify:
  - Instructions panel hidden
  - Card dimensions correct (90x55mm)
  - Letterhead A4 with all elements
  - Backgrounds print correctly (especially green backgrounds on Concept 2 back, Concept 3 front)
- Test contenteditable fields — click name/title/contact and type
- Verify base64 logos render correctly (not broken image icons)
- Verify Concept 3 Africa outline renders subtly without dominating the design

### Project Structure Notes

New files (all in `_bmad-output/planning-artifacts/`):
- `business-card-concept-1.html` — Heritage Classic
- `business-card-concept-2.html` — Modern Executive
- `business-card-concept-3.html` — Pan-African Bold
- `letterhead-grcl-v3.html` — Updated letterhead with legacy logo

No changes to `src/` — this story is entirely non-web deliverables.

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 5] — Business card designs: shared spec, 3 concepts with front/back details
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 6] — Letterhead update: changes from v2, specification, deliverable
- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.5] — Acceptance criteria
- [Source: _bmad-output/planning-artifacts/letterhead-grcl-v2.html] — Existing letterhead template (copy for v3 base)
- [Source: docs/logo-legacy-1024.png] — High-res logo for print (219KB)
- [Source: src/assets/brand/logo-legacy.png] — Web-res logo for watermarks (23KB)
- [Source: _bmad-output/planning-artifacts/brand-identity.md] — Brand system, colour tokens, typography

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

None — clean generation with no errors.

### Completion Notes List

- Task 1: Generated base64 data URIs from both logo files — hi-res (292K chars from logo-legacy-1024.png) for print elements, web-res (31K chars from logo-legacy.png) for watermarks.
- Task 2: Heritage Classic card — cream front with centred logo + gold accent, white back with icon-prefixed contact stack and forest green bottom bar.
- Task 3: Modern Executive card — white front with left-aligned layout + gold right-edge accent, full green back with gold dots and QR placeholder.
- Task 4: Pan-African Bold card — dark green front with logo drop-shadow for contrast, white back with inline SVG Africa continent watermark at 10% opacity.
- Task 5: Letterhead v3 — copied v2, replaced both emblem instances with base64 (hi-res header, web-res watermark), updated title/instructions to v3, fixed RC number to `RC-000000` with replacement comment.
- Task 6: All files verified — base64 logos render, contenteditable fields functional, print styles present, v2 untouched.

### Change Log

- 2026-04-06: Created all 4 print collateral deliverables (3 business card concepts + letterhead v3) with embedded base64 logos and print-ready CSS.

### File List

- `_bmad-output/planning-artifacts/business-card-concept-1.html` (new — Heritage Classic)
- `_bmad-output/planning-artifacts/business-card-concept-2.html` (new — Modern Executive)
- `_bmad-output/planning-artifacts/business-card-concept-3.html` (new — Pan-African Bold)
- `_bmad-output/planning-artifacts/letterhead-grcl-v3.html` (new — letterhead with legacy logo)
