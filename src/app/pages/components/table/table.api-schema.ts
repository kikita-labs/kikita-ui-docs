import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TABLE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'data',
    type: 'T[]',
    defaultValue: '[]',
    description: 'Source rows for sorting and selection. Selector: table[kuiTable].',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Table density and typography scale. Selector: table[kuiTable].',
  },
  {
    name: 'selectionChange',
    type: 'output<T[]>',
    description:
      'Emits current selection whenever it changes. Observing this output is what makes the selection column appear. Selector: table[kuiTable].',
  },
  {
    name: 'sortChange',
    type: 'output<KuiActiveSortState | null>',
    description:
      'Emits the active sort key/direction, or null when sort is cleared. When observed, kuiTable hands row ordering to the parent instead of sorting locally. Selector: table[kuiTable].',
  },
  {
    name: 'sortState',
    type: 'Signal<KuiSortState>',
    description: 'Current sort state (null when no column is sorted). Selector: table[kuiTable].',
  },
  {
    name: 'sortedData',
    type: 'Signal<T[]>',
    description:
      'Rows in current sort order. Use this in the template instead of data when sort is uncontrolled. Selector: table[kuiTable].',
  },
  {
    name: 'isSelected(item)',
    type: '(item: T) => boolean',
    description:
      'Returns whether a given row value is currently selected. Selector: table[kuiTable].',
  },
  {
    name: '#table="kuiTable"',
    type: 'exportAs',
    description: 'Template reference for reading sortedData(), sortState(), and selection state.',
  },
  {
    name: 'sortKey',
    type: 'string | undefined',
    defaultValue: '-',
    description:
      'Enables sort for this header cell; usually matches a row property name. Selector: th[kuiTh].',
  },
  {
    name: 'comparator',
    type: '(a: T, b: T) => number',
    defaultValue: '-',
    description:
      'Custom sort function for the column, used instead of default comparison. Selector: th[kuiTh].',
  },
  {
    name: 'sticky',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Pins this header cell horizontally with position: sticky. Selector: th[kuiTh]. Also available on tr[kuiThGroup] to pin the whole header row vertically.',
  },
  {
    name: 'value',
    type: 'T',
    description: 'The data object represented by this row. Selector: tr[kuiRow], required.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: `'Select all rows'`,
    description: 'Accessible label for the select-all checkbox. Selector: th[kuiSelectTh].',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: '-',
    description:
      'Accessible label for a row selection checkbox, e.g. "Select " + row.name. Selector: td[kuiSelectCell].',
  },
  {
    name: 'td[kuiCell]',
    type: 'marker directive',
    description:
      'Applies Kikita table cell styling to a native td. No inputs in the installed version.',
  },
  {
    name: '--kui-table-font-size',
    type: 'CSS custom property',
    description: 'Base font size for table text.',
  },
  {
    name: '--kui-table-th-py',
    type: 'CSS custom property',
    description: 'Vertical padding for header cells.',
  },
  {
    name: '--kui-table-cell-px',
    type: 'CSS custom property',
    description: 'Horizontal padding for cells.',
  },
  {
    name: '--kui-table-row-py',
    type: 'CSS custom property',
    description: 'Vertical padding for body row cells.',
  },
  {
    name: '--kui-table-th-fg',
    type: 'CSS custom property',
    description: 'Header cell text color.',
  },
  {
    name: '--kui-table-th-bg',
    type: 'CSS custom property',
    description: 'Header cell background color.',
  },
  {
    name: '--kui-table-border',
    type: 'CSS custom property',
    description: 'Outer table border color.',
  },
  {
    name: '--kui-table-row-border',
    type: 'CSS custom property',
    description: 'Row divider border color.',
  },
  {
    name: '--kui-table-row-hover-bg',
    type: 'CSS custom property',
    description: 'Row background on hover.',
  },
  {
    name: '--kui-table-row-selected-bg',
    type: 'CSS custom property',
    description: 'Row background when selected.',
  },
  {
    name: '--kui-table-row-selected-accent',
    type: 'CSS custom property',
    description: 'Accent color for selected rows.',
  },
  {
    name: '--kui-table-sort-active-color',
    type: 'CSS custom property',
    description: 'Color used for the active sort indicator.',
  },
  {
    name: '--kui-table-bg',
    type: 'CSS custom property',
    description: 'Table background color.',
  },
];
