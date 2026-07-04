import { Component, computed, input, signal } from '@angular/core';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { CodeTab } from './code-tab';

@Component({
  selector: 'app-code-tabs',
  imports: [KuiButtonDirective],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.scss',
})
export class CodeTabs {
  readonly label = input('Code examples');
  readonly tabs = input.required<readonly CodeTab[]>();

  protected readonly selectedIndex = signal(0);
  protected readonly selectedTab = computed(() => this.tabs()[this.selectedIndex()]);

  protected selectTab(index: number): void {
    this.selectedIndex.set(index);
  }

  protected tabId(index: number): string {
    return `code-tab-${index}`;
  }

  protected panelId(index: number): string {
    return `code-panel-${index}`;
  }
}
