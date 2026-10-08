import { Component } from '@angular/core';

import { type KuiChartCartesianSeries, KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-line-chart-example',
  imports: [KuiLineChart],
  templateUrl: './basic-line-chart-example.html',
  styleUrl: './basic-line-chart-example.scss',
})
export class BasicLineChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
