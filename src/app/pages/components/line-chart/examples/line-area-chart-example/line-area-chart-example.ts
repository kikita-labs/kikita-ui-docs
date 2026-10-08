import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
  KuiLineChart,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-line-area-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-area-chart-example.html',
  styleUrl: './line-area-chart-example.scss',
})
export class LineAreaChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Day', yTitle: 'Count' };
}
