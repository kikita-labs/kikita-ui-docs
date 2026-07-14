import { Component } from '@angular/core';

import {
  type KuiSeparatorAppearance,
  KuiSeparatorDirective,
  type KuiSeparatorOrientation,
  type KuiSeparatorSpacing,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import { definePlaygroundControls, type PlaygroundValues } from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SEPARATOR_API_ROWS } from '../separator.api-schema';
import { SEPARATOR_API_DESCRIPTION } from '../separator.docs-content';

const SEPARATOR_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'appearance',
    label: 'appearance',
    kind: 'enum',
    options: ['subtle', 'default', 'strong'],
    defaultValue: 'default',
  },
  {
    key: 'orientation',
    label: 'orientation',
    kind: 'enum',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
  },
  {
    key: 'spacing',
    label: 'spacing',
    kind: 'enum',
    options: ['none', 'xs', 'sm', 'md', 'lg'],
    defaultValue: 'sm',
  },
] as const);

type SeparatorPlaygroundValues = PlaygroundValues<typeof SEPARATOR_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-separator-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSeparatorDirective],
  templateUrl: './separator-playground-page.html',
  styleUrl: './separator-playground-page.scss',
})
export class SeparatorPlaygroundPage {
  protected readonly apiDescription = SEPARATOR_API_DESCRIPTION;
  protected readonly apiRows = SEPARATOR_API_ROWS;

  protected readonly playgroundControls = SEPARATOR_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SeparatorPlaygroundValues,
  ): readonly CodeTab[] => {
    const appearance = values.appearance;
    const orientation = values.orientation;
    const spacing = values.spacing;

    const attrs = [
      appearance !== 'default' ? `appearance="${appearance}"` : null,
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      spacing !== 'sm' ? `spacing="${spacing}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<hr kuiSeparator${attrString} />`,
      },
    ];
  };

  protected appearanceOf(values: SeparatorPlaygroundValues): KuiSeparatorAppearance {
    return values.appearance;
  }

  protected orientationOf(values: SeparatorPlaygroundValues): KuiSeparatorOrientation {
    return values.orientation;
  }

  protected spacingOf(values: SeparatorPlaygroundValues): KuiSeparatorSpacing {
    return values.spacing;
  }

  protected isVertical(values: SeparatorPlaygroundValues): boolean {
    return values.orientation === 'vertical';
  }
}
