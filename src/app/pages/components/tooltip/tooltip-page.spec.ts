import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TOOLTIP_EXAMPLE_SOURCES } from '@generated/example-sources/tooltip.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TOOLTIP_DOCS_MANIFEST } from './tooltip.docs-manifest';
import { TooltipPage } from './tooltip-page';

describe('TooltipPage', () => {
  let fixture: ComponentFixture<TooltipPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipPage],
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

    fixture = TestBed.createComponent(TooltipPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered tooltip triggers', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggers = [...root.querySelectorAll<HTMLButtonElement>('app-live-preview button')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Tooltip');
    expect(sectionIds).toEqual(['import', 'usage', 'behavior', 'api', 'accessibility']);
    expect(triggers).toHaveLength(2);
    expect(root.textContent).toContain('focus-visible');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TOOLTIP_DOCS_MANIFEST.loadPage(),
      TOOLTIP_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TooltipPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TOOLTIP_DOCS_MANIFEST.exampleIds).toEqual(['basic-tooltip-example']);
    expect(Object.keys(TOOLTIP_EXAMPLE_SOURCES).sort()).toEqual(
      [...TOOLTIP_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
