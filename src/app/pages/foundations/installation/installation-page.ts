import { Component } from '@angular/core';
import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-installation-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './installation-page.html',
  styleUrl: './installation-page.scss',
})
export class InstallationPage {
  protected readonly registryTabs: readonly CodeTab[] = [
    {
      label: '.npmrc',
      language: 'text',
      code: `@kikita-labs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<github-token>`,
    },
    {
      label: 'Install',
      language: 'bash',
      code: `pnpm add @kikita-labs/ui`,
    },
  ];

  protected readonly cliTabs: readonly CodeTab[] = [
    {
      label: 'Default',
      language: 'bash',
      code: `ng add @kikita-labs/ui`,
    },
    {
      label: 'Project',
      language: 'bash',
      code: `ng add @kikita-labs/ui --project my-app`,
    },
  ];

  protected readonly manualTabs: readonly CodeTab[] = [
    {
      label: 'angular.json',
      language: 'json',
      code: `"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]`,
    },
    {
      label: 'app.config.ts',
      language: 'ts',
      code: `import { ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};`,
    },
  ];

  protected readonly optionRows: readonly ApiTableRow[] = [
    {
      name: '--project',
      type: 'string',
      description:
        'Targets a specific Angular project when the workspace contains multiple projects.',
    },
    {
      name: '--skip-provider',
      type: 'boolean',
      description: 'Skips writing provideKikitaUi() when the app manages providers manually.',
    },
    {
      name: '--skip-styles',
      type: 'boolean',
      description: 'Skips adding the package stylesheet to angular.json.',
    },
    {
      name: '--theme',
      type: 'boolean',
      description: 'Writes the default theme seed configuration into provideKikitaUi().',
    },
  ];
}
