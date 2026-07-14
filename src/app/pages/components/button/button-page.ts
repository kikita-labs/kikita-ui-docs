import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { BUTTON_EXAMPLE_SOURCES } from '@generated/example-sources/button.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BUTTON_API_ROWS } from './button.api-schema';
import { BUTTON_API_DESCRIPTION, BUTTON_IMPORT_TABS, BUTTON_STATUS } from './button.docs-content';
import { BasicButtonExample, ButtonAppearanceExample, ButtonSizeExample } from './examples';

@Component({
  selector: 'app-button-page',
  imports: [
    ApiTable,
    BasicButtonExample,
    ButtonAppearanceExample,
    ButtonSizeExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
})
export class ButtonPage {
  protected readonly status = BUTTON_STATUS;
  protected readonly apiDescription = BUTTON_API_DESCRIPTION;
  protected readonly importTabs = BUTTON_IMPORT_TABS;

  protected readonly basicTabs = BUTTON_EXAMPLE_SOURCES['basic-button-example'];
  protected readonly appearanceTabs = BUTTON_EXAMPLE_SOURCES['button-appearance-example'];
  protected readonly sizeTabs = BUTTON_EXAMPLE_SOURCES['button-size-example'];

  protected readonly apiRows = BUTTON_API_ROWS;
}
