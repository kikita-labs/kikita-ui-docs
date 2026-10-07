import { Component } from '@angular/core';

import {
  KuiButton,
  KuiMenu,
  KuiMenuFor,
  KuiMenuHeader,
  KuiMenuItem,
  KuiSeparator,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-menu-content-example',
  imports: [KuiButton, KuiMenu, KuiMenuFor, KuiMenuHeader, KuiMenuItem, KuiSeparator],
  templateUrl: './menu-content-example.html',
  styleUrl: './menu-content-example.scss',
})
export class MenuContentExample {}
