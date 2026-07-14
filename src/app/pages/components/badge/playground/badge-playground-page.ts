import { Component } from '@angular/core';

import { type KuiBadgeAppearance, KuiBadgeDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { BADGE_API_ROWS } from '../badge.api-schema';
import { BADGE_API_DESCRIPTION } from '../badge.docs-content';

const BADGE_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type BadgePlaygroundValues = PlaygroundValues<typeof BADGE_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-badge-playground-page',
  imports: [ApiPlayground, ApiTable, KuiBadgeDirective],
  templateUrl: './badge-playground-page.html',
  styleUrl: './badge-playground-page.scss',
})
export class BadgePlaygroundPage {
  protected readonly apiDescription = BADGE_API_DESCRIPTION;
  protected readonly apiRows = BADGE_API_ROWS;

  protected readonly playgroundControls = BADGE_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: BadgePlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label;
    const appearance = values.appearance;
    const size = values.size;

    const attrs = [
      appearance !== 'neutral' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = escapePlaygroundHtml(label || 'Neutral');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<span kuiBadge${attrString}>${escapedLabel}</span>`,
      },
    ];
  };

  protected labelOf(values: BadgePlaygroundValues): string {
    const label = values.label;

    return label || 'Neutral';
  }

  protected appearanceOf(values: BadgePlaygroundValues): KuiBadgeAppearance {
    return values.appearance;
  }

  protected sizeOf(values: BadgePlaygroundValues): KuiSize {
    return values.size;
  }
}
