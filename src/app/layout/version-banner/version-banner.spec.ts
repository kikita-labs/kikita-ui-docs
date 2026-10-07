import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsRouteStateService } from '@core/navigation';
import { type DocsVersion, DocsVersionsService } from '@core/versions';

import { VersionBanner } from './version-banner';

const LATEST: DocsVersion = { id: 'v2', label: 'v2', path: '/docs/', status: 'latest' };
const ARCHIVED: DocsVersion = { id: 'v1', label: 'v1', path: '/docs/v1/', status: 'maintained' };

describe('VersionBanner', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function render(current: DocsVersion): HTMLElement {
    TestBed.configureTestingModule({
      providers: [
        { provide: DocsRouteStateService, useValue: { path: signal('/components/button') } },
        {
          provide: DocsVersionsService,
          useValue: {
            current: signal(current),
            latest: signal(LATEST),
            pageUrl: (version: DocsVersion, path: string) => `${version.path}${path.slice(1)}`,
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(VersionBanner);

    fixture.detectChanges();

    return fixture.nativeElement;
  }

  it('shows nothing on the latest version', () => {
    expect(render(LATEST).querySelector('.version-banner')).toBeNull();
  });

  it('links an older version to the same page in the latest version', () => {
    const element = render(ARCHIVED);
    const link = element.querySelector<HTMLAnchorElement>('a');

    expect(element.textContent).toContain('older version');
    expect(link?.getAttribute('href')).toBe('/docs/components/button');
    expect(link?.textContent).toContain('(v2)');
  });

  it('describes an unmaintained version', () => {
    expect(render({ ...ARCHIVED, status: 'unmaintained' }).textContent).toContain(
      'no longer maintained',
    );
  });
});
