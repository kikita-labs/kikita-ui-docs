import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { FIELD_API_ROWS } from './field.api-schema';
import { BasicFieldExample } from './examples/basic-field-example/basic-field-example';

@Component({
  selector: 'app-field-page',
  imports: [
    ApiTable,
    BasicFieldExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './field-page.html',
  styleUrl: './field-page.scss',
})
export class FieldPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = FIELD_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'field.ts',
      language: 'ts',
      code: `import { KuiFieldComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly usageTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'basic-field-example.html',
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
      filename: 'basic-field-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-field-example',
  imports: [KuiFieldComponent, KuiInputDirective],
  templateUrl: './basic-field-example.html',
  styleUrl: './basic-field-example.scss',
})
export class BasicFieldExample {}`,
    },
  ];
}
