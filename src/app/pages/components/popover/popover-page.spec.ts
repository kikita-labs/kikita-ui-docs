import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { POPOVER_EXAMPLE_SOURCES } from '@generated/example-sources/popover.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { POPOVER_DOCS_MANIFEST } from './popover.docs-manifest';
import { PopoverPage } from './popover-page';

describe('PopoverPage', () => {
  let fixture: ComponentFixture<PopoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverPage],
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

    fixture = TestBed.createComponent(PopoverPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Popover');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'action-content',
      'hover-trigger',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview button[kuiButton]')).toHaveLength(3);
    expect(root.querySelector('app-hover-popover-example kui-popover')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      POPOVER_DOCS_MANIFEST.loadPage(),
      POPOVER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(PopoverPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(POPOVER_DOCS_MANIFEST.exampleIds).toEqual([
      'action-popover-example',
      'basic-popover-example',
      'hover-popover-example',
    ]);
    expect(Object.keys(POPOVER_EXAMPLE_SOURCES).sort()).toEqual(
      [...POPOVER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
