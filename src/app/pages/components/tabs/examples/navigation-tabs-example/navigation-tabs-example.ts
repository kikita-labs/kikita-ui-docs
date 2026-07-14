import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-navigation-tabs-example',
  imports: [KuiTabDirective, KuiTabsComponent],
  templateUrl: './navigation-tabs-example.html',
  styleUrl: './navigation-tabs-example.scss',
})
export class NavigationTabsExample {
  protected readonly currentSection = signal('/overview');
}
