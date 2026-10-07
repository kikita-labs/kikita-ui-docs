import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsPageProbeService } from './docs-page-probe.service';

describe('DocsPageProbeService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function configure(fetch: unknown, platformId = 'browser'): DocsPageProbeService {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { defaultView: { fetch } } },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(DocsPageProbeService);
  }

  it('reports whether the page exists using a HEAD request', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: false });

    expect(await configure(fetch).exists('/docs/v1/missing')).toEqual({ ok: true, value: false });
    expect(fetch).toHaveBeenCalledWith('/docs/v1/missing', { method: 'HEAD', cache: 'no-cache' });
  });

  it('reports a failure when the request cannot be made', async () => {
    const fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    expect(await configure(fetch).exists('/docs/v1/')).toEqual({ ok: false, reason: 'failed' });
  });

  it('is unavailable on the server', async () => {
    const fetch = vi.fn();

    expect(await configure(fetch, 'server').exists('/docs/v1/')).toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
