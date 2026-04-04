# Story 5.2: About the Group Page — Leadership, Structure & Credentials

Status: done

## Story

As an **investor or partner visitor**,
I want to see the leadership team, organizational structure, and credentials,
So that I can evaluate the governance and legitimacy of the business.

## Acceptance Criteria

1. Leadership section (#leadership): grid of LeaderCards (4 per row desktop, 2 mobile) with portrait photo (3:4 aspect), name, title, brief descriptor (max 15 words)
2. Clicking/tapping a LeaderCard opens an expanded LeaderBioPanel (inline expand or modal) with full photo and detailed biography
3. Group Structure section (#group-structure): OrgChart component (SVG or styled HTML) showing holding company → 3 clusters → 7 divisions with connecting lines, plus 1-2 paragraphs and "Explore Our Divisions" link
4. Credentials section (#credentials): grid of CredentialCards (logo/icon + certification name + issuing body), 3 per row, "Show All" toggle if more than 6
5. CTA Band at bottom: "Interested in Working With Us?" with Contact and Explore Divisions buttons
6. OrgChart simplifies to vertical tree on mobile
7. Leader data from team collection, credentials from credentials collection

## Tasks / Subtasks

- [x] Task 1: Create LeaderCard.astro component (AC: #1)
  - [x] 1.1 Create `src/components/shared/LeaderCard.astro`
  - [x] 1.2 Props: name, title, briefDescriptor, bio, photo (optional)
  - [x] 1.3 Photo: 3:4 aspect ratio placeholder with User icon
  - [x] 1.4 Name: H3, font-heading font-semibold text-base
  - [x] 1.5 Title: text-sm text-neutral-600
  - [x] 1.6 Brief descriptor: text-xs text-neutral-500, line-clamp-2
  - [x] 1.7 Card: `rounded-xl overflow-hidden border border-neutral-200`
  - [x] 1.8 Hover: `motion-safe:group-hover:shadow-md`, cursor pointer
  - [x] 1.9 Focus-visible ring on summary element
  - [x] 1.10 Click triggers bio expand via details/summary

- [x] Task 2: Create LeaderBioPanel (AC: #2)
  - [x] 2.1 Used inline expand with `<details>`/`<summary>` (zero JS)
  - [x] 2.4 Expanded state: name + title + multi-paragraph bio
  - [x] 2.5 Bio text: `text-sm leading-relaxed text-neutral-600`
  - [x] 2.6 Close/collapse on click

- [x] Task 3: Build Leadership section on About page (AC: #1, #2)
  - [x] 3.1 Replaced #leadership placeholder
  - [x] 3.2 SectionWrapper variant="default", `id="leadership"`
  - [x] 3.3 SectionHeading: "Leadership" with subtitle
  - [x] 3.4 Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`
  - [x] 3.5 Fetched from team collection, sorted by sortOrder
  - [x] 3.6 LeaderCard rendered for all 3 team members

- [x] Task 4: Create OrgChart.astro component (AC: #3, #6)
  - [x] 4.1 Created `src/components/shared/OrgChart.astro`
  - [x] 4.2 Styled HTML/CSS tree
  - [x] 4.3 Level 1: holding company node (primary border)
  - [x] 4.4 Level 2: 3 cluster nodes with connecting lines
  - [x] 4.5 Level 3: 7 division link nodes
  - [x] 4.6 Desktop: horizontal tree with evenly spaced clusters
  - [x] 4.7 Mobile: vertical indent tree with border-l hierarchy
  - [x] 4.8-4.11 All styling, accent colors, links, connecting lines

- [x] Task 5: Build Group Structure section on About page (AC: #3)
  - [x] 5.1 Replaced #group-structure placeholder
  - [x] 5.2 SectionWrapper variant="light", `id="group-structure"`
  - [x] 5.3 SectionHeading: "How Our Divisions Connect"
  - [x] 5.4 OrgChart component
  - [x] 5.5 Explanatory paragraph about value chain
  - [x] 5.6 "Explore Our Divisions →" link

- [x] Task 6: Create CredentialCard.astro component (AC: #4)
  - [x] 6.1-6.6 All completed: icon placeholder, name, issuer, centered card

- [x] Task 7: Build Credentials section on About page (AC: #4)
  - [x] 7.1-7.5 All completed: SectionWrapper, heading, grid, fetched from collection
  - [x] 7.6 Show All toggle with `<details>`/`<summary>` (currently 3 credentials, no hidden overflow)

- [x] Task 8: Add CTA Band and resolve Values section (AC: #5)
  - [x] 8.1 Values resolved: Story 5.1 populates value cards in #mission-vision section — removed empty #values placeholder, removed "Values" from AnchorNav items
  - [x] 8.2 CTABanner dark variant: "Interested in Working With Us?"
  - [x] 8.3 Dual CTAs: "Contact Us" → `/contact/`, "Explore Divisions" → `/divisions/`

## Dev Notes

### About Page — Full Section Map After This Story

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > About the Group
  ├── PageHero (Story 5.1)
  ├── AnchorNav (Story 5.1)
  ├── #overview — Company Overview (Story 5.1) ✅
  ├── #mission-vision — Mission & Vision (Story 5.1) ✅
  ├── #leadership — Leadership (THIS STORY)
  │   ├── SectionHeading: "Leadership"
  │   └── LeaderCard grid (4 per row desktop)
  ├── #group-structure — Group Structure (THIS STORY)
  │   ├── SectionHeading: "How Our Divisions Connect"
  │   ├── OrgChart (holding → clusters → divisions)
  │   └── Prose + "Explore Our Divisions" link
  ├── #credentials — Credentials (THIS STORY)
  │   ├── SectionHeading: "Credentials & Certifications"
  │   └── CredentialCard grid (3 per row, expandable)
  ├── #values — Values (may be covered by Mission section)
  └── CTABanner (THIS STORY)
```

### LeaderCard + Bio Panel — Zero-JS Pattern

Use `<details>`/`<summary>` for MVP bio expand (same pattern as mobile footer accordion in Story 1.7):

```astro
<details class="group">
  <summary class="cursor-pointer list-none">
    <div class="rounded-xl border border-neutral-200 overflow-hidden motion-safe:transition-shadow motion-safe:group-hover:shadow-md">
      <!-- Photo placeholder -->
      <div class="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
        <svg class="h-16 w-16 text-neutral-300" ...><!-- User icon --></svg>
      </div>
      <div class="p-4">
        <h3 class="font-heading text-base font-semibold text-neutral-900">{name}</h3>
        <p class="text-sm text-neutral-600">{title}</p>
        <p class="mt-1 text-xs text-neutral-500 line-clamp-2">{briefDescriptor}</p>
      </div>
    </div>
  </summary>
  <!-- Expanded bio -->
  <div class="mt-2 rounded-xl border border-primary-100 bg-primary-50/50 p-6">
    <p class="text-sm leading-relaxed text-neutral-600">{bio}</p>
  </div>
</details>
```

### OrgChart — CSS Tree Pattern

Styled HTML tree using CSS flexbox + borders for connecting lines. No SVG needed.

```astro
<!-- Desktop: horizontal tree -->
<div class="hidden lg:block">
  <div class="flex flex-col items-center">
    <!-- Level 1: Holding -->
    <div class="rounded-lg border-2 border-primary-600 bg-primary-50 px-6 py-3 font-heading text-sm font-semibold">
      Global Resources Citadel Limited
    </div>
    <div class="h-8 w-px bg-neutral-300"></div>
    <!-- Level 2: Clusters -->
    <div class="flex gap-12">
      {clusters.map(cluster => (
        <div class="flex flex-col items-center">
          <div class={`rounded-lg border px-4 py-2 text-xs font-semibold ${accentStyles[cluster.accent].bg}`}>
            {cluster.name}
          </div>
          <div class="h-6 w-px bg-neutral-300"></div>
          <!-- Level 3: Divisions -->
          <div class="flex flex-col gap-2">
            {cluster.divisions.map(div => (
              <a href={`/divisions/${div.slug}/`} class="rounded border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700 hover:border-primary-300 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                {div.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<!-- Mobile: vertical indent tree -->
<div class="lg:hidden">
  <div class="space-y-3">
    <div class="rounded-lg border-2 border-primary-600 bg-primary-50 px-4 py-2 font-heading text-sm font-semibold">
      Global Resources Citadel Limited
    </div>
    {clusters.map(cluster => (
      <div class="ml-6 border-l-2 border-neutral-200 pl-4">
        <div class={`rounded-lg px-3 py-1.5 text-xs font-semibold ${accentStyles[cluster.accent].bg}`}>
          {cluster.name}
        </div>
        {cluster.divisions.map(div => (
          <a href={`/divisions/${div.slug}/`} class="mt-1 ml-4 block rounded text-xs text-neutral-600 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            {div.name}
          </a>
        ))}
      </div>
    ))}
  </div>
</div>
```

### Credentials "Show All" Toggle

Use `<details>`/`<summary>` for zero-JS expand:

```astro
---
const visibleCredentials = credentials.slice(0, 6);
const hiddenCredentials = credentials.slice(6);
---

<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
  {visibleCredentials.map(cred => <CredentialCard {...cred.data} />)}
</div>

{hiddenCredentials.length > 0 && (
  <details class="mt-6">
    <summary class="cursor-pointer text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
      Show All ({credentials.length} total)
    </summary>
    <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
      {hiddenCredentials.map(cred => <CredentialCard {...cred.data} />)}
    </div>
  </details>
)}
```

### Content Collection Data Sources

**Team collection** (Story 1.3): `name`, `title`, `bio`, `briefDescriptor`, `photo`, `sortOrder`, `featured`

**Credentials collection** (Story 1.3): `name`, `issuer`, `logo`, `scope`, `sortOrder`

```astro
---
import { getCollection } from 'astro:content';

const leaders = (await getCollection('team')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const credentials = (await getCollection('credentials')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const clusters = await getCollection('clusters');
const divisions = await getCollection('divisions');
---
```

### Cluster Accent Styles (Reused)

```typescript
const accentStyles: Record<string, { bg: string; text: string }> = {
  'agriculture-processing': { bg: 'bg-amber-100', text: 'text-amber-600' },
  'trade-markets': { bg: 'bg-copper-100', text: 'text-copper-600' },
  'built-environment-energy': { bg: 'bg-slate-100', text: 'text-slate-600' },
};
```

### Section Background Alternation

| Section | Background | ID |
|---------|-----------|-----|
| Overview (5.1) | white | #overview |
| Mission & Vision (5.1) | neutral-50 | #mission-vision |
| Leadership | white | #leadership |
| Group Structure | neutral-50 | #group-structure |
| Credentials | white | #credentials |
| Values | neutral-50 | #values |
| CTA Band | dark (neutral-900) | — |

### Previous Story Intelligence

**Story 5.1** creates the About page with PageHero, AnchorNav, Overview, and Mission & Vision sections. It leaves placeholder `<section>` elements for Leadership, Group Structure, Credentials, and Values. This story populates them.

**Story 1.3** provides team and credentials content collections with seed data (2-3 placeholder entries each).

**Story 1.4** provides SectionWrapper, SectionHeading, CTABanner, ViewAllLink, Button.

**Story 2.3** provides StatCounter (not used here) and CredibilityBar pattern (reuse concept for credentials grid).

### What This Story Does NOT Include

- No real leadership portraits — placeholder User icons
- No real credential logos — placeholder icon circles
- No interactive SVG org chart — CSS tree only
- No About page navigation changes (AnchorNav from 5.1 already has all links)

### What This Story Completes for the About Page

After this story, `/about/` has all 7 sections:
1. PageHero (5.1)
2. AnchorNav (5.1)
3. Overview (5.1)
4. Mission & Vision (5.1)
5. Leadership (this story)
6. Group Structure (this story)
7. Credentials (this story)
8. CTA Band (this story)

The complete corporate trust page is live.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/shared/LeaderCard.astro`
- **Creates:** `src/components/shared/OrgChart.astro`
- **Creates:** `src/components/shared/CredentialCard.astro`
- **Modifies:** `src/pages/about.astro` — replaces placeholder sections with Leadership, Group Structure, Credentials, CTA

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 5, Story 5.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P02 About page sections 4-6 wireframes, leadership grid, org chart, credentials]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — LeaderCard, OrgChart, CredentialCard component specs]
- [Source: _bmad-output/implementation-artifacts/5-1-about-the-group-page-overview-mission-vision.md — About page structure, placeholder sections, AnchorNav]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Team + credentials collections]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- No issues. Clean build, zero TypeScript errors.

### Completion Notes List

- Created `LeaderCard.astro` with `<details>/<summary>` zero-JS bio expansion, 3:4 photo placeholder, name/title/brief descriptor, hover shadow, focus-visible ring
- Created `OrgChart.astro` CSS tree with desktop horizontal layout (3 evenly-spaced cluster columns with division links) and mobile vertical indent hierarchy (border-l-2 nesting). Cluster accent colors from content collections.
- Created `CredentialCard.astro` with settings gear icon placeholder, certification name, issuer text
- Updated `about.astro`: replaced all 4 placeholder sections with Leadership (team grid), Group Structure (OrgChart + prose + link), Credentials (grid + Show All toggle), CTA Band (dark variant, dual CTAs). Resolved Values section — value cards already in #mission-vision, removed empty #values and "Values" from AnchorNav.
- AnchorNav now has 5 items: Overview, Mission & Vision, Leadership, Group Structure, Credentials
- Build: 26 pages, zero errors. About page is fully complete with all 7 sections.

### File List

- `src/components/shared/LeaderCard.astro` (created)
- `src/components/shared/OrgChart.astro` (created)
- `src/components/shared/CredentialCard.astro` (created)
- `src/pages/about.astro` (modified — replaced placeholders with full sections, added CTA)

### Review Findings

- [x] [Review][Patch] OrgChart `as` operator precedence — `'amber' as ClusterAccentColor` only casts literal, not full expression [OrgChart.astro:17] — FIXED
- [x] [Review][Patch] `aspect-[3/4]` arbitrary Tailwind value — CLAUDE.md violation [LeaderCard.astro:24] — FIXED (added `--aspect-portrait` theme token)
- [x] [Review][Patch] `bio.split('\n\n')` missing empty filter — inconsistent with investors-partners pattern [LeaderCard.astro:51] — FIXED
- [x] [Review][Patch] CredentialCard unused `logo`/`scope` props + dead scope coercion [CredentialCard.astro:7-14, about.astro:232] — FIXED
- [x] [Review][Patch] OrgChart mobile division links below 44px touch target — CLAUDE.md a11y violation [OrgChart.astro:79-83] — FIXED
- [x] [Review][Defer] LeaderCard `<summary>` no visible expand indicator — enhancement for future
- [x] [Review][Defer] OrgChart lacks semantic tree roles (role="tree") — Epic 8 a11y audit
- [x] [Review][Defer] LeaderCard `photo` prop accepted but unused — placeholder until real photos

### Change Log

- 2026-04-03: Implemented Story 5.2 — Leadership grid, OrgChart, Credentials section, CTA Band. About page complete.
- 2026-04-04: Code review completed — 5 patch findings (all fixed), 3 deferred, 8+ dismissed. Story status → done.
