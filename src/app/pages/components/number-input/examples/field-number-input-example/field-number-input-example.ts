import { Component } from '@angular/core';
import { KuiFieldComponent, KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-number-input-example',
  imports: [KuiFieldComponent, KuiNumberInputDirective],
  templateUrl: './field-number-input-example.html',
  styleUrl: './field-number-input-example.scss',
})
export class FieldNumberInputExample {}
