import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { STEPPER_EXAMPLE_SOURCES } from '@generated/example-sources/stepper.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

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
    ApiTable,
    BasicStepperExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './stepper-page.html',
  styleUrl: './stepper-page.scss',
})
export class StepperPage {
  protected readonly status = STEPPER_STATUS;
  protected readonly apiDescription = STEPPER_API_DESCRIPTION;
  protected readonly apiRows = STEPPER_API_ROWS;
  protected readonly importTabs = STEPPER_IMPORT_TABS;
  protected readonly basicTabs = STEPPER_EXAMPLE_SOURCES['basic-stepper-example'];
}
