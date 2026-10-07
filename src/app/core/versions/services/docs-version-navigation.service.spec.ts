import { TestBed } from '@angular/core/testing';

import { docsPlatformFailure, docsPlatformSuccess } from '@core/platform';
import { DocsLocationService } from '@core/platform/location';
import { DocsPageProbeService } from '@core/platform/page-probe';

import type { DocsVersion } from '../interfaces';
import { DocsVersionNavigationService } from './docs-version-navigation.service';

const ARCHIVED: DocsVersion = { id: 'v1', label: 'v1', path: '/docs/v1/', status: 'maintained' };

describe('DocsVersionNavigationService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  async function open(probeResult: unknown): Promise<ReturnType<typeof vi.fn>> {
    const navigate = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: DocsPageProbeService, useValue: { exists: async () => probeResult } },
        { provide: DocsLocationService, useValue: { navigate } },
      ],
    });
    await TestBed.inject(DocsVersionNavigationService).open(ARCHIVED, '/components/button');

    return navigate;
  }

  it('opens the same page when it exists in the target version', async () => {
    expect(await open(docsPlatformSuccess(true))).toHaveBeenCalledWith(
      '/docs/v1/components/button',
    );
  });

  it('falls back to the version home when the page is missing', async () => {
    expect(await open(docsPlatformSuccess(false))).toHaveBeenCalledWith('/docs/v1/');
  });

  it('keeps the same-page target when the probe is inconclusive', async () => {
    expect(await open(docsPlatformFailure('failed'))).toHaveBeenCalledWith(
      '/docs/v1/components/button',
    );
  });
});
