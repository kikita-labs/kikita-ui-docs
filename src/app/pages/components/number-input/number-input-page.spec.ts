import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { NUMBER_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/number-input.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { NUMBER_INPUT_DOCS_MANIFEST } from './number-input.docs-manifest';
import { NumberInputPage } from './number-input-page';

describe('NumberInputPage', () => {
  let fixture: ComponentFixture<NumberInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputPage],
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

    fixture = TestBed.createComponent(NumberInputPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native number input examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const inputs = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-number-input__input'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Number Input');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'compact-variant',
      'min-max-step',
      'field-composition',
      'signal-forms',
      'api',
      'accessibility',
    ]);
    expect(inputs).toHaveLength(9);
    expect(inputs.every((input) => input.type === 'number')).toBe(true);
    expect(inputs.some((input) => input.disabled)).toBe(true);
    expect(inputs.some((input) => input.getAttribute('aria-invalid') === 'true')).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      NUMBER_INPUT_DOCS_MANIFEST.loadPage(),
      NUMBER_INPUT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(NumberInputPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(NUMBER_INPUT_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-number-input-example',
      'compact-number-input-example',
      'field-number-input-example',
      'range-number-input-example',
    ]);
    expect(Object.keys(NUMBER_INPUT_EXAMPLE_SOURCES).sort()).toEqual(
      [...NUMBER_INPUT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
