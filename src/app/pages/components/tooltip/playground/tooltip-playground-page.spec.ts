import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TooltipPlaygroundPage } from './tooltip-playground-page';

function setTextControl(root: HTMLElement, label: string, value: string): void {
  const controlLabel = [
    ...root.querySelectorAll<HTMLLabelElement>('.api-playground__group-label'),
  ].find((candidate) => candidate.textContent?.trim() === label);
  const inputId = controlLabel?.getAttribute('for');
  const input = inputId ? root.querySelector<HTMLInputElement>(`#${inputId}`) : null;

  if (!input) throw new Error(`Missing text control: ${label}`);

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('TooltipPlaygroundPage', () => {
  let fixture: ComponentFixture<TooltipPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipPlaygroundPage],
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

    fixture = TestBed.createComponent(TooltipPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates tooltip text and generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'right')?.click();
    setTextControl(root, 'text', 'Save changes');
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLButtonElement>(
      '.api-playground-viewport__resizable button',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.textContent?.trim()).toBe('Save');
    expect(snippet?.textContent).toContain('placement="right"');
    expect(snippet?.textContent).toContain('Save changes');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
