import { Component, computed, inject, input, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {
  KuiBreadcrumbItemDirective,
  KuiBreadcrumbSeparatorComponent,
  KuiBreadcrumbsDirective,
  KuiButtonDirective,
  KuiCommandPaletteComponent,
  type KuiCommandItem,
  KuiIconButtonDirective,
} from '@kikita-labs/ui';
import { DOCS_COMPONENT_CATEGORIES } from '../../core/components/docs-component-categories';
import {
  DOCS_HOME_PATH,
  DOCS_NAVIGATION_ITEMS,
  DOCS_PATHS,
} from '../../core/navigation/docs-navigation-items';
import { DocsSearchIndexService } from '../../core/search/docs-search-index.service';
import { DocsSearchStateService } from '../../core/search/docs-search-state.service';
import { DocsThemeService } from '../../core/theme/docs-theme.service';
import { Theming } from '../theming/theming';

interface HeaderBreadcrumb {
  readonly label: string;
  readonly path?: string;
}

@Component({
  selector: 'app-docs-header',
  imports: [
    KuiBreadcrumbItemDirective,
    KuiBreadcrumbSeparatorComponent,
    KuiBreadcrumbsDirective,
    KuiButtonDirective,
    KuiCommandPaletteComponent,
    KuiIconButtonDirective,
    RouterLink,
    Theming,
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
      const isPlayground = path.endsWith('/playground');
      const componentPath = isPlayground ? path.slice(0, -'/playground'.length) : path;
      const component = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
        category.components.map((item) => ({ category: category.label, ...item })),
      ).find((item) => item.routePath === componentPath);

      if (component) {
        return [
          { label: 'Components', path: DOCS_PATHS.components },
          { label: component.category },
          isPlayground ? { label: component.name, path: componentPath } : { label: component.name },
          ...(isPlayground ? [{ label: 'Playground' }] : []),
        ];
      }
    }

    for (const item of DOCS_NAVIGATION_ITEMS) {
      if (item.path === path) {
        return [{ label: item.label }];
      }

      const child = item.children?.find((navigationChild) => navigationChild.path === path);

      if (child) {
        return [{ label: item.label, path: item.path }, { label: child.label }];
      }
    }

    return [{ label: 'Kikita UI' }];
  }
}
