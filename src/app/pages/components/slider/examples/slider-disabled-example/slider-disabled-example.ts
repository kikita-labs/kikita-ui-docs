import { Component } from '@angular/core';

import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-slider-disabled-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-disabled-example.html',
  styleUrl: './slider-disabled-example.scss',
})
export class SliderDisabledExample {}
