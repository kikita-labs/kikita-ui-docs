import { Component, computed, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

import {
  KuiAccordionComponent,
  KuiAccordionItemComponent,
  KuiIconButtonDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

import { KIKITA_BRAND_MARK_ICON } from '@core/branding';
import type { DocsComponentCategory } from '@core/components';
import { DOCS_COMPONENT_CATEGORIES } from '@core/components';
import type { DocsNavigationItem } from '@core/navigation';
import { DOCS_NAVIGATION_ITEMS } from '@core/navigation';
import { DocsSearchStateService } from '@core/search';

@Component({
  selector: 'app-sidebar-nav',
  imports: [
    KuiAccordionComponent,
    KuiAccordionItemComponent,
    KuiIconButtonDirective,
    KuiIconComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {
  protected readonly brandMarkIcon = KIKITA_BRAND_MARK_ICON;

  public readonly closeNavigation = output<void>();
  public readonly skipToContent = output<void>();

  protected readonly search = inject(DocsSearchStateService);
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly foundationItems = DOCS_NAVIGATION_ITEMS[0]?.children ?? [];
  protected readonly componentCategories = DOCS_COMPONENT_CATEGORIES;
  protected readonly resourceItems: readonly DocsNavigationItem[] = DOCS_NAVIGATION_ITEMS[2]
    ? [DOCS_NAVIGATION_ITEMS[2]]
    : [];
  protected readonly activeOptions = { exact: true };
  protected readonly componentActiveOptions = { exact: false };
  protected readonly expandedGroupIds = signal([
    'foundations',
    'resources',
    ...DOCS_COMPONENT_CATEGORIES.map((category) => this.groupDomId(category.label)),
  ]);
  protected readonly activeUrl = computed(() => this.currentUrl().split(/[?#]/, 1)[0] || '/');

  protected groupDomId(groupId: string): string {
    return `sidebar-nav-${groupId.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
  }

  protected isNavigationGroupActive(items: readonly DocsNavigationItem[], exact: boolean): boolean {
    const activeUrl = this.activeUrl();
    return items.some((item) => this.isPathActive(item.path, activeUrl, exact));
  }

  protected isCategoryActive(category: DocsComponentCategory): boolean {
    const activeUrl = this.activeUrl();
    return category.components.some((component) =>
      this.isPathActive(component.routePath, activeUrl, false),
    );
  }

  protected activateSkipLink(event: MouseEvent): void {
    event.preventDefault();
    this.skipToContent.emit();
  }

  private isPathActive(path: string, activeUrl: string, exact: boolean): boolean {
    if (exact) {
      return activeUrl === path;
    }

    return activeUrl === path || activeUrl.startsWith(`${path}/`);
  }
}
