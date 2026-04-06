import { expect, test } from '@playwright/test';
import {
  checkA11y,
  checkHeadingHierarchy,
  checkSingleH1,
  expectVisibleFocusIndicator,
} from './helpers/axe';

// Increase timeout for axe-heavy page scans
test.setTimeout(60_000);

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

for (const { name, url } of pageTemplates) {
  test.describe(`Accessibility: ${name}`, () => {
    test('passes axe-core WCAG 2.1 AA checks', async ({ page }) => {
      await page.goto(url);
      await checkA11y(page, name);
    });

    test('has exactly one h1', async ({ page }) => {
      await page.goto(url);
      await checkSingleH1(page);
    });

    test('has a valid heading hierarchy', async ({ page }) => {
      await page.goto(url);
      await checkHeadingHierarchy(page);
    });
  });
}

test.describe('Accessibility interactions', () => {
  test('homepage interactive elements show visible keyboard focus', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expectVisibleFocusIndicator(page);
  });

  test('contact form inputs show visible keyboard focus', async ({ page }) => {
    await page.goto('/contact/general/');

    const formInput = page.getByLabel('Full Name');
    await formInput.focus();
    await expectVisibleFocusIndicator(page);
  });

  test('skip to main content moves focus to main', async ({ page, browserName }) => {
    // WebKit does not reliably move focus to tabindex="-1" targets via anchor navigation
    test.skip(browserName === 'webkit', 'WebKit skip-link focus behavior differs (WebKit bug 116046)');

    await page.goto('/');

    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toBeFocused();
  });

  test('keyboard activation works for nav links and buttons', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About the Group' });
    await aboutLink.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/about/');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: 'Open navigation menu' });
    await hamburger.focus();
    await page.keyboard.press('Space');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  });

  test('escape closes search overlay', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Search' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('escape closes mobile nav sheet', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  });

  test('enter and space expand mobile nav accordion', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation menu' }).click();

    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
    const divisionsTrigger = mobileNav.getByRole('button', { name: 'Divisions' });
    await divisionsTrigger.focus();
    await page.keyboard.press('Enter');
    await expect(mobileNav.getByText('Agriculture & Processing')).toBeVisible();

    await page.keyboard.press('Space');
    await expect(mobileNav.getByText('Agriculture & Processing')).toBeHidden();
  });

  test('reduced motion suppresses CSS animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // With prefers-reduced-motion: reduce, Tailwind motion-safe: utilities are inactive.
    // Verify the media query is respected by checking that the CSS rule applies.
    const reducedMotionRespected = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(reducedMotionRespected).toBe(true);

    // Verify no unguarded CSS keyframe animations are running
    const hasRunningAnimation = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const style = window.getComputedStyle(el);
        if (
          style.animationName !== 'none' &&
          style.animationDuration !== '0s' &&
          style.animationPlayState === 'running'
        ) {
          // Radix UI internal animations are acceptable (accordion, dialog transitions)
          const isRadix = el.hasAttribute('data-state') || el.hasAttribute('data-radix-popper-content-wrapper');
          if (!isRadix) return true;
        }
      }
      return false;
    });
    expect(hasRunningAnimation).toBe(false);
  });
});
