import { Component, input } from '@angular/core';
import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-page-header',
  imports: [KuiBadgeDirective],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly status = input<string>();
}
