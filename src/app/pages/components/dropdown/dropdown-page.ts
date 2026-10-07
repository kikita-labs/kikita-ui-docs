import { Component } from '@angular/core';

import { DROPDOWN_EXAMPLE_SOURCES } from '@generated/example-sources/dropdown.generated';
import {
  DROPDOWN_DEFAULTS,
  DROPDOWN_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/dropdown.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { DROPDOWN_API_ROWS } from './dropdown.api-schema';
import {
  DROPDOWN_API_DESCRIPTION,
  DROPDOWN_IMPORT_TABS,
  DROPDOWN_STATUS,
} from './dropdown.docs-content';
import {
  ControlledOpenDropdownExample,
  FieldDropdownExample,
  PanelWidthDropdownExample,
  StandaloneDropdownExample,
} from './examples';

@Component({
  selector: 'app-dropdown-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    CodeTabs,
    ControlledOpenDropdownExample,
    DocSection,
    FieldDropdownExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    PanelWidthDropdownExample,
    StandaloneDropdownExample,
  ],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.scss',
})
export class DropdownPage {
  protected readonly status = DROPDOWN_STATUS;
  protected readonly apiDescription = DROPDOWN_API_DESCRIPTION;
  protected readonly defaults = DROPDOWN_DEFAULTS;
  protected readonly geometryTokenRows = DROPDOWN_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = DROPDOWN_API_ROWS;

  protected readonly importTabs = DROPDOWN_IMPORT_TABS;

  protected readonly standaloneTabs = DROPDOWN_EXAMPLE_SOURCES['standalone-dropdown-example'];

  protected readonly fieldTabs = DROPDOWN_EXAMPLE_SOURCES['field-dropdown-example'];

  protected readonly panelWidthTabs = DROPDOWN_EXAMPLE_SOURCES['panel-width-dropdown-example'];

  protected readonly controlledOpenTabs =
    DROPDOWN_EXAMPLE_SOURCES['controlled-open-dropdown-example'];
}
