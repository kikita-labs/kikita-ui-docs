import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const ICON_BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'solid' | 'soft' | 'outline' | 'ghost' | 'danger' | 'primary' | 'secondary'`,
    description: 'Visual treatment. primary and secondary are aliases for solid and soft.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Square control size mapped to Kikita control height tokens.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description:
      'Disables native button behavior. Anchor icon buttons receive aria-disabled and leave tab order.',
  },
];
