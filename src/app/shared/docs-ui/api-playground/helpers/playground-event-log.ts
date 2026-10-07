import { signal } from '@angular/core';

import { type PlaygroundEventLog, type PlaygroundEventLogEntry } from '../interfaces';

const DEFAULT_EVENT_LOG_LIMIT = 20;

/** Describes an emitted payload as one short line for the log. */
export function formatPlaygroundEventDetail(detail: unknown): string {
  if (detail === undefined) {
    return '';
  }

  if (typeof detail === 'string') {
    return detail;
  }

  if (detail instanceof Date) {
    return Number.isNaN(detail.getTime()) ? 'Invalid Date' : detail.toISOString();
  }

  try {
    return JSON.stringify(detail) ?? String(detail);
  } catch {
    return String(detail);
  }
}

export function createPlaygroundEventLog(limit = DEFAULT_EVENT_LOG_LIMIT): PlaygroundEventLog {
  const entries = signal<readonly PlaygroundEventLogEntry[]>([]);
  let nextId = 1;

  return {
    entries: entries.asReadonly(),
    log: (name, detail) => {
      const entry: PlaygroundEventLogEntry = {
        id: nextId++,
        name,
        detail: formatPlaygroundEventDetail(detail),
      };

      entries.update((current) => [entry, ...current].slice(0, limit));
    },
    clear: () => entries.set([]),
  };
}
