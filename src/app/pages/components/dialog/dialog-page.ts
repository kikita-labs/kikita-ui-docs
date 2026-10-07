import { Component } from '@angular/core';

import { DIALOG_EXAMPLE_SOURCES } from '@generated/example-sources/dialog.generated';
import {
  DIALOG_COLOR_TOKEN_ROWS,
  DIALOG_DEFAULTS,
  DIALOG_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/dialog.generated';
import { DIALOG_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { DIALOG_API_ROWS } from './dialog.api-schema';
import { DIALOG_API_DESCRIPTION, DIALOG_IMPORT_TABS, DIALOG_STATUS } from './dialog.docs-content';
import { BasicDialogExample, DialogConfirmExample, DialogSizesExample } from './examples';

@Component({
  selector: 'app-dialog-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicDialogExample,
    CodeTabs,
    DialogConfirmExample,
    DialogSizesExample,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './dialog-page.html',
  styleUrl: './dialog-page.scss',
})
export class DialogPage {
  protected readonly status = DIALOG_STATUS;
  protected readonly apiDescription = DIALOG_API_DESCRIPTION;

  protected readonly importTabs = DIALOG_IMPORT_TABS;

  protected readonly basicTabs = DIALOG_EXAMPLE_SOURCES['basic-dialog-example'];

  protected readonly sizesTabs = DIALOG_EXAMPLE_SOURCES['dialog-sizes-example'];

  protected readonly confirmTabs = DIALOG_EXAMPLE_SOURCES['dialog-confirm-example'];

  protected readonly defaults = DIALOG_DEFAULTS;
  protected readonly colorTokenRows = DIALOG_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = DIALOG_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [DIALOG_MESSAGES];
  protected readonly apiRows = DIALOG_API_ROWS;
}
