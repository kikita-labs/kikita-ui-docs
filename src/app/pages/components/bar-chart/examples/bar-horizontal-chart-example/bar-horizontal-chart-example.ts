import { Component } from '@angular/core';

import {
  KuiBarChart,
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-horizontal-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-horizontal-chart-example.html',
  styleUrl: './bar-horizontal-chart-example.scss',
})
export class BarHorizontalChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Plan', yTitle: 'MRR (USD)' };
}
