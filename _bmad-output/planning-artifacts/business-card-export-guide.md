# Business Card Export Guide — GRCL (Thomas, CEO)

## Quick Reference

| Item | Value |
|------|-------|
| Card size | 85 × 55 mm (UK standard) |
| Corner radius | 4 mm |
| Stock | 400 gsm matte uncoated or 350 gsm soft-touch laminated |
| Print colour | 4-process CMYK + optional spot-gold foil on seal |
| Domain (QR) | https://global-resources.org/contact/ |
| RC Number | 1801787 |

## Files

| File | Purpose | Dimensions |
|------|---------|------------|
| `business-card-front.png` | Front face PNG | 1004 × 650 px (300 DPI) |
| `business-card-back.png` | Back face PNG | 1004 × 650 px (300 DPI) |
| `business-card.html` | Interactive preview + print modes | Open in Chrome/Edge |
| `business-card-qr.png` | QR code (local, 600×600) | Encodes global-resources.org/contact/ |
| `business-card-qr.svg` | QR code vector | Same URL, scalable |
| `export-card-png.mjs` | PNG export script | Run with `node export-card-png.mjs` |

All files are in `_bmad-output/planning-artifacts/`.

## How to Use the PNGs

The PNGs are 300 DPI print-quality exports. Hand them to any print shop as-is.

- **For print shops:** Send both PNGs with the specs above. Tell them 85 × 55 mm, 4 mm corner radius, double-sided.
- **For design tools:** Import at 100% — the pixel dimensions already encode 300 DPI at the correct physical size.
- **For personal printing:** Print each PNG on heavy cardstock, scale to 85 × 55 mm, trim to size.

## How to Re-Export PNGs

If you edit the HTML and want fresh PNGs:

```bash
cd _bmad-output/planning-artifacts
node export-card-png.mjs
```

Requires Playwright (`npx playwright install chromium` if not already installed).

## How to Use the HTML Print Modes

Open `business-card.html` in Chrome or Edge. Two modes:

### Single Card Mode (default)
- Press Ctrl+P
- Paper size: leave default (85 × 55 mm from CSS)
- Margins: None
- Scale: Default or 100%
- Background graphics: ON
- Result: 2-page PDF (front + back)

### Print Sheet Mode (A4 imposition)
- Click "Print Sheet" toggle at the top
- Press Ctrl+P
- Paper size: A4, Portrait
- Margins: None
- Scale: Default or 100%
- Background graphics: ON
- Result: 2-page A4 PDF (8 fronts + 8 backs, 3 mm bleed, crop marks)

## Card Content

### Front
- Heritage seal (logo-legacy.png)
- GLOBAL wordmark with globe icon
- RESOURCES  CITADEL  LIMITED
- Cluster line: Agriculture & Processing · Trade & Services · Built Environment & Energy
- Gold tagline band: Building Africa's Future From Nigeria's Strongest Foundations

### Back
- THOMAS — Group Chief Executive Officer
- Full name: Olatunde Oluseye Taiwo Thomas
- Nigeria HQ: +234 704 100 8192 / +234 915 410 9225, 1st Floor Gbemisola House, Opp. Omole Phase I, Ogba, Lagos
- United Kingdom: +44 7404 138 158, Office 1249, 12 Farwig Lane, Bromley, BR1 3RB
- Email: info@global-resources.org
- RC No. 1801787
- QR code → global-resources.org/contact/

## To Create Cards for Other Team Members

Edit `business-card.html`, find the `card-back` section, and change:
- `.name` → surname (e.g., OLAGUNJU)
- `.title` → role (e.g., Chief Financial Officer)
- `.full-name` → full legal name
- Re-export PNGs with `node export-card-png.mjs`

## Logo Dependency

The card uses `../../src/assets/brand/logo-legacy.png` (relative path from this folder to the project's brand assets). If the file moves, update the `src` attributes in the HTML.
