import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const GROUP_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const GROUP_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const GROUP_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'group.ts',
    language: 'ts',
    code: `import { KuiGroupDirective } from '@kikita-labs/ui';`,
  },
];
