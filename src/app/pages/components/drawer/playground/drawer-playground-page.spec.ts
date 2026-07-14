import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DrawerPlaygroundPage } from './drawer-playground-page';

describe('DrawerPlaygroundPage', () => {
  let fixture: ComponentFixture<DrawerPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerPlaygroundPage],
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

    fixture = TestBed.createComponent(DrawerPlaygroundPage);
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

    optionButtons.find((button) => button.textContent?.trim() === 'bottom')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'full')?.click();
    switches[0]?.click();
    switches[1]?.click();
    switches[2]?.click();
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain("side: 'bottom'");
    expect(snippet?.textContent).toContain("size: 'full'");
    expect(snippet?.textContent).toContain('closeOnBackdropClick: false');
    expect(snippet?.textContent).toContain('closeOnEscape: false');
    expect(snippet?.textContent).toContain('closable: false');
  });

  it('escapes generated TypeScript string literals in the live snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="text"]')];

    inputs[0]!.value = "Owner's drawer";
    inputs[0]!.dispatchEvent(new Event('input'));
    inputs[1]!.value = "Use C:\\temp\\drawer's file.";
    inputs[1]!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain("Owner\\'s drawer");
    expect(snippet?.textContent).toContain("C:\\\\temp\\\\drawer\\'s file");
  });

  it('opens the configured package drawer from the user event injection boundary', async () => {
    const buttons = [...(fixture.nativeElement as HTMLElement).querySelectorAll('button')];
    const trigger = buttons.find((button) => button.textContent?.trim() === 'Open drawer');

    trigger?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('.kui-drawer-title')?.textContent).toContain('Filter results');
    expect(document.querySelector('.kui-drawer-body')?.textContent).toContain(
      'Adjust filters and confirm to apply them.',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
