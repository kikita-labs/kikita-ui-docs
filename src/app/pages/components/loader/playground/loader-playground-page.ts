import { Component } from '@angular/core';
import { KuiLoaderDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { LOADER_API_ROWS } from '../loader.api-schema';

@Component({
  selector: 'app-loader-playground-page',
  imports: [ApiPlayground, ApiTable, KuiLoaderDirective],
  templateUrl: './loader-playground-page.html',
  styleUrl: './loader-playground-page.scss',
})
export class LoaderPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = LOADER_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Loading' },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const size = values['size'] as string;
    const label = values['label'] as string;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      label ? `label="${this.escapeHtml(label)}"` : null,
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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Loading';
  }
}
