import { type ApiTableRow } from '../api-table';

/** Rows of the inputs every chart type shares, with the chart-specific accessible-name fallback. */
export function chartSharedApiRows(fallbackName: string): readonly ApiTableRow[] {
  return [
    {
      name: 'size',
      type: `'sm' | 'md' | 'lg' | undefined`,
      defaultValue: 'undefined',
      description:
        'Plot height of 200, 280 or 360px (a square of up to that size for the donut). Falls back to the chart defaults key, then md.',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows a skeleton placeholder shaped like the chart instead of the chart.',
    },
    {
      name: 'legend',
      type: 'boolean | undefined',
      defaultValue: 'undefined',
      description:
        'Shows the inline legend. Falls back to the chart defaults key, then true when there is more than one series or slice.',
    },
    {
      name: 'valueFormat',
      type: '(value: number) => string',
      defaultValue: 'compact notation',
      description:
        'Axis tick, default tooltip and legend number formatting. The default is the compact notation of the locale; the alt-table always shows exact values.',
    },
    {
      name: 'tooltip',
      type: '(point: KuiChartPoint) => string | undefined',
      defaultValue: 'built-in text',
      description: 'Overrides the default tooltip and point label text.',
    },
    {
      name: 'ariaLabel',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: `Accessible name of the chart as a whole. Falls back to the chart message for this type (${fallbackName}); prefer a content-specific name.`,
    },
    {
      name: 'messages',
      type: 'Partial<KuiChartMessages> | undefined',
      defaultValue: 'undefined',
      description:
        'Per-instance text overrides: names, role descriptions, loading and empty text, table headers and point text. They win over scoped and root messages.',
    },
  ];
}

/** The `axes` input row of the cartesian chart types. */
export const CHART_AXES_API_ROW: ApiTableRow = {
  name: 'axes',
  type: 'KuiChartAxesOptions',
  defaultValue: '{}',
  description:
    '{ x?, y?, gridLines?, xTitle?, yTitle? }: show or hide an axis, choose the grid lines and set the axis titles drawn in the SVG.',
};

/** Rows of the legend members every chart implements and of the standalone legend. */
export const CHART_LEGEND_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'legendItems() / hoveredLegendId()',
    type: 'KuiChartLegendSource',
    defaultValue: '-',
    description: 'Public read surface of the chart legend, used by kui-chart-legend.',
  },
  {
    name: 'toggleLegendItem(id) / setHoveredLegendId(id)',
    type: 'KuiChartLegendSource',
    defaultValue: '-',
    description: 'Hide or show a series or slice, and set the cross-highlighted legend item.',
  },
  {
    name: 'kui-chart-legend [chart]',
    type: 'KuiChartLegendSource',
    defaultValue: '-',
    description:
      'Renders the legend of any chart through a template reference variable. Project a kuiChartLegendItem template (KuiChartLegendItemContext) to replace the buttons.',
  },
  {
    name: 'KuiBarChartOptions / KuiLineChartOptions / KuiScatterChartOptions / KuiDonutChartOptions',
    type: 'interfaces',
    defaultValue: '-',
    description:
      'Shape of defaults.barChart, lineChart, scatterChart and donutChart: size and legend.',
  },
];
