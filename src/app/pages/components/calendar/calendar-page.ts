import { Component } from '@angular/core';

import { CALENDAR_EXAMPLE_SOURCES } from '@generated/example-sources/calendar.generated';
import {
  CALENDAR_COLOR_TOKEN_ROWS,
  CALENDAR_DEFAULTS,
  CALENDAR_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/calendar.generated';
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

import { CALENDAR_API_ROWS } from './calendar.api-schema';
import {
  CALENDAR_API_DESCRIPTION,
  CALENDAR_IMPORT_TABS,
  CALENDAR_LOCALE_TABS,
  CALENDAR_MIGRATION_TABS,
  CALENDAR_STATUS,
} from './calendar.docs-content';
import { BasicCalendarExample, CalendarLocaleExample, CalendarStatesExample } from './examples';

@Component({
  selector: 'app-calendar-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicCalendarExample,
    CalendarLocaleExample,
    CalendarStatesExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
})
export class CalendarPage {
  protected readonly status = CALENDAR_STATUS;
  protected readonly apiDescription = CALENDAR_API_DESCRIPTION;
  protected readonly defaults = CALENDAR_DEFAULTS;
  protected readonly colorTokenRows = CALENDAR_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = CALENDAR_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CALENDAR_MESSAGES];
  protected readonly apiRows = CALENDAR_API_ROWS;
  protected readonly importTabs = CALENDAR_IMPORT_TABS;
  protected readonly basicTabs = CALENDAR_EXAMPLE_SOURCES['basic-calendar-example'];
  protected readonly statesTabs = CALENDAR_EXAMPLE_SOURCES['calendar-states-example'];
  protected readonly localeExampleTabs = CALENDAR_EXAMPLE_SOURCES['calendar-locale-example'];
  protected readonly localeProviderTabs = CALENDAR_LOCALE_TABS;
  protected readonly migrationTabs = CALENDAR_MIGRATION_TABS;
}
