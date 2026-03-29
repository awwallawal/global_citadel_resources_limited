# Information Architecture -- Global Resources Citadel Limited (GRCL)

> **Companion Document:** This IA specification is a companion to the [UX Design Specification](./ux-design-specification.md). The UX spec defines experience goals, emotional targets, and interaction principles. This document defines the structural implementation: navigation, routing, page layouts, content specifications, and component requirements needed to build every page.
>
> **Visual Reference:** See [design-reference-final.html](./design-reference-final.html) for the rendered composite design direction (Narrative Bold hero + Editorial Premium body + hybrid footer). See [brand-identity.md](./brand-identity.md) for the canonical brand identity (Direction 2 — GRC Monogram + Stacked Wordmark).

**Author:** Sally (Senior UX Designer)
**Date:** 2026-03-27
**Status:** Complete Draft

---

## Document Purpose

This document is the single source of truth for the information architecture of the Global Resources Citadel Limited (GRCL) corporate website. It provides:

1. Navigation hierarchy with ASCII wireframe diagrams for header, footer, and mobile states
2. A complete route map table covering every page in the platform
3. Per-page content specifications with ASCII wireframe layouts showing actual content structure
4. Component requirements for every section on every page

A developer should be able to build every page from this document alone without needing to interpret intent or guess at structure.

---

