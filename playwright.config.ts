import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    // Uses system Chrome — no CDN download needed (permanent fix for blocked networks)
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'], channel: 'chrome' } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
  // Skip local server when testing against a remote deployment (BASE_URL set)
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run preview:static',
          url: 'http://localhost:4321',
          reuseExistingServer: !process.env.CI,
        },
      }),
});
