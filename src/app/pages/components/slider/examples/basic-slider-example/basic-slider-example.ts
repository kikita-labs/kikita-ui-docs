import { Component } from '@angular/core';
import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-slider-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './basic-slider-example.html',
  styleUrl: './basic-slider-example.scss',
})
export class BasicSliderExample {}
