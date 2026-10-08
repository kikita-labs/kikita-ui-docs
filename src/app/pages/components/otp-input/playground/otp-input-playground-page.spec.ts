import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { OtpInputPlaygroundPage } from './otp-input-playground-page';

describe('OtpInputPlaygroundPage', () => {
  let fixture: ComponentFixture<OtpInputPlaygroundPage>;

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

  function cells(): HTMLInputElement[] {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        '.api-playground-viewport__resizable [role="group"] input',
      ),
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpInputPlaygroundPage],
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

    fixture = TestBed.createComponent(OtpInputPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet binds only the value and the event', () => {
    expect(snippet()).toBe('<kui-otp-input [(value)]="code" (complete)="verify($event)" />');
    expect(cells()).toHaveLength(6);
  });

  it('applies mask, loading and disabled to every cell and the snippet', () => {
    toggle('mask')?.click();
    toggle('loading')?.click();
    fixture.detectChanges();

    expect(cells().every((cell) => cell.type === 'password')).toBe(true);
    expect(cells().every((cell) => cell.disabled)).toBe(true);
    expect(snippet()).toContain('mask');
    expect(snippet()).toContain('loading');
  });

  it('switches to an alphanumeric code and logs the completed value', () => {
    toggle('integerOnly')?.click();
    fixture.detectChanges();

    cells().forEach((cell) => {
      cell.value = 'A';
      cell.dispatchEvent(new Event('input', { bubbles: true }));
    });
    fixture.detectChanges();

    const log = (fixture.nativeElement as HTMLElement).querySelector('app-playground-event-log');

    expect(snippet()).toContain('[integerOnly]="false"');
    expect(log?.textContent).toContain('complete');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
