import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { SEGMENTED_EXAMPLE_SOURCES } from '@generated/example-sources/segmented.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicSegmentedExample } from './examples';
import { SEGMENTED_API_ROWS } from './segmented.api-schema';
import {
  SEGMENTED_API_DESCRIPTION,
  SEGMENTED_IMPORT_TABS,
  SEGMENTED_STATUS,
} from './segmented.docs-content';

@Component({
  selector: 'app-segmented-page',
  imports: [
    ApiTable,
    BasicSegmentedExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './segmented-page.html',
  styleUrl: './segmented-page.scss',
})
export class SegmentedPage {
  protected readonly status = SEGMENTED_STATUS;
  protected readonly apiDescription = SEGMENTED_API_DESCRIPTION;
  protected readonly apiRows = SEGMENTED_API_ROWS;
  protected readonly importTabs = SEGMENTED_IMPORT_TABS;
  protected readonly basicTabs = SEGMENTED_EXAMPLE_SOURCES['basic-segmented-example'];
}
