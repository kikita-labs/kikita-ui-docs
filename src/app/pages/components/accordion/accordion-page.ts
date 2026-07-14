import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { ACCORDION_EXAMPLE_SOURCES } from '@generated/example-sources/accordion.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { ACCORDION_API_ROWS } from './accordion.api-schema';
import {
  ACCORDION_API_DESCRIPTION,
  ACCORDION_IMPORT_TABS,
  ACCORDION_STATUS,
} from './accordion.docs-content';
import {
  AppearanceAccordionExample,
  BasicAccordionExample,
  IconAccordionExample,
  MultiAccordionExample,
} from './examples';

@Component({
  selector: 'app-accordion-page',
  imports: [
    ApiTable,
    AppearanceAccordionExample,
    BasicAccordionExample,
    CodeTabs,
    DocSection,
    IconAccordionExample,
    KuiButtonDirective,
    LivePreview,
    MultiAccordionExample,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.scss',
})
export class AccordionPage {
  protected readonly status = ACCORDION_STATUS;
  protected readonly apiDescription = ACCORDION_API_DESCRIPTION;
  protected readonly apiRows = ACCORDION_API_ROWS;

  protected readonly importTabs = ACCORDION_IMPORT_TABS;

  protected readonly basicTabs = ACCORDION_EXAMPLE_SOURCES['basic-accordion-example'];

  protected readonly multiTabs = ACCORDION_EXAMPLE_SOURCES['multi-accordion-example'];

  protected readonly appearanceTabs = ACCORDION_EXAMPLE_SOURCES['appearance-accordion-example'];

  protected readonly iconTabs = ACCORDION_EXAMPLE_SOURCES['icon-accordion-example'];
}
