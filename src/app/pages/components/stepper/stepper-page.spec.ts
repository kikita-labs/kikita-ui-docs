import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { STEPPER_EXAMPLE_SOURCES } from '@generated/example-sources/stepper.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { STEPPER_DOCS_MANIFEST } from './stepper.docs-manifest';
import { StepperPage } from './stepper-page';

describe('StepperPage', () => {
  let fixture: ComponentFixture<StepperPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperPage],
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

    fixture = TestBed.createComponent(StepperPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered steps', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Stepper');
    expect(sectionIds).toEqual(['import', 'usage', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview kui-stepper')).not.toBeNull();
    expect(root.textContent).toContain('Review');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      STEPPER_DOCS_MANIFEST.loadPage(),
      STEPPER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(StepperPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(STEPPER_DOCS_MANIFEST.exampleIds).toEqual(['basic-stepper-example']);
    expect(Object.keys(STEPPER_EXAMPLE_SOURCES).sort()).toEqual(
      [...STEPPER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
