import { Component, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-states-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-states-example.html',
  styleUrl: './calendar-range-states-example.scss',
})
export class CalendarRangeStatesExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>(null);
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly holidays = [new Date(2026, 6, 15), new Date(2026, 6, 20)];

  protected readonly isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;
}
