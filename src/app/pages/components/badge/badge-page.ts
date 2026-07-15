import { Component } from '@angular/core';

import { BADGE_EXAMPLE_SOURCES } from '@generated/example-sources/badge.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { BADGE_API_ROWS } from './badge.api-schema';
import { BADGE_API_DESCRIPTION, BADGE_IMPORT_TABS, BADGE_STATUS } from './badge.docs-content';
import { BadgeAppearanceExample, BadgeSizeExample, BasicBadgeExample } from './examples';

@Component({
  selector: 'app-badge-page',
  imports: [
    ApiTable,
    BadgeAppearanceExample,
    BadgeSizeExample,
    BasicBadgeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './badge-page.html',
  styleUrl: './badge-page.scss',
})
export class BadgePage {
  protected readonly status = BADGE_STATUS;
  protected readonly apiDescription = BADGE_API_DESCRIPTION;
  protected readonly importTabs = BADGE_IMPORT_TABS;

  protected readonly basicTabs = BADGE_EXAMPLE_SOURCES['basic-badge-example'];

  protected readonly appearanceTabs = BADGE_EXAMPLE_SOURCES['badge-appearance-example'];

  protected readonly sizeTabs = BADGE_EXAMPLE_SOURCES['badge-size-example'];

  protected readonly apiRows = BADGE_API_ROWS;
}
