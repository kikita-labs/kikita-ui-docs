import { Component, signal } from '@angular/core';

import {
  KuiCell,
  KuiRow,
  KuiSelectCell,
  KuiSelectTh,
  KuiTable,
  KuiTh,
  KuiThGroup,
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
  imports: [KuiCell, KuiRow, KuiSelectCell, KuiSelectTh, KuiTable, KuiTh, KuiThGroup],
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
