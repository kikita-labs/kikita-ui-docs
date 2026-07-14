import { Component, signal } from '@angular/core';

import { KuiCalendarComponent, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-example',
  imports: [KuiCalendarComponent],
  templateUrl: './basic-calendar-example.html',
  styleUrl: './basic-calendar-example.scss',
})
export class BasicCalendarExample {
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly sprintRange = signal<KuiDateRange>({
    start: new Date(2026, 6, 13),
    end: new Date(2026, 6, 17),
  });
  protected readonly minDate = new Date(2026, 6, 1);
}
