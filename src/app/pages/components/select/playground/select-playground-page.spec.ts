import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SelectPlaygroundPage } from './select-playground-page';

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

  input.checked = !input.checked;
  input.dispatchEvent(new Event('change'));
}

describe('SelectPlaygroundPage', () => {
  let fixture: ComponentFixture<SelectPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlaygroundPage],
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

    fixture = TestBed.createComponent(SelectPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'placeholder', '<Pick role>');
    toggleSwitch(root, 'multiple');
    toggleSwitch(root, 'clearable');
    optionButtons.find((button) => button.textContent?.trim() === 'text')?.click();
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input[kuiselect]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.getAttribute('role')).toBe('combobox');
    expect(trigger?.placeholder).toBe('<Pick role>');
    expect(snippet?.textContent).toContain('multiple');
    expect(snippet?.textContent).toContain('multipleDisplay="text"');
    expect(snippet?.textContent).toContain('placeholder="&lt;Pick role&gt;"');
    expect(snippet?.textContent).toContain('[clearable]="true"');
  });

  it('keeps disabled and readonly preview states in the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    toggleSwitch(root, 'disabled');
    toggleSwitch(root, 'readonly');
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLInputElement>(
      '.api-playground-viewport__resizable input[kuiselect]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.disabled).toBe(true);
    expect(trigger?.readOnly).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
    expect(snippet?.textContent).toContain('readonly');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
