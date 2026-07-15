# Table

> Native table styling, sorting context, and selection cells.

- Status: available
- Route: /components/table
- Package: @kikita-labs/ui@0.4.2
- Import: KuiTableDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/table.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<table kuiTable [data]="rows" #table="kuiTable">
  <thead>
    <tr kuiThGroup>
      <th kuiSelectTh ariaLabel="Select all rows"></th>
      <th kuiTh sortKey="name">Name</th>
      <th kuiTh sortKey="status">Status</th>
      <th kuiTh>Actions</th>
    </tr>
  </thead>
  <tbody>
    @for (row of table.sortedData(); track row.id) {
    <tr kuiRow [value]="row">
      <td kuiSelectCell [ariaLabel]="'Select ' + row.name"></td>
      <td kuiCell>{{ row.name }}</td>
      <td kuiCell>{{ row.status }}</td>
      <td kuiCell>...</td>
    </tr>
    }
  </tbody>
</table>
```

## Examples

Rendered at /components/table:

- `basic-sortable-table-example`
- `combined-table-example`
- `row-selection-table-example`
- `sticky-header-table-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | T[] | [] | Source rows for sorting and selection. Selector: table[kuiTable]. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Table density and typography scale. Selector: table[kuiTable]. |
| selectionChange | output<T[]> | - | Emits current selection whenever it changes. Observing this output is what makes the selection column appear. Selector: table[kuiTable]. |
| sortChange | output<KuiActiveSortState \| null> | - | Emits the active sort key/direction, or null when sort is cleared. When observed, kuiTable hands row ordering to the parent instead of sorting locally. Selector: table[kuiTable]. |
| sortState | Signal<KuiSortState> | - | Current sort state (null when no column is sorted). Selector: table[kuiTable]. |
| sortedData | Signal<T[]> | - | Rows in current sort order. Use this in the template instead of data when sort is uncontrolled. Selector: table[kuiTable]. |
| isSelected(item) | (item: T) => boolean | - | Returns whether a given row value is currently selected. Selector: table[kuiTable]. |
| #table="kuiTable" | exportAs | - | Template reference for reading sortedData(), sortState(), and selection state. |
| sortKey | string \| undefined | - | Enables sort for this header cell; usually matches a row property name. Selector: th[kuiTh]. |
| comparator | (a: T, b: T) => number | - | Custom sort function for the column, used instead of default comparison. Selector: th[kuiTh]. |
| sticky | boolean | false | Pins this header cell horizontally with position: sticky. Selector: th[kuiTh]. Also available on tr[kuiThGroup] to pin the whole header row vertically. |
| value | T | - | The data object represented by this row. Selector: tr[kuiRow], required. |
| ariaLabel | string | 'Select all rows' | Accessible label for the select-all checkbox. Selector: th[kuiSelectTh]. |
| ariaLabel | string | - | Accessible label for a row selection checkbox, e.g. "Select " + row.name. Selector: td[kuiSelectCell]. |
| td[kuiCell] | marker directive | - | Applies Kikita table cell styling to a native td. No inputs in the installed version. |
| --kui-table-font-size | CSS custom property | - | Base font size for table text. |
| --kui-table-th-py | CSS custom property | - | Vertical padding for header cells. |
| --kui-table-cell-px | CSS custom property | - | Horizontal padding for cells. |
| --kui-table-row-py | CSS custom property | - | Vertical padding for body row cells. |
| --kui-table-th-fg | CSS custom property | - | Header cell text color. |
| --kui-table-th-bg | CSS custom property | - | Header cell background color. |
| --kui-table-border | CSS custom property | - | Outer table border color. |
| --kui-table-row-border | CSS custom property | - | Row divider border color. |
| --kui-table-row-hover-bg | CSS custom property | - | Row background on hover. |
| --kui-table-row-selected-bg | CSS custom property | - | Row background when selected. |
| --kui-table-row-selected-accent | CSS custom property | - | Accent color for selected rows. |
| --kui-table-sort-active-color | CSS custom property | - | Color used for the active sort indicator. |
| --kui-table-bg | CSS custom property | - | Table background color. |

## Accessibility

- Keep real `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` markup.
- Sortable headers keep `aria-sort` on `<th>` and expose the action through a
  native button.
- Selection uses native checkboxes with accessible labels.
- Add a native `<caption>` in product tables when the surrounding page does not
  already provide a clear table title.
- Avoid putting complex interactive widgets inside cells unless their focus
  order and labels are explicitly tested.

## Playground

Available at /components/table/playground.
