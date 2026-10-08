import { Component } from '@angular/core';

import { SLIDER_EXAMPLE_SOURCES } from '@generated/example-sources/slider.generated';
import {
  SLIDER_COLOR_TOKEN_ROWS,
  SLIDER_DEFAULTS,
  SLIDER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/slider.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  BasicSliderExample,
  SliderDisabledExample,
  SliderFieldExample,
  SliderRangeExample,
} from './examples';
import { SLIDER_API_ROWS } from './slider.api-schema';
import { SLIDER_API_DESCRIPTION, SLIDER_IMPORT_TABS, SLIDER_STATUS } from './slider.docs-content';

@Component({
  selector: 'app-slider-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicSliderExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    SliderDisabledExample,
    SliderFieldExample,
    SliderRangeExample,
  ],
  templateUrl: './slider-page.html',
  styleUrl: './slider-page.scss',
})
export class SliderPage {
  protected readonly status = SLIDER_STATUS;
  protected readonly apiDescription = SLIDER_API_DESCRIPTION;
  protected readonly defaults = SLIDER_DEFAULTS;
  protected readonly colorTokenRows = SLIDER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = SLIDER_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = SLIDER_API_ROWS;

  protected readonly importTabs = SLIDER_IMPORT_TABS;

  protected readonly basicTabs = SLIDER_EXAMPLE_SOURCES['basic-slider-example'];

  protected readonly rangeTabs = SLIDER_EXAMPLE_SOURCES['slider-range-example'];

  protected readonly disabledTabs = SLIDER_EXAMPLE_SOURCES['slider-disabled-example'];

  protected readonly fieldTabs = SLIDER_EXAMPLE_SOURCES['slider-field-example'];
}