## Key Decisions Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| D1 | 6 primary nav items + utility search + CTA button | Keeps cognitive load manageable; 7 divisions hidden behind "Divisions" dropdown prevents overwhelm | 2026-03-27 |
| D2 | Divisions grouped into 3 clusters: Agriculture & Processing, Trade & Markets, Built Environment & Energy | Prevents flat 7-item list; creates meaningful business logic grouping; mirrors strategic hierarchy | 2026-03-27 |
| D3 | Homepage uses Bento grid for division presentation | Encodes strategic hierarchy visually -- core divisions get larger cards, supporting get standard, aspirational get compact | 2026-03-27 |
| D4 | Investors & Partners gets dedicated top-level nav position | Primary audience journey for credibility; cannot be buried under About | 2026-03-27 |
| D5 | Contact is a routing architecture, not a single form | Division-specific inquiry paths are a core product requirement per PRD | 2026-03-27 |
| D6 | Search is a utility, not a primary nav peer | Search supplements navigation; it does not replace structured wayfinding | 2026-03-27 |
| D7 | Insights section supports both company-wide and division-specific streams | Content freshness is a credibility signal; division-level publishing creates SEO depth | 2026-03-27 |
| D8 | Deep forest green (#15803D) primary + warm gold (#B48A3E) accent colour system | Premium, trustworthy palette that differentiates from generic corporate blue; gold for CTAs and premium moments | 2026-03-27 |
| D9 | About the Group is a single long-form page, not a sub-section hub | Reduces click depth; all corporate narrative on one authoritative page with anchor navigation | 2026-03-27 |
| D10 | Division pages follow a 5-section structural pattern | Consistency across all 7 divisions; pattern-based development; no one-off layouts | 2026-03-27 |

---

## 1. Navigation Hierarchy

### 1.1 Desktop Header Navigation

```
+-------------------------------------------------------------------------------------------+
|  [LOGO]     Home   About the Group   Divisions v   Insights   Investors & Partners   Contact   [Search Icon]   [Get In Touch] |
+-------------------------------------------------------------------------------------------+
                                          |
                                          v (Dropdown / Mega Menu on hover/click)
                          +-----------------------------------------------+
                          |  DIVISIONS                                     |
                          |                                                |
                          |  Agriculture & Processing                      |
                          |    Crop Farming                                |
                          |    Animal Husbandry                            |
                          |    Agro-Processing                             |
                          |                                                |
                          |  Trade & Markets                               |
                          |    Commodity Marketing                         |
                          |    Import & Export                              |
                          |                                                |
                          |  Built Environment & Energy                    |
                          |    Real Estate                                  |
                          |    Oil & Gas                                    |
                          |                                                |
                          |  [View All Divisions ->]                       |
                          +-----------------------------------------------+
```

**Header Behaviour:**
- Logo links to homepage
- All L1 items are direct links except "Divisions" which triggers dropdown
- Dropdown groups divisions into 3 clusters with cluster labels as non-clickable headings
- Each division name within the dropdown is a direct link to that division page
- "View All Divisions" link at bottom of dropdown goes to `/divisions/`
- Search icon opens a search overlay or navigates to `/search/`
- "Get In Touch" is the primary CTA button, links to `/contact/`
- Header is sticky on scroll with reduced height after scrolling past hero
- On scroll, header background becomes solid (from transparent overlay on hero)

### 1.2 Footer Navigation

```
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  [LOGO]                                                                                   |
|  Brief company tagline or positioning statement                                           |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  THE GROUP              DIVISIONS                INSIGHTS            GET IN TOUCH          |
|  About the Group        Crop Farming             Latest              General Enquiries     |
|  Leadership             Animal Husbandry         News & Updates      Contact by Division   |
|  Group Structure        Agro-Processing          Thought Leadership  Partner / Investor    |
|  Credentials            Commodity Marketing                          Locations             |
|                         Real Estate              CONNECT                                  |
|  INVESTORS &            Import & Export           LinkedIn                                 |
|  PARTNERS               Oil & Gas                 Twitter / X                              |
|  Why Partner With Us                              Email                                   |
|  Portfolio Strength                                                                       |
|  Strategic Inquiry                                                                        |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  (c) 2026 Global Resources Citadel Limited. All rights reserved.     Privacy Policy  |  Terms  |  Sitemap  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Footer Behaviour:**
- Full sitemap-style footer with 4 primary columns
- Logo and tagline above the column grid
- Social links grouped under "Connect"
- Legal links and copyright in a bottom bar
- Footer is consistent across all pages
- Mobile footer stacks columns vertically with accordion behaviour for each group

### 1.3 Mobile Navigation

```
+------------------------------------------+
|  [LOGO]           [Search] [Hamburger]   |
+------------------------------------------+
           |
           v (Hamburger opens full-screen overlay)
+------------------------------------------+
|                                     [X]  |
|                                          |
|  Home                                    |
|  About the Group                         |
|  Divisions                          [+]  |
|  Insights                                |
|  Investors & Partners                    |
|  Contact                                 |
|                                          |
|  +------------------------------------+  |
|  |       Get In Touch (CTA)           |  |
|  +------------------------------------+  |
|                                          |
|  [Search Icon] Search the site           |
|                                          |
+------------------------------------------+

           Divisions expanded [+] -> [-]:
+------------------------------------------+
|                                     [X]  |
|                                          |
|  Home                                    |
|  About the Group                         |
|  Divisions                          [-]  |
|                                          |
|    Agriculture & Processing         [+]  |
|    Trade & Markets                  [+]  |
|    Built Environment & Energy       [+]  |
|    View All Divisions                    |
|                                          |
|  Insights                                |
|  Investors & Partners                    |
|  Contact                                 |
|                                          |
+------------------------------------------+

           Agriculture & Processing expanded:
+------------------------------------------+
|    Agriculture & Processing         [-]  |
|      Crop Farming                        |
|      Animal Husbandry                    |
|      Agro-Processing                     |
+------------------------------------------+
```

**Mobile Navigation Behaviour:**
- Hamburger menu triggers full-screen overlay from the right
- L1 items listed vertically with clear touch targets (min 44px height)
- "Divisions" has an expand/collapse toggle showing 3 cluster groups
- Each cluster group has its own expand/collapse toggle showing member divisions
- Primary CTA button appears prominently within the mobile menu
- Search accessible both in header bar and within menu
- Close button (X) in top-right of overlay
- Body scroll locked when menu is open
- Menu state resets on navigation

### 1.4 Complete Route Map

| # | Route | Page Title | Parent | Template | Nav Level |
|---|-------|-----------|--------|----------|-----------|
| P01 | `/` | Home | -- | `homepage-landing` | L1 |
| P02 | `/about/` | About the Group | -- | `corporate-narrative` | L1 |
| P03 | `/divisions/` | Our Divisions | -- | `division-hub` | L1 |
| P04 | `/divisions/agriculture-processing/` | Agriculture & Processing | P03 | `division-cluster` | L2 |
| P05 | `/divisions/trade-markets/` | Trade & Markets | P03 | `division-cluster` | L2 |
| P06 | `/divisions/built-environment-energy/` | Built Environment & Energy | P03 | `division-cluster` | L2 |
| P07 | `/divisions/crop-farming/` | Crop Farming | P04 | `division-detail` | L3 |
| P08 | `/divisions/animal-husbandry/` | Animal Husbandry | P04 | `division-detail` | L3 |
| P09 | `/divisions/agro-processing/` | Agro-Processing | P04 | `division-detail` | L3 |
| P10 | `/divisions/commodity-marketing/` | Commodity Marketing | P05 | `division-detail` | L3 |
| P11 | `/divisions/import-export/` | Import & Export | P05 | `division-detail` | L3 |
| P12 | `/divisions/real-estate/` | Real Estate | P06 | `division-detail` | L3 |
| P13 | `/divisions/oil-gas/` | Oil & Gas | P06 | `division-detail` | L3 |
| P14 | `/insights/` | Insights | -- | `publishing-hub` | L1 |
| P15 | `/insights/latest/` | Latest Insights | P14 | `publishing-listing` | L2 |
| P16 | `/insights/news/` | News & Updates | P14 | `publishing-listing` | L2 |
| P17 | `/insights/thought-leadership/` | Thought Leadership | P14 | `publishing-listing` | L2 |
| P18 | `/insights/divisions/` | Insights by Division | P14 | `taxonomy-hub` | L2 |
| P19 | `/insights/divisions/[division-slug]/` | [Division] Insights | P18 | `publishing-listing` | L3 |
| P20 | `/insights/[article-slug]/` | [Article Title] | P14 | `article-detail` | L3 |
| P21 | `/investors-partners/` | Investors & Partners | -- | `partner-hub` | L1 |
| P22 | `/contact/` | Contact | -- | `contact-hub` | L1 |
| P23 | `/contact/general/` | General Enquiries | P22 | `contact-form` | L2 |
| P24 | `/contact/divisions/` | Contact by Division | P22 | `contact-directory` | L2 |
| P25 | `/contact/divisions/[division-slug]/` | [Division] Enquiry | P24 | `contact-form` | L3 |
| P26 | `/contact/strategic/` | Partner & Investor Contact | P22 | `contact-form` | L2 |
| P27 | `/contact/locations/` | Locations | P22 | `location-directory` | L2 |
| P28 | `/search/` | Search | -- | `search-results` | Utility |
| P29 | `/privacy-policy/` | Privacy Policy | -- | `legal-page` | Footer |
| P30 | `/terms/` | Terms of Use | -- | `legal-page` | Footer |
| P31 | `/sitemap/` | Sitemap | -- | `sitemap-page` | Footer |

**Dynamic Route Patterns:**
- `/insights/divisions/[division-slug]/` resolves to one of 7 division insight listings
- `/insights/[article-slug]/` resolves to individual article pages
- `/contact/divisions/[division-slug]/` resolves to one of 7 division-specific inquiry forms

---

## 2. Homepage (P01: `/`)

### 2.1 Page Purpose

The homepage is the orientation layer. It must answer three questions in under 10 seconds: What is this company? What does it do? Why should I care? It must then provide clear pathways for each audience type to find what they need next.

### 2.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV - sticky, transparent overlay on hero]                                       |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                           SECTION 1: HERO NARRATIVE                                       |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Full-width background: cinematic image or subtle video loop]                      |  |
|  |                                                                                     |  |
|  |     [Company Name / Wordmark]                                                       |  |
|  |                                                                                     |  |
|  |     Headline: Corporate identity statement                                          |  |
|  |     (e.g., "Building Nigeria's Future Across Agriculture,                           |  |
|  |      Trade, and Infrastructure")                                                    |  |
|  |                                                                                     |  |
|  |     Sub-headline: One-line value proposition                                        |  |
|  |     (e.g., "A diversified conglomerate delivering value                             |  |
|  |      from farm to market to city")                                                  |  |
|  |                                                                                     |  |
|  |     [Explore Our Divisions]  [Partner With Us]                                      |  |
|  |     (Primary CTA btn)        (Secondary CTA btn)                                    |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                      SECTION 2: WHAT WE DO / BUSINESS OVERVIEW                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Section Label: "What We Do"                                                        |  |
|  |  Heading: "A Multi-Division Business Built for Scale"                               |  |
|  |                                                                                     |  |
|  |  Body: 2-3 sentences explaining the breadth of the conglomerate.                    |  |
|  |  This paragraph frames the company as intentionally diversified,                    |  |
|  |  not accidentally scattered.                                                        |  |
|  |                                                                                     |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |  | [Icon]           |  | [Icon]           |  | [Icon]           |                   |  |
|  |  | Agriculture &    |  | Trade &          |  | Built Environ-   |                   |  |
|  |  | Processing       |  | Markets          |  | ment & Energy    |                   |  |
|  |  | Brief descriptor |  | Brief descriptor |  | Brief descriptor |                   |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                       SECTION 3: DIVISIONS BENTO GRID                                     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Section Label: "Our Divisions"                                                     |  |
|  |  Heading: "Seven Verticals. One Vision."                                            |  |
|  |                                                                                     |  |
|  |  +---------------------------------------+  +------------------+                    |  |
|  |  |                                       |  |                  |                    |  |
|  |  |  CROP FARMING  (LARGE CARD)           |  | ANIMAL HUSBANDRY |                    |  |
|  |  |  [Background image]                   |  | (STANDARD CARD)  |                    |  |
|  |  |  Division name                        |  | [Image]          |                    |  |
|  |  |  Brief description (2 lines)          |  | Division name    |                    |  |
|  |  |  [Learn More ->]                      |  | Brief desc       |                    |  |
|  |  |                                       |  | [Learn More ->]  |                    |  |
|  |  +---------------------------------------+  +------------------+                    |  |
|  |                                                                                     |  |
|  |  +------------------+  +---------------------------------------+                    |  |
|  |  | AGRO-PROCESSING  |  |                                       |                    |  |
|  |  | (STANDARD CARD)  |  |  COMMODITY MARKETING  (LARGE CARD)    |                    |  |
|  |  | [Image]          |  |  [Background image]                   |                    |  |
|  |  | Division name    |  |  Division name                        |                    |  |
|  |  | Brief desc       |  |  Brief description (2 lines)          |                    |  |
|  |  | [Learn More ->]  |  |  [Learn More ->]                      |                    |  |
|  |  +------------------+  +---------------------------------------+                    |  |
|  |                                                                                     |  |
|  |  +------------------+  +------------+  +------------+                               |  |
|  |  | IMPORT & EXPORT  |  | REAL ESTATE|  | OIL & GAS  |                               |  |
|  |  | (STANDARD CARD)  |  | (COMPACT)  |  | (COMPACT)  |                               |  |
|  |  | [Image]          |  | [Icon]     |  | [Icon]     |                               |  |
|  |  | Division name    |  | Name       |  | Name       |                               |  |
|  |  | Brief desc       |  | [->]       |  | [->]       |                               |  |
|  |  | [Learn More ->]  |  +------------+  +------------+                               |  |
|  |  +------------------+                                                               |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 4: CREDIBILITY SIGNALS                                        |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Dark background band - contrasting section]                                       |  |
|  |                                                                                     |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |  |  [NUM]   |  |  [NUM]   |  |  [NUM]   |  |  [NUM]   |                             |  |
|  |  | Years in |  | Business |  | Divisions|  | States / |                             |  |
|  |  | Business |  | Partners |  | Active   |  | Regions  |                             |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |                                                                                     |  |
|  |  Optional: Certification logos / partner logos row                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   SECTION 5: LATEST INSIGHTS / THOUGHT LEADERSHIP                         |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Section Label: "Insights"                                                          |  |
|  |  Heading: "Latest from Global Resources Citadel Limited"                                              |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  | [Thumbnail image]   |  | [Thumbnail image]   |  | [Thumbnail image]   |          |  |
|  |  | Category tag        |  | Category tag        |  | Category tag        |          |  |
|  |  | Article headline    |  | Article headline    |  | Article headline    |          |  |
|  |  | Date                |  | Date                |  | Date                |          |  |
|  |  | Brief excerpt       |  | Brief excerpt       |  | Brief excerpt       |          |  |
|  |  | [Read More ->]      |  | [Read More ->]      |  | [Read More ->]      |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  |  [View All Insights ->]                                                             |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                      SECTION 6: CONTACT / INQUIRY CTA                                     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Warm background - gold accent or subtle gradient]                                 |  |
|  |                                                                                     |  |
|  |  Heading: "Ready to Work With Us?"                                                  |  |
|  |  Sub-text: "Whether you're a potential partner, customer, or investor,              |  |
|  |  we'd like to hear from you."                                                       |  |
|  |                                                                                     |  |
|  |  [Contact Us]          [Partner With Us]                                            |  |
|  |  (Primary CTA btn)     (Secondary CTA btn)                                         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 2.3 Section Specifications

#### Section 1: Hero Narrative

| Attribute | Value |
|-----------|-------|
| Purpose | Establish corporate identity and visual authority within 3 seconds |
| Background | Full-bleed cinematic image or subtle ambient video loop (15-20s, no audio) |
| Headline | Max 15 words. Corporate positioning statement. |
| Sub-headline | Max 25 words. Value proposition clarification. |
| CTA Primary | "Explore Our Divisions" -> `/divisions/` |
| CTA Secondary | "Partner With Us" -> `/investors-partners/` |
| Height | 85-100vh on desktop, 75vh on mobile |
| Overlay | Dark gradient from bottom to ensure text legibility |
| Motion | Subtle parallax on scroll (desktop only). Respect prefers-reduced-motion. |

**Components Required:**
- `HeroSection` -- full-bleed background with text overlay
- `ButtonPrimary` -- green filled button
- `ButtonSecondary` -- ghost/outline button on dark background

#### Section 2: What We Do / Business Overview

| Attribute | Value |
|-----------|-------|
| Purpose | Frame the conglomerate as deliberately diversified, not randomly scattered |
| Section Label | Uppercase small text, gold accent colour |
| Heading | Max 10 words |
| Body Copy | 2-3 sentences, max 60 words |
| Cluster Cards | 3 cards, one per division cluster |
| Card Content | Icon + Cluster name + 1-line descriptor |
| Card Behaviour | Clickable, links to respective cluster page |
| Background | White / light neutral (#F9FAFB) |

**Components Required:**
- `SectionHeader` -- label + heading + optional body
- `ClusterCard` -- icon, title, descriptor, link
- `ThreeColumnGrid` -- responsive 3-col to 1-col layout

#### Section 3: Divisions Bento Grid

| Attribute | Value |
|-----------|-------|
| Purpose | Present all 7 divisions with strategic visual hierarchy |
| Layout | Bento grid with variable card sizes encoding business hierarchy |
| Large Cards | Core divisions (Crop Farming, Commodity Marketing) -- 2:1 aspect ratio |
| Standard Cards | Supporting divisions (Animal Husbandry, Agro-Processing, Import & Export) -- 1:1 aspect ratio |
| Compact Cards | Aspirational divisions (Real Estate, Oil & Gas) -- compact horizontal layout |
| Card Content | Background image or icon + Division name + Brief description + "Learn More" link |
| Hover State | Subtle scale transform + overlay darkening on desktop |
| Mobile | Stack to single column, all cards become uniform height |
| Background | Light neutral |

**Components Required:**
- `BentoGrid` -- responsive CSS Grid layout with named areas
- `DivisionCardLarge` -- image background, overlay text, link
- `DivisionCardStandard` -- image, title, description, link
- `DivisionCardCompact` -- icon, title, arrow link

#### Section 4: Credibility Signals

| Attribute | Value |
|-----------|-------|
| Purpose | Build trust through quantifiable proof points |
| Background | Dark (primary-900 or neutral-900) for visual contrast |
| Stat Count | 4 key metrics |
| Stat Format | Large animated number + descriptor label |
| Animation | Count-up animation on scroll into view (intersection observer) |
| Optional Row | Certification logos or key partner logos, displayed as a horizontal scroll |
| Text Colour | White on dark background |
| Mobile | 2x2 grid for stats |

**Components Required:**
- `CredibilityBar` -- dark-background section container
- `StatCounter` -- animated number + label
- `LogoRow` -- horizontal scroll of partner/certification logos

#### Section 5: Latest Insights

| Attribute | Value |
|-----------|-------|
| Purpose | Signal organisational activity and thought leadership |
| Card Count | 3 featured articles |
| Card Content | Thumbnail image + category tag + headline + date + excerpt (max 2 lines) + read more link |
| Source | Latest 3 published articles (company-wide or featured) |
| CTA | "View All Insights" -> `/insights/` |
| Background | White |
| Mobile | Horizontal scroll carousel or vertical stack |

**Components Required:**
- `SectionHeader` -- reuse from Section 2
- `InsightCard` -- thumbnail, category badge, headline, date, excerpt, link
- `CardGrid` -- 3-column responsive grid
- `ViewAllLink` -- text link with arrow

#### Section 6: Contact / Inquiry CTA

| Attribute | Value |
|-----------|-------|
| Purpose | Convert interest into action; provide clear next step |
| Background | Warm accent (gold gradient or subtle green-to-gold) |
| Heading | Max 8 words, direct and inviting |
| Body | Max 30 words, addresses all audience types |
| CTA Primary | "Contact Us" -> `/contact/` |
| CTA Secondary | "Partner With Us" -> `/investors-partners/strategic-inquiry/` |
| Mobile | Stack CTAs vertically |

**Components Required:**
- `CTABanner` -- full-width accent-background section with centered content
- `ButtonPrimary` -- reuse
- `ButtonSecondary` -- reuse

#### Section 7: FAQ Section

| Attribute | Value |
|-----------|-------|
| Purpose | Address common questions proactively and reduce friction for first-time visitors |
| Layout | Accordion-style, single column, full-width within section container |
| Question Count | 4-6 questions |
| Content Source | `faqs` content collection, filtered by `category="homepage"` |
| Behaviour | One item open at a time; closed by default on load |
| Heading | "Frequently Asked Questions" or short section label |
| Background | Light neutral (matches Section 2 / 5 alternating rhythm) |

**Components Required:**
- `FAQSection` -- accordion container with section heading
- `FAQItem` -- individual question + answer accordion row

### 2.4 Homepage SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Global Resources Citadel Limited -- Multi-Division Conglomerate | Agriculture, Trade, Infrastructure` |
| Description | `Global Resources Citadel Limited is a diversified Nigerian conglomerate operating across agriculture, agro-processing, commodity marketing, real estate, import/export, and oil & gas.` |
| H1 | Hero headline (one per page) |
| Canonical | `https://[domain]/` |
| Schema | `Organization` + `WebSite` structured data |

---

## 3. About the Group (P02: `/about/`)

### 3.1 Page Purpose

This is the corporate trust page. It answers: Who is this company? How is it structured? Why should anyone take it seriously? Designed as a single long-form narrative page with anchor navigation rather than a multi-page section hub.

### 3.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > About the Group                                                       |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                         SECTION 1: PAGE HERO                                              |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Section Label: "About the Group"                                                   |  |
|  |  Heading: "Who We Are"                                                              |  |
|  |  Sub-heading: Positioning statement about the company's mission and scope            |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   ANCHOR NAV (sticky on scroll)                                           |
|                                                                                           |
|  [ Overview | Mission & Vision | Leadership | Group Structure | Credentials | Values ]   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 2: COMPANY OVERVIEW  (#overview)                              |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  [Full-height image or           |  |  Heading: "Our Story"            |         |  |
|  |  |   corporate photography]         |  |                                  |         |  |
|  |  |                                  |  |  Body: 3-4 paragraphs covering   |         |  |
|  |  |                                  |  |  founding, evolution, current     |         |  |
|  |  |                                  |  |  scope, and business philosophy.  |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |                                  |  |  Key fact callouts:               |         |  |
|  |  |                                  |  |  - Founded [Year]                 |         |  |
|  |  |                                  |  |  - Headquarters: [City, Nigeria]  |         |  |
|  |  |                                  |  |  - [X] Divisions                  |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                 SECTION 3: MISSION & VISION  (#mission-vision)                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  MISSION                         |  |  VISION                          |         |  |
|  |  |  [Icon or decorative element]    |  |  [Icon or decorative element]    |         |  |
|  |  |  Statement text                  |  |  Statement text                  |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  |  Optional: Core values as a row of 3-4 value cards below                            |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |  | [Icon]   |  | [Icon]   |  | [Icon]   |  | [Icon]   |                             |  |
|  |  | Value 1  |  | Value 2  |  | Value 3  |  | Value 4  |                             |  |
|  |  | Desc     |  | Desc     |  | Desc     |  | Desc     |                             |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 4: LEADERSHIP  (#leadership)                                   |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Leadership"                                                              |  |
|  |  Sub-heading: Brief framing text about governance and executive team                |  |
|  |                                                                                     |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |  | [Photo]  |  | [Photo]  |  | [Photo]  |  | [Photo]  |                             |  |
|  |  | Name     |  | Name     |  | Name     |  | Name     |                             |  |
|  |  | Title    |  | Title    |  | Title    |  | Title    |                             |  |
|  |  | Brief    |  | Brief    |  | Brief    |  | Brief    |                             |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |                                                                                     |  |
|  |  (Click/tap on a leader card expands a bio panel or opens a modal)                  |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                  SECTION 5: GROUP STRUCTURE  (#group-structure)                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "How Our Divisions Connect"                                               |  |
|  |                                                                                     |  |
|  |  [Visual diagram or infographic showing]:                                           |  |
|  |                                                                                     |  |
|  |           +-------------------+                                                     |  |
|  |           | [COMPANY NAME]    |                                                     |  |
|  |           | Group Holding     |                                                     |  |
|  |           +-------------------+                                                     |  |
|  |           /        |         \                                                      |  |
|  |  +-----------+ +-----------+ +-----------+                                          |  |
|  |  |Agriculture| |Trade &    | |Built Env  |                                          |  |
|  |  |& Process. | |Markets    | |& Energy   |                                          |  |
|  |  +-----------+ +-----------+ +-----------+                                          |  |
|  |  / | \          / \           / \                                                    |  |
|  |  Crop  Animal  Agro  Commodity  Import  Real   Oil                                  |  |
|  |  Farm  Husb.   Proc. Marketing  Export  Estate  Gas                                 |  |
|  |                                                                                     |  |
|  |  Body: 1-2 paragraphs explaining the value chain logic and                          |  |
|  |  how divisions complement each other.                                               |  |
|  |                                                                                     |  |
|  |  [Explore Our Divisions ->]                                                         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|             SECTION 6: CREDENTIALS & CERTIFICATIONS  (#credentials)                       |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Credentials & Certifications"                                            |  |
|  |                                                                                     |  |
|  |  Body: Brief framing text about the company's commitment to standards               |  |
|  |                                                                                     |  |
|  |  +----------+  +----------+  +----------+                                           |  |
|  |  | [Logo]   |  | [Logo]   |  | [Logo]   |                                           |  |
|  |  | Cert     |  | Cert     |  | Cert     |                                           |  |
|  |  | Name     |  | Name     |  | Name     |                                           |  |
|  |  | Issuer   |  | Issuer   |  | Issuer   |                                           |  |
|  |  +----------+  +----------+  +----------+                                           |  |
|  |                                                                                     |  |
|  |  (Expandable if more than 6 credentials)                                            |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 7: CTA BAND                                                   |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Interested in Working With Us?"                                          |  |
|  |  [Contact Us]   [Explore Divisions]                                                 |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 3.3 Section Specifications

#### Section 1: Page Hero

| Attribute | Value |
|-----------|-------|
| Purpose | Establish page context and corporate positioning |
| Background | Subtle pattern or light gradient, not a full-bleed image (differentiate from homepage hero) |
| Section Label | "About the Group" in gold accent |
| Heading | "Who We Are" |
| Sub-heading | Max 30 words, positioning statement |
| Height | Auto, approximately 30-40vh |

**Components Required:**
- `PageHero` -- section label, heading, sub-heading on light/subtle background
- `Breadcrumb` -- standard breadcrumb trail

#### Anchor Navigation

| Attribute | Value |
|-----------|-------|
| Purpose | Allow quick jump to sub-sections on this long page |
| Behaviour | Horizontal scrollable nav bar, sticky below header on scroll |
| Items | Overview, Mission & Vision, Leadership, Group Structure, Credentials, Values |
| Active State | Highlight current section based on scroll position (intersection observer) |
| Mobile | Horizontal scroll with fade indicators |

**Components Required:**
- `AnchorNav` -- sticky horizontal nav with scroll-spy behaviour

#### Section 2: Company Overview

| Attribute | Value |
|-----------|-------|
| Layout | 2-column: image left, text right (stacks on mobile) |
| Image | Corporate photography -- office, operations, or team |
| Body | 3-4 paragraphs, narrative tone |
| Callouts | Key facts in styled callout boxes within the text column |

**Components Required:**
- `TwoColumnSection` -- image + text split layout
- `FactCallout` -- styled inline fact (icon + value + label)

#### Section 3: Mission & Vision

| Attribute | Value |
|-----------|-------|
| Layout | 2-column side-by-side cards, values row below |
| Mission Card | Icon/decorative + heading + statement paragraph |
| Vision Card | Icon/decorative + heading + statement paragraph |
| Values | Optional 3-4 value cards in a row below |

**Components Required:**
- `StatementCard` -- decorative heading + body text
- `ValueCard` -- icon + title + description
- `FourColumnGrid` -- responsive grid

#### Section 4: Leadership

| Attribute | Value |
|-----------|-------|
| Layout | Grid of leader cards, 4 per row desktop, 2 per row mobile |
| Card Content | Portrait photo + name + title + brief descriptor (max 15 words) |
| Interaction | Click/tap opens expanded bio panel (inline expand or modal) |
| Photo | Consistent aspect ratio (3:4 portrait), consistent treatment (e.g., desaturation overlay) |

**Components Required:**
- `LeaderCard` -- photo, name, title, brief descriptor
- `LeaderBioPanel` -- expanded biography with full photo and detailed text
- `CardGrid` -- reuse from homepage

#### Section 5: Group Structure

| Attribute | Value |
|-----------|-------|
| Purpose | Visually explain how divisions relate to the parent company |
| Diagram | SVG or styled HTML org-chart showing holding company -> 3 clusters -> 7 divisions |
| Body | 1-2 paragraphs explaining value chain logic |
| CTA | "Explore Our Divisions" -> `/divisions/` |
| Mobile | Simplified vertical tree layout |

**Components Required:**
- `OrgChart` -- responsive organisational diagram
- `SectionCTA` -- text link with arrow icon

#### Section 6: Credentials & Certifications

| Attribute | Value |
|-----------|-------|
| Layout | Grid of credential cards, 3 per row |
| Card Content | Logo/icon + certification name + issuing body |
| Expansion | If more than 6, show first 6 with "Show All" toggle |
| Future | Supports adding compliance, licenses, and division-specific credentials |

**Components Required:**
- `CredentialCard` -- logo, name, issuer
- `ExpandableGrid` -- grid with show more/less toggle

#### Section 7: FAQ Section

| Attribute | Value |
|-----------|-------|
| Purpose | Pre-empt investor, partner, and general visitor questions about the group's operations and governance |
| Layout | Accordion-style, single column, full-width within section container |
| Question Count | 6-8 questions |
| Content Source | `faqs` content collection, filtered by `category="about"` |
| Behaviour | One item open at a time; closed by default on load |
| Heading | "Frequently Asked Questions" or short section label |
| Background | Light neutral, positioned before the final CTA band |

**Components Required:**
- `FAQSection` -- accordion container with section heading
- `FAQItem` -- individual question + answer accordion row

### 3.4 About Page SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `About Global Resources Citadel Limited -- Our Story, Mission, Leadership & Group Structure` |
| Description | `Learn about Global Resources Citadel Limited, a diversified Nigerian conglomerate. Discover our mission, leadership team, group structure, and credentials across 7 business divisions.` |
| H1 | Page heading |
| Canonical | `https://[domain]/about/` |
| Schema | `Organization` + `AboutPage` structured data |

---

## 4. Divisions Hub (P03: `/divisions/`)

### 4.1 Page Purpose

The divisions hub is the primary discovery engine. It presents all 7 divisions within their 3 cluster groupings, provides clear wayfinding, and lets users identify the right business unit quickly.

### 4.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Divisions                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                          SECTION 1: PAGE HERO                                             |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Section Label: "Our Divisions"                                                     |  |
|  |  Heading: "Built Across Sectors. United by Purpose."                                |  |
|  |  Sub-heading: Brief text framing the diversified business portfolio                  |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|               SECTION 2: AGRICULTURE & PROCESSING CLUSTER                                 |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Cluster Label: "Agriculture & Processing"                                          |  |
|  |  Cluster Description: 1-2 sentences about this group                                |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  |                     |  |                     |  |                     |          |  |
|  |  |  [Division Image]   |  |  [Division Image]   |  |  [Division Image]   |          |  |
|  |  |                     |  |                     |  |                     |          |  |
|  |  |  Crop Farming       |  |  Animal Husbandry   |  |  Agro-Processing    |          |  |
|  |  |  Brief overview     |  |  Brief overview     |  |  Brief overview     |          |  |
|  |  |  (2-3 lines)        |  |  (2-3 lines)        |  |  (2-3 lines)        |          |  |
|  |  |                     |  |                     |  |                     |          |  |
|  |  |  [Explore ->]       |  |  [Explore ->]       |  |  [Explore ->]       |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 3: TRADE & MARKETS CLUSTER                                     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Cluster Label: "Trade & Markets"                                                   |  |
|  |  Cluster Description: 1-2 sentences about this group                                |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  [Division Image]   |  |  [Division Image]   |                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  Commodity Marketing|  |  Import & Export     |                                   |  |
|  |  |  Brief overview     |  |  Brief overview     |                                   |  |
|  |  |  (2-3 lines)        |  |  (2-3 lines)        |                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  [Explore ->]       |  |  [Explore ->]       |                                   |  |
|  |  +---------------------+  +---------------------+                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|              SECTION 4: BUILT ENVIRONMENT & ENERGY CLUSTER                                |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Cluster Label: "Built Environment & Energy"                                        |  |
|  |  Cluster Description: 1-2 sentences about this group                                |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  [Division Image]   |  |  [Division Image]   |                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  Real Estate        |  |  Oil & Gas           |                                   |  |
|  |  |  Brief overview     |  |  Brief overview     |                                   |  |
|  |  |  (2-3 lines)        |  |  (2-3 lines)        |                                   |  |
|  |  |                     |  |                     |                                   |  |
|  |  |  [Explore ->]       |  |  [Explore ->]       |                                   |  |
|  |  +---------------------+  +---------------------+                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                       SECTION 5: CTA BAND                                                 |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  "Looking for a specific capability?"                                               |  |
|  |  [Contact Us]   [Search the Site]                                                   |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 4.3 Section Specifications

#### Section 1: Page Hero

| Attribute | Value |
|-----------|-------|
| Purpose | Set context for division browsing |
| Layout | Centered text, subtle background |
| Section Label | Gold accent text |
| Heading | Corporate positioning for divisions |
| Sub-heading | 1-2 sentences |

**Components Required:** `PageHero`, `Breadcrumb` (reuse)

#### Sections 2-4: Division Cluster Groups

| Attribute | Value |
|-----------|-------|
| Purpose | Group related divisions for scanning efficiency |
| Layout | Cluster heading + description + card row |
| Cards Per Cluster | 2-3 depending on cluster membership |
| Card Content | Division image (16:9 or 4:3) + division name + 2-3 line overview + "Explore" link |
| Card Link | Links to individual division detail page |
| Visual Separation | Each cluster section has subtle background alternation (white / light grey) |
| Mobile | Cards stack vertically, 1 per row |

**Components Required:**
- `ClusterSection` -- heading, description, card grid container
- `DivisionPreviewCard` -- image, title, overview text, link
- `ResponsiveCardGrid` -- adaptive column count based on item count

### 4.4 Divisions Hub SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Our Divisions -- Global Resources Citadel Limited Business Portfolio` |
| Description | `Explore Global Resources Citadel Limited's seven business divisions across agriculture, agro-processing, commodity marketing, real estate, import/export, and oil & gas.` |
| H1 | Page heading |
| Canonical | `https://[domain]/divisions/` |
| Schema | `CollectionPage` structured data |

---

## 5. Division Cluster Pages (P04-P06)

### 5.1 Page Purpose

Each cluster page (Agriculture & Processing, Trade & Markets, Built Environment & Energy) provides a focused entry point for users interested in a specific business sector group. It previews the member divisions and frames the cluster's strategic positioning.

### 5.2 Page Wireframe (Generic -- applies to all 3 cluster pages)

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Divisions > [Cluster Name]                                            |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                          SECTION 1: CLUSTER HERO                                          |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Background: sector-relevant image with dark overlay]                              |  |
|  |                                                                                     |  |
|  |  Section Label: "Division Group"                                                    |  |
|  |  Heading: "[Cluster Name]"                                                          |  |
|  |  Sub-heading: Strategic positioning for this cluster (1-2 sentences)                 |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 2: CLUSTER OVERVIEW                                           |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Body: 2-3 paragraphs explaining the cluster's strategic role within the            |  |
|  |  conglomerate, the value chain connections between member divisions,                 |  |
|  |  and the market opportunity the cluster addresses.                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   SECTION 3: MEMBER DIVISIONS                                             |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Divisions in [Cluster Name]"                                             |  |
|  |                                                                                     |  |
|  |  +------------------------------------------+                                       |  |
|  |  | [Large image]                            |                                       |  |
|  |  | Division Name                            |                                       |  |
|  |  | Overview text (3-4 lines)                |                                       |  |
|  |  | Key capabilities: bullet list (3 items)  |                                       |  |
|  |  | [Explore Division ->]                    |                                       |  |
|  |  +------------------------------------------+                                       |  |
|  |                                                                                     |  |
|  |  (Repeat for each division in this cluster)                                         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 4: RELATED INSIGHTS                                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  Heading: "Latest from [Cluster Name]"                                              |  |
|  |  [InsightCard] [InsightCard] [InsightCard]                                          |  |
|  |  [View All [Cluster] Insights ->]                                                   |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                       SECTION 5: CTA BAND                                                 |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  "Interested in [cluster area]?"                                                    |  |
|  |  [Contact Us About [Cluster]]                                                       |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 5.3 Cluster Page Variations

| Route | Cluster | Member Divisions |
|-------|---------|------------------|
| `/divisions/agriculture-processing/` | Agriculture & Processing | Crop Farming, Animal Husbandry, Agro-Processing |
| `/divisions/trade-markets/` | Trade & Markets | Commodity Marketing, Import & Export |
| `/divisions/built-environment-energy/` | Built Environment & Energy | Real Estate, Oil & Gas |

**Components Required:**
- `PageHero` -- with background image variant (reuse with dark-overlay modifier)
- `Breadcrumb` -- reuse
- `ProseSection` -- heading + body text block
- `DivisionFeatureCard` -- large image, title, overview, capability bullets, link
- `InsightCard` -- reuse from homepage
- `CTABanner` -- reuse with variable text

---

## 6. Division Detail Pages (P07-P13)

### 6.1 Page Purpose

Each division detail page is where trust converts to inquiry. Users who reach this page have already identified the right business unit. The page must communicate competence, provide enough depth to build confidence, and offer a clear division-specific inquiry path. All 7 divisions use the same 5-section structural pattern.

### 6.2 Page Wireframe (Generic -- applies to all 7 division pages)

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Divisions > [Cluster Name] > [Division Name]                          |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|              SECTION 1: DIVISION OVERVIEW & POSITIONING                                   |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Hero image: full-width, sector-specific photography]                              |  |
|  |                                                                                     |  |
|  |  Section Label: "[Cluster Name]"                                                    |  |
|  |  Heading: "[Division Name]"                                                         |  |
|  |  Sub-heading: Division positioning statement (max 30 words)                          |  |
|  |                                                                                     |  |
|  |  Body: 2-3 paragraphs explaining the division -- what it does,                      |  |
|  |  its market position, and why it matters within the group.                           |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|            SECTION 2: CAPABILITIES / PRODUCTS / SERVICES                                  |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "What We Offer" or "Our Capabilities"                                     |  |
|  |                                                                                     |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |  |                  |  |                  |  |                  |                   |  |
|  |  | [Icon]           |  | [Icon]           |  | [Icon]           |                   |  |
|  |  | Capability 1     |  | Capability 2     |  | Capability 3     |                   |  |
|  |  | Description      |  | Description      |  | Description      |                   |  |
|  |  | (2-3 lines)      |  | (2-3 lines)      |  | (2-3 lines)      |                   |  |
|  |  |                  |  |                  |  |                  |                   |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |                                                                                     |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |  | Capability 4     |  | Capability 5     |  | Capability 6     |                   |  |
|  |  | (optional row)   |  | (optional row)   |  | (optional row)   |                   |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|             SECTION 3: PROOF / CREDENTIALS / OPERATING SIGNALS                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Dark or accent background band]                                                   |  |
|  |                                                                                     |  |
|  |  Heading: "Our Track Record" or "Operational Credentials"                           |  |
|  |                                                                                     |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |  | [Stat]   |  | [Stat]   |  | [Stat]   |  | [Stat]   |                             |  |
|  |  | Metric 1 |  | Metric 2 |  | Metric 3 |  | Metric 4 |                             |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |                                                                                     |  |
|  |  Optional: Division-specific certifications or partner logos                         |  |
|  |                                                                                     |  |
|  |  Optional: Brief testimonial or operating proof text                                |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                 SECTION 4: RELATED INSIGHTS / UPDATES                                     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Latest in [Division Name]"                                               |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  | [InsightCard]       |  | [InsightCard]       |  | [InsightCard]       |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  |  [View All [Division] Insights ->]                                                  |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|              SECTION 5: DIVISION-SPECIFIC INQUIRY PATH                                    |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Accent background -- gold or green gradient]                                      |  |
|  |                                                                                     |  |
|  |  Heading: "Interested in [Division Name]?"                                          |  |
|  |  Body: "Get in touch with our [division] team to discuss your needs."               |  |
|  |                                                                                     |  |
|  |  [Contact Our [Division] Team]                                                      |  |
|  |  (Links to /contact/divisions/[division-slug]/)                                     |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 6.3 Division Page Specifications

| Route | Division | Cluster Parent | Slug |
|-------|----------|----------------|------|
| `/divisions/crop-farming/` | Crop Farming | Agriculture & Processing | `crop-farming` |
| `/divisions/animal-husbandry/` | Animal Husbandry | Agriculture & Processing | `animal-husbandry` |
| `/divisions/agro-processing/` | Agro-Processing | Agriculture & Processing | `agro-processing` |
| `/divisions/commodity-marketing/` | Commodity Marketing | Trade & Markets | `commodity-marketing` |
| `/divisions/import-export/` | Import & Export | Trade & Markets | `import-export` |
| `/divisions/real-estate/` | Real Estate | Built Environment & Energy | `real-estate` |
| `/divisions/oil-gas/` | Oil & Gas | Built Environment & Energy | `oil-gas` |

### 6.4 Section Specifications

#### Section 1: Division Overview & Positioning

| Attribute | Value |
|-----------|-------|
| Hero Image | Full-width, sector-specific photography (e.g., farmland for Crop Farming, port activity for Import & Export) |
| Section Label | Cluster name in gold accent -- establishes context |
| Heading | Division name as H1 |
| Sub-heading | Max 30 words -- division positioning statement |
| Body | 2-3 paragraphs, narrative tone, explains the division's role and market position |
| Background | White below the hero image |

**Components Required:**
- `DivisionHero` -- full-width image with text overlay (variant of `PageHero`)
- `Breadcrumb` -- 4-level breadcrumb
- `ProseSection` -- reuse

#### Section 2: Capabilities / Products / Services

| Attribute | Value |
|-----------|-------|
| Purpose | Demonstrate specific competence and offering breadth |
| Layout | 3-column grid of capability cards, expanding to 6 max |
| Card Content | Icon + capability name + 2-3 line description |
| Card Count | 3-6 per division (varies by content readiness) |
| Background | Light grey alternation (#F9FAFB) |
| Mobile | 1-column stack |

**Components Required:**
- `CapabilityCard` -- icon, title, description (no link needed)
- `ThreeColumnGrid` -- reuse

#### Section 3: Proof / Credentials / Operating Signals

| Attribute | Value |
|-----------|-------|
| Purpose | Build division-specific trust through evidence |
| Background | Dark band (primary-900 or neutral-800) for visual weight |
| Stats | 3-4 division-specific metrics with animated count-up |
| Certifications | Optional row of division-relevant certification logos |
| Testimonial | Optional brief text quote or operating proof statement |
| Mobile | 2x2 grid for stats, vertical stack for certifications |

**Components Required:**
- `CredibilityBar` -- reuse from homepage
- `StatCounter` -- reuse
- `LogoRow` -- reuse
- `TestimonialQuote` -- optional styled quote block

#### Section 4: Related Insights / Updates

| Attribute | Value |
|-----------|-------|
| Purpose | Show the division is active and producing content |
| Source | Latest 3 articles tagged with this division |
| Fallback | If no division-specific articles exist, show latest company-wide articles |
| CTA | Links to `/insights/divisions/[division-slug]/` |
| Mobile | Horizontal carousel or vertical stack |

**Components Required:**
- `InsightCard` -- reuse
- `CardGrid` -- reuse
- `ViewAllLink` -- reuse

#### Section 5: Division-Specific Inquiry Path

| Attribute | Value |
|-----------|-------|
| Purpose | Convert interest into inquiry |
| Background | Gold accent or green gradient |
| Heading | "Interested in [Division Name]?" |
| Body | 1 sentence, addresses prospect directly |
| CTA | Links to `/contact/divisions/[division-slug]/` |
| Variant | This is NOT a generic "Contact Us." The CTA text and destination are division-specific. |

**Components Required:**
- `CTABanner` -- reuse with dynamic text and link

### 6.5 Division Detail SEO

| Meta Attribute | Pattern |
|----------------|---------|
| Title | `[Division Name] -- Global Resources Citadel Limited | [Cluster Name]` |
| Description | `Explore Global Resources Citadel Limited's [Division Name] division. Learn about our capabilities in [key areas] and connect with our team.` |
| H1 | Division name |
| Canonical | `https://[domain]/divisions/[division-slug]/` |
| Schema | `Organization` (department) + `WebPage` structured data |

---

## 7. Insights Hub (P14: `/insights/`)

### 7.1 Page Purpose

The Insights hub is the freshness and authority layer. It proves the organisation is active, creates SEO depth, and provides content that supports all audience journeys. It serves as the entry point for all publishing -- company-wide and division-specific.

### 7.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Insights                                                              |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                          SECTION 1: PAGE HERO                                             |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  Section Label: "Insights"                                                          |  |
|  |  Heading: "News, Updates & Thought Leadership"                                      |  |
|  |  Sub-heading: "Stay informed about Global Resources Citadel Limited and our industries."               |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 2: FEATURED ARTICLE                                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  [Large featured image]          |  |  Category badge                  |         |  |
|  |  |                                  |  |  Headline (large)                |         |  |
|  |  |                                  |  |  Date                            |         |  |
|  |  |                                  |  |  Excerpt (3-4 lines)             |         |  |
|  |  |                                  |  |  [Read Article ->]               |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                  SECTION 3: FILTER / CATEGORY TABS                                        |
|                                                                                           |
|  [ All  |  News & Updates  |  Thought Leadership  |  By Division v ]                     |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 4: ARTICLE GRID                                               |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  | [InsightCard]       |  | [InsightCard]       |  | [InsightCard]       |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  | [InsightCard]       |  | [InsightCard]       |  | [InsightCard]       |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |  | [InsightCard]       |  | [InsightCard]       |  | [InsightCard]       |          |  |
|  |  +---------------------+  +---------------------+  +---------------------+          |  |
|  |                                                                                     |  |
|  |  [Load More]                                                                        |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                       SECTION 5: CTA BAND                                                 |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  "Want to discuss opportunities?"                                                   |  |
|  |  [Contact Us]                                                                       |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 7.3 Section Specifications

#### Section 2: Featured Article

| Attribute | Value |
|-----------|-------|
| Layout | 2-column: large image left, article meta right |
| Source | Most recent featured article or editorially pinned article |
| Content | Category badge + headline + date + excerpt (max 4 lines) + read more link |
| Mobile | Stack vertically, image above text |

**Components Required:**
- `FeaturedArticleCard` -- large variant of InsightCard with 2-column layout

#### Section 3: Filter / Category Tabs

| Attribute | Value |
|-----------|-------|
| Purpose | Allow filtering of the article grid by content stream |
| Tabs | All, News & Updates, Thought Leadership, By Division (dropdown) |
| Behaviour | Tab selection filters the article grid below without full page reload (client-side filter or route change) |
| "By Division" | Dropdown that links to `/insights/divisions/[division-slug]/` |
| Mobile | Horizontal scrollable tab bar |
| Active State | Underline + bold on active tab |

**Components Required:**
- `FilterTabs` -- horizontal tab bar with active state
- `DivisionDropdown` -- dropdown for "By Division" selection

#### Section 4: Article Grid

| Attribute | Value |
|-----------|-------|
| Layout | 3-column grid, 9 articles per page |
| Card | `InsightCard` reuse -- thumbnail, category badge, headline, date, excerpt, link |
| Pagination | "Load More" button (preferred over numbered pagination for content freshness) |
| Empty State | "No articles yet in this category. Check back soon." + link to all insights |
| Mobile | 1-column stack |

**Components Required:**
- `InsightCard` -- reuse
- `CardGrid` -- reuse
- `LoadMoreButton` -- pagination trigger
- `EmptyState` -- message + fallback link

### 7.4 Insights Sub-Pages

#### Latest Insights (P15: `/insights/latest/`)
Same layout as Insights hub but filtered to most recent articles across all streams. Uses `publishing-listing` template.

#### News & Updates (P16: `/insights/news/`)
Same layout as Insights hub but filtered to `company-news`, `announcements`, and `operational-updates` stream values. Uses `publishing-listing` template.

#### Thought Leadership (P17: `/insights/thought-leadership/`)
Same layout as Insights hub but filtered to `thought-leadership` and `industry-commentary` stream values. Uses `publishing-listing` template.

#### Insights by Division Hub (P18: `/insights/divisions/`)
Grid of 7 division cards, each linking to its division-specific insight listing. Uses `taxonomy-hub` template.

#### Division-Specific Insights (P19: `/insights/divisions/[division-slug]/`)
Same layout as Insights hub but filtered to a specific division. Breadcrumb: Home > Insights > By Division > [Division Name]. Uses `publishing-listing` template.

### 7.5 Insights Hub SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Insights -- News, Updates & Thought Leadership | Global Resources Citadel Limited` |
| Description | `Latest news, industry insights, and thought leadership from Global Resources Citadel Limited across agriculture, trade, real estate, and energy sectors.` |
| H1 | Page heading |
| Canonical | `https://[domain]/insights/` |
| Schema | `CollectionPage` structured data |

---

## 8. Article Detail Page (P20: `/insights/[article-slug]/`)

### 8.1 Page Purpose

Individual article pages are the depth layer. They provide full-length content for news, updates, and thought leadership. They must be readable, shareable, and connected to relevant division and corporate context.

### 8.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Insights > [Category] > [Article Title]                               |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                       SECTION 1: ARTICLE HEADER                                           |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Category badge (e.g., "Thought Leadership" or "Crop Farming")                      |  |
|  |  Headline: Article title (H1)                                                       |  |
|  |  Date: Published date      |  Reading time: X min read                              |  |
|  |  Author: [Name] (optional)                                                          |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                        SECTION 2: HERO IMAGE                                              |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Full-width article hero image]                                                    |  |
|  |  Optional: Image caption / credit                                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|     SIDEBAR (desktop)     |            SECTION 3: ARTICLE BODY                            |
|                           |                                                               |
|  +-------------------+    |   +-------------------------------------------------------+   |
|  |                   |    |   |                                                       |   |
|  | Share:            |    |   |  Rich text article content                            |   |
|  | [LinkedIn]        |    |   |                                                       |   |
|  | [Twitter/X]       |    |   |  Supports: headings, paragraphs, images,              |   |
|  | [Copy Link]       |    |   |  blockquotes, lists, tables, embedded media            |   |
|  |                   |    |   |                                                       |   |
|  | Division:         |    |   |  Max content width: ~720px for readability             |   |
|  | [Crop Farming]    |    |   |                                                       |   |
|  |                   |    |   |                                                       |   |
|  | Tags:             |    |   |                                                       |   |
|  | [tag] [tag]       |    |   |                                                       |   |
|  |                   |    |   |                                                       |   |
|  +-------------------+    |   +-------------------------------------------------------+   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                      SECTION 4: RELATED ARTICLES                                          |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Related Insights"                                                        |  |
|  |                                                                                     |  |
|  |  [InsightCard]  [InsightCard]  [InsightCard]                                        |  |
|  |                                                                                     |  |
|  |  [Back to All Insights ->]                                                          |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                        SECTION 5: CTA BAND                                                |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  (Division-specific CTA if article is tagged to a division,                         |  |
|  |   otherwise generic contact CTA)                                                    |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 8.3 Section Specifications

#### Section 1: Article Header

| Attribute | Value |
|-----------|-------|
| Category Badge | Styled tag showing content stream (e.g., "News", "Thought Leadership") or division name |
| Headline | H1, max 120 characters recommended |
| Meta | Published date (formatted), reading time (calculated), optional author name |
| Layout | Centered, constrained width (~960px) |

#### Section 2: Hero Image

| Attribute | Value |
|-----------|-------|
| Width | Full content width (not full bleed) |
| Aspect Ratio | 16:9 |
| Caption | Optional, below image in smaller text |
| Lazy Loading | Yes, with blurred placeholder |

#### Section 3: Article Body

| Attribute | Value |
|-----------|-------|
| Max Width | ~720px for comfortable reading (65-75 characters per line) |
| Typography | Serif or high-readability body font, 18px base, 1.7 line height |
| Supported Elements | Headings (H2-H4), paragraphs, images (inline and full-width), blockquotes, ordered/unordered lists, tables, code blocks (if needed) |
| Sidebar | Desktop only -- sticky sidebar with share links, division tag, and content tags |
| Mobile | Sidebar content moves above article body or below article header |

**Components Required:**
- `ArticleHeader` -- category, title, meta row
- `ArticleHeroImage` -- responsive image with optional caption
- `ArticleBody` -- rich text renderer with styled typography
- `ArticleSidebar` -- share links, division tag, content tags
- `ShareLinks` -- social sharing buttons (LinkedIn, Twitter/X, Copy Link)
- `TagList` -- styled tag pills

#### Section 4: Related Articles

| Attribute | Value |
|-----------|-------|
| Source | 3 articles sharing the same division tag or content stream |
| Fallback | Latest 3 articles if no related matches |
| Layout | 3-column card grid |

**Components Required:** `InsightCard`, `CardGrid`, `ViewAllLink` (all reuse)

### 8.4 Article SEO

| Meta Attribute | Pattern |
|----------------|---------|
| Title | `[Article Title] | Global Resources Citadel Limited Insights` |
| Description | First 155 characters of article content or custom meta description |
| H1 | Article title |
| Canonical | `https://[domain]/insights/[article-slug]/` |
| Schema | `Article` or `NewsArticle` structured data with author, datePublished, image |
| Open Graph | Title, description, image for social sharing |

---

## 9. Investors & Partners (P21: `/investors-partners/`)

### 9.1 Page Purpose

This is a curated credibility path for strategic audiences. It is NOT a generic corporate page. It is specifically designed to convince investors and partners that this business is structured, serious, and worth engaging. The page must feel intentional, concise, and high-trust.

### 9.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Investors & Partners                                                  |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                        SECTION 1: PAGE HERO                                               |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Premium background -- subtle pattern or high-quality image]                       |  |
|  |                                                                                     |  |
|  |  Section Label: "Investors & Partners"                                              |  |
|  |  Heading: "Partner With a Group Built for Scale"                                    |  |
|  |  Sub-heading: 1-2 sentences framing the investment case                             |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   SECTION 2: WHY PARTNER WITH US                                          |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Why Partner With Us"                                                     |  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  Body: 2-3 paragraphs making     |  |  [Image: corporate or            |         |  |
|  |  |  the strategic case. Market       |  |   operational photography]       |         |  |
|  |  |  position, growth trajectory,    |  |                                  |         |  |
|  |  |  diversification strength.       |  |                                  |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 3: GROUP CAPABILITIES                                          |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Multi-Sector Reach"                                                      |  |
|  |                                                                                     |  |
|  |  Brief intro text: How 7 divisions create value together                            |  |
|  |                                                                                     |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |  | Agriculture &    |  | Trade &          |  | Built Environ-   |                   |  |
|  |  | Processing       |  | Markets          |  | ment & Energy    |                   |  |
|  |  | Brief strength   |  | Brief strength   |  | Brief strength   |                   |  |
|  |  | statement        |  | statement        |  | statement        |                   |  |
|  |  | [Explore ->]     |  | [Explore ->]     |  | [Explore ->]     |                   |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   SECTION 4: PORTFOLIO STRENGTH                                           |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Dark background credibility band]                                                 |  |
|  |                                                                                     |  |
|  |  Heading: "By the Numbers"                                                          |  |
|  |                                                                                     |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |  | [Stat]   |  | [Stat]   |  | [Stat]   |  | [Stat]   |                             |  |
|  |  | Revenue  |  | Divisions|  | Years    |  | Market   |                             |  |
|  |  | or scale |  | Active   |  | Operating|  | Reach    |                             |  |
|  |  +----------+  +----------+  +----------+  +----------+                             |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                SECTION 5: GOVERNANCE & CREDIBILITY                                        |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Governance & Credibility"                                                |  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  | Leadership Preview              |  | Credentials & Certifications     |         |  |
|  |  | [Photo] Name, Title             |  | [Cert logo] [Cert logo]          |         |  |
|  |  | [Photo] Name, Title             |  | [Cert logo] [Cert logo]          |         |  |
|  |  | [View Full Team ->]             |  | [View All Credentials ->]        |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                   SECTION 6: LATEST UPDATES                                               |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Latest News"                                                             |  |
|  |  [InsightCard] [InsightCard] [InsightCard]                                          |  |
|  |  [View All Insights ->]                                                             |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                  SECTION 7: STRATEGIC INQUIRY CTA                                         |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  [Gold accent background]                                                           |  |
|  |                                                                                     |  |
|  |  Heading: "Start a Conversation"                                                    |  |
|  |  Body: "Whether you're exploring investment, partnership, or strategic               |  |
|  |  collaboration, our team is ready to engage."                                       |  |
|  |                                                                                     |  |
|  |  [Partner Inquiry]         [Investor Inquiry]                                       |  |
|  |  -> /contact/strategic/    -> /contact/strategic/                                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 9.3 Section Specifications

