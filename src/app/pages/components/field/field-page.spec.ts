import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { FIELD_EXAMPLE_SOURCES } from '@generated/example-sources/field.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { FIELD_DOCS_MANIFEST } from './field.docs-manifest';
import { FieldPage } from './field-page';

describe('FieldPage', () => {
  let fixture: ComponentFixture<FieldPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPage],
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

    fixture = TestBed.createComponent(FieldPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and field composition examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const fields = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-field')];
    const inputs = [...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-input')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Field');
    expect(sectionIds).toEqual(['import', 'usage', 'api', 'accessibility']);
    expect(fields).toHaveLength(2);
    expect(inputs).toHaveLength(2);
    expect(inputs.every((input) => input.id.length > 0)).toBe(true);
    expect(inputs.every((input) => input.getAttribute('aria-describedby'))).toBe(true);
    expect(inputs.some((input) => input.getAttribute('aria-invalid') === 'true')).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      FIELD_DOCS_MANIFEST.loadPage(),
      FIELD_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(FieldPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(FIELD_DOCS_MANIFEST.exampleIds).toEqual(['basic-field-example']);
    expect(Object.keys(FIELD_EXAMPLE_SOURCES).sort()).toEqual(
      [...FIELD_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
