import { Component, signal } from '@angular/core';

import { KuiTab, KuiTabPanel, KuiTabs } from '@kikita-labs/ui';

@Component({
  selector: 'app-vertical-tabs-example',
  imports: [KuiTab, KuiTabPanel, KuiTabs],
  templateUrl: './vertical-tabs-example.html',
  styleUrl: './vertical-tabs-example.scss',
})
export class VerticalTabsExample {
  protected readonly activeTab = signal('profile');
}
