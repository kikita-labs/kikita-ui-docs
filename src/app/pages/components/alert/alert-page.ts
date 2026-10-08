import { Component } from '@angular/core';

import { ALERT_EXAMPLE_SOURCES } from '@generated/example-sources/alert.generated';
import {
  ALERT_DEFAULTS,
  ALERT_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/alert.generated';
import { ALERT_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { ALERT_API_ROWS } from './alert.api-schema';
import { ALERT_API_DESCRIPTION, ALERT_IMPORT_TABS, ALERT_STATUS } from './alert.docs-content';
import {
  AlertActionExample,
  AlertBannerExample,
  AlertCustomContentExample,
  AlertShapeExample,
  BasicAlertExample,
} from './examples';

@Component({
  selector: 'app-alert-page',
  imports: [
    AlertActionExample,
    AlertBannerExample,
    AlertCustomContentExample,
    AlertShapeExample,
    ApiTable,
    BasicAlertExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './alert-page.html',
  styleUrl: './alert-page.scss',
})
export class AlertPage {
  protected readonly status = ALERT_STATUS;
  protected readonly apiDescription = ALERT_API_DESCRIPTION;
  protected readonly defaults = ALERT_DEFAULTS;
  protected readonly geometryTokenRows = ALERT_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [ALERT_MESSAGES];
  protected readonly apiRows = ALERT_API_ROWS;

  protected readonly importTabs = ALERT_IMPORT_TABS;

  protected readonly basicTabs = ALERT_EXAMPLE_SOURCES['basic-alert-example'];

  protected readonly shapeTabs = ALERT_EXAMPLE_SOURCES['alert-shape-example'];

  protected readonly actionTabs = ALERT_EXAMPLE_SOURCES['alert-action-example'];

  protected readonly customTabs = ALERT_EXAMPLE_SOURCES['alert-custom-content-example'];

  protected readonly bannerTabs = ALERT_EXAMPLE_SOURCES['alert-banner-example'];
}
