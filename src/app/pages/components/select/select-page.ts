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
import { BasicSelectExample } from './examples/basic-select-example/basic-select-example';
import { MultipleSelectExample } from './examples/multiple-select-example/multiple-select-example';
import { SELECT_API_ROWS } from './select.api-schema';

@Component({
  selector: 'app-select-page',
  imports: [
    ApiTable,
    BasicSelectExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    MultipleSelectExample,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './select-page.html',
  styleUrl: './select-page.scss',
})
export class SelectPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SELECT_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'select.ts',
      language: 'ts',
      code: `import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
  kuiProvideSelectOptions,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Role" hint="Pick one role for the user">
  <input kuiSelect [(value)]="role" placeholder="Select a role..." [clearable]="true" />
  <kui-dropdown>
    <div kuiOption value="engineer">Software Engineer</div>
    <div kuiOption value="designer">Designer</div>
    <div kuiOption value="manager">Product Manager</div>
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
  selector: 'app-basic-select-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './basic-select-example.html',
  styleUrl: './basic-select-example.scss',
})
export class BasicSelectExample {
  protected readonly role = signal<string | null>(null);
}`,
    },
  ];

  protected readonly multipleTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Roles" hint="Multiple mode renders selected values as chips">
  <input
    kuiSelect
    multiple
    [(value)]="roles"
    [kuiLabelFn]="roleLabel"
    [maxVisibleChips]="3"
    placeholder="Select roles..."
    [clearable]="true"
  />
  <kui-dropdown>
    @for (role of roleOptions; track role.value) {
      <div kuiOption [value]="role.value">{{ role.label }}</div>
    }
  </kui-dropdown>
</kui-field>`,
    },
  ];

  protected readonly providerTabs: readonly CodeTab[] = [
    {
      label: 'app.config.ts',
      language: 'ts',
      code: `import { kuiProvideSelectOptions } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    kuiProvideSelectOptions({
      clearable: true,
      maxVisibleChips: 2,
    }),
  ],
};`,
    },
  ];
}
