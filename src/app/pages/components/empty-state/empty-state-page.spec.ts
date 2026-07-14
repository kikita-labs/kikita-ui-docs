import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { EMPTY_STATE_EXAMPLE_SOURCES } from '@generated/example-sources/empty-state.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { EMPTY_STATE_DOCS_MANIFEST } from './empty-state.docs-manifest';
import { EmptyStatePage } from './empty-state-page';

describe('EmptyStatePage', () => {
  let fixture: ComponentFixture<EmptyStatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStatePage],
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

    fixture = TestBed.createComponent(EmptyStatePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and projected icon/action examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const emptyStates = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-empty-state')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Empty State');
    expect(sectionIds).toEqual(['import', 'usage', 'contexts', 'sizes', 'api', 'accessibility']);
    expect(emptyStates.length).toBeGreaterThanOrEqual(8);
    expect(root.querySelectorAll('[kuiEmptyStateIcon]').length).toBeGreaterThanOrEqual(8);
    expect(root.querySelectorAll('[kuiEmptyStateActions] button').length).toBeGreaterThanOrEqual(3);
    expect(new Set(emptyStates.map((state) => state.getAttribute('data-kui-context')))).toEqual(
      new Set(['no-data', 'no-results', 'error', 'no-access', 'success']),
    );
    expect(new Set(emptyStates.map((state) => state.getAttribute('data-kui-size')))).toEqual(
      new Set(['md', 'sm', 'lg']),
    );
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      EMPTY_STATE_DOCS_MANIFEST.loadPage(),
      EMPTY_STATE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(EmptyStatePage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(EMPTY_STATE_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-empty-state-example',
      'empty-state-context-example',
      'empty-state-size-example',
    ]);
    expect(Object.keys(EMPTY_STATE_EXAMPLE_SOURCES).sort()).toEqual(
      [...EMPTY_STATE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
