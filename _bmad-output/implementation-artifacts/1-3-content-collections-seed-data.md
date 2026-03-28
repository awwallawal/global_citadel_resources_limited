# Story 1.3: Content Collections & Seed Data

Status: ready-for-dev

## Story

As a **developer**,
I want content collections defined with validated schemas and seed data,
So that all pages can query structured, type-safe content for divisions, clusters, and corporate information.

## Acceptance Criteria

1. 6 collections exist with Zod schemas in `src/content/config.ts`: divisions (YAML), clusters (YAML), articles (MDX), team (YAML), credentials (YAML), pages (MDX)
2. Seed data for all 7 divisions: crop-farming, animal-husbandry, agro-processing, commodity-marketing, import-export, real-estate, oil-gas — with all required fields populated
3. Seed data for all 3 clusters: agriculture-processing, trade-markets, built-environment-energy — with division membership
4. Content schema validation fails the build if required fields are missing or invalid
5. TypeScript types generated from schemas and importable throughout the project
6. Controlled taxonomy values defined as Zod enums: section, division slug, cluster slug, audience, insight stream, contact route

## Tasks / Subtasks

- [ ] Task 1: Define Zod enums for controlled taxonomy (AC: #6)
  - [ ] 1.1 Define `divisionSlugEnum` — 7 division slugs
  - [ ] 1.2 Define `clusterSlugEnum` — 3 cluster slugs
  - [ ] 1.3 Define `sectionEnum` — home, about, divisions, insights, investors-partners, contact, search
  - [ ] 1.4 Define `audienceEnum` — investor-partner, prospect-customer, general-public, internal-editor
  - [ ] 1.5 Define `insightStreamEnum` — company-news, announcements, operational-updates, thought-leadership, industry-commentary, division-insight
  - [ ] 1.6 Define `contactRouteEnum` — general-corporate, division-business, strategic-partnership, investor-institutional
  - [ ] 1.7 Define `divisionTierEnum` — core, supporting, aspirational

- [ ] Task 2: Create division collection schema and seed data (AC: #1, #2)
  - [ ] 2.1 Define `divisionSchema` with all required and optional fields
  - [ ] 2.2 Create seed YAML for all 7 divisions with complete data
  - [ ] 2.3 Verify build succeeds with all division data

- [ ] Task 3: Create cluster collection schema and seed data (AC: #1, #3)
  - [ ] 3.1 Define `clusterSchema` with fields and division membership array
  - [ ] 3.2 Create seed YAML for all 3 clusters
  - [ ] 3.3 Verify cluster-division relationships are correct

- [ ] Task 4: Create article collection schema (AC: #1)
  - [ ] 4.1 Define `articleSchema` with frontmatter fields (MDX collection)
  - [ ] 4.2 Create 1-2 placeholder seed articles to validate schema
  - [ ] 4.3 Verify MDX body content renders

- [ ] Task 5: Create team collection schema (AC: #1)
  - [ ] 5.1 Define `teamSchema` with leadership fields
  - [ ] 5.2 Create 2-3 placeholder team entries to validate schema

- [ ] Task 6: Create credentials collection schema (AC: #1)
  - [ ] 6.1 Define `credentialSchema` with certification fields
  - [ ] 6.2 Configure credentials collection with `file()` loader (single YAML file with array of entries, NOT directory-based — see architecture.md line 629)
  - [ ] 6.3 Create `src/content/credentials/credentials.yaml` with 2-3 placeholder entries as a YAML array

- [ ] Task 7: Create pages collection schema (AC: #1)
  - [ ] 7.1 Define `pageSchema` for static prose pages (MDX)
  - [ ] 7.2 Create placeholder about.mdx and investors-partners.mdx

- [ ] Task 8: Export types and verify build (AC: #4, #5)
  - [ ] 8.1 Export all collection types from config.ts
  - [ ] 8.2 Verify `astro build` fails on missing required fields (test by temporarily removing one)
  - [ ] 8.3 Verify TypeScript types are importable via `import type { ... } from '@/content/config'`

- [ ] Task 9: Create division helper utilities in `src/lib/divisions.ts` (AC: #5)
  - [ ] 9.1 Implement `getDivisionBySlug()`
  - [ ] 9.2 Implement `getClusterDivisions()`
  - [ ] 9.3 Implement `getDivisionsByCluster()`

## Dev Notes

### CRITICAL: Astro 6 Content Layer API — Loader-Based Collections

Astro 6 uses the **Content Layer API** with `defineCollection()`, **loader functions**, and Zod schemas in `src/content/config.ts`. The legacy `type: 'data'`/`type: 'content'` pattern from Astro 4 is **NOT the Content Layer API** and may be removed in Astro 6.

**Use `glob()` for directory-based collections and `file()` for single-file collections:**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Directory of YAML files — each file = one entry
const divisions = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/divisions" }),
  schema: divisionSchema,
});

// Directory of MDX files — each file = one entry with body content
const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  schema: articleSchema,
});

// Single YAML file with array of entries (architecture.md specifies this structure)
const credentials = defineCollection({
  loader: file("./src/content/credentials/credentials.yaml"),
  schema: credentialSchema,
});

export const collections = { divisions, clusters, articles, team, credentials, pages };
```

**Loader types:**
- `glob()` — for directory-based collections: divisions, clusters, team (each file = one entry)
- `glob()` — for MDX collections: articles, pages (each file = one entry with body)
- `file()` — for credentials (single YAML file with array of entries, per architecture.md line 629)

**IMPORTANT:** If `glob()`/`file()` imports fail in Astro 6, verify the exact import path in the Astro 6 docs — it may be `astro:content` or `astro/loaders` depending on the version. The dev agent should check `node_modules/astro` for the actual export.

**Entry IDs:** Astro Content Layer auto-generates `id` from filenames (e.g., `crop-farming.yaml` → `id: "crop-farming"`). Do NOT add an `id` field to schemas — use `slug` for business logic and let Astro's generated `id` handle collection lookups via `getEntry('divisions', 'crop-farming')`.

**Content access pattern (in Astro pages only):**
```typescript
import { getCollection, getEntry } from 'astro:content';
const divisions = await getCollection('divisions');
const division = await getEntry('divisions', 'crop-farming');
```

**Content boundary rule:** No component directly reads content files — content is ALWAYS fetched in Astro page frontmatter and passed down as props.

### Division Schema Specification

```typescript
const divisionSchema = z.object({
  // Identity
  name: z.string(),
  slug: divisionSlugEnum,
  clusterSlug: clusterSlugEnum,
  tier: divisionTierEnum,         // core | supporting | aspirational
  tagline: z.string().max(150),   // positioning statement, max ~30 words

  // Content
  overview: z.string(),           // 2-3 paragraph description
  capabilities: z.array(z.object({
    icon: z.string(),             // icon identifier
    name: z.string(),
    description: z.string(),
  })).min(3).max(6),

  // Proof / Metrics
  stats: z.array(z.object({
    label: z.string(),
    value: z.number(),
    unit: z.string().optional(),  // "years", "projects", etc.
    prefix: z.string().optional(), // "$", "N", etc.
  })).min(3).max(4),

  // Contact
  contactEmail: z.string().email(),

  // SEO
  seoTitle: z.string(),
  seoDescription: z.string().max(160),

  // Optional
  heroImage: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  testimonial: z.string().optional(),

  // Display order within cluster
  sortOrder: z.number().default(0),
});
```

### Cluster Schema Specification

```typescript
const clusterSchema = z.object({
  name: z.string(),
  slug: clusterSlugEnum,
  tagline: z.string(),            // 1-2 sentence positioning
  overview: z.string(),           // 2-3 paragraphs
  divisionSlugs: z.array(divisionSlugEnum), // member divisions

  // SEO
  seoTitle: z.string(),
  seoDescription: z.string().max(160),

  // Optional
  heroImage: z.string().optional(),
  accentColor: z.string().optional(), // amber | copper | slate
  sortOrder: z.number().default(0),
});
```

### Article Schema Specification

```typescript
const articleSchema = z.object({
  title: z.string().max(120),
  excerpt: z.string(),            // 3-4 lines for card preview
  stream: insightStreamEnum,      // company-news | thought-leadership | etc.
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO 8601 date: "2026-03-27"

  // Optional metadata
  author: z.string().optional(),
  divisionSlug: divisionSlugEnum.optional(), // tagged to one division or none
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),

  // Images
  heroImage: z.string().optional(),
  thumbnailImage: z.string().optional(),
  heroImageCaption: z.string().optional(),

  // SEO
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160).optional(),
});
```

### Team Schema Specification

```typescript
const teamSchema = z.object({
  name: z.string(),
  title: z.string(),              // job title
  bio: z.string(),                // full biography paragraphs
  briefDescriptor: z.string().max(80), // max 15 words for card view
  photo: z.string().optional(),   // path to portrait image
  email: z.string().email().optional(), // public contact email
  linkedIn: z.string().url().optional(), // LinkedIn profile URL
  sortOrder: z.number().default(0),
  featured: z.boolean().default(false), // show on Investors & Partners page
});
```

### Credential Schema Specification

```typescript
const credentialSchema = z.object({
  name: z.string(),               // certification name
  issuer: z.string(),             // issuing body
  logo: z.string().optional(),    // badge/logo image path
  scope: z.union([
    z.literal('company-wide'),
    divisionSlugEnum,
  ]),
  sortOrder: z.number().default(0),
});
```

### Page Schema Specification

```typescript
const pageSchema = z.object({
  title: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string().max(160),
  lastUpdated: z.string().optional(), // ISO 8601
});
```

### Controlled Taxonomy Enums

```typescript
// Division slugs — exactly 7
const divisionSlugEnum = z.enum([
  'crop-farming',
  'animal-husbandry',
  'agro-processing',
  'commodity-marketing',
  'import-export',
  'real-estate',
  'oil-gas',
]);

// Cluster slugs — exactly 3
const clusterSlugEnum = z.enum([
  'agriculture-processing',
  'trade-markets',
  'built-environment-energy',
]);

// Division tiers
const divisionTierEnum = z.enum(['core', 'supporting', 'aspirational']);

// Site sections
const sectionEnum = z.enum([
  'home', 'about', 'divisions', 'insights',
  'investors-partners', 'contact', 'search',
]);

// Audience segments
const audienceEnum = z.enum([
  'investor-partner', 'prospect-customer',
  'general-public', 'internal-editor',
]);

// Insight content streams
const insightStreamEnum = z.enum([
  'company-news', 'announcements', 'operational-updates',
  'thought-leadership', 'industry-commentary', 'division-insight',
]);

// Contact routing
const contactRouteEnum = z.enum([
  'general-corporate', 'division-business',
  'strategic-partnership', 'investor-institutional',
]);
```

### Insight Stream Rendering Paths

Each `stream` value maps to specific filtered pages. Know where articles surface:

| Stream | Renders On |
|--------|-----------|
| `company-news` | Insights Hub (all), `/insights/news/` |
| `announcements` | Insights Hub (all), `/insights/news/` |
| `operational-updates` | Insights Hub (all), `/insights/news/` |
| `thought-leadership` | Insights Hub (all), `/insights/thought-leadership/` |
| `industry-commentary` | Insights Hub (all), `/insights/thought-leadership/` |
| `division-insight` | Insights Hub (all), `/insights/divisions/[slug]/` (if `divisionSlug` is set) |

**Note:** `division-insight` articles do NOT appear on the news or thought-leadership sub-pages. They surface on the main Insights Hub and on division-specific insight pages. A `division-insight` article without a `divisionSlug` would only appear on the main hub — ensure seed articles of this stream always include a `divisionSlug`.

### Division Seed Data Reference

All 7 divisions with cluster membership and tier:

| Division | Slug | Cluster | Tier |
|----------|------|---------|------|
| Crop Farming | crop-farming | agriculture-processing | core |
| Animal Husbandry | animal-husbandry | agriculture-processing | supporting |
| Agro-Processing | agro-processing | agriculture-processing | supporting |
| Commodity Marketing | commodity-marketing | trade-markets | core |
| Import & Export | import-export | trade-markets | supporting |
| Real Estate | real-estate | built-environment-energy | aspirational |
| Oil & Gas | oil-gas | built-environment-energy | aspirational |

> **Tier conflict note:** Brand-identity.md assigns tiers at the *cluster* level (entire Agriculture & Processing cluster = "Core"). The `divisionTierEnum` values above assign tiers *per individual division* for Bento grid visual hierarchy. These are not the same concept. The per-division tiers here are authoritative for schema seed data — they are consistent with the UX spec, information architecture, and project-context.md. Do NOT use brand-identity.md's cluster-level tiers when populating the `tier` field.

**Bento Grid visual hierarchy (determines card size on homepage):**
- **Large cards:** Crop Farming, Commodity Marketing (core — revenue-driving)
- **Standard cards:** Animal Husbandry, Agro-Processing, Import & Export (supporting)
- **Compact cards:** Real Estate, Oil & Gas (aspirational)

### Cluster Seed Data Reference

| Cluster | Slug | Divisions | Accent |
|---------|------|-----------|--------|
| Agriculture & Processing | agriculture-processing | crop-farming, animal-husbandry, agro-processing | amber |
| Trade & Markets | trade-markets | commodity-marketing, import-export | copper |
| Built Environment & Energy | built-environment-energy | real-estate, oil-gas | slate |

### Seed Data Content Guidelines

**Division seed data must include realistic content:**
- `tagline`: Authentic positioning statement (not lorem ipsum)
- `overview`: 2-3 paragraphs describing the division's role, capabilities, and market position within Nigeria's economy
- `capabilities`: 3-6 real capabilities per division (e.g., for Crop Farming: "Large-Scale Cultivation", "Post-Harvest Management", "Seed Technology")
- `stats`: 3-4 plausible metrics (e.g., "Hectares Under Cultivation: 5000", "Annual Yield: 12000 tonnes")
- `contactEmail`: Use pattern `[slug]@globalresourcescitadel.com`
- `seoTitle`: Pattern — `[Division Name] — Global Resources Citadel | [Cluster Name]`
- `seoDescription`: ~155 chars describing division

**Article seed data (minimal, 1-2 articles):**
- One company-news article (no division tag)
- One division-insight article (tagged to crop-farming)
- Real-sounding titles and excerpts — these appear on the homepage

**Team seed data (placeholder, 2-3 entries):**
- Use realistic Nigerian executive names and titles
- Brief bios (~2-3 sentences each)

**Credential seed data (placeholder, 2-3 entries):**
- ISO 9001, ISO 14001, Nigerian regulatory certifications
- Scope: company-wide for most

### Content Field Naming Conventions

| Convention | Example |
|---|---|
| camelCase for all fields | `contactEmail`, `seoTitle`, `clusterSlug` |
| Slug fields: always `slug` | `slug: "crop-farming"` |
| Boolean fields: `is`/`has` prefix | `isCore`, `hasInsights` |
| Date fields: ISO 8601 strings | `publishedAt: "2026-03-27"` |
| Reference fields: target + `Slug` | `clusterSlug`, `divisionSlug` |
| Zod schemas: camelCase + Schema | `divisionSchema`, `clusterSchema` |

### Division Helper Utilities (`src/lib/divisions.ts`)

```typescript
import { getCollection, getEntry } from 'astro:content';

export async function getDivisionBySlug(slug: string) {
  return await getEntry('divisions', slug);
}

export async function getClusterDivisions(clusterSlug: string) {
  const divisions = await getCollection('divisions');
  return divisions.filter(d => d.data.clusterSlug === clusterSlug);
}

export async function getDivisionsByCluster() {
  const divisions = await getCollection('divisions');
  const clusters = await getCollection('clusters');
  return clusters.map(cluster => ({
    cluster: cluster.data,
    divisions: divisions.filter(d => d.data.clusterSlug === cluster.data.slug),
  }));
}
```

### YAML File Format Example

```yaml
# src/content/divisions/crop-farming.yaml
name: Crop Farming
slug: crop-farming
clusterSlug: agriculture-processing
tier: core
tagline: "Feeding Nigeria's future through sustainable, large-scale crop production"
overview: |
  Global Resources Citadel's Crop Farming division anchors the Group's
  agricultural operations. With thousands of hectares under active cultivation
  across Nigeria's fertile middle belt...

  [2-3 paragraphs of realistic content]
capabilities:
  - icon: wheat
    name: Large-Scale Cultivation
    description: "Multi-crop farming operations across thousands of hectares..."
  - icon: warehouse
    name: Post-Harvest Management
    description: "Modern storage and preservation facilities..."
  - icon: sprout
    name: Seed Technology
    description: "Research-backed seed selection and breeding programs..."
stats:
  - label: Hectares Under Cultivation
    value: 5000
  - label: Annual Yield
    value: 12000
    unit: tonnes
  - label: Years of Operation
    value: 15
contactEmail: crop-farming@globalresourcescitadel.com
seoTitle: "Crop Farming — Global Resources Citadel | Agriculture & Processing"
seoDescription: "Explore Global Resources Citadel's Crop Farming division. Large-scale cultivation, post-harvest management, and seed technology across Nigeria."
sortOrder: 1
```

### Previous Story Intelligence

**Story 1.1** creates the project structure including:
- `src/content/` directory with subdirectories for all 6 collections
- `src/content/config.ts` placeholder (empty collections export)
- `src/lib/divisions.ts` placeholder

**Story 1.2** creates the design token system and `formatDate()` utility used for displaying article dates.

**This story (1.3) must:**
- Replace the placeholder `config.ts` with full Zod schemas
- Populate all seed data files
- Implement the division helper utilities
- Ensure `npm run build` validates all content

### What This Story Does NOT Include

- No page templates or routes (Stories 1.4, 2.x, 3.x)
- No form handling or email integration (Story 4.x)
- No full article seed content — just 1-2 validation articles (Story 6.3 handles publishing workflow)
- No image assets — use string paths as placeholders
- No search index (Story 7.1)

### Project Structure Notes

Files this story creates or modifies:
- **Modifies:** `src/content/config.ts` — full Zod schemas and collection definitions
- **Creates:** `src/content/divisions/*.yaml` — 7 division seed files
- **Creates:** `src/content/clusters/*.yaml` — 3 cluster seed files
- **Creates:** `src/content/articles/*.mdx` — 1-2 placeholder articles
- **Creates:** `src/content/team/*.yaml` — 2-3 placeholder team entries
- **Creates:** `src/content/credentials/credentials.yaml` — 2-3 placeholder entries
- **Creates:** `src/content/pages/about.mdx` — placeholder
- **Creates:** `src/content/pages/investors-partners.mdx` — placeholder
- **Modifies:** `src/lib/divisions.ts` — implements helper functions

### References

- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, Content Collections, Naming Conventions, Content Boundary]
- [Source: _bmad-output/planning-artifacts/epics.md — Epic 1, Story 1.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — Division hierarchy, page content specs, taxonomy values, content field requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Division tier classification, Bento grid hierarchy]
- [Source: _bmad-output/implementation-artifacts/1-1-project-initialization-toolchain-setup.md — Project structure, placeholder files]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
