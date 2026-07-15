import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const INSTALLATION_REGISTRY_TABS = [
  {
    label: 'Install',
    filename: 'terminal',
    language: 'bash',
    code: `pnpm add @kikita-labs/ui`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_CLI_TABS = [
  {
    label: 'Default',
    filename: 'terminal',
    language: 'bash',
    code: `ng add @kikita-labs/ui`,
  },
  {
    label: 'Project',
    filename: 'terminal',
    language: 'bash',
    code: `ng add @kikita-labs/ui --project my-app`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_MANUAL_TABS = [
  {
    label: 'angular.json',
    filename: 'angular.json',
    language: 'json',
    code: `"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]`,
  },
  {
    label: 'app.config.ts',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { type ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_OPTION_ROWS = [
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
] as const satisfies readonly ApiTableRow[];
