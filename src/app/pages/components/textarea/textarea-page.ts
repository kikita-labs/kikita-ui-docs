import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { TEXTAREA_EXAMPLE_SOURCES } from '@generated/example-sources/textarea.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicTextareaExample, TextareaInvalidExample, TextareaSizeExample } from './examples';
import { TEXTAREA_API_ROWS } from './textarea.api-schema';
import {
  TEXTAREA_API_DESCRIPTION,
  TEXTAREA_IMPORT_TABS,
  TEXTAREA_SIGNAL_FORMS_TABS,
  TEXTAREA_STATUS,
} from './textarea.docs-content';

@Component({
  selector: 'app-textarea-page',
  imports: [
    ApiTable,
    BasicTextareaExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    TextareaInvalidExample,
    TextareaSizeExample,
  ],
  templateUrl: './textarea-page.html',
  styleUrl: './textarea-page.scss',
})
export class TextareaPage {
  protected readonly status = TEXTAREA_STATUS;
  protected readonly apiDescription = TEXTAREA_API_DESCRIPTION;
  protected readonly apiRows = TEXTAREA_API_ROWS;
  protected readonly importTabs = TEXTAREA_IMPORT_TABS;

  protected readonly basicTabs = TEXTAREA_EXAMPLE_SOURCES['basic-textarea-example'];

  protected readonly sizeTabs = TEXTAREA_EXAMPLE_SOURCES['textarea-size-example'];

  protected readonly invalidTabs = TEXTAREA_EXAMPLE_SOURCES['textarea-invalid-example'];

  protected readonly signalFormsTabs = TEXTAREA_SIGNAL_FORMS_TABS;
}