#### Section 2: Why Partner With Us

| Attribute | Value |
|-----------|-------|
| Layout | 2-column: text left, image right |
| Body | 2-3 paragraphs: market position, growth trajectory, diversification strength |
| Tone | Confident, specific, evidence-based -- not salesy |
| Image | Corporate or operational photography reinforcing scale |

**Components Required:** `TwoColumnSection` (reuse)

#### Section 3: Group Capabilities

| Attribute | Value |
|-----------|-------|
| Purpose | Show the portfolio breadth as a strategic advantage |
| Cards | 3 cluster cards with brief strength statement and link to cluster page |
| Mobile | Stack vertically |

**Components Required:** `ClusterCard` (reuse), `ThreeColumnGrid` (reuse)

#### Section 4: Portfolio Strength

| Attribute | Value |
|-----------|-------|
| Purpose | Quantifiable proof of scale and operating history |
| Stats | 4 key metrics relevant to investor audience (revenue scale, operating years, division count, market/geographic reach) |
| Background | Dark band for visual weight |

**Components Required:** `CredibilityBar`, `StatCounter` (reuse)

#### Section 5: Governance & Credibility

| Attribute | Value |
|-----------|-------|
| Layout | 2-column: leadership preview left, credentials right |
| Leadership | Top 2-3 leaders with photo + name + title, link to full leadership section on About page |
| Credentials | Key certification logos, link to credentials section on About page |

