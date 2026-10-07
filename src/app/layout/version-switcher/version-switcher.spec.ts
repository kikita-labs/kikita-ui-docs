import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KuiSelect, provideKikitaUi } from '@kikita-labs/ui';

import { DocsRouteStateService } from '@core/navigation';
import {
  type DocsVersion,
  DocsVersionNavigationService,
  DocsVersionsService,
} from '@core/versions';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { VersionSwitcher } from './version-switcher';

const LATEST: DocsVersion = { id: 'v2', label: 'v2', path: '/docs/', status: 'latest' };
const ARCHIVED: DocsVersion = { id: 'v1', label: 'v1', path: '/docs/v1/', status: 'maintained' };

describe('VersionSwitcher', () => {
  const open = vi.fn().mockResolvedValue(undefined);

  afterEach(() => {
    open.mockClear();
    TestBed.resetTestingModule();
  });

  function render(
    versions: readonly DocsVersion[],
    current: DocsVersion,
  ): ComponentFixture<VersionSwitcher> {
    TestBed.configureTestingModule({
      providers: [
        provideKikitaUi(),
        { provide: DocsRouteStateService, useValue: { path: signal('/components/button') } },
        { provide: DocsVersionNavigationService, useValue: { open } },
        {
          provide: DocsVersionsService,
          useValue: { current: signal(current), versions: signal(versions) },
        },
      ],
    });
    const fixture = TestBed.createComponent(VersionSwitcher);

    fixture.detectChanges();

    return fixture;
  }

  it('renders nothing while there is only one version', () => {
    const fixture = render([LATEST], LATEST);

    expect(fixture.nativeElement.querySelector('input')).toBeNull();
  });

  it('names the select and shows the current version', () => {
    const fixture = render([LATEST, ARCHIVED], ARCHIVED);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    expect(input.getAttribute('aria-label')).toBe('Documentation version');
    expect(input.value).toBe('v1');
  });

  it('opens the chosen version for the current page and ignores the current one', () => {
    const fixture = render([LATEST, ARCHIVED], ARCHIVED);
    const select = fixture.debugElement.query(By.directive(KuiSelect)).injector.get(KuiSelect);

    select.value.set('v1');
    fixture.detectChanges();
    expect(open).not.toHaveBeenCalled();

    select.value.set('v2');
    fixture.detectChanges();
    expect(open).toHaveBeenCalledExactlyOnceWith(LATEST, '/components/button');
  });

  it('has no automated accessibility violations', async () => {
    const fixture = render([LATEST, ARCHIVED], LATEST);

    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
