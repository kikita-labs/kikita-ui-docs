import type { DocsVersionStatus } from '@core/versions';

/** Statuses without an entry (the latest version) show no banner. */
export const VERSION_BANNER_MESSAGES: Readonly<Partial<Record<DocsVersionStatus, string>>> = {
  maintained: 'You are viewing documentation for an older version.',
  unmaintained: 'You are viewing documentation for a version that is no longer maintained.',
  unreleased: 'You are viewing documentation for an unreleased version.',
};
