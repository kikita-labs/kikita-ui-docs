import { Component } from '@angular/core';

import { COLOR_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/color-input.generated';
import {
  COLOR_INPUT_COLOR_TOKEN_ROWS,
  COLOR_INPUT_DEFAULTS,
  COLOR_INPUT_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/color-input.generated';
import { COLOR_INPUT_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { COLOR_INPUT_API_ROWS } from './color-input.api-schema';
import {
  COLOR_INPUT_API_DESCRIPTION,
  COLOR_INPUT_IMPORT_TABS,
  COLOR_INPUT_STATUS,
} from './color-input.docs-content';
import { BasicColorInputExample } from './examples';

@Component({
  selector: 'app-color-input-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicColorInputExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './color-input-page.html',
  styleUrl: './color-input-page.scss',
})
export class ColorInputPage {
  protected readonly status = COLOR_INPUT_STATUS;
  protected readonly apiDescription = COLOR_INPUT_API_DESCRIPTION;
  protected readonly defaults = COLOR_INPUT_DEFAULTS;
  protected readonly colorTokenRows = COLOR_INPUT_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = COLOR_INPUT_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [COLOR_INPUT_MESSAGES];
  protected readonly apiRows = COLOR_INPUT_API_ROWS;
  protected readonly importTabs = COLOR_INPUT_IMPORT_TABS;
  protected readonly basicTabs = COLOR_INPUT_EXAMPLE_SOURCES['basic-color-input-example'];
}
