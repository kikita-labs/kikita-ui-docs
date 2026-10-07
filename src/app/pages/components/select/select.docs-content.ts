import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SELECT_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SELECT_API_DESCRIPTION = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SELECT_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'select.ts',
    language: 'ts',
    code: `import {
  KuiDropdown,
  KuiField,
  KuiOption,
  KuiSelect,
  provideKuiDefaults,
} from '@kikita-labs/ui';`,
  },
];

export const SELECT_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      defaults: { select: { clearable: true, maxVisibleChips: 2 } },
    }),
  ],
};

// In a component or route subtree instead:
// providers: [provideKuiDefaults({ select: { clearable: true } })]`,
  },
];
