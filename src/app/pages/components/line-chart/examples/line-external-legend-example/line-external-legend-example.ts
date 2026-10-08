import { Component } from '@angular/core';

import { type KuiChartCartesianSeries, KuiChartLegend, KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-external-legend-example',
  imports: [KuiChartLegend, KuiLineChart],
  templateUrl: './line-external-legend-example.html',
  styleUrl: './line-external-legend-example.scss',
})
export class LineExternalLegendExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
