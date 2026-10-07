import { Component } from '@angular/core';

import { KuiButton, KuiMenu, KuiMenuFor, KuiMenuItem, KuiSeparator } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-menu-example',
  imports: [KuiButton, KuiMenu, KuiMenuFor, KuiMenuItem, KuiSeparator],
  templateUrl: './basic-menu-example.html',
  styleUrl: './basic-menu-example.scss',
})
export class BasicMenuExample {}
