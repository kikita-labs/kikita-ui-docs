import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SCROLLBAR_EXAMPLE_SOURCES } from '@generated/example-sources/scrollbar.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SCROLLBAR_DOCS_MANIFEST } from './scrollbar.docs-manifest';
import { ScrollbarPage } from './scrollbar-page';

describe('ScrollbarPage', () => {
  let fixture: ComponentFixture<ScrollbarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollbarPage],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollbarPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and local scroll utility example', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Scrollbar');
    expect(sectionIds).toEqual(['import', 'usage', 'provider-defaults', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview .kui-scroll')).not.toBeNull();
    expect(root.textContent).toContain('Scrollbar has no playground');
  });

  it('keeps manifest loader and generated example ownership aligned', async () => {
    const pageType = await SCROLLBAR_DOCS_MANIFEST.loadPage();

    expect(pageType).toBe(ScrollbarPage);
    expect(isStandalone(pageType)).toBe(true);
    expect(SCROLLBAR_DOCS_MANIFEST.exampleIds).toEqual(['local-scroll-container-example']);
    expect(Object.keys(SCROLLBAR_EXAMPLE_SOURCES)).toEqual([...SCROLLBAR_DOCS_MANIFEST.exampleIds]);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
