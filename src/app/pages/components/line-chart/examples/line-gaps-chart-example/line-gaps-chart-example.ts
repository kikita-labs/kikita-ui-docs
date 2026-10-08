import { Component } from '@angular/core';

import { type KuiChartCartesianSeries, type KuiChartPoint, KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-gaps-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-gaps-chart-example.html',
  styleUrl: './line-gaps-chart-example.scss',
})
export class LineGapsChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, null, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  protected readonly formatValue = (value: number): string => value.toLocaleString('en-US');

  protected readonly formatTooltip = (point: KuiChartPoint): string =>
    `${point.categoryLabel}: ${point.value.toLocaleString('en-US')} sessions`;
}
