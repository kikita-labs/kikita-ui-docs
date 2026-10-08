# Media Viewer

> Fullscreen photo lightbox with navigation, thumbnails and zoom.

- Status: available
- Route: /components/media-viewer
- Package: @kikita-labs/ui@2.0.0
- Import: kuiMediaViewer from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/media-viewer.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```ts
class PhotoGrid {
  private readonly openViewer = kuiMediaViewer();

  protected readonly photos: KuiMediaViewerItem[] = [
    { id: 'p1', src: '/photos/1.jpg', alt: 'Sunset over the bay' },
    { id: 'p2', src: '/photos/2.jpg', alt: 'City skyline at night' },
  ];

  protected openPhotoAt(index: number): void {
    this.openViewer({ items: this.photos, index });
  }
}
```

```html
@for (photo of photos; track photo.id) {
<button type="button" (click)="openPhotoAt($index)">
  <img [src]="photo.src" [alt]="photo.alt" />
</button>
}
```

`kuiMediaViewer()` must be called during an injection context (a component/directive constructor
or field initializer), exactly like `kuiDialog()`/`kuiConfirm()`/`kuiDrawer()`.

### Multi-select composition

A per-tile `input[type=checkbox][kuiCheckbox]` next to (not inside) the cover button is the
consumer's own composition, not a `kuiMediaViewer()` option:

```html
@for (photo of photos; track photo.id) {
<div style="position: relative">
  <button
    type="button"
    (click)="openPhotoAt($index)"
    [attr.aria-label]="'Open photo ' + ($index + 1)"
  >
    <img [src]="photo.src" [alt]="photo.alt" />
  </button>
  <input
    type="checkbox"
    kuiCheckbox
    [checked]="isSelected(photo.id)"
    (change)="toggleSelected(photo.id)"
    aria-label="Select photo"
  />
</div>
}
```

### Single photo, no gallery chrome

```ts
this.openViewer({ items: [{ src: '/photos/1.jpg', alt: 'Sunset over the bay' }] });
```

Just zoom and Close -- no counter, no Prev/Next, no thumbnail strip. `id` is optional here too
(defaults to `src`).

### Live index

```ts
this.openViewer({
  items: this.photos,
  index: 0,
  onIndexChange: (index) => this.lastViewedIndex.set(index),
});
```

`onIndexChange` fires once on open (with the clamped initial index) and again on every
prev/next/thumbnail/keyboard navigation while the lightbox stays open.

## Examples

Rendered at /components/media-viewer:

### basic-media-viewer-example

#### basic-media-viewer-example.html

```html
<div class="media-viewer-example">
  @for (photo of photos; track photo.id) {
    <button type="button" class="media-viewer-example__tile" (click)="openPhotoAt($index)">
      <img [src]="photo.src" [alt]="photo.alt" />
    </button>
  }
  <span>Last viewed index: {{ lastViewed() }}</span>
</div>
```

#### basic-media-viewer-example.ts

```ts
import { Component, signal } from '@angular/core';

import { kuiMediaViewer, type KuiMediaViewerItem } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-basic-media-viewer-example',
  imports: [],
  templateUrl: './basic-media-viewer-example.html',
  styleUrl: './basic-media-viewer-example.scss',
})
export class BasicMediaViewerExample {
  protected readonly photos: readonly KuiMediaViewerItem[] = [
    { id: 'p1', src: photoSource('Sunset', '#f59e0b'), alt: 'Sunset over the bay' },
    { id: 'p2', src: photoSource('Skyline', '#6366f1'), alt: 'City skyline at night' },
    { id: 'p3', src: photoSource('Forest', '#10b981'), alt: 'Forest in the morning' },
    { id: 'p4', src: photoSource('Desert', '#ef4444'), alt: 'Dunes at noon' },
  ];
  protected readonly lastViewed = signal(0);
  private readonly openViewer = kuiMediaViewer();

  protected openPhotoAt(index: number): void {
    this.openViewer({
      items: this.photos,
      index,
      onIndexChange: (viewed) => this.lastViewed.set(viewed),
    });
  }
}
```

