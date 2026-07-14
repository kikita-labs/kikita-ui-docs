import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { NUMBER_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/number-input.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  BasicNumberInputExample,
  CompactNumberInputExample,
  FieldNumberInputExample,
  RangeNumberInputExample,
} from './examples';
import { NUMBER_INPUT_API_ROWS } from './number-input.api-schema';
import {
  NUMBER_INPUT_API_DESCRIPTION,
  NUMBER_INPUT_IMPORT_TABS,
  NUMBER_INPUT_SIGNAL_FORMS_TABS,
  NUMBER_INPUT_STATUS,
} from './number-input.docs-content';

@Component({
  selector: 'app-number-input-page',
  imports: [
    ApiTable,
    BasicNumberInputExample,
    CodeTabs,
    CompactNumberInputExample,
    DocSection,
    FieldNumberInputExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RangeNumberInputExample,
    RouterLink,
  ],
  templateUrl: './number-input-page.html',
  styleUrl: './number-input-page.scss',
})
export class NumberInputPage {
  protected readonly status = NUMBER_INPUT_STATUS;
  protected readonly apiDescription = NUMBER_INPUT_API_DESCRIPTION;
  protected readonly apiRows = NUMBER_INPUT_API_ROWS;

  protected readonly importTabs = NUMBER_INPUT_IMPORT_TABS;

  protected readonly basicTabs = NUMBER_INPUT_EXAMPLE_SOURCES['basic-number-input-example'];

  protected readonly compactTabs = NUMBER_INPUT_EXAMPLE_SOURCES['compact-number-input-example'];

  protected readonly rangeTabs = NUMBER_INPUT_EXAMPLE_SOURCES['range-number-input-example'];

  protected readonly fieldTabs = NUMBER_INPUT_EXAMPLE_SOURCES['field-number-input-example'];

  protected readonly signalFormsTabs = NUMBER_INPUT_SIGNAL_FORMS_TABS;
}
