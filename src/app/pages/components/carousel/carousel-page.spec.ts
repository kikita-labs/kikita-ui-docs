import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CAROUSEL_EXAMPLE_SOURCES } from '@generated/example-sources/carousel.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CAROUSEL_DOCS_MANIFEST } from './carousel.docs-manifest';
import { CarouselPage } from './carousel-page';

describe('CarouselPage', () => {
  let fixture: ComponentFixture<CarouselPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPage],
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

    fixture = TestBed.createComponent(CarouselPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Carousel');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'items-per-view',
      'autoplay',
      'controls',
      'messages-example',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('renders each example as a named carousel region with numbered slides', () => {
    const root = fixture.nativeElement as HTMLElement;
    const regions = [
      ...root.querySelectorAll<HTMLElement>('app-live-preview .kui-carousel__region'),
    ];

    expect(regions).toHaveLength(5);
    expect(regions.every((region) => region.getAttribute('role') === 'region')).toBe(true);
    expect(
      regions.every((region) => region.getAttribute('aria-roledescription') === 'carousel'),
    ).toBe(true);
    expect(regions.map((region) => region.getAttribute('aria-label'))).toEqual([
      'Product photos',
      'Two at a time',
      'Autoplay slides',
      'Dots only',
      'Galerie',
    ]);
    expect(regions[0]?.querySelector('[kuicarouselslide]')?.getAttribute('aria-label')).toBe(
      '1 of 3',
    );
  });

  it('shows a pause control only for the autoplay example', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = (id: string): HTMLElement | null | undefined =>
      root.querySelector<HTMLElement>(`#${id}`)?.closest('app-doc-section');

    expect(
      section('autoplay')?.querySelector('button[aria-label="Pause autoplay"]'),
    ).not.toBeNull();
    expect(
      section('items-per-view')?.querySelector('button[aria-label="Pause autoplay"]'),
    ).toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CAROUSEL_DOCS_MANIFEST.loadPage(),
      CAROUSEL_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CarouselPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(CAROUSEL_EXAMPLE_SOURCES).sort()).toEqual(
      [...CAROUSEL_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
