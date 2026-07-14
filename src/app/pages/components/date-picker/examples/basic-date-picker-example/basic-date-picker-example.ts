import { Component, signal } from '@angular/core';

import {
  KuiCalendarComponent,
  KuiDatePickerDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-date-picker-example',
  imports: [
    KuiCalendarComponent,
    KuiDatePickerDirective,
    KuiDropdownComponent,
    KuiFieldComponent,
  ],
  templateUrl: './basic-date-picker-example.html',
  styleUrl: './basic-date-picker-example.scss',
})
export class BasicDatePickerExample {
  protected readonly meetingDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly minDate = new Date(2026, 6, 1);
}
