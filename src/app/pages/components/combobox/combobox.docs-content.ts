import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const COMBOBOX_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const COMBOBOX_API_DESCRIPTION = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const COMBOBOX_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'combobox.ts',
    language: 'ts',
    code: `import {
  KuiCombobox,
  KuiComboboxHighlightPipe,
  KuiDropdown,
  KuiField,
  KuiOption,
  provideKuiDefaults,
} from '@kikita-labs/ui';`,
  },
];

export const COMBOBOX_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      defaults: { combobox: { clearable: true } },
    }),
  ],
};

// In a component or route subtree instead:
// providers: [provideKuiDefaults({ combobox: { clearable: true } })]`,
  },
];
