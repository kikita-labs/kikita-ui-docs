import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsStaleBuildReloadService } from './docs-stale-build-reload.service';

describe('DocsStaleBuildReloadService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('reloads when a lazy route chunk failed to import', () => {
    const reload = vi.fn();
    const fakeDocument = { defaultView: { location: { reload } } };

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: fakeDocument }],
    });

    const result = TestBed.inject(DocsStaleBuildReloadService).reloadIfStaleChunk(
      new Error('Failed to fetch dynamically imported module: /chunk-ABCD.js'),
    );

    expect(result).toBe(true);
    expect(reload).toHaveBeenCalled();
  });

  it('does not reload for unrelated navigation errors', () => {
    const reload = vi.fn();
    const fakeDocument = { defaultView: { location: { reload } } };

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: fakeDocument }],
    });

    const result = TestBed.inject(DocsStaleBuildReloadService).reloadIfStaleChunk(
      new Error('Cannot match any routes'),
    );

    expect(result).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });

  it('does not reload on the server', () => {
    const reload = vi.fn();
    const fakeDocument = { defaultView: { location: { reload } } };

    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: fakeDocument },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const result = TestBed.inject(DocsStaleBuildReloadService).reloadIfStaleChunk(
      new Error('Failed to fetch dynamically imported module: /chunk-ABCD.js'),
    );

    expect(result).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});
