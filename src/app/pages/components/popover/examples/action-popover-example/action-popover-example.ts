import { Component, signal } from '@angular/core';

import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-action-popover-example',
  imports: [KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective],
  templateUrl: './action-popover-example.html',
})
export class ActionPopoverExample {
  protected readonly deleted = signal(false);

  protected delete(): void {
    this.deleted.set(true);
  }
}
