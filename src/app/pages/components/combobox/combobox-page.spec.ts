import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { COMBOBOX_EXAMPLE_SOURCES } from '@generated/example-sources/combobox.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { COMBOBOX_DOCS_MANIFEST } from './combobox.docs-manifest';
import { ComboboxPage } from './combobox-page';

describe('ComboboxPage', () => {
  let fixture: ComponentFixture<ComboboxPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxPage],
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

    fixture = TestBed.createComponent(ComboboxPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and combobox examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggers = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input[kuicombobox]'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Combobox');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'async',
      'free-input',
      'field-states',
      'provider-defaults',
      'api',
      'accessibility',
    ]);
    expect(triggers.length).toBeGreaterThanOrEqual(4);
    expect(triggers.every((trigger) => trigger.getAttribute('role') === 'combobox')).toBe(true);
    expect(triggers.some((trigger) => trigger.getAttribute('mode') === 'async')).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      COMBOBOX_DOCS_MANIFEST.loadPage(),
      COMBOBOX_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ComboboxPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(COMBOBOX_DOCS_MANIFEST.exampleIds).toEqual([
      'async-combobox-example',
      'basic-combobox-example',
      'combobox-field-states-example',
      'free-combobox-example',
    ]);
    expect(Object.keys(COMBOBOX_EXAMPLE_SOURCES).sort()).toEqual(
      [...COMBOBOX_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
