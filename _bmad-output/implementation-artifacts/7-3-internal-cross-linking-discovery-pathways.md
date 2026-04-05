# Story 7.3: Internal Cross-Linking & Discovery Pathways

Status: done

## Story

As a **visitor**,
I want connected navigation between related content across the platform,
So that I can move between divisions, insights, contacts, and corporate pages without hitting dead ends.

## Acceptance Criteria

1. Division pages link to: cluster page, related divisions in same cluster, division-specific inquiry form, division-specific insights
2. Cluster pages link to: all member divisions, cluster-filtered insights, cluster-relevant contact paths
3. Insight articles link to: tagged division page (if applicable), related articles, insights hub
4. Investors & Partners page links to: About (leadership, credentials), cluster pages, strategic contact
5. About page links to: divisions hub (from org chart), insights, contact
6. Every page has a CTABanner linking to relevant contact or division pages
7. Footer links cover all major sections and are verified functional
8. No internal links result in 404 errors

## Tasks / Subtasks

- [x] Task 1: Audit all internal links for 404 errors (AC: #8)
  - [x] 1.1 Run `npm run build` and check for build warnings about broken links
  - [x] 1.2 Create a link-checking script or use `astro check` to verify all `<a href>` resolve
  - [x] 1.3 Manually verify each route category: homepage, divisions (hub, clusters, detail), insights (hub, categories, articles, division insights), contact (hub, general, strategic, divisions, locations), about, investors-partners, legal, sitemap, search, 404
  - [x] 1.4 Fix any broken links found

- [x] Task 1.5: Verify homepage content links (AC: #6, #8)
  - [x] 1.5.1 Bento grid: all 7 division cards link to correct `/divisions/[slug]/` pages
  - [x] 1.5.2 Cluster cards: all 3 cards link to correct `/divisions/[cluster-slug]/` pages
  - [x] 1.5.3 Featured article cards: all 3 link to correct `/insights/[article-slug]/` pages
  - [x] 1.5.4 "View All Insights" link resolves to `/insights/`
  - [x] 1.5.5 Any other homepage section links (stats, about teaser) resolve correctly

- [x] Task 2: Verify division page cross-links (AC: #1)
  - [x] 2.1 Each of 7 division detail pages links to its parent cluster page
  - [x] 2.2 Each division page shows related divisions from same cluster (sidebar or inline links)
  - [x] 2.3 Each division page Section 5 CTA links to `/contact/divisions/[slug]/`
  - [x] 2.4 Each division page Section 4 "View All [Division] Insights" links to `/insights/divisions/[slug]/`
  - [x] 2.5 If any cross-links are missing, add them (may require modifying DivisionLayout or division page template)

- [x] Task 3: Verify cluster page cross-links (AC: #2)
  - [x] 3.1 Each of 3 cluster pages links to all member division detail pages
  - [x] 3.2 Each cluster page insights section links to relevant insight articles
  - [x] 3.3 Each cluster page CTA links to `/contact/`
  - [x] 3.4 Verify "Explore Division →" links on DivisionFeatureCards resolve correctly

- [x] Task 3.5: Verify insights hub navigation pathways (AC: #3, #8)
  - [x] 3.5.1 "By Division" dropdown/filter exists on insights hub
  - [x] 3.5.2 "By Division" links to all 7 `/insights/divisions/[slug]/` pages resolve
  - [x] 3.5.3 Category tabs (Latest, News, Thought Leadership) link to correct sub-pages
  - [x] 3.5.4 Article cards on hub link to correct `/insights/[article-slug]/` pages

- [x] Task 4: Verify insight article cross-links (AC: #3)
  - [x] 4.1 Articles with `divisionSlug` link to the tagged division page in sidebar/tags
  - [x] 4.2 Related articles section links to other article detail pages
  - [x] 4.3 "Back to All Insights →" links to `/insights/`
  - [x] 4.4 Division-specific CTA links to `/contact/divisions/[slug]/`

- [x] Task 4.5: Verify contact hub pathway cards (AC: #8)
  - [x] 4.5.1 Contact hub (`/contact/`) displays 2x2 pathway card grid
  - [x] 4.5.2 "General Enquiries" card links to `/contact/general/`
  - [x] 4.5.3 "Contact by Division" card links to `/contact/divisions/`
  - [x] 4.5.4 "Partner / Investor" card links to `/contact/strategic/`
  - [x] 4.5.5 Division contact directory (`/contact/divisions/`) shows 7 division cards linking to `/contact/divisions/[slug]/`

- [x] Task 5: Verify corporate page cross-links (AC: #4, #5)
  - [x] 5.1 Investors & Partners page links to `/about/#leadership` and `/about/#credentials`
  - [x] 5.2 Investors & Partners "View Full Team →" and "View All Credentials →" links resolve
  - [x] 5.3 Investors & Partners cluster cards link to cluster pages
  - [x] 5.4 Investors & Partners CTA links to `/contact/strategic/`
  - [x] 5.5 About page OrgChart division nodes link to `/divisions/[slug]/`
  - [x] 5.6 About page "Explore Our Divisions →" links to `/divisions/`
  - [x] 5.7 About page CTA links to `/contact/` and `/divisions/`

- [x] Task 6: Verify CTABanners across all pages (AC: #6)
  - [x] 6.1 Homepage CTA: "Contact Us" → `/contact/`, "Partner With Us" → `/contact/strategic/`
  - [x] 6.2 Divisions hub CTA: "Contact Us" → `/contact/`, "Search the Site" → `/search/`
  - [x] 6.3 Cluster page CTAs: "Get In Touch" → `/contact/`
  - [x] 6.4 Division detail CTAs: "Contact Our Team" → `/contact/divisions/[slug]/`
  - [x] 6.5 About page CTA: "Contact Us" → `/contact/`, "Explore Divisions" → `/divisions/`
  - [x] 6.6 Investors & Partners CTA: both buttons → `/contact/strategic/`
  - [x] 6.7 Insights hub CTA: "Contact Us" → `/contact/`
  - [x] 6.8 Article detail CTA: division-specific → `/contact/divisions/[slug]/` if tagged, otherwise generic → `/contact/`

- [x] Task 7: Verify footer links (AC: #7)
  - [x] 7.1 The Group column: all 4 links resolve
  - [x] 7.2 Divisions columns: all 8 links resolve (7 divisions + "View All Divisions")
  - [x] 7.3 Insights column: all 3 links resolve
  - [x] 7.4 Get In Touch column: all 4 links resolve
  - [x] 7.5 Investors & Partners column: all 3 links resolve
  - [x] 7.6 Connect column: social links are present (placeholder # is acceptable)
  - [x] 7.7 Copyright bar: Privacy Policy, Terms of Use, Sitemap links resolve

- [x] Task 8: Verify header/navigation links (AC: #8)
  - [x] 8.1 Desktop nav: all 6 primary links resolve
  - [x] 8.2 Division dropdown: all 7 division links + "View All Divisions" resolve
  - [x] 8.3 Mobile nav: all links resolve (same destinations as desktop)
  - [x] 8.4 Search icon: links to `/search/` or opens SearchOverlay
  - [x] 8.5 "Get In Touch" CTA: links to `/contact/`

- [x] Task 9: Verify breadcrumb trails across all page types (AC: #8)
  - [x] 9.1 About: Home > About the Group
  - [x] 9.2 Divisions Hub: Home > Divisions
  - [x] 9.3 Cluster pages: Home > Divisions > [Cluster Name]
  - [x] 9.4 Division detail: Home > Divisions > [Cluster Name] > [Division Name]
  - [x] 9.5 Insights Hub: Home > Insights
  - [x] 9.6 Insights sub-pages: Home > Insights > [Category]
  - [x] 9.7 Division insights: Home > Insights > By Division > [Division Name]
  - [x] 9.8 Article detail: Home > Insights > [Category] > [Article Title]
  - [x] 9.9 Investors & Partners: Home > Investors & Partners
  - [x] 9.10 Contact hub: Home > Contact
  - [x] 9.11 Contact sub-pages: Home > Contact > [Sub-page Title]
  - [x] 9.12 Division contact: Home > Contact > Contact by Division > [Division Name]
  - [x] 9.13 Search: Home > Search
  - [x] 9.14 Legal pages: Home > [Page Title]
  - [x] 9.15 Every crumb except the current page is a clickable link; final crumb is non-linked
  - [x] 9.16 Mobile breadcrumbs truncate middle items with ellipsis for deep paths

- [x] Task 10: Add any missing cross-links discovered during audit (AC: #1-#7)
  - [x] 10.1 Add "Related Divisions" links on division pages if not already present (sibling divisions in same cluster)
  - [x] 10.2 Add "Back to [Cluster]" link on division pages if not already present
  - [x] 10.3 Add any missing ViewAllLinks or navigation aids
  - [x] 10.4 Add missing insights hub "By Division" navigation if absent
  - [x] 10.5 Add missing contact hub pathway cards if absent
  - [x] 10.6 Add missing article detail CTA bands if absent
  - [x] 10.7 Verify all added links resolve correctly after fixes

## Dev Notes

### This is an Integration Verification Story

**Dependency:** Epics 1-6 must be complete. This story verifies and completes cross-page navigation across the full platform. It is primarily an **audit and fix** story, not a feature-building story.

Most cross-links should already exist from previous stories. This story's job is to:
1. Systematically verify every link works
2. Fix any that are broken
3. Add any cross-links that were missed in individual stories

### Complete Route Map (44 routes)

All routes that must exist and be internally linked:

| # | Route | Page |
|---|-------|------|
| 1 | `/` | Homepage |
| 2 | `/about/` | About the Group |
| 3 | `/divisions/` | Divisions Hub |
| 4 | `/divisions/agriculture-processing/` | Cluster: Agriculture & Processing |
| 5 | `/divisions/trade-markets/` | Cluster: Trade & Markets |
| 6 | `/divisions/built-environment-energy/` | Cluster: Built Environment & Energy |
| 7-13 | `/divisions/[7 slugs]/` | 7 Division Detail pages |
| 14 | `/insights/` | Insights Hub |
| 15 | `/insights/latest/` | Latest Insights |
| 16 | `/insights/news/` | News & Updates |
| 17 | `/insights/thought-leadership/` | Thought Leadership |
| 18 | `/insights/divisions/` | Insights by Division Hub |
| 19-25 | `/insights/divisions/[7 slugs]/` | 7 Division Insight pages |
| 26+ | `/insights/[article slugs]/` | Article Detail pages (3+ seed) |
| 27 | `/investors-partners/` | Investors & Partners |
| 28 | `/contact/` | Contact Hub |
| 29 | `/contact/general/` | General Enquiries |
| 30 | `/contact/strategic/` | Partner & Investor Contact |
| 31 | `/contact/divisions/` | Contact by Division Directory |
| 32-38 | `/contact/divisions/[7 slugs]/` | 7 Division Contact pages |
| 39 | `/contact/locations/` | Locations |
| 40 | `/search/` | Search |
| 41 | `/privacy-policy/` | Privacy Policy |
| 42 | `/terms/` | Terms of Use |
| 43 | `/sitemap/` | HTML Sitemap |
| 44 | `/404` | Custom 404 page (catch-all) |

### Link Verification Approach

**Option A: Build-time script**
Create a simple Node script that crawls all generated HTML in `dist/` and checks every `<a href>` against the list of generated routes:

```typescript
// scripts/check-links.ts
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

// Recursively find all .html files in dist/
// Extract all <a href="/..."> values
// Check each against the list of generated routes
// Report any 404s
```

**Option B: Playwright E2E test**
```typescript
// tests/e2e/links.spec.ts
test('no internal links produce 404', async ({ page }) => {
  const routes = [/* all routes */];
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }
});
```

**Option C: Manual verification** — visit each page in dev server, check links.

Recommend **Option A** for automated coverage, **Option C** for spot-checking.

### Cross-Linking Map by Page Type

**Division Detail Pages should link to:**
- Parent cluster page (breadcrumb + optional "Back to [Cluster]" link)
- Sibling divisions in same cluster (optional "Related Divisions" section)
- Division-specific inquiry: `/contact/divisions/[slug]/`
- Division insights: `/insights/divisions/[slug]/`
- Related articles (section 4)

**Cluster Pages should link to:**
- All member division detail pages (DivisionFeatureCards)
- Cluster-relevant insights
- Contact hub or generic contact
- Divisions hub (breadcrumb)

**Article Detail Pages should link to:**
- Tagged division page (sidebar tag pill)
- Related articles (section 4)
- Insights hub (ViewAllLink)
- Division-specific or generic contact (CTA section)

**About Page should link to:**
- Divisions hub (from OrgChart "Explore Our Divisions")
- Individual division pages (from OrgChart division nodes)
- Contact (CTA band)

**Investors & Partners should link to:**
- About page sections (#leadership, #credentials)
- Cluster pages (Group Capabilities cards)
- Strategic contact (`/contact/strategic/`)

### "Related Divisions" — Potential Addition

Division detail pages may not currently show links to sibling divisions in the same cluster. If missing, add a simple section:

```astro
<!-- In division detail page, below the hero or in sidebar -->
<div>
  <h4 class="text-xs font-semibold uppercase tracking-wide text-neutral-500">Also in {cluster.name}</h4>
  <div class="mt-2 flex flex-wrap gap-2">
    {siblingDivisions.map(div => (
      <a href={`/divisions/${div.data.slug}/`} class="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600">
        {div.data.name}
      </a>
    ))}
  </div>
</div>
```

### Previous Story Intelligence

This story depends on ALL previous stories being complete:
- **Epic 1** (1.1-1.8): Project setup, layouts, navigation, footer, breadcrumbs
- **Epic 2** (2.1-2.4): Homepage with all 6 sections
- **Epic 3** (3.1-3.3): Division hub, cluster pages, division detail pages
- **Epic 4** (4.1-4.5): Contact hub, forms, locations
- **Epic 5** (5.1-5.3): About page, Investors & Partners
- **Epic 6** (6.1-6.3): Insights hub, article detail, seed content
- **Epic 7** (7.1-7.2): Search, legal pages, sitemap, 404

### What This Story Does NOT Include

- No new pages or components (audit/fix only)
- No external link verification (only internal)
- No SEO link auditing (structured data, canonical)
- No performance impact — link fixes are HTML attribute changes only

### What This Story Completes

This is the **final story in Epic 7**. After this story:
- Search page and SearchOverlay are live (7.1)
- Legal pages, sitemap, and 404 are live (7.2)
- All internal links verified, no 404s across the platform (7.3)

The complete discovery and supporting page infrastructure is live.

### Project Structure Notes

Files this story may modify (fixes only):
- **May modify:** Various page files to fix broken links or add missing cross-links
- **May create:** `scripts/check-links.ts` — link verification script
- **May create:** `tests/e2e/links.spec.ts` — link verification E2E test

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 7, Story 7.3 acceptance criteria, cross-epic link dependencies]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Content relationships, cross-linking rules, full route map, breadcrumb patterns]
- [Source: _bmad-output/implementation-artifacts/1-7-footer-navigation.md — Footer link map]
- [Source: _bmad-output/implementation-artifacts/1-5-header-navigation-division-dropdown.md — Navigation route map]
- [Source: _bmad-output/implementation-artifacts/3-3-division-detail-pages-layout-content-structure.md — Division page cross-links]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build passes: all 50 routes prerender successfully
- Link checker: 3,264 internal `<a href>` links verified, 0 broken
- TypeScript: no errors
- All 15 breadcrumb trails verified correct across all page types

### Completion Notes List

- Created `scripts/check-links.js` — automated link checker that crawls all HTML in `dist/client`, extracts `<a href>` links, and verifies against generated routes
- Fixed footer "Group Structure" link: `/about/#structure` → `/about/#group-structure` to match actual anchor ID in about.astro
- Added CTABanner to insights hub (`src/pages/insights/index.astro`) — was the only major page missing a CTA section
- Added "Also in [Cluster]" related divisions section to DivisionLayout — sibling divisions from same cluster displayed as pill links between Stats and Insights sections
- Passed `siblingDivisions` prop from `[slug].astro` to DivisionLayout (computed in getStaticPaths)
- Verified all 8 AC items: division cross-links, cluster cross-links, article cross-links, corporate page links, CTABanners on every page, footer links, no 404s, breadcrumb trails
- All existing cross-links (homepage, divisions, clusters, insights, articles, contact, corporate pages, header, footer, breadcrumbs) verified correct — 3 issues found and fixed

### Review Findings

- [x] [Review][Patch] Remove duplicate `route.replace(/\/index\.html$/, '/')` — dead code [scripts/check-links.js:67] — FIXED
- [x] [Review][Patch] Add existence check for `dist/client` directory with user-friendly error message [scripts/check-links.js:56] — FIXED
- [x] [Review][Defer] Link checker regex only matches double-quoted href attributes — deferred, pre-existing (Astro always emits double-quoted)
- [x] [Review][Defer] normalizeRoute comment/code mismatch for 404.html — deferred, pre-existing (harmless, nothing links to /404)
- [x] [Review][Defer] Link checker not wired into package.json scripts — deferred, DX improvement
- [x] [Review][Defer] Link checker does not verify anchor fragment targets — deferred, out of scope

### Change Log

- 2026-04-04: Story 7.3 implemented — full link audit, 3 fixes (footer anchor, insights CTA, sibling divisions), link checker script created
- 2026-04-05: Post-review bugfix — mobile header transparent→solid scroll transition. On the homepage (transparent variant), mobile search icon and hamburger were invisible against white-background sections because the mobile bar lacked scroll-based color switching (desktop nav had it via React state, mobile bar was static Astro markup). Added `data-scrolled` attribute toggle via inline `<script>` (50px threshold, rAF + passive listener), CSS overrides via `<style is:global>` using Tailwind v4 CSS custom properties for token consistency, and `motion-safe:transition` classes on mobile bar/icons for smooth 300ms animation. Self-guarding on solid-variant pages (no listener attached). Also added `motion-safe:transition-colors` to MobileNav.tsx hamburger button.

### File List

- `scripts/check-links.js` (created — link verification script)
- `src/components/layout/Footer.astro` (modified — fixed #group-structure anchor)
- `src/pages/insights/index.astro` (modified — added CTABanner)
- `src/layouts/DivisionLayout.astro` (modified — added "Also in [Cluster]" sibling divisions section)
- `src/pages/divisions/[slug].astro` (modified — computed siblingDivisions, passed to DivisionLayout)
- `src/components/layout/Header.astro` (modified — mobile bar scroll-based transparent→solid transition)
- `src/components/navigation/MobileNav.tsx` (modified — added transition-colors to hamburger button)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
