import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  ACCESSIBILITY_BASELINE_ROWS,
  ACCESSIBILITY_FORM_TABS,
  ACCESSIBILITY_REVIEW_ROWS,
  ACCESSIBILITY_STATUS_TABS,
} from './accessibility.docs-content';

@Component({
  selector: 'app-accessibility-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './accessibility-page.html',
  styleUrl: './accessibility-page.scss',
})
export class AccessibilityPage {
  protected readonly baselineRows = ACCESSIBILITY_BASELINE_ROWS;
  protected readonly reviewRows = ACCESSIBILITY_REVIEW_ROWS;
  protected readonly formTabs = ACCESSIBILITY_FORM_TABS;
  protected readonly statusTabs = ACCESSIBILITY_STATUS_TABS;
}
