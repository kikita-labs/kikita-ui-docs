import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-states-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-states-chart-example.html',
  styleUrl: './donut-states-chart-example.scss',
})
export class DonutStatesChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
  ];
}
