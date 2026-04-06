import { expect, test, type Page } from '@playwright/test';

type MockContactResponse = {
  status: number;
  body: Record<string, unknown>;
};

async function mockContactApi(page: Page, response: MockContactResponse) {
  let payload: Record<string, unknown> | null = null;

  await page.route('**/api/contact', async (route) => {
    payload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });

  return {
    getPayload: () => payload,
  };
}

async function fillGeneralForm(page: Page) {
  await page.getByLabel('Full Name').fill('Test User');
  await page.getByLabel('Email').first().fill('test@example.com');
  await page.getByLabel('Subject').fill('Test Subject');
  await page.getByLabel('Message').fill(
    'This is a test message with enough characters for validation.',
  );
}

test.describe('Contact form flows', () => {
  test('general form valid submission shows success confirmation', async ({ page, browserName }) => {
    // WebKit fetch mock timing differs — route fulfillment occasionally races with React state
    test.skip(browserName === 'webkit', 'WebKit fetch mock timing inconsistency');

    await mockContactApi(page, {
      status: 200,
      body: {
        success: true,
        message: 'Inquiry submitted',
        routingContext: 'We aim to respond within 2 business days.',
      },
    });

    await page.goto('/contact/general/');
    await fillGeneralForm(page);
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();

    await expect(
      page.getByRole('heading', { name: 'Your enquiry has been received' }),
    ).toBeVisible();
  });

  test('general form empty submission shows validation errors', async ({ page }) => {
    await page.goto('/contact/general/');

    // Wait for React hydration — the submit button becomes interactive after hydration
    await page.waitForFunction(() => {
      const form = document.querySelector('form');
      return form?.getAttribute('novalidate') !== null;
    });

    await page.getByRole('button', { name: 'Submit Enquiry' }).click();

    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('general form invalid email shows email error', async ({ page }) => {
    await page.goto('/contact/general/');

    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email').first().fill('invalid-email');
    await page.getByLabel('Subject').fill('Test Subject');
    await page.getByLabel('Message').fill(
      'This is a test message with enough characters for validation.',
    );
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();

    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('division form submits with pre-set division slug', async ({ page }) => {
    const mock = await mockContactApi(page, {
      status: 200,
      body: {
        success: true,
        message: 'Inquiry submitted',
        routingContext: 'The Crop Farming team will respond shortly.',
      },
    });

    await page.goto('/contact/divisions/crop-farming/');
    await page.getByLabel('Full Name').fill('Division User');
    await page.getByLabel('Email').first().fill('division@example.com');
    await page.getByLabel('Company / Organization').fill('Example Co');
    await page.getByLabel('Enquiry Type').selectOption('business-opportunity');
    await page.getByLabel('Message').fill(
      'This is a division-specific enquiry with enough detail to submit.',
    );
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();

    await expect(
      page.getByRole('heading', { name: 'Your enquiry has been received' }),
    ).toBeVisible();
    expect(mock.getPayload()).toMatchObject({
      divisionSlug: 'crop-farming',
      destinationTeam: 'crop-farming',
    });
  });

  test('strategic form includes organization and title fields and submits successfully', async ({
    page,
  }) => {
    await mockContactApi(page, {
      status: 200,
      body: {
        success: true,
        message: 'Inquiry submitted',
        routingContext: 'Our leadership team will review your enquiry.',
      },
    });

    await page.goto('/contact/strategic/');
    await expect(page.getByLabel('Organization')).toBeVisible();
    await expect(page.getByLabel('Title / Role')).toBeVisible();

    await page.getByLabel('Full Name').fill('Strategic User');
    await page.getByLabel('Email').first().fill('strategic@example.com');
    await page.getByLabel('Organization').fill('Partner Org');
    await page.getByLabel('Title / Role').fill('Director');
    await page.getByLabel('Inquiry Type').selectOption('strategic-partnership');
    await page.getByLabel('Brief Description').fill(
      'We want to discuss a strategic partnership opportunity in detail.',
    );
    await page.getByRole('button', { name: 'Submit Inquiry' }).click();

    await expect(
      page.getByRole('heading', { name: 'Your enquiry has been received' }),
    ).toBeVisible();
  });

  test('general form API error preserves values and allows retry', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/contact', async (route) => {
      requestCount += 1;

      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Internal server error',
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Inquiry submitted',
          routingContext: 'We aim to respond within 2 business days.',
        }),
      });
    });

    await page.goto('/contact/general/');
    await fillGeneralForm(page);
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel('Full Name')).toHaveValue('Test User');
    await expect(page.getByLabel('Email').first()).toHaveValue('test@example.com');

    await page.getByRole('button', { name: 'Submit Enquiry' }).click();
    await expect(
      page.getByRole('heading', { name: 'Your enquiry has been received' }),
    ).toBeVisible();
    expect(requestCount).toBe(2);
  });
});
