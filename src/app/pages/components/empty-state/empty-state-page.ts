import { Component } from '@angular/core';

import { EMPTY_STATE_EXAMPLE_SOURCES } from '@generated/example-sources/empty-state.generated';
import {
  EMPTY_STATE_COLOR_TOKEN_ROWS,
  EMPTY_STATE_DEFAULTS,
  EMPTY_STATE_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/empty-state.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { EMPTY_STATE_API_ROWS } from './empty-state.api-schema';
import {
  EMPTY_STATE_API_DESCRIPTION,
  EMPTY_STATE_IMPORT_TABS,
  EMPTY_STATE_STATUS,
} from './empty-state.docs-content';
import {
  BasicEmptyStateExample,
  EmptyStateContextExample,
  EmptyStateDescriptionExample,
  EmptyStateSizeExample,
} from './examples';

@Component({
  selector: 'app-empty-state-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicEmptyStateExample,
    CodeTabs,
    DocSection,
    EmptyStateContextExample,
    EmptyStateDescriptionExample,
    EmptyStateSizeExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './empty-state-page.html',
  styleUrl: './empty-state-page.scss',
})
export class EmptyStatePage {
  protected readonly status = EMPTY_STATE_STATUS;
  protected readonly apiDescription = EMPTY_STATE_API_DESCRIPTION;
  protected readonly defaults = EMPTY_STATE_DEFAULTS;
  protected readonly colorTokenRows = EMPTY_STATE_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = EMPTY_STATE_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = EMPTY_STATE_API_ROWS;

  protected readonly importTabs = EMPTY_STATE_IMPORT_TABS;

  protected readonly basicTabs = EMPTY_STATE_EXAMPLE_SOURCES['basic-empty-state-example'];

  protected readonly contextTabs = EMPTY_STATE_EXAMPLE_SOURCES['empty-state-context-example'];

  protected readonly sizeTabs = EMPTY_STATE_EXAMPLE_SOURCES['empty-state-size-example'];
  protected readonly descriptionTabs =
    EMPTY_STATE_EXAMPLE_SOURCES['empty-state-description-example'];
}