#### basic-media-viewer-example.scss

```scss
.media-viewer-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
}

.media-viewer-example__tile {
  display: block;
  padding: 0;
  border: 1px solid var(--kui-color-border);
  border-radius: var(--kui-radius-md, 8px);
  background: none;
  cursor: pointer;
  overflow: hidden;
}

.media-viewer-example__tile img {
  display: block;
  inline-size: 96px;
  block-size: 64px;
  object-fit: cover;
}
```

### media-viewer-single-example

#### media-viewer-single-example.html

```html
<div class="media-viewer-example">
  <button kuiButton type="button" (click)="open()">Open a single photo</button>
</div>
```

#### media-viewer-single-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButton, kuiMediaViewer } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-media-viewer-single-example',
  imports: [KuiButton],
  templateUrl: './media-viewer-single-example.html',
  styleUrl: './media-viewer-single-example.scss',
})
export class MediaViewerSingleExample {
  private readonly openViewer = kuiMediaViewer();

  protected open(): void {
    this.openViewer({
      items: [{ src: photoSource('Single', '#0ea5e9'), alt: 'A single photo' }],
      maxZoom: 4,
      zoomStep: 1,
    });
  }
}
```

#### media-viewer-single-example.scss

```scss
.media-viewer-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
}

.media-viewer-example__tile {
  display: block;
  padding: 0;
  border: 1px solid var(--kui-color-border);
  border-radius: var(--kui-radius-md, 8px);
  background: none;
  cursor: pointer;
  overflow: hidden;
}

.media-viewer-example__tile img {
  display: block;
  inline-size: 96px;
  block-size: 64px;
  object-fit: cover;
}
```

### media-viewer-select-example

#### media-viewer-select-example.html

```html
<div class="media-viewer-example">
  @for (photo of photos; track photo.id) {
    <div class="media-viewer-example__cell">
      <button
        type="button"
        class="media-viewer-example__tile"
        [attr.aria-label]="'Open photo ' + ($index + 1)"
        (click)="openPhotoAt($index)"
      >
        <img [src]="photo.src" [alt]="photo.alt" />
      </button>
      <input
        type="checkbox"
        kuiCheckbox
        aria-label="Select photo"
        [checked]="isSelected(photo.id ?? photo.src)"
        (change)="toggle(photo.id ?? photo.src)"
      />
    </div>
  }
  <span>{{ selected().size }} selected</span>
</div>
```

#### media-viewer-select-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCheckbox, kuiMediaViewer, type KuiMediaViewerItem } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-media-viewer-select-example',
  imports: [KuiCheckbox],
  templateUrl: './media-viewer-select-example.html',
  styleUrl: './media-viewer-select-example.scss',
})
export class MediaViewerSelectExample {
  protected readonly photos: readonly KuiMediaViewerItem[] = [
    { id: 'p1', src: photoSource('Sunset', '#f59e0b'), alt: 'Sunset over the bay' },
    { id: 'p2', src: photoSource('Skyline', '#6366f1'), alt: 'City skyline at night' },
    { id: 'p3', src: photoSource('Forest', '#10b981'), alt: 'Forest in the morning' },
    { id: 'p4', src: photoSource('Desert', '#ef4444'), alt: 'Dunes at noon' },
  ];
  protected readonly selected = signal<ReadonlySet<string>>(new Set());
  private readonly openViewer = kuiMediaViewer();

  protected isSelected(id: string): boolean {
    return this.selected().has(id);
  }

  protected toggle(id: string): void {
    this.selected.update((current) => {
      const next = new Set(current);

      if (!next.delete(id)) {
        next.add(id);
      }

      return next;
    });
  }

  protected openPhotoAt(index: number): void {
    this.openViewer({ items: this.photos, index });
  }
}
```

