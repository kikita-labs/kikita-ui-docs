import { Component, inject } from '@angular/core';

import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  type KuiDrawerContext,
  type KuiDrawerHost,
} from '@kikita-labs/ui';

export interface PlaygroundDrawerData {
  readonly title: string;
  readonly message: string;
}

@Component({
  selector: 'app-playground-drawer-content',
  imports: [KuiButtonDirective],
  templateUrl: './playground-drawer-content.html',
})
export class PlaygroundDrawerContent implements KuiDrawerHost<
  'confirmed' | null,
  PlaygroundDrawerData
> {
  public readonly drawerContext =
    inject<KuiDrawerContext<'confirmed' | null, PlaygroundDrawerData>>(KUI_DRAWER_CONTEXT);
}
