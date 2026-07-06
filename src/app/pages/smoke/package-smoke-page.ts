import { Component } from '@angular/core';
import {
  KuiBadgeDirective,
  KuiButtonDirective,
  KuiCardDirective,
  KuiFieldComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';
import { ApiTableRow } from '../../shared/docs-ui/api-table/api-table-row';
import { ApiTable } from '../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-package-smoke-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    KuiBadgeDirective,
    KuiButtonDirective,
    KuiCardDirective,
    KuiFieldComponent,
    KuiInputDirective,
    LivePreview,
    PageHeader,
  ],
  templateUrl: './package-smoke-page.html',
  styleUrl: './package-smoke-page.scss',
})
export class PackageSmokePage {
  protected readonly packageVersion = `@kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

  protected readonly apiRows: readonly ApiTableRow[] = [
    {
      name: 'provideKikitaUi',
      type: 'ApplicationConfig provider',
      description: 'Installed in app.config.ts with styled scrollbars enabled.',
    },
    {
      name: 'KuiFieldComponent',
      type: 'standalone component',
      description: 'Wraps the input with package-provided label, hint, and field semantics.',
    },
    {
      name: 'KuiInputDirective',
      type: 'standalone directive',
      description: 'Applies Kikita UI input styling to a native input.',
    },
    {
      name: 'KuiButtonDirective',
      type: 'standalone directive',
      description: 'Applies Kikita UI button styling to a native button.',
    },
  ];

  protected readonly codeTabs: readonly CodeTab[] = [
    {
      label: 'Template',
      language: 'html',
      code: `<kui-field label="Project" hint="Consumer-safe input from @kikita-labs/ui">
  <input kuiInput value="kikita-ui-docs" aria-label="Project name" />
</kui-field>

<button kuiButton type="button" appearance="primary" size="md">
  Verified import
</button>`,
    },
    {
      label: 'Imports',
      language: 'ts',
      code: `import {
  KuiButtonDirective,
  KuiFieldComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';`,
    },
  ];
}
