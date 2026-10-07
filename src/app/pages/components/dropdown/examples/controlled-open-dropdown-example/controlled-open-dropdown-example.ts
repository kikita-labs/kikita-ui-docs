import { Component, signal } from '@angular/core';

import { KuiButton, KuiDropdown, KuiDropdownFor, KuiOption } from '@kikita-labs/ui';

@Component({
  selector: 'app-controlled-open-dropdown-example',
  imports: [KuiButton, KuiDropdown, KuiDropdownFor, KuiOption],
  templateUrl: './controlled-open-dropdown-example.html',
  styleUrl: './controlled-open-dropdown-example.scss',
})
export class ControlledOpenDropdownExample {
  protected readonly resultsOpen = signal(false);
}
