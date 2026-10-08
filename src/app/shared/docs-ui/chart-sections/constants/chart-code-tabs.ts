import { type CodeTab } from '@shared/docs-ui/code-tabs';

/** Code shown in the standalone legend part of the behavior sections. */
export const CHART_LEGEND_TABS: readonly CodeTab[] = [
  {
    label: 'External legend',
    filename: 'dashboard.html',
    language: 'html',
    code: `<kui-line-chart
  #chartRef
  ariaLabel="Sessions per day"
  [series]="series"
  [categories]="categories"
  [legend]="false"
/>
<kui-chart-legend [chart]="chartRef" />`,
  },
  {
    label: 'Custom item',
    filename: 'dashboard.html',
    language: 'html',
    code: `<kui-chart-legend [chart]="chartRef">
  <ng-template kuiChartLegendItem let-item let-hovered="hovered">
    <button
      type="button"
      [class.active]="hovered"
      (click)="chartRef.toggleLegendItem(item.id)"
      (pointerenter)="chartRef.setHoveredLegendId(item.id)"
      (pointerleave)="chartRef.setHoveredLegendId(null)"
    >
      {{ item.label }}
    </button>
  </ng-template>
</kui-chart-legend>`,
  },
];

/** Code shown in the tooltip and value formatting part of the behavior sections. */
export const CHART_TOOLTIP_TABS: readonly CodeTab[] = [
  {
    label: 'Tooltip text',
    filename: 'chart.ts',
    language: 'ts',
    code: `protected formatTooltip(point: KuiChartPoint): string {
  return \`\${point.categoryLabel}: $\${point.value.toLocaleString('en-US')}\`;
}`,
  },
  {
    label: 'Template',
    filename: 'chart.html',
    language: 'html',
    code: `<kui-line-chart
  ariaLabel="Revenue"
  [series]="series"
  [categories]="categories"
  [tooltip]="formatTooltip"
/>`,
  },
];
