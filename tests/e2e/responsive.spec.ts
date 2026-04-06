import { expect, test } from '@playwright/test';

test.describe('Responsive breakpoints', () => {
  test('375px mobile shows hamburger and mobile drawer accordion', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('button', { name: 'Divisions' }).click();
    await expect(mobileNav.getByText('Agriculture & Processing')).toBeVisible();
  });

  test('640px breakpoint keeps mobile navigation active', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 812 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  });

  test('768px breakpoint shows desktop nav', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeHidden();
  });

  test('1024px breakpoint shows full navigation with dropdown and bento desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeHidden();

    // Hover desktop nav Divisions trigger
    const desktopNav = page.getByRole('navigation', { name: 'Main navigation' });
    await desktopNav.getByRole('button', { name: 'Divisions' }).hover();
    await expect(desktopNav.getByRole('link', { name: 'Crop Farming' })).toBeVisible();

    // Bento grid has 3+ columns at lg
    const gridColumns = await page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: 'Seven Verticals. One Vision.' }) })
      .locator('div.grid, .bento-grid')
      .first()
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(gridColumns).toBeGreaterThanOrEqual(3);
  });

  test('1280px breakpoint respects max container width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const containerWidth = await page.locator('.max-w-7xl').first().evaluate((element) =>
      Math.round(element.getBoundingClientRect().width),
    );

    expect(containerWidth).toBeLessThanOrEqual(1280);
    expect(containerWidth).toBeGreaterThan(1100);
  });
});
