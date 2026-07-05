import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KuiButtonDirective, KuiIconButtonDirective } from '@kikita-labs/ui';
import { DOCS_HOME_PATH, DOCS_NAVIGATION_ITEMS } from '../../core/navigation/docs-navigation-items';
import { DocsThemeService } from '../../core/theme/docs-theme.service';

@Component({
  selector: 'app-docs-header',
  imports: [KuiButtonDirective, KuiIconButtonDirective, RouterLink, RouterLinkActive],
  templateUrl: './docs-header.html',
  styleUrl: './docs-header.scss',
})
export class DocsHeader {
  readonly menuOpen = input(false);
  readonly showMenuButton = input(false);
  readonly menuToggle = output<void>();

  protected readonly theme = inject(DocsThemeService);
  protected readonly homePath = DOCS_HOME_PATH;
  protected readonly navigationItems = DOCS_NAVIGATION_ITEMS;
  protected readonly activeOptions = { exact: true };
}
