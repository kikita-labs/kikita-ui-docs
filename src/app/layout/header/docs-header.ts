import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { DOCS_HOME_PATH, DOCS_NAVIGATION_ITEMS } from '../../core/navigation/docs-navigation-items';

@Component({
  selector: 'app-docs-header',
  imports: [KuiButtonDirective, RouterLink, RouterLinkActive],
  templateUrl: './docs-header.html',
  styleUrl: './docs-header.scss',
})
export class DocsHeader {
  protected readonly homePath = DOCS_HOME_PATH;
  protected readonly navigationItems = DOCS_NAVIGATION_ITEMS;
  protected readonly activeOptions = { exact: true };
}