**Components Required:**
- `LeaderPreviewCard` -- compact leader card (photo, name, title)
- `CredentialCard` -- reuse
- `TwoColumnSection` -- reuse

#### Section 7: Strategic Inquiry CTA

| Attribute | Value |
|-----------|-------|
| Purpose | Convert investor/partner interest into inquiry |
| CTAs | Two buttons -- both link to `/contact/strategic/` (can be differentiated by query param for routing) |
| Background | Gold accent |

**Components Required:** `CTABanner` (reuse)

### 9.4 Investors & Partners SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Investors & Partners -- Strategic Opportunities | Global Resources Citadel Limited` |
| Description | `Explore partnership and investment opportunities with Global Resources Citadel Limited, a diversified Nigerian conglomerate operating across agriculture, trade, real estate, and energy.` |
| H1 | Page heading |
| Canonical | `https://[domain]/investors-partners/` |
| Schema | `WebPage` with `about: Organization` structured data |

---

## 10. Contact Hub (P22: `/contact/`)

### 10.1 Page Purpose

Contact is a routing architecture, not a single form. It helps visitors land in the correct business channel by presenting clear inquiry pathways segmented by intent: general, division-specific, strategic/investor, and location-based.

### 10.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact                                                               |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                          SECTION 1: PAGE HERO                                             |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |  Section Label: "Contact"                                                           |  |
|  |  Heading: "Get In Touch"                                                            |  |
|  |  Sub-heading: "Choose the right pathway to reach the team you need."                 |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 2: INQUIRY PATHWAYS                                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  [Icon: envelope]                |  |  [Icon: building]                |         |  |
|  |  |  GENERAL ENQUIRIES               |  |  CONTACT BY DIVISION             |         |  |
|  |  |  "For general questions about    |  |  "Reach the team in the          |         |  |
|  |  |  Global Resources Citadel Limited."               |  |  division relevant to you."      |         |  |
|  |  |  [Submit Enquiry ->]             |  |  [Choose Division ->]            |         |  |
|  |  |  -> /contact/general/            |  |  -> /contact/divisions/          |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |  |                                  |  |                                  |         |  |
|  |  |  [Icon: handshake]               |  |  [Icon: map-pin]                 |         |  |
|  |  |  PARTNER / INVESTOR CONTACT      |  |  LOCATIONS                       |         |  |
|  |  |  "For investment, partnership,   |  |  "Find our offices and           |         |  |
|  |  |  or strategic discussions."      |  |  operational locations."         |         |  |
|  |  |  [Start Conversation ->]         |  |  [View Locations ->]             |         |  |
|  |  |  -> /contact/strategic/          |  |  -> /contact/locations/          |         |  |
|  |  |                                  |  |                                  |         |  |
|  |  +----------------------------------+  +----------------------------------+         |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 3: QUICK CONTACT INFO                                         |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |  | [Icon: phone]    |  | [Icon: email]    |  | [Icon: location] |                   |  |
|  |  | Phone            |  | Email            |  | Head Office      |                   |  |
|  |  | +234 XXX XXX     |  | info@company.com |  | Address, City    |                   |  |
|  |  +------------------+  +------------------+  +------------------+                   |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 10.3 Section Specifications

