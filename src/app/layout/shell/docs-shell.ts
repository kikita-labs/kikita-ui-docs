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
import { DocsAnchorNavigationService } from '@core/platform/anchor';
import { DocsDocumentStyleService } from '@core/platform/document';
import { DocsSectionRegistryService } from '@core/platform/heading';
import { DocsCanonicalLinkService } from '@core/platform/link';
import { DocsCanonicalUrlService } from '@core/site';

import { DocsHeader } from '../header/docs-header';
import { PageToc } from '../page-toc/page-toc';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';
import { VersionBanner } from '../version-banner/version-banner';

@Component({
  selector: 'app-docs-shell',
  imports: [CdkTrapFocus, DocsHeader, PageToc, RouterOutlet, SidebarNav, VersionBanner],
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
  private readonly anchorNavigation = inject(DocsAnchorNavigationService);
  private readonly sectionRegistry = inject(DocsSectionRegistryService);
  private readonly canonicalLink = inject(DocsCanonicalLinkService);
  private readonly canonicalUrl = inject(DocsCanonicalUrlService);
  private scrolledFragmentUrl: string | null = null;

  protected readonly activePage = this.routeState.activePage;
  protected readonly isNavigationOpen = signal(false);

  /** Runs during prerender too, so every static page ships its own canonical URL. */
  private readonly canonicalLinkEffect = effect(() => {
    const page = this.activePage();

    if (page.isNotFound) {
      this.canonicalLink.clear();
      return;
    }

    this.canonicalLink.set(this.canonicalUrl.forPath(page.path));
  });

  private readonly closeNavigationOnRouteChange = effect(() => {
    if (this.activePage().url) {
      untracked(() => this.setNavigationOpen(false, false));
    }
  });

  private readonly routeFocusEffect = afterRenderEffect(() => {
    const url = this.activePage().url;
    const fragmentIndex = url.indexOf('#');

    if (fragmentIndex === -1) {
      this.focusContentElement();
      return;
    }

    const fragment = url.slice(fragmentIndex + 1);

    // Registered sections mirror rendered headings, so waiting for the target section
    // confirms the route's lazy-loaded content actually reached the DOM before scrolling.
    const targetRegistered = this.sectionRegistry
      .sections()
      .some((section) => section.id === fragment);

    if (fragment && targetRegistered && this.scrolledFragmentUrl !== url) {
      this.scrolledFragmentUrl = url;
      untracked(() => void this.anchorNavigation.navigate(fragment));
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
