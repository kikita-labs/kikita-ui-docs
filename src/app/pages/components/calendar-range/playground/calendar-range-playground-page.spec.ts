import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CalendarRangePlaygroundPage } from './calendar-range-playground-page';

describe('CalendarRangePlaygroundPage', () => {
  let fixture: ComponentFixture<CalendarRangePlaygroundPage>;

  function option(label: string): HTMLButtonElement | undefined {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[role="radio"]',
      ),
    ].find((button) => button.textContent?.trim() === label);
  }

  function snippet(): string | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.code-tabs__fallback code',
    )?.textContent;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRangePlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: CodeHighlighterService,
          useValue: { highlight: vi.fn().mockRejectedValue(new Error('fallback')) },
        },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarRangePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only binds the value', () => {
    expect(snippet()).toBe('<kui-calendar-range [(value)]="range" [viewDate]="viewDate" />');
  });

  it('applies the locale, messages and disabled dates to the preview and the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    option('en-GB')?.click();
    option('custom')?.click();
    option('weekends')?.click();
    fixture.detectChanges();

    const calendar = root.querySelector<HTMLElement>(
      'app-api-playground-viewport kui-calendar-range',
    );

    expect(calendar?.querySelector('[role="grid"]')?.getAttribute('aria-label')).toBe(
      'Booking range',
    );
    expect(snippet()).toBe(
      '<kui-calendar-range [(value)]="range" [viewDate]="viewDate" locale="en-GB" [messages]="messages" [disabledDates]="isWeekend" />',
    );
  });

  it('commits a range with two clicks and logs the value change', () => {
    const root = fixture.nativeElement as HTMLElement;
    const days = [
      ...root.querySelectorAll<HTMLButtonElement>(
        'app-api-playground-viewport button.kui-calendar-day:not([disabled])',
      ),
    ];

    days[0]?.click();
    fixture.detectChanges();
    days[4]?.click();
    fixture.detectChanges();

    const log = root.querySelector('app-playground-event-log')?.textContent ?? '';

    expect(log).toContain('valueChange');
    expect(
      root.querySelectorAll('app-api-playground-viewport [aria-selected="true"]'),
    ).toHaveLength(2);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
