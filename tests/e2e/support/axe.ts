import { expect, type Page } from '@playwright/test';
import { resolve } from 'node:path';

const axePath = resolve('node_modules/axe-core/axe.min.js');

interface AxeViolationSummary {
  readonly id: string;
  readonly impact: string | null;
  readonly targets: readonly (readonly string[])[];
}

interface AxeRunOptions {
  readonly excludeRules?: readonly string[];
  readonly onlyRules?: readonly string[];
}

export async function expectNoAxeViolations(
  page: Page,
  options: AxeRunOptions = {},
): Promise<void> {
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async ({ excludeRules, onlyRules }) => {
    interface AxeNode {
      readonly target: readonly string[];
    }

    interface AxeViolation {
      readonly id: string;
      readonly impact: string | null;
      readonly nodes: readonly AxeNode[];
    }

    interface AxeRunContextOptions {
      readonly rules?: Record<string, { readonly enabled: boolean }>;
      readonly runOnly?: { readonly type: 'rule'; readonly values: readonly string[] };
    }

    interface AxeApi {
      run(
        root: Document,
        options?: AxeRunContextOptions,
      ): Promise<{ readonly violations: readonly AxeViolation[] }>;
    }

    const axe = (globalThis as typeof globalThis & { readonly axe: AxeApi }).axe;
    const runOptions: AxeRunContextOptions = onlyRules
      ? { runOnly: { type: 'rule', values: onlyRules } }
      : {
          rules: Object.fromEntries((excludeRules ?? []).map((id) => [id, { enabled: false }])),
        };
    const result = await axe.run(document, runOptions);

    return result.violations.map((violation): AxeViolationSummary => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target),
    }));
  }, options);

  expect(violations).toEqual([]);
}
