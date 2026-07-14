import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TABLE_EXAMPLE_SOURCES } from '@generated/example-sources/table.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TABLE_DOCS_MANIFEST } from './table.docs-manifest';
import { TablePage } from './table-page';

describe('TablePage', () => {
  let fixture: ComponentFixture<TablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePage],
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

    fixture = TestBed.createComponent(TablePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native table examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Table');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'sort',
      'selection',
      'sticky',
      'combined',
      'api',
      'accessibility',
      'known-gaps',
    ]);
    expect(root.querySelectorAll('app-live-preview table[kuiTable]')).toHaveLength(4);
    expect(root.querySelector('app-row-selection-table-example')).not.toBeNull();
    expect(root.textContent).toContain('td[kuiCell] until the installed package exposes it');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TABLE_DOCS_MANIFEST.loadPage(),
      TABLE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TablePage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TABLE_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-sortable-table-example',
      'combined-table-example',
      'row-selection-table-example',
      'sticky-header-table-example',
    ]);
    expect(Object.keys(TABLE_EXAMPLE_SOURCES).sort()).toEqual(
      [...TABLE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
