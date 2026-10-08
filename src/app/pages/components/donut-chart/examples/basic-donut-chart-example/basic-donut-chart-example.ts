import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-donut-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './basic-donut-chart-example.html',
  styleUrl: './basic-donut-chart-example.scss',
})
export class BasicDonutChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
