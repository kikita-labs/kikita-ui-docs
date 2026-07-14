import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { DATE_PICKER_EXAMPLE_SOURCES } from '@generated/example-sources/date-picker.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { DATE_PICKER_API_ROWS } from './date-picker.api-schema';
import {
  DATE_PICKER_API_DESCRIPTION,
  DATE_PICKER_IMPORT_TABS,
  DATE_PICKER_STATUS,
} from './date-picker.docs-content';
import { BasicDatePickerExample } from './examples';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    ApiTable,
    BasicDatePickerExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './date-picker-page.html',
  styleUrl: './date-picker-page.scss',
})
export class DatePickerPage {
  protected readonly status = DATE_PICKER_STATUS;
  protected readonly apiDescription = DATE_PICKER_API_DESCRIPTION;
  protected readonly apiRows = DATE_PICKER_API_ROWS;
  protected readonly importTabs = DATE_PICKER_IMPORT_TABS;
  protected readonly basicTabs = DATE_PICKER_EXAMPLE_SOURCES['basic-date-picker-example'];
}
