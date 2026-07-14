import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { DocsMediaService } from './docs-media.service';

describe('DocsMediaService', () => {
  it('projects injected media observations to readonly signals', () => {
    const observe = vi.fn((query: string) =>
      of({
        breakpoints: { [query]: query.includes('color-scheme') },
        matches: query.includes('color-scheme'),
      }),
    );

    TestBed.configureTestingModule({
      providers: [DocsMediaService, { provide: BreakpointObserver, useValue: { observe } }],
    });

    const media = TestBed.inject(DocsMediaService);

    expect(media.prefersDarkScheme()).toBe(true);
    expect(media.prefersReducedMotion()).toBe(false);
    expect(observe).toHaveBeenCalledTimes(2);
  });
});
