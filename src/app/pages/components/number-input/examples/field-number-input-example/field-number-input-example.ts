import { Component } from '@angular/core';

import { KuiField, KuiNumberInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-number-input-example',
  imports: [KuiField, KuiNumberInput],
  templateUrl: './field-number-input-example.html',
  styleUrl: './field-number-input-example.scss',
})
export class FieldNumberInputExample {}
