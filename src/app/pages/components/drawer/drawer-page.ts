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
import { BasicDrawerExample } from './examples/basic-drawer-example/basic-drawer-example';
import { DrawerSidesExample } from './examples/drawer-sides-example/drawer-sides-example';
import { DrawerSizesExample } from './examples/drawer-sizes-example/drawer-sizes-example';
import { DRAWER_API_ROWS } from './drawer.api-schema';

@Component({
  selector: 'app-drawer-page',
  imports: [
    ApiTable,
    BasicDrawerExample,
    CodeTabs,
    DocSection,
    DrawerSidesExample,
    DrawerSizesExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './drawer-page.html',
  styleUrl: './drawer-page.scss',
})
export class DrawerPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'drawer.ts',
      language: 'ts',
      code: `import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  KuiDrawerContext,
  KuiDrawerHost,
  kuiDrawer,
} from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `// 1. Implement the drawer contract
@Component({
  selector: 'app-edit-item-drawer',
  template: \`
    <div class="kui-drawer-header">
      <div class="kui-drawer-header-text">
        <h2 class="kui-drawer-title">Edit item</h2>
        <div class="kui-drawer-subtitle">{{ drawerContext.data.id }}</div>
      </div>
      <button class="kui-drawer-close" type="button" aria-label="Close"
        (click)="drawerContext.close('cancelled')">
        ...
      </button>
    </div>
    <div class="kui-drawer-body">...</div>
    <div class="kui-drawer-footer">
      <button kuiButton type="button" shape="outline" (click)="drawerContext.close('cancelled')">
        Cancel
      </button>
      <button kuiButton type="button" (click)="drawerContext.close('saved')">Save</button>
    </div>
  \`,
  imports: [KuiButtonDirective],
})
export class EditItemDrawer implements KuiDrawerHost<'saved' | 'cancelled', { id: string }> {
  readonly drawerContext =
    inject<KuiDrawerContext<'saved' | 'cancelled', { id: string }>>(KUI_DRAWER_CONTEXT);
}

// 2. Create a typed opener in an injection context
function injectEditItemDrawer() {
  return kuiDrawer(EditItemDrawer, { side: 'right', size: 'md' });
}

// 3. Open it and react to the typed result
class ItemsPage {
  private readonly openEditItem = injectEditItemDrawer();

  edit(id: string) {
    this.openEditItem({ id })
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result === 'saved') this.reload();
      });
  }
}`,
    },
  ];

  protected readonly sidesTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `const open = kuiDrawer(SidePreviewDrawer, { side: 'bottom', size: 'sm' });
open();`,
    },
  ];

  protected readonly sizesTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `const open = kuiDrawer(SizePreviewDrawer, { side: 'right', size: 'full' });
open();`,
    },
  ];

  protected readonly apiRows = DRAWER_API_ROWS;
}
