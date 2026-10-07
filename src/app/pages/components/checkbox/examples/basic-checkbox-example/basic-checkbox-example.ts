import { Component, signal } from '@angular/core';

import { KuiCheckbox, KuiField } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-checkbox-example',
  imports: [KuiCheckbox, KuiField],
  templateUrl: './basic-checkbox-example.html',
  styleUrl: './basic-checkbox-example.scss',
})
export class BasicCheckboxExample {
  protected readonly receiveUpdates = signal(true);
}
