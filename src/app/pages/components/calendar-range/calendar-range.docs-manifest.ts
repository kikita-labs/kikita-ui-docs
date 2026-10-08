import type { DocsComponentManifest } from '@core/docs-registry';

export const CALENDAR_RANGE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'calendar-range',
  label: 'Calendar Range',
  category: 'forms',
  description: 'Inline month grid for selecting a start and end date.',
  importName: 'KuiCalendarRange',
  status: 'available',
  exampleIds: [
    'basic-calendar-range-example',
    'calendar-range-states-example',
    'calendar-range-linked-example',
    'calendar-range-locale-example',
    'calendar-range-footer-example',
  ],
  loadPage: () => import('./calendar-range-page').then((module) => module.CalendarRangePage),
  loadPlayground: () =>
    import('./playground/calendar-range-playground-page').then(
      (module) => module.CalendarRangePlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
