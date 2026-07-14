import { expect, test } from '@playwright/test';

import { gotoReady } from './support/page-ready';

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
      await expect(page).toHaveScreenshot(`button-${theme}-${width}.png`, { fullPage: true });
    });
  }
}

test('mobile drawer visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/components/button');
  await page.getByRole('button', { name: 'Toggle documentation navigation' }).click();
  await expect(page).toHaveScreenshot('mobile-drawer-light-390.png', { fullPage: true });
});
