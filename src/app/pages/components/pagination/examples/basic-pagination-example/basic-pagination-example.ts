import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-pagination-example',
  imports: [KuiPagination],
  templateUrl: './basic-pagination-example.html',
  styleUrl: './basic-pagination-example.scss',
})
export class BasicPaginationExample {
  protected readonly page = signal(3);
}
