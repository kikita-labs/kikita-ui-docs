import { Component } from '@angular/core';

import { type KuiChartScatterSeries, KuiScatterChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-scatter-states-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './scatter-states-chart-example.html',
  styleUrl: './scatter-states-chart-example.scss',
})
export class ScatterStatesChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'accounts',
      name: 'Accounts',
      points: [
        { x: 22, y: 32000 },
        { x: 41, y: 61000 },
      ],
    },
  ];
}
