import type { DocsComponentManifest } from '@core/docs-registry';

export const SCATTER_CHART_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'scatter-chart',
  label: 'Scatter Chart',
  category: 'data-identity',
  description: 'Scatter and bubble chart for two numeric measures.',
  importName: 'KuiScatterChart',
  status: 'available',
  exampleIds: [
    'basic-scatter-chart-example',
    'scatter-bubble-chart-example',
    'scatter-states-chart-example',
  ],
  loadPage: () => import('./scatter-chart-page').then((module) => module.ScatterChartPage),
  loadPlayground: () =>
    import('./playground/scatter-chart-playground-page').then(
      (module) => module.ScatterChartPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
