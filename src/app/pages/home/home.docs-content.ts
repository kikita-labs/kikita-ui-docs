import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const HOME_INSTALL_TABS = [
  {
    label: 'Install',
    filename: 'terminal',
    language: 'bash',
    code: `ng add @kikita-labs/ui`,
  },
  {
    label: 'Provider',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};`,
  },
  {
    label: 'Styles',
    filename: 'angular.json',
    language: 'json',
    code: `"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]`,
  },
] as const satisfies readonly CodeTab[];
