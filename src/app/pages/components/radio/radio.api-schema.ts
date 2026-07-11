import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const RADIO_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Radio size mapped to Kikita radio tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    description: 'Marks the radio invalid outside a kui-field error state.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
];
