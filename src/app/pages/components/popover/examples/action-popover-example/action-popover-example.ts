import { Component, signal } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-action-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './action-popover-example.html',
})
export class ActionPopoverExample {
  protected readonly deleted = signal(false);

  protected delete(): void {
    this.deleted.set(true);
  }
}
