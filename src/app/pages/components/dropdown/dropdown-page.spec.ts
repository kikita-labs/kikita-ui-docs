import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { DROPDOWN_EXAMPLE_SOURCES } from '@generated/example-sources/dropdown.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DROPDOWN_DOCS_MANIFEST } from './dropdown.docs-manifest';
import { DropdownPage } from './dropdown-page';

describe('DropdownPage', () => {
  let fixture: ComponentFixture<DropdownPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPage],
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

    fixture = TestBed.createComponent(DropdownPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and dropdown trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Dropdown');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'field-composition',
      'panel-width',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview kui-dropdown')).toHaveLength(5);
    expect(root.querySelector('app-standalone-dropdown-example')).not.toBeNull();
    expect(root.querySelector('app-field-dropdown-example')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      DROPDOWN_DOCS_MANIFEST.loadPage(),
      DROPDOWN_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(DropdownPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(DROPDOWN_DOCS_MANIFEST.exampleIds).toEqual([
      'field-dropdown-example',
      'panel-width-dropdown-example',
      'standalone-dropdown-example',
    ]);
    expect(Object.keys(DROPDOWN_EXAMPLE_SOURCES).sort()).toEqual(
      [...DROPDOWN_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
