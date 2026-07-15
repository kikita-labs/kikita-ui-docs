import { Component } from '@angular/core';

import { SEPARATOR_EXAMPLE_SOURCES } from '@generated/example-sources/separator.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import {
  BasicSeparatorExample,
  SeparatorAppearanceExample,
  SeparatorSpacingExample,
  SeparatorVerticalExample,
} from './examples';
import { SEPARATOR_API_ROWS } from './separator.api-schema';
import {
  SEPARATOR_API_DESCRIPTION,
  SEPARATOR_IMPORT_TABS,
  SEPARATOR_STATUS,
} from './separator.docs-content';

@Component({
  selector: 'app-separator-page',
  imports: [
    ApiTable,
    BasicSeparatorExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    SeparatorAppearanceExample,
    SeparatorSpacingExample,
    SeparatorVerticalExample,
  ],
  templateUrl: './separator-page.html',
  styleUrl: './separator-page.scss',
})
export class SeparatorPage {
  protected readonly status = SEPARATOR_STATUS;
  protected readonly apiDescription = SEPARATOR_API_DESCRIPTION;

  protected readonly importTabs = SEPARATOR_IMPORT_TABS;

  protected readonly basicTabs = SEPARATOR_EXAMPLE_SOURCES['basic-separator-example'];

  protected readonly appearanceTabs = SEPARATOR_EXAMPLE_SOURCES['separator-appearance-example'];

  protected readonly spacingTabs = SEPARATOR_EXAMPLE_SOURCES['separator-spacing-example'];

  protected readonly verticalTabs = SEPARATOR_EXAMPLE_SOURCES['separator-vertical-example'];

  protected readonly apiRows = SEPARATOR_API_ROWS;
}
