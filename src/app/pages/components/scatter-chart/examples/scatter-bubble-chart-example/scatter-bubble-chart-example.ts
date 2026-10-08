import { Component } from '@angular/core';

import { type KuiChartScatterSeries, KuiScatterChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-scatter-bubble-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './scatter-bubble-chart-example.html',
  styleUrl: './scatter-bubble-chart-example.scss',
})
export class ScatterBubbleChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'accounts',
      name: 'Accounts',
      points: [
        { x: 22, y: 32000, r: 6 },
        { x: 29, y: 41000, r: 9 },
        { x: 35, y: 52000, r: 7 },
        { x: 41, y: 61000, r: 14 },
      ],
    },
  ];
}
