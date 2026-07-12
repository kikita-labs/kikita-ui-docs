import { Component } from '@angular/core';
import { KuiCardAppearance, KuiCardDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { CARD_API_ROWS } from '../card.api-schema';

@Component({
  selector: 'app-card-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCardDirective],
  templateUrl: './card-playground-page.html',
  styleUrl: './card-playground-page.scss',
})
export class CardPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = CARD_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'heading', label: 'heading', kind: 'string', defaultValue: 'Card heading' },
    {
      key: 'body',
      label: 'body',
      kind: 'string',
      defaultValue: 'Grouped content with Kikita border, radius, and surface tokens.',
    },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['surface', 'elevated', 'sunken'],
      defaultValue: 'surface',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'interactive', label: 'interactive', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const heading = values['heading'] as string;
    const body = values['body'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;
    const interactive = values['interactive'] as boolean;

    const attrs = [
      appearance !== 'surface' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      interactive ? 'interactive' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const tag = interactive ? 'button' : 'article';
    const typeAttr = interactive ? ' type="button"' : '';
    const escapedHeading = this.escapeHtml(heading || 'Card heading');
    const escapedBody = this.escapeHtml(body || '');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<${tag} kuiCard${attrString}${typeAttr}>
  <h3>${escapedHeading}</h3>
  <p>${escapedBody}</p>
</${tag}>`,
      },
    ];
  };

  protected headingOf(values: PlaygroundValues): string {
    const heading = values['heading'] as string;

    return heading || 'Card heading';
  }

  protected bodyOf(values: PlaygroundValues): string {
    return values['body'] as string;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected appearanceOf(values: PlaygroundValues): KuiCardAppearance {
    return values['appearance'] as KuiCardAppearance;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected interactiveOf(values: PlaygroundValues): boolean {
    return values['interactive'] as boolean;
  }
}
