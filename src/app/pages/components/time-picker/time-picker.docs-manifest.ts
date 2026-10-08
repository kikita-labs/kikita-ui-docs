import type { DocsComponentManifest } from '@core/docs-registry';

export const TIME_PICKER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'time-picker',
  label: 'Time Picker',
  category: 'forms',
  description: 'Time-of-day input with a scrollable hour, minute and second panel.',
  importName: 'KuiTimePicker',
  status: 'available',
  exampleIds: [
    'basic-time-picker-example',
    'time-picker-format-example',
    'time-picker-limits-example',
    'time-picker-inline-example',
  ],
  loadPage: () => import('./time-picker-page').then((module) => module.TimePickerPage),
  loadPlayground: () =>
    import('./playground/time-picker-playground-page').then(
      (module) => module.TimePickerPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
