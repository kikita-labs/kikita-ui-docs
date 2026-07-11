import { OverlayContainer } from '@angular/cdk/overlay';
import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable()
export class ApiPlaygroundOverlayContainer extends OverlayContainer {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected override _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('cdk-overlay-container');
    this.overlayRoot().appendChild(container);
    this._containerElement = container;
  }

  private overlayRoot(): HTMLElement {
    return (
      this.host.nativeElement.querySelector<HTMLElement>(
        '.api-playground-viewport__overlay-root',
      ) ?? this.host.nativeElement
    );
  }
}
