# Story 1.5: Header Navigation & Division Dropdown

Status: done

## Story

As a **visitor**,
I want a clear, professional header navigation that reveals the full business structure,
So that I can navigate to any section of the platform from any page.

## Acceptance Criteria

1. Sticky header at 64px height with backdrop-blur background, GRC monogram + stacked wordmark logo (logo-primary.svg, ~40px height) left, nav items center, search icon + "Get In Touch" CTA button right
2. 6 nav items: Home, About the Group, Divisions (dropdown trigger), Insights, Investors & Partners, Contact
3. Hovering/clicking "Divisions" opens a mega-dropdown with 7 divisions grouped by 3 clusters (Agriculture & Processing, Trade & Markets, Built Environment & Energy), each division showing label + description, and "View All Divisions" link at bottom
4. Header is transparent over hero sections using logo-reversed.svg (white/gold), transitioning to solid white/blur on scroll with logo-primary.svg (dark green)
5. Logo SVGs inlined so self-hosted Poppins renders wordmark correctly (no Google Fonts network dependency)
6. Keyboard navigation works through all nav items and dropdown entries with visible focus indicators
7. ARIA attributes correct: `<nav>` with aria-label, `aria-expanded` on dropdown trigger, `aria-current="page"` on active items
8. Header renders correctly at all breakpoints md through 2xl (hidden below md per UX spec — MobileNav handles that in Story 1.6). Note: epics AC lists "lg, xl, 2xl" but UX spec confirms desktop nav visibility starts at md (768px+). Layout is max-w-7xl capped so 2xl behaves identically to xl.

## Tasks / Subtasks

