import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const CALENDAR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const CALENDAR_API_DESCRIPTION = `Inputs, models, projection slots, provider defaults, messages and locale helpers verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const CALENDAR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'calendar.ts',
    language: 'ts',
    code: `import {
  KuiCalendar,
  type KuiCalendarMessages,
  provideKikitaUi,
  provideKuiLocale,
} from '@kikita-labs/ui';`,
  },
];

export const CALENDAR_LOCALE_TABS: readonly CodeTab[] = [
  {
    label: 'Application',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

provideKikitaUi({ locale: 'ja-JP' });`,
  },
  {
    label: 'Subtree',
    filename: 'booking.providers.ts',
    language: 'ts',
    code: `import { provideKuiLocale } from '@kikita-labs/ui';

// A component, route or environment injector: applies to that subtree only.
providers: [provideKuiLocale('de-DE')];`,
  },
];

export const CALENDAR_MIGRATION_TABS: readonly CodeTab[] = [
  {
    label: 'Range selection',
    filename: 'sprint.html',
    language: 'html',
    code: `<!-- 1.x -->
<kui-calendar mode="range" [(value)]="sprint" />

<!-- 2.0: a separate component, value is KuiDateRange | null -->
<kui-calendar-range [(value)]="sprint" />`,
  },
];
