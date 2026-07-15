import { Component } from '@angular/core';

import { COMMAND_PALETTE_EXAMPLE_SOURCES } from '@generated/example-sources/command-palette.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

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
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly importTabs = COMMAND_PALETTE_IMPORT_TABS;

  protected readonly usageTabs = COMMAND_PALETTE_EXAMPLE_SOURCES['basic-command-palette-example'];

  protected readonly itemTabs = COMMAND_PALETTE_ITEM_TABS;
}
