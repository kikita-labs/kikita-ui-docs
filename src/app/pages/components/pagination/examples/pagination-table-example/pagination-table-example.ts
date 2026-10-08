import { Component, computed, signal } from '@angular/core';

import { KuiCell, KuiPagination, KuiRow, KuiTable, KuiTh } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-table-example',
  imports: [KuiCell, KuiPagination, KuiRow, KuiTable, KuiTh],
  templateUrl: './pagination-table-example.html',
  styleUrl: './pagination-table-example.scss',
})
export class PaginationTableExample {
  protected readonly allRows = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    name: `Project ${index + 1}`,
  }));
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.allRows.length / this.pageSize())),
  );
  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();

    return this.allRows.slice(start, start + this.pageSize());
  });
}
