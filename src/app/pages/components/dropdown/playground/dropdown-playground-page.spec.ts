import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DropdownPlaygroundPage } from './dropdown-playground-page';

describe('DropdownPlaygroundPage', () => {
  let fixture: ComponentFixture<DropdownPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPlaygroundPage],
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

    fixture = TestBed.createComponent(DropdownPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelector<HTMLElement>('.cdk-overlay-container')?.replaceChildren();
  });

  it('updates visible trigger text and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="text"]')];
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const switches = [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];

    inputs[0]!.value = 'More actions';
    inputs[0]!.dispatchEvent(new Event('input'));
    inputs[1]!.value = '320px';
    inputs[1]!.dispatchEvent(new Event('input'));
    inputs[2]!.value = '18rem';
    inputs[2]!.dispatchEvent(new Event('input'));
    optionButtons.find((button) => button.textContent?.trim() === 'dialog')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'content')?.click();
    switches[0]?.click();
    switches[1]?.click();
    fixture.detectChanges();

    const trigger = [...root.querySelectorAll<HTMLButtonElement>('button')].find(
      (button) => button.textContent?.trim() === 'More actions',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(trigger?.textContent?.trim()).toBe('More actions');
    expect(snippet?.textContent).toContain(
      `<kui-dropdown #menu [maxHeight]="'320px'" [closeOnSelect]="false" panelRole="dialog" panelWidth="content" width="18rem">`,
    );
    expect(snippet?.textContent).toContain('[disabled]="true"');
  });

  it('escapes generated trigger and width content in the live snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const inputs = [...root.querySelectorAll<HTMLInputElement>('input[type="text"]')];

    inputs[0]!.value = '<Actions>';
    inputs[0]!.dispatchEvent(new Event('input'));
    inputs[2]!.value = 'calc(100% - <bad>)';
    inputs[2]!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain('&lt;Actions&gt;');
    expect(snippet?.textContent).toContain('calc(100% - &lt;bad&gt;)');
  });

  it('opens the configured package dropdown and closes after option selection', async () => {
    const trigger = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'),
    ].find((button) => button.textContent?.trim() === 'Actions');

    trigger?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.querySelector<HTMLElement>('[role="listbox"]');

    expect(panel?.textContent).toContain('Edit');
    expect(panel?.textContent).toContain('Archive');

    panel?.querySelector<HTMLElement>('[role="option"]')?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      document
        .querySelector<HTMLElement>('[role="listbox"]')
        ?.classList.contains('kui-dropdown--closing'),
    ).toBe(true);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
