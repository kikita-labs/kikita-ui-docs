import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const SPLITTER_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const SPLITTER_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const SPLITTER_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'splitter.ts',
    language: 'ts',
    code: `import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
