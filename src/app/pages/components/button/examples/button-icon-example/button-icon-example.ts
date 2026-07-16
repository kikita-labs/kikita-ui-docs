import { Component } from '@angular/core';

import { KuiButtonDirective, KuiIconButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-button-icon-example',
  imports: [KuiButtonDirective, KuiIconButtonDirective],
  templateUrl: './button-icon-example.html',
  styleUrl: './button-icon-example.scss',
})
export class ButtonIconExample {}
