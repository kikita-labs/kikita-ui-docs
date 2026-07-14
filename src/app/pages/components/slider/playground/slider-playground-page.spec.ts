import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SliderPlaygroundPage } from './slider-playground-page';

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

describe('SliderPlaygroundPage', () => {
  let fixture: ComponentFixture<SliderPlaygroundPage>;

  function previewSlider(): HTMLInputElement {
    const slider = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input.kui-slider-native',
    );

    if (!slider) {
      throw new Error('Missing slider preview');
    }

    return slider;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderPlaygroundPage],
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

    fixture = TestBed.createComponent(SliderPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setNumberInput(root, 'min', '10');
    setNumberInput(root, 'max', '90');
    setNumberInput(root, 'step', '5');
    setNumberInput(root, 'value', '45');
    setTextInput(root, 'minLabel', '<Low>');
    setTextInput(root, 'maxLabel', '<High>');
    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggleSwitch(root, 'invalid');
    fixture.detectChanges();

    const slider = previewSlider();
    const wrapper = slider.closest<HTMLElement>('.kui-slider');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(slider.min).toBe('10');
    expect(slider.max).toBe('90');
    expect(slider.step).toBe('5');
    expect(slider.value).toBe('45');
    expect(wrapper?.getAttribute('data-kui-color')).toBe('danger');
    expect(wrapper?.getAttribute('data-kui-size')).toBe('lg');
    expect(slider.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain('color="danger"');
    expect(snippet?.textContent).toContain('size="lg"');
    expect(snippet?.textContent).toContain('minLabel="&lt;Low&gt;"');
    expect(snippet?.textContent).toContain('maxLabel="&lt;High&gt;"');
  });

  it('keeps disabled preview and snippet state when requested', () => {
    const root = fixture.nativeElement as HTMLElement;
    toggleSwitch(root, 'disabled');
    fixture.detectChanges();

    const slider = previewSlider();
    const wrapper = slider.closest<HTMLElement>('.kui-slider');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(wrapper?.hasAttribute('data-kui-disabled')).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
