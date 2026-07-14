import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SKELETON_EXAMPLE_SOURCES } from '@generated/example-sources/skeleton.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SKELETON_DOCS_MANIFEST } from './skeleton.docs-manifest';
import { SkeletonPage } from './skeleton-page';

describe('SkeletonPage', () => {
  let fixture: ComponentFixture<SkeletonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPage],
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

    fixture = TestBed.createComponent(SkeletonPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections and decorative skeleton state matrix', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const skeletons = [...root.querySelectorAll<HTMLElement>('app-live-preview .kui-skeleton')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Skeleton');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'shapes',
      'animation',
      'composition',
      'api',
      'accessibility',
    ]);
    expect(skeletons.length).toBeGreaterThan(20);
    expect(skeletons.every((skeleton) => skeleton.getAttribute('aria-hidden') === 'true')).toBe(
      true,
    );
    expect(new Set(skeletons.map((skeleton) => skeleton.getAttribute('data-kui-shape')))).toEqual(
      new Set(['text', 'heading', 'rect', 'circle', 'square', 'button', 'badge']),
    );
    expect(
      new Set(skeletons.map((skeleton) => skeleton.getAttribute('data-kui-animation'))),
    ).toEqual(new Set(['shimmer', 'pulse', 'none']));
    expect(
      root.querySelector('app-skeleton-composition-example article')?.getAttribute('aria-busy'),
    ).toBe('true');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SKELETON_DOCS_MANIFEST.loadPage(),
      SKELETON_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SkeletonPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SKELETON_DOCS_MANIFEST.exampleIds).toEqual([
      'skeleton-animation-example',
      'skeleton-composition-example',
      'skeleton-shapes-example',
    ]);
    expect(Object.keys(SKELETON_EXAMPLE_SOURCES).sort()).toEqual(
      [...SKELETON_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
