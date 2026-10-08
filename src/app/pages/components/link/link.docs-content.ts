import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const LINK_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const LINK_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const LINK_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'link.ts',
    language: 'ts',
    code: `import { KuiLink } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
