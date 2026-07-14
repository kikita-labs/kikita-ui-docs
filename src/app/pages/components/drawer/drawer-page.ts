import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { DRAWER_EXAMPLE_SOURCES } from '@generated/example-sources/drawer.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { DRAWER_API_ROWS } from './drawer.api-schema';
import { DRAWER_API_DESCRIPTION, DRAWER_IMPORT_TABS, DRAWER_STATUS } from './drawer.docs-content';
import { BasicDrawerExample, DrawerSidesExample, DrawerSizesExample } from './examples';

@Component({
  selector: 'app-drawer-page',
  imports: [
    ApiTable,
    BasicDrawerExample,
    CodeTabs,
    DocSection,
    DrawerSidesExample,
    DrawerSizesExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './drawer-page.html',
  styleUrl: './drawer-page.scss',
})
export class DrawerPage {
  protected readonly status = DRAWER_STATUS;
  protected readonly apiDescription = DRAWER_API_DESCRIPTION;

  protected readonly importTabs = DRAWER_IMPORT_TABS;

  protected readonly basicTabs = DRAWER_EXAMPLE_SOURCES['basic-drawer-example'];

  protected readonly sidesTabs = DRAWER_EXAMPLE_SOURCES['drawer-sides-example'];

  protected readonly sizesTabs = DRAWER_EXAMPLE_SOURCES['drawer-sizes-example'];

  protected readonly apiRows = DRAWER_API_ROWS;
}
