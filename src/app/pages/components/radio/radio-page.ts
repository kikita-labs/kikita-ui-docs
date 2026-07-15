import { Component } from '@angular/core';

import { RADIO_EXAMPLE_SOURCES } from '@generated/example-sources/radio.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import {
  BasicRadioExample,
  RadioDisabledExample,
  RadioInvalidExample,
  RadioSizeExample,
} from './examples';
import { RADIO_API_ROWS } from './radio.api-schema';
import {
  RADIO_API_DESCRIPTION,
  RADIO_IMPORT_TABS,
  RADIO_SIGNAL_FORMS_TABS,
  RADIO_STATUS,
} from './radio.docs-content';

@Component({
  selector: 'app-radio-page',
  imports: [
    ApiTable,
    BasicRadioExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    RadioDisabledExample,
    RadioInvalidExample,
    RadioSizeExample,
  ],
  templateUrl: './radio-page.html',
  styleUrl: './radio-page.scss',
})
export class RadioPage {
  protected readonly status = RADIO_STATUS;
  protected readonly apiDescription = RADIO_API_DESCRIPTION;
  protected readonly apiRows = RADIO_API_ROWS;
  protected readonly importTabs = RADIO_IMPORT_TABS;

  protected readonly basicTabs = RADIO_EXAMPLE_SOURCES['basic-radio-example'];

  protected readonly signalFormsTabs = RADIO_SIGNAL_FORMS_TABS;

  protected readonly sizeTabs = RADIO_EXAMPLE_SOURCES['radio-size-example'];

  protected readonly disabledTabs = RADIO_EXAMPLE_SOURCES['radio-disabled-example'];

  protected readonly invalidTabs = RADIO_EXAMPLE_SOURCES['radio-invalid-example'];
}
