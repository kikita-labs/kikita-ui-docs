import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-patterns-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-patterns-chart-example.html',
  styleUrl: './donut-patterns-chart-example.scss',
})
export class DonutPatternsChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
