import { Component, signal } from '@angular/core';

import { KuiCalendar } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-states-example',
  imports: [KuiCalendar],
  templateUrl: './calendar-states-example.html',
  styleUrl: './calendar-states-example.scss',
})
export class CalendarStatesExample {
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly holidays = [new Date(2026, 6, 15), new Date(2026, 6, 20)];

  protected readonly isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;
}
