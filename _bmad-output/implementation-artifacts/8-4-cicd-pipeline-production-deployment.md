# Story 8.4: CI/CD Pipeline & Production Deployment

Status: ready-for-dev

## Story

As a **developer and content owner**,
I want automated quality gates and seamless deployment,
So that every change is validated before going live and the site stays stable.

## Acceptance Criteria

1. GitHub Actions CI workflow runs on every PR: lint, type-check, unit tests, build — PR blocked if any step fails
2. Vercel creates automatic preview deployment with unique URL for each PR
3. E2E and accessibility tests run against the preview deployment
4. Lighthouse CI runs on key pages in the preview deployment
5. Merge to main triggers automatic Vercel production deployment
6. Production site accessible at Vercel URL
7. Environment variables (RESEND_API_KEY, CONTACT_EMAIL_DEFAULT, SITE_URL, PUBLIC_SITE_NAME) configured in Vercel dashboard
8. HTTPS enforced automatically via Vercel
9. Deployment is rollback-safe via Vercel's deployment history
10. robots.txt allows all public pages, disallows /api/ and search result pages
11. XML sitemap generated for all public routes

## Tasks / Subtasks

- [ ] Task 1: Create GitHub Actions CI workflow (AC: #1)
  - [ ] 1.1 Create `.github/workflows/ci.yml`
  - [ ] 1.2 Trigger: `on: pull_request` (branches: main) AND `on: push` (branches: main) — push trigger catches direct merges and ensures main is always validated post-merge
  - [ ] 1.3 Step 1: Checkout code
  - [ ] 1.4 Step 2: Setup Node.js (v22.12+)
  - [ ] 1.5 Step 3: Install dependencies (`npm ci`)
  - [ ] 1.6 Step 4: Run lint (`npm run lint` — add ESLint if not already configured)
  - [ ] 1.7 Step 5: Run type-check (`npx astro check`)
  - [ ] 1.8 Step 6: Run unit tests (`npm test`)
  - [ ] 1.9 Step 7: Build (`npm run build`)
  - [ ] 1.10 Configure GitHub branch protection on `main`: require status checks to pass (CI workflow), require PR reviews, no direct pushes — use `gh api` or GitHub Settings → Branches → Add rule
  - [ ] 1.11 All steps must pass for PR to be mergeable

- [ ] Task 2: Configure ESLint (AC: #1)
  - [ ] 2.1 Install: `npm install -D eslint typescript-eslint eslint-plugin-astro` (typescript-eslint v8+ bundles plugin + parser)
  - [ ] 2.2 Create `eslint.config.js` (flat config for ESLint 9+)
  - [ ] 2.3 Configure for TypeScript + Astro + React files
  - [ ] 2.4 Add `"lint": "eslint ."` script to package.json
  - [ ] 2.5 Fix any existing lint errors across the codebase

- [ ] Task 3: Add E2E + accessibility to CI (AC: #3)
  - [ ] 3.1 Add Playwright step to CI workflow (after build step)
  - [ ] 3.2 Install Playwright browsers in CI: `npx playwright install --with-deps chromium`
  - [ ] 3.3 Cache Playwright browsers via `actions/cache` on `~/.cache/ms-playwright` keyed by Playwright version — saves 30-60s per run
  - [ ] 3.4 Run E2E tests against locally built site: `npm run test:e2e` (fast feedback in CI)
  - [ ] 3.5 Upload Playwright HTML report as GitHub artifact on failure

- [ ] Task 3.5: Add preview deployment verification workflow (AC: #3, #4)
  - [ ] 3.5.1 Create `.github/workflows/preview-test.yml` triggered by `deployment_status` event (status: success)
  - [ ] 3.5.2 Filter to only Vercel preview deployments (not production)
  - [ ] 3.5.3 Override Playwright `baseURL` with the Vercel preview URL from `${{ github.event.deployment_status.target_url }}`
  - [ ] 3.5.4 Run E2E subset against live preview: navigation flows + contact form (validates serverless /api/contact, env vars, CDN behavior)
  - [ ] 3.5.5 Run Lighthouse CI against preview URL (validates real-world performance)
  - [ ] 3.5.6 Post results as PR comment via `actions/github-script`

- [ ] Task 4: Add Lighthouse CI to CI workflow (AC: #4)
  - [ ] 4.1 Add Lighthouse CI step after E2E in ci.yml
  - [ ] 4.2 Run `npx lhci autorun` against locally built site (uses local dev dependency, NOT global install)
  - [ ] 4.3 Assert scores meet thresholds (90+ per category, TBT < 200ms)
  - [ ] 4.4 Upload Lighthouse report as GitHub artifact

- [ ] Task 5: Configure Vercel integration (AC: #2, #5, #6, #8, #9)
  - [ ] 5.1 Verify Vercel GitHub integration is connected to the repository
  - [ ] 5.2 Verify preview deployments are auto-created on PR
  - [ ] 5.3 Verify production deployment triggers on merge to main
  - [ ] 5.4 Verify HTTPS is enforced (automatic via Vercel)
  - [ ] 5.5 Verify deployment rollback is available in Vercel dashboard

- [ ] Task 6: Configure Vercel environment variables (AC: #7)
  - [ ] 6.1 Set `RESEND_API_KEY` in Vercel dashboard (Production + Preview)
  - [ ] 6.2 Set `CONTACT_EMAIL_DEFAULT` in Vercel dashboard
  - [ ] 6.3 Set `SITE_URL` in Vercel dashboard (production URL)
  - [ ] 6.4 Set `PUBLIC_SITE_NAME` in Vercel dashboard
  - [ ] 6.5 Create `.env.example` with all 4 variables as placeholders:
    ```
    RESEND_API_KEY=re_your_api_key_here
    CONTACT_EMAIL_DEFAULT=info@example.com
    SITE_URL=http://localhost:4321
    PUBLIC_SITE_NAME=Global Resources Citadel
    ```
  - [ ] 6.6 Document env var setup in README or project docs, referencing `.env.example`

- [ ] Task 7: Verify robots.txt and XML sitemap (AC: #10, #11)
  - [ ] 7.1 Verify `public/robots.txt` contains: Allow /, Disallow /api/, Disallow /search, Sitemap reference
  - [ ] 7.2 Verify XML sitemap generates at build time via `@astrojs/sitemap`
  - [ ] 7.3 Verify sitemap excludes /api/, /search, /404
  - [ ] 7.4 Verify sitemap includes all public routes
  - [ ] 7.5 Test: deploy to preview, access robots.txt and sitemap URLs

- [ ] Task 8: End-to-end production readiness verification (AC: #1-#11)
  - [ ] 8.1 Create a test PR to verify full CI pipeline runs
  - [ ] 8.2 Verify PR shows all checks passing (lint, type-check, tests, build, e2e, lighthouse)
  - [ ] 8.3 Verify preview URL is accessible and functional
  - [ ] 8.4 Merge PR to main, verify production deployment succeeds
  - [ ] 8.5 Verify production URL loads correctly
  - [ ] 8.6 Verify `/api/contact` endpoint works on production (test with real form submission)
  - [ ] 8.7 Enable Vercel Analytics (free tier) for Web Vitals monitoring — Vercel dashboard → Analytics → Enable
  - [ ] 8.8 Document any manual steps required for first production deployment

## Dev Notes

### GitHub Actions CI Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  # Job 1: Fast feedback — lint, type-check, unit tests
  checks:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx astro check

      - name: Unit tests
        run: npm test

  # Job 2: Build + E2E + Lighthouse (only if checks pass)
  integration:
    needs: checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: E2E tests
        run: npm run test:e2e
        env:
          CI: true

      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/

      - name: Lighthouse CI
        run: npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: .lighthouseci/
```

### Preview Deployment Verification Workflow

This workflow runs E2E and Lighthouse against the **actual Vercel preview URL**, validating serverless functions, environment variables, and CDN behavior in the real deployment environment.

```yaml
# .github/workflows/preview-test.yml
name: Preview Deployment Tests

on:
  deployment_status:

jobs:
  preview-test:
    if: >
      github.event.deployment_status.state == 'success' &&
      github.event.deployment_status.environment != 'Production'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: E2E tests against preview
        run: npx playwright test tests/e2e/navigation.spec.ts tests/e2e/contact-form.spec.ts
        env:
          CI: true
          BASE_URL: ${{ github.event.deployment_status.target_url }}

      - name: Lighthouse CI against preview
        run: npx lhci autorun --collect.url=${{ github.event.deployment_status.target_url }}
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Post results to PR
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            // Find PR associated with this deployment
            // Post summary comment with E2E + Lighthouse results
            console.log('Preview tests completed for: ${{ github.event.deployment_status.target_url }}');
```

**Note:** The preview-test workflow requires Playwright's `baseURL` to be configurable via the `BASE_URL` environment variable. Update `playwright.config.ts` to read `baseURL` from `process.env.BASE_URL || 'http://localhost:4321'`.

### ESLint Flat Config (ESLint 9+)

```javascript
// eslint.config.js
// Uses typescript-eslint v8+ unified import (not separate plugin/parser)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error'] }],
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '.astro/', '.vercel/'],
  },
);
```

**Install:** `npm install -D eslint typescript-eslint eslint-plugin-astro` (typescript-eslint v8+ bundles plugin + parser)

### package.json Scripts (Final)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "lighthouse": "lhci autorun"
  }
}
```

### Vercel Configuration

Vercel auto-detects Astro projects. No `vercel.json` needed for basic setup. Key settings:

- **Framework Preset:** Astro (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm ci`
- **Node.js Version:** 22.x (set in Vercel dashboard → Settings → General)

### Environment Variables in Vercel

| Variable | Scope | Value |
|----------|-------|-------|
| `RESEND_API_KEY` | Production + Preview | `re_xxxxxxxxxxxx` (from Resend dashboard) |
| `CONTACT_EMAIL_DEFAULT` | Production + Preview | `info@globalresourcescitadel.com` |
| `SITE_URL` | Production | `https://globalresourcescitadel.com` (or Vercel URL) |
| `PUBLIC_SITE_NAME` | Production + Preview | `Global Resources Citadel` |

**Important:** `SITE_URL` for Preview environments should use the Vercel preview URL pattern or be left unset (pages will use relative URLs). For production, set to the final domain.

### Preview Deployment Flow

```
Developer creates PR
  → GitHub Actions CI: checks job (lint, type-check, unit tests)
  → GitHub Actions CI: integration job (build, E2E against local, Lighthouse against local)
  → Vercel creates preview deployment (unique URL)
  → GitHub Actions preview-test: E2E + Lighthouse against live Vercel preview URL
  → PR shows status checks: CI ✅/❌ + Preview Tests ✅/❌ + Vercel preview link
  → Developer/reviewer tests on preview URL
  → On approval + merge to main → Vercel deploys to production
```

### Playwright baseURL Configuration for Preview Testing

Update `playwright.config.ts` to support the `BASE_URL` environment variable:

```typescript
// In playwright.config.ts use section:
use: {
  baseURL: process.env.BASE_URL || 'http://localhost:4321',
  trace: 'on-first-retry',
},
// Remove webServer block when BASE_URL is set (preview-test uses live Vercel)
...(process.env.BASE_URL ? {} : {
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
}),
```

### Rollback Strategy

Vercel maintains deployment history. If a production deployment has issues:
1. Go to Vercel dashboard → Deployments
2. Find the last known-good deployment
3. Click "Promote to Production"
4. The previous version is live within seconds

No git revert needed for emergency rollbacks.

### robots.txt (Final Version)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /search

Sitemap: https://globalresourcescitadel.com/sitemap-index.xml
```

Story 7.2 should have already set this. Verify it's correct.

### XML Sitemap Verification

After build, check `dist/sitemap-index.xml`:
- Should list all public routes
- Should NOT include `/api/contact`, `/search`, `/404`
- Should include all division, cluster, article, contact, and legal pages

### First Production Deployment Checklist

Before the first production deploy, verify:
- [ ] `.env.example` committed to repo for developer onboarding
- [ ] Vercel env vars are set (all 4, matching `.env.example` keys)
- [ ] Resend API key is valid and domain is configured (or using onboarding@resend.dev for testing)
- [ ] SITE_URL points to correct production domain
- [ ] robots.txt and sitemap are correct
- [ ] All CI checks pass on main branch
- [ ] Contact form submission works on preview (test manually)
- [ ] No "Coming Soon" text anywhere on the site
- [ ] All placeholder content is reasonable (not lorem ipsum)
- [ ] Legal pages flagged as "draft for legal review"

### Previous Story Intelligence

**Story 1.1** creates `.github/workflows/` directory (empty, with .gitkeep). This story creates the actual `ci.yml`.

**Story 8.1** sets up Vitest with `npm test` script. CI runs this.

**Story 8.2** sets up Playwright with `npm run test:e2e` script. CI runs this.

**Story 8.3** sets up Lighthouse CI with `lighthouserc.js`. CI runs `lhci autorun`.

**Story 7.2** creates robots.txt and XML sitemap. This story verifies them in production context.

**Story 4.4** creates `/api/contact` with `prerender = false`. Vercel handles this as a serverless function automatically.

### What This Story Does NOT Include

- No custom domain configuration (client provides domain, DNS setup is manual)
- No monitoring/alerting beyond Vercel's built-in + Vercel Analytics
- No staging environment (preview deployments serve this purpose)
- No database migrations (no database in this project)
- No secrets rotation strategy

### What This Story Completes

This is the **FINAL STORY in the entire MVP**. After this story:

**Epic 1:** Platform foundation, navigation, design system ✅
**Epic 2:** Homepage with all 6 sections ✅
**Epic 3:** Division hub, cluster pages, 7 division detail pages ✅
**Epic 4:** Contact hub, 10 form pages, email processing ✅
**Epic 5:** About page, Investors & Partners page ✅
**Epic 6:** Insights hub, article pages, 3 seed articles, publishing guide ✅
**Epic 7:** Search, legal pages, sitemap, 404, cross-linking verification ✅
**Epic 8:** Unit tests, E2E tests, accessibility audit, performance optimization, CI/CD, production deployment ✅

**The GRCL credibility platform is live.**

31 routes. 7 divisions. 3 clusters. Contact routing. Email processing. Published content. Tested. Accessible. Performant. Deployed.

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `.github/workflows/ci.yml` — GitHub Actions CI pipeline (checks + integration jobs)
- **Creates:** `.github/workflows/preview-test.yml` — Preview deployment E2E + Lighthouse verification
- **Creates:** `eslint.config.js` — ESLint flat config (typescript-eslint v8+)
- **Creates:** `.env.example` — Environment variable template for developer onboarding
- **Modifies:** `package.json` — adds ESLint + lint script, final script inventory
- **Modifies:** `playwright.config.ts` — adds `BASE_URL` env var override for preview testing
- **May modify:** `.github/workflows/.gitkeep` — removed (replaced by ci.yml)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 8, Story 8.4 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — CI/CD pipeline, Vercel deployment, GitHub Actions, environment variables]
- [Source: docs/project-context.md — Tech stack: Vercel Phase 1, GitHub Actions CI]
- [Source: _bmad-output/implementation-artifacts/8-1-unit-component-testing.md — Vitest setup, npm test]
- [Source: _bmad-output/implementation-artifacts/8-2-e2e-testing-accessibility-audit.md — Playwright setup, npm run test:e2e]
- [Source: _bmad-output/implementation-artifacts/8-3-performance-optimization-lighthouse-audit.md — Lighthouse CI, lighthouserc.js]
- [Source: _bmad-output/implementation-artifacts/7-2-legal-pages-sitemap-custom-404.md — robots.txt, XML sitemap]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
