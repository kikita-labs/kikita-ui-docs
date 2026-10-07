import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';

import { CodeHighlighterService } from '../code-tabs';
import { expectNoAxeViolations } from '../testing/axe';
import { ApiPlayground } from './api-playground';
import { definePlaygroundControls } from './helpers';

const CONTROLS = definePlaygroundControls([
  { key: 'shape', label: 'shape', kind: 'enum', options: ['solid', 'soft'], defaultValue: 'solid' },
  {
    key: 'appearance',
    label: 'appearance',
    kind: 'enum',
    options: ['none', 'primary', 'danger', 'success', 'warning'],
    defaultValue: 'none',
  },
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save' },
  { key: 'count', label: 'count', kind: 'number', defaultValue: 1 },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  {
    key: 'parts',
    label: 'parts',
    kind: 'multi',
    options: ['icon', 'badge', 'hint'],
    defaultValue: ['icon'],
  },
] as const);

describe('ApiPlayground', () => {
  let fixture: ComponentFixture<ApiPlayground<typeof CONTROLS>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPlayground],
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

    fixture = TestBed.createComponent<ApiPlayground<typeof CONTROLS>>(ApiPlayground);
    fixture.componentRef.setInput('previewLabel', 'Typed playground');
    fixture.componentRef.setInput('controls', CONTROLS);
    fixture.componentRef.setInput(
      'snippet',
      (values: ReturnType<typeof fixture.componentInstance.values>) => [
        { label: 'HTML', language: 'html', code: JSON.stringify(values) },
      ],
    );
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders each control kind and exposes typed reactive values', () => {
    const root = fixture.nativeElement as HTMLElement;
    const soft = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')].find(
      (button) => button.textContent?.trim() === 'soft',
    );
    const inputs = root.querySelectorAll<HTMLInputElement>('.api-playground__text-controls input');
    const toggle = root.querySelector<HTMLInputElement>(
      '.api-playground__state-controls input[type="checkbox"]',
    );

    expect(inputs[0]?.classList.contains('kui-input')).toBe(true);
    expect(inputs[1]?.classList.contains('kui-number-input__input')).toBe(true);

    soft?.click();
    if (inputs[0]) {
      inputs[0].value = 'Submit';
      inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (inputs[1]) {
      inputs[1].value = '3';
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    toggle?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.values()).toEqual({
      shape: 'soft',
      appearance: 'none',
      label: 'Submit',
      count: 3,
      disabled: true,
      parts: ['icon'],
    });
  });

  it('toggles multi options in declared order and resets every control', () => {
    const root = fixture.nativeElement as HTMLElement;
    const partInputs = root.querySelectorAll<HTMLInputElement>(
      '.api-playground__multi-options input',
    );
    const reset = [...root.querySelectorAll<HTMLButtonElement>('button')].find(
      (button) => button.textContent?.trim() === 'Reset controls',
    );

    expect(reset?.disabled).toBe(true);

    partInputs[2]?.click();
    partInputs[1]?.click();
    partInputs[0]?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.values().parts).toEqual(['badge', 'hint']);
    expect(reset?.disabled).toBe(false);

    reset?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.values().parts).toEqual(['icon']);
    expect(reset?.disabled).toBe(true);
  });

  it('marks wide enum groups for wrapping without changing control data', () => {
    const root = fixture.nativeElement as HTMLElement;
    const wideGroups = root.querySelectorAll('.api-playground__group--wide');

    expect(wideGroups).toHaveLength(1);
    expect(wideGroups[0]?.textContent).toContain('appearance');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
