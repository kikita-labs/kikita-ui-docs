import { expect, test } from '@playwright/test';

import { gotoReady } from './support/page-ready';

test('navigates from the landing page into foundations and components', async ({ page }) => {
  await gotoReady(page, '/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await expect(page).toHaveURL(/\/foundations\/installation$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Installation' })).toBeFocused();

  await gotoReady(page, '/');
  await page.getByRole('link', { name: 'Browse Components' }).click();
  await expect(page).toHaveURL(/\/components$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Component overview' })).toBeVisible();
});

test('search opens from the keyboard, selects a registry result, and restores focus', async ({
  page,
}) => {
  await gotoReady(page, '/components/button');
  await page.keyboard.press('Control+k');

  const search = page.getByRole('combobox', { name: 'Search documentation' });
  await expect(search).toBeFocused();
  await search.fill('Table');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/components\/table$/);

  const trigger = page.locator('.docs-header__search');
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('theme follows first-visit media preference and persists an explicit choice', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await gotoReady(page, '/');
  await page.evaluate(() => localStorage.clear());
  await gotoReady(page, '/components/button');
  await expect(page.locator('html')).toHaveAttribute('data-kui-theme', 'dark');

  await page.locator('.docs-header__theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-kui-theme', 'light');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('kikita-ui-docs.theme')))
    .toBe('light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-kui-theme', 'light');
});

test('mobile drawer traps focus and closes through Escape, backdrop, and navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/components/button');
  const trigger = page.getByRole('button', { name: 'Toggle documentation navigation' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Documentation navigation' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await expect(page.locator('html')).toHaveClass(/docs-scroll-locked/);

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press('Tab');
    await expect
      .poll(() => dialog.evaluate((node) => node.contains(document.activeElement)))
      .toBe(true);
  }

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.waitForTimeout(200);
  await page.mouse.click(360, 200);
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.waitForTimeout(200);
  await page.locator('.sidebar-nav__item').first().click();
  await expect(page).toHaveURL(/\/foundations\/installation$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Installation' })).toBeFocused();
});

test('mobile on-this-page navigation updates the fragment and heading focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/components/button');
  const toc = page.locator('.docs-shell__mobile-toc');
  const trigger = toc.locator('.kui-accordion-trigger');

  await trigger.focus();
  await page.keyboard.press('Enter');
  await toc.getByRole('link', { name: 'Accessibility' }).focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#accessibility$/);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(toc.locator('a[href="#accessibility"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('#accessibility')).toBeFocused();
});

test('copies displayed source through the clipboard capability', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await gotoReady(page, '/components/button');
  const copy = page.locator('.code-tabs button[aria-label^="Copy "]').first();

  await copy.click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).not.toBe('');
  await expect(page.getByText('Code copied')).toBeVisible();
});

test('reports clipboard failure without breaking the page', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'clipboard', {
      configurable: true,
      get: () => ({ writeText: () => Promise.reject(new Error('Denied by test')) }),
    });
  });
  await gotoReady(page, '/components/button');
  await page.locator('.code-tabs button[aria-label^="Copy "]').first().click();
  await expect(page.getByText('Copy failed')).toBeVisible();
});

