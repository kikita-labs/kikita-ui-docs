import { Component } from '@angular/core';

import { KuiTextDirective } from '@kikita-labs/ui';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  TYPOGRAPHY_API_ROWS,
  TYPOGRAPHY_IMPORT_TABS,
  TYPOGRAPHY_ROLE_ROWS,
  TYPOGRAPHY_TOKEN_TABS,
  TYPOGRAPHY_TONE_ROWS,
  TYPOGRAPHY_USAGE_TABS,
} from './typography.docs-content';

@Component({
  selector: 'app-typography-page',
  imports: [ApiTable, CodeTabs, DocSection, KuiTextDirective, PageHeader],
  templateUrl: './typography-page.html',
  styleUrl: './typography-page.scss',
})
export class TypographyPage {
  protected readonly importTabs = TYPOGRAPHY_IMPORT_TABS;
  protected readonly usageTabs = TYPOGRAPHY_USAGE_TABS;
  protected readonly roleRows = TYPOGRAPHY_ROLE_ROWS;
  protected readonly toneRows = TYPOGRAPHY_TONE_ROWS;
  protected readonly apiRows = TYPOGRAPHY_API_ROWS;
  protected readonly tokenTabs = TYPOGRAPHY_TOKEN_TABS;
}
