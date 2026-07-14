import { Component } from '@angular/core';

import { KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-field-example',
  imports: [KuiFieldComponent, KuiInputDirective],
  templateUrl: './basic-field-example.html',
  styleUrl: './basic-field-example.scss',
})
export class BasicFieldExample {}
