import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const BUTTON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    defaultValue: `'solid'`,
    description: 'Surface treatment. Combines freely with appearance.',
  },
  {
    name: 'appearance',
    type: `'primary' | 'danger' | 'success' | 'warning' | null`,
    defaultValue: 'null',
    description:
      'Semantic color intent. Without an explicit value, solid and soft use primary colors and outline and ghost use their neutral defaults.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Control height and spacing size. Falls back to defaults.button.size, then the global defaults.size.',
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
      'Disables button behavior. A button host gets the native disabled attribute; an anchor host gets aria-disabled="true", leaves the tab order and suppresses navigation.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Centers a kuiLoader spinner over the button content, fades the content out while keeping its layout size, sets aria-busy="true" and behaves like disabled. The button keeps full opacity instead of dimming like a disabled one.',
  },
  {
    name: 'iconStart',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Renders a kui-icon resolved by registered name before the projected content, without hand-projecting kui-icon.',
  },
  {
    name: 'iconEnd',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Renders a kui-icon resolved by registered name after the projected content, without hand-projecting kui-icon.',
  },
  {
    name: 'provideKuiDefaults({ button })',
    type: '(defaults: KuiComponentDefaults) => Provider',
    defaultValue: '-',
    description:
      'Scopes repeated defaults for kuiButton in a component, route or feature subtree. A nested level merges with its parent per property. Use the defaults option of provideKikitaUi for the whole application.',
  },
  {
    name: 'KuiButtonOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.button: shape, appearance (null selects each shape neutral appearance) and size. It is the same shape as KuiButtonBaseOptions, shared with defaults.iconButton.',
  },
  {
    name: 'KuiDefaults',
    type: 'service',
    defaultValue: '-',
    description:
      'Injectable that reads and writes defaults at runtime: get(key) returns a Signal of the effective options, set and update write to the nearest level.',
  },
  {
    name: 'KuiButtonShape / KuiButtonAppearance',
    type: 'type aliases',
    defaultValue: '-',
    description: 'Public unions of the shape and appearance values, exported for typed wrappers.',
  },
  {
    name: 'kuiProvideButtonOptions',
    type: 'deprecated function',
    defaultValue: '-',
    description:
      'Forwards { button, iconButton } (KuiButtonProviderOptions) to provideKuiDefaults. Deprecated, removed in 3.0; use provideKuiDefaults.',
  },
];

export const BUTTON_DEFAULTS_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'solid' | 'soft' | 'outline' | 'ghost'`,
    defaultValue: `'solid'`,
    description: 'Default surface shape.',
  },
  {
    name: 'appearance',
    type: `'primary' | 'danger' | 'success' | 'warning' | null`,
    defaultValue: 'null',
    description: "Default semantic color intent. Use null for each shape's neutral appearance.",
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Default button size. Takes precedence over the global defaults.size.',
  },
];

export const BUTTON_COLOR_TOKEN_ROWS: readonly ApiTableRow[] = [
  {
    name: '--kui-btn-solid-bg / -bg-hov / -bg-act',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Fill, hover and active fill of the default and primary appearances.',
  },
  {
    name: '--kui-btn-solid-fg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Label color of the default, primary, success and warning appearances.',
  },
  {
    name: '--kui-btn-danger-bg / -bg-hov / -bg-act',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Fill, hover and active fill of the danger appearance.',
  },
  {
    name: '--kui-btn-danger-fg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Label color of the solid danger appearance.',
  },
  {
    name: '--kui-btn-success-bg / -bg-hov / -bg-act',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Fill, hover and active fill of the success appearance.',
  },
  {
    name: '--kui-btn-warning-bg / -bg-hov / -bg-act',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Fill, hover and active fill of the warning appearance.',
  },
  {
    name: '--kui-btn-soft-* / --kui-btn-outline-* / --kui-btn-ghost-*',
    type: 'CSS custom property',
    defaultValue: '-',
    description:
      'Surface tokens of the soft, outline and ghost shapes for the default appearance. Status appearances read the matching --kui-color-<status>-soft-* semantic tokens.',
  },
];
