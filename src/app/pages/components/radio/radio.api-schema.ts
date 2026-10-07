import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const RADIO_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Radio size mapped to Kikita radio tokens. Resolved from defaults.radio.size, then the parent field, then the global defaults.size, then md.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks the radio invalid outside a kui-field error state. With [formField] the Field state wins.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'KuiRadioOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.radio: size.',
  },
];
