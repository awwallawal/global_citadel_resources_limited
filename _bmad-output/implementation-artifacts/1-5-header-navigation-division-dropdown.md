# Story 1.5: Header Navigation & Division Dropdown

Status: ready-for-dev

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

- [ ] Task 1: Create Header.astro wrapper (AC: #1)
  - [ ] 1.1 Create `src/components/layout/Header.astro`
  - [ ] 1.2 Sticky positioning with `z-50`
  - [ ] 1.3 Render DesktopNav (React island, `client:load`)
  - [ ] 1.4 Render MobileNav placeholder slot (Story 1.6)
  - [ ] 1.5 Pass division/cluster data as props (fetched from content collections)

- [ ] Task 2: Create DesktopNav.tsx React component (AC: #1, #2, #3)
  - [ ] 2.1 Create `src/components/navigation/DesktopNav.tsx`
  - [ ] 2.2 Build on shadcn/ui `NavigationMenu` primitive (Radix UI)
  - [ ] 2.3 Logo left: inline SVG with link to `/`
  - [ ] 2.4 6 nav items centered: Home, About the Group, Divisions, Insights, Investors & Partners, Contact
  - [ ] 2.5 "Divisions" triggers NavigationMenu dropdown (not a direct link)
  - [ ] 2.6 Search icon (placeholder — SearchOverlay is Epic 7)
  - [ ] 2.7 "Get In Touch" CTA button linking to `/contact/`

- [ ] Task 3: Build Division mega-dropdown (AC: #3)
  - [ ] 3.1 3-column layout: one column per cluster
  - [ ] 3.2 Cluster names as non-clickable headings (gold-600 uppercase eyebrow style)
  - [ ] 3.3 Division items: name + one-line description, each linking to `/divisions/[slug]/`
  - [ ] 3.4 "View All Divisions" link at bottom → `/divisions/`
  - [ ] 3.5 Smooth enter/exit transition (200ms fade/slide)

- [ ] Task 4: Implement header scroll behavior (AC: #4, #5)
  - [ ] 4.1 Transparent background over hero: `bg-transparent` with `backdrop-blur-sm`, height 64px
  - [ ] 4.2 On scroll past threshold: transition to `bg-white/95 backdrop-blur-lg border-b border-neutral-300`, reduced height 56px (required by UX-DR10 and information-architecture.md)
  - [ ] 4.3 Logo swap: `logo-reversed.svg` (transparent state) → `logo-primary.svg` (solid state)
  - [ ] 4.4 Nav text color swap: white (transparent) → neutral-600 (solid)
  - [ ] 4.5 CTA button swap: outline-white variant (transparent state — white border, white text, transparent bg for contrast on dark hero) → `bg-neutral-900 text-white hover:bg-primary-800` (solid state — matches design reference `.nav-cta`)
  - [ ] 4.6 All transitions wrapped in `motion-safe:transition-all motion-safe:duration-300`
  - [ ] 4.7 Use `useState` + scroll event listener with `requestAnimationFrame` throttle

- [ ] Task 5: Implement active state and nav highlighting (AC: #7)
  - [ ] 5.1 Determine current path from props (Astro passes `Astro.url.pathname`)
  - [ ] 5.2 Apply `aria-current="page"` to matching nav item
  - [ ] 5.3 Visual active state: `text-primary-600` with subtle bottom border indicator
  - [ ] 5.4 Divisions dropdown active when on any `/divisions/*` route

- [ ] Task 6: Keyboard navigation and accessibility (AC: #6, #7)
  - [ ] 6.1 Full Tab navigation through all nav items
  - [ ] 6.2 Enter/Space opens Divisions dropdown
  - [ ] 6.3 Escape closes dropdown, returns focus to trigger
  - [ ] 6.4 Arrow keys navigate within dropdown
  - [ ] 6.5 `aria-expanded` toggles on dropdown trigger
  - [ ] 6.6 `aria-haspopup="menu"` on Divisions trigger
  - [ ] 6.7 Focus-visible rings on all interactive elements
  - [ ] 6.8 `<nav aria-label="Main navigation">`

- [ ] Task 7: Integrate Header into PageLayout (AC: #1)
  - [ ] 7.1 Import Header.astro into PageLayout's header slot
  - [ ] 7.2 Fetch division/cluster data in PageLayout frontmatter
  - [ ] 7.3 Pass data to Header as props

- [ ] Task 8: Responsive visibility (AC: #8)
  - [ ] 8.1 DesktopNav: `hidden md:flex` (visible md+)
  - [ ] 8.2 Mobile hamburger button: `flex md:hidden` (visible below md)
  - [ ] 8.3 Hamburger button is placeholder until Story 1.6

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

### Debug Log References

### Completion Notes List

### File List