#### media-viewer-select-example.scss

```scss
.media-viewer-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
}

.media-viewer-example__tile {
  display: block;
  padding: 0;
  border: 1px solid var(--kui-color-border);
  border-radius: var(--kui-radius-md, 8px);
  background: none;
  cursor: pointer;
  overflow: hidden;
}

.media-viewer-example__tile img {
  display: block;
  inline-size: 96px;
  block-size: 64px;
  object-fit: cover;
}

.media-viewer-example__cell {
  position: relative;
}

.media-viewer-example__cell input {
  position: absolute;
  inset-block-start: var(--kui-space-1, 4px);
  inset-inline-start: var(--kui-space-1, 4px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiMediaViewer() | () => (data: KuiMediaViewerData) => Observable<void \| undefined> | - | Returns the opener. Call it in an injection context (a constructor or field initializer), like kuiDialog(). The Observable completes when the lightbox closes (Close, Escape or backdrop) and carries no value. |
| items | readonly KuiMediaViewerItem[] | - | Required. Photos to browse, at least one. A single item hides the counter, Prev, Next and the thumbnail strip, leaving zoom and Close. |
| index | number \| undefined | 0 | Index to open on, clamped to the valid range. |
| maxZoom | number \| undefined | 3 | Upper zoom bound. |
| zoomStep | number \| undefined | 0.5 | Zoom increment per Zoom in or Zoom out click and per wheel event. |
| ariaLabel | string \| undefined | mediaViewer.label message | Base accessible name of the lightbox (Photo viewer). The position, photo N of total, is appended automatically. |
| messages | Partial<KuiMediaViewerMessages> \| undefined | undefined | Text overrides for this viewer: name, zoom, close, previous, next, thumbnail, position and load error texts. They win over scoped and root messages. |
| onIndexChange | (index: number) => void | - | Called once on open with the clamped initial index and on every Prev, Next, thumbnail or keyboard navigation. |
| KuiMediaViewerItem.id | string \| undefined | src | Stable identifier for tracking and thumbnail keys. Pass it only when two items can share a src. |
| KuiMediaViewerItem.src | string | - | Image URL. The viewer never fetches or transforms it. |
| KuiMediaViewerItem.alt | string | - | Alt text. Required; pass an empty string explicitly for a decorative photo. |
| KuiDialogSize "fullscreen" | dialog size | - | The panel is a KuiDialog with the fullscreen size, which any dialog content may also request. |

## Accessibility

- The panel is `role="dialog"` + `aria-modal="true"` (from `KuiDialog`), `aria-labelledby`
  pointing at a visually-hidden `<h2>` reading "Photo viewer, photo N of total" for a gallery, or
  just "Photo viewer" (the `ariaLabel` alone) for a single photo.
- Focus trap, focus restore to the trigger element on close, and page scroll lock come from
  `KuiDialog`, not reimplemented here.
- The counter is `aria-live="polite"`, announced on navigation without reopening the dialog. Not
  rendered at all for a single photo -- "1 / 1" carries no information.
- Close/Prev/Next/Zoom in/Zoom out are `button[kuiIconButton]`; Prev/Next/Zoom in/Zoom out get
  native `disabled` at their bounds instead of only a dimmed appearance. Prev/Next are not rendered
  at all for a single photo, rather than shown permanently disabled.
- Every thumbnail is a real `<button>` with an `aria-label` ("Go to photo N of total") and
  `aria-current="true"` on the currently viewed one.

| Key             | Action                                                             |
| --------------- | ------------------------------------------------------------------ |
| Tab / Shift+Tab | Cycles focus inside the lightbox (trap from `KuiDialog`).          |
| Escape          | Closes the lightbox.                                               |
| Left / Right    | Previous / next photo. Does not wrap -- bounds disable the button. |
| Home / End      | First / last photo.                                                |
| Enter / Space   | Activates the focused button (native).                             |

## Playground

Available at /components/media-viewer/playground.
