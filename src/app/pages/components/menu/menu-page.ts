import { Component } from '@angular/core';

import { MENU_EXAMPLE_SOURCES } from '@generated/example-sources/menu.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BasicMenuExample, MenuContentExample } from './examples';
import { MENU_API_ROWS } from './menu.api-schema';
import { MENU_API_DESCRIPTION, MENU_IMPORT_TABS, MENU_STATUS } from './menu.docs-content';

@Component({
  selector: 'app-menu-page',
  imports: [
    ApiTable,
    BasicMenuExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MenuContentExample,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  protected readonly status = MENU_STATUS;
  protected readonly apiDescription = MENU_API_DESCRIPTION;
  protected readonly apiRows = MENU_API_ROWS;

  protected readonly importTabs = MENU_IMPORT_TABS;

  protected readonly basicTabs = MENU_EXAMPLE_SOURCES['basic-menu-example'];

  protected readonly contentTabs = MENU_EXAMPLE_SOURCES['menu-content-example'];
}
