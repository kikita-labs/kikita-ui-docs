import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const ICON_BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    description: 'Surface treatment. Defaults to ghost. Combines freely with appearance.',
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
    description: 'Square control size mapped to Kikita control height tokens.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description:
      'Disables native button behavior. Anchor icon buttons receive aria-disabled and leave tab order.',
  },
];
