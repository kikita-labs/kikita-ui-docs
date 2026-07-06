import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const SWITCH_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Switch size mapped to Kikita switch tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    description: 'Marks the switch invalid outside a field error state.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
];
