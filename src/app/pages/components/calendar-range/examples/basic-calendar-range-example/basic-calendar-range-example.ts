import { Component, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-range-example',
  imports: [KuiCalendarRange],
  templateUrl: './basic-calendar-range-example.html',
  styleUrl: './basic-calendar-range-example.scss',
})
export class BasicCalendarRangeExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 6, 6),
    end: new Date(2026, 6, 14),
  });
}
