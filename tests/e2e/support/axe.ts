import { resolve } from 'node:path';

import { expect, type Page } from '@playwright/test';

const axePath = resolve('node_modules/axe-core/axe.min.js');

interface AxeViolationSummary {
  readonly id: string;
  readonly impact: string | null;
  readonly targets: readonly (readonly string[])[];
}

export async function expectNoAxeViolations(page: Page): Promise<void> {
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => {
    interface AxeNode {
      readonly target: readonly string[];
    }

    interface AxeViolation {
      readonly id: string;
      readonly impact: string | null;
      readonly nodes: readonly AxeNode[];
    }

    interface AxeApi {
      run(root: Document): Promise<{ readonly violations: readonly AxeViolation[] }>;
    }

    const axe = (globalThis as typeof globalThis & { readonly axe: AxeApi }).axe;
    const result = await axe.run(document);

    return result.violations.map((violation): AxeViolationSummary => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target),
    }));
  });

  expect(violations).toEqual([]);
}
