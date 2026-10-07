import { Component, input } from '@angular/core';

import { KuiButton } from '@kikita-labs/ui';

import { type PlaygroundEventLog } from '../interfaces';

@Component({
  selector: 'app-playground-event-log',
  imports: [KuiButton],
  templateUrl: './playground-event-log.html',
  styleUrl: './playground-event-log.scss',
})
export class PlaygroundEventLogView {
  /** The log the preview writes to; create it with `createPlaygroundEventLog()`. */
  public readonly log = input.required<PlaygroundEventLog>();
  /** Accessible name and visible caption of the log. */
  public readonly label = input('Event log');
}
