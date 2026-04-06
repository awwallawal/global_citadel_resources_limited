# GRCL Platform Evolution Spec v1.0

**Date:** 2026-04-06
**Author:** Sally (UX Designer) + Awwal
**Status:** Approved — 2026-04-06 (Client decisions resolved in Section 8.1)
**Purpose:** Comprehensive specification for 6 interconnected changes to the GRCL platform. This document captures every nuance before BMAD implementation begins.

---

## Strategic Summary

These changes represent a single strategic evolution:

> **From:** "Nigerian SME with a professional website"
> **To:** "Pan-African group with heritage, social impact, and continental ambition"

The 6 workstreams are interdependent:

| # | Workstream | What It Signals |
|---|-----------|-----------------|
| 1 | Legacy Logo Restoration | Heritage & continuity — "we've been here" |
| 2 | SRADA Community Impact | Social responsibility — "we give back" |
| 3 | Pan-African Copy Rewrite | Ambition & scale — "we're going somewhere" |
| 4 | Image Strategy | Visual maturity — "we look like who we are" |
| 5 | Business Card Designs | Professional operations — "we're boardroom-ready" |
| 6 | Letterhead Update | Corporate identity — "our documents match our digital presence" |

**Core Positioning Principle:** *"Nigeria is our launchpad. Africa is our arena."*

We never erase Nigeria. We expand the frame. Every mention of Nigeria stays grounded and authentic — but it now sits within a continental context that signals growth trajectory and pan-African ambition.

---

## 1. Legacy Logo Restoration

### 1.1 Source Material

**File:** `docs/Black & Yellow Modern Professional Letterhead (2).pdf`

**Logo Description (from visual inspection):**
- **Shape:** Dark charcoal/black rounded shield/badge
- **Central motif:** Green circle containing a yellow sun with radiating rays above green stylized leaves/plant forms
- **Text:** "GLOBAL RESOURCES" / "CITADEL LTD." in lime green, stacked below the emblem
- **Symbolism:** Sun (growth/energy) + leaves (agriculture/nature) = the company's agricultural roots

**Original Colour Palette:**
| Element | Colour | Approximate Hex |
|---------|--------|----------------|
| Shield background | Near-black charcoal | #2D2D2D |
| Sun rays | Bright yellow | #FFF200 |
| Leaves/plant | Lime green | #8DC63F |
| Company text | Lime green | #8DC63F |
| Letterhead footer bar | Lime green | #8DC63F |

### 1.2 Extraction & Production Plan

**~~Step 1: SVG Recreation~~ — SUPERSEDED**
Client approved the extracted PNG (`docs/logo-legacy-1024.png`) as the production asset. No SVG recreation required.

**Step 2: Production Assets (Approved)**
The following PNG derivatives have been produced from the extracted logo:

| Variant | File | Purpose |
|---------|------|---------|
| Full colour (all contexts) | `src/assets/brand/logo-legacy.png` | Header, footer, all site contexts |
| Favicon mark | `src/assets/brand/logo-legacy-favicon.png` | Favicon (32px shield mark) |
| High-res source | `docs/logo-legacy-1024.png` | Print, formal documents, letterhead |

