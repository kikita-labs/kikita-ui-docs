import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-time-picker-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './basic-time-picker-example.html',
  styleUrl: './basic-time-picker-example.scss',
})
export class BasicTimePickerExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 9, 30));
}
