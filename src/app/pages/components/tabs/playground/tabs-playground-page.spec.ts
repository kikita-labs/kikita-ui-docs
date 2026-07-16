import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TabsPlaygroundPage } from './tabs-playground-page';

describe('TabsPlaygroundPage', () => {
  let fixture: ComponentFixture<TabsPlaygroundPage>;

  function toggleByLabel(root: HTMLElement, label: string): void {
    const row = [...root.querySelectorAll<HTMLElement>('.api-playground__toggle-row')].find(
      (item) => item.textContent?.includes(label),
    );

    row?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.click();
  }

  beforeEach(async () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        public observe(): void {
          return undefined;
        }

        public unobserve(): void {
          return undefined;
        }

        public disconnect(): void {
          return undefined;
        }
      },
    );

    await TestBed.configureTestingModule({
      imports: [TabsPlaygroundPage],
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

    fixture = TestBed.createComponent(TabsPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('updates preview state and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'pill')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'vertical')?.click();
    toggleByLabel(root, 'inverted');
    toggleByLabel(root, 'tab 2 hasError');
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport .kui-tabs');
    const errorTab = root.querySelector<HTMLElement>('button[value="settings"]');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.getAttribute('data-kui-variant')).toBe('pill');
    expect(preview?.getAttribute('data-kui-size')).toBe('lg');
    expect(preview?.getAttribute('data-kui-orientation')).toBe('vertical');
    expect(preview?.hasAttribute('data-kui-inverted')).toBe(true);
    expect(errorTab?.querySelector('.kui-tab-error-dot')).not.toBeNull();
    expect(snippet?.textContent).toContain(
      '<kui-tabs [(selected)]="activeTab" variant="pill" size="lg" orientation="vertical" inverted>',
    );
    expect(snippet?.textContent).toContain('hasError errorLabel="Contains errors"');
  });

  it('omits panels and aria-controls when controlsPanels is false', () => {
    const root = fixture.nativeElement as HTMLElement;

    toggleByLabel(root, 'controlsPanels');
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport .kui-tabs');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.querySelectorAll('[role="tabpanel"]')).toHaveLength(0);
    expect(preview?.querySelector('button[value="overview"]')?.hasAttribute('aria-controls')).toBe(
      false,
    );
    expect(snippet?.textContent).toContain('[controlsPanels]="false"');
    expect(snippet?.textContent).not.toContain('kuiTabPanel');
  });

  it('changes selected tab through keyboard-owned tab clicks', () => {
    const root = fixture.nativeElement as HTMLElement;
    const logsTab = root.querySelector<HTMLButtonElement>(
      'app-api-playground-viewport button[value="logs"]',
    );

    logsTab?.click();
    fixture.detectChanges();

    expect(logsTab?.getAttribute('aria-selected')).toBe('true');
    expect(
      root.querySelector('app-api-playground-viewport [role="tabpanel"]:not([hidden])')
        ?.textContent,
    ).toContain('Logs content.');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
