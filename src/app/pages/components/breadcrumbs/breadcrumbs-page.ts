import { Component } from '@angular/core';

import { BREADCRUMBS_EXAMPLE_SOURCES } from '@generated/example-sources/breadcrumbs.generated';
import {
  BREADCRUMBS_COLOR_TOKEN_ROWS,
  BREADCRUMBS_DEFAULTS,
  BREADCRUMBS_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/breadcrumbs.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { BREADCRUMBS_API_ROWS } from './breadcrumbs.api-schema';
import {
  BREADCRUMBS_API_DESCRIPTION,
  BREADCRUMBS_IMPORT_TABS,
  BREADCRUMBS_STATUS,
} from './breadcrumbs.docs-content';
import {
  BasicBreadcrumbsExample,
  BreadcrumbsCollapseExample,
  BreadcrumbsSizeExample,
} from './examples';

@Component({
  selector: 'app-breadcrumbs-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicBreadcrumbsExample,
    BreadcrumbsCollapseExample,
    BreadcrumbsSizeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './breadcrumbs-page.html',
  styleUrl: './breadcrumbs-page.scss',
})
export class BreadcrumbsPage {
  protected readonly status = BREADCRUMBS_STATUS;
  protected readonly apiDescription = BREADCRUMBS_API_DESCRIPTION;
  protected readonly defaults = BREADCRUMBS_DEFAULTS;
  protected readonly colorTokenRows = BREADCRUMBS_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = BREADCRUMBS_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = BREADCRUMBS_API_ROWS;
  protected readonly importTabs = BREADCRUMBS_IMPORT_TABS;
  protected readonly basicTabs = BREADCRUMBS_EXAMPLE_SOURCES['basic-breadcrumbs-example'];
  protected readonly sizeTabs = BREADCRUMBS_EXAMPLE_SOURCES['breadcrumbs-size-example'];
  protected readonly collapseTabs = BREADCRUMBS_EXAMPLE_SOURCES['breadcrumbs-collapse-example'];
}
