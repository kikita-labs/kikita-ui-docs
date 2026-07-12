import { Component } from '@angular/core';
import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-panel-width-dropdown-example',
  imports: [KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './panel-width-dropdown-example.html',
  styleUrl: './panel-width-dropdown-example.scss',
})
export class PanelWidthDropdownExample {}
