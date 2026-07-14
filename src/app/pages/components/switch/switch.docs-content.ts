import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SWITCH_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SWITCH_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SWITCH_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'switch.ts',
    language: 'ts',
    code: `import { KuiFieldComponent, KuiSwitchDirective } from '@kikita-labs/ui';`,
  },
];
