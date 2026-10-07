import { Component } from '@angular/core';

import { BUTTON_EXAMPLE_SOURCES } from '@generated/example-sources/button.generated';
import { BUTTON_GEOMETRY_TOKEN_ROWS } from '@generated/token-tables/button.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import {
  BUTTON_API_ROWS,
  BUTTON_COLOR_TOKEN_ROWS,
  BUTTON_DEFAULTS_ROWS,
} from './button.api-schema';
import {
  BUTTON_API_DESCRIPTION,
  BUTTON_CUSTOM_ICON_TABS,
  BUTTON_IMPORT_TABS,
  BUTTON_MIGRATION_TABS,
  BUTTON_PROVIDER_TABS,
  BUTTON_STATUS,
} from './button.docs-content';
import {
  BasicButtonExample,
  ButtonAppearanceExample,
  ButtonIconExample,
  ButtonLinkExample,
  ButtonSizeExample,
  ButtonWrapExample,
} from './examples';

@Component({
  selector: 'app-button-page',
  imports: [
    ApiTable,
    BasicButtonExample,
    ButtonAppearanceExample,
    ButtonIconExample,
    ButtonLinkExample,
    ButtonSizeExample,
    ButtonWrapExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
})
export class ButtonPage {
  protected readonly status = BUTTON_STATUS;
  protected readonly apiDescription = BUTTON_API_DESCRIPTION;
  protected readonly importTabs = BUTTON_IMPORT_TABS;

  protected readonly basicTabs = BUTTON_EXAMPLE_SOURCES['basic-button-example'];
  protected readonly appearanceTabs = BUTTON_EXAMPLE_SOURCES['button-appearance-example'];
  protected readonly sizeTabs = BUTTON_EXAMPLE_SOURCES['button-size-example'];
  protected readonly iconTabs = BUTTON_EXAMPLE_SOURCES['button-icon-example'];
  protected readonly wrapTabs = BUTTON_EXAMPLE_SOURCES['button-wrap-example'];
  protected readonly linkTabs = BUTTON_EXAMPLE_SOURCES['button-link-example'];
  protected readonly customIconTabs = BUTTON_CUSTOM_ICON_TABS;
  protected readonly providerTabs = BUTTON_PROVIDER_TABS;
  protected readonly migrationTabs = BUTTON_MIGRATION_TABS;

  protected readonly apiRows = BUTTON_API_ROWS;
  protected readonly defaultsRows = BUTTON_DEFAULTS_ROWS;
  protected readonly colorTokenRows = BUTTON_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = BUTTON_GEOMETRY_TOKEN_ROWS;
}
