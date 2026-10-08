import { Component } from '@angular/core';

import { MEDIA_VIEWER_EXAMPLE_SOURCES } from '@generated/example-sources/media-viewer.generated';
import {
  MEDIA_VIEWER_COLOR_TOKEN_ROWS,
  MEDIA_VIEWER_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/media-viewer.generated';
import { MEDIA_VIEWER_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  BasicMediaViewerExample,
  MediaViewerSelectExample,
  MediaViewerSingleExample,
} from './examples';
import { MEDIA_VIEWER_API_ROWS } from './media-viewer.api-schema';
import {
  MEDIA_VIEWER_API_DESCRIPTION,
  MEDIA_VIEWER_IMPORT_TABS,
  MEDIA_VIEWER_STATUS,
} from './media-viewer.docs-content';

@Component({
  selector: 'app-media-viewer-page',
  imports: [
    ApiTable,
    BasicMediaViewerExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MediaViewerSelectExample,
    MediaViewerSingleExample,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    TokenTablesSection,
  ],
  templateUrl: './media-viewer-page.html',
  styleUrl: './media-viewer-page.scss',
})
export class MediaViewerPage {
  protected readonly status = MEDIA_VIEWER_STATUS;
  protected readonly apiDescription = MEDIA_VIEWER_API_DESCRIPTION;
  protected readonly colorTokenRows = MEDIA_VIEWER_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = MEDIA_VIEWER_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [MEDIA_VIEWER_MESSAGES];
  protected readonly apiRows = MEDIA_VIEWER_API_ROWS;

  protected readonly importTabs = MEDIA_VIEWER_IMPORT_TABS;

  protected readonly basicTabs = MEDIA_VIEWER_EXAMPLE_SOURCES['basic-media-viewer-example'];

  protected readonly singleTabs = MEDIA_VIEWER_EXAMPLE_SOURCES['media-viewer-single-example'];

  protected readonly selectTabs = MEDIA_VIEWER_EXAMPLE_SOURCES['media-viewer-select-example'];
}
