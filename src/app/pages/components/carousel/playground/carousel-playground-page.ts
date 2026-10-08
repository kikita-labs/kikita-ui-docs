import { Component, signal } from '@angular/core';

import { KuiCarousel, type KuiCarouselMessages, KuiCarouselSlide } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_MESSAGES_CONTROL,
  playgroundBinding,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CAROUSEL_API_ROWS } from '../carousel.api-schema';
import { CAROUSEL_API_DESCRIPTION } from '../carousel.docs-content';
import { CAROUSEL_PLAYGROUND_MESSAGES } from './constants';

const CAROUSEL_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'slides', label: 'slides (sample count)', kind: 'number', defaultValue: 5 },
  { key: 'itemsPerView', label: 'itemsPerView', kind: 'number', defaultValue: 1 },
  { key: 'autoplayInterval', label: 'autoplayInterval', kind: 'number', defaultValue: 4000 },
  { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: '' },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'loop', label: 'loop', kind: 'boolean', defaultValue: false },
  { key: 'autoplay', label: 'autoplay', kind: 'boolean', defaultValue: false },
  { key: 'showArrows', label: 'showArrows', kind: 'boolean', defaultValue: true },
  { key: 'showDots', label: 'showDots', kind: 'boolean', defaultValue: true },
  { key: 'draggable', label: 'draggable', kind: 'boolean', defaultValue: true },
] as const);

type CarouselPlaygroundValues = PlaygroundValues<typeof CAROUSEL_PLAYGROUND_CONTROLS>;

function carouselSlideNumbers(values: CarouselPlaygroundValues): readonly number[] {
  return Array.from({ length: Math.max(1, Math.round(values.slides)) }, (_, i) => i + 1);
}

@Component({
  selector: 'app-carousel-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCarousel, KuiCarouselSlide, PlaygroundEventLogView],
  templateUrl: './carousel-playground-page.html',
  styleUrl: './carousel-playground-page.scss',
})
export class CarouselPlaygroundPage {
  protected readonly apiDescription = CAROUSEL_API_DESCRIPTION;
  protected readonly apiRows = CAROUSEL_API_ROWS;
  protected readonly index = signal(0);
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = CAROUSEL_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: CarouselPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding(
        'itemsPerView',
        values.itemsPerView === 1 ? null : String(values.itemsPerView),
      ),
      { name: 'loop', value: values.loop },
      { name: 'autoplay', value: values.autoplay },
      playgroundBinding(
        'autoplayInterval',
        values.autoplay && values.autoplayInterval !== 4000
          ? String(values.autoplayInterval)
          : null,
      ),
      playgroundBinding('showArrows', values.showArrows ? null : 'false'),
      playgroundBinding('showDots', values.showDots ? null : 'false'),
      playgroundBinding('draggable', values.draggable ? null : 'false'),
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
    ]);
    const slides = carouselSlideNumbers(values)
      .map((number) => `  <div kuiCarouselSlide>Slide ${number}</div>`)
      .join('\n');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-carousel [(index)]="slide"${attrString}>\n${slides}\n</kui-carousel>`,
      },
    ];
  };

  protected slideNumbers(values: CarouselPlaygroundValues): readonly number[] {
    return carouselSlideNumbers(values);
  }

  protected itemsPerViewOf(values: CarouselPlaygroundValues): number {
    return values.itemsPerView;
  }

  protected autoplayIntervalOf(values: CarouselPlaygroundValues): number {
    return values.autoplayInterval;
  }

  protected ariaLabelOf(values: CarouselPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(values: CarouselPlaygroundValues): Partial<KuiCarouselMessages> | undefined {
    return values.messages === 'custom' ? CAROUSEL_PLAYGROUND_MESSAGES : undefined;
  }

  protected loopOf(values: CarouselPlaygroundValues): boolean {
    return values.loop;
  }

  protected autoplayOf(values: CarouselPlaygroundValues): boolean {
    return values.autoplay;
  }

  protected showArrowsOf(values: CarouselPlaygroundValues): boolean {
    return values.showArrows;
  }

  protected showDotsOf(values: CarouselPlaygroundValues): boolean {
    return values.showDots;
  }

  protected draggableOf(values: CarouselPlaygroundValues): boolean {
    return values.draggable;
  }

  protected onIndexChange(index: number): void {
    this.index.set(index);
    this.eventLog.log('indexChange', index);
  }
}
