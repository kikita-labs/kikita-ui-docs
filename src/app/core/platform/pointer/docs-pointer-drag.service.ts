import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsPointerDragService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private activeCleanup: (() => void) | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  public start(
    startEvent: PointerEvent,
    onHorizontalDelta: (delta: number) => void,
  ): DocsPlatformResult<void> {
    const view = this.document.defaultView;

    if (!this.isBrowser || !view) {
      return docsPlatformFailure('unavailable');
    }

    this.stop();
    this.focusTarget(startEvent);
    startEvent.preventDefault();
    this.capturePointer(startEvent);

    const startX = startEvent.clientX;
    const onMove = (event: Event) => {
      if ('clientX' in event && typeof event.clientX === 'number') {
        onHorizontalDelta(event.clientX - startX);
      }
    };
    const onEnd = () => this.stop();

    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', onEnd);
    view.addEventListener('pointercancel', onEnd);
    this.activeCleanup = () => {
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', onEnd);
      view.removeEventListener('pointercancel', onEnd);
    };

    return docsPlatformSuccess(undefined);
  }

  public stop(): void {
    this.activeCleanup?.();
    this.activeCleanup = null;
  }

  private capturePointer(event: PointerEvent): void {
    const target = event.currentTarget;

    if (target && 'setPointerCapture' in target && typeof target.setPointerCapture === 'function') {
      target.setPointerCapture(event.pointerId);
    }
  }

  private focusTarget(event: PointerEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.focus({ preventScroll: true });
    }
  }
}
