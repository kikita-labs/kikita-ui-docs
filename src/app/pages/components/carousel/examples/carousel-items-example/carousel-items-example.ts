import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-items-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-items-example.html',
  styleUrl: './carousel-items-example.scss',
})
export class CarouselItemsExample {}
