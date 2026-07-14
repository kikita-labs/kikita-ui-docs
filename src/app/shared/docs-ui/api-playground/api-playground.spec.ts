import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';

import { CodeHighlighterService } from '../code-tabs/code-highlighter.service';
import { expectNoAxeViolations } from '../testing/axe';
import { ApiPlayground } from './api-playground';
import { definePlaygroundControls } from './playground-control';

const CONTROLS = definePlaygroundControls([
  { key: 'shape', label: 'shape', kind: 'enum', options: ['solid', 'soft'], defaultValue: 'solid' },
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save' },
  { key: 'count', label: 'count', kind: 'number', defaultValue: 1 },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
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
    const toggle = root.querySelector<HTMLInputElement>('input[type="checkbox"]');

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
      label: 'Submit',
      count: 3,
      disabled: true,
    });
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
