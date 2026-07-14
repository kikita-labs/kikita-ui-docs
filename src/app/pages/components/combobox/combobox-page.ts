import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { COMBOBOX_EXAMPLE_SOURCES } from '@generated/example-sources/combobox.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { COMBOBOX_API_ROWS } from './combobox.api-schema';
import {
  COMBOBOX_API_DESCRIPTION,
  COMBOBOX_IMPORT_TABS,
  COMBOBOX_PROVIDER_TABS,
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
    ApiTable,
    AsyncComboboxExample,
    BasicComboboxExample,
    CodeTabs,
    ComboboxFieldStatesExample,
    DocSection,
    FreeComboboxExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './combobox-page.html',
  styleUrl: './combobox-page.scss',
})
export class ComboboxPage {
  protected readonly status = COMBOBOX_STATUS;
  protected readonly apiDescription = COMBOBOX_API_DESCRIPTION;
  protected readonly apiRows = COMBOBOX_API_ROWS;

  protected readonly importTabs = COMBOBOX_IMPORT_TABS;

  protected readonly basicTabs = COMBOBOX_EXAMPLE_SOURCES['basic-combobox-example'];

  protected readonly asyncTabs = COMBOBOX_EXAMPLE_SOURCES['async-combobox-example'];

  protected readonly freeTabs = COMBOBOX_EXAMPLE_SOURCES['free-combobox-example'];

  protected readonly fieldStatesTabs = COMBOBOX_EXAMPLE_SOURCES['combobox-field-states-example'];

  protected readonly providerTabs = COMBOBOX_PROVIDER_TABS;
}
