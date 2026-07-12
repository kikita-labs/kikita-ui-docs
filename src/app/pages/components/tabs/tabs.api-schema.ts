import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const TABS_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'variant',
    type: `'line' | 'pill'`,
    defaultValue: `'line'`,
    description: 'Tab visual style: underline indicator (line) or pill background (pill).',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Tab trigger height and font size.',
  },
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical'`,
    defaultValue: `'horizontal'`,
    description:
      'Layout direction of the tab list. Vertical stacks triggers in a column with the indicator on the side edge.',
  },
  {
    name: 'controlsPanels',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Whether tabs expose aria-controls links to projected kuiTabPanel elements. Set to false when tabs are used as navigation and content is rendered elsewhere, such as a router-outlet.',
  },
  {
    name: 'selected',
    type: 'string',
    defaultValue: '-',
    description: 'Value of the active tab. Two-way bindable with [(selected)].',
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
    type: 'string',
    defaultValue: `''`,
    description: 'Screen-reader-only text announced alongside the error dot.',
  },
  {
    name: '[kuiTabPanel] value',
    type: 'string',
    defaultValue: '-',
    description:
      'Identifier matching a [kuiTab] value. Panel is shown when its value matches selected.',
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
];