#### Section 2: Inquiry Pathways

| Attribute | Value |
|-----------|-------|
| Layout | 2x2 grid of pathway cards |
| Card Content | Icon + heading + brief descriptor (1-2 sentences) + action link |
| Purpose | Route visitors to the correct inquiry type without forcing them to guess |
| Mobile | Stack to 1-column |
| Card Styling | Bordered cards with hover elevation effect |

**Components Required:**
- `PathwayCard` -- icon, heading, description, link
- `TwoByTwoGrid` -- 2x2 responsive grid

#### Section 3: Quick Contact Info

| Attribute | Value |
|-----------|-------|
| Purpose | Provide direct contact information for users who prefer phone or email |
| Layout | 3-column: phone, email, head office address |
| Mobile | Stack vertically |

**Components Required:**
- `ContactInfoCard` -- icon, label, value
- `ThreeColumnGrid` -- reuse

### 10.4 Contact Sub-Pages

#### General Enquiries (P23: `/contact/general/`)

```
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact > General Enquiries                                           |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "General Enquiries"                                                             |
|  Body: "Send us a general message about Global Resources Citadel Limited."                                  |
|                                                                                           |
|  +----------------------------------+  +----------------------------------+               |
|  |                                  |  |                                  |               |
|  |  FORM:                           |  |  Contact Information:            |               |
|  |  - Full Name *                   |  |  Phone: +234 XXX XXX             |               |
|  |  - Email Address *               |  |  Email: info@company.com         |               |
|  |  - Phone (optional)              |  |  Address: [Head office]          |               |
|  |  - Subject *                     |  |                                  |               |
|  |  - Message *                     |  |  Hours: Mon-Fri, 8am-5pm WAT    |               |
|  |  - [Submit Enquiry]              |  |                                  |               |
|  |                                  |  |                                  |               |
|  +----------------------------------+  +----------------------------------+               |
|                                                                                           |
|  Reassurance: "We aim to respond within 2 business days."                                 |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Form Payload:** `inquiryType: "general-corporate"`, `destinationTeam: "corporate"`, `sourcePage: "/contact/general/"`

#### Contact by Division (P24: `/contact/divisions/`)

```
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact > Contact by Division                                         |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "Contact by Division"                                                           |
|  Body: "Select the division you'd like to reach."                                         |
|                                                                                           |
|  +---------------------+  +---------------------+  +---------------------+                |
|  | [Icon]              |  | [Icon]              |  | [Icon]              |                |
|  | Crop Farming        |  | Animal Husbandry    |  | Agro-Processing     |                |
|  | [Contact ->]        |  | [Contact ->]        |  | [Contact ->]        |                |
|  +---------------------+  +---------------------+  +---------------------+                |
|                                                                                           |
|  +---------------------+  +---------------------+                                        |
|  | Commodity Marketing |  | Import & Export     |                                        |
|  | [Contact ->]        |  | [Contact ->]        |                                        |
|  +---------------------+  +---------------------+                                        |
|                                                                                           |
|  +---------------------+  +---------------------+                                        |
|  | Real Estate         |  | Oil & Gas           |                                        |
|  | [Contact ->]        |  | [Contact ->]        |                                        |
|  +---------------------+  +---------------------+                                        |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Components Required:**
- `DivisionContactCard` -- icon, division name, link to division contact form

