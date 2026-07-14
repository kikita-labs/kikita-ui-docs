import { Component, signal } from '@angular/core';

import { KuiSegmentDirective, KuiSegmentedComponent, type KuiSize } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SEGMENTED_API_ROWS } from '../segmented.api-schema';
import { SEGMENTED_API_DESCRIPTION } from '../segmented.docs-content';

const SEGMENTED_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'disabledTimeline', label: 'disabled timeline', kind: 'boolean', defaultValue: false },
] as const);

type SegmentedPlaygroundValues = PlaygroundValues<typeof SEGMENTED_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-segmented-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './segmented-playground-page.html',
  styleUrl: './segmented-playground-page.scss',
})
export class SegmentedPlaygroundPage {
  protected readonly apiDescription = SEGMENTED_API_DESCRIPTION;
  protected readonly apiRows = SEGMENTED_API_ROWS;
  protected readonly selected = signal('list');
  protected readonly playgroundControls = SEGMENTED_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SegmentedPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
    ]);
    const disabledAttr = values.disabledTimeline ? ' disabled' : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-segmented [(selected)]="view" aria-label="Project view"${attrString}>
  <button kuiSegment value="list">List</button>
  <button kuiSegment value="board">Board</button>
  <button kuiSegment value="timeline"${disabledAttr}>Timeline</button>
</kui-segmented>`,
      },
    ];
  };

  protected sizeOf(values: SegmentedPlaygroundValues): KuiSize {
    return values.size;
  }

  protected disabledTimelineOf(values: SegmentedPlaygroundValues): boolean {
    return values.disabledTimeline;
  }
}
