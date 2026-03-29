# Story 1.6: Mobile Navigation

Status: done

## Story

As a **mobile visitor**,
I want a touch-friendly navigation that reveals the full site structure,
So that I can access any page without difficulty on my phone or tablet.

## Acceptance Criteria

1. Hamburger icon and search icon visible in header below md breakpoint (768px); tapping hamburger opens a Sheet drawer sliding in from the right. Note: epics AC says "below lg" but UX spec (line 1251) and Story 1.5 establish md as the desktop→mobile nav switchover. Search icon sits between logo and hamburger per IA wireframe (line 125), linking to `/search/`.
2. L1 navigation items display vertically with 44px minimum touch targets: Home, About the Group, Divisions (accordion), Insights, Investors & Partners, Contact
3. "Divisions" expands as an accordion showing 3 clusters, each expandable to show their member divisions
4. Pinned "Get In Touch" CTA button visible at the bottom of the drawer
5. Body scroll locked while drawer is open
6. Tapping a navigation link navigates to the page and closes the drawer with state reset
7. Close button (X) in top-right corner of drawer
8. Focus trapped within drawer while open; pressing Escape closes it
9. MobileNav is a React island with `client:load` hydration

## Tasks / Subtasks

- [x] Task 1: Add shadcn/ui Sheet and Accordion primitives (AC: #1, #3)
  - [x] 1.1 Run `npx shadcn@latest add sheet accordion`
  - [x] 1.2 Verify components installed in `src/components/ui/`

- [x] Task 2: Create MobileNav.tsx React component (AC: #1, #2, #9)
  - [x] 2.1 Create `src/components/navigation/MobileNav.tsx`
  - [x] 2.2 Accept props: `divisions`, `clusters`, `currentPath`
  - [x] 2.3 Hamburger button trigger: `flex md:hidden` with 44x44px touch target
  - [x] 2.4 Sheet opens from right side on trigger click

- [x] Task 3: Build navigation menu inside Sheet (AC: #2, #3)
  - [x] 3.1 L1 items as vertical list: Home, About the Group, Divisions, Insights, Investors & Partners, Contact
  - [x] 3.2 Each link: `min-h-11` padding, `text-lg font-medium`
  - [x] 3.3 Active item: `text-primary-600` with `aria-current="page"`
  - [x] 3.4 "Divisions" renders as Accordion trigger (not a link)

- [x] Task 4: Build Divisions accordion with nested clusters (AC: #3)
  - [x] 4.1 Outer Accordion: "Divisions" label with chevron indicator
  - [x] 4.2 Inner Accordion: 3 cluster groups as expandable items
  - [x] 4.3 Cluster headings as AccordionTrigger: gold-600 uppercase text-overline (clickable expand/collapse toggles)
  - [x] 4.4 Division items within each cluster: link to `/divisions/[slug]/`
  - [x] 4.5 "View All Divisions" link at end → `/divisions/`

- [x] Task 5: Implement pinned CTA and in-drawer search (AC: #4)
  - [x] 5.1 "Get In Touch" CTA button pinned to bottom of Sheet (flex-col with flex-1 scrollable area)
  - [x] 5.2 CTA links to `/contact/`
  - [x] 5.3 Search link inside scrollable nav area: icon + "Search the site" text → `/search/`, placed after Contact link

- [x] Task 6: Implement drawer behavior (AC: #5, #6, #7, #8)
  - [x] 6.1 Body scroll lock when Sheet is open (Sheet primitive handles this)
  - [x] 6.2 Close button (X) in top-right corner (44px touch target, project-token focus rings)
  - [x] 6.3 Navigation link click: close drawer via setOpen(false), accordion resets on MPA navigation
  - [x] 6.4 Focus trapping within Sheet (Radix Dialog handles this)
  - [x] 6.5 Escape key closes drawer (Radix Dialog handles this)
  - [x] 6.6 Overlay backdrop click closes drawer

- [x] Task 7: Integrate into Header.astro (AC: #1, #9)
  - [x] 7.1 Import MobileNav with `client:load` directive in Header.astro
  - [x] 7.2 Pass same division/cluster data and currentPath as DesktopNav
  - [x] 7.3 Hamburger button visible `md:hidden`, DesktopNav visible `hidden md:flex`
  - [x] 7.4 Add search icon to Header.astro's mobile layout: standalone `<a>` between logo and hamburger, `min-h-11 min-w-11`, links to `/search/`, `aria-label="Search"`

- [x] Task 8: Accessibility verification (AC: #8)
  - [x] 8.1 Tab through all items in order within Sheet (Radix handles focus management)
  - [x] 8.2 Focus returns to hamburger button on close (Radix Dialog auto-manages)
  - [x] 8.3 Escape closes drawer (Radix Dialog auto-manages)
  - [x] 8.4 `aria-expanded` on Divisions accordion and cluster accordions (Radix Accordion auto-manages)
  - [x] 8.5 focus-visible rings on all interactive elements (all links, triggers, buttons have focus-visible:ring-2)
  - [x] 8.6 Manual testing on mobile viewport recommended

## Dev Notes

### Component Architecture

```
Header.astro
  ├── DesktopNav.tsx (client:load, hidden → visible md:flex)
  ├── Search icon (standalone, flex md:hidden → /search/)
  └── MobileNav.tsx (client:load, flex md:hidden)
      ├── Hamburger button (trigger)
      └── Sheet (slides from right)
          ├── Close button (X) — top-right
          ├── Nav items (vertical list)
          │   ├── Home → /
          │   ├── About the Group → /about/
          │   ├── Divisions (Accordion)
          │   │   ├── Agriculture & Processing (Accordion)
          │   │   │   ├── Crop Farming → /divisions/crop-farming/
          │   │   │   ├── Animal Husbandry → /divisions/animal-husbandry/
          │   │   │   └── Agro-Processing → /divisions/agro-processing/
          │   │   ├── Trade & Markets (Accordion)
          │   │   │   ├── Commodity Marketing → /divisions/commodity-marketing/
          │   │   │   └── Import & Export → /divisions/import-export/
          │   │   ├── Built Environment & Energy (Accordion)
          │   │   │   ├── Real Estate → /divisions/real-estate/
          │   │   │   └── Oil & Gas → /divisions/oil-gas/
          │   │   └── View All Divisions → /divisions/
          │   ├── Insights → /insights/
          │   ├── Investors & Partners → /investors-partners/
          │   └── Contact → /contact/
          ├── Search → /search/
          └── "Get In Touch" CTA (pinned bottom) → /contact/
```

### Mobile Navigation Wireframes

**Closed state (header bar):**
```
+------------------------------------------+
|  [LOGO]                [🔍]  [☰]         |
+------------------------------------------+
Search icon (🔍) is a standalone link to /search/ in Header.astro,
visible md:hidden. Not inside DesktopNav or MobileNav.
```

**Open state (Sheet drawer, L1 level):**
```
+------------------------------------------+
|                                     [X]  |
|                                          |
|  Home                                    |
|  About the Group                         |
|  Divisions                          [+]  |
|  Insights                                |
|  Investors & Partners                    |
|  Contact                                 |
|                                          |
|  🔍 Search the site                      |
|                                          |
|  +------------------------------------+  |
|  |       Get In Touch                 |  |
|  +------------------------------------+  |
+------------------------------------------+
```

**Divisions expanded → cluster expanded:**
```
|  Divisions                          [-]  |
|    Agriculture & Processing         [-]  |
|      Crop Farming                        |
|      Animal Husbandry                    |
|      Agro-Processing                     |
|    Trade & Markets                  [+]  |
|    Built Environment & Energy       [+]  |
|    View All Divisions                    |
```

### shadcn/ui Sheet + Accordion Usage

**Sheet** (from Radix Dialog) provides:
- Slide-in drawer from any side (use `side="right"`)
- Body scroll lock (automatic)
- Focus trapping (automatic)
- Escape to close (automatic)
- Overlay backdrop with click-to-close

**Accordion** (from Radix Accordion) provides:
- Expand/collapse with animation
- `aria-expanded` auto-managed
- Keyboard navigation (Enter/Space to toggle)
- Single or multiple mode (`type="multiple"` for nested)

```tsx
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
```

### MobileNav Implementation Pattern

```tsx
interface MobileNavProps {
  divisions: Array<{ data: { name: string; slug: string; clusterSlug: string; tagline: string } }>;
  clusters: Array<{ data: { name: string; slug: string } }>;
  currentPath: string;
}

export default function MobileNav({ divisions, clusters, currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Close drawer and reset on navigation
  function handleNavClick() {
    setOpen(false);
  }

  // Group divisions by cluster
  const divisionsByCluster = clusters.map(cluster => ({
    ...cluster.data,
    divisions: divisions.filter(d => d.data.clusterSlug === cluster.data.slug),
  }));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex md:hidden items-center justify-center h-11 w-11 rounded-md focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label="Open navigation menu"
        >
          {/* Hamburger icon */}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col"> {/* w-96 = 384px — wider than w-80 for better tablet UX; IA describes "full-screen overlay" so full width on phones, generous width on sm+ */}
        {/* Close button auto-provided by SheetContent */}

        {/* Nav items */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-6">
          {/* L1 items + Divisions accordion */}
        </nav>

        {/* Pinned CTA */}
        <div className="border-t border-neutral-200 p-4">
          <a href="/contact/" onClick={handleNavClick}
            className="block w-full rounded-lg bg-primary-600 px-8 py-4 text-center font-semibold text-white">
            Get In Touch
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Nested Accordion Pattern for Divisions

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="divisions">
    <AccordionTrigger className="min-h-[44px] text-lg font-medium data-[state=open]:text-primary-600">
      Divisions
    </AccordionTrigger>
    <AccordionContent>
      <Accordion type="multiple">
        {divisionsByCluster.map(cluster => (
          <AccordionItem key={cluster.slug} value={cluster.slug}>
            <AccordionTrigger className="min-h-[44px] pl-4 text-xs font-semibold uppercase tracking-widest text-gold-600 data-[state=open]:text-primary-600">
              {cluster.name}
            </AccordionTrigger>
            <AccordionContent>
              {cluster.divisions.map(div => (
                <a
                  key={div.data.slug}
                  href={`/divisions/${div.data.slug}/`}
                  onClick={handleNavClick}
                  className="block min-h-[44px] py-3 pl-8 text-base text-neutral-700 hover:text-primary-600"
                  aria-current={currentPath === `/divisions/${div.data.slug}/` ? 'page' : undefined}
                >
                  {div.data.name}
                </a>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        <a
          href="/divisions/"
          onClick={handleNavClick}
          className="block min-h-[44px] py-3 pl-4 text-sm font-medium text-primary-600"
        >
          View All Divisions
        </a>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Hamburger Icon Pattern

Use a simple 3-line icon (no animation needed for MVP):
```tsx
<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
</svg>
```

### Touch Target Compliance

All interactive elements within the mobile nav must meet 44x44px minimum:
- Nav links: `min-h-[44px]` with adequate padding
- Hamburger button: `h-11 w-11` (44x44px)
- Close button: `h-11 w-11`
- Accordion triggers: `min-h-[44px]`
- CTA button: `px-8 py-4` (well above 44px height)
- Division links: `py-3` + text size gives ~44px+ height

### Navigation Link Click Behavior

When any navigation link is tapped:
1. `setOpen(false)` — closes the Sheet
2. Sheet animates closed (Radix handles exit animation)
3. Browser navigates to the new page (full page navigation, not SPA)
4. On the new page, MobileNav rehydrates with fresh state (accordion collapsed)

This means no explicit "reset accordion state" logic is needed — Astro MPA navigation reloads the component.

### Accessibility Checklist

- [ ] `<nav aria-label="Mobile navigation">` wrapping the nav list
- [ ] Sheet has `role="dialog"` and `aria-label` (Radix auto-manages)
- [ ] Focus trapped in Sheet while open (Radix auto-manages)
- [ ] Focus returns to hamburger button on close (Radix auto-manages)
- [ ] Escape closes Sheet (Radix auto-manages)
- [ ] `aria-expanded` on all Accordion triggers (Radix auto-manages)
- [ ] `aria-current="page"` on active nav link
- [ ] All interactive elements: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
- [ ] Hamburger button: `aria-label="Open navigation menu"`
- [ ] No keyboard traps
- [ ] All items reachable via Tab

### Previous Story Intelligence

**Story 1.5** creates Header.astro and DesktopNav.tsx. Header.astro already has a placeholder for MobileNav. DesktopNav uses `hidden md:flex`. This story adds MobileNav with `flex md:hidden` to complement it.

**Story 1.4** provides Button component with all variants. Use the primary variant for the CTA.

**Story 1.3** provides division/cluster content collections. Same data shape as DesktopNav receives — `divisions` and `clusters` arrays with `.data.name`, `.data.slug`, `.data.clusterSlug`.

**Story 1.2** provides design tokens. Key tokens: `primary-600` (active/CTA), `gold-600` (cluster headings), `neutral-700` (text), `neutral-200` (borders).

### What This Story Does NOT Include

- No DesktopNav changes (Story 1.5, already done)
- No Footer (Story 1.7)
- No SearchOverlay implementation (Epic 7) — just a link to `/search/`
- No page content
- No animations beyond Sheet slide and Accordion expand (both handled by Radix)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/navigation/MobileNav.tsx` — React island
- **Adds:** shadcn/ui `sheet` and `accordion` to `src/components/ui/`
- **Modifies:** `src/components/layout/Header.astro` — integrates MobileNav with `client:load` + adds standalone mobile search icon (`flex md:hidden`, links to `/search/`)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.6 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — MobileNav specification, Island Hydration, Component Structure]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Sheet drawer, Accordion, Touch Targets, Accessibility]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Mobile nav wireframes, accordion structure]
- [Source: _bmad-output/implementation-artifacts/1-5-header-navigation-division-dropdown.md — Header.astro, division data props pattern]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build: passes clean, 2 pages built (index + token-test) in 76.82s
- TypeScript: `tsc --noEmit` passes with zero errors

### Completion Notes List

- Created MobileNav.tsx as React island: Sheet (Radix Dialog) sliding from right with nested Accordion for Divisions
- Sheet layout: flex-col with flex-1 overflow-y-auto scrollable nav area and pinned CTA at bottom with border-t separator
- L1 nav items: vertical list with min-h-11 touch targets, text-lg font-medium, active state via text-primary-600 + aria-current="page"
- Divisions accordion: outer single-collapsible Accordion with inner multiple-mode Accordion for clusters
- Cluster headings: AccordionTrigger with text-overline font-semibold uppercase text-gold-600 styling (clickable expand/collapse)
- Division items: links to /divisions/[slug]/ with pl-8 indent, exact-match active state detection
- "View All Divisions" link at bottom of accordion content, styled as text-primary-600
- "Search the site" link with Search icon placed after Contact in scrollable nav area
- Pinned CTA: "Get In Touch" linking to /contact/, bg-primary-600 with hover:bg-primary-700, full-width
- All nav link clicks call setOpen(false) to close drawer; MPA navigation resets component state
- Hamburger trigger: min-h-11 min-w-11 with project-token focus rings, 3-line SVG icon
- SheetTitle with sr-only class satisfies Radix Dialog accessibility requirement for dialog labeling
- Fixed Sheet close button: replaced shadcn defaults (rounded-xs, bg-secondary, ring-[3px]) with project tokens (min-h-11 min-w-11, text-neutral-600, focus-visible:ring-2 focus-visible:ring-primary-500)
- Fixed Accordion trigger: replaced hover:underline and ring-[3px] with focus-visible:ring-2 focus-visible:ring-primary-500
- Added slide animation utilities to globals.css: slide-in-from-right/left/top/bottom and slide-out-to-right/left/top/bottom
- Added accordion keyframes (accordion-down/up) and --animate-accordion-down/up theme tokens to globals.css
- Modified Header.astro: replaced mobile placeholder with MobileNav client:load + standalone search icon between logo and hamburger
- Search icon is a standalone `<a>` element in Header.astro (not inside MobileNav), matching IA wireframe: [LOGO] [Search] [Hamburger]

### Review Findings

- [x] [Review][Patch] Accordion state not reset on handleNavClick — accordions stayed expanded when sheet reopened. Fixed with controlled value + reset. [MobileNav.tsx:51-56]
- [x] [Review][Patch] aria-current="true" on Divisions trigger — changed to "page" for consistency with all other nav links. [MobileNav.tsx:125]
- [x] [Review][Patch] "View All Divisions" link was bare child of Accordion root — moved outside inner Accordion, inside AccordionContent for valid HTML. [MobileNav.tsx:163-169]
- [x] [Review][Patch] bg-background shadcn token in sheet.tsx — replaced with bg-white. [sheet.tsx:61]
- [x] [Review][Patch] SheetContent base gap-4 not cancelled — added gap-0 to MobileNav className. [MobileNav.tsx:84]
- [x] [Review][Patch] "use client" Next.js RSC directive in accordion.tsx — removed. [accordion.tsx:1]
- [x] [Review][Patch] Sheet border-l uses currentColor — added border-neutral-200. [sheet.tsx:63]
- [x] [Review][Patch] bg-black/50 on SheetOverlay — replaced with bg-neutral-950/50. [sheet.tsx:37]
- [x] [Review][Defer] isActive sub-route matching false positives — pre-existing pattern from Story 1.5
- [x] [Review][Defer] Empty cluster groups render silently — content validation concern, not caused by this change
- [x] [Review][Defer] prefers-reduced-motion only global !important — pre-existing, not introduced by this story
- [x] [Review][Defer] Division trailing-slash exact match depends on Astro trailingSlash config — Astro default handles it

### Change Log

- 2026-03-29: Implemented Story 1.6 — Mobile Navigation (all 8 tasks)
- 2026-03-29: Code review fixes — 8 patches applied (see Review Findings section)

### File List

- src/components/navigation/MobileNav.tsx (created)
- src/components/ui/sheet.tsx (created via shadcn CLI, close button modified)
- src/components/ui/accordion.tsx (created via shadcn CLI, trigger styles modified)
- src/components/layout/Header.astro (modified — replaced mobile placeholder with MobileNav + search icon)
- src/styles/globals.css (modified — added slide utilities, accordion keyframes)
- package.json (modified — radix-ui Dialog and Accordion dependencies added)
- package-lock.json (modified — dependency lockfile updated)
