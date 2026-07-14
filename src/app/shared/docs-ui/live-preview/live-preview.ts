import { Component, input } from '@angular/core';

import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-live-preview',
  imports: [KuiCardDirective],
  templateUrl: './live-preview.html',
  styleUrl: './live-preview.scss',
})
export class LivePreview {
  /** Accessible name for the preview region. */
  public readonly previewLabel = input.required<string>();
  /** Optional accessible description for the preview region. */
  public readonly description = input<string>();
}
