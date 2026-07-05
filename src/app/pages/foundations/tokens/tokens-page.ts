import { Component } from '@angular/core';
import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-tokens-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './tokens-page.html',
  styleUrl: './tokens-page.scss',
})
export class TokensPage {
  protected readonly layerTabs: readonly CodeTab[] = [
    {
      label: 'Layers',
      language: 'text',
      code: `seed -> palette -> semantic -> component`,
    },
    {
      label: 'Palette',
      language: 'css',
      code: `--kui-primary-1 ... --kui-primary-12
--kui-neutral-1 ... --kui-neutral-12
--kui-success-1 ... --kui-success-12
--kui-warning-1 ... --kui-warning-12
--kui-danger-1 ... --kui-danger-12
--kui-info-1 ... --kui-info-12`,
    },
    {
      label: 'Semantic',
      language: 'css',
      code: `--kui-color-bg
--kui-color-surface
--kui-color-border
--kui-color-text
--kui-color-primary-fill
--kui-color-primary-focus-ring`,
    },
  ];

  protected readonly seedRows: readonly ApiTableRow[] = [
    {
      name: '--kui-seed-primary',
      type: 'oklch(0.52 0.25 285)',
      description: 'Brand and action color.',
    },
    {
      name: '--kui-seed-neutral',
      type: 'oklch(0.5 0.01 80)',
      description: 'Surface, border, and text base.',
    },
    {
      name: '--kui-seed-success',
      type: 'oklch(0.54 0.16 145)',
      description: 'Positive state.',
    },
    {
      name: '--kui-seed-warning',
      type: 'oklch(0.74 0.16 75)',
      description: 'Caution state.',
    },
    {
      name: '--kui-seed-danger',
      type: 'oklch(0.54 0.22 25)',
      description: 'Error or destructive state.',
    },
    {
      name: '--kui-seed-info',
      type: 'oklch(0.58 0.16 215)',
      description: 'Informational state.',
    },
  ];

  protected readonly scaleTabs: readonly CodeTab[] = [
    {
      label: 'Radius',
      language: 'css',
      code: `--kui-radius-none: 0;
--kui-radius-xs: 4px;
--kui-radius-sm: 6px;
--kui-radius-md: 8px;
--kui-radius-lg: 10px;
--kui-radius-xl: 14px;
--kui-radius-full: 9999px;`,
    },
    {
      label: 'Spacing',
      language: 'css',
      code: `--kui-space-1: 4px;
--kui-space-2: 8px;
--kui-space-3: 12px;
--kui-space-4: 16px;
--kui-space-5: 20px;
--kui-space-6: 24px;
--kui-space-8: 32px;
--kui-space-12: 48px;
--kui-space-16: 64px;`,
    },
  ];
}
