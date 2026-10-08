import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const SCATTER_CHART_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const SCATTER_CHART_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const SCATTER_CHART_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'scatter-chart.ts',
    language: 'ts',
    code: `import { KuiScatterChart } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
