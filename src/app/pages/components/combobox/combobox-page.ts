import { Component } from '@angular/core';

import { COMBOBOX_EXAMPLE_SOURCES } from '@generated/example-sources/combobox.generated';
import {
  COMBOBOX_COLOR_TOKEN_ROWS,
  COMBOBOX_DEFAULTS,
  COMBOBOX_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/combobox.generated';
import { COMBOBOX_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { COMBOBOX_API_ROWS } from './combobox.api-schema';
import {
  COMBOBOX_API_DESCRIPTION,
  COMBOBOX_IMPORT_TABS,
  COMBOBOX_STATUS,
} from './combobox.docs-content';
import {
  AsyncComboboxExample,
  BasicComboboxExample,
  ComboboxFieldStatesExample,
  FreeComboboxExample,
} from './examples';

@Component({
  selector: 'app-combobox-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    AsyncComboboxExample,
    BasicComboboxExample,
    CodeTabs,
    ComboboxFieldStatesExample,
    DocSection,
    FreeComboboxExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './combobox-page.html',
  styleUrl: './combobox-page.scss',
})
export class ComboboxPage {
  protected readonly status = COMBOBOX_STATUS;
  protected readonly apiDescription = COMBOBOX_API_DESCRIPTION;
  protected readonly defaults = COMBOBOX_DEFAULTS;
  protected readonly colorTokenRows = COMBOBOX_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = COMBOBOX_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [COMBOBOX_MESSAGES];
  protected readonly apiRows = COMBOBOX_API_ROWS;

  protected readonly importTabs = COMBOBOX_IMPORT_TABS;

  protected readonly basicTabs = COMBOBOX_EXAMPLE_SOURCES['basic-combobox-example'];

  protected readonly asyncTabs = COMBOBOX_EXAMPLE_SOURCES['async-combobox-example'];

  protected readonly freeTabs = COMBOBOX_EXAMPLE_SOURCES['free-combobox-example'];

  protected readonly fieldStatesTabs = COMBOBOX_EXAMPLE_SOURCES['combobox-field-states-example'];
}
