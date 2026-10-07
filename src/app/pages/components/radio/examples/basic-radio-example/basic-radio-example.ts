import { Component, signal } from '@angular/core';

import { KuiField, KuiRadio } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-radio-example',
  imports: [KuiField, KuiRadio],
  templateUrl: './basic-radio-example.html',
  styleUrl: './basic-radio-example.scss',
})
export class BasicRadioExample {
  protected readonly plan = signal('starter');
}
