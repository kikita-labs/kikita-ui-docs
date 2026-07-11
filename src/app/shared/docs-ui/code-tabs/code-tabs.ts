import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import {
  KuiIconButtonDirective,
  KuiSegmentDirective,
  KuiSegmentedComponent,
  kuiToast,
} from '@kikita-labs/ui';
import { DocsThemeService } from '../../../core/theme/docs-theme.service';
import { CodeHighlighterService } from './code-highlighter.service';
import { CodeTab } from './code-tab';

let nextCodeTabsId = 0;

@Component({
  selector: 'app-code-tabs',
  imports: [KuiIconButtonDirective, KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.scss',
})
export class CodeTabs {
  private readonly highlighter = inject(CodeHighlighterService);
  private readonly theme = inject(DocsThemeService);
  private readonly toast = kuiToast();

  readonly label = input('Code examples');
  readonly tabs = input.required<readonly CodeTab[]>();

  protected readonly id = `code-tabs-${++nextCodeTabsId}`;
  protected readonly selectedIndex = signal(0);
  protected readonly selectedTab = computed(() => this.tabs()[this.selectedIndex()]);
  protected readonly selectedValue = computed(() => this.selectedTab()?.label ?? '');
  protected readonly hasMultipleTabs = computed(() => this.tabs().length > 1);
  protected readonly headerLabel = computed(() => {
    const tab = this.selectedTab();

    if (!tab) {
      return '';
    }

    return tab.filename ?? this.getDefaultFilename(tab);
  });
  protected readonly highlightedCode = signal<SafeHtml | null>(null);
  protected readonly isHighlighting = signal(false);

  private highlightRequestId = 0;

  constructor() {
    effect(() => {
      const tab = this.selectedTab();
      const codeThemeId = this.theme.codeThemeId();
      const requestId = ++this.highlightRequestId;

      this.highlightedCode.set(null);

      if (!tab) {
        this.isHighlighting.set(false);
        return;
      }

      this.isHighlighting.set(true);

      void this.highlighter
        .highlight(tab.code, tab.language, codeThemeId)
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

  protected selectTabValue(value: string): void {
    const index = this.tabs().findIndex((tab) => tab.label === value);

    if (index >= 0) {
      this.selectTab(index);
    }
  }

  protected async copySelectedCode(): Promise<void> {
    const code = this.selectedTab()?.code;

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      this.toast.open({
        title: 'Code copied',
        message: `${this.headerLabel()} copied to clipboard.`,
        appearance: 'success',
      });
    } catch {
      this.toast.open({
        title: 'Copy failed',
        message: 'Clipboard access is unavailable in this browser.',
        appearance: 'danger',
      });
    }
  }

  protected tabId(index: number): string {
    return `${this.id}-tab-${index}`;
  }

  protected panelId(index: number): string {
    return `${this.id}-panel-${index}`;
  }

  private getDefaultFilename(tab: CodeTab): string {
    if (tab.label.toLowerCase() === 'import') {
      return tab.language === 'ts' ? 'index.ts' : `import.${tab.language}`;
    }

    return `${tab.label.toLowerCase()}.${tab.language}`;
  }
}
