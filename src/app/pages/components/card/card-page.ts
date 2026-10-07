import { Component } from '@angular/core';

import { CARD_EXAMPLE_SOURCES } from '@generated/example-sources/card.generated';
import { CARD_COLOR_TOKEN_ROWS, CARD_DEFAULTS } from '@generated/library-tables/card.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { CARD_API_ROWS } from './card.api-schema';
import { CARD_API_DESCRIPTION, CARD_IMPORT_TABS, CARD_STATUS } from './card.docs-content';
import {
  BasicCardExample,
  CardAppearanceExample,
  CardInteractiveExample,
  CardSizeExample,
} from './examples';

@Component({
  selector: 'app-card-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicCardExample,
    CardAppearanceExample,
    CardInteractiveExample,
    CardSizeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {
  protected readonly status = CARD_STATUS;
  protected readonly apiDescription = CARD_API_DESCRIPTION;

  protected readonly importTabs = CARD_IMPORT_TABS;

  protected readonly basicTabs = CARD_EXAMPLE_SOURCES['basic-card-example'];

  protected readonly appearanceTabs = CARD_EXAMPLE_SOURCES['card-appearance-example'];

  protected readonly sizeTabs = CARD_EXAMPLE_SOURCES['card-size-example'];

  protected readonly interactiveTabs = CARD_EXAMPLE_SOURCES['card-interactive-example'];

  protected readonly defaults = CARD_DEFAULTS;
  protected readonly colorTokenRows = CARD_COLOR_TOKEN_ROWS;
  protected readonly apiRows = CARD_API_ROWS;
}
