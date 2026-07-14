import { test } from '@playwright/test';

import { expectNoAxeViolations } from './support/axe';
import { gotoReady } from './support/page-ready';

const routes = [
  '/',
  '/foundations',
  '/foundations/installation',
  '/foundations/theming',
  '/foundations/tokens',
  '/foundations/density',
  '/foundations/accessibility',
  '/components',
  '/smoke',
  '/not-a-real-route',
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
] as const;

for (const route of routes) {
  test(`has no automated accessibility violations on ${route}`, async ({ page }) => {
    await gotoReady(page, route);
    await expectNoAxeViolations(page);
  });
}

test('has no violations with the mobile drawer open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/components/button');
  await page.getByRole('button', { name: 'Toggle documentation navigation' }).click();
  await expectNoAxeViolations(page);
});

test('has no violations with a package dialog open', async ({ page }) => {
  await gotoReady(page, '/components/dialog/playground');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expectNoAxeViolations(page);
});

test('has no violations with a package drawer open', async ({ page }) => {
  await gotoReady(page, '/components/drawer/playground');
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expectNoAxeViolations(page);
});

test('has no violations with a package dropdown open', async ({ page }) => {
  await gotoReady(page, '/components/dropdown/playground');
  await page.getByRole('button', { name: 'Actions' }).click();
  await expectNoAxeViolations(page);
});
