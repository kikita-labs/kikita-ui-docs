import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'solid' | 'soft' | 'outline' | 'ghost' | 'danger' | 'primary' | 'secondary'`,
    description: 'Visual treatment. primary and secondary are aliases for solid and soft.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Control height and spacing size.',
  },
  {
    name: 'wrap',
    type: 'boolean',
    description: 'Allows long button text to wrap instead of truncating in narrow containers.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description:
      'Disables native button behavior. Anchor buttons receive aria-disabled and leave tab order.',
  },
];
