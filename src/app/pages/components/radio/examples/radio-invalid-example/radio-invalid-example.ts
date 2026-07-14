import { Component } from '@angular/core';

import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-radio-invalid-example',
  imports: [KuiFieldComponent, KuiRadioDirective],
  templateUrl: './radio-invalid-example.html',
  styleUrl: './radio-invalid-example.scss',
})
export class RadioInvalidExample {}
