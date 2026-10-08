import { type ApiTableRow } from '@shared/docs-ui/api-table';
import {
  CHART_AXES_API_ROW,
  CHART_LEGEND_API_ROWS,
  chartSharedApiRows,
} from '@shared/docs-ui/chart-sections';

export const BAR_CHART_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'series',
    type: 'readonly KuiChartCartesianSeries[]',
    defaultValue: '-',
    description:
      'Required. { id?, name, color?, data }, with data aligned index for index with categories. Without a non-gap value the empty composition renders.',
  },
  {
    name: 'categories',
    type: 'readonly string[]',
    defaultValue: '[]',
    description: 'Category labels aligned with each series data. The shorter side wins.',
  },
  {
    name: 'orientation',
    type: `'vertical' | 'horizontal'`,
    defaultValue: `'vertical'`,
    description: 'Flips the on-screen bar direction only; axes.x and axes.y stay semantic.',
  },
  {
    name: 'stacked',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Stacks the series within each category. Only meaningful with more than one series; positive and negative values stack separately. Hiding a series recomputes the domain.',
  },
  {
    name: 'patterns',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Fills each series with one of eight hatch patterns (colour independence).',
  },
  CHART_AXES_API_ROW,
  ...chartSharedApiRows('Bar chart'),
  ...CHART_LEGEND_API_ROWS,
];
