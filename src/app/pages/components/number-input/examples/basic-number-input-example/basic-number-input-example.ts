import { Component } from '@angular/core';

import { KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-number-input-example',
  imports: [KuiNumberInputDirective],
  templateUrl: './basic-number-input-example.html',
  styleUrl: './basic-number-input-example.scss',
})
export class BasicNumberInputExample {}
