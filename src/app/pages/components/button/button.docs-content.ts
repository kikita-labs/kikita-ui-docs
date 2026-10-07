import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const BUTTON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const BUTTON_API_DESCRIPTION = `Inputs, provider defaults and theming tokens verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const BUTTON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'button.ts',
    language: 'ts',
    code: `import {
  KuiButton,
  type KuiButtonAppearance,
  type KuiButtonShape,
  provideKuiDefaults,
} from '@kikita-labs/ui';`,
  },
  {
    label: 'Styles',
    filename: 'styles.scss',
    language: 'scss',
    code: `@import '@kikita-labs/ui/styles';`,
  },
];

export const BUTTON_CUSTOM_ICON_TABS: readonly CodeTab[] = [
  {
    label: 'HTML',
    filename: 'save-button.html',
    language: 'html',
    code: `<button kuiButton appearance="success">
  <kui-icon [source]="checkIcon" />
  Save
</button>`,
  },
];

export const BUTTON_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'Subtree',
    filename: 'feature.providers.ts',
    language: 'ts',
    code: `import { provideKuiDefaults } from '@kikita-labs/ui';

export const featureProviders = [
  provideKuiDefaults({
    button: { shape: 'ghost', appearance: 'primary', size: 'sm' },
    iconButton: { shape: 'outline', size: 'sm' },
  }),
];`,
  },
  {
    label: 'Application',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      defaults: {
        size: 'sm',
        button: { shape: 'soft' },
      },
    }),
  ],
};`,
  },
];

export const BUTTON_MIGRATION_TABS: readonly CodeTab[] = [
  {
    label: 'Defaults',
    filename: 'feature.providers.ts',
    language: 'ts',
    code: `// 1.x (deprecated, removed in 3.0)
providers: [kuiProvideButtonOptions({ button: { shape: 'ghost' } })];

// 2.0
providers: [provideKuiDefaults({ button: { shape: 'ghost' } })];`,
  },
];
