# Story 4.3: General & Strategic Inquiry Forms

Status: ready-for-dev

## Story

As a **visitor**,
I want general and strategic contact forms tailored to my intent,
So that I can submit enquiries with appropriate context for the team receiving them.

## Acceptance Criteria

1. `/contact/general/` displays a general enquiry form with: Full Name (required), Email (required), Phone (optional), Subject (required), Message (required, min 20 chars)
2. General form sidebar shows contact information: phone, email, address, hours (Mon-Fri 8am-5pm WAT)
3. General reassurance: "We aim to respond within 2 business days."
4. `/contact/strategic/` displays a strategic inquiry form with: Full Name (required), Email (required), Organization (required), Title/Role (required), Phone (optional), Inquiry Type dropdown (Strategic Partnership, Investment Discussion, Institutional Enquiry, Other), Brief Description (required)
5. Strategic sidebar shows "What to expect: Confidential initial review, Response within 3 business days, Direct engagement with strategic team" and link to Investors & Partners
6. Strategic reassurance: "All strategic enquiries are handled confidentially and reviewed by our leadership team."
7. Breadcrumbs render correctly for both pages

## Tasks / Subtasks

- [ ] Task 1: Create `/contact/general.astro` (AC: #1, #2, #3, #7)
  - [ ] 1.1 PageLayout with SEO: title "General Enquiries — Contact Global Resources Citadel"
  - [ ] 1.2 BreadcrumbNav: Home > Contact > General Enquiries
  - [ ] 1.3 Heading: "General Enquiries"
  - [ ] 1.4 Body: "Send us a general message about Global Resources Citadel."
  - [ ] 1.5 2-column layout: `grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12` — form `lg:col-span-2` (left), sidebar `lg:col-span-1` (right). Same pattern as Story 4.2. Avoids arbitrary `grid-cols-[2fr_1fr]` per CLAUDE.md.
  - [ ] 1.6 InquiryForm with `variant="general"` (`client:visible`)
  - [ ] 1.7 Sidebar: phone, email, address, hours
  - [ ] 1.8 Reassurance copy below form

- [ ] Task 2: Extend InquiryForm.tsx — general variant (AC: #1)
  - [ ] 2.1 Add `variant="general"` to InquiryForm.tsx (from Story 4.2)
  - [ ] 2.2 General fields: Full Name*, Email*, Phone, Subject*, Message*
  - [ ] 2.3 No Enquiry Type dropdown (general uses Subject text input instead)
  - [ ] 2.4 No Company field
  - [ ] 2.5 Same validation, honeypot, and UI patterns as division variant

- [ ] Task 3: Create `/contact/strategic.astro` (AC: #4, #5, #6, #7)
  - [ ] 3.1 PageLayout with SEO: title "Partner & Investor Contact — Global Resources Citadel"
  - [ ] 3.2 BreadcrumbNav: Home > Contact > Partner & Investor
  - [ ] 3.3 Heading: "Partner & Investor Contact"
  - [ ] 3.4 Body: "For strategic partnerships, investment discussions, or institutional engagement with Global Resources Citadel."
  - [ ] 3.5 2-column layout: `grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12` — form `lg:col-span-2`, sidebar `lg:col-span-1`. Same grid pattern as general form (Task 1.5) and Story 4.2.
  - [ ] 3.6 InquiryForm with `variant="strategic"` (`client:visible`)
  - [ ] 3.7 Sidebar: "What to expect" checklist + "Back to Investors & Partners →" link to `/investors-partners/`
  - [ ] 3.8 Reassurance copy below form

- [ ] Task 4: Extend InquiryForm.tsx — strategic variant (AC: #4)
  - [ ] 4.1 Add `variant="strategic"` to InquiryForm.tsx
  - [ ] 4.2 Strategic fields: Full Name*, Email*, Organization*, Title/Role*, Phone, Inquiry Type dropdown*, Brief Description*
  - [ ] 4.3 Inquiry Type options: "Strategic Partnership", "Investment Discussion", "Institutional Enquiry", "Other"
  - [ ] 4.4 Same validation, honeypot, and UI patterns
  - [ ] 4.5 Form still does NOT submit — submission is Story 4.4

- [ ] Task 5: Create shared sidebar components (AC: #2, #5)
  - [ ] 5.1 Create `src/components/contact/ContactSidebar.astro` — reusable sidebar wrapper
  - [ ] 5.2 General sidebar content: icon + label + value for phone, email, address, hours
  - [ ] 5.3 Strategic sidebar content: "What to expect" as checklist with check icons

## Dev Notes

### General Enquiry Page Structure

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact > General Enquiries
  ├── Heading: "General Enquiries"
  ├── Body text
  ├── 2-column layout
  │   ├── Left: InquiryForm variant="general" (client:visible)
  │   │   ├── Full Name *
  │   │   ├── Email *
  │   │   ├── Phone
  │   │   ├── Subject *
  │   │   ├── Message *
  │   │   ├── Honeypot (hidden)
  │   │   └── [Submit Enquiry]
  │   └── Right: Contact Info Sidebar
  │       ├── Phone: +234 XXX XXX XXXX
  │       ├── Email: info@globalresourcescitadel.com
  │       ├── Address: [Head office]
  │       └── Hours: Mon-Fri, 8am-5pm WAT
  └── Reassurance: "We aim to respond within 2 business days."
```

### Strategic Inquiry Page Structure

```
PageLayout (SEO)
  ├── BreadcrumbNav: Home > Contact > Partner & Investor
  ├── Heading: "Partner & Investor Contact"
  ├── Body text
  ├── 2-column layout
  │   ├── Left: InquiryForm variant="strategic" (client:visible)
  │   │   ├── Full Name *
  │   │   ├── Email *
  │   │   ├── Organization *
  │   │   ├── Title / Role *
  │   │   ├── Phone
  │   │   ├── Inquiry Type (dropdown) *
  │   │   ├── Brief Description *
  │   │   ├── Honeypot (hidden)
  │   │   └── [Submit Inquiry]
  │   └── Right: "What to expect" Sidebar
  │       ├── ✓ Confidential initial review
  │       ├── ✓ Response within 3 business days
  │       ├── ✓ Direct engagement with strategic team
  │       └── "Back to Investors & Partners →"
  └── Reassurance: "All strategic enquiries are handled confidentially..."
```

### InquiryForm Variant Field Map

The InquiryForm.tsx component (created in Story 4.2) renders different fields based on `variant`:

| Field | General | Division | Strategic |
|-------|---------|----------|-----------|
| Full Name * | ✅ | ✅ | ✅ |
| Email * | ✅ | ✅ | ✅ |
| Phone | ✅ | ✅ | ✅ |
| Subject * | ✅ | — | — |
| Company/Organization | — | optional | **required** |
| Title/Role * | — | — | ✅ |
| Enquiry Type dropdown * | — | ✅ | ✅ |
| Message / Brief Description * | ✅ | ✅ | ✅ |
| Honeypot (hidden) | ✅ | ✅ | ✅ |

### Variant-Specific Zod Schemas

```typescript
const generalFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const strategicFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().min(1, 'Please enter your organization'),
  titleRole: z.string().min(1, 'Please enter your title or role'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});
```

### Strategic Inquiry Type Options

```typescript
const strategicInquiryTypes = [
  { value: '', label: 'Select inquiry type...' },
  { value: 'strategic-partnership', label: 'Strategic Partnership' },
  { value: 'investment-discussion', label: 'Investment Discussion' },
  { value: 'institutional-enquiry', label: 'Institutional Enquiry' },
  { value: 'other', label: 'Other' },
];
```

### Form Payload Structures (for Story 4.4)

**General form payload:**
```json
{
  "inquiryType": "general-corporate",
  "destinationTeam": "corporate",
  "sourcePage": "/contact/general/",
  "submittedAt": "ISO-8601",
  "fields": {
    "fullName": "...",
    "email": "...",
    "phone": "...",
    "subject": "...",
    "message": "..."
  }
}
```

**Strategic form payload:**
```json
{
  "inquiryType": "strategic-partnership",
  "destinationTeam": "strategic",
  "sourcePage": "/contact/strategic/",
  "submittedAt": "ISO-8601",
  "fields": {
    "fullName": "...",
    "email": "...",
    "organization": "...",
    "titleRole": "...",
    "phone": "...",
    "inquiryType": "strategic-partnership",
    "description": "..."
  }
}
```

### "What to Expect" Sidebar Pattern

```astro
<div class="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
  <h3 class="mb-4 font-heading text-base font-semibold text-neutral-900">What to expect</h3>
  <ul class="space-y-3">
    <li class="flex items-start gap-3 text-sm text-neutral-600">
      <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" ...><!-- check icon --></svg>
      Confidential initial review
    </li>
    <li class="flex items-start gap-3 text-sm text-neutral-600">
      <svg ...><!-- check icon --></svg>
      Response within 3 business days
    </li>
    <li class="flex items-start gap-3 text-sm text-neutral-600">
      <svg ...><!-- check icon --></svg>
      Direct engagement with strategic team
    </li>
  </ul>
  <a href="/investors-partners/" class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
    Back to Investors & Partners
    <span>→</span>
  </a>
</div>
```

### Investors & Partners Page Link

The strategic form sidebar links back to `/investors-partners/` (built in Epic 5). This is a soft forward dependency — will 404 until Epic 5 is complete.

### Previous Story Intelligence

**Story 4.2** creates InquiryForm.tsx with the division variant and the core form infrastructure (validation, honeypot, error display, loading state). This story extends it with general and strategic variants.

**Story 4.1** creates the Contact Hub with PathwayCards linking to `/contact/general/` and `/contact/strategic/`. Those links now resolve.

**Story 1.4** provides SectionWrapper, SectionHeading, Button components.

**Story 1.8** provides BreadcrumbNav.

### What This Story Does NOT Include

- No form submission to `/api/contact` (Story 4.4)
- No email sending (Story 4.4)
- No success/error states (Story 4.4)
- No Investors & Partners page (Epic 5)
- No Locations page (Story 4.5)
- Forms render and validate client-side only

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/contact/general.astro`
- **Creates:** `src/pages/contact/strategic.astro`
- **Creates:** `src/components/contact/ContactSidebar.astro`
- **Modifies:** `src/components/contact/InquiryForm.tsx` — adds general and strategic variants

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P23 General Enquiries wireframe + form fields, P26 Strategic/Partner wireframe + form fields, form payloads]
- [Source: _bmad-output/planning-artifacts/architecture.md — Form architecture, Zod validation, InquiryForm island]
- [Source: _bmad-output/implementation-artifacts/4-2-contact-by-division-directory-division-inquiry-forms.md — InquiryForm.tsx base, variant prop pattern]
- [Source: _bmad-output/implementation-artifacts/4-1-contact-hub-inquiry-routing.md — Contact routing hub links]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
