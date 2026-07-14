import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CHIP_EXAMPLE_SOURCES } from '@generated/example-sources/chip.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CHIP_DOCS_MANIFEST } from './chip.docs-manifest';
import { ChipPage } from './chip-page';

describe('ChipPage', () => {
  let fixture: ComponentFixture<ChipPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipPage],
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

    fixture = TestBed.createComponent(ChipPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and chip examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Chip');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'removable',
      'interactive',
      'states',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview [kuiChip]')).toHaveLength(11);
    expect(root.querySelectorAll('button[kuiChipRemove]').length).toBeGreaterThan(0);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CHIP_DOCS_MANIFEST.loadPage(),
      CHIP_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ChipPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(CHIP_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-chip-example',
      'chip-states-example',
      'interactive-chip-example',
      'removable-chip-example',
    ]);
    expect(Object.keys(CHIP_EXAMPLE_SOURCES).sort()).toEqual(
      [...CHIP_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
