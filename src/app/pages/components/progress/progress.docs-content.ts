import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const PROGRESS_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const PROGRESS_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const PROGRESS_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'progress.ts',
    language: 'ts',
    code: `import { KuiProgressComponent } from '@kikita-labs/ui';`,
  },
];
