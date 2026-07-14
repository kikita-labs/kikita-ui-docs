import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SEGMENTED_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SEGMENTED_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SEGMENTED_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'segmented.ts',
    language: 'ts',
    code: `import { KuiSegmentDirective, KuiSegmentedComponent } from '@kikita-labs/ui';`,
  },
];
