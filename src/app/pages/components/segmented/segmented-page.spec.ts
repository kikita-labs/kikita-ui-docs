import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SEGMENTED_EXAMPLE_SOURCES } from '@generated/example-sources/segmented.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SEGMENTED_DOCS_MANIFEST } from './segmented.docs-manifest';
import { SegmentedPage } from './segmented-page';

describe('SegmentedPage', () => {
  let fixture: ComponentFixture<SegmentedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedPage],
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

    fixture = TestBed.createComponent(SegmentedPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and segmented semantics', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const group = root.querySelector<HTMLElement>('app-live-preview kui-segmented');
    const segments = [...root.querySelectorAll<HTMLButtonElement>('app-live-preview button')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Segmented');
    expect(sectionIds).toEqual(['import', 'usage', 'api', 'accessibility']);
    expect(group?.getAttribute('role')).toBe('radiogroup');
    expect(segments.map((segment) => segment.getAttribute('role'))).toContain('radio');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SEGMENTED_DOCS_MANIFEST.loadPage(),
      SEGMENTED_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SegmentedPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SEGMENTED_DOCS_MANIFEST.exampleIds).toEqual(['basic-segmented-example']);
    expect(Object.keys(SEGMENTED_EXAMPLE_SOURCES).sort()).toEqual(
      [...SEGMENTED_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
