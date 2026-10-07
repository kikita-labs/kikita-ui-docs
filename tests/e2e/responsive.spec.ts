import { expect, test } from '@playwright/test';

import { expectNoDocumentOverflow, gotoReady } from './support/page-ready';
import { VERSIONS_MANIFEST } from './support/versions-manifest';

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

// One test per width so the matrix spreads across Playwright workers instead of one long run.
test.describe.configure({ mode: 'parallel' });

for (const width of widths) {
  test(`has no document overflow at ${width}px across the representative route matrix`, async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await gotoReady(page, route);
      await expectNoDocumentOverflow(page);
    }
  });
}

for (const width of [320, 360, 390] as const) {
  test(`keeps the header actions inside the viewport with the version select at ${width}px`, async ({
    page,
  }) => {
    await page.route('**/versions.json', (route) => route.fulfill({ json: VERSIONS_MANIFEST }));
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page, '/components/button');

    const select = page.getByRole('combobox', { name: 'Documentation version' });
    await expect(select).toBeVisible();
    await expectNoDocumentOverflow(page);

    const box = await select.boundingBox();
    expect(box).not.toBeNull();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
  });
}
