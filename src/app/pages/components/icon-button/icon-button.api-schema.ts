import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const ICON_BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    defaultValue: `'ghost'`,
    description: 'Surface treatment. Defaults to ghost. Combines freely with appearance.',
  },
  {
    name: 'appearance',
    type: `'primary' | 'danger' | 'success' | 'warning' | null`,
    defaultValue: 'null',
    description:
      'Semantic color intent. Without an explicit value, solid/soft use primary colors and outline/ghost use neutral defaults.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Square control size mapped to Kikita control height tokens (matches kui-input height at md).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Disables native button behavior. Anchor icon buttons receive aria-disabled and leave tab order.',
  },
  {
    name: 'icon',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Renders a kui-icon resolved by name as the button content, prepended before any other projected content, without hand-projecting kui-icon.',
  },
];
