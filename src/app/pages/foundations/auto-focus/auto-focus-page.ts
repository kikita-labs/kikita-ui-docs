import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import { AUTO_FOCUS_API_ROWS, AUTO_FOCUS_USAGE_TABS } from './auto-focus.docs-content';

@Component({
  selector: 'app-auto-focus-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './auto-focus-page.html',
  styleUrl: './auto-focus-page.scss',
})
export class AutoFocusPage {
  protected readonly usageTabs = AUTO_FOCUS_USAGE_TABS;

  protected readonly apiRows = AUTO_FOCUS_API_ROWS;
}
