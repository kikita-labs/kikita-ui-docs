import { Component, signal } from '@angular/core';

import { KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-otp-input-variants-example',
  imports: [KuiOtpInput],
  templateUrl: './otp-input-variants-example.html',
  styleUrl: './otp-input-variants-example.scss',
})
export class OtpInputVariantsExample {
  protected readonly pin = signal('');
  protected readonly backupCode = signal('');
}
