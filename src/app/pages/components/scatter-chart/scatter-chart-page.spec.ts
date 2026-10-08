import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SCATTER_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/scatter-chart.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SCATTER_CHART_DOCS_MANIFEST } from './scatter-chart.docs-manifest';
import { ScatterChartPage } from './scatter-chart-page';

describe('ScatterChartPage', () => {
  let fixture: ComponentFixture<ScatterChartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScatterChartPage],
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

    fixture = TestBed.createComponent(ScatterChartPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Scatter Chart');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'bubble',
      'states',
      'data',
      'legend',
      'sizes',
      'loading-empty',
      'tooltip',
      'alt-table',
      'colour-independence',
      'keyboard',
      'performance',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('renders every example as a named graphic with labelled marks', () => {
    const root = fixture.nativeElement as HTMLElement;
    const charts = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-scatter-chart')];

    expect(charts).toHaveLength(4);
    expect(
      charts.some((chart) => chart.querySelector('svg[role="graphics-document"]') !== null),
    ).toBe(true);
    expect(root.querySelector('app-live-preview [role="graphics-symbol img"]')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SCATTER_CHART_DOCS_MANIFEST.loadPage(),
      SCATTER_CHART_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ScatterChartPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(SCATTER_CHART_EXAMPLE_SOURCES).sort()).toEqual(
      [...SCATTER_CHART_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
