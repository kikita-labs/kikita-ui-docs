import { TestBed } from '@angular/core/testing';

import { DocsHeadingObserverService } from './docs-heading-observer.service';

describe('DocsHeadingObserverService', () => {
  const originalObserver = Object.getOwnPropertyDescriptor(window, 'IntersectionObserver');

  afterEach(() => {
    document.getElementById('first')?.remove();

    if (originalObserver) {
      Object.defineProperty(window, 'IntersectionObserver', originalObserver);
    } else {
      Reflect.deleteProperty(window, 'IntersectionObserver');
    }

    TestBed.resetTestingModule();
  });

  it('observes registered headings, publishes the active id, and disconnects on cleanup', () => {
    const heading = document.createElement('h2');
    const activeHeading = vi.fn();

    heading.id = 'first';
    document.body.appendChild(heading);
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: FakeIntersectionObserver,
    });
    TestBed.configureTestingModule({ providers: [DocsHeadingObserverService] });

    const cleanup = TestBed.inject(DocsHeadingObserverService).observe(['first'], activeHeading);
    const observer = FakeIntersectionObserver.latest;

    expect(observer?.observe).toHaveBeenCalledWith(heading);
    observer?.emit(heading);
    expect(activeHeading).toHaveBeenCalledWith('first');

    cleanup();
    expect(observer?.disconnect).toHaveBeenCalledOnce();
  });

  it('returns a safe no-op cleanup when observation is unavailable', () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');
    TestBed.configureTestingModule({ providers: [DocsHeadingObserverService] });

    const cleanup = TestBed.inject(DocsHeadingObserverService).observe(['missing'], vi.fn());

    expect(cleanup()).toBeUndefined();
  });
});

class FakeIntersectionObserver {
  public static latest: FakeIntersectionObserver | null = null;

  public readonly disconnect = vi.fn();
  public readonly observe = vi.fn();

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.latest = this;
  }

  public emit(target: Element): void {
    this.callback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target,
          time: 0,
        },
      ],
      this as unknown as IntersectionObserver,
    );
  }
}
