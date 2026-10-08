import type { DocsComponentManifest } from '@core/docs-registry';

export const LINE_CHART_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'line-chart',
  label: 'Line Chart',
  category: 'data-identity',
  description: 'Line and area chart for trends over categories.',
  importName: 'KuiLineChart',
  status: 'available',
  exampleIds: [
    'basic-line-chart-example',
    'line-area-chart-example',
    'line-gaps-chart-example',
    'line-external-legend-example',
    'line-states-chart-example',
  ],
  loadPage: () => import('./line-chart-page').then((module) => module.LineChartPage),
  loadPlayground: () =>
    import('./playground/line-chart-playground-page').then(
      (module) => module.LineChartPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
