import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DOCS_NAVIGATION_ITEMS } from '../../core/navigation/docs-navigation-items';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {
  protected readonly navigationItems = DOCS_NAVIGATION_ITEMS;
  protected readonly activeOptions = { exact: true };
}
