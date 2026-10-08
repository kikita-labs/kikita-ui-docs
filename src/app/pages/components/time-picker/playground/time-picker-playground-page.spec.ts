import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TimePickerPlaygroundPage } from './time-picker-playground-page';

describe('TimePickerPlaygroundPage', () => {
  let fixture: ComponentFixture<TimePickerPlaygroundPage>;

  function option(label: string, control?: string): HTMLButtonElement | undefined {
    const root = fixture.nativeElement as HTMLElement;
    const group = control
      ? [...root.querySelectorAll<HTMLElement>('.api-playground__group')].find((candidate) =>
          candidate.textContent?.trim().startsWith(control),
        )
      : root;

    return [...(group?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])].find(
      (button) => button.textContent?.trim() === label,
    );
  }

  function toggle(label: string): HTMLInputElement | undefined {
    const row = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.api-playground__toggle-row',
      ),
    ].find((candidate) => candidate.querySelector('span')?.textContent?.trim() === label);

    return row?.querySelector<HTMLInputElement>('input') ?? undefined;
  }

  function snippet(): string {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.code-tabs__fallback code')
        ?.textContent ?? ''
    );
  }

  function input(): HTMLInputElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input[kuiTimePicker]',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerPlaygroundPage],
      providers: [
        provideKikitaUi({ locale: 'en-US' }),
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

    fixture = TestBed.createComponent(TimePickerPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only binds the value', () => {
    expect(snippet()).toBe(`<kui-field label="Meeting time">
  <input kuiTimePicker [(value)]="time" />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="280px">
    <kui-time-picker-panel />
  </kui-dropdown>
</kui-field>`);
    expect(input()?.getAttribute('role')).toBe('combobox');
  });

  it('switches to 24 hours with seconds and reflects it in the input and the snippet', () => {
    option('24h', 'format')?.click();
    toggle('showSeconds')?.click();
    fixture.detectChanges();

    expect(input()?.value).toBe('09:30:00');
    expect(snippet()).toContain('format="24h"');
    expect(snippet()).toContain('[showSeconds]="true"');
  });

  it('applies the limits, lunch hours, disabled and readonly states', () => {
    toggle('minTime and maxTime')?.click();
    toggle('disabledHours (lunch)')?.click();
    toggle('readonly')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('[minTime]="minTime" [maxTime]="maxTime"');
    expect(snippet()).toContain('[disabledHours]="lunchHours"');
    expect(input()?.readOnly).toBe(true);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