#### Division-Specific Enquiry (P25: `/contact/divisions/[division-slug]/`)

```
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact > Contact by Division > [Division Name]                       |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "[Division Name] Enquiry"                                                       |
|  Body: "Get in touch with our [Division Name] team."                                      |
|                                                                                           |
|  +----------------------------------+  +----------------------------------+               |
|  |                                  |  |                                  |               |
|  |  FORM:                           |  |  About [Division Name]:          |               |
|  |  - Full Name *                   |  |  Brief 2-3 line overview of      |               |
|  |  - Email Address *               |  |  the division and what kind      |               |
|  |  - Company/Organization          |  |  of enquiries they handle.       |               |
|  |  - Phone (optional)              |  |                                  |               |
|  |  - Enquiry Type (dropdown):      |  |  [Explore [Division] ->]         |               |
|  |    - Product/Service Inquiry     |  |  (Link back to division page)    |               |
|  |    - Business Opportunity        |  |                                  |               |
|  |    - General Question            |  |                                  |               |
|  |  - Message *                     |  |                                  |               |
|  |  - [Submit Enquiry]              |  |                                  |               |
|  |                                  |  |                                  |               |
|  +----------------------------------+  +----------------------------------+               |
|                                                                                           |
|  Reassurance: "Your enquiry will be routed to our [Division Name] team.                   |
|  We aim to respond within 2 business days."                                               |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Form Payload:** `inquiryType: "division-business"`, `destinationTeam: "[division-slug]"`, `divisionSlug: "[division-slug]"`, `sourcePage: "/contact/divisions/[division-slug]/"`

#### Partner / Investor Contact (P26: `/contact/strategic/`)

```
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact > Partner & Investor Contact                                  |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "Partner & Investor Contact"                                                    |
|  Body: "For strategic partnerships, investment discussions, or                             |
|  institutional engagement with Global Resources Citadel Limited."                                           |
|                                                                                           |
|  +----------------------------------+  +----------------------------------+               |
|  |                                  |  |                                  |               |
|  |  FORM:                           |  |  What to expect:                 |               |
|  |  - Full Name *                   |  |  - Confidential initial review   |               |
|  |  - Email Address *               |  |  - Response within 3 business    |               |
|  |  - Organization *                |  |    days                          |               |
|  |  - Title / Role *                |  |  - Direct engagement with        |               |
|  |  - Phone                         |  |    strategic team                |               |
|  |  - Inquiry Type (dropdown):      |  |                                  |               |
|  |    - Strategic Partnership       |  |  [Back to Investors & Partners]  |               |
|  |    - Investment Discussion       |  |                                  |               |
|  |    - Institutional Enquiry       |  |                                  |               |
|  |    - Other                       |  |                                  |               |
|  |  - Brief Description *           |  |                                  |               |
|  |  - [Submit Inquiry]              |  |                                  |               |
|  |                                  |  |                                  |               |
|  +----------------------------------+  +----------------------------------+               |
|                                                                                           |
|  Reassurance: "All strategic enquiries are handled confidentially                         |
|  and reviewed by our leadership team."                                                    |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Form Payload:** `inquiryType: "strategic-partnership"` or `"investor-institutional"`, `destinationTeam: "strategic"`, `sourcePage: "/contact/strategic/"`

#### Locations (P27: `/contact/locations/`)

