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
import { BasicMenuExample } from './examples/basic-menu-example/basic-menu-example';
import { MenuContentExample } from './examples/menu-content-example/menu-content-example';
import { MENU_API_ROWS } from './menu.api-schema';

@Component({
  selector: 'app-menu-page',
  imports: [
    ApiTable,
    BasicMenuExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    MenuContentExample,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = MENU_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'menu.ts',
      language: 'ts',
      code: `import {
  KuiButtonDirective,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuHeaderDirective,
  KuiMenuItemDirective,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button" [kuiMenuFor]="actionsMenu">Actions</button>

<kui-menu #actionsMenu ariaLabel="Project actions">
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Edit</span>
  </button>
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Copy</span>
  </button>
  <hr kuiSeparator spacing="xs" />
  <button type="button" kuiMenuItem appearance="destructive">
    <span class="kui-menu-item__label">Delete</span>
  </button>
</kui-menu>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuItemDirective,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-menu-example',
  imports: [
    KuiButtonDirective,
    KuiMenuComponent,
    KuiMenuForDirective,
    KuiMenuItemDirective,
    KuiSeparatorDirective,
  ],
  templateUrl: './basic-menu-example.html',
})
export class BasicMenuExample {}`,
    },
  ];

  protected readonly contentTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-menu #rowMenu ariaLabel="Row actions" menuAlign="end" minWidth="220px">
  <div kuiMenuHeader>Project</div>
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__icon" aria-hidden="true">E</span>
    <span class="kui-menu-item__label">Rename</span>
    <span class="kui-menu-item__shortcut">F2</span>
  </button>
  <button type="button" kuiMenuItem disabled>
    <span class="kui-menu-item__label">Archive</span>
  </button>
</kui-menu>`,
    },
  ];
}
