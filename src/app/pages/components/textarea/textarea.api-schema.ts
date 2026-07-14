import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TEXTAREA_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Textarea height and spacing size, mapped to Kikita UI control tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the textarea invalid outside a kui-field error state.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: '-',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
];
