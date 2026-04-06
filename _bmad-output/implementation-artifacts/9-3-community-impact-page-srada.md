# Story 9.3: Community Impact Page & Site Integration (SRADA)

Status: review

## Story

As a **visitor**,
I want to learn about GRCL's community impact and social responsibility work,
So that I perceive GRCL as a socially responsible business that gives back to its communities.

## Acceptance Criteria

1. New page exists at `/community-impact/` with Hero, About SRADA, Impact Areas, and CTA sections
2. Page follows existing Astro patterns (PageLayout, SectionWrapper, SectionHeading, single H1)
3. About page includes new "Community Impact" anchor section after Group Structure, before Credentials
4. Homepage includes new "Community Impact" section between Credibility Stats and Insights
5. Desktop nav includes "Community Impact" link after Insights, before Investors & Partners
6. Mobile nav includes "Community Impact" in `NAV_LINKS_AFTER` array
7. Footer "The Group" column includes "Community Impact" link
8. Contact hub includes new SRADA/Community pathway card
9. Investors & Partners page includes Social Impact subsection
10. SRADA copy uses draft content from spec Section 2.5 — no "Coming Soon" text

## Tasks / Subtasks

- [x] **Task 1: Create Community Impact page** (AC: 1, 2, 10)
  - [x] Create `src/pages/community-impact.astro` as standalone Astro page (hardcoded content, no MDX — matches spec "like the About page pattern")
  - [x] Import pattern: PageLayout, BreadcrumbNav, SectionWrapper, SectionHeading, CTABanner, generateMetadata, generateBreadcrumbJsonLd, type BreadcrumbItem
  - [x] Breadcrumbs: `[{ label: 'Home', href: '/' }, { label: 'Community Impact' }]`
  - [x] SEO: title `"Community Impact — Strengthening Rural Communities | Global Resources Citadel"`, description `"Learn about SRADA, Global Resources Citadel's dedicated social impact initiative strengthening rural farming communities across Africa through training, agricultural input access, and infrastructure support."`
  - [x] **Hero section** (SectionWrapper variant="primary"): Eyebrow "Community Impact", H1 "Strengthening Rural Communities Across Africa", subtitle "Global Resources Citadel's dedicated social impact initiative, channelling agricultural expertise into sustainable rural development." No hero image for now — image sourcing is deferred to Story 9.4.
  - [x] **About SRADA section** (SectionWrapper variant="default"): Use draft copy from spec Section 2.5 — 3 paragraphs about SRADA's mission, relationship to GRCL, and philosophy. SectionHeading "About SRADA".
  - [x] **Impact Areas section** (SectionWrapper variant="light"): SectionHeading eyebrow="What We Do", heading "Our Impact Areas". 4 cards in 2x2 grid (grid-cols-1 md:grid-cols-2 gap-6): (1) Rural Farmer Training & Capacity Building, (2) Agricultural Input Access & Supply Chain Support, (3) Community Infrastructure Development, (4) Knowledge Transfer & Best Practice Dissemination. Each card: icon + name + description paragraph. Use a simple card pattern (div with bg-white rounded-2xl p-6 shadow-sm border border-neutral-100) — do NOT use DivisionFeatureCard component (that's for divisions).
  - [x] **How to Get Involved section** (SectionWrapper variant="default"): SectionHeading "Get Involved", body text about partnership/volunteer opportunities. CTA link labelled "Partner With SRADA" → `/contact/general/?subject=srada` (query param enables future pre-fill if form is enhanced)
  - [x] **CTA Banner** (CTABanner component): heading "Building Stronger Rural Communities Together", body about partnering with SRADA, primaryCta `{ label: 'Partner With SRADA', href: '/contact/general/?subject=srada' }`, secondaryCta `{ label: 'Learn About Our Divisions', href: '/divisions/' }`, variant="dark"
  - [x] Omit Impact Stats section (no real data exists — spec says "if available, otherwise omit, don't fabricate")
  - [x] No "Coming Soon" text anywhere — use the draft copy, which reads as real content

- [x] **Task 2: Add Community Impact to homepage** (AC: 4)
  - [x] `src/pages/index.astro` — Insert new section AFTER CredibilityBar (ends line ~148), BEFORE Latest Insights section (starts line ~150)
  - [x] Use SectionWrapper variant="light" (already imported)
  - [x] SectionHeading with eyebrow="Community Impact", centered, heading "Giving Back to the Communities That Sustain Us"
  - [x] Brief SRADA description paragraph (2-3 sentences) + feature card with link to `/community-impact/`
  - [x] Card content: SRADA name, short description, "Learn About Our Impact" link with arrow
  - [x] Follow existing section pattern — centered text block, then content, matches adjacent sections

- [x] **Task 3: Add Community Impact anchor to About page** (AC: 3)
  - [x] `src/pages/about.astro` — Add to anchorItems array (line ~58-64): insert `{ label: 'Community Impact', href: '#community-impact' }` AFTER `{ label: 'Group Structure', href: '#group-structure' }` (line 62), BEFORE `{ label: 'Credentials', href: '#credentials' }` (line 63)
  - [x] Insert new SectionWrapper (variant="default", id="community-impact") AFTER Group Structure section (ends line ~220), BEFORE Credentials section (starts line ~222)
  - [x] SectionHeading centered: "Giving Back Through SRADA"
  - [x] 2-3 paragraph summary of SRADA (brief version of the full page content)
  - [x] CTA link: "Learn More About Our Impact" → `/community-impact/` using existing arrow link pattern: `class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 motion-safe:transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"`

- [x] **Task 4: Add Community Impact to desktop nav** (AC: 5)
  - [x] `src/components/navigation/DesktopNav.tsx` — Insert new `<NavigationMenuItem>` AFTER Insights item (ends line ~202), BEFORE Investors & Partners item (starts line ~204)
  - [x] Follow exact existing pattern:
    ```tsx
    {/* Community Impact */}
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

- [x] **Task 5: Add Community Impact to mobile nav** (AC: 6)
  - [x] `src/components/navigation/MobileNav.tsx` — Add to NAV_LINKS_AFTER array (lines 45-49): insert `{ label: 'Community Impact', href: '/community-impact/' }` AFTER Insights entry (line 46), BEFORE Investors & Partners entry (line 47)

- [x] **Task 6: Add Community Impact to footer** (AC: 7)
  - [x] `src/components/layout/Footer.astro` — In "The Group" column links array (lines 23-27): insert `{ label: 'Community Impact', href: '/community-impact/' }` AFTER Group Structure entry (line 26), BEFORE Credentials entry (line 27)

- [x] **Task 7: Add SRADA pathway card to Contact hub** (AC: 8)
  - [x] `src/pages/contact/index.astro` — Add new PathwayCard AFTER the last existing card (Locations, ends line ~124), BEFORE closing `</div>` (line ~125)
  - [x] Follow existing PathwayCard pattern:
    ```astro
    <PathwayCard
      heading="Community & Social Impact"
      description="For community partnership, volunteer, or SRADA enquiries."
      linkLabel="Get In Touch"
      href="/contact/general/?subject=srada"
    >
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.88-4.5 2.23A6.65 6.65 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </PathwayCard>
    ```
  - [x] SVG: heart icon (Lucide heart) — represents social impact/giving back

- [x] **Task 8: Add Social Impact to Investors & Partners page** (AC: 9)
  - [x] `src/pages/investors-partners.astro` — Insert new SectionWrapper AFTER Governance & Credibility section (ends line ~240), BEFORE Latest Updates section (starts line ~242)
  - [x] SectionWrapper variant="light"
  - [x] SectionHeading centered, subtitle="Our commitment to sustainable development and community empowerment across the regions where we operate.": "Community Impact & Social Responsibility"
  - [x] Body: 1-2 paragraphs positioning SRADA as part of GRCL's ESG narrative, with CTA link to `/community-impact/`
  - [x] Follow the same `mx-auto max-w-2xl text-center` pattern used on About page sections

- [x] **Task 9: Build verification** (AC: 1-10)
  - [x] Run `npm run build` — must complete with zero errors
  - [x] Verify `/community-impact/` page is generated in build output
  - [x] Verify no "Coming Soon" text appears anywhere in the new content
  - [x] Verify single H1 on community-impact page
  - [x] Run grep for "Coming Soon" across all files — must return zero results in src/

## Dev Notes

### SRADA Entity Details

- **Full name:** Support Rural Agricultural Development Association (SRADA)
- **Type:** Charity / voluntary organisation — NOT a commercial division
- **Logo:** Uses GRCL brand (no separate SRADA logo — confirmed by client, spec Section 8.1)
- **Relationship:** Social impact initiative founded and supported by the Group
- **Positioning:** Standalone Community Impact arm (like Dangote Foundation, Heirs Foundation)

### Draft Copy — Use Verbatim from Spec Section 2.5

**About SRADA (3 paragraphs):**

> The Support Rural Agricultural Development Association (SRADA) is Global Resources Citadel's dedicated social impact initiative, founded to channel the Group's agricultural expertise into sustainable rural community development across Africa.
>
> While GRCL's commercial divisions build integrated value chains at industrial scale, SRADA works at the grassroots — training smallholder farmers, improving access to quality agricultural inputs, and strengthening the rural infrastructure that underpins Africa's food security.
>
> SRADA represents GRCL's belief that lasting business success and community prosperity are inseparable. By investing in the capacity of rural farming communities, we strengthen the foundation on which Africa's agricultural economy grows.

### Impact Areas — 4 Cards

1. **Rural Farmer Training & Capacity Building** — Practical training programmes that equip smallholder farmers with modern agricultural techniques, business management skills, and post-harvest handling practices to improve yields and market readiness.
2. **Agricultural Input Access & Supply Chain Support** — Connecting rural farming communities with quality seeds, fertilisers, and equipment through facilitated supply chain partnerships that reduce costs and improve productivity.
3. **Community Infrastructure Development** — Supporting the construction and improvement of rural infrastructure — from storage facilities and access roads to water systems — that enables farming communities to thrive.
4. **Knowledge Transfer & Best Practice Dissemination** — Bridging the gap between commercial agricultural innovation and smallholder practice through extension services, demonstration plots, and peer-to-peer learning networks.

### Page Structure — No MDX Needed

Create as a standalone `src/pages/community-impact.astro` file with all content hardcoded. Reasons:
- No separate content collection entry needed (spec Section 2.4 says "no new content collection needed")
- Content is stable draft copy, not frequently edited content
- Follows the same pattern as most existing pages where content is inline
- Avoids schema changes to the pages content collection

### Deliberate Spec Deviations

1. **Nav placement:** Spec Section 2.2 says "New item under 'About the Group' dropdown." However, "About the Group" is a plain link in both DesktopNav (line 113-122) and MobileNav (line 42) — no dropdown/accordion exists. Only Divisions has a dropdown. Community Impact is placed as a top-level nav item instead, which gives it appropriate visibility as a standalone page at `/community-impact/`.
2. **Hero image omitted:** Spec Section 2.3 specifies "Image: Authentic rural agricultural community scene." Image sourcing is deferred to Story 9.4 — this story creates the page structure with text content only. A placeholder-free hero (text on primary background) is used, matching the variant="primary" pattern.
3. **SRADA contact routing:** Spec says "routes to contact form with SRADA variant." No SRADA-specific form variant exists. Links use `/contact/general/?subject=srada` as a lightweight hint — the form can be enhanced later to read the query param and pre-select a SRADA subject.

### What NOT to Do

- Do NOT create a new content collection for SRADA — hardcode in the .astro page
- Do NOT add SRADA to the divisions Bento grid — it's not a commercial division
- Do NOT create a `src/content/divisions/srada.yaml` — SRADA is Option A (standalone)
- Do NOT fabricate impact statistics — if no real data, omit the stats section entirely
- Do NOT add "Coming Soon" text anywhere
- Do NOT create new React islands — all new content is static Astro
- Do NOT modify the Bento grid component or division card patterns for SRADA
- Do NOT add new Tailwind arbitrary values — use existing design tokens only

### Navigation Insertion — Exact Positions

**DesktopNav.tsx:** New `<NavigationMenuItem>` goes AFTER line ~202 (closing tag of Insights item), BEFORE line ~204 (opening of Investors & Partners item). Uses existing `linkClass()` + `isActive()` pattern.

**MobileNav.tsx:** NAV_LINKS_AFTER array (lines 45-49). Insert new entry at index 1 (after Insights, before Investors & Partners).

**Footer.astro:** "The Group" column links array (lines 23-27). Insert after Group Structure (line 26), before Credentials (line 27).

### Component Reuse — What's Available

| Component | Usage | Import From |
|-----------|-------|-------------|
| PageLayout | Page wrapper with SEO | `@/layouts/PageLayout.astro` |
| BreadcrumbNav | Breadcrumb trail | `@/components/layout/BreadcrumbNav.astro` |
| SectionWrapper | Section container with variant styling | `@/components/layout/SectionWrapper.astro` |
| SectionHeading | Section H2 with optional eyebrow/subtitle | `@/components/layout/SectionHeading.astro` |
| CTABanner | Call-to-action banner | `@/components/shared/CTABanner.astro` |
| PathwayCard | Contact hub card | `@/components/contact/PathwayCard.astro` |
| generateMetadata | SEO metadata builder | `@/lib/seo` |
| generateBreadcrumbJsonLd | Breadcrumb schema | `@/lib/seo` |

Do NOT use DivisionFeatureCard for Impact Areas — that component is linked to division slugs and cluster accent colours. Build simple custom cards instead.

### SectionWrapper Variants Reference

- `default` — `bg-white text-neutral-900`
- `light` — `bg-neutral-50 text-neutral-900`
- `dark` — `bg-neutral-900 text-white`
- `primary` — `bg-primary-50 text-neutral-900`
- `hero` — hero gradient

### Previous Story Intelligence

Story 9.1 (Logo Swap): Changed Header.astro (line 8 now imports `legacyLogo`), Footer.astro (line 7 now imports `legacyLogo`), DesktopNav.tsx (line 96 fallback updated). These files are being edited again in this story — do not revert logo changes.

Story 9.2 (Pan-African Copy): Changed Footer.astro brand statement (lines ~117-121), homepage copy, about page copy, FAQs, etc. The footer brand paragraph now reads "pan-African conglomerate headquartered in Lagos" — do not revert when adding the footer nav link.

### Testing Considerations

- No existing tests reference navigation item count or specific nav labels — adding a nav item won't break E2E tests
- Run `npm run build` to verify the new page generates correctly
- Check the community-impact page has exactly one H1
- Verify breadcrumbs render correctly (Home > Community Impact)
- Spot-check all 8 integration points: page, homepage section, about section, desktop nav, mobile nav, footer, contact hub, investors page

### Project Structure Notes

New files:
- `src/pages/community-impact.astro` — only new file in this story

Modified files:
- `src/pages/index.astro` — new section
- `src/pages/about.astro` — new anchor + section
- `src/components/navigation/DesktopNav.tsx` — new nav item
- `src/components/navigation/MobileNav.tsx` — new nav item
- `src/components/layout/Footer.astro` — new link
- `src/pages/contact/index.astro` — new pathway card
- `src/pages/investors-partners.astro` — new section

No new dependencies, no schema changes, no new React islands.

### References

- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 2] — Full SRADA spec: positioning, IA, page structure, content, draft copy
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 3.2] — Homepage Community Impact section spec
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 3.3] — About page Community Impact anchor spec
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 3.7] — Investors & Partners Social Impact spec
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 3.8] — Contact hub SRADA card spec
- [Source: _bmad-output/planning-artifacts/platform-evolution-spec-v1.md#Section 3.9] — Footer Community Impact link spec
- [Source: _bmad-output/planning-artifacts/epics.md#Story 9.3] — Acceptance criteria
- [Source: src/pages/about.astro] — Page pattern template (PageLayout, sections, anchors)
- [Source: src/components/navigation/DesktopNav.tsx] — Nav item pattern (lines 193-213)
- [Source: src/components/navigation/MobileNav.tsx] — NAV_LINKS_AFTER array (lines 45-49)
- [Source: src/components/layout/Footer.astro] — Footer links array (lines 23-27)
- [Source: src/pages/contact/index.astro] — PathwayCard pattern (lines 73-83)
- [Source: CLAUDE.md] — Critical rules: Astro by default, single H1, no "Coming Soon"

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
- No issues encountered — clean build on first attempt.

### Completion Notes List
- Created standalone community-impact.astro page with Hero, About SRADA, Impact Areas (4 cards), Get Involved, and CTA Banner sections
- All content uses verbatim draft copy from spec Section 2.5 — no "Coming Soon" text
- Impact Stats section intentionally omitted (no real data)
- Integrated into 7 site-wide touchpoints: homepage section, about anchor section, desktop nav, mobile nav, footer link, contact hub pathway card, investors page social impact section
- Nav placement: top-level item (not under About dropdown, which doesn't exist) — per deliberate spec deviation
- SRADA contact routing: /contact/general/?subject=srada pattern
- All existing patterns followed: SectionWrapper variants, SectionHeading, CTABanner, PathwayCard, arrow link pattern
- No new React islands, no schema changes, no new dependencies
- Build passes with zero errors, all 174 tests pass, zero regressions

### Change Log
- 2026-04-07: Implemented Community Impact page and 7 site integration points (AC 1-10)

### File List
- src/pages/community-impact.astro (new — standalone SRADA page)
- src/pages/index.astro (modified — new Community Impact section after CredibilityBar)
- src/pages/about.astro (modified — new anchor item + Community Impact section after Group Structure)
- src/components/navigation/DesktopNav.tsx (modified — new nav item after Insights)
- src/components/navigation/MobileNav.tsx (modified — new entry in NAV_LINKS_AFTER)
- src/components/layout/Footer.astro (modified — new link in "The Group" column)
- src/pages/contact/index.astro (modified — new SRADA pathway card)
- src/pages/investors-partners.astro (modified — new Social Impact section)
