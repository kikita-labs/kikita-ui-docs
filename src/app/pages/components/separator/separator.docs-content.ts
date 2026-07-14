import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SEPARATOR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SEPARATOR_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SEPARATOR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'separator.ts',
    language: 'ts',
    code: `import { KuiSeparatorDirective } from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
  },
];
