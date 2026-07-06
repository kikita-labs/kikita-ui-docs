import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicButtonExample } from './examples/basic-button-example/basic-button-example';
import { BUTTON_API_ROWS } from './button.api-schema';
import { ButtonAppearanceExample } from './examples/button-appearance-example/button-appearance-example';
import { ButtonSizeExample } from './examples/button-size-example/button-size-example';

@Component({
  selector: 'app-button-page',
  imports: [
    ApiTable,
    BasicButtonExample,
    ButtonAppearanceExample,
    ButtonSizeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
  ],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
})
export class ButtonPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      language: 'ts',
      code: `import { KuiButtonDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button">Save changes</button>
<button kuiButton type="button" appearance="soft">Cancel</button>
<a kuiButton href="/components/button">Button docs</a>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-button-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-button-example.html',
  styleUrl: './basic-button-example.scss',
})
export class BasicButtonExample {}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button">Solid</button>
<button kuiButton type="button" appearance="soft">Soft</button>
<button kuiButton type="button" appearance="outline">Outline</button>
<button kuiButton type="button" appearance="ghost">Ghost</button>
<button kuiButton type="button" appearance="danger">Danger</button>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button" size="xs">Extra small</button>
<button kuiButton type="button" size="sm">Small</button>
<button kuiButton type="button" size="md">Medium</button>
<button kuiButton type="button" size="lg">Large</button>
<button kuiButton type="button" disabled>Disabled</button>`,
    },
  ];

  protected readonly apiRows = BUTTON_API_ROWS;
}
