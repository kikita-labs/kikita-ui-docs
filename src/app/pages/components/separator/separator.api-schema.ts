import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SEPARATOR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'subtle' | 'default' | 'strong' | undefined`,
    defaultValue: 'undefined',
    description:
      'Visual divider emphasis. Falls back to defaults.separator.appearance, then default.',
  },
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical' | undefined`,
    defaultValue: 'undefined',
    description:
      'Divider direction (defaults.separator.orientation, then horizontal). Vertical separators set aria-orientation="vertical" and stretch to the parent block size.',
  },
  {
    name: 'spacing',
    type: `'none' | 'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Outer spacing around the divider line. Falls back to defaults.separator.spacing, then sm.',
  },
  {
    name: 'KuiSeparatorOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.separator: appearance, orientation and spacing.',
  },
];
