import { Component } from '@angular/core';

import { DATE_PICKER_EXAMPLE_SOURCES } from '@generated/example-sources/date-picker.generated';
import {
  DATE_PICKER_COLOR_TOKEN_ROWS,
  DATE_PICKER_DEFAULTS,
  DATE_PICKER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/date-picker.generated';
import { DATE_PICKER_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { DATE_PICKER_API_ROWS } from './date-picker.api-schema';
import {
  DATE_PICKER_API_DESCRIPTION,
  DATE_PICKER_IMPORT_TABS,
  DATE_PICKER_MANUAL_TABS,
  DATE_PICKER_STATUS,
} from './date-picker.docs-content';
import { BasicDatePickerExample, DatePickerFormatExample } from './examples';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicDatePickerExample,
    DatePickerFormatExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './date-picker-page.html',
  styleUrl: './date-picker-page.scss',
})
export class DatePickerPage {
  protected readonly status = DATE_PICKER_STATUS;
  protected readonly apiDescription = DATE_PICKER_API_DESCRIPTION;
  protected readonly defaults = DATE_PICKER_DEFAULTS;
  protected readonly colorTokenRows = DATE_PICKER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = DATE_PICKER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [DATE_PICKER_MESSAGES];
  protected readonly apiRows = DATE_PICKER_API_ROWS;
  protected readonly importTabs = DATE_PICKER_IMPORT_TABS;
  protected readonly basicTabs = DATE_PICKER_EXAMPLE_SOURCES['basic-date-picker-example'];
  protected readonly formatTabs = DATE_PICKER_EXAMPLE_SOURCES['date-picker-format-example'];
  protected readonly manualTabs = DATE_PICKER_MANUAL_TABS;
}
