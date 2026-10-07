import type { DocsComponentManifest } from '@core/docs-registry';

export const CALENDAR_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'calendar',
  label: 'Calendar',
  category: 'forms',
  description: 'Date grid.',
  importName: 'KuiCalendar',
  status: 'available',
  exampleIds: ['basic-calendar-example', 'calendar-states-example', 'calendar-locale-example'],
  loadPage: () => import('./calendar-page').then((module) => module.CalendarPage),
  loadPlayground: () =>
    import('./playground/calendar-playground-page').then((module) => module.CalendarPlaygroundPage),
} as const satisfies DocsComponentManifest;
