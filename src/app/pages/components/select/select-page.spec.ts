import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SELECT_EXAMPLE_SOURCES } from '@generated/example-sources/select.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SELECT_DOCS_MANIFEST } from './select.docs-manifest';
import { SelectPage } from './select-page';

describe('SelectPage', () => {
  let fixture: ComponentFixture<SelectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPage],
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

    fixture = TestBed.createComponent(SelectPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and select trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggers = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input[kuiselect]'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Select');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'multiple',
      'provider-defaults',
      'api',
      'accessibility',
    ]);
    expect(triggers.length).toBeGreaterThanOrEqual(2);
    expect(triggers.every((trigger) => trigger.getAttribute('role') === 'combobox')).toBe(true);
    expect(triggers.some((trigger) => trigger.hasAttribute('multiple'))).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SELECT_DOCS_MANIFEST.loadPage(),
      SELECT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SelectPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SELECT_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-select-example',
      'multiple-select-example',
    ]);
    expect(Object.keys(SELECT_EXAMPLE_SOURCES).sort()).toEqual(
      [...SELECT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
