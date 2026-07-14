import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { FILE_UPLOAD_EXAMPLE_SOURCES } from '@generated/example-sources/file-upload.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { BasicFileUploadExample } from './examples';
import { FILE_UPLOAD_API_ROWS } from './file-upload.api-schema';
import {
  FILE_UPLOAD_API_DESCRIPTION,
  FILE_UPLOAD_IMPORT_TABS,
  FILE_UPLOAD_STATUS,
} from './file-upload.docs-content';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    ApiTable,
    BasicFileUploadExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './file-upload-page.html',
  styleUrl: './file-upload-page.scss',
})
export class FileUploadPage {
  protected readonly status = FILE_UPLOAD_STATUS;
  protected readonly apiDescription = FILE_UPLOAD_API_DESCRIPTION;
  protected readonly apiRows = FILE_UPLOAD_API_ROWS;
  protected readonly importTabs = FILE_UPLOAD_IMPORT_TABS;
  protected readonly basicTabs = FILE_UPLOAD_EXAMPLE_SOURCES['basic-file-upload-example'];
}
