import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const BADGE_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const BADGE_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const BADGE_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'badge.ts',
    language: 'ts',
    code: `import { KuiBadgeDirective } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
