import { expect, test } from '@playwright/test';

const mainNav = (page: import('@playwright/test').Page) =>
  page.getByRole('navigation', { name: 'Main navigation' });

test.describe('Navigation flows', () => {
  test('homepage to divisions hub to division detail', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Explore Our Divisions' }).click();
    await expect(page).toHaveURL('/divisions/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Built Across Sectors. United by Purpose.',
    );

    await page.getByRole('link', { name: 'Crop Farming' }).first().click();
    await expect(page).toHaveURL('/divisions/crop-farming/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Crop Farming');
  });

  test('homepage to insights to article detail', async ({ page }) => {
    await page.goto('/');

    await mainNav(page).getByRole('link', { name: 'Insights' }).click();
    await expect(page).toHaveURL('/insights/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'News, Updates & Thought Leadership',
    );

    await page.locator('a[href^="/insights/"]').filter({ has: page.locator('h3') }).first().click();
    await expect(page).toHaveURL(/\/insights\/.+\//);
    await expect(page.locator('article, .prose-article')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Related Insights' })).toBeVisible();
  });

  test('homepage to about page leadership anchor', async ({ page }) => {
    await page.goto('/');

    await mainNav(page).getByRole('link', { name: 'About the Group' }).click();
    await expect(page).toHaveURL('/about/');
    await expect(page.getByRole('navigation', { name: 'Page sections' })).toBeVisible();

    await page.getByRole('navigation', { name: 'Page sections' }).getByRole('link', { name: 'Leadership' }).click();
    // Anchor scroll — verify the section scrolled into viewport (hash may not appear in URL with static server)
    await expect(page.locator('#leadership')).toBeInViewport();
  });

  test('division detail page contact CTA opens division enquiry form', async ({ page }) => {
    await page.goto('/divisions/crop-farming/');

    await page.getByRole('link', { name: 'Contact Our Team' }).click();
    await expect(page).toHaveURL('/contact/divisions/crop-farming/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Crop Farming Enquiry');
  });

  test('about page to investors and partners to strategic contact', async ({ page }) => {
    await page.goto('/about/');

    await page.getByRole('link', { name: 'Investors & Partners' }).first().click();
    await expect(page).toHaveURL('/investors-partners/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Partner With a Group Built for Scale',
    );

    await page.getByRole('link', { name: 'Partner Inquiry' }).click();
    await expect(page).toHaveURL('/contact/strategic/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Partner & Investor Contact');
  });
});
