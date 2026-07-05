import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  KuiButtonDirective,
  KuiCommandPaletteComponent,
  type KuiCommandItem,
  KuiIconButtonDirective,
} from '@kikita-labs/ui';
import { DOCS_HOME_PATH, DOCS_NAVIGATION_ITEMS } from '../../core/navigation/docs-navigation-items';
import { DocsSearchIndexService } from '../../core/search/docs-search-index.service';
import { DocsSearchStateService } from '../../core/search/docs-search-state.service';
import { DocsThemeService } from '../../core/theme/docs-theme.service';

@Component({
  selector: 'app-docs-header',
  imports: [
    KuiButtonDirective,
    KuiCommandPaletteComponent,
    KuiIconButtonDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './docs-header.html',
  styleUrl: './docs-header.scss',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
})
export class DocsHeader {
  readonly menuOpen = input(false);
  readonly showMenuButton = input(false);
  readonly minimal = input(false);
  readonly menuToggle = output<void>();

  private readonly router = inject(Router);
  protected readonly searchIndex = inject(DocsSearchIndexService);
  protected readonly search = inject(DocsSearchStateService);
  protected readonly theme = inject(DocsThemeService);
  protected readonly homePath = DOCS_HOME_PATH;
  protected readonly navigationItems = DOCS_NAVIGATION_ITEMS;
  protected readonly activeOptions = { exact: true };

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
}
