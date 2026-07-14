import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { PROGRESS_EXAMPLE_SOURCES } from '@generated/example-sources/progress.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { PROGRESS_DOCS_MANIFEST } from './progress.docs-manifest';
import { ProgressPage } from './progress-page';

describe('ProgressPage', () => {
  let fixture: ComponentFixture<ProgressPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressPage],
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

    fixture = TestBed.createComponent(ProgressPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and progress semantics', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const progressBars = [
      ...root.querySelectorAll<HTMLElement>('app-live-preview [role="progressbar"]'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Progress');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'circular',
      'colors-and-sizes',
      'api',
      'accessibility',
    ]);
    expect(progressBars.length).toBeGreaterThanOrEqual(10);
    expect(progressBars.every((bar) => bar.getAttribute('aria-valuemin') === '0')).toBe(true);
    expect(progressBars.every((bar) => bar.getAttribute('aria-valuemax') === '100')).toBe(true);
    expect(root.querySelectorAll('.kui-progress-linear').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('.kui-progress-circular').length).toBeGreaterThan(0);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      PROGRESS_DOCS_MANIFEST.loadPage(),
      PROGRESS_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ProgressPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(PROGRESS_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-progress-example',
      'progress-circular-example',
      'progress-color-size-example',
    ]);
    expect(Object.keys(PROGRESS_EXAMPLE_SOURCES).sort()).toEqual(
      [...PROGRESS_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
