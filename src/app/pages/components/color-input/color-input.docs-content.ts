import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const COLOR_INPUT_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const COLOR_INPUT_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const COLOR_INPUT_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'color-input.ts',
    language: 'ts',
    code: `import { KuiColorInputDirective, KuiFieldComponent } from '@kikita-labs/ui';`,
  },
];
