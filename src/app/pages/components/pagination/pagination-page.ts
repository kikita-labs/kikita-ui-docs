import { Component } from '@angular/core';

import { PAGINATION_EXAMPLE_SOURCES } from '@generated/example-sources/pagination.generated';
import { PAGINATION_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  PAGINATION_COLOR_TOKEN_ROWS,
  PAGINATION_DEFAULTS,
  PAGINATION_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/pagination.generated';
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
  BasicPaginationExample,
  PaginationTableExample,
  PaginationVariantsExample,
  PaginationWindowExample,
} from './examples';
import { PAGINATION_API_ROWS } from './pagination.api-schema';
import {
  PAGINATION_API_DESCRIPTION,
  PAGINATION_IMPORT_TABS,
  PAGINATION_STATUS,
} from './pagination.docs-content';

@Component({
  selector: 'app-pagination-page',
  imports: [
    ApiTable,
    BasicPaginationExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PaginationTableExample,
    PaginationVariantsExample,
    PaginationWindowExample,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './pagination-page.html',
  styleUrl: './pagination-page.scss',
})
export class PaginationPage {
  protected readonly status = PAGINATION_STATUS;
  protected readonly apiDescription = PAGINATION_API_DESCRIPTION;
  protected readonly defaults = PAGINATION_DEFAULTS;
  protected readonly colorTokenRows = PAGINATION_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = PAGINATION_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [PAGINATION_MESSAGES];
  protected readonly apiRows = PAGINATION_API_ROWS;

  protected readonly importTabs = PAGINATION_IMPORT_TABS;

  protected readonly basicTabs = PAGINATION_EXAMPLE_SOURCES['basic-pagination-example'];

  protected readonly variantsTabs = PAGINATION_EXAMPLE_SOURCES['pagination-variants-example'];

  protected readonly windowTabs = PAGINATION_EXAMPLE_SOURCES['pagination-window-example'];

  protected readonly tableTabs = PAGINATION_EXAMPLE_SOURCES['pagination-table-example'];
}
