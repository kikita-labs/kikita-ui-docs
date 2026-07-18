import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const BUTTON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const BUTTON_API_DESCRIPTION = `Inputs and provider defaults verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const BUTTON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'button.ts',
    language: 'ts',
    code: `import { KuiButtonDirective, kuiProvideButtonOptions } from '@kikita-labs/ui';`,
  },
];

export const BUTTON_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'Button family',
    filename: 'feature.providers.ts',
    language: 'ts',
    code: `import { kuiProvideButtonOptions } from '@kikita-labs/ui';

export const featureProviders = [
  kuiProvideButtonOptions({
    button: { shape: 'ghost', appearance: 'primary', size: 'sm' },
    iconButton: { shape: 'outline', size: 'sm' },
  }),
];`,
  },
];
