import { Component, inject } from '@angular/core';

import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  type KuiDrawerContext,
  type KuiDrawerHost,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-size-preview-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './size-preview-drawer.html',
})
export class SizePreviewDrawer implements KuiDrawerHost<void, void> {
  public readonly drawerContext = inject<KuiDrawerContext<void, void>>(KUI_DRAWER_CONTEXT);
}
