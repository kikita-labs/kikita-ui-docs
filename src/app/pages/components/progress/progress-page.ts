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
import { BasicProgressExample } from './examples/basic-progress-example/basic-progress-example';
import { PROGRESS_API_ROWS } from './progress.api-schema';
import { ProgressCircularExample } from './examples/progress-circular-example/progress-circular-example';
import { ProgressColorSizeExample } from './examples/progress-color-size-example/progress-color-size-example';

@Component({
  selector: 'app-progress-page',
  imports: [
    ApiTable,
    BasicProgressExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    ProgressCircularExample,
    ProgressColorSizeExample,
    RouterLink,
  ],
  templateUrl: './progress-page.html',
  styleUrl: './progress-page.scss',
})
export class ProgressPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'progress.ts',
      language: 'ts',
      code: `import { KuiProgressComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-progress [value]="60" aria-label="Upload progress" />
<kui-progress aria-label="Loading" />`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiProgressComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-progress-example',
  imports: [KuiProgressComponent],
  templateUrl: './basic-progress-example.html',
  styleUrl: './basic-progress-example.scss',
})
export class BasicProgressExample {}`,
    },
  ];

  protected readonly circularTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-progress type="circular" size="lg" color="success" [value]="72" aria-label="72% complete">
  72%
</kui-progress>
<kui-progress type="circular" aria-label="Loading" />`,
    },
  ];

  protected readonly colorSizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-progress size="xs" [value]="40" aria-label="Extra small progress" />
<kui-progress size="sm" [value]="40" aria-label="Small progress" />
<kui-progress size="md" [value]="40" aria-label="Medium progress" />
<kui-progress size="lg" [value]="40" aria-label="Large progress" />
<kui-progress size="xl" [value]="40" aria-label="Extra large progress" />

<kui-progress color="primary" [value]="55" aria-label="Primary progress" />
<kui-progress color="success" [value]="55" aria-label="Success progress" />
<kui-progress color="warning" [value]="55" aria-label="Warning progress" />
<kui-progress color="danger" [value]="55" aria-label="Danger progress" />
<kui-progress color="neutral" [value]="55" aria-label="Neutral progress" />`,
    },
  ];

  protected readonly apiRows = PROGRESS_API_ROWS;
}
