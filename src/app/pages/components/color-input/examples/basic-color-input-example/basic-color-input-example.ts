import { Component } from '@angular/core';

import { KuiColorInput, KuiField } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-color-input-example',
  imports: [KuiColorInput, KuiField],
  templateUrl: './basic-color-input-example.html',
  styleUrl: './basic-color-input-example.scss',
})
export class BasicColorInputExample {}
