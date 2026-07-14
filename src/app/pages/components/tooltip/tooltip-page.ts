import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { TOOLTIP_EXAMPLE_SOURCES } from '@generated/example-sources/tooltip.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicTooltipExample } from './examples';
import { TOOLTIP_API_ROWS } from './tooltip.api-schema';
import {
  TOOLTIP_API_DESCRIPTION,
  TOOLTIP_IMPORT_TABS,
  TOOLTIP_STATUS,
} from './tooltip.docs-content';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    ApiTable,
    BasicTooltipExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.scss',
})
export class TooltipPage {
  protected readonly status = TOOLTIP_STATUS;
  protected readonly apiDescription = TOOLTIP_API_DESCRIPTION;
  protected readonly apiRows = TOOLTIP_API_ROWS;
  protected readonly importTabs = TOOLTIP_IMPORT_TABS;
  protected readonly basicTabs = TOOLTIP_EXAMPLE_SOURCES['basic-tooltip-example'];
}
