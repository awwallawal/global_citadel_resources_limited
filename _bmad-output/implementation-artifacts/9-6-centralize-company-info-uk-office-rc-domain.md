# Story 9-6 — Centralize Company Info, Add UK Office, RC Number, Domain Migration

**Status:** review
**Epic:** 9 — Platform Evolution & Brand Maturation
**Created:** 2026-04-08
**Created by:** John (PM) following CC `cc-2026-04-08-travel-mobility-addition.md`
**Estimated effort:** 1 focused dev day, plus DNS propagation lead time
**Blocked by:** Owner purchases `global-resources.org` domain (external)

---

## Why this story exists

A forensic recon of the codebase (run during the Travel & Mobility CC) surfaced a duplication landmine: GRCL's contact information — phone, email, address, business hours — is hardcoded in **15+ files** across pages, components, server routes, JSON-LD schemas, and environment templates. There is **no single source of truth**.

Today this is annoying. After this story it is dangerous, because:

1. Owner has confirmed an additional **UK office** (Bromley) that needs to appear alongside the Lagos HQ on the contact page, locations page, footer, JSON-LD organisation schema, and About page. Without centralization, every UK detail must be added in 4-6 separate places.
2. Owner has provided **RC No. 1801787** which currently appears **nowhere on the site**. UK trading good practice and Nigerian regulatory norms both expect a registration number visible in the footer and on legal pages. This is a NEW addition, not a correction of existing wrong content.
3. Owner is purchasing `global-resources.org` and migrating away from `global-resources.org`. Without centralization, the domain switch requires editing 8+ email addresses, 7 division contact emails, JSON-LD, env vars, Astro config, sitemap base URL, and Resend sender configuration — done by hand, with no test coverage of the change.

This story consolidates all three changes into a single, well-sequenced piece of work with proper testing and a rollout plan.

---

## Forensic recon — current state of duplication

(extracted from the agent recon run during Story 9-7 / CC 2026-04-08)

### Email duplication: `info@global-resources.org` (8 hardcoded points)
| File | Line | Context |
|---|---|---|
| `src/pages/contact/index.astro` | 42 | JSON-LD `mainEntity.email` |
| `src/pages/contact/index.astro` | 151 | Quick Contact card display |
| `src/components/contact/ContactSidebar.astro` | 42-43 | Contact sidebar (used by all contact form pages) |
| `src/components/layout/Footer.astro` | 79 | Footer "Connect" mailto link |
| `src/lib/email.ts` | 100 | Confirmation email body |
| `src/pages/privacy-policy.astro` | 85 | Privacy policy contact |
| `src/pages/terms.astro` | 68 | Terms of Use contact |
| `src/pages/api/contact.ts` | 80 | Default fallback recipient |
| `.env.example` | 5 | `CONTACT_EMAIL_DEFAULT` template |

### Division contact emails — already centralized (good)
Each division YAML in `src/content/divisions/*.yaml` defines its own `contactEmail`. Routing flows through `src/lib/contact.ts` `getRecipientEmail()`. **No duplication here.** Domain migration requires updating each YAML once.

### Phone number duplication: `+234-811-191-2174` (2 points)
- `src/pages/contact/index.astro:145` — Quick Contact (formatted display + tel: href)
- `src/components/contact/ContactSidebar.astro:31` — Contact sidebar (formatted + href)

### Address duplication: `1st Floor, Gbemisola House, Opp. Omole Phase I, Ogba, Lagos, Nigeria` (3 points)
- `src/pages/contact/index.astro:163-165`
- `src/components/contact/ContactSidebar.astro:55-57`
- `src/pages/contact/locations.astro:66`

### Business hours duplication: `Mon–Fri, 8am–5pm WAT` (3 points, two formats)
- `src/pages/contact/index.astro:166`
- `src/components/contact/ContactSidebar.astro:67`
- `src/pages/contact/locations.astro:67` (uses long format `Monday – Friday, 8:00am – 5:00pm WAT`)

### RC Number — currently absent
Grep returned **zero matches** for any RC number pattern. This story introduces it for the first time.

### Conflicting address in email signature
`src/lib/email.ts:102` says `Victoria Island, Lagos, Nigeria` — different from the Ogba HQ address used everywhere else. Needs reconciliation. Confirm with owner: is Victoria Island a second Lagos office, or stale copy from an earlier draft?

---

## Acceptance criteria

