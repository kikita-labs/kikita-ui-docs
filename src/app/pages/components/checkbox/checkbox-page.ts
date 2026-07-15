import { Component } from '@angular/core';

import { CHECKBOX_EXAMPLE_SOURCES } from '@generated/example-sources/checkbox.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { CHECKBOX_API_ROWS } from './checkbox.api-schema';
import {
  CHECKBOX_API_DESCRIPTION,
  CHECKBOX_IMPORT_TABS,
  CHECKBOX_STATUS,
} from './checkbox.docs-content';
import { BasicCheckboxExample, CheckboxSizeExample } from './examples';

@Component({
  selector: 'app-checkbox-page',
  imports: [
    ApiTable,
    BasicCheckboxExample,
    CheckboxSizeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './checkbox-page.html',
  styleUrl: './checkbox-page.scss',
})
export class CheckboxPage {
  protected readonly status = CHECKBOX_STATUS;
  protected readonly apiDescription = CHECKBOX_API_DESCRIPTION;
  protected readonly apiRows = CHECKBOX_API_ROWS;
  protected readonly importTabs = CHECKBOX_IMPORT_TABS;

  protected readonly basicTabs = CHECKBOX_EXAMPLE_SOURCES['basic-checkbox-example'];

  protected readonly sizeTabs = CHECKBOX_EXAMPLE_SOURCES['checkbox-size-example'];
}
