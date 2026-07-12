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
import { BasicSeparatorExample } from './examples/basic-separator-example/basic-separator-example';
import { SEPARATOR_API_ROWS } from './separator.api-schema';
import { SeparatorAppearanceExample } from './examples/separator-appearance-example/separator-appearance-example';
import { SeparatorSpacingExample } from './examples/separator-spacing-example/separator-spacing-example';
import { SeparatorVerticalExample } from './examples/separator-vertical-example/separator-vertical-example';

@Component({
  selector: 'app-separator-page',
  imports: [
    ApiTable,
    BasicSeparatorExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    SeparatorAppearanceExample,
    SeparatorSpacingExample,
    SeparatorVerticalExample,
  ],
  templateUrl: './separator-page.html',
  styleUrl: './separator-page.scss',
})
export class SeparatorPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'separator.ts',
      language: 'ts',
      code: `import { KuiSeparatorDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<section>
  <p>Account details</p>
  <hr kuiSeparator />
  <p>Billing details</p>
</section>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-separator-example',
  imports: [KuiSeparatorDirective],
  templateUrl: './basic-separator-example.html',
  styleUrl: './basic-separator-example.scss',
})
export class BasicSeparatorExample {}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<hr kuiSeparator appearance="subtle" />
<hr kuiSeparator appearance="default" />
<hr kuiSeparator appearance="strong" />`,
    },
  ];

  protected readonly spacingTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<hr kuiSeparator spacing="none" />
<hr kuiSeparator spacing="xs" />
<hr kuiSeparator spacing="sm" />
<hr kuiSeparator spacing="md" />
<hr kuiSeparator spacing="lg" />`,
    },
  ];

  protected readonly verticalTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div class="toolbar">
  <button kuiButton type="button" shape="ghost">Bold</button>
  <button kuiButton type="button" shape="ghost">Italic</button>
  <hr kuiSeparator orientation="vertical" spacing="xs" />
  <button kuiButton type="button" shape="ghost">Link</button>
</div>`,
    },
  ];

  protected readonly apiRows = SEPARATOR_API_ROWS;
}
