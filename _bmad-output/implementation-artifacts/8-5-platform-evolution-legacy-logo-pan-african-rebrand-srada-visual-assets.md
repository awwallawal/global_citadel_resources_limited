# ~~Story 8.5~~ SUPERSEDED — Restructured to Epic 9 (Stories 9.1–9.5)

Status: superseded

**Reason:** Story was too large (34 ACs, 24 tasks, 6 workstreams) and misplaced in Epic 8 (Quality & Launch). Restructured into 5 properly-sized stories under new Epic 9: Platform Evolution & Brand Maturation. See `epics.md` Epic 9 for the replacement stories.

**Date:** 2026-04-06

---

*The content below is retained for reference but is no longer the active specification. Individual story files for 9.1–9.5 will be created by the Scrum Master when ready for sprint planning.*

---

# Original Story 8.5 (Archived)

Status: superseded

## Story

As a **visitor** (investor, customer, or general public),
I want the platform to reflect GRCL's heritage identity, pan-African ambition, community impact commitment, and professional visual presentation,
So that I perceive GRCL as an established, socially responsible, continent-scale business worth engaging with.

## Reference Spec

**`_bmad-output/planning-artifacts/platform-evolution-spec-v1.md`** — the master spec with every copy change, image direction, and print design. This story file provides implementation-ready context; the spec has the full rationale and page-by-page tables.

## Acceptance Criteria (Grouped by Workstream)

### AC1: Legacy Logo Swap
1. Header displays `logo-legacy.png` (transparent bg) instead of `grcl-emblem.png` — 60-80px desktop, 40-48px mobile
2. Footer displays `logo-legacy.png` at 56px height
3. Favicon uses `logo-legacy-favicon.png` (already at `src/assets/brand/`)
4. All logo references site-wide use legacy assets consistently
5. Old assets (`grcl-emblem.png`, `grcl-emblem-alt.png`) retained in repo but no longer imported

### AC2: Pan-African Copy Rewrite
6. Homepage hero: "Building Africa's Future From Nigeria's Strongest Foundations"
7. All 7 division YAML taglines, overviews, capabilities, and SEO metadata updated per spec Section 3.5
8. All 3 cluster YAML taglines, overviews, and SEO metadata updated per spec Section 3.6
9. About page (`.astro` + `.mdx`) reflects pan-African positioning with Nigerian grounding per spec Section 3.3
10. Investors & Partners page updated per spec Section 3.7
11. Footer brand statement updated per spec Section 3.9
12. SEO module Organization JSON-LD description updated per spec Section 3.10
13. FAQ content: 6 corrections (including Abuja→Lagos HQ fix) + 2 new entries per spec Section 3.11
14. Credibility stat "6 Nigerian States" → "Operations Across West Africa"
15. Legal pages (privacy, terms) unchanged — jurisdiction stays Nigerian

### AC3: SRADA Community Impact (Option A)
16. New page at `/community-impact/` with Hero, About SRADA, Impact Areas, CTA sections
17. About page: new "Community Impact" anchor section after Group Structure, before Credentials
18. Homepage: new "Community Impact" section between Credibility Stats and Insights
19. Desktop nav: "Community Impact" link added (after Insights, before Investors & Partners)
20. Mobile nav: "Community Impact" added to `NAV_LINKS_AFTER` array
21. Footer: "Community Impact" link added to "The Group" column
22. Contact hub: new SRADA/Community pathway card

### AC4: Royalty-Free Images
23. Each page has African-context photography per spec Section 4
24. All images use Astro `<Image>` / `<Picture>` with WebP/AVIF conversion
25. Hero images < 150KB compressed, section images < 80KB
26. All images lazy-loaded below fold
27. `src/assets/images/ATTRIBUTIONS.md` tracks all image sources
28. No Western stock photography — all imagery shows African context

### AC5: Business Card Designs (3 Concepts)
29. 3 self-contained HTML files in `_bmad-output/planning-artifacts/` (Heritage Classic, Modern Executive, Pan-African Bold)
30. Each renders front + back of 90x55mm card
31. Each uses legacy logo, Poppins + Inter, forest green + gold
32. Editable name/title/division/contact placeholder fields

