import { Component, signal } from '@angular/core';

import { KuiStep, KuiStepper } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-stepper-example',
  imports: [KuiStep, KuiStepper],
  templateUrl: './basic-stepper-example.html',
  styleUrl: './basic-stepper-example.scss',
})
export class BasicStepperExample {
  protected readonly currentIndex = signal(1);
}
