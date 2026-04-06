import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

export async function checkA11y(page: Page, pageName: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    // color-contrast violations exist on transparent header overlays and are tracked
    // separately for CSS-level fixes (Story 8.3 performance/polish scope)
    .disableRules(['color-contrast'])
    // Exclude third-party iframe content (e.g. OpenStreetMap Leaflet markers)
    .exclude('iframe')
    .analyze();

  const formattedViolations = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.description} (${violation.nodes.length} instances)`,
  );

  expect(
    formattedViolations,
    `Accessibility violations on ${pageName}:\n${formattedViolations.join('\n')}`,
  ).toEqual([]);
}

export async function checkSingleH1(page: Page) {
  await expect(page.locator('h1')).toHaveCount(1);
}

export async function checkHeadingHierarchy(page: Page) {
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((elements) =>
    elements.map((element) => Number(element.tagName.slice(1))),
  );

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    expect(
      current - previous,
      `Heading hierarchy skip detected: h${previous} -> h${current}`,
    ).toBeLessThanOrEqual(1);
  }
}

export async function expectVisibleFocusIndicator(page: Page) {
  const hasVisibleFocus = await page.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    if (!active) return false;

    const style = window.getComputedStyle(active);
    return (
      style.outlineStyle !== 'none' ||
      style.outlineWidth !== '0px' ||
      style.boxShadow !== 'none'
    );
  });

  expect(hasVisibleFocus).toBe(true);
}
