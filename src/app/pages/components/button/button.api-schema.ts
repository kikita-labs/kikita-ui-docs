import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    defaultValue: `'solid'`,
    description: 'Surface treatment. Defaults to solid. Combines freely with appearance.',
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
    description: 'Control height and spacing size.',
  },
  {
    name: 'wrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Allows long button text to wrap instead of truncating in narrow containers.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Disables native button behavior. Anchor buttons receive aria-disabled and leave tab order.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Centers a kui-loader spinner over the button content, preserves layout size, sets aria-busy, and behaves like disabled.',
  },
  {
    name: 'iconStart',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Renders a kui-icon resolved by name before the projected content, without hand-projecting kui-icon.',
  },
  {
    name: 'iconEnd',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Renders a kui-icon resolved by name after the projected content, without hand-projecting kui-icon.',
  },
  {
    name: 'provideKuiDefaults({ button, iconButton })',
    type: 'Provider',
    defaultValue: '-',
    description:
      'Scopes repeated defaults for kuiButton and kuiIconButton. Local inputs win over the button keys, and the button keys win over the global defaults.size. A nested level merges with its parent per property.',
  },
  {
    name: 'KuiDefaults',
    type: 'service',
    defaultValue: '-',
    description:
      'Injectable that reads and sets defaults at runtime: get(key) returns a Signal of the effective options, set and update write to the nearest level.',
  },
];
