import { Component, signal } from '@angular/core';
import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-pill-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './pill-tabs-example.html',
  styleUrl: './pill-tabs-example.scss',
})
export class PillTabsExample {
  protected readonly activeTab = signal('daily');
}
