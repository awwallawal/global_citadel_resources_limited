# Story 4.2: Contact by Division Directory & Division Inquiry Forms

Status: ready-for-dev

## Story

As a **prospective customer**,
I want to reach the specific division team I need with pre-contextualized inquiry forms,
So that my enquiry is routed to the right people without explaining which division I want.

## Acceptance Criteria

1. `/contact/divisions/` displays heading "Contact by Division" with body text, followed by a grid of 7 DivisionContactCards (icon + division name + "Contact" link) linking to `/contact/divisions/[slug]/`
2. `/contact/divisions/[slug]/` renders a division-specific inquiry form with the division name prominently in heading ("[Division Name] Enquiry")
3. Form fields: Full Name (required), Email (required), Company/Organization (optional), Phone (optional), Enquiry Type dropdown (Product/Service Inquiry, Business Opportunity, General Question), Message (required, min 20 chars)
4. Sidebar shows brief 2-3 line division overview and "Explore [Division]" link back to division page
5. Reassurance copy: "Your enquiry will be routed to our [Division Name] team. We aim to respond within 2 business days."
6. All 7 division inquiry pages render correctly using `getStaticPaths`
7. Breadcrumbs: Home > Contact > Contact by Division > [Division Name]

## Tasks / Subtasks

- [ ] Task 1: Create division contact directory `/contact/divisions/index.astro` (AC: #1)
  - [ ] 1.1 PageLayout with SEO: title "Contact by Division — Global Resources Citadel"
  - [ ] 1.2 BreadcrumbNav: Home > Contact > Contact by Division
  - [ ] 1.3 Heading: "Contact by Division"
  - [ ] 1.4 Body text: "Reach the team in the division relevant to you. Select a division below."
  - [ ] 1.5 Grid of 7 DivisionContactCards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - [ ] 1.6 Fetch divisions from content collections

- [ ] Task 2: Create DivisionContactCard.astro (AC: #1)
  - [ ] 2.1 Create `src/components/contact/DivisionContactCard.astro`
  - [ ] 2.2 Props: division name, slug, clusterSlug (for accent colour)
  - [ ] 2.3 Icon circle with cluster-accent colour (amber/copper/slate)
  - [ ] 2.4 Division name (H3)
  - [ ] 2.5 "Contact →" arrow link
  - [ ] 2.6 Card links to `/contact/divisions/[slug]/`
  - [ ] 2.7 Hover: border-color shift + shadow-md
  - [ ] 2.8 Focus-visible ring

- [ ] Task 3: Create `/contact/divisions/[division].astro` with `getStaticPaths` (AC: #2, #6, #7)
  - [ ] 3.1 `getStaticPaths()` generates 7 paths from divisions collection
  - [ ] 3.2 Fetch division data + parent cluster per path
  - [ ] 3.3 SEO: "[Division Name] Enquiry — Contact Global Resources Citadel"
  - [ ] 3.4 BreadcrumbNav: Home > Contact > Contact by Division > [Division Name]
  - [ ] 3.5 Breadcrumb JSON-LD

- [ ] Task 4: Build division inquiry form page layout (AC: #2, #3, #4, #5)
  - [ ] 4.1 Page heading: "[Division Name] Enquiry"
  - [ ] 4.2 Body: "Get in touch with our [Division Name] team."
  - [ ] 4.3 2-column layout: `grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12` — form `lg:col-span-2` (left), sidebar `lg:col-span-1` (right). Stacked on mobile. Avoids arbitrary `grid-cols-[2fr_1fr]` per CLAUDE.md.
  - [ ] 4.4 Sidebar: brief division overview (from `division.data.tagline`), "Explore [Division] →" link to `/divisions/[slug]/`
  - [ ] 4.5 Reassurance copy below form: "Your enquiry will be routed to our [Division Name] team. We aim to respond within 2 business days."

- [ ] Task 5: Create InquiryForm.tsx React island — division variant (AC: #3)
  - [ ] 5.1 Create `src/components/contact/InquiryForm.tsx` with `client:visible`
  - [ ] 5.2 Props: variant ("division"), divisionSlug, divisionName, fields config
  - [ ] 5.3 Form fields: Full Name*, Email*, Company/Organization, Phone, Enquiry Type dropdown*, Message*
  - [ ] 5.4 Enquiry Type options: "Product/Service Inquiry", "Business Opportunity", "General Question"
  - [ ] 5.5 Client-side validation: required fields, email format, message min 20 chars
  - [ ] 5.6 Inline error display: error-600 text below field, error border, `aria-describedby`
  - [ ] 5.7 Hidden honeypot field (`display:none`)
  - [ ] 5.8 Submit button: "Submit Enquiry" with loading state ("Sending...")
  - [ ] 5.9 Form does NOT submit yet — submission logic is Story 4.4. Button shows disabled/loading UI but POSTs nowhere until 4.4.
  - [ ] 5.10 All inputs: 44px min touch targets, focus-visible rings, `aria-required` on required fields

- [ ] Task 6: Verify all 7 division contact pages (AC: #6)
  - [ ] 6.1 Verify `npm run build` generates all 7 pages
  - [ ] 6.2 Spot-check 2-3 pages for correct division name, sidebar, breadcrumbs

## Dev Notes

### Page Structure — Division Contact Directory

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact > Contact by Division
  ├── Section 1: Heading + body text
  └── Section 2: DivisionContactCard grid (7 cards)
      ├── Crop Farming → /contact/divisions/crop-farming/
      ├── Animal Husbandry → /contact/divisions/animal-husbandry/
      ├── Agro-Processing → /contact/divisions/agro-processing/
      ├── Commodity Marketing → /contact/divisions/commodity-marketing/
      ├── Import & Export → /contact/divisions/import-export/
      ├── Real Estate → /contact/divisions/real-estate/
      └── Oil & Gas → /contact/divisions/oil-gas/
```

### Page Structure — Division Inquiry Form

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact > Contact by Division > [Division Name]
  ├── Heading: "[Division Name] Enquiry"
  ├── Body text
  ├── 2-column layout (grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12)
  │   ├── Left (lg:col-span-2): InquiryForm (React island, client:visible)
  │   │   ├── Full Name *
  │   │   ├── Email *
  │   │   ├── Company/Organization
  │   │   ├── Phone
  │   │   ├── Enquiry Type (dropdown) *
  │   │   ├── Message *
  │   │   ├── Honeypot (hidden)
  │   │   └── [Submit Enquiry]
  │   └── Right (lg:col-span-1): Sidebar
  │       ├── "About [Division Name]:"
  │       ├── Division tagline (2-3 lines)
  │       └── "Explore [Division] →" link
  └── Reassurance copy
```

### InquiryForm.tsx — React Island Architecture

InquiryForm is a **React island** with `client:visible` hydration. It handles:
- Form state management (`useState`)
- Client-side validation on blur
- Error display with `aria-describedby`
- Submit button loading state
- Honeypot field

**NOT in this story:** actual form submission (`fetch` to `/api/contact`), server-side processing, email sending — all Story 4.4.

```astro
<!-- In division contact page -->
<InquiryForm
  client:visible
  variant="division"
  divisionSlug={division.slug}
  divisionName={division.name}
/>
```

### InquiryForm Props Interface

```typescript
interface InquiryFormProps {
  variant: 'general' | 'division' | 'strategic';
  divisionSlug?: string;
  divisionName?: string;
}
```

The same InquiryForm component will be reused across Stories 4.2 (division), 4.3 (general + strategic), and 4.4 (submission logic). Design it with the `variant` prop from the start.

### Division Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | text input | Yes | min 2 chars |
| Email | email input | Yes | valid email format |
| Company/Organization | text input | No | — |
| Phone | tel input | No | valid phone if provided |
| Enquiry Type | select dropdown | Yes | must select option |
| Message | textarea | Yes | min 20 chars |
| Honeypot | text input (hidden) | No | must be empty |

### Enquiry Type Dropdown Options (Division Variant)

```typescript
const divisionEnquiryTypes = [
  { value: '', label: 'Select enquiry type...' },
  { value: 'product-service', label: 'Product/Service Inquiry' },
  { value: 'business-opportunity', label: 'Business Opportunity' },
  { value: 'general-question', label: 'General Question' },
];
```

### Form Payload Structure (for Story 4.4)

When submission is implemented in Story 4.4, the form will POST:

```json
{
  "inquiryType": "division-business",
  "destinationTeam": "crop-farming",
  "divisionSlug": "crop-farming",
  "sourcePage": "/contact/divisions/crop-farming/",
  "submittedAt": "2026-03-28T14:30:00.000Z",
  "fields": {
    "fullName": "...",
    "email": "...",
    "company": "...",
    "phone": "...",
    "enquiryType": "product-service",
    "message": "..."
  }
}
```

**Do not implement the POST — just structure the form data so it's ready for Story 4.4.**

### Validation Patterns

```typescript
// Client-side Zod schema for division form
const divisionFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
```

Validate on blur for each field. Show error below field immediately. Clear error when field is corrected.

### getStaticPaths for Division Contact Pages

```astro
---
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const divisions = await getCollection('divisions');

  return Promise.all(divisions.map(async (division) => {
    const cluster = await getEntry('clusters', division.data.clusterSlug);
    return {
      params: { division: division.data.slug },
      props: {
        division: division.data,
        cluster: cluster!.data,
      },
    };
  }));
}

const { division, cluster } = Astro.props;
---
```

### Cluster Accent Colours (Reused)

| Cluster | Icon BG | Icon Colour |
|---------|---------|-------------|
| Agriculture & Processing | amber-100 | amber-600 |
| Trade & Markets | copper-100 | copper-600 |
| Built Environment & Energy | slate-100 | slate-600 |

### Accessibility Checklist

- [ ] All form inputs have associated `<label>` elements via `htmlFor`/`id`
- [ ] Required fields marked with `aria-required="true"` and visual asterisk
- [ ] Error messages linked to fields via `aria-describedby`
- [ ] Honeypot field has `tabindex="-1"` and `aria-hidden="true"`
- [ ] All inputs: min 44px touch target
- [ ] Focus-visible rings on all interactive elements
- [ ] Submit button: disabled state with `aria-disabled` during loading
- [ ] Form wrapped in `<form>` element with `novalidate` (custom validation)

### Previous Story Intelligence

**Story 4.1** creates the Contact Hub with PathwayCard linking to `/contact/divisions/`. This story builds the destination.

**Story 3.3** creates division detail pages with Section 5 CTA linking to `/contact/divisions/[slug]/`. Those links now resolve to real pages.

**Story 1.3** provides division content collections with `name`, `slug`, `clusterSlug`, `tagline`, `contactEmail`.

**Story 1.4** provides SectionWrapper, SectionHeading, Button components.

### What This Story Does NOT Include

- No form submission to `/api/contact` (Story 4.4)
- No email sending via Resend (Story 4.4)
- No server-side validation (Story 4.4)
- No success/error confirmation states (Story 4.4)
- No general or strategic inquiry forms (Story 4.3)
- Form renders and validates client-side only — submit button is present but non-functional until 4.4

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/contact/divisions/index.astro` — division contact directory
- **Creates:** `src/pages/contact/divisions/[division].astro` — 7 dynamic division form pages
- **Creates:** `src/components/contact/DivisionContactCard.astro`
- **Creates:** `src/components/contact/InquiryForm.tsx` — React island (division variant first, extended in 4.3)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P24 Contact by Division directory, P25 Division Contact form wireframe, form payload, routing rules]
- [Source: _bmad-output/planning-artifacts/architecture.md — InquiryForm island, client:visible, form architecture, Zod validation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — InquiryForm component spec, form field layout, validation patterns, accessibility]
- [Source: _bmad-output/implementation-artifacts/4-1-contact-hub-inquiry-routing.md — Contact routing architecture]
- [Source: _bmad-output/implementation-artifacts/3-3-division-detail-pages-layout-content-structure.md — Division detail Section 5 CTA links here]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
