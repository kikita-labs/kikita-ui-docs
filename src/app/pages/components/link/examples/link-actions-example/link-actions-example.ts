import { Component, signal } from '@angular/core';

import { KuiLink } from '@kikita-labs/ui';

@Component({
  selector: 'app-link-actions-example',
  imports: [KuiLink],
  templateUrl: './link-actions-example.html',
  styleUrl: './link-actions-example.scss',
})
export class LinkActionsExample {
  protected readonly copied = signal(0);

  protected copy(): void {
    this.copied.update((count) => count + 1);
  }
}
