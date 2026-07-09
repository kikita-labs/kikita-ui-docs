import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { INPUT_API_ROWS } from './input.api-schema';
import { BasicInputExample } from './examples/basic-input-example/basic-input-example';
import { InputGroupExample } from './examples/input-group-example/input-group-example';

@Component({
  selector: 'app-input-page',
  imports: [
    ApiTable,
    BasicInputExample,
    CodeTabs,
    DocSection,
    InputGroupExample,
    LivePreview,
    PageHeader,
  ],
  templateUrl: './input-page.html',
  styleUrl: './input-page.scss',
})
export class InputPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly inputRows = INPUT_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'input.ts',
      language: 'ts',
      code: `import {
  KuiInputDirective,
  KuiInputGroupDirective,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      filename: 'basic-input-example.html',
      code: `<input kuiInput type="email" placeholder="mira@company.dev" />
<input kuiInput value="kikita-ui" />
<input kuiInput invalid value="Invalid value" />`,
    },
    {
      label: 'TS',
      filename: 'basic-input-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-input-example',
  imports: [KuiInputDirective],
  templateUrl: './basic-input-example.html',
  styleUrl: './basic-input-example.scss',
})
export class BasicInputExample {}`,
    },
  ];

  protected readonly groupTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'input-group-example.html',
      language: 'html',
      code: `<kui-field label="Project URL" hint="Affixes are visual field chrome.">
  <div class="kui-input-group">
    <span kuiFieldAffix>https://</span>
    <input kuiInput aria-label="Project slug" value="kikita-ui" />
    <span kuiFieldAffix>.dev</span>
  </div>
</kui-field>`,
    },
  ];
}
