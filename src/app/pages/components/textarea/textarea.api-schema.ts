import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TEXTAREA_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Textarea height and spacing size, mapped to Kikita UI control tokens. Resolved from defaults.textarea.size, then the parent field, then the global defaults.size, then md.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks the textarea invalid outside a kui-field error state. With [formField] the Field state wins.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'KuiTextareaOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.textarea: size.',
  },
];
