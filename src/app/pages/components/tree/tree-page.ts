import { Component } from '@angular/core';

import { TREE_EXAMPLE_SOURCES } from '@generated/example-sources/tree.generated';
import { TREE_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  TREE_COLOR_TOKEN_ROWS,
  TREE_DEFAULTS,
  TREE_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/tree.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { BasicTreeExample } from './examples';
import { TREE_API_ROWS } from './tree.api-schema';
import { TREE_API_DESCRIPTION, TREE_IMPORT_TABS, TREE_STATUS } from './tree.docs-content';

@Component({
  selector: 'app-tree-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicTreeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './tree-page.html',
  styleUrl: './tree-page.scss',
})
export class TreePage {
  protected readonly status = TREE_STATUS;
  protected readonly apiDescription = TREE_API_DESCRIPTION;
  protected readonly defaults = TREE_DEFAULTS;
  protected readonly colorTokenRows = TREE_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = TREE_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [TREE_MESSAGES];
  protected readonly apiRows = TREE_API_ROWS;
  protected readonly importTabs = TREE_IMPORT_TABS;
  protected readonly basicTabs = TREE_EXAMPLE_SOURCES['basic-tree-example'];
}
