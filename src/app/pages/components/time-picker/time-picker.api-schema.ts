import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TIME_PICKER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(value)]',
    type: 'Date | null',
    defaultValue: 'null',
    description:
      'Selected time. Only the hours, minutes and seconds are meaningful. Auto-wired both ways into a sibling kui-time-picker-panel inside the same kui-field.',
  },
  {
    name: 'format',
    type: `'24h' | '12h' | undefined`,
    defaultValue: 'undefined',
    description:
      'Display and parse format. Resolves as format, then defaults.timePicker.format, then the hour cycle of the locale (12h in en-US, 24h in ru-RU). Pushed into the panel.',
  },
  {
    name: 'hourStep / minuteStep / secondStep',
    type: 'number',
    defaultValue: '1',
    description:
      'Thins the hour, minute and second columns to every Nth value; typed values snap to the step. Static numeric values are coerced and invalid or non-positive values use 1. Fall back to defaults.timePicker. Pushed into the panel.',
  },
  {
    name: 'showSeconds',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Adds a seconds column and group. Falls back to defaults.timePicker.showSeconds.',
  },
  {
    name: 'minTime / maxTime',
    type: 'Date | undefined',
    defaultValue: 'undefined',
    description:
      'Earliest and latest selectable time of day, inclusive; only hours, minutes and seconds are read. Out-of-range cells are disabled and a typed out-of-range time is only marked aria-invalid.',
  },
  {
    name: 'disabledHours',
    type: '(() => readonly number[]) | undefined',
    defaultValue: 'undefined',
    description:
      'Returns the hours to disable. A typed value on one is marked aria-invalid, not rejected.',
  },
  {
    name: 'disabledMinutes',
    type: '((hour: number) => readonly number[]) | undefined',
    defaultValue: 'undefined',
    description: 'Returns the minutes to disable for a given hour.',
  },
  {
    name: 'disabledSeconds',
    type: '((hour: number, minute: number) => readonly number[]) | undefined',
    defaultValue: 'undefined',
    description:
      'Returns the seconds to disable for a given hour and minute; used only with showSeconds.',
  },
  {
    name: 'clearable',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the clear button once there is a value. Resolved as local input, defaults.timePicker.clearable, defaults.field.clearable, then true.',
  },
  {
    name: 'disabled / readonly',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'disabled uses the native attribute on the input and the chevron. readonly shows the value but never opens the popover.',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    defaultValue: 'locale layout',
    description:
      'Defaults to the hour, minute and second placeholder messages joined with the locale separator, plus the day period for 12h.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiTimePickerMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides: button and column names, Now, Done and the placeholder tokens.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Falls back to the control id of the parent kui-field.',
  },
  {
    name: 'invalid, errors, touched, (touch)',
    type: 'FormValueControl<Date | null>',
    defaultValue: '-',
    description:
      'The Signal Forms contract, with the same shape as the date picker. invalid is also set by an incomplete group or a value in an excluded range.',
  },
  {
    name: 'kui-time-picker-panel',
    type: 'component',
    defaultValue: '-',
    description:
      'The scrollable hour, minute and second columns with Now and Done. It works inside a kui-dropdown (auto-wired to the input) or standalone with [(value)]; standalone it draws its own background and border.',
  },
  {
    name: '--kui-timepicker-col-gap / -icon-color / -cell-bg-selected / -cell-text-selected / -cell-bg-hover',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Column gap, clock icon colour and the selected and hover cell colours.',
  },
  {
    name: '--kui-timepicker-affordance-size / -suffix-gap',
    type: 'CSS custom properties',
    defaultValue: '20px / 2px',
    description: 'Chevron and clear target size and the gap between the trailing buttons.',
  },
  {
    name: 'KuiTimePickerOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.timePicker: clearable, format, hourStep, minuteStep, secondStep, showSeconds, chevronIcon and clearIcon.',
  },
];
