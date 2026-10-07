import { expect, test } from '@playwright/test';

import { gotoReady, waitForCodeHighlighting } from './support/page-ready';

// Baselines cover the first viewport (header, navigation, title, import block and first example).
// A full-page capture grows the viewport to the page height, which feeds back into
// viewport-relative sizing and ties every baseline to the length of the documentation prose.
const widths = [390, 768, 1440] as const;
const themes = ['light', 'dark'] as const;

for (const width of widths) {
  for (const theme of themes) {
    test(`button docs ${theme} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [
        'kikita-ui-docs.theme',
        theme,
      ] as const);
      await gotoReady(page, '/components/button');
      await waitForCodeHighlighting(page);
      await expect(page).toHaveScreenshot(`button-${theme}-${width}.png`, { fullPage: false });
    });
  }
}

test('mobile drawer visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/components/button');
  await page.getByRole('button', { name: 'Toggle documentation navigation' }).click();
  await waitForCodeHighlighting(page);
  await expect(page).toHaveScreenshot('mobile-drawer-light-390.png', { fullPage: false });
});
