import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const CALENDAR_RANGE_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const CALENDAR_RANGE_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const CALENDAR_RANGE_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'calendar-range.ts',
    language: 'ts',
    code: `import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
