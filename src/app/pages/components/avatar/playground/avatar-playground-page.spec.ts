import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { AvatarPlaygroundPage } from './avatar-playground-page';

function textInput(root: HTMLElement, label: string): HTMLInputElement {
  const controlLabel = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  const inputId = controlLabel?.getAttribute('for');
  const input = inputId ? root.querySelector<HTMLInputElement>(`#${inputId}`) : null;

  if (!input) {
    throw new Error(`Missing text input: ${label}`);
  }

  return input;
}

function setTextInput(root: HTMLElement, label: string, value: string): void {
  const input = textInput(root, label);

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('AvatarPlaygroundPage', () => {
  let fixture: ComponentFixture<AvatarPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarPlaygroundPage],
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

    fixture = TestBed.createComponent(AvatarPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits minimal non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    setTextInput(root, 'name', 'Design Bot');
    setTextInput(root, 'initials', 'DB');
    toggles.at(0)?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'xl')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'square')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'busy')?.click();
    toggles.at(1)?.click();
    fixture.detectChanges();

    const avatar = root.querySelector<HTMLElement>('app-api-playground-viewport kui-avatar');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(avatar?.getAttribute('data-kui-size')).toBe('xl');
    expect(avatar?.getAttribute('data-kui-shape')).toBe('square');
    expect(avatar?.getAttribute('data-kui-status')).toBe('busy');
    expect(snippet?.textContent).toContain(
      '<kui-avatar name="Design Bot" initials="DB" size="xl" shape="square" status="busy" loading />',
    );
  });

  it('escapes generated snippet text while preserving default omissions', () => {
    const root = fixture.nativeElement as HTMLElement;

    setTextInput(root, 'name', '<Nikita>');
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain('name="&lt;Nikita&gt;"');
    expect(snippet?.textContent).toContain('src="/users/nikita.png"');
    expect(snippet?.textContent).not.toContain('size="md"');
    expect(snippet?.textContent).not.toContain('shape="circle"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
