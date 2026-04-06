module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/divisions/crop-farming/',
        'http://localhost:4321/insights/',
        'http://localhost:4321/contact/general/',
        'http://localhost:4321/about/',
        'http://localhost:4321/search/',
      ],
      startServerCommand: 'npm run preview:static',
      startServerReadyPattern: 'Accepting connections',
      numberOfRuns: 1,
      settings: {
        // Standard Lighthouse mobile simulation (simulated 4G + CPU throttling)
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 2 },
        chromeFlags: ['--no-sandbox', '--headless'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
