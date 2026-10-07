import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SELECT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'value',
    type: 'T | readonly T[] | null',
    description: 'Selected value. In multiple mode this is an array.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the native input and prevents opening the dropdown.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    description: 'Prevents opening the dropdown while keeping the field visually enabled.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    description: 'Validation state set by Signal Forms or direct input binding.',
  },
  {
    name: 'errors',
    type: 'ValidationError[]',
    description: 'Validation errors consumed by kui-field for automatic error text.',
  },
  {
    name: 'touched',
    type: 'boolean',
    description: 'Touched state set by Signal Forms.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    description: 'Enables array values and keeps the dropdown open on option selection.',
  },
  {
    name: 'maxVisibleChips',
    type: 'number | undefined',
    description:
      'Maximum selected chips shown before collapsed +N overflow. Falls back to defaults.select.maxVisibleChips, then 3.',
  },
  {
    name: 'multipleDisplay',
    type: `'chips' | 'text'`,
    description: 'Renders multiple selections as field chips or plain joined text.',
  },
  {
    name: 'multipleTextFn',
    type: '(items: readonly T[]) => string',
    description: 'Formats native input text when multipleDisplay is text.',
  },
  {
    name: 'kuiLabelFn',
    type: '(item: T) => string',
    description: 'Maps selected object values to display text.',
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder on the readonly input.',
  },
  {
    name: 'clearable',
    type: 'boolean | undefined',
    description:
      'Shows a clear button when a value is selected. Resolved as local input, defaults.select.clearable, defaults.field.clearable, then false.',
  },
  {
    name: 'touch',
    type: 'output',
    description: 'Emitted after an opened dropdown closes for Signal Forms support.',
  },
  {
    name: 'ng-template[kuiSelectValue]',
    type: 'context: { $implicit: T; label: string; remove: () => void }',
    defaultValue: '-',
    description:
      'Replaces the default chip for each visible selected item in multiple mode. Call remove from a native button to make the item removable.',
  },
  {
    name: 'KuiSelectOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.select: clearable, multipleDisplay, maxVisibleChips, chevronIcon and clearIcon.',
  },
];
