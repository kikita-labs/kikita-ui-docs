import { Component } from '@angular/core';

import { KuiField, KuiSlider } from '@kikita-labs/ui';

@Component({
  selector: 'app-slider-disabled-example',
  imports: [KuiField, KuiSlider],
  templateUrl: './slider-disabled-example.html',
  styleUrl: './slider-disabled-example.scss',
})
export class SliderDisabledExample {}
