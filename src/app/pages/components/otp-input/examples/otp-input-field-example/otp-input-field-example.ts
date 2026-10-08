import { Component, computed, signal } from '@angular/core';

import { KuiButton, KuiField, KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-otp-input-field-example',
  imports: [KuiButton, KuiField, KuiOtpInput],
  templateUrl: './otp-input-field-example.html',
  styleUrl: './otp-input-field-example.scss',
})
export class OtpInputFieldExample {
  protected readonly code = signal('');
  protected readonly verifying = signal(false);
  protected readonly wrong = computed(() => this.code().length === 6 && this.code() !== '123456');

  protected toggleVerifying(): void {
    this.verifying.update((value) => !value);
  }
}
