import { Component } from '@angular/core';

import { POPOVER_EXAMPLE_SOURCES } from '@generated/example-sources/popover.generated';
import { POPOVER_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  POPOVER_COLOR_TOKEN_ROWS,
  POPOVER_DEFAULTS,
  POPOVER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/popover.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

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
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ActionPopoverExample,
    ApiTable,
    BasicPopoverExample,
    CodeTabs,
    DocSection,
    HoverPopoverExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './popover-page.html',
  styleUrl: './popover-page.scss',
})
export class PopoverPage {
  protected readonly status = POPOVER_STATUS;
  protected readonly apiDescription = POPOVER_API_DESCRIPTION;
  protected readonly defaults = POPOVER_DEFAULTS;
  protected readonly colorTokenRows = POPOVER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = POPOVER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [POPOVER_MESSAGES];
  protected readonly apiRows = POPOVER_API_ROWS;

  protected readonly importTabs = POPOVER_IMPORT_TABS;

  protected readonly basicTabs = POPOVER_EXAMPLE_SOURCES['basic-popover-example'];

  protected readonly actionTabs = POPOVER_EXAMPLE_SOURCES['action-popover-example'];

  protected readonly hoverTabs = POPOVER_EXAMPLE_SOURCES['hover-popover-example'];
}
