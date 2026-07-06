import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { DocsThemeService } from '../../../core/theme/docs-theme.service';
import { CodeHighlighterService } from './code-highlighter.service';
import { CodeTab } from './code-tab';

@Component({
  selector: 'app-code-tabs',
  imports: [KuiButtonDirective],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.scss',
})
export class CodeTabs {
  private readonly highlighter = inject(CodeHighlighterService);
  private readonly theme = inject(DocsThemeService);

  readonly label = input('Code examples');
  readonly tabs = input.required<readonly CodeTab[]>();

  protected readonly selectedIndex = signal(0);
  protected readonly selectedTab = computed(() => this.tabs()[this.selectedIndex()]);
  protected readonly highlightedCode = signal<SafeHtml | null>(null);
  protected readonly isHighlighting = signal(false);

  private highlightRequestId = 0;

  constructor() {
    effect(() => {
      const tab = this.selectedTab();
      const themeMode = this.theme.mode();
      const requestId = ++this.highlightRequestId;

      this.highlightedCode.set(null);

      if (!tab) {
        this.isHighlighting.set(false);
        return;
      }

      this.isHighlighting.set(true);

      void this.highlighter
        .highlight(tab.code, tab.language, themeMode)
        .then((html) => {
          if (requestId === this.highlightRequestId) {
            this.highlightedCode.set(html);
          }
        })
        .catch(() => {
          if (requestId === this.highlightRequestId) {
            this.highlightedCode.set(null);
          }
        })
        .finally(() => {
          if (requestId === this.highlightRequestId) {
            this.isHighlighting.set(false);
          }
        });
    });
  }

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
