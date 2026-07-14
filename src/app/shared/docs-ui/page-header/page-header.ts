import { Component, input } from '@angular/core';

import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-page-header',
  imports: [KuiBadgeDirective],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  /** Short category or section label rendered above the page heading. */
  public readonly eyebrow = input.required<string>();
  /** Page-level heading rendered as the component's single h1. */
  public readonly heading = input.required<string>();
  /** Concise page summary rendered below the heading. */
  public readonly description = input.required<string>();
  /** Optional lifecycle/status badge text. */
  public readonly status = input<string>();
}
