import { Component } from '@angular/core';

import { KuiCarousel, type KuiCarouselMessages, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-messages-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-messages-example.html',
  styleUrl: './carousel-messages-example.scss',
})
export class CarouselMessagesExample {
  protected readonly messages: Partial<KuiCarouselMessages> = {
    label: 'Galerie',
    previous: 'Vorherige Folie',
    next: 'Naechste Folie',
    dots: 'Folie waehlen',
  };
}
