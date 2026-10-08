import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-format-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './time-picker-format-example.html',
  styleUrl: './time-picker-format-example.scss',
})
export class TimePickerFormatExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 14, 45, 15));
}
