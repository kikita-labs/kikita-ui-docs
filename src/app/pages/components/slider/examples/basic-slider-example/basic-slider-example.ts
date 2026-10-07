import { Component } from '@angular/core';

import { KuiField, KuiSlider } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-slider-example',
  imports: [KuiField, KuiSlider],
  templateUrl: './basic-slider-example.html',
  styleUrl: './basic-slider-example.scss',
})
export class BasicSliderExample {}
