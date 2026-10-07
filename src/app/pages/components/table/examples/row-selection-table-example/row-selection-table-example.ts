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
  imports: [KuiCell, KuiRow, KuiSelectCell, KuiSelectTh, KuiTable, KuiTh, KuiThGroup],
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
