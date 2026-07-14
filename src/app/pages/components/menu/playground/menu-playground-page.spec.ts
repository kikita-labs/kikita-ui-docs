import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { MenuPlaygroundPage } from './menu-playground-page';

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

function setNumberInput(root: HTMLElement, label: string, value: number): void {
  const controlLabel = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  const input = controlLabel?.htmlFor
    ? root.querySelector<HTMLInputElement>(`#${controlLabel.htmlFor}`)
    : null;

  if (!input) {
    throw new Error(`Missing number input: ${label}`);
  }

  input.value = String(value);
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

describe('MenuPlaygroundPage', () => {
  let fixture: ComponentFixture<MenuPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPlaygroundPage],
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

    fixture = TestBed.createComponent(MenuPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'trigger label', '<Actions>');
    setTextInput(root, 'ariaLabel', '<Project actions>');
    setTextInput(root, 'minWidth', '18rem');
    setNumberInput(root, 'offset', 12);
    optionButtons.find((button) => button.textContent?.trim() === 'top')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'end')?.click();
    toggleSwitch(root, 'group header');
    toggleSwitch(root, 'disabled item');
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLButtonElement>(
      '.api-playground-viewport__resizable button[kuibutton]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.textContent?.trim()).toBe('<Actions>');
    expect(snippet?.textContent).toContain('&lt;Actions&gt;');
    expect(snippet?.textContent).toContain('ariaLabel="&lt;Project actions&gt;"');
    expect(snippet?.textContent).toContain('placement="top"');
    expect(snippet?.textContent).toContain('menuAlign="end"');
    expect(snippet?.textContent).toContain('[offset]="12"');
    expect(snippet?.textContent).toContain('minWidth="18rem"');
    expect(snippet?.textContent).toContain('kuiMenuHeader');
    expect(snippet?.textContent).toContain('disabled');
  });

  it('can omit destructive action from the generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    toggleSwitch(root, 'destructive item');
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).not.toContain('appearance="destructive"');
    expect(snippet?.textContent).not.toContain('Delete');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
