import { type ApiTableRow } from '@shared/docs-ui/api-table';
import {
  CHART_AXES_API_ROW,
  CHART_LEGEND_API_ROWS,
  chartSharedApiRows,
} from '@shared/docs-ui/chart-sections';

export const LINE_CHART_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'series',
    type: 'readonly KuiChartCartesianSeries[]',
    defaultValue: '-',
    description:
      'Required. { id?, name, color?, data }, with data aligned index for index with categories. null, NaN and Infinity are gaps. Without a non-gap value the empty composition renders.',
  },
  {
    name: 'categories',
    type: 'readonly string[]',
    defaultValue: '[]',
    description: 'Category labels aligned with each series data. The shorter side wins.',
  },
  {
    name: 'area',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Fills the area under each line. It is not a separate chart type.',
  },
  {
    name: 'patterns',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'With area, fills each area with one of eight hatch patterns (colour independence).',
  },
  CHART_AXES_API_ROW,
  ...chartSharedApiRows('Line chart'),
  ...CHART_LEGEND_API_ROWS,
];
