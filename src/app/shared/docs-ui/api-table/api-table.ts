import { Component, input } from '@angular/core';
import { ApiTableRow } from './api-table-row';

@Component({
  selector: 'app-api-table',
  imports: [],
  templateUrl: './api-table.html',
  styleUrl: './api-table.scss',
})
export class ApiTable {
  readonly label = input('API reference');
  readonly rows = input.required<readonly ApiTableRow[]>();
}
