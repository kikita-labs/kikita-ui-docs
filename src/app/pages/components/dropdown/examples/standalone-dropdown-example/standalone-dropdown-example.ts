import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiDropdownForDirective,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-standalone-dropdown-example',
  imports: [KuiButtonDirective, KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './standalone-dropdown-example.html',
})
export class StandaloneDropdownExample {}
