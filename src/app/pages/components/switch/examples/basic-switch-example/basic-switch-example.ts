import { Component } from '@angular/core';
import { KuiFieldComponent, KuiSwitchDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-switch-example',
  imports: [KuiFieldComponent, KuiSwitchDirective],
  templateUrl: './basic-switch-example.html',
  styleUrl: './basic-switch-example.scss',
})
export class BasicSwitchExample {}
