import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { COLOR_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/color-input.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { COLOR_INPUT_DOCS_MANIFEST } from './color-input.docs-manifest';
import { ColorInputPage } from './color-input-page';

describe('ColorInputPage', () => {
  let fixture: ComponentFixture<ColorInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorInputPage],
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

    fixture = TestBed.createComponent(ColorInputPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered input', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Color Input');
    expect(sectionIds).toEqual(['import', 'usage', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview input[kuicolorinput]')).not.toBeNull();
    expect(root.textContent).toContain('Primary seed');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      COLOR_INPUT_DOCS_MANIFEST.loadPage(),
      COLOR_INPUT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ColorInputPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(COLOR_INPUT_DOCS_MANIFEST.exampleIds).toEqual(['basic-color-input-example']);
    expect(Object.keys(COLOR_INPUT_EXAMPLE_SOURCES).sort()).toEqual(
      [...COLOR_INPUT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
