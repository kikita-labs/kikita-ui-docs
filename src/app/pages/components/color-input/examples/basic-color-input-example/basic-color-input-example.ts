import { Component } from '@angular/core';

import { KuiColorInputDirective, KuiFieldComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-color-input-example',
  imports: [KuiColorInputDirective, KuiFieldComponent],
  templateUrl: './basic-color-input-example.html',
  styleUrl: './basic-color-input-example.scss',
})
export class BasicColorInputExample {}
