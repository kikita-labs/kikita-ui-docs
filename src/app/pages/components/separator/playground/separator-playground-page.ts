import { Component } from '@angular/core';
import {
  KuiSeparatorAppearance,
  KuiSeparatorDirective,
  KuiSeparatorOrientation,
  KuiSeparatorSpacing,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { SEPARATOR_API_ROWS } from '../separator.api-schema';

@Component({
  selector: 'app-separator-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSeparatorDirective],
  templateUrl: './separator-playground-page.html',
  styleUrl: './separator-playground-page.scss',
})
export class SeparatorPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SEPARATOR_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const appearance = values['appearance'] as string;
    const orientation = values['orientation'] as string;
    const spacing = values['spacing'] as string;

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

  protected appearanceOf(values: PlaygroundValues): KuiSeparatorAppearance {
    return values['appearance'] as KuiSeparatorAppearance;
  }

  protected orientationOf(values: PlaygroundValues): KuiSeparatorOrientation {
    return values['orientation'] as KuiSeparatorOrientation;
  }

  protected spacingOf(values: PlaygroundValues): KuiSeparatorSpacing {
    return values['spacing'] as KuiSeparatorSpacing;
  }

  protected isVertical(values: PlaygroundValues): boolean {
    return values['orientation'] === 'vertical';
  }
}
