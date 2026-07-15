import { Component } from '@angular/core';

import { CHIP_EXAMPLE_SOURCES } from '@generated/example-sources/chip.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { CHIP_API_ROWS } from './chip.api-schema';
import { CHIP_API_DESCRIPTION, CHIP_IMPORT_TABS, CHIP_STATUS } from './chip.docs-content';
import {
  BasicChipExample,
  ChipStatesExample,
  InteractiveChipExample,
  RemovableChipExample,
} from './examples';

@Component({
  selector: 'app-chip-page',
  imports: [
    ApiTable,
    BasicChipExample,
    ChipStatesExample,
    CodeTabs,
    DocSection,
    InteractiveChipExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    RemovableChipExample,
  ],
  templateUrl: './chip-page.html',
  styleUrl: './chip-page.scss',
})
export class ChipPage {
  protected readonly status = CHIP_STATUS;
  protected readonly apiDescription = CHIP_API_DESCRIPTION;

  protected readonly importTabs = CHIP_IMPORT_TABS;

  protected readonly basicTabs = CHIP_EXAMPLE_SOURCES['basic-chip-example'];

  protected readonly removableTabs = CHIP_EXAMPLE_SOURCES['removable-chip-example'];

  protected readonly interactiveTabs = CHIP_EXAMPLE_SOURCES['interactive-chip-example'];

  protected readonly statesTabs = CHIP_EXAMPLE_SOURCES['chip-states-example'];

  protected readonly apiRows = CHIP_API_ROWS;
}
