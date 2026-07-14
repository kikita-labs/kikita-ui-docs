import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { FILE_UPLOAD_EXAMPLE_SOURCES } from '@generated/example-sources/file-upload.generated';

import { FILE_UPLOAD_DOCS_MANIFEST } from './file-upload.docs-manifest';
import { FileUploadPage } from './file-upload-page';

describe('FileUploadPage', () => {
  let fixture: ComponentFixture<FileUploadPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadPage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered upload surface', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('File Upload');
    expect(sectionIds).toEqual(['import', 'usage', 'states', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview kui-file-upload')).not.toBeNull();
    expect(root.textContent).toContain('never uploads bytes by itself');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      FILE_UPLOAD_DOCS_MANIFEST.loadPage(),
      FILE_UPLOAD_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(FileUploadPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(FILE_UPLOAD_DOCS_MANIFEST.exampleIds).toEqual(['basic-file-upload-example']);
    expect(Object.keys(FILE_UPLOAD_EXAMPLE_SOURCES).sort()).toEqual(
      [...FILE_UPLOAD_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('records file-input accessibility guidance for the installed uploader', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.textContent).toContain('label');
    expect(root.textContent).toContain('retry');
  });
});
