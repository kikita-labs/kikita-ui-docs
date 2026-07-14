import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-vertical-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './vertical-tabs-example.html',
  styleUrl: './vertical-tabs-example.scss',
})
export class VerticalTabsExample {
  protected readonly activeTab = signal('profile');
}
