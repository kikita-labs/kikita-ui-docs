import { Component } from '@angular/core';

import { FILE_UPLOAD_EXAMPLE_SOURCES } from '@generated/example-sources/file-upload.generated';
import {
  FILE_UPLOAD_COLOR_TOKEN_ROWS,
  FILE_UPLOAD_DEFAULTS,
  FILE_UPLOAD_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/file-upload.generated';
import { FILE_UPLOAD_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

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
    ProviderDefaultsSection,
    TokenTablesSection,
    MessagesSection,
    ApiTable,
    BasicFileUploadExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './file-upload-page.html',
  styleUrl: './file-upload-page.scss',
})
export class FileUploadPage {
  protected readonly status = FILE_UPLOAD_STATUS;
  protected readonly apiDescription = FILE_UPLOAD_API_DESCRIPTION;
  protected readonly defaults = FILE_UPLOAD_DEFAULTS;
  protected readonly colorTokenRows = FILE_UPLOAD_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = FILE_UPLOAD_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [FILE_UPLOAD_MESSAGES];
  protected readonly apiRows = FILE_UPLOAD_API_ROWS;
  protected readonly importTabs = FILE_UPLOAD_IMPORT_TABS;
  protected readonly basicTabs = FILE_UPLOAD_EXAMPLE_SOURCES['basic-file-upload-example'];
}
