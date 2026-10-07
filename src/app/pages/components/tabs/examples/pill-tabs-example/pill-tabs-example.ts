import { Component, signal } from '@angular/core';

import { KuiTab, KuiTabPanel, KuiTabs } from '@kikita-labs/ui';

@Component({
  selector: 'app-pill-tabs-example',
  imports: [KuiTab, KuiTabPanel, KuiTabs],
  templateUrl: './pill-tabs-example.html',
  styleUrl: './pill-tabs-example.scss',
})
export class PillTabsExample {
  protected readonly activeTab = signal('daily');
}
