import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SWITCH_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Switch size mapped to Kikita switch tokens. Resolved from defaults.switch.size, then the parent field, then the global defaults.size, then md.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks the switch invalid outside a kui-field error state. With [formField] the Field state wins.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'KuiSwitchOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.switch: size.',
  },
];
