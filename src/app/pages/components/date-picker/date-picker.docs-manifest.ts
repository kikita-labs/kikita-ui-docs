import type { DocsComponentManifest } from '@core/docs-registry';

export const DATE_PICKER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'date-picker',
  label: 'Date Picker',
  category: 'forms',
  description: 'Calendar date input.',
  importName: 'KuiDatePickerDirective',
  status: 'available',
  exampleIds: ['basic-date-picker-example'],
  loadPage: () => import('./date-picker-page').then((module) => module.DatePickerPage),
  loadPlayground: () =>
    import('./playground/date-picker-playground-page').then(
      (module) => module.DatePickerPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
