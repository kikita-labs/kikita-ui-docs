import { Component } from '@angular/core';

import { KuiField, KuiFieldAffix, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldAffix, KuiField, KuiInput],
  templateUrl: './input-group-example.html',
  styleUrl: './input-group-example.scss',
})
export class InputGroupExample {}
