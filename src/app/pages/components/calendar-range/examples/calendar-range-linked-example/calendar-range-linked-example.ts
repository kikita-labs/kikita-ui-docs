import { Component, computed, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-linked-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-linked-example.html',
  styleUrl: './calendar-range-linked-example.scss',
})
export class CalendarRangeLinkedExample {
  protected readonly range = signal<KuiDateRange | null>(null);
  protected readonly leftView = signal(new Date(2026, 6, 1));
  protected readonly rightView = computed(
    () => new Date(this.leftView().getFullYear(), this.leftView().getMonth() + 1, 1),
  );

  protected showFromRight(view: Date): void {
    this.leftView.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }
}