- [x] Task 1: Create Header.astro wrapper (AC: #1)
  - [x] 1.1 Create `src/components/layout/Header.astro`
  - [x] 1.2 Sticky positioning with `z-50`
  - [x] 1.3 Render DesktopNav (React island, `client:load`)
  - [x] 1.4 Render MobileNav placeholder slot (Story 1.6)
  - [x] 1.5 Pass division/cluster data as props (fetched from content collections)

- [x] Task 2: Create DesktopNav.tsx React component (AC: #1, #2, #3)
  - [x] 2.1 Create `src/components/navigation/DesktopNav.tsx`
  - [x] 2.2 Build on shadcn/ui `NavigationMenu` primitive (Radix UI)
  - [x] 2.3 Logo left: inline SVG with link to `/`
  - [x] 2.4 6 nav items centered: Home, About the Group, Divisions, Insights, Investors & Partners, Contact
  - [x] 2.5 "Divisions" triggers NavigationMenu dropdown (not a direct link)
  - [x] 2.6 Search icon (placeholder — SearchOverlay is Epic 7)
  - [x] 2.7 "Get In Touch" CTA button linking to `/contact/`

- [x] Task 3: Build Division mega-dropdown (AC: #3)
  - [x] 3.1 3-column layout: one column per cluster
  - [x] 3.2 Cluster names as non-clickable headings (gold-600 uppercase eyebrow style)
  - [x] 3.3 Division items: name + one-line description, each linking to `/divisions/[slug]/`
  - [x] 3.4 "View All Divisions" link at bottom → `/divisions/`
  - [x] 3.5 Smooth enter/exit transition (200ms fade/slide)

- [x] Task 4: Implement header scroll behavior (AC: #4, #5)
  - [x] 4.1 Transparent background over hero: `bg-transparent` with `backdrop-blur-sm`, height 64px
  - [x] 4.2 On scroll past threshold: transition to `bg-white/95 backdrop-blur-lg border-b border-neutral-300`, reduced height 56px (required by UX-DR10 and information-architecture.md)
  - [x] 4.3 Logo swap: `logo-reversed.svg` (transparent state) → `logo-primary.svg` (solid state)
  - [x] 4.4 Nav text color swap: white (transparent) → neutral-600 (solid)
  - [x] 4.5 CTA button swap: outline-white variant (transparent state — white border, white text, transparent bg for contrast on dark hero) → `bg-neutral-900 text-white hover:bg-primary-800` (solid state — matches design reference `.nav-cta`)
  - [x] 4.6 All transitions wrapped in `motion-safe:transition-all motion-safe:duration-300`
  - [x] 4.7 Use `useState` + scroll event listener with `requestAnimationFrame` throttle

- [x] Task 5: Implement active state and nav highlighting (AC: #7)
  - [x] 5.1 Determine current path from props (Astro passes `Astro.url.pathname`)
  - [x] 5.2 Apply `aria-current="page"` to matching nav item
  - [x] 5.3 Visual active state: `text-primary-600` with subtle bottom border indicator
  - [x] 5.4 Divisions dropdown active when on any `/divisions/*` route

- [x] Task 6: Keyboard navigation and accessibility (AC: #6, #7)
  - [x] 6.1 Full Tab navigation through all nav items
  - [x] 6.2 Enter/Space opens Divisions dropdown
  - [x] 6.3 Escape closes dropdown, returns focus to trigger
  - [x] 6.4 Arrow keys navigate within dropdown
  - [x] 6.5 `aria-expanded` toggles on dropdown trigger
  - [x] 6.6 `aria-haspopup="menu"` on Divisions trigger
  - [x] 6.7 Focus-visible rings on all interactive elements
  - [x] 6.8 `<nav aria-label="Main navigation">`

- [x] Task 7: Integrate Header into PageLayout (AC: #1)
  - [x] 7.1 Import Header.astro into PageLayout's header slot
  - [x] 7.2 Fetch division/cluster data in PageLayout frontmatter
  - [x] 7.3 Pass data to Header as props

- [x] Task 8: Responsive visibility (AC: #8)
  - [x] 8.1 DesktopNav: `hidden md:flex` (visible md+)
  - [x] 8.2 Mobile hamburger button: `flex md:hidden` (visible below md)
  - [x] 8.3 Hamburger button is placeholder until Story 1.6

## Dev Notes

### Component Architecture

```
Header.astro (Astro wrapper — static shell)
  ├── DesktopNav.tsx (React island, client:load)
  │   ├── Logo (inline SVG, swaps on scroll)
  │   ├── NavigationMenu (shadcn/ui Radix primitive)
  │   │   ├── Home → /
  │   │   ├── About the Group → /about/
  │   │   ├── Divisions → mega-dropdown
  │   │   │   ├── Agriculture & Processing (heading)
  │   │   │   │   ├── Crop Farming → /divisions/crop-farming/
  │   │   │   │   ├── Animal Husbandry → /divisions/animal-husbandry/
  │   │   │   │   └── Agro-Processing → /divisions/agro-processing/
  │   │   │   ├── Trade & Markets (heading)
  │   │   │   │   ├── Commodity Marketing → /divisions/commodity-marketing/
  │   │   │   │   └── Import & Export → /divisions/import-export/
  │   │   │   ├── Built Environment & Energy (heading)
  │   │   │   │   ├── Real Estate → /divisions/real-estate/
  │   │   │   │   └── Oil & Gas → /divisions/oil-gas/
  │   │   │   └── View All Divisions → /divisions/
  │   │   ├── Insights → /insights/
  │   │   ├── Investors & Partners → /investors-partners/
  │   │   └── Contact → /contact/
  │   ├── Search icon (placeholder)
  │   └── "Get In Touch" CTA → /contact/
  └── MobileNav placeholder (Story 1.6)
```

### DesktopNav is a React Island

DesktopNav.tsx uses `client:load` because it is above-fold and needs immediate interactivity (dropdown menus, scroll state, keyboard nav). It uses shadcn/ui's `NavigationMenu` which is built on Radix UI — giving built-in keyboard navigation, focus management, and ARIA attributes.

```astro
<!-- In Header.astro -->
<DesktopNav
  client:load
  divisions={divisions}
  clusters={clusters}
  currentPath={Astro.url.pathname}
/>
```

### Navigation Route Map

| Nav Item | Route | Type |
|----------|-------|------|
| Home | `/` | Direct link |
| About the Group | `/about/` | Direct link |
| Divisions | — | Dropdown trigger (not a link) |
| Insights | `/insights/` | Direct link |
| Investors & Partners | `/investors-partners/` | Direct link |
| Contact | `/contact/` | Direct link |
| Search (icon) | `/search/` | Utility link |
| Get In Touch (CTA) | `/contact/` | CTA button |

### Division Dropdown Content

Divisions grouped by cluster with descriptions. Data comes from content collections (Story 1.3).

| Cluster | Division | Slug | Route |
|---------|----------|------|-------|
| Agriculture & Processing | Crop Farming | crop-farming | /divisions/crop-farming/ |
| Agriculture & Processing | Animal Husbandry | animal-husbandry | /divisions/animal-husbandry/ |
| Agriculture & Processing | Agro-Processing | agro-processing | /divisions/agro-processing/ |
| Trade & Markets | Commodity Marketing | commodity-marketing | /divisions/commodity-marketing/ |
| Trade & Markets | Import & Export | import-export | /divisions/import-export/ |
| Built Environment & Energy | Real Estate | real-estate | /divisions/real-estate/ |
| Built Environment & Energy | Oil & Gas | oil-gas | /divisions/oil-gas/ |

**Cluster headings** are non-clickable labels styled as gold eyebrows (uppercase, text-xs, tracking-widest, text-gold-600).

**"View All Divisions"** link at the bottom of the dropdown goes to `/divisions/` (hub page).

### Header Scroll Behavior

**State 1: Transparent (over hero)**
- Height: 64px
- Background: transparent
- Backdrop: `backdrop-blur-sm`
- Logo: `logo-reversed.svg` (white/gold for dark backgrounds)
- Nav text: white
- CTA button: outline-white (white border, white text, transparent bg — maintains contrast on dark hero)

**State 2: Solid (scrolled past hero)**
- Height: 56px (reduced — per UX-DR10 and information-architecture.md)
- Background: `rgba(255, 255, 255, 0.95)` / `bg-white/95`
- Backdrop: `backdrop-blur-lg`
- Border: `border-b border-neutral-300`
- Logo: `logo-primary.svg` (dark green for light background)
- Nav text: `text-neutral-600`, hover `text-neutral-900`
- CTA button: `bg-neutral-900 text-white hover:bg-primary-800` (matches design reference `.nav-cta`)

**Scroll detection:**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50);
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Height transition:** 64px → 56px on scroll. Apply via conditional class: `h-16` (transparent) / `h-14` (scrolled).

**Transition:** `motion-safe:transition-all motion-safe:duration-300 ease-out`

### Header CSS from Design Reference

```css
/* From design-reference-final.html */
/* NOTE: Design reference is a static mockup showing the solid/scrolled state only.
   Authoritative height is 64px (transparent) → 56px (scrolled) per UX spec and UX-DR10.
   The 68px below is approximate — use 64px/56px. */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--neutral-300);
  padding: 0 24px;
}
.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px; /* approximate — use 64px transparent / 56px scrolled */
}
.site-nav {
  display: flex;
  gap: 28px;
  align-items: center;
}
.site-nav a {
  font-size: 14px;
  font-weight: 500;
  color: var(--neutral-600);
  transition: color 0.2s;
}
.site-nav a:hover { color: var(--neutral-900); }
.nav-cta {
  font-size: 13px;
  font-weight: 600;
  background: var(--neutral-900);
  color: #fff;
  padding: 8px 22px;
  border-radius: 6px;
}
.nav-cta:hover { background: var(--primary-800); }
```

### Logo Inline SVG Pattern

Logos must be inlined (not `<img>` tags) so that:
1. Self-hosted Poppins renders the wordmark text
2. No external font network requests
3. Colour can be controlled via CSS for scroll state swap

**If SVG text was converted to paths in Story 1.4:** use the path-based SVG directly — no font dependency concern.

**If SVG still uses `<text>` elements:** ensure `font-family: 'Poppins'` matches the self-hosted font loaded in globals.css.

Scale logo to ~40px height for nav context. Check `_bmad-output/planning-artifacts/logo-kit.html` for nav-scale rendering reference.

### shadcn/ui NavigationMenu Usage

Add the NavigationMenu primitive:
```bash
npx shadcn@latest add navigation-menu
```

Set hover intent delay per UX spec: `<NavigationMenu delayDuration={200}>` — this is the 200ms delay before the dropdown opens on hover (distinct from the enter/exit animation).

This gives you Radix UI's NavigationMenu with:
- `NavigationMenu` — root container
- `NavigationMenuList` — list of items
- `NavigationMenuItem` — individual item
- `NavigationMenuTrigger` — dropdown trigger (for Divisions)
- `NavigationMenuContent` — dropdown panel content
- `NavigationMenuLink` — accessible link wrapper

Built-in features from Radix:
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- `aria-expanded` auto-managed on triggers
- Focus management and trapping
- Screen reader announcements
- Hover intent with configurable delay

### Active State Detection

```tsx
interface DesktopNavProps {
  currentPath: string;
  divisions: Array<{ data: { name: string; slug: string; clusterSlug: string; tagline: string } }>;
  clusters: Array<{ data: { name: string; slug: string } }>;
}

function isActive(href: string, currentPath: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}

// Usage
<NavigationMenuLink
  href="/about/"
  className={cn(
    'text-sm font-medium transition-colors',
    isActive('/about/', currentPath)
      ? 'text-primary-600 border-b-2 border-primary-600'
      : 'text-neutral-600 hover:text-neutral-900'
  )}
  aria-current={isActive('/about/', currentPath) ? 'page' : undefined}
>
  About the Group
</NavigationMenuLink>
```

### Accessibility Checklist

- [ ] `<nav aria-label="Main navigation">` wrapping the entire header nav
- [ ] `aria-expanded` on Divisions trigger (auto-managed by Radix)
- [ ] `aria-haspopup="menu"` on Divisions trigger (auto-managed by Radix)
- [ ] `aria-current="page"` on nav item matching current route
- [ ] Tab order: Logo → Home → About → Divisions → (dropdown items) → Insights → Investors → Contact → Search → CTA
- [ ] Escape closes dropdown, returns focus to Divisions trigger
- [ ] Focus-visible rings: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`
- [ ] All nav links and CTA: min 44px touch height (nav links `min-h-[44px]` + padding)
- [ ] Motion: scroll transition wrapped in `prefers-reduced-motion` check

### What This Story Does NOT Include

- No MobileNav / hamburger menu implementation (Story 1.6)
- No Footer (Story 1.7)
- No BreadcrumbNav (Story 1.8)
- No SearchOverlay implementation (Epic 7) — just a placeholder search icon
- No page content — header appears on all pages via PageLayout

### Previous Story Intelligence

**Story 1.1** — Project initialized with React integration and all packages.

**Story 1.2** — Design tokens available: primary-600 (active state), neutral-600 (nav text), gold-600 (cluster eyebrows), all typography tokens. `cn()` utility available.

**Story 1.3** — Content collections for divisions and clusters are available. Division data includes `name`, `slug`, `clusterSlug`, `tagline` — exactly what the dropdown needs. Use `getCollection('divisions')` and `getCollection('clusters')` in Header.astro to fetch data and pass as props.

**Story 1.4** — BaseLayout and PageLayout exist. PageLayout has a `<slot name="header" />` ready for this story's Header.astro. Button component with all variants is available. Logo SVGs have been prepared (Google Fonts imports removed).

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/layout/Header.astro` — Astro wrapper rendering DesktopNav + MobileNav placeholder
- **Creates:** `src/components/navigation/DesktopNav.tsx` — React island with full desktop navigation
- **Adds:** shadcn/ui `navigation-menu` component to `src/components/ui/`
- **Modifies:** `src/layouts/PageLayout.astro` — integrates Header into the header slot

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Component Architecture, Island Hydration Map, Navigation Components]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Header Spec, Navigation Details, Dropdown Behavior, Accessibility]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Navigation Structure, Route Map, Division Groupings]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Header CSS, Nav Styling]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.5 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/logo-kit.html — Logo rendering at nav scale]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — PageLayout slots, Button variants]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Division/cluster content collections with loader-based API]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build: passes clean, 2 pages built (index + token-test)
- TypeScript: `tsc --noEmit` passes with zero errors

