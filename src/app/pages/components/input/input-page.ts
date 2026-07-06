import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { FIELD_API_ROWS, INPUT_API_ROWS } from './input.api-schema';
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
  protected readonly fieldRows = FIELD_API_ROWS;
  protected readonly inputRows = INPUT_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      language: 'ts',
      code: `import {
  KuiFieldComponent,
  KuiInputDirective,
  KuiInputGroupDirective,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Email" hint="Use your work email">
  <input kuiInput type="email" placeholder="mira@company.dev" />
</kui-field>

<kui-field label="Project" error="Project name is required" required>
  <input kuiInput value="" />
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-input-example',
  imports: [KuiFieldComponent, KuiInputDirective],
  templateUrl: './basic-input-example.html',
  styleUrl: './basic-input-example.scss',
})
export class BasicInputExample {}`,
    },
  ];

  protected readonly groupTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Project URL" hint="Affixes are visual field chrome.">
  <div class="kui-input-group">
    <span class="kui-field-affix">https://</span>
    <input kuiInput aria-label="Project slug" value="kikita-ui" />
    <span class="kui-field-affix">.dev</span>
  </div>
</kui-field>`,
    },
  ];
}
