import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Native input height and spacing size.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    description: 'Marks the input invalid outside a field error state.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
];
