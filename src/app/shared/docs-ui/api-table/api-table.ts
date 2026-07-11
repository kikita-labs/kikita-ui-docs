import { Component, input } from '@angular/core';
import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';
import { ApiTableRow } from './api-table-row';

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
  readonly label = input('API reference');
  readonly rows = input.required<readonly ApiTableRow[]>();
}
