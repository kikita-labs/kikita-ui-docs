import { Component } from '@angular/core';

import { type KuiChartCartesianSeries, KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-states-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-states-chart-example.html',
  styleUrl: './line-states-chart-example.scss',
})
export class LineStatesChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
