import { Component, input } from '@angular/core';

import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';

import { DOCS_EXTERNAL_LINKS } from '@core/navigation';

@Component({
  selector: 'app-draft-state',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
  ],
  templateUrl: './draft-state.html',
  styleUrl: './draft-state.scss',
})
export class DraftState {
  /** Primary empty-state heading. */
  public readonly stateTitle = input.required<string>();
  /** Explanation of the draft or unavailable documentation state. */
  public readonly description = input.required<string>();

  protected readonly links = DOCS_EXTERNAL_LINKS;
}
