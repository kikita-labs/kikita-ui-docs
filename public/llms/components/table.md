# Table

> Native table styling, sorting context, and selection cells.

- Status: available
- Route: /components/table
- Package: @kikita-labs/ui@1.0.0
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

### basic-sortable-table-example

#### basic-sortable-table-example.html

```html
<table kuiTable [data]="rows" #table="kuiTable">
  <thead>
    <tr kuiThGroup>
      <th kuiTh sortKey="name">Name</th>
      <th kuiTh sortKey="role">Role</th>
      <th kuiTh sortKey="status">Status</th>
    </tr>
  </thead>
  <tbody>
    @for (row of table.sortedData(); track row.id) {
      <tr kuiRow [value]="row">
        <td kuiCell>{{ row.name }}</td>
        <td kuiCell>{{ row.role }}</td>
        <td kuiCell>{{ row.status }}</td>
      </tr>
    }
  </tbody>
</table>
```

#### basic-sortable-table-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly status: 'Active' | 'Invited' | 'Suspended';
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Ava Chen', role: 'Engineer', status: 'Active' },
  { id: '2', name: 'Liam Osei', role: 'Designer', status: 'Invited' },
  { id: '3', name: 'Noor Malik', role: 'Product Manager', status: 'Active' },
  { id: '4', name: 'Priya Rao', role: 'Support', status: 'Suspended' },
  { id: '5', name: 'Tomas Silva', role: 'Engineer', status: 'Active' },
];

