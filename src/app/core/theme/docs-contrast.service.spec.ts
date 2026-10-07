import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsMediaService } from '@core/platform/media';

import { DocsContrastService } from './docs-contrast.service';
import { DOCS_CONTRAST_STORAGE_KEY } from './docs-theme-storage-key';

describe('DocsContrastService', () => {
  const prefersMoreContrast = signal(false);

  beforeEach(() => {
    window.localStorage.clear();
    prefersMoreContrast.set(false);
    TestBed.configureTestingModule({
      providers: [{ provide: DocsMediaService, useValue: { prefersMoreContrast } }],
    });
  });

  it('draws soft without an explicit choice and stores nothing', () => {
    const service = TestBed.inject(DocsContrastService);
    TestBed.tick();

    expect(service.choice()).toBeNull();
    expect(service.contrast()).toBe('soft');
    expect(window.localStorage.getItem(DOCS_CONTRAST_STORAGE_KEY)).toBeNull();
  });

  it('follows a system request for more contrast until a choice is made', () => {
    const service = TestBed.inject(DocsContrastService);

    prefersMoreContrast.set(true);
    expect(service.contrast()).toBe('strict');

    service.set('soft');
    expect(service.contrast()).toBe('soft');
  });

  it('persists an explicit choice and clears it on reset', () => {
    const service = TestBed.inject(DocsContrastService);

    service.set('strict');
    TestBed.tick();
    expect(window.localStorage.getItem(DOCS_CONTRAST_STORAGE_KEY)).toBe('strict');

    service.reset();
    TestBed.tick();
    expect(service.choice()).toBeNull();
    expect(window.localStorage.getItem(DOCS_CONTRAST_STORAGE_KEY)).toBeNull();
  });

  it('restores a stored choice and drops an invalid one', () => {
    window.localStorage.setItem(DOCS_CONTRAST_STORAGE_KEY, 'strict');
    expect(TestBed.inject(DocsContrastService).choice()).toBe('strict');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: DocsMediaService, useValue: { prefersMoreContrast } }],
    });
    window.localStorage.setItem(DOCS_CONTRAST_STORAGE_KEY, 'loud');

    expect(TestBed.inject(DocsContrastService).choice()).toBeNull();
    expect(window.localStorage.getItem(DOCS_CONTRAST_STORAGE_KEY)).toBeNull();
  });
});
