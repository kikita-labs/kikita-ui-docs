import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  DENSITY_CONTROL_ROWS,
  DENSITY_PROVIDER_TABS,
  DENSITY_TOKEN_TABS,
  DENSITY_VALUE_ROWS,
} from './density.docs-content';

@Component({
  selector: 'app-density-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './density-page.html',
  styleUrl: './density-page.scss',
})
export class DensityPage {
  protected readonly providerTabs = DENSITY_PROVIDER_TABS;
  protected readonly densityRows = DENSITY_VALUE_ROWS;
  protected readonly controlRows = DENSITY_CONTROL_ROWS;
  protected readonly tokenTabs = DENSITY_TOKEN_TABS;
}
