import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { DocsMediaService } from './docs-media.service';

describe('DocsMediaService', () => {
  it('projects injected media observations to readonly signals', () => {
    const observe = vi.fn((query: string) =>
      of({
        breakpoints: { [query]: query.includes('color-scheme') || query.includes('contrast') },
        matches: query.includes('color-scheme') || query.includes('contrast'),
      }),
    );

    TestBed.configureTestingModule({
      providers: [DocsMediaService, { provide: BreakpointObserver, useValue: { observe } }],
    });

    const media = TestBed.inject(DocsMediaService);

    expect(media.prefersDarkScheme()).toBe(true);
    expect(media.prefersReducedMotion()).toBe(false);
    expect(media.prefersMoreContrast()).toBe(true);
    expect(observe).toHaveBeenCalledTimes(3);
  });
});
