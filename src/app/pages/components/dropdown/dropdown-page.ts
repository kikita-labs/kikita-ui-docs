import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { DROPDOWN_EXAMPLE_SOURCES } from '@generated/example-sources/dropdown.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { DROPDOWN_API_ROWS } from './dropdown.api-schema';
import {
  DROPDOWN_API_DESCRIPTION,
  DROPDOWN_IMPORT_TABS,
  DROPDOWN_STATUS,
} from './dropdown.docs-content';
import {
  FieldDropdownExample,
  PanelWidthDropdownExample,
  StandaloneDropdownExample,
} from './examples';

@Component({
  selector: 'app-dropdown-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    FieldDropdownExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    PanelWidthDropdownExample,
    RouterLink,
    StandaloneDropdownExample,
  ],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.scss',
})
export class DropdownPage {
  protected readonly status = DROPDOWN_STATUS;
  protected readonly apiDescription = DROPDOWN_API_DESCRIPTION;
  protected readonly apiRows = DROPDOWN_API_ROWS;

  protected readonly importTabs = DROPDOWN_IMPORT_TABS;

  protected readonly standaloneTabs = DROPDOWN_EXAMPLE_SOURCES['standalone-dropdown-example'];

  protected readonly fieldTabs = DROPDOWN_EXAMPLE_SOURCES['field-dropdown-example'];

  protected readonly panelWidthTabs = DROPDOWN_EXAMPLE_SOURCES['panel-width-dropdown-example'];
}
