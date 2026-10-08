import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-controls-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-controls-example.html',
  styleUrl: './carousel-controls-example.scss',
})
export class CarouselControlsExample {}
