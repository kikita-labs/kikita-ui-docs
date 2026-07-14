import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { PopoverPlaygroundPage } from './popover-playground-page';

describe('PopoverPlaygroundPage', () => {
  let fixture: ComponentFixture<PopoverPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverPlaygroundPage],
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

    fixture = TestBed.createComponent(PopoverPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates visible trigger text and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const triggerLabel = root.querySelector<HTMLInputElement>('input[type="text"]');
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const switches = [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];

    triggerLabel!.value = 'Inspect';
    triggerLabel!.dispatchEvent(new Event('input'));
    optionButtons.find((button) => button.textContent?.trim() === 'top')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'start')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'hover')?.click();
    switches[0]?.click();
    switches[1]?.click();
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLElement>(
      'app-api-playground-viewport button[kuiButton]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.textContent?.trim()).toBe('Inspect');
    expect(snippet?.textContent).toContain(
      '<kui-popover #myPop placement="top" align="start" [arrow]="true" triggerType="hover" [trapFocus]="true">',
    );
  });

  it('escapes generated projected content in the live snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="text"]')];

    inputs[1]!.value = '<Title>';
    inputs[1]!.dispatchEvent(new Event('input'));
    inputs[2]!.value = 'Use <strong>carefully</strong>.';
    inputs[2]!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain('&lt;Title&gt;');
    expect(snippet?.textContent).toContain('Use &lt;strong&gt;carefully&lt;/strong&gt;.');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
