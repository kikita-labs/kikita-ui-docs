import { expect, type Locator, type Page } from '@playwright/test';

export async function gotoReady(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await expect(page.locator('app-root')).toBeVisible();
}

/**
 * Waits for any running CSS animations/transitions on the element to finish, so a11y checks
 * don't sample colors or opacity mid-transition (e.g. a dialog's open fade-in).
 */
export async function waitForAnimationsToFinish(locator: Locator): Promise<void> {
  await locator.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished)),
  );
}

export async function expectNoDocumentOverflow(page: Page): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth, JSON.stringify(dimensions)).toBeLessThanOrEqual(
    dimensions.clientWidth,
  );
}
