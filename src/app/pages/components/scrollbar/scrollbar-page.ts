import { Component } from '@angular/core';

import { SCROLLBAR_EXAMPLE_SOURCES } from '@generated/example-sources/scrollbar.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { LocalScrollContainerExample } from './examples';
import { SCROLLBAR_API_ROWS } from './scrollbar.api-schema';
import {
  SCROLLBAR_API_DESCRIPTION,
  SCROLLBAR_IMPORT_TABS,
  SCROLLBAR_PROVIDER_TABS,
  SCROLLBAR_STATUS,
} from './scrollbar.docs-content';

@Component({
  selector: 'app-scrollbar-page',
  imports: [ApiTable, CodeTabs, DocSection, LivePreview, LocalScrollContainerExample, PageHeader],
  templateUrl: './scrollbar-page.html',
  styleUrl: './scrollbar-page.scss',
})
export class ScrollbarPage {
  protected readonly status = SCROLLBAR_STATUS;
  protected readonly apiDescription = SCROLLBAR_API_DESCRIPTION;
  protected readonly apiRows = SCROLLBAR_API_ROWS;

  protected readonly importTabs = SCROLLBAR_IMPORT_TABS;

  protected readonly localTabs = SCROLLBAR_EXAMPLE_SOURCES['local-scroll-container-example'];

  protected readonly providerTabs = SCROLLBAR_PROVIDER_TABS;
}
