import { Component, signal } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-splitter-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './basic-splitter-example.html',
  styleUrl: './basic-splitter-example.scss',
})
export class BasicSplitterExample {
  protected readonly sizes = signal<readonly number[]>([30, 70]);

  protected onResize(sizes: readonly number[]): void {
    this.sizes.set(sizes);
  }
}
