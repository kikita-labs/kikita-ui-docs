import { Component } from '@angular/core';

import { KuiButton, kuiMediaViewer } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_MESSAGES_CONTROL,
  PlaygroundEventLogView,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { MEDIA_VIEWER_API_ROWS } from '../media-viewer.api-schema';
import { MEDIA_VIEWER_API_DESCRIPTION } from '../media-viewer.docs-content';
import { MEDIA_VIEWER_PLAYGROUND_MESSAGES, MEDIA_VIEWER_PLAYGROUND_PHOTOS } from './constants';

const MEDIA_VIEWER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'photos', label: 'photos (sample count)', kind: 'number', defaultValue: 5 },
  { key: 'index', label: 'index', kind: 'number', defaultValue: 0 },
  { key: 'maxZoom', label: 'maxZoom', kind: 'number', defaultValue: 3 },
  { key: 'zoomStep', label: 'zoomStep', kind: 'number', defaultValue: 0.5 },
  { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: '' },
  PLAYGROUND_MESSAGES_CONTROL,
] as const);

type MediaViewerPlaygroundValues = PlaygroundValues<typeof MEDIA_VIEWER_PLAYGROUND_CONTROLS>;

function photoCount(values: MediaViewerPlaygroundValues): number {
  return Math.max(1, Math.min(Math.round(values.photos), MEDIA_VIEWER_PLAYGROUND_PHOTOS.length));
}

@Component({
  selector: 'app-media-viewer-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButton, PlaygroundEventLogView],
  templateUrl: './media-viewer-playground-page.html',
  styleUrl: './media-viewer-playground-page.scss',
})
export class MediaViewerPlaygroundPage {
  protected readonly apiDescription = MEDIA_VIEWER_API_DESCRIPTION;
  protected readonly apiRows = MEDIA_VIEWER_API_ROWS;
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = MEDIA_VIEWER_PLAYGROUND_CONTROLS;

  private readonly openViewer = kuiMediaViewer();

  protected readonly buildPlaygroundSnippet = (
    values: MediaViewerPlaygroundValues,
  ): readonly CodeTab[] => {
    const fields = [
      'items: this.photos',
      values.index === 0 ? null : `index: ${values.index}`,
      values.maxZoom === 3 ? null : `maxZoom: ${values.maxZoom}`,
      values.zoomStep === 0.5 ? null : `zoomStep: ${values.zoomStep}`,
      values.ariaLabel ? `ariaLabel: '${values.ariaLabel.replaceAll("'", "\\'")}'` : null,
      values.messages === 'custom' ? 'messages: this.messages' : null,
      'onIndexChange: (index) => this.lastViewed.set(index)',
    ].filter((field): field is string => typeof field === 'string' && field.length > 0);

    return [
      {
        label: 'TS',
        language: 'ts',
        code: `private readonly openViewer = kuiMediaViewer();

protected open(): void {
  this.openViewer({
${fields.map((field) => `    ${field},`).join('\n')}
  });
}`,
      },
    ];
  };

  protected open(values: MediaViewerPlaygroundValues): void {
    this.eventLog.log('open', `${photoCount(values)} photo(s)`);
    this.openViewer({
      items: MEDIA_VIEWER_PLAYGROUND_PHOTOS.slice(0, photoCount(values)),
      index: values.index,
      maxZoom: values.maxZoom,
      zoomStep: values.zoomStep,
      ariaLabel: values.ariaLabel || undefined,
      messages: values.messages === 'custom' ? MEDIA_VIEWER_PLAYGROUND_MESSAGES : undefined,
      onIndexChange: (index) => this.eventLog.log('onIndexChange', index),
    });
  }
}
