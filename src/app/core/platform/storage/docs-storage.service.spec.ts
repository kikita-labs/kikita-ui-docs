import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsStorageService } from './docs-storage.service';

describe('DocsStorageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({ providers: [DocsStorageService] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('round-trips a typed namespaced value', () => {
    const storage = TestBed.inject(DocsStorageService);

    expect(storage.write('kikita-ui-docs.test', { count: 2 }, JSON.stringify)).toEqual({
      ok: true,
      value: undefined,
    });
    expect(
      storage.read('kikita-ui-docs.test', (storedValue) => {
        const parsedValue: unknown = JSON.parse(storedValue);

        return typeof parsedValue === 'object' && parsedValue !== null ? parsedValue : null;
      }),
    ).toEqual({ ok: true, value: { count: 2 } });
  });

  it('reports corrupt persisted data as invalid', () => {
    window.localStorage.setItem('kikita-ui-docs.test', 'corrupt');

    expect(TestBed.inject(DocsStorageService).read('kikita-ui-docs.test', () => null)).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });

  it('turns storage exceptions into typed failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });

    expect(
      TestBed.inject(DocsStorageService).write('kikita-ui-docs.test', 'value', (value) => value),
    ).toEqual({ ok: false, reason: 'failed' });
  });

  it('returns an unavailable server fallback', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [DocsStorageService, { provide: PLATFORM_ID, useValue: 'server' }],
    });

    expect(
      TestBed.inject(DocsStorageService).read('kikita-ui-docs.test', (value) => value),
    ).toEqual({ ok: false, reason: 'unavailable' });
  });
});
