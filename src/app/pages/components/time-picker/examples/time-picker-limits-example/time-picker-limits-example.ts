import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-limits-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './time-picker-limits-example.html',
  styleUrl: './time-picker-limits-example.scss',
})
export class TimePickerLimitsExample {
  protected readonly time = signal<Date | null>(null);
  protected readonly minTime = new Date(2026, 0, 1, 9, 0);
  protected readonly maxTime = new Date(2026, 0, 1, 18, 0);
  protected readonly disabledHours = (): readonly number[] => [12, 13];
  protected readonly disabledMinutes = (hour: number): readonly number[] =>
    hour === 17 ? [30, 45] : [];
}
