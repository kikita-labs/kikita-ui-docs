import { Component } from '@angular/core';

import {
  KuiFieldAffixDirective,
  KuiFieldComponent,
  KuiInputDirective,
  KuiInputGroupDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldAffixDirective, KuiFieldComponent, KuiInputDirective, KuiInputGroupDirective],
  templateUrl: './input-group-example.html',
  styleUrl: './input-group-example.scss',
})
export class InputGroupExample {}
