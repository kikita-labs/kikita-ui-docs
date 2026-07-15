import { Component } from '@angular/core';

import { PROGRESS_EXAMPLE_SOURCES } from '@generated/example-sources/progress.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import {
  BasicProgressExample,
  ProgressCircularExample,
  ProgressColorSizeExample,
} from './examples';
import { PROGRESS_API_ROWS } from './progress.api-schema';
import {
  PROGRESS_API_DESCRIPTION,
  PROGRESS_IMPORT_TABS,
  PROGRESS_STATUS,
} from './progress.docs-content';

@Component({
  selector: 'app-progress-page',
  imports: [
    ApiTable,
    BasicProgressExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    ProgressCircularExample,
    ProgressColorSizeExample,
  ],
  templateUrl: './progress-page.html',
  styleUrl: './progress-page.scss',
})
export class ProgressPage {
  protected readonly status = PROGRESS_STATUS;
  protected readonly apiDescription = PROGRESS_API_DESCRIPTION;

  protected readonly importTabs = PROGRESS_IMPORT_TABS;

  protected readonly basicTabs = PROGRESS_EXAMPLE_SOURCES['basic-progress-example'];

  protected readonly circularTabs = PROGRESS_EXAMPLE_SOURCES['progress-circular-example'];

  protected readonly colorSizeTabs = PROGRESS_EXAMPLE_SOURCES['progress-color-size-example'];

  protected readonly apiRows = PROGRESS_API_ROWS;
}
