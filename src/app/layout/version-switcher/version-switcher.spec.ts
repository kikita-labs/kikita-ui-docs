import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsRouteStateService } from '@core/navigation';
import { type DocsVersion, DocsVersionsService } from '@core/versions';

import { VersionSwitcher } from './version-switcher';

const LATEST: DocsVersion = { id: 'v2', label: 'v2', path: '/docs/', status: 'latest' };
const ARCHIVED: DocsVersion = { id: 'v1', label: 'v1', path: '/docs/v1/', status: 'maintained' };

describe('VersionSwitcher', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function render(versions: readonly DocsVersion[], current: DocsVersion): HTMLElement {
    TestBed.configureTestingModule({
      providers: [
        { provide: DocsRouteStateService, useValue: { path: signal('/components/button') } },
        {
          provide: DocsVersionsService,
          useValue: {
            current: signal(current),
            versions: signal(versions),
            pageUrl: (version: DocsVersion, path: string) => `${version.path}${path.slice(1)}`,
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(VersionSwitcher);

    fixture.detectChanges();

    return fixture.nativeElement;
  }

  it('renders nothing while there is only one version', () => {
    expect(render([LATEST], LATEST).querySelector('button')).toBeNull();
  });

  it('labels the trigger with the current version for assistive technology', () => {
    const button = render([LATEST, ARCHIVED], ARCHIVED).querySelector('button');

    expect(button?.textContent?.trim()).toBe('v1');
    expect(button?.getAttribute('aria-label')).toBe('Documentation version, current v1');
  });
});
