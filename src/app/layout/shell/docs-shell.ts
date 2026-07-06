import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { DocsHeader } from '../header/docs-header';
import { PageToc } from '../page-toc/page-toc';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

type DocsShellLayout = 'docs' | 'not-found';

@Component({
  selector: 'app-docs-shell',
  imports: [DocsHeader, PageToc, RouterOutlet, SidebarNav],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.scss',
})
export class DocsShell {
  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);
  private readonly currentLayout = signal<DocsShellLayout>('docs');

  protected readonly isLanding = computed(() => this.currentUrl().split(/[?#]/)[0] === '/');
  protected readonly isNotFound = computed(() => this.currentLayout() === 'not-found');
  protected readonly isNavigationOpen = signal(false);

  constructor() {
    this.updateRouteState(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.updateRouteState(event.urlAfterRedirects);
        this.isNavigationOpen.set(false);
      });
  }

  protected toggleNavigation(): void {
    this.isNavigationOpen.update((open) => !open);
  }

  protected closeNavigation(): void {
    this.isNavigationOpen.set(false);
  }

  private updateRouteState(url: string): void {
    this.currentUrl.set(url);
    this.currentLayout.set(this.getCurrentRouteLayout());
  }

  private getCurrentRouteLayout(): DocsShellLayout {
    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data['docsLayout'] === 'not-found' ? 'not-found' : 'docs';
  }
}
