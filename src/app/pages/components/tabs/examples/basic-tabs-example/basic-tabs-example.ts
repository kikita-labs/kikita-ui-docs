import { Component, signal } from '@angular/core';
import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './basic-tabs-example.html',
  styleUrl: './basic-tabs-example.scss',
})
export class BasicTabsExample {
  protected readonly activeTab = signal('overview');
}
