import { Component } from '@angular/core';

import { KuiCell, KuiRow, KuiTable, KuiTh, KuiThGroup } from '@kikita-labs/ui';

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
  imports: [KuiCell, KuiRow, KuiTable, KuiTh, KuiThGroup],
  templateUrl: './basic-sortable-table-example.html',
  styleUrl: './basic-sortable-table-example.scss',
})
export class BasicSortableTableExample {
  protected readonly rows = TEAM_MEMBERS;
}
