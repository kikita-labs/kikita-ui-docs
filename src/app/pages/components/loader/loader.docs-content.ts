import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const LOADER_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const LOADER_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const LOADER_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'loader.ts',
    language: 'ts',
    code: `import { KuiLoaderDirective } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
