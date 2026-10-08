import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TABS_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'variant',
    type: `'line' | 'pill' | undefined`,
    defaultValue: 'undefined',
    description:
      'Tab visual style: underline indicator (line) or pill background (pill). Falls back to defaults.tabs.variant, then line.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Tab trigger height and font size. Falls back to defaults.tabs.size, then the root size, then md.',
  },
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical' | undefined`,
    defaultValue: 'undefined',
    description:
      'Layout direction of the tab list (defaults.tabs.orientation, then horizontal). Vertical stacks triggers in a column with the indicator on the side edge.',
  },
  {
    name: 'inverted',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Flips the tab edge. Horizontal tabs render panels above and the indicator on top; vertical tabs render panels before the list and the indicator on the start edge.',
  },
  {
    name: 'controlsPanels',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Whether tabs expose aria-controls links to projected kuiTabPanel elements. Set to false when tabs are used as navigation and content is rendered elsewhere, such as a router-outlet.',
  },
  {
    name: '[(value)]',
    type: 'string',
    defaultValue: '-',
    description: 'Value of the active tab.',
  },
  {
    name: '[(selected)]',
    type: 'string',
    defaultValue: '-',
    description:
      'Deprecated alias for value, kept in sync with it. Use value instead; planned for removal in the next major version.',
  },
  {
    name: '[kuiTab] value',
    type: 'string',
    defaultValue: '-',
    description:
      'Identifier for this tab trigger. Must match a kuiTabPanel value when controlsPanels is true.',
  },
  {
    name: '[kuiTab] hasError',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Shows a small danger dot next to the tab label without changing the selected state or tab color.',
  },
  {
    name: '[kuiTab] errorLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Screen-reader-only text announced alongside the error dot. Falls back to the tabs.errorIndicator message (has error).',
  },
  {
    name: '[kuiTabPanel] value',
    type: 'string',
    defaultValue: '-',
    description:
      'Identifier matching a [kuiTab] value. Panel is shown when its value matches the tabs value.',
  },
  {
    name: '--kui-tabs-gap',
    type: 'CSS length',
    defaultValue: '2px',
    description: 'Gap between tab triggers in the list.',
  },
  {
    name: '--kui-tabs-border',
    type: 'CSS color',
    defaultValue: 'var(--kui-color-border)',
    description: 'Border color of the tab list edge (bottom for horizontal, side for vertical).',
  },
  {
    name: '--kui-tabs-panel-gap',
    type: 'CSS length',
    defaultValue: 'var(--kui-space-4)',
    description: 'Gap between the tab list and the active panel.',
  },
  {
    name: '--kui-tab-height',
    type: 'CSS length',
    defaultValue: 'var(--kui-btn-height)',
    description: 'Tab trigger block size. Overridden per size.',
  },
  {
    name: '--kui-tab-px',
    type: 'CSS length',
    defaultValue: 'var(--kui-btn-px)',
    description: 'Tab trigger inline padding. Overridden per size.',
  },
  {
    name: '--kui-tab-indicator',
    type: 'CSS color',
    defaultValue: 'var(--kui-color-primary-fill)',
    description: 'Color of the selected-tab indicator (underline for line, background for pill).',
  },
  {
    name: '--kui-tab-fg-active',
    type: 'CSS color',
    defaultValue: 'var(--kui-color-text)',
    description: 'Text color of the selected tab.',
  },
  {
    name: '--kui-tab-gap',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Gap inside a tab trigger.',
  },
  {
    name: '--kui-tab-radius',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab trigger corner radius.',
  },
  {
    name: '--kui-tab-fg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab foreground.',
  },
  {
    name: '--kui-tab-fg-hover',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab foreground on hover.',
  },
  {
    name: '--kui-tab-bg-hover',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab background on hover.',
  },
  {
    name: '--kui-tab-indicator-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Thickness of the active indicator.',
  },
  {
    name: '--kui-tab-font-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab font size.',
  },
  {
    name: '--kui-tab-font-weight',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Tab font weight.',
  },
  {
    name: '--kui-tab-font-weight-active',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Active tab font weight.',
  },
  {
    name: '--kui-tab-pill-gap',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Gap between pill tabs.',
  },
  {
    name: '--kui-tab-pill-radius',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Pill tab corner radius.',
  },
  {
    name: '--kui-tab-pill-bg-hover',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Pill tab background on hover.',
  },
  {
    name: '--kui-tab-pill-bg-active',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Active pill tab background.',
  },
  {
    name: '--kui-tab-pill-fg-active',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Active pill tab foreground.',
  },
  {
    name: 'KuiTabsOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.tabs: size, variant, orientation, previousIcon and nextIcon.',
  },
];
