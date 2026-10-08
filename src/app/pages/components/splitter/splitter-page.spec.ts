import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SPLITTER_EXAMPLE_SOURCES } from '@generated/example-sources/splitter.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SPLITTER_DOCS_MANIFEST } from './splitter.docs-manifest';
import { SplitterPage } from './splitter-page';

describe('SplitterPage', () => {
  let fixture: ComponentFixture<SplitterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitterPage],
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

    fixture = TestBed.createComponent(SplitterPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Splitter');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'nested',
      'multiple',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('creates one focusable separator per pair of adjacent panes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const basic = root.querySelector<HTMLElement>('app-live-preview kui-splitter');
    const separators = basic?.querySelectorAll<HTMLElement>('[role="separator"]');

    expect(separators).toHaveLength(1);
    expect(separators?.[0]?.getAttribute('aria-orientation')).toBe('vertical');
    expect(separators?.[0]?.getAttribute('aria-controls')).not.toBeNull();
    expect(separators?.[0]?.getAttribute('tabindex')).toBe('0');
  });

  it('resizes the before pane with the arrow keys and reports the sizes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const separator = root.querySelector<HTMLElement>('app-live-preview [role="separator"]');
    const before = separator?.getAttribute('aria-valuenow');

    separator?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(Number(separator?.getAttribute('aria-valuenow'))).toBeGreaterThan(Number(before));
    expect(root.textContent).toContain('Sizes: 32 / 68');
  });

  it('removes the gutters of a disabled splitter from the tab order', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('#multiple')?.closest('app-doc-section');
    const separators = [...(section?.querySelectorAll<HTMLElement>('[role="separator"]') ?? [])];

    expect(separators).toHaveLength(3);
    expect(separators.at(-1)?.getAttribute('aria-disabled')).toBe('true');
    expect(separators.at(-1)?.getAttribute('tabindex')).toBe('-1');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SPLITTER_DOCS_MANIFEST.loadPage(),
      SPLITTER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SplitterPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(SPLITTER_EXAMPLE_SOURCES).sort()).toEqual(
      [...SPLITTER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
