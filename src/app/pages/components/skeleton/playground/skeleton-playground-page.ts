import { Component } from '@angular/core';

import {
  type KuiSkeletonAnimation,
  KuiSkeletonDirective,
  type KuiSkeletonShape,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import { definePlaygroundControls, type PlaygroundValues } from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SKELETON_API_ROWS } from '../skeleton.api-schema';
import { SKELETON_API_DESCRIPTION } from '../skeleton.docs-content';

const SKELETON_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type SkeletonPlaygroundValues = PlaygroundValues<typeof SKELETON_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-skeleton-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSkeletonDirective],
  templateUrl: './skeleton-playground-page.html',
  styleUrl: './skeleton-playground-page.scss',
})
export class SkeletonPlaygroundPage {
  protected readonly apiDescription = SKELETON_API_DESCRIPTION;
  protected readonly apiRows = SKELETON_API_ROWS;

  protected readonly playgroundControls = SKELETON_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SkeletonPlaygroundValues,
  ): readonly CodeTab[] => {
    const shape = values.shape;
    const animation = values.animation;

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

  protected shapeOf(values: SkeletonPlaygroundValues): KuiSkeletonShape {
    return values.shape;
  }

  protected animationOf(values: SkeletonPlaygroundValues): KuiSkeletonAnimation {
    return values.animation;
  }
}
