import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const DONUT_CHART_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const DONUT_CHART_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const DONUT_CHART_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'donut-chart.ts',
    language: 'ts',
    code: `import { KuiDonutChart } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
