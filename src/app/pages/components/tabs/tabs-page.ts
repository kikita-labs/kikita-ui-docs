import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { TABS_EXAMPLE_SOURCES } from '@generated/example-sources/tabs.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

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
    ApiTable,
    BasicTabsExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    NavigationTabsExample,
    PageHeader,
    PillTabsExample,
    RouterLink,
    VerticalTabsExample,
  ],
  templateUrl: './tabs-page.html',
  styleUrl: './tabs-page.scss',
})
export class TabsPage {
  protected readonly status = TABS_STATUS;
  protected readonly apiDescription = TABS_API_DESCRIPTION;
  protected readonly apiRows = TABS_API_ROWS;

  protected readonly importTabs = TABS_IMPORT_TABS;

  protected readonly basicTabs = TABS_EXAMPLE_SOURCES['basic-tabs-example'];

  protected readonly pillTabs = TABS_EXAMPLE_SOURCES['pill-tabs-example'];

  protected readonly verticalTabs = TABS_EXAMPLE_SOURCES['vertical-tabs-example'];

  protected readonly navigationTabs = TABS_EXAMPLE_SOURCES['navigation-tabs-example'];
}
