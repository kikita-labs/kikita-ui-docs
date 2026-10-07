import { Component, input } from '@angular/core';

import { KuiCell, KuiRow, KuiTable, KuiTh, KuiThGroup } from '@kikita-labs/ui';

import { type ApiTableRow } from './interfaces';

@Component({
  selector: 'app-api-table',
  imports: [KuiCell, KuiRow, KuiTable, KuiTh, KuiThGroup],
  templateUrl: './api-table.html',
  styleUrl: './api-table.scss',
})
export class ApiTable {
  /** Accessible name for the keyboard-scrollable table region. */
  public readonly label = input('API reference');
  /** Immutable API rows displayed in source order. */
  public readonly rows = input.required<readonly ApiTableRow[]>();
}
