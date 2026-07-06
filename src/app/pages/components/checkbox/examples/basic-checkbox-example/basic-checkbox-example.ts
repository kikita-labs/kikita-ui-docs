import { Component, signal } from '@angular/core';
import { KuiCheckboxDirective, KuiFieldComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-checkbox-example',
  imports: [KuiCheckboxDirective, KuiFieldComponent],
  templateUrl: './basic-checkbox-example.html',
  styleUrl: './basic-checkbox-example.scss',
})
export class BasicCheckboxExample {
  protected readonly receiveUpdates = signal(true);
}
