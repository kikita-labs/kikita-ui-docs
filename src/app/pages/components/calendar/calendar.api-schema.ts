import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CALENDAR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'mode',
    type: `'single' | 'range'`,
    defaultValue: `'single'`,
    description: 'Selection mode. Range mode stores a start date and a nullable end date.',
  },
  {
    name: '[(value)]',
    type: 'Date | KuiDateRange | null',
    defaultValue: 'null',
    description: 'Selected date in single mode or selected range in range mode.',
  },
  {
    name: '[(viewDate)]',
    type: 'Date',
    defaultValue: 'current month',
    description: 'First-of-month date that controls the visible month.',
  },
  {
    name: 'size',
    type: `'md' | 'sm'`,
    defaultValue: `'md'`,
    description: 'Calendar density. Use sm when embedding in tighter sidebars or panels.',
  },
  {
    name: 'flat',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Removes the calendar frame for dropdown or popover panel composition.',
  },
  {
    name: 'showWeekend',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Mutes Saturday and Sunday labels when enabled.',
  },
  {
    name: 'showFooter',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows the built-in value summary and Today shortcut.',
  },
  {
    name: 'minDate / maxDate',
    type: 'Date | undefined',
    defaultValue: 'undefined',
    description: 'Inclusive lower and upper bounds for selectable days.',
  },
  {
    name: 'disabledDates',
    type: 'Date[] | ((date: Date) => boolean) | undefined',
    defaultValue: 'undefined',
    description: 'Individual disabled dates or a predicate evaluated for each rendered date.',
  },
  {
    name: 'locale',
    type: 'string | undefined',
    defaultValue: 'KUI_LOCALE',
    description: 'BCP 47 locale override for month names, weekday names, and week start.',
  },
  {
    name: 'showPrevNav / showNextNav',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Hide one header navigation control for linked multi-calendar layouts.',
  },
  {
    name: '[kuiCalendarHeader] / [kuiCalendarFooter]',
    type: 'projected content',
    defaultValue: '-',
    description: 'Replace the default header or footer with consumer-owned content.',
  },
  {
    name: 'kuiProvideLocale(locale)',
    type: 'Provider',
    defaultValue: '-',
    description: 'Provides the default app or subtree locale used by date-aware components.',
  },
  {
    name: '--kui-calendar-width',
    type: 'CSS custom property',
    defaultValue: '296px',
    description: 'Overrides the fixed calendar width while keeping the day grid predictable.',
  },
];
