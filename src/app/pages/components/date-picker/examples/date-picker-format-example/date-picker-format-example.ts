import { Component, signal } from '@angular/core';

import { KuiCalendar, KuiDatePicker, KuiDropdown, KuiField } from '@kikita-labs/ui';

@Component({
  selector: 'app-date-picker-format-example',
  imports: [KuiCalendar, KuiDatePicker, KuiDropdown, KuiField],
  templateUrl: './date-picker-format-example.html',
  styleUrl: './date-picker-format-example.scss',
})
export class DatePickerFormatExample {
  protected readonly localeDate = signal<Date | null>(new Date(2026, 9, 3));
  protected readonly pinnedDate = signal<Date | null>(new Date(2026, 9, 3));
}
