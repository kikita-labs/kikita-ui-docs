import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { NumberInputPlaygroundPage } from './number-input-playground-page';

function setNumberInput(root: HTMLElement, label: string, value: string): void {
  const controlLabel = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  const input = controlLabel?.htmlFor
    ? root.querySelector<HTMLInputElement>(`#${controlLabel.htmlFor}`)
    : null;

  if (!input) {
    throw new Error(`Missing number input: ${label}`);
  }

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

function toggleSwitch(root: HTMLElement, label: string): void {
  const controlLabel = [
    ...root.querySelectorAll<HTMLLabelElement>('.api-playground__toggle-row'),
  ].find((candidate) => candidate.querySelector('span')?.textContent?.trim() === label);
  const input = controlLabel?.querySelector<HTMLInputElement>('input');

  if (!input) {
    throw new Error(`Missing switch: ${label}`);
  }

  input.checked = true;
  input.dispatchEvent(new Event('change'));
}

describe('NumberInputPlaygroundPage', () => {
  let fixture: ComponentFixture<NumberInputPlaygroundPage>;

  function previewInput(): HTMLInputElement {
    const input = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input.kui-number-input__input',
    );

    if (!input) {
      throw new Error('Missing number input preview');
    }

    return input;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputPlaygroundPage],
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

    fixture = TestBed.createComponent(NumberInputPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setNumberInput(root, 'min', '5');
    setNumberInput(root, 'max', '50');
    setNumberInput(root, 'step', '5');
    setNumberInput(root, 'value', '25');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'a')?.click();
    toggleSwitch(root, 'invalid');
    fixture.detectChanges();

    const input = previewInput();
    const wrapper = input.closest<HTMLElement>('.kui-number-input');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(input.min).toBe('5');
    expect(input.max).toBe('50');
    expect(input.step).toBe('5');
    expect(input.value).toBe('25');
    expect(wrapper?.getAttribute('data-kui-size')).toBe('lg');
    expect(wrapper).not.toBeNull();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain('size="lg"');
    expect(snippet?.textContent).toContain('variant="a"');
    expect(snippet?.textContent).toContain('min="5"');
    expect(snippet?.textContent).toContain('invalid');
  });

  it('keeps disabled and readonly preview states in the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    toggleSwitch(root, 'disabled');
    toggleSwitch(root, 'readonly');
    fixture.detectChanges();

    const input = previewInput();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
    expect(snippet?.textContent).toContain('readonly');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
