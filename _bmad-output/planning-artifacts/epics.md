---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/information-architecture.md
  - _bmad-output/planning-artifacts/brand-identity.md
---

# UK_Web_Design - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for UK_Web_Design, decomposing the requirements from the PRD, UX Design, Information Architecture, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Visitors can understand the company's overall identity, positioning, and business scope from the platform.
- FR2: Visitors can access a corporate overview that explains the company's mission, structure, and multi-division nature.
- FR3: Visitors can view a structured presentation of all business divisions from a single unified platform.
- FR4: Visitors can access a dedicated page or section for each business division.
- FR5: Visitors can understand how divisions relate to the broader company.
- FR6: Visitors can access supporting company information that reinforces legitimacy and professionalism.
- FR7: The platform can present future company credentials, certifications, licenses, and proof points where available.
- FR8: Visitors can navigate the platform without confusion across company-level and division-level content.
- FR9: Visitors can move from the homepage to relevant division content through clear navigation paths.
- FR10: Visitors can identify the appropriate business division for their needs.
- FR11: Visitors can access both company-wide and division-specific content streams.
- FR12: Visitors can discover recent news, updates, and thought leadership content from the platform.
- FR13: Visitors can distinguish between general company publishing and division-specific publishing.
- FR14: Visitors can move between related pages and content through internal linking pathways.
- FR15: Visitors can search the platform for relevant company, division, and publishing content.
- FR16: Visitors can use search results to navigate directly to relevant pages or content items.
- FR17: Visitors can orient themselves through narrative or audience-aware entry paths where appropriate.
- FR18: Investor or partner visitors can assess the company's credibility, seriousness, and commercial relevance from the platform.
- FR19: Investor or partner visitors can access information relevant to strategic engagement and partnership evaluation.
- FR20: Investor or partner visitors can identify a clear path to initiate partnership or business conversations.
- FR21: Investor or partner visitors can use the platform to evaluate the breadth and coherence of the business.
- FR22: Prospective customers can identify the business unit most relevant to their needs.
- FR23: Prospective customers can access division-specific information about products, services, or capabilities.
- FR24: Prospective customers can submit inquiries to the relevant division through division-specific inquiry paths.
- FR25: Prospective customers can understand enough about a division to decide whether to engage.
- FR26: Prospective customers can find contact pathways without needing to interpret the corporate structure manually.
- FR27: General public visitors can understand what the company does after a short visit.
- FR28: General public visitors can access plain-language content that explains the company without unnecessary ambiguity.
- FR29: General public visitors can recognize the business as a legitimate and professionally run organization.
- FR30: General public visitors can access current or recent company communications that show the business is active.
- FR31: Authorized internal users can create and publish general company news content.
- FR32: Authorized internal users can create and publish division-specific news content.
- FR33: Authorized internal users can create and publish company-wide thought leadership content.
- FR34: Authorized internal users can create and publish division-specific thought leadership content.
- FR35: Authorized internal users can associate published content with the relevant company stream or division stream.
- FR36: Visitors can browse published content in a structured way.
- FR37: The platform can support future expansion of content archives and publishing depth.
- FR38: Visitors can access a central contact path where appropriate.
- FR39: Visitors can access division-specific inquiry paths for relevant business units.
- FR40: The platform can distinguish inquiries by division context.
- FR41: The platform can present inquiry pathways in a way that reinforces professionalism and organizational clarity.
- FR42: Visitors can complete a contact or inquiry action without needing off-platform clarification.
- FR43: Authorized internal users can manage core publishable content without requiring structural redevelopment for each update.
- FR44: Authorized internal users can update company-level content over time.
- FR45: Authorized internal users can update division-level content over time.
- FR46: The platform can support future additions of new pages, sections, and content types without requiring a full rebuild.
- FR47: The platform can support reuse of content and page patterns across divisions.
- FR48: The platform can preserve content structure and quality as the site expands.
- FR49: Visitors can access the platform on mobile and desktop devices through a responsive web experience.
- FR50: Visitors can consume content in a format that supports search discoverability.
- FR51: Visitors can use the platform through accessible navigation and interaction patterns.
- FR52: The platform can support reusable content and interface structures across company and division contexts.
- FR53: The platform can support future integrations and structured content extensions without invalidating core user journeys.

### NonFunctional Requirements

- NFR1: Primary public pages should achieve a fast first-load experience on modern mobile devices under typical mobile network conditions.
- NFR2: The platform should be optimized so that core content pages feel responsive and readable without noticeable interface lag.
- NFR3: The platform should be engineered to support strong Lighthouse-oriented outcomes across performance, SEO, accessibility, and best-practices categories on key pages.
- NFR4: Media, typography, and interactive enhancements should be delivered in a way that does not materially degrade page responsiveness.
- NFR5: The platform should prioritize efficient delivery of company pages, division pages, and publishing pages.
- NFR6: Administrative or content-management capabilities should be restricted to authorized internal users only.
- NFR7: Data submitted through inquiry or contact pathways should be protected in transit.
- NFR8: The platform should minimize security exposure by avoiding unnecessary public attack surfaces and limiting privileged access paths.
- NFR9: The system should be deployable with standard production security controls appropriate for a public-facing corporate website.
- NFR10: Published content and company claims should be governable in a way that reduces the risk of accidental misrepresentation.
- NFR11: The platform should support growth in content volume, publishing frequency, and division depth without requiring a full architectural rewrite.
- NFR12: The platform should support the future addition of new sections, business units, and structured content types using existing patterns wherever possible.
- NFR13: The information architecture should remain coherent as the amount of company and division content increases over time.
- NFR14: The system should support future growth in public traffic without assuming a redesign of the core content model.
- NFR15: The public user experience should align with WCAG 2.1 expectations.
- NFR16: Core navigation, reading, and interaction flows should be usable through keyboard interaction.
- NFR17: Content structure should use semantic markup and accessible hierarchy so that assistive technologies can interpret key pages correctly.
- NFR18: Visual presentation should maintain readable typography, sufficient contrast, and clear focus visibility.
- NFR19: Motion and interaction behavior should not reduce usability for users sensitive to animation or dynamic effects.
- NFR20: The platform should provide a stable public experience for core browsing, publishing, and inquiry flows.
- NFR21: Core company pages, division pages, and publishing pages should remain consistently available under normal operating conditions.
- NFR22: Failures in non-essential enhancements should not break access to core content or inquiry capabilities.
- NFR23: The system should be deployable with a rollback-safe production workflow so changes can be managed without destabilizing the public experience.
- NFR24: The platform should be structured so future integrations such as analytics, CRM capture, structured CMS backends, or media systems can be added without breaking core user journeys.
- NFR25: Inquiry flows should preserve enough structure to support future routing, tracking, or back-office processing enhancements.
- NFR26: Publishing architecture should support both company-wide and division-specific streams in a way that can later connect to richer editorial or content systems.
- NFR27: Content and metadata structures should support future SEO, reporting, and content-distribution enhancements without content re-authoring at scale.

### Additional Requirements

From Architecture document:

