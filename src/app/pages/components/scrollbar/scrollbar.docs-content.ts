import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SCROLLBAR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SCROLLBAR_API_DESCRIPTION = `CSS custom properties and provider option verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SCROLLBAR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'scrollbar.ts',
    language: 'ts',
    code: `import '@kikita-labs/ui/styles/kikita-ui.css';`,
  },
];

export const SCROLLBAR_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi({ scrollbars: 'styled' })],
};`,
  },
];
