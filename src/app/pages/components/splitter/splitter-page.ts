import { Component } from '@angular/core';

import { SPLITTER_EXAMPLE_SOURCES } from '@generated/example-sources/splitter.generated';
import { SPLITTER_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  SPLITTER_DEFAULTS,
  SPLITTER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/splitter.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { BasicSplitterExample, SplitterMultipleExample, SplitterNestedExample } from './examples';
import { SPLITTER_API_ROWS } from './splitter.api-schema';
import {
  SPLITTER_API_DESCRIPTION,
  SPLITTER_IMPORT_TABS,
  SPLITTER_STATUS,
} from './splitter.docs-content';

@Component({
  selector: 'app-splitter-page',
  imports: [
    ApiTable,
    BasicSplitterExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    SplitterMultipleExample,
    SplitterNestedExample,
    TokenTablesSection,
  ],
  templateUrl: './splitter-page.html',
  styleUrl: './splitter-page.scss',
})
export class SplitterPage {
  protected readonly status = SPLITTER_STATUS;
  protected readonly apiDescription = SPLITTER_API_DESCRIPTION;
  protected readonly defaults = SPLITTER_DEFAULTS;
  protected readonly geometryTokenRows = SPLITTER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [SPLITTER_MESSAGES];
  protected readonly apiRows = SPLITTER_API_ROWS;

  protected readonly importTabs = SPLITTER_IMPORT_TABS;

  protected readonly basicTabs = SPLITTER_EXAMPLE_SOURCES['basic-splitter-example'];

  protected readonly nestedTabs = SPLITTER_EXAMPLE_SOURCES['splitter-nested-example'];

  protected readonly multipleTabs = SPLITTER_EXAMPLE_SOURCES['splitter-multiple-example'];
}
