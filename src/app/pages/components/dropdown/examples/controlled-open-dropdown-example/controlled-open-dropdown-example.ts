import { Component, signal } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiDropdownForDirective,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-controlled-open-dropdown-example',
  imports: [KuiButtonDirective, KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './controlled-open-dropdown-example.html',
  styleUrl: './controlled-open-dropdown-example.scss',
})
export class ControlledOpenDropdownExample {
  protected readonly resultsOpen = signal(false);
}
