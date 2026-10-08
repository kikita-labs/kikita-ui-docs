import { Component } from '@angular/core';

import { SWITCH_EXAMPLE_SOURCES } from '@generated/example-sources/switch.generated';
import { SWITCH_DEFAULTS } from '@generated/library-tables/switch.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';

import { BasicSwitchExample, SwitchSizeExample } from './examples';
import { SWITCH_API_ROWS } from './switch.api-schema';
import { SWITCH_API_DESCRIPTION, SWITCH_IMPORT_TABS, SWITCH_STATUS } from './switch.docs-content';

@Component({
  selector: 'app-switch-page',
  imports: [
    ProviderDefaultsSection,
    ApiTable,
    BasicSwitchExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    SwitchSizeExample,
  ],
  templateUrl: './switch-page.html',
  styleUrl: './switch-page.scss',
})
export class SwitchPage {
  protected readonly status = SWITCH_STATUS;
  protected readonly apiDescription = SWITCH_API_DESCRIPTION;
  protected readonly defaults = SWITCH_DEFAULTS;
  protected readonly apiRows = SWITCH_API_ROWS;
  protected readonly importTabs = SWITCH_IMPORT_TABS;

  protected readonly basicTabs = SWITCH_EXAMPLE_SOURCES['basic-switch-example'];

  protected readonly sizeTabs = SWITCH_EXAMPLE_SOURCES['switch-size-example'];
}