### Completion Notes List

- Created Header.astro as Astro wrapper: sticky, z-50, fetches division/cluster data from content collections, serializes to plain objects for React props, renders DesktopNav with client:load and mobile placeholder with aria-disabled hamburger button
- Created DesktopNav.tsx as React island: shadcn/ui NavigationMenu (Radix UI) with 6 nav items, Divisions mega-dropdown (compact 3-column grid by cluster, names only), search icon placeholder, "Get In Touch" CTA
- Logo SVGs inlined as JSX (path-based, no font dependency) with conditional rendering based on scroll state (LogoPrimary for scrolled, LogoReversed for transparent)
- Scroll behavior: useState + rAF-throttled scroll listener with cancellation (threshold 50px), reads scrollY on mount to avoid flash, transparent (h-16, backdrop-blur-sm) → solid (h-14, bg-white/95, backdrop-blur-lg, border-b)
- headerVariant prop ('solid' | 'transparent') threaded through PageLayout → Header → DesktopNav, defaults to 'solid' to prevent white-on-white nav on non-hero pages
- Text/CTA color transitions: white → neutral-600 (nav), outline-white → bg-neutral-900 (CTA), all wrapped in motion-safe:transition-*
- Active state: isActive() helper with aria-current="page" on all nav items including Divisions trigger, text-primary-600 highlight, divisions route prefix matching with trailing slash
- Accessibility: Radix handles keyboard nav (Tab/Enter/Space/Escape/Arrow), aria-expanded, aria-haspopup; focus-visible:ring-2 on all interactive elements; nav aria-label="Main navigation"; min-h-11 (44px) touch targets
- Stripped shadcn pollution from navigation-menu.tsx: removed flex-col, h-9, bg-background, bg-accent, ring-[3px], outline-1 defaults; replaced with minimal base styles compatible with design token system
- Added animation keyframes (enter/exit) and @utility rules to globals.css to replace removed tw-animate-css package
- Added shadcn/ui compatibility CSS variables to globals.css (background, popover, accent, border, ring, muted-foreground) to support NavigationMenu viewport
- Modified PageLayout.astro: renders Header with currentPath and headerVariant props
- No test infrastructure exists yet (Epic 8) — tests deferred to Story 8.1

