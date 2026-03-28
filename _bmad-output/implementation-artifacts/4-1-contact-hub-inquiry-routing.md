# Story 4.1: Contact Hub & Inquiry Routing

Status: ready-for-dev

## Story

As a **visitor**,
I want a contact page that routes me to the right inquiry pathway,
So that I reach the appropriate team without guessing which form to use.

## Acceptance Criteria

1. PageHero displays with "Contact" eyebrow, "Get In Touch" heading, and sub-heading "Choose the right pathway to reach the team you need."
2. 4 PathwayCards render in a 2x2 grid: General Enquiries (icon: envelope, → /contact/general/), Contact by Division (icon: building, → /contact/divisions/), Partner / Investor Contact (icon: handshake, → /contact/strategic/), Locations (icon: map-pin, → /contact/locations/)
3. Each PathwayCard has icon, heading, brief descriptor, and action link with hover elevation effect
4. Quick Contact Info section below shows 3 ContactInfoCards: phone, email, head office address
5. Breadcrumbs: Home > Contact
6. SEO metadata includes ContactPage structured data
7. Cards stack to 1-column on mobile

## Tasks / Subtasks

- [ ] Task 1: Create `src/pages/contact/index.astro` (AC: #1, #5, #6)
  - [ ] 1.1 PageLayout with SEO: title "Contact Global Resources Citadel — Enquiries, Partnerships & Locations"
  - [ ] 1.2 Description: "Get in touch with Global Resources Citadel Limited. Submit general enquiries, contact specific business divisions, or reach our strategic partnerships team."
  - [ ] 1.3 Canonical: `/contact/`
  - [ ] 1.4 ContactPage JSON-LD structured data
  - [ ] 1.5 BreadcrumbNav: Home > Contact
  - [ ] 1.6 Breadcrumb JSON-LD

- [ ] Task 2: Build page hero section inline (AC: #1)
  - [ ] 2.1 Build inline with SectionWrapper `variant="primary"` (primary-50 bg) — same pattern as Story 3.1. Do NOT use the dark-gradient PageHero component; the IA spec calls for "subtle background" on contact/hub pages.
  - [ ] 2.2 Gold eyebrow: "Contact"
  - [ ] 2.3 H1: "Get In Touch"
  - [ ] 2.4 Sub-heading: "Choose the right pathway to reach the team you need."
  - [ ] 2.5 Centered text layout, constrained max-width (`max-w-3xl`)

- [ ] Task 3: Create PathwayCard.astro component (AC: #2, #3)
  - [ ] 3.1 Create `src/components/contact/PathwayCard.astro`
  - [ ] 3.2 Props: icon (Lucide icon name), heading, description, linkLabel, href
  - [ ] 3.3 Icon circle: primary-100 bg, primary-600 icon colour, 48px
  - [ ] 3.4 Heading: H3, font-heading font-semibold text-lg
  - [ ] 3.5 Description: text-sm text-neutral-600, 1-2 sentences
  - [ ] 3.6 Action link: text-sm font-semibold text-primary-600 with arrow + group-hover gap animation
  - [ ] 3.7 Card: `border border-neutral-200 rounded-xl p-6`, link wrapper (`<a>`)
  - [ ] 3.8 Hover: `motion-safe:hover:shadow-md motion-safe:hover:border-neutral-300`
  - [ ] 3.9 Focus-visible ring on card

- [ ] Task 4: Build inquiry pathways grid (AC: #2, #7)
  - [ ] 4.1 SectionWrapper variant="default" (white)
  - [ ] 4.2 2x2 grid: `grid-cols-1 sm:grid-cols-2 gap-6`
  - [ ] 4.3 Card 1: General Enquiries — Mail icon, "For general questions about Global Resources Citadel.", "Submit Enquiry →" → `/contact/general/`
  - [ ] 4.4 Card 2: Contact by Division — Building2 icon, "Reach the team in the division relevant to you.", "Choose Division →" → `/contact/divisions/`
  - [ ] 4.5 Card 3: Partner / Investor Contact — Handshake icon, "For investment, partnership, or strategic discussions.", "Start Conversation →" → `/contact/strategic/`
  - [ ] 4.6 Card 4: Locations — MapPin icon, "Find our offices and operational locations.", "View Locations →" → `/contact/locations/`

- [ ] Task 5: Create ContactInfoCard.astro and Quick Contact section (AC: #4)
  - [ ] 5.1 Create `src/components/contact/ContactInfoCard.astro`
  - [ ] 5.2 Props: icon, label, value (string or slot for multi-line)
  - [ ] 5.3 Icon: 40px circle, primary-50 bg, primary-600 icon
  - [ ] 5.4 Label: text-sm font-semibold text-neutral-900
  - [ ] 5.5 Value: text-sm text-neutral-600
  - [ ] 5.6 SectionWrapper variant="light" (neutral-50)
  - [ ] 5.7 3-column grid: `grid-cols-1 md:grid-cols-3 gap-6`
  - [ ] 5.8 Phone: "+234 XXX XXX XXXX" (placeholder)
  - [ ] 5.9 Email: "info@globalresourcescitadel.com"
  - [ ] 5.10 Head Office: placeholder address, City, Nigeria

## Dev Notes

### Page Structure from Information Architecture

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact
  ├── Section 1: PageHero
  │   ├── Gold eyebrow: "Contact"
  │   ├── H1: "Get In Touch"
  │   └── Sub-heading: "Choose the right pathway..."
  ├── Section 2: Inquiry Pathways (white bg)
  │   └── 2x2 Grid of PathwayCards
  │       ├── General Enquiries → /contact/general/
  │       ├── Contact by Division → /contact/divisions/
  │       ├── Partner / Investor → /contact/strategic/
  │       └── Locations → /contact/locations/
  └── Section 3: Quick Contact Info (neutral-50 bg)
      └── 3 ContactInfoCards: Phone, Email, Head Office
```

### PathwayCard Icon Mapping

Use Lucide React icons rendered server-side in Astro, or inline SVGs:

| Card | Lucide Icon | Heading |
|------|-------------|---------|
| General Enquiries | `Mail` | General Enquiries |
| Contact by Division | `Building2` | Contact by Division |
| Partner / Investor | `Handshake` | Partner / Investor Contact |
| Locations | `MapPin` | Locations |

Since PathwayCard is an Astro component (static, no interactivity), icons should be passed as slot content or imported SVGs — NOT React components. Options:
1. Pass Lucide SVG markup as a slot
2. Use a simple icon mapping with inline SVG strings
3. Use Astro's `<Icon>` if an icon integration is installed

Simplest approach: hardcode SVG icons inline in each PathwayCard instance on the page.

### Contact Info Placeholders

| Field | Value |
|-------|-------|
| Phone | +234 XXX XXX XXXX (placeholder — client to provide) |
| Email | info@globalresourcescitadel.com |
| Head Office | [Address], [City], Nigeria (placeholder — client to provide) |
| Hours | Mon-Fri, 8am-5pm WAT |

### ContactPage Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Global Resources Citadel",
  "description": "Get in touch with Global Resources Citadel Limited.",
  "url": "https://globalresourcescitadel.com/contact/",
  "mainEntity": {
    "@type": "Organization",
    "name": "Global Resources Citadel Limited",
    "email": "info@globalresourcescitadel.com",
    "telephone": "+234XXXXXXXXX"
  }
}
```

### Contact Architecture Overview

This is a **routing hub** — not a form page. It routes visitors to 4 distinct inquiry pathways:

```
/contact/ (this page — routing hub)
  ├── /contact/general/        (Story 4.3 — general form)
  ├── /contact/divisions/      (Story 4.2 — division directory)
  │   └── /contact/divisions/[slug]/  (Story 4.2 — 7 division forms)
  ├── /contact/strategic/      (Story 4.3 — strategic form)
  └── /contact/locations/      (Story 4.5 — locations page)
```

All form pages (4.2, 4.3) and the locations page (4.5) are built in later stories. Links will 404 until then — expected behavior.

### Soft Forward Links

All 4 PathwayCard links are soft forward dependencies:
- `/contact/general/` → Story 4.3
- `/contact/divisions/` → Story 4.2
- `/contact/strategic/` → Story 4.3
- `/contact/locations/` → Story 4.5

### Previous Story Intelligence

**Story 1.4** — PageHero, SectionWrapper, SectionHeading, Button components available.

**Story 1.8** — BreadcrumbNav and `generateBreadcrumbJsonLd()` available.

**Story 3.3** — Division detail pages link to `/contact/divisions/[slug]/` in their inquiry CTA (Section 5). Those links target pages built in Story 4.2.

### What This Story Does NOT Include

- No contact forms (Stories 4.2, 4.3)
- No form submission or email processing (Story 4.4)
- No locations page (Story 4.5)
- No InquiryForm React component
- No /api/contact endpoint

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/contact/index.astro`
- **Creates:** `src/components/contact/PathwayCard.astro`
- **Creates:** `src/components/contact/ContactInfoCard.astro`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P22 Contact Hub wireframe, sections, SEO, routing architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Contact page patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md — Contact routing, form architecture]
- [Source: _bmad-output/implementation-artifacts/1-4-base-layouts-core-ui-components.md — PageHero, SectionWrapper]
- [Source: _bmad-output/implementation-artifacts/1-8-breadcrumb-navigation.md — BreadcrumbNav]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
