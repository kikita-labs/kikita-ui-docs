import { Component } from '@angular/core';

import { KuiError, KuiField, KuiHint, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-projected-example',
  imports: [KuiError, KuiField, KuiHint, KuiInput],
  templateUrl: './field-projected-example.html',
  styleUrl: './field-projected-example.scss',
})
export class FieldProjectedExample {}
