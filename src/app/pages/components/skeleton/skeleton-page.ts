import { Component } from '@angular/core';

import { SKELETON_EXAMPLE_SOURCES } from '@generated/example-sources/skeleton.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';

import {
  SkeletonAnimationExample,
  SkeletonCompositionExample,
  SkeletonShapesExample,
} from './examples';
import { SKELETON_API_ROWS } from './skeleton.api-schema';
import {
  SKELETON_API_DESCRIPTION,
  SKELETON_IMPORT_TABS,
  SKELETON_STATUS,
} from './skeleton.docs-content';

@Component({
  selector: 'app-skeleton-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
    SkeletonAnimationExample,
    SkeletonCompositionExample,
    SkeletonShapesExample,
  ],
  templateUrl: './skeleton-page.html',
  styleUrl: './skeleton-page.scss',
})
export class SkeletonPage {
  protected readonly status = SKELETON_STATUS;
  protected readonly apiDescription = SKELETON_API_DESCRIPTION;

  protected readonly importTabs = SKELETON_IMPORT_TABS;

  protected readonly basicTabs = SKELETON_EXAMPLE_SOURCES['skeleton-composition-example'];

  protected readonly shapesTabs = SKELETON_EXAMPLE_SOURCES['skeleton-shapes-example'];

  protected readonly animationTabs = SKELETON_EXAMPLE_SOURCES['skeleton-animation-example'];

  protected readonly compositionTabs = SKELETON_EXAMPLE_SOURCES['skeleton-composition-example'];

  protected readonly apiRows = SKELETON_API_ROWS;
}
