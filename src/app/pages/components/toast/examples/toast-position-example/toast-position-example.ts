import { Component } from '@angular/core';

import { KuiButtonDirective, kuiToast, type KuiToastPosition } from '@kikita-labs/ui';

@Component({
  selector: 'app-toast-position-example',
  imports: [KuiButtonDirective],
  templateUrl: './toast-position-example.html',
  styleUrl: './toast-position-example.scss',
})
export class ToastPositionExample {
  private readonly toast = kuiToast();

  protected readonly positions: readonly KuiToastPosition[] = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ];

  protected show(position: KuiToastPosition): void {
    this.toast.setPosition(position);
    this.toast.open({
      title: position,
      message: 'This toast opened at the selected position.',
    });
  }
}
