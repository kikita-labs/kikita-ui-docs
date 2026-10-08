import { Component } from '@angular/core';

import { STEPPER_EXAMPLE_SOURCES } from '@generated/example-sources/stepper.generated';
import { STEPPER_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  STEPPER_COLOR_TOKEN_ROWS,
  STEPPER_DEFAULTS,
  STEPPER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/stepper.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { BasicStepperExample } from './examples';
import { STEPPER_API_ROWS } from './stepper.api-schema';
import {
  STEPPER_API_DESCRIPTION,
  STEPPER_IMPORT_TABS,
  STEPPER_STATUS,
} from './stepper.docs-content';

@Component({
  selector: 'app-stepper-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicStepperExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './stepper-page.html',
  styleUrl: './stepper-page.scss',
})
export class StepperPage {
  protected readonly status = STEPPER_STATUS;
  protected readonly apiDescription = STEPPER_API_DESCRIPTION;
  protected readonly defaults = STEPPER_DEFAULTS;
  protected readonly colorTokenRows = STEPPER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = STEPPER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [STEPPER_MESSAGES];
  protected readonly apiRows = STEPPER_API_ROWS;
  protected readonly importTabs = STEPPER_IMPORT_TABS;
  protected readonly basicTabs = STEPPER_EXAMPLE_SOURCES['basic-stepper-example'];
}
