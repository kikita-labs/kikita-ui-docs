import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const NUMBER_INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Control height from --kui-control-height-*. Generated buttons scale to match.',
  },
  {
    name: 'variant',
    type: `'a' | 'b'`,
    defaultValue: `'b'`,
    description:
      'Button layout. b places minus/plus controls on the sides (recommended). a stacks compact arrow controls on the right.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Applies an error border. Also inherited automatically from a parent kui-field with an error.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: '-',
    description: 'Id override for the native input. Falls back to the parent kui-field control id.',
  },
  {
    name: 'min',
    type: 'string | number',
    defaultValue: '-',
    description:
      'Native HTML attribute placed directly on the input. Decrement stops and disables at this value.',
  },
  {
    name: 'max',
    type: 'string | number',
    defaultValue: '-',
    description:
      'Native HTML attribute placed directly on the input. Increment stops and disables at this value.',
  },
  {
    name: 'step',
    type: 'string | number',
    defaultValue: '1',
    description: 'Native HTML attribute. Amount the generated buttons and arrow keys step by.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Native HTML attribute. Sets data-kui-disabled on the container and disables both generated buttons.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Native HTML attribute. Sets data-kui-readonly on the container and disables both generated buttons.',
  },
  {
    name: '--kui-number-input-border',
    type: 'CSS custom property',
    defaultValue: '--kui-color-border',
    description: 'Border color in the default state.',
  },
  {
    name: '--kui-number-input-divider',
    type: 'CSS custom property',
    defaultValue: '--kui-color-border',
    description: 'Divider color between the buttons and the native input.',
  },
  {
    name: '--kui-number-input-btn-bg',
    type: 'CSS custom property',
    defaultValue: 'transparent',
    description: 'Generated button background in the default state.',
  },
  {
    name: '--kui-number-input-btn-bg-hover',
    type: 'CSS custom property',
    defaultValue: '--kui-color-surface-elevated',
    description: 'Generated button background on hover.',
  },
  {
    name: '--kui-number-input-btn-text',
    type: 'CSS custom property',
    defaultValue: '--kui-color-text-secondary',
    description: 'Generated button icon color.',
  },
];
