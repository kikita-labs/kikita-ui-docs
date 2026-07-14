import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SLIDER_EXAMPLE_SOURCES } from '@generated/example-sources/slider.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SLIDER_DOCS_MANIFEST } from './slider.docs-manifest';
import { SliderPage } from './slider-page';

describe('SliderPage', () => {
  let fixture: ComponentFixture<SliderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderPage],
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

    fixture = TestBed.createComponent(SliderPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native range examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const sliders = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-slider-native'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Slider');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'min-max-step',
      'disabled-and-invalid',
      'signal-forms',
      'api',
      'accessibility',
    ]);
    expect(sliders).toHaveLength(7);
    expect(sliders.every((slider) => slider.type === 'range')).toBe(true);
    expect(sliders.some((slider) => slider.disabled)).toBe(true);
    expect(sliders.some((slider) => slider.getAttribute('aria-invalid') === 'true')).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SLIDER_DOCS_MANIFEST.loadPage(),
      SLIDER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SliderPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SLIDER_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-slider-example',
      'slider-disabled-example',
      'slider-field-example',
      'slider-range-example',
    ]);
    expect(Object.keys(SLIDER_EXAMPLE_SOURCES).sort()).toEqual(
      [...SLIDER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
