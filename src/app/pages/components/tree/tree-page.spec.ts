import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TREE_EXAMPLE_SOURCES } from '@generated/example-sources/tree.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TREE_DOCS_MANIFEST } from './tree.docs-manifest';
import { TreePage } from './tree-page';

describe('TreePage', () => {
  let fixture: ComponentFixture<TreePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreePage],
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

    fixture = TestBed.createComponent(TreePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered tree surface', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Tree');
    expect(sectionIds).toEqual(['import', 'usage', 'modes', 'api', 'accessibility']);
    expect(root.querySelector('app-live-preview kui-tree')).not.toBeNull();
    expect(root.textContent).toContain('not virtualized');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TREE_DOCS_MANIFEST.loadPage(),
      TREE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TreePage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TREE_DOCS_MANIFEST.exampleIds).toEqual(['basic-tree-example']);
    expect(Object.keys(TREE_EXAMPLE_SOURCES).sort()).toEqual(
      [...TREE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
