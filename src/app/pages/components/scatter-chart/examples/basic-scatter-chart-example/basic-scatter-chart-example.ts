import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartScatterSeries,
  KuiScatterChart,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-scatter-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './basic-scatter-chart-example.html',
  styleUrl: './basic-scatter-chart-example.scss',
})
export class BasicScatterChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'free',
      name: 'Free plan',
      points: [
        { x: 22, y: 32000 },
        { x: 29, y: 41000 },
        { x: 35, y: 52000 },
        { x: 41, y: 61000 },
      ],
    },
    {
      id: 'pro',
      name: 'Pro plan',
      points: [
        { x: 26, y: 48000 },
        { x: 33, y: 67000 },
        { x: 44, y: 82000 },
        { x: 52, y: 95000 },
      ],
    },
  ];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Age', yTitle: 'Income (USD)' };
}
