import { Component, computed, inject, input, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {
  KuiButtonDirective,
  KuiCommandPaletteComponent,
  type KuiCommandItem,
  KuiIconButtonDirective,
} from '@kikita-labs/ui';
import { DOCS_COMPONENT_CATEGORIES } from '../../core/components/docs-component-categories';
import { DOCS_HOME_PATH, DOCS_NAVIGATION_ITEMS } from '../../core/navigation/docs-navigation-items';
import { DocsSearchIndexService } from '../../core/search/docs-search-index.service';
import { DocsSearchStateService } from '../../core/search/docs-search-state.service';
import { DocsThemeService } from '../../core/theme/docs-theme.service';
import { SeedColorPicker } from '../seed-color-picker/seed-color-picker';

interface HeaderBreadcrumb {
  readonly label: string;
}

@Component({
  selector: 'app-docs-header',
  imports: [
    KuiButtonDirective,
    KuiCommandPaletteComponent,
    KuiIconButtonDirective,
    RouterLink,
    SeedColorPicker,
  ],
  templateUrl: './docs-header.html',
  styleUrl: './docs-header.scss',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
})
export class DocsHeader {
  readonly landing = input(false);
  readonly menuOpen = input(false);
  readonly showMenuButton = input(false);
  readonly minimal = input(false);
  readonly menuToggle = output<void>();

  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);
  protected readonly searchIndex = inject(DocsSearchIndexService);
  protected readonly search = inject(DocsSearchStateService);
  protected readonly theme = inject(DocsThemeService);
  protected readonly homePath = DOCS_HOME_PATH;
  protected readonly breadcrumbs = computed(() => this.getBreadcrumbs(this.currentUrl()));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }

  protected openSearch(): void {
    this.search.show();
  }

  protected navigateToCommand(command: KuiCommandItem): void {
    const path = this.searchIndex.getPath(command);

    if (!path) {
      return;
    }

    this.search.reset();
    void this.router.navigateByUrl(path);
  }

  protected handleDocumentKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  private getBreadcrumbs(url: string): readonly HeaderBreadcrumb[] {
    const path = url.split(/[?#]/)[0];

    if (path.startsWith('/components/')) {
      const component = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
        category.components.map((item) => ({ category: category.label, ...item })),
      ).find((item) => item.routePath === path);

      if (component) {
        return [{ label: 'Components' }, { label: component.category }, { label: component.name }];
      }
    }

    for (const item of DOCS_NAVIGATION_ITEMS) {
      if (item.path === path) {
        return [{ label: item.label }];
      }

      const child = item.children?.find((navigationChild) => navigationChild.path === path);

      if (child) {
        return [{ label: item.label }, { label: child.label }];
      }
    }

    return [{ label: 'Kikita UI' }];
  }
}
