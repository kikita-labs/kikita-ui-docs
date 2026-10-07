import { Component, signal } from '@angular/core';

import { KuiTab, KuiTabPanel, KuiTabs } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tabs-example',
  imports: [KuiTab, KuiTabPanel, KuiTabs],
  templateUrl: './basic-tabs-example.html',
  styleUrl: './basic-tabs-example.scss',
})
export class BasicTabsExample {
  protected readonly activeTab = signal('overview');
}
