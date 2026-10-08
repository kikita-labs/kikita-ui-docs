import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-window-example',
  imports: [KuiPagination],
  templateUrl: './pagination-window-example.html',
  styleUrl: './pagination-window-example.scss',
})
export class PaginationWindowExample {
  protected readonly page = signal(20);
}
