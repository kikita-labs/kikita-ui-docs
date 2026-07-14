import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ColorInputPlaygroundPage } from './color-input-playground-page';

function toggleSwitch(root: HTMLElement, label: string): void {
  const controlLabel = [
    ...root.querySelectorAll<HTMLLabelElement>('.api-playground__toggle-row'),
  ].find((candidate) => candidate.querySelector('span')?.textContent?.trim() === label);
  const input = controlLabel?.querySelector<HTMLInputElement>('input');

  if (!input) throw new Error(`Missing switch: ${label}`);

  input.checked = !input.checked;
  input.dispatchEvent(new Event('change'));
}

describe('ColorInputPlaygroundPage', () => {
  let fixture: ComponentFixture<ColorInputPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorInputPlaygroundPage],
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

    fixture = TestBed.createComponent(ColorInputPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates size and invalid snippet state', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggleSwitch(root, 'invalid');
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(root.querySelector('.api-playground-viewport__resizable input[kuicolorinput]')).not.toBeNull();
    expect(snippet?.textContent).toContain('size="lg"');
    expect(snippet?.textContent).toContain('invalid');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
