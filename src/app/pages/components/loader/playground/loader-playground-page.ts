import { Component } from '@angular/core';

import { KuiLoaderDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { LOADER_API_ROWS } from '../loader.api-schema';
import { LOADER_API_DESCRIPTION } from '../loader.docs-content';

const LOADER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Loading' },
] as const);

type LoaderPlaygroundValues = PlaygroundValues<typeof LOADER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-loader-playground-page',
  imports: [ApiPlayground, ApiTable, KuiLoaderDirective],
  templateUrl: './loader-playground-page.html',
  styleUrl: './loader-playground-page.scss',
})
export class LoaderPlaygroundPage {
  protected readonly apiDescription = LOADER_API_DESCRIPTION;
  protected readonly apiRows = LOADER_API_ROWS;

  protected readonly playgroundControls = LOADER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: LoaderPlaygroundValues,
  ): readonly CodeTab[] => {
    const size = values.size;
    const label = values.label;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      label ? `label="${escapePlaygroundHtml(label)}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<span kuiLoader${attrString}></span>`,
      },
    ];
  };

  protected sizeOf(values: LoaderPlaygroundValues): KuiSize {
    return values.size;
  }

  protected labelOf(values: LoaderPlaygroundValues): string {
    const label = values.label;

    return label || 'Loading';
  }
}