@Component({
  selector: 'app-basic-sortable-table-example',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './basic-sortable-table-example.html',
  styleUrl: './basic-sortable-table-example.scss',
})
export class BasicSortableTableExample {
  protected readonly rows = TEAM_MEMBERS;
}
```

#### basic-sortable-table-example.scss

```scss
:host {
  display: block;
  overflow-x: auto;
}
```

### combined-table-example

#### combined-table-example.html

```html
<div class="combined-table-example__scroll">
  <table kuiTable [data]="rows" #table="kuiTable" (selectionChange)="onSelectionChange($event)">
    <thead>
      <tr kuiThGroup sticky>
        <th kuiSelectTh ariaLabel="Select all team members"></th>
        <th kuiTh sortKey="name" sticky>Name</th>
        <th kuiTh sortKey="role">Role</th>
        <th kuiTh sortKey="department">Department</th>
        <th kuiTh sortKey="status">Status</th>
      </tr>
    </thead>
    <tbody>
      @for (row of table.sortedData(); track row.id) {
        <tr kuiRow [value]="row">
          <td kuiSelectCell [ariaLabel]="'Select ' + row.name"></td>
          <td kuiCell>{{ row.name }}</td>
          <td kuiCell>{{ row.role }}</td>
          <td kuiCell>{{ row.department }}</td>
          <td kuiCell>{{ row.status }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>
<p class="combined-table-example__note">{{ selected().length }} of {{ rows.length }} selected</p>
```

#### combined-table-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiSelectCellComponent,
  KuiSelectThComponent,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly department: string;
  readonly status: 'Active' | 'Invited' | 'Suspended';
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Ava Chen', role: 'Engineer', department: 'Platform', status: 'Active' },
  { id: '2', name: 'Liam Osei', role: 'Designer', department: 'Product', status: 'Invited' },
  { id: '3', name: 'Noor Malik', role: 'Product Manager', department: 'Product', status: 'Active' },
  { id: '4', name: 'Priya Rao', role: 'Support', department: 'Operations', status: 'Suspended' },
  { id: '5', name: 'Tomas Silva', role: 'Engineer', department: 'Platform', status: 'Active' },
];

@Component({
  selector: 'app-combined-table-example',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiSelectCellComponent,
    KuiSelectThComponent,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './combined-table-example.html',
  styleUrl: './combined-table-example.scss',
})
export class CombinedTableExample {
  protected readonly rows = TEAM_MEMBERS;
  protected readonly selected = signal<readonly TeamMember[]>([]);

  protected onSelectionChange(rows: readonly TeamMember[]): void {
    this.selected.set(rows);
  }
}
```

#### combined-table-example.scss

```scss
.combined-table-example__scroll {
  max-block-size: 220px;
  overflow: auto;
}

.combined-table-example__note {
  margin: var(--kui-space-2, 8px) 0 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### row-selection-table-example

#### row-selection-table-example.html

```html
<table kuiTable [data]="rows" (selectionChange)="onSelectionChange($event)">
  <thead>
    <tr kuiThGroup>
      <th kuiSelectTh ariaLabel="Select all team members"></th>
      <th kuiTh sortKey="name">Name</th>
      <th kuiTh sortKey="role">Role</th>
      <th kuiTh sortKey="status">Status</th>
    </tr>
  </thead>
  <tbody>
    @for (row of rows; track row.id) {
      <tr kuiRow [value]="row">
        <td kuiSelectCell [ariaLabel]="'Select ' + row.name"></td>
        <td kuiCell>{{ row.name }}</td>
        <td kuiCell>{{ row.role }}</td>
        <td kuiCell>{{ row.status }}</td>
      </tr>
    }
  </tbody>
</table>
<p class="row-selection-table-example__note">
  {{ selected().length }} of {{ rows.length }} selected
</p>
```

#### row-selection-table-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiSelectCellComponent,
  KuiSelectThComponent,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly status: 'Active' | 'Invited' | 'Suspended';
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Ava Chen', role: 'Engineer', status: 'Active' },
  { id: '2', name: 'Liam Osei', role: 'Designer', status: 'Invited' },
  { id: '3', name: 'Noor Malik', role: 'Product Manager', status: 'Active' },
  { id: '4', name: 'Priya Rao', role: 'Support', status: 'Suspended' },
  { id: '5', name: 'Tomas Silva', role: 'Engineer', status: 'Active' },
];

@Component({
  selector: 'app-row-selection-table-example',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiSelectCellComponent,
    KuiSelectThComponent,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './row-selection-table-example.html',
  styleUrl: './row-selection-table-example.scss',
})
export class RowSelectionTableExample {
  protected readonly rows = TEAM_MEMBERS;
  protected readonly selected = signal<readonly TeamMember[]>([]);

  protected onSelectionChange(rows: readonly TeamMember[]): void {
    this.selected.set(rows);
  }
}
```

#### row-selection-table-example.scss

```scss
:host {
  display: block;
  overflow-x: auto;
}

.row-selection-table-example__note {
  margin: var(--kui-space-2, 8px) 0 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### sticky-header-table-example

#### sticky-header-table-example.html

```html
<div class="sticky-header-table-example__scroll">
  <table kuiTable [data]="rows" #table="kuiTable">
    <thead>
      <tr kuiThGroup sticky>
        <th kuiTh sortKey="name" sticky>Name</th>
        <th kuiTh sortKey="role">Role</th>
        <th kuiTh sortKey="department">Department</th>
        <th kuiTh sortKey="location">Location</th>
        <th kuiTh sortKey="status">Status</th>
      </tr>
    </thead>
    <tbody>
      @for (row of table.sortedData(); track row.id) {
        <tr kuiRow [value]="row">
          <td kuiCell>{{ row.name }}</td>
          <td kuiCell>{{ row.role }}</td>
          <td kuiCell>{{ row.department }}</td>
          <td kuiCell>{{ row.location }}</td>
          <td kuiCell>{{ row.status }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

#### sticky-header-table-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly department: string;
  readonly location: string;
  readonly status: 'Active' | 'Invited' | 'Suspended';
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Ava Chen',
    role: 'Engineer',
    department: 'Platform',
    location: 'Remote',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Liam Osei',
    role: 'Designer',
    department: 'Product',
    location: 'Berlin',
    status: 'Invited',
  },
  {
    id: '3',
    name: 'Noor Malik',
    role: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Priya Rao',
    role: 'Support',
    department: 'Operations',
    location: 'Singapore',
    status: 'Suspended',
  },
  {
    id: '5',
    name: 'Tomas Silva',
    role: 'Engineer',
    department: 'Platform',
    location: 'Lisbon',
    status: 'Active',
  },
];

@Component({
  selector: 'app-sticky-header-table-example',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './sticky-header-table-example.html',
  styleUrl: './sticky-header-table-example.scss',
})
export class StickyHeaderTableExample {
  protected readonly rows = TEAM_MEMBERS;
}
```

#### sticky-header-table-example.scss

```scss
.sticky-header-table-example__scroll {
  max-block-size: 220px;
  overflow: auto;
}
```

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
