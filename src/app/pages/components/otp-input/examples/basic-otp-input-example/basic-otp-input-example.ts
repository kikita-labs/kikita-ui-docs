import { Component, signal } from '@angular/core';

import { KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-otp-input-example',
  imports: [KuiOtpInput],
  templateUrl: './basic-otp-input-example.html',
  styleUrl: './basic-otp-input-example.scss',
})
export class BasicOtpInputExample {
  protected readonly code = signal('');
  protected readonly verified = signal('');

  protected verify(code: string): void {
    this.verified.set(code);
  }
}
