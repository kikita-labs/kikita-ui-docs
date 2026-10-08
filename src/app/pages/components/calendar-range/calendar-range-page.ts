import { Component } from '@angular/core';

import { CALENDAR_RANGE_EXAMPLE_SOURCES } from '@generated/example-sources/calendar-range.generated';
import {
  CALENDAR_COLOR_TOKEN_ROWS,
  CALENDAR_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/calendar.generated';
import { CALENDAR_RANGE_DEFAULTS } from '@generated/library-tables/calendar-range.generated';
import { CALENDAR_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { CALENDAR_RANGE_API_ROWS } from './calendar-range.api-schema';
import {
  CALENDAR_RANGE_API_DESCRIPTION,
  CALENDAR_RANGE_IMPORT_TABS,
  CALENDAR_RANGE_STATUS,
} from './calendar-range.docs-content';
import {
  BasicCalendarRangeExample,
  CalendarRangeFooterExample,
  CalendarRangeLinkedExample,
  CalendarRangeLocaleExample,
  CalendarRangeStatesExample,
} from './examples';

@Component({
  selector: 'app-calendar-range-page',
  imports: [
    ApiTable,
    BasicCalendarRangeExample,
    CalendarRangeFooterExample,
    CalendarRangeLinkedExample,
    CalendarRangeLocaleExample,
    CalendarRangeStatesExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './calendar-range-page.html',
  styleUrl: './calendar-range-page.scss',
})
export class CalendarRangePage {
  protected readonly status = CALENDAR_RANGE_STATUS;
  protected readonly apiDescription = CALENDAR_RANGE_API_DESCRIPTION;
  protected readonly defaults = CALENDAR_RANGE_DEFAULTS;
  protected readonly colorTokenRows = CALENDAR_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = CALENDAR_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CALENDAR_MESSAGES];
  protected readonly apiRows = CALENDAR_RANGE_API_ROWS;

  protected readonly importTabs = CALENDAR_RANGE_IMPORT_TABS;

  protected readonly basicTabs = CALENDAR_RANGE_EXAMPLE_SOURCES['basic-calendar-range-example'];

  protected readonly statesTabs = CALENDAR_RANGE_EXAMPLE_SOURCES['calendar-range-states-example'];

  protected readonly linkedTabs = CALENDAR_RANGE_EXAMPLE_SOURCES['calendar-range-linked-example'];

  protected readonly localeTabs = CALENDAR_RANGE_EXAMPLE_SOURCES['calendar-range-locale-example'];

  protected readonly footerTabs = CALENDAR_RANGE_EXAMPLE_SOURCES['calendar-range-footer-example'];
}
