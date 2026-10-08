import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SPLITTER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kui-splitter orientation',
    type: `'horizontal' | 'vertical' | undefined`,
    defaultValue: 'undefined',
    description:
      'Pane layout direction (defaults.splitter.orientation, then horizontal). Horizontal puts the panes side by side with a vertical gutter line.',
  },
  {
    name: 'kui-splitter disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Disables every gutter: aria-disabled, tabindex -1, and no drag or keyboard resize. Pane content stays interactive.',
  },
  {
    name: '(sizesChange)',
    type: 'readonly number[]',
    defaultValue: '-',
    description: 'Emitted with the full sizes array, in percent, on every drag or keyboard resize.',
  },
  {
    name: 'kui-splitter-pane size',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Initial or requested share in percent. The splitter owns the live size afterwards. Panes without a size split the remaining space evenly.',
  },
  {
    name: 'kui-splitter-pane minSize',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Minimum share in percent, clamped to 0-100 (defaults.splitter.minSize, then 10). Drag and keyboard resizing clamp to it; invalid static values use 10.',
  },
  {
    name: 'kui-splitter-pane collapsible',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Adds a one-touch collapse button to the adjacent gutter. Only meaningful on the first or last pane; the flag of a middle pane is ignored.',
  },
  {
    name: 'currentSize',
    type: 'Signal<number>',
    defaultValue: '-',
    description: 'Live share of a pane in percent, reflecting drag and keyboard changes.',
  },
  {
    name: 'collapsed',
    type: 'Signal<boolean>',
    defaultValue: '-',
    description: 'True while the pane is collapsed to its minSize.',
  },
  {
    name: 'toggleCollapse()',
    type: '() => void',
    defaultValue: '-',
    description:
      'Toggles the collapse state. A no-op when collapsible is false or the pane is in the middle.',
  },
  {
    name: '--kui-splitter-pane-bg / -pane-border / -radius',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Container background, border and corner radius.',
  },
  {
    name: '--kui-splitter-gutter-size',
    type: 'CSS custom property',
    defaultValue: '--kui-space-2',
    description: 'Width or height of the interactive gutter strip.',
  },
  {
    name: '--kui-splitter-gutter-line / -line-hover / -line-active / -line-disabled',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Gutter line colour by state.',
  },
  {
    name: '--kui-splitter-thumb-bg / -thumb-bg-hover / -thumb-bg-active',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Default grip colour by state.',
  },
  {
    name: '--kui-splitter-collapse-btn-bg / -collapse-btn-fg / -focus-ring',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'One-touch collapse button colours and the focus-visible ring of a gutter.',
  },
  {
    name: 'KuiSplitterOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.splitter: orientation and minSize.',
  },
];
