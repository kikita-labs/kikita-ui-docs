import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { ACCORDION_EXAMPLE_SOURCES } from '@generated/example-sources/accordion.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ACCORDION_DOCS_MANIFEST } from './accordion.docs-manifest';
import { AccordionPage } from './accordion-page';

describe('AccordionPage', () => {
  let fixture: ComponentFixture<AccordionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionPage],
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

    fixture = TestBed.createComponent(AccordionPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered disclosure examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Accordion');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'multi-mode',
      'appearance',
      'composition',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview .kui-accordion')).toHaveLength(5);
    expect(root.querySelectorAll('app-icon-accordion-example .kui-accordion-icon')).toHaveLength(1);
    expect(
      root.querySelector('app-icon-accordion-example button[aria-disabled="true"]'),
    ).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      ACCORDION_DOCS_MANIFEST.loadPage(),
      ACCORDION_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(AccordionPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(ACCORDION_DOCS_MANIFEST.exampleIds).toEqual([
      'appearance-accordion-example',
      'basic-accordion-example',
      'icon-accordion-example',
      'multi-accordion-example',
    ]);
    expect(Object.keys(ACCORDION_EXAMPLE_SOURCES).sort()).toEqual(
      [...ACCORDION_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
