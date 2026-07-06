import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const CHECKBOX_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Checkbox size mapped to Kikita checkbox tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    description: 'Marks the checkbox invalid outside a field error state.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
];
