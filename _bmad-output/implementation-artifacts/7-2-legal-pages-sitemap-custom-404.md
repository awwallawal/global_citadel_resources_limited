# Story 7.2: Legal Pages, Sitemap & Custom 404

Status: done

## Story

As a **visitor**,
I want access to legal information, a site overview, and helpful error handling,
So that I can find privacy and terms information and recover gracefully from dead ends.

## Acceptance Criteria

1. `/privacy-policy/` displays "Privacy Policy" heading, "Last Updated" date, structured prose at ~720px max-width with H2-H4 covering: Information Collection, Use of Information, Data Protection, Cookies, Third Parties, Your Rights, Contact for Privacy Concerns. Breadcrumbs: Home > Privacy Policy
2. `/terms/` displays "Terms of Use" heading and structured legal content covering: terms of use, acceptable use, intellectual property, disclaimers, governing law. Breadcrumbs: Home > Terms of Use
3. `/sitemap/` displays HTML sitemap with all public pages organized by section (The Group, Divisions, Insights, Investors & Partners, Contact, Legal), mirroring footer in expanded fully-linked format
4. Non-existent URLs render a custom 404 page with "Page Not Found" message, navigation to homepage, and links to key sections (Divisions, Contact, Insights)

## Tasks / Subtasks

- [x] Task 1: Create Privacy Policy page (AC: #1)
  - [x] 1.1 Create `src/pages/privacy-policy.astro`
  - [x] 1.2 PageLayout with SEO: "Privacy Policy — Global Resources Citadel"
  - [x] 1.3 BreadcrumbNav: Home > Privacy Policy
  - [x] 1.4 H1: "Privacy Policy"
  - [x] 1.5 "Last Updated: March 2026" below heading
  - [x] 1.6 Prose body at `max-w-article` (720px token from Story 6.2 — NOT arbitrary `max-w-article`) with article typography (reuse Story 6.2 prose styling)
  - [x] 1.7 Sections: Information Collection, Use of Information, Data Protection, Cookies, Third-Party Services, Your Rights, Contact for Privacy Concerns
  - [x] 1.8 Placeholder legal content (realistic structure, not lorem ipsum — marked as draft for legal review)

- [x] Task 2: Create Terms of Use page (AC: #2)
  - [x] 2.1 Create `src/pages/terms.astro`
  - [x] 2.2 PageLayout with SEO: "Terms of Use — Global Resources Citadel"
  - [x] 2.3 BreadcrumbNav: Home > Terms of Use
  - [x] 2.4 H1: "Terms of Use"
  - [x] 2.5 "Last Updated: March 2026"
  - [x] 2.6 Same prose styling as privacy policy
  - [x] 2.7 Sections: Acceptance of Terms, Use of Site, Intellectual Property, Disclaimer of Warranties, Limitation of Liability, Governing Law, Contact
  - [x] 2.8 Placeholder legal content (realistic structure, marked as draft)

- [x] Task 3: Create HTML Sitemap page (AC: #3)
  - [x] 3.1 Create `src/pages/sitemap.astro`
  - [x] 3.2 PageLayout with SEO: "Sitemap — Global Resources Citadel"
  - [x] 3.3 BreadcrumbNav: Home > Sitemap
  - [x] 3.4 H1: "Sitemap"
  - [x] 3.5 Structured link list organized by section with H2 headings
  - [x] 3.6 Fetch all divisions, clusters, articles from content collections for dynamic links
  - [x] 3.7 Sections per epics: Home, The Group, Investors & Partners, Divisions (with all 7 + 3 clusters), Insights (with category pages), Contact (with all sub-pages), Legal — 7 sections matching epics AC which lists "Investors & Partners" as standalone

- [x] Task 4: Create custom 404 page (AC: #4)
  - [x] 4.1 Create `src/pages/404.astro`
  - [x] 4.2 PageLayout (minimal — no breadcrumbs on 404)
  - [x] 4.3 Centered content: "404" large heading, "Page Not Found" sub-heading
  - [x] 4.4 Body: "The page you're looking for doesn't exist or has been moved."
  - [x] 4.5 Recovery links: "Go to Homepage" (primary button), plus text links to Divisions, Contact, Insights
  - [x] 4.6 SEO: `<meta name="robots" content="noindex" />`

- [x] Task 5: Generate XML sitemap (AC: #3)
  - [x] 5.1 Astro's built-in `@astrojs/sitemap` integration (if not already installed) or manual generation
  - [x] 5.2 Include all public routes, exclude `/api/`, `/search/`, `/404`
  - [x] 5.3 Verify `sitemap-index.xml` or `sitemap-0.xml` generated at build time

## Dev Notes

### Legal Page Template Pattern

Both Privacy Policy and Terms use the same layout pattern — reuse the article prose styling from Story 6.2:

```astro
---
import PageLayout from '@/layouts/PageLayout.astro';
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.astro';

const seo = {
  title: 'Privacy Policy — Global Resources Citadel',
  description: 'Privacy policy for Global Resources Citadel Limited website.',
  canonical: `${import.meta.env.SITE_URL}/privacy-policy/`,
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy' },
];
---

<PageLayout seo={seo}>
  <BreadcrumbNav items={breadcrumbs} slot="breadcrumb" />

  <SectionWrapper>
    <div class="mx-auto max-w-article">
      <h1 class="font-heading text-3xl font-bold lg:text-4xl">Privacy Policy</h1>
      <p class="mt-2 text-sm text-neutral-500">Last Updated: March 2026</p>

      <div class="prose-legal mt-10">
        <!-- Structured prose content -->
      </div>
    </div>
  </SectionWrapper>
</PageLayout>
```

### Legal Prose Styling

Reuse the `.prose-article` styling from Story 6.2 or create `.prose-legal`:

```css
.prose-legal {
  font-size: 1rem;           /* 16px — slightly smaller than article 18px */
  line-height: 1.7;
  color: var(--color-neutral-600);
}
.prose-legal h2 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-neutral-900);
}
.prose-legal h3 {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-neutral-900);
}
.prose-legal p { margin-bottom: 1rem; }
.prose-legal ul, .prose-legal ol { margin-bottom: 1rem; padding-left: 1.5rem; }
.prose-legal li { margin-bottom: 0.375rem; }
.prose-legal a { color: var(--color-primary-600); text-decoration: underline; border-radius: 2px; }
.prose-legal a:hover { color: var(--color-primary-700); }
.prose-legal a:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
```

### Privacy Policy Content Structure

```html
<h2>Information We Collect</h2>
<p>When you use our website or submit enquiries through our contact forms, we may collect...</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to...</p>
<ul>
  <li>Respond to your enquiries and provide requested services</li>
  <li>Improve our website and user experience</li>
  <li>Send confirmation emails for form submissions</li>
  <li>Comply with legal obligations</li>
</ul>

<h2>Data Protection</h2>
<p>We implement appropriate security measures to protect your personal information...</p>

<h2>Cookies</h2>
<p>Our website uses essential cookies to ensure proper functionality. We use Vercel Analytics for...</p>

<h2>Third-Party Services</h2>
<p>We use the following third-party services...</p>
<ul>
  <li><strong>Vercel</strong> — Website hosting and analytics</li>
  <li><strong>Resend</strong> — Email delivery for form submissions</li>
</ul>

<h2>Your Rights</h2>
<p>You have the right to access, correct, or delete your personal information...</p>

<h2>Contact for Privacy Concerns</h2>
<p>For privacy-related enquiries, contact us at <a href="mailto:info@global-resources.org">info@global-resources.org</a>.</p>
```

**Note:** This is placeholder content for structure/layout. All legal text must be reviewed and approved by a qualified legal professional before production launch.

### HTML Sitemap — Dynamic Section Generation

```astro
---
import { getCollection } from 'astro:content';

const divisions = (await getCollection('divisions')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const clusters = (await getCollection('clusters')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const articles = (await getCollection('articles')).sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime());

const sitemapSections = [
  {
    title: 'Home',
    links: [
      { label: 'Homepage', href: '/' },
    ],
  },
  {
    title: 'The Group',
    links: [
      { label: 'About the Group', href: '/about/' },
    ],
  },
  {
    title: 'Investors & Partners',
    links: [
      { label: 'Investors & Partners', href: '/investors-partners/' },
      { label: 'Strategic Inquiry', href: '/contact/strategic/' },
    ],
  },
  {
    title: 'Divisions',
    links: [
      { label: 'All Divisions', href: '/divisions/' },
      ...clusters.map(c => ({ label: c.data.name, href: `/divisions/${c.data.slug}/` })),
      ...divisions.map(d => ({ label: d.data.name, href: `/divisions/${d.data.slug}/` })),
    ],
  },
  {
    title: 'Insights',
    links: [
      { label: 'All Insights', href: '/insights/' },
      { label: 'Latest', href: '/insights/latest/' },
      { label: 'News & Updates', href: '/insights/news/' },
      { label: 'Thought Leadership', href: '/insights/thought-leadership/' },
      { label: 'By Division', href: '/insights/divisions/' },
      ...articles.slice(0, 10).map(a => ({ label: a.data.title, href: `/insights/${a.id}/` })),
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Hub', href: '/contact/' },
      { label: 'General Enquiries', href: '/contact/general/' },
      { label: 'Contact by Division', href: '/contact/divisions/' },
      { label: 'Partner & Investor Contact', href: '/contact/strategic/' },
      { label: 'Locations', href: '/contact/locations/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms of Use', href: '/terms/' },
    ],
  },
];
---
```

Render as:
```astro
{sitemapSections.map(section => (
  <div class="mb-8">
    <h2 class="font-heading text-lg font-semibold text-neutral-900 mb-3">{section.title}</h2>
    <ul class="space-y-1.5">
      {section.links.map(link => (
        <li>
          <a href={link.href} class="text-sm text-primary-600 hover:text-primary-700 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
))}
```

### Custom 404 Page

```astro
---
import PageLayout from '@/layouts/PageLayout.astro';
---

<PageLayout seo={{ title: 'Page Not Found — Global Resources Citadel', description: 'The page you are looking for does not exist.' }}>
  <section class="flex min-h-[60vh] items-center justify-center px-4 py-24 text-center">
    <div>
      <p class="font-heading text-7xl font-bold text-primary-600">404</p>
      <h1 class="mt-4 font-heading text-3xl font-bold text-neutral-900">Page Not Found</h1>
      <p class="mt-3 max-w-md text-lg text-neutral-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href="/" class="rounded-lg bg-primary-600 px-8 py-4 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          Go to Homepage
        </a>
      </div>
      <div class="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <a href="/divisions/" class="font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Browse Divisions</a>
        <a href="/insights/" class="font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Read Insights</a>
        <a href="/contact/" class="font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">Contact Us</a>
      </div>
    </div>
  </section>
</PageLayout>
```

### XML Sitemap

Astro can generate XML sitemaps. Check if `@astrojs/sitemap` is installed:

```bash
npx astro add sitemap
```

In `astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://global-resources.org',
  integrations: [react(), sitemap({
    filter: (page) => !page.includes('/api/') && !page.includes('/search') && !page.includes('/404'),
  })],
  // ...
});
```

This generates `sitemap-index.xml` at build time, linked from `robots.txt`:
```
Sitemap: https://global-resources.org/sitemap-index.xml
```

### robots.txt Update

Story 1.1 created `public/robots.txt` with `Disallow: /api/`. Update to also reference the sitemap and disallow search results:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /search

Sitemap: https://global-resources.org/sitemap-index.xml
```

### Previous Story Intelligence

**Story 6.2** creates article prose styling (`.prose-article`). Reuse or adapt for legal pages (`.prose-legal` — slightly smaller text, same structure).

**Story 1.4** provides PageLayout, SectionWrapper, SectionHeading, Button.

**Story 1.8** provides BreadcrumbNav.

**Story 1.7** creates Footer with links to Privacy Policy, Terms, Sitemap. Those links now resolve.

**Story 1.1** creates `public/robots.txt`. This story updates it with sitemap reference.

### What This Story Does NOT Include

- No real legal text — placeholder content requiring legal review
- No cookie consent banner (post-MVP)
- No GDPR-specific data processing records
- No XML sitemap customization beyond basic filtering

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/pages/privacy-policy.astro`
- **Creates:** `src/pages/terms.astro`
- **Creates:** `src/pages/sitemap.astro` (HTML sitemap)
- **Creates:** `src/pages/404.astro`
- **Modifies:** `public/robots.txt` — adds Sitemap directive + search disallow
- **Modifies:** `astro.config.mjs` — adds `@astrojs/sitemap` integration (if not already present)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 7, Story 7.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P29 Privacy Policy, P30 Terms, P31 Sitemap, 404 page specs]
- [Source: _bmad-output/implementation-artifacts/6-2-article-detail-page.md — Article prose styling pattern]
- [Source: _bmad-output/implementation-artifacts/1-7-footer-navigation.md — Footer links to legal pages]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build passes: all 4 new pages prerender successfully
- sitemap-index.xml + sitemap-0.xml generated by @astrojs/sitemap
- XML sitemap filter verified: 0 matches for /search, /404, /token-test, /api
- TypeScript: no errors
- robots.txt updated with sitemap reference and /search disallow

### Completion Notes List

- Created privacy-policy.astro with 7 sections of realistic placeholder legal content, .prose-legal scoped styling (16px/1.7 line-height), "Last Updated: March 2026", draft disclaimer
- Created terms.astro with 7 sections (Acceptance, Use, IP, Warranties, Liability, Governing Law, Contact), same prose-legal styling, draft disclaimer
- Created sitemap.astro with dynamic content — fetches divisions, clusters, articles from content collections, 7 sections (Home, The Group, Investors, Divisions with 10 links, Insights with all articles, Contact with all sub-pages, Legal), multi-column layout
- Created 404.astro with centered "404" hero, "Page Not Found" H1, recovery links (Homepage primary button + Divisions/Insights/Contact text links), noindex robots meta
- Installed @astrojs/sitemap, configured filter excluding /api/, /search, /404, /token-test
- Updated robots.txt with Sitemap directive and /search disallow
- Footer links to Privacy Policy, Terms, Sitemap now resolve to real pages

### Review Findings

- [x] [Review][Decision] DesktopNav dropdown `-left-24` offset may overflow viewport — FIXED: added `max-w-[calc(100vw-2rem)]` guard [src/components/navigation/DesktopNav.tsx:146]
- [x] [Review][Decision] 404 page arbitrary Tailwind value — FIXED: defined `--min-h-error: 60vh` token in globals.css [src/styles/globals.css:105, src/pages/404.astro:13]
- [x] [Review][Patch] DesktopNav design token regression — FIXED: restored `text-overline`/`text-body-sm` [src/components/navigation/DesktopNav.tsx:150,159]
- [x] [Review][Patch] 404 page missing SectionWrapper — FIXED: wrapped in SectionWrapper [src/pages/404.astro:13]
- [x] [Review][Patch] Sitemap XML filter overly broad — FIXED: replaced `includes('/search')` with regex `/\/search(\/|$)/` [astro.config.mjs:17]
- [x] [Review][Patch] 404 CTA button missing motion-safe transition — FIXED: added `motion-safe:transition-all motion-safe:duration-200` [src/pages/404.astro:24]
- [x] [Review][Patch] 404 secondary links insufficient touch targets — FIXED: added `min-h-11 items-center px-3 py-2` for 44px targets [src/pages/404.astro:31-49]
- [x] [Review][Defer] Sitemap renders all articles unbounded — scaling concern for large content volumes, but AC requires "all public pages"; revisit if article count grows significantly [src/pages/sitemap.astro:52]
- [x] [Review][Defer] `.prose-legal` CSS block (~30 lines) duplicated in privacy-policy.astro and terms.astro — DRY concern, only 2 files affected [src/pages/privacy-policy.astro:93, src/pages/terms.astro:76]
- [x] [Review][Defer] SearchOverlay focus trap recalculates on every `results` change — brief window where Tab key could escape overlay during rapid typing; pre-existing issue [src/components/search/SearchOverlay.tsx:91]

### Change Log

- 2026-04-04: Story 7.2 implemented — Privacy Policy, Terms of Use, HTML sitemap, custom 404, XML sitemap, robots.txt update

### File List

- `src/pages/privacy-policy.astro` (created)
- `src/pages/terms.astro` (created)
- `src/pages/sitemap.astro` (created)
- `src/pages/404.astro` (created)
- `astro.config.mjs` (modified — added @astrojs/sitemap integration)
- `public/robots.txt` (modified — added sitemap reference + search disallow)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
