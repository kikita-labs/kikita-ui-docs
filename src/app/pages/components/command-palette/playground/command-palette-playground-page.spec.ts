import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CommandPalettePlaygroundPage } from './command-palette-playground-page';

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

describe('CommandPalettePlaygroundPage', () => {
  let fixture: ComponentFixture<CommandPalettePlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPalettePlaygroundPage],
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

    fixture = TestBed.createComponent(CommandPalettePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates snippet bindings for labels, empty text, loading, and groups', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'label', 'Command <hub>');
    setTextInput(root, 'placeholder', "Find Nikita's action");
    setTextInput(root, 'emptyText', 'Nothing here');
    optionButtons.find((button) => button.textContent?.trim() === 'no matches')?.click();
    toggleSwitch(root, 'loading');
    fixture.detectChanges();

    const trigger = root.querySelector<HTMLButtonElement>(
      '.api-playground-viewport__resizable button[kuibutton]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.textContent?.trim()).toBe('Open command palette');
    expect(snippet?.textContent).toContain(`[label]="'Command <hub>'"`);
    expect(snippet?.textContent).toContain(`[placeholder]="'Find Nikita\\'s action'"`);
    expect(snippet?.textContent).toContain(`[emptyText]="'Nothing here'"`);
    expect(snippet?.textContent).toContain('[loading]="true"');
    expect(snippet?.textContent).toContain('[groups]="groups"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
