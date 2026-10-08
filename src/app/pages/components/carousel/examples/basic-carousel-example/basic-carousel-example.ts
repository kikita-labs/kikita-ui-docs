import { Component, signal } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-carousel-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './basic-carousel-example.html',
  styleUrl: './basic-carousel-example.scss',
})
export class BasicCarouselExample {
  protected readonly slide = signal(0);
}
