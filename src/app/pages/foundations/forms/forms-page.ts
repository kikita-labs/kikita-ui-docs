import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  FORMS_COMPONENT_TABS,
  FORMS_CUSTOM_TABS,
  FORMS_MODEL_TABS,
  FORMS_PATTERN_TABS,
} from './forms.docs-content';

@Component({
  selector: 'app-forms-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './forms-page.html',
  styleUrl: './forms-page.scss',
})
export class FormsPage {
  protected readonly modelTabs = FORMS_MODEL_TABS;

  protected readonly patternTabs = FORMS_PATTERN_TABS;

  protected readonly customTabs = FORMS_CUSTOM_TABS;

  protected readonly componentTabs = FORMS_COMPONENT_TABS;
}