**Step 3: Design System Integration**
- The logo retains its own original colours (lime green, yellow, charcoal). These are NOT added to the site's design token palette.
- The site continues using forest green (#14532D) + gold (#B48A3E) for all UI elements.
- The logo's lime green and the site's forest green are both "green" — they coexist because the logo is a self-contained brand mark, not a UI element.
- This is standard practice: many conglomerates have heritage logos whose colours differ slightly from their digital design system.

### 1.3 Website Implementation

| Location | Current Asset | New Asset |
|----------|--------------|-----------|
| Header (solid/scrolled) | `grcl-emblem.png` | `logo-legacy.png` |
| Header (transparent/hero) | `grcl-emblem.png` | `logo-legacy.png` (transparent bg works on both) |
| Footer | `grcl-emblem.png` | `logo-legacy.png` |
| Favicon | `logo-monogram.svg` (GRC circle) | `logo-legacy-favicon.png` (shield mark) |
| Social/OG image | Current OG default | Updated with legacy logo |
| About page | Any logo references | Legacy logo |

**Important:** The existing `grcl-emblem.png` (ornate baroque crest) and `logo-primary.svg` / `logo-reversed.svg` (GRC monogram + wordmark) files are RETAINED in the repo as historical/alternative assets but are no longer the active brand mark.

### 1.4 Logo Sizing Guidelines

| Context | Max Height | Notes |
|---------|-----------|-------|
| Header (desktop) | 60-80px | Shield + text lockup |
| Header (mobile) | 48-56px | Shield + text lockup, or shield mark only |
| Footer | 64px | Full lockup |
| Favicon | 32px (rendered at 16px) | Shield mark only, simplified |
| Business card | 20mm | Full lockup |
| Letterhead | 35mm | Full lockup, centred |

---

## 2. SRADA — Community Impact Integration (Option A)

### 2.1 Strategic Positioning

**Entity:** Support Rural Agricultural Development Association (SRADA)
**Type:** Charity / Voluntary Organisation
**Relationship to GRCL:** Social impact initiative supported by the Group

**Why Option A (not a division):**
- SRADA is a charitable entity, not a profit centre — mixing it with commercial divisions confuses the credibility message
- The Bento grid's 7-division visual hierarchy was specifically designed around commercial tier encoding (core/supporting/aspirational) — an 8th charitable card breaks the information architecture
- Positioning SRADA as a standalone Community Impact arm is how serious African conglomerates operate (cf. Dangote Foundation, Heirs Foundation, Tony Elumelu Foundation)
- It becomes a **credibility multiplier**: "profitable enough to give back" signals maturity to investors and partners

**Reversibility:** If the client prefers Option B (SRADA as 8th division in a new cluster), the content structure we create here can be promoted to a full division with minimal refactoring — the YAML content, page route, and copy are all reusable.

### 2.2 Information Architecture — Where SRADA Lives

| Location | How It Appears |
|----------|---------------|
| **Homepage** | New "Community Impact" section between Credibility Stats and Insights — features SRADA with a card linking to its dedicated page |
| **Navigation (desktop)** | New item under "About the Group" dropdown: "Community Impact" |
| **Navigation (mobile)** | Listed under "About the Group" accordion section |
| **Route** | `/community-impact/` — dedicated page |
| **About page** | New anchor section "Community Impact" after Group Structure, before Credentials |
| **Footer** | Listed under "The Group" column: "Community Impact" link |
| **Investors & Partners** | New "Social Impact" subsection highlighting SRADA as part of GRCL's ESG story |
| **Contact page** | New pathway card: "Community & SRADA" for partnership/volunteer inquiries |

### 2.3 SRADA Page Structure (`/community-impact/`)

```
Route: /community-impact/
Template: Standalone page (similar structure to About, not a division detail page)
Breadcrumb: Home > Community Impact
```

**Sections:**

1. **Hero**
   - Eyebrow: "Community Impact"
   - Heading: "Strengthening Rural Communities Across Africa"
   - Subtitle: Brief positioning statement about GRCL's commitment to sustainable rural development
   - Image: Authentic rural agricultural community scene (African context)

2. **About SRADA**
   - What SRADA is and its mission
   - Relationship to GRCL ("Founded and supported by Global Resources Citadel")
   - Focus areas: rural agricultural development, farmer training, community empowerment
   - Geographic scope (align with pan-African positioning)

3. **Impact Areas** (capability cards, similar pattern to division capabilities)
   - Rural farmer training & capacity building
   - Agricultural input access & supply chain support
   - Community infrastructure development
   - Knowledge transfer & best practice dissemination

4. **Impact Stats** (if available — otherwise omit, don't fabricate)
   - Communities supported
   - Farmers trained
   - Hectares impacted
   - States/countries reached

5. **How to Get Involved**
   - Partnership opportunities
   - Volunteer pathways
   - Donation/support information (if applicable)
   - CTA: "Partner With SRADA" → routes to contact form with SRADA variant

6. **CTA Banner**
   - Heading: "Building Stronger Rural Communities Together"
   - Link to contact page with SRADA inquiry routing

### 2.4 Content Implementation

**No new content collection needed.** SRADA is implemented as:
- A standalone `.astro` page at `src/pages/community-impact.astro`
- Content hardcoded in the page (like the About page pattern) or via a new entry in the `pages` content collection (`src/content/pages/community-impact.mdx`)
- A contact form variant for SRADA inquiries (new variant in the existing form system)

**If client later wants Option B:** Promote to a division by:
1. Creating `src/content/divisions/srada.yaml`
2. Creating a new cluster `community-development` or adding to an existing one
3. Updating the Bento grid to accommodate 8 cards
4. Moving the page from `/community-impact/` to `/divisions/srada/`

### 2.5 Copy — SRADA Content (Draft)

**Client must provide or confirm:**
- SRADA's exact mission statement
- Specific programmes and activities
- Geographic areas of operation
- Impact metrics (if any exist)
- Whether SRADA has its own logo/visual identity or operates under GRCL brand
- Whether SRADA accepts external donations/volunteers

**Draft copy (to be refined with client input):**

> **About SRADA:**
> The Support Rural Agricultural Development Association (SRADA) is Global Resources Citadel's dedicated social impact initiative, founded to channel the Group's agricultural expertise into sustainable rural community development across Africa.
>
> While GRCL's commercial divisions build integrated value chains at industrial scale, SRADA works at the grassroots — training smallholder farmers, improving access to quality agricultural inputs, and strengthening the rural infrastructure that underpins Africa's food security.
>
> SRADA represents GRCL's belief that lasting business success and community prosperity are inseparable. By investing in the capacity of rural farming communities, we strengthen the foundation on which Africa's agricultural economy grows.

---

## 3. Pan-African Copy Rewrite — Page by Page

### 3.1 Guiding Principles

1. **Root Layer (always present):** GRCL is headquartered in Lagos, founded in Nigeria, with deep Nigerian operational experience. This is never erased.
2. **Expansion Layer (new):** Operations, partnerships, and market development extending across West Africa and the African continent.
3. **Vision Layer (aspirational):** Positioning for Africa's economic transformation — continental food security, intra-African trade (AfCFTA), pan-African infrastructure.

**Rules:**
- Replace "Nigerian conglomerate" with "pan-African conglomerate headquartered in Lagos" or similar
- Replace "Nigeria's future" with "Africa's future" where the context is aspirational
- Keep Nigeria-specific operational details (address, states, regulations) — these are authentic grounding
- Add continental context sentences to each division overview
- Update stats from Nigeria-only to include regional metrics where credible
- Reference AfCFTA (African Continental Free Trade Area), ECOWAS, and continental market sizing where relevant
- SEO metadata broadens keyword targets from "Nigeria" to "Africa" / "West Africa" / "pan-African"

### 3.2 Homepage (`src/pages/index.astro`)

#### Hero Section

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Building Nigeria's Future Across Seven Sectors" | "Building Africa's Future From Nigeria's Strongest Foundations" |
| Subtitle | "From agriculture to energy, Global Resources Citadel is creating integrated value chains that drive economic growth and opportunity." | "From agriculture to energy, Global Resources Citadel is creating integrated value chains that drive economic growth and opportunity across Africa's fastest-growing markets." |
| Primary CTA | "Explore Our Divisions" | No change |
| Secondary CTA | "Partner With Us" | No change |

#### Business Overview Section

| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "Our Business" | No change |
| Heading | "A Multi-Division Business Built for Scale" | "A Pan-African Business Built for Scale" |
| Subtitle | "Global Resources Citadel operates across interconnected sectors, each strengthening the others. Our agricultural foundation feeds our processing capacity. Our trade networks connect our products to markets. Our infrastructure investments build the platforms for future growth." | "Global Resources Citadel operates across interconnected sectors, each strengthening the others. Our agricultural foundation feeds our processing capacity. Our trade networks connect our products to markets across the continent. Our infrastructure investments build the platforms for Africa's next phase of growth." |

#### Divisions Section

| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "Our Divisions" | No change |
| Heading | "Seven Verticals. One Vision." | "Eight Verticals. One Vision." (if SRADA counts) OR keep "Seven Verticals. One Vision." if SRADA is separate — **Recommendation: Keep "Seven Verticals. One Vision." since SRADA is Option A (not a division)** |

#### Credibility Stats

| Stat | Current | Proposed |
|------|---------|----------|
| Divisions | "7 Divisions Active" | No change (SRADA is not a division under Option A) |
| Years | "15+ Years in Business" | No change |
| Geographic | "6 Nigerian States" | "Operations Across West Africa" or "X African Markets" |
| Partners | "40+ Business Partners" | "40+ Partners Across Africa" |

#### NEW: Community Impact Section (between Stats and Insights)

**Eyebrow:** "Community Impact"
**Heading:** "Giving Back to the Communities That Sustain Us"
**Body:** Brief SRADA introduction (2-3 sentences)
**Card:** SRADA feature card with link to `/community-impact/`
**CTA:** "Learn About Our Impact"

#### Insights Section

No copy changes needed — this section is content-driven.

#### CTA Banner

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Ready to Work With Us?" | No change |
| Body | "Whether you're an investor, partner, or potential collaborator, we'd welcome the opportunity to explore how we can create mutual value." | No change (already geographically neutral) |

#### SEO Metadata

| Field | Current | Proposed |
|-------|---------|----------|
| Title | (uses default) | "Global Resources Citadel — Pan-African Conglomerate | Agriculture, Trade, Energy" |
| Description | (check current) | "A pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy. Eight business divisions serving Africa's fastest-growing markets." |

---

### 3.3 About Page (`src/pages/about.astro` + `src/content/pages/about.mdx`)

#### Hero Section

| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "About the Group" | No change |
| Heading | "Who We Are" | No change |
| Subtitle | "A diversified Nigerian conglomerate building integrated value chains across agriculture, trade, real estate, and energy." | "A pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy — from Nigeria's strongest foundations to Africa's fastest-growing markets." |

#### Profile Badges

| Badge | Current | Proposed |
|-------|---------|----------|
| 1 | "Founded 2011" | No change |
| 2 | "Headquarters: Lagos, Nigeria" | "Headquarters: Lagos, Nigeria" (keep — this is authentic grounding) |
| 3 | "7 Business Divisions" | No change |

#### About MDX Body Copy

**Current opening paragraph:**
> "Global Resources Citadel Limited was founded with a clear mandate: to build integrated, sustainable business operations that contribute meaningfully to Nigeria's economic development."

**Proposed:**
> "Global Resources Citadel Limited was founded with a clear mandate: to build integrated, sustainable business operations that contribute meaningfully to economic development across Africa. Rooted in Nigeria — one of the continent's most dynamic economies — the Group has grown from its agricultural origins into a diversified conglomerate with operations and partnerships spanning West Africa and beyond."

**Current second paragraph:**
> "Today, GRCL operates across the full agricultural value chain — from large-scale crop farming and livestock production through industrial agro-processing — while simultaneously building presence in commodity trading, international commerce, real estate development, and energy."

**Proposed:**
> "Today, GRCL operates across the full agricultural value chain — from large-scale crop farming and livestock production through industrial agro-processing — while simultaneously building presence in commodity trading, cross-border commerce, real estate development, and energy infrastructure. Each division serves markets that extend well beyond Nigeria's borders, connecting African producers to continental and global demand."

**Current third paragraph:**
> "Our approach is rooted in vertical integration..."

**Proposed (minimal change — this paragraph is already geographically neutral):**
> "Our approach is rooted in vertical integration. By controlling multiple stages of production and distribution, we reduce inefficiencies, maintain quality standards, and create value at every link in the chain. This model also allows us to respond quickly to market opportunities and to build resilience against the supply-chain disruptions that characterise emerging African markets."

**Current fourth paragraph:**
> "Headquartered in Lagos with operational sites across Nigeria's most productive regions, GRCL employs a growing workforce of professionals, technicians, and field operators. Our leadership team brings decades of combined experience across agriculture, finance, trade, and industrial operations — providing the strategic depth required to manage a multi-sector portfolio in one of Africa's most dynamic economies."

**Proposed:**
> "Headquartered in Lagos with operational sites across West Africa's most productive regions, GRCL employs a growing workforce of professionals, technicians, and field operators. Our leadership team brings decades of combined experience across agriculture, finance, trade, and industrial operations — providing the strategic depth required to manage a multi-sector portfolio across a continent defined by rapid growth and immense opportunity."

#### Mission Statement (about.mdx frontmatter)

**Current:**
> "To build integrated value chains across Nigeria's key economic sectors, creating sustainable growth, employment, and shared prosperity through operational excellence and deep community commitment."

**Proposed:**
> "To build integrated value chains across Africa's key economic sectors — rooted in Nigeria's agricultural heartland and extending across the continent — creating sustainable growth, employment, and shared prosperity through operational excellence and deep community commitment."

#### Vision Statement (about.mdx frontmatter)

**Current:**
> "To become West Africa's most trusted diversified industrial group — recognised for integrity, innovation, and the measurable impact of our operations on the communities and markets we serve."

**Proposed:**
> "To become Africa's most trusted diversified industrial group — recognised for integrity, innovation, and the measurable impact of our operations on the communities and markets we serve across the continent."

#### Values (about.mdx frontmatter)

| Value | Current Description | Proposed Description |
|-------|-------------------|---------------------|
| Integrity | "Operating with transparency and accountability in every transaction, partnership, and commitment we make." | No change (geographically neutral) |
| Excellence | "Pursuing the highest standards in operations, governance, and stakeholder engagement across all divisions." | No change |
| Partnership | "Building lasting relationships with communities, investors, and partners grounded in mutual respect and shared value." | No change |
| Sustainability | "Investing in practices that protect Nigeria's natural resources while driving long-term economic growth." | "Investing in practices that protect Africa's natural resources while driving long-term economic growth across the continent." |

#### Group Structure Section

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "How Our Divisions Connect" | No change |
| Subtitle | "Our divisions operate within three strategic clusters, creating an integrated value chain." | No change |
| Body | "Each cluster groups complementary divisions that share supply chains, market knowledge, and operational infrastructure. This structure enables GRCL to capture value at every stage — from primary production through processing, trading, and distribution." | "Each cluster groups complementary divisions that share supply chains, market knowledge, and operational infrastructure. This structure enables GRCL to capture value at every stage — from primary production through processing, trading, and distribution — across multiple African markets." |

#### NEW: Community Impact Anchor Section (after Group Structure, before Credentials)

**Anchor label:** "Community Impact"
**Heading:** "Giving Back Through SRADA"
**Body:** 2-3 paragraph summary of SRADA with link to `/community-impact/`
**CTA:** "Learn More About Our Impact"

#### SEO Metadata

| Field | Current | Proposed |
|-------|---------|----------|
| seoTitle | "About Global Resources Citadel — Our Story, Mission, Leadership & Group Structure" | "About Global Resources Citadel — Pan-African Conglomerate | Story, Mission, Leadership" |
| seoDescription | "Learn about Global Resources Citadel Limited, a Nigerian conglomerate with integrated operations across agriculture, trade, and energy." | "Learn about Global Resources Citadel Limited, a pan-African conglomerate headquartered in Lagos with integrated operations across agriculture, trade, real estate, and energy." |

---

### 3.4 Divisions Hub (`src/pages/divisions/index.astro`)

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Built Across Sectors. United by Purpose." | No change (already geographically neutral — strong line) |
| Body | "Seven business divisions across agriculture, trade, infrastructure, and energy — each with distinct capabilities, unified by shared values and a common vision for Nigeria's future." | "Seven business divisions across agriculture, trade, infrastructure, and energy — each with distinct capabilities, unified by shared values and a common vision for Africa's future." |
| SEO Description | "Explore Global Resources Citadel's seven business divisions across agriculture, agro-processing, commodity marketing, real estate, import/export, and oil & gas." | "Explore Global Resources Citadel's seven business divisions — agriculture, agro-processing, commodity trading, real estate, import/export, and oil & gas — serving markets across Africa." |

---

### 3.5 Division Content — All 7 Divisions

#### 3.5.1 Crop Farming (`src/content/divisions/crop-farming.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Feeding Nigeria's future through sustainable, large-scale crop production" | "Feeding Africa's future through sustainable, large-scale crop production rooted in Nigeria's agricultural heartland" |
| overview ¶1 | "...the division produces staple crops including maize, rice, soybeans, and cassava at commercial scale. Our farming operations integrate modern agronomic practices with deep local knowledge to deliver consistent yields that serve both domestic food security and export markets." | "...the division produces staple crops including maize, rice, soybeans, and cassava at commercial scale. Our farming operations integrate modern agronomic practices with deep local knowledge to deliver consistent yields that serve domestic food security, regional supply chains, and export markets across the continent." |
| overview ¶2 | No changes needed (geographically neutral — talks about equipment and practices) | No change |
| overview ¶3 | "...positions GRCL as a reliable upstream supplier to food manufacturers, commodity traders, and government food procurement programmes across West Africa." | "...positions GRCL as a reliable upstream supplier to food manufacturers, commodity traders, and government food procurement programmes across Africa — from Nigeria's fertile middle belt to markets spanning the ECOWAS corridor and beyond." |
| capability: Large-Scale Cultivation | "Multi-crop farming operations spanning thousands of hectares across Nigeria's most productive agricultural belts." | "Multi-crop farming operations spanning thousands of hectares across West Africa's most productive agricultural belts." |
| seoTitle | "Crop Farming — Global Resources Citadel \| Agriculture & Processing" | No change |
| seoDescription | "Explore Global Resources Citadel's Crop Farming division. Large-scale cultivation, post-harvest management, and seed technology across Nigeria." | "Explore Global Resources Citadel's Crop Farming division. Large-scale cultivation, post-harvest management, and seed technology across West Africa." |

#### 3.5.2 Animal Husbandry (`src/content/divisions/animal-husbandry.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Building Nigeria's protein infrastructure through modern livestock management" | "Building Africa's protein infrastructure through modern livestock management" |
| overview ¶1 | "...designed to address Nigeria's growing demand for quality animal protein." | "...designed to address Africa's growing demand for quality animal protein, starting with Nigeria's domestic market and extending across the West African region." |
| overview ¶3 | "With Nigeria importing billions of naira worth of animal protein annually, the Animal Husbandry division is positioned to capture domestic market share while building the technical capacity for eventual export readiness across the West African region." | "With African nations importing billions of dollars worth of animal protein annually, the Animal Husbandry division is positioned to capture market share across the region while building the technical capacity and infrastructure for continental-scale production and distribution." |
| seoDescription | "Discover Global Resources Citadel's Animal Husbandry division. Cattle ranching, poultry production, and aquaculture serving Nigeria's protein needs." | "Discover Global Resources Citadel's Animal Husbandry division. Cattle ranching, poultry production, and aquaculture serving Africa's growing protein needs." |

#### 3.5.3 Agro-Processing (`src/content/divisions/agro-processing.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Transforming raw agricultural output into market-ready products across Nigeria" | "Transforming raw agricultural output into market-ready products for African and global markets" |
| overview ¶2 | "...ensuring that outputs meet the quality requirements of domestic retailers, food service operators, and export markets." | No change (already references export markets) |
| overview ¶3 | "...reducing the nation's dependence on imported processed foods." | "...reducing the continent's dependence on imported processed foods and building Africa's capacity for value-added agricultural production." |
| seoDescription | "Learn about Global Resources Citadel's Agro-Processing division. Grain milling, oil extraction, and food packaging operations across Nigeria." | "Learn about Global Resources Citadel's Agro-Processing division. Grain milling, oil extraction, and food packaging operations serving African markets." |

#### 3.5.4 Commodity Marketing (`src/content/divisions/commodity-marketing.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Connecting Nigerian commodities to domestic and international markets" | "Connecting African commodities to continental and global markets" |
| overview ¶1 | "...managing the sourcing, aggregation, and sale of agricultural commodities across domestic and international markets." | No change (already geographically broad) |
| overview ¶2 | "Operating from strategically located trading offices, the division provides price discovery, logistics coordination, and risk management services that help Nigerian producers access premium markets." | "Operating from strategically located trading offices, the division provides price discovery, logistics coordination, and risk management services that help African producers access premium markets. With the African Continental Free Trade Area (AfCFTA) opening new corridors for intra-African commerce, the division is positioned to capitalise on the continent's expanding trade infrastructure." |
| overview ¶3 | "...aggregate supply from multiple sources — including GRCL's own farming operations — and deliver consistent quality and volume to buyers who require reliability above all else." | No change (geographically neutral) |
| seoDescription | "Explore Global Resources Citadel's Commodity Marketing division. Agricultural commodity trading, market intelligence, and logistics across Africa." | No change (already says "across Africa") |

#### 3.5.5 Import & Export (`src/content/divisions/import-export.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Facilitating cross-border trade that strengthens Nigeria's global commerce position" | "Facilitating cross-border trade that strengthens Africa's position in global commerce" |
| overview ¶1 | "...handling the movement of goods across Nigeria's borders with efficiency and regulatory compliance." | "...handling the movement of goods across borders with efficiency and regulatory compliance, leveraging Nigeria's position as West Africa's largest trading economy." |
| overview ¶1 cont. | "...while exporting Nigerian commodities and processed goods to markets across Africa and beyond." | No change (already pan-African) |
| overview ¶2 | "...navigates the complexities of cross-border commerce on behalf of both GRCL entities and third-party clients. Our team maintains relationships with shipping lines, freight forwarders, and port authorities to ensure smooth cargo movement through Nigeria's major ports." | "...navigates the complexities of cross-border commerce on behalf of both GRCL entities and third-party clients. Our team maintains relationships with shipping lines, freight forwarders, and port authorities across multiple African trade corridors to ensure smooth cargo movement through the continent's major ports." |
| seoDescription | "Discover Global Resources Citadel's Import & Export division. International logistics, customs brokerage, and cross-border trade services." | "Discover Global Resources Citadel's Import & Export division. International logistics, customs brokerage, and cross-border trade services across Africa." |

#### 3.5.6 Real Estate (`src/content/divisions/real-estate.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Developing quality commercial and residential spaces across Nigeria's growth corridors" | "Developing quality commercial and residential spaces across Africa's fastest-growing urban corridors" |
| overview ¶1 | "...building a portfolio of commercial and residential properties in Nigeria's fastest-growing urban centres." | "...building a portfolio of commercial and residential properties in some of Africa's fastest-growing urban centres, starting with Nigeria's major cities." |
| overview ¶1 cont. | "...addresses the country's acute housing deficit and growing demand for modern commercial spaces" | "...addresses Africa's acute housing deficit — estimated at over 50 million units continent-wide — and the growing demand for modern commercial spaces" |
| overview ¶2 | "...residential estates targeting Nigeria's expanding middle class." | "...residential estates targeting Africa's rapidly expanding middle class." |
| overview ¶3 | "...GRCL's strategic bet on Nigeria's urbanisation trajectory." | "...GRCL's strategic bet on Africa's urbanisation trajectory — the fastest on the planet." |
| capability: Residential Estates | "Quality housing developments targeting middle-income buyers in Nigeria's major urban corridors." | "Quality housing developments targeting middle-income buyers across Africa's major urban corridors." |
| seoDescription | "Learn about Global Resources Citadel's Real Estate division. Commercial and residential property development across Nigeria's growth corridors." | "Learn about Global Resources Citadel's Real Estate division. Commercial and residential property development across Africa's fastest-growing urban corridors." |

#### 3.5.7 Oil & Gas (`src/content/divisions/oil-gas.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Positioning for Nigeria's evolving energy landscape through strategic partnerships" | "Positioning for Africa's evolving energy landscape through strategic partnerships" |
| overview ¶1 | "...focusing on downstream petroleum distribution and emerging opportunities in gas infrastructure." | No change (geographically neutral) |
| overview ¶1 cont. | "...partnerships with established industry players" | No change |
| overview ¶2 | "Nigeria's energy sector remains one of Africa's largest, and GRCL's approach prioritises low-risk entry points..." | No change (already references Africa) |
| overview ¶3 | "...expanding into upstream service provision and renewable energy as the Nigerian market evolves." | "...expanding into upstream service provision and renewable energy as African energy markets evolve and the continent's transition to cleaner energy accelerates." |
| capability: LPG Operations | "...targeting Nigeria's growing clean cooking fuel market." | "...targeting Africa's growing clean cooking fuel market, where over 900 million people still lack access to clean cooking solutions." |
| capability: Strategic Partnerships | "...established Nigerian energy companies and international operators." | "...established African energy companies and international operators." |
| seoDescription | "Explore Global Resources Citadel's Oil & Gas division. Fuel distribution, LPG operations, and energy sector partnerships across Nigeria." | "Explore Global Resources Citadel's Oil & Gas division. Fuel distribution, LPG operations, and energy sector partnerships across Africa." |

---

### 3.6 Cluster Content — All 3 Clusters

#### Agriculture & Processing (`src/content/clusters/agriculture-processing.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "From field to finished product — integrated agricultural operations powering Nigeria's food value chain." | "From field to finished product — integrated agricultural operations powering Africa's food value chain." |
| overview ¶1 | No change needed (describes GRCL's portfolio structure) | No change |
| overview ¶2 | "Nigeria's agricultural sector employs over 35% of the workforce and contributes significantly to GDP, yet productivity gaps and post-harvest losses remain persistent challenges." | "Africa's agricultural sector employs over 60% of the continent's workforce and holds the key to feeding a population projected to reach 2.5 billion by 2050 — yet productivity gaps and post-harvest losses remain persistent challenges. In Nigeria alone, the sector employs over 35% of the workforce while leaving enormous value on the table." |
| overview ¶3 | No change needed (geographically neutral — describes integration model) | No change |
| seoDescription | "Explore GRCL's Agriculture & Processing cluster. Integrated crop farming, animal husbandry, and agro-processing operations across Nigeria." | "Explore GRCL's Agriculture & Processing cluster. Integrated crop farming, animal husbandry, and agro-processing operations serving African markets." |

#### Trade & Markets (`src/content/clusters/trade-markets.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Connecting producers to markets — commodity trading and international commerce across Africa and beyond." | No change (already pan-African) |
| overview ¶2 | "Nigeria sits at the crossroads of West African trade, with access to a domestic market of over 200 million consumers and proximity to regional markets through ECOWAS trade frameworks. GRCL's Trade & Markets cluster is positioned to capitalise on this opportunity, providing the market access, logistics infrastructure, and trade finance capabilities that connect Nigerian producers to buyers across the continent and beyond." | "Nigeria sits at the crossroads of African trade, with access to a domestic market of over 200 million consumers, proximity to regional markets through ECOWAS, and new continental corridors opening under the African Continental Free Trade Area (AfCFTA). GRCL's Trade & Markets cluster is positioned to capitalise on these converging opportunities, providing the market access, logistics infrastructure, and trade finance capabilities that connect African producers to buyers across the continent and beyond." |
| overview ¶3 | "...serving third-party clients who need reliable trade and logistics partners in Nigeria's complex commercial landscape." | "...serving third-party clients who need reliable trade and logistics partners across Africa's complex and rapidly evolving commercial landscape." |
| seoDescription | "Discover GRCL's Trade & Markets cluster. Commodity trading, international logistics, and cross-border commerce across Africa." | No change (already pan-African) |

#### Built Environment & Energy (`src/content/clusters/built-environment-energy.yaml`)

| Field | Current | Proposed |
|-------|---------|----------|
| tagline | "Strategic investments in real estate and energy infrastructure for Nigeria's next growth phase." | "Strategic investments in real estate and energy infrastructure for Africa's next growth phase." |
| overview ¶1 | "...forward-looking investments in two of Nigeria's highest-growth sectors." | "...forward-looking investments in two of Africa's highest-growth sectors." |
| overview ¶2 | "Nigeria's housing deficit exceeds 17 million units, while energy demand continues to outpace supply infrastructure." | "Africa's housing deficit exceeds 50 million units — with Nigeria alone accounting for 17 million — while energy demand across the continent continues to outpace supply infrastructure." |
| overview ¶3 | "...sectors that will define Nigeria's economic landscape for decades to come." | "...sectors that will define Africa's economic landscape for decades to come." |
| seoDescription | "Learn about GRCL's Built Environment & Energy cluster. Real estate development and energy operations across Nigeria's growth corridors." | "Learn about GRCL's Built Environment & Energy cluster. Real estate development and energy operations across Africa's fastest-growing corridors." |

---

### 3.7 Investors & Partners Page (`src/pages/investors-partners.astro` + `src/content/pages/investors-partners.mdx`)

#### Hero Section

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Partner With a Group Built for Scale" | No change (strong, geographically neutral) |
| Subtitle | "A diversified Nigerian conglomerate offering structured entry points for investment, partnership, and strategic collaboration across seven business divisions." | "A diversified pan-African conglomerate headquartered in Lagos, offering structured entry points for investment, partnership, and strategic collaboration across seven business divisions and three strategic clusters." |

#### Why Partner (MDX frontmatter)

**Current opening:**
> "Global Resources Citadel represents a rare opportunity in the Nigerian market..."

**Proposed:**
> "Global Resources Citadel represents a rare opportunity in the African market: a vertically integrated conglomerate with operational depth across seven business divisions and three strategic clusters, headquartered in Nigeria — the continent's largest economy — with operations and partnerships extending across West Africa."

**Current second paragraph:**
> "Nigeria's agricultural and industrial sectors are undergoing rapid modernisation..."

**Proposed:**
> "Africa's agricultural and industrial sectors are undergoing rapid modernisation, driven by population growth, urbanisation, continental trade integration through AfCFTA, and government policy reforms across the region. GRCL is positioned at the intersection of these trends, with established operations in Nigeria, proven management, and clear growth trajectories across our portfolio."

**Current third paragraph:**
> "Whether you are an institutional investor seeking diversified exposure to West African growth markets..."

**Proposed:**
> "Whether you are an institutional investor seeking diversified exposure to African growth markets, a strategic partner looking to extend your value chain into the continent, or a development finance institution focused on agricultural transformation, GRCL offers a platform with the governance, track record, and operational infrastructure to support meaningful engagement."

#### Portfolio Strength Stats

| Stat | Current | Proposed |
|------|---------|----------|
| 1 | "15+ Years Operating" | No change |
| 2 | "7 Divisions Active" | No change |
| 3 | "3 Strategic Clusters" | No change |
| 4 | "6+ Markets Served" | "Markets Across Africa" or "Pan-African Operations" |

#### NEW: Social Impact Section

Add a section highlighting SRADA as part of the ESG narrative:
- **Heading:** "Community Impact & Social Responsibility"
- **Body:** Brief SRADA overview positioned as ESG commitment
- **CTA:** Link to `/community-impact/`

#### MDX Body Copy

**Current:**
> "...seeking exposure to Nigeria's agricultural, trade, and infrastructure sectors."

**Proposed:**
> "...seeking exposure to Africa's agricultural, trade, and infrastructure sectors, with Nigeria as the primary operational base and gateway to continental markets."

#### SEO Metadata

| Field | Current | Proposed |
|-------|---------|----------|
| seoTitle | "Investors & Partners — Strategic Opportunities \| Global Resources Citadel" | "Investors & Partners — Pan-African Investment Opportunities \| Global Resources Citadel" |
| seoDescription | "Explore partnership and investment opportunities with Global Resources Citadel Limited, a diversified Nigerian conglomerate." | "Explore partnership and investment opportunities with Global Resources Citadel Limited, a diversified pan-African conglomerate headquartered in Lagos." |

---

### 3.8 Contact Pages

#### Contact Hub (`src/pages/contact/index.astro`)

| Element | Current | Proposed |
|---------|---------|----------|
| Hero heading | "Get In Touch" | No change |
| Hero subtitle | "Choose the right pathway to reach the team you need." | No change (geographically neutral) |
| General card | "For general questions about Global Resources Citadel." | No change |
| NEW: SRADA card | N/A | "For community partnership, volunteer, or SRADA enquiries." → Routes to SRADA contact form or general form with SRADA subject |

#### Strategic Contact (`src/pages/contact/strategic.astro`)

| Element | Current | Proposed |
|---------|---------|----------|
| Subtitle | "For strategic partnerships, investment discussions, or institutional engagement with Global Resources Citadel." | "For strategic partnerships, investment discussions, or institutional engagement with Global Resources Citadel — across any of our African markets." |

---

### 3.9 Footer (`src/components/layout/Footer.astro`)

#### Brand Statement

**Current:**
> "Global Resources Citadel Limited is a diversified Nigerian conglomerate building integrated value chains across agriculture, trade, real estate, and energy. Seven business divisions working together to strengthen Nigeria's economic foundations."

**Proposed:**
> "Global Resources Citadel Limited is a pan-African conglomerate headquartered in Lagos, building integrated value chains across agriculture, trade, real estate, and energy. Seven business divisions working together to strengthen economic foundations across the continent."

#### Footer Navigation — "The Group" Column

**Current:**
- About the Group
- Leadership
- Group Structure
- Credentials

**Proposed (add Community Impact):**
- About the Group
- Leadership
- Group Structure
- Community Impact ← NEW
- Credentials

---

### 3.10 SEO & Structured Data (`src/lib/seo.ts`)

#### Organization JSON-LD

**Current:**
```json
{
  "description": "A Nigerian conglomerate operating across agriculture, trade, real estate, and energy verticals."
}
```

**Proposed:**
```json
{
  "description": "A pan-African conglomerate headquartered in Lagos, Nigeria, operating across agriculture, trade, real estate, and energy verticals with operations spanning West Africa."
}
```

---

### 3.11 FAQ Content (`src/content/faqs/faqs.yaml`)

| FAQ ID | Current Answer Snippet | Proposed Change |
|--------|----------------------|-----------------|
| homepage-what-does-grcl-do | "GRCL is a diversified Nigerian conglomerate..." | "GRCL is a diversified pan-African conglomerate headquartered in Lagos..." |
| homepage-where-operates | "Our operations are headquartered in Abuja..." | **FIX: Change "Abuja" to "Lagos"** (HQ is Lagos per all other docs) + Add: "...with a growing presence across West Africa's key economic corridors" |
| homepage-divisions-structure | "Our seven divisions are organized into three strategic clusters..." | No change (geographically neutral) |
| about-founded | "...contribute meaningfully to Nigeria's economic development" | "...contribute meaningfully to economic development across Africa, starting from Nigeria" |
| about-differentiator | "What sets GRCL apart from other Nigerian conglomerates?" | "What sets GRCL apart from other African conglomerates?" |
| about-sustainability | No current pan-African angle | Add: "Through SRADA, our dedicated community impact initiative, we extend these practices to support rural agricultural development across the region." |
| about-local-development | "We create employment across Nigeria's economic zones..." | "We create employment across Africa's economic zones, with a primary footprint in Nigeria's most productive regions..." |

**NEW FAQ entries to add:**

```yaml
- id: homepage-pan-african
  question: Is GRCL a Nigerian company or a pan-African company?
  answer: GRCL is proudly Nigerian — headquartered in Lagos with deep roots across the country's most productive regions. At the same time, our operations, partnerships, and market reach extend across West Africa and the broader continent. We see Nigeria as our launchpad and Africa as our arena.
  category: homepage
  sortOrder: 6

- id: about-srada
  question: What is SRADA and how does it relate to GRCL?
  answer: The Support Rural Agricultural Development Association (SRADA) is GRCL's dedicated social impact initiative, focused on strengthening rural farming communities through training, agricultural input access, and infrastructure support. SRADA channels the Group's agricultural expertise into sustainable community development.
  category: about
  sortOrder: 7
```

---

### 3.12 Legal Pages

#### Privacy Policy (`src/pages/privacy-policy.astro`)

| Element | Current | Proposed |
|---------|---------|----------|
| GRCL references | "Global Resources Citadel Limited" | No change (legal name stays) |
| Governing law | "laws of the Federal Republic of Nigeria" | No change (company is Nigerian-registered) |

**No pan-African changes needed for legal pages.** The legal entity is Nigerian. Governance and jurisdiction stay Nigerian. This is correct.

#### Terms of Use (`src/pages/terms.astro`)

Same as privacy — no changes. Legal jurisdiction remains Nigeria.

---

### 3.13 404 Page (`src/pages/404.astro`)

No copy changes needed — content is geographically neutral.

---

### 3.14 Search Page (`src/pages/search.astro`)

| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Search Global Resources Citadel" | No change |

---

## 4. Image Strategy — Page by Page

### 4.1 Sourcing Principles

**Rule 1: African Context, Always**
Every image must show African people, African landscapes, African infrastructure. No American farms, European factories, or Middle Eastern oil rigs.

**Rule 2: Authenticity Over Polish**
The UX spec explicitly warns: "Generic stock photography of farms, buildings, and oil rigs immediately signals inauthenticity to Nigerian audiences." We source images that feel real — natural lighting, real environments, working people.

**Rule 3: Pan-African, Not Poverty**
Show Africa's economic dynamism, not its struggles. Modern facilities, professional workers, thriving markets, growing cities. Absolutely no "poverty porn" imagery.

**Rule 4: Performance First**
Nigerian mobile users on variable bandwidth. Every image:
- Served via Astro Image/Picture component (automatic WebP/AVIF conversion)
- Lazy-loaded below the fold
- Responsive srcsets for different viewport widths
- Target: hero images < 150KB (compressed), section images < 80KB

### 4.2 Recommended Sources (Royalty-Free)

| Source | URL | Why |
|--------|-----|-----|
| **Unsplash** | unsplash.com | Large library, filter by African photographers/locations |
| **Pexels** | pexels.com | Free, good African content growing |
| **Iwaria** | iwaria.com | **African-focused stock library** — best fit |
| **Nappy** | nappy.co | Beautiful diverse/African photography |
| **Pixabay** | pixabay.com | Large free library, search "Africa" + sector terms |
| **Burst (Shopify)** | burst.shopify.com | Some good agricultural/business imagery |

### 4.3 Image Requirements by Page

#### Homepage (5-7 images)

| Section | Image Needed | Direction | Size |
|---------|-------------|-----------|------|
| Hero | Full-width background | Aerial view of African farmland at golden hour, OR a sweeping African landscape showing agricultural activity with modern elements | 1920x1080 max, hero quality |
| Business Overview | Section accent | Abstract or environmental — interconnected operations, supply chain visual | 800x600 |
| Bento Grid | 7 division card backgrounds | Each division needs a representative thumbnail (see division table below) | 600x400 per card |
| Community Impact (new) | SRADA feature | Rural agricultural community scene — training, farming, community gathering | 800x500 |
| CTA Banner | Optional background texture | Subtle green/gold gradient or African textile pattern | Pattern/texture |

#### Division Card Images (used in Bento Grid + Division Hub)

| Division | Image Direction | Search Terms |
|----------|----------------|-------------|
| Crop Farming | Lush green farmland, crops growing, or harvest activity — African context | "African agriculture", "Nigeria farming", "crop field Africa" |
| Animal Husbandry | Cattle herding, poultry facility, or fish farming — tropical/West African | "African livestock", "cattle Nigeria", "poultry farm Africa" |
| Agro-Processing | Processing facility interior, packaging line, food products | "food processing Africa", "grain mill", "agro processing" |
| Commodity Marketing | Market activity, commodity trading, grain storage/silos | "African commodity market", "grain trading", "agricultural trade" |
| Import & Export | Container port activity, shipping, logistics — African ports | "African port", "Lagos port", "shipping containers Africa" |
| Real Estate | Modern African urban development, construction, residential estates | "African real estate", "Lagos buildings", "modern African city" |
| Oil & Gas | Downstream fuel facilities, LPG distribution, energy infrastructure | "African energy", "fuel station Nigeria", "LPG Africa" |

#### About Page (3-4 images)

| Section | Image Needed | Direction |
|---------|-------------|-----------|
| Hero/Story | Company environment or leadership setting | Professional African business environment, office/boardroom |
| Group Structure | Organizational visual | Can remain diagram/illustration (current SVG approach works) |
| Community Impact (new) | SRADA visual | Rural community empowerment scene |
| Credentials | Optional | Certificate/document imagery or professional setting |

#### Division Detail Pages (3-4 images each)

Each of the 7 division pages should have:
1. **Hero image** — full-width, division-specific, high quality (1920x800)
2. **Capabilities section** — 1-2 supporting images showing operations
3. **Stats section** — optional background texture or subtle imagery

#### Investors & Partners Page (2-3 images)

| Section | Image Needed | Direction |
|---------|-------------|-----------|
| Hero | Professional/strategic | Handshake, boardroom, or skyline — African business context |
| Portfolio | Optional infographic style | Can use data visualization instead of photography |
| Social Impact (new) | SRADA/community | Reuse from community impact page |

#### Community Impact Page (3-4 images)

| Section | Image Needed | Direction |
|---------|-------------|-----------|
| Hero | Rural African community | Farmers in field, agricultural training, community gathering |
| Impact Areas | Activity-specific | Training sessions, farm inputs, community infrastructure |
| How to Get Involved | Partnership/collaboration | Handshake, group activity, volunteers |

#### Contact Pages (1-2 images)

| Page | Image Needed | Direction |
|------|-------------|-----------|
| Contact Hub | Optional | Map visualization or office exterior |
| Locations | Map or building | Lagos office/area, African map showing presence |

### 4.4 Image Naming Convention

```
src/assets/images/
├── hero/
│   ├── homepage-hero.jpg
│   ├── about-hero.jpg
│   ├── divisions-hero.jpg
│   └── community-impact-hero.jpg
├── divisions/
│   ├── crop-farming-hero.jpg
│   ├── crop-farming-operations.jpg
│   ├── animal-husbandry-hero.jpg
│   └── ...
├── sections/
│   ├── bento-crop-farming.jpg
│   ├── bento-animal-husbandry.jpg
│   └── ...
└── community/
    ├── srada-training.jpg
    ├── srada-community.jpg
    └── srada-farming.jpg
```

### 4.5 Image Attribution

All royalty-free images should have their attribution tracked in a file:
```
src/assets/images/ATTRIBUTIONS.md
```
Format: `filename | source | photographer | license | URL`

Even though most royalty-free licenses don't require attribution, tracking sources protects against future license disputes and is good practice.

---

## 5. Business Card Designs — 3 Concepts

All 3 concepts share:
- **Logo:** Legacy logo (shield crest with sun + leaves), used as-is
- **Typography:** Poppins (name/title) + Inter (contact details) — consistent with web
- **Colour palette:** Forest green (#14532D) + gold (#B48A3E) + the logo's own colours
- **Card size:** Standard 90mm x 55mm (3.5" x 2")
- **Editable fields:** Name, Title/Position, Division, Phone, Email, Direct Line (optional)
- **Format:** Delivered as self-contained HTML files (like letterhead), browser-printable

### Concept 1: "Heritage Classic"

**Front:**
- White/cream background
- Legacy logo centred, ~20mm height
- Horizontal gold accent line below logo
- Name: Poppins 600, forest green, centred
- Title: Inter 400, neutral-700, centred
- Division (optional): Inter 400, neutral-500, centred

**Back:**
- White background
- Contact details left-aligned in a clean stack:
  - Phone icon + number
  - Email icon + address
  - Location icon + address (2 lines)
  - Globe icon + website
- Forest green bar at bottom (8mm), company name in white: "Global Resources Citadel Limited"
- Gold thin line above the green bar

**Personality:** Traditional, restrained, timeless. Lets the logo speak.

### Concept 2: "Modern Executive"

**Front:**
- White background
- Logo top-left corner, ~15mm height
- Name: Poppins 700, large (14pt), forest green, left-aligned below logo with generous spacing
- Title: Inter 400, gold (#B48A3E), left-aligned
- Division: Inter 400, neutral-600, left-aligned
- Thin gold vertical accent line on the right edge

**Back:**
- Forest green background (#14532D)
- Contact details in white/gold, left-aligned:
  - Phone, email, address, website — all in Inter 400 white
  - Gold divider dots between info blocks
- QR code bottom-right (links to website or vCard)
- Company legal name in small text: Inter 300, gold-light, bottom-left

**Personality:** Contemporary, confident, premium feel. The dark back creates a memorable two-tone experience.

### Concept 3: "Pan-African Bold"

**Front:**
- Deep forest green (#14532D) full background
- Legacy logo centred, ~22mm height (reversed/light version for dark bg)
- Name: Poppins 600, white, centred
- Title: Inter 400, gold (#B48A3E), centred
- Thin gold line separating logo from name

**Back:**
- White background
- Subtle African continental outline as a watermark/ghost (10% opacity, centred, large)
- Contact details centred:
  - Name repeated small at top
  - Phone | Email | Website in a single row with gold dividers
  - Address below in 2 lines
- "Pan-African Excellence" or "Across Africa" tagline in small gold text at bottom
- Company name: Inter 300, forest green, bottom centre

**Personality:** Bold, statement-making, pan-African identity front and centre. The Africa watermark is subtle but unmistakable.

---

## 6. Letterhead Update

### 6.1 Changes from Current Letterhead

The current letterhead (`letterhead-grcl.html`, `letterhead-grcl-v2.html`) uses the ornate baroque emblem (`grcl-emblem.png`). The updated letterhead replaces this with the legacy logo.

| Element | Current | Updated |
|---------|---------|---------|
| Logo | Ornate baroque emblem (grcl-emblem.png) | Legacy shield/crest logo (recreated SVG) |
| Company name style | Poppins 500, centred | Same |
| Contact details | Phone, address, email with gold dot dividers | Same |
| Colour system | Forest green + gold | Same (logo brings its own colours; system stays green/gold) |
| Layout | A4, centred header, gradient line divider | Same structure |

### 6.2 Updated Letterhead Specification

Same as current spec in `brand-identity.md` Section "Letterhead Specification" with these changes:

1. **Logo asset:** Replace `grcl-emblem.png` with `logo-legacy-primary.svg` (or high-res PNG derivative)
2. **Logo sizing:** ~35mm height centred (the shield format may need slight size adjustment vs the circular emblem)
3. **All other elements:** No change — typography, contact row, body layout, footer all remain identical

### 6.3 Deliverable

Updated `letterhead-grcl-v3.html` with the legacy logo integrated. Same print-to-PDF workflow.

---

## 7. Implementation Sequence

### Phase 1: Foundation (Must happen first)
1. **Logo SVG recreation** — Extract and recreate legacy logo as clean vector
2. **Logo derivatives** — Produce all size/colour variants
3. **Image sourcing** — Curate royalty-free image library

### Phase 2: Content & Structure
4. **SRADA content** — Write community impact page content, create route
5. **Pan-African copy rewrite** — Systematic pass through all content files
6. **FAQ updates** — New entries + existing corrections
7. **Navigation updates** — Add Community Impact to nav structure
8. **Footer updates** — Brand statement + nav column addition

### Phase 3: Visual Integration
9. **Logo swap** — Replace all logo references across site
10. **Image integration** — Add images to all pages
11. **Homepage new section** — Community Impact section

### Phase 4: Print Collateral
12. **Business card HTML** — 3 concepts rendered
13. **Letterhead update** — V3 with legacy logo

### Phase 5: Quality Assurance
14. **Copy review** — Full pass checking consistency of pan-African language
15. **Visual review** — All images render correctly, logo scales properly
16. **Performance check** — Images don't degrade Lighthouse scores
17. **Accessibility check** — All new images have alt text, new sections have proper headings

---

## 8. Client Decision Points

Before implementation, the client needs to confirm or provide:

| # | Decision | Options | Impact |
|---|----------|---------|--------|
| 1 | SRADA positioning | Option A (Community Impact arm) ✅ selected | If client wants Option B later, we can migrate |
| 2 | SRADA mission/details | Client to provide: specific programmes, geography, impact metrics | Affects community impact page content |
| 3 | SRADA logo | Does SRADA have its own logo, or does it use GRCL brand? | Affects community impact page and cards |
| 4 | Legacy logo approval | Confirm the recreated SVG matches their expectations | Must approve before site-wide swap |
| 5 | Business card selection | Pick 1 of 3 concepts | Selected concept gets populated with officer names |
| 6 | Officer details for cards | Names, titles, divisions, direct phone/email for each officer | Needed to produce final business cards |
| 7 | Pan-African claim validation | Are there actual operations/partnerships outside Nigeria? | Copy must be credible — can't claim what doesn't exist |
| 8 | Stats update | Current stats say "6 Nigerian States" — what's the actual pan-African footprint? | Affects homepage credibility bar |
| 9 | RC Number | Use placeholder `RC-000000` (CAC format) — replace when client provides real number | Needed for letterhead, terms, and legal pages |

---
## 8.1. Answers to 8.0
Question 1 (SRADA positioning): This is sorted 
Question 2 (SRADA mission/details): Provide the copy inline with the previous copy we have produced for the website
Question 3 (SRADA logo): it use GRCL brand
Question 4 (Legacy logo approval): We have agreed on the extracted png (one of whichc is "C:\Users\DELL\Desktop\UK_Web_Design\docs\logo-legacy-1024.png")
Question 5 (Business card selection): We agree that you will create the 3 and the Client will pick one which we will edit with the Client's name/position
Question 6 (Officer details for cards): Like we agreed, design with placeholder and we will edit accordingly when the CLient picks. 
Question 7 (Pan-African claim validation): Yes there are actual operations. However, for now we have to skirt around writing about those directly but give the website a Pan-African look as directed by the Client. We will delve into the nitty-gritty write up later but for now we must provide a copy that is sellable even if we dont have the hard figure at hand. 
Question 8 (Stats update): See Question 7 above we have to dance around this while maintaining credibility. 
Question 9 (RC Number): Put up a made up number consistent with the format of RC Number obtainable from the Nigerian CAC. We edit when the Client provide the really number.

---

## 9. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Pan-African claims lack operational backing | Medium | High — damages credibility if investors discover it's Nigeria-only | Frame as "ambition + trajectory" not "current state". Use language like "extending across" and "growing presence" rather than "operating in 20 countries" |
| Legacy logo at small sizes (favicon) loses detail | High | Low — expected with detailed crests | Produce simplified shield-only mark for sub-32px contexts |
| Stock images feel generic despite African sourcing | Medium | Medium — undermines authenticity message | Prioritise Iwaria (African-focused), curate carefully, prefer documentary-style over studio-polished |
| SRADA page feels thin without real content from client | Medium | Medium — empty social impact page is worse than none | Prepare draft copy that reads well; mark sections requiring client input; omit stats section if no data exists |
| Image weight degrades mobile performance | Medium | High — core audience is Nigerian mobile | Strict budget: hero < 150KB, section < 80KB after Astro optimization. Use AVIF where supported. Audit with Lighthouse. |

---

## Appendix A: Copy Change Summary Count

| File | Changes |
|------|---------|
| `src/pages/index.astro` | 6 text changes + 1 new section |
| `src/content/pages/about.mdx` | 8 text changes (body + frontmatter) |
| `src/pages/about.astro` | 3 text changes + 1 new anchor section |
| `src/pages/divisions/index.astro` | 2 text changes |
| `src/content/divisions/crop-farming.yaml` | 4 text changes |
| `src/content/divisions/animal-husbandry.yaml` | 3 text changes |
| `src/content/divisions/agro-processing.yaml` | 2 text changes |
| `src/content/divisions/commodity-marketing.yaml` | 2 text changes |
| `src/content/divisions/import-export.yaml` | 3 text changes |
| `src/content/divisions/real-estate.yaml` | 5 text changes |
| `src/content/divisions/oil-gas.yaml` | 4 text changes |
| `src/content/clusters/agriculture-processing.yaml` | 2 text changes |
| `src/content/clusters/trade-markets.yaml` | 2 text changes |
| `src/content/clusters/built-environment-energy.yaml` | 3 text changes |
| `src/pages/investors-partners.astro` | 2 text changes |
| `src/content/pages/investors-partners.mdx` | 4 text changes + 1 new section |
| `src/pages/contact/index.astro` | 1 new card |
| `src/pages/contact/strategic.astro` | 1 text change |
| `src/components/layout/Footer.astro` | 2 text changes + 1 new nav item |
| `src/lib/seo.ts` | 1 text change |
| `src/content/faqs/faqs.yaml` | 6 text changes + 2 new entries |
| **Total** | **~60 text changes + 3 new sections/pages** |

---

## Appendix B: New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/community-impact.astro` | SRADA / Community Impact page |
| `src/content/pages/community-impact.mdx` | SRADA page content (if using content collection) |
| `src/assets/images/ATTRIBUTIONS.md` | Image source tracking |
| `_bmad-output/planning-artifacts/business-card-concept-1.html` | Heritage Classic design |
| `_bmad-output/planning-artifacts/business-card-concept-2.html` | Modern Executive design |
| `_bmad-output/planning-artifacts/business-card-concept-3.html` | Pan-African Bold design |
| `_bmad-output/planning-artifacts/letterhead-grcl-v3.html` | Updated letterhead with legacy logo |
| ~~`src/assets/brand/logo-legacy-*.svg`~~ | ~~SVG variants~~ — SUPERSEDED: client approved PNG assets (already in repo) |
| Multiple files in `src/assets/images/` | Royalty-free photographs |

---

*This document is the single source of truth for the GRCL Platform Evolution. All implementation work — whether via BMAD stories, direct development, or print design — should reference this spec. Any deviation from this spec should be documented as a deliberate decision, not an oversight.*
