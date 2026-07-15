import { Component } from '@angular/core';

import { SELECT_EXAMPLE_SOURCES } from '@generated/example-sources/select.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BasicSelectExample, MultipleSelectExample } from './examples';
import { SELECT_API_ROWS } from './select.api-schema';
import {
  SELECT_API_DESCRIPTION,
  SELECT_IMPORT_TABS,
  SELECT_PROVIDER_TABS,
  SELECT_STATUS,
} from './select.docs-content';

@Component({
  selector: 'app-select-page',
  imports: [
    ApiTable,
    BasicSelectExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MultipleSelectExample,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './select-page.html',
  styleUrl: './select-page.scss',
})
export class SelectPage {
  protected readonly status = SELECT_STATUS;
  protected readonly apiDescription = SELECT_API_DESCRIPTION;
  protected readonly apiRows = SELECT_API_ROWS;

  protected readonly importTabs = SELECT_IMPORT_TABS;

  protected readonly basicTabs = SELECT_EXAMPLE_SOURCES['basic-select-example'];

  protected readonly multipleTabs = SELECT_EXAMPLE_SOURCES['multiple-select-example'];

  protected readonly providerTabs = SELECT_PROVIDER_TABS;
}
