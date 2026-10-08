import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const OTP_INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'length',
    type: 'number',
    defaultValue: '6',
    description:
      'Number of cells. Static numeric values are coerced; an invalid or non-positive value uses 1.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Cell size, the same scale as Input. Falls back to defaults.otpInput.size, then the root size, then md.',
  },
  {
    name: 'mask',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description: 'Renders every cell as type="password" (defaults.otpInput.mask, then false).',
  },
  {
    name: 'integerOnly',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Restricts input to digits with a numeric mobile keyboard (defaults.otpInput.integerOnly, then true). false accepts letters and digits, uppercased.',
  },
  {
    name: 'autoFocus',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Focuses the first cell that can take focus after the first render, and again on every false to true change.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name of the role="group" cell group. Falls back to the otpInput.label message (Verification code).',
  },
  {
    name: '[(value)]',
    type: 'string',
    defaultValue: `''`,
    description: 'Joined characters of every cell, in order. Set by [formField] or [(value)].',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables every cell with the native attribute. Set by [formField] or directly.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Makes every cell read-only and also blocks pasting a new code and the cross-cell Backspace clear.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks the code required: the first cell, which the field label points at, gets the native required state. Also follows a required ancestor kui-field.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Disables every cell, blurs the code in place and shows a centered Loader without changing the group size.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks every cell invalid. Through [formField] the raw state is gated by touched before it shows.',
  },
  {
    name: 'errors',
    type: 'readonly ValidationError[]',
    defaultValue: '[]',
    description: 'Current validation errors. Set by [formField].',
  },
  {
    name: 'touched',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the control has been touched. Set by [formField].',
  },
  {
    name: '(touch)',
    type: 'void',
    defaultValue: '-',
    description: 'Emitted after any cell edit; marks the control touched in the form system.',
  },
  {
    name: '(complete)',
    type: 'string',
    defaultValue: '-',
    description:
      'Emitted once with the completed value when every cell becomes filled. It fires again only after the code became incomplete and was refilled.',
  },
  {
    name: 'focus(options?)',
    type: '(options?: FocusOptions) => void',
    defaultValue: '-',
    description:
      'Moves focus to the first cell that can take focus, so focusBoundControl() works. Does nothing while every cell is disabled.',
  },
  {
    name: '--kui-otp-gap / -cell-size / -cell-font-size / -loading-blur',
    type: 'CSS custom properties',
    defaultValue: '-',
    description:
      'Gap between cells, the square cell size, the digit font size and the loading blur (2px).',
  },
  {
    name: 'KuiOtpInputOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.otpInput: size, mask and integerOnly.',
  },
];
