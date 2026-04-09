# Brand Identity — Global Resources Citadel Limited

**Date:** 2026-03-27
**Status:** Canonical Reference
**Chosen Direction:** Direction 2 — Monogram + Stacked Wordmark
**Author:** Awwal

---

## Company Name

| Context | Usage |
|---------|-------|
| Full legal name | Global Resources Citadel Limited |
| Brand name | Global Resources Citadel |
| Abbreviation | GRCL |
| Monogram | GRC |
| Navigation / UI labels | GRCL |
| SEO page titles | Global Resources Citadel |
| Legal / footer / copyright | Global Resources Citadel Limited |
| Body copy | Global Resources Citadel (first mention), GRCL (subsequent) |

### Naming Rules

- **Full legal name** "Global Resources Citadel Limited" appears in: footer copyright, legal pages, letterhead headers, formal documents, meta descriptions.
- **Brand name** "Global Resources Citadel" (without "Limited") is the primary name for: headlines, page titles, SEO title tags, hero sections.
- **Abbreviation** "GRCL" is used for: navigation bars, compact UI contexts, internal references, repeated mentions within body copy, code/data references.
- **Monogram** "GRC" is the 3-character mark for: favicon, app icon, social media profile images, small-scale brand marks, watermarks.
- The nav label **"About the Group"** is retained — "the Group" is the colloquial reference to the corporate entity and is appropriate for navigation and conversational copy.

---

## Logo Architecture

### Name Hierarchy in Logo

The company name is displayed as a stacked wordmark with three tiers:

```
GLOBAL RESOURCES          ← Descriptor line (Poppins 500, wide tracking, smaller)
CITADEL                   ← Hero word (Poppins 700, dominant scale, deep green)
LIMITED                   ← Legal qualifier (Poppins 300, very small, muted)
```

**"CITADEL"** carries the visual weight. It is the anchor of the brand name — evocative of strength, structure, and permanence. It occupies the same visual role that a single-word brand name would in a simpler identity.

### Monogram: GRC

The monogram uses the first letter of each brand word (Global, Resources, Citadel), excluding "Limited" as a legal qualifier.

