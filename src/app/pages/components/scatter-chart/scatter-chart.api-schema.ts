import { type ApiTableRow } from '@shared/docs-ui/api-table';
import {
  CHART_AXES_API_ROW,
  CHART_LEGEND_API_ROWS,
  chartSharedApiRows,
} from '@shared/docs-ui/chart-sections';

export const SCATTER_CHART_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'series',
    type: 'readonly KuiChartScatterSeries[]',
    defaultValue: '-',
    description:
      'Required. { id?, name, color?, points: { x, y, r? }[] }. A point with a non-finite x, y or r is dropped. Without a point the empty composition renders.',
  },
  {
    name: 'bubble',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Reads r from each point as the radius in CSS pixels. It is not clamped; the consumer owns a radius that fits the plot.',
  },
  CHART_AXES_API_ROW,
  ...chartSharedApiRows('Scatter chart'),
  ...CHART_LEGEND_API_ROWS,
];
