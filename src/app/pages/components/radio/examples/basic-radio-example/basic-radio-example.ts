import { Component, signal } from '@angular/core';
import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-radio-example',
  imports: [KuiFieldComponent, KuiRadioDirective],
  templateUrl: './basic-radio-example.html',
  styleUrl: './basic-radio-example.scss',
})
export class BasicRadioExample {
  protected readonly plan = signal('starter');
}
