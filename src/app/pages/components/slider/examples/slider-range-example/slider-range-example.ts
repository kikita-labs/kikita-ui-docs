import { Component } from '@angular/core';
import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-slider-range-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-range-example.html',
  styleUrl: './slider-range-example.scss',
})
export class SliderRangeExample {}
