import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SEPARATOR_EXAMPLE_SOURCES } from '@generated/example-sources/separator.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SEPARATOR_DOCS_MANIFEST } from './separator.docs-manifest';
import { SeparatorPage } from './separator-page';

describe('SeparatorPage', () => {
  let fixture: ComponentFixture<SeparatorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorPage],
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

    fixture = TestBed.createComponent(SeparatorPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and semantic separator examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Separator');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'appearances',
      'spacing',
      'vertical',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview hr[kuiSeparator]')).toHaveLength(10);
    expect(root.querySelector('app-separator-vertical-example')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SEPARATOR_DOCS_MANIFEST.loadPage(),
      SEPARATOR_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SeparatorPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SEPARATOR_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-separator-example',
      'separator-appearance-example',
      'separator-spacing-example',
      'separator-vertical-example',
    ]);
    expect(Object.keys(SEPARATOR_EXAMPLE_SOURCES).sort()).toEqual(
      [...SEPARATOR_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
