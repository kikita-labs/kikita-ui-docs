import { Component } from '@angular/core';

import { KuiButtonDirective, kuiToast, type KuiToastAppearance } from '@kikita-labs/ui';

interface ToastTrigger {
  readonly label: string;
  readonly appearance: KuiToastAppearance;
}

@Component({
  selector: 'app-basic-toast-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-toast-example.html',
  styleUrl: './basic-toast-example.scss',
})
export class BasicToastExample {
  private readonly toast = kuiToast();

  protected readonly triggers: readonly ToastTrigger[] = [
    { label: 'Neutral', appearance: 'neutral' },
    { label: 'Success', appearance: 'success' },
    { label: 'Warning', appearance: 'warning' },
    { label: 'Danger', appearance: 'danger' },
    { label: 'Info', appearance: 'info' },
  ];

  protected show(appearance: KuiToastAppearance): void {
    this.toast.open({
      title: this.titleFor(appearance),
      message: this.messageFor(appearance),
      appearance,
      persistent: appearance === 'danger',
    });
  }

  private titleFor(appearance: KuiToastAppearance): string {
    switch (appearance) {
      case 'success':
        return 'Saved';
      case 'danger':
        return 'Failed to save';
      case 'warning':
        return 'Check your input';
      case 'info':
        return 'Heads up';
      default:
        return 'Notification';
    }
  }

  private messageFor(appearance: KuiToastAppearance): string {
    switch (appearance) {
      case 'success':
        return 'Your changes have been saved.';
      case 'danger':
        return 'Check your connection and try again.';
      case 'warning':
        return 'Some fields still need your attention.';
      case 'info':
        return 'A new version is available.';
      default:
        return 'Something happened.';
    }
  }
}
