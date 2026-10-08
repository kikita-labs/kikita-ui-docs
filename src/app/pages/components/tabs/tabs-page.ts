import { Component } from '@angular/core';

import { TABS_EXAMPLE_SOURCES } from '@generated/example-sources/tabs.generated';
import { TABS_MESSAGES } from '@generated/library-tables/messages.generated';
import { TABS_COLOR_TOKEN_ROWS, TABS_DEFAULTS } from '@generated/library-tables/tabs.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  BasicTabsExample,
  NavigationTabsExample,
  PillTabsExample,
  VerticalTabsExample,
} from './examples';
import { TABS_API_ROWS } from './tabs.api-schema';
import { TABS_API_DESCRIPTION, TABS_IMPORT_TABS, TABS_STATUS } from './tabs.docs-content';

@Component({
  selector: 'app-tabs-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicTabsExample,
    CodeTabs,
    DocSection,
    LivePreview,
    NavigationTabsExample,
    PageHeader,
    PlaygroundRouteButton,
    PillTabsExample,
    VerticalTabsExample,
  ],
  templateUrl: './tabs-page.html',
  styleUrl: './tabs-page.scss',
})
export class TabsPage {
  protected readonly status = TABS_STATUS;
  protected readonly apiDescription = TABS_API_DESCRIPTION;
  protected readonly defaults = TABS_DEFAULTS;
  protected readonly colorTokenRows = TABS_COLOR_TOKEN_ROWS;
  protected readonly messageGroups = [TABS_MESSAGES];
  protected readonly apiRows = TABS_API_ROWS;

  protected readonly importTabs = TABS_IMPORT_TABS;

  protected readonly basicTabs = TABS_EXAMPLE_SOURCES['basic-tabs-example'];

  protected readonly pillTabs = TABS_EXAMPLE_SOURCES['pill-tabs-example'];

  protected readonly verticalTabs = TABS_EXAMPLE_SOURCES['vertical-tabs-example'];

  protected readonly navigationTabs = TABS_EXAMPLE_SOURCES['navigation-tabs-example'];
}
