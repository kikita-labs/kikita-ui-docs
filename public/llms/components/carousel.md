# Carousel

> Horizontal strip of slides with arrows, a dot picker and optional autoplay.

- Status: available
- Route: /components/carousel
- Package: @kikita-labs/ui@2.0.0
- Import: KuiCarousel from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/carousel.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-carousel ariaLabel="Product photos" [(index)]="slide">
  <div kuiCarouselSlide><img src="photo-1.jpg" alt="" /></div>
  <div kuiCarouselSlide><img src="photo-2.jpg" alt="" /></div>
  <div kuiCarouselSlide><img src="photo-3.jpg" alt="" /></div>
</kui-carousel>
```

```ts
protected readonly slide = signal(0);
```

`ariaLabel` defaults to the `carousel.label` message (`Slides`) and should use a content-specific name when one is available. It
must not contain the word "carousel" -- the region's own `aria-roledescription="carousel"`
already announces that to screen readers.

## Examples

Rendered at /components/carousel:

### basic-carousel-example

#### basic-carousel-example.html

```html
<div class="carousel-example">
  <kui-carousel ariaLabel="Product photos" [(index)]="slide">
    <div kuiCarouselSlide class="carousel-slide">Slide 1</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 2</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 3</div>
  </kui-carousel>
</div>
```

#### basic-carousel-example.ts

```ts
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
```

#### basic-carousel-example.scss

```scss
.carousel-example {
  inline-size: min(100%, 520px);
}

.carousel-slide {
  display: grid;
  place-items: center;
  min-block-size: 120px;
  font-weight: var(--kui-font-weight-semibold, 600);
  color: var(--kui-color-text);
}
```

### carousel-items-example

#### carousel-items-example.html

```html
<div class="carousel-example">
  <kui-carousel ariaLabel="Two at a time" [itemsPerView]="2" loop>
    <div kuiCarouselSlide class="carousel-slide">Slide 1</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 2</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 3</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 4</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 5</div>
  </kui-carousel>
</div>
```

#### carousel-items-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-items-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-items-example.html',
  styleUrl: './carousel-items-example.scss',
})
export class CarouselItemsExample {}
```

#### carousel-items-example.scss

```scss
.carousel-example {
  inline-size: min(100%, 520px);
}

.carousel-slide {
  display: grid;
  place-items: center;
  min-block-size: 120px;
  font-weight: var(--kui-font-weight-semibold, 600);
  color: var(--kui-color-text);
}
```

### carousel-autoplay-example

#### carousel-autoplay-example.html

```html
<div class="carousel-example">
  <kui-carousel ariaLabel="Autoplay slides" autoplay [autoplayInterval]="4000">
    <div kuiCarouselSlide class="carousel-slide">Slide 1</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 2</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 3</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 4</div>
  </kui-carousel>
</div>
```

#### carousel-autoplay-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-autoplay-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-autoplay-example.html',
  styleUrl: './carousel-autoplay-example.scss',
})
export class CarouselAutoplayExample {}
```

#### carousel-autoplay-example.scss

```scss
.carousel-example {
  inline-size: min(100%, 520px);
}

.carousel-slide {
  display: grid;
  place-items: center;
  min-block-size: 120px;
  font-weight: var(--kui-font-weight-semibold, 600);
  color: var(--kui-color-text);
}
```

### carousel-controls-example

#### carousel-controls-example.html

```html
<div class="carousel-example">
  <kui-carousel ariaLabel="Dots only" [showArrows]="false" [draggable]="false">
    <div kuiCarouselSlide class="carousel-slide">Slide 1</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 2</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 3</div>
  </kui-carousel>
</div>
```

#### carousel-controls-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';

@Component({
  selector: 'app-carousel-controls-example',
  imports: [KuiCarousel, KuiCarouselSlide],
  templateUrl: './carousel-controls-example.html',
  styleUrl: './carousel-controls-example.scss',
})
export class CarouselControlsExample {}
```

#### carousel-controls-example.scss

```scss
.carousel-example {
  inline-size: min(100%, 520px);
}

.carousel-slide {
  display: grid;
  place-items: center;
  min-block-size: 120px;
  font-weight: var(--kui-font-weight-semibold, 600);
  color: var(--kui-color-text);
}
```

### carousel-messages-example

#### carousel-messages-example.html

```html
<div class="carousel-example">
  <kui-carousel [messages]="messages">
    <div kuiCarouselSlide class="carousel-slide">Slide 1</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 2</div>
    <div kuiCarouselSlide class="carousel-slide">Slide 3</div>
  </kui-carousel>
</div>
```

#### carousel-messages-example.ts

```ts
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
```

#### carousel-messages-example.scss

