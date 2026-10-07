import { Component } from '@angular/core';

import { SELECT_EXAMPLE_SOURCES } from '@generated/example-sources/select.generated';
import { SELECT_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  SELECT_COLOR_TOKEN_ROWS,
  SELECT_DEFAULTS,
  SELECT_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/select.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  BasicSelectExample,
  CustomValueSelectExample,
  MultipleSelectExample,
  ObjectValueSelectExample,
} from './examples';
import { SELECT_API_ROWS } from './select.api-schema';
import { SELECT_API_DESCRIPTION, SELECT_IMPORT_TABS, SELECT_STATUS } from './select.docs-content';

@Component({
  selector: 'app-select-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicSelectExample,
    CodeTabs,
    CustomValueSelectExample,
    DocSection,
    LivePreview,
    MultipleSelectExample,
    ObjectValueSelectExample,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './select-page.html',
  styleUrl: './select-page.scss',
})
export class SelectPage {
  protected readonly status = SELECT_STATUS;
  protected readonly apiDescription = SELECT_API_DESCRIPTION;
  protected readonly defaults = SELECT_DEFAULTS;
  protected readonly colorTokenRows = SELECT_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = SELECT_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [SELECT_MESSAGES];
  protected readonly apiRows = SELECT_API_ROWS;

  protected readonly importTabs = SELECT_IMPORT_TABS;

  protected readonly basicTabs = SELECT_EXAMPLE_SOURCES['basic-select-example'];

  protected readonly multipleTabs = SELECT_EXAMPLE_SOURCES['multiple-select-example'];

  protected readonly objectTabs = SELECT_EXAMPLE_SOURCES['object-value-select-example'];

  protected readonly customValueTabs = SELECT_EXAMPLE_SOURCES['custom-value-select-example'];
}
