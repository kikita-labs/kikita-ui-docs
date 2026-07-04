import { Component, input } from '@angular/core';
import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-live-preview',
  imports: [KuiCardDirective],
  templateUrl: './live-preview.html',
  styleUrl: './live-preview.scss',
})
export class LivePreview {
  readonly title = input.required<string>();
  readonly description = input<string>();
}
