import { Component } from '@angular/core';

import { KuiButton, KuiDropdown, KuiDropdownFor, KuiOption } from '@kikita-labs/ui';

@Component({
  selector: 'app-panel-width-dropdown-example',
  imports: [KuiButton, KuiDropdown, KuiDropdownFor, KuiOption],
  templateUrl: './panel-width-dropdown-example.html',
  styleUrl: './panel-width-dropdown-example.scss',
})
export class PanelWidthDropdownExample {}
