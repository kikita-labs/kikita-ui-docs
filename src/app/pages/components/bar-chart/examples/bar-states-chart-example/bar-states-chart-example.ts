import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-states-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-states-chart-example.html',
  styleUrl: './bar-states-chart-example.scss',
})
export class BarStatesChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
}
