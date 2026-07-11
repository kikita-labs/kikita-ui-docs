import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-density-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './density-page.html',
  styleUrl: './density-page.scss',
})
export class DensityPage {
  protected readonly providerTabs: readonly CodeTab[] = [
    {
      label: 'Global density',
      language: 'ts',
      code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({
      defaults: {
        density: 'regular',
      },
    }),
  ],
};`,
    },
    {
      label: 'Theme seed',
      language: 'ts',
      code: `provideKikitaUi({
  theme: {
    seeds: {
      density: 'regular',
    },
  },
});`,
    },
  ];

  protected readonly densityRows: readonly ApiTableRow[] = [
    {
      name: 'compact',
      type: 'KuiDensity',
      description:
        'Dense operational surfaces such as toolbars, tables, and high-frequency controls.',
    },
    {
      name: 'regular',
      type: 'KuiDensity',
      description: 'Default application density and the safest choice for documentation examples.',
    },
    {
      name: 'comfortable',
      type: 'KuiDensity',
      description:
        'Touch-heavy or spacious contexts where larger hit areas matter more than density.',
    },
  ];

  protected readonly controlRows: readonly ApiTableRow[] = [
    {
      name: 'Control height (xs / sm / md / lg)',
      type: '28px / 32px / 40px / 44px',
      description:
        'Set only by data-kui-size on Input, Button, Icon-Button, Segmented, Tabs, and Group. Density does not affect height.',
    },
    {
      name: 'Button x padding',
      type: '8px / 12px / 16px',
      description: 'Horizontal control padding across compact, regular, and comfortable density.',
    },
  ];

  protected readonly tokenTabs: readonly CodeTab[] = [
    {
      label: 'Density tokens',
      language: 'css',
      code: `--kui-btn-px-compact
--kui-btn-px-regular
--kui-btn-px-comfortable`,
    },
    {
      label: 'Resolved tokens',
      language: 'css',
      code: `--kui-control-height-xs
--kui-control-height-sm
--kui-control-height-md
--kui-control-height-lg
--kui-btn-height
--kui-btn-px
--kui-input-px`,
    },
  ];
}
