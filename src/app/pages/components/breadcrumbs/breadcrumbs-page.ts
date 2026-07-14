import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { BREADCRUMBS_EXAMPLE_SOURCES } from '@generated/example-sources/breadcrumbs.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BREADCRUMBS_API_ROWS } from './breadcrumbs.api-schema';
import {
  BREADCRUMBS_API_DESCRIPTION,
  BREADCRUMBS_IMPORT_TABS,
  BREADCRUMBS_STATUS,
} from './breadcrumbs.docs-content';
import { BasicBreadcrumbsExample } from './examples';

@Component({
  selector: 'app-breadcrumbs-page',
  imports: [
    ApiTable,
    BasicBreadcrumbsExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './breadcrumbs-page.html',
  styleUrl: './breadcrumbs-page.scss',
})
export class BreadcrumbsPage {
  protected readonly status = BREADCRUMBS_STATUS;
  protected readonly apiDescription = BREADCRUMBS_API_DESCRIPTION;
  protected readonly apiRows = BREADCRUMBS_API_ROWS;
  protected readonly importTabs = BREADCRUMBS_IMPORT_TABS;
  protected readonly basicTabs = BREADCRUMBS_EXAMPLE_SOURCES['basic-breadcrumbs-example'];
}
