import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CALENDAR_EXAMPLE_SOURCES } from '@generated/example-sources/calendar.generated';

import { CALENDAR_DOCS_MANIFEST } from './calendar.docs-manifest';
import { CalendarPage } from './calendar-page';

describe('CalendarPage', () => {
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPage],
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

    fixture = TestBed.createComponent(CalendarPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered calendar examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Calendar');
    expect(sectionIds).toEqual(['import', 'usage', 'states', 'api', 'accessibility']);
    expect(root.querySelectorAll('app-live-preview kui-calendar')).toHaveLength(2);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CALENDAR_DOCS_MANIFEST.loadPage(),
      CALENDAR_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CalendarPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(CALENDAR_DOCS_MANIFEST.exampleIds).toEqual(['basic-calendar-example']);
    expect(Object.keys(CALENDAR_EXAMPLE_SOURCES).sort()).toEqual(
      [...CALENDAR_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('records calendar accessibility guidance for the installed grid', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.textContent).toContain('grid');
    expect(root.textContent).toContain('disabled dates');
  });
});
