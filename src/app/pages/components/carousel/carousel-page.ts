import { Component } from '@angular/core';

import { CAROUSEL_EXAMPLE_SOURCES } from '@generated/example-sources/carousel.generated';
import {
  CAROUSEL_COLOR_TOKEN_ROWS,
  CAROUSEL_DEFAULTS,
  CAROUSEL_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/carousel.generated';
import { CAROUSEL_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { CAROUSEL_API_ROWS } from './carousel.api-schema';
import {
  CAROUSEL_API_DESCRIPTION,
  CAROUSEL_IMPORT_TABS,
  CAROUSEL_STATUS,
} from './carousel.docs-content';
import {
  BasicCarouselExample,
  CarouselAutoplayExample,
  CarouselControlsExample,
  CarouselItemsExample,
  CarouselMessagesExample,
} from './examples';

@Component({
  selector: 'app-carousel-page',
  imports: [
    ApiTable,
    BasicCarouselExample,
    CarouselAutoplayExample,
    CarouselControlsExample,
    CarouselItemsExample,
    CarouselMessagesExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './carousel-page.html',
  styleUrl: './carousel-page.scss',
})
export class CarouselPage {
  protected readonly status = CAROUSEL_STATUS;
  protected readonly apiDescription = CAROUSEL_API_DESCRIPTION;
  protected readonly defaults = CAROUSEL_DEFAULTS;
  protected readonly colorTokenRows = CAROUSEL_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = CAROUSEL_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CAROUSEL_MESSAGES];
  protected readonly apiRows = CAROUSEL_API_ROWS;

  protected readonly importTabs = CAROUSEL_IMPORT_TABS;

  protected readonly basicTabs = CAROUSEL_EXAMPLE_SOURCES['basic-carousel-example'];

  protected readonly itemsTabs = CAROUSEL_EXAMPLE_SOURCES['carousel-items-example'];

  protected readonly autoplayTabs = CAROUSEL_EXAMPLE_SOURCES['carousel-autoplay-example'];

  protected readonly controlsTabs = CAROUSEL_EXAMPLE_SOURCES['carousel-controls-example'];

  protected readonly messagesTabs = CAROUSEL_EXAMPLE_SOURCES['carousel-messages-example'];
}
