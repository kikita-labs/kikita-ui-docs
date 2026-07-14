import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/input.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicInputExample, InputGroupExample } from './examples';
import { INPUT_API_ROWS } from './input.api-schema';
import { INPUT_API_DESCRIPTION, INPUT_IMPORT_TABS, INPUT_STATUS } from './input.docs-content';

@Component({
  selector: 'app-input-page',
  imports: [
    ApiTable,
    BasicInputExample,
    CodeTabs,
    DocSection,
    InputGroupExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './input-page.html',
  styleUrl: './input-page.scss',
})
export class InputPage {
  protected readonly status = INPUT_STATUS;
  protected readonly apiDescription = INPUT_API_DESCRIPTION;
  protected readonly inputRows = INPUT_API_ROWS;
  protected readonly importTabs = INPUT_IMPORT_TABS;

  protected readonly basicTabs = INPUT_EXAMPLE_SOURCES['basic-input-example'];

  protected readonly groupTabs = INPUT_EXAMPLE_SOURCES['input-group-example'];
}
