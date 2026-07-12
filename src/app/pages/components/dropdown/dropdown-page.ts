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
import { FieldDropdownExample } from './examples/field-dropdown-example/field-dropdown-example';
import { PanelWidthDropdownExample } from './examples/panel-width-dropdown-example/panel-width-dropdown-example';
import { StandaloneDropdownExample } from './examples/standalone-dropdown-example/standalone-dropdown-example';
import { DROPDOWN_API_ROWS } from './dropdown.api-schema';

@Component({
  selector: 'app-dropdown-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    FieldDropdownExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    PanelWidthDropdownExample,
    RouterLink,
    StandaloneDropdownExample,
  ],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.scss',
})
export class DropdownPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs, outputs, and public API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = DROPDOWN_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'dropdown.ts',
      language: 'ts',
      code: `import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly standaloneTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button type="button" [kuiDropdownFor]="menu">Actions</button>

<kui-dropdown #menu [maxHeight]="null">
  <div kuiOption value="edit">Edit</div>
  <div kuiOption value="delete" [disabled]="true">Delete</div>
</kui-dropdown>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-standalone-dropdown-example',
  imports: [KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './standalone-dropdown-example.html',
})
export class StandaloneDropdownExample {}`,
    },
  ];

  protected readonly fieldTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Fruit">
  <input kuiSelect [(value)]="fruit" placeholder="Pick..." />
  <kui-dropdown>
    <div kuiOption value="apple">Apple</div>
    <div kuiOption value="banana">Banana</div>
    <div kuiOption value="cherry">Cherry</div>
  </kui-dropdown>
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-field-dropdown-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './field-dropdown-example.html',
})
export class FieldDropdownExample {
  protected readonly fruit = signal<string | null>(null);
}`,
    },
  ];

  protected readonly panelWidthTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button type="button" [kuiDropdownFor]="anchorPanel">panelWidth="anchor"</button>
<kui-dropdown #anchorPanel panelWidth="anchor">
  <div kuiOption value="a">Matches trigger width</div>
</kui-dropdown>

<button type="button" [kuiDropdownFor]="contentPanel">panelWidth="content"</button>
<kui-dropdown #contentPanel panelWidth="content">
  <div kuiOption value="b">Grows with a longer content line if needed</div>
</kui-dropdown>

<button type="button" [kuiDropdownFor]="explicitPanel">width="320px"</button>
<kui-dropdown #explicitPanel width="320px">
  <div kuiOption value="c">Always exactly 320px wide</div>
</kui-dropdown>`,
    },
  ];
}
