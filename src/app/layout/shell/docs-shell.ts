import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  afterRenderEffect,
  Component,
  effect,
  type ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DocsRouteStateService } from '@core/navigation';
import { DocsDocumentStyleService } from '@core/platform/document';

import { DocsHeader } from '../header/docs-header';
import { PageToc } from '../page-toc/page-toc';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

@Component({
  selector: 'app-docs-shell',
  imports: [CdkTrapFocus, DocsHeader, PageToc, RouterOutlet, SidebarNav],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.scss',
  host: {
    '(keydown.escape)': 'closeNavigation()',
  },
})
export class DocsShell {
  private readonly header = viewChild(DocsHeader);
  private readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');
  private readonly routeState = inject(DocsRouteStateService);
  private readonly documentStyle = inject(DocsDocumentStyleService);

  protected readonly activePage = this.routeState.activePage;
  protected readonly isNavigationOpen = signal(false);

  private readonly closeNavigationOnRouteChange = effect(() => {
    if (this.activePage().url) {
      untracked(() => this.setNavigationOpen(false, false));
    }
  });

  private readonly routeFocusEffect = afterRenderEffect(() => {
    if (!this.activePage().url.includes('#')) {
      this.focusContentElement();
    }
  });

  private readonly navigationScrollLockEffect = effect((onCleanup) => {
    this.documentStyle.setRootScrollLocked(this.isNavigationOpen());

    onCleanup(() => this.documentStyle.setRootScrollLocked(false));
  });

  protected toggleNavigation(): void {
    this.setNavigationOpen(!this.isNavigationOpen(), this.isNavigationOpen());
  }

  protected closeNavigation(): void {
    this.setNavigationOpen(false, true);
  }

  protected focusMainContent(): void {
    this.setNavigationOpen(false, false);
    this.focusContentElement();
  }

  private setNavigationOpen(open: boolean, restoreMenuFocus: boolean): void {
    if (this.isNavigationOpen() === open) {
      return;
    }

    this.isNavigationOpen.set(open);

    if (!open && restoreMenuFocus) {
      this.header()?.focusMenuButton();
    }
  }

  private focusContentElement(): void {
    const main = this.mainContent()?.nativeElement;
    const target = main?.querySelector<HTMLElement>('h1') ?? main;

    if (!target) {
      return;
    }

    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
}
