import { Component } from '@angular/core';

import { CALENDAR_EXAMPLE_SOURCES } from '@generated/example-sources/calendar.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { CALENDAR_API_ROWS } from './calendar.api-schema';
import {
  CALENDAR_API_DESCRIPTION,
  CALENDAR_IMPORT_TABS,
  CALENDAR_STATUS,
} from './calendar.docs-content';
import { BasicCalendarExample } from './examples';

@Component({
  selector: 'app-calendar-page',
  imports: [
    ApiTable,
    BasicCalendarExample,
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
  protected readonly apiRows = CALENDAR_API_ROWS;
  protected readonly importTabs = CALENDAR_IMPORT_TABS;
  protected readonly basicTabs = CALENDAR_EXAMPLE_SOURCES['basic-calendar-example'];
}
