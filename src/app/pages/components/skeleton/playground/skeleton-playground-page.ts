import { Component } from '@angular/core';
import { KuiSkeletonAnimation, KuiSkeletonDirective, KuiSkeletonShape } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { SKELETON_API_ROWS } from '../skeleton.api-schema';

@Component({
  selector: 'app-skeleton-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSkeletonDirective],
  templateUrl: './skeleton-playground-page.html',
  styleUrl: './skeleton-playground-page.scss',
})
export class SkeletonPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SKELETON_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'shape',
      label: 'shape',
      kind: 'enum',
      options: ['text', 'heading', 'rect', 'circle', 'square', 'button', 'badge'],
      defaultValue: 'rect',
    },
    {
      key: 'animation',
      label: 'animation',
      kind: 'enum',
      options: ['shimmer', 'pulse', 'none'],
      defaultValue: 'shimmer',
    },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const shape = values['shape'] as string;
    const animation = values['animation'] as string;

    const attrs = [
      shape !== 'rect' ? `shape="${shape}"` : null,
      animation !== 'shimmer' ? `animation="${animation}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<span kuiSkeleton${attrString} style="inline-size: 140px"></span>`,
      },
    ];
  };

  protected shapeOf(values: PlaygroundValues): KuiSkeletonShape {
    return values['shape'] as KuiSkeletonShape;
  }

  protected animationOf(values: PlaygroundValues): KuiSkeletonAnimation {
    return values['animation'] as KuiSkeletonAnimation;
  }
}
