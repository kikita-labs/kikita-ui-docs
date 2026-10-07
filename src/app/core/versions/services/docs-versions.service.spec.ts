import { LocationStrategy } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { docsPlatformFailure, docsPlatformSuccess } from '@core/platform';
import { DocsRemoteJsonService } from '@core/platform/remote-json';

import { createDocsVersionId } from '../helpers';
import { DocsVersionsService } from './docs-versions.service';

const CURRENT_ID = createDocsVersionId(KIKITA_UI_PACKAGE_VERSION);

describe('DocsVersionsService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function configure(
    load: DocsRemoteJsonService['load'],
    baseHref = '/kikita-ui-docs/',
  ): DocsVersionsService {
    TestBed.configureTestingModule({
      providers: [
        { provide: DocsRemoteJsonService, useValue: { load } },
        { provide: LocationStrategy, useValue: { getBaseHref: () => baseHref } },
      ],
    });

    return TestBed.inject(DocsVersionsService);
  }

  it('falls back to the current build when the manifest cannot be loaded', async () => {
    const load = vi.fn().mockResolvedValue(docsPlatformFailure('unavailable'));
    const service = configure(load);

    await vi.waitFor(() => expect(load).toHaveBeenCalled());

    expect(service.versions()).toEqual([
      { id: CURRENT_ID, label: CURRENT_ID, path: '/kikita-ui-docs/', status: 'latest' },
    ]);
    expect(service.current().status).toBe('latest');
  });

  it('requests the manifest from the site root, also for an archived build', async () => {
    const load = vi.fn().mockResolvedValue(docsPlatformFailure('failed'));

    configure(load, `/kikita-ui-docs/${CURRENT_ID}/`);
    await vi.waitFor(() => expect(load).toHaveBeenCalled());

    expect(load).toHaveBeenCalledWith('/kikita-ui-docs/versions.json');
  });

  it('exposes manifest entries and resolves current and latest', async () => {
    const manifest = [
      { id: 'v99', label: 'v99', path: '/kikita-ui-docs/', status: 'latest' },
      {
        id: CURRENT_ID,
        label: CURRENT_ID,
        path: `/kikita-ui-docs/${CURRENT_ID}/`,
        status: 'maintained',
      },
    ];
    const service = configure(vi.fn().mockResolvedValue(docsPlatformSuccess(manifest)));

    await vi.waitFor(() => expect(service.versions()).toEqual(manifest));

    expect(service.current().status).toBe('maintained');
    expect(service.latest().id).toBe('v99');
    expect(service.pageUrl(service.latest(), '/components/button')).toBe(
      '/kikita-ui-docs/components/button',
    );
  });

  it('ignores an invalid manifest', async () => {
    const load = vi.fn().mockResolvedValue(docsPlatformSuccess({ not: 'a list' }));
    const service = configure(load);

    await vi.waitFor(() => expect(load).toHaveBeenCalled());

    expect(service.versions()).toHaveLength(1);
    expect(service.current().status).toBe('latest');
  });
});
