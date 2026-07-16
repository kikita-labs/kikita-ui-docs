import {
  Component,
  computed,
  effect,
  type ElementRef,
  inject,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { type SafeHtml } from '@angular/platform-browser';

import {
  KuiIconButtonDirective,
  KuiIconComponent,
  KuiSegmentDirective,
  KuiSegmentedComponent,
  kuiToast,
} from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';

import { CodeHighlighterService } from './code-highlighter.service';
import { type CodeTab } from './code-tab';

let nextCodeTabsId = 0;

@Component({
  selector: 'app-code-tabs',
  imports: [KuiIconButtonDirective, KuiIconComponent, KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.scss',
})
export class CodeTabs {
  private readonly highlighter = inject(CodeHighlighterService);
  private readonly clipboard = inject(DocsClipboardService);
  private readonly theme = inject(DocsThemeService);
  private readonly toast = kuiToast();

  /** Accessible name for the source-file tab selector. */
  public readonly label = input('Code examples');
  /** Immutable source tabs; labels must be unique within this component. */
  public readonly tabs = input.required<readonly CodeTab[]>();

  protected readonly id = `code-tabs-${++nextCodeTabsId}`;
  protected readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');
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

  protected selectTabFromKeyboard(event: KeyboardEvent, currentIndex: number): void {
    const tabCount = this.tabs().length;

    if (tabCount === 0) {
      return;
    }

    const lastIndex = tabCount - 1;
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lastIndex
          : event.key === 'ArrowRight' || event.key === 'ArrowDown'
            ? (currentIndex + 1) % tabCount
            : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
              ? (currentIndex - 1 + tabCount) % tabCount
              : null;

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.selectTab(nextIndex);
    this.tabButtons()[nextIndex]?.nativeElement.focus();
  }

  protected async copySelectedCode(): Promise<void> {
    const code = this.selectedTab()?.code;

    if (!code) {
      return;
    }

    try {
      const result = await this.clipboard.writeText(code);

      if (!result.ok) {
        throw new Error(`Clipboard ${result.reason}`);
      }
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

  protected panelId(): string {
    return `${this.id}-panel`;
  }

  private getDefaultFilename(tab: CodeTab): string {
    if (tab.label.toLowerCase() === 'import') {
      return tab.language === 'ts' ? 'index.ts' : `import.${tab.language}`;
    }

    return `${tab.label.toLowerCase()}.${tab.language}`;
  }
}
