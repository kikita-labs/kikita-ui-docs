import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { CHECKBOX_API_ROWS } from './checkbox.api-schema';
import { BasicCheckboxExample } from './examples/basic-checkbox-example/basic-checkbox-example';
import { CheckboxSizeExample } from './examples/checkbox-size-example/checkbox-size-example';

@Component({
  selector: 'app-checkbox-page',
  imports: [
    ApiTable,
    BasicCheckboxExample,
    CheckboxSizeExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
  ],
  templateUrl: './checkbox-page.html',
  styleUrl: './checkbox-page.scss',
})
export class CheckboxPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = CHECKBOX_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      language: 'ts',
      code: `import { KuiCheckboxDirective, KuiFieldComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Notifications" hint="Control product and release emails">
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" [checked]="receiveUpdates()" />
    <span>Receive updates</span>
  </label>
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import { KuiCheckboxDirective, KuiFieldComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-checkbox-example',
  imports: [KuiCheckboxDirective, KuiFieldComponent],
  templateUrl: './basic-checkbox-example.html',
  styleUrl: './basic-checkbox-example.scss',
})
export class BasicCheckboxExample {
  protected readonly receiveUpdates = signal(true);
}`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<label class="checkbox-option">
  <input kuiCheckbox type="checkbox" size="xs" />
  <span>Extra small</span>
</label>
<label class="checkbox-option">
  <input kuiCheckbox type="checkbox" size="sm" checked />
  <span>Small</span>
</label>
<label class="checkbox-option">
  <input kuiCheckbox type="checkbox" size="md" checked />
  <span>Medium</span>
</label>
<label class="checkbox-option">
  <input kuiCheckbox type="checkbox" size="lg" />
  <span>Large</span>
</label>`,
    },
  ];
}
