import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const COLOR_INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiColorInput',
    type: 'directive',
    defaultValue: '-',
    description: 'Applies Kikita color-input styling and picker affordances to a native input.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Control height matched to Kikita UI size tokens. Falls back to defaults.colorInput.size, then the parent field, then the global defaults.size.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies an error border and inherits invalid state from parent kui-field.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'field id',
    description: 'Native input id override.',
  },
  {
    name: 'swatchLabel',
    type: 'string | undefined',
    defaultValue: 'colorInput.openPicker message',
    description:
      'Accessible label for the swatch button. Undefined when omitted: the rendered text comes from the colorInput.openPicker message (Open color picker).',
  },
  {
    name: 'messages',
    type: 'Partial<KuiColorInputMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides (openPicker, pickerLabel, and the other picker labels). They win over scoped and root messages.',
  },
  {
    name: 'KuiColorInputOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.colorInput: size and chevronIcon (takes precedence over defaults.icons.pickerChevron).',
  },
];
