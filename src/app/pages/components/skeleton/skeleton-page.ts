import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { SkeletonAnimationExample } from './examples/skeleton-animation-example/skeleton-animation-example';
import { SkeletonCompositionExample } from './examples/skeleton-composition-example/skeleton-composition-example';
import { SkeletonShapesExample } from './examples/skeleton-shapes-example/skeleton-shapes-example';
import { SKELETON_API_ROWS } from './skeleton.api-schema';

@Component({
  selector: 'app-skeleton-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    SkeletonAnimationExample,
    SkeletonCompositionExample,
    SkeletonShapesExample,
  ],
  templateUrl: './skeleton-page.html',
  styleUrl: './skeleton-page.scss',
})
export class SkeletonPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'skeleton.ts',
      language: 'ts',
      code: `import { KuiSkeletonDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<section aria-busy="true">
  <span kuiSkeleton shape="heading" style="inline-size: 180px"></span>
  <span kuiSkeleton shape="text" style="inline-size: 80%"></span>
  <span kuiSkeleton shape="button" style="inline-size: 96px"></span>
</section>`,
    },
  ];

  protected readonly shapesTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiSkeleton shape="text" style="inline-size: 140px"></span>
<span kuiSkeleton shape="heading" style="inline-size: 180px"></span>
<span kuiSkeleton shape="rect" style="inline-size: 140px; block-size: 64px"></span>
<span kuiSkeleton shape="circle" style="inline-size: 40px"></span>
<span kuiSkeleton shape="square" style="inline-size: 40px"></span>
<span kuiSkeleton shape="button" style="inline-size: 96px"></span>
<span kuiSkeleton shape="badge" style="inline-size: 64px"></span>`,
    },
  ];

  protected readonly animationTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiSkeleton shape="text" style="inline-size: 100%"></span>
<span kuiSkeleton shape="text" animation="pulse" style="inline-size: 100%"></span>
<span kuiSkeleton shape="text" animation="none" style="inline-size: 100%"></span>`,
    },
  ];

  protected readonly compositionTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<article kuiCard aria-busy="true">
  <div class="row">
    <span kuiSkeleton shape="circle" style="inline-size: 40px"></span>
    <span kuiSkeleton shape="heading" style="inline-size: 45%"></span>
  </div>
  <span kuiSkeleton shape="text" style="inline-size: 100%"></span>
  <span kuiSkeleton shape="text" style="inline-size: 88%"></span>
  <span kuiSkeleton shape="button" style="inline-size: 100%"></span>
</article>`,
    },
  ];

  protected readonly apiRows = SKELETON_API_ROWS;
}
