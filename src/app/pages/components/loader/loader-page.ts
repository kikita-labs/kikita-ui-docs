import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective, KuiLoaderDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicLoaderExample } from './examples/basic-loader-example/basic-loader-example';
import { LoaderButtonExample } from './examples/loader-button-example/loader-button-example';
import { LoaderSizeExample } from './examples/loader-size-example/loader-size-example';
import { LOADER_API_ROWS } from './loader.api-schema';

@Component({
  selector: 'app-loader-page',
  imports: [
    ApiTable,
    BasicLoaderExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    KuiLoaderDirective,
    LivePreview,
    LoaderButtonExample,
    LoaderSizeExample,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './loader-page.html',
  styleUrl: './loader-page.scss',
})
export class LoaderPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = LOADER_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'loader.ts',
      language: 'ts',
      code: `import { KuiLoaderDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiLoader label="Loading"></span>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiLoaderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-loader-example',
  imports: [KuiLoaderDirective],
  templateUrl: './basic-loader-example.html',
  styleUrl: './basic-loader-example.scss',
})
export class BasicLoaderExample {}`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiLoader size="xs" label="Loading extra small"></span>
<span kuiLoader size="sm" label="Loading small"></span>
<span kuiLoader size="md" label="Loading medium"></span>
<span kuiLoader size="lg" label="Loading large"></span>`,
    },
  ];

  protected readonly buttonTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button" disabled>
  <span kuiLoader size="sm" label="Saving"></span>
  Saving
</button>

<button kuiButton type="button" loading>Saving</button>`,
    },
  ];
}
