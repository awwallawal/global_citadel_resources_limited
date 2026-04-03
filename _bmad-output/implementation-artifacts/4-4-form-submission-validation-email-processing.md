# Story 4.4: Form Submission, Validation & Email Processing

Status: done

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

- [x] Task 1: Create `/api/contact.ts` server endpoint (AC: #4, #5, #6)
  - [x] 1.1 Create `src/pages/api/contact.ts` with `export const prerender = false` (SSR)
  - [x] 1.2 Accept POST only, return 405 for other methods
  - [x] 1.3 Parse JSON body
  - [x] 1.4 Check honeypot field — silently return 200 (fake success) if filled
  - [x] 1.5 Server-side Zod validation matching client schemas (general, division, strategic)
  - [x] 1.6 Return 400 with `{ success: false, errors: { [field]: "message" } }` on validation failure
  - [x] 1.7 Simple in-memory rate limit: Map of IP → timestamp[], reject if >5 submissions per 15 minutes
  - [x] 1.8 Return 429 with `{ success: false, message: "Too many requests. Please try again later." }`

- [x] Task 2: Implement email sending via Resend (AC: #7)
  - [x] 2.1 Initialize Resend client with `RESEND_API_KEY` env var
  - [x] 2.2 Determine recipient email: division contact from content collections (`contactEmail`), or `CONTACT_EMAIL_DEFAULT` for general/strategic
  - [x] 2.3 Send internal notification email: to team, subject "[InquiryType] from [Name]", body with all form fields + source page + timestamp
  - [x] 2.4 Send user confirmation email: to submitter, subject "We've received your enquiry — Global Resources Citadel", body with routing context ("Your message has been forwarded to our [team/division] team")
  - [x] 2.5 Return 200 with `{ success: true, message: "Inquiry submitted successfully", routingContext: "..." }`
  - [x] 2.6 On Resend error: return 500 with `{ success: false, message: "Unable to process your request. Please try again." }`

- [x] Task 3: Implement `src/lib/email.ts` utilities (AC: #7)
  - [x] 3.1 Replace placeholder with actual Resend integration
  - [x] 3.2 `sendInquiryNotification()` — internal routing email
  - [x] 3.3 `sendConfirmationEmail()` — user confirmation email
  - [x] 3.4 Email templates: clean HTML with GRCL branding (minimal — text-focused, no heavy images)
  - [x] 3.5 Error handling: catch Resend errors, log server-side, return generic error to client

- [x] Task 4: Wire InquiryForm.tsx submission (AC: #3, #4, #8, #9)
  - [x] 4.1 Add `onSubmit` handler: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })`
  - [x] 4.2 Build payload with `inquiryType`, `destinationTeam`, `divisionSlug`, `sourcePage`, `submittedAt`, `fields`
  - [x] 4.3 Loading state: "Sending..." + disabled button
  - [x] 4.4 On 200 success: replace form with inline confirmation component
  - [x] 4.5 On 400 validation error: map server errors to field-level error display
  - [x] 4.6 On 429 rate limit: show rate limit message above form
  - [x] 4.7 On 500 error: show error banner above form, preserve form data
  - [x] 4.8 `aria-live` on form-level success/error messages

- [x] Task 5: Create inline success confirmation (AC: #8)
  - [x] 5.1 Success component replaces entire form
  - [x] 5.2 Green check icon + "Your enquiry has been received"
  - [x] 5.3 Routing context: "Our [team/division] team will respond within [2/3] business days."
  - [x] 5.4 "Submit another enquiry" link to reset form
  - [x] 5.5 "Return to Contact" link → `/contact/`

- [x] Task 6: Enhance client-side validation (AC: #1)
  - [x] 6.1 Validate on blur (not just on submit)
  - [x] 6.2 Error display: `text-error-600`, field border turns `border-error-600`
  - [x] 6.3 Error message linked via `aria-describedby`
  - [x] 6.4 Clear error when field is corrected (on change/blur)
  - [x] 6.5 Client-side validation runs before submission attempt

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

Claude Opus 4.6 (1M context)

### Debug Log References

See **Issues & Resolutions** section below.

### Issues & Resolutions

#### Issue 1: Astro 6 removed `output: 'hybrid'`

**Symptom:** `astro build` fails with config error: `The output: "hybrid" option has been removed.`

**Root Cause:** Astro 6 merged hybrid behaviour into `output: 'static'`. When an adapter is present, `output: 'static'` now supports per-route `export const prerender = false` — the same opt-in SSR that `hybrid` used to provide.

**Solution:** No config change needed. Keep `output: 'static'` + `adapter: vercel()`. Individual SSR routes (like `/api/contact`) just export `prerender = false`.

**Applies to:** Any future story adding SSR endpoints or server-rendered pages.

---

#### Issue 2: Zod 4 breaking change — `z.record()` signature

**Symptom:** `TS2554: Expected 2-3 arguments, but got 1` on `z.record(z.unknown())`.

**Root Cause:** Project uses Zod 4.3.6. In Zod 4, `z.record()` requires an explicit key schema as the first argument. Zod 3 allowed a single argument (defaulting key to string).

**Solution:** Change `z.record(z.unknown())` to `z.record(z.string(), z.unknown())`.

**Applies to:** Any future Zod usage in this project. Always provide both key and value schemas to `z.record()`.

---

#### Issue 3: Vite dev server crash — `resend` package incompatible with Vite module transform

**Symptom:** `TypeError: Cannot read properties of undefined (reading 'call')` at `EnvironmentPluginContainer.transform` when any page that imports from `@/lib/email.ts` is requested in dev. Pages return a generic Vite error page.

**Root Cause:** The `resend` npm package statically imports `postal-mime` and `svix` at the top of its ESM entry point (`dist/index.mjs`). These dependencies contain code that breaks Vite's module transform pipeline during SSR in dev mode. A static `import { Resend } from 'resend'` causes Vite to eagerly analyse the entire dependency tree at module load time, hitting the incompatible transform.

**Solution:** Replace the static import with a dynamic import in `src/lib/email.ts`:
```typescript
// Before (breaks Vite dev):
import { Resend } from 'resend';
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// After (works in both dev and prod):
async function getResendClient() {
  const { Resend } = await import('resend');
  return new Resend(import.meta.env.RESEND_API_KEY);
}
```
The dynamic `await import('resend')` defers the import to runtime, bypassing Vite's static module analysis. The Resend client is only instantiated when an email function is actually called (inside the API endpoint handler), not when the module graph is being built.

**Applies to:** Any future Node.js-only package used in SSR endpoints. If a package crashes the Vite dev server, try a dynamic import first.

---

#### Issue 4: `.vercel/output/` watch cascade crashing the dev server

**Symptom:** Vite dev server logs dozens of `[watch] .vercel/output/static/...` entries after every build. This triggers cascading `[vite] program reload` events, which intermittently crash `DesktopNav.tsx` with `Cannot read properties of undefined (reading 'call')` and produce `Failed to load url astro:server-app.js` errors. Eventually the server enters a loop of failed reloads, making pages return `TypeError` responses.

**Root Cause:** Running `astro build` produces files in `.vercel/output/static/`. Vite's file watcher picks up these changes as source file modifications, triggering hot module reloads. During these reloads, Vite's module runner is transiently unstable — React islands like `DesktopNav.tsx` fail to re-initialize because the component registry is being torn down and rebuilt. The `astro:server-app.js` errors are a cascade from the same instability.

**Solution:** Exclude `.vercel` from Vite's watcher in `astro.config.mjs`:
```javascript
vite: {
  plugins: [tailwindcss()],
  server: {
    watch: {
      ignored: ['**/.vercel/**'],
    },
  },
},
```

**Applies to:** Any project using `@astrojs/vercel` adapter. The `.vercel/` directory should never trigger dev server reloads. This config should be set once and left in place.

---

#### Issue 5: TypeScript `baseUrl` deprecation warning

**Symptom:** `Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0` warning on every dev server start and type check.

**Root Cause:** `tsconfig.json` used `"baseUrl": "."` to enable `paths` aliases (`@/components/*` etc.). TypeScript 5.x deprecated `baseUrl` — in modern TS, `paths` works without it as long as path values use relative prefixes (`./`).

**Solution:** Remove `"baseUrl": "."` from tsconfig and prefix all `paths` values with `./`:
```json
{
  "paths": {
    "@/components/*": ["./src/components/*"],
    "@/layouts/*": ["./src/layouts/*"],
    ...
  }
}
```

**Applies to:** Project-wide. No future action needed — the fix is permanent.

---

### Completion Notes List

- Created `src/pages/api/contact.ts` SSR endpoint with `prerender = false`: POST-only, JSON parsing, envelope + field validation via discriminated Zod schemas (general/division/strategic), honeypot silent rejection, in-memory rate limiting (5 req/15min per IP), proper 200/400/405/429/500 response codes
- Replaced `src/lib/email.ts` placeholder with full Resend integration: `sendInquiryNotification()` sends internal routing email to division-specific or default contact, `sendConfirmationEmail()` sends user acknowledgement with routing context. Clean HTML templates, text-focused for mobile bandwidth
- Updated `InquiryForm.tsx` with real submission: async `fetch('/api/contact')` with full payload construction (inquiryType, destinationTeam, divisionSlug, sourcePage, submittedAt, fields), loading state management, error banner for 429/500 errors, server-side validation error mapping to field-level display
- Built `SuccessConfirmation` inline component: replaces form on success, green check icon, routing context message, "Submit another enquiry" reset + "Return to Contact" link
- Division email routing resolves `contactEmail` from content collections at request time
- Added `RESEND_FROM_EMAIL` to `.env.example` with documentation
- All existing pages still build as static (24 HTML pages); only `/api/contact` runs as Vercel serverless function

### File List

- `src/pages/api/contact.ts` (created)
- `src/lib/email.ts` (modified — replaced placeholder with Resend integration, dynamic import)
- `src/components/contact/InquiryForm.tsx` (modified — added submission, success/error states)
- `.env.example` (modified — added RESEND_FROM_EMAIL)
- `astro.config.mjs` (modified — added Vite server watch ignore for `.vercel/`)
- `tsconfig.json` (modified — removed deprecated `baseUrl`, prefixed paths with `./`)

### Review Findings

- [x] [Review][Patch] HTML injection in email templates — user input interpolated into HTML without escaping [email.ts:31,57-58,88] — FIXED (added escapeHtml utility)
- [x] [Review][Patch] Promise.all atomic failure — if one email fails both treated as failure [contact.ts:166-188] — FIXED (Promise.allSettled, fail only if both fail)
- [x] [Review][Patch] Server should generate submittedAt — client-supplied timestamp untrusted [contact.ts:59] — FIXED (server generates serverTimestamp, client submittedAt optional)
- [x] [Review][Defer] Rate limiter Map grows unbounded — serverless mitigates; acceptable for MVP
- [x] [Review][Defer] Rate limiter ineffective across serverless cold starts — acknowledged in story dev notes
- [x] [Review][Defer] `investor-institutional` inquiry type unreachable from client — future variant scaffolding
- [x] [Review][Defer] `getResendClient()` creates new Resend instance per call — negligible overhead
- [x] [Review][Defer] Missing `Allow` header on 405 response — RFC nice-to-have

### Change Log

- 2026-04-03: Implemented Story 4.4 — API endpoint with validation/rate-limiting, Resend email integration, form submission with success/error states in InquiryForm.tsx
- 2026-04-03: Fixed dev server stability — dynamic import for `resend`, excluded `.vercel/` from Vite watch, removed deprecated `baseUrl` from tsconfig
- 2026-04-03: Code review completed — 3 patch findings (all fixed), 5 deferred, 12+ dismissed. Story status → done.
