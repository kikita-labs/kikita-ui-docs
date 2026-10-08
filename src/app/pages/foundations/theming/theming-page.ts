import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  THEMING_COLOUR_ROLE_ROWS,
  THEMING_CONTRACT_TABS,
  THEMING_CONTRAST_TABS,
  THEMING_OVERRIDE_ROWS,
  THEMING_OVERRIDE_TABS,
  THEMING_PROVIDER_TABS,
  THEMING_SEED_TABS,
  THEMING_SHARED_TOKEN_TABS,
  THEMING_UTILITY_ROWS,
} from './theming.docs-content';

@Component({
  selector: 'app-theming-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './theming-page.html',
  styleUrl: './theming-page.scss',
})
export class ThemingPage {
  protected readonly contractTabs = THEMING_CONTRACT_TABS;
  protected readonly providerTabs = THEMING_PROVIDER_TABS;
  protected readonly seedTabs = THEMING_SEED_TABS;
  protected readonly utilityRows = THEMING_UTILITY_ROWS;
  protected readonly overrideRows = THEMING_OVERRIDE_ROWS;
  protected readonly overrideTabs = THEMING_OVERRIDE_TABS;
  protected readonly contrastTabs = THEMING_CONTRAST_TABS;
  protected readonly sharedTokenTabs = THEMING_SHARED_TOKEN_TABS;
  protected readonly colourRoleRows = THEMING_COLOUR_ROLE_ROWS;
}
