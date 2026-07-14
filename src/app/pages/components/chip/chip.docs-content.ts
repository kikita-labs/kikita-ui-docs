import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const CHIP_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const CHIP_API_DESCRIPTION = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const CHIP_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'chip.ts',
    language: 'ts',
    code: `import { KuiChipDirective, KuiChipRemoveDirective } from '@kikita-labs/ui';`,
  },
];
