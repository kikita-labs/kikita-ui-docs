import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-variants-example',
  imports: [KuiPagination],
  templateUrl: './pagination-variants-example.html',
  styleUrl: './pagination-variants-example.scss',
})
export class PaginationVariantsExample {
  protected readonly page = signal(2);
  protected readonly pageSize = signal(25);
}