```
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Contact > Locations                                                   |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "Our Locations"                                                                 |
|  Body: "Find Global Resources Citadel Limited offices and operational sites."                               |
|                                                                                           |
|  +----------------------------------+  +----------------------------------+               |
|  |                                  |  |                                  |               |
|  |  [Map embed or static map]       |  |  HEAD OFFICE                     |               |
|  |                                  |  |  [Address]                       |               |
|  |                                  |  |  [Phone]                         |               |
|  |                                  |  |  [Hours]                         |               |
|  |                                  |  |                                  |               |
|  |                                  |  |  OPERATIONAL SITES               |               |
|  |                                  |  |  [Location 1: Name, Address]     |               |
|  |                                  |  |  [Location 2: Name, Address]     |               |
|  |                                  |  |                                  |               |
|  +----------------------------------+  +----------------------------------+               |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

**Components Required for Contact Section:**
- `ContactForm` -- configurable form with field definitions, validation, and submission handling
- `FormField` -- input, textarea, dropdown field types
- `SubmitButton` -- styled form submit button
- `FormSuccess` -- success confirmation state with route context
- `FormError` -- error state with retry option
- `PathwayCard` -- reuse from contact hub
- `DivisionContactCard` -- reuse
- `LocationCard` -- address, phone, hours
- `MapEmbed` -- optional map integration

### 10.5 Contact Form Validation Rules

| Field | Validation |
|-------|-----------|
| Full Name | Required, min 2 characters |
| Email | Required, valid email format |
| Phone | Optional, valid phone format if provided |
| Organization | Required on strategic form only |
| Subject/Enquiry Type | Required |
| Message/Description | Required, min 20 characters |

### 10.6 Contact Hub SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Contact Global Resources Citadel Limited -- Enquiries, Partnerships & Locations` |
| Description | `Get in touch with Global Resources Citadel Limited. Submit general enquiries, contact specific business divisions, or reach our strategic partnerships team.` |
| H1 | "Get In Touch" |
| Canonical | `https://[domain]/contact/` |
| Schema | `ContactPage` structured data |

---

## 11. Search (P28: `/search/`)

### 11.1 Page Purpose

Search is a recovery and acceleration mechanism. It helps users who do not yet understand the business structure or who want a faster path to a known target. It is a utility, not a browsing experience.

### 11.2 Page Wireframe

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                        SECTION 1: SEARCH INPUT                                            |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  Heading: "Search Global Resources Citadel Limited"                                                   |  |
|  |                                                                                     |  |
|  |  +---------------------------------------------------------------+  [Search]        |  |
|  |  |  Search for pages, divisions, insights, contacts...           |                  |  |
|  |  +---------------------------------------------------------------+                  |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                     SECTION 2: FILTER BAR                                                 |
|                                                                                           |
|  [ All  |  Pages  |  Divisions  |  Insights  |  Contacts ]                                |
|                                                                                           |
|  Results for "[query]": [X] results found                                                 |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    SECTION 3: SEARCH RESULTS                                              |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  +-------------------------------------------------------------------------+        |  |
|  |  | [Type badge: Division]                                                  |        |  |
|  |  | Result Title (linked)                                                   |        |  |
|  |  | URL path displayed                                                      |        |  |
|  |  | Excerpt with highlighted search terms                                   |        |  |
|  |  | Parent section: Divisions > Agriculture & Processing                    |        |  |
|  |  +-------------------------------------------------------------------------+        |  |
|  |                                                                                     |  |
|  |  +-------------------------------------------------------------------------+        |  |
|  |  | [Type badge: Insight]                                                   |        |  |
|  |  | Result Title (linked)                                                   |        |  |
|  |  | URL path displayed                                                      |        |  |
|  |  | Excerpt with highlighted search terms                                   |        |  |
|  |  | Division tag: Crop Farming  |  Date: 2026-03-15                        |        |  |
|  |  +-------------------------------------------------------------------------+        |  |
|  |                                                                                     |  |
|  |  (Repeat for each result)                                                           |  |
|  |                                                                                     |  |
|  |  [Load More Results]                                                                |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|                                                                                           |
|             SECTION 4: NO RESULTS STATE (conditional)                                     |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  |                                                                                     |  |
|  |  "No results found for '[query]'."                                                  |  |
|  |                                                                                     |  |
|  |  Try:                                                                               |  |
|  |  - [Browse Our Divisions ->]                                                        |  |
|  |  - [Read Latest Insights ->]                                                        |  |
|  |  - [Contact Us ->]                                                                  |  |
|  |                                                                                     |  |
|  +-------------------------------------------------------------------------------------+  |
|                                                                                           |
+-------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 11.3 Section Specifications

#### Search Input

| Attribute | Value |
|-----------|-------|
| Input | Full-width text input with placeholder text |
| Submit | Search button or Enter key |
| Behaviour | URL updates to `/search?q=[query]` on submit |
| Autosuggest | Optional enhancement for post-MVP |

#### Filter Bar

| Attribute | Value |
|-----------|-------|
| Tabs | All, Pages, Divisions, Insights, Contacts |
| Behaviour | Filters results by `type` parameter |
| URL Pattern | `/search?q=[query]&type=[type]` |
| Result Count | Displayed below filter bar |

#### Search Results

| Attribute | Value |
|-----------|-------|
| Result Card | Type badge + linked title + URL path + excerpt with term highlighting + parent/meta info |
| Pagination | "Load More Results" button, 10 results per load |
| Ranking | Title matches first, then body content matches |

#### No Results State

| Attribute | Value |
|-----------|-------|
| Message | Preserves the search query in the message |
| Recovery Links | Browse Divisions, Read Latest Insights, Contact Us |
| Purpose | Never leave the user at a dead end |

**Components Required:**
- `SearchInput` -- input field with submit behaviour
- `SearchFilterTabs` -- type filter tabs
- `SearchResultCard` -- type badge, title, URL, excerpt, meta
- `NoResultsState` -- message with recovery links
- `LoadMoreButton` -- reuse

### 11.4 Search URL Patterns

| URL | Behaviour |
|-----|-----------|
| `/search?q=oil` | Search all content for "oil" |
| `/search?q=oil&type=division` | Search only divisions |
| `/search?q=export&type=insight` | Search only insights |
| `/search?q=partnership&type=contact` | Search only contact routes |

### 11.5 Search Result Metadata (per indexed item)

| Field | Type | Required |
|-------|------|----------|
| `id` | string | Yes |
| `slug` | string | Yes |
| `title` | string | Yes |
| `type` | enum: page, division, insight, contact | Yes |
| `section` | string | Yes |
| `summary` | string | Yes |
| `division[]` | string[] | No |
| `audience[]` | string[] | No |
| `stream` | string | No |
| `publishedAt` | date | No |
| `featured` | boolean | No |

### 11.6 Search SEO

| Meta Attribute | Value |
|----------------|-------|
| Title | `Search Results for "[query]" | Global Resources Citadel Limited` |
| Robots | `noindex, follow` (search result pages should not be indexed) |

---

## 12. Legal Pages (P29-P31)

### 12.1 Privacy Policy (P29: `/privacy-policy/`)

```
+-------------------------------------------------------------------------------------------+
|  [HEADER NAV]                                                                             |
+-------------------------------------------------------------------------------------------+
|  Breadcrumb: Home > Privacy Policy                                                        |
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|  Heading: "Privacy Policy"                                                                |
|  Last Updated: [Date]                                                                     |
|                                                                                           |
|  [Prose body: structured legal content with H2-H4 headings]                               |
|  Sections: Information Collection, Use of Information, Data Protection,                    |
|  Cookies, Third Parties, Your Rights, Contact for Privacy Concerns                        |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
|  [FOOTER]                                                                                 |
+-------------------------------------------------------------------------------------------+
```

### 12.2 Terms of Use (P30: `/terms/`)

Same layout as Privacy Policy. Structured legal content with H2-H4 headings covering terms of use, acceptable use, intellectual property, disclaimers, and governing law.

### 12.3 Sitemap (P31: `/sitemap/`)

HTML sitemap listing all public pages organised by section. Mirrors the footer navigation structure in an expanded, fully linked format.

**Components Required:**
- `LegalPageLayout` -- constrained prose width (~720px), H1, last-updated date, rich text body
- `HTMLSitemap` -- structured link list by section

---

## 13. Taxonomy Model

### 13.1 Core Content Types

| Content Type | Description | Template |
|-------------|-------------|----------|
| `corporatePage` | Group-level pages (Home, About, Investors) | Various |
| `divisionPage` | Individual division detail pages | `division-detail` |
| `clusterPage` | Division cluster group pages | `division-cluster` |
| `insightArticle` | News, updates, thought leadership content | `article-detail` |
| `contactRoute` | Inquiry endpoint pages | `contact-form` |
| `credentialItem` | Certification, license, or compliance proof | Embedded component |
| `location` | Physical office or operational site | Embedded component |

### 13.2 Controlled Taxonomy Values

#### Section Values
`home` | `about` | `divisions` | `insights` | `investors-partners` | `contact` | `search`

#### Division Values
`crop-farming` | `animal-husbandry` | `agro-processing` | `commodity-marketing` | `real-estate` | `import-export` | `oil-gas`

#### Division Cluster Values
`agriculture-processing` | `trade-markets` | `built-environment-energy`

#### Audience Values
`investor-partner` | `prospect-customer` | `general-public` | `internal-editor`

#### Insight Stream Values
`company-news` | `announcements` | `operational-updates` | `thought-leadership` | `industry-commentary` | `division-insight`

#### Contact Route Values
`general-corporate` | `division-business` | `strategic-partnership` | `investor-institutional`

### 13.3 Content Relationships

| Relationship | Rule |
|-------------|------|
| `divisionPage` -> `clusterPage` | Each division belongs to exactly one cluster |
| `divisionPage` -> `insightArticle` | A division can reference many insight articles |
| `insightArticle` -> `division` | An article belongs to zero or one division (company-wide articles have no division) |
| `insightArticle` -> `stream` | An article belongs to exactly one stream |
| `contactRoute` -> `division` | A contact route optionally belongs to one division |
| `credentialItem` -> `scope` | A credential applies to company-wide or a specific division |
| `corporatePage` -> `division[]` | Corporate pages may reference multiple divisions |

### 13.4 Publishing Taxonomy Rules

- Company-wide and division-specific publishing must remain distinguishable in the content model
- Every insight article must be classifiable by `stream` (required) and `division` (optional)
- Division pages must be able to surface related articles filtered by their own division slug
- Featured articles can be flagged for homepage and hub page display
- Content supports cross-linking to related divisions and corporate pages

---

## 14. Breadcrumb Patterns

| Page | Breadcrumb |
|------|-----------|
| Home | (none) |
| About the Group | Home > About the Group |
| Divisions Hub | Home > Divisions |
| Cluster Page | Home > Divisions > [Cluster Name] |
| Division Detail | Home > Divisions > [Cluster Name] > [Division Name] |
| Insights Hub | Home > Insights |
| Insights Sub-page | Home > Insights > [Category] |
| Division Insights | Home > Insights > By Division > [Division Name] |
| Article Detail | Home > Insights > [Category] > [Article Title] |
| Investors & Partners | Home > Investors & Partners |
| Contact Hub | Home > Contact |
| Contact Sub-page | Home > Contact > [Sub-page Title] |
| Division Contact | Home > Contact > Contact by Division > [Division Name] |
| Search | Home > Search |
| Legal Pages | Home > [Page Title] |

**Rules:**
- Each crumb is a clickable link except the current page (final crumb)
- The final crumb is visually distinct (non-linked, muted colour)
- Breadcrumbs appear below the header and above the page hero on all pages except the homepage
- Mobile breadcrumbs may truncate middle items with ellipsis for deep paths

---

## 15. Component Registry

This is the complete list of components required to build all pages defined in this IA. Components are listed once with their reuse scope.

### Layout Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `HeaderNav` | Sticky header with logo, nav items, search, CTA | All pages |
| `FooterNav` | Sitemap-style footer with columns, social, legal | All pages |
| `MobileMenu` | Full-screen overlay with accordion nav | All pages (mobile) |
| `DivisionDropdown` | Mega-menu dropdown for Divisions nav item | Header (desktop) |
| `Breadcrumb` | Hierarchical breadcrumb trail | All pages except Home |
| `AnchorNav` | Sticky in-page section navigation | About the Group |
| `PageHero` | Section label + heading + sub-heading on light background | Most pages |
| `DivisionHero` | Full-width image hero with text overlay | Division detail pages |

