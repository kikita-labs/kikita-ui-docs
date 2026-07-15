import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { FieldPlaygroundPage } from './field-playground-page';

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

describe('FieldPlaygroundPage', () => {
  let fixture: ComponentFixture<FieldPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPlaygroundPage],
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

    fixture = TestBed.createComponent(FieldPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'label', '<Email>');
    setTextInput(root, 'hint', '<Work only>');
    setTextInput(root, 'error', '<Required>');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggleSwitch(root, 'required');
    fixture.detectChanges();

    const field = root.querySelector<HTMLElement>('.api-playground-viewport__resizable kui-field');
    const input = root.querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input.kui-input',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(field?.getAttribute('data-kui-size')).toBe('lg');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toContain('hint');
    expect(snippet?.textContent).toContain('label="&lt;Email&gt;"');
    expect(snippet?.textContent).toContain('hint="&lt;Work only&gt;"');
    expect(snippet?.textContent).toContain('error="&lt;Required&gt;"');
    expect(snippet?.textContent).toContain('required');
  });

  it('keeps explicit errors invalid when hideErrors is enabled', () => {
    const root = fixture.nativeElement as HTMLElement;

    setTextInput(root, 'error', '<Required>');
    toggleSwitch(root, 'hideErrors');
    fixture.detectChanges();

    const input = root.querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input.kui-input',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain('error="&lt;Required&gt;"');
    expect(snippet?.textContent).toContain('hideErrors');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
