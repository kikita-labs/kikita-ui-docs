import { Component } from '@angular/core';

import { COMMAND_PALETTE_EXAMPLE_SOURCES } from '@generated/example-sources/command-palette.generated';
import {
  COMMAND_PALETTE_COLOR_TOKEN_ROWS,
  COMMAND_PALETTE_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/command-palette.generated';
import { COMMAND_PALETTE_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { COMMAND_PALETTE_API_ROWS } from './command-palette.api-schema';
import {
  COMMAND_PALETTE_API_DESCRIPTION,
  COMMAND_PALETTE_IMPORT_TABS,
  COMMAND_PALETTE_ITEM_TABS,
  COMMAND_PALETTE_STATUS,
} from './command-palette.docs-content';
import { BasicCommandPaletteExample } from './examples';

@Component({
  selector: 'app-command-palette-page',
  imports: [
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicCommandPaletteExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './command-palette-page.html',
  styleUrl: './command-palette-page.scss',
})
export class CommandPalettePage {
  protected readonly status = COMMAND_PALETTE_STATUS;
  protected readonly apiDescription = COMMAND_PALETTE_API_DESCRIPTION;
  protected readonly colorTokenRows = COMMAND_PALETTE_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = COMMAND_PALETTE_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [COMMAND_PALETTE_MESSAGES];
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly importTabs = COMMAND_PALETTE_IMPORT_TABS;

  protected readonly usageTabs = COMMAND_PALETTE_EXAMPLE_SOURCES['basic-command-palette-example'];

  protected readonly itemTabs = COMMAND_PALETTE_ITEM_TABS;
}
