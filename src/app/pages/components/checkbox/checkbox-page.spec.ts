import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CHECKBOX_EXAMPLE_SOURCES } from '@generated/example-sources/checkbox.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CHECKBOX_DOCS_MANIFEST } from './checkbox.docs-manifest';
import { CheckboxPage } from './checkbox-page';

describe('CheckboxPage', () => {
  let fixture: ComponentFixture<CheckboxPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxPage],
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

    fixture = TestBed.createComponent(CheckboxPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native checkbox examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const checkboxes = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-checkbox'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Checkbox');
    expect(sectionIds).toEqual(['import', 'usage', 'sizes', 'api', 'accessibility']);
    expect(checkboxes).toHaveLength(8);
    expect(checkboxes[0]?.checked).toBe(true);
    expect(checkboxes.some((checkbox) => checkbox.disabled)).toBe(true);
    expect(checkboxes.some((checkbox) => checkbox.getAttribute('aria-invalid') === 'true')).toBe(
      true,
    );
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CHECKBOX_DOCS_MANIFEST.loadPage(),
      CHECKBOX_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CheckboxPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(CHECKBOX_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-checkbox-example',
      'checkbox-size-example',
    ]);
    expect(Object.keys(CHECKBOX_EXAMPLE_SOURCES).sort()).toEqual(
      [...CHECKBOX_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
