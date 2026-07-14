import { Component, input } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

import { type ApiTableRow } from './api-table-row';

@Component({
  selector: 'app-api-table',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './api-table.html',
  styleUrl: './api-table.scss',
})
export class ApiTable {
  /** Accessible name for the keyboard-scrollable table region. */
  public readonly label = input('API reference');
  /** Immutable API rows displayed in source order. */
  public readonly rows = input.required<readonly ApiTableRow[]>();
}
