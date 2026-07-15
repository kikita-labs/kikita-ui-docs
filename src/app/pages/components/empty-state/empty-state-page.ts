import { Component } from '@angular/core';

import { EMPTY_STATE_EXAMPLE_SOURCES } from '@generated/example-sources/empty-state.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { EMPTY_STATE_API_ROWS } from './empty-state.api-schema';
import {
  EMPTY_STATE_API_DESCRIPTION,
  EMPTY_STATE_IMPORT_TABS,
  EMPTY_STATE_STATUS,
} from './empty-state.docs-content';
import {
  BasicEmptyStateExample,
  EmptyStateContextExample,
  EmptyStateSizeExample,
} from './examples';

@Component({
  selector: 'app-empty-state-page',
  imports: [
    ApiTable,
    BasicEmptyStateExample,
    CodeTabs,
    DocSection,
    EmptyStateContextExample,
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
  protected readonly apiRows = EMPTY_STATE_API_ROWS;

  protected readonly importTabs = EMPTY_STATE_IMPORT_TABS;

  protected readonly basicTabs = EMPTY_STATE_EXAMPLE_SOURCES['basic-empty-state-example'];

  protected readonly contextTabs = EMPTY_STATE_EXAMPLE_SOURCES['empty-state-context-example'];

  protected readonly sizeTabs = EMPTY_STATE_EXAMPLE_SOURCES['empty-state-size-example'];
}
