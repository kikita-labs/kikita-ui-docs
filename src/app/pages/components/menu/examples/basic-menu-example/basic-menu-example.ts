import { Component } from '@angular/core';
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
  styleUrl: './basic-menu-example.scss',
})
export class BasicMenuExample {}