### AC6: Letterhead Update
33. `letterhead-grcl-v3.html` exists with legacy logo replacing ornate emblem
34. All other letterhead elements unchanged

## Tasks / Subtasks

### Phase 1: Logo Swap (AC: 1-5)
- [ ] **Task 1: Update Header logo import** (AC: 1)
  - [ ] In `src/components/layout/Header.astro` line 8: change `import emblemLogo from '@/assets/brand/grcl-emblem.png'` → `import legacyLogo from '@/assets/brand/logo-legacy.png'`
  - [ ] Update `getImage()` call (line 17): change `src: emblemLogo` → `src: legacyLogo`, adjust width/height to 80x80
  - [ ] Update mobile `<Image>` (line ~70): change `src={emblemLogo}` → `src={legacyLogo}`, set width=40 height=40
  - [ ] Update `optimizedEmblem` variable name → `optimizedLogo` throughout
- [ ] **Task 2: Update Footer logo import** (AC: 2)
  - [ ] In `src/components/layout/Footer.astro` line 7: change `import emblemLogo from '@/assets/brand/grcl-emblem.png'` → `import legacyLogo from '@/assets/brand/logo-legacy.png'`
  - [ ] Update `<Image>` usage (line ~108): change `src={emblemLogo}` → `src={legacyLogo}`, keep width=56 height=56
- [ ] **Task 3: Update favicon** (AC: 3)
  - [ ] Copy `src/assets/brand/logo-legacy-favicon.png` to `public/favicon.png` (overwrite existing)
  - [ ] Verify `<link rel="icon">` in `src/layouts/BaseLayout.astro` line 65 still points to `/favicon.png`

### Phase 2: Pan-African Copy Rewrite (AC: 6-15)
- [ ] **Task 4: Update homepage copy** (AC: 6, 14)
  - [ ] `src/pages/index.astro`: Hero heading → "Building Africa's Future From Nigeria's Strongest Foundations"
  - [ ] Hero subtitle: append "across Africa's fastest-growing markets"
  - [ ] Business Overview heading: "A Pan-African Business Built for Scale"
  - [ ] Business Overview subtitle: "markets across the continent" / "Africa's next phase of growth"
  - [ ] Credibility stat: "6 Nigerian States" → "Operations Across West Africa"
  - [ ] Credibility stat: "40+ Business Partners" → "40+ Partners Across Africa"
- [ ] **Task 5: Update all 7 division YAML files** (AC: 7)
  - [ ] `src/content/divisions/crop-farming.yaml` — 4 changes per spec Section 3.5.1
  - [ ] `src/content/divisions/animal-husbandry.yaml` — 3 changes per spec Section 3.5.2
  - [ ] `src/content/divisions/agro-processing.yaml` — 2 changes per spec Section 3.5.3
  - [ ] `src/content/divisions/commodity-marketing.yaml` — 2 changes per spec Section 3.5.4
  - [ ] `src/content/divisions/import-export.yaml` — 3 changes per spec Section 3.5.5
  - [ ] `src/content/divisions/real-estate.yaml` — 5 changes per spec Section 3.5.6
  - [ ] `src/content/divisions/oil-gas.yaml` — 4 changes per spec Section 3.5.7
- [ ] **Task 6: Update all 3 cluster YAML files** (AC: 8)
  - [ ] `src/content/clusters/agriculture-processing.yaml` — 2 changes per spec Section 3.6
  - [ ] `src/content/clusters/trade-markets.yaml` — 2 changes per spec Section 3.6
  - [ ] `src/content/clusters/built-environment-energy.yaml` — 3 changes per spec Section 3.6
- [ ] **Task 7: Update About page** (AC: 9)
  - [ ] `src/pages/about.astro`: subtitle → pan-African positioning
  - [ ] `src/content/pages/about.mdx`: update 4 body paragraphs + mission + vision + sustainability value per spec Section 3.3
  - [ ] Group Structure body text: add "across multiple African markets"
