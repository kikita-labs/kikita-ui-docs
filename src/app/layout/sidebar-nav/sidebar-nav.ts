import { Component, inject, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { KuiButtonDirective, KuiIconButtonDirective } from '@kikita-labs/ui';

import { DOCS_COMPONENT_CATEGORIES } from '@core/components';
import type { DocsNavigationItem } from '@core/navigation';
import { DOCS_NAVIGATION_ITEMS } from '@core/navigation';
import { DocsSearchStateService } from '@core/search';

@Component({
  selector: 'app-sidebar-nav',
  imports: [KuiButtonDirective, KuiIconButtonDirective, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {
  public readonly closeNavigation = output<void>();
  public readonly skipToContent = output<void>();

  protected readonly search = inject(DocsSearchStateService);
  protected readonly foundationItems = DOCS_NAVIGATION_ITEMS[0]?.children ?? [];
  protected readonly componentCategories = DOCS_COMPONENT_CATEGORIES;
  protected readonly packageItems: readonly DocsNavigationItem[] = DOCS_NAVIGATION_ITEMS[2]
    ? [DOCS_NAVIGATION_ITEMS[2]]
    : [];
  protected readonly activeOptions = { exact: true };
  protected readonly componentActiveOptions = { exact: false };
  protected readonly expandedGroupIds = signal(
    new Set([
      'foundations',
      ...DOCS_COMPONENT_CATEGORIES.map((category) => category.label),
      'package',
    ]),
  );

  protected isGroupExpanded(groupId: string): boolean {
    return this.expandedGroupIds().has(groupId);
  }

  protected toggleGroup(groupId: string): void {
    this.expandedGroupIds.update((groupIds) => {
      const nextGroupIds = new Set(groupIds);

      if (nextGroupIds.has(groupId)) {
        nextGroupIds.delete(groupId);
      } else {
        nextGroupIds.add(groupId);
      }

      return nextGroupIds;
    });
  }

  protected groupDomId(groupId: string): string {
    return `sidebar-nav-${groupId.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
  }

  protected activateSkipLink(event: MouseEvent): void {
    event.preventDefault();
    this.skipToContent.emit();
  }
}
