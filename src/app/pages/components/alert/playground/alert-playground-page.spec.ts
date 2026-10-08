import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { AlertPlaygroundPage } from './alert-playground-page';

describe('AlertPlaygroundPage', () => {
  let fixture: ComponentFixture<AlertPlaygroundPage>;

  function option(label: string): HTMLButtonElement | undefined {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[role="radio"]',
      ),
    ].find((button) => button.textContent?.trim() === label);
  }

  function snippet(): string | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.code-tabs__fallback code',
    )?.textContent;
  }

  function previewAlert(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.api-playground-viewport__resizable kui-alert',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: CodeHighlighterService,
          useValue: { highlight: vi.fn().mockRejectedValue(new Error('fallback')) },
        },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only carries the texts', () => {
    expect(snippet()).toBe(
      '<kui-alert title="Session expiring" message="Your access token expires in 3 days." (closed)="onClosed()" />',
    );
    expect(previewAlert()?.getAttribute('role')).toBe('status');
  });

  it('switches the appearance, shape and size in the preview and the snippet', () => {
    option('danger')?.click();
    option('solid')?.click();
    option('sm')?.click();
    fixture.detectChanges();

    expect(previewAlert()?.getAttribute('role')).toBe('alert');
    expect(snippet()).toContain('appearance="danger" shape="solid" size="sm"');
  });

  it('adds the action binding only while an action label is set', () => {
    const root = fixture.nativeElement as HTMLElement;
    const input = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
      (label) => label.textContent?.trim() === 'actionLabel',
    )?.htmlFor;
    const field = input ? root.querySelector<HTMLInputElement>(`#${input}`) : null;

    if (field) {
      field.value = 'Renew';
      field.dispatchEvent(new Event('input'));
    }

    fixture.detectChanges();

    expect(snippet()).toContain('actionLabel="Renew"');
    expect(snippet()).toContain('(action)="onAction()"');
    expect(previewAlert()?.textContent).toContain('Renew');
  });

  it('logs the closed event when the close button is clicked', () => {
    const root = fixture.nativeElement as HTMLElement;

    previewAlert()?.querySelector<HTMLButtonElement>('button')?.click();
    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('closed');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
