# Story 4.1: Contact Hub & Inquiry Routing

Status: done

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

- [x] Task 1: Create `src/pages/contact/index.astro` (AC: #1, #5, #6)
  - [x] 1.1 PageLayout with SEO: title "Contact Global Resources Citadel — Enquiries, Partnerships & Locations"
  - [x] 1.2 Description: "Get in touch with Global Resources Citadel Limited. Submit general enquiries, contact specific business divisions, or reach our strategic partnerships team."
  - [x] 1.3 Canonical: `/contact/`
  - [x] 1.4 ContactPage JSON-LD structured data
  - [x] 1.5 BreadcrumbNav: Home > Contact
  - [x] 1.6 Breadcrumb JSON-LD

- [x] Task 2: Build page hero section inline (AC: #1)
  - [x] 2.1 Build inline with SectionWrapper `variant="primary"` (primary-50 bg) — same pattern as Story 3.1. Do NOT use the dark-gradient PageHero component; the IA spec calls for "subtle background" on contact/hub pages.
  - [x] 2.2 Gold eyebrow: "Contact"
  - [x] 2.3 H1: "Get In Touch"
  - [x] 2.4 Sub-heading: "Choose the right pathway to reach the team you need."
  - [x] 2.5 Centered text layout, constrained max-width (`max-w-3xl`)

- [x] Task 3: Create PathwayCard.astro component (AC: #2, #3)
  - [x] 3.1 Create `src/components/contact/PathwayCard.astro`
  - [x] 3.2 Props: icon (Lucide icon name), heading, description, linkLabel, href
  - [x] 3.3 Icon circle: primary-100 bg, primary-600 icon colour, 48px
  - [x] 3.4 Heading: H3, font-heading font-semibold text-lg
  - [x] 3.5 Description: text-sm text-neutral-600, 1-2 sentences
  - [x] 3.6 Action link: text-sm font-semibold text-primary-600 with arrow + group-hover gap animation
  - [x] 3.7 Card: `border border-neutral-200 rounded-xl p-6`, link wrapper (`<a>`)
  - [x] 3.8 Hover: `motion-safe:hover:shadow-md motion-safe:hover:border-neutral-300`
  - [x] 3.9 Focus-visible ring on card

- [x] Task 4: Build inquiry pathways grid (AC: #2, #7)
  - [x] 4.1 SectionWrapper variant="default" (white)
  - [x] 4.2 2x2 grid: `grid-cols-1 sm:grid-cols-2 gap-6`
  - [x] 4.3 Card 1: General Enquiries — Mail icon, "For general questions about Global Resources Citadel.", "Submit Enquiry →" → `/contact/general/`
  - [x] 4.4 Card 2: Contact by Division — Building2 icon, "Reach the team in the division relevant to you.", "Choose Division →" → `/contact/divisions/`
  - [x] 4.5 Card 3: Partner / Investor Contact — Handshake icon, "For investment, partnership, or strategic discussions.", "Start Conversation →" → `/contact/strategic/`
  - [x] 4.6 Card 4: Locations — MapPin icon, "Find our offices and operational locations.", "View Locations →" → `/contact/locations/`

- [x] Task 5: Create ContactInfoCard.astro and Quick Contact section (AC: #4)
  - [x] 5.1 Create `src/components/contact/ContactInfoCard.astro`
  - [x] 5.2 Props: icon, label, value (string or slot for multi-line)
  - [x] 5.3 Icon: 40px circle, primary-50 bg, primary-600 icon
  - [x] 5.4 Label: text-sm font-semibold text-neutral-900
  - [x] 5.5 Value: text-sm text-neutral-600
  - [x] 5.6 SectionWrapper variant="light" (neutral-50)
  - [x] 5.7 3-column grid: `grid-cols-1 md:grid-cols-3 gap-6`
  - [x] 5.8 Phone: "+234 XXX XXX XXXX" (placeholder)
  - [x] 5.9 Email: "info@global-resources.org"
  - [x] 5.10 Head Office: placeholder address, City, Nigeria

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
| Email | info@global-resources.org |
| Head Office | [Address], [City], Nigeria (placeholder — client to provide) |
| Hours | Mon-Fri, 8am-5pm WAT |

### ContactPage Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Global Resources Citadel",
  "description": "Get in touch with Global Resources Citadel Limited.",
  "url": "https://global-resources.org/contact/",
  "mainEntity": {
    "@type": "Organization",
    "name": "Global Resources Citadel Limited",
    "email": "info@global-resources.org",
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
Claude Opus 4.6 (1M context)

### Debug Log References
- Build verified: 14 pages generated including `/contact/`
- TypeScript check passed with no errors
- Heading hierarchy validated: H1 → H2 ("How Can We Help?") → H3 × 4 pathway cards → H2 ("Quick Contact") — clean, no skipped levels
- JSON-LD verified: BreadcrumbList + ContactPage structured data
- 4 PathwayCards render with inline Lucide SVG icons (Mail, Building2, Handshake, MapPin)
- 3 ContactInfoCards render with inline SVG icons (Phone, Mail, MapPin)

### Completion Notes List
- Created `PathwayCard.astro` — link card with icon slot, heading H3, description, animated arrow link. Full `<a>` wrapper for click target with hover elevation and focus ring.
- Created `ContactInfoCard.astro` — compact info display with icon slot, label, and value (prop or default slot for multi-line content like address).
- Created `contact/index.astro` — routing hub with primary-50 hero (centered, same pattern as divisions hub), 2x2 pathway grid, and quick contact section.
- Icons implemented as inline SVGs passed via named slots — no React dependency, no icon library needed. SVG paths sourced from Lucide icon set.
- Added "How Can We Help?" H2 SectionHeading above pathway grid to maintain heading hierarchy (H1 → H2 → H3).
- Contact info uses placeholder values for phone and address (client to provide).

### File List
- `src/pages/contact/index.astro` — **Created** — contact routing hub page
- `src/components/contact/PathwayCard.astro` — **Created** — inquiry pathway routing card
- `src/components/contact/ContactInfoCard.astro` — **Created** — quick contact info card

### Review Findings

- [x] [Review][Decision] Placeholder phone/address visible to users — RESOLVED: kept as-is per user decision (client will provide before launch). Address polished from bracket-style `[Address Line 1]` to natural placeholder `Victoria Island, Lagos, Nigeria`.
- [x] [Review][Patch] JSON-LD `telephone` field — FIXED: removed from ContactPage structured data until real number available
- [x] [Review][Patch] Phone/email not actionable links — FIXED: added `href` prop to ContactInfoCard, phone uses `tel:`, email uses `mailto:`, with styled link treatment and focus-visible ring
- [x] [Review][Defer] Gold eyebrow `text-gold-600` contrast on `bg-primary-50` may be borderline WCAG AA for small text — systemic pattern shared with divisions hub hero, review in Epic 8 a11y audit
- [x] [Review][Defer] ContactInfoCard grid jumps 1→3 columns at `md` with no `sm` intermediate — minor responsive gap on tablets
- [x] [Review][Defer] Long email address has no `overflow-wrap` protection — not triggered currently but no defensive guard
- [x] [Review][Defer] Hours line uses `text-xs` while siblings inherit `text-sm` from parent — intentional visual hierarchy, not a bug

### Change Log
- 2026-04-02: Story 4.1 implemented — contact hub with 4 pathway cards, quick contact info, ContactPage JSON-LD
- 2026-04-02: Code review — 3 patches applied (JSON-LD telephone removed, tel:/mailto: links added, placeholder address polished), 4 deferred
