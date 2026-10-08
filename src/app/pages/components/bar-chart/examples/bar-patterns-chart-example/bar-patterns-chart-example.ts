import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-patterns-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-patterns-chart-example.html',
  styleUrl: './bar-patterns-chart-example.scss',
})
export class BarPatternsChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
