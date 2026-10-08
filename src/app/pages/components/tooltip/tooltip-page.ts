import { Component } from '@angular/core';

import { TOOLTIP_EXAMPLE_SOURCES } from '@generated/example-sources/tooltip.generated';
import {
  TOOLTIP_DEFAULTS,
  TOOLTIP_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/tooltip.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

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
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicTooltipExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.scss',
})
export class TooltipPage {
  protected readonly status = TOOLTIP_STATUS;
  protected readonly apiDescription = TOOLTIP_API_DESCRIPTION;
  protected readonly defaults = TOOLTIP_DEFAULTS;
  protected readonly geometryTokenRows = TOOLTIP_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = TOOLTIP_API_ROWS;
  protected readonly importTabs = TOOLTIP_IMPORT_TABS;
  protected readonly basicTabs = TOOLTIP_EXAMPLE_SOURCES['basic-tooltip-example'];
}
