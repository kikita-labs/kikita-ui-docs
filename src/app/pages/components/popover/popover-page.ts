import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { POPOVER_EXAMPLE_SOURCES } from '@generated/example-sources/popover.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { ActionPopoverExample, BasicPopoverExample, HoverPopoverExample } from './examples';
import { POPOVER_API_ROWS } from './popover.api-schema';
import {
  POPOVER_API_DESCRIPTION,
  POPOVER_IMPORT_TABS,
  POPOVER_STATUS,
} from './popover.docs-content';

@Component({
  selector: 'app-popover-page',
  imports: [
    ActionPopoverExample,
    ApiTable,
    BasicPopoverExample,
    CodeTabs,
    DocSection,
    HoverPopoverExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './popover-page.html',
  styleUrl: './popover-page.scss',
})
export class PopoverPage {
  protected readonly status = POPOVER_STATUS;
  protected readonly apiDescription = POPOVER_API_DESCRIPTION;
  protected readonly apiRows = POPOVER_API_ROWS;

  protected readonly importTabs = POPOVER_IMPORT_TABS;

  protected readonly basicTabs = POPOVER_EXAMPLE_SOURCES['basic-popover-example'];

  protected readonly actionTabs = POPOVER_EXAMPLE_SOURCES['action-popover-example'];

  protected readonly hoverTabs = POPOVER_EXAMPLE_SOURCES['hover-popover-example'];
}
