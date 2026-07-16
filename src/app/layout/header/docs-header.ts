import {
  Component,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  KuiBreadcrumbItemDirective,
  KuiBreadcrumbsDirective,
  KuiBreadcrumbSeparatorComponent,
  type KuiCommandItem,
  KuiCommandPaletteComponent,
  KuiIconButtonDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

import { KIKITA_BRAND_MARK_ICON } from '@core/branding';
import { DOCS_HOME_PATH, DocsRouteStateService } from '@core/navigation';
import { DocsKeyboardShortcutService } from '@core/platform/keyboard';
import { DocsSearchIndexService } from '@core/search';
import { DocsSearchStateService } from '@core/search';
import { DocsThemeService } from '@core/theme';
import { SearchTrigger } from '@shared/docs-ui/search-trigger';

import { Theming } from '../theming/theming';

@Component({
  selector: 'app-docs-header',
  imports: [
    KuiBreadcrumbItemDirective,
    KuiBreadcrumbSeparatorComponent,
    KuiBreadcrumbsDirective,
    KuiCommandPaletteComponent,
    KuiIconButtonDirective,
    KuiIconComponent,
    RouterLink,
    SearchTrigger,
    Theming,
  ],
  templateUrl: './docs-header.html',
  styleUrl: './docs-header.scss',
})
export class DocsHeader {
  public readonly landing = input(false);
  public readonly menuOpen = input(false);
  public readonly showMenuButton = input(false);
  public readonly minimal = input(false);
  public readonly menuToggle = output<void>();

  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly keyboardShortcuts = inject(DocsKeyboardShortcutService);
  private readonly routeState = inject(DocsRouteStateService);
  private readonly router = inject(Router);
  protected readonly searchIndex = inject(DocsSearchIndexService);
  protected readonly search = inject(DocsSearchStateService);
  protected readonly theme = inject(DocsThemeService);
  protected readonly homePath = DOCS_HOME_PATH;
  protected readonly brandMarkIcon = KIKITA_BRAND_MARK_ICON;
  protected readonly activePage = this.routeState.activePage;

  constructor() {
    const registration = this.keyboardShortcuts.registerCommandPalette(() => this.openSearch());

    if (registration.ok) {
      inject(DestroyRef).onDestroy(registration.value);
    }
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

  /** Restores focus after the mobile navigation dialog closes. */
  public focusMenuButton(): void {
    this.menuButton()?.nativeElement.focus({ preventScroll: true });
  }
}
