import { Component } from '@angular/core';

import { TREE_EXAMPLE_SOURCES } from '@generated/example-sources/tree.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BasicTreeExample } from './examples';
import { TREE_API_ROWS } from './tree.api-schema';
import { TREE_API_DESCRIPTION, TREE_IMPORT_TABS, TREE_STATUS } from './tree.docs-content';

@Component({
  selector: 'app-tree-page',
  imports: [
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
  protected readonly apiRows = TREE_API_ROWS;
  protected readonly importTabs = TREE_IMPORT_TABS;
  protected readonly basicTabs = TREE_EXAMPLE_SOURCES['basic-tree-example'];
}
