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
    type: `'stacked' | 'split'`,
    defaultValue: `'split'`,
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
    name: '--kui-input-height',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-control-height-md)',
    description: 'Shared control height used by the number-input wrapper.',
  },
  {
    name: '--kui-input-border',
    type: 'CSS custom property',
    defaultValue: 'ButtonBorder',
    description: 'Shared border color used when --kui-number-input-border is not overridden.',
  },
  {
    name: '--kui-input-radius',
    type: 'CSS custom property',
    defaultValue: '8px',
    description: 'Shared corner radius for the number-input wrapper.',
  },
  {
    name: '--kui-input-bg',
    type: 'CSS custom property',
    defaultValue: 'Field',
    description: 'Shared control background color.',
  },
  {
    name: '--kui-input-bg-disabled',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-input-bg)',
    description: 'Shared background color used for disabled and readonly states.',
  },
  {
    name: '--kui-input-color',
    type: 'CSS custom property',
    defaultValue: 'FieldText',
    description: 'Shared control text color.',
  },
  {
    name: '--kui-input-placeholder-color',
    type: 'CSS custom property',
    defaultValue: 'GrayText',
    description: 'Shared placeholder text color.',
  },
  {
    name: '--kui-input-border-hover',
    type: 'CSS custom property',
    defaultValue: 'ButtonBorder',
    description: 'Shared border color on hover.',
  },
  {
    name: '--kui-input-border-focus',
    type: 'CSS custom property',
    defaultValue: 'Highlight',
    description: 'Shared border color when the control has focus.',
  },
  {
    name: '--kui-input-focus-ring',
    type: 'CSS custom property',
    defaultValue: '0 0 0 3px Highlight',
    description: 'Shared focus ring applied when the control has focus.',
  },
  {
    name: '--kui-input-border-error',
    type: 'CSS custom property',
    defaultValue: 'Mark',
    description: 'Shared invalid-state border color.',
  },
  {
    name: '--kui-number-input-border',
    type: 'CSS custom property',
    defaultValue: '--kui-input-border',
    description: 'Optional number-input border override; falls back to the shared input border.',
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
