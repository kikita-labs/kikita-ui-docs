import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-autoplay-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-autoplay-example.html',
  styleUrl: './carousel-autoplay-example.scss',
})
export class CarouselAutoplayExample {}
