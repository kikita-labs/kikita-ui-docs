import { Component } from '@angular/core';

import { FIELD_EXAMPLE_SOURCES } from '@generated/example-sources/field.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BasicFieldExample } from './examples';
import { FIELD_API_ROWS } from './field.api-schema';
import { FIELD_API_DESCRIPTION, FIELD_IMPORT_TABS, FIELD_STATUS } from './field.docs-content';

@Component({
  selector: 'app-field-page',
  imports: [
    ApiTable,
    BasicFieldExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './field-page.html',
  styleUrl: './field-page.scss',
})
export class FieldPage {
  protected readonly status = FIELD_STATUS;
  protected readonly apiDescription = FIELD_API_DESCRIPTION;
  protected readonly apiRows = FIELD_API_ROWS;

  protected readonly importTabs = FIELD_IMPORT_TABS;

  protected readonly usageTabs = FIELD_EXAMPLE_SOURCES['basic-field-example'];
}
