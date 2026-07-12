import { Component, inject } from '@angular/core';
import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  KuiDrawerContext,
  KuiDrawerHost,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-side-preview-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './side-preview-drawer.html',
})
export class SidePreviewDrawer implements KuiDrawerHost<void, void> {
  readonly drawerContext = inject<KuiDrawerContext<void, void>>(KUI_DRAWER_CONTEXT);
}
