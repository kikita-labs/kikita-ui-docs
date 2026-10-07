import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsLocationService } from './docs-location.service';

describe('DocsLocationService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function configure(platformId: string, assign = vi.fn()): DocsLocationService {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { defaultView: { location: { assign } } } },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(DocsLocationService);
  }

  it('assigns the target URL in the browser', () => {
    const assign = vi.fn();

    expect(configure('browser', assign).navigate('/docs/v1/')).toEqual({
      ok: true,
      value: undefined,
    });
    expect(assign).toHaveBeenCalledWith('/docs/v1/');
  });

  it('is unavailable on the server', () => {
    const assign = vi.fn();

    expect(configure('server', assign).navigate('/docs/v1/')).toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(assign).not.toHaveBeenCalled();
  });
});
