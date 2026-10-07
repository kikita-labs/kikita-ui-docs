import { type Signal } from '@angular/core';

export interface PlaygroundEventLogEntry {
  readonly id: number;
  readonly name: string;
  readonly detail: string;
}

/** Signal-backed log of the outputs a playground preview emits. */
export interface PlaygroundEventLog {
  readonly entries: Signal<readonly PlaygroundEventLogEntry[]>;
  /** Appends an event; the newest entry is first and the oldest entries drop past the limit. */
  readonly log: (name: string, detail?: unknown) => void;
  readonly clear: () => void;
}
