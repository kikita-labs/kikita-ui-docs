import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { DocsHeader } from '../header/docs-header';
import { PageToc } from '../page-toc/page-toc';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

@Component({
  selector: 'app-docs-shell',
  imports: [DocsHeader, PageToc, RouterOutlet, SidebarNav],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.scss',
})
export class DocsShell {
  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);

  protected readonly isLanding = computed(() => this.currentUrl().split(/[?#]/)[0] === '/');
  protected readonly isNavigationOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
        this.isNavigationOpen.set(false);
      });
  }

  protected toggleNavigation(): void {
    this.isNavigationOpen.update((open) => !open);
  }

  protected closeNavigation(): void {
    this.isNavigationOpen.set(false);
  }
}
