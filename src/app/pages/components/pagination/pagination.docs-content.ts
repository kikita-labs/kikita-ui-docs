import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const PAGINATION_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const PAGINATION_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const PAGINATION_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'pagination.ts',
    language: 'ts',
    code: `import { KuiPagination } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
