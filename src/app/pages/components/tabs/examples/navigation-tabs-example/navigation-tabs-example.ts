import { Component, signal } from '@angular/core';

import { KuiTab, KuiTabs } from '@kikita-labs/ui';

@Component({
  selector: 'app-navigation-tabs-example',
  imports: [KuiTab, KuiTabs],
  templateUrl: './navigation-tabs-example.html',
  styleUrl: './navigation-tabs-example.scss',
})
export class NavigationTabsExample {
  protected readonly currentSection = signal('/overview');
}
