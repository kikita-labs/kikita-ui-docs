import { Component } from '@angular/core';

import {
  type KuiProgressColor,
  KuiProgressComponent,
  type KuiProgressSize,
  type KuiProgressType,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { PROGRESS_API_ROWS } from '../progress.api-schema';
import { PROGRESS_API_DESCRIPTION } from '../progress.docs-content';

const PROGRESS_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'type',
    label: 'type',
    kind: 'enum',
    options: ['linear', 'circular'],
    defaultValue: 'linear',
  },
  { key: 'indeterminate', label: 'indeterminate', kind: 'boolean', defaultValue: false },
  { key: 'value', label: 'value', kind: 'number', defaultValue: 60 },
  {
    key: 'color',
    label: 'color',
    kind: 'enum',
    options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    defaultValue: 'primary',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
  },
  { key: 'label', label: 'aria-label', kind: 'string', defaultValue: 'Upload progress' },
  {
    key: 'content',
    label: 'content (circular only)',
    kind: 'string',
    defaultValue: '',
  },
] as const);

type ProgressPlaygroundValues = PlaygroundValues<typeof PROGRESS_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-progress-playground-page',
  imports: [ApiPlayground, ApiTable, KuiProgressComponent],
  templateUrl: './progress-playground-page.html',
  styleUrl: './progress-playground-page.scss',
})
export class ProgressPlaygroundPage {
  protected readonly apiDescription = PROGRESS_API_DESCRIPTION;
  protected readonly apiRows = PROGRESS_API_ROWS;

  protected readonly playgroundControls = PROGRESS_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ProgressPlaygroundValues,
  ): readonly CodeTab[] => {
    const type = values.type;
    const indeterminate = values.indeterminate;
    const value = values.value;
    const color = values.color;
    const size = values.size;
    const label = values.label;
    const content = values.content;

    const attrs = [
      type !== 'linear' ? `type="${type}"` : null,
      indeterminate ? null : `[value]="${value}"`,
      color !== 'primary' ? `color="${color}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      `aria-label="${escapePlaygroundHtml(label || 'Upload progress')}"`,
    ].filter((attr): attr is string => attr !== null);

    const attrString = ` ${attrs.join(' ')}`;
    const trimmedContent = content.trim();

    const code = trimmedContent
      ? `<kui-progress${attrString}>${escapePlaygroundHtml(trimmedContent)}</kui-progress>`
      : `<kui-progress${attrString} />`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected typeOf(values: ProgressPlaygroundValues): KuiProgressType {
    return values.type;
  }

  protected valueOf(values: ProgressPlaygroundValues): number | null {
    const indeterminate = values.indeterminate;

    return indeterminate ? null : values.value;
  }

  protected colorOf(values: ProgressPlaygroundValues): KuiProgressColor {
    return values.color;
  }

  protected sizeOf(values: ProgressPlaygroundValues): KuiProgressSize {
    return values.size;
  }

  protected labelOf(values: ProgressPlaygroundValues): string {
    const label = values.label;

    return label || 'Upload progress';
  }

  protected contentOf(values: ProgressPlaygroundValues): string {
    return values.content;
  }
}
