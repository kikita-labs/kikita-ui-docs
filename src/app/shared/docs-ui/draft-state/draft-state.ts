import { Component, input } from '@angular/core';
import { KuiBadgeDirective, KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-draft-state',
  imports: [KuiBadgeDirective, KuiCardDirective],
  templateUrl: './draft-state.html',
  styleUrl: './draft-state.scss',
})
export class DraftState {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
