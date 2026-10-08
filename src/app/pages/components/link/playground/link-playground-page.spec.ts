import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { LinkPlaygroundPage } from './link-playground-page';

describe('LinkPlaygroundPage', () => {
  let fixture: ComponentFixture<LinkPlaygroundPage>;

  function option(label: string, control?: string): HTMLButtonElement | undefined {
    const root = fixture.nativeElement as HTMLElement;
    const group = control
      ? [...root.querySelectorAll<HTMLElement>('.api-playground__group')].find((candidate) =>
          candidate.textContent?.trim().startsWith(control),
        )
      : root;

    return [...(group?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])].find(
      (button) => button.textContent?.trim() === label,
    );
  }

  function snippet(): string | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.code-tabs__fallback code',
    )?.textContent;
  }

  function preview(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.api-playground-viewport__resizable [kuiLink]',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkPlaygroundPage],
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

    fixture = TestBed.createComponent(LinkPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only carries the host and text', () => {
    expect(snippet()).toBe('<a kuiLink href="#docs">Read the docs</a>');
    expect(preview()?.tagName).toBe('A');
  });

  it('marks an external link in the preview and the snippet', () => {
    option('_blank')?.click();
    fixture.detectChanges();

    expect(preview()?.getAttribute('rel')).toContain('noopener');
    expect(snippet()).toContain('target="_blank"');
  });

  it('switches to a button host and drops the anchor-only attributes', () => {
    option('button')?.click();
    fixture.detectChanges();

    expect(preview()?.tagName).toBe('BUTTON');
    expect(snippet()).toBe('<button kuiLink type="button">Read the docs</button>');
  });

  it('disables an anchor through aria-disabled', () => {
    const input = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        '.api-playground__toggle-row input',
      ),
    ][0];

    input?.click();
    fixture.detectChanges();

    expect(preview()?.getAttribute('aria-disabled')).toBe('true');
    expect(snippet()).toContain('disabled');
  });

  it('applies the tone and underline choices', () => {
    option('danger')?.click();
    option('always', 'underline')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('tone="danger" underline="always"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