- AR1: Project must be initialized using Astro 6 (Minimal Starter) with TypeScript strict mode, React integration, Tailwind CSS integration, Vercel adapter, shadcn/ui, and Resend — per the specified initialization command sequence.
- AR2: Content model must use file-based Content Collections with Astro's Content Layer API and Zod schemas for 6 collections: divisions (YAML), clusters (YAML), articles (MDX), team (YAML), credentials (YAML), pages (MDX).
- AR3: Island hydration strategy must be followed precisely: MobileNav and DesktopNav use client:load, SearchOverlay uses client:idle, InquiryForm and StatCounter use client:visible, Bento grid hover effects and section animations use CSS-only.
- AR4: Single Astro server endpoint at src/pages/api/contact.ts for all form handling — POST endpoint with variant-based routing, server-side Zod validation, Resend email dispatch (internal notification + user confirmation), honeypot + rate limiting.
- AR5: Project structure must match the defined directory tree exactly: src/pages/ (file-based routing for 31 routes), src/content/ (6 collections), src/components/ organized by domain (ui/, layout/, navigation/, divisions/, insights/, contact/, search/, shared/), src/layouts/ (4 layouts), src/lib/ (utilities), src/assets/ (organized by type), tests/ (unit, component, e2e).
- AR6: All Astro pages must follow the defined page pattern: imports → data fetching → props → SEO metadata → PageLayout wrapper → SectionWrapper sections. Every page uses PageLayout, every section uses SectionWrapper, SEO metadata is always explicit.
- AR7: Styling must use Tailwind design tokens exclusively (no arbitrary values), mobile-first responsive breakpoints only, cn() utility for conditional classes, no @apply in CSS files. shadcn/ui components modified only within their own files.
- AR8: Accessibility patterns must be implemented on every component: focus-visible rings, 44x44px touch targets, aria attributes, keyboard operability, single H1 per page, heading hierarchy, skip-to-content link, landmark roles, prefers-reduced-motion wrapping.
- AR9: Testing infrastructure: Vitest for unit/component tests, Playwright for E2E and accessibility (axe-core), GitHub Actions CI pipeline with lint + type-check + unit tests + build on every PR, E2E + a11y on preview deploys, Lighthouse CI on key pages.
- AR10: Deployment pipeline: GitHub repo → Vercel auto-deploy (preview on PR, production on push to main). Environment variables: RESEND_API_KEY, CONTACT_EMAIL_DEFAULT (server-only), SITE_URL (build-time), PUBLIC_SITE_NAME (public).
- AR11: Path aliases must be configured in tsconfig.json: @/components/*, @/layouts/*, @/lib/*, @/content/*, @/assets/*, @/styles/*.
- AR12: Naming conventions must be enforced: kebab-case for pages/content files, PascalCase for components/layouts, camelCase for functions/fields, SCREAMING_SNAKE for constants, PascalCase for types (no I prefix), camelCase+Schema for Zod schemas.
- AR13: Self-hosted fonts via @fontsource packages (Poppins, Inter) with font-display: swap and preloaded critical weights. Image optimization via Astro built-in Image/Picture components with build-time WebP/AVIF conversion.
- AR14: Date handling: ISO 8601 strings in content collections, Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }) for display, single formatDate() utility in src/lib/utils.ts.
- AR15: Error handling patterns: inline form errors with aria-describedby, banner above form for submission failure, Zod schema validation failing builds for content errors, custom 404 page, skeleton shimmer for loading states (no spinners).

### UX Design Requirements

- UX-DR1: Implement deep forest green primary colour system with full 10-step scale (primary-50 #F0FDF4 through primary-900 #14532D) and warm gold secondary accent (gold-600 #B48A3E, gold-400 #D4A84B, gold-100 #FDF6E3) plus neutral scale and semantic colours in Tailwind theme configuration.
- UX-DR2: Implement Poppins (headings, 600 weight) + Inter (body/UI, 400/500 weight) + JetBrains Mono (code) typography system with defined responsive type scale (H1: 36px mobile/60px desktop through Caption: 12px), line heights, and letter spacing — self-hosted via @fontsource.
- UX-DR3: Implement SectionWrapper component with 5 background variants (default/white, light/neutral-50, dark/neutral-900, primary/primary-50, hero/gradient primary-900 to primary-700) providing consistent py-16 lg:py-24 padding and container mx-auto px-4 sm:px-6 lg:px-8 constraints.
- UX-DR4: Implement SectionHeading component with standardised H2 treatment (Poppins semibold, text-3xl lg:text-4xl), optional gold eyebrow text (gold-600, uppercase, text-xs, tracking-widest — editorial premium treatment), optional subtitle (Inter, text-lg, neutral-600), centered/left alignment.
- UX-DR5: Implement DivisionBentoGrid with strategic hierarchy encoding via CSS Grid — large cards (core divisions: Crop Farming, Commodity Marketing) spanning 2 rows, standard cards (supporting: Animal Husbandry, Agro-Processing, Import & Export) at 1 row, compact cards (aspirational: Real Estate, Oil & Gas) — responsive collapse to 2-column tablet and single-column mobile ordered by hierarchy.
- UX-DR6: Implement DivisionCard with 3 size variants (large/standard/compact) and 4 visual variants from Editorial Premium direction: filled (primary-900 bg, white text), gradient (primary-50 to white), dark (neutral-900 bg, white text), outline (white bg, neutral-300 border) — with hover states (shadow-md elevation + border shift + arrow translate) and focus-visible ring.
- UX-DR7: Implement narrative bold homepage hero: full-bleed gradient background (primary-900 to primary-700), decorative blur gradient elements, centered large-scale white typography (Poppins 700), corporate positioning headline + sub-headline, dual CTA buttons (primary "Explore Our Divisions" + secondary "Partner With Us"), 85-100vh desktop / 75vh mobile.
- UX-DR8: Implement CredibilityBar component with dark background band (primary-900 or neutral-900), 3-5 stat items with large animated count-up numbers (gold accent for key figures via StatCounter React island, client:visible), descriptor labels, optional certification/partner logo row (horizontal scroll), responsive 2x2 mobile / inline desktop layout.
- UX-DR9: Implement InsightCard component with standard variant (single grid cell: thumbnail + category badge + headline + date + excerpt + link) and featured variant (spans 2 rows in asymmetric grid with larger image area and extended excerpt). Hover state: shadow elevation + title colour shifts to primary-600.
- UX-DR10: Implement sticky header navigation: 64px height, backdrop-blur background, logo left / nav centre / CTA right, dropdown menus with label + description pairs for 7 divisions grouped by 3 clusters, transparent overlay on hero transitioning to solid on scroll. Reduced height after scrolling past hero.
- UX-DR11: Implement mobile navigation via Sheet drawer (slide from right, React island client:load): accordion sections for division clusters, L1 items with 44px touch targets, expand/collapse toggles for Divisions → Clusters → Divisions, pinned "Get In Touch" CTA button, body scroll lock, state reset on navigation, close button (X) top-right.
- UX-DR12: Implement footer: brand story paragraph (editorial warmth) + logo + tagline above multi-column link grid (The Group, Divisions, Insights, Get In Touch, Investors & Partners, Connect/social) + clean bottom bar with copyright + legal links. Mobile: accordion columns. Desktop: 4-6 column grid.
- UX-DR13: Implement InquiryForm React island (client:visible) with 3 form variants: general (name, email, phone, subject, message), division-specific (pre-filled division context, company field, enquiry type dropdown), strategic/investor (organization, title/role, inquiry type dropdown with Strategic Partnership/Investment Discussion/Institutional Enquiry/Other). Single-column layout, inline blur validation, Zod schema, loading/success/error states, reassurance copy, division selector grouped by cluster.
- UX-DR14: Implement BreadcrumbNav component: nav element with aria-label="Breadcrumb", ordered list structure, clickable links for all crumbs except current page (muted, non-linked), Home → Section → Page hierarchy, mobile truncation with ellipsis for deep paths (4+ levels), placed below header above page hero on all pages except homepage.
- UX-DR15: Implement division cluster accent system as subtle secondary tints: Agriculture & Processing (amber-100 #FEF3C7 bg, amber-600 #D97706 icon), Trade & Markets (copper-100 #FFF1E6 bg, copper-600 #C2590A icon), Built Environment & Energy (slate-100 #F1F5F9 bg, slate-600 #475569 icon) — applied only to icon backgrounds and section highlights on division pages, never overriding primary green system.
- UX-DR16: Implement full WCAG 2.1 AA accessibility: focus-visible:ring-2 ring-primary-500 ring-offset-2 on all interactive elements, 44x44px minimum touch targets, skip-to-main-content link as first focusable element in BaseLayout, lang="en" on html, main landmark wrapping page content, nav landmarks with aria-label, all images with descriptive alt (or alt="" aria-hidden for decorative), colour never sole information carrier, all transitions/animations wrapped in prefers-reduced-motion check.
- UX-DR17: Implement search page with SearchInput (full-width, URL updates to /search?q=), SearchFilterTabs (All/Pages/Divisions/Insights/Contacts, filter by type param), SearchResultCard (type badge + linked title + URL path + excerpt with highlighted terms + parent/meta), LoadMore (10 per load), NoResultsState with recovery links to Divisions/Insights/Contact.
- UX-DR18: Implement button hierarchy system: primary (primary-600 bg, white text, rounded-lg, px-8 py-4 — max one per viewport), secondary (transparent bg, neutral-300 border, neutral-700 text), tertiary/link (no bg, primary-600 text, arrow icon with group-hover translate), gold accent (gold-600 bg, white text — max one per page, premium moments only), disabled (neutral-300 bg, neutral-500 text, cursor-not-allowed).
- UX-DR19: Implement spacing and layout foundation: 4px base unit, defined spacing scale (space-1 4px through space-24 96px), max-w-7xl container (1280px), content max-widths (max-w-3xl text, max-w-4xl mixed), card grid gaps (gap-6 lg:gap-8), border radius scale (rounded-md 6px, rounded-lg 8px, rounded-xl 12px, rounded-full), shadow scale (shadow-sm, shadow-md, shadow-lg).
- UX-DR20: Implement 17 page templates matching IA specifications: homepage-landing, corporate-narrative (About with anchor nav), division-hub (cluster-grouped cards), division-cluster (5 sections), division-detail (5-section pattern), publishing-hub (featured + filter + grid), publishing-listing (filtered article listing), taxonomy-hub (division browsing grid for insights by division), article-detail (header + hero image + body with sidebar + related + CTA), partner-hub (7-section investor page), contact-hub (pathway routing cards), contact-directory (division selection grid), contact-form (form + sidebar info), location-directory (map + listings), search-results, legal-page (constrained prose), sitemap-page.
- UX-DR21: Implement About page as single long-form page with AnchorNav component (sticky below header, horizontal scrollable, scroll-spy via IntersectionObserver, active state highlighting) and 7 sections: Page Hero, Company Overview (2-column image+text with FactCallout), Mission & Vision (statement cards + optional value cards), Leadership (grid of LeaderCards with expandable LeaderBioPanel), Group Structure (OrgChart SVG/HTML diagram), Credentials (expandable grid with show-more toggle), CTA Band.
- UX-DR22: Implement CTABanner component: full-width accent background variants (dark neutral-900, gold accent, green gradient), centered heading + body text + 1-2 CTA buttons, used as final section before footer on every page, responsive stacked CTAs on mobile.
- UX-DR23: Implement StepIndicator component: numbered badges (primary-600 circle) with connecting lines between steps, icon in primary-100 circle, title (uppercase overline) + description, horizontal with connecting lines on desktop, vertical stack on mobile.
- UX-DR24: Implement Investors & Partners page (partner-hub template) with 7 sections: Page Hero (premium background), Why Partner With Us (2-column text+image), Group Capabilities (3 cluster cards with strength statements), Portfolio Strength (dark credibility bar with 4 investor-relevant stats), Governance & Credibility (2-column: leadership preview + credentials), Latest Updates (3 InsightCards), Strategic Inquiry CTA (gold accent, dual buttons to /contact/strategic/).

### FR Coverage Map

- FR1: Epic 2 — Homepage corporate identity and positioning
- FR2: Epic 5 — About page corporate overview
- FR3: Epic 2 (Bento grid overview) + Epic 3 (Divisions hub full presentation)
- FR4: Epic 3 — Division detail pages
- FR5: Epic 2 (Bento grid cluster framing) + Epic 3 (Cluster pages)
- FR6: Epic 5 — About page supporting company information
- FR7: Epic 5 — Credentials and certifications
- FR8: Epic 1 — Navigation foundation
- FR9: Epic 2 — Homepage to division navigation paths
- FR10: Epic 2 (Bento grid) + Epic 3 (Divisions hub identification)
- FR11: Epic 6 — Company-wide and division-specific content streams
- FR12: Epic 6 — News, updates, thought leadership discovery
- FR13: Epic 6 — Company vs division publishing distinction
- FR14: Epic 7 — Internal cross-linking pathways
- FR15: Epic 7 — Platform search
- FR16: Epic 7 — Search results navigation
- FR17: Epic 2 — Homepage audience-aware entry paths
- FR18: Epic 5 — Investor credibility assessment
- FR19: Epic 5 — Strategic engagement information
- FR20: Epic 4 (strategic contact form) + Epic 5 (investor CTA)
- FR21: Epic 5 — Business breadth evaluation
- FR22: Epic 3 — Division identification for prospects
- FR23: Epic 3 — Division-specific capabilities
- FR24: Epic 4 — Division-specific inquiry paths
- FR25: Epic 3 — Division detail depth for engagement decision
- FR26: Epic 4 — Contact pathways without structure interpretation
- FR27: Epic 2 — Homepage short-visit comprehension
- FR28: Epic 2 (plain language) + Epic 5 (About page)
- FR29: Epic 2 (professional presentation) + Epic 5 (credentials)
- FR30: Epic 6 — Recent company communications
- FR31: Epic 6 — Company news publishing
- FR32: Epic 6 — Division-specific news publishing
- FR33: Epic 6 — Company thought leadership
- FR34: Epic 6 — Division thought leadership
- FR35: Epic 6 — Content stream association
- FR36: Epic 6 — Structured content browsing
- FR37: Epic 6 — Future publishing expansion
- FR38: Epic 4 — Central contact path
- FR39: Epic 4 — Division-specific inquiry paths
- FR40: Epic 4 — Division context in inquiries
- FR41: Epic 4 — Professional inquiry presentation
- FR42: Epic 4 — Complete contact action
- FR43: Epic 6 — Content management workflow
- FR44: Epic 6 — Company-level content updates
- FR45: Epic 6 — Division-level content updates
- FR46: Epic 7 — Future page/section additions
- FR47: Epic 3 — Reusable division patterns
- FR48: Epic 7 — Content structure quality preservation
- FR49: Epic 1 — Responsive web experience
- FR50: Epic 1 (SEO metadata foundation) + Epic 8 (SEO verification and Lighthouse audit)
- FR51: Epic 1 (accessible navigation) + Epic 8 (full accessibility verification)
- FR52: Epic 7 — Reusable content/interface structures
- FR53: Epic 7 — Future integrations support

### Implementation Note: Cross-Epic Link Dependencies

During progressive implementation, some stories create CTA links or navigation paths to pages built in later epics. These are soft forward dependencies — the source page functions correctly but the destination link will return 404 until the target epic is completed. This is expected behaviour for sequential web development and resolves naturally as the full MVP is assembled.

Known soft forward links:
- Epic 2 (Homepage) → links to /divisions/ (Epic 3), /investors-partners/ (Epic 5), /contact/ (Epic 4)
- Epic 3 (Division Pages) → links to /contact/divisions/[slug]/ (Epic 4), /insights/divisions/[slug]/ (Epic 6)
- Epic 5 (Investors & Partners) → displays InsightCards (Epic 6 content, fallback handled)
- Epic 6 (Publishing) → links to division pages (Epic 3), contact pages (Epic 4)

These resolve completely once all 8 epics are implemented. Story 7.3 (Cross-Linking) performs final verification that no internal links produce 404 errors.

### Visual Reference Map

The rendered design reference (`design-reference-final.html`) and logo kit (`logo-kit.html`) provide the canonical visual target for implementation. Each story below should reference the relevant section when building components.

| Story | Design Reference Section | Brand Assets |
|---|---|---|
| 1.2 (Design Tokens) | CSS `:root` custom properties — all colour, spacing, and typography tokens | — |
| 1.4 (Base Layouts) | `.overview` (SectionWrapper), `.eyebrow` + `h2` (SectionHeading), `.hero-btn`/`.cta-btn` (Buttons), `.cta` (CTABanner) | — |
| 1.5 (Header Nav) | `.site-header` — layout, backdrop-blur, nav items, CTA. NOTE: "Citadel." text is a placeholder; use actual logo SVGs | `logo-primary.svg` (solid bg), `logo-reversed.svg` (dark/transparent bg) |
| 1.6 (Mobile Nav) | `@media (max-width: 767px)` — hamburger trigger, responsive breakpoint | — |
| 1.7 (Footer) | `.site-footer` — brand story + 5-column link grid + copyright bar | `logo-reversed.svg` (dark footer bg) |
| 2.1 (Hero) | `.hero` — gradient, decorative blur orbs, `clamp()` typography, gold CTA | — |
| 2.2 (Bento Grid) | `.bento-grid` — CSS Grid rules, column/row spans, 4 card variants (`.card-filled`, `.card-outline`, `.card-dark`, `.card-accent`) | — |
| 2.3 (Credibility) | `.credibility` — gold stat numbers, centred layout, gold dividers | — |
| 2.4 (Insights + CTA) | `.insights` (magazine layout, featured + small cards) + `.cta` (dark bg, gold bar) | — |

**Logo assets** (`brand-assets/`): `logo-primary.svg`, `logo-reversed.svg`, `logo-monogram.svg`, `logo-monogram-reversed.svg`. See `brand-identity.md` for usage rules and `logo-kit.html` for all variants at multiple sizes including nav-scale (~40px height).

## Epic List

### Epic 1: Brand Identity & Navigation Experience
The platform exists with the GRCL brand identity, working responsive navigation, and a professional visual foundation. A visitor can access the site, see the corporate brand, and navigate the platform shell on any device.
**FRs covered:** FR8, FR49, FR50, FR51
**NFRs addressed:** NFR1-5 (performance foundation), NFR15-19 (accessibility foundation)
**ARs addressed:** AR1, AR2, AR5, AR6, AR7, AR8, AR11, AR12, AR13, AR14
**UX-DRs addressed:** UX-DR1, UX-DR2, UX-DR3, UX-DR4, UX-DR10, UX-DR11, UX-DR12, UX-DR14, UX-DR16, UX-DR18, UX-DR19, UX-DR22

### Epic 2: Homepage & Corporate Narrative
Visitors experience the defining interaction — understanding the entire business in a single scroll. The homepage delivers the narrative bold hero, business overview, divisions Bento grid with strategic hierarchy, credibility signals with animated stats, latest insights section, and contact CTA.
**FRs covered:** FR1, FR3, FR5, FR9, FR10, FR17, FR27, FR28, FR29
**NFRs addressed:** NFR1-5 (performance — hero, animated stats, and Bento grid must feel responsive on mobile), NFR15-19 (accessibility — grid, animations, and CTAs require keyboard nav, ARIA, and prefers-reduced-motion compliance)
**UX-DRs addressed:** UX-DR5, UX-DR6, UX-DR7, UX-DR8, UX-DR9, UX-DR22, UX-DR23

### Epic 3: Division Discovery & Detail Pages
Visitors can explore all 7 divisions in depth. The divisions hub presents the full portfolio grouped by cluster. Cluster pages frame strategic context. Division detail pages present capabilities, proof points, related insights placeholders, and division-specific inquiry CTAs. Customers can identify the right business unit and build confidence.
**FRs covered:** FR3 (shared with Epic 2), FR4, FR5 (shared with Epic 2), FR10 (shared with Epic 2), FR22, FR23, FR25, FR47
**NFRs addressed:** NFR11-14 (scalability — division/cluster page patterns must support future additions without rework), NFR15-19 (accessibility — multi-section layouts with stats, capability grids, and CTAs require full WCAG 2.1 AA compliance)
**UX-DRs addressed:** UX-DR5, UX-DR6, UX-DR8, UX-DR15, UX-DR20 (division templates)

### Epic 4: Inquiry & Contact Architecture
Visitors can contact the company through clear, professionally presented inquiry paths — general enquiries, division-specific (7 forms pre-contextualized), and strategic/investor. The contact hub routes visitors to the right pathway. Forms validate, submit via Resend, and deliver confirmation emails. Locations page is live.
**FRs covered:** FR20 (shared with Epic 5), FR24, FR26, FR38, FR39, FR40, FR41, FR42
**NFRs addressed:** NFR6-10 (security — form data in transit, honeypot, rate limiting, server-side validation), NFR20-23 (reliability — stable contact flow, form failures must not break other pages, rollback-safe), NFR24-27 (integration readiness — contact endpoint structure supports future CRM, routing, and tracking)
**ARs addressed:** AR4
**UX-DRs addressed:** UX-DR13, UX-DR20 (contact templates)

### Epic 5: Corporate Trust & Investor Experience
The About page delivers the full corporate narrative with anchor navigation — overview, mission/vision, leadership, group structure, credentials. The Investors & Partners page provides a curated credibility path for strategic audiences. Investors and partners can evaluate the business and initiate engagement.
**FRs covered:** FR2, FR6, FR7, FR18, FR19, FR20 (shared with Epic 4), FR21, FR28 (shared with Epic 2), FR29 (shared with Epic 2)
**NFRs addressed:** NFR15-19 (accessibility — anchor nav, org chart, expandable bio panels, credential grids all require keyboard nav and ARIA), NFR20-23 (reliability — strategic credibility pages must remain consistently available)
**UX-DRs addressed:** UX-DR21, UX-DR24

### Epic 6: Publishing & Thought Leadership
Content owners can publish company-wide and division-specific news and thought leadership via git-based workflow. Visitors can browse insights by category and division, read full articles with share links, and see the business is active. All publishing pages are live.
**FRs covered:** FR11, FR12, FR13, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR43, FR44, FR45
**NFRs addressed:** NFR11-14 (scalability — article volume, frequency, and taxonomy must grow without rework), NFR20-23 (reliability — publishing pages are core content; git-based workflow must be rollback-safe), NFR24-27 (integration readiness — article metadata and stream structure support future editorial systems, analytics, and content distribution)
**UX-DRs addressed:** UX-DR9, UX-DR20 (publishing templates)

### Epic 7: Search, Discovery & Supporting Pages
Visitors can search the entire platform with type filters and highlighted results. Legal pages (privacy, terms), HTML sitemap, and custom 404 are live. Internal cross-linking and discovery pathways are complete across all pages.
**FRs covered:** FR14, FR15, FR16, FR46, FR48, FR52, FR53
**NFRs addressed:** NFR11-14 (scalability — search and sitemap must scale with content growth), NFR15-19 (accessibility — search input, filter tabs, result cards, and legal pages require keyboard nav and ARIA), NFR24-27 (integration readiness — search infrastructure supports future faceted search, analytics, and content discovery enhancements)
**UX-DRs addressed:** UX-DR17, UX-DR20 (search, legal, sitemap templates)
**ARs addressed:** AR15 (custom 404)

### Epic 8: Accessible, Fast, Production-Ready Platform
The platform is tested, accessible, performant, and deployed to production. Lighthouse scores meet targets (90+ mobile). WCAG 2.1 AA is verified via automated and manual testing. CI/CD pipeline runs lint, type-check, unit tests, E2E, and accessibility checks. The site is live on Vercel.
**FRs covered:** FR50, FR51
**NFRs covered:** NFR1-27
**ARs addressed:** AR9, AR10

## Epic 1: Platform Foundation & Design System

The platform exists with the GRCL brand identity, working responsive navigation, and a professional visual foundation. A visitor can access the site, see the corporate brand, and navigate the platform shell on any device.

### Story 1.1: Project Initialization & Toolchain Setup

As a **developer**,
I want the Astro 6 project initialized with all required integrations and project structure,
So that I have a working development environment to build all platform features.

**Acceptance Criteria:**

**Given** a fresh project directory
**When** the initialization sequence is run
**Then** the project has Astro 6 with TypeScript strict mode, React integration, Tailwind CSS integration, Vercel adapter, shadcn/ui, and Resend installed
**And** the directory structure matches the architecture specification (src/pages/, src/content/, src/components/ with domain subfolders, src/layouts/, src/lib/, src/assets/, tests/)
**And** path aliases are configured in tsconfig.json (@/components/*, @/layouts/*, @/lib/*, @/content/*, @/assets/*, @/styles/*)
**And** environment variables are documented (.env.example with RESEND_API_KEY, CONTACT_EMAIL_DEFAULT, SITE_URL, PUBLIC_SITE_NAME)
**And** brand logo SVGs (logo-primary.svg, logo-reversed.svg, logo-monogram.svg, logo-monogram-reversed.svg) are copied from planning-artifacts/brand-assets/ into src/assets/brand/
**And** logo-monogram.svg is converted to a favicon (favicon.svg or generated .ico) and configured in the project head
**And** `npm run dev` starts the dev server without errors

### Story 1.2: Design Token System & Typography

As a **visitor**,
I want the platform to present a consistent, professional visual identity,
So that I perceive GRCL as a credible, well-organized business.

**Acceptance Criteria:**

**Given** the Tailwind configuration
**When** design tokens are applied
**Then** the full colour system is available: primary green 10-step scale (primary-50 #F0FDF4 through primary-900 #052E16), warm gold accent (gold-600 #B48A3E, gold-400 #D4A84B, gold-100 #FDF6E3), neutral scale, and semantic colours (success, error, warning, info)
**And** Poppins (headings, 600 weight) and Inter (body/UI, 400/500 weight) are self-hosted via @fontsource with font-display: swap and critical weights preloaded
**And** the responsive type scale is defined (H1: 36px mobile / 60px desktop through Caption: 12px) with correct line heights and letter spacing
**And** spacing scale (4px base unit, space-1 through space-24), border radius scale (rounded-md/lg/xl/full), and shadow scale (shadow-sm/md/lg) are configured
**And** the cn() utility for conditional Tailwind classes is available in src/lib/utils.ts
**And** the formatDate() utility using Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }) is available in src/lib/utils.ts
**And** no arbitrary Tailwind values are used — all values reference design tokens

### Story 1.3: Content Collections & Seed Data

As a **developer**,
I want content collections defined with validated schemas and seed data,
So that all pages can query structured, type-safe content for divisions, clusters, and corporate information.

**Acceptance Criteria:**

**Given** Astro's Content Layer API
**When** content collections are defined
**Then** 6 collections exist with Zod schemas: divisions (YAML), clusters (YAML), articles (MDX), team (YAML), credentials (YAML), pages (MDX)
**And** seed data exists for all 7 divisions (crop-farming, animal-husbandry, agro-processing, commodity-marketing, real-estate, import-export, oil-gas) with required fields populated
**And** seed data exists for all 3 clusters (agriculture-processing, trade-markets, built-environment-energy) with division membership
**And** content schema validation fails the build if required fields are missing or invalid
**And** TypeScript types are generated from schemas and importable throughout the project
**And** controlled taxonomy values (section, division, cluster, audience, insight stream, contact route) are defined as Zod enums

### Story 1.4: Base Layouts & Core UI Components

As a **visitor**,
I want every page to have a consistent, accessible structure with professional presentation,
So that I can use the platform comfortably on any device with any assistive technology.

**Acceptance Criteria:**

**Given** a page rendered with BaseLayout
**When** the page loads
**Then** the HTML includes lang="en", proper head meta, font preloads, and a skip-to-main-content link as the first focusable element
**And** the page has a single main landmark wrapping content, with nav landmarks having aria-labels
**And** PageLayout wraps all pages with SEO metadata (title, description, canonical, Open Graph, Twitter Card), a breadcrumb slot, and section slots
**And** SectionWrapper component supports 5 background variants (default/white, light/neutral-50, dark/neutral-900, primary/primary-50, hero/gradient) with consistent py-16 lg:py-24 padding and container constraints (max-w-7xl, mx-auto, px-4 sm:px-6 lg:px-8)
**And** SectionHeading component renders H2 with Poppins semibold (text-3xl lg:text-4xl), optional gold eyebrow text (uppercase, text-xs, tracking-widest), optional subtitle (Inter, text-lg, neutral-600), and centered/left alignment
**And** Button components exist for all 5 hierarchy levels: primary (primary-600 bg), secondary (outline), tertiary (link+arrow), gold accent, disabled — all with focus-visible:ring-2 ring-primary-500 ring-offset-2
**And** CTABanner component renders full-width accent background (dark/gold/green variants), centered heading + body + 1-2 CTA buttons
**And** all interactive elements have 44x44px minimum touch targets
**And** all transitions/animations are wrapped in prefers-reduced-motion checks
**And** brand logo SVGs (from brand-assets/) are prepared for inline use: the Google Fonts @import in the SVG source is removed and the self-hosted Poppins font from the page renders the wordmark text, or SVG text elements are converted to paths for guaranteed rendering independent of font loading

### Story 1.5: Header Navigation & Division Dropdown

As a **visitor**,
I want a clear, professional header navigation that reveals the full business structure,
So that I can navigate to any section of the platform from any page.

**Acceptance Criteria:**

**Given** a page with the header navigation
**When** the page loads on desktop
**Then** a sticky header renders at 64px height with backdrop-blur background, the GRC monogram + stacked wordmark logo (from brand-assets/logo-primary.svg, scaled to ~40px height) left, nav items centre (Home, About the Group, Divisions, Insights, Investors & Partners, Contact), search icon, and "Get In Touch" CTA button right
**And** hovering/clicking "Divisions" opens a mega-dropdown with 7 divisions grouped by 3 clusters (Agriculture & Processing, Trade & Markets, Built Environment & Energy), each division showing label + description, and a "View All Divisions" link at the bottom
**And** the header is transparent over hero sections using logo-reversed.svg (white/gold variant for visibility on dark backgrounds), transitioning to solid white/blur on scroll with logo-primary.svg (dark green variant for light backgrounds)
**And** logo SVGs are inlined so the self-hosted Poppins font renders the wordmark text correctly (no Google Fonts network dependency in production)
**And** keyboard navigation works through all nav items and dropdown entries with visible focus indicators
**And** aria attributes are correct: nav role, aria-expanded on dropdown triggers, aria-current="page" on active items
**And** the header renders correctly at all breakpoints (lg, xl, 2xl)

### Story 1.6: Mobile Navigation

As a **mobile visitor**,
I want a touch-friendly navigation that reveals the full site structure,
So that I can access any page without difficulty on my phone or tablet.

**Acceptance Criteria:**

**Given** the platform on a mobile/tablet viewport (below lg breakpoint)
**When** the hamburger icon is tapped
**Then** a Sheet drawer slides in from the right (React island, client:load)
**And** L1 navigation items display with 44px minimum touch targets
**And** "Divisions" expands as an accordion showing 3 clusters, each expandable to show their member divisions
**And** a pinned "Get In Touch" CTA button is visible at the bottom of the drawer
**And** body scroll is locked while the drawer is open
**And** tapping a navigation link navigates to the page and closes the drawer with state reset
**And** the close button (X) is in the top-right corner
**And** focus is trapped within the drawer while open
**And** pressing Escape closes the drawer

### Story 1.7: Footer Navigation

As a **visitor**,
I want a comprehensive footer that reinforces the brand and provides secondary navigation,
So that I can find any section and perceive the platform as complete and professional.

**Acceptance Criteria:**

**Given** any page on the platform
**When** the visitor scrolls to the footer
**Then** a brand story paragraph with the GRC monogram + stacked wordmark logo (brand-assets/logo-reversed.svg, white/gold variant for dark footer background) and tagline is displayed above the link grid
**And** a multi-column link grid contains: The Group (About the Group, Leadership, Group Structure, Credentials), Divisions (all 7 division links), Insights (Latest, News & Updates, Thought Leadership), Get In Touch (General Enquiries, Contact by Division, Partner / Investor, Locations), Investors & Partners (Why Partner With Us, Portfolio Strength, Strategic Inquiry), Connect (social media links placeholder)
**And** a bottom bar displays copyright text ("© 2026 Global Resources Citadel Limited. All rights reserved.") and legal links (Privacy Policy, Terms of Use, Sitemap)
**And** on desktop (lg+), the footer renders as a multi-column grid
**And** on mobile, footer columns collapse into an accordion pattern
**And** all footer links are functional and correctly pathed

### Story 1.8: Breadcrumb Navigation

As a **visitor**,
I want breadcrumb trails showing my position in the site hierarchy,
So that I can understand where I am and navigate back up the structure.

**Acceptance Criteria:**

**Given** any page except the homepage
**When** the page renders
**Then** a BreadcrumbNav component displays below the header and above the page hero
**And** the breadcrumb uses a nav element with aria-label="Breadcrumb" and an ordered list structure
**And** all crumbs except the current page (final crumb) are clickable links
**And** the final crumb is visually distinct (muted colour, non-linked)
**And** breadcrumbs follow the defined patterns (e.g., Home > Divisions > [Cluster] > [Division])
**And** on mobile, deep paths (4+ levels) truncate middle items with ellipsis
**And** breadcrumb structured data (BreadcrumbList schema) is included in page head for SEO

## Epic 2: Homepage & Corporate Narrative

Visitors experience the defining interaction — understanding the entire business in a single scroll. The homepage delivers the narrative bold hero, business overview, divisions Bento grid with strategic hierarchy, credibility signals with animated stats, latest insights section, and contact CTA.

### Story 2.1: Homepage Hero & Business Overview Sections

As a **visitor**,
I want the homepage to immediately communicate GRCL's corporate identity with visual authority,
So that I understand this is a serious, multi-division business within 3 seconds of landing.

**Acceptance Criteria:**

**Given** a visitor lands on the homepage
**When** the page renders
**Then** a narrative bold hero section fills 85-100vh on desktop (75vh mobile) with a gradient background (primary-900 to primary-700), decorative blur gradient elements, and centered white typography
**And** the hero displays a corporate positioning headline (Poppins 700, max 15 words), a sub-headline (max 25 words), and two CTA buttons: primary "Explore Our Divisions" (links to /divisions/) and secondary "Partner With Us" (links to /investors-partners/)
**And** the header overlays the hero in transparent mode
**And** below the hero, a "What We Do" business overview section renders on a light background with a gold eyebrow label, heading, 2-3 sentence body text, and 3 cluster cards (icon + cluster name + brief descriptor, each linking to the cluster page)
**And** both sections are responsive: hero CTAs stack on mobile, cluster cards collapse to single column
**And** the page uses the homepage-landing template with PageLayout and explicit SEO metadata (title, description, Organization + WebSite structured data, canonical URL)

### Story 2.2: Divisions Bento Grid

As a **visitor**,
I want to see the full business structure at a glance with clear visual hierarchy,
So that I can immediately identify which divisions are most established and find the one relevant to me.

**Acceptance Criteria:**

**Given** a visitor scrolls to the divisions section on the homepage
**When** the Bento grid renders
**Then** all 7 divisions display in an asymmetric CSS Grid layout where card size encodes strategic hierarchy
**And** large cards (Crop Farming, Commodity Marketing) span 2 grid rows with background image, division name, brief description (2 lines), key stat badge, and "Learn More" arrow link
**And** standard cards (Animal Husbandry, Agro-Processing, Import & Export) occupy 1 row with image, division name, brief description, and "Learn More" link
**And** compact cards (Real Estate, Oil & Gas) occupy 1 row with icon, division name, and arrow link
**And** each card uses one of 4 Editorial Premium visual variants: filled (primary-900 bg), gradient (primary-50 to white), dark (neutral-900 bg), outline (white bg with neutral-300 border)
**And** hover state triggers shadow-md elevation, border colour shift, and arrow translate animation (desktop)
**And** each card links to its division detail page (/divisions/[slug]/)
**And** on tablet: 2-column simplified grid; on mobile: single column stack ordered by hierarchy (core first)
**And** the grid uses role="list" with each card as role="listitem", preserving logical DOM reading order
**And** the section has a gold eyebrow label "Our Divisions" and heading "Seven Verticals. One Vision."

### Story 2.3: Credibility Signals & Stats Section

As a **visitor**,
I want to see proof of GRCL's track record and legitimacy,
So that I can trust the business is real and established before exploring further.

**Acceptance Criteria:**

**Given** a visitor scrolls past the Bento grid on the homepage
**When** the credibility section renders
**Then** a dark background band (primary-900 or neutral-900) displays 4 key stats (years in business, business partners, divisions active, states/regions) as large animated numbers with descriptor labels
**And** stat numbers animate with a count-up effect triggered by scroll into view via IntersectionObserver (StatCounter React island, client:visible)
**And** key stat numbers render in gold accent colour (gold-600)
**And** an optional row of certification/partner logos displays as a horizontal row below the stats
**And** on mobile, stats render as a 2x2 grid; on desktop, as a horizontal row
**And** the count-up animation respects prefers-reduced-motion (numbers display instantly without animation)

### Story 2.4: Latest Insights & Contact CTA Sections

As a **visitor**,
I want to see that GRCL is actively communicating and have a clear next step,
So that I know the business is alive and I can take action when ready.

**Acceptance Criteria:**

**Given** a visitor scrolls to the lower homepage sections
**When** the insights section renders
**Then** 3 InsightCard components display the latest published articles with thumbnail image, category badge, headline, date, brief excerpt (max 2 lines), and "Read More" arrow link
**And** a "View All Insights" link below the cards navigates to /insights/
**And** if no articles exist yet, the section displays gracefully with a "Stay tuned" message (never "Coming Soon")
**And** below the insights, a CTABanner section renders on a warm accent background with heading "Ready to Work With Us?", supporting text addressing all audience types, and dual CTAs: "Contact Us" (to /contact/) and "Partner With Us" (to /contact/strategic/)
**And** the insights cards use a 3-column responsive grid (1-column mobile, 2-column tablet, 3-column desktop)
**And** insight cards have hover state: shadow elevation and title colour shifts to primary-600

## Epic 3: Division Discovery & Detail Pages

Visitors can explore all 7 divisions in depth. The divisions hub presents the full portfolio grouped by cluster. Cluster pages frame strategic context. Division detail pages present capabilities, proof points, related insights placeholders, and division-specific inquiry CTAs.

### Story 3.1: Divisions Hub Page

As a **visitor**,
I want a central page showing all business divisions organized by cluster,
So that I can browse the full portfolio and find the division relevant to my needs.

**Acceptance Criteria:**

**Given** a visitor navigates to /divisions/
**When** the page renders
**Then** a PageHero section displays with gold eyebrow "Our Divisions", heading, and sub-heading text
**And** 3 cluster sections render in sequence (Agriculture & Processing, Trade & Markets, Built Environment & Energy) with alternating white/neutral-50 backgrounds
**And** each cluster section shows a cluster heading, 1-2 sentence description, and a responsive card grid of its member divisions
**And** each DivisionPreviewCard shows division image (16:9 or 4:3), division name, 2-3 line overview, and "Explore" arrow link to the division detail page
**And** a CTABanner at the bottom offers "Looking for a specific capability?" with links to contact and search
**And** breadcrumbs render: Home > Divisions
**And** SEO metadata includes title, description, canonical, and CollectionPage structured data
**And** cards stack to 1-column on mobile, 2-column on tablet, 3-column on desktop

### Story 3.2: Division Cluster Pages

As a **visitor**,
I want cluster pages that frame the strategic context for related divisions,
So that I understand how divisions within a sector group connect and complement each other.

**Acceptance Criteria:**

**Given** a visitor navigates to a cluster page (e.g., /divisions/agriculture-processing/)
**When** the page renders using getStaticPaths for 3 cluster slugs
**Then** a cluster hero section displays with sector-relevant background image, dark overlay, gold eyebrow "Division Group", cluster name heading, and positioning sub-heading
**And** a cluster overview section shows 2-3 paragraphs explaining the cluster's strategic role and value chain
**And** a member divisions section shows each division as a DivisionFeatureCard (large image, title, overview text, 3 key capability bullets, "Explore Division" link)
**And** a related insights section shows up to 3 InsightCards tagged to divisions in this cluster (fallback: latest company-wide articles)
**And** a CTABanner offers cluster-specific inquiry with "Interested in [cluster area]?" heading
**And** breadcrumbs render: Home > Divisions > [Cluster Name]
**And** all 3 cluster pages render correctly: agriculture-processing (3 divisions), trade-markets (2 divisions), built-environment-energy (2 divisions)

### Story 3.3: Division Detail Pages — Layout & Content Structure

As a **prospective customer**,
I want detailed division pages that demonstrate specific competence and operational credibility,
So that I can evaluate whether this business unit can serve my needs before reaching out.

**Acceptance Criteria:**

**Given** a visitor navigates to a division page (e.g., /divisions/crop-farming/)
**When** the page renders using getStaticPaths for 7 division slugs
**Then** Section 1 (Division Overview) shows a full-width sector-specific hero image, cluster name as gold eyebrow label, division name as H1, positioning sub-heading (max 30 words), and 2-3 narrative paragraphs
**And** Section 2 (Capabilities) shows a heading "What We Offer" with a 3-column grid of CapabilityCards (icon + capability name + 2-3 line description), 3-6 cards per division, on a light grey background
**And** Section 3 (Proof/Credentials) shows a dark background band with 3-4 division-specific stats (animated StatCounter), optional certification logos, and optional testimonial quote
**And** Section 4 (Related Insights) shows up to 3 InsightCards tagged to this division, with "View All [Division] Insights" link to /insights/divisions/[slug]/ (fallback: latest company-wide articles)
**And** Section 5 (Inquiry CTA) shows an accent background CTABanner with "Interested in [Division Name]?" heading and CTA linking to /contact/divisions/[slug]/
**And** breadcrumbs render: Home > Divisions > [Cluster Name] > [Division Name]
**And** division cluster accent tints are applied to icon backgrounds and section highlights: amber for Agriculture & Processing, copper for Trade & Markets, slate for Built Environment & Energy
**And** SEO metadata follows the pattern: "[Division Name] — Global Resources Citadel Limited | [Cluster Name]" with Organization (department) + WebPage structured data
**And** all 7 division pages render correctly with their respective content from content collections

## Epic 4: Inquiry & Contact Architecture

Visitors can contact the company through clear, professionally presented inquiry paths — general enquiries, division-specific (7 forms pre-contextualized), and strategic/investor. Forms validate, submit via Resend, and deliver confirmation emails.

### Story 4.1: Contact Hub & Inquiry Routing

As a **visitor**,
I want a contact page that routes me to the right inquiry pathway,
So that I reach the appropriate team without guessing which form to use.

**Acceptance Criteria:**

**Given** a visitor navigates to /contact/
**When** the page renders
**Then** a PageHero displays with "Contact" eyebrow, "Get In Touch" heading, and sub-heading "Choose the right pathway to reach the team you need."
**And** 4 PathwayCards render in a 2x2 grid: General Enquiries (icon: envelope, links to /contact/general/), Contact by Division (icon: building, links to /contact/divisions/), Partner / Investor Contact (icon: handshake, links to /contact/strategic/), Locations (icon: map-pin, links to /contact/locations/)
**And** each PathwayCard has icon, heading, brief descriptor, and action link with hover elevation effect
**And** a Quick Contact Info section below shows 3 ContactInfoCards: phone, email, head office address
**And** breadcrumbs render: Home > Contact
**And** SEO metadata includes ContactPage structured data
**And** cards stack to 1-column on mobile

### Story 4.2: Contact by Division Directory & Division Inquiry Forms

As a **prospective customer**,
I want to reach the specific division team I need with pre-contextualized inquiry forms,
So that my enquiry is routed to the right people without explaining which division I want.

**Acceptance Criteria:**

**Given** a visitor navigates to /contact/divisions/
**When** the page renders
**Then** a heading "Contact by Division" with body text is displayed, followed by a grid of 7 DivisionContactCards (icon + division name + "Contact" link) linking to /contact/divisions/[slug]/
**And** navigating to /contact/divisions/[slug]/ (e.g., /contact/divisions/crop-farming/) renders a division-specific inquiry form
**And** the form displays the division name prominently in the heading ("[Division Name] Enquiry")
**And** the form contains: Full Name (required), Email (required), Company/Organization (optional), Phone (optional), Enquiry Type dropdown (Product/Service Inquiry, Business Opportunity, General Question), Message (required, min 20 characters)
**And** a sidebar shows a brief 2-3 line division overview and "Explore [Division]" link back to the division page
**And** reassurance copy reads: "Your enquiry will be routed to our [Division Name] team. We aim to respond within 2 business days."
**And** all 7 division inquiry pages render correctly using getStaticPaths
**And** breadcrumbs render: Home > Contact > Contact by Division > [Division Name]

### Story 4.3: General & Strategic Inquiry Forms

As a **visitor**,
I want general and strategic contact forms tailored to my intent,
So that I can submit enquiries with appropriate context for the team receiving them.

**Acceptance Criteria:**

**Given** a visitor navigates to /contact/general/
**When** the page renders
**Then** a general enquiry form displays with: Full Name (required), Email (required), Phone (optional), Subject (required), Message (required, min 20 characters)
**And** a sidebar shows contact information (phone, email, address, hours: Mon-Fri 8am-5pm WAT)
**And** reassurance copy reads: "We aim to respond within 2 business days."

**Given** a visitor navigates to /contact/strategic/
**When** the page renders
**Then** a strategic inquiry form displays with: Full Name (required), Email (required), Organization (required), Title/Role (required), Phone (optional), Inquiry Type dropdown (Strategic Partnership, Investment Discussion, Institutional Enquiry, Other), Brief Description (required)
**And** a sidebar shows "What to expect: Confidential initial review, Response within 3 business days, Direct engagement with strategic team" and a link back to Investors & Partners
**And** reassurance copy reads: "All strategic enquiries are handled confidentially and reviewed by our leadership team."
**And** breadcrumbs render correctly for both pages

### Story 4.4: Form Submission, Validation & Email Processing

As a **visitor**,
I want my inquiry to be validated, submitted, and confirmed professionally,
So that I know my message was received and will be handled by the right team.

**Acceptance Criteria:**

**Given** a visitor fills out any contact form (general, division, strategic)
**When** they submit the form
**Then** client-side Zod validation runs inline on blur for each field, showing error messages below fields with error-600 text and error border, linked via aria-describedby
**And** a honeypot field is present but hidden (display:none) — submissions with the honeypot filled are silently rejected
**And** the submit button shows "Sending..." text and disabled state during submission
**And** the form POSTs to /api/contact with a JSON payload including: inquiryType, destinationTeam, divisionSlug (if applicable), sourcePage, submittedAt (ISO-8601), and all form fields
**And** the server endpoint validates all fields with Zod, returns 400 with field-level errors on failure
**And** simple in-memory rate limiting returns 429 if the threshold is exceeded
**And** on success, Resend sends two emails: an internal routing notification (to the appropriate team/division email from content collections) and a user confirmation email acknowledging receipt with division/team context
**And** the form is replaced by an inline success confirmation showing "Your enquiry has been received" with the routing context (e.g., "Our Crop Farming team will respond within 2 business days")
**And** on server error, the form persists with data preserved and an error banner above the form with retry option

### Story 4.5: Locations Page

As a **visitor**,
I want to find GRCL's physical offices and operational sites,
So that I can visit or send correspondence to the right location.

**Acceptance Criteria:**

**Given** a visitor navigates to /contact/locations/
**When** the page renders
**Then** a heading "Our Locations" and body text are displayed
**And** a 2-column layout shows an optional map embed or static map image on the left, and location details on the right
**And** the Head Office section shows address, phone, and business hours
**And** an optional Operational Sites section lists additional locations with name and address
**And** breadcrumbs render: Home > Contact > Locations
**And** the page is responsive: columns stack on mobile

## Epic 5: Corporate Trust & Investor Experience

The About page delivers the full corporate narrative with anchor navigation. The Investors & Partners page provides a curated credibility path for strategic audiences.

### Story 5.1: About the Group Page — Overview, Mission & Vision

As a **visitor**,
I want to understand who GRCL is, what they stand for, and why they exist,
So that I can assess the company's legitimacy and values before engaging further.

**Acceptance Criteria:**

**Given** a visitor navigates to /about/
**When** the page renders
**Then** a PageHero displays with "About the Group" gold eyebrow, "Who We Are" heading, and positioning sub-heading
**And** an AnchorNav component renders below the header (sticky on scroll) with horizontal items: Overview, Mission & Vision, Leadership, Group Structure, Credentials, Values — with scroll-spy highlighting the current section based on scroll position via IntersectionObserver
**And** the Overview section (#overview) renders a 2-column layout: corporate photography left, narrative text right (3-4 paragraphs) with key fact callouts (Founded [Year], Headquarters, [X] Divisions)
**And** the Mission & Vision section (#mission-vision) renders 2 side-by-side statement cards (Mission and Vision) with decorative icons, plus an optional row of 3-4 value cards below (icon + title + description)
**And** the AnchorNav is horizontally scrollable on mobile with fade indicators
**And** breadcrumbs render: Home > About the Group
**And** SEO metadata includes Organization + AboutPage structured data
**And** content is sourced from the pages/about.mdx content collection entry

### Story 5.2: About the Group Page — Leadership, Structure & Credentials

As a **investor or partner visitor**,
I want to see the leadership team, organizational structure, and credentials,
So that I can evaluate the governance and legitimacy of the business.

**Acceptance Criteria:**

**Given** the About page with anchor navigation already in place
**When** the visitor scrolls to the Leadership section
**Then** the Leadership section (#leadership) renders a grid of LeaderCards (4 per row desktop, 2 mobile) with portrait photo (3:4 aspect ratio), name, title, and brief descriptor (max 15 words)
**And** clicking/tapping a LeaderCard opens an expanded LeaderBioPanel (inline expand or modal) with full photo and detailed biography text
**And** the Group Structure section (#group-structure) renders an OrgChart component (SVG or styled HTML) showing the holding company, 3 clusters, and 7 divisions with connecting lines, plus 1-2 explanatory paragraphs and an "Explore Our Divisions" link
**And** the Credentials section (#credentials) renders a grid of CredentialCards (logo/icon + certification name + issuing body), 3 per row, with a "Show All" toggle if more than 6 credentials exist
**And** a CTA Band at the bottom offers "Interested in Working With Us?" with Contact and Explore Divisions buttons
**And** the OrgChart simplifies to a vertical tree on mobile
**And** leader data is sourced from the team content collection and credentials from the credentials collection

### Story 5.3: Investors & Partners Page

As an **investor or partner visitor**,
I want a curated credibility page that makes the strategic case for engagement,
So that I can evaluate whether GRCL is worth a partnership or investment conversation.

**Acceptance Criteria:**

**Given** a visitor navigates to /investors-partners/
**When** the page renders
**Then** Section 1 (Page Hero) displays with premium background, "Investors & Partners" eyebrow, heading "Partner With a Group Built for Scale", and 1-2 sentence investment case framing
**And** Section 2 (Why Partner) renders a 2-column layout: 2-3 strategic case paragraphs left, corporate photography right
**And** Section 3 (Group Capabilities) renders 3 ClusterCards with brief strength statements and links to cluster pages, with intro text about multi-sector value
**And** Section 4 (Portfolio Strength) renders a dark CredibilityBar with 4 investor-relevant stats (revenue scale, operating years, division count, market reach) using StatCounter animations
**And** Section 5 (Governance & Credibility) renders a 2-column layout: leadership preview (top 2-3 leaders with photo, name, title, link to About) left, key credential logos with link to About credentials right
**And** Section 6 (Latest Updates) renders 3 InsightCards with "View All Insights" link (if no articles exist yet, the section displays gracefully with a "Stay informed about our latest developments" message and a link to the contact page — never "Coming Soon")
**And** Section 7 (Strategic Inquiry CTA) renders a gold accent CTABanner with "Start a Conversation" heading and dual buttons linking to /contact/strategic/
**And** breadcrumbs render: Home > Investors & Partners
**And** SEO metadata follows the defined pattern with WebPage + Organization structured data
**And** content is sourced from pages/investors-partners.mdx content collection entry

## Epic 6: Publishing & Thought Leadership

Content owners can publish company-wide and division-specific news and thought leadership. Visitors can browse, filter, and read articles.

### Story 6.1: Insights Hub & Category Listing Pages

As a **visitor**,
I want to browse news, updates, and thought leadership content organized by category,
So that I can stay informed about GRCL and its industries.

**Acceptance Criteria:**

**Given** a visitor navigates to /insights/
**When** the page renders
**Then** a PageHero displays with "Insights" eyebrow, "News, Updates & Thought Leadership" heading, and sub-heading
**And** a featured article section renders the most recent or editorially pinned article as a 2-column FeaturedArticleCard (large image left, category badge + headline + date + excerpt + link right)
**And** a FilterTabs bar renders with tabs: All, News & Updates, Thought Leadership, By Division (dropdown linking to /insights/divisions/[slug]/)
**And** an article grid renders 9 InsightCards in a 3-column grid (1-column mobile) below the tabs
**And** a "Load More" button loads additional articles (9 per load)
**And** an empty state displays "No articles yet in this category. Check back soon." with a link to all insights if no articles exist
**And** sub-pages /insights/latest/, /insights/news/, /insights/thought-leadership/ render using the same publishing-listing template filtered by their respective stream values
**And** /insights/divisions/ renders a taxonomy-hub page with 7 division cards linking to /insights/divisions/[slug]/
**And** /insights/divisions/[slug]/ renders articles filtered to the specific division
**And** breadcrumbs render correctly for all insights pages
**And** SEO metadata includes CollectionPage structured data

### Story 6.2: Article Detail Page

As a **visitor**,
I want to read full articles with professional formatting, sharing, and related content,
So that I can engage deeply with GRCL's thought leadership and stay within the platform.

**Acceptance Criteria:**

**Given** a visitor navigates to /insights/[article-slug]/
**When** the page renders using getStaticPaths for all published articles
**Then** Section 1 (Article Header) displays category badge, article title as H1 (max 120 chars), published date (formatted via formatDate()), reading time (calculated), and optional author name — centered, constrained to ~960px
**And** Section 2 (Hero Image) displays a full-content-width image (16:9 aspect ratio) with optional caption, lazy-loaded with blurred placeholder
**And** Section 3 (Article Body) renders MDX content at ~720px max-width with styled typography (18px base, 1.7 line height), supporting headings H2-H4, paragraphs, images, blockquotes, lists, tables, and code blocks
**And** on desktop, a sticky sidebar renders alongside the body with share links (LinkedIn, Twitter/X, Copy Link), division tag, and content tags
**And** on mobile, sidebar content moves above the article body
**And** Section 4 (Related Articles) shows 3 InsightCards sharing the same division tag or content stream (fallback: latest 3 articles) with a "Back to All Insights" link
**And** Section 5 (CTA) renders a division-specific CTABanner if the article is tagged to a division, otherwise a generic contact CTA
**And** breadcrumbs render: Home > Insights > [Category] > [Article Title]
**And** SEO metadata includes Article/NewsArticle structured data with author, datePublished, image, plus Open Graph tags for social sharing

### Story 6.3: Seed Content & Publishing Workflow

As a **content owner**,
I want seed articles and a clear git-based publishing workflow,
So that the platform launches with content and I understand how to add more.

**Acceptance Criteria:**

**Given** the articles content collection with its Zod schema
**When** seed content is created
**Then** at least 3 seed articles exist in src/content/articles/ as MDX files with frontmatter (title, slug, publishedAt, category/stream, optional divisionSlug, excerpt, featured flag, optional author, optional heroImage)
**And** seed articles span at least 2 different streams (e.g., company-news, thought-leadership) and at least 1 is tagged to a division
**And** article MDX files demonstrate the supported content elements (headings, paragraphs, images, blockquotes, lists)
**And** the build fails if any article is missing required frontmatter fields (Zod validation)
**And** a brief PUBLISHING.md guide in the project root documents how to create and publish new articles via git (create MDX file, fill frontmatter, commit, push to trigger deploy)
**And** the homepage latest insights section, division page related insights, and insights listing pages all correctly query and display the seed articles

## Epic 7: Search, Discovery & Supporting Pages

Visitors can search the platform. Legal pages, sitemap, and 404 are live. Cross-linking is complete.

### Story 7.1: Search Page & Functionality

As a **visitor**,
I want to search the entire platform for pages, divisions, insights, and contacts,
So that I can find what I need quickly when navigation alone is not enough.

**Acceptance Criteria:**

**Given** a visitor navigates to /search/ or clicks the search icon in the header
**When** the search page renders
**Then** a full-width SearchInput is displayed with placeholder "Search for pages, divisions, insights, contacts..." and a submit button
**And** submitting a query updates the URL to /search?q=[query] and displays results
**And** a SearchFilterTabs bar renders with tabs: All, Pages, Divisions, Insights, Contacts — filtering results by type parameter (/search?q=[query]&type=[type])
**And** results count is displayed below the filter bar
**And** each SearchResultCard shows a type badge (division/page/insight/contact), linked title, URL path, excerpt with highlighted search terms, and parent/meta info
**And** "Load More Results" loads 10 additional results per click
**And** a NoResultsState displays when no matches are found: "No results found for '[query]'." with recovery links to Browse Our Divisions, Read Latest Insights, and Contact Us
**And** the search page has noindex, follow robots meta
**And** breadcrumbs render: Home > Search
**And** the SearchOverlay (React island, client:idle) in the header provides a quick search experience that navigates to the search page with results

### Story 7.2: Legal Pages, Sitemap & Custom 404

As a **visitor**,
I want access to legal information, a site overview, and helpful error handling,
So that I can find privacy and terms information and recover gracefully from dead ends.

**Acceptance Criteria:**

**Given** a visitor navigates to /privacy-policy/
**When** the page renders
**Then** a legal page displays with "Privacy Policy" heading, "Last Updated" date, and structured prose content at ~720px max-width with H2-H4 headings covering: Information Collection, Use of Information, Data Protection, Cookies, Third Parties, Your Rights, Contact for Privacy Concerns
**And** breadcrumbs render: Home > Privacy Policy

**Given** a visitor navigates to /terms/
**When** the page renders
**Then** a legal page displays with "Terms of Use" heading and structured legal content covering: terms of use, acceptable use, intellectual property, disclaimers, governing law

**Given** a visitor navigates to /sitemap/
**When** the page renders
**Then** an HTML sitemap displays all public pages organized by section (The Group, Divisions, Insights, Investors & Partners, Contact, Legal), mirroring the footer structure in an expanded fully-linked format

**Given** a visitor navigates to a non-existent URL
**When** the 404 page renders
**Then** a custom 404 page displays a clear "Page Not Found" message with navigation back to the homepage and links to key sections (Divisions, Contact, Insights)

### Story 7.3: Internal Cross-Linking & Discovery Pathways

**Dependencies:** Epics 1-6 must be complete. This is an integration story that verifies and completes cross-page navigation across the full platform.

As a **visitor**,
I want connected navigation between related content across the platform,
So that I can move between divisions, insights, contacts, and corporate pages without hitting dead ends.

**Acceptance Criteria:**

**Given** the complete platform with all pages built (Epics 1-6 complete)
**When** a visitor browses any page
**Then** division pages link to their cluster page, related divisions in the same cluster, division-specific inquiry form, and division-specific insights
**And** cluster pages link to all member divisions, cluster-filtered insights, and cluster-relevant contact paths
**And** insight articles link to their tagged division page (if applicable), related articles, and the insights hub
**And** the Investors & Partners page links to About (leadership, credentials), cluster pages, and strategic contact
**And** the About page links to divisions hub (from org chart), insights, and contact
**And** every page has a CTABanner linking to relevant contact or division pages
**And** footer links cover all major sections and are verified functional
**And** no internal links result in 404 errors

## Epic 8: Quality, Performance & Production Launch

The platform is tested, accessible, performant, and deployed to production.

### Story 8.1: Unit & Component Testing

As a **developer**,
I want comprehensive automated tests for core logic and interactive components,
So that regressions are caught before deployment.

**Acceptance Criteria:**

**Given** the Vitest testing framework
**When** unit tests are run
**Then** Zod schema tests validate all 6 content collection schemas (valid data passes, invalid data fails with correct errors)
**And** utility function tests cover formatDate(), cn(), and division/cluster lookup helpers (getDivisionBySlug, getClusterDivisions, getDivisionsByCluster)
**And** email routing logic tests verify correct destination team selection for all inquiry types (general, 7 divisions, strategic)
**And** contact form validation tests verify all Zod schemas for all 3 form variants

**Given** Vitest + Testing Library
**When** component tests are run
**Then** InquiryForm component tests cover: all 3 form variants rendering correctly, inline validation on blur, submission flow (loading/success/error states), division selector pre-selection
**And** MobileNav component tests cover: toggle open/close, accordion expand/collapse, accessibility (focus trap, escape close)
**And** all tests pass in CI

### Story 8.2: E2E Testing & Accessibility Audit

As a **visitor**,
I want the platform to be fully functional and accessible across all pages,
So that I have a reliable, inclusive experience regardless of how I access the site.

**Acceptance Criteria:**

**Given** Playwright test suite
**When** E2E tests run
**Then** navigation flow tests verify: homepage → division page → contact form submission (mocked API), homepage → insights → article detail, homepage → about → investors & partners
**And** contact form E2E tests verify: successful submission with valid data, validation error display with invalid data, form confirmation state
**And** responsive breakpoint tests verify: mobile navigation (Sheet drawer), tablet layout, desktop full navigation — at sm, md, lg, xl breakpoints

**Given** Playwright + axe-core
**When** accessibility tests run
**Then** every page template (homepage, about, division hub, division detail, cluster, insights hub, article detail, contact hub, contact form, investors, search, legal, sitemap) passes axe-core WCAG 2.1 AA checks with zero violations
**And** single H1 per page is verified on every template
**And** heading hierarchy (no skipped levels) is verified on every template
**And** all interactive elements have visible focus indicators

### Story 8.3: Performance Optimization & Lighthouse Audit

As a **visitor on a mobile device with constrained bandwidth**,
I want the platform to load fast and feel responsive,
So that I perceive GRCL as a business that respects my time and context.

**Acceptance Criteria:**

**Given** the production build
**When** Lighthouse is run on key pages (homepage, division detail, insights hub, contact, about)
**Then** all key pages achieve Lighthouse scores of 90+ across Performance, Accessibility, SEO, and Best Practices on mobile
**And** First Contentful Paint is under 1.5s on simulated 4G
**And** Largest Contentful Paint is under 2.5s on simulated 4G
**And** Cumulative Layout Shift is under 0.1
**And** initial page weight is under 500KB for key pages
**And** all images are optimized via Astro Image/Picture with WebP/AVIF conversion
**And** below-fold sections are lazy-loaded
**And** only interactive islands ship JavaScript (zero JS for static pages without islands)
**And** fonts load with font-display: swap and critical weights are preloaded

### Story 8.4: CI/CD Pipeline & Production Deployment

As a **developer and content owner**,
I want automated quality gates and seamless deployment,
So that every change is validated before going live and the site stays stable.

**Acceptance Criteria:**

**Given** a GitHub repository with the platform codebase
**When** a pull request is created
**Then** a GitHub Actions CI workflow runs: lint, type-check, unit tests, and build — the PR is blocked if any step fails
**And** Vercel creates an automatic preview deployment with a unique URL for the PR
**And** E2E and accessibility tests run against the preview deployment
**And** Lighthouse CI runs on key pages in the preview deployment

**Given** a merge to the main branch
**When** the merge completes
**Then** Vercel automatically deploys to production
**And** the production site is accessible at the Vercel URL
**And** environment variables (RESEND_API_KEY, CONTACT_EMAIL_DEFAULT, SITE_URL, PUBLIC_SITE_NAME) are configured in Vercel dashboard
**And** HTTPS is enforced automatically via Vercel
**And** the deployment is rollback-safe via Vercel's deployment history
**And** robots.txt allows all public pages and disallows /api/ and search result pages
**And** XML sitemap is generated for all public routes
