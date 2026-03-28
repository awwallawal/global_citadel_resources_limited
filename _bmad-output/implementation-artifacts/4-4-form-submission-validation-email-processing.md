# Story 4.4: Form Submission, Validation & Email Processing

Status: ready-for-dev

## Story

As a **visitor**,
I want my inquiry to be validated, submitted, and confirmed professionally,
So that I know my message was received and will be handled by the right team.

## Acceptance Criteria

1. Client-side Zod validation runs inline on blur for each field, showing error messages below fields with error-600 text and error border, linked via `aria-describedby`
2. Hidden honeypot field (display:none) present — submissions with honeypot filled are silently rejected
3. Submit button shows "Sending..." text and disabled state during submission
4. Form POSTs to `/api/contact` with JSON payload: `inquiryType`, `destinationTeam`, `divisionSlug` (if applicable), `sourcePage`, `submittedAt` (ISO-8601), and all form fields
5. Server endpoint validates all fields with Zod, returns 400 with field-level errors on failure
6. Simple in-memory rate limiting returns 429 if threshold exceeded
7. On success, Resend sends two emails: internal routing notification (to appropriate team/division email from content collections) and user confirmation acknowledging receipt with routing context
8. Form replaced by inline success confirmation: "Your enquiry has been received" with routing context (e.g., "Our Crop Farming team will respond within 2 business days")
9. On server error, form persists with data preserved and error banner above form with retry option

## Tasks / Subtasks

