import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { LOADER_EXAMPLE_SOURCES } from '@generated/example-sources/loader.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { LOADER_DOCS_MANIFEST } from './loader.docs-manifest';
import { LoaderPage } from './loader-page';

describe('LoaderPage', () => {
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderPage],
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

    fixture = TestBed.createComponent(LoaderPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections and rendered loader status matrix', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const loaders = [...root.querySelectorAll<HTMLElement>('app-live-preview .kui-loader')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Loader');
    expect(sectionIds).toEqual(['import', 'usage', 'sizes', 'with-button', 'api', 'accessibility']);
    expect(loaders).toHaveLength(7);
    expect(loaders.map((loader) => loader.getAttribute('role'))).toEqual([
      'status',
      'status',
      'status',
      'status',
      'status',
      'status',
      'status',
    ]);
    expect(loaders.map((loader) => loader.getAttribute('aria-live'))).toEqual([
      'polite',
      'polite',
      'polite',
      'polite',
      'polite',
      'polite',
      'polite',
    ]);
    expect(loaders.map((loader) => loader.getAttribute('aria-label'))).toEqual([
      'Loading',
      'Loading extra small',
      'Loading small',
      'Loading medium',
      'Loading large',
      'Saving',
      'Loading',
    ]);
    expect(loaders.map((loader) => loader.getAttribute('data-kui-size'))).toEqual([
      'md',
      'xs',
      'sm',
      'md',
      'lg',
      'sm',
      'md',
    ]);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      LOADER_DOCS_MANIFEST.loadPage(),
      LOADER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(LoaderPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(LOADER_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-loader-example',
      'loader-button-example',
      'loader-size-example',
    ]);
    expect(Object.keys(LOADER_EXAMPLE_SOURCES).sort()).toEqual(
      [...LOADER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