test('keeps representative simple, form, overlay, and table playgrounds interactive', async ({
  page,
}) => {
  await gotoReady(page, '/components/button/playground');
  await page.getByLabel('Label').fill('Ship release');
  await expect(page.getByRole('button', { name: 'Ship release' })).toBeVisible();

  await gotoReady(page, '/components/badge/playground');
  await page.getByLabel('label', { exact: true }).fill('Needs review');
  await page.getByRole('radio', { name: 'warning', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const badgePreview = page.getByRole('region', { name: 'Badge playground' });
  await expect(badgePreview.locator('.kui-badge')).toHaveText('Needs review');
  await expect(badgePreview.locator('.kui-badge')).toHaveAttribute(
    'data-kui-appearance',
    'warning',
  );
  await expect(badgePreview.locator('.kui-badge')).toHaveAttribute('data-kui-size', 'lg');

  await gotoReady(page, '/components/loader/playground');
  await page.getByLabel('label', { exact: true }).fill('Saving profile');
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const loaderPreview = page.getByRole('region', { name: 'Loader playground' });
  await expect(loaderPreview.locator('.kui-loader')).toHaveAttribute(
    'aria-label',
    'Saving profile',
  );
  await expect(loaderPreview.locator('.kui-loader')).toHaveAttribute('data-kui-size', 'lg');

  await gotoReady(page, '/components/skeleton/playground');
  await page.getByRole('radio', { name: 'circle', exact: true }).click();
  await page.getByRole('radio', { name: 'pulse', exact: true }).click();
  const skeletonPreview = page.getByRole('region', { name: 'Skeleton playground' });
  await expect(skeletonPreview.locator('.kui-skeleton')).toHaveAttribute(
    'data-kui-shape',
    'circle',
  );
  await expect(skeletonPreview.locator('.kui-skeleton')).toHaveAttribute(
    'data-kui-animation',
    'pulse',
  );

  await gotoReady(page, '/components/toast/playground');
  await page.getByLabel('title', { exact: true }).fill('Saved profile');
  await page.getByRole('radio', { name: 'success', exact: true }).click();
  await page.getByRole('button', { name: 'Show "Saved profile"' }).click();
  await expect(page.locator('.kui-toast').filter({ hasText: 'Saved profile' })).toBeVisible();

  await gotoReady(page, '/components/empty-state/playground');
  await page.getByLabel('title', { exact: true }).fill('No invoices');
  await page.getByRole('radio', { name: 'no-results', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const emptyStatePreview = page.getByRole('region', { name: 'Empty state playground' });
  await expect(emptyStatePreview.locator('.kui-empty')).toContainText('No invoices');
  await expect(emptyStatePreview.locator('.kui-empty')).toHaveAttribute(
    'data-kui-context',
    'no-results',
  );
  await expect(emptyStatePreview.locator('.kui-empty')).toHaveAttribute('data-kui-size', 'lg');

  await gotoReady(page, '/components/progress/playground');
  await page.getByRole('radio', { name: 'circular', exact: true }).click();
  await page.getByRole('radio', { name: 'success', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const progressPreview = page.getByRole('region', { name: 'Progress playground' });
  await expect(progressPreview.locator('.kui-progress-circular')).toHaveAttribute(
    'data-kui-color',
    'success',
  );
  await expect(progressPreview.locator('.kui-progress-circular')).toHaveAttribute(
    'data-kui-size',
    'lg',
  );
  await expect(progressPreview.locator('[role="progressbar"]')).toHaveAttribute(
    'aria-valuenow',
    '60',
  );

  await gotoReady(page, '/components/card/playground');
  await page.getByRole('radio', { name: 'elevated', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  await page.getByRole('switch', { name: 'interactive' }).check();
  const cardPreview = page.getByRole('region', { name: 'Card playground' });
  await expect(cardPreview.locator('button.kui-card')).toBeVisible();
  await expect(cardPreview.locator('button.kui-card')).toHaveAttribute(
    'data-kui-appearance',
    'elevated',
  );
  await expect(cardPreview.locator('button.kui-card')).toHaveAttribute('data-kui-size', 'lg');

  await gotoReady(page, '/components/tabs/playground');
  await page.getByRole('radio', { name: 'pill', exact: true }).click();
  await page.getByRole('radio', { name: 'vertical', exact: true }).click();
  await page.getByRole('switch', { name: 'tab 2 hasError' }).check();
  const tabsPreview = page.getByRole('region', { name: 'Tabs playground' });
  await expect(tabsPreview.locator('.kui-tabs')).toHaveAttribute('data-kui-variant', 'pill');
  await expect(tabsPreview.locator('.kui-tabs')).toHaveAttribute(
    'data-kui-orientation',
    'vertical',
  );
  await expect(tabsPreview.getByRole('tab', { name: /Settings/ })).toContainText('Settings');
  await tabsPreview.getByRole('tab', { name: 'Logs' }).click();
  await expect(tabsPreview.getByRole('tab', { name: 'Logs' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await gotoReady(page, '/components/accordion/playground');
  await page.getByRole('radio', { name: 'multi', exact: true }).click();
  await page.getByRole('radio', { name: 'bordered', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  await page.getByRole('switch', { name: 'disable item 3' }).check();
  const accordionPreview = page.getByRole('region', { name: 'Accordion playground' });
  await expect(accordionPreview.locator('.kui-accordion')).toHaveAttribute(
    'data-kui-mode',
    'multi',
  );
  await expect(accordionPreview.locator('.kui-accordion')).toHaveAttribute(
    'data-kui-appearance',
    'bordered',
  );
  await accordionPreview.getByRole('button', { name: 'Notifications' }).click();
  await expect(accordionPreview.getByRole('button', { name: 'Notifications' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(accordionPreview.getByRole('button', { name: 'Security' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );

  await gotoReady(page, '/components/popover/playground');
  await page.getByLabel('trigger label', { exact: true }).fill('Inspect');
  await page.getByRole('radio', { name: 'top', exact: true }).click();
  await page.getByRole('radio', { name: 'start', exact: true }).click();
  await page.getByRole('switch', { name: 'arrow' }).check();
  const popoverPreview = page.getByRole('region', { name: 'Popover playground' });
  await popoverPreview.getByRole('button', { name: 'Inspect' }).click();
  await expect(page.getByRole('dialog', { name: 'Popover' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Popover' })).toBeHidden();

  await gotoReady(page, '/components/field/playground');
  await page.getByLabel('Label').fill('Account name');
  await expect(page.getByText('Account name', { exact: true })).toBeVisible();

  await gotoReady(page, '/components/dialog/playground');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();

  await gotoReady(page, '/components/drawer/playground');
  await page.getByLabel('title', { exact: true }).fill('Filter invoices');
  await page.getByRole('radio', { name: 'left', exact: true }).click();
  await page.getByRole('radio', { name: 'full', exact: true }).click();
  await page.getByRole('button', { name: 'Open drawer' }).click();
  const drawer = page.getByRole('dialog', { name: 'Filter invoices' });
  await expect(drawer).toBeVisible();
  await expect(drawer.locator('.kui-drawer-subtitle')).toContainText('left');
  await expect(drawer.locator('.kui-drawer-subtitle')).toContainText('full');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();

  await gotoReady(page, '/components/dropdown/playground');
  await page.getByLabel('trigger label', { exact: true }).fill('More actions');
  await page.getByRole('radio', { name: 'content', exact: true }).click();
  const dropdownPreview = page.getByRole('region', { name: 'Dropdown playground' });
  await dropdownPreview.getByRole('button', { name: 'More actions' }).click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toBeHidden();

  await gotoReady(page, '/components/separator/playground');
  await page.getByRole('radio', { name: 'strong', exact: true }).click();
  await page.getByRole('radio', { name: 'vertical', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const separatorPreview = page.getByRole('region', { name: 'Separator playground' });
  await expect(separatorPreview.locator('hr[kuiSeparator]')).toHaveAttribute(
    'data-kui-appearance',
    'strong',
  );
  await expect(separatorPreview.locator('hr[kuiSeparator]')).toHaveAttribute(
    'data-kui-orientation',
    'vertical',
  );
  await expect(separatorPreview.locator('hr[kuiSeparator]')).toHaveAttribute(
    'data-kui-spacing',
    'lg',
  );

  await gotoReady(page, '/components/avatar/playground');
  await page.getByLabel('name', { exact: true }).fill('Design Bot');
  await page.getByLabel('src (sample image)', { exact: true }).uncheck();
  await page.getByRole('radio', { name: 'xl', exact: true }).click();
  await page.getByRole('radio', { name: 'square', exact: true }).click();
  await page.getByRole('radio', { name: 'busy', exact: true }).click();
  const avatarPreview = page.getByRole('region', { name: 'Avatar playground' });
  await expect(avatarPreview.locator('kui-avatar')).toHaveAttribute('data-kui-size', 'xl');
  await expect(avatarPreview.locator('kui-avatar')).toHaveAttribute('data-kui-shape', 'square');
  await expect(avatarPreview.locator('kui-avatar')).toHaveAttribute('data-kui-status', 'busy');

  await gotoReady(page, '/components/table/playground');
  const tablePreview = page.getByRole('region', { name: 'Table playground' });
  await expect(tablePreview.getByRole('table')).toBeVisible();
  await page.getByRole('switch', { name: 'row selection' }).check();
  await expect(page.getByRole('checkbox').first()).toBeVisible();

  await gotoReady(page, '/components/chip/playground');
  await page.getByLabel('label', { exact: true }).fill('Urgent');
  await page.getByRole('radio', { name: 'danger', exact: true }).click();
  await page.getByRole('radio', { name: 'lg', exact: true }).click();
  const chipPreview = page.getByRole('region', { name: 'Chip playground' });
  await expect(chipPreview.locator('[kuiChip]')).toHaveAttribute('data-kui-appearance', 'danger');
  await expect(chipPreview.locator('[kuiChip]')).toHaveAttribute('data-kui-size', 'lg');
  await expect(chipPreview.getByRole('button', { name: 'Remove Urgent' })).toBeVisible();
});

test('keeps draft, not-found, and installed-package smoke routes recoverable', async ({ page }) => {
  await gotoReady(page, '/foundations');
  await expect(page.getByText('Docs coming soon')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Foundations' })).toBeFocused();

  await gotoReady(page, '/smoke');
  await expect(page.getByRole('heading', { level: 1, name: 'Package Smoke' })).toBeFocused();
  await expect(page.getByText('Package loaded')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Verified import' })).toBeVisible();

  await gotoReady(page, '/not-a-real-route');
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeFocused();
  await page.getByRole('link', { name: 'Back to Docs' }).click();
  await expect(page).toHaveURL(/\/components$/);
});
