import { Component } from '@angular/core';
import { KuiBadgeAppearance, KuiBadgeDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { BADGE_API_ROWS } from '../badge.api-schema';

@Component({
  selector: 'app-badge-playground-page',
  imports: [ApiPlayground, ApiTable, KuiBadgeDirective],
  templateUrl: './badge-playground-page.html',
  styleUrl: './badge-playground-page.scss',
})
export class BadgePlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = BADGE_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Neutral' },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
      defaultValue: 'neutral',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;

    const attrs = [
      appearance !== 'neutral' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = this.escapeHtml(label || 'Neutral');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<span kuiBadge${attrString}>${escapedLabel}</span>`,
      },
    ];
  };

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Neutral';
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected appearanceOf(values: PlaygroundValues): KuiBadgeAppearance {
    return values['appearance'] as KuiBadgeAppearance;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }
}
