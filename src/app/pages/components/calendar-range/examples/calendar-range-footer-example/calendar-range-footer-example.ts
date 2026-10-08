import { Component, signal } from '@angular/core';

import { KuiButton, KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-footer-example',
  imports: [KuiButton, KuiCalendarRange],
  templateUrl: './calendar-range-footer-example.html',
  styleUrl: './calendar-range-footer-example.scss',
})
export class CalendarRangeFooterExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 6, 6),
    end: new Date(2026, 6, 10),
  });

  protected clear(): void {
    this.range.set(null);
  }
}
