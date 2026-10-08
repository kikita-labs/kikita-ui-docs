import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-bar-chart-example',
  imports: [KuiBarChart],
  templateUrl: './basic-bar-chart-example.html',
  styleUrl: './basic-bar-chart-example.scss',
})
export class BasicBarChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
}
