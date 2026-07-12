import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicSortableTableExample } from './examples/basic-sortable-table-example/basic-sortable-table-example';
import { CombinedTableExample } from './examples/combined-table-example/combined-table-example';
import { RowSelectionTableExample } from './examples/row-selection-table-example/row-selection-table-example';
import { StickyHeaderTableExample } from './examples/sticky-header-table-example/sticky-header-table-example';
import { TABLE_API_ROWS } from './table.api-schema';

@Component({
  selector: 'app-table-page',
  imports: [
    ApiTable,
    BasicSortableTableExample,
    CodeTabs,
    CombinedTableExample,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    RowSelectionTableExample,
    StickyHeaderTableExample,
  ],
  templateUrl: './table-page.html',
  styleUrl: './table-page.scss',
})
export class TablePage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TABLE_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'table.ts',
      language: 'ts',
      code: `import {
  KuiCellDirective,
  KuiRowDirective,
  KuiSelectCellComponent,
  KuiSelectThComponent,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<table kuiTable [data]="rows" #table="kuiTable">
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
</table>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-sortable-table-example',
  imports: [KuiCellDirective, KuiRowDirective, KuiTableDirective, KuiThDirective, KuiThGroupDirective],
  templateUrl: './basic-sortable-table-example.html',
  styleUrl: './basic-sortable-table-example.scss',
})
export class BasicSortableTableExample {
  protected readonly rows = [
    { id: '1', name: 'Ava Chen', role: 'Engineer', status: 'Active' },
    { id: '2', name: 'Liam Osei', role: 'Designer', status: 'Invited' },
  ];
}`,
    },
  ];

  protected readonly selectionTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<table kuiTable [data]="rows" (selectionChange)="onSelectionChange($event)">
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
</table>`,
    },
  ];

  protected readonly stickyTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div class="scroll-region">
  <table kuiTable [data]="rows" #table="kuiTable">
    <thead>
      <tr kuiThGroup sticky>
        <th kuiTh sortKey="name" sticky>Name</th>
        <th kuiTh sortKey="role">Role</th>
        <th kuiTh sortKey="department">Department</th>
        <th kuiTh sortKey="status">Status</th>
      </tr>
    </thead>
    <tbody>
      @for (row of table.sortedData(); track row.id) {
        <tr kuiRow [value]="row">
          <td kuiCell>{{ row.name }}</td>
          <td kuiCell>{{ row.role }}</td>
          <td kuiCell>{{ row.department }}</td>
          <td kuiCell>{{ row.status }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`,
    },
  ];

  protected readonly combinedTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<table kuiTable [data]="rows" #table="kuiTable" (selectionChange)="onSelectionChange($event)">
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
</table>`,
    },
  ];
}
