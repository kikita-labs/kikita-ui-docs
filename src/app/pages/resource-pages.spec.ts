import { type Type } from '@angular/core';
import { type ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { provideKikitaUi } from '@kikita-labs/ui';

import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { DocsSearchStateService } from '@core/search';
import { SMOKE_EXAMPLE_SOURCES } from '@generated/example-sources/smoke.generated';

import { ComponentsOverviewPage } from './components/components-overview-page';
import { DocsDraftPage } from './draft/docs-draft-page';
import { HOME_INSTALL_TABS } from './home/home.docs-content';
import { HomePage } from './home/home-page';
import { DocsNotFoundPage } from './not-found/docs-not-found-page';
import { PackageSmokePage } from './smoke/package-smoke-page';
import { SMOKE_API_ROWS } from './smoke/smoke.docs-content';

const DRAFT_DATA = {
  title: 'Foundation draft',
  eyebrow: 'Planned section',
  description: 'Foundation guidance is being prepared.',
} as const;

describe('foundation resource pages', () => {
  const showSearch = vi.fn();

  beforeEach(async () => {
    showSearch.mockReset();

    await TestBed.configureTestingModule({
      imports: [
        ComponentsOverviewPage,
        DocsDraftPage,
        DocsNotFoundPage,
        HomePage,
        PackageSmokePage,
      ],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        { provide: DocsSearchStateService, useValue: { show: showSearch } },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(DRAFT_DATA),
            snapshot: { data: DRAFT_DATA },
          },
        },
      ],
    }).compileComponents();
  });

  it('keeps the landing page recovery links and install guidance', () => {
    const fixture = createPage(HomePage);
    const root = fixture.nativeElement as HTMLElement;
    const links = [...root.querySelectorAll<HTMLAnchorElement>('a')];

    expect(root.querySelector('h1')?.textContent).toContain('Interfaces that feel considered.');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/foundations/installation',
      '/components',
    ]);
    expect(root.textContent).toContain('ng add @kikita-labs/ui');
  });

  it('renders route-provided draft content and status', () => {
    const root = createPage(DocsDraftPage).nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent?.trim()).toBe(DRAFT_DATA.title);
    expect(root.textContent).toContain(DRAFT_DATA.eyebrow);
    expect(root.textContent).toContain(DRAFT_DATA.description);
    expect(root.textContent).toContain('Docs coming soon');
  });

  it('keeps not-found recovery and opens search on request', () => {
    const root = createPage(DocsNotFoundPage).nativeElement as HTMLElement;
    const recoveryLink = root.querySelector<HTMLAnchorElement>('a');
    const searchButton = root.querySelector<HTMLButtonElement>('button');

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Page not found');
    expect(recoveryLink?.getAttribute('href')).toBe('/components');

    searchButton?.click();
    expect(showSearch).toHaveBeenCalledOnce();
  });

  it('keeps Package Smoke as an installed-package consumer proof', () => {
    const root = createPage(PackageSmokePage).nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Package Smoke');
    expect(root.textContent).toContain(`@kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`);
    expect(root.querySelector('kui-field')).not.toBeNull();
    expect(root.querySelector('[kuiInput]')).not.toBeNull();
    expect(root.querySelector('[kuiButton]')).not.toBeNull();
    expect(root.textContent).toContain('Package loaded');
    expect(SMOKE_EXAMPLE_SOURCES['package-smoke-consumer'][0].code).toContain(
      '<input kuiInput value="kikita-ui-docs"',
    );
    expect(SMOKE_EXAMPLE_SOURCES['package-smoke-consumer'][1].code).toContain(
      "from '@kikita-labs/ui';",
    );
    expect(SMOKE_API_ROWS.map((row) => row.name)).toContain('provideKikitaUi');
  });

  it('keeps landing setup snippets as named canonical records', () => {
    expect(HOME_INSTALL_TABS.every((tab) => Boolean(tab.filename))).toBe(true);
    expect(HOME_INSTALL_TABS.map((tab) => tab.label)).toEqual(['Install', 'Provider', 'Styles']);
  });

  it('renders every registry-backed component summary in the overview', () => {
    const root = createPage(ComponentsOverviewPage).nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Component overview');
    expect(root.querySelectorAll('.components-overview-page__card')).toHaveLength(43);
    expect(root.querySelectorAll('.components-overview-page__category')).toHaveLength(5);
  });
});

function createPage<T>(component: Type<T>): ComponentFixture<T> {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}
