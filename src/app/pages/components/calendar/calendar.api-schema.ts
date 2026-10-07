import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CALENDAR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(value)]',
    type: 'Date | null',
    defaultValue: 'null',
    description:
      'Selected date. For a start and end pair use kui-calendar-range, whose value is a KuiDateRange | null. Next to input[kuiDatePicker] in the same field the directive wires it for you.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiCalendarMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides (label, today, previousMonth, nextMonth, previousYear, nextYear, previousDecade, nextDecade). They win over scoped and root messages.',
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
    description:
      'Mutes the weekend days of the locale (Saturday and Sunday in en-US) when enabled.',
  },
  {
    name: 'showFooter',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows the built-in value summary and Today shortcut.',
  },
  {
    name: '[(minDate)] / [(maxDate)]',
    type: 'Date | undefined',
    defaultValue: 'undefined',
    description:
      'Inclusive lower and upper bounds for selectable days. Models, so a paired input[kuiDatePicker] can wire them from its own bounds.',
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
    description:
      'BCP 47 locale override for month names, weekday names, the heading, week start and weekend. It wins over the locale of the nearest KuiI18n level.',
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
    name: 'provideKuiLocale(locale)',
    type: 'Provider[]',
    defaultValue: '-',
    description:
      'Sets the locale of a subtree (a tag, a Signal or a function). Use provideKikitaUi({ locale }) for the whole application.',
  },
  {
    name: '--kui-calendar-width',
    type: 'CSS custom property',
    defaultValue: '296px',
    description: 'Overrides the fixed calendar width while keeping the day grid predictable.',
  },
  {
    name: 'KuiCalendarOptions / KuiCalendarViewOptions',
    type: 'interfaces',
    defaultValue: '-',
    description:
      'Shape of defaults.calendar (size, flat, showWeekend, showFooter, showPrevNav, showNextNav, previousIcon, nextIcon), shared with kui-calendar-range.',
  },
  {
    name: 'KuiCalendarMessages',
    type: 'interface',
    defaultValue: '-',
    description: 'Typed messages of the calendar and the calendar range, with English defaults.',
  },
  {
    name: 'kui-picked',
    type: 'DOM event',
    defaultValue: '-',
    description:
      'Bubbling event the calendar dispatches after a date pick, so an enclosing kui-dropdown can close.',
  },
];
