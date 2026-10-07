import { Component } from '@angular/core';

import { DRAWER_EXAMPLE_SOURCES } from '@generated/example-sources/drawer.generated';
import {
  DRAWER_COLOR_TOKEN_ROWS,
  DRAWER_DEFAULTS,
  DRAWER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/drawer.generated';
import { DRAWER_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { DRAWER_API_ROWS } from './drawer.api-schema';
import { DRAWER_API_DESCRIPTION, DRAWER_IMPORT_TABS, DRAWER_STATUS } from './drawer.docs-content';
import { BasicDrawerExample, DrawerSidesExample, DrawerSizesExample } from './examples';

@Component({
  selector: 'app-drawer-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicDrawerExample,
    CodeTabs,
    DocSection,
    DrawerSidesExample,
    DrawerSizesExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './drawer-page.html',
  styleUrl: './drawer-page.scss',
})
export class DrawerPage {
  protected readonly status = DRAWER_STATUS;
  protected readonly apiDescription = DRAWER_API_DESCRIPTION;

  protected readonly importTabs = DRAWER_IMPORT_TABS;

  protected readonly basicTabs = DRAWER_EXAMPLE_SOURCES['basic-drawer-example'];

  protected readonly sidesTabs = DRAWER_EXAMPLE_SOURCES['drawer-sides-example'];

  protected readonly sizesTabs = DRAWER_EXAMPLE_SOURCES['drawer-sizes-example'];

  protected readonly defaults = DRAWER_DEFAULTS;
  protected readonly colorTokenRows = DRAWER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = DRAWER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [DRAWER_MESSAGES];
  protected readonly apiRows = DRAWER_API_ROWS;
}
