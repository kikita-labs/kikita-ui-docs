import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { GroupPlaygroundPage } from './group-playground-page';

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

describe('GroupPlaygroundPage', () => {
  let fixture: ComponentFixture<GroupPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPlaygroundPage],
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

    fixture = TestBed.createComponent(GroupPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet content', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'first label', '<One>');
    setTextInput(root, 'second label', '<Two>');
    setTextInput(root, 'third label', '<Three>');
    optionButtons.find((button) => button.textContent?.trim() === 'vertical')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggleSwitch(root, 'collapsed');
    fixture.detectChanges();

    const group = root.querySelector<HTMLElement>('.api-playground-viewport__resizable .kui-group');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(group?.getAttribute('data-kui-orientation')).toBe('vertical');
    expect(group?.getAttribute('data-kui-size')).toBe('lg');
    expect(group?.hasAttribute('data-kui-collapsed')).toBe(true);
    expect(snippet?.textContent).toContain('orientation="vertical"');
    expect(snippet?.textContent).toContain('size="lg"');
    expect(snippet?.textContent).toContain('collapsed');
    expect(snippet?.textContent).toContain('&lt;One&gt;');
  });

  it('keeps rounded false in the generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    toggleSwitch(root, 'rounded');
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain('[rounded]="false"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
