import { Component } from '@angular/core';

import { LINK_EXAMPLE_SOURCES } from '@generated/example-sources/link.generated';
import { LINK_DEFAULTS } from '@generated/library-tables/link.generated';
import { LINK_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';

import {
  BasicLinkExample,
  LinkActionsExample,
  LinkIconsExample,
  LinkUnderlineExample,
} from './examples';
import { LINK_API_ROWS } from './link.api-schema';
import { LINK_API_DESCRIPTION, LINK_IMPORT_TABS, LINK_STATUS } from './link.docs-content';

@Component({
  selector: 'app-link-page',
  imports: [
    ApiTable,
    BasicLinkExample,
    CodeTabs,
    DocSection,
    LinkActionsExample,
    LinkIconsExample,
    LinkUnderlineExample,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
  ],
  templateUrl: './link-page.html',
  styleUrl: './link-page.scss',
})
export class LinkPage {
  protected readonly status = LINK_STATUS;
  protected readonly apiDescription = LINK_API_DESCRIPTION;
  protected readonly defaults = LINK_DEFAULTS;
  protected readonly messageGroups = [LINK_MESSAGES];
  protected readonly apiRows = LINK_API_ROWS;

  protected readonly importTabs = LINK_IMPORT_TABS;

  protected readonly basicTabs = LINK_EXAMPLE_SOURCES['basic-link-example'];

  protected readonly underlineTabs = LINK_EXAMPLE_SOURCES['link-underline-example'];

  protected readonly iconsTabs = LINK_EXAMPLE_SOURCES['link-icons-example'];

  protected readonly actionsTabs = LINK_EXAMPLE_SOURCES['link-actions-example'];
}
