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
    type: 'string',
    defaultValue: `'dd.mm.yyyy'`,
    description: 'Native input placeholder for the fixed display mask.',
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
];
