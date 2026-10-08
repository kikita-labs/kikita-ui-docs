import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-sizes-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-sizes-chart-example.html',
  styleUrl: './donut-sizes-chart-example.scss',
})
export class DonutSizesChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
