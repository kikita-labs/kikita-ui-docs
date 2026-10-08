import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  DEFAULTS_DATA_ROWS,
  DEFAULTS_ICONS_TABS,
  DEFAULTS_LEVERS_ROWS,
  DEFAULTS_MIGRATE_ROWS,
  DEFAULTS_OTHER_ROWS,
  DEFAULTS_OVERLAYS_ROWS,
  DEFAULTS_REACTIVE_TABS,
  DEFAULTS_SET_TABS,
} from './defaults.docs-content';

@Component({
  selector: 'app-defaults-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './defaults-page.html',
  styleUrl: './defaults-page.scss',
})
export class DefaultsPage {
  protected readonly leversRows = DEFAULTS_LEVERS_ROWS;

  protected readonly setTabs = DEFAULTS_SET_TABS;

  protected readonly reactiveTabs = DEFAULTS_REACTIVE_TABS;

  protected readonly overlaysRows = DEFAULTS_OVERLAYS_ROWS;

  protected readonly dataRows = DEFAULTS_DATA_ROWS;

  protected readonly otherRows = DEFAULTS_OTHER_ROWS;

  protected readonly iconsTabs = DEFAULTS_ICONS_TABS;

  protected readonly migrateRows = DEFAULTS_MIGRATE_ROWS;
}
