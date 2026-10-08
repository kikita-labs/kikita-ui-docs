import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { LINE_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/line-chart.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { LINE_CHART_DOCS_MANIFEST } from './line-chart.docs-manifest';
import { LineChartPage } from './line-chart-page';

describe('LineChartPage', () => {
  let fixture: ComponentFixture<LineChartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartPage],
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

    fixture = TestBed.createComponent(LineChartPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Line Chart');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'area',
      'gaps',
      'external-legend',
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
    const charts = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-line-chart')];

    expect(charts).toHaveLength(6);
    expect(
      charts.some((chart) => chart.querySelector('svg[role="graphics-document"]') !== null),
    ).toBe(true);
    expect(root.querySelector('app-live-preview [role="graphics-symbol img"]')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      LINE_CHART_DOCS_MANIFEST.loadPage(),
      LINE_CHART_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(LineChartPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(LINE_CHART_EXAMPLE_SOURCES).sort()).toEqual(
      [...LINE_CHART_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
