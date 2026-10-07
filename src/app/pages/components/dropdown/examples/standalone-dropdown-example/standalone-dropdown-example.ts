import { Component } from '@angular/core';

import { KuiButton, KuiDropdown, KuiDropdownFor, KuiOption } from '@kikita-labs/ui';

@Component({
  selector: 'app-standalone-dropdown-example',
  imports: [KuiButton, KuiDropdown, KuiDropdownFor, KuiOption],
  templateUrl: './standalone-dropdown-example.html',
})
export class StandaloneDropdownExample {}
