import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';

import { expectNoAxeViolations } from '../testing/axe';
import { CodeHighlighterService } from './code-highlighter.service';
import { type CodeTab } from './code-tab';
import { CodeTabs } from './code-tabs';

const TABS: readonly CodeTab[] = [
  { label: 'HTML', filename: 'example.html', language: 'html', code: '<button>Save</button>' },
  { label: 'TS', filename: 'example.ts', language: 'ts', code: 'readonly saved = signal(false);' },
];

describe('CodeTabs', () => {
  let fixture: ComponentFixture<CodeTabs>;
  const highlight = vi.fn();
  const writeText = vi.fn();

  beforeEach(async () => {
    highlight.mockResolvedValue('<pre class="shiki"><code>highlighted</code></pre>');
    writeText.mockResolvedValue({ ok: true, value: undefined });

    await TestBed.configureTestingModule({
      imports: [CodeTabs],
      providers: [
        provideKikitaUi(),
        { provide: CodeHighlighterService, useValue: { highlight } },
        { provide: DocsClipboardService, useValue: { writeText } },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeTabs);
    fixture.componentRef.setInput('label', 'Button sources');
    fixture.componentRef.setInput('tabs', TABS);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('switches tabs and keeps tab/panel relationships stable', async () => {
    const root = fixture.nativeElement as HTMLElement;
    const tabButtons = root.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    tabButtons[1]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const panel = root.querySelector<HTMLElement>('[role="tabpanel"]');

    expect(panel?.getAttribute('aria-labelledby')).toBe(tabButtons[1]?.id);
    expect(highlight).toHaveBeenLastCalledWith(
      TABS[1]?.code,
      TABS[1]?.language,
      'github-dark-default',
    );
    expect(root.querySelector('[aria-label="Copy example.ts"]')).not.toBeNull();
  });

  it('supports wrapping arrow, Home, and End keyboard navigation', async () => {
    const root = fixture.nativeElement as HTMLElement;
    const tabButtons = root.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    tabButtons[0]?.focus();
    tabButtons[0]?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tabButtons[1]?.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(tabButtons[1]);

    tabButtons[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(tabButtons[0]?.getAttribute('aria-checked')).toBe('true');
  });

  it('copies the selected source through the clipboard adapter', async () => {
    const copy = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[aria-label="Copy example.html"]',
    );

    copy?.click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith(TABS[0]?.code);
  });

  it('falls back to plain code when highlighting fails', async () => {
    highlight.mockRejectedValueOnce(new Error('highlight failed'));
    fixture.componentRef.setInput('tabs', [
      { label: 'Text', filename: 'failure.txt', language: 'text', code: 'plain fallback' },
    ] satisfies readonly CodeTab[]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('pre code')?.textContent).toBe(
      'plain fallback',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