### A. Single source of truth
- [ ] Create `src/lib/company.ts` exporting a typed `COMPANY` constant containing:
  - `legalName`, `tradingName`, `acronym`, `monogram`
  - `rcNumber: '1801787'`
  - `tagline: "Building Africa's Future From Nigeria's Strongest Foundations"`
  - `offices: { nigeria: Office, unitedKingdom: Office }` where `Office` has `label`, `phone` (display + tel formats), `address` (lines + country), `hours`, `coordinates?`
  - `defaultEmail: 'info@global-resources.org'`
  - `noreplyEmail: 'noreply@global-resources.org'`
  - `domain: 'global-resources.org'`
  - `siteUrl: 'https://global-resources.org'`
- [ ] All 15+ duplication points listed above import from `@/lib/company` instead of hardcoding.
- [ ] `pnpm typecheck` passes.
- [ ] Existing tests still pass after refactor.

### B. UK office added everywhere appropriate
- [ ] **Footer** (`src/components/layout/Footer.astro`) — add a UK office line under or beside the Lagos HQ statement.
- [ ] **Contact hub** (`src/pages/contact/index.astro`) — Quick Contact card shows both NG and UK side-by-side or stacked.
- [ ] **Contact sidebar** (`src/components/contact/ContactSidebar.astro`) — both addresses + both phones rendered.
- [ ] **Locations page** (`src/pages/contact/locations.astro`) — UK office gets its own location card alongside Head Office and the operational sites.
- [ ] **About page** (`src/pages/about.astro`) — current "Headquarters: Lagos, Nigeria" line expands to include "UK Office: Bromley, England" or a "Global Presence" mini-section.
- [ ] **JSON-LD Organization schema** (`src/lib/seo.ts:generateOrganizationJsonLd`) — `address` becomes an array of `PostalAddress` entries; type updates to `Organization` with `branch` array if needed for proper schema.org structure.
- [ ] **Sitemap** — auto-regenerates; verify both contact and locations pages still appear.

### C. RC Number 1801787 added
- [ ] **Footer** — small `RC No. 1801787` text in the legal/copyright row, alongside the existing "© 2026 Global Resources Citadel Limited".
- [ ] **About page** — appears in the corporate facts block (somewhere near "Headquarters: Lagos").
- [ ] **Terms of Use** (`src/pages/terms.astro`) — added to the entity-identification opening paragraph.
- [ ] **Privacy Policy** (`src/pages/privacy-policy.astro`) — added to the entity-identification opening paragraph.
- [ ] **JSON-LD Organization schema** — added as `identifier` (schema.org `Organization.identifier`).

### D. Domain migration: `global-resources.org` → `global-resources.org`
**Sequence matters. Do not skip steps.**

1. [ ] **Owner action:** Purchase `global-resources.org` from registrar of choice.
2. [ ] **Vercel — add domain:** Add `global-resources.org` and `www.global-resources.org` to the Vercel project. Vercel issues DNS records.
3. [ ] **DNS — point to Vercel:** Update registrar DNS with the A record + CNAME Vercel provides. Wait for propagation (typically 1-24 hours).
4. [ ] **Vercel — SSL:** Verify Vercel auto-provisions Let's Encrypt SSL for both apex and www. Test `https://global-resources.org` returns the site.
5. [ ] **Resend — verify sender domain:** In Resend dashboard, add `global-resources.org` as a sending domain. Resend issues DKIM, SPF, and DMARC records. Add them to the registrar DNS. Wait for verification (typically minutes once DNS propagates).
6. [ ] **Email mailbox provisioning:** Owner sets up `info@global-resources.org` and `noreply@global-resources.org` mailboxes (Google Workspace, Microsoft 365, Zoho, or similar). DNS MX records added at registrar.
7. [ ] **Test inbound email:** Send a test email to `info@global-resources.org` from an external account, confirm delivery.
8. [ ] **Test outbound email via Resend:** From a Vercel preview deployment with new env vars, submit the contact form. Confirm Resend delivers to the new mailbox AND the user gets the auto-confirmation.
9. [ ] **Update Vercel env vars (production):**
   - `RESEND_FROM_EMAIL=GRCL Website <noreply@global-resources.org>`
   - `CONTACT_EMAIL_DEFAULT=info@global-resources.org`
   - `SITE=https://global-resources.org`
