import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DialogPlaygroundPage } from './dialog-playground-page';

describe('DialogPlaygroundPage', () => {
  let fixture: ComponentFixture<DialogPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPlaygroundPage],
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

    fixture = TestBed.createComponent(DialogPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelector<HTMLElement>('.cdk-overlay-container')?.replaceChildren();
  });

  it('updates trigger config and emits typed non-default snippet options', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const switches = [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    switches[0]?.click();
    switches[1]?.click();
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain("size: 'lg'");
    expect(snippet?.textContent).toContain("appearance: 'danger'");
    expect(snippet?.textContent).toContain('dismissable: false');
    expect(snippet?.textContent).toContain('closable: false');
  });

  it('escapes generated TypeScript string literals in the live snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="text"]')];

    inputs[0]!.value = "Owner's dialog";
    inputs[0]!.dispatchEvent(new Event('input'));
    inputs[1]!.value = "Use C:\\temp\\draft's file.";
    inputs[1]!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain("Owner\\'s dialog");
    expect(snippet?.textContent).toContain("C:\\\\temp\\\\draft\\'s file");
  });

  it('opens the configured package dialog from the user event injection boundary', async () => {
    const buttons = [...(fixture.nativeElement as HTMLElement).querySelectorAll('button')];
    const trigger = buttons.find((button) => button.textContent?.trim() === 'Open dialog');

    trigger?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('.kui-dialog-title')?.textContent).toContain('Discard changes?');
    expect(document.querySelector('.kui-dialog-body')?.textContent).toContain(
      'Unsaved edits will be lost.',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