- Set in Poppins Bold
- Primary treatment: white text on deep green (#14532D) circle with gold (#B48A3E) ring border
- Also available in: rounded square, solid green, monochrome, reversed
- Scales from 80px (hero) down to 16px (favicon)

### Logo Lockup Options

| Lockup | Use Case |
|--------|----------|
| **Stacked Wordmark** (standalone) | Hero sections, formal documents, large print |
| **Monogram + Stacked Wordmark** (horizontal) | Site header, letterhead, business cards |
| **Abstract Mark + Stacked Wordmark** | Contexts where visual storytelling adds value |
| **Monogram only** | Favicon, social profiles, app icons, watermarks |

### Clear Space

Minimum clear space around the logo = the cap height of "C" in "CITADEL" on all sides.

### Minimum Size

- Full lockup: minimum 200px wide (digital), 50mm (print)
- Monogram only: minimum 16px (digital), 5mm (print)

---

## Colour System

### Primary Palette — Deep Forest Green

> **Note:** The numbering below differs from the implemented design tokens in `src/styles/globals.css` and the UX spec (authoritative). In the codebase, Primary 600 = `#15803D` and Primary 500 = `#16A34A`. The UX spec is the source of truth for token numbering; this table preserves the original brand brief values for reference.

| Token | Hex | Usage |
|-------|-----|-------|
| Primary 900 | `#14532D` | Deepest green — logo, headlines, high-emphasis text |
| Primary 800 | `#166534` | Dark green — section backgrounds, hover states |
| Primary 700 | `#15803D` | Core brand green — primary buttons, key UI elements |
| Primary 600 | `#16A34A` | Medium green — secondary elements, active states |
| Primary 500 | `#22C55E` | Light green — accents, success states |
| Primary 100 | `#DCFCE7` | Very light green — tinted backgrounds |
| Primary 50 | `#F0FDF4` | Near-white green — subtle tints |

### Accent Palette — Warm Gold

| Token | Hex | Usage |
|-------|-----|-------|
| Gold Dark | `#8A6A2E` | Deep gold — text on light backgrounds |
| Gold | `#B48A3E` | Core gold — CTAs, premium accents, monogram borders |
| Gold Light | `#D4AF6A` | Light gold — secondary accents, reversed contexts |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Neutral 900 | `#1F2937` | Body text, deep backgrounds |
| Neutral 800 | `#374151` | Secondary text |
| Neutral 700 | `#4B5563` | Tertiary text |
| Neutral 600 | `#6B7280` | Muted text, captions |
| Neutral 500 | `#9CA3AF` | Placeholder text, disabled states |
| Neutral 400 | `#D1D5DB` | Borders, dividers |
| Neutral 300 | `#E5E7EB` | Light borders |
| Neutral 200 | `#F3F4F6` | Light backgrounds |
| Neutral 100 | `#F9FAFB` | Page backgrounds |

### Colour Rules

- Green and gold are never used at equal visual weight in the same context. **Green dominates; gold accents.**
- Gold is reserved for: CTAs, monogram borders, premium moments, section labels. It is never a background colour.
- Division pages may introduce a muted secondary colour for contextual differentiation, but the primary green/gold system anchors every page.

---

## Typography

### Font Stack

| Role | Font | Source |
|------|------|--------|
| Headlines, wordmark, navigation | Poppins | Google Fonts |
| Body copy, UI, descriptions | Inter | Google Fonts |
| Code, technical contexts | JetBrains Mono | Google Fonts |

### Type Scale

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Logo "CITADEL" | Poppins | 700 | 2.8rem–3.5rem | 0.18em |
| Logo "GLOBAL RESOURCES" | Poppins | 500 | 0.9rem–1.1rem | 0.25em |
| Logo "LIMITED" | Poppins | 300 | 0.55rem–0.7rem | 0.5em |
| Hero headline | Poppins | 700 | 3rem+ | 0.02em |
| Section headline | Poppins | 600 | 1.5rem–2rem | 0.01em |
| Nav labels | Poppins | 500 | 0.875rem | 0.05em |
| Body text | Inter | 400 | 1rem | normal |
| Captions / meta | Inter | 400 | 0.875rem | 0.02em |
| Legal / fine print | Inter | 300 | 0.75rem | 0.01em |

---

## Letterhead Specification

> **Updated 2026-04-04:** Logo replaced with approved ornate emblem. Contact details confirmed from client letterhead. Layout revised to centre the emblem as the dominant visual anchor.

### Logo Asset

The letterhead uses the approved ornate emblem (`src/assets/brand/grcl-emblem.png`) — a baroque shield/crest featuring a golden sunrise over three green leaves, flanked by wheat sheaves, with a "GLOBAL RESOURCES CITADEL LTD." banner and gold globe. This replaces the earlier GRC monogram + stacked wordmark for print/formal contexts.

### Layout (A4 — 210 x 297mm)

**Header (top 50mm):**
- Centre: Ornate emblem logo, scaled to ~35mm height (the emblem is symmetrical and visually dominant — centred placement gives it the weight it deserves)
- Below emblem: Company name "Global Resources Citadel Limited" centred, Poppins 500, 9pt, deep green, wide tracking
- Below name: Contact row centred — phone | address | email — Inter 9pt, primary-700 green, separated by gold dot dividers
- Separated from body by a thin green-to-gold gradient line (full page width minus margins)

**Body (50mm–250mm):**
- Left margin: 25mm
- Right margin: 25mm
- Date position: right-aligned, 60mm from top
- Recipient block: left-aligned, 75mm from top
- Body text: Inter 11pt, 1.6 line height
- Signature block: left-aligned, generous space above for wet signature

**Footer (bottom 25mm):**
- Thin gold accent line above footer
- Left: website URL in primary-700 green
- Centre: gold divider dot
- Right: RC number, registered address (compact)
- All footer text: Inter 8pt, neutral-600

### Letterhead Content

| Field | Value | Status |
|-------|-------|--------|
| Company name | Global Resources Citadel Limited | Confirmed |
| Address | 1st Floor, Gbemisola House, Opp. Omole Phase I, Ogba, Lagos, Nigeria | Confirmed |
| Email | info@global-resources.org | Active (replaces legacy Yahoo) |
| Phone | +234-811-191-2174 | Confirmed |
| Website | www.global-resources.org | New domain |
| RC Number | *To be provided by client* | Pending |
| Logo | `src/assets/brand/grcl-emblem.png` | Approved |

---

## Division Sub-Branding

All seven divisions operate under the GRCL parent brand. **No division has an independent visual identity.** Division differentiation is achieved through:

1. **Division-specific imagery** — sector-relevant photography
2. **Contextual iconography** — industry-appropriate icons
3. **Subtle colour accents** — muted secondary tones per cluster (not replacing the primary palette)
4. **Content voice** — sector-appropriate language within the global tone

### Division Clusters

| Cluster | Divisions | Strategic Tier |
|---------|-----------|---------------|
| Agriculture & Processing | Crop Farming, Animal Husbandry, Agro-Processing | Core |
| Trade & Markets | Commodity Marketing, Import & Export | Supporting |
| Built Environment & Energy | Real Estate, Oil & Gas | Aspirational |

---

## Usage Guidelines

### Do

- Use the full stacked wordmark wherever space allows
- Maintain the green-gold hierarchy (green dominant, gold accent)
- Use the GRC monogram in constrained spaces
- Maintain clear space around the logo
- Use "CITADEL" as the visual anchor in all lockups
- Reference the brand as "Global Resources Citadel" in copy, "GRCL" for brevity

### Don't

- Stretch, rotate, or recolour the logo
- Use gold as a background colour
- Display the monogram and full wordmark redundantly in the same viewport
- Use any division name as a standalone brand separate from GRCL
- Abbreviate to just "GRC" in running text (use "GRCL" — the monogram "GRC" is visual only)
- Display "LIMITED" at the same visual weight as "CITADEL"

---

## Brand Assets

Production-ready files for the chosen direction (Direction 2 — Monogram + Stacked Wordmark):

| File | Purpose |
|------|---------|
| `brand-assets/logo-primary.svg` | Full colour logo, light backgrounds |
| `brand-assets/logo-reversed.svg` | Reversed logo, dark backgrounds |
| `brand-assets/logo-monogram.svg` | GRC monogram standalone, primary |
| `brand-assets/logo-monogram-reversed.svg` | GRC monogram standalone, reversed |
| `logo-kit.html` | Visual reference with all variants at multiple sizes, export instructions |
| `letterhead-grcl.html` | Print-ready A4 letterhead template (open in browser, Ctrl+P, save as PDF) |

---

## Related Documents

- **Brand directions (all 3):** `brand-identity-options.html` — rendered logo directions, letterhead mockups
- **Design reference (final):** `design-reference-final.html` — composite design direction for development
- **Design directions (exploration):** `ux-design-directions.html` — full-page design mockups (4 directions)
- **UX specification:** `ux-design-specification.md` — experience design, component system
- **Information architecture:** `information-architecture.md` — page structure, navigation, routing
