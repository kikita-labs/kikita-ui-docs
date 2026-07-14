import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const INPUT_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const INPUT_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const INPUT_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'input.ts',
    language: 'ts',
    code: `import {
  KuiInputDirective,
  KuiInputGroupDirective,
} from '@kikita-labs/ui';`,
  },
];
