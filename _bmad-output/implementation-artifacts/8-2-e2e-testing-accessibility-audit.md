# Story 8.2: E2E Testing & Accessibility Audit

Status: ready-for-dev

## Story

As a **visitor**,
I want the platform to be fully functional and accessible across all pages,
So that I have a reliable, inclusive experience regardless of how I access the site.

## Acceptance Criteria

1. Navigation flow E2E tests: homepage → division page → contact form (mocked API), homepage → insights → article detail, homepage → about → investors & partners
2. Contact form E2E tests: successful submission with valid data, validation error display with invalid data, form confirmation state
3. Responsive breakpoint tests: mobile navigation (Sheet drawer), tablet layout, desktop full navigation — at sm, md, lg, xl breakpoints
4. Every page template passes axe-core WCAG 2.1 AA checks with zero violations
5. Single H1 per page verified on every template
6. Heading hierarchy (no skipped levels) verified on every template
7. All interactive elements have visible focus indicators

## Tasks / Subtasks

- [ ] Task 1: Set up Playwright (AC: #1-#3)
  - [ ] 1.1 Install: `npm install -D @playwright/test`
  - [ ] 1.2 Install browsers: `npx playwright install`
  - [ ] 1.3 Create `playwright.config.ts` with webServer pointing to `npm run preview` on port 4321
  - [ ] 1.4 Configure projects for chromium, firefox, webkit
  - [ ] 1.5 Add `"test:e2e": "playwright test"` script to package.json

- [ ] Task 2: Set up axe-core integration (AC: #4)
  - [ ] 2.1 Install: `npm install -D @axe-core/playwright`
  - [ ] 2.2 Create helper: `tests/e2e/helpers/axe.ts` with reusable `checkA11y()` function
  - [ ] 2.3 Configure axe to check WCAG 2.1 AA level

- [ ] Task 3: Write navigation flow E2E tests (AC: #1)
  - [ ] 3.1 Create `tests/e2e/navigation.spec.ts`
  - [ ] 3.2 Test: homepage → click "Explore Our Divisions" → divisions hub → click first division → division detail page renders with correct H1
  - [ ] 3.3 Test: homepage → scroll to insights → click article → article detail renders with H1, body content, related articles
  - [ ] 3.4 Test: homepage → nav "About the Group" → about page → anchor nav visible → click "Leadership" → scrolls to #leadership section
  - [ ] 3.5 Test: division detail → click "Contact Our Team" CTA → division contact form renders with correct division name in heading
  - [ ] 3.6 Test: about page → click Investors & Partners cross-link within page content → investors & partners page renders → CTA → contact strategic page

- [ ] Task 4: Write contact form E2E tests (AC: #2)
  - [ ] 4.1 Create `tests/e2e/contact-form.spec.ts`
  - [ ] 4.2 Test: fill general form with valid data → submit → mock API 200 → success confirmation shown
  - [ ] 4.3 Test: submit general form with empty required fields → validation errors appear below fields
  - [ ] 4.4 Test: submit general form with invalid email → email error shown
  - [ ] 4.5 Test: fill division form → verify divisionSlug is pre-set → submit → success
  - [ ] 4.6 Test: fill strategic form → verify Organization and Title fields present → submit → success
  - [ ] 4.7 Test: fill general form with valid data → mock API 500 → error banner displayed, form data preserved, user can retry
  - [ ] 4.8 Mock `/api/contact` responses for all tests (intercept with `page.route()`)

- [ ] Task 5: Write responsive breakpoint tests (AC: #3)
  - [ ] 5.1 Create `tests/e2e/responsive.spec.ts`
  - [ ] 5.2 Test at 375px (mobile/base): hamburger visible, desktop nav hidden, click hamburger → Sheet drawer opens, nav items visible, accordion works
  - [ ] 5.3 Test at 640px (sm): verify first responsive breakpoint utilities apply, layout adjustments from base mobile
  - [ ] 5.4 Test at 768px (md/tablet): desktop nav visible, hamburger hidden, 2-column layouts render
  - [ ] 5.5 Test at 1024px (lg/desktop): full nav with dropdowns, Bento grid full layout, hover states available
  - [ ] 5.6 Test at 1280px (xl): max container width, full-width sections respect max-w-7xl

- [ ] Task 6: Write accessibility audit tests (AC: #4, #5, #6, #7)
  - [ ] 6.1 Create `tests/e2e/accessibility.spec.ts`
  - [ ] 6.2 Define all page templates to test (list below)
  - [ ] 6.3 For each template: navigate → run axe-core → assert zero violations
  - [ ] 6.4 For each template: assert exactly 1 `<h1>` element
  - [ ] 6.5 For each template: assert heading hierarchy (h1 → h2 → h3, no skips)
  - [ ] 6.6 Test: Tab through homepage → verify focus-visible rings appear on all interactive elements
  - [ ] 6.7 Test: Tab through contact form → verify all inputs receive focus with visible indicator
  - [ ] 6.8 Test: skip-to-main-content link — Tab once on page load → skip link visible → press Enter → focus moves to `<main>` element
  - [ ] 6.9 Test: keyboard operability — Enter key activates nav links, Space key activates buttons
  - [ ] 6.10 Test: keyboard operability — Escape key closes SearchOverlay when open
  - [ ] 6.11 Test: keyboard operability — Escape key closes MobileNav Sheet when open (at mobile viewport)
  - [ ] 6.12 Test: keyboard operability — Enter/Space expands MobileNav accordion items (at mobile viewport)
  - [ ] 6.13 Test: prefers-reduced-motion — emulate `reducedMotion: 'reduce'` via `page.emulateMedia()` → verify CSS animations/transitions are disabled or replaced with instant transitions

## Dev Notes

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
});
```

### axe-core Helper

```typescript
// tests/e2e/helpers/axe.ts
import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

export async function checkA11y(page: Page, pageName: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  expect(results.violations, `Accessibility violations on ${pageName}:\n${
    results.violations.map(v => `  - ${v.id}: ${v.description} (${v.nodes.length} instances)`).join('\n')
  }`).toEqual([]);
}

export async function checkSingleH1(page: Page) {
  const h1Count = await page.locator('h1').count();
  expect(h1Count, 'Page must have exactly one H1').toBe(1);
}

export async function checkHeadingHierarchy(page: Page) {
  const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els =>
    els.map(el => parseInt(el.tagName.charAt(1)))
  );
  for (let i = 1; i < headings.length; i++) {
    const diff = headings[i] - headings[i - 1];
    expect(diff, `Heading hierarchy skip: h${headings[i-1]} → h${headings[i]}`).toBeLessThanOrEqual(1);
  }
}
```

### Page Templates to Test for Accessibility

```typescript
const pageTemplates = [
  { name: 'Homepage', url: '/' },
  { name: 'About', url: '/about/' },
  { name: 'Divisions Hub', url: '/divisions/' },
  { name: 'Cluster Page', url: '/divisions/agriculture-processing/' },
  { name: 'Division Detail', url: '/divisions/crop-farming/' },
  { name: 'Insights Hub', url: '/insights/' },
  { name: 'News Listing', url: '/insights/news/' },
  { name: 'Thought Leadership', url: '/insights/thought-leadership/' },
  { name: 'Division Insights', url: '/insights/divisions/crop-farming/' },
  { name: 'Article Detail', url: '/insights/grcl-expands-processing-capacity/' },
  { name: 'Investors & Partners', url: '/investors-partners/' },
  { name: 'Contact Hub', url: '/contact/' },
  { name: 'General Contact', url: '/contact/general/' },
  { name: 'Division Contact Directory', url: '/contact/divisions/' },
  { name: 'Division Contact', url: '/contact/divisions/crop-farming/' },
  { name: 'Strategic Contact', url: '/contact/strategic/' },
  { name: 'Locations', url: '/contact/locations/' },
  { name: 'Search', url: '/search/' },
  { name: 'Privacy Policy', url: '/privacy-policy/' },
  { name: 'Terms of Use', url: '/terms/' },
  { name: 'Sitemap', url: '/sitemap/' },
  { name: '404 Page', url: '/this-page-does-not-exist/' },
];
```

### Accessibility Test Pattern

```typescript
// tests/e2e/accessibility.spec.ts
import { test } from '@playwright/test';
import { checkA11y, checkSingleH1, checkHeadingHierarchy } from './helpers/axe';

const pageTemplates = [ /* list above */ ];

for (const { name, url } of pageTemplates) {
  test.describe(`Accessibility: ${name}`, () => {
    test('passes axe-core WCAG 2.1 AA', async ({ page }) => {
      await page.goto(url);
      await checkA11y(page, name);
    });

    test('has exactly one H1', async ({ page }) => {
      await page.goto(url);
      await checkSingleH1(page);
    });

    test('has valid heading hierarchy', async ({ page }) => {
      await page.goto(url);
      await checkHeadingHierarchy(page);
    });
  });
}
```

### Navigation Flow Test Pattern

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('homepage → divisions hub → division detail', async ({ page }) => {
  await page.goto('/');
  await page.click('a:has-text("Explore Our Divisions")');
  await expect(page).toHaveURL('/divisions/');
  await expect(page.locator('h1')).toBeVisible();

  await page.click('a:has-text("Crop Farming")');
  await expect(page).toHaveURL(/\/divisions\/crop-farming/);
  await expect(page.locator('h1')).toHaveText('Crop Farming');
});

test('homepage → insights → article detail', async ({ page }) => {
  await page.goto('/');
  // Scroll to insights section or click nav
  await page.click('nav >> a:has-text("Insights")');
  await expect(page).toHaveURL('/insights/');

  // Click first article
  const firstArticle = page.locator('[data-testid="insight-card"]').first();
  await firstArticle.click();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('article')).toBeVisible();
});

test('about → investors & partners (chained discovery path)', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.locator('h1')).toBeVisible();
  // Click cross-link to Investors & Partners from within About page content
  await page.click('a:has-text("Investors & Partners")');
  await expect(page).toHaveURL('/investors-partners/');
  await expect(page.locator('h1')).toBeVisible();
  // Continue to strategic contact CTA
  await page.click('a:has-text("Partner With Us")');
  await expect(page).toHaveURL('/contact/strategic/');
});
```

### Contact Form E2E with Mocked API

```typescript
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('general form: valid submission shows success', async ({ page }) => {
  // Mock API
  await page.route('/api/contact', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Inquiry submitted', routingContext: 'We aim to respond within 2 business days.' }),
    });
  });

  await page.goto('/contact/general/');
  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="subject"]', 'Test Subject');
  await page.fill('textarea[name="message"]', 'This is a test message with enough characters.');
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Your enquiry has been received')).toBeVisible();
});

test('general form: empty submit shows validation errors', async ({ page }) => {
  await page.goto('/contact/general/');
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Name must be at least')).toBeVisible();
  await expect(page.locator('text=Please enter a valid email')).toBeVisible();
});

test('general form: API error preserves form data and shows error', async ({ page }) => {
  // Mock API 500 error
  await page.route('/api/contact', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, message: 'Internal server error' }),
    });
  });

  await page.goto('/contact/general/');
  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="subject"]', 'Test Subject');
  await page.fill('textarea[name="message"]', 'This is a test message with enough characters.');
  await page.click('button[type="submit"]');

  // Error banner visible, form data preserved
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await expect(page.locator('input[name="fullName"]')).toHaveValue('Test User');
  await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
});
```

### Responsive Test Pattern

```typescript
// tests/e2e/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mobile (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger menu visible, desktop nav hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeHidden();
  });

  test('Sheet drawer opens and shows nav items', async ({ page }) => {
    await page.goto('/');
    await page.click('[aria-label="Open navigation menu"]');
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Divisions')).toBeVisible();
  });
});

test.describe('Small (640px / sm)', () => {
  test.use({ viewport: { width: 640, height: 812 } });

  test('first responsive breakpoint applies, layout adjusts from base mobile', async ({ page }) => {
    await page.goto('/');
    // Verify sm breakpoint utility classes take effect (e.g., grid columns, padding)
    // Mobile nav should still be active at this breakpoint
    await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible();
  });
});

test.describe('Desktop (1024px)', () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test('full desktop nav visible, hamburger hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator('[aria-label="Open navigation menu"]')).toBeHidden();
  });
});
```

### Focus Indicator Test

```typescript
test('interactive elements show focus-visible rings', async ({ page }) => {
  await page.goto('/');

  // Tab to first interactive element
  await page.keyboard.press('Tab'); // skip-to-main link
  await page.keyboard.press('Tab'); // logo/first nav link

  // Check focus ring is visible via computed styles
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return false;
    const styles = window.getComputedStyle(el);
    // Check for outline or box-shadow (ring)
    return styles.outlineStyle !== 'none' || styles.boxShadow !== 'none';
  });
  expect(focused).toBe(true);
});
```

### Skip-to-Main & Keyboard Operability Test Patterns

```typescript
test('skip-to-main-content link works', async ({ page }) => {
  await page.goto('/');
  // First Tab should focus the skip link
  await page.keyboard.press('Tab');
  const skipLink = page.locator('a:has-text("Skip to main content")');
  await expect(skipLink).toBeFocused();
  // Activate it
  await page.keyboard.press('Enter');
  // Focus should move to main
  const main = page.locator('main');
  await expect(main).toBeFocused();
});

test('Escape closes SearchOverlay', async ({ page }) => {
  await page.goto('/');
  // Open search overlay (click search icon)
  await page.click('[aria-label="Search"]');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[role="dialog"]')).toBeHidden();
});

test('Escape closes MobileNav Sheet', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.click('[aria-label="Open navigation menu"]');
  await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeHidden();
});
```

### prefers-reduced-motion Test Pattern

```typescript
test('animations disabled under prefers-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // Check that animated elements have no running animations or instant transitions
  const hasMotion = await page.evaluate(() => {
    const animated = document.querySelectorAll('[class*="animate"], [class*="transition"]');
    for (const el of animated) {
      const styles = window.getComputedStyle(el);
      if (styles.animationDuration !== '0s' && styles.animationName !== 'none') return true;
      if (parseFloat(styles.transitionDuration) > 0.01) return true;
    }
    return false;
  });
  expect(hasMotion).toBe(false);
});
```

### Playwright Projects vs. Responsive Tests

The `playwright.config.ts` defines mobile device projects (Pixel 5, iPhone 12) that run **all** tests at mobile viewports automatically. The `responsive.spec.ts` file uses manual `viewport` sizing for **targeted breakpoint checks** at exact Tailwind breakpoints (375, 640, 768, 1024, 1280). These are complementary — device projects give broad coverage, responsive tests give precise breakpoint verification.

### Test Execution Order

1. Run `npm run build` first (generates static site)
2. Run `npm run preview` to serve built site
3. Playwright tests run against the preview server

This tests the **production build**, not the dev server — ensuring the deployed output is correct.

### Previous Story Intelligence

**Story 8.1** sets up Vitest for unit/component tests. This story adds Playwright for E2E and accessibility. Both test frameworks coexist.

**Story 4.4** creates `/api/contact` endpoint. E2E tests mock this endpoint via `page.route()`.

**Story 1.5-1.6** creates desktop/mobile navigation. Responsive tests verify both work correctly at appropriate breakpoints.

**All previous stories** create the pages that are tested here. Every page template is covered by the accessibility audit.

### What This Story Does NOT Include

- No visual regression testing (screenshot comparison)
- No performance testing (Story 8.3)
- No CI integration (Story 8.4)
- No cross-browser testing beyond Playwright's built-in engines
- No manual accessibility testing checklist (automated only)

### Project Structure Notes

Files this story creates:
- **Creates:** `playwright.config.ts`
- **Creates:** `tests/e2e/helpers/axe.ts` — axe-core helper
- **Creates:** `tests/e2e/navigation.spec.ts`
- **Creates:** `tests/e2e/contact-form.spec.ts`
- **Creates:** `tests/e2e/responsive.spec.ts`
- **Creates:** `tests/e2e/accessibility.spec.ts`
- **Modifies:** `package.json` — adds Playwright + axe-core dev dependencies, test:e2e script

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 8, Story 8.2 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — Testing strategy: Playwright E2E + axe-core a11y, test file organization]
- [Source: docs/project-context.md — Accessibility requirements: WCAG 2.1 AA, focus-visible rings, single H1, heading hierarchy]
- [Source: _bmad-output/implementation-artifacts/8-1-unit-component-testing.md — Vitest setup (coexists with Playwright)]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
