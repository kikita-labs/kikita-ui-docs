import { Component, signal } from '@angular/core';

import { KuiCalendar } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-example',
  imports: [KuiCalendar],
  templateUrl: './basic-calendar-example.html',
  styleUrl: './basic-calendar-example.scss',
})
export class BasicCalendarExample {
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly minDate = new Date(2026, 6, 1);
}
