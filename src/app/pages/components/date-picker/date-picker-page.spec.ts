import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { DATE_PICKER_EXAMPLE_SOURCES } from '@generated/example-sources/date-picker.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DATE_PICKER_DOCS_MANIFEST } from './date-picker.docs-manifest';
import { DatePickerPage } from './date-picker-page';

describe('DatePickerPage', () => {
  let fixture: ComponentFixture<DatePickerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerPage],
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

    fixture = TestBed.createComponent(DatePickerPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered date picker composition', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Date Picker');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'composition',
      'api',
      'accessibility',
      'known-gaps',
    ]);
    expect(root.querySelector('app-live-preview input[kuiDatePicker]')).not.toBeNull();
    expect(root.textContent).toContain('dialog');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      DATE_PICKER_DOCS_MANIFEST.loadPage(),
      DATE_PICKER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(DatePickerPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(DATE_PICKER_DOCS_MANIFEST.exampleIds).toEqual(['basic-date-picker-example']);
    expect(Object.keys(DATE_PICKER_EXAMPLE_SOURCES).sort()).toEqual(
      [...DATE_PICKER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
