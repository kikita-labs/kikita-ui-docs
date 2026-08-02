import { Component } from '@angular/core';

import { KuiFieldAffixDirective, KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldAffixDirective, KuiFieldComponent, KuiInputDirective],
  templateUrl: './input-group-example.html',
  styleUrl: './input-group-example.scss',
})
export class InputGroupExample {}
