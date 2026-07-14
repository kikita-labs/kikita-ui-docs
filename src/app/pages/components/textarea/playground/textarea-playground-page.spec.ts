import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TextareaPlaygroundPage } from './textarea-playground-page';

function setTextInput(root: HTMLElement, label: string, value: string): void {
  const controlLabel = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  const input = controlLabel?.htmlFor
    ? root.querySelector<HTMLInputElement>(`#${controlLabel.htmlFor}`)
    : null;

  if (!input) {
    throw new Error(`Missing text input: ${label}`);
  }

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('TextareaPlaygroundPage', () => {
  let fixture: ComponentFixture<TextareaPlaygroundPage>;

  function previewTextarea(): HTMLTextAreaElement | null {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLTextAreaElement>(
        '.api-playground-viewport__resizable textarea.kui-textarea',
      ) ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaPlaygroundPage],
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

    fixture = TestBed.createComponent(TextareaPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet content', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    setTextInput(root, 'placeholder', '<note>');
    setTextInput(root, 'value', '<hello>');
    setTextInput(root, 'rows', '6');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(0)?.click();
    fixture.detectChanges();

    const textarea = previewTextarea();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(textarea?.value).toBe('<hello>');
    expect(textarea?.placeholder).toBe('<note>');
    expect(textarea?.rows).toBe(6);
    expect(textarea?.getAttribute('data-kui-size')).toBe('lg');
    expect(textarea?.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toBe(
      '<textarea kuiTextarea size="lg" rows="6" placeholder="&lt;note&gt;" invalid>&lt;hello&gt;</textarea>',
    );
  });

  it('keeps disabled behavior and snippet attribute', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(1)?.click();
    fixture.detectChanges();

    const textarea = previewTextarea();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(textarea?.disabled).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
