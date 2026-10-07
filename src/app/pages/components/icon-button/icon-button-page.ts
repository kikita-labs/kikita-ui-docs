import { Component } from '@angular/core';

import { ICON_BUTTON_EXAMPLE_SOURCES } from '@generated/example-sources/icon-button.generated';
import {
  ICON_BUTTON_DEFAULTS,
  ICON_BUTTON_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/icon-button.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  IconButtonAppearanceExample,
  IconButtonIconExample,
  IconButtonSizeExample,
} from './examples';
import { ICON_BUTTON_API_ROWS } from './icon-button.api-schema';
import {
  ICON_BUTTON_API_DESCRIPTION,
  ICON_BUTTON_IMPORT_TABS,
  ICON_BUTTON_STATUS,
} from './icon-button.docs-content';

@Component({
  selector: 'app-icon-button-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    CodeTabs,
    DocSection,
    IconButtonAppearanceExample,
    IconButtonIconExample,
    IconButtonSizeExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './icon-button-page.html',
  styleUrl: './icon-button-page.scss',
})
export class IconButtonPage {
  protected readonly status = ICON_BUTTON_STATUS;
  protected readonly apiDescription = ICON_BUTTON_API_DESCRIPTION;
  protected readonly defaults = ICON_BUTTON_DEFAULTS;
  protected readonly geometryTokenRows = ICON_BUTTON_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = ICON_BUTTON_API_ROWS;
  protected readonly importTabs = ICON_BUTTON_IMPORT_TABS;

  protected readonly usageTabs = ICON_BUTTON_EXAMPLE_SOURCES['icon-button-appearance-example'];

  protected readonly appearanceTabs = ICON_BUTTON_EXAMPLE_SOURCES['icon-button-appearance-example'];

  protected readonly sizeTabs = ICON_BUTTON_EXAMPLE_SOURCES['icon-button-size-example'];

  protected readonly iconTabs = ICON_BUTTON_EXAMPLE_SOURCES['icon-button-icon-example'];
}
