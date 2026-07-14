import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const CALENDAR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const CALENDAR_API_DESCRIPTION = `Inputs, models, projection slots, and locale helpers verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const CALENDAR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'calendar.ts',
    language: 'ts',
    code: `import {
  KuiCalendarComponent,
  kuiProvideLocale,
  type KuiCalendarValue,
  type KuiDateRange,
} from '@kikita-labs/ui';`,
  },
];