- [ ] **Task 8: Update Investors & Partners page** (AC: 10)
  - [ ] `src/pages/investors-partners.astro`: subtitle → pan-African framing
  - [ ] `src/content/pages/investors-partners.mdx`: update whyPartner (3 paragraphs) + body per spec Section 3.7
  - [ ] Stats: "6+ Markets Served" → "Markets Across Africa"
- [ ] **Task 9: Update Footer brand statement** (AC: 11)
  - [ ] `src/components/layout/Footer.astro`: brand paragraph → "pan-African conglomerate headquartered in Lagos"
- [ ] **Task 10: Update SEO module** (AC: 12)
  - [ ] `src/lib/seo.ts`: Organization JSON-LD description → "A pan-African conglomerate headquartered in Lagos, Nigeria..."
- [ ] **Task 11: Update FAQ content** (AC: 13)
  - [ ] `src/content/faqs/faqs.yaml`: 6 existing entry corrections + 2 new entries per spec Section 3.11
  - [ ] CRITICAL: Fix "Abuja" → "Lagos" in `homepage-where-operates` (current copy says "headquartered in Abuja" — HQ is Lagos)

### Phase 3: SRADA Community Impact (AC: 16-22)
- [ ] **Task 12: Create Community Impact page** (AC: 16)
  - [ ] Create `src/pages/community-impact.astro` following About page pattern (PageLayout, SectionWrapper sections, SEO metadata)
  - [ ] Sections: Hero (eyebrow "Community Impact"), About SRADA, Impact Areas (capability cards pattern), CTA Banner
  - [ ] Use draft copy from spec Section 2.5 — mark sections needing client input with HTML comments
