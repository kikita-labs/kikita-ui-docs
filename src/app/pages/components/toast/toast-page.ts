import { Component } from '@angular/core';

import { TOAST_EXAMPLE_SOURCES } from '@generated/example-sources/toast.generated';
import { TOAST_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  TOAST_COLOR_TOKEN_ROWS,
  TOAST_DEFAULTS,
  TOAST_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/toast.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { BasicToastExample, ToastActionExample, ToastPositionExample } from './examples';
import { TOAST_API_ROWS } from './toast.api-schema';
import { TOAST_API_DESCRIPTION, TOAST_IMPORT_TABS, TOAST_STATUS } from './toast.docs-content';

@Component({
  selector: 'app-toast-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicToastExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    ToastActionExample,
    ToastPositionExample,
  ],
  templateUrl: './toast-page.html',
  styleUrl: './toast-page.scss',
})
export class ToastPage {
  protected readonly status = TOAST_STATUS;
  protected readonly apiDescription = TOAST_API_DESCRIPTION;

  protected readonly importTabs = TOAST_IMPORT_TABS;

  protected readonly basicTabs = TOAST_EXAMPLE_SOURCES['basic-toast-example'];

  protected readonly lifecycleTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      filename: 'toast-lifecycle.ts',
      language: 'ts',
      code: `import { signal } from '@angular/core';

import { kuiToast } from '@kikita-labs/ui';

export class UploadComponent {
  private readonly toast = kuiToast();
  protected readonly persistent = signal(true);

  protected startUpload(): void {
    const ref = this.toast.open({
      title: 'Uploading...',
      message: 'This toast is controlled by a signal.',
      persistent: this.persistent,
    });

    // Start the configured auto-dismiss timer when the upload begins.
    this.persistent.set(false);

    // Update in place when an async operation completes.
    ref.update({ title: 'Uploaded', appearance: 'success', duration: 3000 });

    // Later, close one ref by id or every toast owned by this service.
    this.toast.dismiss(ref.id);
    this.toast.dismissAll();
  }
}`,
    },
  ];

  protected readonly actionTabs = TOAST_EXAMPLE_SOURCES['toast-action-example'];

  protected readonly positionTabs = TOAST_EXAMPLE_SOURCES['toast-position-example'];

  protected readonly defaults = TOAST_DEFAULTS;
  protected readonly colorTokenRows = TOAST_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = TOAST_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [TOAST_MESSAGES];
  protected readonly apiRows = TOAST_API_ROWS;
}
