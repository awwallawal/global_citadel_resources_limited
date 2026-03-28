# Story 4.5: Locations Page

Status: ready-for-dev

## Story

As a **visitor**,
I want to find GRCL's physical offices and operational sites,
So that I can visit or send correspondence to the right location.

## Acceptance Criteria

1. Heading "Our Locations" and body text displayed
2. 2-column layout: optional map embed or static map image on left, location details on right
3. Head Office section shows address, phone, and business hours
4. Optional Operational Sites section lists additional locations with name and address
5. Breadcrumbs: Home > Contact > Locations
6. Page is responsive: columns stack on mobile

## Tasks / Subtasks

- [ ] Task 1: Create `src/pages/contact/locations.astro` (AC: #1, #5)
  - [ ] 1.1 PageLayout with SEO: title "Our Locations — Global Resources Citadel"
  - [ ] 1.2 Description: "Find Global Resources Citadel Limited offices and operational sites across Nigeria."
  - [ ] 1.3 Canonical: `/contact/locations/`
  - [ ] 1.4 BreadcrumbNav: Home > Contact > Locations
  - [ ] 1.5 Breadcrumb JSON-LD

- [ ] Task 2: Build page heading and content (AC: #1)
  - [ ] 2.1 SectionWrapper variant="default"
  - [ ] 2.2 SectionHeading eyebrow "Contact", heading "Our Locations"
  - [ ] 2.3 Body text: "Find Global Resources Citadel offices and operational sites."

- [ ] Task 3: Build 2-column location layout (AC: #2, #3, #4, #6)
  - [ ] 3.1 Grid: `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`
  - [ ] 3.2 Left column: map placeholder (static image or styled placeholder div with MapPin icon)
  - [ ] 3.3 Right column: location detail cards
  - [ ] 3.4 Head Office card: address, phone, hours (Mon-Fri, 8am-5pm WAT)
  - [ ] 3.5 Optional Operational Sites section with additional location cards
  - [ ] 3.6 Mobile: stack vertically (map above, details below)

- [ ] Task 4: Create LocationCard.astro component (AC: #3, #4)
  - [ ] 4.1 Create `src/components/contact/LocationCard.astro`
  - [ ] 4.2 Props: name, type (head-office/operational-site), address, phone (optional), hours (optional)
  - [ ] 4.3 Head Office: prominent styling with `border-l-2 border-primary-600 pl-5`
  - [ ] 4.4 Operational Site: standard styling with `border-l-2 border-neutral-300 pl-5`
  - [ ] 4.5 Address text: `text-sm text-neutral-600 leading-relaxed`
  - [ ] 4.6 Phone: `text-sm text-neutral-600` with tel: link
  - [ ] 4.7 Hours: `text-xs text-neutral-500`

## Dev Notes

### Page Structure

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact > Locations
  ├── SectionWrapper (default)
  │   ├── SectionHeading: eyebrow "Contact", heading "Our Locations"
  │   ├── Body text
  │   └── 2-column grid
  │       ├── Left: Map placeholder
  │       │   └── Styled div with MapPin icon + "Map coming soon" or static image
  │       └── Right: Location details
  │           ├── HEAD OFFICE
  │           │   ├── Name: "Head Office"
  │           │   ├── Address: [placeholder]
  │           │   ├── Phone: +234 XXX XXX XXXX
  │           │   └── Hours: Mon-Fri, 8am-5pm WAT
  │           └── OPERATIONAL SITES (optional)
  │               ├── Site 1: Name + Address
  │               └── Site 2: Name + Address
```

### Location Data (Placeholders)

All location data is placeholder — exact addresses to be provided by the client.

**Head Office:**
```
Name: Head Office
Address: [Street Address], [City], Nigeria
Phone: +234 XXX XXX XXXX
Hours: Monday – Friday, 8:00am – 5:00pm WAT
```

**Operational Sites (optional — include if client confirms):**
```
Site 1: [Agricultural Operations], [State], Nigeria
Site 2: [Processing Facility], [State], Nigeria
```

If no operational sites are confirmed, omit that section entirely — never show "Coming Soon" per CLAUDE.md.

### Map Placeholder

No real map embed for MVP (Google Maps API requires billing setup and key management). Use a styled placeholder:

```astro
<div class="flex aspect-[4/3] items-center justify-center rounded-xl bg-neutral-100">
  <div class="text-center">
    <svg class="mx-auto h-12 w-12 text-neutral-400" ...><!-- MapPin icon --></svg>
    <p class="mt-3 text-sm text-neutral-500">Interactive map available soon</p>
  </div>
</div>
```

**Note:** "available soon" is acceptable as a UI state description (it's describing the feature, not the content). It's distinct from "Coming Soon" which CLAUDE.md prohibits as placeholder text for missing content.

### LocationCard Styling

```astro
---
interface Props {
  name: string;
  type: 'head-office' | 'operational-site';
  address: string;
  phone?: string;
  hours?: string;
}

const { name, type, address, phone, hours } = Astro.props;
const borderClass = type === 'head-office' ? 'border-primary-600' : 'border-neutral-300';
---

<div class={`border-l-2 ${borderClass} pl-5 py-2`}>
  <h3 class="font-heading text-base font-semibold text-neutral-900">{name}</h3>
  <p class="mt-1 text-sm leading-relaxed text-neutral-600">{address}</p>
  {phone && (
    <a href={`tel:${phone.replace(/\s/g, '')}`} class="mt-1 block text-sm text-neutral-600 hover:text-primary-600">
      {phone}
    </a>
  )}
  {hours && (
    <p class="mt-1 text-xs text-neutral-500">{hours}</p>
  )}
</div>
```

### This is the Simplest Story in Epic 4

The Locations page is a static content page with no forms, no interactivity, no dynamic routes. It's a straightforward Astro page with placeholder content waiting for client-provided location data.

### Previous Story Intelligence

**Story 4.1** creates the Contact Hub with PathwayCard linking to `/contact/locations/`. That link now resolves.

**Story 1.4** provides SectionWrapper, SectionHeading, PageLayout.

**Story 1.8** provides BreadcrumbNav.

### What This Story Does NOT Include

- No Google Maps embed (requires API key + billing — post-MVP)
- No interactive map functionality
- No location search or filtering
- No driving directions
- Real addresses TBD from client

### What This Story Completes

This is the **final story in Epic 4**. After this story:
- `/contact/` — routing hub with 4 pathways (4.1)
- `/contact/divisions/` — division directory (4.2)
- `/contact/divisions/[slug]/` — 7 division inquiry forms (4.2)
- `/contact/general/` — general enquiry form (4.3)
- `/contact/strategic/` — strategic/investor form (4.3)
- `/api/contact` — form submission endpoint with Resend email (4.4)
- `/contact/locations/` — office locations (4.5)

The complete inquiry and contact architecture is live.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/contact/locations.astro`
- **Creates:** `src/components/contact/LocationCard.astro`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.5 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P27 Locations page wireframe, location data structure]
- [Source: _bmad-output/implementation-artifacts/4-1-contact-hub-inquiry-routing.md — PathwayCard linking here]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
