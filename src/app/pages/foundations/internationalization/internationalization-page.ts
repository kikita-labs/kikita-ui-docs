import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  INTERNATIONALIZATION_AREAS_ROWS,
  INTERNATIONALIZATION_HELPERS_ROWS,
  INTERNATIONALIZATION_PLURAL_TABS,
  INTERNATIONALIZATION_QUICK_TABS,
  INTERNATIONALIZATION_REFERENCE_ROWS,
  INTERNATIONALIZATION_RUNTIME_TABS,
  INTERNATIONALIZATION_SETTINGS_ROWS,
  INTERNATIONALIZATION_SUBTREE_TABS,
} from './internationalization.docs-content';

@Component({
  selector: 'app-internationalization-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './internationalization-page.html',
  styleUrl: './internationalization-page.scss',
})
export class InternationalizationPage {
  protected readonly settingsRows = INTERNATIONALIZATION_SETTINGS_ROWS;

  protected readonly quickTabs = INTERNATIONALIZATION_QUICK_TABS;

  protected readonly runtimeTabs = INTERNATIONALIZATION_RUNTIME_TABS;

  protected readonly subtreeTabs = INTERNATIONALIZATION_SUBTREE_TABS;

  protected readonly helpersRows = INTERNATIONALIZATION_HELPERS_ROWS;

  protected readonly pluralTabs = INTERNATIONALIZATION_PLURAL_TABS;

  protected readonly areasRows = INTERNATIONALIZATION_AREAS_ROWS;

  protected readonly referenceRows = INTERNATIONALIZATION_REFERENCE_ROWS;
}
