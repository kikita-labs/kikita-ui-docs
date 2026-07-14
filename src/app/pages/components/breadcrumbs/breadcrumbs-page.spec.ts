import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { BREADCRUMBS_EXAMPLE_SOURCES } from '@generated/example-sources/breadcrumbs.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { BREADCRUMBS_DOCS_MANIFEST } from './breadcrumbs.docs-manifest';
import { BreadcrumbsPage } from './breadcrumbs-page';

describe('BreadcrumbsPage', () => {
  let fixture: ComponentFixture<BreadcrumbsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsPage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered native trail', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Breadcrumbs');
    expect(sectionIds).toEqual(['import', 'usage', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview nav[aria-label="Breadcrumb"]')).not.toBeNull();
    expect(root.textContent).toContain('Breadcrumbs');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      BREADCRUMBS_DOCS_MANIFEST.loadPage(),
      BREADCRUMBS_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(BreadcrumbsPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(BREADCRUMBS_DOCS_MANIFEST.exampleIds).toEqual(['basic-breadcrumbs-example']);
    expect(Object.keys(BREADCRUMBS_EXAMPLE_SOURCES).sort()).toEqual(
      [...BREADCRUMBS_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
