import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicSwitchExample } from './examples/basic-switch-example/basic-switch-example';
import { SwitchSizeExample } from './examples/switch-size-example/switch-size-example';
import { SWITCH_API_ROWS } from './switch.api-schema';

@Component({
  selector: 'app-switch-page',
  imports: [
    ApiTable,
    BasicSwitchExample,
    CodeTabs,
    DocSection,
    LivePreview,
    PageHeader,
    SwitchSizeExample,
  ],
  templateUrl: './switch-page.html',
  styleUrl: './switch-page.scss',
})
export class SwitchPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SWITCH_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'switch.ts',
      language: 'ts',
      code: `import { KuiFieldComponent, KuiSwitchDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Notifications" hint="Control product and release notifications">
  <label class="switch-option">
    <input kuiSwitch type="checkbox" checked />
    <span>Enable notifications</span>
  </label>
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiSwitchDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-switch-example',
  imports: [KuiFieldComponent, KuiSwitchDirective],
  templateUrl: './basic-switch-example.html',
  styleUrl: './basic-switch-example.scss',
})
export class BasicSwitchExample {}`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<label class="switch-option">
  <input kuiSwitch type="checkbox" size="xs" />
  <span>Extra small</span>
</label>
<label class="switch-option">
  <input kuiSwitch type="checkbox" size="sm" checked />
  <span>Small</span>
</label>
<label class="switch-option">
  <input kuiSwitch type="checkbox" size="md" checked />
  <span>Medium</span>
</label>
<label class="switch-option">
  <input kuiSwitch type="checkbox" size="lg" />
  <span>Large</span>
</label>`,
    },
  ];
}