- [ ] **Task 13: Add Community Impact to About page** (AC: 17)
  - [ ] `src/pages/about.astro`: add new anchor section after Group Structure (#group-structure), before Credentials (#credentials)
  - [ ] Add "Community Impact" to the AnchorNav items array
  - [ ] Brief SRADA summary with CTA link to `/community-impact/`
- [ ] **Task 14: Add Community Impact to Homepage** (AC: 18)
  - [ ] `src/pages/index.astro`: insert new `<SectionWrapper>` between CredibilityBar (line ~148) and Insights section (line ~150)
  - [ ] Eyebrow: "Community Impact", Heading: "Giving Back to the Communities That Sustain Us"
  - [ ] SRADA feature card with link to `/community-impact/`
- [ ] **Task 15: Update navigation** (AC: 19, 20)
  - [ ] `src/components/navigation/DesktopNav.tsx`: add `<NavigationMenuItem>` for "Community Impact" (href="/community-impact/") after Insights (line ~202), before Investors & Partners (line ~205). Follow existing `linkClass()` + `isActive()` pattern
  - [ ] `src/components/navigation/MobileNav.tsx`: add `{ label: 'Community Impact', href: '/community-impact/' }` to `NAV_LINKS_AFTER` array (line ~45), position after Insights before Investors & Partners
- [ ] **Task 16: Update Footer nav** (AC: 21)
  - [ ] `src/components/layout/Footer.astro`: add "Community Impact" link to "The Group" column, after "Group Structure" before "Credentials"
- [ ] **Task 17: Add SRADA to Contact hub** (AC: 22)
  - [ ] `src/pages/contact/index.astro`: add new pathway card — icon: heart/handshake, title: "Community & SRADA", description: "For community partnership, volunteer, or SRADA enquiries.", link to `/contact/general/` with subject pre-fill or to `/community-impact/` with contact CTA

### Phase 4: Image Sourcing & Integration (AC: 23-28)
- [ ] **Task 18: Source royalty-free images** (AC: 23, 28)
  - [ ] Source images per spec Section 4.3 table (page-by-page requirements)
  - [ ] Priority sources: Iwaria (iwaria.com), Unsplash, Pexels, Nappy.co — African context only
  - [ ] Save to `src/assets/images/` following naming convention in spec Section 4.4
  - [ ] 1 hero image per major page, 1 image per Bento grid division card, SRADA images
- [ ] **Task 19: Integrate images into pages** (AC: 24, 25, 26)
  - [ ] Use Astro `<Image>` component with `width`, `height`, `format="webp"` props
  - [ ] Hero images: eager loading (above fold), all others: `loading="lazy"`
  - [ ] Verify compressed sizes meet budget (hero < 150KB, section < 80KB)
- [ ] **Task 20: Create attributions file** (AC: 27)
  - [ ] Create `src/assets/images/ATTRIBUTIONS.md` with format: `filename | source | photographer | license | URL`

### Phase 5: Print Collateral (AC: 29-34)
- [ ] **Task 21: Create Business Card Concept 1 — Heritage Classic** (AC: 29-32)
  - [ ] `_bmad-output/planning-artifacts/business-card-concept-1.html` — self-contained HTML/CSS
  - [ ] Front: white bg, centred legacy logo 20mm, gold accent line, name/title centred (Poppins 600 / Inter 400)
  - [ ] Back: contact stack left-aligned, green footer bar with company name, gold accent line
- [ ] **Task 22: Create Business Card Concept 2 — Modern Executive** (AC: 29-32)
  - [ ] `_bmad-output/planning-artifacts/business-card-concept-2.html`
  - [ ] Front: white bg, logo top-left 15mm, name large bold left, title in gold, vertical gold accent right
  - [ ] Back: forest green bg, white/gold contact details, QR code bottom-right
- [ ] **Task 23: Create Business Card Concept 3 — Pan-African Bold** (AC: 29-32)
  - [ ] `_bmad-output/planning-artifacts/business-card-concept-3.html`
  - [ ] Front: deep green full bg, reversed logo centred 22mm, white name, gold title
  - [ ] Back: white bg, Africa continent watermark 10% opacity, centred contact details, "Pan-African Excellence" tagline
- [ ] **Task 24: Update Letterhead** (AC: 33-34)
  - [ ] Create `_bmad-output/planning-artifacts/letterhead-grcl-v3.html` based on letterhead-grcl-v2.html
  - [ ] Replace ornate emblem reference with `logo-legacy.png`
  - [ ] Keep all other elements identical (typography, contact row, gradient line, footer)

## Dev Notes

### Critical Constraints
- **Astro by default.** Community Impact page = `.astro` file. No React needed — it's static content.
- **No arbitrary Tailwind values.** All spacing/colours from design tokens.
- **Mobile-first.** All new sections must work on small screens first.
- **Single H1 per page.** Community Impact page gets one H1 in the hero.
- **No "Coming Soon" text.** If SRADA data is pending from client, show graceful structure with placeholder copy, not "coming soon".
- **Island hydration unchanged.** No new React islands needed for this story — all additions are static Astro content.
- **Pan-African claims must be credible.** Use "extending across", "growing presence", "positioned for" — not "operating in 20 countries". Frame as trajectory, not overpromise.

### Logo Swap — Exact Code Changes

**Header.astro (line 8):**
```diff
- import emblemLogo from '@/assets/brand/grcl-emblem.png';
+ import legacyLogo from '@/assets/brand/logo-legacy.png';
```

**Header.astro (line ~17):**
```diff
- const optimizedEmblem = await getImage({ src: emblemLogo, width: 80, height: 80, format: 'webp' });
+ const optimizedLogo = await getImage({ src: legacyLogo, width: 80, height: 80, format: 'webp' });
```

**Header.astro (line ~51, desktop nav prop):**
```diff
- logoSrc={optimizedEmblem.src}
+ logoSrc={optimizedLogo.src}
```

**Header.astro (line ~70, mobile bar):**
```diff
- <Image src={emblemLogo} alt="Global Resources Citadel" width={40} height={40} class="h-10 w-auto" />
+ <Image src={legacyLogo} alt="Global Resources Citadel" width={40} height={40} class="h-10 w-auto" />
```

**Footer.astro (line 7):**
```diff
- import emblemLogo from '@/assets/brand/grcl-emblem.png';
+ import legacyLogo from '@/assets/brand/logo-legacy.png';
```

**Footer.astro (line ~108):**
```diff
- <Image src={emblemLogo} ...
+ <Image src={legacyLogo} ...
```

**DesktopNav.tsx (line ~97, fallback):**
```diff
- <img src={logoSrc || '/brand/grcl-emblem.png'} ...
+ <img src={logoSrc || '/brand/logo-legacy.png'} ...
```

### Navigation — Exact Insertion Points

**DesktopNav.tsx:** Add new `<NavigationMenuItem>` at line ~203 (after Insights, before Investors & Partners):
```tsx
<NavigationMenuItem>
  <NavigationMenuLink
    href="/community-impact/"
    className={linkClass('/community-impact/')}
    aria-current={isActive('/community-impact/', currentPath) ? 'page' : undefined}
  >
    Community Impact
  </NavigationMenuLink>
</NavigationMenuItem>
```

**MobileNav.tsx:** Add to `NAV_LINKS_AFTER` array (line ~45):
```tsx
{ label: 'Community Impact', href: '/community-impact/' },
```
Position: after Insights, before Investors & Partners.

### Homepage Section Insertion

Insert new `<SectionWrapper>` between CredibilityBar (line ~148) and Insights (line ~150) in `src/pages/index.astro`. Follow existing section pattern:
```astro
<SectionWrapper variant="light">
  <SectionHeading
    eyebrow="Community Impact"
    title="Giving Back to the Communities That Sustain Us"
  />
  <!-- SRADA card content -->
</SectionWrapper>
```

### Copy Change Reference

All ~60 text changes are specified in the evolution spec's page-by-page tables (Sections 3.2–3.11). Each table shows Current → Proposed with exact text. The dev agent MUST use those exact proposed strings — do NOT paraphrase or improvise copy.

### Existing Component Patterns to Reuse
- `SectionWrapper` — wraps every section with consistent padding and bg variants
- `SectionHeading` — H2 Poppins semibold, optional gold eyebrow, optional subtitle
- `CTABanner` — reusable CTA component with heading, body, primary/secondary CTAs
- `FAQSection` — FAQ accordion filtered by category
- `<Image>` from `astro:assets` — all image rendering with optimization
- Capability cards pattern from division detail pages — reuse for SRADA Impact Areas

### Business Card & Letterhead HTML Pattern

Follow the existing letterhead pattern (`_bmad-output/planning-artifacts/letterhead-grcl-v2.html`):
- Self-contained HTML with embedded CSS (no external dependencies)
- Use Google Fonts CDN links for Poppins + Inter
- A4 for letterhead, 90x55mm for cards
- Print-ready: `@media print` styles, `Ctrl+P` → PDF workflow
- Embed the logo as base64 data URI in the HTML for portability

### Project Structure Notes

All new files follow existing conventions:
- Pages: `src/pages/community-impact.astro` (kebab-case)
- Images: `src/assets/images/{category}/{name}.{ext}` (new directory structure)
- Print collateral: `_bmad-output/planning-artifacts/` (existing pattern)
- Content: edit existing YAML/MDX files in `src/content/` (no new collections needed)

No new dependencies, no new React islands, no new content collections, no schema changes.

### Testing Considerations

- Run existing E2E tests after changes — navigation tests must still pass with new nav item
- Verify Community Impact page renders at all responsive breakpoints
- Verify logo renders correctly at all sizes (header solid, header transparent, footer, favicon)
- Run Lighthouse on homepage and community-impact page — must maintain 90+ scores
- Image budget: verify no page exceeds 500KB initial weight after image additions

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md] — Master spec with all copy changes
- [Source: _bmad-output/planning-artifacts/brand-identity.md] — Brand system and colour tokens
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md] — Component patterns, section structure
- [Source: docs/project-context.md] — Tech stack, naming conventions, architecture decisions
- [Source: CLAUDE.md] — Critical rules, import order, path aliases
- [Source: src/components/layout/Header.astro] — Current logo implementation (line 8, 17, 51, 70)
- [Source: src/components/layout/Footer.astro] — Current logo implementation (line 7, 108)
- [Source: src/components/navigation/DesktopNav.tsx] — Nav item pattern (lines 102-224)
- [Source: src/components/navigation/MobileNav.tsx] — NAV_LINKS_AFTER array (lines 40-49)
- [Source: src/pages/index.astro] — Homepage section order (lines 62-197)
- [Source: src/layouts/BaseLayout.astro] — Favicon reference (line 65)
- [Source: src/lib/seo.ts] — Organization JSON-LD

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
