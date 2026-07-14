import { Component } from '@angular/core';

import { type KuiCardAppearance, KuiCardDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CARD_API_ROWS } from '../card.api-schema';
import { CARD_API_DESCRIPTION } from '../card.docs-content';

const CARD_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type CardPlaygroundValues = PlaygroundValues<typeof CARD_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-card-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCardDirective],
  templateUrl: './card-playground-page.html',
  styleUrl: './card-playground-page.scss',
})
export class CardPlaygroundPage {
  protected readonly apiDescription = CARD_API_DESCRIPTION;
  protected readonly apiRows = CARD_API_ROWS;

  protected readonly playgroundControls = CARD_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: CardPlaygroundValues,
  ): readonly CodeTab[] => {
    const heading = values.heading;
    const body = values.body;
    const appearance = values.appearance;
    const size = values.size;
    const interactive = values.interactive;

    const attrs = [
      appearance !== 'surface' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      interactive ? 'interactive' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const tag = interactive ? 'button' : 'article';
    const typeAttr = interactive ? ' type="button"' : '';
    const escapedHeading = escapePlaygroundHtml(heading || 'Card heading');
    const escapedBody = escapePlaygroundHtml(body || '');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<${tag} kuiCard${attrString}${typeAttr}>
  <h2>${escapedHeading}</h2>
  <p>${escapedBody}</p>
</${tag}>`,
      },
    ];
  };

  protected headingOf(values: CardPlaygroundValues): string {
    const heading = values.heading;

    return heading || 'Card heading';
  }

  protected bodyOf(values: CardPlaygroundValues): string {
    return values.body;
  }

  protected appearanceOf(values: CardPlaygroundValues): KuiCardAppearance {
    return values.appearance;
  }

  protected sizeOf(values: CardPlaygroundValues): KuiSize {
    return values.size;
  }

  protected interactiveOf(values: CardPlaygroundValues): boolean {
    return values.interactive;
  }
}
