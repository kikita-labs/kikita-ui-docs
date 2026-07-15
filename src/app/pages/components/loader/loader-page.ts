import { Component } from '@angular/core';

import { LOADER_EXAMPLE_SOURCES } from '@generated/example-sources/loader.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BasicLoaderExample, LoaderButtonExample, LoaderSizeExample } from './examples';
import { LOADER_API_ROWS } from './loader.api-schema';
import { LOADER_API_DESCRIPTION, LOADER_IMPORT_TABS, LOADER_STATUS } from './loader.docs-content';

@Component({
  selector: 'app-loader-page',
  imports: [
    ApiTable,
    BasicLoaderExample,
    CodeTabs,
    DocSection,
    LivePreview,
    LoaderButtonExample,
    LoaderSizeExample,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './loader-page.html',
  styleUrl: './loader-page.scss',
})
export class LoaderPage {
  protected readonly status = LOADER_STATUS;
  protected readonly apiDescription = LOADER_API_DESCRIPTION;
  protected readonly apiRows = LOADER_API_ROWS;

  protected readonly importTabs = LOADER_IMPORT_TABS;

  protected readonly basicTabs = LOADER_EXAMPLE_SOURCES['basic-loader-example'];

  protected readonly sizeTabs = LOADER_EXAMPLE_SOURCES['loader-size-example'];

  protected readonly buttonTabs = LOADER_EXAMPLE_SOURCES['loader-button-example'];
}
