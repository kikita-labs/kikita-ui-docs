import { Component } from '@angular/core';

import { TIME_PICKER_EXAMPLE_SOURCES } from '@generated/example-sources/time-picker.generated';
import { TIME_PICKER_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  TIME_PICKER_COLOR_TOKEN_ROWS,
  TIME_PICKER_DEFAULTS,
  TIME_PICKER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/time-picker.generated';
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
  BasicTimePickerExample,
  TimePickerFormatExample,
  TimePickerInlineExample,
  TimePickerLimitsExample,
} from './examples';
import { TIME_PICKER_API_ROWS } from './time-picker.api-schema';
import {
  TIME_PICKER_API_DESCRIPTION,
  TIME_PICKER_IMPORT_TABS,
  TIME_PICKER_STATUS,
} from './time-picker.docs-content';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    ApiTable,
    BasicTimePickerExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TimePickerFormatExample,
    TimePickerInlineExample,
    TimePickerLimitsExample,
    TokenTablesSection,
  ],
  templateUrl: './time-picker-page.html',
  styleUrl: './time-picker-page.scss',
})
export class TimePickerPage {
  protected readonly status = TIME_PICKER_STATUS;
  protected readonly apiDescription = TIME_PICKER_API_DESCRIPTION;
  protected readonly defaults = TIME_PICKER_DEFAULTS;
  protected readonly colorTokenRows = TIME_PICKER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = TIME_PICKER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [TIME_PICKER_MESSAGES];
  protected readonly apiRows = TIME_PICKER_API_ROWS;

  protected readonly importTabs = TIME_PICKER_IMPORT_TABS;

  protected readonly basicTabs = TIME_PICKER_EXAMPLE_SOURCES['basic-time-picker-example'];

  protected readonly formatTabs = TIME_PICKER_EXAMPLE_SOURCES['time-picker-format-example'];

  protected readonly limitsTabs = TIME_PICKER_EXAMPLE_SOURCES['time-picker-limits-example'];

  protected readonly inlineTabs = TIME_PICKER_EXAMPLE_SOURCES['time-picker-inline-example'];
}
