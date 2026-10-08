import { Component } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  playgroundBinding,
  playgroundEvent,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SPLITTER_API_ROWS } from '../splitter.api-schema';
import { SPLITTER_API_DESCRIPTION } from '../splitter.docs-content';

const SPLITTER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'orientation',
    label: 'orientation',
    kind: 'enum',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
  },
  { key: 'paneCount', label: 'panes', kind: 'number', defaultValue: 2 },
  { key: 'firstSize', label: 'first pane size (0 = even)', kind: 'number', defaultValue: 0 },
  { key: 'minSize', label: 'minSize', kind: 'number', defaultValue: 10 },
  { key: 'collapsible', label: 'first pane collapsible', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type SplitterPlaygroundValues = PlaygroundValues<typeof SPLITTER_PLAYGROUND_CONTROLS>;

function paneNumbers(values: SplitterPlaygroundValues): readonly number[] {
  return Array.from(
    { length: Math.max(2, Math.min(Math.round(values.paneCount), 4)) },
    (_, i) => i + 1,
  );
}

@Component({
  selector: 'app-splitter-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSplitter, KuiSplitterPane, PlaygroundEventLogView],
  templateUrl: './splitter-playground-page.html',
  styleUrl: './splitter-playground-page.scss',
})
export class SplitterPlaygroundPage {
  protected readonly apiDescription = SPLITTER_API_DESCRIPTION;
  protected readonly apiRows = SPLITTER_API_ROWS;
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = SPLITTER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SplitterPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'orientation', value: values.orientation, defaultValue: 'horizontal' },
      { name: 'disabled', value: values.disabled },
      playgroundEvent('sizesChange', 'onResize($event)'),
    ]);
    const panes = paneNumbers(values)
      .map((number) => {
        const paneAttrs = serializePlaygroundAttributes([
          playgroundBinding(
            'size',
            number === 1 && values.firstSize > 0 ? String(values.firstSize) : null,
          ),
          playgroundBinding('minSize', values.minSize === 10 ? null : String(values.minSize)),
          playgroundBinding('collapsible', number === 1 && values.collapsible ? 'true' : null),
        ]);

        return `  <kui-splitter-pane${paneAttrs}>Pane ${number}</kui-splitter-pane>`;
      })
      .join('\n');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-splitter${attrString}>\n${panes}\n</kui-splitter>`,
      },
    ];
  };

  protected paneNumbers(values: SplitterPlaygroundValues): readonly number[] {
    return paneNumbers(values);
  }

  protected orientationOf(values: SplitterPlaygroundValues): 'horizontal' | 'vertical' {
    return values.orientation;
  }

  protected disabledOf(values: SplitterPlaygroundValues): boolean {
    return values.disabled;
  }

  protected sizeOf(values: SplitterPlaygroundValues, number: number): number | undefined {
    return number === 1 && values.firstSize > 0 ? values.firstSize : undefined;
  }

  protected minSizeOf(values: SplitterPlaygroundValues): number {
    return values.minSize;
  }

  protected collapsibleOf(values: SplitterPlaygroundValues, number: number): boolean {
    return number === 1 && values.collapsible;
  }

  protected onResize(sizes: readonly number[]): void {
    this.eventLog.log('sizesChange', sizes.map((size) => Math.round(size)).join(' / '));
  }
}