- [ ] Task 1: Create `/api/contact.ts` server endpoint (AC: #4, #5, #6)
  - [ ] 1.1 Create `src/pages/api/contact.ts` with `export const prerender = false` (SSR)
  - [ ] 1.2 Accept POST only, return 405 for other methods
  - [ ] 1.3 Parse JSON body
  - [ ] 1.4 Check honeypot field — silently return 200 (fake success) if filled
  - [ ] 1.5 Server-side Zod validation matching client schemas (general, division, strategic)
  - [ ] 1.6 Return 400 with `{ success: false, errors: { [field]: "message" } }` on validation failure
  - [ ] 1.7 Simple in-memory rate limit: Map of IP → timestamp[], reject if >5 submissions per 15 minutes
  - [ ] 1.8 Return 429 with `{ success: false, message: "Too many requests. Please try again later." }`

- [ ] Task 2: Implement email sending via Resend (AC: #7)
  - [ ] 2.1 Initialize Resend client with `RESEND_API_KEY` env var
  - [ ] 2.2 Determine recipient email: division contact from content collections (`contactEmail`), or `CONTACT_EMAIL_DEFAULT` for general/strategic
  - [ ] 2.3 Send internal notification email: to team, subject "[InquiryType] from [Name]", body with all form fields + source page + timestamp
  - [ ] 2.4 Send user confirmation email: to submitter, subject "We've received your enquiry — Global Resources Citadel", body with routing context ("Your message has been forwarded to our [team/division] team")
  - [ ] 2.5 Return 200 with `{ success: true, message: "Inquiry submitted successfully", routingContext: "..." }`
  - [ ] 2.6 On Resend error: return 500 with `{ success: false, message: "Unable to process your request. Please try again." }`

- [ ] Task 3: Implement `src/lib/email.ts` utilities (AC: #7)
  - [ ] 3.1 Replace placeholder with actual Resend integration
  - [ ] 3.2 `sendInquiryNotification()` — internal routing email
  - [ ] 3.3 `sendConfirmationEmail()` — user confirmation email
  - [ ] 3.4 Email templates: clean HTML with GRCL branding (minimal — text-focused, no heavy images)
  - [ ] 3.5 Error handling: catch Resend errors, log server-side, return generic error to client

- [ ] Task 4: Wire InquiryForm.tsx submission (AC: #3, #4, #8, #9)
  - [ ] 4.1 Add `onSubmit` handler: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })`
  - [ ] 4.2 Build payload with `inquiryType`, `destinationTeam`, `divisionSlug`, `sourcePage`, `submittedAt`, `fields`
  - [ ] 4.3 Loading state: "Sending..." + disabled button + pulse animation
  - [ ] 4.4 On 200 success: replace form with inline confirmation component
  - [ ] 4.5 On 400 validation error: map server errors to field-level error display
  - [ ] 4.6 On 429 rate limit: show rate limit message above form
  - [ ] 4.7 On 500 error: show error banner above form, preserve form data, show retry button
  - [ ] 4.8 `aria-live="polite"` on form-level success/error messages

- [ ] Task 5: Create inline success confirmation (AC: #8)
  - [ ] 5.1 Success component replaces entire form
  - [ ] 5.2 Green check icon + "Your enquiry has been received"
  - [ ] 5.3 Routing context: "Our [team/division] team will respond within [2/3] business days."
  - [ ] 5.4 "Submit another enquiry" link to reset form
  - [ ] 5.5 "Return to Contact" link → `/contact/`

- [ ] Task 6: Enhance client-side validation (AC: #1)
  - [ ] 6.1 Validate on blur (not just on submit)
  - [ ] 6.2 Error display: `text-error-600`, error icon, field border turns `border-error-600`
  - [ ] 6.3 Error message linked via `aria-describedby`
  - [ ] 6.4 Clear error when field is corrected (on change/blur)
  - [ ] 6.5 Submit button disabled until all required fields have values (not necessarily valid — validation on blur)

## Dev Notes

### API Endpoint Architecture

Single POST endpoint handles ALL inquiry types:

```
POST /api/contact
Content-Type: application/json

{
  "inquiryType": "general-corporate" | "division-business" | "strategic-partnership" | "investor-institutional",
  "destinationTeam": "corporate" | "[division-slug]" | "strategic",
  "divisionSlug": "crop-farming" | null,
  "sourcePage": "/contact/general/",
  "submittedAt": "2026-03-28T14:30:00.000Z",
  "honeypot": "",
  "fields": { ... }
}
```

### API Response Format (from Architecture)

```typescript
// Success (200)
{ success: true, message: "Inquiry submitted successfully", routingContext: "Our Crop Farming team will respond within 2 business days." }

// Validation error (400)
{ success: false, errors: { email: "Valid email required", message: "Message is required" } }

// Rate limited (429)
{ success: false, message: "Too many requests. Please try again later." }

// Server error (500)
{ success: false, message: "Unable to process your request. Please try again." }
```

### Server Endpoint Implementation

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { z } from 'zod'; // or 'astro:content' if Zod is re-exported
import { sendInquiryNotification, sendConfirmationEmail } from '@/lib/email';

export const prerender = false; // SSR — runs as Vercel Serverless Function

// In-memory rate limiter
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit check
  if (isRateLimited(clientAddress)) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Too many requests. Please try again later.',
    }), { status: 429, headers: { 'Content-Type': 'application/json' } });
  }

  // Parse body
  const body = await request.json();

  // Honeypot check — silently fake success
  if (body.honeypot) {
    return new Response(JSON.stringify({
      success: true,
      message: 'Inquiry submitted successfully',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // Validate based on inquiryType
  // ... Zod validation per variant ...

  // Send emails via Resend
  // ... sendInquiryNotification + sendConfirmationEmail ...

  // Return success
};
```

### Server-Side Validation Schemas

Must match client-side schemas from Stories 4.2 and 4.3:

```typescript
const baseFieldsSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const generalFieldsSchema = baseFieldsSchema.extend({
  subject: z.string().min(1),
  message: z.string().min(20),
});

const divisionFieldsSchema = baseFieldsSchema.extend({
  company: z.string().optional(),
  enquiryType: z.string().min(1),
  message: z.string().min(20),
});

const strategicFieldsSchema = baseFieldsSchema.extend({
  organization: z.string().min(1),
  titleRole: z.string().min(1),
  inquiryType: z.string().min(1),
  description: z.string().min(20),
});

// Validate the envelope (common fields) first
const contactEnvelopeSchema = z.object({
  inquiryType: z.enum(['general-corporate', 'division-business', 'strategic-partnership', 'investor-institutional']),
  destinationTeam: z.string().min(1),
  divisionSlug: z.string().nullable().optional(),
  sourcePage: z.string().min(1),
  submittedAt: z.string(),
  honeypot: z.string().optional(),
  fields: z.record(z.unknown()), // validated separately below
});

// Then validate fields based on inquiryType discriminator — NOT z.union.
// z.union tries each schema in sequence and returns confusing errors if the
// wrong schema partially matches. Discriminated selection is explicit and reliable.
const fieldsSchemaMap: Record<string, z.ZodObject<any>> = {
  'general-corporate': generalFieldsSchema,
  'division-business': divisionFieldsSchema,
  'strategic-partnership': strategicFieldsSchema,
  'investor-institutional': strategicFieldsSchema,
};

// Usage in endpoint:
// const envelope = contactEnvelopeSchema.parse(body);
// const fieldSchema = fieldsSchemaMap[envelope.inquiryType];
// const validatedFields = fieldSchema.parse(envelope.fields);
```

### Email Routing Logic

```typescript
// Determine recipient email
function getRecipientEmail(inquiryType: string, destinationTeam: string, divisionContactEmails: Record<string, string>): string {
  if (inquiryType === 'division-business' && divisionContactEmails[destinationTeam]) {
    return divisionContactEmails[destinationTeam];
  }
  // General and strategic go to default
  return import.meta.env.CONTACT_EMAIL_DEFAULT;
}
```

Division contact emails come from the content collections — each division has a `contactEmail` field (e.g., `crop-farming@globalresourcescitadel.com`). Load in the endpoint handler:

```typescript
import { getCollection } from 'astro:content';

// Inside the POST handler:
const divisions = await getCollection('divisions');
const divisionEmailMap = Object.fromEntries(
  divisions.map(d => [d.data.slug, d.data.contactEmail])
);
// Then: divisionEmailMap['crop-farming'] → 'crop-farming@globalresourcescitadel.com'
```

### Resend Email Implementation (`src/lib/email.ts`)

```typescript
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendInquiryNotification(params: {
  to: string;
  inquiryType: string;
  fromName: string;
  fromEmail: string;
  fields: Record<string, string>;
  sourcePage: string;
  submittedAt: string;
}) {
  const { data, error } = await resend.emails.send({
    // DEV: Use 'onboarding@resend.dev' until domain is verified in Resend dashboard.
    // PROD: Switch to 'GRCL Website <noreply@globalresourcescitadel.com>' after domain verification.
    from: import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: params.to,
    subject: `[${params.inquiryType}] New enquiry from ${params.fromName}`,
    html: `<!-- Internal notification template -->`,
  });
  if (error) throw error;
  return data;
}

export async function sendConfirmationEmail(params: {
  to: string;
  name: string;
  routingContext: string;
}) {
  const { data, error } = await resend.emails.send({
    from: import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: params.to,
    subject: "We've received your enquiry — Global Resources Citadel",
    html: `<!-- User confirmation template -->`,
  });
  if (error) throw error;
  return data;
}
```

### Email Template Guidelines

- Clean, text-focused HTML — no heavy images (Nigerian mobile bandwidth)
- GRCL brand name in header
- Clear subject lines indicating inquiry type
- Internal notification: includes ALL form fields, source page, timestamp, inquiry type
- User confirmation: acknowledges receipt, states routing (which team), response timeframe
- Email `from` address uses `RESEND_FROM_EMAIL` env var (defaults to `onboarding@resend.dev` for development). Set to `GRCL Website <noreply@globalresourcescitadel.com>` in production after Resend domain verification.

### Inline Success Confirmation

```tsx
function SuccessConfirmation({ routingContext, onReset }: { routingContext: string; onReset: () => void }) {
  return (
    <div className="rounded-xl border border-success-100 bg-success-100/50 p-8 text-center" role="status" aria-live="polite">
      <svg className="mx-auto h-12 w-12 text-success-600" /* ... */>{/* check circle icon */}</svg>
      <h3 className="mt-4 font-heading text-xl font-semibold text-neutral-900">Your enquiry has been received</h3>
      <p className="mt-2 text-neutral-600">{routingContext}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button onClick={onReset} className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          Submit another enquiry
        </button>
        <a href="/contact/" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          Return to Contact
        </a>
      </div>
    </div>
  );
}
```

### Error Banner Pattern

```tsx
{serverError && (
  <div className="mb-6 rounded-lg border border-error-100 bg-error-100/50 p-4" role="alert" aria-live="assertive">
    <p className="text-sm font-medium text-error-600">{serverError}</p>
    <button onClick={handleRetry} className="mt-2 text-sm font-semibold text-error-600 underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-error-600 focus-visible:ring-offset-2">
      Try again
    </button>
  </div>
)}
```

### Routing Context Messages

| Inquiry Type | Response Time | Context Message |
|-------------|---------------|-----------------|
| general-corporate | 2 business days | "We aim to respond within 2 business days." |
| division-business | 2 business days | "Our [Division Name] team will respond within 2 business days." |
| strategic-partnership | 3 business days | "Our strategic team will respond within 3 business days. All enquiries are handled confidentially." |
| investor-institutional | 3 business days | Same as strategic |

### Security Considerations

- **Honeypot:** hidden field, silently reject if filled (return fake 200)
- **Rate limiting:** in-memory Map, 5 requests per 15 minutes per IP. Resets on serverless cold start (acceptable for MVP volume)
- **Server-side validation:** Zod schemas mirror client-side — never trust client input
- **No CAPTCHA:** honeypot + rate limiting sufficient for corporate inquiry volume per architecture decision
- **Never expose internal errors:** generic "Unable to process" message on 500
- **HTTPS enforced:** automatic via Vercel

### Environment Variables Required

| Variable | Purpose | Scope |
|----------|---------|-------|
| `RESEND_API_KEY` | Resend email service | Server-only |
| `CONTACT_EMAIL_DEFAULT` | Default recipient for general/strategic | Server-only |
| `RESEND_FROM_EMAIL` | Sender address (set after domain verification; omit for dev default `onboarding@resend.dev`) | Server-only |

Both defined in `.env.example` (Story 1.1). Must be set in Vercel dashboard for production.

### Previous Story Intelligence

**Story 4.2** creates InquiryForm.tsx with division variant — client-side validation, honeypot, loading state. This story wires up the `onSubmit` handler.

**Story 4.3** extends InquiryForm with general and strategic variants. This story adds submission logic to all variants.

**Story 1.1** creates `.env.example` with `RESEND_API_KEY` and `CONTACT_EMAIL_DEFAULT`.

**Story 1.3** creates division content collections with `contactEmail` field per division.

**Story 1.1** installs `resend` package and creates `src/lib/email.ts` placeholder.

### What This Story Does NOT Include

- No email template styling (basic HTML only for MVP)
- No attachment/file upload handling
- No CRM integration
- No analytics/tracking on form submission
- No CAPTCHA (honeypot + rate limiting per architecture decision)
- No Resend domain verification (use default sender for dev)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/api/contact.ts` — SSR endpoint (`prerender = false`)
- **Modifies:** `src/lib/email.ts` — replaces placeholder with Resend integration
- **Modifies:** `src/components/contact/InquiryForm.tsx` — adds `onSubmit` handler, success/error states

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.4 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — API endpoint, form architecture, Resend integration, rate limiting, security, response format]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Form payloads, routing rules, validation, response timeframes]
- [Source: _bmad-output/implementation-artifacts/4-2-contact-by-division-directory-division-inquiry-forms.md — InquiryForm.tsx, Zod schemas, payload structures]
- [Source: _bmad-output/implementation-artifacts/4-3-general-strategic-inquiry-forms.md — General + strategic schemas and payloads]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Division contactEmail field]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