### Content Section Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `HeroSection` | Full-bleed background hero with CTAs | Homepage |
| `SectionHeader` | Label + heading + optional body text | Multiple sections |
| `TwoColumnSection` | Image + text split layout | About, Investors |
| `ProseSection` | Full-width heading + body text block | Multiple pages |
| `CTABanner` | Full-width accent-background CTA section | All pages (bottom) |
| `CredibilityBar` | Dark-background stats section | Homepage, Division detail, Investors |

### Card Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `ClusterCard` | Icon + cluster name + descriptor | Homepage S2, Investors S3 |
| `DivisionCardLarge` | Image background + overlay text + link | Homepage Bento grid |
| `DivisionCardStandard` | Image + title + description + link | Homepage Bento grid |
| `DivisionCardCompact` | Icon + title + arrow link | Homepage Bento grid |
| `DivisionPreviewCard` | Image + title + overview + link | Divisions hub |
| `DivisionFeatureCard` | Large image + title + overview + capabilities + link | Cluster pages |
| `InsightCard` | Thumbnail + category + headline + date + excerpt + link | Homepage, Insights, Division detail, Investors |
| `FeaturedArticleCard` | 2-column large variant of InsightCard | Insights hub |
| `CapabilityCard` | Icon + title + description | Division detail pages |
| `LeaderCard` | Photo + name + title + brief | About page |
| `CredentialCard` | Logo + name + issuer | About page, Investors |
| `ValueCard` | Icon + title + description | About page |
| `StatCounter` | Animated number + label | Homepage, Division detail, Investors |
| `PathwayCard` | Icon + heading + description + link | Contact hub |
| `DivisionContactCard` | Icon + division name + link | Contact directory |
| `ContactInfoCard` | Icon + label + value | Contact hub |
| `LocationCard` | Name + address + phone + hours | Locations page |
| `SearchResultCard` | Type badge + title + URL + excerpt + meta | Search page |

### Interactive Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `ButtonPrimary` | Filled primary action button (green) | Multiple |
| `ButtonSecondary` | Ghost/outline secondary action button | Multiple |
| `ViewAllLink` | Text link with arrow icon | Multiple |
| `SectionCTA` | In-section call-to-action link | Multiple |
| `FilterTabs` | Horizontal tab bar with active state | Insights, Search |
| `LoadMoreButton` | Pagination trigger button | Insights, Search |
| `SearchInput` | Search text input with submit | Search page, Search overlay |
| `ShareLinks` | Social sharing buttons | Article detail |
| `TagList` | Styled tag pills | Article detail |
| `ExpandableGrid` | Grid with show more/less toggle | About credentials |

### Form Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `ContactForm` | Configurable form container | Contact sub-pages |
| `FormField` | Input, textarea, dropdown field types | Contact forms |
| `SubmitButton` | Styled form submit | Contact forms |
| `FormSuccess` | Success confirmation with route context | Contact forms |
| `FormError` | Error state with retry option | Contact forms |

### Data Display Components

| Component | Description | Used On |
|-----------|-------------|---------|
| `OrgChart` | Responsive organisational diagram | About page |
| `LogoRow` | Horizontal scroll of logos | Homepage, Division detail, About |
| `MapEmbed` | Optional map integration | Locations page |
| `LeaderBioPanel` | Expanded leader biography | About page |
| `TestimonialQuote` | Styled quote block | Division detail pages |

### Page Templates

| Template | Description | Pages Using |
|----------|-------------|-------------|
| `homepage-landing` | Homepage layout | P01 |
| `corporate-narrative` | Long-form narrative with anchor nav | P02 |
| `division-hub` | Division overview grid by cluster | P03 |
| `division-cluster` | Cluster overview with member divisions | P04-P06 |
| `division-detail` | 5-section division page pattern | P07-P13 |
| `publishing-hub` | Insights landing with featured + grid | P14 |
| `publishing-listing` | Filtered article listing | P15-P17, P19 |
| `taxonomy-hub` | Category/division browsing grid | P18 |
| `article-detail` | Full article page with sidebar | P20 |
| `partner-hub` | Investor/partner credibility page | P21 |
| `contact-hub` | Contact routing with pathway cards | P22 |
| `contact-directory` | Division contact selection grid | P24 |
| `contact-form` | Form page with sidebar info | P23, P25, P26 |
| `location-directory` | Map + location listings | P27 |
| `search-results` | Search input + filter + results | P28 |
| `legal-page` | Constrained prose legal content | P29-P30 |
| `sitemap-page` | HTML sitemap link structure | P31 |

---

## 16. Responsive Behaviour Summary

### Breakpoint System

| Breakpoint | Width | Target |
|-----------|-------|--------|
| `sm` | 0-639px | Mobile phones |
| `md` | 640-767px | Large phones / small tablets |
| `lg` | 768-1023px | Tablets |
| `xl` | 1024-1279px | Small desktops |
| `2xl` | 1280px+ | Large desktops |

### Key Responsive Patterns

| Pattern | Mobile (`sm`) | Tablet (`lg`) | Desktop (`xl+`) |
|---------|--------------|---------------|-----------------|
| Header Nav | Logo + Search + Hamburger | Full nav (may compress) | Full nav + all items visible |
| Bento Grid | 1-column stack, uniform cards | 2-column grid | Full bento layout with variable sizes |
| Card Grids | 1-column | 2-column | 3-column |
| 2-Column Sections | Stack (image above text) | Side-by-side | Side-by-side with more whitespace |
| Stats Row | 2x2 grid | 4 inline | 4 inline |
| Article Body | Full-width, sidebar above content | Full-width, sidebar above content | Sidebar alongside content |
| Footer | Accordion columns | 2-column grid | 4-column grid |
| Breadcrumbs | Truncated with ellipsis | Full path | Full path |
| Filter Tabs | Horizontal scroll | Horizontal scroll | Full inline |

---

## 17. Colour System Reference

This section encodes the colour system for direct implementation reference.

### Primary -- Deep Forest Green

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#F0FDF4` | Light backgrounds, hover states |
| `primary-100` | `#DCFCE7` | Subtle highlights |
| `primary-200` | `#BBF7D0` | Borders, dividers |
| `primary-300` | `#86EFAC` | Secondary interactive elements |
| `primary-400` | `#4ADE80` | Hover accents |
| `primary-500` | `#22C55E` | Mid-range green |
| `primary-600` | `#15803D` | **Primary brand colour** -- buttons, links, headings |
| `primary-700` | `#166534` | Active states, darker text |
| `primary-800` | `#14532D` | Dark accents |
| `primary-900` | `#052E16` | Dark backgrounds, footer, credibility bars |

### Secondary Accent -- Warm Gold

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-gold` | `#B48A3E` | **Primary accent** -- section labels, premium moments, CTA highlights |
| `accent-gold-light` | `#D4A84B` | Hover state for gold elements |
| `accent-gold-dark` | `#8B6B2F` | Active state for gold elements |

### Neutrals -- Cool Grey

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#F9FAFB` | Page backgrounds, alternating sections |
| `neutral-100` | `#F3F4F6` | Card backgrounds, input backgrounds |
| `neutral-200` | `#E5E7EB` | Borders, dividers |
| `neutral-300` | `#D1D5DB` | Disabled states |
| `neutral-400` | `#9CA3AF` | Placeholder text, muted text |
| `neutral-500` | `#6B7280` | Secondary body text |
| `neutral-600` | `#4B5563` | Body text |
| `neutral-700` | `#374151` | Headings (secondary) |
| `neutral-800` | `#1F2937` | Primary headings, dark text |
| `neutral-900` | `#111827` | Darkest text, dark backgrounds |

### Semantic Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#059669` | Form success states |
| `error` | `#DC2626` | Form errors, validation |
| `warning` | `#D97706` | Warnings, notices |
| `info` | `#2563EB` | Informational notices |

---

## 18. Inquiry Routing Architecture

### Inquiry Type Registry

| Inquiry Type | Route | Destination Team | Form Fields |
|-------------|-------|-------------------|-------------|
| General Corporate | `/contact/general/` | Corporate office | Name, Email, Phone, Subject, Message |
| Division-Specific | `/contact/divisions/[slug]/` | Division team | Name, Email, Company, Phone, Enquiry Type, Message |
| Strategic Partnership | `/contact/strategic/` | Strategic/leadership | Name, Email, Organization, Title, Phone, Inquiry Type, Description |
| Investor/Institutional | `/contact/strategic/` | Strategic/leadership | Same as strategic partnership form |

### Routing Rules

1. Every division detail page (P07-P13) must expose a CTA linking to its corresponding division inquiry route (`/contact/divisions/[division-slug]/`)
2. The Investors & Partners page (P21) must link to `/contact/strategic/` -- never to `/contact/general/`
3. The homepage CTA "Get In Touch" links to `/contact/` (the routing hub), not directly to a form
4. Division-specific contact forms must display the division name prominently and include division context in the form payload
5. Strategic contact forms must collect organization and role information
6. All forms must display destination context before submission ("This enquiry will be sent to our [team]")
7. All forms must display reassurance copy about response timeframe
8. Successful submission must show a confirmation state that repeats the route context

### Form Payload Standard

Every form submission must include:

```
{
  "inquiryType": "general-corporate" | "division-business" | "strategic-partnership" | "investor-institutional",
  "destinationTeam": "corporate" | "[division-slug]" | "strategic",
  "divisionSlug": "[division-slug]" | null,
  "sourcePage": "/contact/[path]/",
  "audienceContext": "prospect-customer" | "investor-partner" | "general-public" | null,
  "submittedAt": "ISO-8601 timestamp",
  "fields": { ... }
}
```

---

## 19. SEO Architecture Summary

### Global SEO Requirements

| Requirement | Implementation |
|-------------|---------------|
| Semantic HTML | All pages use proper heading hierarchy (single H1, structured H2-H6) |
| Clean URLs | Descriptive slugs, no query params for primary pages |
| Canonical Tags | Every page has a canonical URL |
| Meta Description | Every page has a unique, descriptive meta description (max 155 chars) |
| Open Graph | Title, description, image for all public pages |
| Twitter Card | Summary card with large image for all public pages |
| Sitemap | XML sitemap generated for all public routes |
| Robots.txt | Allow crawling of all public pages; disallow search results pages |
| Structured Data | Organization, WebSite, Article, ContactPage schemas where appropriate |
| Internal Linking | Cross-links between related divisions, insights, and contact paths |
| Image Alt Text | All images have descriptive alt text |
| Language | `lang="en"` on HTML element |

### Page-Level Schema Mapping

| Page Type | Schema Type |
|-----------|-------------|
| Homepage | `Organization` + `WebSite` |
| About | `Organization` + `AboutPage` |
| Division Detail | `Organization` (department) + `WebPage` |
| Insight Article | `Article` or `NewsArticle` |
| Contact Hub | `ContactPage` |
| Contact Form | `ContactPage` |
| Insights Hub | `CollectionPage` |
| Divisions Hub | `CollectionPage` |
| Search | `SearchResultsPage` (noindex) |

---

## 20. Expansion Readiness

The architecture is designed to absorb the following future additions without structural rework:

| Future Capability | Supported By |
|-------------------|-------------|
| New business division | Add new `division-detail` page, add to cluster, extend taxonomy |
| Case studies / project stories | New content type using `article-detail` template variant |
| Media galleries | New component within division detail or standalone pages |
| Careers / recruitment | New L1 or L2 section using `section-hub` template |
| Deeper investor content | Sub-pages within Investors & Partners using existing templates |
| Enhanced search | Add faceted filtering to existing search architecture |
| CRM integration | Add integration layer to form submission pipeline |
| Analytics | Add tracking to existing component events |
| Multilingual support | Add language routing prefix to existing URL structure |
| Rich content editing | Add structured CMS backend to existing content model |

---

## Document End

This Information Architecture specification provides the complete structural foundation for the multi-division corporate platform. Every page, route, component, content relationship, and interaction pattern is defined to a level that supports direct implementation without interpretive gaps.

The document should be read alongside the [UX Design Specification](./ux-design-specification.md) for experience goals, emotional targets, interaction principles, and visual design guidance.
