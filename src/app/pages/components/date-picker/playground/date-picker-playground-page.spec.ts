import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DatePickerPlaygroundPage } from './date-picker-playground-page';

describe('DatePickerPlaygroundPage', () => {
  let fixture: ComponentFixture<DatePickerPlaygroundPage>;

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
      imports: [DatePickerPlaygroundPage],
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

    fixture = TestBed.createComponent(DatePickerPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the playground date picker and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Date Picker');
    expect(root.querySelector('input[kuiDatePicker]')).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });

  it('pins the format and passes custom messages to the preview and the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    option('dd.MM.yyyy')?.click();
    option('custom')?.click();
    fixture.detectChanges();

    const input = root.querySelector<HTMLInputElement>(
      'app-api-playground-viewport input[kuiDatePicker]',
    );

    expect(input?.value).toBe('14.07.2026');
    expect(snippet()).toContain('format="dd.MM.yyyy"');
    expect(snippet()).toContain('[messages]="messages"');
  });

  it('wires the calendar by itself, so the snippet has no calendar bindings', () => {
    expect(snippet()).toContain('<kui-calendar flat showFooter />');
    expect(snippet()).not.toContain('viewDate');
  });

  it('logs the value change of a date typed in the locale layout', () => {
    const root = fixture.nativeElement as HTMLElement;
    const input = root.querySelector<HTMLInputElement>(
      'app-api-playground-viewport input[kuiDatePicker]',
    );

    if (input) {
      input.value = '07/03/2026';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('valueChange');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
