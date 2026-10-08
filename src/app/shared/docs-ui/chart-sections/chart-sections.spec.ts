import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';

import { expectNoAxeViolations } from '../testing/axe';
import { ChartAccessibilitySections } from './chart-accessibility-sections';
import { chartSharedApiRows } from './chart-api-rows';
import { ChartBehaviorSections } from './chart-behavior-sections';
import { type ChartDocsType } from './interfaces';

const TYPES: readonly ChartDocsType[] = ['line', 'bar', 'scatter', 'donut'];

describe('chart sections', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartBehaviorSections, ChartAccessibilitySections],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
      ],
    }).compileComponents();
  });

  function render<T extends object>(
    component: new () => T,
    type: ChartDocsType,
  ): ComponentFixture<T> {
    const fixture = TestBed.createComponent(component);

    fixture.componentRef.setInput('type', type);
    fixture.detectChanges();

    return fixture;
  }

  it('renders the shared behavior sections for every chart type', () => {
    for (const type of TYPES) {
      const root = render(ChartBehaviorSections, type).nativeElement as HTMLElement;
      const ids = [...root.querySelectorAll('h2')].map((heading) => heading.id);

      expect(ids).toEqual([
        'data',
        'legend',
        'sizes',
        'loading-empty',
        'tooltip',
        'alt-table',
        'colour-independence',
        'keyboard',
        'performance',
      ]);
    }
  });

  it('adapts the text to the chart type', () => {
    const text = (type: ChartDocsType): string =>
      (render(ChartBehaviorSections, type).nativeElement as HTMLElement).textContent ?? '';

    expect(text('scatter')).toContain('Zero is not');
    expect(text('donut')).toContain('re-partitions');
    expect(text('line')).toContain('KUI_CHART_MARK_LIMIT');
    expect(text('bar')).toContain('Stacked bars');
  });

  it('renders the accessibility and known-gaps sections', () => {
    const root = render(ChartAccessibilitySections, 'donut').nativeElement as HTMLElement;

    expect([...root.querySelectorAll('h2')].map((heading) => heading.id)).toEqual([
      'accessibility',
      'known-gaps',
    ]);
    expect(root.textContent).toContain('inner-radius');
  });

  it('builds the shared API rows with the type fallback name', () => {
    const rows = chartSharedApiRows('Donut chart');

    expect(rows.map((row) => row.name)).toEqual([
      'size',
      'loading',
      'legend',
      'valueFormat',
      'tooltip',
      'ariaLabel',
      'messages',
    ]);
    expect(rows.find((row) => row.name === 'ariaLabel')?.description).toContain('Donut chart');
  });

  it('has no automated accessibility violations', async () => {
    const fixture = render(ChartBehaviorSections, 'line');

    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
