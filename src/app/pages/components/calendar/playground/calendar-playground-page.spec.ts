import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CalendarPlaygroundPage } from './calendar-playground-page';

describe('CalendarPlaygroundPage', () => {
  let fixture: ComponentFixture<CalendarPlaygroundPage>;

  function option(label: string): HTMLButtonElement | undefined {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[role="radio"]',
      ),
    ].find((button) => button.textContent?.trim() === label);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the playground calendar and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Calendar');
    expect(root.querySelector('kui-calendar')).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });

  it('applies the locale, messages and disabled dates to the preview and the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    option('en-GB')?.click();
    option('custom')?.click();
    option('weekends')?.click();
    fixture.detectChanges();

    const calendar = root.querySelector<HTMLElement>('app-api-playground-viewport kui-calendar');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(calendar?.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe(
      'Booking calendar',
    );
    expect(snippet?.textContent).toBe(
      '<kui-calendar [(value)]="selectedDate" locale="en-GB" [messages]="messages" [disabledDates]="isWeekend" />',
    );
  });

  it('logs value changes and omits default navigation attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const day = root.querySelector<HTMLButtonElement>(
      'app-api-playground-viewport button.kui-calendar-day:not([disabled])',
    );

    day?.click();
    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('valueChange');
    expect(root.querySelector<HTMLElement>('.code-tabs__fallback code')?.textContent).not.toContain(
      'showPrevNav',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
