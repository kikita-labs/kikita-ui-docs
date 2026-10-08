import { type ApiTableRow } from '@shared/docs-ui/api-table';
import { CHART_LEGEND_API_ROWS, chartSharedApiRows } from '@shared/docs-ui/chart-sections';

export const DONUT_CHART_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'slices',
    type: 'readonly KuiChartSlice[]',
    defaultValue: '-',
    description:
      'Required. { id?, label, value, color? }. Negative and non-finite values are dropped; a visible total of zero draws no arc.',
  },
  {
    name: 'patterns',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Fills each slice with one of eight hatch patterns (colour independence).',
  },
  ...chartSharedApiRows('Donut chart'),
  ...CHART_LEGEND_API_ROWS,
];
