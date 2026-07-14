import { Component } from '@angular/core';

import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-icon-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './basic-icon-example.html',
  styleUrl: './basic-icon-example.scss',
})
export class BasicIconExample {
  protected readonly checkIcon =
    '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  protected readonly sparkIcon =
    '<svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.4 4 4.1 1.5-4.1 1.5-1.4 4-1.4-4L2.5 7l4.1-1.5L8 1.5z" stroke="currentColor" stroke-linejoin="round"/></svg>';
}
