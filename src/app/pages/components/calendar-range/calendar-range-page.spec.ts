import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CALENDAR_RANGE_EXAMPLE_SOURCES } from '@generated/example-sources/calendar-range.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CALENDAR_RANGE_DOCS_MANIFEST } from './calendar-range.docs-manifest';
import { CalendarRangePage } from './calendar-range-page';

describe('CalendarRangePage', () => {
  let fixture: ComponentFixture<CalendarRangePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRangePage],
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

    fixture = TestBed.createComponent(CalendarRangePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections and rendered range calendars', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Calendar Range');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'states',
      'linked',
      'locale-and-messages',
      'custom-footer',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
    expect(root.querySelectorAll('app-live-preview kui-calendar-range')).toHaveLength(9);
  });

  it('keeps the two linked calendars a month apart', () => {
    const root = fixture.nativeElement as HTMLElement;
    const linked = [
      ...(root
        .querySelector('#linked')
        ?.closest('app-doc-section')
        ?.querySelectorAll<HTMLElement>('kui-calendar-range') ?? []),
    ];
    expect(linked).toHaveLength(2);
    expect(linked[0]?.textContent).toContain('July 2026');
    expect(linked[1]?.textContent).toContain('August 2026');
  });

  it('clears the range from the projected footer', () => {
    const root = fixture.nativeElement as HTMLElement;
    const footer = root.querySelector('#custom-footer')?.closest('app-doc-section');
    const selectedBefore = footer?.querySelectorAll('[aria-selected="true"]').length ?? 0;

    footer?.querySelector<HTMLButtonElement>('.calendar-range-footer button')?.click();
    fixture.detectChanges();

    expect(selectedBefore).toBeGreaterThan(0);
    expect(footer?.querySelectorAll('[aria-selected="true"]')).toHaveLength(0);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CALENDAR_RANGE_DOCS_MANIFEST.loadPage(),
      CALENDAR_RANGE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CalendarRangePage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(CALENDAR_RANGE_EXAMPLE_SOURCES).sort()).toEqual(
      [...CALENDAR_RANGE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
