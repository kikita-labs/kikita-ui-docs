import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TEXTAREA_EXAMPLE_SOURCES } from '@generated/example-sources/textarea.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TEXTAREA_DOCS_MANIFEST } from './textarea.docs-manifest';
import { TextareaPage } from './textarea-page';

describe('TextareaPage', () => {
  let fixture: ComponentFixture<TextareaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaPage],
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

    fixture = TestBed.createComponent(TextareaPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native textarea examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const textareas = [
      ...root.querySelectorAll<HTMLTextAreaElement>('app-live-preview textarea.kui-textarea'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Textarea');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'sizes',
      'invalid-state',
      'signal-forms',
      'api',
      'accessibility',
    ]);
    expect(textareas).toHaveLength(7);
    expect(textareas[0]?.rows).toBe(4);
    expect(textareas.some((textarea) => textarea.getAttribute('aria-invalid') === 'true')).toBe(
      true,
    );
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TEXTAREA_DOCS_MANIFEST.loadPage(),
      TEXTAREA_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TextareaPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TEXTAREA_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-textarea-example',
      'textarea-invalid-example',
      'textarea-size-example',
    ]);
    expect(Object.keys(TEXTAREA_EXAMPLE_SOURCES).sort()).toEqual(
      [...TEXTAREA_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
