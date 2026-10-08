import { Component, signal } from '@angular/core';

import { KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-inline-example',
  imports: [KuiTimePickerPanel],
  templateUrl: './time-picker-inline-example.html',
  styleUrl: './time-picker-inline-example.scss',
})
export class TimePickerInlineExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 8, 5, 0));
}
