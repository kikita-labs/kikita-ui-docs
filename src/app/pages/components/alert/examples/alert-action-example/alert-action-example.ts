import { Component, signal } from '@angular/core';

import { KuiAlert, KuiButton } from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-action-example',
  imports: [KuiAlert, KuiButton],
  templateUrl: './alert-action-example.html',
  styleUrl: './alert-action-example.scss',
})
export class AlertActionExample {
  protected readonly dismissed = signal(false);
  protected readonly renewals = signal(0);

  protected renew(): void {
    this.renewals.update((count) => count + 1);
  }

  protected restore(): void {
    this.dismissed.set(false);
  }
}
