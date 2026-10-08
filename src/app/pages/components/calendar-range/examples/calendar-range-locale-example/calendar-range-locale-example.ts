import { Component, signal } from '@angular/core';

import { type KuiCalendarMessages, KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-locale-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-locale-example.html',
  styleUrl: './calendar-range-locale-example.scss',
})
export class CalendarRangeLocaleExample {
  protected readonly viewDate = signal(new Date(2026, 9, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 9, 5),
    end: new Date(2026, 9, 9),
  });
  protected readonly messages: Partial<KuiCalendarMessages> = {
    label: 'Booking range',
    today: 'Jump to today',
  };
}
