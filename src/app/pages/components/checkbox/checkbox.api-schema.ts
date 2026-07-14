import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CHECKBOX_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Checkbox size mapped to Kikita checkbox tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the checkbox invalid outside a field error state.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: '-',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Native checked state. Not a directive input; bind it directly on the input element.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Native disabled state. Not a directive input; bind it directly on the input element.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Native DOM property, not an HTML attribute or directive input. Set it imperatively on the element to show the dash-mark state; .kui-checkbox styles :indeterminate.',
  },
];
