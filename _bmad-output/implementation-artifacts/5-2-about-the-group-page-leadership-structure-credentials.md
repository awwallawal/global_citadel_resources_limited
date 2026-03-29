# Story 5.2: About the Group Page — Leadership, Structure & Credentials

Status: ready-for-dev

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

- [ ] Task 1: Create LeaderCard.astro component (AC: #1)
  - [ ] 1.1 Create `src/components/shared/LeaderCard.astro`
  - [ ] 1.2 Props: name, title, briefDescriptor, photo (optional path), id (for bio panel targeting)
  - [ ] 1.3 Photo: 3:4 aspect ratio placeholder (styled div with User icon if no photo)
  - [ ] 1.4 Name: H3, font-heading font-semibold text-base
  - [ ] 1.5 Title: text-sm text-neutral-600
  - [ ] 1.6 Brief descriptor: text-xs text-neutral-500, max 15 words, line-clamp-2
  - [ ] 1.7 Card: `rounded-xl overflow-hidden border border-neutral-200`
  - [ ] 1.8 Hover: `motion-safe:hover:shadow-md`, cursor pointer
  - [ ] 1.9 Focus-visible ring on card (button/clickable element)
  - [ ] 1.10 Click triggers bio panel (data attribute or JS event)

- [ ] Task 2: Create LeaderBioPanel (AC: #2)
  - [ ] 2.1 Option A: inline expand below card (accordion-style) — simpler, recommended for MVP
  - [ ] 2.2 Option B: modal/dialog — more polished but requires React island
  - [ ] 2.3 For MVP use inline expand with `<details>`/`<summary>` wrapping each LeaderCard (zero JS)
  - [ ] 2.4 Expanded state: full photo + name + title + detailed bio paragraphs
  - [ ] 2.5 Bio text: `text-sm leading-relaxed text-neutral-600`
  - [ ] 2.6 Close/collapse on click or second tap

- [ ] Task 3: Build Leadership section on About page (AC: #1, #2)
  - [ ] 3.1 Replace #leadership placeholder in about.astro
  - [ ] 3.2 SectionWrapper variant="default", `id="leadership"`
  - [ ] 3.3 SectionHeading: "Leadership" with subtitle about governance
  - [ ] 3.4 Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`
  - [ ] 3.5 Fetch leader data from team collection, sorted by sortOrder
  - [ ] 3.6 Render LeaderCard for each team member

- [ ] Task 4: Create OrgChart.astro component (AC: #3, #6)
  - [ ] 4.1 Create `src/components/shared/OrgChart.astro`
  - [ ] 4.2 Styled HTML/CSS tree (not SVG — more accessible, easier responsive)
  - [ ] 4.3 Level 1: "Global Resources Citadel Limited" (holding company)
  - [ ] 4.4 Level 2: 3 cluster nodes with connecting lines
  - [ ] 4.5 Level 3: 7 division nodes under their respective clusters
  - [ ] 4.6 Desktop: horizontal tree layout with vertical connecting lines
  - [ ] 4.7 Mobile: vertical tree layout with indent hierarchy
  - [ ] 4.8 Node styling: `rounded-lg border border-neutral-200 px-4 py-2 text-sm`
  - [ ] 4.9 Cluster nodes: cluster accent bg (amber-100/copper-100/slate-100)
  - [ ] 4.10 Division nodes: link to `/divisions/[slug]/`
  - [ ] 4.11 Connecting lines: CSS borders or pseudo-elements

- [ ] Task 5: Build Group Structure section on About page (AC: #3)
  - [ ] 5.1 Replace #group-structure placeholder
  - [ ] 5.2 SectionWrapper variant="light", `id="group-structure"`
  - [ ] 5.3 SectionHeading: "How Our Divisions Connect"
  - [ ] 5.4 OrgChart component
  - [ ] 5.5 1-2 paragraphs explaining value chain logic
  - [ ] 5.6 ViewAllLink: "Explore Our Divisions →" → `/divisions/`

- [ ] Task 6: Create CredentialCard.astro component (AC: #4)
  - [ ] 6.1 Create `src/components/shared/CredentialCard.astro`
  - [ ] 6.2 Props: name, issuer, logo (optional path), scope
  - [ ] 6.3 Logo: placeholder icon circle if no logo image
  - [ ] 6.4 Name: font-heading font-semibold text-sm
  - [ ] 6.5 Issuer: text-xs text-neutral-500
  - [ ] 6.6 Card: `rounded-lg border border-neutral-200 p-4 text-center`

- [ ] Task 7: Build Credentials section on About page (AC: #4)
  - [ ] 7.1 Replace #credentials placeholder
  - [ ] 7.2 SectionWrapper variant="default", `id="credentials"`
  - [ ] 7.3 SectionHeading: "Credentials & Certifications"
  - [ ] 7.4 Grid: `grid-cols-2 md:grid-cols-3 gap-6`
  - [ ] 7.5 Fetch credentials from credentials collection
  - [ ] 7.6 Show first 6 by default; "Show All" toggle if >6 (use `<details>`/`<summary>`)

- [ ] Task 8: Add CTA Band and resolve Values section (AC: #5)
  - [ ] 8.1 **Values section resolution:** Story 5.1's Mission & Vision section (AC #4) includes "optional row of 3-4 value cards." If those ARE populated in Story 5.1, remove the empty #values placeholder section and update AnchorNav to point the "Values" link at `#mission-vision` instead. If Story 5.1 omits value cards, populate #values as a standalone section (SectionWrapper variant="light", `id="values"`) with the value cards (icon + title + description) from the `about.mdx` frontmatter `values` array.
  - [ ] 8.2 CTABanner dark variant: "Interested in Working With Us?"
  - [ ] 8.3 Dual CTAs: "Contact Us" → `/contact/`, "Explore Divisions" → `/divisions/`

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

### Debug Log References

### Completion Notes List

### File List
