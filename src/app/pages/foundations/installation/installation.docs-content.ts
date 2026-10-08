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
    description:
      'Writes the default theme seed configuration into provideKikitaUi(). Without it Kikita UI uses the same default theme internally and adds no theme code to the app.',
  },
] as const satisfies readonly ApiTableRow[];

export const INSTALLATION_STYLE_TABS = [
  {
    label: 'CSS import',
    filename: 'styles.css',
    language: 'css',
    code: `@import '@kikita-labs/ui/styles';`,
  },
  {
    label: 'Manual provider',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [provideKikitaUi()],
};`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_UPGRADE_TABS = [
  {
    label: 'Update',
    filename: 'terminal',
    language: 'bash',
    code: `ng update @kikita-labs/ui`,
  },
  {
    label: 'Run the migration again',
    filename: 'terminal',
    language: 'bash',
    code: `ng update @kikita-labs/ui --migrate-only --from=1.8.0 --to=2.0.0`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_ICON_TABS = [
  {
    label: 'Self-hosted Lucide',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import {
  createKuiLucideResolver,
  provideKikitaUi,
  provideKuiIcons,
} from '@kikita-labs/ui';

// Serve the pinned lucide-static files yourself instead of reading them from the CDN.
export const appConfig = {
  providers: [
    provideKikitaUi({ icons: false }),
    provideKuiIcons(createKuiLucideResolver({ baseUrl: '/assets/lucide' })),
  ],
};`,
  },
  {
    label: 'CSP',
    filename: 'Content-Security-Policy',
    language: 'text',
    code: `connect-src 'self' https://cdn.jsdelivr.net`,
  },
] as const satisfies readonly CodeTab[];

export const INSTALLATION_ICON_ROWS = [
  {
    name: 'KUI_LUCIDE_STATIC_VERSION',
    type: "'1.51.0'",
    description:
      'Exact lucide-static version the default resolver reads. It changes only with a Kikita UI release.',
  },
  {
    name: 'createKuiLucideResolver',
    type: '(options?: KuiLucideResolverOptions) => KuiIconResolver',
    description: 'Reads another lucide-static version or origin, for self-hosted icon files.',
  },
  {
    name: 'provideKuiIcons',
    type: '(icons: KuiIconRegistry) => EnvironmentProviders',
    description: 'Registers named icons and resolvers for the injector it is provided in.',
  },
] as const satisfies readonly ApiTableRow[];