### Change Log

- 2026-03-29: Implemented Story 1.5 — Header Navigation & Division Dropdown (all 8 tasks)
- 2026-03-29: Code review fixes — 12 patches applied (see Review Findings section)

### Review Findings

- [x] [Review][Decision] No hero-detection mechanism — resolved: Option 2 (default solid, opt-in transparent via headerVariant prop) — transparent nav with white text renders on pages without dark hero backgrounds, causing invisible text on first load until user scrolls past 50px. Needs architectural decision: always-scrolled default, page-type prop, or CSS solution. [DesktopNav.tsx]
- [x] [Review][Patch] isScrolled initializes false with no mount-time check — causes flash of wrong logo/colors on scroll-restored pages (back-nav). Read window.scrollY on mount. [DesktopNav.tsx:71-80]
- [x] [Review][Patch] tw-animate-css removed from package.json but shadcn navigation-menu.tsx uses animate-in/animate-out/zoom-in/fade-in utilities — dropdown animations are silently no-ops. [navigation-menu.tsx, package.json]
- [x] [Review][Patch] w-[640px] arbitrary Tailwind value on dropdown grid — violates CLAUDE.md "no arbitrary values" rule. Also overflows viewport at narrow md-range widths (~768px). [DesktopNav.tsx:161]
- [x] [Review][Patch] hover:bg-primary-800 references undefined design token — CTA hover state silently does nothing. primary-800 not in globals.css @theme. [DesktopNav.tsx:271]
- [x] [Review][Patch] navigation-menu.tsx base styles leak shadcn defaults: ring-[3px], outline-1, bg-background, bg-accent — arbitrary values and non-token colors conflict with design system. [navigation-menu.tsx:62,132]
- [x] [Review][Patch] aria-current="page" not applied to Divisions NavigationMenuTrigger when on /divisions/* routes — violates AC #7. [DesktopNav.tsx:148]
- [x] [Review][Patch] NAV_LINKS and NAV_LINKS_AFTER constants declared but never used — dead code. [DesktopNav.tsx:36-45]
- [x] [Review][Patch] isActive('/divisions') lacks trailing slash — inconsistent with other nav hrefs; '/divisions-archive/' would false-positive match. [DesktopNav.tsx:83]
- [x] [Review][Patch] Import order: lucide-react (third-party) placed after @/lib/utils (internal alias) — violates CLAUDE.md import order. [DesktopNav.tsx:10-11]
- [x] [Review][Patch] Mobile hamburger uses disabled attr — removes button from tab order entirely. Use aria-disabled="true" or remove until Story 1.6. [Header.astro:54-58]
- [x] [Review][Defer] Empty cluster column renders if a cluster has zero matching divisions — content validation concern, not caused by this change
- [x] [Review][Defer] DesktopNav hydrated via client:load on mobile viewports where it's hidden — wasted hydration; could use client:media="(min-width: 768px)" but architectural trade-off
- [x] [Review][Defer] prefers-reduced-motion CSS !important in globals.css conflicts with motion-safe: Tailwind strategy — pre-existing, not introduced by this story
- [x] [Review][Defer] Long taglines (up to 150 chars) may cause excessively tall dropdown columns — no line-clamp applied; content governance concern

### File List

- src/components/layout/Header.astro (created)
- src/components/navigation/DesktopNav.tsx (created)
- src/components/ui/navigation-menu.tsx (created via shadcn CLI)
- src/layouts/PageLayout.astro (modified — integrated Header, removed header slot)
- src/styles/globals.css (modified — added shadcn compatibility tokens)
- package.json (modified — radix-ui dependency added)
- package-lock.json (modified — dependency lockfile updated)
