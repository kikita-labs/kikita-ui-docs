import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const ICON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const ICON_API_DESCRIPTION = `Inputs and provider API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const ICON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Component',
    filename: 'icon.ts',
    language: 'ts',
    code: `import { KuiIconComponent } from '@kikita-labs/ui';`,
  },
  {
    label: 'Registry',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi, provideKuiIcons } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi(),
    provideKuiIcons({
      check: '<svg viewBox="0 0 16 16"><path d="M3 8l3 3 7-7" /></svg>',
    }),
  ],
};`,
  },
];
