import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const BUTTON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const BUTTON_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const BUTTON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'button.ts',
    language: 'ts',
    code: `import { KuiButtonDirective } from '@kikita-labs/ui';`,
  },
];
