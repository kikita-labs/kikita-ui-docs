import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SEPARATOR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'subtle' | 'default' | 'strong'`,
    defaultValue: `'default'`,
    description: 'Visual divider emphasis.',
  },
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical'`,
    defaultValue: `'horizontal'`,
    description:
      'Divider direction. Vertical separators set aria-orientation="vertical" and stretch to the parent block size.',
  },
  {
    name: 'spacing',
    type: `'none' | 'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'sm'`,
    description: 'Outer spacing around the divider line.',
  },
];
