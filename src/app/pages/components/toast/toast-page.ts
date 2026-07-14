import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { TOAST_EXAMPLE_SOURCES } from '@generated/example-sources/toast.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicToastExample, ToastActionExample, ToastPositionExample } from './examples';
import { TOAST_API_ROWS } from './toast.api-schema';
import { TOAST_API_DESCRIPTION, TOAST_IMPORT_TABS, TOAST_STATUS } from './toast.docs-content';

@Component({
  selector: 'app-toast-page',
  imports: [
    ApiTable,
    BasicToastExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
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

  protected readonly actionTabs = TOAST_EXAMPLE_SOURCES['toast-action-example'];

  protected readonly positionTabs = TOAST_EXAMPLE_SOURCES['toast-position-example'];

  protected readonly globalDefaultsTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      filename: 'app.config.ts',
      language: 'ts',
      code: `export const appConfig: ApplicationConfig = {
  providers: [
    provideKuiToastOptions({
      position: 'top-end',
      duration: 4000,
      maxVisible: 5,
    }),
  ],
};`,
    },
  ];

  protected readonly apiRows = TOAST_API_ROWS;
}
