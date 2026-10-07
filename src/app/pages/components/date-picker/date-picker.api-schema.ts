import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const DATE_PICKER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'input[kuiDatePicker]',
    type: 'Directive',
    defaultValue: '-',
    description: 'Turns a native text input into a masked date picker trigger.',
  },
  {
    name: '[(value)]',
    type: 'Date | null',
    defaultValue: 'null',
    description: 'Selected date. Bind the same signal to the paired calendar.',
  },
  {
    name: '[(viewDate)]',
    type: 'Date',
    defaultValue: 'current month',
    description: 'Visible calendar month. Bind on both input and calendar for live month sync.',
  },
  {
    name: 'minDate / maxDate',
    type: 'Date | undefined',
    defaultValue: 'undefined',
    description: 'Inclusive bounds for typed values and linked calendar cells.',
  },
  {
    name: 'clearable',
    type: 'boolean | undefined',
    defaultValue: 'field option',
    description: 'Shows a clear action when the input has a value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables the input and prevents opening the dropdown.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Keeps the value readable while preventing popover opening.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Reflects validation state from Signal Forms or direct binding.',
  },
  {
    name: 'errors / touched / touch',
    type: 'Signal Forms control contract',
    defaultValue: '-',
    description: 'Integrates with Angular Signal Forms validation and touched state.',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    defaultValue: 'locale layout',
    description:
      'Native input placeholder. Defaults to the day, month and year placeholder messages in the order and separators of the locale (mm/dd/yyyy, dd.mm.yyyy).',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'field control id',
    description: 'Input id. Falls back to the parent kui-field control id when present.',
  },
  {
    name: 'kui-dropdown panelRole',
    type: `'dialog' | 'listbox' | 'grid' | null`,
    defaultValue: `'listbox'`,
    description: 'Use dialog for the calendar popover because the panel is not a listbox.',
  },
  {
    name: 'kui-calendar flat',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Use flat inside the dropdown so the calendar does not draw a second frame.',
  },
  {
    name: 'format',
    type: 'string | undefined',
    defaultValue: `'locale'`,
    description:
      'Display and parse layout: d/dd, M/MM and yyyy tokens such as dd.MM.yyyy pin it. Resolves as the input, then defaults.datePicker.format, then the locale layout.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiDatePickerMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides (openCalendar, closeCalendar and the day, month and year placeholder tokens). They win over scoped and root messages.',
  },
  {
    name: 'KuiDatePickerOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.datePicker: clearable, format, chevronIcon and clearIcon (they take precedence over defaults.icons.pickerChevron and defaults.icons.clear).',
  },
];
