import { Component } from '@angular/core';

import { DIALOG_EXAMPLE_SOURCES } from '@generated/example-sources/dialog.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import { DIALOG_API_ROWS } from './dialog.api-schema';
import { DIALOG_API_DESCRIPTION, DIALOG_IMPORT_TABS, DIALOG_STATUS } from './dialog.docs-content';
import { BasicDialogExample, DialogConfirmExample, DialogSizesExample } from './examples';

@Component({
  selector: 'app-dialog-page',
  imports: [
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

  protected readonly apiRows = DIALOG_API_ROWS;
}
