import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const COMBOBOX_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'value',
    type: 'T | string | null',
    defaultValue: 'null',
    description: 'Selected value. Bound by [formField] or [(value)].',
  },
  {
    name: 'query',
    type: 'string',
    defaultValue: `''`,
    description: 'Current search text shown in the native input.',
  },
  {
    name: 'search',
    type: 'output: string',
    defaultValue: '-',
    description: 'Emitted on every native input edit. Use for local filtering or remote requests.',
  },
  {
    name: 'kuiLabelFn',
    type: '(item: T) => string',
    defaultValue: 'String()',
    description:
      'Maps a selected object value to display text. Required when T is not a primitive.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: `''`,
    description: 'Native input placeholder shown when no value is selected.',
  },
  {
    name: 'mode',
    type: `'filter' | 'free' | 'async'`,
    defaultValue: `'filter'`,
    description:
      'filter clears the value while editing until a kuiOption is selected. free stores typed text as the value. async documents that filtering happens outside the directive.',
  },
  {
    name: 'clearable',
    type: 'boolean | undefined',
    defaultValue: 'true',
    description:
      'Shows a clear affordance. Falls back to KUI_COMBOBOX_OPTIONS, then KUI_FIELD_OPTIONS, then true.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Shows a suffix loader. Loading row content inside kui-dropdown is projected by the consumer.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables the native input. Set by [formField] or directly.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Keeps the value readable but prevents editing and opening the dropdown.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Applies ARIA invalid state. kui-field also contributes invalid state from validation.',
  },
  {
    name: 'errors',
    type: 'readonly ValidationError[]',
    defaultValue: '[]',
    description:
      'Validation errors set by [formField], consumed by kui-field for automatic error text.',
  },
  {
    name: 'touched',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Touched state set by [formField] or Signal Forms.',
  },
  {
    name: 'touch',
    type: 'output: void',
    defaultValue: '-',
    description:
      'Emitted when an opened dropdown closes; marks the control touched for Signal Forms.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Explicit id override. Inside kui-field, the field id is used when omitted.',
  },
  {
    name: 'kuiOption',
    type: 'directive',
    defaultValue: '-',
    description:
      'Marks a projected option inside kui-dropdown. Provides role="option", aria-selected, disabled state, and keyboard navigation.',
  },
  {
    name: 'kuiComboboxHighlight',
    type: `pipe: (label: string, query: string | null | undefined) => readonly { text: string; match: boolean }[]`,
    defaultValue: '-',
    description:
      'Splits an option label into plain and matched segments for highlighting the current query.',
  },
  {
    name: 'kuiProvideComboboxOptions',
    type: '(opts: KuiComboboxOptions) => Provider',
    defaultValue: '-',
    description:
      'Registers app-wide combobox defaults, such as clearable, via KUI_COMBOBOX_OPTIONS.',
  },
  {
    name: 'KUI_COMBOBOX_OPTIONS',
    type: 'InjectionToken<KuiComboboxOptions>',
    defaultValue: '-',
    description:
      'Injection token backing kuiProvideComboboxOptions. Read by the directive for clearable fallback.',
  },
  {
    name: '--kui-combobox-affordance-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Size of the suffix clear/chevron affordance controls.',
  },
  {
    name: '--kui-combobox-suffix-gap',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Gap between suffix affordances (clear button, chevron, loader).',
  },
  {
    name: '--kui-combobox-loader-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Diameter of the suffix loading spinner.',
  },
  {
    name: '--kui-combobox-loader-border-width',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Border width of the suffix loading spinner.',
  },
  {
    name: '--kui-combobox-loader-duration',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Animation duration of the suffix loading spinner.',
  },
  {
    name: '--kui-combobox-highlight-bg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Background color of matched text inside kui-combobox-highlight.',
  },
  {
    name: '--kui-combobox-highlight-text',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Text color of matched text inside kui-combobox-highlight.',
  },
  {
    name: '--kui-combobox-highlight-radius',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Corner radius of the matched-text highlight mark.',
  },
];