```scss
.carousel-example {
  inline-size: min(100%, 520px);
}

.carousel-slide {
  display: grid;
  place-items: center;
  min-block-size: 120px;
  font-weight: var(--kui-font-weight-semibold, 600);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| itemsPerView | number \| undefined | undefined | How many slides are visible at once (defaults.carousel.itemsPerView, then 1). Invalid or non-positive static values use 1. The highest reachable index is slideCount - itemsPerView, and the dot picker renders exactly that many dots. |
| loop | boolean \| undefined | undefined | Wraps navigation at the edges instead of disabling Prev and Next there. Falls back to defaults.carousel.loop, then false. |
| autoplay | boolean \| undefined | undefined | Advances automatically on a timer and always shows Play/Pause; pauses while the pointer, focus or a touch is inside. Falls back to defaults.carousel.autoplay, then false. |
| autoplayInterval | number \| undefined | undefined | Autoplay delay between slides in ms (defaults.carousel.autoplayInterval, then 4000). Invalid or non-positive static values use 4000. |
| showArrows | boolean \| undefined | undefined | Shows the Prev and Next arrows (defaults.carousel.showArrows, then true). Swipe and scroll work regardless. |
| showDots | boolean \| undefined | undefined | Shows the dot picker below the track (defaults.carousel.showDots, then true). Swipe and scroll work regardless. |
| draggable | boolean \| undefined | undefined | Adds mouse drag-to-scroll on top of the always-native touch swipe (defaults.carousel.draggable, then true). false also locks wheel and trackpad scroll and removes the track from the tab order. |
| ariaLabel | string \| undefined | undefined | Accessible name of the region. Falls back to the carousel.label message (Slides); use a content-specific name that does not contain "carousel". |
| messages | Partial<KuiCarouselMessages> \| undefined | undefined | Per-instance text overrides for the label, role descriptions, controls and slide names. They win over scoped and root messages. |
| [(index)] | number | 0 | Index of the first visible slide. A debounced scroll listener snaps it to the nearest slide after a swipe or drag. |
| (indexChange) | number | - | Emitted whenever index changes (model output). |
| [kuiCarouselSlide] | content slot | - | Marks projected slide content: role="group" with aria-roledescription="slide" and an "N of total" name. It has no inputs. |
| --kui-carousel-gap / -radius / -slide-radius | CSS custom properties | - | Gap between slides and the region and slide corner radii. |
| --kui-carousel-bg / -border / -slide-bg | CSS custom properties | - | Region background and border and the slide backdrop. |
| --kui-carousel-control-bg / -control-shadow | CSS custom properties | - | Backdrop circle and shadow of the Prev, Next and Play controls. |
| --kui-carousel-dot-bg / -dot-bg-active / -dot-size | CSS custom properties | - | Colour of the dots, the active dot and the dot size. |
| KuiCarouselOptions | interface | - | Shape of defaults.carousel: itemsPerView, loop, autoplay, autoplayInterval, showArrows, showDots, draggable, previousIcon and nextIcon. |

## Accessibility

- The outer element is `role="region"` with `aria-roledescription="carousel"` and `ariaLabel`,
  which defaults to `Slides`; provide a content-specific label where possible.
- Each slide is `role="group"` with `aria-roledescription="slide"` and an `aria-label` of
  `"N of total"`.
- The dot picker follows the "tabbed carousel" variant: `role="tablist"`/`role="tab"`,
  `aria-selected`, `aria-controls` pointing at the corresponding slide's `id`, and roving
  `tabindex` (only the selected dot is in the natural tab order; arrow keys/`Home`/`End` move
  both focus and selection between dots).
- The region itself also responds to `ArrowLeft`/`ArrowRight`/`Home`/`End` to move the current
  slide, independent of dot focus.
- While `draggable` is `true` the slide track is a scrollable region, so it is a keyboard tab stop
  (`tabindex="0"`) with a visible focus ring; the arrow keys above then move slides even when the
  arrows and dots are hidden. With `draggable=false` the track does not scroll and is not a tab stop.
- Prev/Next/Play/Pause are `button[kuiIconButton]` with a required `aria-label`, no visible text.
- Range boundaries (when `loop` is `false`) use the native `disabled` attribute on Prev/Next,
  removing them from tab order, not just dimming them.
- Play/Pause order and pausing autoplay on hover/focus follow the W3C APG "Auto-Rotating Image
  Carousel Example".
- Mouse drag-to-scroll (`draggable`, default `true`) is an added affordance on top of the required
  non-drag alternatives (Prev/Next buttons, dots, keyboard) -- never the only way to navigate,
  except in the same intentionally-noncompliant `showArrows=false, showDots=false` combination
  already called out above.
- Combining `autoplay` with `showArrows=false`, `showDots=false`, and `draggable=false` leaves no
  way to pause a self-updating carousel by hand, which conflicts with WCAG 2.2.2 (Pause, Stop,
  Hide) for content that auto-updates for longer than 5 seconds. Every one of those props is
  reachable individually for other reasons; this specific combination is a deliberate, documented
  spec trade-off (see the design spec's own open questions), not a recommended production pattern
  -- only use it for purely decorative rotation that carries no information a user would need to
  pause and read.

| Key                      | Where       | Action                                      |
| ------------------------ | ----------- | ------------------------------------------- |
| `ArrowLeft`/`ArrowRight` | Region      | Previous/next slide.                        |
| `Home`/`End`             | Region      | Jump to the first/last reachable slide.     |
| `ArrowLeft`/`ArrowRight` | Dot picker  | Move focus and selection between dots.      |
| `Home`/`End`             | Dot picker  | Move focus and selection to first/last dot. |
| `Enter`/`Space`          | Any control | Activates the focused button.               |

## Playground

Available at /components/carousel/playground.
