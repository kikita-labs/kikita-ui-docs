import { Component } from '@angular/core';

import { ACCORDION_EXAMPLE_SOURCES } from '@generated/example-sources/accordion.generated';
import {
  ACCORDION_COLOR_TOKEN_ROWS,
  ACCORDION_DEFAULTS,
  ACCORDION_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/accordion.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { ACCORDION_API_ROWS } from './accordion.api-schema';
import {
  ACCORDION_API_DESCRIPTION,
  ACCORDION_IMPORT_TABS,
  ACCORDION_MIGRATION_TABS,
  ACCORDION_STATUS,
} from './accordion.docs-content';
import {
  AppearanceAccordionExample,
  BasicAccordionExample,
  IconAccordionExample,
  MultiAccordionExample,
} from './examples';

@Component({
  selector: 'app-accordion-page',
  imports: [
    ApiTable,
    AppearanceAccordionExample,
    BasicAccordionExample,
    CodeTabs,
    DocSection,
    IconAccordionExample,
    LivePreview,
    MultiAccordionExample,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.scss',
})
export class AccordionPage {
  protected readonly status = ACCORDION_STATUS;
  protected readonly apiDescription = ACCORDION_API_DESCRIPTION;
  protected readonly apiRows = ACCORDION_API_ROWS;

  protected readonly importTabs = ACCORDION_IMPORT_TABS;
  protected readonly migrationTabs = ACCORDION_MIGRATION_TABS;
  protected readonly defaults = ACCORDION_DEFAULTS;
  protected readonly colorTokenRows = ACCORDION_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = ACCORDION_GEOMETRY_TOKEN_ROWS;

  protected readonly basicTabs = ACCORDION_EXAMPLE_SOURCES['basic-accordion-example'];

  protected readonly multiTabs = ACCORDION_EXAMPLE_SOURCES['multi-accordion-example'];

  protected readonly appearanceTabs = ACCORDION_EXAMPLE_SOURCES['appearance-accordion-example'];

  protected readonly iconTabs = ACCORDION_EXAMPLE_SOURCES['icon-accordion-example'];
}
