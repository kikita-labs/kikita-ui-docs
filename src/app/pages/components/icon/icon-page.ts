import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { ICON_EXAMPLE_SOURCES } from '@generated/example-sources/icon.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicIconExample } from './examples';
import { ICON_API_ROWS } from './icon.api-schema';
import { ICON_API_DESCRIPTION, ICON_IMPORT_TABS, ICON_STATUS } from './icon.docs-content';

@Component({
  selector: 'app-icon-page',
  imports: [
    ApiTable,
    BasicIconExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './icon-page.html',
  styleUrl: './icon-page.scss',
})
export class IconPage {
  protected readonly status = ICON_STATUS;
  protected readonly apiDescription = ICON_API_DESCRIPTION;
  protected readonly apiRows = ICON_API_ROWS;
  protected readonly importTabs = ICON_IMPORT_TABS;
  protected readonly basicTabs = ICON_EXAMPLE_SOURCES['basic-icon-example'];
}
