import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    description: 'Surface treatment. Defaults to solid. Combines freely with appearance.',
  },
  {
    name: 'appearance',
    type: `'primary' | 'danger' | 'success' | 'warning'`,
    description:
      'Semantic color intent. Without an explicit value, solid/soft use primary colors and outline/ghost use neutral defaults.',
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
