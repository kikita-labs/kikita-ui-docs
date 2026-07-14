import { test } from '@playwright/test';

import { expectNoDocumentOverflow, gotoReady } from './support/page-ready';

const widths = [320, 360, 390, 768, 1024, 1280, 1440] as const;
const routes = [
  '/',
  '/foundations/installation',
  '/foundations/theming',
  '/foundations/tokens',
  '/foundations/density',
  '/foundations/accessibility',
  '/foundations',
  '/components',
  '/components/button',
  '/components/button/playground',
  '/components/badge',
  '/components/badge/playground',
  '/components/loader',
  '/components/loader/playground',
  '/components/skeleton',
  '/components/skeleton/playground',
  '/components/toast',
  '/components/toast/playground',
  '/components/empty-state',
  '/components/empty-state/playground',
  '/components/progress',
  '/components/progress/playground',
  '/components/card',
  '/components/card/playground',
  '/components/tabs',
  '/components/tabs/playground',
  '/components/accordion',
  '/components/accordion/playground',
  '/components/popover',
  '/components/popover/playground',
  '/components/field',
  '/components/select',
  '/components/dialog',
  '/components/dialog/playground',
  '/components/drawer',
  '/components/drawer/playground',
  '/components/dropdown',
  '/components/dropdown/playground',
  '/components/separator',
  '/components/separator/playground',
  '/components/avatar',
  '/components/avatar/playground',
  '/components/table',
  '/components/table/playground',
  '/components/chip',
  '/components/chip/playground',
  '/components/scrollbar',
  '/smoke',
  '/not-a-real-route',
] as const;

test('has no document overflow across the representative route matrix', async ({ page }) => {
  test.setTimeout(240_000);

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await gotoReady(page, route);
      await expectNoDocumentOverflow(page);
    }
  }
});
