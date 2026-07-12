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
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { TABLE_API_ROWS } from '../table.api-schema';

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
];

@Component({
  selector: 'app-table-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiCellDirective,
    KuiRowDirective,
    KuiSelectCellComponent,
    KuiSelectThComponent,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './table-playground-page.html',
  styleUrl: './table-playground-page.scss',
})
export class TablePlaygroundPage {
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TABLE_API_ROWS;
  protected rows = TEAM_MEMBERS;
  protected readonly selected = signal<readonly TeamMember[]>([]);

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'sortEnabled', label: 'sortable columns', kind: 'boolean', defaultValue: true },
    { key: 'selectionEnabled', label: 'row selection', kind: 'boolean', defaultValue: false },
  ];

  protected onSelectionChange(rows: readonly TeamMember[]): void {
    this.selected.set(rows);
  }

  protected sizeOf(values: PlaygroundValues): 'xs' | 'sm' | 'md' | 'lg' {
    return values['size'] as 'xs' | 'sm' | 'md' | 'lg';
  }

  protected sortEnabledOf(values: PlaygroundValues): boolean {
    return values['sortEnabled'] as boolean;
  }

  protected selectionEnabledOf(values: PlaygroundValues): boolean {
    return values['selectionEnabled'] as boolean;
  }

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const size = values['size'] as string;
    const sortEnabled = values['sortEnabled'] as boolean;
    const selectionEnabled = values['selectionEnabled'] as boolean;

    const sizeAttr = size !== 'md' ? ` size="${size}"` : '';
    const selectHeader = selectionEnabled
      ? '\n      <th kuiSelectTh ariaLabel="Select all rows"></th>'
      : '';
    const selectCell = selectionEnabled
      ? '\n        <td kuiSelectCell [ariaLabel]="\'Select \' + row.name"></td>'
      : '';
    const selectionOutput = selectionEnabled
      ? ' (selectionChange)="onSelectionChange($event)"'
      : '';
    const nameSort = sortEnabled ? ' sortKey="name"' : '';
    const roleSort = sortEnabled ? ' sortKey="role"' : '';
    const statusSort = sortEnabled ? ' sortKey="status"' : '';
    const rowSource = sortEnabled ? 'table.sortedData()' : 'rows';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<table kuiTable [data]="rows"${sizeAttr} #table="kuiTable"${selectionOutput}>
  <thead>
    <tr kuiThGroup>${selectHeader}
      <th kuiTh${nameSort}>Name</th>
      <th kuiTh${roleSort}>Role</th>
      <th kuiTh${statusSort}>Status</th>
    </tr>
  </thead>
  <tbody>
    @for (row of ${rowSource}; track row.id) {
      <tr kuiRow [value]="row">${selectCell}
        <td kuiCell>{{ row.name }}</td>
        <td kuiCell>{{ row.role }}</td>
        <td kuiCell>{{ row.status }}</td>
      </tr>
    }
  </tbody>
</table>`,
      },
    ];
  };
}
