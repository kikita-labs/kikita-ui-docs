import { Component } from '@angular/core';

import { GROUP_EXAMPLE_SOURCES } from '@generated/example-sources/group.generated';
import { GROUP_DEFAULTS } from '@generated/library-tables/group.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';

import {
  BasicGroupExample,
  GroupFieldExample,
  GroupOrientationExample,
  GroupSizeExample,
} from './examples';
import { GROUP_API_ROWS } from './group.api-schema';
import { GROUP_API_DESCRIPTION, GROUP_IMPORT_TABS, GROUP_STATUS } from './group.docs-content';

@Component({
  selector: 'app-group-page',
  imports: [
    ProviderDefaultsSection,
    ApiTable,
    BasicGroupExample,
    CodeTabs,
    DocSection,
    GroupFieldExample,
    GroupOrientationExample,
    GroupSizeExample,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './group-page.html',
  styleUrl: './group-page.scss',
})
export class GroupPage {
  protected readonly status = GROUP_STATUS;
  protected readonly apiDescription = GROUP_API_DESCRIPTION;

  protected readonly importTabs = GROUP_IMPORT_TABS;

  protected readonly basicTabs = GROUP_EXAMPLE_SOURCES['basic-group-example'];

  protected readonly orientationTabs = GROUP_EXAMPLE_SOURCES['group-orientation-example'];

  protected readonly sizeTabs = GROUP_EXAMPLE_SOURCES['group-size-example'];

  protected readonly fieldTabs = GROUP_EXAMPLE_SOURCES['group-field-example'];

  protected readonly defaults = GROUP_DEFAULTS;
  protected readonly apiRows = GROUP_API_ROWS;
}
