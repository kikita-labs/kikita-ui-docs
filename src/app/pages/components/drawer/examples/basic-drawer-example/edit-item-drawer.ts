import { Component, inject } from '@angular/core';
import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  KuiDrawerContext,
  KuiDrawerHost,
} from '@kikita-labs/ui';

export interface EditItemData {
  readonly id: string;
}

export type EditItemResult = 'saved' | 'cancelled';

@Component({
  selector: 'app-edit-item-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './edit-item-drawer.html',
})
export class EditItemDrawer implements KuiDrawerHost<EditItemResult, EditItemData> {
  readonly drawerContext =
    inject<KuiDrawerContext<EditItemResult, EditItemData>>(KUI_DRAWER_CONTEXT);
}