10. [ ] **Update `astro.config.mjs`:** `site: 'https://global-resources.org'`.
11. [ ] **Update division contact emails:** All 7 (now 8) division YAMLs from `*@global-resources.org` → `*@global-resources.org`.
12. [ ] **Update `src/lib/company.ts`** constants to reflect new domain.
13. [ ] **Deploy to production.** Verify all pages still build, sitemap regenerates with new URL, all links point to new domain.
14. [ ] **301 redirect old domain:** Configure Vercel domain `global-resources.org` as a 301 redirect to `global-resources.org` (to preserve any inbound links and email addresses people may have copied).
15. [ ] **Old mailboxes:** Owner sets up forwarding from `info@global-resources.org` to the new mailbox until traffic dies down (suggest 6 months).

### E. Tests
- [ ] Add a unit test that verifies `COMPANY` exports the expected shape and required values.
- [ ] Update existing component tests if any depended on the hardcoded email/phone/address strings.
- [ ] Add an E2E smoke test that visits `/contact/`, `/contact/locations/`, footer, and about page, and asserts both NG and UK contact details render.
- [ ] Re-run Lighthouse on `/`, `/about/`, `/contact/`, `/contact/locations/` — performance targets unchanged.

---

## Open questions for owner before kickoff

1. **Victoria Island vs Ogba** — `src/lib/email.ts:102` says "Victoria Island, Lagos" in the confirmation email signature. Everywhere else says "Ogba, Lagos". Which is correct? Are there two NG offices, or is one stale?
2. **UK office: registered or operational?** Is Office 1249, 12 Farwig Lane, Bromley a registered company address (Companies House) or an operational presence? This affects whether we need a UK Companies House registration number alongside the Nigerian RC.
3. **Email mailbox host** — Google Workspace, Microsoft 365, Zoho, or other? Affects MX record setup in step D.6.
4. **Old domain forwarding** — keep `global-resources.org` registered indefinitely as a 301 redirect, or let it lapse after 12 months?
5. **RC Number display style** — `RC 1801787`, `RC No. 1801787`, `RC: 1801787`, or full `Registration No. 1801787`? PM recommendation: `RC No. 1801787` (matches Nigerian convention).

---

## Implementation order (suggested)

1. **Pre-work (no code):** Owner purchases domain and sets up DNS pointing to Vercel.
2. **Phase 1 — Centralize (safe, no domain dependency):** Create `src/lib/company.ts` with current data (`global-resources.org`). Refactor all 15+ duplication points. Tests pass. Deploy to production. **No user-facing change yet.**
3. **Phase 2 — Add UK office + RC number (still safe):** With the central source of truth in place, add UK office and RC number to all required surfaces. Tests pass. Deploy. **First visible change.**
4. **Phase 3 — Domain migration (the careful one):** Follow the sequence in section D. Test thoroughly on a Vercel preview deployment before flipping production env vars. Deploy. Set up 301 redirect.

This order means Phases 1 and 2 deliver concrete value even if the domain purchase is delayed.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| DKIM verification fails because DNS hasn't propagated | High | Low | Wait, retry. Standard. |
| Old division emails still in use after migration, mail bounces | Medium | Medium | Forward old domain mailboxes for 6 months minimum. |
| 301 redirect from old domain breaks because Vercel can only host one domain per project | Low | Medium | Confirm Vercel multi-domain support before kickoff (it does support this). |
| Owner uses two different mailbox providers and some email rules are inconsistent | Low | Low | Document the chosen provider in this story before Phase 3. |
| RC Number is wrong (typo or stale) | Low | High | Owner explicitly confirmed `1801787` in the 2026-04-08 conversation. Re-verify against Companies House Nigeria (CAC) public register before deploy. |
| Centralization refactor introduces a regression in a contact form recipient | Low | High | Keep the API route's `getRecipientEmail()` logic identical, only swap the source of the default constant. Add an integration test that submits each form variant and verifies routing. |

---

## What this story does NOT do

- It does not redesign the contact page or the locations page layout (only adds the UK details).
- It does not change any contact form fields or routing logic (only the email constants they point at).
- It does not change the leadership team bios, FAQs, or article content (those were updated in Story 9-7 if they referenced "seven divisions").
- It does not migrate inbound social/external links — those are out of scope until the domain is live.

---

**Next action:** Owner purchases `global-resources.org`. Once that's done, this story unblocks and a dev session can begin Phase 1.
