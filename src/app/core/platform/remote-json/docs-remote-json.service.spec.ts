import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsRemoteJsonService } from './docs-remote-json.service';

describe('DocsRemoteJsonService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function configure(fetch: unknown, platformId = 'browser'): DocsRemoteJsonService {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { defaultView: { fetch } } },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(DocsRemoteJsonService);
  }

  it('returns the parsed JSON payload', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ a: 1 }) });

    expect(await configure(fetch).load('/versions.json')).toEqual({ ok: true, value: { a: 1 } });
    expect(fetch).toHaveBeenCalledWith('/versions.json', { cache: 'no-cache' });
  });

  it('reports a failed result for HTTP errors and network errors', async () => {
    const notFound = vi.fn().mockResolvedValue({ ok: false });
    const offline = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    expect(await configure(notFound).load('/versions.json')).toEqual({
      ok: false,
      reason: 'failed',
    });
    TestBed.resetTestingModule();
    expect(await configure(offline).load('/versions.json')).toEqual({
      ok: false,
      reason: 'failed',
    });
  });

  it('is unavailable on the server without calling fetch', async () => {
    const fetch = vi.fn();

    expect(await configure(fetch, 'server').load('/versions.json')).toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
