import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { FileUploadPlaygroundPage } from './file-upload-playground-page';

describe('FileUploadPlaygroundPage', () => {
  let fixture: ComponentFixture<FileUploadPlaygroundPage>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadPlaygroundPage],
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

    fixture = TestBed.createComponent(FileUploadPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the playground preview and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('File Upload');
    expect(
      root.querySelector('.api-playground-viewport__resizable kui-file-upload'),
    ).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });

  it('starts from the runtime defaults, so the snippet has no limits or hints', () => {
    expect(snippet()).toBe(
      '<kui-file-upload\n  [(files)]="files"\n  (retry)="retryUpload($event)"\n/>',
    );
  });

  it('adds accept presets and custom messages to the preview and the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    option('images')?.click();
    option('custom')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain(`[accept]="['image/png','image/jpeg']"`);
    expect(snippet()).toContain('[messages]="messages"');
    expect(
      root.querySelector('app-api-playground-viewport kui-file-upload')?.textContent,
    ).toContain('browse your computer');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
