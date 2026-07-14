import { Component, signal } from '@angular/core';

import { KuiChipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-interactive-chip-example',
  imports: [KuiChipDirective],
  templateUrl: './interactive-chip-example.html',
  styleUrl: './interactive-chip-example.scss',
})
export class InteractiveChipExample {
  protected readonly selected = signal<'all' | 'open' | 'closed'>('all');

  protected select(filter: 'all' | 'open' | 'closed'): void {
    this.selected.set(filter);
  }
}
