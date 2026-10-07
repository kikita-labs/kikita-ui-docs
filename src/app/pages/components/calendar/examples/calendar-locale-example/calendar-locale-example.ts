import { Component, signal } from '@angular/core';

import { KuiCalendar, type KuiCalendarMessages } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-locale-example',
  imports: [KuiCalendar],
  templateUrl: './calendar-locale-example.html',
  styleUrl: './calendar-locale-example.scss',
})
export class CalendarLocaleExample {
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 9, 3));
  protected readonly messages: Partial<KuiCalendarMessages> = {
    label: 'Booking calendar',
    today: 'Jump to today',
  };
}
