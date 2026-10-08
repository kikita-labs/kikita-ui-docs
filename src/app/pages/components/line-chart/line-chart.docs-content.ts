import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const LINE_CHART_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const LINE_CHART_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const LINE_CHART_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'line-chart.ts',
    language: 'ts',
    code: `import { KuiLineChart } from '@kikita-labs/ui';

// Optional external legend:
import { KuiChartLegend } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
