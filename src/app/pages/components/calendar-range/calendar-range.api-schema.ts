import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CALENDAR_RANGE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(value)]',
    type: 'KuiDateRange | null',
    defaultValue: 'null',
    description:
      'Selected range, { start: Date; end: Date | null }. end is null while only the start has been picked; the first click after a committed range starts a new one.',
  },
  {
    name: '[(viewDate)]',
    type: 'Date',
    defaultValue: 'current month',
    description:
      'First-of-month date that controls the visible month. Left unbound it defaults to today, or to the month of the bound value.start at construction.',
  },
  {
    name: 'size',
    type: `'md' | 'sm' | undefined`,
    defaultValue: 'undefined',
    description:
      'Calendar density. sm drops the border and padding for sidebars. Falls back to defaults.calendarRange.size, then the global defaults.size, then md.',
  },
  {
    name: 'flat',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Strips the calendar background, border and padding, for dropdown or popover panels. Falls back to defaults.calendarRange.flat, then false.',
  },
  {
    name: 'showWeekend',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Mutes the weekend days of the locale. Falls back to defaults.calendarRange.showWeekend, then true.',
  },
  {
    name: 'showFooter',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the built-in footer with the current value and the Today shortcut. Falls back to defaults.calendarRange.showFooter, then false.',
  },
  {
    name: 'showPrevNav / showNextNav',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Hide the previous or next header navigation control, for two linked calendars a month apart. Fall back to defaults.calendarRange, then true.',
  },
  {
    name: 'minDate / maxDate',
    type: 'Date | undefined',
    defaultValue: 'undefined',
    description: 'Inclusive lower and upper bounds. Dates outside them are disabled.',
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
    defaultValue: 'undefined',
    description:
      'BCP 47 locale for month and weekday names, heading order, week start and weekend. It overrides the locale of the nearest KuiI18n level for this instance.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiCalendarMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides, the same group as the calendar. They win over scoped and root messages.',
  },
  {
    name: '[kuiCalendarHeader] / [kuiCalendarFooter]',
    type: 'projected content',
    defaultValue: '-',
    description:
      'Replace the default header or footer entirely; the built-in block (and the showFooter toggle) renders only when nothing is projected.',
  },
  {
    name: '--kui-calendar-width',
    type: 'CSS custom property',
    defaultValue: '296px',
    description: 'Overrides the fixed calendar width, as for kui-calendar.',
  },
  {
    name: 'KuiDateRange',
    type: 'interface',
    defaultValue: '-',
    description: 'The value shape: { start: Date; end: Date | null }.',
  },
  {
    name: 'KuiCalendarOptions / KuiCalendarViewOptions',
    type: 'interfaces',
    defaultValue: '-',
    description:
      'Shape of defaults.calendarRange (size, flat, showWeekend, showFooter, showPrevNav, showNextNav, previousIcon, nextIcon), shared with kui-calendar.',
  },
];
